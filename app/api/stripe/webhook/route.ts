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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.user_id
    const type = session.metadata?.type

    if (type === 'ltd' && userId) {
      await supabase.from('subscriptions').upsert(
        {
          user_id: userId,
          plan: 'founder',
          audit_limit: 10,
          stripe_customer_id: session.customer as string,
          status: 'active',
        },
        { onConflict: 'user_id' }
      )
    }

    if (type === 'topup' && userId) {
      // Get current topup_audits value
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('topup_audits')
        .eq('user_id', userId)
        .single()

      const current = sub?.topup_audits ?? 0
      const now = new Date()
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)

      await supabase.from('subscriptions').upsert(
        {
          user_id: userId,
          topup_audits: current + 10,
          topup_expires_at: endOfMonth.toISOString(),
        },
        { onConflict: 'user_id' }
      )
    }

    if (type === 'session') {
      const customerEmail = session.customer_details?.email ?? null
      await supabase.from('sessions_booked').insert({
        user_id: userId ?? null,
        customer_email: customerEmail,
        stripe_session_id: session.id,
      })
      // Note: email notification to founder happens via Stripe dashboard / email settings
    }

    // Legacy: handle old Pro subscription checkout (no type metadata)
    if (!type && userId) {
      await supabase.from('subscriptions').upsert(
        {
          user_id: userId,
          plan: 'pro',
          audit_limit: 999,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          status: 'active',
        },
        { onConflict: 'user_id' }
      )
    }
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
