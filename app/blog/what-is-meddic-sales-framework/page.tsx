import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'What Is MEDDIC? The Sales Framework Explained | RECLAIM',
  description: 'MEDDIC is the qualification framework used by the world\'s top B2B sales teams. Here\'s what each element means, how to use it in discovery, and why it works.',
  alternates: { canonical: '/blog/what-is-meddic-sales-framework' },
  openGraph: {
    title: 'What Is MEDDIC? The Sales Framework Explained',
    description: 'MEDDIC is the qualification framework used by the world\'s top B2B sales teams. Here\'s what each element means and how to use it.',
    url: 'https://www.getreclaimapp.com/blog/what-is-meddic-sales-framework',
  },
}

export default function WhatIsMEDDICPost() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-16">

        <Link href="/blog" className="text-sm font-bold" style={{ color: 'var(--brand)' }}>
          ← All articles
        </Link>

        <div className="mt-8 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: '#EDE9FE', color: 'var(--brand)' }}>
              Sales Methodology
            </span>
            <span className="text-xs text-gray-400">April 5, 2025</span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-400">9 min read</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 leading-tight mb-4">
            What Is MEDDIC? The Sales Framework Explained
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            MEDDIC is the qualification framework used by the world&apos;s top enterprise sales teams. Here&apos;s exactly what it means, how each element shows up in real conversations, and how to use it to close more deals.
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">

          <p>
            If you&apos;ve worked in B2B software sales for more than a year, you&apos;ve probably heard of MEDDIC. It was developed at PTC in the 1990s, used to drive the company to $1 billion in revenue, and has since spread through the enterprise sales world as one of the most rigorous qualification frameworks ever created.
          </p>

          <p>
            But despite being widely known, MEDDIC is poorly understood by many of the reps who claim to use it. Teams tick the boxes without grasping the underlying logic — and wonder why their win rates don&apos;t improve.
          </p>

          <p>
            This guide explains MEDDIC from first principles: what each element actually means, why it was designed that way, and how to apply it in real sales conversations.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-3">Why MEDDIC Exists</h2>

          <p>
            MEDDIC was created to solve a specific problem: salespeople spending time on deals that were never going to close. In enterprise sales, a single deal can consume months of rep time — demos, stakeholder calls, proposals, security reviews — before ultimately dying because the budget was never real, or the decision was made by someone you never met.
          </p>

          <p>
            MEDDIC forces a rep to gather six critical pieces of information early. If any of them is missing, the deal isn&apos;t truly qualified — it&apos;s a hope. The framework gives you a language to distinguish qualified pipeline from noise.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-3">The Six Elements of MEDDIC</h2>

          {/* M */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--brand)' }}>M</p>
            <h3 className="text-xl font-black text-gray-900 mb-3">Metrics</h3>
            <p>
              Metrics is the quantified business impact of solving the problem. Not &quot;they want to improve efficiency&quot; — but &quot;they estimate $400K annually in lost productivity across their sales team of 15 reps.&quot;
            </p>
            <p className="mt-3">
              Metrics matter for two reasons. First, they help you build the ROI case that justifies your price. Second, they signal that the prospect has done the thinking to understand the cost of inaction — which correlates strongly with likelihood to buy.
            </p>
            <p className="mt-3">
              <strong>Questions to uncover Metrics:</strong> &quot;What does this problem cost you today?&quot; &quot;If you solved this, what would you expect to see in 90 days?&quot; &quot;How do you currently measure this?&quot;
            </p>
            <p className="mt-3 text-sm text-gray-500">
              <strong>Warning sign:</strong> Prospects who can&apos;t quantify their pain often aren&apos;t far enough along in their buying process to be a real deal.
            </p>
          </div>

          {/* E */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--brand)' }}>E</p>
            <h3 className="text-xl font-black text-gray-900 mb-3">Economic Buyer</h3>
            <p>
              The Economic Buyer is the person who has unilateral authority to approve the purchase. They can say yes when everyone else says no — and no when everyone else says yes. They control the budget.
            </p>
            <p className="mt-3">
              In many deals, the Economic Buyer is never in the room. Your champion runs the evaluation, gets excited, builds internal support — and then the Economic Buyer vetoes it, requests a discount you can&apos;t honor, or simply reprioritizes budget.
            </p>
            <p className="mt-3">
              <strong>Questions to identify the Economic Buyer:</strong> &quot;Who has to sign off on a purchase at this level?&quot; &quot;Who owns the budget for this?&quot; &quot;Have you made a decision this size before — who was involved?&quot;
            </p>
            <p className="mt-3 text-sm text-gray-500">
              <strong>Note:</strong> Economic Buyer ≠ most senior person. A Director may have budget authority for a $30K purchase even if a VP is in the room.
            </p>
          </div>

          {/* D — Decision Criteria */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--brand)' }}>D</p>
            <h3 className="text-xl font-black text-gray-900 mb-3">Decision Criteria</h3>
            <p>
              Decision Criteria are the requirements a solution must meet to be chosen. These can be technical (&quot;must integrate with Salesforce&quot;), commercial (&quot;must be under $50K&quot;), or operational (&quot;must be deployable without IT involvement&quot;).
            </p>
            <p className="mt-3">
              The goal isn&apos;t just to know the criteria — it&apos;s to <em>influence</em> them. Early in a deal, before criteria are set, you can shape what the prospect considers important in ways that favor your strengths. Late in a deal, when criteria are fixed, you&apos;re playing defense.
            </p>
            <p className="mt-3">
              <strong>Questions to uncover Decision Criteria:</strong> &quot;What does the ideal solution look like?&quot; &quot;What would make you choose one vendor over another?&quot; &quot;Are there any non-negotiables in the evaluation?&quot;
            </p>
          </div>

          {/* D — Decision Process */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--brand)' }}>D</p>
            <h3 className="text-xl font-black text-gray-900 mb-3">Decision Process</h3>
            <p>
              Decision Process maps every step between now and a signed contract. Who evaluates? Who approves? What reviews are required (legal, IT, security, procurement)? What are the typical timelines for each step?
            </p>
            <p className="mt-3">
              Without Decision Process, forecasting is guesswork. A rep who thinks a deal closes &quot;next month&quot; without knowing the legal review takes three weeks and procurement requires a formal RFP isn&apos;t forecasting — they&apos;re hoping.
            </p>
            <p className="mt-3">
              <strong>Questions to map the Decision Process:</strong> &quot;Walk me through how you&apos;ve made decisions like this before.&quot; &quot;What happens after we agree on terms?&quot; &quot;Does legal review every contract, or only above a certain threshold?&quot;
            </p>
          </div>

          {/* I */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--brand)' }}>I</p>
            <h3 className="text-xl font-black text-gray-900 mb-3">Identify Pain</h3>
            <p>
              Pain is the felt urgency behind the business problem. It&apos;s the difference between &quot;we&apos;d like to improve our process&quot; (nice-to-have) and &quot;our VP asked about this in our last board meeting and we need a solution before Q3&quot; (must-have).
            </p>
            <p className="mt-3">
              Pain has two dimensions: <strong>organizational pain</strong> (the business impact) and <strong>personal pain</strong> (what it means for your champion specifically — their credibility, their workload, their bonus). The best champions have both.
            </p>
            <p className="mt-3">
              <strong>Questions to surface Pain:</strong> &quot;What happens if you don&apos;t solve this this year?&quot; &quot;How long has this been a problem?&quot; &quot;What have you tried before?&quot; &quot;Who&apos;s feeling this most acutely?&quot;
            </p>
          </div>

          {/* C */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--brand)' }}>C</p>
            <h3 className="text-xl font-black text-gray-900 mb-3">Champion</h3>
            <p>
              Your Champion is the internal advocate who wants you to win and has the organizational influence to help make it happen. This is the most important — and most misunderstood — element of MEDDIC.
            </p>
            <p className="mt-3">
              A Champion is not the same as a friendly contact. Someone who loves your product but has no influence isn&apos;t a Champion — they&apos;re a fan. Someone who has influence but is ambivalent about your solution isn&apos;t a Champion either.
            </p>
            <p className="mt-3">
              Signs of a strong Champion: they share internal information proactively, they coach you on who else needs to be involved, they push back on your pricing because they want you to win (not to kill the deal), and they&apos;re personally invested in solving the problem.
            </p>
            <p className="mt-3">
              <strong>How to develop a Champion:</strong> Give them insight and data they can use internally to advocate for you. Help them build the internal business case. Make them look smart for finding your solution.
            </p>
          </div>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-3">MEDDIC Variations: MEDDICC and MEDDPICC</h2>

          <p>
            Two common extensions of MEDDIC are worth understanding:
          </p>

          <p>
            <strong>MEDDICC</strong> adds a second C: <strong>Competition</strong>. This makes explicit that you need to know who else is being evaluated, what they offer, and what their relative strengths are. For competitive markets, this is almost always necessary.
          </p>

          <p>
            <strong>MEDDPICC</strong> inserts a P for <strong>Paper Process</strong> between Decision Process and Identify Pain. Paper Process covers the legal and procurement steps specifically — NDAs, MSAs, order forms, security questionnaires. In enterprise deals, paper process alone can add 4–8 weeks to a close. Knowing it early prevents surprises.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-3">Using MEDDIC in Practice</h2>

          <p>
            MEDDIC isn&apos;t a script — it&apos;s a checklist of what you need to know. You gather it over the course of multiple conversations, not in a single interrogation.
          </p>

          <p>
            After every substantive call, update your deal record with what you learned. Mark elements as known, partially known, or unknown. Unknown elements are questions you need to ask on the next call. A deal where three elements are still unknown after three calls is not as qualified as it looks.
          </p>

          <p>
            The discipline of MEDDIC is in being honest with yourself. &quot;I think the CFO has budget authority&quot; is not the same as knowing the Economic Buyer. &quot;They seemed excited&quot; is not a Champion. The framework only works when you hold yourself to a high standard of what &quot;known&quot; actually means.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-3">Capturing MEDDIC Automatically</h2>

          <p>
            The practical challenge with MEDDIC is capture. After a 45-minute discovery call, you have a mental model of the deal — but translating that into a structured CRM update while your next call is starting is where it breaks down.
          </p>

          <p>
            AI extraction tools can help here. Tools like <Link href="/" className="font-bold" style={{ color: 'var(--brand)' }}>RECLAIM</Link> read sales call transcripts and automatically extract the MEDDIC-aligned fields — decision maker, budget, pain points, next steps, deal stage, and competitors — then push them directly to HubSpot or your CRM of choice. It takes two minutes after a call instead of ten, and ensures nothing gets forgotten.
          </p>

          <h2 className="text-2xl font-black text-gray-900 mt-10 mb-3">The Bottom Line</h2>

          <p>
            MEDDIC is a framework for separating real opportunities from pipeline padding. Its power isn&apos;t in the acronym — it&apos;s in the discipline it creates: a shared language for what &quot;qualified&quot; actually means, and a checklist of what you need to know to have confidence in a forecast.
          </p>

          <p>
            Teams that adopt MEDDIC properly — not just as a label, but as a genuine qualification standard — consistently see better win rates, more accurate forecasts, and shorter sales cycles. Not because the framework is magic, but because it forces the conversations that matter to happen earlier.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-purple-200 bg-purple-50">
            <p className="font-black text-gray-900 mb-2">Auto-extract MEDDIC fields from every call</p>
            <p className="text-sm text-gray-600 mb-4">
              RECLAIM reads your sales call transcripts and extracts decision maker, budget, pain points, and more — then pushes them to your CRM in one click.
            </p>
            <Link href="/signup"
              className="inline-block text-sm font-bold text-white px-5 py-2.5 rounded-full"
              style={{ backgroundColor: 'var(--brand)' }}>
              Start free →
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
