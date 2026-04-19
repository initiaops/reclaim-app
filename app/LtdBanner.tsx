import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'

export default async function LtdBanner() {
  let remaining = 100
  try {
    const supabase = createAdminClient()
    const { count } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('plan', 'founder')
    remaining = Math.max(0, 100 - (count ?? 0))
  } catch {}

  const bgColor = remaining < 20 ? '#DC2626' : '#D97706'
  const label = remaining < 20
    ? `Only ${remaining} spots left`
    : `${remaining} of 100 spots remaining`

  return (
    <div className="w-full text-center py-2.5 px-4 text-sm font-semibold text-white" style={{ backgroundColor: bgColor }}>
      Early Access — {label} — $19 one-time ·{' '}
      <Link href="/pricing" className="underline underline-offset-2 font-black hover:opacity-80 transition-opacity">
        Claim yours →
      </Link>
    </div>
  )
}
