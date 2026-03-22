import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Log In — RECLAIM',
  description: 'Sign in to your RECLAIM account to extract CRM data from sales call transcripts and emails.',
  alternates: { canonical: '/login' },
  openGraph: {
    title: 'Log In — RECLAIM',
    description: 'Sign in to your RECLAIM account.',
    url: 'https://www.getreclaimapp.com/login',
  },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
