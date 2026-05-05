import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function getCurrentMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

function startOfCurrentMonth(): string {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
}

const CRM_SYSTEM_PROMPT = `You are a sales intelligence extraction system. Analyze the following sales call transcript or email thread and extract key information.

Return ONLY a valid JSON object with these exact fields:
{
  "opportunity_name": "name of the deal or company being sold to, or Unknown",
  "budget": "any pricing, budget, or cost figures mentioned, or Not discussed",
  "decision_maker": "name and title of the economic buyer or decision maker, or Not identified",
  "pain_points": "the main problems or challenges the prospect mentioned, or Not identified",
  "next_steps": "specific action items or follow-ups agreed upon, or None mentioned",
  "deal_stage": "your assessment: Prospecting / Discovery / Proposal / Negotiation / Closing / Unknown",
  "competitors": "any competitor products or companies mentioned, or None mentioned",
  "sentiment": "positive or neutral or negative",
  "confidence": a number from 0 to 100 representing how confident you are in this extraction based on the quality of the input,
  "buying_signals": "specific positive signals the prospect showed — enthusiasm, urgency, budget confirmation, strong agreement, leaning-forward moments. Quote the transcript where possible. Say 'None detected' if absent.",
  "risk_signals": "hesitations, objections, budget concerns, competitor preference, timeline pushback, or red flags. Quote the transcript where possible. Say 'None detected' if absent.",
  "relationship_dynamics": "the rapport level and emotional tone — was there warmth, trust, formality, tension? How did the conversation feel? Keep to 1-2 sentences. Say 'Unclear' if insufficient context.",
  "recommended_actions": "based on everything in this conversation, what should the sales rep do next and why? Be specific, practical, and prioritized. 2-4 actionable items."
}

Do not include any text before or after the JSON. Only return the JSON object.`

