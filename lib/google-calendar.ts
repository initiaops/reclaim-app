import { createAdminClient } from '@/lib/supabase/admin'

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'

/**
 * Returns a valid Google access token for the given userId,
 * refreshing it via refresh_token if it is within 5 minutes of expiry.
 * Uses the admin client to bypass RLS on calendar_connections.
 */
export async function getValidGoogleToken(userId: string): Promise<string> {
  const admin = createAdminClient()

  const { data: conn } = await admin
    .from('calendar_connections')
    .select('access_token, refresh_token, token_expires_at')
    .eq('user_id', userId)
    .single()

  if (!conn) throw new Error('No Google Calendar connection found')

  const expiresAt    = conn.token_expires_at ? new Date(conn.token_expires_at) : null
  const needsRefresh = !expiresAt || expiresAt.getTime() - Date.now() < 5 * 60 * 1000

  if (!needsRefresh) return conn.access_token
  if (!conn.refresh_token) throw new Error('No refresh token — user must reconnect Google Calendar')

  const res = await fetch(GOOGLE_TOKEN_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type:    'refresh_token',
      client_id:     process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: conn.refresh_token,
    }),
  })

  if (!res.ok) throw new Error('Failed to refresh Google token')

  const tokens      = await res.json()
  const newExpiry   = new Date(Date.now() + (tokens.expires_in ?? 3600) * 1000).toISOString()

  await admin
    .from('calendar_connections')
    .update({ access_token: tokens.access_token, token_expires_at: newExpiry })
    .eq('user_id', userId)

  return tokens.access_token
}
