import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Weekly Ops Brief Template Your CEO Will Read | RECLAIM',
  description: 'Most ops updates are too long, too vague, and ignored. Here\'s a simple weekly ops brief framework that leadership actually acts on.',
  alternates: { canonical: '/blog/how-to-extract-meddic-from-sales-calls' },
  openGraph: {
    title: 'Weekly Ops Brief Template Your CEO Will Read | RECLAIM',
    description: 'Most ops updates are too long, too vague, and ignored. Here\'s a simple weekly ops brief framework that leadership actually acts on.',
    url: 'https://www.getreclaimapp.com/blog/how-to-extract-meddic-from-sales-calls',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to write a weekly ops brief your CEO will actually read',
  description: 'Most ops updates are too long, too vague, and ignored. Here\'s a simple weekly ops brief framework that leadership actually acts on.',
  author: { '@type': 'Organization', name: 'RECLAIM' },
  publisher: { '@type': 'Organization', name: 'RECLAIM', url: 'https://www.getreclaimapp.com' },
  datePublished: '2026-04-01',
  dateModified: '2026-04-17',
}

export default function Post() {
  return (
    <div className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 pt-16 pb-8">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-purple-100 text-purple-700">BizOps</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-6">
          How to write a weekly ops brief your CEO will actually read
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed mb-8">
          Most ops updates are too long, arrive at the wrong time, and focus on the wrong things. Here&apos;s a framework that produces a brief leadership reads, acts on, and asks for more of.
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 border-b border-gray-100 pb-8">
          <span>RECLAIM</span>
          <span>·</span>
          <span>6 min read</span>
          <span>·</span>
          <time>April 2026</time>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="prose prose-gray max-w-none">

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-4">Why most ops briefs don&apos;t get read</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The weekly ops update is one of the most consistently mishandled communication types in business. It gets written, it gets sent, and it mostly gets ignored — or skimmed for thirty seconds before being filed away. The ops leader who writes it spends two hours compiling information. The CEO who receives it spends ninety seconds reading it. Neither person is satisfied with the arrangement, but neither knows how to change it.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The problems are predictable: the update is too long — three pages of context when leadership needs three sentences. It arrives at the wrong time — Friday afternoon, when leadership is winding down and won&apos;t look at it until Monday anyway. And it focuses on the wrong things — activity completed rather than risk present.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            "We completed 47 tasks this week" tells leadership nothing they can act on. What they need to know is: what is at risk right now, what decisions are being waited on, and what one action should they take to unblock something important. Everything else is noise.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-4">What a good ops brief needs to do</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A good ops brief does exactly four things — nothing more:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-6">
            <li><strong>Tell leadership what&apos;s at risk right now.</strong> Not what might become a risk in the future, and not a historical summary of past risks. The one or two things that, if not addressed this week, will cause a problem.</li>
            <li><strong>Show what the team actually accomplished.</strong> Not the full task list — three to four bullets of the highest-signal work completed or advanced. The things that represent real progress against meaningful goals.</li>
            <li><strong>Surface what&apos;s stuck and why.</strong> A clear statement of what is blocked, who needs to make a decision, and by what date the decision needs to happen to avoid a downstream problem.</li>
            <li><strong>Recommend one clear action.</strong> Not a list of suggestions. One specific action, with an owner and a deadline. This is how ops leaders build credibility — by making decisions easy for leadership, not harder.</li>
          </ol>
          <p className="text-gray-700 leading-relaxed mb-6">
            If your current ops update doesn&apos;t do these four things, it isn&apos;t serving its purpose — regardless of how comprehensive it is.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-4">The one-page framework</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Here is the exact structure. Four sections. One page. Each section has a defined constraint that forces clarity.
          </p>

          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 mb-8">
            <p className="font-black text-gray-900 mb-4 text-lg">The four sections:</p>
            <div className="space-y-5">
              <div>
                <p className="font-bold text-gray-900 mb-1">SECTION 1: Top Risk</p>
                <p className="text-gray-600 text-sm">1–2 sentences. What is most likely to cause a problem this week and why. Specific, not general. If the risk is that a vendor contract renewal isn&apos;t signed and the deadline is Thursday, say that.</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">SECTION 2: Status</p>
                <p className="text-gray-600 text-sm">3–4 bullets. What actually happened — completed versus planned. Include one indicator of whether each major initiative is on track or at risk. "Product launch prep — on track" or "Q2 capacity review — at risk, blocked on data."</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">SECTION 3: Blockers</p>
                <p className="text-gray-600 text-sm">What is stuck. Who needs to make a decision. By when. Be specific about what happens if the decision doesn&apos;t get made: "If the vendor contract isn&apos;t signed by Thursday, we lose the Q2 rate and pay 15% more starting May 1."</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">SECTION 4: Recommended Action</p>
                <p className="text-gray-600 text-sm">One thing. Who does it. By what date. "Decision needed from CFO on vendor contract by Wednesday EOD." That&apos;s it. No optionality, no hedging, no "we could consider" language.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-4">Rule 1: One page maximum</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If your ops brief doesn&apos;t fit on one page, you haven&apos;t edited it enough. This is not a document for comprehensive reporting — that&apos;s what your dashboards and project management tools are for. The ops brief is a forcing function for identifying what matters most.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            When you can&apos;t cut it to one page, the problem is usually one of two things: you&apos;re including context that leadership already has, or you&apos;re including information that you think leadership should have but that doesn&apos;t require any action from them. Cut both ruthlessly. If it doesn&apos;t require a decision or communicate a risk, it belongs in the appendix — which leadership won&apos;t read, and that&apos;s fine.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-4">Rule 2: Send Monday morning, not Friday</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The traditional "Friday update" is one of the least effective communication patterns in business. Leadership reads Friday updates on Monday. By the time they get to it, the context has shifted, some of the blockers have either resolved themselves or gotten worse, and the recommended action is now either stale or late.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Send your ops brief Monday morning — ideally before 9am. It sets the week&apos;s agenda while there&apos;s still time to act on it. Blockers flagged Monday morning can be unblocked Monday afternoon. Blockers flagged Friday afternoon get addressed the following week at best. The timing change alone can double the operational value of the same information.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-4">Rule 3: Lead with risk, not activity</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The most common structural mistake in ops briefs is starting with accomplishments. "This week we completed onboarding for three new clients, advanced the Q2 planning process, and finalized the vendor comparison." Leadership reads this and feels good. But if there&apos;s a serious risk buried in section four, they&apos;re already in a positive frame of mind and the risk doesn&apos;t land with appropriate urgency.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Lead with the risk. Every time. The first sentence of your ops brief should tell leadership what they need to worry about, not what you accomplished last week. Accomplishments go in the status section — they&apos;re important context, but they&apos;re not the point. The point is: what needs their attention right now?
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-4">How to write one in 15 minutes</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Once you&apos;re comfortable with the format, writing your weekly ops brief should take 15 minutes or less. Here&apos;s the process:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-6">
            <li>Open a blank document. Not last week&apos;s update — a blank document. Starting from last week&apos;s version creates cognitive debt and makes editing harder than writing fresh.</li>
            <li>Write the top risk in one sentence. If you have to think hard about what the top risk is, that&apos;s a signal that you don&apos;t have clear enough visibility into your operations. The RECLAIM calculator and ops audit can help surface this.</li>
            <li>List three things completed and three things in progress. Be specific. "Completed onboarding checklist for client X" beats "advanced client onboarding." Include one on-track/at-risk indicator for each in-progress item.</li>
            <li>Write one blocker with the specific decision needed. Name the person who needs to decide. Name the deadline. Quantify the consequence if the deadline is missed.</li>
            <li>Write one recommended action. One. If you have more than one, pick the most important. The others can wait for next week or be handled outside the brief.</li>
          </ol>
          <p className="text-gray-700 leading-relaxed mb-4">
            Review it once. Cut anything that doesn&apos;t fit on the page. Send it.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-4">The free template — copy and use this</h2>

          <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-6 mb-8 font-mono text-sm text-gray-700">
            <p className="font-black text-gray-900 mb-4 not-italic" style={{ fontFamily: 'inherit' }}>WEEKLY OPS BRIEF — [DATE]</p>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-gray-900 not-italic" style={{ fontFamily: 'inherit' }}>TOP RISK</p>
                <p>[1–2 sentences describing the highest-priority risk this week. Be specific: name the issue, the consequence, and the timeline.]</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 not-italic" style={{ fontFamily: 'inherit' }}>STATUS</p>
                <p>• Completed: [specific item]</p>
                <p>• Completed: [specific item]</p>
                <p>• In progress: [item] — on track</p>
                <p>• In progress: [item] — at risk ([reason])</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 not-italic" style={{ fontFamily: 'inherit' }}>BLOCKERS</p>
                <p>• [Issue] — needs decision from [person/role] by [date]. If not resolved: [consequence].</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 not-italic" style={{ fontFamily: 'inherit' }}>RECOMMENDED ACTION</p>
                <p>[One specific action. Owner. Deadline.]</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-4">How to automate it entirely</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Writing the brief manually is valuable because it forces you to think through the week&apos;s priorities. But the data-gathering step — compiling what was completed, identifying what&apos;s blocked, pulling current status from multiple tools — is pure administrative overhead.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            RECLAIM&apos;s operational intelligence layer connects to your real data sources — calendar, project management tools, capacity metrics — and surfaces the inputs you need to write your weekly brief in seconds rather than an hour. The risk signals, the status, the blockers — drawn from actual data rather than self-reported estimates.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            The goal is a brief that takes five minutes to review and finalize rather than an hour to compile. You still make the editorial judgment calls — you decide what&apos;s the top risk, you write the recommended action — but the data-gathering is automated. See <Link href="/how-it-works" className="font-bold" style={{ color: '#534AB7' }}>how RECLAIM works</Link> or explore the <Link href="/blog/operational-intelligence-software" className="font-bold" style={{ color: '#534AB7' }}>operational intelligence guide</Link> for more context.
          </p>

        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl p-8 text-center" style={{ backgroundColor: '#F8F7FF' }}>
          <h3 className="text-2xl font-black text-gray-900 mb-3">Start with your admin tax score</h3>
          <p className="text-gray-500 mb-6">Before you can write a great ops brief, you need visibility into where your capacity actually goes. The calculator takes 3 minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculator" className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-xl text-white hover:opacity-90 transition-all" style={{ backgroundColor: '#534AB7' }}>
              Try the free calculator →
            </Link>
            <Link href="/signup" className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-xl border-2 text-gray-900 hover:bg-gray-50 transition-all" style={{ borderColor: '#534AB7' }}>
              Sign up free
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
