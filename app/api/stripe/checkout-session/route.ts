import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Allow unauthenticated purchase — capture email at Stripe
  const customerEmail = user?.email

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{ price: process.env.STRIPE_SESSION_PRICE_ID!, quantity: 1 }],
    ...(customerEmail ? { customer_email: customerEmail } : {}),
    metadata: {
      ...(user?.id ? { user_id: user.id } : {}),
      type: 'session',
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/dashboard?session=booked`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/pricing`,
  })

  return NextResponse.redirect(session.url!)
}
