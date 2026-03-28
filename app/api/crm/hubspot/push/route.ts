import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// ── Stage map ──────────────────────────────────────────────────────────────
const STAGE_MAP: Record<string, string> = {
  Prospecting:  'appointmentscheduled',
  Discovery:    'qualifiedtobuy',
  Proposal:     'presentationscheduled',
  Negotiation:  'decisionmakerboughtin',
  Closing:      'contractsent',
  'Closed Won': 'closedwon',
  'Closed Lost': 'closedlost',
  Unknown:      'appointmentscheduled',
}

// Days until close by stage
const CLOSE_DAYS: Record<string, number> = {
  Closing:     7,
  Negotiation: 14,
  Proposal:    30,
  Discovery:   60,
  Prospecting: 90,
  Unknown:     90,
}

// ── Helpers ────────────────────────────────────────────────────────────────

const BLANK_VALUES = new Set([
  '', 'unknown', 'not discussed', 'not identified', 'none mentioned',
  'none detected', 'unclear', 'n/a', 'na', 'null',
])

function isBlank(v: string | undefined | null): boolean {
  if (v == null) return true
  return BLANK_VALUES.has(v.trim().toLowerCase())
}

/** Parse a single dollar amount like "$50k", "50,000", "50000" → number */
function parseSingleAmount(s: string): number {
  s = s.replace(/[$,\s]/g, '').toLowerCase().trim()
  if (!s) return 0
  if (s.endsWith('m')) return parseFloat(s) * 1_000_000
  if (s.endsWith('k')) return parseFloat(s) * 1_000
  return parseFloat(s) || 0
}

/**
 * Convert any budget string to a clean integer.
 * - "$50k annually" → 50000
 * - "$15k-$20k"     → 17500  (midpoint)
 * - "Not discussed"  → 0
 */
function parseBudget(raw: string): number {
  if (isBlank(raw)) return 0

  // Strip noise words (annually, per year, per month, /yr, /mo, etc.)
  const cleaned = raw.replace(/\b(annually|per\s+year|per\s+month|\/yr|\/mo|yearly|monthly)\b/gi, '').trim()

  // Try range: "15k - 20k" or "15,000–20,000"
  const rangeMatch = cleaned.match(/([\d,.]+\s*[kKmM]?)\s*[-–]\s*([\d,.]+\s*[kKmM]?)/)
  if (rangeMatch) {
    const low  = parseSingleAmount(rangeMatch[1])
    const high = parseSingleAmount(rangeMatch[2])
    if (low > 0 && high > 0) return Math.round((low + high) / 2)
  }

  // Single value
  const val = parseSingleAmount(cleaned)
  return Math.round(val)
}

/** A single person parsed from the decision_maker field */
interface ParsedContact {
  firstName: string
  lastName:  string
  jobTitle:  string
}

function parseSinglePerson(s: string): ParsedContact {
  s = s.trim()
  let jobTitle = ''
  let namePart = s

  // "Name (Title)" format
  const parenMatch = s.match(/^(.+?)\s*\((.+?)\)$/)
  if (parenMatch) {
    namePart = parenMatch[1].trim()
    jobTitle  = parenMatch[2].trim()
  } else if (s.includes(',')) {
    // "Name, Title" format
    const idx = s.indexOf(',')
    namePart = s.slice(0, idx).trim()
    jobTitle  = s.slice(idx + 1).trim()
  }

  const words     = namePart.split(/\s+/).filter(Boolean)
  const firstName = words[0] ?? ''
  // If only one word, lastName stays empty — HubSpot is fine with that
  const lastName  = words.length > 1 ? words.slice(1).join(' ') : ''

  return { firstName, lastName, jobTitle }
}

/**
 * Split decision_maker on " and " to support multiple people,
 * then parse each into a contact object.
 */
function parseDecisionMakers(raw: string): ParsedContact[] {
  if (isBlank(raw)) return []
  return raw
    .split(/\s+and\s+/i)
    .map(part => parseSinglePerson(part))
    .filter(c => c.firstName.length > 0)
}

