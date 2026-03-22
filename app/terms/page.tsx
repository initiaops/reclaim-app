import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — RECLAIM',
  description: 'Read the RECLAIM terms of service. Understand your rights and responsibilities when using our AI sales intelligence tool.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service — RECLAIM',
    description: 'Read the RECLAIM terms of service.',
    url: 'https://www.getreclaimapp.com/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: March 2025</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Acceptance of terms</h2>
            <p>By creating an account or using RECLAIM (&quot;the Service&quot;), you agree to these Terms of Service. If you do not agree, please do not use the Service.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Description of service</h2>
            <p>RECLAIM is an AI-powered tool that extracts structured CRM data from sales call transcripts and email threads. The Service uses third-party AI models (OpenAI) to process the content you provide.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Account responsibilities</h2>
            <p>You are responsible for maintaining the security of your account credentials. You must not share your account with others or use the Service for any unlawful purpose. You must be at least 18 years old to use the Service.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Free plan limits</h2>
            <p>Free accounts are limited to 5 extractions per calendar month. Limits reset on the 1st of each month. We reserve the right to adjust free plan limits at any time with reasonable notice.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Payments and refunds</h2>
            <p>Pro plan subscriptions are billed monthly at the current listed price. All payments are processed by Stripe. We offer a 30-day money-back guarantee — if you are not satisfied, email us within 30 days of your first payment for a full refund. After 30 days, all sales are final. You may cancel your subscription at any time, effective at the end of the current billing period.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Content you submit</h2>
            <p>You retain ownership of all content you submit to the Service. By submitting content, you grant us a limited license to process it solely for the purpose of providing the extraction service. We do not store your transcript content after processing is complete.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Prohibited uses</h2>
            <p>You may not use the Service to process content that violates any applicable law, infringes on third-party rights, or contains harmful, abusive, or illegal material. You may not attempt to reverse-engineer, scrape, or abuse the Service.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Disclaimer of warranties</h2>
            <p>The Service is provided &quot;as is&quot; without warranties of any kind. AI extraction results may not be 100% accurate. We do not guarantee uninterrupted availability of the Service. You should verify extracted data before entering it into your CRM.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Limitation of liability</h2>
            <p>To the maximum extent permitted by law, RECLAIM shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service. Our total liability is limited to the amount you paid in the 3 months preceding any claim.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">10. Changes to terms</h2>
            <p>We may update these terms from time to time. Continued use of the Service after changes constitutes acceptance of the updated terms. We will notify you of material changes via email.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">11. Contact</h2>
            <p>Questions about these terms? Email us at <a href="mailto:hello@getreclaimapp.com" className="underline" style={{ color: 'var(--brand)' }}>hello@getreclaimapp.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
