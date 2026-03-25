'use client'

import { useState } from 'react'

const REASONS = [
  'Product feedback',
  'Feature request',
  'Partnership opportunity',
  'Career opportunity',
  'Just saying hi',
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', reason: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID
    if (!formspreeId) {
      setStatus('error')
      return
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          reason: form.reason,
          message: form.message,
          _subject: `RECLAIM Contact: ${form.reason}`,
        }),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', reason: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-3xl mb-3">✓</div>
        <p className="font-black text-gray-900 mb-2">Message sent!</p>
        <p className="text-gray-500 text-sm">Thanks for reaching out! I&apos;ll get back to you within 24–48 hours.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-5 text-sm font-bold hover:underline"
          style={{ color: 'var(--brand)' }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Name <span className="text-red-400">*</span></label>
        <input
          type="text"
          required
          value={form.name}
          onChange={e => set('name', e.target.value)}
          placeholder="Your name"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-400">*</span></label>
        <input
          type="email"
          required
          value={form.email}
          onChange={e => set('email', e.target.value)}
          placeholder="you@company.com"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason for reaching out <span className="text-red-400">*</span></label>
        <select
          required
          value={form.reason}
          onChange={e => set('reason', e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition bg-white"
        >
          <option value="" disabled>Select a reason…</option>
          {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Message <span className="text-red-400">*</span></label>
        <textarea
          required
          minLength={20}
          rows={5}
          value={form.message}
          onChange={e => set('message', e.target.value)}
          placeholder="What's on your mind?"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
          Something went wrong. Please try again or email directly at initiaops@gmail.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full text-sm font-bold text-white py-3 rounded-xl transition-all hover:opacity-90 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--brand)' }}
      >
        {status === 'loading' ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  )
}
