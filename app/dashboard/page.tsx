'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

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
  timestamp: string
  excerpt: string
  result: ExtractionResult
}

const FREE_LIMIT = 5

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState('')
  const [usageCount, setUsageCount] = useState(0)
  const [transcript, setTranscript] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ExtractionResult | null>(null)
  const [error, setError] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [copied, setCopied] = useState(false)
  const [pageReady, setPageReady] = useState(false)

  const getCurrentMonth = () => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  }

  const fetchUsage = useCallback(async (userId: string) => {
    const supabase = createClient()
    const { data } = await supabase
      .from('usage')
      .select('count')
      .eq('user_id', userId)
      .eq('month', getCurrentMonth())
      .single()

    setUsageCount(data?.count ?? 0)
  }, [])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email ?? '')
        fetchUsage(user.id)
      }
      setPageReady(true)
    })
  }, [fetchUsage])

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
        if (response.status === 429) {
          setError('You have reached your 5 extraction limit for this month. Upgrade to continue.')
        } else {
          setError(data.error ?? 'Something went wrong. Please try again.')
        }
        return
      }

      setResult(data)
      setUsageCount((prev) => prev + 1)

      const entry: HistoryEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString(),
        excerpt: transcript.slice(0, 80) + (transcript.length > 80 ? '…' : ''),
        result: data,
      }
      setHistory((prev) => [entry, ...prev].slice(0, 5))
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

  function handleCopyAll() {
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
    a.download = `reclaim-extract-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const sentimentConfig = {
    positive: { label: 'Positive', bg: 'bg-green-100', text: 'text-green-800' },
    neutral: { label: 'Neutral', bg: 'bg-yellow-100', text: 'text-yellow-800' },
    negative: { label: 'Negative', bg: 'bg-red-100', text: 'text-red-800' },
  }

  const usagePercent = Math.min((usageCount / FREE_LIMIT) * 100, 100)
  const limitReached = usageCount >= FREE_LIMIT
  const nearLimit = usageCount >= FREE_LIMIT - 1

  if (!pageReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading your dashboard…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back{userEmail ? `, ${userEmail.split('@')[0]}` : ''}
          </h1>
          <p className="text-gray-500 mt-1">
            Paste a transcript below to extract your sales intelligence.
          </p>
        </div>

        {/* Usage counter */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">
              Monthly extractions used
            </span>
            <span
              className={`text-sm font-bold ${nearLimit ? 'text-red-600' : 'text-gray-700'}`}
            >
              {usageCount} / {FREE_LIMIT}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ${
                nearLimit ? 'bg-red-500' : 'bg-purple-600'
              }`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          {limitReached && (
            <p className="mt-3 text-sm text-red-600 font-medium">
              You&apos;ve reached your free monthly limit. Upgrade coming soon — check back next month for your refresh.
            </p>
          )}
        </div>

        {/* Input area */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
          <label
            htmlFor="transcript"
            className="block text-sm font-semibold text-gray-800"
          >
            Paste your sales call transcript or email thread
          </label>
          <textarea
            id="transcript"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste your sales call transcript or email thread here..."
            rows={10}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 resize-y placeholder:text-gray-400"
            style={{ minHeight: '200px' }}
            disabled={limitReached}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            onClick={handleExtract}
            disabled={loading || limitReached || transcript.trim().length === 0}
            title={limitReached ? 'Monthly limit reached' : undefined}
            className="w-full text-white font-semibold py-3.5 rounded-xl transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--brand)' }}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Extracting…
              </>
            ) : limitReached ? (
              'Monthly limit reached'
            ) : (
              'Extract Intelligence'
            )}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Extraction Results
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={handleCopyAll}
                  className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  {copied ? '✓ Copied!' : 'Copy all as text'}
                </button>
                <button
                  onClick={handleDownload}
                  className="text-sm font-medium px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Download .txt
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Opportunity Name', value: result.opportunity_name },
                { label: 'Budget / Pricing Discussed', value: result.budget },
                { label: 'Decision Maker / Economic Buyer', value: result.decision_maker },
                { label: 'Key Pain Points', value: result.pain_points },
                { label: 'Identified Next Steps', value: result.next_steps },
                { label: 'Deal Stage', value: result.deal_stage },
                { label: 'Competitors Mentioned', value: result.competitors },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                >
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {label}
                  </p>
                  <p className="text-sm text-gray-800 leading-relaxed">{value}</p>
                </div>
              ))}

              {/* Sentiment */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Overall Sentiment
                </p>
                {(() => {
                  const cfg = sentimentConfig[result.sentiment] ?? sentimentConfig.neutral
                  return (
                    <span
                      className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${cfg.bg} ${cfg.text}`}
                    >
                      {cfg.label}
                    </span>
                  )
                })()}
              </div>

              {/* Confidence */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  AI Confidence Score
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-purple-600"
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-700">
                    {result.confidence}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Session history */}
        {history.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Recent extractions this session
            </h2>
            <div className="space-y-3">
              {history.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => setResult(entry.result)}
                  className="w-full text-left bg-gray-50 hover:bg-purple-50 border border-gray-100 hover:border-purple-200 rounded-xl px-4 py-3 transition-colors"
                >
                  <p className="text-xs text-gray-400 mb-1">{entry.timestamp}</p>
                  <p className="text-sm text-gray-700 truncate">{entry.excerpt}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
