import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'RECLAIM — Find Out Where Your Time Actually Goes',
  description:
    "Find out how much of your week goes to work that isn't growing your business — and what it's costing you. Free capacity calculator, no signup required.",
  alternates: { canonical: '/' },
  openGraph: {
    title: 'RECLAIM — Find Out Where Your Time Actually Goes',
    description:
      "Find out how much of your week goes to work that isn't growing your business — and what it's costing you. Free capacity calculator, no signup required.",
    url: 'https://www.getreclaimapp.com',
    siteName: 'RECLAIM',
    type: 'website',
    images: [
      {
        url: 'https://www.getreclaimapp.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RECLAIM — Find Out Where Your Time Actually Goes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RECLAIM — Find Out Where Your Time Actually Goes',
    description:
      "Find out how much of your week goes to work that isn't growing your business — and what it's costing you. Free capacity calculator, no signup required.",
    images: ['https://www.getreclaimapp.com/og-image.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'RECLAIM',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://www.getreclaimapp.com',
  description:
    'Capacity audit tool for small business owners and operators. Find out where your time goes, what admin overhead costs you, and exactly what to fix first.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function Home() {
  return (
    <div className="bg-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="pt-24 pb-28 px-4" style={{ backgroundColor: '#F8F7FF' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.06] tracking-tight max-w-4xl mx-auto mb-6">
            Stop guessing where your{' '}
            <span style={{ color: '#534AB7' }}>team&apos;s time goes</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            RECLAIM maps your team&apos;s actual capacity, identifies administrative overhead,
            and tells you exactly where to redirect bandwidth to drive higher-ROI outcomes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 font-black px-8 py-4 rounded-xl text-lg text-white transition-all hover:opacity-90 hover:shadow-md"
              style={{ backgroundColor: '#534AB7' }}
            >
              Try free — no card needed
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-lg border-2 border-gray-200 text-gray-700 hover:border-purple-200 hover:bg-purple-50 transition-all"
            >
              See the calculator →
            </Link>
          </div>
          <p className="text-sm text-gray-400">
            No credit card · 1 free audit/month · Built by an ops leader
          </p>
        </div>
      </section>


      {/* ── PROBLEM SECTION ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Most operators are guessing
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Enterprise capacity tools cost $100K and take six months to implement. Spreadsheets go stale by Monday. Most small business owners and ops leaders end up making resourcing decisions on gut feel — because nothing built for their size actually exists.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stat: '3 min',
                label: 'to get your capacity score',
                sub: 'No account, no credit card, no AI required. Answer 10 questions and see your result instantly.',
              },
              {
                stat: '60 sec',
                label: 'to run a full AI audit',
                sub: 'Once your calendar is connected, the AI reads your real data and returns a full audit with dollar figures.',
              },
              {
                stat: '$0',
                label: 'to start',
                sub: 'The calculator is free forever with no usage limit. No signup, no time limit, no catch.',
              },
            ].map(({ stat, label, sub }) => (
              <div
                key={stat}
                className="rounded-2xl p-8 border border-gray-100 bg-gray-50"
              >
                <p className="text-5xl font-black mb-3" style={{ color: '#534AB7' }}>{stat}</p>
                <p className="font-bold text-gray-900 text-base mb-2">{label}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-4" style={{ backgroundColor: '#F8F7FF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#534AB7' }}>How it works</span>
            <h2 className="text-4xl font-black text-gray-900 mt-3 mb-4">
              Two ways to understand your capacity.<br className="hidden sm:block" /> Both free to start.
            </h2>
            <p className="text-lg text-gray-500">
              No credit card. No sales call. No limit on the calculator — ever.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-start">

            {/* LEFT — The Calculator */}
            <div className="bg-white rounded-2xl border-2 border-green-200 p-8 flex flex-col h-full">
              <div className="mb-6">
                <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-green-100 text-green-700 mb-5">
                  Free forever. No limit.
                </span>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-green-100">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="2" width="6" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900">Answer 10 questions</h3>
              </div>

              <ol className="space-y-5 mb-8 flex-1">
                {[
                  "Answer 10 questions about your team's meeting load, manual processes, and how capacity is being used.",
                  "Get your Administrative Tax Score — the percentage of your team's time going to low-ROI work.",
                  "See the dollar cost of that overhead, your top risk signals, and 3 specific recommendations. Instantly.",
                ].map((text, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
                  </li>
                ))}
              </ol>

              <div>
                <Link
                  href="/calculator"
                  className="block text-center font-bold py-3.5 rounded-xl border-2 border-green-500 text-green-700 hover:bg-green-50 transition-all"
                >
                  Try the calculator →
                </Link>
                <p className="text-center text-xs text-gray-400 mt-3">No signup. No limit. Takes 3 minutes.</p>
              </div>
            </div>

            {/* OR divider */}
            <div className="flex md:flex-col items-center justify-center gap-3 py-6 md:pt-24">
              <div className="h-px flex-1 md:h-10 md:w-px md:flex-none bg-gray-200" />
              <span className="text-xs font-bold text-gray-400 bg-white border border-gray-200 rounded-full px-3 py-1.5 shrink-0">or</span>
              <div className="h-px flex-1 md:h-10 md:w-px md:flex-none bg-gray-200" />
            </div>

            {/* RIGHT — The AI Audit */}
            <div className="bg-white rounded-2xl border-2 p-8 flex flex-col h-full" style={{ borderColor: '#534AB7' }}>
              <div className="mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#EEEDFE' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    <circle cx="17" cy="17" r="3"/><path d="m19 19-1.5-1.5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-black text-gray-900">Connect your real data</h3>
              </div>

              <ol className="space-y-5 mb-8 flex-1">
                {[
                  "Connect your Google Calendar or describe your team's current workload. RECLAIM reads your real data.",
                  "AI maps your actual capacity allocation — meeting load, focus time, administrative overhead — in 60 seconds.",
                  "Get a full capacity audit with risk signals, reallocation recommendations with dollar value, and a leadership-ready ops brief.",
                ].map((text, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 text-white"
                      style={{ backgroundColor: '#534AB7' }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
                  </li>
                ))}
              </ol>

              <div>
                <Link
                  href="/signup"
                  className="block text-center font-bold py-3.5 rounded-xl text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#534AB7' }}
                >
                  Run an AI audit →
                </Link>
                <p className="text-center text-xs text-gray-400 mt-3">1 free audit/month. Unlimited on Pro.</p>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-10 text-sm">
            Not sure which to start with? The calculator takes 3 minutes and requires nothing. Start there.{' '}
            <Link href="/calculator" className="font-semibold underline underline-offset-2 hover:text-purple-700 transition-colors" style={{ color: '#534AB7' }}>
              Start the calculator →
            </Link>
          </p>
        </div>
      </section>

      {/* ── SCREENSHOTS ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-4">This is what you actually get</h2>
            <p className="text-lg text-gray-500">Real output from a real audit. No mockups.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                src: '/screenshots/audit-score.png',
                alt: 'Capacity audit score and dollar cost breakdown',
                caption: 'Your score, the dollar cost, and where the time is going',
              },
              {
                src: '/screenshots/recommendations.png',
                alt: 'Specific recommendations with literal action steps and annual dollar impact',
                caption: 'Three actions with exact dollar impact — and literally what to do first',
              },
              {
                src: '/screenshots/ops-brief.png',
                alt: 'Weekly ops brief output in plain English',
                caption: 'A leadership-ready brief you can send without editing',
              },
            ].map(({ src, alt, caption }) => (
              <div key={src} className="flex flex-col gap-3">
                <div
                  className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    onError={undefined}
                  />
                </div>
                <p className="text-xs text-gray-500 text-center leading-relaxed">{caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              What you get
            </h2>
            <p className="text-lg text-gray-500">
              Not another dashboard. Actionable capacity intelligence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div
              className="rounded-2xl p-6 border-2 card-hover"
              style={{ borderColor: '#534AB7', backgroundColor: '#F8F7FF' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#534AB7' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                  <line x1="9" y1="3" x2="9" y2="18"/>
                  <line x1="15" y1="6" x2="15" y2="21"/>
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Capacity Breakdown</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                See exactly where your hours go — meetings, admin, coordination, and
                revenue work — with the percentage and dollar cost attached to each category.
              </p>
            </div>

            <div className="rounded-2xl p-6 border border-gray-100 bg-gray-50 card-hover">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#EEEDFE' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                  <line x1="2" y1="20" x2="22" y2="20"/>
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Administrative Tax Score</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                The exact percentage of your team&apos;s time going to work that shouldn&apos;t
                require a human. Quantified, tracked, and reducible.
              </p>
            </div>

            <div className="rounded-2xl p-6 border border-gray-100 bg-gray-50 card-hover">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#EEEDFE' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="13 17 18 12 13 7"/>
                  <polyline points="6 17 11 12 6 7"/>
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Reallocation Recommendations</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Specific actions with dollar value attached: eliminate this process,
                automate that workflow, redirect this person&apos;s focus.
              </p>
            </div>

            <div className="rounded-2xl p-6 border border-gray-100 bg-gray-50 card-hover">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#EEEDFE' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <line x1="9" y1="12" x2="15" y2="12"/>
                  <line x1="9" y1="16" x2="15" y2="16"/>
                </svg>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-gray-900">Weekly Ops Brief</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Automated delivery — coming soon</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                A plain-English leadership summary generated with every audit — state of the team, top
                risk, and the one action to take this week. Copy and send in one click.
              </p>
            </div>

            <div className="rounded-2xl p-6 border border-gray-100 bg-gray-50 card-hover">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#EEEDFE' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-gray-900">Google Calendar Integration</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Now available</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Connect your calendar and get real meeting load analysis, focus time
                tracking, and administrative overhead — automatically.
              </p>
            </div>

            <div className="rounded-2xl p-6 border border-gray-100 bg-gray-50 card-hover">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#EEEDFE' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/>
                  <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2"/>
                  <rect x="10" y="6" width="4" height="4"/>
                </svg>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-gray-900">Vendor Intelligence</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Coming Q3 2026</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Supplier health scores, SOW compliance tracking, and early warning signals
                for procurement and program ops teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPETITIVE POSITIONING ───────────────────────────────────────── */}
      <section className="py-24 px-4" style={{ backgroundColor: '#F8F7FF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Why not just use a spreadsheet?
            </h2>
            <p className="text-lg text-gray-500">
              The alternatives are either too manual or too heavy. RECLAIM is built for how ops teams actually work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-7 border border-gray-200">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Spreadsheets &amp; Surveys</p>
              <ul className="space-y-3">
                {[
                  'Manual data entry every cycle',
                  'Stale by Monday morning',
                  'No analysis, no recommendations',
                  'Can\'t survive operational reality',
                  'No calendar data',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <span className="mt-0.5 shrink-0 text-gray-300">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-gray-200">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Workday / Planview / ServiceNow</p>
              <ul className="space-y-3">
                {[
                  '6–12 month implementation',
                  '$100K+ contracts',
                  'Requires a dedicated admin team',
                  'Not built for BizOps insights',
                  'Slow to adapt to team changes',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                    <span className="mt-0.5 shrink-0 text-gray-300">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl p-7 border-2" style={{ borderColor: '#534AB7', backgroundColor: '#EEEDFE' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#534AB7' }}>RECLAIM</p>
              <ul className="space-y-3">
                {[
                  'Live capacity intelligence in minutes',
                  'Real calendar data, no self-reporting',
                  'Specific recommendations with $ value',
                  'Built for ops leaders, not IT departments',
                  'Start free in under 60 seconds',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-900 font-medium">
                    <span className="mt-0.5 shrink-0 font-black" style={{ color: '#534AB7' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-10 text-base max-w-2xl mx-auto">
            No implementation team. No six-month rollout. No enterprise contract. Just answers.
          </p>
        </div>
      </section>

      {/* ── PRICING STRIP ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">How to get started</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            <Link href="/signup" className="block rounded-2xl border-2 border-gray-200 p-6 hover:border-gray-300 hover:bg-gray-50 transition-all group">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Free</div>
              <div className="text-2xl font-black text-gray-900 mb-1">$0</div>
              <div className="text-sm font-semibold text-gray-500 mb-4">forever</div>
              <ul className="space-y-1.5 text-sm text-gray-500 mb-6">
                <li>Calculator — unlimited</li>
                <li>1 AI audit/month</li>
                <li>No card needed</li>
              </ul>
              <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">Get started free →</span>
            </Link>

            <Link href="/pricing" className="block rounded-2xl border-2 p-6 hover:bg-purple-50 transition-all group" style={{ borderColor: '#534AB7' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#534AB7' }}>Pro</div>
              <div className="text-2xl font-black text-gray-900 mb-1">$29</div>
              <div className="text-sm font-semibold text-gray-500 mb-4">per month</div>
              <ul className="space-y-1.5 text-sm text-gray-500 mb-6">
                <li>Unlimited audits</li>
                <li>Weekly ops brief</li>
                <li>Cancel anytime</li>
              </ul>
              <span className="text-sm font-bold group-hover:opacity-80" style={{ color: '#534AB7' }}>Start Pro →</span>
            </Link>

            <a href="https://calendly.com/initiaops/30min" target="_blank" rel="noopener noreferrer" className="block rounded-2xl border-2 border-gray-200 p-6 hover:bg-gray-50 transition-all group">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Strategy Session</div>
              <div className="text-2xl font-black text-gray-900 mb-1">$299</div>
              <div className="text-sm font-semibold text-gray-500 mb-4">one-time</div>
              <ul className="space-y-1.5 text-sm text-gray-500 mb-6">
                <li>90 min with founder</li>
                <li>Written action plan</li>
                <li>Any plan, anytime</li>
              </ul>
              <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">Book a session →</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            {/* Founder identity */}
            <div className="flex flex-col items-center mb-6">
              <Image
                src="/kunal.jpg"
                alt="Kunal Kothari"
                width={80}
                height={80}
                className="rounded-full object-cover mb-4"
                style={{ border: '3px solid #534AB7' }}
              />
              <p className="font-black text-gray-900 text-lg leading-tight">Kunal Kothari</p>
              <p className="text-sm text-gray-500 mt-1">Founder, RECLAIM</p>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">Get in touch</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Questions about RECLAIM, early access, or partnership opportunities?
              Reach out directly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            <a
              href="mailto:initiaops@gmail.com"
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 flex items-start gap-4 hover:border-purple-200 hover:bg-purple-50 transition-all group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: '#EEEDFE' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Email</p>
                <p className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors text-sm">initiaops@gmail.com</p>
                <p className="text-xs text-gray-400 mt-1">Usually responds within 24 hours</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/kkothari-1/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 flex items-start gap-4 hover:border-purple-200 hover:bg-purple-50 transition-all group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: '#EEEDFE' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">LinkedIn</p>
                <p className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors text-sm">Kunal Kothari</p>
                <p className="text-xs text-gray-400 mt-1">Connect for ops and BizOps discussions</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 py-10 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p className="font-semibold text-gray-700">RECLAIM by Initia Ops LLC</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/calculator" className="hover:text-gray-700 transition-colors">Calculator</Link>
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms</Link>
            <Link href="/blog" className="hover:text-gray-700 transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-gray-700 transition-colors">Contact</Link>
          </div>
          <p>© 2026 Initia Ops LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
