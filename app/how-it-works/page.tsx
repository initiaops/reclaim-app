import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How it works — RECLAIM | Free Calculator + AI Capacity Audit',
  description:
    "Two ways to find out where your team's time is going. The free calculator takes 3 minutes with no signup. The AI audit uses your real calendar data. Both free to start.",
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How it works — RECLAIM | Free Calculator + AI Capacity Audit',
    description:
      "Two ways to find out where your team's time is going. The free calculator takes 3 minutes with no signup. The AI audit uses your real calendar data. Both free to start.",
    url: 'https://www.getreclaimapp.com/how-it-works',
  },
}

const BRAND = '#534AB7'

export default function HowItWorksPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="pt-20 pb-20 px-4" style={{ backgroundColor: '#F8F7FF' }}>
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-5 px-4 py-2 rounded-full"
            style={{ backgroundColor: '#EEEDFE', color: BRAND }}
          >
            How it works
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Operational intelligence that actually fits your life
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            RECLAIM gives you two ways to understand where your team&apos;s capacity is
            going — one that requires nothing, and one that uses your real data.
            Both are free to start.
          </p>
        </div>
      </section>

      {/* ── SECTION 1: THE FREE CALCULATOR ────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="border-l-4 border-green-400 pl-6 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
              Free forever — no account, no limit
            </span>
            <h2 className="text-3xl font-black text-gray-900 mt-5 mb-3">The Capacity Calculator</h2>
            <p className="text-lg text-gray-500 max-w-2xl">
              The fastest way to see your Administrative Tax Score. No AI. No signup.
              No usage limits — ever. Just answer 10 questions and get your results instantly.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 6v6l4 2"/>
                  </svg>
                ),
                bg: 'bg-green-50',
                iconBg: 'bg-green-100',
                title: 'Administrative Tax Score',
                body: "A single number — the percentage of your team's bandwidth going to low-ROI administrative work. Industry average is 40–60%. Most teams don't know theirs.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                ),
                bg: 'bg-green-50',
                iconBg: 'bg-green-100',
                title: 'Dollar cost of overhead',
                body: 'The exact monthly and annual cost of your team\'s administrative overhead — calculated from your team size and average salary. A number you can take to leadership.',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                ),
                bg: 'bg-green-50',
                iconBg: 'bg-green-100',
                title: 'Risk signals and recommendations',
                body: 'Up to 3 operational risk signals detected from your answers, plus specific recommendations ranked by priority.',
              },
            ].map(({ icon, bg, iconBg, title, body }) => (
              <div key={title} className={`rounded-2xl p-6 border border-green-100 ${bg}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
                  {icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* Calculator FAQ */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-10 space-y-5">
            <h3 className="font-black text-gray-900 text-lg mb-6">Calculator FAQ</h3>
            {[
              {
                q: 'Is there really no limit?',
                a: "Correct. The calculator is free forever with no usage limits. Run it as many times as you want for different teams or scenarios. It costs us nothing to run — there's no AI involved, just math.",
              },
              {
                q: 'Do I need to create an account?',
                a: 'No. You can complete the full calculator and see all your results without ever creating an account or giving us your email.',
              },
              {
                q: 'How accurate is it?',
                a: "The calculator is based on your self-reported answers, so it's directionally accurate rather than precise. Think of it as a fast diagnostic — useful for identifying where to look deeper. The AI audit (below) uses your real data for a more precise analysis.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-semibold text-gray-900 hover:text-purple-800 transition-colors text-sm">
                  {q}
                  <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0">↓</span>
                </summary>
                <p className="px-5 pb-4 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-3">{a}</p>
              </details>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-xl border-2 border-green-500 text-green-700 hover:bg-green-50 transition-all text-base"
            >
              Start the free calculator →
            </Link>
            <p className="text-sm text-gray-400">No signup. No limit. Takes 3 minutes.</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THE AI AUDIT ───────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F8F7FF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="pl-6 mb-12" style={{ borderLeft: `4px solid ${BRAND}` }}>
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{ backgroundColor: '#EEEDFE', color: BRAND }}
            >
              1 free audit/month — 10/month on Early Access ($19 one-time)
            </span>
            <h2 className="text-3xl font-black text-gray-900 mt-5 mb-3">The AI Capacity Audit</h2>
            <p className="text-lg text-gray-500 max-w-2xl">
              Goes deeper than the calculator — using your real Google Calendar data and
              AI analysis to produce a precise, personalized capacity audit and a
              leadership-ready weekly ops brief.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                ),
                title: 'Real calendar data',
                body: 'Connect Google Calendar and RECLAIM reads 4 weeks of actual meeting data — no self-reporting required. You see exactly where time went, not where you think it went.',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/>
                  </svg>
                ),
                title: 'Weekly ops brief',
                body: 'A leadership-ready 4-paragraph ops brief generated automatically every Monday morning. Summarizes team state, top risk, and recommended action. Ready to forward to your CEO.',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BRAND} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
                  </svg>
                ),
                title: 'Reallocation recommendations',
                body: 'Specific actions with the estimated hours reclaimed per week and dollar value attached. Not vague suggestions — actionable steps with numbers.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#EEEDFE' }}>
                  {icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* Free vs Paid box */}
          <div className="rounded-2xl p-8 mb-10 border border-purple-100" style={{ backgroundColor: '#EEEDFE' }}>
            <h3 className="font-black text-gray-900 text-lg mb-6">What&apos;s free vs paid</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Free — 1 audit/month</p>
                <ul className="space-y-2.5">
                  {[
                    [true, '1 capacity audit per month'],
                    [true, 'Full results including risk signals'],
                    [true, 'Google Calendar connection'],
                    [true, 'Reallocation recommendations'],
                    [false, 'Weekly automated email brief'],
                    [false, 'More than 1 audit/month'],
                    [false, 'Audit history'],
                  ].map(([included, label], i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm">
                      <span className={`font-bold shrink-0 ${included ? 'text-green-600' : 'text-gray-300'}`}>
                        {included ? '✓' : '✗'}
                      </span>
                      <span className={included ? 'text-gray-700' : 'text-gray-400'}>{label as string}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: BRAND }}>Early Access — $19 one-time</p>
                <ul className="space-y-2.5">
                  {[
                    'Everything in free',
                    '10 capacity audits per month',
                    'Audit history — last 30 audits',
                    'All future modules — no extra charge',
                    'Founding member status',
                  ].map(label => (
                    <li key={label} className="flex items-center gap-2.5 text-sm">
                      <span className="font-bold shrink-0" style={{ color: BRAND }}>✓</span>
                      <span className="text-gray-700">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* AI Audit FAQ */}
          <div className="bg-white rounded-2xl p-8 mb-10 border border-gray-100 space-y-5">
            <h3 className="font-black text-gray-900 text-lg mb-6">AI Audit FAQ</h3>
            {[
              {
                q: 'What does the free audit include?',
                a: 'The full capacity audit — administrative tax score, risk signals, reallocation recommendations, and the ops brief output. Everything. The only limit is 1 audit per month.',
              },
              {
                q: 'What data does RECLAIM access from my calendar?',
                a: "Meeting titles, start/end times, attendee counts, and recurrence patterns from the last 28 days. We never read email content, meeting descriptions, or any personal data. You can disconnect at any time.",
              },
              {
                q: 'Why get Early Access?',
                a: "Early Access gives you 10 audits per month instead of 1, plus audit history and all future modules. It\'s a one-time payment of $19 — no subscription, no renewal. Limited to 100 founding members.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-semibold text-gray-900 hover:text-purple-800 transition-colors text-sm">
                  {q}
                  <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0">↓</span>
                </summary>
                <p className="px-5 pb-4 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-3">{a}</p>
              </details>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-xl text-white transition-all hover:opacity-90 text-base"
              style={{ backgroundColor: BRAND }}
            >
              Start free — no credit card
            </Link>
            <p className="text-sm text-gray-400">1 free audit/month. 10/month on Early Access — $19 one-time.</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: CONSULTATION ───────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="border-l-4 border-amber-400 pl-6 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1.5 rounded-full">
              For teams that want hands-on help
            </span>
            <h2 className="text-3xl font-black text-gray-900 mt-5 mb-3">Work directly with the founder</h2>
            <p className="text-lg text-gray-500 max-w-2xl">
              A structured session to implement RECLAIM&apos;s recommendations in your specific
              context. Useful when you have the data but need help acting on it.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-amber-50 rounded-2xl border-2 border-amber-200 p-8 flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-black text-gray-900 mb-1">SMB Strategy Session</h3>
                <p className="text-sm text-gray-500 mb-5">90 minutes</p>
                <p className="text-4xl font-black text-gray-900 mb-5">$299</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  For small business owners. Review your capacity audit results together,
                  identify your top 3 process changes, and build a 30-day implementation plan.
                </p>
              </div>
              <Link
                href="/contact"
                className="block text-center font-bold py-3.5 rounded-xl border-2 border-amber-500 text-amber-700 hover:bg-amber-100 transition-all"
              >
                Book a session
              </Link>
            </div>

            <div className="bg-amber-50 rounded-2xl border-2 border-amber-200 p-8 flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-black text-gray-900 mb-1">BizOps Ops Review</h3>
                <p className="text-sm text-gray-500 mb-5">3 hours</p>
                <p className="text-4xl font-black text-gray-900 mb-5">$999</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  For ops and BizOps leaders. Full ops audit, capacity mapping, process
                  improvement roadmap, and a leadership presentation template.
                </p>
              </div>
              <Link
                href="/contact"
                className="block text-center font-bold py-3.5 rounded-xl border-2 border-amber-500 text-amber-700 hover:bg-amber-100 transition-all"
              >
                Book a session
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHICH SHOULD I START WITH? ─────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F8F7FF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900">Not sure where to start?</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {/* Green — Calculator */}
            <div className="bg-white rounded-2xl border-2 border-green-200 p-7 flex flex-col">
              <p className="text-sm font-bold text-green-700 mb-5">Start with the calculator if...</p>
              <ul className="space-y-2.5 mb-7 flex-1">
                {[
                  'You want results in 3 minutes',
                  "You don't want to create an account",
                  "You're exploring the concept",
                  'You want to share results with someone',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-400 shrink-0 mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/calculator"
                className="block text-center font-bold py-3 rounded-xl border-2 border-green-500 text-green-700 hover:bg-green-50 transition-all text-sm"
              >
                Try the calculator
              </Link>
            </div>

            {/* Purple — AI Audit */}
            <div className="bg-white rounded-2xl border-2 p-7 flex flex-col" style={{ borderColor: BRAND }}>
              <p className="text-sm font-bold mb-5" style={{ color: BRAND }}>Start with the AI audit if...</p>
              <ul className="space-y-2.5 mb-7 flex-1">
                {[
                  'You want to use your real calendar data',
                  'You have a Google account to connect',
                  'You want a more detailed analysis',
                  'You want the weekly brief',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="shrink-0 mt-0.5" style={{ color: BRAND }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block text-center font-bold py-3 rounded-xl text-white hover:opacity-90 transition-all text-sm"
                style={{ backgroundColor: BRAND }}
              >
                Run an AI audit
              </Link>
            </div>

            {/* Amber — Consultation */}
            <div className="bg-white rounded-2xl border-2 border-amber-200 p-7 flex flex-col">
              <p className="text-sm font-bold text-amber-700 mb-5">Book a consultation if...</p>
              <ul className="space-y-2.5 mb-7 flex-1">
                {[
                  "You've seen your results and need help",
                  'You want a human expert to review',
                  "You're ready to implement changes",
                  'You want a custom action plan',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-amber-500 shrink-0 mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block text-center font-bold py-3 rounded-xl border-2 border-amber-400 text-amber-700 hover:bg-amber-50 transition-all text-sm"
              >
                Book a session
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
