/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** Bridge exposed by electron/preload.cjs in the desktop app (absent on the web). */
interface Window {
  nakano?: {
    platform: string
    isDesktop: true
    auth: {
      openExternal: (url: string) => Promise<boolean>
      onCallback: (cb: (url: string) => void) => () => void
      takePending: () => Promise<string | null>
    }
  }
}
