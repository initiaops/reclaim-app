import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Use RECLAIM — Complete User Guide',
  description: 'Step-by-step guide to extracting CRM data from sales call transcripts and emails using RECLAIM AI.',
  alternates: { canonical: '/guide' },
  openGraph: {
    title: 'How to Use RECLAIM — Complete User Guide',
    description: 'Step-by-step guide to extracting CRM data from sales call transcripts and emails using RECLAIM AI.',
    url: 'https://www.getreclaimapp.com/guide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Use RECLAIM — Complete User Guide',
    description: 'Step-by-step guide to extracting CRM data from sales call transcripts and emails using RECLAIM AI.',
  },
}

const steps = [
  {
    number: '01',
    title: 'Create your free account',
    content: 'Go to getreclaimapp.com and click "Start for free". Enter your email and a password — no credit card required. You\'ll receive a confirmation email. Click the link inside to activate your account, then log in.',
  },
  {
    number: '02',
    title: 'Get your transcript or email thread',
    content: 'RECLAIM works with any text-based content from a sales conversation. This includes: Zoom or Gong auto-transcripts, manual call notes, email threads with a prospect, or even rough notes from a call. The longer and more detailed the content, the more accurate the extraction.',
  },
  {
    number: '03',
    title: 'Paste and extract',
    content: 'From your dashboard, paste the transcript or email into the text box. Click "Extract Intelligence". The AI typically responds in 4–8 seconds. You\'ll see all 9 fields filled in automatically — opportunity name, budget, decision maker, pain points, next steps, deal stage, competitors, sentiment, and AI confidence.',
  },
  {
    number: '04',
    title: 'Review your results',
    content: 'Check the AI Confidence score at the top. Anything above 75% is reliable. Below 50% usually means the transcript was too short or vague — try adding more context. The Deal Stage is mapped automatically (Prospecting → Discovery → Proposal → Negotiation → Closing). If it\'s wrong, you can override it manually in your CRM.',
  },
  {
    number: '05',
    title: 'Copy or push to your CRM',
    content: 'Click "Copy text" to get a plain-text summary you can paste anywhere. Click "Download" to save it as a .txt file. If you\'ve connected HubSpot (see below), click "Push to HubSpot" to create the deal and contact automatically with one click.',
  },
  {
    number: '06',
    title: 'Connect HubSpot for one-click sync',
    content: 'Go to Settings (◈ in the sidebar). Click "Connect" next to HubSpot. You\'ll be taken to HubSpot to authorize the connection. Once connected, a "Push to HubSpot" button will appear after every extraction. One click creates the deal, maps the deal stage, and creates a linked contact from the decision maker name.',
  },
]

const tips = [
  { title: 'More text = better results', body: 'A 5-minute call summary will give better extraction than 3 sentences. RECLAIM needs enough context to identify deal stage and decision makers accurately.' },
  { title: 'Include names and numbers', body: 'If your transcript has "we\'d need around fifty thousand" written out, add the numeric version in parentheses. The AI handles both but explicit numbers improve budget extraction.' },
  { title: 'Works on email threads too', body: 'Copy the entire email chain — headers, replies, everything. The AI will figure out who said what. Especially useful for async deals that happen entirely over email.' },
  { title: 'Use the confidence score', body: 'Under 60% confidence usually means the input was too short or had no clear CRM-relevant content. This isn\'t an error — it\'s the AI being honest about ambiguous input.' },
  { title: 'History saves your last 5 extractions', body: 'Your most recent extractions are saved in the dashboard. Click any row in the Recent Extractions list to reload those results. Pro users get persistent history.' },
]

export default function GuidePage() {
  return (
    <div className="bg-white min-h-screen">

      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
            style={{ backgroundColor: '#EDE9FE', color: 'var(--brand)' }}>
            User Guide
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
            How to use RECLAIM
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Everything you need to go from raw transcript to clean CRM data in under 30 seconds.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-16">

        {/* Step by step */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-8">Getting started — step by step</h2>
          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black text-white"
                  style={{ backgroundColor: 'var(--brand)' }}>
                  {step.number}
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What gets extracted */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-4">The 9 fields RECLAIM extracts</h2>
          <p className="text-gray-500 text-sm mb-8">These map directly to the fields your CRM needs after every sales call.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { field: 'Opportunity Name', what: 'The company or deal being sold to' },
              { field: 'Budget / Pricing', what: 'Any dollar figures or budget ranges mentioned' },
              { field: 'Decision Maker', what: 'Name and title of the person who signs off' },
              { field: 'Key Pain Points', what: 'The core problems the prospect needs to solve' },
              { field: 'Next Steps', what: 'Specific follow-up actions agreed on the call' },
              { field: 'Deal Stage', what: 'Prospecting / Discovery / Proposal / Negotiation / Closing' },
              { field: 'Competitors', what: 'Other tools or vendors being evaluated' },
              { field: 'Overall Sentiment', what: 'Positive, neutral, or negative — the deal\'s emotional temperature' },
              { field: 'AI Confidence', what: 'How reliable this extraction is, scored 0–100%' },
            ].map(({ field, what }) => (
              <div key={field} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="font-bold text-gray-900 text-sm mb-1">{field}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-8">Tips for best results</h2>
          <div className="space-y-4">
            {tips.map((tip) => (
              <div key={tip.title} className="flex gap-4 bg-purple-50 rounded-2xl p-5 border border-purple-100">
                <div className="text-purple-500 font-black text-lg shrink-0 mt-0.5">→</div>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-1">{tip.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{tip.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Free vs Pro */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Free plan vs Pro</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3.5 font-semibold text-gray-500">Feature</th>
                  <th className="px-5 py-3.5 font-bold text-gray-700 text-center">Free</th>
                  <th className="px-5 py-3.5 font-bold text-center" style={{ color: 'var(--brand)' }}>Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Extractions per month', free: '5', pro: 'Unlimited' },
                  { feature: 'All 9 fields extracted', free: '✓', pro: '✓' },
                  { feature: 'Copy & download results', free: '✓', pro: '✓' },
                  { feature: 'Extraction history', free: 'Session only', pro: 'Saved' },
                  { feature: 'HubSpot CRM sync', free: '—', pro: '✓' },
                  { feature: 'Price', free: '$0/month', pro: '$49/month' },
                ].map(({ feature, free, pro }, i) => (
                  <tr key={feature} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-5 py-3.5 text-gray-700 font-medium">{feature}</td>
                    <td className="px-5 py-3.5 text-center text-gray-400">{free}</td>
                    <td className="px-5 py-3.5 text-center font-semibold" style={{ color: 'var(--brand)' }}>{pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-8 text-center border-2 border-dashed border-purple-200" style={{ backgroundColor: '#F5F3FF' }}>
          <p className="font-black text-xl text-gray-900 mb-2">Ready to try it?</p>
          <p className="text-gray-500 text-sm mb-6">Takes 30 seconds to sign up. No credit card needed.</p>
          <Link href="/signup"
            className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--brand)' }}>
            Start for free →
          </Link>
        </div>

      </div>
    </div>
  )
}
