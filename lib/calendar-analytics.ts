// Pure analytics computation — used by both the API route and server components.

export interface CalendarEventRow {
  event_id: string
  title: string | null
  start_time: string
  end_time: string
  duration_minutes: number | null
  attendee_count: number | null
  category: string | null
  is_recurring: boolean | null
}

export interface CalendarAnalytics {
  total_meeting_hours: number
  meetings_per_week: number
  avg_meeting_duration: number
  busiest_day: string
  lightest_day: string
  meeting_free_days: number
  admin_tax_pct: number
  category_breakdown: Array<{
    category: string
    total_hours: number
    percentage: number
    count: number
  }>
  weekly_pattern: Array<{ day: string; hours: number }>
  focus_blocks_per_week: number
  this_week_hours: number
  last_week_hours: number
  risk_signals: Array<{ risk: string; reason: string }>
  event_count: number
}

const ADMIN_CATEGORIES = new Set(['standup', 'sync', 'large_meeting', 'operational', 'company'])
const WORKING_HOURS_4_WEEKS = 160
const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function computeCalendarAnalytics(events: CalendarEventRow[]): CalendarAnalytics {
  if (!events.length) {
    return {
      total_meeting_hours: 0, meetings_per_week: 0, avg_meeting_duration: 0,
      busiest_day: 'Monday', lightest_day: 'Friday', meeting_free_days: 5,
      admin_tax_pct: 0, category_breakdown: [], weekly_pattern: [],
      focus_blocks_per_week: 0, this_week_hours: 0, last_week_hours: 0,
      risk_signals: [], event_count: 0,
    }
  }

  const totalMins = events.reduce((s, e) => s + (e.duration_minutes ?? 0), 0)
  const totalHours = +(totalMins / 60).toFixed(1)
  const meetingsPerWeek = +(events.length / 4).toFixed(1)
  const avgDuration = +(totalMins / events.length).toFixed(0)

  // Category breakdown
  const catMap: Record<string, { hours: number; count: number }> = {}
  for (const e of events) {
    const cat = e.category ?? 'operational'
    if (!catMap[cat]) catMap[cat] = { hours: 0, count: 0 }
    catMap[cat].hours += (e.duration_minutes ?? 0) / 60
    catMap[cat].count += 1
  }

  const categoryBreakdown = Object.entries(catMap)
    .map(([category, { hours, count }]) => ({
      category,
      total_hours: +hours.toFixed(1),
      percentage: +((hours / WORKING_HOURS_4_WEEKS) * 100).toFixed(1),
      count,
    }))
    .sort((a, b) => b.total_hours - a.total_hours)

  // Admin tax
  const adminMins = events
    .filter(e => ADMIN_CATEGORIES.has(e.category ?? ''))
    .reduce((s, e) => s + (e.duration_minutes ?? 0), 0)
  const adminTaxPct = +((adminMins / 60 / WORKING_HOURS_4_WEEKS) * 100).toFixed(1)

  // Daily hours (normalize to weekly avg)
  const dayHoursRaw: Record<string, number> = {}
  for (const e of events) {
    const day = DAY_NAMES[new Date(e.start_time).getDay()]
    if (!dayHoursRaw[day]) dayHoursRaw[day] = 0
    dayHoursRaw[day] += (e.duration_minutes ?? 0) / 60
  }

  const weeklyPattern = DAY_ORDER.map(day => ({
    day,
    hours: +((dayHoursRaw[day] ?? 0) / 4).toFixed(1),
  }))

  const busiestDay  = weeklyPattern.reduce((max, d) => d.hours > max.hours ? d : max, weeklyPattern[0])
  const lightestDay = weeklyPattern.reduce((min, d) => d.hours < min.hours ? d : min, weeklyPattern[0])
  const meetingFreeDays = weeklyPattern.filter(d => d.hours < 0.5).length

  // Focus time
  const focusBlocks = events.filter(e => e.category === 'focus_time' && (e.duration_minutes ?? 0) >= 60)
  const focusBlocksPerWeek = +(focusBlocks.length / 4).toFixed(1)

  // This week vs last week
  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7)) // Monday
  weekStart.setHours(0, 0, 0, 0)
  const lastWeekStart = new Date(weekStart.getTime() - 7 * 86400000)

  const thisWeekHours = +(events
    .filter(e => new Date(e.start_time) >= weekStart)
    .reduce((s, e) => s + (e.duration_minutes ?? 0), 0) / 60).toFixed(1)

  const lastWeekHours = +(events
    .filter(e => { const t = new Date(e.start_time); return t >= lastWeekStart && t < weekStart })
    .reduce((s, e) => s + (e.duration_minutes ?? 0), 0) / 60).toFixed(1)

  // Risk signals
  const riskSignals: Array<{ risk: string; reason: string }> = []

  const focusHours = focusBlocks.reduce((s, e) => s + (e.duration_minutes ?? 0), 0) / 60
  const focusPct = (focusHours / WORKING_HOURS_4_WEEKS) * 100
  if (focusPct < 20) riskSignals.push({
    risk: 'Less than 20% of time in focused work',
    reason: `Only ${focusPct.toFixed(0)}% of working hours are focus blocks`,
  })

  const meetingPct = (totalHours / WORKING_HOURS_4_WEEKS) * 100
  if (meetingPct > 60) riskSignals.push({
    risk: 'Meeting load exceeding 60% of capacity',
    reason: `${meetingPct.toFixed(0)}% of working hours are in meetings`,
  })

  const oneOnOnePerWeek = (catMap['one_on_one']?.count ?? 0) / 4
  if (oneOnOnePerWeek < 2) riskSignals.push({
    risk: 'Insufficient 1:1 time for team management',
    reason: `Averaging ${oneOnOnePerWeek.toFixed(1)} 1:1s per week`,
  })

  const largeMeetingPct = ((catMap['large_meeting']?.hours ?? 0) / WORKING_HOURS_4_WEEKS) * 100
  if (largeMeetingPct > 25) riskSignals.push({
    risk: 'High large-meeting load reducing individual output',
    reason: `${largeMeetingPct.toFixed(0)}% of time in meetings with 8+ attendees`,
  })

  return {
    total_meeting_hours: totalHours,
    meetings_per_week: meetingsPerWeek,
    avg_meeting_duration: +avgDuration,
    busiest_day: busiestDay?.day ?? 'Monday',
    lightest_day: lightestDay?.day ?? 'Friday',
    meeting_free_days: meetingFreeDays,
    admin_tax_pct: adminTaxPct,
    category_breakdown: categoryBreakdown,
    weekly_pattern: weeklyPattern,
    focus_blocks_per_week: focusBlocksPerWeek,
    this_week_hours: thisWeekHours,
    last_week_hours: lastWeekHours,
    risk_signals: riskSignals,
    event_count: events.length,
  }
}

/** Build a text summary of calendar analytics to pre-fill the audit textarea. */
export function buildCalendarSummary(a: CalendarAnalytics): string {
  const lines = [
    'Based on my Google Calendar data from the last 4 weeks:',
    `- I spent ${a.meetings_per_week} meetings per week (avg ${a.avg_meeting_duration} min each)`,
    `- ${a.admin_tax_pct}% of my time was in administrative/sync meetings`,
    `- My busiest day is ${a.busiest_day} with ~${
      a.weekly_pattern.find(d => d.day === a.busiest_day)?.hours ?? '?'
    } hours of meetings`,
    `- I average ${a.focus_blocks_per_week} focus blocks per week (60+ min uninterrupted)`,
    '',
    'Additional context:',
  ]
  return lines.join('\n')
}
