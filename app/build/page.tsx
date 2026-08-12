import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How RECLAIM was built',
  description:
    'Architecture, technical decisions, and tradeoffs behind RECLAIM. Built solo.',
  alternates: { canonical: '/build' },
}

const BRAND = '#534AB7'
const BRAND_LIGHT = '#EEEDFE'

export default function BuildPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* HERO */}
      <div className="border-b border-gray-200 py-20 px-4" style={{ backgroundColor: '#F8F7FF' }}>
        <div className="max-w-2xl mx-auto">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-5 px-4 py-1.5 rounded-full"
            style={{ backgroundColor: BRAND_LIGHT, color: BRAND }}
          >
            Behind the product
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-5 leading-tight">
            How RECLAIM was built
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-6">
            This page covers the architecture, the decisions I made while building it,
            and what I&apos;d do differently if I started over.
          </p>
          <p className="text-sm font-semibold text-gray-400">Kunal Kothari · Founder</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16 space-y-20">

        {/* SECTION 1: THE STACK */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-8" style={{ color: BRAND }}>The stack</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200" style={{ backgroundColor: '#F8F7FF' }}>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">Layer</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">Technology</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  {
                    layer: 'Frontend',
                    tech: 'Next.js 14 (App Router)',
                    why: 'Server components keep API keys server-side and reduce how much code ships to the browser. The file-based routing also meant less config to figure out.',
                  },
                  {
                    layer: 'Database & Auth',
                    tech: 'Supabase (Postgres)',
                    why: "The data is relational. Users have subscriptions, subscriptions have limits, audits belong to users. Postgres fits that structure well. Firebase's document store would've made those relationships harder to query. Supabase gave me Postgres plus auth plus row-level security without managing my own backend.",
                  },
                  {
                    layer: 'AI',
                    tech: 'OpenAI GPT-4o (temp 0.2)',
                    why: "GPT-4o follows complex instructions more reliably than the other models I tested. That matters when your prompt is enforcing a strict JSON schema and a detailed rule set. I run it at temperature 0.2 because I want consistent output. This isn't a creative writing tool.",
                  },
                  {
                    layer: 'Payments',
                    tech: 'Stripe (hosted checkout + webhooks)',
                    why: "I don't touch card data at all, which keeps me out of PCI compliance scope. Stripe's hosted checkout handles the edge cases I'd otherwise get wrong.",
                  },
                  {
                    layer: 'Hosting',
                    tech: 'Vercel',
                    why: 'Vercel has native Next.js support and serverless functions that scale down to zero between requests. It also has built-in cron, which I use for scheduled jobs.',
                  },
                  {
                    layer: 'Integration',
                    tech: 'Google Calendar OAuth',
                    why: 'Calendar data shows how time was actually spent, not how someone remembers it later. I request read-only access to event metadata only: titles, times, and attendee counts. I never read event descriptions or email content. That is the minimum scope needed for the analysis.',
                  },
                ].map(({ layer, tech, why }, i) => (
                  <tr key={layer} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-4 font-semibold text-gray-900 align-top whitespace-nowrap">{layer}</td>
                    <td className="px-5 py-4 font-mono text-xs align-top whitespace-nowrap" style={{ color: BRAND }}>{tech}</td>
                    <td className="px-5 py-4 text-gray-500 leading-relaxed align-top">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 2: HOW A REQUEST FLOWS */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-8" style={{ color: BRAND }}>How a capacity audit works</h2>
          <div className="space-y-6">
            {[
              {
                n: '01',
                title: 'Intake',
                body: "The user goes through a five-screen guided form rather than typing into a blank text box. I made this change after early testing showed that the people who most needed the tool struggled to describe their own problems clearly enough for the AI to do anything useful. Business type determines which template they get.",
              },
              {
                n: '02',
                title: 'Authentication',
                body: "When the form submits, the request hits a Next.js API route that validates the user's session token through Supabase. Every query after that is scoped to that user's ID.",
              },
              {
                n: '03',
                title: 'Rate limiting',
                body: "Before calling the AI, the route queries the extractions table to count how many audits the user has run this calendar month. If they're at their plan limit, it returns a 429 and the frontend shows the upgrade prompt. The check runs server-side, so it can't be bypassed by the client.",
              },
              {
                n: '04',
                title: 'Prompt assembly',
                body: 'The intake answers get converted into a structured context block and passed to the model. If Google Calendar is connected, 28 days of meeting data gets added at the top of that context. The system prompt specifies the rule set and the exact JSON structure the model has to return.',
              },
              {
                n: '05',
                title: 'Generation',
                body: 'GPT-4o returns structured JSON. The parsing is wrapped in a try/catch block so a malformed response sends a clean error to the client instead of crashing the request.',
              },
              {
                n: '06',
                title: 'Persistence',
                body: 'The result gets written to Supabase. That same table drives the audit history the user sees and the usage counter used for rate limiting. Using one table for both means the count always reflects what actually happened.',
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex gap-5">
                <div
                  className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center text-xs font-black text-white mt-0.5"
                  style={{ backgroundColor: BRAND }}
                >
                  {n}
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed" style={{ lineHeight: '1.7' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: CONSTRAINING THE AI */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-6" style={{ color: BRAND }}>The hard part wasn&apos;t the API call</h2>
          <div className="space-y-4 text-gray-600 text-base leading-relaxed" style={{ lineHeight: '1.7' }}>
            <p>
              Connecting to OpenAI takes about twenty minutes. Getting it to produce output a small
              business owner will actually act on took several weeks and multiple rewrites.
            </p>
            <p>
              The first version produced recommendations like &ldquo;implement foot traffic analytics.&rdquo;
              That&apos;s technically reasonable advice, but it&apos;s useless to someone running a small retail
              shop with no budget for new software.
            </p>
            <p>So I built a constraint set into the system prompt. These rules are applied on every generation:</p>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-200" style={{ backgroundColor: '#F8F7FF' }}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Constraint rules, applied on every generation</p>
            </div>
            <ul className="divide-y divide-gray-100">
              {[
                'Never recommend purchasing additional software or analytics tools',
                'Every recommendation must include a specific dollar figure, both monthly and annual',
                'Every recommendation must include a literal first action completable in under ten minutes',
                'For solo operators, never use the word "automate" or suggest delegating to a team member. They may not have one.',
                'For physical businesses, never reference calendar blocking. Use physical cues instead, like a note on the register or a phone alarm.',
                'Never say "consider" or "explore". Use DO, TEXT, CALL, CANCEL, BLOCK.',
                "Reference the user's stated growth goals by name in the recommendations",
              ].map(rule => (
                <li key={rule} className="px-5 py-3 flex gap-3 items-start">
                  <span className="shrink-0 font-mono text-xs mt-0.5 font-bold" style={{ color: BRAND }}>→</span>
                  <span className="font-mono text-xs text-gray-700 leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <p className="text-sm font-black text-gray-900 mb-4">What that changed</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Before constraints</p>
                <p className="text-sm text-gray-500 leading-relaxed italic">
                  &ldquo;Implement foot traffic analytics to better understand customer patterns and optimize staffing accordingly.&rdquo;
                </p>
              </div>
              <div className="rounded-xl border-2 border-green-200 bg-green-50 p-5">
                <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3">After constraints</p>
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  &ldquo;Text each of your distributor reps today: Hey, moving all our calls to Wednesdays 10am-12pm. Works better for the store schedule. That conversation takes five minutes and reclaims about four hours every week, roughly $9,600 a year.&rdquo;
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Same model, same user input. The output changed because the constraints changed.</p>
          </div>
        </section>

        {/* SECTION 4: DECISIONS AND TRADEOFFS */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-8" style={{ color: BRAND }}>Decisions I made and why</h2>
          <div className="space-y-4">
            {[
              {
                decision: 'Built a free calculator with no AI at all',
                reasoning: "Every AI audit costs real money to run. The calculator is pure arithmetic with zero marginal cost, so I can make it genuinely unlimited without requiring an account. It also means the core framework has value if an AI provider ever changes pricing or goes away.",
                tradeoff: "There are two codepaths to maintain. The calculator is also less accurate than the AI audit, but that gap is intentional. It's what gives people a reason to run the full audit.",
              },
              {
                decision: 'Replaced the free-text input with a guided intake form',
                reasoning: "I tested the original blank text box with a small business owner and hit the problem quickly. The people who most need this kind of tool are often the least able to describe their own operational issues clearly. A blank box asked them to do the hard work before they'd gotten anything from the product.",
                tradeoff: "Five screens is more friction than one box. Output quality improved enough to justify it, and I kept a free-text option for users who already know what they want to say.",
              },
              {
                decision: 'Google Calendar only for B2B business types',
                reasoning: "A liquor store owner doesn't run their week through Google Calendar. Showing a calendar connection prompt to a retail or trades user adds friction with no benefit. The integration appears only for business types where calendar data is actually useful. When it does connect, I request read-only access to event metadata: titles, times, and attendee counts. I don't read event descriptions or email content. That's the minimum scope needed for the analysis.",
                tradeoff: "B2C users get a less precise analysis because there's no calendar data to anchor it. The right fix is a different data source. Accounting software integration is next on the roadmap.",
              },
              {
                decision: 'Removed the subscription tier, then brought it back',
                reasoning: "I launched with a monthly subscription, then removed it a few months later because there was nothing that justified a recurring charge. I brought it back once the weekly ops brief gave the subscription an actual ongoing value. Charging monthly for something a user has to actively remember to open is asking for churn.",
                tradeoff: "Pricing changed publicly more than once, which is not ideal. But the alternative was keeping a subscription that wouldn't have retained anyone.",
              },
              {
                decision: 'Usage limits enforced against the database, not client state',
                reasoning: "The audit counter reads directly from the extractions table, filtered to the current month. There's no separate counter that could get out of sync. The source of truth is the actual audit records, so there's nothing to game.",
                tradeoff: "It adds one extra query on every dashboard load. That's a small cost for a limit that actually works.",
              },
            ].map(({ decision, reasoning, tradeoff }) => (
              <div key={decision} className="rounded-2xl border border-gray-200 p-6">
                <p className="font-black text-gray-900 mb-3">{decision}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3" style={{ lineHeight: '1.7' }}>{reasoning}</p>
                <div className="flex gap-2 items-start">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest shrink-0 mt-0.5">Tradeoff</span>
                  <p className="text-sm text-gray-500 leading-relaxed">{tradeoff}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: WHAT I'D DO DIFFERENTLY */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-6" style={{ color: BRAND }}>What I&apos;d do differently</h2>
          <div className="text-gray-600 text-base space-y-5" style={{ lineHeight: '1.7' }}>
            <p>
              First, I&apos;d test the output with a real user before building the interface around it.
              I spent time on a polished dashboard before the underlying output was actually useful.
              The product got much better the day someone told me the recommendations were worthless.
              That conversation could&apos;ve happened weeks earlier.
            </p>
            <p>
              Second, I&apos;d add analytics before launch rather than after. I have no data on where
              users dropped off in the first version, which makes it hard to know what to prioritize.
            </p>
            <p>
              Third, I&apos;d pick a customer segment and commit to it. I switched between targeting
              BizOps leaders and small business owners more than once. Each switch meant rewriting
              the positioning and, in some cases, parts of the product logic. I&apos;m confident the
              segment I&apos;m on now is correct. It just took longer to get there than it needed to.
            </p>
            <p>
              I should also mention that all of this was built without a computer science background.
              I learned the relevant concepts by needing to make these specific decisions, not by
              studying them first. That&apos;s a slower way to learn, but it means I understand why
              each piece is there.
            </p>
          </div>
        </section>

        {/* SECTION 6: WHAT'S NEXT */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-8" style={{ color: BRAND }}>What&apos;s next and why</h2>
          <div className="space-y-5">
            {[
              {
                title: 'Automated weekly brief',
                body: "This is the next thing I'm building. A report that arrives on its own is a different kind of product from a tool someone has to remember to open. That difference is what makes a monthly subscription worth paying for.",
              },
              {
                title: 'Accounting integration (QuickBooks/Xero)',
                body: 'Calendar data only tells me about businesses where meetings are the primary time sink. Revenue and payroll data would let me calculate the actual dollar cost of overhead instead of estimating it, and it applies to every business type.',
              },
              {
                title: 'Industry templates beyond the current five',
                body: "Five templates are live: retail, food service, trades, consulting, and agencies. Each one I add improves the specificity of the output for that business type in a measurable way. I'm picking the next ones based on what's actually coming through the intake form.",
              },
            ].map(({ title, body }, i) => (
              <div key={title} className="flex gap-5">
                <div
                  className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white mt-0.5"
                  style={{ backgroundColor: BRAND }}
                >
                  {i + 1}
                </div>
                <div className="pt-1">
                  <p className="font-bold text-gray-900 mb-1">{title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed" style={{ lineHeight: '1.7' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER CTA */}
        <div className="rounded-2xl border border-gray-200 p-10 text-center" style={{ backgroundColor: '#F8F7FF' }}>
          <p className="font-black text-xl text-gray-900 mb-2">Questions about any of this?</p>
          <p className="text-gray-500 text-sm mb-8">If you want to talk through the decisions, reach out.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:initiaops@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-white transition-all"
            >
              initiaops@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/kkothari-1/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white hover:opacity-90 transition-all"
              style={{ backgroundColor: BRAND }}
            >
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
