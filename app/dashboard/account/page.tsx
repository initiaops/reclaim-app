import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AccountClient from './AccountClient'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, job_title, company, industry, team_size, weekly_brief_email, risk_alert_email, product_updates_email')
    .eq('user_id', user.id)
    .single()

  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Unknown'

  return (
    <AccountClient
      userEmail={user.email ?? ''}
      joinedDate={joinedDate}
      profile={profile ?? {}}
    />
  )
}
