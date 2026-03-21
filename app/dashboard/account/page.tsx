import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AccountPage() {
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

  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account</h1>
          <p className="text-gray-500 mt-1">Your profile and subscription details.</p>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
          {/* Avatar + email */}
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0"
              style={{ backgroundColor: 'var(--brand)' }}
            >
              {(user.email ?? 'U')[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{user.email}</p>
              <p className="text-sm text-gray-400">Member since {joinedDate}</p>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Plan details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Current plan</p>
                <p className="text-lg font-bold text-gray-900 mt-0.5">
                  {isPro ? 'Pro' : 'Free'}
                </p>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide ${
                  isPro
                    ? 'text-white'
                    : 'text-gray-600 bg-gray-100'
                }`}
                style={isPro ? { backgroundColor: 'var(--brand)' } : {}}
              >
                {isPro ? 'Active' : 'Free tier'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Monthly extractions</p>
                <p className="text-lg font-bold text-gray-900 mt-0.5">
                  {isPro ? 'Unlimited' : '5 per month'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Subscription status</p>
                <p className="text-lg font-bold text-gray-900 mt-0.5 capitalize">
                  {sub?.status ?? 'Free'}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Action button */}
          {isPro ? (
            <div className="space-y-3">
              <a
                href="/api/stripe/portal"
                className="block w-full text-center font-semibold py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Manage Subscription
              </a>
              <p className="text-xs text-center text-gray-400">
                Update payment, view invoices, or cancel anytime via Stripe&apos;s secure portal.
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

        <div className="text-center">
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-gray-600">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
