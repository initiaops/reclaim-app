import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

async function disconnectHubSpot() {
  'use server'
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return
  await supabase
    .from('crm_connections')
    .delete()
    .eq('user_id', user.id)
    .eq('provider', 'hubspot')
  redirect('/dashboard/settings')
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ connected?: string; error?: string }>
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const params = await searchParams

  const { data: connections } = await supabase
    .from('crm_connections')
    .select('provider, hub_id, hub_domain, created_at')
    .eq('user_id', user.id)

  const hubspot = connections?.find((c) => c.provider === 'hubspot') ?? null

  const connectedLabel = hubspot?.hub_domain
    ? hubspot.hub_domain
    : hubspot?.hub_id
      ? `Account ${hubspot.hub_id}`
      : null

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Settings</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your connected apps and preferences.</p>
      </div>

      {/* Success banner */}
      {params.connected === 'hubspot' && (
        <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-4 flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-lg shrink-0">✓</div>
          <div>
            <p className="font-bold text-green-800">HubSpot connected!</p>
            <p className="text-sm text-green-600 mt-0.5">
              You can now push extraction results directly to your HubSpot CRM.
            </p>
          </div>
        </div>
      )}

      {/* Error banner */}
      {params.error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-4">
          <p className="font-bold text-red-800">Connection failed</p>
          <p className="text-sm text-red-600 mt-1">
            {params.error === 'cancelled'
              ? 'You cancelled the HubSpot authorization.'
              : 'Something went wrong connecting to HubSpot. Please try again.'}
          </p>
        </div>
      )}

      {/* Connected Apps */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-black text-gray-900">Connected Apps</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Push extraction results directly to your CRM after each call.
          </p>
        </div>

        <div className="divide-y divide-gray-50">

          {/* HubSpot */}
          <div className="px-6 py-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FF7A59">
                  <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.268-1.978V3.07A2.2 2.2 0 0 0 17.234.87h-.037a2.2 2.2 0 0 0-2.198 2.2v.036a2.198 2.198 0 0 0 1.268 1.978V7.93a6.232 6.232 0 0 0-2.963 1.3l-7.814-6.08a2.45 2.45 0 0 0 .08-.594 2.463 2.463 0 1 0-2.463 2.463 2.44 2.44 0 0 0 1.218-.333l7.686 5.978a6.24 6.24 0 0 0 .076 7.17l-2.33 2.33a1.983 1.983 0 0 0-.578-.09 2.003 2.003 0 1 0 2.003 2.003 1.983 1.983 0 0 0-.09-.578l2.302-2.302a6.26 6.26 0 1 0 4.77-11.267zm-.966 9.519a3.268 3.268 0 1 1 0-6.536 3.268 3.268 0 0 1 0 6.536z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">HubSpot</p>
                {hubspot ? (
                  <p className="text-xs text-green-600 font-medium mt-0.5">
                    ✓ Connected{connectedLabel ? ` · ${connectedLabel}` : ''}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 mt-0.5">Not connected</p>
                )}
              </div>
            </div>

            {hubspot ? (
              <form action={disconnectHubSpot}>
                <button
                  type="submit"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer"
                >
                  Disconnect
                </button>
              </form>
            ) : (
              <Link
                href="/api/crm/hubspot/auth"
                className="text-xs font-bold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90 shrink-0"
                style={{ backgroundColor: '#FF7A59' }}
              >
                Connect
              </Link>
            )}
          </div>

          {/* Salesforce */}
          <div className="px-6 py-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#00A1E0">
                  <path d="M10.002 6.16c.717-.75 1.722-1.22 2.838-1.22 1.47 0 2.756.816 3.44 2.027a4.58 4.58 0 0 1 1.804-.365c2.533 0 4.588 2.056 4.588 4.59 0 2.533-2.055 4.588-4.588 4.588a4.564 4.564 0 0 1-.95-.1 3.27 3.27 0 0 1-3.006 1.97 3.252 3.252 0 0 1-1.407-.316 3.89 3.89 0 0 1-3.638 2.523 3.887 3.887 0 0 1-3.745-2.852 3.432 3.432 0 0 1-.5.037C2.374 17.14.75 15.517.75 13.516c0-1.374.762-2.572 1.888-3.198a3.956 3.956 0 0 1-.103-.882C2.535 7.214 4.388 5.36 6.67 5.36c1.356 0 2.558.635 3.332 1.8z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Salesforce</p>
                <p className="text-xs text-gray-400 mt-0.5">Not connected</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-400 shrink-0">
              Coming soon
            </span>
          </div>

          {/* Pipedrive */}
          <div className="px-6 py-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#1A1A1A">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2zm0 14.4a8.4 8.4 0 0 1-7.2-4.08c.036-2.388 4.8-3.696 7.2-3.696 2.388 0 7.164 1.308 7.2 3.696A8.4 8.4 0 0 1 12 19.2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Pipedrive</p>
                <p className="text-xs text-gray-400 mt-0.5">Not connected</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-400 shrink-0">
              Coming soon
            </span>
          </div>

        </div>
      </div>

      {/* Preferences placeholder */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-black text-gray-900">Preferences</h2>
        </div>
        <div className="px-6 py-10 text-center">
          <p className="text-sm text-gray-400">Preference settings coming soon.</p>
        </div>
      </div>

    </div>
  )
}
