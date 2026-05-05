import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    pro_price_id: process.env.STRIPE_PRO_PRICE_ID
      ? `${process.env.STRIPE_PRO_PRICE_ID.slice(0, 12)}...`
      : 'MISSING',
    ltd_price_id: process.env.STRIPE_LTD_PRICE_ID
      ? `${process.env.STRIPE_LTD_PRICE_ID.slice(0, 12)}...`
      : 'MISSING',
    topup_price_id: process.env.STRIPE_TOPUP_PRICE_ID
      ? `${process.env.STRIPE_TOPUP_PRICE_ID.slice(0, 12)}...`
      : 'MISSING',
    site_url: process.env.NEXT_PUBLIC_SITE_URL
      || 'MISSING',
    node_env: process.env.NODE_ENV,
  })
}
