import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const admin = createAdminClient()
  const { error } = await admin
    .from('waitlist')
    .insert({ email: email.trim().toLowerCase() })

  if (error) {
    // Duplicate email — treat as success so we don't leak membership info
    if (error.code === '23505') {
      return NextResponse.json({ ok: true })
    }
    console.error('Waitlist insert error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
