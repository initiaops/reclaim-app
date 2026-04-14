'use client'

import { useState, useEffect } from 'react'

interface CalendarStats {
  total_meeting_hours?: number
  meetings_per_week?: number
  admin_tax_pct?: number
  event_count?: number
  empty?: boolean
}

interface Props {
  connected: boolean
  email: string | null
  lastSyncedAt: string | null
  eventCount: number
}

function timeAgo(iso: string | null): string {
  if (!iso) return 'Never'
  const diff = Date.now() - new Date(iso).getTime()
  const mins  = Math.floor(diff / 60000)
  if (mins < 1)   return 'Just now'
  if (mins < 60)  return `${mins} minute${mins === 1 ? '' : 's'} ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)   return `${hrs} hour${hrs === 1 ? '' : 's'} ago`
  const days = Math.floor(hrs / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

export default function CalendarCard({ connected, email, lastSyncedAt, eventCount }: Props) {
  const [syncing, setSyncing]       = useState(false)
  const [syncMsg, setSyncMsg]       = useState('')
  const [disconnecting, setDisconnecting] = useState(false)
  const [stats, setStats]           = useState<CalendarStats | null>(null)

  useEffect(() => {
    if (connected) {
      fetch('/api/integrations/google/analytics')
        .then(r => r.json())
        .then(setStats)
        .catch(() => {})
    }
  }, [connected])

  async function handleSync() {
    setSyncing(true)
    setSyncMsg('')
    try {
      const res  = await fetch('/api/integrations/google/sync', { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        setSyncMsg(`Synced ${data.eventCount} events`)
        // Refresh analytics
        fetch('/api/integrations/google/analytics').then(r => r.json()).then(setStats).catch(() => {})
      } else {
        setSyncMsg(data.error ?? 'Sync failed')
      }
    } catch {
      setSyncMsg('Network error')
    } finally {
      setSyncing(false)
    }
  }

  async function handleDisconnect() {
    if (!confirm('Disconnect Google Calendar? This will delete all synced event data.')) return
    setDisconnecting(true)
    try {
      await fetch('/api/integrations/google/disconnect', { method: 'POST' })
      window.location.reload()
    } catch {
      setDisconnecting(false)
    }
  }

  // ── Disconnected state ────────────────────────────────────────────────────
  if (!connected) {
    return (
      <div className="px-6 py-5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0 mt-0.5"
            style={{ backgroundColor: '#4285F4' }}
          >
            G
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900 text-sm">Google Calendar</p>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                Recommended
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-sm">
              Connect your calendar to get real meeting load data, automatic time
              allocation analysis, and calendar-based risk signals — no self-reporting required.
            </p>
          </div>
        </div>

        <a
          href="/api/integrations/google/auth"
          className="text-xs font-bold px-4 py-2 rounded-lg text-white shrink-0 transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#534AB7' }}
        >
          Connect
        </a>
      </div>
    )
  }

  // ── Connected state ───────────────────────────────────────────────────────
  return (
    <div className="px-6 py-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0"
            style={{ backgroundColor: '#4285F4' }}
          >
            G
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900 text-sm">Google Calendar</p>
              <span className="text-xs font-bold text-green-600">✓ Connected</span>
            </div>
            {email && <p className="text-xs text-gray-400 mt-0.5">{email}</p>}
            <p className="text-xs text-gray-400 mt-0.5">
              Last synced: {timeAgo(lastSyncedAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {syncing ? 'Syncing…' : 'Sync now'}
          </button>
          <button
            onClick={handleDisconnect}
            disabled={disconnecting}
            className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 px-1"
          >
            Disconnect
          </button>
        </div>
      </div>

      {/* Stats row */}
      {stats && !stats.empty && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2.5 text-center">
            <p className="text-xs text-gray-400 mb-0.5">Events analyzed</p>
            <p className="text-base font-black text-gray-900">{stats.event_count ?? eventCount}</p>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2.5 text-center">
            <p className="text-xs text-gray-400 mb-0.5">Meetings/week</p>
            <p className="text-base font-black text-gray-900">{stats.meetings_per_week ?? '—'}</p>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-100 px-3 py-2.5 text-center">
            <p className="text-xs text-gray-400 mb-0.5">Admin tax</p>
            <p className="text-base font-black" style={{ color: '#534AB7' }}>
              {stats.admin_tax_pct != null ? `${stats.admin_tax_pct}%` : '—'}
            </p>
          </div>
        </div>
      )}

      {syncMsg && (
        <p className="text-xs text-gray-500 mt-2">{syncMsg}</p>
      )}
    </div>
  )
}