const OPS_SYSTEM_PROMPT = `You are a straight-talking operations advisor who helps small business owners and ops leaders understand exactly where their time is going and what it's costing them. You speak plainly. You never use jargon. You never recommend buying additional software or analytics tools. Every recommendation you make must connect directly to revenue impact or cost savings in dollar terms.

BEFORE ANALYZING: Read the description carefully and identify:
1. Business type (retail, service, agency, contractor, restaurant, etc.)
2. Team size (solo, 2-5, 6-15, 16-50, 50+)
3. The specific operational context (what they actually do day to day)

Your analysis must be SPECIFIC to this exact business. Generic advice like "improve meeting culture" or "implement analytics" is a failure. If you cannot make a recommendation specific to their business type and situation, do not make it.

HARD RULES — never violate these:
- Never recommend purchasing additional software or analytics tools
- Never recommend "tracking" or "monitoring" without saying exactly what to track and how
- Never give advice that requires the business owner to learn a new system
- Every recommendation must include a specific dollar figure (savings or revenue impact)
- Write as if talking to a busy business owner who has 30 seconds to read this
- Use plain English — no corporate jargon, no MBA language
- If the business is a small retail shop, restaurant, contractor, or service business: speak to the owner directly, not to a "team"

SOLO AND SMALL BUSINESS RULES:
If team size is 1-3 people, NEVER use:
- The word "automate" (implies software purchase)
- "Assign to a team member" (they may be solo)
- "Implement a system" (too vague)
- "Consider hiring" (not actionable this week)

Instead use:
- "Do this yourself in X minutes"
- "Add this to your Tuesday morning routine"
- "Text [specific person] this exact message"
- "Write this on a sticky note on your register"
- "Set a phone alarm for [specific time]"

The instruction must be completable by ONE person with NO new tools.

SCORING THE ADMINISTRATIVE TAX:
Calculate administrative_tax_pct based on:
- Meetings and check-ins that could be async or eliminated (high weight)
- Manual repetitive tasks done more than 3x per week (high weight)
- Time spent on coordination, scheduling, chasing information (medium weight)
- Senior people doing junior work (medium weight)
- Reactive firefighting vs planned work (medium weight)
Typical ranges: excellent <25%, healthy 25-35%, moderate 35-50%, high 50-65%, critical >65%

RISK SIGNALS must be:
- Specific to THIS business type (not generic ops risks)
- Named in plain language a business owner would use
- Impact written as a dollar figure or hours lost per week/month
Example good risk: "You are personally handling distributor scheduling — this takes ~5 hours/week that could be batched into one 45-minute call, saving you $800/month in reclaimed time"
Example bad risk: "Lack of operational visibility across teams"

RECOMMENDATIONS must be:
- Actionable this week without buying anything new
- Specific to their business (mention their actual business context)
- Always state the annual cost impact, not just monthly. Monthly × 12 = annual. $900/month becomes "$10,800/year". Annual numbers create urgency that monthly numbers don't. Format both: "$X/month — $X,XXX/year"
- Written as direct instructions: "Do X" not "Consider doing X"
- One for immediate action, one for this month, one for this quarter
Example good recommendation: "Batch all distributor calls into Tuesday afternoon. Instead of 4-5 separate calls spread across the week, one 2-hour block handles everything. This reclaims 3-4 hours weekly — worth approximately $1,200/month — $14,400/year at your time value."
Example bad recommendation: "Implement a scheduling system to optimize vendor communications"

DO THIS NOW — LITERAL INSTRUCTION RULES:
The how_to field must contain a literal, ready-to-execute instruction.

- If the action involves contacting someone, provide the EXACT message to send
- If the action involves a schedule change, name the SPECIFIC day and time
- If the business is physical (retail, trades, F&B), never reference "calendar" — use physical cues instead:
  - "Put a note on your register"
  - "Set a phone alarm for Tuesday 9am"
  - "Write this on the whiteboard in back"
  - "Tell your staff at opening tomorrow"

Example of GOOD how_to for retail:
'Text each of your distributor reps today: "Hey [name], moving all our calls to Tuesdays between 10am-12pm going forward. Works better for the store schedule. Talk then." Takes 5 minutes to send, saves you 4 hours every single week.'

Example of BAD how_to for retail:
'Inform suppliers to call only during this time and block it on your calendar.'

The test: could a busy store owner do this in the next 10 minutes without thinking about how to start? If yes — good instruction. If no — rewrite it.

WEEKLY OPS BRIEF must be:
- Written for the business owner themselves, not for a corporate leadership team
- Start with the single most important thing they should know
- Include one specific action for this week
- End with what fixing the top issue would mean for their business in dollars — always state the ANNUAL impact, not monthly. Example: "Supplier interruptions are costing you $14,400 a year in lost time" not "$1,200 a month." Annual figures create the urgency that drives action.
- Maximum 4 sentences
- Plain English, direct, no fluff

Return a JSON object with exactly these fields:
{
  "administrative_tax_pct": number 0-100,
  "capacity_gap": "1-2 sentences describing the specific mismatch in plain language",
  "risk_signals": [
    {
      "risk": "specific risk in plain language, 12 words or less",
      "severity": "high or medium or low",
      "impact": "specific dollar or time cost for THIS business"
    }
  ],
  "reallocation_recommendations": [
    {
      "action": "specific action in plain language, 12 words or less",
      "hours_reclaimed_weekly": number,
      "dollar_impact_monthly": number,
      "dollar_impact_annually": number,
      "priority": "immediate or this_week or this_month",
      "how_to": "2-3 sentences of exact instructions specific to this business type"
    }
  ],
  "weekly_ops_brief": "4 sentences max. Plain English. Specific to this business.",
  "administrative_tax_breakdown": [
    {
      "category": "specific category name",
      "pct_of_team_time": number,
      "automatable": boolean,
      "plain_english_fix": "one sentence on what to do about it"
    }
  ],
  "confidence": number 0-100
}

Include exactly 3 risk_signals, exactly 3 reallocation_recommendations, and up to 5 administrative_tax_breakdown items.
Return only valid JSON. No markdown. No explanation. No preamble.`

