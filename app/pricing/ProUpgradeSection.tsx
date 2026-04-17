'use client'

import { useState } from 'react'

const VALID_CODES: Record<string, { label: string; discountedPrice: string }> = {
  PLAYBOOK: { label: '20% off your first month', discountedPrice: '$23.20' },
}

export default function ProUpgradeSection() {
  const [showPromo, setShowPromo] = useState(false)
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState<{ label: string; discountedPrice: string } | null>(null)
  const [error, setError] = useState('')

  function applyCode() {
    const match = VALID_CODES[code.trim().toUpperCase()]
    if (match) {
      setApplied(match)
      setError('')
    } else {
      setApplied(null)
      setError('That code isn\'t valid. Try PLAYBOOK.')
    }
  }

  return (
    <div>
      <a
        href="/api/stripe/checkout"
        className="block text-center font-black py-4 rounded-xl bg-white hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-lg"
        style={{ color: 'var(--brand)' }}
      >
        Upgrade to Pro — {applied ? applied.discountedPrice : '$29'}/mo
      </a>

      {/* Promo code toggle */}
      {!showPromo && !applied && (
        <button
          onClick={() => setShowPromo(true)}
          className="block w-full text-center text-xs text-purple-300 mt-3 hover:text-white transition-colors"
        >
          Have a promo code?
        </button>
      )}

      {showPromo && !applied && (
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={code}
            onChange={e => { setCode(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && applyCode()}
            placeholder="Enter code"
            className="flex-1 bg-white/10 text-white placeholder-purple-300 border border-purple-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white uppercase"
          />
          <button
            onClick={applyCode}
            className="text-sm font-bold bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors shrink-0"
          >
            Apply
          </button>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-300 mt-2 text-center">{error}</p>
      )}

      {applied && (
        <div className="mt-3 bg-green-500/20 border border-green-400/40 rounded-lg px-4 py-2.5 text-center">
          <p className="text-xs font-bold text-green-300">
            ✓ {applied.label} applied — you&apos;ll be charged {applied.discountedPrice} for your first month
          </p>
          <p className="text-xs text-purple-300 mt-1">Enter <strong className="text-white">PLAYBOOK</strong> in the promo field at checkout</p>
        </div>
      )}
    </div>
  )
}
