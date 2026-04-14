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

const OPS_SYSTEM_PROMPT = `You are an operational intelligence analyst specializing in BizOps and operations teams. Analyze the team description provided and return a JSON object with exactly these fields:

{
  "administrative_tax_pct": a number from 0 to 100 representing the estimated percentage of team time going to low-ROI administrative work,
  "capacity_gap": "1-2 sentences describing the biggest mismatch between where time goes and where it should go",
  "risk_signals": [
    {
      "risk": "the operational risk in 10 words or less",
      "severity": "high or medium or low",
      "impact": "what this costs the team in 1 sentence"
    }
  ],
  "reallocation_recommendations": [
    {
      "action": "specific action in 10 words or less",
      "hours_reclaimed_weekly": a number,
      "priority": "immediate or this_week or this_month"
    }
  ],
  "weekly_ops_brief": "3-4 sentences written as if addressed to a leadership team. Professional, clear, no fluff. Summarize: state of the team, top risk, recommended action.",
  "administrative_tax_breakdown": [
    {
      "category": "e.g. Status reporting",
      "pct_of_team_time": a number,
      "automatable": true or false
    }
  ],
  "confidence": a number from 0 to 100 representing how confident the analysis is based on the detail provided
}

Include exactly 3 risk_signals, exactly 3 reallocation_recommendations, and up to 5 administrative_tax_breakdown items.
Return only valid JSON. No markdown. No explanation.`

export async function POST(request: NextRequest) {
  // 1. Auth
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // 2. Parse body
  const body = await request.json()
  const transcript: string = body?.transcript ?? ''
  const mode: string = body?.mode === 'ops' ? 'ops' : 'crm'

  if (!transcript || transcript.trim().length < 50) {
    return NextResponse.json(
      { error: 'Please provide more detail (at least 50 characters).' },
      { status: 400 }
    )
  }

  // 3. Plan check
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('plan, status')
    .eq('user_id', user.id)
    .single()

  const isPro = sub?.plan === 'pro' && sub?.status === 'active'

  // 4. Rate limit check (different per mode)
  if (!isPro) {
    if (mode === 'ops') {
      // Ops mode: 1 audit/month free — count from extractions table
      const { count: opsCount } = await supabase
        .from('extractions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('mode', 'ops')
        .gte('created_at', startOfCurrentMonth())

      if ((opsCount ?? 0) >= 1) {
        return NextResponse.json({ error: 'Monthly audit limit reached' }, { status: 429 })
      }
    } else {
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
  }

  // 5. Call OpenAI
  const systemPrompt = mode === 'ops' ? OPS_SYSTEM_PROMPT : CRM_SYSTEM_PROMPT

  let parsed: Record<string, unknown>
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: transcript },
      ],
    })

    const rawText = completion.choices[0]?.message?.content ?? ''
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
  await supabase.from('extractions').insert({
    user_id: user.id,
    transcript_excerpt: transcript.slice(0, 200),
    result: parsed,
    mode,
  })

  return NextResponse.json(parsed)
}
