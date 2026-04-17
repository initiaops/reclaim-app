import type { Metadata } from 'next'
import CalculatorClient from './CalculatorClient'

export const metadata: Metadata = {
  title: 'Free Capacity Calculator — RECLAIM | Find Your Administrative Tax Score',
  description:
    "Find out what percentage of your team's time goes to low-ROI administrative work — and what it's costing you in dollars. Free, instant, no signup required. Ever.",
  alternates: { canonical: '/calculator' },
  openGraph: {
    title: 'Free Capacity Calculator — RECLAIM | Find Your Administrative Tax Score',
    description:
      "Find out what percentage of your team's time goes to low-ROI administrative work — and what it's costing you in dollars. Free, instant, no signup required. Ever.",
    url: 'https://www.getreclaimapp.com/calculator',
  },
}

export default function CalculatorPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <div className="text-center pt-20 pb-12 px-4" style={{ backgroundColor: '#F8F7FF' }}>
        <span
          className="inline-block text-xs font-bold uppercase tracking-widest mb-5 px-4 py-1.5 rounded-full"
          style={{ backgroundColor: '#EEEDFE', color: '#534AB7' }}
        >
          Free capacity calculator
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight max-w-2xl mx-auto leading-tight">
          How much is admin overhead costing your team?
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
          Answer 10 questions. Get your Administrative Tax Score, the dollar cost of your
          team&apos;s capacity misalignment, and 3 specific recommendations. Instant results.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {['Takes 3 minutes', 'No signup required', 'No usage limits — ever'].map(pill => (
            <span
              key={pill}
              className="text-xs font-semibold px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* ── CALCULATOR ─────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <CalculatorClient />
      </div>

    </div>
  )
}
