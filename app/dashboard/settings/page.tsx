import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import APIKeySection from './APIKeySection'
import AuditPreferencesForm from './AuditPreferencesForm'
import CalendarCard from './CalendarCard'

async function disconnectHubSpot() {
  'use server'
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  await supabase.from('crm_connections').delete().eq('user_id', user.id).eq('provider', 'hubspot')
  redirect('/dashboard/settings')
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ connected?: string; error?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const params = await searchParams

  const [
    { data: sub },
    { data: connections },
    { data: profile },
    { data: calendarConn },
  ] = await Promise.all([
    supabase.from('subscriptions').select('plan, status').eq('user_id', user.id).single(),
    supabase.from('crm_connections').select('provider, hub_id, hub_domain').eq('user_id', user.id),
    supabase.from('profiles').select('default_team_size, default_industry, audit_reminder, audit_reminder_day').eq('user_id', user.id).single(),
    supabase.from('calendar_connections').select('email, last_synced_at, event_count').eq('user_id', user.id).single(),
  ])

  const isPro = sub?.plan === 'pro' && sub?.status === 'active'
  const isFounder = sub?.plan === 'founder'
  const hasProAccess = isPro || isFounder

  const hubspot = connections?.find(c => c.provider === 'hubspot') ?? null
  const connectedLabel = hubspot?.hub_domain ?? (hubspot?.hub_id ? `Account ${hubspot.hub_id}` : null)

  // Pseudo API key based on user ID (prefixed, beta)
  const apiKey = `rclm_${user.id.replace(/-/g, '').slice(0, 32)}`

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">

        <div>
          <h1 className="text-2xl font-black text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Connected tools, audit preferences, and API access.</p>
        </div>

        {/* Banners */}
        {params.connected === 'hubspot' && (
          <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-4 flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">✓</div>
            <div>
              <p className="font-bold text-green-800">HubSpot connected!</p>
              <p className="text-sm text-green-600 mt-0.5">CRM sync is available in your dashboard.</p>
            </div>
          </div>
        )}
        {params.connected === 'calendar' && (
          <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-4 flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">✓</div>
            <div>
              <p className="font-bold text-green-800">Google Calendar connected!</p>
              <p className="text-sm text-green-600 mt-0.5">Your meeting data will appear in the dashboard after the first sync.</p>
            </div>
          </div>
        )}
        {params.error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-4">
            <p className="font-bold text-red-800">Connection failed</p>
            <p className="text-sm text-red-600 mt-1">
              {params.error === 'cancelled' ? 'You cancelled the authorization.' : 'Something went wrong. Please try again.'}
            </p>
          </div>
        )}

        {/* ── Integrations ─────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-black text-gray-900">Connected Tools</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Connect your work tools to enrich your capacity audits with real data.
            </p>
          </div>

          <div className="divide-y divide-gray-50">

            {/* Google Calendar */}
            <CalendarCard
              connected={!!calendarConn}
              email={calendarConn?.email ?? null}
              lastSyncedAt={calendarConn?.last_synced_at ?? null}
              eventCount={calendarConn?.event_count ?? 0}
            />

            {/* Slack — coming soon */}
            <div className="px-6 py-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-sm font-black shrink-0" style={{ color: '#534AB7' }}>
                  S
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Slack</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Analyze communication patterns to identify bottlenecks and context switching
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-400 shrink-0">
                Coming soon
              </span>
            </div>

            {/* Notion / Confluence — coming soon */}
            <div className="px-6 py-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-sm font-black text-gray-600 shrink-0">
                  N
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Notion / Confluence</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Connect your project tracker to map capacity against active initiatives
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-400 shrink-0">
                Coming soon
              </span>
            </div>

            {/* HubSpot — legacy */}
            <div className="px-6 py-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#FF7A59">
                    <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.268-1.978V3.07A2.2 2.2 0 0 0 17.234.87h-.037a2.2 2.2 0 0 0-2.198 2.2v.036a2.198 2.198 0 0 0 1.268 1.978V7.93a6.232 6.232 0 0 0-2.963 1.3l-7.814-6.08a2.45 2.45 0 0 0 .08-.594 2.463 2.463 0 1 0-2.463 2.463 2.44 2.44 0 0 0 1.218-.333l7.686 5.978a6.24 6.24 0 0 0 .076 7.17l-2.33 2.33a1.983 1.983 0 0 0-.578-.09 2.003 2.003 0 1 0 2.003 2.003 1.983 1.983 0 0 0-.09-.578l2.302-2.302a6.26 6.26 0 1 0 4.77-11.267zm-.966 9.519a3.268 3.268 0 1 1 0-6.536 3.268 3.268 0 0 1 0 6.536z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 text-sm">HubSpot</p>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">Legacy</span>
                  </div>
                  {hubspot ? (
                    <p className="text-xs text-green-600 font-medium mt-0.5">
                      ✓ Connected{connectedLabel ? ` · ${connectedLabel}` : ''}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400 mt-0.5">
                      Legacy CRM sync for Sales Ops module
                    </p>
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
                  className="text-xs font-bold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90 shrink-0"
                  style={{ backgroundColor: '#FF7A59' }}
                >
                  Connect
                </Link>
              )}
            </div>

          </div>
        </div>

        {/* ── Audit Preferences ────────────────────────────────────── */}
        <AuditPreferencesForm
          defaultTeamSize={String(profile?.default_team_size ?? '')}
          defaultIndustry={profile?.default_industry ?? ''}
          auditReminder={profile?.audit_reminder ?? false}
          auditReminderDay={profile?.audit_reminder_day ?? '1st'}
        />

        {/* ── API Access ───────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-black text-gray-900">API Access</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Integrate RECLAIM intelligence into your own tools and dashboards.
            </p>
          </div>
          <div className="px-6 py-5">
            <APIKeySection isPro={hasProAccess} apiKey={apiKey} />
          </div>
        </div>

      </div>
    </div>
  )
}

