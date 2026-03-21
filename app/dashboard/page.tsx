import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import DashboardClient from './DashboardClient'

function getCurrentMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export default async function DashboardPage() {
  const supabase = await createClient()

  // Get authenticated user — redirect to login if session is missing
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch plan and usage in parallel — fresh on every page load
  const [{ data: sub }, { data: usageRow }] = await Promise.all([
    supabase
      .from('subscriptions')
      .select('plan, status')
      .eq('user_id', user.id)
      .single(),
    supabase
      .from('usage')
      .select('count')
      .eq('user_id', user.id)
      .eq('month', getCurrentMonth())
      .single(),
  ])

  const isPro = sub?.plan === 'pro' && sub?.status === 'active'
  const usageCount = usageRow?.count ?? 0

  return (
    <Suspense>
      <DashboardClient
        userEmail={user.email ?? ''}
        isPro={isPro}
        initialUsageCount={usageCount}
      />
    </Suspense>
  )
}
