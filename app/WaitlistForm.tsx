'use client'

import { useState } from 'react'

export default function WaitlistForm({ placeholder = 'Enter your work email', buttonText = 'Join the waitlist' }: {
  placeholder?: string
  buttonText?: string
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error ?? 'Something went wrong.')
      } else {
        setStatus('success')
        setEmail('')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-green-200 bg-green-50 text-green-800 font-semibold text-sm">
        <span className="text-lg">✓</span>
        You&apos;re on the list — we&apos;ll be in touch soon.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent bg-white"
        style={{ '--tw-ring-color': '#534AB7' } as React.CSSProperties}
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-60 whitespace-nowrap"
        style={{ backgroundColor: '#534AB7' }}
      >
        {status === 'loading' ? 'Joining…' : buttonText}
      </button>
      {status === 'error' && (
        <p className="text-red-500 text-xs mt-1 col-span-2">{errorMsg}</p>
      )}
    </form>
  )
}
