import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL!))
  }

  const params = new URLSearchParams({
    client_id: process.env.HUBSPOT_CLIENT_ID!,
    redirect_uri: process.env.NEXT_PUBLIC_HUBSPOT_REDIRECT_URI!,
    scope: 'crm.objects.deals.write crm.objects.contacts.write crm.objects.deals.read oauth',
    state: user.id,
  })

  return NextResponse.redirect(
    `https://app.hubspot.com/oauth/authorize?${params.toString()}`
  )
}
