import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return NextResponse.json({ profile: profile ?? {} })
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()

  // Whitelist allowed fields
  const allowed = [
    'full_name', 'job_title', 'company', 'industry', 'team_size',
    'weekly_brief_email', 'risk_alert_email', 'product_updates_email',
    'default_team_size', 'default_industry', 'audit_reminder', 'audit_reminder_day',
  ]
  const filtered: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) filtered[key] = body[key]
  }

  const { error } = await supabase
    .from('profiles')
    .upsert(
      { user_id: user.id, ...filtered, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    )

  if (error) {
    console.error('Profile save error:', error)
    return NextResponse.json({ error: 'Failed to save profile.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