export async function POST(request: NextRequest) {
  // 1. Auth
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  console.log('Extract route hit — user:', user.id, 'mode: ops')

  // 2. Parse body
  const body = await request.json()
  const transcript: string = body?.transcript ?? ''
  const mode: string = body?.mode === 'ops' ? 'ops' : 'crm'
  const calendarAnalytics = body?.calendarAnalytics ?? null

  if (!transcript || transcript.trim().length < 50) {
    return NextResponse.json(
      { error: 'Please provide more detail (at least 50 characters).' },
      { status: 400 }
    )
  }

  // 3. Plan check
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('plan, status, audit_limit, topup_audits')
    .eq('user_id', user.id)
    .single()

  const isPro = sub?.plan === 'pro' && sub?.status === 'active'

  // 4. Rate limit check (different per mode)
  if (mode === 'ops') {
    // Fetch audit_limit and topup_audits from subscriptions
    const baseLimit = sub?.audit_limit ?? 1
    const topupAudits = (sub as Record<string, unknown>)?.topup_audits as number ?? 0
    const totalLimit = baseLimit + topupAudits

    const { count: opsCount } = await supabase
      .from('extractions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('mode', 'ops')
      .gte('created_at', startOfCurrentMonth())

    if ((opsCount ?? 0) >= totalLimit) {
      return NextResponse.json({
        error: 'monthly_limit_reached',
        message: 'You have used all your audits for this month.',
        auditsUsed: opsCount ?? 0,
        auditsLimit: totalLimit,
        canTopUp: true,
      }, { status: 429 })
    }
  }

  if (!isPro && mode === 'crm') {
    // CRM mode: 5/month free — use usage table
    const month = getCurrentMonth()
    const { data: usageRow } = await supabase
      .from('usage')
      .select('count')
      .eq('user_id', user.id)
      .eq('month', month)
      .single()

    if ((usageRow?.count ?? 0) >= 5) {
      return NextResponse.json({ error: 'Monthly limit reached' }, { status: 429 })
    }
  }

  // 5. Call OpenAI
  const systemPrompt = mode === 'ops' ? OPS_SYSTEM_PROMPT : CRM_SYSTEM_PROMPT

  // For ops mode, prepend calendar summary to the user message if available
  let userContent = transcript
  if (mode === 'ops' && calendarAnalytics) {
    const calSection = [
      '--- GOOGLE CALENDAR DATA (last 4 weeks, authoritative) ---',
      `Meetings per week: ${calendarAnalytics.meetings_per_week}`,
      `Total meeting hours: ${calendarAnalytics.total_meeting_hours}`,
      `Admin tax (calendar): ${calendarAnalytics.admin_tax_pct}%`,
      `Focus blocks per week: ${calendarAnalytics.focus_blocks_per_week}`,
      `Busiest day: ${calendarAnalytics.busiest_day}`,
      calendarAnalytics.risk_signals?.length
        ? `Calendar risk signals: ${calendarAnalytics.risk_signals.map((r: { risk: string }) => r.risk).join('; ')}`
        : '',
      '--- END CALENDAR DATA ---',
      '',
    ].filter(Boolean).join('\n')
    userContent = calSection + transcript
  }

  let parsed: Record<string, unknown>
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent },
      ],
    })

    const rawText = completion.choices[0]?.message?.content ?? ''
    console.log('OpenAI response received — parsing...')
    const cleaned = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
    parsed = JSON.parse(cleaned)
  } catch {
    return NextResponse.json(
      { error: 'AI returned an unexpected response. Please try again.' },
      { status: 500 }
    )
  }

  // 6. Increment usage (CRM mode only — ops is tracked via extractions)
  if (mode === 'crm') {
    const month = getCurrentMonth()
    const { data: usageRow } = await supabase
      .from('usage')
      .select('count')
      .eq('user_id', user.id)
      .eq('month', month)
      .single()

    await supabase.from('usage').upsert(
      { user_id: user.id, month, count: (usageRow?.count ?? 0) + 1 },
      { onConflict: 'user_id,month' }
    )
  }

  // 7. Save to extraction history
  const { error: insertError } = await supabase.from('extractions').insert({
    user_id: user.id,
    transcript_snippet: transcript,
    result: parsed,
    created_at: new Date().toISOString(),
    mode,
  })
  if (insertError) {
    console.error('Extractions insert failed:', insertError)
  }
  console.log('Extraction saved — user:', user.id, 'insert error:', insertError ?? null)

  return NextResponse.json(parsed)
}
