import type { Metadata } from 'next'
import Link from 'next/link'
import WaitlistForm from '../WaitlistForm'

export const metadata: Metadata = {
  title: 'About — RECLAIM | Operational Intelligence for Revenue Teams',
  description:
    'RECLAIM was built for ops leaders who are tired of making decisions on bad pipeline data. Learn about our mission and the team behind it.',
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
            RECLAIM exists because the most important data in your business —
            what was actually said in your sales calls — was never making it
            into your CRM.
          </p>
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Our mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Revenue ops teams are drowning in spreadsheets, pipeline reviews, and
              forecast calls — all built on data they know is incomplete. Reps log
              calls hours late. Fields get guessed. Context disappears. And the ops
              leader sits in a QBR defending numbers they don&apos;t fully trust.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              RECLAIM&apos;s mission is to give every ops team access to ground-truth
              intelligence — extracted automatically from the conversations that
              actually determine whether a deal closes.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              When the data is right, everything else gets easier: forecasts, coaching,
              territory planning, headcount decisions. That&apos;s what operational
              intelligence should deliver.
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
                icon: '🎯',
                title: 'Source of truth over averages',
                desc: 'Real intelligence comes from what was said in the call, not what a rep remembered to type in three hours later.',
              },
              {
                icon: '⚡',
                title: 'Speed and accuracy together',
                desc: "A CRM update shouldn't take 20 minutes. It should happen in 20 seconds. And it should be more accurate than the manual version.",
              },
              {
                icon: '🔍',
                title: 'Transparency in every extraction',
                desc: 'Every field comes with a confidence score so ops teams know which records to trust and which need a second look.',
              },
              {
                icon: '🏗️',
                title: 'Built for operators, not just sellers',
                desc: "Reps benefit. But the real leverage is with the RevOps and BizOps leaders who need reliable data to run the business.",
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
              <p className="text-sm mb-4" style={{ color: '#534AB7' }}>Founder & CEO</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Kunal has spent his career in revenue operations, sales strategy, and
                go-to-market at fast-growing B2B companies. He built RECLAIM after
                watching ops teams repeatedly fail to get reliable pipeline data from
                their sales reps — not because the reps were lazy, but because the
                tooling made manual logging the only option.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                RECLAIM is his answer: operational intelligence that happens automatically,
                so the humans can focus on decisions instead of data entry.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com/in/kunalkothari"
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