function getCloseDate(dealStage: string): string {
  const days = CLOSE_DAYS[dealStage] ?? 90
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
}

function buildDealName(extraction: Record<string, string>): string {
  const opp = extraction.opportunity_name?.trim()
  if (opp && !isBlank(opp)) return opp

  // Fallback: "New Deal — April 10, 2025"
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  return `New Deal — ${dateStr}`
}

function buildDescription(extraction: Record<string, string>): string {
  const lines: string[] = ['--- RECLAIM AI Extraction ---']

  if (!isBlank(extraction.pain_points))
    lines.push(`Pain Points: ${extraction.pain_points}`)
  if (!isBlank(extraction.next_steps))
    lines.push(`Next Steps: ${extraction.next_steps}`)
  if (!isBlank(extraction.competitors))
    lines.push(`Competitors: ${extraction.competitors}`)
  if (!isBlank(extraction.sentiment))
    lines.push(`Sentiment: ${extraction.sentiment}`)
  if (extraction.confidence != null)
    lines.push(`Confidence: ${extraction.confidence}%`)

  if (extraction.notes?.trim()) {
    lines.push('', '--- Rep Notes ---', extraction.notes.trim())
  }

  const hasInsights =
    !isBlank(extraction.buying_signals) ||
    !isBlank(extraction.risk_signals) ||
    !isBlank(extraction.recommended_actions) ||
    !isBlank(extraction.relationship_dynamics)

  if (hasInsights) {
    lines.push('', '--- AI Insights ---')
    if (!isBlank(extraction.buying_signals))
      lines.push(`Buying Signals: ${extraction.buying_signals}`)
    if (!isBlank(extraction.risk_signals))
      lines.push(`Risk Signals: ${extraction.risk_signals}`)
    if (!isBlank(extraction.relationship_dynamics))
      lines.push(`Relationship: ${extraction.relationship_dynamics}`)
    if (!isBlank(extraction.recommended_actions))
      lines.push(`Recommended Actions: ${extraction.recommended_actions}`)
  }

  return lines.join('\n')
}

interface QualityField { label: string; populated: boolean }

function calcQuality(params: {
  dealName: string
  amount: number
  contacts: ParsedContact[]
  extraction: Record<string, string>
  closeDate: string
}): { score: number; total: number; fields: QualityField[] } {
  const { dealName, amount, contacts, extraction, closeDate } = params
  const fields: QualityField[] = [
    { label: 'Deal name',      populated: !dealName.startsWith('New Deal —') },
    { label: 'Budget',         populated: amount > 0 },
    { label: 'Decision maker', populated: contacts.length > 0 },
    { label: 'Pain points',    populated: !isBlank(extraction.pain_points) },
    { label: 'Next steps',     populated: !isBlank(extraction.next_steps) },
    { label: 'Deal stage',     populated: extraction.deal_stage !== 'Unknown' },
    { label: 'Sentiment',      populated: !isBlank(extraction.sentiment) },
    { label: 'Competitors',    populated: !isBlank(extraction.competitors) },
    { label: 'Close date',     populated: !!closeDate },
  ]
  return { score: fields.filter(f => f.populated).length, total: fields.length, fields }
}

// ── Token refresh ──────────────────────────────────────────────────────────
async function getFreshToken(
  connection: { access_token: string; refresh_token: string | null; expires_at: string | null },
  supabase: Awaited<ReturnType<typeof import('@/lib/supabase/server').createClient>>,
  userId: string
): Promise<string> {
  const expiresAt   = connection.expires_at ? new Date(connection.expires_at) : null
  const needsRefresh = !expiresAt || expiresAt.getTime() - Date.now() < 5 * 60 * 1000

  if (!needsRefresh) return connection.access_token
  if (!connection.refresh_token) throw new Error('No refresh token available')

  const tokenRes = await fetch('https://api.hubapi.com/oauth/v1/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type:    'refresh_token',
      client_id:     process.env.HUBSPOT_CLIENT_ID!,
      client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
      redirect_uri:  process.env.NEXT_PUBLIC_HUBSPOT_REDIRECT_URI!,
      refresh_token: connection.refresh_token,
    }),
  })

  if (!tokenRes.ok) throw new Error('Failed to refresh HubSpot token')

  const tokens       = await tokenRes.json()
  const newExpiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString()

  await supabase
    .from('crm_connections')
    .update({
      access_token:  tokens.access_token,
      refresh_token: tokens.refresh_token ?? connection.refresh_token,
      expires_at:    newExpiresAt,
    })
    .eq('user_id', userId)
    .eq('provider', 'hubspot')

  return tokens.access_token
}

