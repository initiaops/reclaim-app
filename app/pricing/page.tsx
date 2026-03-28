import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ProUpgradeSection from './ProUpgradeSection'

export const metadata: Metadata = {
  title: 'Pricing — RECLAIM AI Sales Tool | Free & Pro Plans',
  description:
    'Start free with 5 extractions per month. Upgrade to Pro for $49/month for unlimited extractions and HubSpot CRM sync.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing — RECLAIM AI Sales Tool | Free & Pro Plans',
    description:
      'Start free with 5 extractions per month. Upgrade to Pro for $49/month for unlimited extractions and HubSpot CRM sync.',
    url: 'https://www.getreclaimapp.com/pricing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — RECLAIM AI Sales Tool | Free & Pro Plans',
    description:
      'Start free with 5 extractions per month. Upgrade to Pro for $49/month for unlimited extractions and HubSpot CRM sync.',
  },
}

export default async function PricingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="bg-white min-h-screen">

      {/* Header */}
      <div className="hero-gradient text-center pt-20 pb-16 px-4">
        <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
          style={{ backgroundColor: '#EDE9FE', color: 'var(--brand)' }}>
          Pricing
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mx-auto">
          Start free. Upgrade when you&apos;re ready to remove all limits.
        </p>
      </div>

      {/* Plans */}
      <div className="max-w-5xl mx-auto px-4 pb-8 -mt-4">
        <div className="grid md:grid-cols-2 gap-6 items-start">

          {/* Free plan */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-gray-900 mb-1">Free</h2>
              <p className="text-gray-500 text-sm">Perfect for trying it out</p>
              <div className="mt-4">
                <span className="text-5xl font-black text-gray-900">$0</span>
                <span className="text-gray-400 ml-2">/ month</span>
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">What&apos;s included</p>
              {[
                '5 extractions per month',
                'All 9 CRM fields extracted',
                'Copy & download results',
                'Email support',
              ].map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                  {f}
                </div>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-4 space-y-3">
                {['Unlimited extractions', 'Priority support', 'HubSpot CRM sync'].map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-300 flex items-center justify-center text-xs font-bold shrink-0">✗</span>
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

          {/* Pro plan */}
          <div className="rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(145deg, #4C1D95 0%, #6D28D9 100%)' }}>
            {/* Badge */}
            <div className="absolute top-5 right-5 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
              Most Popular
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-black text-white mb-1">Pro</h2>
              <p className="text-purple-300 text-sm">For active sales teams</p>
              <div className="mt-4">
                <span className="text-5xl font-black text-white">$49</span>
                <span className="text-purple-300 ml-2">/ month</span>
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              <p className="text-xs font-bold text-purple-400 uppercase tracking-wide">Everything in Free, plus</p>
              {[
                'Unlimited extractions',
                'All 9 CRM fields extracted',
                'Persistent extraction history',
                'Priority email & chat support',
                'Early access to new features',
                'HubSpot CRM sync included',
              ].map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-white">
                  <span className="w-5 h-5 rounded-full bg-yellow-400 text-yellow-900 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                  {f}
                </div>
              ))}
            </div>

            {user ? (
              <ProUpgradeSection />
            ) : (
              <Link
                href="/signup"
                className="block text-center font-black py-4 rounded-xl bg-white hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-lg"
                style={{ color: 'var(--brand)' }}
              >
                Start free, upgrade later
              </Link>
            )}

            {/* Money back */}
            <p className="text-center text-purple-300 text-xs mt-4 flex items-center justify-center gap-1.5">
              <span>🛡️</span> 30-day money-back guarantee
            </p>
          </div>
        </div>

        {/* CRM compatibility */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400 mb-4 font-medium uppercase tracking-wide">Works with your CRM</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM', 'Close', 'Any CRM'].map((crm) => (
              <span
                key={crm}
                className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 text-gray-600 bg-gray-50"
              >
                {crm}
              </span>
            ))}
          </div>
        </div>

        {/* Feature comparison table */}
        <div className="mt-16 bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-black text-gray-900 text-lg">Full feature comparison</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-6 py-4 text-gray-500 font-semibold w-1/2">Feature</th>
                <th className="px-6 py-4 text-gray-700 font-bold text-center">Free</th>
                <th className="px-6 py-4 font-bold text-center" style={{ color: 'var(--brand)' }}>Pro</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Monthly extractions', free: '5', pro: 'Unlimited' },
                { feature: 'All 9 extraction fields', free: '✓', pro: '✓' },
                { feature: 'Copy & download results', free: '✓', pro: '✓' },
                { feature: 'Extraction history (saved)', free: '—', pro: 'Last 50' },
                { feature: 'AI confidence score', free: '✓', pro: '✓' },
                { feature: 'Support', free: 'Email', pro: 'Priority' },
                { feature: 'HubSpot CRM sync', free: '—', pro: '✓ Included' },
                { feature: 'Early access to features', free: '—', pro: '✓' },
              ].map(({ feature, free, pro }, i) => (
                <tr key={feature} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-6 py-3.5 text-gray-700 font-medium">{feature}</td>
                  <td className="px-6 py-3.5 text-center text-gray-400">{free}</td>
                  <td className="px-6 py-3.5 text-center font-semibold" style={{ color: free === pro ? 'inherit' : 'var(--brand)' }}>{pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Guarantee */}
        <div className="mt-12 rounded-2xl p-8 text-center border-2 border-dashed border-purple-200" style={{ backgroundColor: '#F5F3FF' }}>
          <div className="text-4xl mb-3">🛡️</div>
          <h3 className="text-xl font-black text-gray-900 mb-2">30-day money-back guarantee</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            If RECLAIM doesn&apos;t save your team time in the first 30 days,
            email us and we&apos;ll refund every penny. No questions asked.
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">Pricing questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'What counts as one extraction?',
                a: 'Each time you paste a transcript and click "Extract Intelligence", that uses one extraction. The results you get back — all 9 fields — count as one.',
              },
              {
                q: 'Can I cancel at any time?',
                a: 'Yes. Cancel from the Billing page in your dashboard. You keep Pro access until the end of your current billing period with no penalties.',
              },
              {
                q: 'What happens if I exceed my free limit?',
                a: 'The extraction button becomes disabled and you see an upgrade prompt. Your account and all previous results are safe — you just need to upgrade or wait for the monthly reset.',
              },
              {
                q: 'Do free extractions reset each month?',
                a: 'Yes. Your 5 free extractions reset automatically on the 1st of each calendar month.',
              },
              {
                q: 'Is there a team or annual plan?',
                a: 'Not yet. Team plans and annual discounts are on the roadmap. Email us at hello@getreclaimapp.com and we\'ll work something out.',
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

      {/* Bottom CTA */}
      <div className="py-20 px-4 text-center" style={{ backgroundColor: '#F5F3FF' }}>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Ready to get your team 5 hours back?</h2>
        <p className="text-gray-500 mb-8">Start free. No credit card required.</p>
        <Link
          href={user ? '/api/stripe/checkout' : '/signup'}
          className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-lg"
          style={{ backgroundColor: 'var(--brand)' }}
        >
          {user ? 'Upgrade to Pro' : 'Start for free'}
        </Link>
      </div>
    </div>
  )
}
