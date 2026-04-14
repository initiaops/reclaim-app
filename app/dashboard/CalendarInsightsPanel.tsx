'use client'

import { useState } from 'react'
import type { CalendarAnalytics } from '@/lib/calendar-analytics'

const CATEGORY_LABELS: Record<string, string> = {
  standup:       'Standup',
  sync:          'Sync / Review',
  one_on_one:    '1:1 Meetings',
  planning:      'Planning',
  recruiting:    'Recruiting',
  company:       'Company-wide',
  external:      'External / Vendor',
  learning:      'Learning',
  focus_time:    'Focus Time',
  large_meeting: 'Large Meetings (8+)',
  operational:   'Operational',
}

interface Props {
  analytics: CalendarAnalytics
  onRunAudit: () => void
}

export default function CalendarInsightsPanel({ analytics: initial, onRunAudit }: Props) {
  const [analytics, setAnalytics] = useState<CalendarAnalytics>(initial)
  const [refreshing, setRefreshing] = useState(false)
  const [refreshMsg, setRefreshMsg] = useState('')

  const maxCatHours = Math.max(...analytics.category_breakdown.map(c => c.total_hours), 1)

  function taxColor(pct: number) {
    if (pct >= 55) return 'text-red-600'
    if (pct >= 35) return 'text-amber-600'
    return 'text-green-600'
  }

  function taxBg(pct: number) {
    if (pct >= 55) return 'bg-red-50 border-red-200'
    if (pct >= 35) return 'bg-amber-50 border-amber-200'
    return 'bg-green-50 border-green-200'
  }

  async function handleRefresh() {
    setRefreshing(true)
    setRefreshMsg('')
    try {
      const syncRes = await fetch('/api/integrations/google/sync', { method: 'POST' })
      if (!syncRes.ok) { setRefreshMsg('Sync failed'); setRefreshing(false); return }

      const analyticsRes = await fetch('/api/integrations/google/analytics')
      if (analyticsRes.ok) {
        const data = await analyticsRes.json()
        if (!data.empty) setAnalytics(data)
        setRefreshMsg(`Updated — ${data.event_count ?? 0} events analyzed`)
      }
    } catch {
      setRefreshMsg('Network error')
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="font-black text-gray-900">Calendar Insights — Last 4 Weeks</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Based on real data from your Google Calendar
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ backgroundColor: '#EEEDFE', color: '#534AB7' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          Live data
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* 4 metric cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
            <p className="text-xs text-gray-400 mb-1 font-medium">Meetings/Week</p>
            <p className="text-2xl font-black" style={{ color: '#534AB7' }}>
              {analytics.meetings_per_week}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{analytics.total_meeting_hours} hrs total</p>
          </div>

          <div className={`rounded-xl border p-4 text-center ${taxBg(analytics.admin_tax_pct)}`}>
            <p className="text-xs text-gray-500 mb-1 font-medium">Admin Tax</p>
            <p className={`text-2xl font-black ${taxColor(analytics.admin_tax_pct)}`}>
              {analytics.admin_tax_pct}%
            </p>
            <p className="text-xs text-gray-400 mt-0.5">of working hours</p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-green-50 p-4 text-center">
            <p className="text-xs text-gray-500 mb-1 font-medium">Focus Blocks/Wk</p>
            <p className="text-2xl font-black text-green-600">{analytics.focus_blocks_per_week}</p>
            <p className="text-xs text-gray-400 mt-0.5">60+ min uninterrupted</p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
            <p className="text-xs text-gray-500 mb-1 font-medium">Busiest Day</p>
            <p className="text-2xl font-black text-amber-600">{analytics.busiest_day?.slice(0, 3)}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {analytics.weekly_pattern.find(d => d.day === analytics.busiest_day)?.hours ?? '?'} hrs avg
            </p>
          </div>
        </div>

        {/* Category breakdown bar chart */}
        <div>
          <h3 className="text-sm font-black text-gray-700 mb-3">Time Breakdown by Category</h3>
          <div className="space-y-2.5">
            {analytics.category_breakdown.slice(0, 8).map(cat => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">
                    {CATEGORY_LABELS[cat.category] ?? cat.category}
                  </span>
                  <span className="text-xs font-bold text-gray-700">{cat.total_hours} hrs</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${Math.min((cat.total_hours / maxCatHours) * 100, 100)}%`,
                      backgroundColor: '#534AB7',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk signals from calendar */}
        {analytics.risk_signals.length > 0 && (
          <div>
            <h3 className="text-sm font-black text-gray-700 mb-3">Risk Signals from Calendar</h3>
            <div className="space-y-2">
              {analytics.risk_signals.map((r, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-amber-50 border-l-4 border-amber-400 px-4 py-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{r.risk}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.reason}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-700 shrink-0">
                    Calendar data
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors disabled:opacity-50"
          >
            {refreshing ? 'Refreshing…' : '↻ Refresh calendar data'}
          </button>
          {refreshMsg && <p className="text-xs text-gray-400">{refreshMsg}</p>}
          <button
            onClick={onRunAudit}
            className="text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#534AB7' }}
          >
            Run Full Audit →
          </button>
        </div>

      </div>
    </div>
  )
}
