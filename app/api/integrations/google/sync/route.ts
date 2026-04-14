import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getValidGoogleToken } from '@/lib/google-calendar'

function categorize(title: string, attendeeCount: number): string {
  const t = (title ?? '').toLowerCase()
  if (/standup|stand-up|stand up|daily scrum|daily sync/.test(t))    return 'standup'
  if (/\b(review|sync|check.?in|debrief|update)\b/.test(t))          return 'sync'
  if (/1:1|1-1|one.?on.?one/.test(t))                                return 'one_on_one'
  if (/planning|sprint|roadmap|kickoff|kick.?off|strategy/.test(t))  return 'planning'
  if (/interview|recruiting|candidate|hiring/.test(t))                return 'recruiting'
  if (/all.?hands|town.?hall|company meeting/.test(t))                return 'company'
  if (/vendor|supplier|partner|client call/.test(t))                  return 'external'
  if (/training|learning|workshop|onboard|bootcamp/.test(t))          return 'learning'
  if (attendeeCount <= 1)   return 'focus_time'
  if (attendeeCount === 2)  return 'one_on_one'
  if (attendeeCount >= 8)   return 'large_meeting'
  return 'operational'
}

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let accessToken: string
  try {
    accessToken = await getValidGoogleToken(user.id)
  } catch (e) {
    console.error('Google token error:', e)
    return NextResponse.json(
      { error: 'Google Calendar not connected or session expired. Please reconnect.' },
      { status: 400 }
    )
  }

  const timeMin = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
  const timeMax = new Date().toISOString()

  const params = new URLSearchParams({
    timeMin,
    timeMax,
    maxResults:    '500',
    singleEvents:  'true',
    orderBy:       'startTime',
    fields:        'items(id,summary,start,end,attendees,recurrence,recurringEventId,status)',
  })

  const eventsRes = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )

  if (!eventsRes.ok) {
    const errText = await eventsRes.text()
    console.error('Google Calendar API error:', errText)
    return NextResponse.json({ error: 'Failed to fetch calendar events' }, { status: 500 })
  }

  const { items = [] } = await eventsRes.json()

  const toUpsert: Record<string, unknown>[] = []

  for (const item of items) {
    if (item.status === 'cancelled') continue

    // Skip all-day events
    if (!item.start?.dateTime) continue

    const start = item.start.dateTime as string
    const end   = item.end?.dateTime as string
    if (!end) continue

    const durationMins = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000)
    if (durationMins <= 0 || durationMins > 480) continue // skip invalid / >8hr blocks

    const attendeeCount = (item.attendees?.length ?? 1) as number
    const title         = (item.summary ?? '') as string
    const isRecurring   = !!(item.recurrence?.length || item.recurringEventId)

    toUpsert.push({
      user_id:          user.id,
      event_id:         item.id,
      title,
      start_time:       start,
      end_time:         end,
      duration_minutes: durationMins,
      attendee_count:   attendeeCount,
      category:         categorize(title, attendeeCount),
      is_recurring:     isRecurring,
      is_all_day:       false,
      fetched_at:       new Date().toISOString(),
    })
  }

  if (toUpsert.length > 0) {
    const { error } = await supabase
      .from('calendar_events')
      .upsert(toUpsert, { onConflict: 'user_id,event_id' })
    if (error) console.error('Upsert error:', error)
  }

  await supabase
    .from('calendar_connections')
    .update({ last_synced_at: new Date().toISOString() })
    .eq('user_id', user.id)

  return NextResponse.json({ ok: true, eventCount: toUpsert.length })
}
