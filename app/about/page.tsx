import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — RECLAIM | Built by an Ops Leader',
  description:
    'RECLAIM was built by an operator who couldn\'t find a tool that quantified where their team\'s time actually went. So they built it.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="pt-20 pb-20 px-4" style={{ backgroundColor: '#F8F7FF' }}>
        <div className="max-w-3xl mx-auto text-center">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-5 px-4 py-2 rounded-full"
            style={{ backgroundColor: '#EEEDFE', color: '#534AB7' }}
          >
            About RECLAIM
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Built by ops people,<br className="hidden sm:block" /> for ops people
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            RECLAIM exists because the most capable ops leaders in the world are making
            resourcing decisions based on incomplete information — not because they&apos;re not
            smart enough, but because no tool has ever given them a clear view of where
            their team&apos;s capacity actually goes.
          </p>
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Our mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Most organizations have no quantified view of where their team&apos;s time actually
              goes. Leaders rely on gut feel, anecdotal evidence, and quarterly surveys to make
              resourcing decisions worth millions of dollars. The result: burnout, misaligned
              priorities, and headcount requests that can&apos;t be defended with data.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              RECLAIM&apos;s mission is to give every ops leader a clear, quantified, real-time
              view of their team&apos;s capacity — so they can make resourcing decisions with
              confidence instead of instinct.
            </p>
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F8F7FF' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">What we believe</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
                  </svg>
                ),
                title: 'Quantified over qualitative',
                desc: 'Every insight comes with a number attached. Gut feel is the problem we\'re solving — not a feature we support.',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                ),
                title: 'Real data over self-reporting',
                desc: 'Connecting to your actual calendar and project data produces better intelligence than asking people to describe their own workload.',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                ),
                title: 'Ops-first thinking',
                desc: 'Built by someone who ran the systems, not just studied them. Every feature comes from a real problem faced in real operations work.',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                ),
                title: 'Boring is beautiful',
                desc: 'We build sustainable, reliable tools ops leaders can depend on — not flashy features that don\'t survive contact with operational reality.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: '#EEEDFE' }}>
                  {icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Built by an operator, for operators</h2>
          <div className="rounded-2xl border border-gray-100 p-8 md:p-10 shadow-sm">
            {/* Photo + name */}
            <div className="flex items-center gap-5 mb-8">
              <div className="shrink-0">
                <Image
                  src="/kunal.jpg"
                  alt="Kunal Kothari"
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                  style={{ border: '3px solid #534AB7' }}
                />
              </div>
              <div>
                <p className="font-black text-gray-900 text-xl leading-tight">Kunal Kothari</p>
                <p className="text-sm text-gray-500 mt-1">Founder · Strategy &amp; Operations · Initia Ops LLC</p>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Before building RECLAIM, I spent 7 years at Pratt &amp; Whitney / RTX in aerospace
              operations — owning program management and governance for a $5M+ outsourced supplier
              portfolio across 20+ global vendors, designing capacity models and executive
              dashboards, and leading cross-functional process improvement initiatives across
              global teams.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              The problem I kept running into: leadership always wanted to know where the team&apos;s
              time was going, and I never had a clean answer. Spreadsheets, gut feel, anecdotal
              evidence — nothing quantified, nothing defensible, nothing that could actually change
              a resourcing decision.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              RECLAIM is the answer to that problem.
            </p>

            {/* Credential pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['MBA — UConn', '7 yrs RTX / P&W', '$5M+ supplier portfolios', 'BizOps & Program Ops'].map(pill => (
                <span
                  key={pill}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: '#EEEDFE', color: '#534AB7' }}
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/kkothari-1/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ color: 'var(--brand)' }}
            >
              Connect on LinkedIn →
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: '#26215C' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to try it?
          </h2>
          <p className="mb-8 text-lg" style={{ color: '#A9A4E0' }}>
            Start free — 1 audit/month, no card needed. Or grab Early Access ($19) while spots last.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-xl text-lg transition-all hover:opacity-90 bg-white"
              style={{ color: '#534AB7' }}
            >
              Try free — no card needed
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center font-semibold px-8 py-4 rounded-xl text-lg border transition-all"
              style={{ borderColor: '#7B72D6', color: '#A9A4E0' }}
            >
              See pricing →
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
