import type { Metadata } from 'next'
import Image from 'next/image'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact — RECLAIM | Get in Touch',
  description: 'Reach out about RECLAIM, share feedback, or connect with Kunal Kothari about strategy, operations, and AI-powered process improvement.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — RECLAIM | Get in Touch',
    description: 'Reach out about RECLAIM, share feedback, or connect with Kunal Kothari about strategy, operations, and AI-powered process improvement.',
    url: 'https://www.getreclaimapp.com/contact',
  },
}

const OPEN_TO = [
  'Strategy & Operations roles',
  'BizOps & Chief of Staff opportunities',
  'Product feedback & collaboration',
  'Speaking about AI + process improvement',
]

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
            style={{ backgroundColor: '#EDE9FE', color: 'var(--brand)' }}>
            Contact
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-3">Get in touch</h1>
          <p className="text-xl text-gray-500">
            Questions about RECLAIM, partnership ideas, or just want to connect — all welcome.
          </p>
        </div>
      </div>

      {/* Two-column body */}
      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* LEFT — Kunal's card */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-7">
              {/* Avatar + name */}
              <div className="flex items-center gap-4 mb-5">
                <div className="shrink-0" style={{ borderRadius: '50%', padding: '3px', background: '#4C1D95', display: 'inline-block' }}>
                  <Image
                    src="/kunal.jpg"
                    alt="Kunal Kothari"
                    width={96}
                    height={96}
                    className="rounded-full block"
                    style={{ width: 96, height: 96, objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <p className="text-lg font-black text-gray-900">Kunal Kothari</p>
                  <p className="text-sm text-gray-500 leading-snug">
                    Strategy &amp; Operations · Business Process Improvement · BizOps
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                I built RECLAIM as an extension of my work in business process improvement and
                operations. Always open to connecting with people working on interesting problems.
              </p>

              <a
                href="https://www.linkedin.com/in/kkothari-1/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-white px-5 py-2.5 rounded-full transition-all hover:opacity-90 hover:shadow-md"
                style={{ backgroundColor: 'var(--brand)' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn
              </a>

              <div className="border-t border-gray-100 mt-6 pt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Open to</p>
                <div className="flex flex-wrap gap-2">
                  {OPEN_TO.map(tag => (
                    <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 bg-gray-50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick note */}
            <div className="bg-purple-50 border border-purple-100 rounded-xl px-5 py-4">
              <p className="text-xs font-bold text-purple-700 mb-1">Response time</p>
              <p className="text-sm text-gray-600">I read every message and typically respond within 24–48 hours.</p>
            </div>
          </div>

          {/* RIGHT — Contact form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-7">
            <h2 className="text-lg font-black text-gray-900 mb-1">Send a message</h2>
            <p className="text-sm text-gray-400 mb-6">All enquiries welcome — product or personal.</p>
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  )
}
