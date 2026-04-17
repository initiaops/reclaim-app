import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import WaitlistForm from '../WaitlistForm'

export const metadata: Metadata = {
  title: 'Pricing — RECLAIM | Start Free',
  description:
    'Free capacity audit included. Pro at $29/month or $149 lifetime. Built for BizOps and ops leaders.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing — RECLAIM | Start Free',
    description:
      'Free capacity audit included. Pro at $29/month or $149 lifetime. Built for BizOps and ops leaders.',
    url: 'https://www.getreclaimapp.com/pricing',
  },
}

export default async function PricingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

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
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mx-auto">
          Start free while we&apos;re in early access. Lock in founder pricing before public launch.
        </p>
      </div>

      {/* ── PLANS ───────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-8 -mt-4">
        <div className="grid md:grid-cols-3 gap-6 items-start">

          {/* Starter — Free */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-1">Starter</h2>
              <p className="text-gray-400 text-sm">Try it out, no card needed</p>
              <div className="mt-4">
                <span className="text-5xl font-black text-gray-900">$0</span>
                <span className="text-gray-400 ml-2">/ month</span>
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">What&apos;s included</p>
              {[
                '1 capacity audit per month',
                'Administrative tax score',
                'Basic reallocation report',
                'Calendar insights (connect Google Calendar)',
                'Email support',
              ].map(f => (
                <div key={f} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                  {f}
                </div>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-4 space-y-3">
                {['Unlimited audits', 'Weekly ops brief', 'Risk signals dashboard', 'Vendor intelligence module'].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-300 flex items-center justify-center text-xs font-bold shrink-0">—</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={user ? '/dashboard' : '/signup'}
              className="block text-center font-bold py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:border-purple-200 hover:bg-purple-50 transition-all"
            >
              {user ? 'Go to Dashboard' : 'Get started free'}
            </Link>
          </div>

          {/* Pro — $29/mo */}
          <div
            className="rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-2xl"
            style={{ backgroundColor: '#534AB7' }}
          >
            <div className="absolute top-5 right-5 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
              Most Popular
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-black text-white mb-1">Pro</h2>
              <p className="text-purple-200 text-sm">For business owners and ops leaders who need weekly intelligence without the enterprise price tag.</p>
              <div className="mt-4">
                <span className="text-5xl font-black text-white">$29</span>
                <span className="text-purple-300 ml-2">/ month</span>
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              <p className="text-xs font-bold text-purple-300 uppercase tracking-wide">Everything in Starter, plus</p>
              {[
                'Unlimited capacity audits',
                'Weekly ops brief (auto-generated)',
                'Google Calendar integration',
                'Reallocation recommendations with $ value',
                'Risk signals dashboard',
                'Vendor intelligence module (Q3 2026)',
                'Priority support',
              ].map(f => (
                <div key={f} className="flex items-center gap-3 text-sm text-white">
                  <span className="w-5 h-5 rounded-full bg-yellow-400 text-yellow-900 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                  {f}
                </div>
              ))}
            </div>

            {user ? (
              <Link
                href="/api/stripe/checkout"
                className="block text-center font-black py-4 rounded-xl bg-white hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-lg"
                style={{ color: '#534AB7' }}
              >
                Upgrade to Pro
              </Link>
            ) : (
              <Link
                href="/signup"
                className="block text-center font-black py-4 rounded-xl bg-white hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-lg"
                style={{ color: '#534AB7' }}
              >
                Start free, upgrade later
              </Link>
            )}

            <p className="text-center text-purple-300 text-xs mt-4">🛡️ 30-day money-back guarantee</p>
          </div>

          {/* Founder LTD — $149 */}
          <div className="bg-white rounded-2xl border-2 p-8 flex flex-col shadow-sm" style={{ borderColor: '#534AB7' }}>
            <div className="mb-8">
              <div
                className="inline-block text-xs font-black px-3 py-1 rounded-full mb-3 uppercase tracking-wide"
                style={{ backgroundColor: '#EEEDFE', color: '#534AB7' }}
              >
                Limited — Lifetime
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Founder</h2>
              <p className="text-gray-400 text-sm">One payment. Forever.</p>
              <div className="mt-4">
                <span className="text-5xl font-black text-gray-900">$149</span>
                <span className="text-gray-400 ml-2">one-time</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                ≈ 5 months of Pro, paid once
              </p>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Everything in Pro, plus</p>
              {[
                'Lifetime Pro access — pay once, use forever',
                'All future modules included',
                'Vendor intelligence module (Q3 2026)',
                'Founding member badge',
                'Direct founder access',
                'Input on product roadmap',
              ].map(f => (
                <div key={f} className="flex items-center gap-3 text-sm text-gray-700">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white"
                    style={{ backgroundColor: '#534AB7' }}
                  >✓</span>
                  {f}
                </div>
              ))}
            </div>

            <Link
              href={user ? '/api/stripe/checkout?plan=founder' : '/signup'}
              className="block text-center font-bold py-3.5 rounded-xl text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#534AB7' }}
            >
              Get Founder access
            </Link>

            <p className="text-center text-gray-400 text-xs mt-3">
              Limited to first 50 founders · {' '}
              <span className="font-semibold" style={{ color: '#534AB7' }}>23 spots left</span>
            </p>
          </div>
        </div>

        {/* Feature comparison */}
        <div className="mt-16 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-black text-gray-900 text-lg">Full feature comparison</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-4 text-gray-500 font-semibold w-2/5">Feature</th>
                <th className="px-4 py-4 text-gray-700 font-bold text-center">Starter</th>
                <th className="px-4 py-4 font-bold text-center" style={{ color: '#534AB7' }}>Pro</th>
                <th className="px-4 py-4 font-bold text-center text-gray-700">Founder</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Capacity audits per month', starter: '1', pro: 'Unlimited', founder: 'Unlimited' },
                { feature: 'Administrative tax score', starter: '✓', pro: '✓', founder: '✓' },
                { feature: 'Reallocation recommendations', starter: 'Basic', pro: 'Full', founder: 'Full' },
                { feature: 'Weekly ops brief', starter: '—', pro: '✓', founder: '✓' },
                { feature: 'Google Calendar integration', starter: '✓', pro: '✓', founder: '✓' },
                { feature: 'Risk signals dashboard', starter: '—', pro: '✓', founder: '✓' },
                { feature: 'Vendor intelligence module', starter: '—', pro: 'Q3 2026', founder: '✓' },
                { feature: 'All future modules', starter: '—', pro: 'Early access', founder: '✓' },
                { feature: 'Support', starter: 'Email', pro: 'Priority', founder: 'Founder channel' },
              ].map(({ feature, starter, pro, founder }, i) => (
                <tr key={feature} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-6 py-3.5 text-gray-700 font-medium">{feature}</td>
                  <td className="px-4 py-3.5 text-center text-gray-400">{starter}</td>
                  <td className="px-4 py-3.5 text-center font-semibold" style={{ color: '#534AB7' }}>{pro}</td>
                  <td className="px-4 py-3.5 text-center text-gray-700 font-medium">{founder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Guarantee */}
        <div className="mt-12 rounded-2xl p-8 text-center border-2 border-dashed border-purple-200" style={{ backgroundColor: '#F8F7FF' }}>
          <div className="text-4xl mb-3">🛡️</div>
          <h3 className="text-xl font-black text-gray-900 mb-2">30-day money-back guarantee</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            If RECLAIM doesn&apos;t deliver for your team in the first 30 days,
            email us for a full refund. No questions asked.
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">Pricing questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'What is a capacity audit?',
                a: 'A capacity audit analyzes your team\'s current workload and time allocation. RECLAIM maps where time is actually going vs where it should go, identifies your administrative tax percentage, and surfaces specific recommendations for redirecting bandwidth to higher-ROI work.',
              },
              {
                q: 'How does the Google Calendar integration work?',
                a: 'Connect your Google Calendar with one click. RECLAIM pulls the last 4 weeks of meeting data, categorizes your time automatically, and uses this real data to power your capacity audit — no self-reporting required.',
              },
              {
                q: 'Can I cancel at any time?',
                a: 'Yes. Cancel from the Billing page in your dashboard. You keep Pro access until the end of your billing period. No questions asked.',
              },
              {
                q: 'What is the Founder plan?',
                a: 'The Founder plan is a lifetime deal — pay $149 once and get Pro features forever, including all future modules. Limited to 50 founding members.',
              },
              {
                q: 'Is there a team plan?',
                a: 'Team plans are on the roadmap for Q3 2026. Email initiaops@gmail.com to get on the early list for team pricing.',
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
        <h2 className="text-3xl font-black text-white mb-4">Ready to get started?</h2>
        <p className="mb-8" style={{ color: '#A9A4E0' }}>Join the waitlist or sign up and start free today.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:opacity-90 bg-white"
            style={{ color: '#534AB7' }}
          >
            Start free
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-xl text-lg border transition-all"
            style={{ borderColor: '#7B72D6', color: '#A9A4E0' }}
          >
            Talk to us
          </Link>
        </div>
      </div>
    </div>
  )
}
