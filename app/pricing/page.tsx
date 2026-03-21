import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function PricingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-center pt-20 pb-12 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mx-auto">
          Start free. Upgrade when you&apos;re ready to remove all limits.
        </p>
      </div>

      {/* Plans */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Free plan */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Free</h2>
              <p className="text-gray-500 text-sm">Perfect for trying it out</p>
            </div>

            <div className="mb-8">
              <span className="text-5xl font-bold text-gray-900">$0</span>
              <span className="text-gray-500 ml-2">/ month</span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {[
                '5 extractions per month',
                'All 9 extraction fields',
                'Copy & download results',
                'Email support',
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="text-green-500 font-bold">✓</span>
                  {feature}
                </li>
              ))}
              {[
                'Unlimited extractions',
                'Priority support',
                'CRM sync (coming soon)',
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="text-gray-300 font-bold">✗</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href={user ? '/dashboard' : '/signup'}
              className="block text-center font-semibold py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {user ? 'Go to Dashboard' : 'Get started free'}
            </Link>
          </div>

          {/* Pro plan */}
          <div
            className="rounded-2xl p-8 flex flex-col relative overflow-hidden"
            style={{ backgroundColor: 'var(--brand)' }}
          >
            {/* Popular badge */}
            <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Most Popular
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1">Pro</h2>
              <p className="text-purple-200 text-sm">For active sales teams</p>
            </div>

            <div className="mb-8">
              <span className="text-5xl font-bold text-white">$49</span>
              <span className="text-purple-200 ml-2">/ month</span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {[
                'Unlimited extractions',
                'All 9 extraction fields',
                'Copy & download results',
                'Priority support',
                'CRM sync (coming soon)',
                'Early access to new features',
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-white">
                  <span className="text-yellow-400 font-bold">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <CheckoutButton user={!!user} />
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Common questions
          </h2>
          <div className="space-y-6 max-w-2xl mx-auto">
            {[
              {
                q: 'What counts as one extraction?',
                a: 'Each time you paste a transcript and click "Extract Intelligence", that uses one extraction. The result you get back counts as one.',
              },
              {
                q: 'Can I cancel at any time?',
                a: 'Yes. Cancel any time from the Billing page inside your dashboard. You keep Pro access until the end of your billing period.',
              },
              {
                q: 'Do free extractions reset each month?',
                a: 'Yes. Your 5 free extractions reset on the 1st of each calendar month.',
              },
              {
                q: 'Is my transcript data stored?',
                a: 'No. Transcripts are sent to OpenAI for processing and are not stored on our servers.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl p-6 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">{q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Separate component so it can be a client button if needed
function CheckoutButton({ user }: { user: boolean }) {
  if (!user) {
    return (
      <Link
        href="/signup"
        className="block text-center font-semibold py-3 rounded-xl bg-white hover:bg-gray-50 transition-colors"
        style={{ color: 'var(--brand)' }}
      >
        Sign up to upgrade
      </Link>
    )
  }

  return (
    <a
      href="/api/stripe/checkout"
      className="block text-center font-semibold py-3 rounded-xl bg-white hover:bg-gray-50 transition-colors"
      style={{ color: 'var(--brand)' }}
    >
      Upgrade to Pro — $49/month
    </a>
  )
}
