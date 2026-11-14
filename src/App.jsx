import { useEffect, useRef, useState } from 'react'
import { ClipboardList, Egg, GraduationCap, Target, UserRound } from 'lucide-react'
import { SISTERS, byId } from './data/sisters.js'
import AuthGate from './features/auth/AuthGate'
import { playPop, setSfxEnabled } from './services/sfxEngine'
import { setVoicePrefs, speak } from './services/voiceTutor'
import { MIDTERM_WARNING_BELOW, reviewQueue, useAcademy } from './state/useAcademy'
import Classroom from './components/Classroom.jsx'
import EggsView from './components/EggsView.jsx'
import ReportView from './components/ReportView.jsx'
import ReviewView from './components/ReviewView.jsx'
import SettingsSheet from './components/SettingsSheet.jsx'
import Sidebar, { Hud, SyncBadge } from './components/Sidebar.jsx'
import { Avatar, Toaster, accentVars, toast } from './components/ui.jsx'
import Intro, { introEnabled } from './intro/Intro.jsx'

function Shell() {
  const { state, setPreferredSister, syncStatus } = useAcademy()
  const [view, setView] = useState('class')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [hudOpen, setHudOpen] = useState(false)
  const active = byId(state.profile.preferred_sister) ? state.profile.preferred_sister : 'miku'
  const s = byId(active)
  const reviewCount = reviewQueue(state.progress).length

  const pickSister = (id) => {
    setPreferredSister(id)
    setView('class')
  }

  // Deep link from the website: /learn/?tutor=miku
  useEffect(() => {
    const t = new URLSearchParams(location.search).get('tutor')
    if (byId(t)) setPreferredSister(t)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const p = state.profile
  // Voice + sound-effect preferences live in the user's profile (synced across devices).
  useEffect(() => {
    setSfxEnabled(p.sfx_enabled)
    setVoicePrefs({ enabled: p.voice_enabled, volume: Number(p.voice_volume), speed: Number(p.voice_speed) })
  }, [p.sfx_enabled, p.voice_enabled, p.voice_volume, p.voice_speed])

  // Tactile pop on every button press (quiz options play their own chime instead).
  useEffect(() => {
    const onDown = (e) => {
      const b = e.target.closest?.('button')
      if (b && !b.disabled && !b.closest('[data-nopop]')) playPop()
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [])

  // Voiced Midterm Warning when Mr. Nakano's approval drops below the line.
  const lastApproval = useRef(p.maruo_approval)
  useEffect(() => {
    if (lastApproval.current >= MIDTERM_WARNING_BELOW && p.maruo_approval < MIDTERM_WARNING_BELOW) {
      toast('Midterm Warning! Open the HUD for the Rescue challenge.', { ms: 5000 })
      speak('Midterm warning! Father is not satisfied with our results. Please, let us take the rescue challenge together.', 'itsuki')
    }
    lastApproval.current = p.maruo_approval
  }, [p.maruo_approval])

  // 1–5 switch tutors anywhere (quiz answers use A–D).
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input,textarea') || e.metaKey || e.ctrlKey || e.altKey) return
      const n = Number(e.key)
      if (n >= 1 && n <= 5) pickSister(SISTERS[n - 1].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const voiceReady = Boolean(p.voice_enabled)
  const tabs = [
    ['class', 'Class', GraduationCap],
    ['review', 'Review', Target],
    ['eggs', 'Eggs', Egg],
    ['report', 'Report', ClipboardList],
  ]

  return (
    <div className="theme-root flex h-full" style={accentVars(s)}>
      <div className="hidden h-full lg:block">
        <Sidebar view={view} setView={setView} active={active} setActive={pickSister} onSettings={() => setSettingsOpen(true)} onRescue={() => setView('rescue')} />
      </div>

      <main
        className="relative flex min-w-0 flex-1 flex-col overflow-hidden"
        style={{ background: view === 'class' ? 'radial-gradient(1200px 500px at 70% -10%, color-mix(in oklab, var(--accent) 16%, transparent), transparent 70%), var(--color-paper)' : 'var(--color-paper)' }}
      >
        {/* Phone / tablet top bar: quick tutor switcher */}
        <div className="drag mac-traffic-pad safe-top flex shrink-0 items-center gap-2 border-b border-line bg-white/80 px-3 py-2 backdrop-blur lg:hidden">
          <div className="flex flex-1 gap-1.5 overflow-x-auto">
            {SISTERS.map((x) => (
              <button
                key={x.id}
                onClick={() => pickSister(x.id)}
                className={`flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full py-1 pl-1 pr-2.5 text-[12.5px] font-bold transition ${view === 'class' && x.id === active ? 'bg-accent-soft text-accent-ink' : 'text-muted'}`}
              >
                <Avatar s={x} size={30} ring={view === 'class' && x.id === active} />
                <span className="hidden sm:inline">{x.first}</span>
              </button>
            ))}
          </div>
          <SyncBadge status={syncStatus} compact />
        </div>

        <div className="min-h-0 flex-1">
          {view === 'class' && <Classroom key={s.id} s={s} voiceReady={voiceReady} />}
          {view === 'review' && <ReviewView />}
          {view === 'rescue' && <ReviewView rescue onDone={() => setView('report')} />}
          {view === 'eggs' && <EggsView />}
          {view === 'report' && <ReportView />}
        </div>

        {/* Phone / tablet bottom navigation */}
        <nav className="safe-bottom absolute inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-white/90 backdrop-blur-xl lg:hidden">
          {tabs.map(([id, label, Icon]) => (
            <button key={id} onClick={() => setView(id)} className={`relative flex min-h-[58px] flex-col items-center justify-center gap-0.5 text-[11px] font-bold ${view === id ? 'text-accent-ink' : 'text-muted'}`}>
              <Icon size={20} />
              {label}
              {id === 'review' && reviewCount > 0 && <span className="absolute right-[22%] top-1.5 rounded-full bg-bad px-1.5 font-mono text-[9.5px] text-white">{reviewCount}</span>}
            </button>
          ))}
          <button onClick={() => setHudOpen(true)} className="flex min-h-[58px] flex-col items-center justify-center gap-0.5 text-[11px] font-bold text-muted">
            {state.profile.avatar_url ? <img src={state.profile.avatar_url} alt="" referrerPolicy="no-referrer" className="h-5 w-5 rounded-full" /> : <UserRound size={20} />}
            Me
          </button>
        </nav>
      </main>

      {hudOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/30 lg:hidden" onClick={() => setHudOpen(false)}>
          <div className="safe-bottom anim-fade-up w-full rounded-t-3xl bg-paper p-3" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-ink/15" />
            <Hud
              onRescue={() => {
                setHudOpen(false)
                setView('rescue')
              }}
              onSettings={() => {
                setHudOpen(false)
                setSettingsOpen(true)
              }}
            />
          </div>
        </div>
      )}
      {settingsOpen && <SettingsSheet onClose={() => setSettingsOpen(false)} />}
    </div>
  )
}

export default function App() {
  const [intro, setIntro] = useState(() => {
    if (!introEnabled()) return false
    // On the web the intro plays once per visit (shared with the website).
    if (!window.nakano)
      try {
        return !sessionStorage.getItem('nakano-intro-seen')
      } catch {}
    return true
  })
  const endIntro = () => {
    setIntro(false)
    try {
      sessionStorage.setItem('nakano-intro-seen', '1')
    } catch {}
  }
  return (
    <>
      <AuthGate>
        <Shell />
      </AuthGate>
      <Toaster />
      {intro && <Intro gate={!window.nakano} onDone={endIntro} />}
    </>
  )
}
