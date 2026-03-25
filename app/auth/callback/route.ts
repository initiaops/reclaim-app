import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(
        new URL(next, process.env.NEXT_PUBLIC_SITE_URL!)
      )
    }
  }

  // Something went wrong — send to login with a helpful message
  return NextResponse.redirect(
    new URL('/login?error=confirmation_failed', process.env.NEXT_PUBLIC_SITE_URL!)
  )
}
