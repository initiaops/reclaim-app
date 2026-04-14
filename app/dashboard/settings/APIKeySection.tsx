'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function APIKeySection({ isPro, apiKey }: { isPro: boolean; apiKey: string }) {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!isPro) {
    return (
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 text-center">
        <p className="text-sm text-gray-500 mb-3">API access is available on the Pro plan.</p>
        <Link
          href="/pricing"
          className="inline-block text-sm font-bold px-5 py-2 rounded-lg text-white"
          style={{ backgroundColor: '#534AB7' }}
        >
          Upgrade to Pro
        </Link>
      </div>
    )
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
        <code className="flex-1 text-sm font-mono text-gray-700 truncate">
          {revealed ? apiKey : apiKey.replace(/./g, '•')}
        </code>
        <button
          onClick={() => setRevealed(r => !r)}
          className="text-xs font-semibold text-gray-500 hover:text-gray-800 px-2 py-1 rounded shrink-0"
        >
          {revealed ? 'Hide' : 'Reveal'}
        </button>
        <button
          onClick={handleCopy}
          className="text-xs font-semibold shrink-0 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <p className="text-xs text-gray-400">
        Keep your API key secret. Rotate it if you suspect it&apos;s been compromised.
        Full API docs coming soon.
      </p>
    </div>
  )
}
