import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Pricing — RECLAIM',
  description: 'Start free. Grab lifetime access before it closes. Or go Pro for unlimited intelligence every week.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing — RECLAIM',
    description: 'Start free. Grab lifetime access before it closes. Or go Pro for unlimited intelligence every week.',
    url: 'https://www.getreclaimapp.com/pricing',
  },
}

const CHECK = <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
const CROSS = <span className="w-5 h-5 text-gray-300 flex items-center justify-center text-sm shrink-0 font-bold">—</span>

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 text-sm text-gray-700">
      {CHECK}
      <span>{children}</span>
    </div>
  )
}

function NoFeature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 text-sm text-gray-400">
      {CROSS}
      <span>{children}</span>
    </div>
  )
}

export default async function PricingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()


  return (
    <div className="bg-white min-h-screen">

      {/* ── HEADER ── */}
      <div className="text-center pt-20 pb-12 px-4" style={{ backgroundColor: '#F8F7FF' }}>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">Simple pricing</h1>
        <p className="text-xl text-gray-500 max-w-xl mx-auto">
          Start free. Grab lifetime access before it closes. Or go Pro for unlimited intelligence every week.
        </p>
      </div>

      {/* ── FOUR CARDS ── */}
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">

          {/* CARD 1 — Free */}
          <div className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col">
            <div className="mb-auto">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Free</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black text-gray-900">$0</span>
              </div>
              <p className="text-sm text-gray-400 mb-5">forever</p>
              <p className="text-sm text-gray-600 mb-5">Try RECLAIM with no commitment.</p>
              <div className="space-y-2.5 mb-6">
                <Feature>Unlimited capacity calculator</Feature>
                <Feature>1 AI capacity audit per month</Feature>
                <Feature>Growth Hours Score</Feature>
                <Feature>Risk signals and recommendations</Feature>
                <Feature>Google Calendar connection</Feature>
                <Feature>DO THIS NOW action instructions</Feature>
                <NoFeature>Weekly ops brief email</NoFeature>
                <NoFeature>Unlimited audits</NoFeature>
                <NoFeature>Audit history</NoFeature>
              </div>
            </div>
            <div>
              <Link
                href="/signup"
                className="block w-full text-center font-bold py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all text-sm"
              >
                Start free — no card needed
              </Link>
              <p className="text-xs text-center text-gray-400 mt-2">No credit card. No time limit.</p>
            </div>
          </div>

          {/* CARD 2 — Early Access LTD */}
          <div className="bg-white rounded-2xl border-2 border-amber-400 p-7 flex flex-col relative">
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap"
              style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
            >
              Limited availability
            </div>
            <div className="mb-auto">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-3">Early Access</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black text-gray-900">$19</span>
              </div>
              <p className="text-sm text-gray-400 mb-1">one-time — yours forever</p>
              <p className="text-sm text-gray-600 mb-5 mt-3">Lock in before this closes permanently.</p>
              <div className="space-y-2.5 mb-6">
                <Feature>Everything in Free</Feature>
                <Feature>10 AI audits per month</Feature>
                <Feature>Audit history — last 30 audits</Feature>
                <Feature>All future modules included</Feature>
                <Feature>Founding member status</Feature>
                <Feature>Top-up packs available ($15 per 10)</Feature>
                <NoFeature>Weekly ops brief email</NoFeature>
                <NoFeature>Unlimited audits</NoFeature>
              </div>
            </div>
            <div>
              <a
                href="/api/stripe/checkout-ltd"
                className="block w-full text-center font-black py-3 rounded-xl text-yellow-900 hover:opacity-90 transition-all text-sm"
                style={{ backgroundColor: '#F59E0B' }}
              >
                Get lifetime access — $19
              </a>
              <p className="text-xs text-center text-gray-400 mt-2">One payment. Closes permanently when Pro launches.</p>
            </div>
          </div>

          {/* CARD 3 — Pro */}
          <div
            className="bg-white rounded-2xl border-2 p-7 flex flex-col relative shadow-md"
            style={{ borderColor: '#534AB7' }}
          >
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-black px-4 py-1 rounded-full text-white whitespace-nowrap"
              style={{ backgroundColor: '#534AB7' }}
            >
              Most popular
            </div>
            <div className="mb-auto">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#534AB7' }}>Pro</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black text-gray-900">$29</span>
              </div>
              <p className="text-sm text-gray-400 mb-5">per month</p>
              <p className="text-sm text-gray-600 mb-5">For operators who want the full intelligence layer — automatically.</p>
              <div className="space-y-2.5 mb-6">
                <Feature>Everything in Free</Feature>
                <Feature>Unlimited AI capacity audits</Feature>
                <Feature>Weekly ops brief — every Monday morning</Feature>
                <Feature>Full audit history</Feature>
                <Feature>Google Calendar integration</Feature>
                <Feature>All 5 industry templates</Feature>
                <Feature>Priority support</Feature>
                <Feature>Cancel anytime</Feature>
              </div>
            </div>
            <div>
              <a
                href="/api/stripe/checkout-pro"
                className="block w-full text-center font-black py-3 rounded-xl text-white hover:opacity-90 transition-all text-sm"
                style={{ backgroundColor: '#534AB7' }}
              >
                Start Pro — $29/month
              </a>
              <p className="text-xs text-center text-gray-400 mt-2">30-day money-back guarantee. Cancel anytime.</p>
            </div>
          </div>

          {/* CARD 4 — Strategy Session */}
          <div className="bg-white rounded-2xl border border-gray-200 p-7 flex flex-col">
            <div className="mb-auto">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Strategy Session</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black text-gray-900">$299</span>
              </div>
              <p className="text-sm text-gray-400 mb-5">one-time</p>
              <p className="text-sm text-gray-600 mb-5">Turn your audit results into a 30-day action plan — with the founder.</p>
              <div className="space-y-2.5 mb-6">
                <Feature>90-minute video call with founder</Feature>
                <Feature>Review your audit results together</Feature>
                <Feature>Identify top 3 process changes</Feature>
                <Feature>30-day written action plan</Feature>
                <Feature>Delivered within 24 hours of call</Feature>
                <Feature>Available on any plan</Feature>
              </div>
            </div>
            <div>
              <a
                href="https://calendly.com/initiaops/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center font-bold py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all text-sm"
              >
                Book a session
              </a>
              <p className="text-xs text-center text-gray-400 mt-2">Book free. Invoice sent after call is confirmed.</p>
            </div>
          </div>

        </div>
      </div>

      {/* ── COMPARISON TABLE ── */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-black text-gray-900 mb-6 text-center">Full comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 pr-6 font-semibold text-gray-500 w-48">Feature</th>
                <th className="text-center py-3 px-4 font-black text-gray-700">Free</th>
                <th className="text-center py-3 px-4 font-black text-amber-700">Early Access</th>
                <th className="text-center py-3 px-4 font-black" style={{ color: '#534AB7' }}>Pro</th>
                <th className="text-center py-3 px-4 font-black text-gray-700">Session</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Capacity calculator', 'Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'],
                ['AI audits/month', '1', '10', 'Unlimited', '1 (Free)'],
                ['Growth Hours Score', true, true, true, true],
                ['DO THIS NOW actions', true, true, true, true],
                ['Google Calendar', true, true, true, true],
                ['Audit history', false, 'Last 30', 'Full', false],
                ['Weekly ops brief', false, false, '✓ Every Monday', false],
                ['All future modules', false, true, 'Early access', false],
                ['Top-up packs', true, true, 'Not needed', true],
                ['1:1 founder session', false, false, false, true],
                ['Price', 'Free', '$19 once', '$29/mo', '$299 once'],
              ].map(([feature, free, ltd, pro, session], i) => (
                <tr key={i} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="py-3 pr-6 font-medium text-gray-700">{feature}</td>
                  {[free, ltd, pro, session].map((val, j) => (
                    <td key={j} className="py-3 px-4 text-center">
                      {val === true ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : val === false ? (
                        <span className="text-gray-300">—</span>
                      ) : (
                        <span className="text-gray-700">{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── TOP-UP SECTION ── */}
      <div className="max-w-2xl mx-auto px-4 pb-12">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-7 text-center">
          <h3 className="text-lg font-black text-gray-900 mb-2">Need extra audits this month?</h3>
          <p className="text-sm text-gray-500 mb-5">
            Buy a top-up pack anytime — 10 additional audits for $15, valid for the current month.
            Available for Free and Early Access users. Already on Pro? You have unlimited audits.
          </p>
          {user ? (
            <a
              href="/api/stripe/checkout-topup"
              className="inline-block font-black px-6 py-2.5 rounded-xl text-yellow-900 text-sm hover:opacity-90 transition-all"
              style={{ backgroundColor: '#F59E0B' }}
            >
              Buy 10 audits — $15
            </a>
          ) : (
            <Link
              href="/signup"
              className="inline-block font-bold px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm hover:bg-white transition-all"
            >
              Sign up first to buy top-ups
            </Link>
          )}
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-2xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">Frequently asked questions</h2>
        <div className="space-y-5">
          {[
            {
              q: "What happens when the 35 LTD spots are gone?",
              a: "The Early Access offer closes permanently the moment the Pro subscription launches to the public. After that, the only options are Free or Pro at $29/month. This is not a marketing tactic — 35 spots is the hard cap.",
            },
            {
              q: "What is the weekly ops brief?",
              a: "A Pro-only feature. Every Monday morning RECLAIM automatically generates a fresh 4-paragraph ops brief based on your latest audit data and delivers it to your inbox. It summarizes your team state, top risk, and one specific action for the week. You don't have to log in — it arrives.",
            },
            {
              q: "Can I upgrade from Free or Early Access to Pro?",
              a: "Yes. Go to your billing page anytime and click Upgrade to Pro. Your Early Access audits don't carry over — Pro gives you unlimited so you won't need them.",
            },
            {
              q: "What's the difference between the calculator and the AI audit?",
              a: "The calculator is pure math — answer 10 questions, get your Growth Hours Score instantly, no AI, no limit, no account. The AI audit uses your specific business context and real calendar data to produce personalized recommendations with exact dollar figures and literal action steps.",
            },
            {
              q: "Can I cancel Pro anytime?",
              a: "Yes. Cancel from your billing page anytime. You keep Pro access until the end of your billing period. No questions asked, no retention flow.",
            },
            {
              q: "What is the strategy session?",
              a: "A 90-minute 1:1 video call with the founder. You bring your audit results, we build your 30-day action plan together. A written plan is delivered within 24 hours. Available to anyone on any plan. Book free on Calendly — invoice sent after confirmation.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-2xl border border-gray-100 p-6">
              <p className="font-bold text-gray-900 mb-2">{q}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="border-t border-gray-100 py-16 px-4 text-center bg-gray-50">
        <h2 className="text-2xl font-black text-gray-900 mb-3">Ready to find out where your time is going?</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm">Start free. No card needed. First audit in under 5 minutes.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="font-black px-8 py-3.5 rounded-xl text-white hover:opacity-90 transition-all"
            style={{ backgroundColor: '#534AB7' }}
          >
            Start free →
          </Link>
          <a
            href="https://calendly.com/initiaops/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold px-8 py-3.5 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-white transition-all"
          >
            Talk to the founder
          </a>
        </div>
      </div>

    </div>
  )
}
