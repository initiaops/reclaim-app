'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface ExtractionResult {
  opportunity_name: string
  budget: string
  decision_maker: string
  pain_points: string
  next_steps: string
  deal_stage: string
  competitors: string
  sentiment: 'positive' | 'neutral' | 'negative'
  confidence: number
  buying_signals: string
  risk_signals: string
  relationship_dynamics: string
  recommended_actions: string
}

interface HistoryEntry {
  id: string
  excerpt: string
  result: Record<string, unknown>
  created_at: string
}

interface Props {
  userEmail: string
  isPro: boolean
  initialUsageCount: number
  initialHistory: HistoryEntry[]
  hubspotConnected: boolean
}

const FREE_LIMIT = 5

const sentimentConfig = {
  positive: { label: 'Positive', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-400' },
  neutral:  { label: 'Neutral',  bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-400' },
  negative: { label: 'Negative', bg: 'bg-red-100',    text: 'text-red-700',   dot: 'bg-red-400' },
}

const dealStageColor: Record<string, string> = {
  Prospecting: 'bg-gray-100 text-gray-600',
  Discovery:   'bg-blue-100 text-blue-700',
  Proposal:    'bg-purple-100 text-purple-700',
  Negotiation: 'bg-orange-100 text-orange-700',
  Closing:     'bg-green-100 text-green-700',
  Unknown:     'bg-gray-100 text-gray-500',
}

const editableFields = [
  { field: 'opportunity_name', label: 'Opportunity Name', icon: '🏢' },
  { field: 'budget',           label: 'Budget / Pricing', icon: '💰' },
  { field: 'decision_maker',   label: 'Decision Maker',   icon: '👤' },
  { field: 'pain_points',      label: 'Key Pain Points',  icon: '🎯' },
  { field: 'next_steps',       label: 'Next Steps',       icon: '📅' },
  { field: 'competitors',      label: 'Competitors',      icon: '⚔️' },
]

const insightFields = [
  { field: 'buying_signals',       label: 'Buying Signals',         icon: '📈', color: 'text-green-700',  bg: 'border-green-100' },
  { field: 'risk_signals',         label: 'Risk Signals',           icon: '⚠️', color: 'text-red-700',    bg: 'border-red-100' },
  { field: 'relationship_dynamics',label: 'Relationship Dynamics',  icon: '🤝', color: 'text-blue-700',   bg: 'border-blue-100' },
  { field: 'recommended_actions',  label: 'Recommended Actions',    icon: '🎯', color: 'text-purple-700', bg: 'border-purple-100' },
]

export default function DashboardClient({
  userEmail, isPro, initialUsageCount, initialHistory, hubspotConnected,
}: Props) {
  const searchParams = useSearchParams()
  const justUpgraded = searchParams.get('upgraded') === 'true'

  const [usageCount, setUsageCount]         = useState(initialUsageCount)
  const [transcript, setTranscript]         = useState('')
  const [loading, setLoading]               = useState(false)
  const [result, setResult]                 = useState<ExtractionResult | null>(null)
  const [editedResult, setEditedResult]     = useState<Record<string, string>>({})
  const [editedFields, setEditedFields]     = useState<Set<string>>(new Set())
  const [notes, setNotes]                   = useState('')
  const [error, setError]                   = useState('')
  const [history, setHistory]               = useState<HistoryEntry[]>(initialHistory)
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null)
  const [copied, setCopied]                 = useState(false)
  const [hubspotStatus, setHubspotStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [hubspotDealUrl, setHubspotDealUrl] = useState<string | null>(null)
  const [hubspotError, setHubspotError]     = useState('')

  // ── Helpers ────────────────────────────────────────────────────────

  function initEdits(r: ExtractionResult) {
    const asStrings: Record<string, string> = {}
    for (const [k, v] of Object.entries(r)) {
      asStrings[k] = String(v ?? '')
    }
    setEditedResult(asStrings)
    setEditedFields(new Set())
    setNotes('')
  }

  function updateField(field: string, value: string) {
    setEditedResult(prev => ({ ...prev, [field]: value }))
    const original = result ? String((result as unknown as Record<string, unknown>)[field] ?? '') : ''
    if (value !== original) {
      setEditedFields(prev => new Set(prev).add(field))
    } else {
      setEditedFields(prev => { const s = new Set(prev); s.delete(field); return s })
    }
  }

  function formatResultAsText(): string {
    if (!result) return ''
    return [
      'RECLAIM — Sales Intelligence Extract',
      `Generated: ${new Date().toLocaleString()}`,
      '',
      '=== CRM DATA ===',
      `Opportunity Name: ${editedResult.opportunity_name ?? result.opportunity_name}`,
      `Budget / Pricing: ${editedResult.budget ?? result.budget}`,
      `Decision Maker: ${editedResult.decision_maker ?? result.decision_maker}`,
      `Key Pain Points: ${editedResult.pain_points ?? result.pain_points}`,
      `Next Steps: ${editedResult.next_steps ?? result.next_steps}`,
      `Deal Stage: ${editedResult.deal_stage ?? result.deal_stage}`,
      `Competitors: ${editedResult.competitors ?? result.competitors}`,
      `Sentiment: ${editedResult.sentiment ?? result.sentiment}`,
      `AI Confidence: ${result.confidence}%`,
      ...(notes.trim() ? ['', `Rep Notes: ${notes}`] : []),
      '',
      '=== AI INSIGHTS ===',
      `Buying Signals: ${result.buying_signals}`,
      `Risk Signals: ${result.risk_signals}`,
      `Relationship Dynamics: ${result.relationship_dynamics}`,
      `Recommended Actions: ${result.recommended_actions}`,
    ].join('\n')
  }

  // ── Actions ────────────────────────────────────────────────────────

  async function handleExtract() {
    if (transcript.trim().length < 50) {
      setError('Please paste a longer transcript (at least 50 characters).')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)
    setHubspotStatus('idle')
    setHubspotDealUrl(null)
    setHubspotError('')

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(
          response.status === 429
            ? 'Monthly limit reached. Upgrade to Pro for unlimited extractions.'
            : data.error ?? 'Something went wrong. Please try again.'
        )
        return
      }

      setResult(data)
      initEdits(data)
      if (!isPro) setUsageCount(prev => prev + 1)

      setHistory(prev => [
        { id: `local-${Date.now()}`, excerpt: transcript.slice(0, 200), result: data, created_at: new Date().toISOString() },
        ...prev,
      ].slice(0, 10))
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    if (!result) return
    navigator.clipboard.writeText(formatResultAsText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    if (!result) return
    const blob = new Blob([formatResultAsText()], { type: 'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url
    a.download = `reclaim-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handlePushToHubSpot() {
    if (!result) return
    setHubspotStatus('loading')
    setHubspotError('')
    try {
      const response = await fetch('/api/crm/hubspot/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          extraction: {
            ...editedResult,
            confidence: result.confidence,
            ...(notes.trim() ? { notes } : {}),
          },
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setHubspotError(data.error ?? 'Push failed. Please try again.')
        setHubspotStatus('error')
        return
      }
      setHubspotDealUrl(data.dealUrl ?? null)
      setHubspotStatus('success')
    } catch {
      setHubspotError('Network error. Please try again.')
      setHubspotStatus('error')
    }
  }

  function loadFromHistory(entry: HistoryEntry) {
    const r = entry.result as unknown as ExtractionResult
    setResult(r)
    initEdits(r)
    setHubspotStatus('idle')
    setHubspotDealUrl(null)
    setHubspotError('')
    setTimeout(() => {
      document.getElementById('extraction-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  async function handleDeleteHistory(id: string) {
    setHistory(prev => prev.filter(e => e.id !== id))
    if (expandedHistoryId === id) setExpandedHistoryId(null)
    if (!id.startsWith('local-')) {
      await fetch(`/api/extractions/${id}`, { method: 'DELETE' })
    }
  }

  // ── Derived state ──────────────────────────────────────────────────

  const usagePercent  = Math.min((usageCount / FREE_LIMIT) * 100, 100)
  const limitReached  = !isPro && usageCount >= FREE_LIMIT
  const nearLimit     = !isPro && usageCount >= FREE_LIMIT - 1

  const currentSentiment  = (editedResult.sentiment ?? result?.sentiment ?? 'neutral') as keyof typeof sentimentConfig
  const currentDealStage  = editedResult.deal_stage ?? result?.deal_stage ?? 'Unknown'
  const sentimentCfg      = sentimentConfig[currentSentiment] ?? sentimentConfig.neutral
  const stageCss          = dealStageColor[currentDealStage] ?? dealStageColor.Unknown

  const hasInsights = result && insightFields.some(({ field }) => {
    const v = (result as unknown as Record<string, unknown>)[field] as string
    return v && v !== 'None detected' && v !== 'Unclear'
  })

  // ── Render ─────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Upgrade success banner */}
        {justUpgraded && (
          <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-4 flex items-center gap-4">
            <span className="text-3xl">🎉</span>
            <div>
              <p className="font-bold text-green-800">Welcome to Pro!</p>
              <p className="text-sm text-green-600 mt-0.5">Unlimited extractions are now active on your account.</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-black text-gray-900">
                {userEmail ? userEmail.split('@')[0] : 'Dashboard'}
              </h1>
              {isPro && (
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full text-white uppercase tracking-widest"
                  style={{ backgroundColor: 'var(--brand)' }}>Pro</span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-0.5">{userEmail}</p>
          </div>
          {!isPro && (
            <Link href="/pricing"
              className="text-xs font-bold px-3 py-1.5 rounded-full border border-purple-200 transition-all hover:bg-purple-50"
              style={{ color: 'var(--brand)' }}>
              Upgrade ↗
            </Link>
          )}
        </div>

        {/* Plan status */}
        {isPro ? (
          <div className="rounded-2xl p-4 flex items-center gap-3 border border-purple-200" style={{ backgroundColor: '#F5F3FF' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm shrink-0"
              style={{ backgroundColor: 'var(--brand)' }}>⚡</div>
            <div>
              <p className="font-bold text-sm" style={{ color: 'var(--brand)' }}>Pro Plan — Unlimited extractions</p>
              <p className="text-xs text-purple-500 mt-0.5">No monthly limits. Extract as much as you need.</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-700">Monthly extractions</span>
              <span className={`text-sm font-black ${nearLimit ? 'text-red-500' : 'text-gray-600'}`}>
                {usageCount} <span className="text-gray-300 font-normal">/</span> {FREE_LIMIT}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div className={`h-2 rounded-full transition-all duration-700 ease-out ${nearLimit ? 'bg-red-400' : 'bg-purple-500'}`}
                style={{ width: `${usagePercent}%` }} />
            </div>
            {limitReached && (
              <p className="mt-3 text-xs text-red-500 font-medium">
                Monthly limit reached.{' '}
                <Link href="/pricing" className="underline underline-offset-2 font-bold">Upgrade to Pro</Link>
                {' '}for unlimited extractions.
              </p>
            )}
          </div>
        )}

        {/* Extraction input */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 pt-5 pb-4">
            <label htmlFor="transcript" className="block text-sm font-bold text-gray-800 mb-3">
              Paste your sales call transcript or email thread
            </label>
            <textarea
              id="transcript"
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
              placeholder="Paste your sales call transcript or email thread here...&#10;&#10;Any length, any format. The AI will extract the key data automatically."
              rows={9}
              disabled={limitReached}
              className="w-full text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none resize-none leading-relaxed"
              style={{ minHeight: '200px' }}
            />
          </div>

          {error && (
            <div className="mx-5 mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div className="border-t border-gray-100 px-5 py-4 flex items-center justify-between gap-4">
            <p className="text-xs text-gray-300">
              {transcript.length > 0 ? `${transcript.length} characters` : 'Minimum 50 characters'}
            </p>
            <button
              onClick={handleExtract}
              disabled={loading || limitReached || transcript.trim().length < 50}
              className="flex items-center gap-2.5 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:opacity-90 hover:shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'var(--brand)' }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Extracting…
                </>
              ) : limitReached ? 'Limit reached' : (
                <><span>Extract Intelligence</span><span className="opacity-70">→</span></>
              )}
            </button>
          </div>
        </div>

        {/* ── Results ── */}
        {result && (
          <div id="extraction-results" className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-fade-up">

            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <h2 className="font-black text-gray-900">Extraction Results</h2>
                {editedFields.size > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-600 uppercase tracking-wide">
                    {editedFields.size} edited
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={handleCopy}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
                  {copied ? '✓ Copied!' : 'Copy text'}
                </button>
                <button onClick={handleDownload}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
                  Download
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="px-6 pt-5 pb-4 grid grid-cols-3 gap-4 border-b border-gray-50">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Sentiment</p>
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${sentimentCfg.bg} ${sentimentCfg.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${sentimentCfg.dot}`} />
                  {sentimentCfg.label}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Deal Stage</p>
                <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${stageCss}`}>
                  {currentDealStage}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">AI Confidence</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-purple-500" style={{ width: `${result.confidence}%` }} />
                  </div>
                  <span className="text-xs font-black text-gray-700">{result.confidence}%</span>
                </div>
              </div>
            </div>

            {/* Editable CRM field cards */}
            <div className="p-5 grid sm:grid-cols-2 gap-3">
              {editableFields.map(({ field, label, icon }) => (
                <div key={field} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-purple-100 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span>{icon}</span> {label}
                    </p>
                    {editedFields.has(field) && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-600 uppercase tracking-wide shrink-0">
                        Edited
                      </span>
                    )}
                  </div>
                  <textarea
                    value={editedResult[field] ?? ''}
                    onChange={e => updateField(field, e.target.value)}
                    rows={2}
                    className="w-full text-sm text-gray-800 leading-relaxed font-medium bg-transparent resize-none focus:outline-none focus:ring-1 focus:ring-purple-200 rounded-lg p-1 -m-1 transition-all"
                  />
                </div>
              ))}
            </div>

            {/* Notes */}
            <div className="px-5 pb-5">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-purple-100 transition-colors">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <span>📝</span> Rep Notes
                  <span className="font-normal text-gray-300 normal-case tracking-normal text-[10px]">— your observations (included in HubSpot push)</span>
                </p>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add your own context, observations, or follow-up notes here..."
                  className="w-full text-sm text-gray-800 leading-relaxed font-medium bg-transparent resize-none focus:outline-none placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* AI Insights */}
            {hasInsights && (
              <div className="border-t border-gray-100">
                <div className="px-6 py-3.5 border-b border-purple-50 flex items-center gap-2" style={{ backgroundColor: '#F5F3FF' }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--brand)' }} />
                  <h3 className="font-black text-sm" style={{ color: 'var(--brand)' }}>AI Insights</h3>
                  <span className="text-xs text-purple-400">— for the rep, not the CRM</span>
                </div>
                <div className="p-5 grid sm:grid-cols-2 gap-3" style={{ backgroundColor: '#FDFCFF' }}>
                  {insightFields.map(({ field, label, icon, color, bg }) => {
                    const value = (result as unknown as Record<string, unknown>)[field] as string
                    if (!value || value === 'None detected' || value === 'Unclear') return null
                    return (
                      <div key={field} className={`rounded-xl p-4 border bg-white ${bg}`}>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5 ${color}`}>
                          <span>{icon}</span> {label}
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">{value}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Push to HubSpot */}
            {hubspotConnected && (
              <div className="border-t border-gray-100 px-6 py-4">
                {hubspotStatus === 'success' ? (
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs shrink-0">✓</div>
                      <p className="text-sm font-semibold text-green-700">Deal created in HubSpot!</p>
                    </div>
                    {hubspotDealUrl && (
                      <a href={hubspotDealUrl} target="_blank" rel="noopener noreferrer"
                        className="text-xs font-bold px-4 py-2 rounded-lg border-2 border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors">
                        View in HubSpot →
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-xs font-semibold text-gray-600">Push to HubSpot CRM</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Creates a deal using your {editedFields.size > 0 ? 'edited' : 'extracted'} values
                        {notes.trim() ? ' + rep notes' : ''}
                      </p>
                      {hubspotStatus === 'error' && (
                        <p className="text-xs text-red-500 mt-1">{hubspotError}</p>
                      )}
                    </div>
                    <button
                      onClick={handlePushToHubSpot}
                      disabled={hubspotStatus === 'loading'}
                      className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-lg text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                      style={{ backgroundColor: '#FF7A59' }}
                    >
                      {hubspotStatus === 'loading' ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Pushing…
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                            <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.268-1.978V3.07A2.2 2.2 0 0 0 17.234.87h-.037a2.2 2.2 0 0 0-2.198 2.2v.036a2.198 2.198 0 0 0 1.268 1.978V7.93a6.232 6.232 0 0 0-2.963 1.3l-7.814-6.08a2.45 2.45 0 0 0 .08-.594 2.463 2.463 0 1 0-2.463 2.463 2.44 2.44 0 0 0 1.218-.333l7.686 5.978a6.24 6.24 0 0 0 .076 7.17l-2.33 2.33a1.983 1.983 0 0 0-.578-.09 2.003 2.003 0 1 0 2.003 2.003 1.983 1.983 0 0 0-.09-.578l2.302-2.302a6.26 6.26 0 1 0 4.77-11.267zm-.966 9.519a3.268 3.268 0 1 1 0-6.536 3.268 3.268 0 0 1 0 6.536z" />
                          </svg>
                          Push to HubSpot
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Extraction history ── */}
        {history.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-black text-gray-900 text-sm">Recent Extractions</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {history.length} saved extraction{history.length !== 1 ? 's' : ''}. Click any row to expand.
              </p>
            </div>
            <div className="divide-y divide-gray-50">
              {history.map((entry) => {
                const r = entry.result as Partial<ExtractionResult>
                const date = new Date(entry.created_at)
                const isExpanded = expandedHistoryId === entry.id
                const timeLabel = entry.id.startsWith('local-')
                  ? 'Just now'
                  : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
                    ' · ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

                return (
                  <div key={entry.id}>
                    <button
                      onClick={() => setExpandedHistoryId(isExpanded ? null : entry.id)}
                      className="w-full text-left px-6 py-4 hover:bg-purple-50/50 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex items-center gap-2">
                          <span className={`text-[10px] text-gray-300 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                            ▶
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-purple-800 transition-colors">
                              {r.opportunity_name ?? 'Unknown opportunity'}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">{entry.excerpt}</p>
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-xs text-gray-400">{timeLabel}</p>
                          {r.deal_stage && (
                            <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${dealStageColor[r.deal_stage] ?? dealStageColor.Unknown}`}>
                              {r.deal_stage}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-5 border-t border-gray-50 bg-gray-50/50">
                        <div className="pt-4 grid sm:grid-cols-2 gap-2 mb-4">
                          {[
                            { label: 'Budget',          value: r.budget },
                            { label: 'Decision Maker',  value: r.decision_maker },
                            { label: 'Pain Points',     value: r.pain_points },
                            { label: 'Next Steps',      value: r.next_steps },
                            { label: 'Competitors',     value: r.competitors },
                            { label: 'Sentiment',       value: r.sentiment },
                          ]
                            .filter(f => f.value && f.value !== 'Not discussed' && f.value !== 'Not identified' && f.value !== 'None mentioned')
                            .map(({ label, value }) => (
                              <div key={label} className="bg-white rounded-xl p-3 border border-gray-100">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                                <p className="text-xs text-gray-700 font-medium leading-relaxed">{value}</p>
                              </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => loadFromHistory(entry)}
                            className="text-xs font-bold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
                            style={{ backgroundColor: 'var(--brand)' }}
                          >
                            Re-load results
                          </button>
                          <button
                            onClick={() => handleDeleteHistory(entry.id)}
                            className="text-xs font-semibold px-4 py-2 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Upgrade banner */}
        {!isPro && (
          <div className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-dashed border-purple-200"
            style={{ backgroundColor: '#F5F3FF' }}>
            <div>
              <p className="font-black text-gray-900">Upgrade to Pro — $49/month</p>
              <p className="text-sm text-gray-500 mt-1">Unlimited extractions + persistent history. Cancel anytime.</p>
            </div>
            <Link href="/pricing"
              className="shrink-0 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
              style={{ backgroundColor: 'var(--brand)' }}>
              See pricing →
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}
