'use client'

import { useState } from 'react'

const REMINDER_DAYS = ['1st', '15th', 'Last day']

export default function AuditPreferencesForm({
  defaultTeamSize,
  defaultIndustry,
  auditReminder,
  auditReminderDay,
}: {
  defaultTeamSize: string
  defaultIndustry: string
  auditReminder: boolean
  auditReminderDay: string
}) {
  const [teamSize, setTeamSize]       = useState(defaultTeamSize)
  const [industry, setIndustry]       = useState(defaultIndustry)
  const [reminder, setReminder]       = useState(auditReminder)
  const [reminderDay, setReminderDay] = useState(auditReminderDay || '1st')
  const [saving, setSaving]           = useState(false)
  const [saved, setSaved]             = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    try {
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          default_team_size: teamSize ? parseInt(teamSize, 10) : null,
          default_industry: industry || null,
          audit_reminder: reminder,
          audit_reminder_day: reminderDay,
        }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-black text-gray-900">Audit Settings</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          These values pre-fill your audit form each time you run a capacity audit.
        </p>
      </div>

      <form onSubmit={handleSave} className="px-6 py-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Default team size
            </label>
            <input
              type="number"
              min="1"
              value={teamSize}
              onChange={e => setTeamSize(e.target.value)}
              placeholder="e.g. 8"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': '#534AB7' } as React.CSSProperties}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Default industry
            </label>
            <input
              type="text"
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              placeholder="e.g. BizOps, Aerospace, SaaS"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': '#534AB7' } as React.CSSProperties}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">Audit reminder</p>
              <p className="text-xs text-gray-400 mt-0.5">Remind me to run a monthly capacity audit</p>
            </div>
            <button
              type="button"
              onClick={() => setReminder(r => !r)}
              className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors mt-0.5`}
              style={{ backgroundColor: reminder ? '#534AB7' : '#E5E7EB' }}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  reminder ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {reminder && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-500">Remind me on the</span>
              {REMINDER_DAYS.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setReminderDay(day)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                    reminderDay === day
                      ? 'text-white border-transparent'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                  style={reminderDay === day ? { backgroundColor: '#534AB7', borderColor: '#534AB7' } : {}}
                >
                  {day}
                </button>
              ))}
              <span className="text-xs text-gray-500">of each month</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: '#534AB7' }}
          >
            {saving ? 'Saving…' : 'Save preferences'}
          </button>
          {saved && <p className="text-sm text-green-600">Saved.</p>}
        </div>
      </form>
    </div>
  )
}
