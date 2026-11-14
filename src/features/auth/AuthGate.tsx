// Mandatory "Sign in with Google" gate, then cloud hydration.
// Web: Supabase redirects to Google and back to this page with ?code=… (PKCE).
// Desktop (Electron): Google opens in the default browser and returns through the
// nakano://auth-callback link, which electron/main.cjs forwards here.

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { AlertTriangle, Loader2, RefreshCw } from 'lucide-react'
import { isDesktop, oauthRedirectUrl, supabase, supabaseConfigured } from '../../lib/supabase'
import { DEFAULT_PROFILE_FIELDS, SupabaseSync, type CloudSnapshot } from '../../services/supabaseSync'
import { AcademyProvider } from '../../state/useAcademy'
import { SISTERS } from '../../data/sisters.js'

interface AuthCtx {
  user: User
  signOut: () => Promise<void>
}
const AuthContext = createContext<AuthCtx | null>(null)
export function useAuth(): AuthCtx {
  const c = useContext(AuthContext)
  if (!c) throw new Error('useAuth must be used inside <AuthGate>')
  return c
}

const asset = (p: string) => `./${p}`
const hasAuthParams = () => /[?&#](code|error|error_description)=/.test(location.search + location.hash)

function GoogleMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}

/** Full-screen themed loading state, used while a session or the cloud data loads. */
export function AcademyLoading({ label }: { label: string }) {
  return (
    <div className="safe-area flex h-full flex-col items-center justify-center bg-paper text-center">
      <div className="drag absolute inset-x-0 top-0 h-10" />
      <div className="flex -space-x-3">
        {SISTERS.map((s: any, i: number) => (
          <img
            key={s.id}
            src={asset(`avatars/${s.id}.jpg`)}
            alt=""
            className="h-12 w-12 rounded-full object-cover ring-[3px] ring-white"
            style={{ animation: `bob 1.2s ease-in-out ${i * 0.12}s infinite` }}
          />
        ))}
      </div>
      <div className="mt-6 flex items-center gap-2 text-[15px] font-semibold text-muted">
        <Loader2 size={16} className="animate-spin" /> {label}
      </div>
    </div>
  )
}

