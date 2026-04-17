import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

function startOfMonth(): string {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
}

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [
    { data: sub },
    { data: usageRow },
    { count: opsCount },
  ] = await Promise.all([
    supabase.from('subscriptions').select('plan, status, created_at').eq('user_id', user.id).single(),
    supabase.from('usage').select('count').eq('user_id', user.id)
      .eq('month', `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`).single(),
    supabase.from('extractions').select('*', { count: 'exact', head: true })
      .eq('user_id', user.id).eq('mode', 'ops').gte('created_at', startOfMonth()),
  ])

  const plan = sub?.plan ?? 'free'
  const isPro = plan === 'pro' && sub?.status === 'active'
  const isFounder = plan === 'founder'
  const crmCount = usageRow?.count ?? 0
  const auditsCount = opsCount ?? 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">

        <div>
          <h1 className="text-2xl font-black text-gray-900">Billing & Plan</h1>
          <p className="text-gray-500 mt-1">Manage your subscription and usage.</p>
        </div>

        {/* Current plan card */}
        {isFounder ? (
          <div className="bg-white rounded-2xl border-2 p-8" style={{ borderColor: '#534AB7' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span
                  className="text-xs font-black px-3 py-1 rounded-full text-white uppercase tracking-wide"
                  style={{ backgroundColor: '#534AB7' }}
                >
                  Lifetime Access
                </span>
                <h2 className="text-2xl font-black text-gray-900 mt-3">Founding Member</h2>
                <p className="text-gray-500 text-sm mt-1">Paid once. Yours forever.</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-gray-900">$149</p>
                <p className="text-sm text-gray-400">one-time</p>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-5 space-y-2">
              {['Unlimited capacity audits', 'All future modules included', 'Founder community access', 'No billing date — ever'].map(f => (
                <div key={f} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="font-bold" style={{ color: '#534AB7' }}>✓</span> {f}
                </div>
              ))}
            </div>
          </div>
        ) : isPro ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span
                  className="text-xs font-black px-3 py-1 rounded-full text-white uppercase tracking-wide"
                  style={{ backgroundColor: '#534AB7' }}
                >
                  Active
                </span>
                <h2 className="text-2xl font-black text-gray-900 mt-3">Pro Plan</h2>
                <p className="text-gray-500 text-sm mt-1">Unlimited capacity audits and all modules.</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-gray-900">$29</p>
                <p className="text-sm text-gray-400">per month</p>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-5 space-y-2 mb-6">
              {['Unlimited capacity audits', 'Weekly ops brief', 'HubSpot CRM sync (legacy)', 'All future modules', 'Priority support'].map(f => (
                <div key={f} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="font-bold" style={{ color: '#534AB7' }}>✓</span> {f}
                </div>
              ))}
            </div>
            <a
              href="/api/stripe/portal"
              className="block w-full text-center font-semibold py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm"
            >
              Manage subscription
            </a>
            <p className="text-xs text-center text-gray-400 mt-2">
              Update payment, view invoices, or cancel via Stripe&apos;s secure portal.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500 uppercase tracking-wide">
                  Free — Early Access
                </span>
                <h2 className="text-2xl font-black text-gray-900 mt-3">Free Plan</h2>
                <p className="text-gray-500 text-sm mt-1">1 capacity audit per month. 5 CRM extractions (legacy).</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-gray-900">$0</p>
                <p className="text-sm text-gray-400">per month</p>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-5 mb-6">
              <Link
                href="/pricing"
                className="block w-full text-center font-bold py-3 rounded-xl text-white transition-opacity hover:opacity-90 text-sm"
                style={{ backgroundColor: '#534AB7' }}
              >
                Upgrade to Pro — $29/month
              </Link>
              <p className="text-xs text-center text-gray-400 mt-2">Unlimited audits. Cancel anytime.</p>
            </div>
          </div>
        )}

        {/* Usage this month */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <h3 className="font-black text-gray-900">Usage This Month</h3>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">Capacity audits</p>
              <p className="text-sm font-bold text-gray-900">
                {auditsCount} {!isPro && !isFounder && `/ 1`}
              </p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all"
                style={{
                  width: isPro || isFounder ? '100%' : `${Math.min(auditsCount * 100, 100)}%`,
                  backgroundColor: '#534AB7',
                }}
              />
            </div>
            {!isPro && !isFounder && (
              <p className="text-xs text-gray-400 mt-1">
                {auditsCount >= 1 ? 'Limit reached — upgrade for unlimited' : `${1 - auditsCount} audit remaining`}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">CRM extractions (legacy)</p>
              <p className="text-sm font-bold text-gray-900">
                {crmCount} {!isPro && !isFounder && `/ 5`}
              </p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: isPro || isFounder ? '100%' : `${Math.min((crmCount / 5) * 100, 100)}%`,
                  backgroundColor: '#94A3B8',
                }}
              />
            </div>
          </div>
        </div>

        {/* Billing history link */}
        {(isPro || isFounder) && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-black text-gray-900 mb-3">Billing History</h3>
            <p className="text-sm text-gray-500 mb-4">
              View invoices, download receipts, and manage your payment method.
            </p>
            <a
              href="/api/stripe/portal"
              className="inline-flex items-center gap-2 text-sm font-bold hover:opacity-80 transition-opacity"
              style={{ color: '#534AB7' }}
            >
              Open billing portal →
            </a>
          </div>
        )}

      </div>
    </div>
  )
}
