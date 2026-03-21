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
}

const FREE_LIMIT = 5

const sentimentConfig = {
  positive: { label: 'Positive', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-400' },
  neutral: { label: 'Neutral', bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-400' },
  negative: { label: 'Negative', bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-400' },
}

const dealStageColor: Record<string, string> = {
  Prospecting: 'bg-gray-100 text-gray-600',
  Discovery: 'bg-blue-100 text-blue-700',
  Proposal: 'bg-purple-100 text-purple-700',
  Negotiation: 'bg-orange-100 text-orange-700',
  Closing: 'bg-green-100 text-green-700',
  Unknown: 'bg-gray-100 text-gray-500',
}

export default function DashboardClient({ userEmail, isPro, initialUsageCount, initialHistory }: Props) {
  const searchParams = useSearchParams()
  const justUpgraded = searchParams.get('upgraded') === 'true'

  const [usageCount, setUsageCount] = useState(initialUsageCount)
  const [transcript, setTranscript] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ExtractionResult | null>(null)
  const [error, setError] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>(initialHistory)
  const [copied, setCopied] = useState(false)

  async function handleExtract() {
    if (transcript.trim().length < 50) {
      setError('Please paste a longer transcript (at least 50 characters).')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)

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
      if (!isPro) setUsageCount((prev) => prev + 1)

      const newEntry: HistoryEntry = {
        id: `local-${Date.now()}`,
        excerpt: transcript.slice(0, 200),
        result: data,
        created_at: new Date().toISOString(),
      }
      setHistory((prev) => [newEntry, ...prev].slice(0, 5))
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  function formatResultAsText(r: ExtractionResult): string {
    return [
      `RECLAIM — Sales Intelligence Extract`,
      `Generated: ${new Date().toLocaleString()}`,
      ``,
      `Opportunity Name: ${r.opportunity_name}`,
      `Budget / Pricing: ${r.budget}`,
      `Decision Maker: ${r.decision_maker}`,
      `Key Pain Points: ${r.pain_points}`,
      `Next Steps: ${r.next_steps}`,
      `Deal Stage: ${r.deal_stage}`,
      `Competitors: ${r.competitors}`,
      `Sentiment: ${r.sentiment}`,
      `AI Confidence: ${r.confidence}%`,
    ].join('\n')
  }

  function handleCopy() {
    if (!result) return
    navigator.clipboard.writeText(formatResultAsText(result))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    if (!result) return
    const blob = new Blob([formatResultAsText(result)], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reclaim-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  function loadFromHistory(entry: HistoryEntry) {
    setResult(entry.result as unknown as ExtractionResult)
    setTimeout(() => {
      document.getElementById('extraction-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const usagePercent = Math.min((usageCount / FREE_LIMIT) * 100, 100)
  const limitReached = !isPro && usageCount >= FREE_LIMIT
  const nearLimit = !isPro && usageCount >= FREE_LIMIT - 1

  const sentiment = result?.sentiment ?? 'neutral'
  const sentimentCfg = sentimentConfig[sentiment] ?? sentimentConfig.neutral
  const stageCss = dealStageColor[result?.deal_stage ?? 'Unknown'] ?? dealStageColor.Unknown

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Upgrade success */}
        {justUpgraded && (
          <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-4 flex items-center gap-4 animate-fade-up">
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
                  style={{ backgroundColor: 'var(--brand)' }}>
                  Pro
                </span>
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
          <div className="rounded-2xl p-4 flex items-center gap-3 border border-purple-200"
            style={{ backgroundColor: '#F5F3FF' }}>
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
              <div
                className={`h-2 rounded-full transition-all duration-700 ease-out ${nearLimit ? 'bg-red-400' : 'bg-purple-500'}`}
                style={{ width: `${usagePercent}%` }}
              />
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
              onChange={(e) => setTranscript(e.target.value)}
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
              className="flex items-center gap-2.5 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:opacity-90 hover:shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
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
              ) : limitReached ? (
                'Limit reached'
              ) : (
                <>
                  <span>Extract Intelligence</span>
                  <span className="opacity-70">→</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div id="extraction-results" className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-fade-up">
            {/* Results header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <h2 className="font-black text-gray-900">Extraction Results</h2>
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

            {/* Top stats row */}
            <div className="px-6 pt-5 pb-4 grid grid-cols-3 gap-4 border-b border-gray-50">
              {/* Sentiment */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Sentiment</p>
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${sentimentCfg.bg} ${sentimentCfg.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${sentimentCfg.dot}`} />
                  {sentimentCfg.label}
                </span>
              </div>
              {/* Deal stage */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Deal Stage</p>
                <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${stageCss}`}>
                  {result.deal_stage}
                </span>
              </div>
              {/* Confidence */}
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

            {/* Detail cards */}
            <div className="p-5 grid sm:grid-cols-2 gap-3">
              {[
                { label: 'Opportunity Name', value: result.opportunity_name, icon: '🏢' },
                { label: 'Budget / Pricing', value: result.budget, icon: '💰' },
                { label: 'Decision Maker', value: result.decision_maker, icon: '👤' },
                { label: 'Key Pain Points', value: result.pain_points, icon: '🎯' },
                { label: 'Next Steps', value: result.next_steps, icon: '📅' },
                { label: 'Competitors', value: result.competitors, icon: '⚔️' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-purple-100 transition-colors">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <span>{icon}</span> {label}
                  </p>
                  <p className="text-sm text-gray-800 leading-relaxed font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extraction history */}
        {history.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-black text-gray-900 text-sm">Recent Extractions</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {isPro ? 'Saved to your account' : 'Last 5 from this session'}
              </p>
            </div>
            <div className="divide-y divide-gray-50">
              {history.map((entry) => {
                const r = entry.result as Partial<ExtractionResult>
                const date = new Date(entry.created_at)
                const timeLabel = entry.id.startsWith('local-')
                  ? 'Just now'
                  : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
                    ' · ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

                return (
                  <button
                    key={entry.id}
                    onClick={() => loadFromHistory(entry)}
                    className="w-full text-left px-6 py-4 hover:bg-purple-50/50 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-purple-800 transition-colors">
                          {r.opportunity_name ?? 'Unknown opportunity'}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{entry.excerpt}</p>
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
                )
              })}
            </div>
          </div>
        )}

        {/* Upgrade banner — free users only */}
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
