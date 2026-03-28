import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — Sales Intelligence & CRM Automation | RECLAIM',
  description: 'Practical guides for sales teams on CRM automation, AI tools, and sales methodologies like MEDDIC.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — RECLAIM Sales Intelligence',
    description: 'Practical guides for sales teams on CRM automation, AI tools, and sales methodologies.',
    url: 'https://www.getreclaimapp.com/blog',
  },
}

const posts = [
  {
    slug: 'automate-crm-data-entry',
    title: 'How to Automate CRM Data Entry: A Complete Guide for Sales Teams',
    description: 'Sales reps lose 40–80 minutes a day to manual CRM entry. Here are five methods to automate it completely — from email sync to AI extraction.',
    readTime: '8 min read',
    date: 'March 10, 2025',
    tag: 'CRM Automation',
  },
  {
    slug: 'best-ai-tools-for-sales-reps-2025',
    title: 'Best AI Tools for Sales Reps in 2025',
    description: "A practical breakdown of the AI tools actually worth paying for — call intelligence, CRM automation, email AI, and forecasting — plus how to build your stack.",
    readTime: '9 min read',
    date: 'March 15, 2025',
    tag: 'AI Tools',
  },
  {
    slug: 'how-to-extract-meddic-from-sales-calls',
    title: 'How to Extract MEDDIC from Sales Calls (Manually and with AI)',
    description: 'MEDDIC only works if you capture it accurately after every call. Learn what to listen for and how to extract each element automatically from transcripts.',
    readTime: '7 min read',
    date: 'March 20, 2025',
    tag: 'Sales Methodology',
  },
  {
    slug: 'hubspot-crm-tips-small-business',
    title: 'HubSpot CRM Tips for Small Sales Teams',
    description: 'Most small teams set up HubSpot wrong and wonder why no one uses it. Here are the tips that actually move the needle — pipeline setup, automation, and adoption.',
    readTime: '7 min read',
    date: 'April 1, 2025',
    tag: 'CRM Automation',
  },
  {
    slug: 'what-is-meddic-sales-framework',
    title: 'What Is MEDDIC? The Sales Framework Explained',
    description: 'MEDDIC is the qualification framework used by the world\'s top B2B sales teams. Here\'s what each element means, how to use it in discovery, and why it works.',
    readTime: '9 min read',
    date: 'April 5, 2025',
    tag: 'Sales Methodology',
  },
  {
    slug: 'sales-call-transcript-software',
    title: 'Sales Call Transcript Software — Top Options Compared',
    description: 'A practical comparison of Gong, Fireflies, Otter, RECLAIM, and more — what each tool actually does, what it costs, and which type of team it fits.',
    readTime: '8 min read',
    date: 'April 10, 2025',
    tag: 'AI Tools',
  },
]

export default function BlogIndexPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-50 border-b border-gray-200 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
            style={{ backgroundColor: '#EDE9FE', color: 'var(--brand)' }}>
            Blog
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Sales Intelligence Insights</h1>
          <p className="text-xl text-gray-500">Practical guides on CRM automation, AI sales tools, and closing more deals.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}
            className="block bg-white rounded-2xl border border-gray-200 p-7 hover:border-purple-200 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: '#EDE9FE', color: 'var(--brand)' }}>
                {post.tag}
              </span>
              <span className="text-xs text-gray-400">{post.date}</span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-400">{post.readTime}</span>
            </div>
            <h2 className="text-xl font-black text-gray-900 mb-2 group-hover:text-purple-800 transition-colors leading-tight">
              {post.title}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">{post.description}</p>
            <p className="mt-4 text-xs font-bold" style={{ color: 'var(--brand)' }}>Read article →</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
