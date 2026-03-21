import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import Stripe from 'stripe'

// Tell Next.js NOT to parse the body — Stripe needs the raw bytes to verify the signature
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  const supabase = createAdminClient()

  // Handle payment confirmed — upgrade user to Pro
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.user_id

    if (!userId) {
      return NextResponse.json({ error: 'No user_id in metadata' }, { status: 400 })
    }

    await supabase.from('subscriptions').upsert(
      {
        user_id: userId,
        plan: 'pro',
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
        status: 'active',
      },
      { onConflict: 'user_id' }
    )
  }

  // Handle subscription cancelled or expired — downgrade to Free
  if (
    event.type === 'customer.subscription.deleted' ||
    (event.type === 'customer.subscription.updated' &&
      (event.data.object as Stripe.Subscription).status === 'canceled')
  ) {
    const subscription = event.data.object as Stripe.Subscription

    await supabase
      .from('subscriptions')
      .update({ plan: 'free', status: 'canceled' })
      .eq('stripe_subscription_id', subscription.id)
  }

  return NextResponse.json({ received: true })
}
