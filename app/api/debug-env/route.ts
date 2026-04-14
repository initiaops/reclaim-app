import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    has_client_id: !!process.env.GOOGLE_CLIENT_ID,
    has_client_secret: !!process.env.GOOGLE_CLIENT_SECRET,
    has_redirect_uri: !!process.env.GOOGLE_REDIRECT_URI,
    client_id_prefix: process.env.GOOGLE_CLIENT_ID?.slice(0,20) || 'missing',
    redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'missing',
    node_env: process.env.NODE_ENV,
  })
}
