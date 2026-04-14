import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Use RECLAIM 2.0 — Ops Intelligence Guide',
  description: 'Step-by-step guide to running capacity audits, connecting Google Calendar, and eliminating administrative tax with RECLAIM 2.0.',
  alternates: { canonical: '/guide' },
  openGraph: {
    title: 'How to Use RECLAIM 2.0 — Ops Intelligence Guide',
    description: 'Step-by-step guide to running capacity audits, connecting Google Calendar, and eliminating administrative tax with RECLAIM 2.0.',
    url: 'https://www.getreclaimapp.com/guide',
  },
}

const BRAND = '#534AB7'
const BRAND_LIGHT = '#EEEDFE'

function Check({ color = '#534AB7' }: { color?: string }) {
  return (
    <span
      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0"
      style={{ backgroundColor: color === '#534AB7' ? BRAND_LIGHT : '#FEF9C3', color }}
    >
      ✓
    </span>
  )
}

function Lock() {
  return (
    <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs shrink-0 text-gray-300 font-bold">
      —
    </span>
  )
}

export default function GuidePage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="border-b border-gray-200 py-16 px-4" style={{ backgroundColor: '#F8F7FF' }}>
        <div className="max-w-3xl mx-auto">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
            style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
          >
            User Guide
          </span>
          <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
            How to use RECLAIM 2.0
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
            RECLAIM is an operational intelligence tool that surfaces where your team&apos;s time actually goes,
            identifies the administrative tax eating your capacity, and tells you exactly where to redirect effort.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="#getting-started"
              className="text-sm font-bold px-5 py-2.5 rounded-xl text-white"
              style={{ backgroundColor: BRAND }}
            >
              Getting started →
            </Link>
            <Link
              href="#plans"
              className="text-sm font-bold px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Compare plans
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-20">

        {/* ── What RECLAIM does ─────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-2">What RECLAIM does</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Most ops teams have no idea where capacity actually goes. RECLAIM connects your calendar and
            uses AI to quantify the administrative overhead that blocks real work — then tells you what to do about it.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: '📊',
                title: 'Capacity Audit',
                body: 'Paste a description of your team\'s current workload. The AI diagnoses your administrative tax %, identifies risk signals, and outputs a prioritized action plan.',
              },
              {
                icon: '📅',
                title: 'Calendar Intelligence',
                body: 'Connect Google Calendar to get real meeting load data — no self-reporting. See admin tax calculated from actual events, category breakdowns, and focus time patterns.',
              },
              {
                icon: '⚡',
                title: 'Ops Brief',
                body: 'Every audit generates a 3–4 sentence leadership brief you can copy directly into your weekly standup, Slack, or exec update.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-black text-gray-900 mb-2 text-sm">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Getting started ───────────────────────────────────────────── */}
        <section id="getting-started">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Getting started — step by step</h2>
          <p className="text-gray-500 text-sm mb-8">From zero to your first audit in under 5 minutes.</p>
          <div className="space-y-6">
            {[
              {
                n: '01',
                title: 'Create your account',
                body: 'Go to getreclaimapp.com and click "Join waitlist" or "Log in". Sign up with your email — no credit card required. You\'ll get a confirmation email; click the link to activate, then log in.',
                tag: null,
              },
              {
                n: '02',
                title: 'Connect Google Calendar (optional but recommended)',
                body: 'Go to Settings → Connected Tools → Google Calendar → Connect. You\'ll be asked to authorize read-only access to your calendar. Once connected, RECLAIM syncs the last 28 days of events and automatically calculates your meeting load, admin tax, and focus time blocks.',
                tag: 'Unlocks real data',
              },
              {
                n: '03',
                title: 'Run a Capacity Audit',
                body: 'From the Dashboard, scroll to the audit form. If your calendar is connected, the text box is pre-filled with a summary of your calendar data — just add any context the calendar doesn\'t capture (big projects, team pressures, deadlines). Then click "Run Capacity Audit →".',
                tag: null,
              },
              {
                n: '04',
                title: 'Read your results',
                body: 'In 30–60 seconds you\'ll see: your Administrative Tax % (the share of team time on low-ROI work), a Capacity Gap summary, three Risk Signals, three Reallocation Recommendations each with estimated hours reclaimed per week, an Administrative Tax Breakdown by activity, and a ready-to-copy Weekly Ops Brief.',
                tag: null,
              },
              {
                n: '05',
                title: 'Copy the ops brief',
                body: 'Click "Copy for leadership" on the Weekly Ops Brief card. Paste it directly into your Slack, Google Doc, or executive update. It\'s written to be sent as-is — no editing required.',
                tag: null,
              },
              {
                n: '06',
                title: 'Re-run monthly (or weekly on Pro)',
                body: 'Capacity patterns shift as projects start and end. Run a new audit each month to track your admin tax trend over time. Free users get 1 audit per month. Pro and Founder users get unlimited audits.',
                tag: null,
              },
            ].map(({ n, title, body, tag }) => (
              <div key={n} className="flex gap-5">
                <div
                  className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center text-xs font-black text-white mt-0.5"
                  style={{ backgroundColor: BRAND }}
                >
                  {n}
                </div>
                <div className="pt-1.5">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
                    {tag && (
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: '#DCFCE7', color: '#15803D' }}
                      >
                        {tag}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Understanding your results ────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Understanding your results</h2>
          <p className="text-gray-500 text-sm mb-8">Every audit returns 7 outputs. Here&apos;s what each one means.</p>
          <div className="space-y-3">
            {[
              {
                label: 'Administrative Tax %',
                color: '#534AB7',
                what: 'The percentage of your team\'s total working hours going to low-ROI administrative work — status reports, redundant meetings, manual coordination. Below 25% is healthy. 25–45% warrants attention. Above 45% is critical.',
              },
              {
                label: 'Capacity Gap',
                color: '#D97706',
                what: 'A 1–2 sentence description of the biggest mismatch between where time is going and where it should be going. This is the core finding of the audit.',
              },
              {
                label: 'Risk Signals (×3)',
                color: '#DC2626',
                what: 'Operational risks rated High / Medium / Low severity, each with a one-sentence impact statement. These are the fires that will burn if you don\'t act.',
              },
              {
                label: 'Reallocation Recommendations (×3)',
                color: '#16A34A',
                what: 'Specific actions ranked by priority (Immediate / This week / This month), each with an estimated hours-per-week reclaimed. These are your to-do list.',
              },
              {
                label: 'Weekly Ops Brief',
                color: '#0369A1',
                what: '3–4 sentences written for a leadership audience. Covers state of the team, top risk, and recommended action. Copy it directly into your exec update.',
              },
              {
                label: 'Admin Tax Breakdown',
                color: '#7C3AED',
                what: 'A breakdown of which activities are consuming capacity, each with a % and an automatable flag. Purple bars = activities that can be reduced or automated.',
              },
              {
                label: 'AI Confidence',
                color: '#4B5563',
                what: 'How reliable this analysis is based on the detail you provided. Above 75% is solid. Below 50% usually means more context would help — try adding team size, active projects, and specific pain points.',
              },
            ].map(({ label, color, what }) => (
              <div key={label} className="rounded-xl border border-gray-100 p-4 flex gap-4">
                <div
                  className="w-1 rounded-full shrink-0 self-stretch"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-1">{label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{what}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Calendar integration detail ───────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Google Calendar integration</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            The calendar integration is optional but makes your audits significantly more accurate —
            replacing self-reported estimates with data from your actual schedule.
          </p>
          <div className="bg-gray-50 rounded-2xl border border-gray-100 divide-y divide-gray-100">
            {[
              { q: 'What data does RECLAIM access?', a: 'Read-only access to your primary Google Calendar. RECLAIM reads event titles, start/end times, and attendee counts from the last 28 days. It never reads email content, meeting descriptions, or attachments.' },
              { q: 'What shows up in the Calendar Insights panel?', a: 'Four metric cards (meetings per week, admin tax %, focus blocks per week, busiest day), a time breakdown bar chart by meeting category, and any risk signals detected from your actual calendar data.' },
              { q: 'How are meetings categorized?', a: 'RECLAIM classifies events into: Standup, Sync/Review, 1:1 Meetings, Planning, Recruiting, Company-wide, External/Vendor, Learning, Focus Time, Large Meetings (8+ people), and Operational. Classification uses the event title and attendee count.' },
              { q: 'Does this affect what the AI sees during an audit?', a: 'Yes. When your calendar is connected, the audit form is pre-filled with a plain-text summary of your calendar data, and the AI uses that data as context alongside anything you type. This means recommendations are grounded in your actual schedule, not just your description of it.' },
              { q: 'How do I disconnect?', a: 'Go to Settings → Google Calendar → Disconnect. This immediately deletes all synced event data from RECLAIM\'s database.' },
            ].map(({ q, a }) => (
              <div key={q} className="px-5 py-4">
                <p className="font-semibold text-gray-900 text-sm mb-1">{q}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Plans ─────────────────────────────────────────────────────── */}
        <section id="plans">
          <h2 className="text-2xl font-black text-gray-900 mb-2">What&apos;s included in each plan</h2>
          <p className="text-gray-500 text-sm mb-8">
            All plans include the full audit experience. Paid plans unlock unlimited usage and advanced features.
          </p>

          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200" style={{ backgroundColor: '#F8F7FF' }}>
                  <th className="text-left px-5 py-4 font-semibold text-gray-500 w-1/2">Feature</th>
                  <th className="px-4 py-4 font-bold text-gray-700 text-center">
                    <div>Starter</div>
                    <div className="text-xs font-normal text-gray-400 mt-0.5">Free</div>
                  </th>
                  <th className="px-4 py-4 font-bold text-center" style={{ color: BRAND }}>
                    <div>Pro</div>
                    <div className="text-xs font-normal mt-0.5" style={{ color: '#9CA3AF' }}>$99/mo</div>
                  </th>
                  <th className="px-4 py-4 font-bold text-center text-amber-700">
                    <div>Founder</div>
                    <div className="text-xs font-normal text-gray-400 mt-0.5">$349 lifetime</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    section: 'Core',
                    rows: [
                      { feature: 'Capacity audits per month',        free: '1',         pro: 'Unlimited',  founder: 'Unlimited'  },
                      { feature: 'All 7 audit outputs',              free: true,        pro: true,         founder: true         },
                      { feature: 'AI Confidence score',              free: true,        pro: true,         founder: true         },
                      { feature: 'Copy ops brief to clipboard',      free: true,        pro: true,         founder: true         },
                      { feature: 'Audit history (this session)',     free: true,        pro: true,         founder: true         },
                      { feature: 'Saved audit history',              free: false,       pro: true,         founder: true         },
                    ],
                  },
                  {
                    section: 'Calendar Intelligence',
                    rows: [
                      { feature: 'Google Calendar connection',       free: true,        pro: true,         founder: true         },
                      { feature: 'Calendar Insights panel',          free: true,        pro: true,         founder: true         },
                      { feature: 'Admin tax from real calendar data',free: true,        pro: true,         founder: true         },
                      { feature: 'Meeting category breakdown',       free: true,        pro: true,         founder: true         },
                      { feature: 'Calendar-grounded AI audit',       free: true,        pro: true,         founder: true         },
                    ],
                  },
                  {
                    section: 'Advanced',
                    rows: [
                      { feature: 'API access',                       free: false,       pro: true,         founder: true         },
                      { feature: 'Team reporting (coming soon)',      free: false,       pro: true,         founder: true         },
                      { feature: 'Slack integration (coming soon)',   free: false,       pro: true,         founder: true         },
                      { feature: 'Notion integration (coming soon)', free: false,       pro: true,         founder: true         },
                      { feature: 'Priority support',                 free: false,       pro: true,         founder: true         },
                      { feature: 'Early access to new features',     free: false,       pro: true,         founder: true         },
                      { feature: 'No monthly billing — ever',        free: false,       pro: false,        founder: true         },
                    ],
                  },
                ].map(({ section, rows }) => (
                  <>
                    <tr key={section} className="bg-gray-50">
                      <td colSpan={4} className="px-5 py-2.5 text-xs font-bold text-gray-400 uppercase tracking-wide">
                        {section}
                      </td>
                    </tr>
                    {rows.map(({ feature, free, pro, founder }, i) => (
                      <tr key={feature} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : ''}`}>
                        <td className="px-5 py-3 text-gray-700 text-sm font-medium">{feature}</td>
                        <td className="px-4 py-3 text-center">
                          {free === true ? <div className="flex justify-center"><Check /></div>
                            : free === false ? <div className="flex justify-center"><Lock /></div>
                            : <span className="text-gray-500 text-sm font-semibold">{free}</span>}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {pro === true ? <div className="flex justify-center"><Check /></div>
                            : pro === false ? <div className="flex justify-center"><Lock /></div>
                            : <span className="font-semibold text-sm" style={{ color: BRAND }}>{pro}</span>}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {founder === true ? <div className="flex justify-center"><Check color="#B45309" /></div>
                            : founder === false ? <div className="flex justify-center"><Lock /></div>
                            : <span className="font-semibold text-sm text-amber-700">{founder}</span>}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            <div className="rounded-xl border border-gray-200 p-4 text-center">
              <p className="font-black text-gray-900 text-lg mb-0.5">Starter</p>
              <p className="text-2xl font-black text-gray-900 mb-1">$0</p>
              <p className="text-xs text-gray-400 mb-4">1 audit/month · forever free</p>
              <Link href="/signup" className="block text-center text-sm font-bold py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:border-purple-200 hover:bg-purple-50 transition-all">
                Get started free
              </Link>
            </div>
            <div
              className="rounded-xl p-4 text-center shadow-lg"
              style={{ backgroundColor: BRAND }}
            >
              <p className="font-black text-white text-lg mb-0.5">Pro</p>
              <p className="text-2xl font-black text-white mb-1">$99<span className="text-base font-normal text-purple-200">/mo</span></p>
              <p className="text-xs text-purple-300 mb-4">Unlimited audits · all integrations</p>
              <Link href="/pricing" className="block text-center text-sm font-black py-2.5 rounded-xl bg-white transition-all hover:bg-gray-50" style={{ color: BRAND }}>
                Upgrade to Pro
              </Link>
            </div>
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 text-center">
              <p className="font-black text-amber-900 text-lg mb-0.5">Founder</p>
              <p className="text-2xl font-black text-amber-900 mb-1">$349<span className="text-base font-normal text-amber-600"> once</span></p>
              <p className="text-xs text-amber-600 mb-4">All Pro features · no monthly bill</p>
              <Link href="/pricing" className="block text-center text-sm font-bold py-2.5 rounded-xl bg-amber-400 text-amber-900 hover:bg-amber-500 transition-all">
                Lock in lifetime access
              </Link>
            </div>
          </div>
        </section>

        {/* ── Tips ──────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-8">Tips for better audit results</h2>
          <div className="space-y-4">
            {[
              { title: 'Describe your team, not yourself', body: 'RECLAIM is designed for team-level capacity analysis. Include your team\'s size, roles, and active projects — not just your personal schedule. The more organizational context you give, the more actionable the output.' },
              { title: 'Connect your calendar before running an audit', body: 'The AI performs better when it has real calendar data to anchor against. Self-reported estimates tend to undercount meetings and overcount focus time. Your calendar doesn\'t lie.' },
              { title: 'Name specific bottlenecks', body: 'Instead of "we\'re busy", try "the director is in back-to-back reviews every Monday and Tuesday and no one else has authority to unblock the team". Specificity generates specific recommendations.' },
              { title: 'Mention upcoming pressure', body: 'If there\'s a board meeting, a launch, or a headcount review coming up, mention it. RECLAIM will factor it into the risk signals and adjust the ops brief tone accordingly.' },
              { title: 'Use the confidence score as a quality signal', body: 'Below 60% usually means the input was too vague or too short. The audit will still run, but recommendations will be more generic. Add team size, industry, and a few concrete pain points to push it above 75%.' },
            ].map(({ title, body }) => (
              <div key={title} className="flex gap-4 rounded-2xl p-5 border" style={{ backgroundColor: '#F8F7FF', borderColor: '#DDDAF7' }}>
                <div className="font-black text-lg shrink-0 mt-0.5" style={{ color: BRAND }}>→</div>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-1">{title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-8">Common questions</h2>
          <div className="space-y-5">
            {[
              { q: 'What is administrative tax?', a: 'Administrative tax is the percentage of your team\'s working hours consumed by low-ROI coordination work — status meetings, manual reporting, approval chains, duplicate communication. It\'s the hidden cost of process overhead. Industry benchmarks put healthy teams at 15–25%. Most ops teams run at 35–55% without realizing it.' },
              { q: 'How is the 1 audit/month free limit counted?', a: 'One audit = one time you click "Run Capacity Audit" and get a result. The counter resets on the 1st of each month. Audits that return an error (network failure, etc.) don\'t count against your limit.' },
              { q: 'Is my data private?', a: 'Yes. Your calendar data and audit inputs are never shared with other users or used to train AI models. Calendar data is stored in your Supabase account. You can delete everything at any time from Settings → Google Calendar → Disconnect.' },
              { q: 'Does RECLAIM write anything to my calendar?', a: 'No. RECLAIM only has read-only access to your Google Calendar. It cannot create, edit, or delete events.' },
              { q: 'Can I use RECLAIM without connecting my calendar?', a: 'Yes. The calendar connection is optional. Without it, you\'ll describe your team\'s workload manually in the audit text box. Results will still be high quality — connecting the calendar just adds precision and removes the need for self-reporting.' },
              { q: 'What\'s the difference between the Ops Brief and the Risk Signals?', a: 'Risk Signals are structured data — three individual risks, each with a severity rating and one-sentence impact. The Ops Brief is a narrative — a 3–4 sentence human-readable summary written for leadership consumption. The brief incorporates the risk signals but synthesizes them into a single coherent message.' },
              { q: 'How do I upgrade to Pro or Founder?', a: 'From your Dashboard, click the "Upgrade" prompt, or go to Billing in the navigation. You\'ll be taken to a Stripe checkout page. Subscriptions and one-time purchases are both handled through Stripe — no RECLAIM account holds your payment information.' },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4">
                <p className="font-bold text-gray-900 text-sm mb-1.5">{q}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-10 text-center border"
          style={{ backgroundColor: '#F8F7FF', borderColor: '#DDDAF7' }}
        >
          <p className="font-black text-2xl text-gray-900 mb-2">Ready to run your first audit?</p>
          <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
            Connect your calendar, describe your team, and get a full capacity breakdown in under 60 seconds.
            No credit card required.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: BRAND }}
            >
              Start for free →
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl border-2 border-gray-200 text-gray-700 hover:border-purple-200 hover:bg-white transition-all"
            >
              See pricing
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
