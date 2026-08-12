import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How RECLAIM was built',
  description:
    'Architecture, technical decisions, and tradeoffs behind RECLAIM — built solo with AI-assisted development.',
  alternates: { canonical: '/build' },
}

const BRAND = '#534AB7'
const BRAND_LIGHT = '#EEEDFE'

export default function BuildPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── HERO ── */}
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
            I had no prior coding experience when I started this. Here&apos;s the architecture,
            the decisions I made, and what I&apos;d do differently.
          </p>
          <p className="text-sm font-semibold text-gray-400">Kunal Kothari · Founder</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16 space-y-20">

        {/* ── SECTION 1: THE STACK ── */}
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
                    why: 'Server components reduce client bundle size and let me keep API keys server-side by default. File-based routing meant less config.',
                  },
                  {
                    layer: 'Database & Auth',
                    tech: 'Supabase (Postgres)',
                    why: "My data is relational — users have subscriptions, subscriptions have limits, audits belong to users. Postgres was the right model. Firebase's document store would have fought me. Supabase gave me managed Postgres plus auth plus row-level security without standing up my own backend.",
                  },
                  {
                    layer: 'AI',
                    tech: 'OpenAI GPT-4o (temp 0.2)',
                    why: 'Best instruction-following of available models, which matters because my prompt enforces a strict JSON schema and a hard rule set. Low temperature because this is a business intelligence tool — I want repeatable output, not creative variation.',
                  },
                  {
                    layer: 'Payments',
                    tech: 'Stripe (hosted checkout + webhooks)',
                    why: "Never touching card data keeps me entirely out of PCI compliance scope. Hosted checkout means Stripe handles the edge cases I'd otherwise get wrong.",
                  },
                  {
                    layer: 'Hosting',
                    tech: 'Vercel',
                    why: 'Native Next.js support, serverless functions scale to zero, and built-in cron for scheduled jobs.',
                  },
                  {
                    layer: 'Integration',
                    tech: 'Google Calendar OAuth',
                    why: 'The only data source that reflects how time is actually spent rather than how someone remembers spending it.',
                  },
                ].map(({ layer, tech, why }, i) => (
                  <tr key={layer} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-5 py-4 font-semibold text-gray-900 align-top whitespace-nowrap">{layer}</td>
                    <td className="px-5 py-4 font-mono text-xs text-gray-700 align-top whitespace-nowrap" style={{ color: BRAND }}>{tech}</td>
                    <td className="px-5 py-4 text-gray-500 leading-relaxed align-top">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── SECTION 2: HOW A REQUEST FLOWS ── */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-8" style={{ color: BRAND }}>How a capacity audit works</h2>
          <div className="space-y-6">
            {[
              {
                n: '01',
                title: 'Intake',
                body: "The user completes a five-screen guided form instead of typing into a blank box. Business type routes them to an industry-specific template. This was a deliberate decision — early testing showed users couldn't describe their own operational problems well enough for the AI to be useful.",
              },
              {
                n: '02',
                title: 'Authentication',
                body: "The request hits a Next.js API route which validates the user's JWT via Supabase. Every downstream query is scoped to that user ID.",
              },
              {
                n: '03',
                title: 'Rate limiting',
                body: "Before any AI call, the route counts how many audits the user has run in the current calendar month by querying the extractions table. If they've hit their plan limit, it returns a 429 with a flag the frontend uses to show the upgrade path. This check is server-side so it can't be bypassed.",
              },
              {
                n: '04',
                title: 'Prompt assembly',
                body: 'All intake answers get converted into a structured context string. If Google Calendar is connected, 28 days of meeting data is prepended. The system prompt enforces a strict rule set and an exact JSON schema.',
              },
              {
                n: '05',
                title: 'Generation',
                body: 'GPT-4o returns structured JSON. Parsing is wrapped in try/catch — a malformed response returns a clean error rather than crashing the request.',
              },
              {
                n: '06',
                title: 'Persistence',
                body: 'The result is written to Supabase, which serves both the audit history and the usage counter. The same table is the source of truth for rate limiting, so the count can never drift from reality.',
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

        {/* ── SECTION 3: CONSTRAINING THE AI ── */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-6" style={{ color: BRAND }}>The hard part wasn&apos;t the API call</h2>
          <div className="space-y-4 text-gray-600 text-base leading-relaxed" style={{ lineHeight: '1.7' }}>
            <p>
              Connecting to OpenAI takes about twenty minutes. Getting it to produce output a small
              business owner will actually act on took several weeks and multiple rewrites.
            </p>
            <p>
              The first version produced recommendations like &ldquo;implement foot traffic analytics.&rdquo;
              Technically reasonable. Completely useless to someone running a small retail shop who
              has no budget for new software and no time to evaluate it.
            </p>
            <p>So I built a constraint set into the system prompt. These are enforced on every single generation:</p>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-200" style={{ backgroundColor: '#F8F7FF' }}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Constraint rules — enforced on every generation</p>
            </div>
            <ul className="divide-y divide-gray-100">
              {[
                'Never recommend purchasing additional software or analytics tools',
                'Every recommendation must include a specific dollar figure — monthly and annual',
                'Every recommendation must include a literal first action completable in under ten minutes',
                'For solo operators, never use the word "automate" or suggest delegating to a team member — they may not have one',
                'For physical businesses, never reference calendar blocking — use physical cues like a note on the register or a phone alarm',
                'Never say "consider" or "explore" — use DO, TEXT, CALL, CANCEL, BLOCK',
                'Reference the user\'s stated growth goals by name in the recommendations',
              ].map(rule => (
                <li key={rule} className="px-5 py-3 flex gap-3 items-start">
                  <span className="shrink-0 font-mono text-xs mt-0.5 font-bold" style={{ color: BRAND }}>→</span>
                  <span className="font-mono text-xs text-gray-700 leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <p className="text-sm font-black text-gray-900 mb-4">The difference this made</p>
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
                  &ldquo;Text each of your distributor reps today: &lsquo;Hey — moving all our calls to Wednesdays 10am-12pm. Works better for the store schedule.&rsquo; Five minutes of texting reclaims four hours every week — roughly $9,600 a year.&rdquo;
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Same model. Same user input. The difference is entirely in how the prompt is constrained.</p>
          </div>
        </section>

        {/* ── SECTION 4: DECISIONS AND TRADEOFFS ── */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-8" style={{ color: BRAND }}>Decisions I made and why</h2>
          <div className="space-y-4">
            {[
              {
                decision: 'Built a free calculator with no AI at all',
                reasoning: 'The AI audit costs real money per run. The calculator is pure arithmetic — zero marginal cost, so it can be genuinely unlimited and require no account. It also means the product\'s core framework has value independent of any AI provider.',
                tradeoff: 'Two codepaths to maintain, and the calculator is less accurate than the AI audit. That gap is intentional — it\'s what makes the upgrade worth taking.',
              },
              {
                decision: 'Replaced the free-text input with a guided intake form',
                reasoning: "Testing with an actual small business owner revealed the core problem: people who most need this tool are least able to articulate their own operational issues. A blank box put the hard work on the user before they got any value.",
                tradeoff: 'Five screens is more friction than one box. Output quality improved enough to justify it — and I kept the free-text option available for users who prefer it.',
              },
              {
                decision: 'Google Calendar only for B2B business types',
                reasoning: "A liquor store owner does not run their week through Google Calendar. Showing a calendar connection prompt to a retail or trades user adds friction with no payoff. It's conditionally rendered based on business model.",
                tradeoff: 'B2C users get less precise analysis. The right fix is a different data source for them — accounting software is next on the roadmap.',
              },
              {
                decision: 'Removed the subscription tier, then brought it back',
                reasoning: "I launched with a monthly plan, removed it because nothing justified recurring revenue yet, and reintroduced it only once the weekly brief gave a subscription something real to deliver. Charging monthly for a tool someone operates manually is a churn problem waiting to happen.",
                tradeoff: 'Pricing changed publicly more than once. Worth it — the alternative was charging for something that wouldn\'t retain.',
              },
              {
                decision: 'Usage limits enforced against the database, not client state',
                reasoning: 'The audit counter reads directly from the extractions table filtered by current month. There\'s no separate counter to drift or reset. A page reload can\'t bypass it because the source of truth is the actual audit records.',
                tradeoff: 'One extra query per dashboard load. Negligible cost for a limit that can\'t be gamed.',
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

        {/* ── SECTION 5: WHAT I'D DO DIFFERENTLY ── */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-6" style={{ color: BRAND }}>What I&apos;d do differently</h2>
          <div className="text-gray-600 text-base space-y-5" style={{ lineHeight: '1.7' }}>
            <p>Three things.</p>
            <p>
              First, I&apos;d test the output with a real user before building the interface around it. I built a polished
              dashboard for output that wasn&apos;t useful yet. The product got dramatically better the day someone told me
              the recommendations were worthless — and that conversation could have happened weeks earlier.
            </p>
            <p>
              Second, I&apos;d instrument earlier. I added analytics after launch rather than before, which means I have no
              data on where users dropped off in the first version.
            </p>
            <p>
              Third, I&apos;d pick one customer segment and hold it. I moved between BizOps leaders and small business owners
              more than once. Each pivot cost a full rewrite of the positioning and some of the product logic. The segment
              I landed on is the right one — I just took an expensive path to get there.
            </p>
          </div>
        </section>

        {/* ── SECTION 6: WHAT'S NEXT ── */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-8" style={{ color: BRAND }}>What&apos;s next and why</h2>
          <div className="space-y-5">
            {[
              {
                title: 'Automated weekly brief',
                body: "This is the next build. It's the only feature that makes a monthly subscription defensible — a report that arrives without the user doing anything is a fundamentally different product than a tool they have to remember to open.",
              },
              {
                title: 'Accounting integration (QuickBooks/Xero)',
                body: 'Calendar data only covers businesses that run on meetings. Revenue and payroll data would make the dollar figures precise rather than estimated — and it applies to every business type, not just B2B.',
              },
              {
                title: 'Industry templates beyond the current five',
                body: 'Retail, food service, trades, consulting, and agencies are live. Each new template is a measurable improvement in output specificity for that segment. I\'m adding them based on which business types actually show up in the intake data.',
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

        {/* ── FOOTER CTA ── */}
        <div className="rounded-2xl border border-gray-200 p-10 text-center" style={{ backgroundColor: '#F8F7FF' }}>
          <p className="font-black text-xl text-gray-900 mb-2">Questions about any of this?</p>
          <p className="text-gray-500 text-sm mb-8">I&apos;m happy to talk through the decisions.</p>
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
              LinkedIn →
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
