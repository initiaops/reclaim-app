import type { Metadata } from 'next'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Pricing — RECLAIM | Simple pricing',
  description: 'Start free. Grab lifetime access while spots last. Or book a session when you\'re ready for hands-on help.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing — RECLAIM | Simple pricing',
    description: 'Start free. Grab lifetime access while spots last. Or book a session when you\'re ready for hands-on help.',
    url: 'https://www.getreclaimapp.com/pricing',
  },
}

const CHECK = (
  <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
)
const CROSS = (
  <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-300 flex items-center justify-center text-xs font-bold shrink-0">✗</span>
)

export default async function PricingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let ltdRemaining = 100
  try {
    const admin = createAdminClient()
    const { count } = await admin
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('plan', 'founder')
    ltdRemaining = Math.max(0, 100 - (count ?? 0))
  } catch {}

  const spotsFilled = 100 - ltdRemaining
  const pctFilled = Math.round((spotsFilled / 100) * 100)

  const badgeBg = ltdRemaining < 20 ? '#FEE2E2' : ltdRemaining < 50 ? '#FEF3C7' : '#D1FAE5'
  const badgeText = ltdRemaining < 20 ? '#991B1B' : ltdRemaining < 50 ? '#92400E' : '#065F46'
  const badgeMsg = ltdRemaining < 20
    ? `Only ${ltdRemaining} left!`
    : ltdRemaining < 50
    ? `${ltdRemaining} of 100 spots remaining`
    : `Still available — ${ltdRemaining} of 100 spots`

  return (
    <div className="bg-white min-h-screen">

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <div className="text-center pt-20 pb-16 px-4" style={{ backgroundColor: '#F8F7FF' }}>
        <span
          className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
          style={{ backgroundColor: '#EEEDFE', color: '#534AB7' }}
        >
          Pricing
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Simple pricing
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mx-auto">
          Start free. Grab lifetime access while spots last. Or book a session
          when you&apos;re ready for hands-on help.
        </p>
      </div>

      {/* ── THREE CARDS ─────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pt-12 pb-8">

        {/* LTD badge above cards */}
        <div className="flex justify-center mb-3">
          <span
            className="text-sm font-bold px-5 py-2 rounded-full"
            style={{ backgroundColor: badgeBg, color: badgeText }}
          >
            Limited — {badgeMsg}
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">

          {/* CARD 1 — Free */}
          <div className="bg-white rounded-2xl border-l-4 border-gray-300 border border-gray-200 p-8 flex flex-col shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-gray-900 mb-1">Free</h2>
              <p className="text-gray-400 text-sm">Try RECLAIM with no commitment.</p>
              <div className="mt-4">
                <span className="text-5xl font-black text-gray-900">$0</span>
                <span className="text-gray-400 ml-2">forever</span>
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              {[
                { check: true, text: 'Capacity calculator — unlimited, always free' },
                { check: true, text: '1 AI capacity audit per month' },
                { check: true, text: 'Administrative tax score' },
                { check: true, text: 'Risk signals and recommendations' },
                { check: true, text: 'Google Calendar connection' },
                { check: false, text: 'More than 1 audit/month' },
                { check: false, text: 'Audit history' },
                { check: false, text: 'Future modules' },
              ].map(({ check, text }) => (
                <div key={text} className={`flex items-start gap-3 text-sm ${check ? 'text-gray-700' : 'text-gray-300'}`}>
                  {check ? CHECK : CROSS}
                  {text}
                </div>
              ))}
            </div>

            <Link
              href={user ? '/dashboard' : '/signup'}
              className="block text-center font-bold py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              {user ? 'Go to dashboard' : 'Start free — no card needed'}
            </Link>
            <p className="text-center text-xs text-gray-400 mt-3">No credit card. No time limit.</p>
          </div>

          {/* CARD 2 — Early Access LTD */}
          <div className="bg-white rounded-2xl border-2 border-amber-400 p-8 flex flex-col shadow-lg relative">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-gray-900 mb-1">Early Access</h2>
              <p className="text-gray-500 text-sm">Lock in access before we close this offer.</p>
              <div className="mt-4">
                <span className="text-5xl font-black text-gray-900">$19</span>
                <span className="text-gray-400 ml-2">one-time payment</span>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>{spotsFilled} spots sold</span>
                  <span>{ltdRemaining} remaining</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ width: `${pctFilled}%`, backgroundColor: '#F59E0B' }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              {[
                { check: true, text: 'Everything in Free' },
                { check: true, text: '10 AI audits per month' },
                { check: true, text: 'Audit history — last 30 audits' },
                { check: true, text: 'All future modules — no extra charge' },
                { check: true, text: 'Founding member status' },
                { check: false, text: 'Weekly ops brief email' },
                { check: false, text: 'Unlimited audits' },
              ].map(({ check, text }) => (
                <div key={text} className={`flex items-start gap-3 text-sm ${check ? 'text-gray-700' : 'text-gray-300'}`}>
                  {check ? CHECK : CROSS}
                  {text}
                </div>
              ))}
            </div>

            <a
              href={user ? '/api/stripe/checkout-ltd' : '/signup?next=/api/stripe/checkout-ltd'}
              className="block text-center font-black py-4 rounded-xl transition-all hover:opacity-90 text-gray-900 text-lg"
              style={{ backgroundColor: '#F59E0B' }}
            >
              Get lifetime access — $19
            </a>
            <p className="text-center text-xs text-gray-500 mt-3">
              One payment. 10 audits/month forever.<br />
              Closes permanently at 100 spots.
            </p>
          </div>

          {/* CARD 3 — Strategy Session */}
          <div className="bg-white rounded-2xl border-2 p-8 flex flex-col shadow-sm" style={{ borderColor: '#534AB7' }}>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-gray-900 mb-1">1:1 Strategy Session</h2>
              <p className="text-gray-500 text-sm">Work directly with the founder to implement your capacity audit results.</p>
              <div className="mt-4">
                <span className="text-5xl font-black text-gray-900">$299</span>
                <span className="text-gray-400 ml-2">one-time</span>
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              {[
                '90-minute video call',
                'Review your audit results together',
                'Identify your top 3 process changes',
                '30-day implementation plan',
                'Written action plan delivered after session',
                'Available to anyone — any plan',
                'Scheduling via Calendly',
              ].map(text => (
                <div key={text} className="flex items-start gap-3 text-sm text-gray-700">
                  {CHECK}
                  {text}
                </div>
              ))}
            </div>

            <a
              href="https://calendly.com/initiaops"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center font-bold py-3.5 rounded-xl text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#534AB7' }}
            >
              Book a session
            </a>
            <p className="text-center text-xs text-gray-400 mt-3">
              Limited availability.<br />Responds within 24 hours to confirm.
            </p>
          </div>
        </div>

        {/* ── COMPARISON TABLE ─────────────────────────────────────────── */}
        <div className="mt-16">
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">Plan comparison</h2>
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-white">
                  <th className="text-left px-6 py-4 text-gray-500 font-semibold w-2/5">Feature</th>
                  <th className="px-4 py-4 text-gray-700 font-bold text-center">Free</th>
                  <th className="px-4 py-4 font-bold text-center" style={{ color: '#B45309' }}>Early Access</th>
                  <th className="px-4 py-4 font-bold text-center" style={{ color: '#534AB7' }}>Session</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Capacity calculator', free: 'Unlimited', ltd: 'Unlimited', session: 'Unlimited' },
                  { feature: 'AI audits/month', free: '1', ltd: '10', session: '1 (Free plan)' },
                  { feature: 'Admin tax score', free: '✓', ltd: '✓', session: '✓' },
                  { feature: 'Risk signals', free: '✓', ltd: '✓', session: '✓' },
                  { feature: 'Recommendations', free: '✓', ltd: '✓', session: '✓' },
                  { feature: 'Google Calendar', free: '✓', ltd: '✓', session: '✓' },
                  { feature: 'Audit history', free: '—', ltd: 'Last 30', session: '—' },
                  { feature: 'Future modules', free: '—', ltd: 'All included', session: '—' },
                  { feature: '1:1 founder session', free: '—', ltd: '—', session: '✓' },
                  { feature: 'Written action plan', free: '—', ltd: '—', session: '✓' },
                  { feature: 'Price', free: 'Free', ltd: '$19 once', session: '$299 once' },
                ].map(({ feature, free, ltd, session }, i) => (
                  <tr key={feature} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-6 py-3.5 text-gray-700 font-medium">{feature}</td>
                    <td className="px-4 py-3.5 text-center text-gray-500">{free}</td>
                    <td className="px-4 py-3.5 text-center font-semibold" style={{ color: '#B45309' }}>{ltd}</td>
                    <td className="px-4 py-3.5 text-center font-semibold" style={{ color: '#534AB7' }}>{session}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── AUDIT TOP-UP ─────────────────────────────────────────────── */}
        <div className="mt-16 bg-gray-50 rounded-2xl border border-gray-200 p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Need more audits this month?</h2>
            <p className="text-gray-500">No subscription needed. Just buy more when you need them.</p>
          </div>
          <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
            <p className="text-xl font-black text-gray-900 mb-1">Audit Top-Up Pack</p>
            <p className="text-4xl font-black text-gray-900 my-4">$15 <span className="text-lg font-semibold text-gray-400">one-time</span></p>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Adds 10 audits to your account instantly. Works on any plan.
              No subscription created. Expires at end of current month.
            </p>
            <a
              href={user ? '/api/stripe/checkout-topup' : '/signup?next=/api/stripe/checkout-topup'}
              className="block w-full text-center font-black py-3.5 rounded-xl text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#F59E0B' }}
            >
              Buy 10 more audits — $15
            </a>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            Top-ups are available from your dashboard when you hit your limit. You can also buy them here anytime.
          </p>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">Frequently asked questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'What happens when the 100 LTD spots are gone?',
                a: 'The Early Access offer closes permanently. After that, the only options are the free plan or booking a strategy session.',
              },
              {
                q: 'What counts as one AI audit?',
                a: 'Each time you click "Run Capacity Audit" in your dashboard uses one audit. The free calculator at /calculator never counts toward your limit — it\'s unlimited always.',
              },
              {
                q: 'Can I buy more audits if I hit my limit?',
                a: 'Yes. You can buy a top-up pack of 10 audits for $15 anytime from your dashboard or from this page. Top-ups expire at the end of the month.',
              },
              {
                q: 'What\'s included in the strategy session?',
                a: 'A 90-minute video call with the founder, Kunal Kothari. You\'ll review your RECLAIM audit results together, identify your top 3 process changes, and leave with a written 30-day implementation plan delivered within 24 hours of the call.',
              },
              {
                q: 'Do I need RECLAIM to book a session?',
                a: 'No. You can book a session whether you\'re on the free plan, the LTD, or haven\'t signed up at all. The session stands alone as a consulting service.',
              },
              {
                q: 'Will there be a subscription plan later?',
                a: 'Yes. Once we\'ve validated the product with our founding members we\'ll introduce a Pro subscription with unlimited audits and a weekly ops brief delivered every Monday morning. Early Access members will get priority access and a discount.',
              },
              {
                q: 'What happens to my data?',
                a: 'All data is encrypted at rest and in transit. We use Supabase (SOC 2 compliant) for storage. We never sell your data. Calendar data is only used to power your audits.',
              },
            ].map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-semibold text-gray-900 hover:text-purple-800 transition-colors">
                  {q}
                  <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform text-lg shrink-0">↓</span>
                </summary>
                <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ──────────────────────────────────────────────────── */}
      <div className="py-20 px-4 text-center mt-12" style={{ backgroundColor: '#26215C' }}>
        <h2 className="text-3xl font-black text-white mb-4">Start free today</h2>
        <p className="mb-8 text-lg" style={{ color: '#A9A4E0' }}>No credit card. No time limit. Upgrade when you need more.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:opacity-90 bg-white"
            style={{ color: '#534AB7' }}
          >
            Try free — no card needed
          </Link>
          <a
            href="https://calendly.com/initiaops"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-xl text-lg border transition-all"
            style={{ borderColor: '#7B72D6', color: '#A9A4E0' }}
          >
            Book a strategy session
          </a>
        </div>
      </div>
    </div>
  )
}
