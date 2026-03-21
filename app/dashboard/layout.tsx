import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

async function signOut() {
  'use server'
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('plan, status')
    .eq('user_id', user.id)
    .single()

  const isPro = sub?.plan === 'pro' && sub?.status === 'active'

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '⬡' },
    { href: '/dashboard/account', label: 'Account', icon: '○' },
    { href: '/dashboard/billing', label: 'Billing', icon: '◇' },
  ]

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar — desktop only */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-white border-r border-gray-200 sticky top-16 h-[calc(100vh-64px)]">
        <div className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-800 transition-all group"
            >
              <span className="text-gray-300 group-hover:text-purple-400 transition-colors text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

        {/* User info + sign out */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ backgroundColor: 'var(--brand)' }}
            >
              {(user.email ?? 'U')[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-700 truncate">{user.email}</p>
              <p className="text-xs text-gray-400">{isPro ? '⚡ Pro Plan' : 'Free Plan'}</p>
            </div>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full text-left px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile nav bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex-1 flex flex-col items-center gap-1 py-3 text-gray-500 hover:text-purple-700 transition-colors text-xs font-medium"
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 pb-20 lg:pb-0">
        {children}
      </div>
    </div>
  )
}
