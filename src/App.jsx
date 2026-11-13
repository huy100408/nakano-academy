import { useEffect, useState } from 'react'
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
  const [active, setActive] = useState('ichika')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [voice, setVoice] = useState(null)
  const [intro, setIntro] = useState(introEnabled)

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
      <Sidebar state={state} dispatch={dispatch} view={view} setView={setView} active={active} setActive={setActive} onSettings={() => setSettingsOpen(true)} />
      <main
        className="relative min-w-0 flex-1 overflow-hidden transition-[background] duration-700"
        style={{ background: view === 'class' ? `radial-gradient(1200px 500px at 70% -10%, color-mix(in oklab, ${s.color} 16%, transparent), transparent 70%), var(--color-paper)` : 'var(--color-paper)' }}
      >
        {view === 'class' && <Classroom key={s.id} s={s} state={state} dispatch={dispatch} voiceReady={voiceReady} />}
        {view === 'eggs' && <EggsView dispatch={dispatch} />}
        {view === 'report' && <ReportView state={state} dispatch={dispatch} />}
      </main>
      {settingsOpen && <SettingsSheet onClose={() => setSettingsOpen(false)} onChange={setVoice} />}
      <Toaster />
      {intro && <Intro gate={!window.nakano} onDone={() => setIntro(false)} />}
    </div>
  )
}
