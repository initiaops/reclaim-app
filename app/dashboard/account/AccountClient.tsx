'use client'

import { useState } from 'react'

interface Profile {
  full_name?: string
  job_title?: string
  company?: string
  industry?: string
  team_size?: string
  weekly_brief_email?: boolean
  risk_alert_email?: boolean
  product_updates_email?: boolean
}

interface Props {
  userEmail: string
  joinedDate: string
  profile: Profile
}

const INDUSTRIES = [
  'Aerospace & Defense',
  'SaaS / Tech',
  'Manufacturing',
  'Financial Services',
  'Healthcare',
  'Consulting',
  'Other',
]

const TEAM_SIZES = ['Just me', '2–5', '6–15', '16–50', '51–200', '200+']

export default function AccountClient({ userEmail, joinedDate, profile }: Props) {
  const [fullName, setFullName]   = useState(profile.full_name ?? '')
  const [jobTitle, setJobTitle]   = useState(profile.job_title ?? '')
  const [company, setCompany]     = useState(profile.company ?? '')
  const [industry, setIndustry]   = useState(profile.industry ?? '')
  const [teamSize, setTeamSize]   = useState(profile.team_size ?? '')
  const [saving, setSaving]       = useState(false)
  const [saveMsg, setSaveMsg]     = useState('')

  const [weeklyBrief, setWeeklyBrief]     = useState(profile.weekly_brief_email ?? true)
  const [riskAlerts, setRiskAlerts]       = useState(profile.risk_alert_email ?? true)
  const [productUpdates, setProductUpdates] = useState(profile.product_updates_email ?? false)
  const [notifSaving, setNotifSaving]     = useState(false)

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaveMsg('')
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, job_title: jobTitle, company, industry, team_size: teamSize }),
      })
      setSaveMsg(res.ok ? 'Profile saved.' : 'Failed to save. Try again.')
    } catch {
      setSaveMsg('Network error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function saveNotifications(field: string, value: boolean) {
    setNotifSaving(true)
    try {
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      })
    } finally {
      setNotifSaving(false)
    }
  }

  function Toggle({ checked, onChange, label, sublabel }: {
    checked: boolean
    onChange: (v: boolean) => void
    label: string
    sublabel: string
  }) {
    return (
      <div className="flex items-start justify-between gap-4 py-4 border-b border-gray-100 last:border-0">
        <div>
          <p className="text-sm font-semibold text-gray-900">{label}</p>
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{sublabel}</p>
        </div>
        <button
          onClick={() => onChange(!checked)}
          disabled={notifSaving}
          className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none ${
            checked ? 'bg-purple-600' : 'bg-gray-200'
          }`}
          style={checked ? { backgroundColor: '#534AB7' } : {}}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform ${
              checked ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Account</h1>
          <p className="text-gray-500 mt-1">Manage your profile and preferences.</p>
        </div>

        {/* Profile section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-black shrink-0"
              style={{ backgroundColor: '#534AB7' }}
            >
              {(fullName || userEmail)[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{userEmail}</p>
              <p className="text-xs text-gray-400">Member since {joinedDate}</p>
            </div>
          </div>

          <form onSubmit={saveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#534AB7' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email address</label>
              <input
                type="email"
                value={userEmail}
                disabled
                className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Job title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                placeholder="e.g. Director of BizOps"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#534AB7' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Company</label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="e.g. Acme Corp"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#534AB7' } as React.CSSProperties}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Industry</label>
                <select
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#534AB7' } as React.CSSProperties}
                >
                  <option value="">Select industry</option>
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Team size</label>
                <select
                  value={teamSize}
                  onChange={e => setTeamSize(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#534AB7' } as React.CSSProperties}
                >
                  <option value="">Select size</option>
                  {TEAM_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: '#534AB7' }}
              >
                {saving ? 'Saving…' : 'Save profile'}
              </button>
              {saveMsg && (
                <p className={`text-sm ${saveMsg.startsWith('Profile') ? 'text-green-600' : 'text-red-500'}`}>
                  {saveMsg}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Notification preferences */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-base font-black text-gray-900 mb-1">Notification Preferences</h2>
          <p className="text-xs text-gray-400 mb-5">Control which emails you receive from RECLAIM.</p>

          <Toggle
            checked={weeklyBrief}
            onChange={v => { setWeeklyBrief(v); saveNotifications('weekly_brief_email', v) }}
            label="Weekly Ops Brief email"
            sublabel="Receive your auto-generated ops brief every Monday morning"
          />
          <Toggle
            checked={riskAlerts}
            onChange={v => { setRiskAlerts(v); saveNotifications('risk_alert_email', v) }}
            label="Risk alert emails"
            sublabel="Get notified when a new high-severity risk is detected in your audit"
          />
          <Toggle
            checked={productUpdates}
            onChange={v => { setProductUpdates(v); saveNotifications('product_updates_email', v) }}
            label="Product updates"
            sublabel="Occasional emails about new features and improvements"
          />
        </div>

        {/* Data & Privacy */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-base font-black text-gray-900 mb-1">Data & Privacy</h2>
          <p className="text-xs text-gray-400 mb-5">Your data, your control.</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:hello@getreclaimapp.com?subject=Data export request"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Download my data
            </a>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
            >
              Delete my account
            </button>
          </div>
        </div>

        {/* Delete confirmation */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-sm w-full shadow-xl">
              <h3 className="text-lg font-black text-gray-900 mb-2">Delete your account?</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                This action cannot be undone. All your audits, history, and data will be permanently deleted.
                Email us and we&apos;ll process the deletion within 48 hours.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <a
                  href="mailto:hello@getreclaimapp.com?subject=Delete my account&body=Please delete my account associated with this email."
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold text-center bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Request deletion
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