function LoginScreen({ onSignIn, waiting, error, onCancel }: { onSignIn: () => void; waiting: boolean; error: string | null; onCancel: () => void }) {
  return (
    <div className="safe-area relative flex h-full flex-col overflow-y-auto bg-paper">
      <div className="drag absolute inset-x-0 top-0 z-10 h-10" />
      {/* poster collage */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-5 opacity-[.18] blur-[2px]">
          {SISTERS.map((s: any) => (
            <img key={s.id} src={asset(`videos/${s.id}-poster.jpg`)} alt="" className="h-full w-full object-cover" />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-paper/70 via-paper/90 to-paper" />
      </div>

      <div className="relative m-auto w-full max-w-md px-6 py-12">
        <div className="flex justify-center -space-x-3">
          {SISTERS.map((s: any) => (
            <img key={s.id} src={asset(`avatars/${s.id}.jpg`)} alt={s.first} className="h-14 w-14 rounded-full object-cover ring-4 ring-white" style={{ boxShadow: `0 0 0 6px ${s.color}55` }} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <div className="text-[11px] font-bold uppercase tracking-[.24em] text-faint">Nakano Academy</div>
          <h1 className="mt-2 font-display text-[34px] font-extrabold leading-[1.05] tracking-tight">
            Sign in to start
            <br />
            your tutoring
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-[14.5px] leading-relaxed text-muted">
            Your scores, streaks, weak spots and items are saved to your Google account, so you can pick up on any phone, tablet or computer.
          </p>
        </div>

        <div className="card mt-8 p-5">
          {waiting ? (
            <div className="text-center">
              <Loader2 className="mx-auto animate-spin text-muted" size={22} />
              <div className="mt-3 text-[14.5px] font-semibold">Finish signing in with Google in your browser</div>
              <p className="mt-1 text-[12.5px] text-muted">The app continues automatically when you are done.</p>
              <button onClick={onCancel} className="mt-4 text-[12.5px] font-semibold text-muted underline hover:text-ink">
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={onSignIn}
              className="btn-3d flex min-h-[52px] w-full items-center justify-center gap-3 rounded-xl border border-line bg-white px-5 text-[15.5px] font-bold shadow-[0_1px_2px_rgb(0_0_0/.06)] transition hover:bg-ink/[.02] active:scale-[.99]"
            >
              <GoogleMark /> Sign in with Google
            </button>
          )}
          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-[12.5px] text-red-700">
              <AlertTriangle size={15} className="mt-0.5 shrink-0" /> {error}
            </div>
          )}
        </div>

        <div className="mt-6 rounded-2xl bg-ink px-5 py-4 text-[13px] leading-snug text-white/80">
          <span className="font-bold text-white">Fuutarou:</span> “No account, no progress tracking. No progress tracking, no graduation. Sign in.”
        </div>
        <p className="mt-6 text-center text-[11.5px] leading-relaxed text-faint">
          Free and open source. We only store your name, email, profile photo and study progress. Built by Brian Nguyen.
        </p>
      </div>
    </div>
  )
}

/** After sign-in: load cloud data, then render the app with it. */
function CloudSession({ user, children }: { user: User; children: ReactNode }) {
  const sync = useMemo(() => new SupabaseSync(user.id), [user.id])
  const [snap, setSnap] = useState<CloudSnapshot | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => () => sync.dispose(), [sync])
  useEffect(() => {
    let live = true
    setError(null)
    const meta = user.user_metadata || {}
    sync
      .hydrate({
        email: user.email ?? null,
        full_name: meta.full_name ?? meta.name ?? null,
        avatar_url: meta.avatar_url ?? meta.picture ?? null,
      })
      .then((s) => live && setSnap(s))
      .catch((e) => live && setError(e?.message || 'Could not reach Supabase.'))
    return () => {
      live = false
    }
  }, [sync, user, attempt])

  if (error)
    return (
      <div className="safe-area flex h-full flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
        <AlertTriangle className="text-amber-500" />
        <div className="max-w-sm text-[14px] text-muted">
          Couldn’t load your progress: <b className="text-ink">{error}</b>
        </div>
        <button onClick={() => setAttempt((a) => a + 1)} className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-[14px] font-bold text-white">
          <RefreshCw size={15} /> Try again
        </button>
      </div>
    )
  if (!snap) return <AcademyLoading label="Opening your notebook…" />
  return (
    <AcademyProvider sync={sync} initial={snap}>
      {children}
    </AcademyProvider>
  )
}

/** `npm run dev` + ?demo: skip Google and use local fake data, to work on the UI offline. */
function DemoGate({ children }: { children: ReactNode }) {
  const user = useMemo(() => ({ id: '00000000-0000-0000-0000-000000000000', email: 'demo@localhost', user_metadata: { full_name: 'Demo Student' } }) as unknown as User, [])
  const sync = useMemo(() => new SupabaseSync(user.id, { demo: true }), [user.id])
  const initial: CloudSnapshot = useMemo(
    () => ({
      profile: { user_id: user.id, email: user.email ?? null, full_name: 'Demo Student', avatar_url: null, updated_at: new Date().toISOString(), voice_enabled: false, sfx_enabled: true, voice_volume: 0.9, voice_speed: 1, ...DEFAULT_PROFILE_FIELDS },
      progress: [],
      sessions: [],
      eggsLogs: [],
    }),
    [user],
  )
  return (
    <AuthContext.Provider value={{ user, signOut: async () => location.assign(location.pathname) }}>
      <AcademyProvider sync={sync} initial={initial}>
        {children}
      </AcademyProvider>
    </AuthContext.Provider>
  )
}

export default function AuthGate({ children }: { children: ReactNode }) {
  if (import.meta.env.DEV && new URLSearchParams(location.search).has('demo')) return <DemoGate>{children}</DemoGate>
  return <RealAuthGate>{children}</RealAuthGate>
}

function RealAuthGate({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [initializing, setInitializing] = useState(true)
  const [waiting, setWaiting] = useState(false)
  const [error, setError] = useState<string | null>(() => {
    const p = new URLSearchParams(location.search + '&' + location.hash.slice(1))
    return p.get('error_description')
  })
  const exchanging = useRef(false)

  useEffect(() => {
    if (!supabaseConfigured) {
      setInitializing(false)
      return
    }
    const { data } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      if (s) {
        setWaiting(false)
        setError(null)
      }
    })
    // getSession waits for the ?code= exchange on the web, so there is no flash of the login screen.
    supabase.auth.getSession().then(({ data: d, error: e }) => {
      setSession(d.session)
      if (e) setError(e.message)
      setInitializing(false)
      if (hasAuthParams()) history.replaceState(null, '', location.pathname)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  // Desktop: receive the nakano://auth-callback?code=… link from the main process.
  useEffect(() => {
    const bridge = window.nakano?.auth
    if (!bridge) return
    const handle = async (url: string) => {
      if (exchanging.current) return
      try {
        const u = new URL(url)
        const code = u.searchParams.get('code')
        const err = u.searchParams.get('error_description')
        if (err) throw new Error(err)
        if (!code) return
        exchanging.current = true
        const { error: e } = await supabase.auth.exchangeCodeForSession(code)
        if (e) throw e
      } catch (e: any) {
        setError(e?.message || 'Sign-in failed.')
        setWaiting(false)
      } finally {
        exchanging.current = false
      }
    }
    bridge.takePending().then((u) => {
      if (u) void handle(u)
    })
    return bridge.onCallback(handle)
  }, [])

  const signIn = useCallback(async () => {
    setError(null)
    const { data, error: e } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: oauthRedirectUrl(),
        queryParams: { access_type: 'offline', prompt: 'consent' },
        skipBrowserRedirect: isDesktop,
      },
    })
    if (e) {
      setError(e.message)
      return
    }
    if (isDesktop && data?.url) {
      setWaiting(true)
      await window.nakano!.auth.openExternal(data.url)
    }
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setSession(null)
  }, [])

  if (!supabaseConfigured)
    return (
      <div className="safe-area flex h-full items-center justify-center bg-paper px-6 text-center text-[14px] text-muted">
        This build has no Supabase settings. Copy <code className="mx-1 rounded bg-ink/5 px-1">.env.example</code> to <code className="mx-1 rounded bg-ink/5 px-1">.env</code> and rebuild.
      </div>
    )
  if (initializing) return <AcademyLoading label={hasAuthParams() ? 'Finishing Google sign-in…' : 'Checking your student ID…'} />
  if (!session) return <LoginScreen onSignIn={signIn} waiting={waiting} error={error} onCancel={() => setWaiting(false)} />

  return (
    <AuthContext.Provider value={{ user: session.user, signOut }}>
      <CloudSession user={session.user}>{children}</CloudSession>
    </AuthContext.Provider>
  )
}
