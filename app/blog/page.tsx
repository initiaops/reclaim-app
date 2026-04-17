import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — RECLAIM | Ops Intelligence Guides',
  description: 'Practical guides on capacity planning, operational intelligence, and building ops teams that run on real data.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — RECLAIM | Ops Intelligence Guides',
    description: 'Practical guides on capacity planning, operational intelligence, and building ops teams that run on real data.',
    url: 'https://www.getreclaimapp.com/blog',
  },
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Capacity Planning': { bg: 'bg-violet-100', text: 'text-violet-700' },
  'Operations': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'BizOps': { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  'Small Business': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
}

const posts = [
  {
    slug: 'small-business-operations-efficiency',
    title: 'Operations efficiency for small businesses: where to start',
    description: 'A practical framework for improving ops efficiency and reducing administrative overhead — without hiring more people.',
    category: 'Small Business',
    readTime: '8 min',
  },
  {
    slug: 'team-capacity-misallocation',
    title: '5 signs your team is misallocating capacity (and how to fix it)',
    description: 'Capacity misallocation is the hidden reason most ops teams are overwhelmed. Five clear signals — and what to do about each.',
    category: 'Capacity Planning',
    readTime: '7 min',
  },
  {
    slug: 'operational-intelligence-software',
    title: 'What is operational intelligence? (And why ops teams need it now)',
    description: 'A clear definition of operational intelligence, how it differs from BI, and why ops leaders need it to make data-driven resourcing decisions.',
    category: 'Operations',
    readTime: '8 min',
  },
  {
    slug: 'capacity-planning-bizops',
    title: 'Capacity planning for BizOps leaders: a practical guide',
    description: 'A practical framework for BizOps leaders to map team capacity, identify gaps, and make resourcing decisions with real data.',
    category: 'BizOps',
    readTime: '9 min',
  },
  {
    slug: 'how-to-extract-meddic-from-sales-calls',
    title: 'How to write a weekly ops brief your CEO will actually read',
    description: 'Most ops updates are too long, too vague, and get ignored. A simple weekly brief framework that leadership actually acts on.',
    category: 'BizOps',
    readTime: '6 min',
  },
  {
    slug: 'best-ai-tools-for-sales-reps-2025',
    title: "Why ops teams are always overwhelmed (it's not headcount)",
    description: 'The real causes of ops overwhelm — and the three fixes that actually work without adding headcount.',
    category: 'Operations',
    readTime: '8 min',
  },
  {
    slug: 'automate-crm-data-entry',
    title: 'How to calculate your administrative tax (and what it costs)',
    description: 'The formula for calculating your admin tax score, what your percentage means, and the dollar cost of overhead for your specific team.',
    category: 'Capacity Planning',
    readTime: '7 min',
  },
]

export default function BlogIndexPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700">
            Blog
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">The RECLAIM Blog</h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
            Practical guides on capacity planning, operational intelligence, and building ops teams that run on real data — not gut feel.
          </p>

          {/* Category filter pills — visual only */}
          <div className="flex flex-wrap gap-2 mt-8">
            {['All', 'Capacity Planning', 'Operations', 'BizOps', 'Small Business'].map((cat, i) => (
              <span
                key={cat}
                className={`text-xs font-bold px-4 py-2 rounded-full cursor-default transition-colors ${
                  i === 0
                    ? 'text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-purple-200'
                }`}
                style={i === 0 ? { backgroundColor: '#534AB7' } : {}}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const colors = categoryColors[post.category] ?? { bg: 'bg-purple-100', text: 'text-purple-700' }
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-gray-200 p-6 hover:border-purple-200 hover:shadow-md transition-all"
              >
                {/* Category badge */}
                <div className="mb-4">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${colors.bg} ${colors.text}`}>
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-black text-gray-900 leading-snug mb-3 group-hover:text-purple-800 transition-colors flex-1">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {post.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{post.readTime} read</span>
                  <span className="text-xs font-bold" style={{ color: '#534AB7' }}>Read more →</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
