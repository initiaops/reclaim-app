import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function getCurrentMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export async function POST(request: NextRequest) {
  // 1. Authenticate the user
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Check plan — Pro users have no limit
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('plan, status')
    .eq('user_id', user.id)
    .single()

  const isPro = sub?.plan === 'pro' && sub?.status === 'active'

  // 3. If Free, check monthly usage limit
  const month = getCurrentMonth()
  const { data: usageRow } = await supabase
    .from('usage')
    .select('count')
    .eq('user_id', user.id)
    .eq('month', month)
    .single()

  const currentCount = usageRow?.count ?? 0

  if (!isPro && currentCount >= 5) {
    return NextResponse.json(
      { error: 'Monthly limit reached' },
      { status: 429 }
    )
  }

  // 3. Get and validate the transcript
  const body = await request.json()
  const transcript: string = body?.transcript ?? ''

  if (!transcript || transcript.trim().length < 50) {
    return NextResponse.json(
      { error: 'Please paste a longer transcript (at least 50 characters).' },
      { status: 400 }
    )
  }

  // 4. Call OpenAI GPT-4o
  let parsed: Record<string, unknown>
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: `You are a sales intelligence extraction system. Analyze the following sales call transcript or email thread and extract key information.

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
  "confidence": a number from 0 to 100 representing how confident you are in this extraction based on the quality of the input
}

Do not include any text before or after the JSON. Only return the JSON object.`,
        },
        {
          role: 'user',
          content: transcript,
        },
      ],
    })

    const rawText = completion.choices[0]?.message?.content ?? ''
    // Strip markdown code fences if the model wraps in ```json ... ```
    const cleaned = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
    parsed = JSON.parse(cleaned)
  } catch {
    return NextResponse.json(
      { error: 'AI returned an unexpected response. Please try again.' },
      { status: 500 }
    )
  }

  // 5. Upsert usage count (increment by 1)
  await supabase.from('usage').upsert(
    {
      user_id: user.id,
      month,
      count: currentCount + 1,
    },
    { onConflict: 'user_id,month' }
  )

  // 6. Return the result
  return NextResponse.json(parsed)
}
