import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Store — RECLAIM | Sales Ops Resources & Playbooks',
  description: 'Frameworks, templates, and playbooks for sales ops professionals. Built on the same process improvement principles behind RECLAIM.',
  alternates: { canonical: '/store' },
  openGraph: {
    title: 'Store — RECLAIM | Sales Ops Resources & Playbooks',
    description: 'Frameworks, templates, and playbooks for sales ops professionals. Built on the same process improvement principles behind RECLAIM.',
    url: 'https://www.getreclaimapp.com/store',
  },
}

export default function StorePage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
            style={{ backgroundColor: '#EDE9FE', color: 'var(--brand)' }}>
            Store
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Resources &amp; Tools</h1>
          <p className="text-xl text-gray-500">
            Frameworks, templates, and playbooks built on the same process improvement principles behind RECLAIM.
          </p>
        </div>
      </div>

      {/* Product cards */}
      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* Paid product — Sales Ops Playbook */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
            {/* Card top accent */}
            <div className="h-1.5 w-full" style={{ backgroundColor: 'var(--brand)' }} />

            <div className="p-7 flex flex-col flex-1">
              {/* Badge + price row */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: '#EDE9FE', color: 'var(--brand)' }}>
                  Bestseller
                </span>
                <span className="text-3xl font-black text-gray-900">$47</span>
              </div>

              <h2 className="text-xl font-black text-gray-900 mb-3">The Sales Ops Playbook</h2>

              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                The complete framework for standardizing your sales process and eliminating manual admin.
                Includes MEDDIC scorecard, call-to-CRM workflow, pipeline health framework, and
                ready-to-use templates. Instant PDF download.
              </p>

              {/* What's included */}
              <div className="mb-7">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">What&apos;s included</p>
                <ul className="space-y-2.5">
                  {[
                    '6-chapter framework covering the full sales ops lifecycle',
                    'MEDDIC deal scorecard template',
                    'Pre-call and post-call checklists',
                    'Pipeline health audit framework',
                    'AI tool stack recommendations by company size',
                    'Call-to-CRM workflow guide',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: '#EDE9FE', color: 'var(--brand)' }}>
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <a
                  href="https://gumroad.com/l/reclaim-playbook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-sm font-bold text-white py-3.5 rounded-xl transition-all hover:opacity-90 hover:shadow-md"
                  style={{ backgroundColor: 'var(--brand)' }}
                >
                  Buy Now — $47
                </a>
                <p className="text-center text-xs text-gray-400 mt-2.5">Instant download · PDF · 20+ pages</p>
              </div>
            </div>
          </div>

          {/* Free resource — Call Note Template */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="h-1.5 w-full bg-green-400" />

            <div className="p-7 flex flex-col flex-1">
              {/* Badge + price row */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">
                  Free Download
                </span>
                <span className="text-3xl font-black text-green-600">FREE</span>
              </div>

              <h2 className="text-xl font-black text-gray-900 mb-3">Free: Call Note Template</h2>

              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                The exact template our team uses to capture key information during every sales call.
                Copy it into Notion, Google Docs, or your CRM.
              </p>

              <div className="mt-auto">
                <Link
                  href="/guide"
                  className="block w-full text-center text-sm font-bold py-3.5 rounded-xl border-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: 'var(--brand)', color: 'var(--brand)' }}
                >
                  Download Free
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Upsell banner */}
        <div className="mt-12 rounded-2xl p-8 text-center" style={{ backgroundColor: 'var(--brand)' }}>
          <p className="text-lg font-black text-white mb-2">
            These frameworks work even better with RECLAIM
          </p>
          <p className="text-sm text-purple-200 mb-6 max-w-lg mx-auto">
            RECLAIM automates everything in the playbook — paste a transcript and get structured CRM data in seconds.
          </p>
          <Link
            href="/signup"
            className="inline-block text-sm font-bold bg-white px-6 py-3 rounded-full transition-all hover:shadow-lg hover:scale-105"
            style={{ color: 'var(--brand)' }}
          >
            Try RECLAIM free →
          </Link>
        </div>
      </div>
    </div>
  )
}
