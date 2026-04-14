'use client'

import { useState } from 'react'
import Link from 'next/link'

interface RiskSignal {
  risk: string
  severity: 'high' | 'medium' | 'low'
  impact: string
}

interface Recommendation {
  action: string
  hours_reclaimed_weekly: number
  priority: 'immediate' | 'this_week' | 'this_month'
}

interface TaxBreakdown {
  category: string
  pct_of_team_time: number
  automatable: boolean
}

interface OpsResult {
  administrative_tax_pct: number
  capacity_gap: string
  risk_signals: RiskSignal[]
  reallocation_recommendations: Recommendation[]
  weekly_ops_brief: string
  administrative_tax_breakdown: TaxBreakdown[]
  confidence: number
}

interface AuditHistory {
  id: string
  created_at: string
  result: Record<string, unknown>
}

interface Props {
  userEmail: string
  isPro: boolean
  opsUsageCount: number
  recentAudits: AuditHistory[]
  defaultTeamSize: string
  defaultIndustry: string
}

const FREE_OPS_LIMIT = 1

const severityConfig = {
  high:   { bg: 'bg-red-100',   text: 'text-red-700',   label: 'High' },
  medium: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Medium' },
  low:    { bg: 'bg-gray-100',  text: 'text-gray-600',  label: 'Low' },
}

const priorityConfig = {
  immediate:  { bg: 'bg-red-100',   text: 'text-red-700',   label: 'Immediate' },
  this_week:  { bg: 'bg-amber-100', text: 'text-amber-700', label: 'This week' },
  this_month: { bg: 'bg-green-100', text: 'text-green-700', label: 'This month' },
}

