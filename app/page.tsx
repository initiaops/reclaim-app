import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
        <span
          className="inline-block text-sm font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
          style={{
            backgroundColor: '#EDE9FE',
            color: 'var(--brand)',
          }}
        >
          AI-Powered Sales Intelligence
        </span>

        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto mb-6">
          Give your sales team back{' '}
          <span style={{ color: 'var(--brand)' }}>5 hours a week</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          RECLAIM automatically extracts CRM data from your calls and emails.
          No more manual data entry.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="inline-block text-white font-semibold px-8 py-4 rounded-xl text-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--brand)' }}
          >
            Start for free
          </Link>
          <a
            href="#how-it-works"
            className="inline-block text-gray-700 font-semibold px-8 py-4 rounded-xl text-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            See how it works
          </a>
        </div>

        {/* Social proof strip */}
        <p className="mt-8 text-sm text-gray-400">
          No credit card required · Free plan includes 5 extractions/month
        </p>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="bg-gray-50 py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg">
            Three steps. Thirty seconds. Done.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Paste your transcript',
                description:
                  'Copy and paste a sales call transcript or email thread into RECLAIM. Any length, any format.',
                icon: '📋',
              },
              {
                step: '2',
                title: 'AI extracts the key data',
                description:
                  'Our AI reads your content and pulls out the buyer name, budget, pain points, next steps, deal stage, and more.',
                icon: '🧠',
              },
              {
                step: '3',
                title: 'Copy it into your CRM',
                description:
                  'Review the structured results and copy them into Salesforce, HubSpot, or any CRM in one click.',
                icon: '✅',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold mb-4"
                  style={{ backgroundColor: 'var(--brand)' }}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/signup"
              className="inline-block text-white font-semibold px-8 py-4 rounded-xl text-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--brand)' }}
            >
              Try it free — no credit card needed
            </Link>
          </div>
        </div>
      </section>

      {/* What gets extracted */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          What RECLAIM extracts
        </h2>
        <p className="text-center text-gray-500 mb-14 text-lg">
          Everything your CRM needs, pulled automatically.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'Opportunity Name',
            'Budget / Pricing Discussed',
            'Decision Maker',
            'Key Pain Points',
            'Identified Next Steps',
            'Deal Stage',
            'Competitors Mentioned',
            'Overall Sentiment',
          ].map((field) => (
            <div
              key={field}
              className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
            >
              <span style={{ color: 'var(--brand)' }} className="text-xl">
                ✦
              </span>
              <span className="text-gray-700 font-medium text-sm">{field}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <p className="text-center text-gray-400 text-sm">
          Built with AI. © 2025 RECLAIM.
        </p>
      </footer>
    </div>
  )
}
