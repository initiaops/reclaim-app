import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const ADMIN_EMAIL = 'initiaops@gmail.com'
const PRO_PRICE = 29
const COST_VERCEL = 20
const COST_SUPABASE = 25
const COST_NAMECHEAP = 1.25 // $15/yr amortized
const COST_PER_EXTRACTION = 0.05
const STRIPE_RATE = 0.029
const STRIPE_FIXED_FEE = 0.3

function fmt$(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function getMonthLabel(ym: string) {
  const [y, m] = ym.split('-')
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function getLast6Months(): string[] {
  const months: string[] = []
  const now = new Date()
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }
  return months
}

export default async function AdminPage() {
  // ── Auth gate (layout already verified, this is belt-and-suspenders) ──
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const admin = createAdminClient()

  // Double-check role from DB
  const { data: myRole } = await admin
    .from('subscriptions')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (myRole?.role !== 'admin' && user.email !== ADMIN_EMAIL) redirect('/dashboard')
  const currentMonth = (() => {
    const n = new Date()
    return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}`
  })()

  // ── Fetch all data in parallel ────────────────────────────────
  const [
    { data: { users: allUsers } },
    { data: allSubs },
    { count: totalExtractions },
    { count: monthExtractions },
    { data: usageAll },
    { data: topUsersThisMonth },
  ] = await Promise.all([
    admin.auth.admin.listUsers({ perPage: 1000 }),
    admin.from('subscriptions').select('user_id, plan, status, role, created_at'),
    admin.from('extractions').select('*', { count: 'exact', head: true }),
    admin.from('extractions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', `${currentMonth}-01T00:00:00`),
    admin.from('usage').select('user_id, month, count').order('month', { ascending: false }),
    admin.from('usage')
      .select('user_id, count')
      .eq('month', currentMonth)
      .order('count', { ascending: false })
      .limit(5),
  ])

  // ── Revenue metrics ───────────────────────────────────────────
  const subs = allSubs ?? []
  const proSubs = subs.filter(s => s.plan === 'pro' && s.status === 'active')
  const proCount = proSubs.length
  const totalUserCount = allUsers?.length ?? 0
  const freeCount = totalUserCount - proCount
  const mrr = proCount * PRO_PRICE
  const conversionRate = totalUserCount > 0 ? (proCount / totalUserCount) * 100 : 0

  // ── P&L per month ─────────────────────────────────────────────
  // Group usage by month
  const usageByMonth: Record<string, number> = {}
  for (const row of usageAll ?? []) {
    usageByMonth[row.month] = (usageByMonth[row.month] ?? 0) + row.count
  }

  // We use current pro count as approximation for recent months
  // (In future this could be tracked historically)
  const last6 = getLast6Months()
  const plRows = last6.map((ym) => {
    const extractionsThisMonth = usageByMonth[ym] ?? 0
    // Use current pro count for current month, estimate 0 revenue for past (pre-launch)
    const subsThisMonth = ym === currentMonth ? proCount : 0
    const revenue = subsThisMonth * PRO_PRICE
    const openai = extractionsThisMonth * COST_PER_EXTRACTION
    const stripe = revenue > 0 ? revenue * STRIPE_RATE + subsThisMonth * STRIPE_FIXED_FEE : 0
    const total = COST_VERCEL + COST_SUPABASE + openai + COST_NAMECHEAP + stripe
    const net = revenue - total
    return { ym, revenue, vercel: COST_VERCEL, supabase: COST_SUPABASE, openai, namecheap: COST_NAMECHEAP, stripe, net, extractions: extractionsThisMonth }
  })

  // ── Top 5 users with emails + roles ──────────────────────────
  const emailById: Record<string, string> = {}
  for (const u of allUsers ?? []) {
    emailById[u.id] = u.email ?? u.id.slice(0, 8) + '…'
  }

  // Build plan + role lookups keyed by user_id
  const planById: Record<string, string> = {}
  const roleById: Record<string, string> = {}
  for (const s of subs) {
    planById[s.user_id] = s.plan ?? 'free'
    roleById[s.user_id] = (s as Record<string, string>).role ?? 'user'
  }

  const top5 = (topUsersThisMonth ?? []).map(row => ({
    email: emailById[row.user_id] ?? row.user_id.slice(0, 8) + '…',
    count: row.count,
    isAdmin: roleById[row.user_id] === 'admin' || emailById[row.user_id] === ADMIN_EMAIL,
    isPro: planById[row.user_id] === 'pro',
  }))

  // ── Avg extractions per user per month ────────────────────────
  const monthExtCount = monthExtractions ?? 0
  const avgPerUser = totalUserCount > 0 ? (monthExtCount / totalUserCount).toFixed(1) : '0'

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Business Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">RECLAIM — Admin view · {getMonthLabel(currentMonth)}</p>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200">
            Live data
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">

        {/* ── 1. REVENUE OVERVIEW ────────────────────────────── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Revenue Overview</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'MRR', value: fmt$(mrr), sub: `${proCount} × $${PRO_PRICE}`, color: 'text-green-700', bg: 'bg-green-50' },
              { label: 'Pro Subscribers', value: String(proCount), sub: 'active plans', color: 'text-purple-700', bg: 'bg-purple-50' },
              { label: 'Total Users', value: String(totalUserCount), sub: `${freeCount} free · ${proCount} pro`, color: 'text-blue-700', bg: 'bg-blue-50' },
              { label: 'Conversion Rate', value: `${conversionRate.toFixed(1)}%`, sub: 'free → paid', color: 'text-orange-700', bg: 'bg-orange-50' },
            ].map(({ label, value, sub, color, bg }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-200 p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</p>
                <p className={`text-3xl font-black ${color}`}>{value}</p>
                <p className="text-xs text-gray-400 mt-1">{sub}</p>
                <div className={`mt-3 h-1 rounded-full ${bg}`} />
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. MONTHLY P&L ──────────────────────────────────── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Monthly P&amp;L</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {['Month', 'Revenue', 'Vercel', 'Supabase', 'OpenAI', 'Namecheap', 'Stripe Fees', 'Net Profit'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plRows.map((row, i) => (
                    <tr key={row.ym} className={`border-b border-gray-50 ${i === 0 ? 'bg-purple-50/40' : ''}`}>
                      <td className="px-4 py-3 font-medium text-gray-700 whitespace-nowrap">
                        {getMonthLabel(row.ym)}
                        {i === 0 && <span className="ml-2 text-xs font-bold text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded">current</span>}
                      </td>
                      <td className="px-4 py-3 font-bold text-green-700">{fmt$(row.revenue)}</td>
                      <td className="px-4 py-3 text-gray-500">{fmt$(row.vercel)}</td>
                      <td className="px-4 py-3 text-gray-500">{fmt$(row.supabase)}</td>
                      <td className="px-4 py-3 text-gray-500">
                        {fmt$(row.openai)}
                        <span className="ml-1 text-xs text-gray-400">({row.extractions} ext)</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{fmt$(row.namecheap)}</td>
                      <td className="px-4 py-3 text-gray-500">{fmt$(row.stripe)}</td>
                      <td className={`px-4 py-3 font-black ${row.net >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                        {fmt$(row.net)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Revenue = Pro subscribers × $29 · OpenAI = $0.05/extraction · Stripe = 2.9% + $0.30/sub · All figures auto-calculated
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. USER ACTIVITY ────────────────────────────────── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">User Activity</h2>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Stats */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
              <h3 className="text-sm font-bold text-gray-700">Extraction Stats</h3>
              {[
                { label: 'Extractions this month', value: monthExtCount.toLocaleString() },
                { label: 'Total extractions (all time)', value: (totalExtractions ?? 0).toLocaleString() },
                { label: 'Avg extractions per user this month', value: avgPerUser },
                { label: 'Total registered users', value: totalUserCount.toLocaleString() },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="text-sm font-black text-gray-900">{value}</span>
                </div>
              ))}
            </div>

            {/* Top 5 users */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-700 mb-4">Top Users This Month</h3>
              {top5.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No extractions yet this month.</p>
              ) : (
                <div className="space-y-3">
                  {top5.map((u, i) => (
                    <div key={u.email} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-xs font-black flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="flex-1 text-sm text-gray-700 truncate font-medium">{u.email}</span>
                      {u.isAdmin ? (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                          style={{ backgroundColor: '#EDE9FE', color: 'var(--brand)' }}>
                          🔑 Admin
                        </span>
                      ) : u.isPro ? (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100 shrink-0">
                          👤 Pro
                        </span>
                      ) : (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 shrink-0">
                          Free
                        </span>
                      )}
                      <span className="text-sm font-black text-gray-900 shrink-0">{u.count} ext</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── 4. EXPENSE TRACKER ──────────────────────────────── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Expense Tracker</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Expense', 'Amount', 'Cadence', 'Next Due', 'Status'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Vercel Pro', amount: '$20.00/mo', cadence: 'Monthly', due: 'Auto-renews', status: 'active' },
                  { name: 'Supabase Pro', amount: '$25.00/mo', cadence: 'Monthly', due: 'Auto-renews', status: 'active' },
                  { name: 'OpenAI API', amount: `~${fmt$(monthExtCount * COST_PER_EXTRACTION)}/mo`, cadence: 'Usage-based', due: 'Monthly billing', status: 'active' },
                  { name: 'Namecheap domain (.com)', amount: '$15.18/yr ($1.27/mo)', cadence: 'Annual', due: 'March 2027', status: 'active' },
                  { name: 'Vercel domain (getreclaimapp.com)', amount: 'Included in Pro', cadence: '—', due: '—', status: 'active' },
                  { name: 'Stripe', amount: '2.9% + $0.30/txn', cadence: 'Per transaction', due: 'On charge', status: 'active' },
                ].map(row => (
                  <tr key={row.name} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3 font-medium text-gray-800">{row.name}</td>
                    <td className="px-4 py-3 text-gray-600">{row.amount}</td>
                    <td className="px-4 py-3 text-gray-500">{row.cadence}</td>
                    <td className="px-4 py-3 text-gray-500">{row.due}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <p className="text-xs text-gray-400">Fixed monthly overhead (excl. OpenAI &amp; Stripe)</p>
              <p className="text-sm font-black text-gray-700">
                {fmt$(COST_VERCEL + COST_SUPABASE + COST_NAMECHEAP)}/mo fixed
              </p>
            </div>
          </div>
        </section>

        {/* ── 5. BUSINESS HEALTH CHECKLIST ────────────────────── */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Business Health</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              {/* Column 1 */}
              <div className="p-6 space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Technical &amp; Marketing</h3>
                {[
                  { label: 'Stripe account activated', done: true },
                  { label: 'Live payments enabled', done: true },
                  { label: 'HubSpot OAuth integration live', done: true },
                  { label: 'Google Analytics tracking', done: true },
                  { label: 'Google Search Console verified', done: true },
                  { label: 'Sitemap submitted to GSC', done: true },
                  { label: 'Blog live (3 SEO posts)', done: true },
                  { label: 'Custom domain live', done: true },
                  { label: 'SSL certificate active', done: true },
                  { label: 'Auth confirmation emails configured', done: true },
                ].map(({ label, done }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${done ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {done ? '✓' : '✕'}
                    </span>
                    <span className={`text-sm ${done ? 'text-gray-700' : 'text-gray-500'}`}>{label}</span>
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="p-6 space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Business &amp; Legal</h3>
                {[
                  { label: 'LLC formation', done: false },
                  { label: 'Business bank account', done: false },
                  { label: 'EIN obtained', done: false },
                  { label: 'Accounting software set up', done: false },
                  { label: 'Privacy Policy published', done: true },
                  { label: 'Terms of Service published', done: true },
                  { label: 'First paying customer', done: false },
                  { label: '$1K MRR milestone', done: false },
                  { label: 'Salesforce integration', done: false },
                  { label: 'Pipedrive integration', done: false },
                ].map(({ label, done }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${done ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {done ? '✓' : '✕'}
                    </span>
                    <span className={`text-sm ${done ? 'text-gray-700' : 'text-gray-500'}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <p className="text-xs text-center text-gray-300 pb-4">
          Admin-only · {ADMIN_EMAIL} · Auto-refreshes on page load
        </p>

      </div>
    </div>
  )
}