function getNextMonday(): string {
  const today = new Date()
  const day = today.getDay()
  const daysUntil = day === 1 ? 7 : (8 - day) % 7
  const next = new Date(today.getTime() + daysUntil * 86400000)
  return next.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function taxColor(pct: number) {
  if (pct >= 50) return { text: 'text-red-600',   bg: 'bg-red-50',   border: 'border-red-200',   bar: '#EF4444' }
  if (pct >= 30) return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', bar: '#F59E0B' }
  return               { text: 'text-green-600',  bg: 'bg-green-50', border: 'border-green-200', bar: '#22C55E' }
}

export default function OpsDashboardClient({
  userEmail, isPro, opsUsageCount, recentAudits, defaultTeamSize, defaultIndustry,
}: Props) {
  const [description, setDescription] = useState('')
  const [teamSize, setTeamSize]       = useState(defaultTeamSize)
  const [industry, setIndustry]       = useState(defaultIndustry)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')
  const [result, setResult]           = useState<OpsResult | null>(null)
  const [copied, setCopied]           = useState(false)
  const [sessionCount, setSessionCount] = useState(0)

  const totalOpsCount = opsUsageCount + sessionCount
  const canRun = isPro || totalOpsCount < FREE_OPS_LIMIT

  const firstName = (() => {
    const raw = userEmail.split('@')[0].split('.')[0].split('+')[0]
    return raw.charAt(0).toUpperCase() + raw.slice(1)
  })()

  const nextMonday = getNextMonday()
  const totalHrs = result
    ? result.reallocation_recommendations.reduce((s, r) => s + (r.hours_reclaimed_weekly ?? 0), 0)
    : null
  const colors = result ? taxColor(result.administrative_tax_pct) : null

  async function handleRun() {
    if (!canRun || loading || !description.trim()) return
    setLoading(true)
    setError('')
    setResult(null)

    const content = [
      description,
      teamSize ? `Team size: ${teamSize}` : '',
      industry ? `Industry/Function: ${industry}` : '',
    ].filter(Boolean).join('\n')

    try {
      const res  = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: content, mode: 'ops' }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Something went wrong.'); return }
      setResult(data as OpsResult)
      setSessionCount(c => c + 1)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function copyBrief() {
    if (!result) return
    await navigator.clipboard.writeText(result.weekly_ops_brief)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function scrollToForm() {
    document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Ops Intelligence Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Welcome back, {firstName}. Here&apos;s your operational snapshot.
            </p>
          </div>
          <button
            onClick={scrollToForm}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white shrink-0 transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#534AB7' }}
          >
            Run New Audit
          </button>
        </div>

        {/* ── Metric cards ────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`rounded-2xl border p-5 ${result ? `${colors!.bg} ${colors!.border}` : 'bg-white border-gray-200'}`}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Administrative Tax</p>
            <p className={`text-3xl font-black mb-1 ${result ? colors!.text : 'text-gray-300'}`}>
              {result ? `${result.administrative_tax_pct}%` : '—'}
            </p>
            <p className="text-xs text-gray-400">% of team time on low-ROI work</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Audits This Month</p>
            <p className="text-3xl font-black text-gray-900 mb-1">{totalOpsCount}</p>
            <p className="text-xs text-gray-400">
              {isPro ? 'Unlimited on Pro' : `of ${FREE_OPS_LIMIT} included in free plan`}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Est. Hours Reclaimed</p>
            <p className="text-3xl font-black text-green-600 mb-1">
              {totalHrs !== null ? `${totalHrs}/wk` : '—'}
            </p>
            <p className="text-xs text-gray-400">Based on your last audit results</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Next Weekly Brief</p>
            <p className="text-3xl font-black mb-1" style={{ color: '#534AB7' }}>{nextMonday}</p>
            <p className="text-xs text-gray-400">Auto-generated from your audit data</p>
          </div>
        </div>

        {/* ── Two-column layout ───────────────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* LEFT: Audit form */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 p-6 space-y-5" id="audit-form">
            <div>
              <h2 className="text-lg font-black text-gray-900 mb-1">Run a Capacity Audit</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Describe your team&apos;s current workload and time allocation. RECLAIM will identify
                your administrative tax, surface operational risks, and recommend where to redirect capacity.
              </p>
            </div>

            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={`Describe your team's current state. For example:
— Team size and roles (e.g. 8 people: 2 PMs, 3 analysts, 2 coordinators, 1 director)
— What major projects or initiatives are active
— Roughly how time is being spent this week
— What's feeling slow, stuck, or overwhelming
— Any upcoming deadlines or leadership pressure

The more context you give, the more specific and actionable your audit results will be.`}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2"
              style={{ minHeight: 200, '--tw-ring-color': '#534AB7' } as React.CSSProperties}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Team size
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
                  Industry / Function
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

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {!canRun && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
                You&apos;ve used your 1 free audit this month.{' '}
                <Link href="/pricing" className="font-bold underline">Upgrade to Pro</Link> for unlimited audits.
              </div>
            )}

            <button
              onClick={handleRun}
              disabled={loading || !canRun || !description.trim()}
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#534AB7' }}
            >
              {loading ? 'Running audit…' : 'Run Capacity Audit →'}
            </button>
            <p className="text-center text-xs text-gray-400">Estimated time: 30–60 seconds</p>
          </div>

          {/* RIGHT: Risks + recent */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-base font-black text-gray-900 mb-1">Risk Signals</h2>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                Active operational risks from your last audit.
              </p>

              {result ? (
                <div className="space-y-3">
                  {result.risk_signals.map((r, i) => {
                    const cfg = severityConfig[r.severity] ?? severityConfig.low
                    return (
                      <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <div className="flex items-start gap-2 mb-1.5 flex-wrap">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${cfg.bg} ${cfg.text}`}>
                            {cfg.label}
                          </span>
                          <p className="text-sm font-semibold text-gray-900">{r.risk}</p>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{r.impact}</p>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="rounded-xl p-6 text-center" style={{ backgroundColor: '#F8F7FF' }}>
                  <div className="text-2xl mb-2">⚠️</div>
                  <p className="font-semibold text-gray-700 text-sm mb-1">No risks identified yet</p>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                    Run a capacity audit to surface operational risks, bottleneck patterns,
                    and bandwidth gaps across your team.
                  </p>
                  <button
                    onClick={scrollToForm}
                    className="text-xs font-bold px-4 py-2 rounded-lg text-white"
                    style={{ backgroundColor: '#534AB7' }}
                  >
                    Run first audit →
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-base font-black text-gray-900 mb-4">Recent Audits</h2>
              {recentAudits.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No audits yet.</p>
              ) : (
                <div className="space-y-1">
                  <div className="grid grid-cols-3 text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 px-1">
                    <span>Date</span><span>Tax %</span><span>Top Risk</span>
                  </div>
                  {recentAudits.map(audit => {
                    const r = audit.result as Partial<OpsResult>
                    const topRisk = (r.risk_signals?.[0]?.severity ?? 'low') as keyof typeof severityConfig
                    const cfg = severityConfig[topRisk] ?? severityConfig.low
                    return (
                      <div key={audit.id} className="grid grid-cols-3 items-center text-sm px-1 py-1.5 rounded-lg hover:bg-gray-50">
                        <span className="text-gray-500 text-xs">
                          {new Date(audit.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <span className="font-semibold text-gray-700">
                          {r.administrative_tax_pct != null ? `${r.administrative_tax_pct}%` : '—'}
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full w-fit ${cfg.bg} ${cfg.text}`}>
                          {cfg.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Audit results ───────────────────────────────────────────── */}
        {result && (
          <div className="space-y-5">

            {/* Hero metric */}
            <div className={`rounded-2xl border p-10 text-center ${colors!.bg} ${colors!.border}`}>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Administrative Tax</p>
              <p className={`text-8xl font-black mb-3 ${colors!.text}`}>{result.administrative_tax_pct}%</p>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                {result.administrative_tax_pct >= 50
                  ? 'Critical — more than half your team\'s capacity is going to low-ROI administrative work.'
                  : result.administrative_tax_pct >= 30
                  ? 'Elevated — a significant portion of capacity is consumed by overhead. Intervention recommended.'
                  : 'Healthy — admin burden is within an acceptable range. Focus on targeted optimization.'}
              </p>
              <p className="text-xs text-gray-400 mt-3">AI Confidence: {result.confidence}%</p>
            </div>

            {/* Capacity gap */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">⚡ Capacity Gap</p>
              <p className="text-gray-800 text-sm leading-relaxed">{result.capacity_gap}</p>
            </div>

            {/* Risk signals */}
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-4">Risk Signals</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {result.risk_signals.map((r, i) => {
                  const cfg = severityConfig[r.severity] ?? severityConfig.low
                  return (
                    <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full mb-3 inline-block ${cfg.bg} ${cfg.text}`}>
                        {cfg.label} severity
                      </span>
                      <p className="font-bold text-gray-900 text-sm mb-2">{r.risk}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{r.impact}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Reallocation recommendations */}
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-4">Reallocation Recommendations</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {result.reallocation_recommendations.map((r, i) => {
                  const cfg = priorityConfig[r.priority] ?? priorityConfig.this_month
                  return (
                    <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full mb-3 inline-block ${cfg.bg} ${cfg.text}`}>
                        {cfg.label}
                      </span>
                      <p className="font-bold text-gray-900 text-sm mb-3">{r.action}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                        ~{r.hours_reclaimed_weekly} hrs/wk reclaimed
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Weekly ops brief */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-black text-gray-900">Weekly Ops Brief</h3>
                <button
                  onClick={copyBrief}
                  className="text-xs font-bold px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {copied ? '✓ Copied!' : 'Copy for leadership'}
                </button>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{result.weekly_ops_brief}</p>
            </div>

            {/* Tax breakdown */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-base font-black text-gray-900 mb-5">Administrative Tax Breakdown</h3>
              <div className="space-y-4">
                {result.administrative_tax_breakdown.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">{item.category}</span>
                        {item.automatable && (
                          <span
                            className="w-2 h-2 rounded-full inline-block"
                            style={{ backgroundColor: '#534AB7' }}
                            title="Automatable"
                          />
                        )}
                      </div>
                      <span className="text-sm font-bold text-gray-900">{item.pct_of_team_time}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min(item.pct_of_team_time, 100)}%`,
                          backgroundColor: item.automatable ? '#534AB7' : '#94A3B8',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: '#534AB7' }} />
                Purple bars indicate activities that can be automated or eliminated
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
