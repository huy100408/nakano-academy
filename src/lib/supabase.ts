import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

/** False when the build has no Supabase credentials (e.g. a fork without a .env). */
export const supabaseConfigured = Boolean(url && key)

export const supabase = createClient<Database>(url || 'http://localhost.invalid', key || 'missing-key', {
  auth: {
    flowType: 'pkce',
    persistSession: true,
    autoRefreshToken: true,
    // The web build finishes the Google redirect itself (?code=…). The desktop app
    // receives the code through its nakano:// link and exchanges it manually.
    detectSessionInUrl: !window.nakano,
    storageKey: 'nakano-academy-auth',
  },
})

export const isDesktop = Boolean(window.nakano)

/** Where Google should send people back after signing in. */
export function oauthRedirectUrl(): string {
  if (isDesktop) return 'nakano://auth-callback'
  // The web app can live at any path (/nakano-academy/learn/ on GitHub Pages, / in dev):
  // return to exactly this page, without any query string or hash.
  return `${location.origin}${location.pathname}`
}
