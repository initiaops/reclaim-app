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

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch plan, usage, and extraction history in parallel — fresh on every page load
  const [{ data: sub }, { data: usageRow }, { data: historyRows }] = await Promise.all([
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
    supabase
      .from('extractions')
      .select('id, transcript_excerpt, result, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const isPro = sub?.plan === 'pro' && sub?.status === 'active'
  const usageCount = usageRow?.count ?? 0
  const history = (historyRows ?? []).map((row) => ({
    id: row.id as string,
    excerpt: (row.transcript_excerpt as string) ?? '',
    result: row.result as Record<string, unknown>,
    created_at: row.created_at as string,
  }))

  return (
    <Suspense>
      <DashboardClient
        userEmail={user.email ?? ''}
        isPro={isPro}
        initialUsageCount={usageCount}
        initialHistory={history}
      />
    </Suspense>
  )
}
