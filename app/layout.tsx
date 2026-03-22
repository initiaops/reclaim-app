import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.getreclaimapp.com'),
  title: {
    default: 'RECLAIM — AI Sales Intelligence | Stop Manual CRM Data Entry',
    template: '%s',
  },
  description:
    'RECLAIM reads your sales calls and emails and automatically extracts every CRM field in seconds. Save 5 hours a week. Free to try.',
  openGraph: {
    title: 'RECLAIM — AI Sales Intelligence | Stop Manual CRM Data Entry',
    description:
      'RECLAIM reads your sales calls and emails and automatically extracts every CRM field in seconds. Save 5 hours a week. Free to try.',
    url: 'https://www.getreclaimapp.com',
    siteName: 'RECLAIM',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RECLAIM — AI Sales Intelligence',
      },
    ],
  },
  verification: {
    google: '76unokSJOHqKJryxHzmMc4mVf5Jye5EDTcTsruEbHS4',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RECLAIM — AI Sales Intelligence | Stop Manual CRM Data Entry',
    description:
      'RECLAIM reads your sales calls and emails and automatically extracts every CRM field in seconds. Save 5 hours a week.',
    images: ['/og-image.png'],
  },
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                href="/"
                className="text-xl font-black tracking-tight"
                style={{ color: 'var(--brand)' }}
              >
                RECLAIM
              </Link>

              <div className="flex items-center gap-2 sm:gap-4">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-sm font-medium text-gray-700 hover:text-purple-800 transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/pricing"
                      className="text-sm font-medium text-gray-700 hover:text-purple-800 transition-colors px-3 py-2 rounded-lg hover:bg-purple-50 hidden sm:block"
                    >
                      Pricing
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/pricing"
                      className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 hidden sm:block"
                    >
                      Pricing
                    </Link>
                    <Link
                      href="/login"
                      className="text-sm font-medium text-gray-700 hover:text-purple-800 transition-colors px-3 py-2"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="text-sm font-semibold text-white px-4 py-2 rounded-lg transition-all hover:opacity-90 hover:shadow-md"
                      style={{ backgroundColor: 'var(--brand)' }}
                    >
                      Start free
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  )
}
