import { createClient } from '@/lib/supabase/server'
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
    { count: opsCount },
  ] = await Promise.all([
    supabase
      .from('subscriptions')
      .select('plan, status, created_at, current_period_end, topup_audits')
      .eq('user_id', user.id)
      .single(),
    supabase
      .from('extractions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('mode', 'ops')
      .gte('created_at', startOfMonth()),
  ])

  const plan = sub?.plan ?? 'free'
  const isPro = plan === 'pro' && sub?.status === 'active'
  const isFounder = plan === 'founder'
  const auditsCount = opsCount ?? 0
  const auditLimit = isPro ? 999 : isFounder ? 10 : 1
  const periodEnd = sub?.current_period_end
    ? new Date(sub.current_period_end).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">

        <div>
          <h1 className="text-2xl font-black text-gray-900">Billing &amp; Plan</h1>
          <p className="text-gray-500 mt-1">Manage your subscription and usage.</p>
        </div>

        {/* ── PRO VIEW ── */}
        {isPro && (
          <>
            <div className="bg-white rounded-2xl border-2 p-8" style={{ borderColor: '#534AB7' }}>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span
                    className="text-xs font-black px-3 py-1 rounded-full text-white uppercase tracking-wide"
                    style={{ backgroundColor: '#534AB7' }}
                  >
                    Pro · Unlimited ✓
                  </span>
                  <h2 className="text-2xl font-black text-gray-900 mt-3">Pro</h2>
                  <p className="text-gray-500 text-sm mt-1">Unlimited audits · Weekly ops brief · Active subscription</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-gray-900">$29</p>
                  <p className="text-sm text-gray-400">per month</p>
                </div>
              </div>
              {periodEnd && (
                <p className="text-sm text-gray-500 mb-5">Next billing date: <span className="font-semibold text-gray-700">{periodEnd}</span></p>
              )}
              <div className="border-t border-gray-100 pt-5 space-y-2">
                {['Unlimited AI capacity audits', 'Weekly ops brief — every Monday morning', 'Full audit history', 'All 5 industry templates', 'Priority support'].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="font-bold" style={{ color: '#534AB7' }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <a
                  href="/api/stripe/portal"
                  className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Manage subscription →
                </a>
                <p className="text-xs text-gray-400 mt-2">Cancel anytime from the Stripe portal. Access continues until end of billing period.</p>
              </div>
            </div>
          </>
        )}

        {/* ── FOUNDER / LTD VIEW ── */}
        {isFounder && (
          <>
            <div className="bg-white rounded-2xl border-2 border-amber-400 p-8">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-400 text-yellow-900 uppercase tracking-wide">
                    Early Access — Founding Member ✓
                  </span>
                  <h2 className="text-2xl font-black text-gray-900 mt-3">Early Access</h2>
                  <p className="text-gray-500 text-sm mt-1">10 audits/month · Lifetime access · All future modules included</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-gray-900">$19</p>
                  <p className="text-sm text-gray-400">one-time · paid</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-5 space-y-2">
                {['10 AI audits per month', 'Audit history — last 30 audits', 'All future modules — no extra charge', 'Founding member status', 'No billing date — ever'].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="font-bold text-amber-600">✓</span> {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="text-sm font-black text-gray-900 mb-1">Want unlimited audits + the weekly brief?</p>
              <p className="text-sm text-gray-500 mb-4">Upgrade to Pro for $29/month. Your Early Access status is preserved — you keep your founding member badge.</p>
              <a
                href="/api/stripe/checkout-pro"
                className="inline-block text-sm font-black px-5 py-2.5 rounded-xl text-white hover:opacity-90 transition-all"
                style={{ backgroundColor: '#534AB7' }}
              >
                Upgrade to Pro →
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-black text-gray-900 mb-1">Need more audits this month?</h3>
              <p className="text-sm text-gray-500 mb-4">Buy a top-up pack — 10 audits for $15, valid for the current month.</p>
              <a
                href="/api/stripe/checkout-topup"
                className="inline-block text-sm font-black px-5 py-2.5 rounded-xl text-yellow-900 hover:opacity-90 transition-all"
                style={{ backgroundColor: '#F59E0B' }}
              >
                Buy top-up — $15 for 10 audits
              </a>
            </div>
          </>
        )}

        {/* ── FREE VIEW ── */}
        {!isPro && !isFounder && (
          <>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500 uppercase tracking-wide">Free</span>
                  <h2 className="text-2xl font-black text-gray-900 mt-3">Free Plan</h2>
                  <p className="text-gray-500 text-sm mt-1">1 AI audit per month · Unlimited calculator · No card on file</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-gray-900">$0</p>
                  <p className="text-sm text-gray-400">forever</p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-5 mb-2">
                <p className="text-xs text-gray-400">
                  {auditsCount >= 1 ? `Audit used this month.` : `${1 - auditsCount} audit remaining this month.`}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 flex flex-col">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">Early Access LTD</span>
                <div className="text-2xl font-black text-gray-900 mb-0.5">$19 <span className="text-sm font-normal text-gray-400">once</span></div>
                <p className="text-xs text-amber-700 mb-4">10 audits/month forever</p>
                <ul className="text-xs text-gray-500 space-y-1 mb-5 flex-1">
                  <li>✓ All future modules</li>
                  <li>✓ Founding member status</li>
                  <li>✓ No subscription ever</li>
                </ul>
                <a
                  href="/api/stripe/checkout-ltd"
                  className="block text-center text-sm font-black py-2.5 rounded-xl text-yellow-900 hover:opacity-90 transition-all"
                  style={{ backgroundColor: '#F59E0B' }}
                >
                  Get lifetime access
                </a>
              </div>

              <div className="bg-white rounded-2xl border-2 p-6 flex flex-col" style={{ borderColor: '#534AB7' }}>
                <span className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: '#534AB7' }}>Pro</span>
                <div className="text-2xl font-black text-gray-900 mb-0.5">$29 <span className="text-sm font-normal text-gray-400">/month</span></div>
                <p className="text-xs mb-4" style={{ color: '#534AB7' }}>Unlimited audits + weekly brief</p>
                <ul className="text-xs text-gray-500 space-y-1 mb-5 flex-1">
                  <li>✓ Unlimited AI audits</li>
                  <li>✓ Weekly ops brief every Monday</li>
                  <li>✓ Cancel anytime</li>
                </ul>
                <a
                  href="/api/stripe/checkout-pro"
                  className="block text-center text-sm font-black py-2.5 rounded-xl text-white hover:opacity-90 transition-all"
                  style={{ backgroundColor: '#534AB7' }}
                >
                  Upgrade to Pro
                </a>
              </div>
            </div>
          </>
        )}

        {/* ── Usage this month (for all non-Pro) ── */}
        {!isPro && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-black text-gray-900 mb-4">Usage this month</h3>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">AI capacity audits</p>
              <p className="text-sm font-bold text-gray-900">{auditsCount} / {auditLimit}</p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all"
                style={{
                  width: `${Math.min((auditsCount / auditLimit) * 100, 100)}%`,
                  backgroundColor: '#534AB7',
                }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">Resets on the 1st of each month.</p>
          </div>
        )}

      </div>
    </div>
  )
}
