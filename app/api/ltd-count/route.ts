import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { count } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('plan', 'founder')
    const sold = count ?? 0
    return NextResponse.json({ sold, remaining: Math.max(0, 100 - sold) })
  } catch {
    return NextResponse.json({ sold: 0, remaining: 100 })
  }
}
