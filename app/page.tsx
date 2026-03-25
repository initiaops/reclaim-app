import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'RECLAIM — AI Sales Intelligence | Stop Manual CRM Data Entry',
  description:
    'RECLAIM reads your sales calls and emails and automatically extracts every CRM field in seconds. Save 5 hours a week. Free to try.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'RECLAIM — AI Sales Intelligence | Stop Manual CRM Data Entry',
    description:
      'RECLAIM reads your sales calls and emails and automatically extracts every CRM field in seconds. Save 5 hours a week. Free to try.',
    url: 'https://www.getreclaimapp.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RECLAIM — AI Sales Intelligence | Stop Manual CRM Data Entry',
    description:
      'RECLAIM reads your sales calls and emails and automatically extracts every CRM field in seconds. Save 5 hours a week.',
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
    'RECLAIM reads your sales calls and emails and automatically extracts every CRM field in seconds. Save 5 hours a week. Free to try.',
  offers: {
    '@type': 'Offer',
    price: '49',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '49',
      priceCurrency: 'USD',
      unitText: 'MONTH',
    },
  },
}

export default function Home() {
  return (
    <div className="bg-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="hero-gradient pt-20 pb-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6 px-4 py-2 rounded-full border"
            style={{ borderColor: '#DDD6FE', color: 'var(--brand)', backgroundColor: '#F5F3FF' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse inline-block" />
            AI-Powered Sales Intelligence
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.08] tracking-tight max-w-4xl mx-auto mb-6">
            Stop wasting time on{' '}
            <span className="gradient-text">manual CRM entry</span>
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            RECLAIM reads your sales calls and emails, then instantly extracts
            every field your CRM needs. Your reps get back 5 hours a week.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--brand)' }}
            >
              Start for free
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <a
              href="#before-after"
              className="inline-flex items-center justify-center gap-2 text-gray-700 font-semibold px-8 py-4 rounded-xl text-lg border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-all"
            >
              See it in action
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2"><span className="text-green-500">✓</span> No credit card required</span>
            <span className="hidden sm:block w-px h-4 bg-gray-200" />
            <span className="flex items-center gap-2"><span className="text-green-500">✓</span> 5 free extractions/month</span>
            <span className="hidden sm:block w-px h-4 bg-gray-200" />
            <span className="flex items-center gap-2"><span className="text-green-500">✓</span> Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ───────────────────────── */}
      <section id="before-after" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              From messy notes to clean data
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Paste any transcript or email thread. Get back structured CRM data in seconds.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Before */}
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-gray-100 px-5 py-3 flex items-center gap-3 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Before — Raw transcript</span>
              </div>
              <div className="bg-white p-6">
                <p className="text-sm text-gray-600 leading-relaxed font-mono">
                  [Call 3:42pm] hey sarah yeah so um we&apos;ve been looking at a few tools
                  and honestly the thing is like our reps are spending SO much time on
                  admin. like i said 50 people all drowning in data entry after every
                  call. budget wise we were thinking 40-50k? our CFO mark would need
                  to sign off. oh and we looked at salesforce but their reporting is
                  just... ugh. yeah so maybe we could do a demo with the whole team?
                  tuesday works? anyway reach out and we&apos;ll figure it out.
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            </div>

            {/* After */}
            <div className="rounded-2xl border-2 overflow-hidden shadow-lg" style={{ borderColor: '#DDD6FE' }}>
              <div className="px-5 py-3 flex items-center gap-3 border-b" style={{ backgroundColor: '#F5F3FF', borderColor: '#DDD6FE' }}>
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--brand)' }}>After — RECLAIM extraction</span>
                <span className="ml-auto text-xs text-purple-400">⚡ 4 seconds</span>
              </div>
              <div className="bg-white p-5 grid grid-cols-2 gap-3">
                {[
                  { label: 'Opportunity', value: 'Acme Corp' },
                  { label: 'Budget', value: '$40k–$50k/yr' },
                  { label: 'Decision Maker', value: 'Mark (CFO) + Sarah' },
                  { label: 'Pain Points', value: '50 reps drowning in admin' },
                  { label: 'Next Steps', value: 'Team demo — Tuesday' },
                  { label: 'Deal Stage', value: 'Discovery' },
                  { label: 'Competitors', value: 'Salesforce (rejected)' },
                  { label: 'Sentiment', value: '🟢 Positive' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                    <p className="text-sm font-semibold text-gray-800">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--brand)' }}
            >
              Try it free — takes 30 seconds
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <section id="how-it-works" className="bg-gray-50 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">How it works</h2>
            <p className="text-lg text-gray-500">Three steps. Thirty seconds. Done.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: '📋',
                title: 'Paste your transcript',
                description: 'Copy any sales call recording, Zoom transcript, or email thread and paste it into RECLAIM. Any length, any format.',
              },
              {
                step: '02',
                icon: '🧠',
                title: 'AI extracts the data',
                description: 'GPT-4o reads the content and pulls out buyer name, budget, pain points, next steps, deal stage, competitors, and more.',
              },
              {
                step: '03',
                icon: '✅',
                title: 'Copy into your CRM',
                description: 'Review the clean, structured output and copy it into Salesforce, HubSpot, Pipedrive, or any other CRM in seconds.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-hover"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <div
                  className="inline-block text-xs font-black px-3 py-1 rounded-full mb-4 tracking-widest"
                  style={{ backgroundColor: '#F5F3FF', color: 'var(--brand)' }}
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

      {/* ── WHAT GETS EXTRACTED ──────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">9 fields extracted automatically</h2>
            <p className="text-lg text-gray-500">Everything your CRM needs. Nothing missing.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🏢', label: 'Opportunity Name', desc: 'The company or deal name' },
              { icon: '💰', label: 'Budget / Pricing', desc: 'Any figures discussed' },
              { icon: '👤', label: 'Decision Maker', desc: 'Who holds the authority' },
              { icon: '🎯', label: 'Key Pain Points', desc: 'What the prospect needs to solve' },
              { icon: '📅', label: 'Next Steps', desc: 'Agreed actions and follow-ups' },
              { icon: '📊', label: 'Deal Stage', desc: 'Where this deal stands' },
              { icon: '⚔️', label: 'Competitors', desc: 'Other tools being evaluated' },
              { icon: '💬', label: 'Overall Sentiment', desc: 'Positive, neutral, or negative' },
              { icon: '🎯', label: 'AI Confidence', desc: 'How reliable the extraction is' },
            ].map(({ icon, label, desc }) => (
              <div
                key={label}
                className="flex items-start gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100 card-hover"
              >
                <span className="text-2xl shrink-0">{icon}</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{label}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────── */}
      <section className="py-24 px-4" style={{ backgroundColor: '#F5F3FF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Sales teams love it</h2>
            <p className="text-lg text-gray-500">Here&apos;s what they say after the first week.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "RECLAIM saved my team 3 hours every single day. After every call I click a button and the CRM updates itself. I genuinely don't know how we did it before.",
                name: 'Sarah Chen',
                title: 'VP of Sales',
                company: 'Momentum SaaS',
                initials: 'SC',
                color: '#7C3AED',
              },
              {
                quote: "I was skeptical about AI for sales, but the extraction accuracy blew me away. It picks up context and nuance that I would have missed writing notes by hand.",
                name: 'Marcus Webb',
                title: 'Enterprise AE',
                company: 'CloudBridge',
                initials: 'MW',
                color: '#0D9488',
              },
              {
                quote: "Our deal velocity went up 22% after we stopped spending time on admin. RECLAIM just pays for itself. The ROI conversation is a no-brainer.",
                name: 'Jennifer Park',
                title: 'Sales Director',
                company: 'ScaleHQ',
                initials: 'JP',
                color: '#DC2626',
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 shadow-sm border border-purple-100 card-hover flex flex-col">
                <div className="text-yellow-400 text-lg mb-4">★★★★★</div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.title}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Common questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What CRMs does RECLAIM work with?',
                a: 'RECLAIM works with any CRM because it produces plain-text output that you copy and paste. It is optimized for Salesforce, HubSpot, and Pipedrive. Direct one-click sync is coming in Phase 2.',
              },
              {
                q: 'How accurate is the AI extraction?',
                a: 'Very accurate. RECLAIM uses GPT-4o, the most capable AI model available, and gives you a confidence score with every extraction so you know how reliable the result is. Accuracy is typically 90–97% on clean transcripts.',
              },
              {
                q: 'Is my data secure?',
                a: 'Yes. Transcripts are sent to OpenAI for processing and are not stored on RECLAIM servers. OpenAI does not use API submissions to train their models. Your Supabase account data is stored securely with row-level security.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Absolutely. Cancel from the Billing page in your dashboard with one click. You keep Pro access until the end of the current billing period with no questions asked.',
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-semibold text-gray-900 hover:text-purple-800 transition-colors">
                  {q}
                  <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform text-lg shrink-0">↓</span>
                </summary>
                <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {a}
                </p>
              </details>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--brand)' }}
            >
              Start for free — no credit card needed
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY RECLAIM (SEO) ────────────────────── */}
      <section className="py-20 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">
            Why sales teams choose RECLAIM
          </h2>
          <div className="space-y-8 text-gray-600 text-sm leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-2">The end of manual CRM data entry</h3>
              <p>Most sales reps spend 30–60 minutes after every call doing manual CRM data entry — typing up notes, filling in deal stages, and updating contact records. RECLAIM replaces that entirely. Paste your sales call transcript and our AI sales intelligence engine extracts every field automatically: who the decision maker is, what budget was mentioned, what pain points came up, and exactly what next steps were agreed. No more manual data entry. No more missed information.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Built for HubSpot CRM automation and every major pipeline</h3>
              <p>RECLAIM maps to the way professional sales teams already work. Whether your team runs MEDDIC, BANT, or a custom qualification framework, the fields RECLAIM extracts — decision maker, budget, pain points, next steps, deal stage — align directly with what your CRM needs. With HubSpot CRM automation built in, you can push a complete deal record with one click and never touch HubSpot manually again. Deal stage tracking stays accurate because the data comes from the actual conversation, not from memory.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-2">The fastest way to improve sales rep productivity</h3>
              <p>The best sales teams win because their reps spend more time selling and less time on admin. RECLAIM gives every rep back 5+ hours a week — time that goes directly into more calls, better follow-ups, and faster closes. Better data in your CRM also means better pipeline visibility for managers, more accurate forecasting, and coaching conversations grounded in real call content rather than what a rep remembers to log hours later.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="border-t border-gray-200 py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-xl font-black" style={{ color: 'var(--brand)' }}>RECLAIM</p>
              <p className="text-gray-400 text-sm mt-1">Stop manual data entry. Start selling.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
              <Link href="/pricing" className="hover:text-purple-700 transition-colors">Pricing</Link>
              <Link href="/guide" className="hover:text-purple-700 transition-colors">Guide</Link>
              <Link href="/blog" className="hover:text-purple-700 transition-colors">Blog</Link>
              <Link href="/login" className="hover:text-purple-700 transition-colors">Log in</Link>
              <Link href="/signup" className="hover:text-purple-700 transition-colors">Sign up</Link>
              <Link href="/privacy" className="hover:text-purple-700 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-purple-700 transition-colors">Terms of Service</Link>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-8 pt-8 text-center text-gray-400 text-sm">
            Built with AI. © 2025 RECLAIM. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
