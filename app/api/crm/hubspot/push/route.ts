import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Map RECLAIM deal stages to HubSpot default pipeline stages
const STAGE_MAP: Record<string, string> = {
  Prospecting: 'appointmentscheduled',
  Discovery: 'qualifiedtobuy',
  Proposal: 'presentationscheduled',
  Negotiation: 'decisionmakerboughtin',
  Closing: 'contractsent',
  Unknown: 'appointmentscheduled',
}

// Pull the first number out of a budget string, e.g. "$50,000/year" → "50000"
function extractAmount(budget: string): string | undefined {
  if (!budget || budget === 'Not discussed') return undefined
  const match = budget.match(/[\d,]+\.?\d*/)
  if (!match) return undefined
  return match[0].replace(/,/g, '')
}

// Refresh the HubSpot access token if it's expired or expiring within 5 minutes
async function getFreshToken(
  connection: { access_token: string; refresh_token: string | null; expires_at: string | null },
  supabase: Awaited<ReturnType<typeof import('@/lib/supabase/server').createClient>>,
  userId: string
): Promise<string> {
  const expiresAt = connection.expires_at ? new Date(connection.expires_at) : null
  const needsRefresh =
    !expiresAt || expiresAt.getTime() - Date.now() < 5 * 60 * 1000

  if (!needsRefresh) return connection.access_token
  if (!connection.refresh_token) throw new Error('No refresh token available')

  const tokenRes = await fetch('https://api.hubapi.com/oauth/v1/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.HUBSPOT_CLIENT_ID!,
      client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
      redirect_uri: process.env.NEXT_PUBLIC_HUBSPOT_REDIRECT_URI!,
      refresh_token: connection.refresh_token,
    }),
  })

  if (!tokenRes.ok) throw new Error('Failed to refresh HubSpot token')

  const tokens = await tokenRes.json()
  const newExpiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString()

  await supabase
    .from('crm_connections')
    .update({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token ?? connection.refresh_token,
      expires_at: newExpiresAt,
    })
    .eq('user_id', userId)
    .eq('provider', 'hubspot')

  return tokens.access_token
}

export async function POST(request: NextRequest) {
  // 1. Auth check
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Get HubSpot connection
  const { data: connection } = await supabase
    .from('crm_connections')
    .select('access_token, refresh_token, expires_at, hub_id')
    .eq('user_id', user.id)
    .eq('provider', 'hubspot')
    .single()

  if (!connection) {
    return NextResponse.json({ error: 'HubSpot not connected' }, { status: 400 })
  }

  // 3. Parse extraction from request body
  const body = await request.json()
  const extraction = body.extraction as Record<string, string>

  if (!extraction) {
    return NextResponse.json({ error: 'No extraction data provided' }, { status: 400 })
  }

  // 4. Get fresh access token (refresh if needed)
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

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }

  // 5. Build deal properties
  const dealName =
    extraction.opportunity_name && extraction.opportunity_name !== 'Unknown'
      ? extraction.opportunity_name
      : 'RECLAIM Import'

  const stage = STAGE_MAP[extraction.deal_stage] ?? 'appointmentscheduled'
  const amount = extractAmount(extraction.budget)
  const closeDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

  const descParts: string[] = []
  if (extraction.pain_points && extraction.pain_points !== 'Not identified') {
    descParts.push(`Pain Points:\n${extraction.pain_points}`)
  }
  if (extraction.next_steps && extraction.next_steps !== 'None mentioned') {
    descParts.push(`Next Steps:\n${extraction.next_steps}`)
  }
  if (extraction.competitors && extraction.competitors !== 'None mentioned') {
    descParts.push(`Competitors:\n${extraction.competitors}`)
  }
  descParts.push(`Sentiment: ${extraction.sentiment ?? 'neutral'}`)
  descParts.push(`Extracted by RECLAIM`)

  const dealProperties: Record<string, string> = {
    dealname: dealName,
    dealstage: stage,
    closedate: closeDate,
    description: descParts.join('\n\n'),
    pipeline: 'default',
  }
  if (amount) dealProperties.amount = amount

  // 6. Create the deal
  const dealRes = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
    method: 'POST',
    headers,
    body: JSON.stringify({ properties: dealProperties }),
  })

  if (!dealRes.ok) {
    const err = await dealRes.text()
    console.error('HubSpot deal creation failed:', err)
    return NextResponse.json(
      { error: 'Failed to create deal in HubSpot. Please try again.' },
      { status: 500 }
    )
  }

  const deal = await dealRes.json()
  const dealId: string = deal.id

  // 7. Create a contact for the decision maker (if we have a real name)
  let contactId: string | null = null
  const decisionMaker = extraction.decision_maker ?? ''
  if (decisionMaker && decisionMaker !== 'Not identified') {
    try {
      // Split "John Smith, VP of Sales" → firstName: "John", lastName: "Smith", title: "VP of Sales"
      const [namepart, ...titleParts] = decisionMaker.split(',')
      const nameParts = namepart.trim().split(/\s+/)
      const firstName = nameParts[0] ?? ''
      const lastName = nameParts.slice(1).join(' ') || ''
      const jobTitle = titleParts.join(',').trim()

      const contactProperties: Record<string, string> = { firstname: firstName }
      if (lastName) contactProperties.lastname = lastName
      if (jobTitle) contactProperties.jobtitle = jobTitle

      const contactRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers,
        body: JSON.stringify({ properties: contactProperties }),
      })

      if (contactRes.ok) {
        const contact = await contactRes.json()
        contactId = contact.id
      }
    } catch {
      // Contact creation failure is non-fatal — deal was already created
    }
  }

  // 8. Associate contact with the deal (if contact was created)
  if (contactId) {
    try {
      await fetch(
        `https://api.hubapi.com/crm/v4/objects/deals/${dealId}/associations/default/contacts/${contactId}`,
        { method: 'PUT', headers }
      )
    } catch {
      // Association failure is non-fatal
    }
  }

  // 9. Build the direct link to this deal in HubSpot
  const hubId = connection.hub_id
  const dealUrl = hubId
    ? `https://app.hubspot.com/contacts/${hubId}/deal/${dealId}`
    : `https://app.hubspot.com/crm/deals`

  return NextResponse.json({ dealId, dealUrl, dealName })
}
