import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code   = searchParams.get('code')
  const userId = searchParams.get('state')
  const error  = searchParams.get('error')

  const appOrigin = process.env.NEXT_PUBLIC_SITE_URL
    ?? (process.env.GOOGLE_REDIRECT_URI ? new URL(process.env.GOOGLE_REDIRECT_URI).origin : null)
    ?? `https://${request.headers.get('host') ?? 'localhost:3000'}`

  if (error || !code || !userId) {
    return NextResponse.redirect(
      new URL('/dashboard/settings?calendar=error', appOrigin)
    )
  }

  // Exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id:     process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri:  process.env.GOOGLE_REDIRECT_URI!,
      grant_type:    'authorization_code',
    }),
  })

  if (!tokenRes.ok) {
    console.error('Google token exchange failed:', await tokenRes.text())
    return NextResponse.redirect(new URL('/dashboard/settings?calendar=error', appOrigin))
  }

  const tokens = await tokenRes.json()

  // Get the user's Google email
  const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  })
  const userInfo = userInfoRes.ok ? await userInfoRes.json() : {}

  const expiresAt = new Date(Date.now() + (tokens.expires_in ?? 3600) * 1000).toISOString()

  const admin = createAdminClient()
  await admin.from('calendar_connections').upsert({
    user_id:          userId,
    access_token:     tokens.access_token,
    refresh_token:    tokens.refresh_token ?? null,
    token_expires_at: expiresAt,
    email:            userInfo.email ?? null,
    connected_at:     new Date().toISOString(),
  }, { onConflict: 'user_id' })

  return NextResponse.redirect(
    new URL('/dashboard/settings?calendar=connected', appOrigin)
  )
}
