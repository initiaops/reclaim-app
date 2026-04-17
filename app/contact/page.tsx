import type { Metadata } from 'next'
import Image from 'next/image'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact — RECLAIM | Get in Touch',
  description: "I read every message and respond personally. No bots, no support tickets.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — RECLAIM | Get in Touch',
    description: "I read every message and respond personally. No bots, no support tickets.",
    url: 'https://www.getreclaimapp.com/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block text-xs font-bold uppercase tracking-widest mb-6 px-4 py-1.5 rounded-full"
            style={{ backgroundColor: '#EDE9FE', color: 'var(--brand)' }}>
            Contact
          </div>

          {/* Founder card */}
          <div className="flex items-start gap-5 mb-8">
            <div className="shrink-0">
              <Image
                src="/kunal.jpg"
                alt="Kunal Kothari"
                width={80}
                height={80}
                className="rounded-full object-cover"
                style={{ border: '3px solid #534AB7' }}
              />
            </div>
            <div>
              <p className="font-black text-gray-900 text-lg leading-tight">Kunal Kothari</p>
              <p className="text-sm text-gray-500 mt-0.5">Founder, RECLAIM · Strategy &amp; Operations</p>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-lg">
                7 years in aerospace operations at RTX — building RECLAIM to solve the capacity problem I lived firsthand.
              </p>
            </div>
          </div>

          <h1 className="text-4xl font-black text-gray-900 mb-3">Get in touch</h1>
          <p className="text-xl text-gray-500">
            I read every message and respond personally. No bots, no support tickets.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* Contact cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-7">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Email</p>
            <a
              href="mailto:initiaops@gmail.com"
              className="text-lg font-bold hover:opacity-80 transition-opacity"
              style={{ color: 'var(--brand)' }}
            >
              initiaops@gmail.com
            </a>
            <p className="text-sm text-gray-400 mt-1">Usually responds within 24 hours</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-7">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">LinkedIn</p>
            <a
              href="https://www.linkedin.com/in/kkothari-1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold hover:opacity-80 transition-opacity"
              style={{ color: 'var(--brand)' }}
            >
              Kunal Kothari
            </a>
            <p className="text-sm text-gray-400 mt-1">Connect for ops and BizOps discussions</p>
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-7">
          <h2 className="text-lg font-black text-gray-900 mb-1">Send a message</h2>
          <p className="text-sm text-gray-400 mb-6">All enquiries welcome.</p>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
