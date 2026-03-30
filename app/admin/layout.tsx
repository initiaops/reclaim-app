import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const ADMIN_EMAIL = 'initiaops@gmail.com'

// This layout wraps every page under /admin — including any future sub-pages.
// It is the single source of truth for admin access control.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Primary check: role column in subscriptions table
  const admin = createAdminClient()
  const { data: sub } = await admin
    .from('subscriptions')
    .select('role')
    .eq('user_id', user.id)
    .single()

  // Fallback: email check in case the role column isn't set yet
  const isAdmin = sub?.role === 'admin' || user.email === ADMIN_EMAIL
  if (!isAdmin) redirect('/dashboard')

  return <>{children}</>
}