// ── POST handler ───────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // 1. Auth
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // 2. HubSpot connection
  const { data: connection } = await supabase
    .from('crm_connections')
    .select('access_token, refresh_token, expires_at, hub_id')
    .eq('user_id', user.id)
    .eq('provider', 'hubspot')
    .single()

  if (!connection) return NextResponse.json({ error: 'HubSpot not connected' }, { status: 400 })

  // 3. Parse body
  const body       = await request.json()
  const extraction = body.extraction as Record<string, string>
  if (!extraction) return NextResponse.json({ error: 'No extraction data provided' }, { status: 400 })

  // 4. Fresh token
  let accessToken: string
  try {
    accessToken = await getFreshToken(connection, supabase, user.id)
  } catch (e) {
    console.error('Token refresh failed:', e)
    return NextResponse.json(
      { error: 'HubSpot session expired. Please disconnect and reconnect HubSpot in Settings.' },
      { status: 401 }
    )
  }

  const headers = { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' }

  // 5. Build all values
  const dealName  = buildDealName(extraction)
  const stage     = STAGE_MAP[extraction.deal_stage] ?? 'appointmentscheduled'
  const closeDate = getCloseDate(extraction.deal_stage)
  const amount    = parseBudget(extraction.budget ?? '')
  const contacts  = parseDecisionMakers(extraction.decision_maker ?? '')
  const desc      = buildDescription(extraction)
  const quality   = calcQuality({ dealName, amount, contacts, extraction, closeDate })

  // 6. Build deal properties — only send non-blank values
  const dealProperties: Record<string, string> = {
    dealname:    dealName,
    dealstage:   stage,
    closedate:   closeDate,
    description: desc,
    pipeline:    'default',
  }
  if (amount > 0) dealProperties.amount = String(amount)

  // 7. Create the deal
  const dealRes = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
    method: 'POST',
    headers,
    body: JSON.stringify({ properties: dealProperties }),
  })

  if (!dealRes.ok) {
    const err = await dealRes.text()
    console.error('HubSpot deal creation failed:', err)
    return NextResponse.json({ error: 'Failed to create deal in HubSpot. Please try again.' }, { status: 500 })
  }

  const deal   = await dealRes.json()
  const dealId = deal.id as string

  // 8. Create contacts and associate each with the deal
  const contactIds: string[] = []
  for (const person of contacts) {
    try {
      const props: Record<string, string> = { firstname: person.firstName }
      if (person.lastName)  props.lastname = person.lastName
      if (person.jobTitle)  props.jobtitle = person.jobTitle

      const contactRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers,
        body: JSON.stringify({ properties: props }),
      })
      if (contactRes.ok) {
        const c = await contactRes.json()
        contactIds.push(c.id)
      }
    } catch {
      // Non-fatal — deal already created
    }
  }

  // 9. Associate all contacts with the deal
  for (const contactId of contactIds) {
    try {
      await fetch(
        `https://api.hubapi.com/crm/v4/objects/deals/${dealId}/associations/default/contacts/${contactId}`,
        { method: 'PUT', headers }
      )
    } catch { /* non-fatal */ }
  }

  // 10. Build deal URL
  const hubId   = connection.hub_id
  const dealUrl = hubId
    ? `https://app.hubspot.com/contacts/${hubId}/deal/${dealId}`
    : 'https://app.hubspot.com/crm/deals'

  return NextResponse.json({ dealId, dealUrl, dealName, qualityScore: quality })
}
