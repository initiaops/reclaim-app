import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — RECLAIM',
  description: 'Read the RECLAIM privacy policy. Learn how we collect, use, and protect your data.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy — RECLAIM',
    description: 'Read the RECLAIM privacy policy.',
    url: 'https://www.getreclaimapp.com/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: March 2025</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. What we collect</h2>
            <p>We collect your email address and password when you create an account. We store your monthly extraction usage count so we can enforce the free plan limit. We do not store the content of your transcripts on our servers.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. How we use your data</h2>
            <p>Your email is used to send you a confirmation link when you sign up and to identify your account. Usage data is used solely to enforce the 5 extraction/month free limit. If you upgrade to Pro, your payment is processed by Stripe — we never see your card details.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Transcripts and AI processing</h2>
            <p>When you click "Extract Intelligence", the transcript you pasted is sent to OpenAI&apos;s API for processing. OpenAI does not use API submissions to train their models. The transcript is not stored by RECLAIM after processing completes.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Third-party services</h2>
            <p>We use <strong>Supabase</strong> for user authentication and database storage, <strong>OpenAI</strong> for AI extraction, <strong>Stripe</strong> for payment processing, and <strong>Vercel</strong> for hosting. Each of these services has their own privacy policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Data deletion</h2>
            <p>You can delete your account at any time by emailing <a href="mailto:initiaops@gmail.com" className="underline" style={{ color: 'var(--brand)' }}>initiaops@gmail.com</a>. We will delete all personal data within 30 days of your request.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Contact</h2>
            <p>If you have any questions about this policy, email us at <a href="mailto:initiaops@gmail.com" className="underline" style={{ color: 'var(--brand)' }}>initiaops@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
