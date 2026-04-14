import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import OpsDashboardClient from './OpsDashboardClient'
import { computeCalendarAnalytics } from '@/lib/calendar-analytics'

function startOfMonth(): string {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const since28Days = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()

  const [
    { data: sub },
    { count: opsCount },
    { data: recentOpsRows },
    { data: profile },
    { data: calendarConn },
    { data: calendarEvents },
  ] = await Promise.all([
    supabase
      .from('subscriptions')
      .select('plan, status')
      .eq('user_id', user.id)
      .single(),
    supabase
      .from('extractions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('mode', 'ops')
      .gte('created_at', startOfMonth()),
    supabase
      .from('extractions')
      .select('id, result, created_at')
      .eq('user_id', user.id)
      .eq('mode', 'ops')
      .order('created_at', { ascending: false })
      .limit(3),
    supabase
      .from('profiles')
      .select('default_team_size, default_industry')
      .eq('user_id', user.id)
      .single(),
    supabase
      .from('calendar_connections')
      .select('email')
      .eq('user_id', user.id)
      .single(),
    supabase
      .from('calendar_events')
      .select('event_id, title, start_time, end_time, duration_minutes, attendee_count, category, is_recurring')
      .eq('user_id', user.id)
      .gte('start_time', since28Days),
  ])

  const isPro = sub?.plan === 'pro' && sub?.status === 'active'

  const recentAudits = (recentOpsRows ?? []).map(row => ({
    id: row.id as string,
    created_at: row.created_at as string,
    result: row.result as Record<string, unknown>,
  }))

  const calendarConnected = !!calendarConn
  const calendarAnalytics = calendarEvents && calendarEvents.length > 0
    ? computeCalendarAnalytics(calendarEvents)
    : null

  return (
    <Suspense>
      <OpsDashboardClient
        userEmail={user.email ?? ''}
        isPro={isPro}
        opsUsageCount={opsCount ?? 0}
        recentAudits={recentAudits}
        defaultTeamSize={String(profile?.default_team_size ?? '')}
        defaultIndustry={profile?.default_industry ?? ''}
        calendarConnected={calendarConnected}
        calendarAnalytics={calendarAnalytics}
      />
    </Suspense>
  )
}
