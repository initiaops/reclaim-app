import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { computeCalendarAnalytics } from '@/lib/calendar-analytics'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const since = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()

  const { data: events } = await supabase
    .from('calendar_events')
    .select('event_id, title, start_time, end_time, duration_minutes, attendee_count, category, is_recurring')
    .eq('user_id', user.id)
    .gte('start_time', since)

  if (!events || events.length === 0) {
    return NextResponse.json({ empty: true, event_count: 0 })
  }

  return NextResponse.json(computeCalendarAnalytics(events))
}
