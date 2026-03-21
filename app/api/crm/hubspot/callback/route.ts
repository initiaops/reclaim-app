import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  // User cancelled or HubSpot returned an error
  if (error || !code) {
    return NextResponse.redirect(`${SITE_URL}/dashboard/settings?error=cancelled`)
  }

  // Authenticate — state must match the logged-in user's ID
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.id !== state) {
    return NextResponse.redirect(`${SITE_URL}/dashboard/settings?error=auth`)
  }

  // Exchange the authorization code for access + refresh tokens
  const tokenRes = await fetch('https://api.hubapi.com/oauth/v1/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.HUBSPOT_CLIENT_ID!,
      client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
      redirect_uri: process.env.NEXT_PUBLIC_HUBSPOT_REDIRECT_URI!,
      code,
    }),
  })

  if (!tokenRes.ok) {
    console.error('HubSpot token exchange failed:', await tokenRes.text())
    return NextResponse.redirect(`${SITE_URL}/dashboard/settings?error=token`)
  }

  const tokens = await tokenRes.json()
  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString()

  // Fetch account info (hub_id, hub_domain) from the token
  let hubId: string | null = null
  let hubDomain: string | null = null
  try {
    const infoRes = await fetch(
      `https://api.hubapi.com/oauth/v1/access-tokens/${tokens.access_token}`
    )
    if (infoRes.ok) {
      const info = await infoRes.json()
      hubId = info.hub_id?.toString() ?? null
      hubDomain = info.hub_domain ?? null
    }
  } catch {
    // Non-fatal — we'll still store the connection without hub metadata
  }

  // Upsert connection into Supabase
  const { error: dbError } = await supabase.from('crm_connections').upsert(
    {
      user_id: user.id,
      provider: 'hubspot',
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token ?? null,
      expires_at: expiresAt,
      hub_id: hubId,
      hub_domain: hubDomain,
    },
    { onConflict: 'user_id,provider' }
  )

  if (dbError) {
    console.error('Failed to save HubSpot connection:', dbError)
    return NextResponse.redirect(`${SITE_URL}/dashboard/settings?error=db`)
  }

  return NextResponse.redirect(`${SITE_URL}/dashboard/settings?connected=hubspot`)
}
