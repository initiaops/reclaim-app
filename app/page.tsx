import type { Metadata } from 'next'
import Link from 'next/link'
import WaitlistForm from './WaitlistForm'

export const metadata: Metadata = {
  title: 'RECLAIM — Operational Intelligence for BizOps & Ops Leaders',
  description:
    'RECLAIM turns your sales calls, notes, and emails into clean CRM data and pipeline intelligence. Built for ops leaders who run on real information.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'RECLAIM — Operational Intelligence for BizOps & Ops Leaders',
    description:
      'RECLAIM turns your sales calls, notes, and emails into clean CRM data and pipeline intelligence. Built for ops leaders who run on real information.',
    url: 'https://www.getreclaimapp.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RECLAIM — Operational Intelligence for BizOps & Ops Leaders',
    description:
      'RECLAIM turns your sales calls, notes, and emails into clean CRM data and pipeline intelligence. Built for ops leaders who run on real information.',
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
    'Operational intelligence platform for BizOps and Ops leaders. AI-powered CRM extraction, pipeline visibility, and deal intelligence.',
  offers: { '@type': 'Offer', price: '99', priceCurrency: 'USD' },
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
            Ops intelligence for teams that{' '}
            <span style={{ color: '#534AB7' }}>run on real data</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            RECLAIM reads your sales calls, emails, and notes — then extracts
            every CRM field, surfaces deal risks, and gives your ops team the
            ground truth your pipeline is missing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <WaitlistForm placeholder="Enter your work email" buttonText="Join the waitlist →" />
          </div>

          <p className="text-sm text-gray-400">
            No credit card required · Join 400+ ops leaders already on the list
          </p>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────────────── */}
      <section className="py-10 px-4 border-y border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Used by ops and revenue teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
            {['B2B SaaS startups', 'Series A revenue teams', 'RevOps consultants', 'BizOps leaders', 'Sales-led growth orgs'].map(label => (
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
              Your CRM data is lying to you
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              When reps hand-enter call notes hours after the fact, critical context
              gets lost. Ops leaders make forecasts on data they can&apos;t trust.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stat: '67%',
                label: 'of CRM fields are missing or inaccurate',
                sub: 'According to Forrester, most pipeline data is incomplete within 48 hours of a call.',
              },
              {
                stat: '5.4 hrs',
                label: 'per week lost to manual data entry per rep',
                sub: 'Time spent logging calls, updating stages, and filling in fields — not selling.',
              },
              {
                stat: '23%',
                label: 'average pipeline forecast error',
                sub: 'Bad input data creates bad forecasts. Ops teams spend weeks reconciling the gap.',
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">How RECLAIM works</h2>
            <p className="text-lg text-gray-500">
              Paste any sales content. Get structured intelligence in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Paste any sales content',
                description:
                  'Call transcripts, Zoom recordings, email threads, meeting notes — any format, any length. RECLAIM handles it.',
              },
              {
                step: '02',
                title: 'AI extracts the signal',
                description:
                  'GPT-4o reads every line and surfaces deal stage, budget, decision makers, pain points, risks, buying signals, and recommended actions.',
              },
              {
                step: '03',
                title: 'Clean data, instantly',
                description:
                  'Structured CRM fields ready to copy, download, or push directly to HubSpot. One click. Zero manual work.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm card-hover"
              >
                <div
                  className="inline-block text-xs font-black px-3 py-1 rounded-full mb-5 tracking-widest"
                  style={{ backgroundColor: '#EEEDFE', color: '#534AB7' }}
                >
                  STEP {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
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
              Built for ops-led revenue teams
            </h2>
            <p className="text-lg text-gray-500">
              Not just a note taker. Full pipeline intelligence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: '🧠',
                title: 'AI deal extraction',
                desc: 'Pulls 13 structured fields from every call — budget, decision maker, stage, sentiment, next steps, and more.',
              },
              {
                icon: '⚠️',
                title: 'Risk signal detection',
                desc: 'Flags stalled deals, missing stakeholders, budget hesitation, and competitive threats before they become problems.',
              },
              {
                icon: '📊',
                title: 'Pipeline visibility',
                desc: 'Ground-truth data in every CRM field — so your forecasts are built on what was actually said, not what got logged.',
              },
              {
                icon: '🔗',
                title: 'HubSpot CRM sync',
                desc: 'Push deals, contacts, and deal properties to HubSpot with one click. Stage mapping, close date, data quality score included.',
              },
              {
                icon: '📋',
                title: 'Recommended actions',
                desc: 'AI surfaces the right next move for every deal — follow-up, stakeholder expansion, objection handling.',
              },
              {
                icon: '🛡️',
                title: 'Data quality scoring',
                desc: 'Every extraction gets a quality score so your team knows which records are solid and which need attention.',
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-6 border border-gray-100 bg-gray-50 card-hover"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
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

      {/* ── FOUNDER CARD ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-gray-100 p-8 md:p-10 flex flex-col sm:flex-row gap-8 items-start">
            <img
              src="/kunal.jpg"
              alt="Kunal Kothari"
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0,
                border: '3px solid #EEEDFE',
              }}
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#534AB7' }}>
                From the founder
              </p>
              <p className="text-gray-700 text-base leading-relaxed mb-5">
                &ldquo;I built RECLAIM because I spent years watching revenue ops teams
                make critical decisions on data they secretly knew wasn&apos;t reliable.
                Call notes logged late, fields guessed, context lost. RECLAIM is the
                tool I wish I had — operational intelligence built from the source of
                truth: the actual conversation.&rdquo;
              </p>
              <div>
                <p className="font-bold text-gray-900">Kunal Kothari</p>
                <p className="text-gray-400 text-sm">Founder, RECLAIM · Revenue Operations</p>
                <a
                  href="https://linkedin.com/in/kunalkothari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold mt-2 hover:opacity-80 transition-opacity"
                  style={{ color: '#534AB7' }}
                >
                  LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Get in touch</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Questions about RECLAIM 2.0, early access, or partnership opportunities?
              Reach out directly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            {/* Email */}
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
                <p className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">initiaops@gmail.com</p>
                <p className="text-xs text-gray-400 mt-1">Usually responds within 24 hours</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/kkothari-1/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 flex items-start gap-4 hover:border-purple-200 hover:bg-purple-50 transition-all group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 font-black text-sm"
                style={{ backgroundColor: '#EEEDFE', color: '#534AB7' }}
              >
                in
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">LinkedIn</p>
                <p className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">Kunal Kothari</p>
                <p className="text-xs text-gray-400 mt-1">Connect for ops and BizOps discussions</p>
              </div>
            </a>
          </div>

          <p className="text-center text-sm text-gray-400">
            Prefer a call?{' '}
            <Link href="/contact" className="hover:text-purple-700 transition-colors underline underline-offset-2">
              Book a 20-minute intro at getreclaimapp.com/contact
            </Link>
          </p>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 py-10 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p className="font-semibold text-gray-700">RECLAIM 2.0 by Initia Ops LLC</p>
          <div className="flex flex-wrap justify-center gap-6">
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
