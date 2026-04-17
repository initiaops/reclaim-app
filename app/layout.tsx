import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.getreclaimapp.com'),
  title: {
    default: 'RECLAIM — Operational Intelligence for BizOps & Ops Leaders',
    template: '%s',
  },
  description:
    "Stop guessing where your team's time goes. RECLAIM maps your team's actual capacity, identifies administrative overhead, and tells you exactly where to redirect bandwidth.",
  openGraph: {
    title: 'RECLAIM — Operational Intelligence for BizOps & Ops Leaders',
    description:
      "Stop guessing where your team's time goes. RECLAIM maps your team's actual capacity, identifies administrative overhead, and tells you exactly where to redirect bandwidth.",
    url: 'https://www.getreclaimapp.com',
    siteName: 'RECLAIM',
    type: 'website',
    images: [
      {
        url: 'https://www.getreclaimapp.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RECLAIM — Operational Intelligence',
      },
    ],
  },
  verification: {
    google: '76unokSJOHqKJryxHzmMc4mVf5Jye5EDTcTsruEbHS4',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RECLAIM — Operational Intelligence for BizOps & Ops Leaders',
    description:
      "Stop guessing where your team's time goes. RECLAIM maps your team's actual capacity, identifies administrative overhead, and tells you exactly where to redirect bandwidth.",
    images: ['https://www.getreclaimapp.com/og-image.png'],
  },
}

async function signOut() {
  'use server'
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                href="/"
                className="text-xl font-black tracking-tight shrink-0"
                style={{ color: 'var(--brand)' }}
              >
                RECLAIM
              </Link>

              <div className="flex items-center gap-1 flex-wrap justify-end">
                {user ? (
                  <>
                    <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-purple-800 transition-colors px-2.5 py-2 rounded-lg hover:bg-purple-50">
                      Dashboard
                    </Link>
                    <Link href="/dashboard/account" className="text-sm font-medium text-gray-700 hover:text-purple-800 transition-colors px-2.5 py-2 rounded-lg hover:bg-purple-50 hidden sm:block">
                      Account
                    </Link>
                    <Link href="/dashboard/billing" className="text-sm font-medium text-gray-700 hover:text-purple-800 transition-colors px-2.5 py-2 rounded-lg hover:bg-purple-50 hidden sm:block">
                      Billing
                    </Link>
                    <Link href="/dashboard/settings" className="text-sm font-medium text-gray-700 hover:text-purple-800 transition-colors px-2.5 py-2 rounded-lg hover:bg-purple-50 hidden sm:block">
                      Settings
                    </Link>
                    <Link href="/guide" className="text-sm font-medium text-gray-700 hover:text-purple-800 transition-colors px-2.5 py-2 rounded-lg hover:bg-purple-50 hidden sm:block">
                      Guide
                    </Link>
                    <form action={signOut} className="hidden sm:block">
                      <button
                        type="submit"
                        className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors px-2.5 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                      >
                        Sign out
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <Link href="/#how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-2.5 py-2 hidden sm:block">
                      How it works
                    </Link>
                    <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-2.5 py-2 hidden sm:block">
                      Pricing
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-2.5 py-2 hidden sm:block">
                      About
                    </Link>
                    <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-2.5 py-2 hidden sm:block">
                      Blog
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-2.5 py-2 hidden sm:block">
                      Contact
                    </Link>
                    <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-purple-800 transition-colors px-2.5 py-2">
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="text-sm font-semibold text-white px-4 py-2 rounded-lg transition-all hover:opacity-90 hover:shadow-md"
                      style={{ backgroundColor: 'var(--brand)' }}
                    >
                      Join waitlist
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PSP19Q4RK4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PSP19Q4RK4');
        `}</Script>
      </body>
    </html>
  )
}
