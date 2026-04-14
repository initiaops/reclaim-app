import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await Promise.all([
    supabase.from('calendar_connections').delete().eq('user_id', user.id),
    supabase.from('calendar_events').delete().eq('user_id', user.id),
  ])

  return NextResponse.json({ ok: true })
}
