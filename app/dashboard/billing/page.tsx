import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function BillingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('plan, status, created_at')
    .eq('user_id', user.id)
    .single()

  const isPro = sub?.plan === 'pro' && sub?.status === 'active'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
          <p className="text-gray-500 mt-1">Manage your plan and subscription.</p>
        </div>

        {/* Current plan card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">
                Current Plan
              </p>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isPro ? 'Pro' : 'Free'}
                </h2>
                {isPro && (
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full text-white uppercase tracking-wide"
                    style={{ backgroundColor: 'var(--brand)' }}
                  >
                    Active
                  </span>
                )}
              </div>
              <p className="text-gray-500 mt-2 text-sm">
                {isPro
                  ? 'Unlimited extractions per month. Thank you for being a Pro member.'
                  : '5 extractions per month. Upgrade for unlimited access.'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">
                {isPro ? '$49' : '$0'}
              </p>
              <p className="text-sm text-gray-400">per month</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            {isPro ? (
              <div className="space-y-3">
                <a
                  href="/api/stripe/portal"
                  className="block w-full text-center font-semibold py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Manage Subscription
                </a>
                <p className="text-xs text-center text-gray-400">
                  Update payment method, view invoices, or cancel anytime via Stripe&apos;s secure portal.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/pricing"
                  className="block w-full text-center font-semibold py-3 rounded-xl text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'var(--brand)' }}
                >
                  Upgrade to Pro — $49/month
                </Link>
                <p className="text-xs text-center text-gray-400">
                  Unlimited extractions. Cancel anytime.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* What's included */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">What&apos;s included in Pro</h3>
          <ul className="space-y-2">
            {[
              'Unlimited extractions every month',
              'All 9 CRM fields extracted automatically',
              'Copy & download results in one click',
              'Priority email support',
              'HubSpot CRM sync — one click deal creation',
              'Early access to new features',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                <span style={{ color: 'var(--brand)' }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-gray-600">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
