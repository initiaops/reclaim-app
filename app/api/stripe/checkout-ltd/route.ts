import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/login?next=/api/stripe/checkout-ltd', request.url))
  }

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('user_id', user.id)
    .single()

  if (sub?.plan === 'founder') {
    return NextResponse.redirect(new URL('/dashboard/billing', request.url))
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{ price: process.env.STRIPE_LTD_PRICE_ID!, quantity: 1 }],
    customer_email: user.email,
    allow_promotion_codes: true,
    metadata: { user_id: user.id, type: 'ltd' },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/dashboard?welcome=founder`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/pricing`,
  })

  return NextResponse.redirect(session.url!)
}
