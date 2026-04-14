import type { Metadata } from 'next'
import Link from 'next/link'
import WaitlistForm from '../WaitlistForm'

export const metadata: Metadata = {
  title: 'About — RECLAIM 2.0 | Built by an Ops Leader',
  description:
    'RECLAIM was built by a 7-year aerospace ops veteran who couldn\'t find a tool that quantified where his team\'s time actually went. So he built it.',
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
                icon: '📐',
                title: 'Quantified over qualitative',
                desc: 'Every insight comes with a number attached. Gut feel is the problem we\'re solving — not a feature we support.',
              },
              {
                icon: '📅',
                title: 'Real data over self-reporting',
                desc: 'Connecting to your actual calendar and project data produces better intelligence than asking people to describe their own workload.',
              },
              {
                icon: '🏗️',
                title: 'Ops-first thinking',
                desc: 'Built by someone who ran the systems, not just studied them. Every feature comes from a real problem faced in real operations work.',
              },
              {
                icon: '🔩',
                title: 'Boring is beautiful',
                desc: 'We build sustainable, reliable tools ops leaders can depend on — not flashy features that don\'t survive contact with operational reality.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm"
              >
                <div className="text-3xl mb-4">{icon}</div>
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
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">The team</h2>
          <div className="rounded-2xl border border-gray-100 p-8 md:p-10 flex flex-col sm:flex-row gap-8 items-start shadow-sm">
            <img
              src="/kunal.jpg"
              alt="Kunal Kothari"
              style={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0,
                border: '3px solid #EEEDFE',
              }}
            />
            <div>
              <p className="font-black text-gray-900 text-xl">Kunal Kothari</p>
              <p className="text-sm mb-4" style={{ color: '#534AB7' }}>
                Founder · Strategy & Operations · Initia Ops LLC
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Before building RECLAIM, Kunal spent 7 years at Pratt &amp; Whitney / RTX in
                aerospace operations — owning program management and governance for a $5M+
                outsourced supplier portfolio across 20+ global vendors, designing capacity
                models and executive dashboards, and leading cross-functional process improvement
                initiatives that standardized workflows and reduced overhead across global teams.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Armed with an MBA from the University of Connecticut and dual degrees in
                engineering and business, he brings operational rigor to every product decision.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                The problem he kept running into: leadership always wanted to know where the
                team&apos;s time was going, and there was never a clean answer. Spreadsheets, gut
                feel, anecdotal evidence — nothing quantified, nothing defensible, nothing that
                could actually change a resourcing decision. RECLAIM is the answer to that problem.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/kkothari-1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: '#534AB7' }}
                >
                  LinkedIn →
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Contact →
                </Link>
              </div>
            </div>
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
            Join the waitlist and get early access when your cohort opens.
          </p>
          <div className="flex justify-center">
            <WaitlistForm placeholder="Enter your work email" buttonText="Join the waitlist →" />
          </div>
        </div>
      </section>

    </div>
  )
}
