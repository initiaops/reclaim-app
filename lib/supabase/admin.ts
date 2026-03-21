import { createClient } from '@supabase/supabase-js'

// This client uses the service role key — it bypasses Row Level Security.
// Only use it in server-side code that is NOT accessible to users (e.g. webhooks).
// Never expose the service role key to the browser.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
