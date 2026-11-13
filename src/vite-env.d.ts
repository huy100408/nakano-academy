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
    settings: { get: () => Promise<any>; set: (patch: any) => Promise<any> }
    voice: { speak: (text: string, sister: string, force?: boolean) => Promise<any> }
    auth: {
      openExternal: (url: string) => Promise<boolean>
      onCallback: (cb: (url: string) => void) => () => void
      takePending: () => Promise<string | null>
    }
  }
}
