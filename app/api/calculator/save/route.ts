import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { teamSize, annualSalary, adminTaxPct, monthlyCost, annualCost, userType } = body

    const supabase = await createClient()

    await supabase.from('calculator_results').insert({
      team_size: teamSize ?? null,
      annual_salary: annualSalary ?? null,
      admin_tax_pct: adminTaxPct ?? null,
      monthly_cost: monthlyCost ?? null,
      annual_cost: annualCost ?? null,
      user_type: userType ?? null,
    })

    return NextResponse.json({ ok: true })
  } catch {
    // Fail silently — never block the user experience
    return NextResponse.json({ ok: false })
  }
}
