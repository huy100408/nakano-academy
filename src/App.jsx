import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { ELECTIVE, SISTERS, byId } from './data/sisters.js'
import { useProgress } from './lib/store.js'
import { getSettings, voiceAvailable } from './lib/voice.js'
import Sidebar from './components/Sidebar.jsx'
import Classroom from './components/Classroom.jsx'
import EggsView from './components/EggsView.jsx'
import ReportView from './components/ReportView.jsx'
import SettingsSheet from './components/SettingsSheet.jsx'
import { Toaster, accentVars } from './components/ui.jsx'
import Intro, { introEnabled } from './intro/Intro.jsx'

export default function App() {
  const [state, dispatch] = useProgress()
  const [view, setView] = useState('class')
  const [active, setActive] = useState(() => {
    const t = new URLSearchParams(location.search).get('tutor')
    return SISTERS.some((x) => x.id === t) ? t : 'ichika'
  })
  const [drawer, setDrawer] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [voice, setVoice] = useState(null)
  const [intro, setIntro] = useState(() => {
    if (!introEnabled()) return false
    // On the web, the intro plays once per visit (shared with the website).
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

  useEffect(() => {
    if (voiceAvailable) getSettings().then(setVoice)
  }, [])

  // In 4-Core mode the CS tutor is hidden; move off her page if needed.
  useEffect(() => {
    if (state.coreMode && byId(active).subj === ELECTIVE) setActive(SISTERS[0].id)
  }, [state.coreMode, active])

  const s = byId(active)
  const voiceReady = Boolean(voice?.voiceEnabled && voice?.hasApiKey)

  return (
    <div className="flex h-full" style={accentVars(s)}>
      <div className="hidden h-full lg:block">
        <Sidebar state={state} dispatch={dispatch} view={view} setView={setView} active={active} setActive={setActive} onSettings={() => setSettingsOpen(true)} />
      </div>
      {drawer && (
        <div className="fixed inset-0 z-40 flex bg-black/30 lg:hidden" onClick={() => setDrawer(false)}>
          <div className="anim-fade-up h-full bg-paper" onClick={(e) => e.stopPropagation()}>
            <Sidebar
              state={state}
              dispatch={dispatch}
              view={view}
              setView={(v) => {
                setView(v)
                setDrawer(false)
              }}
              active={active}
              setActive={(a) => {
                setActive(a)
                setDrawer(false)
              }}
              onSettings={() => {
                setDrawer(false)
                setSettingsOpen(true)
              }}
            />
          </div>
        </div>
      )}
      <main
        className="relative flex min-w-0 flex-1 flex-col overflow-hidden transition-[background] duration-700"
        style={{ background: view === 'class' ? `radial-gradient(1200px 500px at 70% -10%, color-mix(in oklab, ${s.color} 16%, transparent), transparent 70%), var(--color-paper)` : 'var(--color-paper)' }}
      >
        <div className="drag mac-traffic-pad flex shrink-0 items-center gap-3 border-b border-line bg-white/70 px-4 py-2.5 backdrop-blur lg:hidden">
          <button onClick={() => setDrawer(true)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-ink/5" aria-label="Open menu">
            <Menu size={19} />
          </button>
          <span className="font-display text-[15px] font-extrabold">Nakano Academy</span>
          <span className="ml-auto font-mono text-[12px] font-bold text-muted">
            {Object.values(state.scores).reduce((a, b) => a + b, 0)}/500
          </span>
        </div>
        <div className="min-h-0 flex-1">
        {view === 'class' && <Classroom key={s.id} s={s} state={state} dispatch={dispatch} voiceReady={voiceReady} />}
        {view === 'eggs' && <EggsView dispatch={dispatch} />}
        {view === 'report' && <ReportView state={state} dispatch={dispatch} />}
        </div>
      </main>
      {settingsOpen && <SettingsSheet onClose={() => setSettingsOpen(false)} onChange={setVoice} />}
      <Toaster />
      {intro && <Intro gate={!window.nakano} onDone={endIntro} />}
    </div>
  )
}
