// Launch sequence shared by the desktop app, the web app and the website:
//   1. (browser only) a "tap to start" gate so the clip may play with sound
//   2. the intro clip, streamed through YouTube's official embed (not re-hosted)
//   3. an original animated title card, then onDone()
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './intro.css'

export const INTRO_VIDEO_ID = '9caoLJqXleQ'
const COLORS = ['#F59E0B', '#F43F5E', '#6366F1', '#10B981', '#DC2626']
const SISTER_IDS = ['ichika', 'nino', 'miku', 'yotsuba', 'itsuki']
const TITLE_MS = 5600
// The clip ends with a "thanks for watching" card from ~22.8 s. From this point the
// title animation covers the picture while the song keeps playing to the end.
const COVER_AT = 22.6

export const introEnabled = () => {
  try {
    return localStorage.getItem('nakano-academy:intro') !== 'off'
  } catch {
    return true
  }
}

function YouTubeClip({ onEnd }) {
  const frame = useRef(null)
  const ended = useRef(false)
  const [ready, setReady] = useState(false)
  const finish = useCallback(() => {
    if (ended.current) return
    ended.current = true
    onEnd()
  }, [onEnd])

  useEffect(() => {
    let dur = 0
    const send = (msg) => frame.current?.contentWindow?.postMessage(JSON.stringify(msg), '*')
    // Ask the embedded player to report its state (YouTube iframe postMessage protocol).
    const hello = setInterval(() => send({ event: 'listening', id: 1, channel: 'widget' }), 300)
    const onMsg = (e) => {
      if (!/youtube(-nocookie)?\.com$/.test(new URL(e.origin).hostname)) return
      let d
      try {
        d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
      } catch {
        return
      }
      if (d.event === 'onReady' || d.event === 'initialDelivery') {
        setReady(true)
        clearInterval(hello)
        send({ event: 'command', func: 'unMute', args: [] })
        send({ event: 'command', func: 'setVolume', args: [80] })
        send({ event: 'command', func: 'playVideo', args: [] })
      }
      if (d.event === 'onError') finish()
      if (d.event === 'onStateChange' && d.info === 0) finish()
      const info = d.info
      if (info && typeof info === 'object') {
        if (info.playerState === 0) finish()
        if (info.duration) dur = info.duration
        if (dur > COVER_AT + 1 && info.currentTime >= COVER_AT) finish()
        if (dur && info.currentTime && dur - info.currentTime < 0.35) finish()
      }
    }
    window.addEventListener('message', onMsg)
    // Offline or blocked embed: move on to the title card.
    const fallback = setTimeout(() => !ended.current && !frame.current?.dataset.ready && finish(), 9000)
    return () => {
      clearInterval(hello)
      clearTimeout(fallback)
      window.removeEventListener('message', onMsg)
    }
  }, [finish])

  useEffect(() => {
    if (ready && frame.current) frame.current.dataset.ready = '1'
  }, [ready])

  const src = `https://www.youtube-nocookie.com/embed/${INTRO_VIDEO_ID}?autoplay=1&controls=0&rel=0&playsinline=1&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&enablejsapi=1&origin=${encodeURIComponent(location.origin === 'null' || location.protocol === 'file:' ? 'https://huy100408.github.io' : location.origin)}`
  return (
    <div className="intro-clip">
      <iframe ref={frame} src={src} title="Intro" allow="autoplay; encrypted-media" referrerPolicy="strict-origin-when-cross-origin" />
      {!ready && <div className="intro-loading" />}
    </div>
  )
}

function TitleCard({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, TITLE_MS)
    return () => clearTimeout(t)
  }, [onDone])
  const sparkles = useMemo(
    () => Array.from({ length: 26 }, (_, i) => ({ x: Math.random() * 100, y: Math.random() * 100, d: 2.1 + Math.random() * 2.2, s: 8 + Math.random() * 18, c: COLORS[i % 5] })),
    [],
  )
  const word = 'QUINTUPLETS'
  const base = import.meta.env.BASE_URL
  return (
    <div className="tc">
      {/* 1 · colour panels wipe up */}
      <div className="tc-panels">
        {COLORS.map((c, i) => (
          <span key={c} style={{ background: c, animationDelay: `${i * 0.08}s` }} />
        ))}
      </div>
      {/* 2 · quick-cut faces */}
      <div className="tc-cuts">
        {SISTER_IDS.map((id, i) => (
          <div key={id} className="tc-cut" style={{ animationDelay: `${0.85 + i * 0.2}s`, '--c': COLORS[i] }}>
            <img src={`${base}avatars/${id}.jpg`} alt="" />
            <b>0{i + 1}</b>
          </div>
        ))}
      </div>
      <div className="tc-flash" />
      {/* 3 · neon curves */}
      <svg className="tc-curves" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden>
        {COLORS.map((c, i) => (
          <path key={c} d={`M -50 ${180 + i * 130} C 400 ${-40 + i * 160}, 1100 ${900 - i * 150}, 1650 ${120 + i * 140}`} stroke={c} style={{ animationDelay: `${2 + i * 0.07}s` }} />
        ))}
      </svg>
      <div className="tc-sparkles">
        {sparkles.map((p, i) => (
          <i key={i} style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.s, color: p.c, animationDelay: `${p.d}s` }}>
            ✦
          </i>
        ))}
      </div>
      {/* 4 · kinetic type */}
      <div className="tc-type">
        <div className="tc-the">
          {'THE QUINTESSENTIAL'.split('').map((ch, i) => (
            <span key={i} style={{ animationDelay: `${2.05 + i * 0.025}s` }}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </div>
        <div className="tc-big" data-text={word}>
          {word.split('').map((ch, i) => (
            <span key={i} style={{ animationDelay: `${2.45 + i * 0.045}s`, '--c': COLORS[i % 5] }}>
              {ch}
            </span>
          ))}
        </div>
        <div className="tc-stamp">TUTOR APP</div>
        <div className="tc-jp">五等分の花嫁 · study with the Nakano sisters</div>
      </div>
      <div className="tc-out" />
    </div>
  )
}

/**
 * gate: show a click-to-start screen first (needed in browsers for sound).
 */
export default function Intro({ onDone, gate = false }) {
  const [phase, setPhase] = useState(gate ? 'gate' : 'clip')
  // keepAudio: the clip reached its end card, so the music plays on under the title card.
  const [keepAudio, setKeepAudio] = useState(false)
  const toTitle = useCallback(() => {
    setKeepAudio(true)
    setPhase('title')
  }, [])
  const done = useCallback(() => onDone(), [onDone])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') phase === 'title' ? done() : setPhase('title')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, done])

  return (
    <div className="intro-root">
      {phase === 'gate' && (
        <button className="intro-gate" onClick={() => setPhase('clip')}>
          <div className="intro-gate-bars">
            {COLORS.map((c) => (
              <span key={c} style={{ background: c }} />
            ))}
          </div>
          <div className="intro-gate-title">The Quintessential Quintuplets</div>
          <div className="intro-gate-sub">Tutor App</div>
          <div className="intro-gate-cta">
            <span>▶</span> Click to start
          </div>
          <div className="intro-gate-hint">Sound on</div>
        </button>
      )}
      {(phase === 'clip' || (phase === 'title' && keepAudio)) && <YouTubeClip onEnd={toTitle} />}
      {phase === 'title' && <TitleCard onDone={done} />}
      {phase !== 'gate' && (
        <button className="intro-skip" onClick={() => (phase === 'title' ? done() : setPhase('title'))}>
          Skip ›
        </button>
      )}
    </div>
  )
}
