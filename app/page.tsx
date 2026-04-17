import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import WaitlistForm from './WaitlistForm'

export const metadata: Metadata = {
  title: 'RECLAIM — Operational Intelligence for BizOps & Ops Leaders',
  description:
    "Stop guessing where your team's time goes. RECLAIM maps your team's actual capacity, identifies administrative overhead, and tells you exactly where to redirect bandwidth.",
  alternates: { canonical: '/' },
  openGraph: {
    title: 'RECLAIM — Operational Intelligence for BizOps & Ops Leaders',
    description:
      "Stop guessing where your team's time goes. RECLAIM maps your team's actual capacity, identifies administrative overhead, and tells you exactly where to redirect bandwidth.",
    url: 'https://www.getreclaimapp.com',
    siteName: 'RECLAIM',
    type: 'website',
    images: [
      {
        url: 'https://www.getreclaimapp.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RECLAIM — Operational Intelligence for BizOps & Ops Leaders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RECLAIM — Operational Intelligence for BizOps & Ops Leaders',
    description:
      "Stop guessing where your team's time goes. RECLAIM maps your team's actual capacity, identifies administrative overhead, and tells you exactly where to redirect bandwidth.",
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
    'Operational intelligence platform for BizOps and Ops leaders. Capacity audits, administrative tax scoring, and reallocation recommendations grounded in real calendar data.',
  offers: { '@type': 'Offer', price: '29', priceCurrency: 'USD' },
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
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6 px-4 py-2 rounded-full border"
            style={{ borderColor: '#CECCF5', color: '#534AB7', backgroundColor: '#EEEDFE' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse inline-block"
              style={{ backgroundColor: '#534AB7' }}
            />
            Now in private beta — limited spots
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.06] tracking-tight max-w-4xl mx-auto mb-6">
            Stop guessing where your{' '}
            <span style={{ color: '#534AB7' }}>team&apos;s time goes</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            RECLAIM maps your team&apos;s actual capacity, identifies administrative overhead,
            and tells you exactly where to redirect bandwidth to drive higher-ROI outcomes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <WaitlistForm placeholder="Enter your work email" buttonText="Join the waitlist →" />
          </div>

          <p className="text-sm text-gray-400">
            No credit card required · Free early access · Built by an ops leader
          </p>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────────────── */}
      <section className="py-10 px-4 border-y border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Built for ops teams in
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
            {['Aerospace & Defense', 'BizOps Leaders', 'Program Operations', 'Manufacturing', 'B2B SaaS'].map(label => (
              <span key={label} className="text-sm font-semibold text-gray-400">{label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Your team&apos;s capacity is invisible
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Most ops leaders make resourcing decisions worth millions of dollars using gut
              feel, quarterly surveys, and spreadsheets that don&apos;t survive Monday morning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stat: '72%',
                label: 'of team bandwidth goes to low-ROI administrative work',
                sub: 'Hidden in meetings, status reporting, and manual coordination that could be automated or eliminated.',
              },
              {
                stat: '$1M+',
                label: 'annual cost of misallocated capacity at a 50-person ops team',
                sub: 'Hidden in plain sight — and fixable.',
              },
              {
                stat: '0',
                label: 'tools exist today that show ops leaders actual vs intended capacity allocation',
                sub: 'Until now.',
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
                <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-5" style={{ backgroundColor: '#EEEDFE', color: '#534AB7' }}>
                  1 free audit/month. Unlimited on Pro.
                </span>
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
                <p className="text-center text-xs text-gray-400 mt-3">1 free audit/month. Unlimited on Pro ($29/mo).</p>
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

      {/* ── FEATURES GRID ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Built for ops leaders who run on real data
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
              <h3 className="font-bold text-gray-900 mb-2">Capacity Intelligence Map</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Live view of actual vs intended bandwidth allocation across your team —
                updated weekly from real calendar and project data.
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
              <h3 className="font-bold text-gray-900 mb-2">Weekly Ops Brief</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Monday morning leadership report — auto-generated, written in plain English,
                ready to share. No manual prep required.
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

      {/* ── WAITLIST CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4" style={{ backgroundColor: '#26215C' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Get early access
          </h2>
          <p className="text-lg mb-10" style={{ color: '#A9A4E0' }}>
            RECLAIM is in private beta. We&apos;re onboarding ops teams in cohorts.
            Join the waitlist and be first in line.
          </p>
          <div className="flex justify-center">
            <WaitlistForm placeholder="Enter your work email" buttonText="Request access →" />
          </div>
          <p className="text-sm mt-6" style={{ color: '#7B72D6' }}>
            No spam. No pitch decks. Just an invite when your spot is ready.
          </p>
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
