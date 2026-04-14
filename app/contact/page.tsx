import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact — RECLAIM | Get in Touch',
  description: 'Questions about RECLAIM, early access, or partnership opportunities? We\'d love to hear from you.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — RECLAIM | Get in Touch',
    description: 'Questions about RECLAIM, early access, or partnership opportunities? We\'d love to hear from you.',
    url: 'https://www.getreclaimapp.com/contact',
  },
}

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
            Questions about RECLAIM, early access, or partnership opportunities? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      {/* Two-column body */}
      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* LEFT — contact info */}
          <div className="space-y-6">
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

            <div className="bg-purple-50 border border-purple-100 rounded-xl px-5 py-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                We&apos;re a small team building in public. Your feedback directly shapes the product.
              </p>
            </div>
          </div>

          {/* RIGHT — Contact form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-7">
            <h2 className="text-lg font-black text-gray-900 mb-1">Send a message</h2>
            <p className="text-sm text-gray-400 mb-6">All enquiries welcome.</p>
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  )
}
