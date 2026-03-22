import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up Free — RECLAIM',
  description: 'Create a free RECLAIM account. Get 5 AI-powered CRM extractions per month at no cost. No credit card required.',
  alternates: { canonical: '/signup' },
  openGraph: {
    title: 'Sign Up Free — RECLAIM',
    description: 'Create a free RECLAIM account. No credit card required.',
    url: 'https://www.getreclaimapp.com/signup',
  },
}

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
