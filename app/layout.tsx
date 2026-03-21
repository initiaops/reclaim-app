import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RECLAIM — AI Sales Intelligence',
  description:
    'Automatically extract CRM data from your sales calls and emails.',
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
        <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                href="/"
                className="text-xl font-bold tracking-tight"
                style={{ color: 'var(--brand)' }}
              >
                RECLAIM
              </Link>

              <div className="flex items-center gap-4">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-sm font-medium text-gray-700 hover:text-purple-800 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <form action={signOut}>
                      <button
                        type="submit"
                        className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                      >
                        Sign out
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-sm font-medium text-gray-700 hover:text-purple-800 transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="text-sm font-medium text-white px-4 py-2 rounded-lg transition-colors hover:opacity-90"
                      style={{ backgroundColor: 'var(--brand)' }}
                    >
                      Sign up
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
