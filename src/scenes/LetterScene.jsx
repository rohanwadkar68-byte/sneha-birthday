import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import useTypewriter from '../hooks/useTypewriter.js'
import {
  LETTER_REASSURANCE,
  LETTER_LINES,
  LETTER_1_LYRICS,
  LETTER_TRANSITION,
  LETTER_2_LINES,
  LETTER_2_LYRICS,
  LETTER_UI
} from '../utils/content.js'
import { playSparkle, playPop } from '../utils/audio.js'

const BASE = import.meta.env.BASE_URL
const SONG_1_VILEN = `${BASE}assets/audio/song-1-vilen.mp3`
const SONG_2_CHIDIYA = `${BASE}assets/audio/song-2-chidiya.mp3`
const TEDDY_CUDDLE = `${BASE}assets/kisses/milk_mocha_kiss_13.gif`
const TEDDY_BLUSH = `${BASE}assets/kisses/bubu_kiss_5.gif`

export default function LetterScene({ onNext }) {
  // Stages:
  // 0: Overthinking Reassurance
  // 1: Letter 1 (Chidiya Song + Letter 1)
  // 2: Surprise Transition ("Baccha... ruko. Ek aur hai.")
  // 3: Letter 2 (Vilen Song + Letter 2)
  const [stage, setStage] = useState(0)
  const [opened1, setOpened1] = useState(false)
  const [opened2, setOpened2] = useState(false)
  const [lyricIdx1, setLyricIdx1] = useState(0)
  const [lyricIdx2, setLyricIdx2] = useState(0)

  const audioRef1 = useRef(null)
  const audioRef2 = useRef(null)
  const scrollRef1 = useRef(null)
  const scrollRef2 = useRef(null)

  // Typewriter hooks
  const { output: output1, done: done1 } = useTypewriter(opened1 ? LETTER_LINES : [], 24)
  const { output: output2, done: done2 } = useTypewriter(opened2 ? LETTER_2_LINES : [], 24)

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef1.current) {
        audioRef1.current.pause()
        audioRef1.current = null
      }
      if (audioRef2.current) {
        audioRef2.current.pause()
        audioRef2.current = null
      }
    }
  }, [])

  // Auto-advance lyrics for Letter 1
  useEffect(() => {
    if (!opened1) return
    let currentIdx = 0
    const interval = setInterval(() => {
      currentIdx++
      if (currentIdx < LETTER_1_LYRICS.length) {
        setLyricIdx1(currentIdx)
      } else {
        clearInterval(interval)
      }
    }, 4200)
    return () => clearInterval(interval)
  }, [opened1])

  // Auto-advance lyrics for Letter 2
  useEffect(() => {
    if (!opened2) return
    let currentIdx = 0
    const interval = setInterval(() => {
      currentIdx++
      if (currentIdx < LETTER_2_LYRICS.length) {
        setLyricIdx2(currentIdx)
      } else {
        clearInterval(interval)
      }
    }, 4500)
    return () => clearInterval(interval)
  }, [opened2])

  // Handlers
  const handleOpenLetter1 = () => {
    playPop()
    playSparkle()
    setStage(1)
    setOpened1(true)

    // Play Chidiya audio softly
    try {
      const a = new Audio(SONG_2_CHIDIYA)
      a.volume = 0.55
      a.play().catch(() => {})
      audioRef2.current = a
    } catch (e) {}

    setTimeout(() => scrollRef1.current?.scrollTo({ top: 99999, behavior: 'smooth' }), 400)
  }

  const handleFinishLetter1 = () => {
    playPop()
    // Fade out audio 2
    if (audioRef2.current) {
      const a = audioRef2.current
      let vol = a.volume
      const fade = setInterval(() => {
        vol = Math.max(0, vol - 0.1)
        a.volume = vol
        if (vol <= 0) {
          a.pause()
          clearInterval(fade)
        }
      }, 100)
    }
    setStage(2) // surprise transition
  }

  const handleOpenLetter2 = () => {
    playPop()
    playSparkle()
    setStage(3)
    setOpened2(true)

    // Play Vilen audio softly
    try {
      const a = new Audio(SONG_1_VILEN)
      a.volume = 0.55
      a.play().catch(() => {})
      audioRef1.current = a
    } catch (e) {}

    setTimeout(() => scrollRef2.current?.scrollTo({ top: 99999, behavior: 'smooth' }), 400)
  }

  const handleFinishLetter2 = () => {
    playSparkle()
    // Fade out audio 1
    if (audioRef1.current) {
      const a = audioRef1.current
      let vol = a.volume
      const fade = setInterval(() => {
        vol = Math.max(0, vol - 0.1)
        a.volume = vol
        if (vol <= 0) {
          a.pause()
          clearInterval(fade)
        }
      }, 100)
    }
    onNext()
  }

  return (
    <SceneShell wide>
      <AnimatePresence mode="wait">
        {/* ========================================================= */}
        {/* STAGE 0: REASSURANCE SCREEN (Overthinking Mana Hai)       */}
        {/* ========================================================= */}
        {stage === 0 && (
          <motion.div
            key="reassurance"
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={SPRING}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '24px 20px',
              maxWidth: 480,
              margin: '0 auto'
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              style={{ marginBottom: 12 }}
            >
              <img
                src={TEDDY_BLUSH}
                alt="Teddy Reassurance"
                style={{
                  width: 140,
                  height: 140,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 24px rgba(247, 85, 138, 0.35))'
                }}
              />
            </motion.div>

            <h2
              className="title-xl"
              style={{
                fontSize: 'clamp(1.3rem, 4.5vw, 1.65rem)',
                color: 'var(--rose-deep)',
                margin: '6px 0 10px',
                lineHeight: 1.35
              }}
            >
              {LETTER_REASSURANCE.title}
            </h2>

            <p className="subtitle" style={{ fontSize: '1.05rem', margin: '4px 0 8px', color: 'var(--ink)' }}>
              {LETTER_REASSURANCE.subtitle}
            </p>

            <p style={{ fontSize: '0.92rem', color: '#888', fontStyle: 'italic', marginBottom: 20 }}>
              {LETTER_REASSURANCE.tease}
            </p>

            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenLetter1}
              style={{ padding: '14px 28px', fontSize: '1.05rem', fontWeight: 800 }}
            >
              <span>{LETTER_REASSURANCE.openBtn}</span>
            </motion.button>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* STAGE 1: LETTER 1 (Chidiya Song + Free Fire & 12 AM Story) */}
        {/* ========================================================= */}
        {stage === 1 && (
          <motion.div
            key="letter1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={SPRING}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: 520,
              margin: '0 auto'
            }}
          >
            <div className="hand-note" style={{ marginBottom: 4 }}>
              💌 Pehla Letter • Free Fire Se Aaj Tak 🌸
            </div>

            {/* Letter Paper Container */}
            <div
              ref={scrollRef1}
              style={{
                marginTop: 6,
                maxHeight: '46dvh',
                overflowY: 'auto',
                background: '#fffdf7',
                borderRadius: 22,
                padding: '20px 22px',
                width: 'min(480px, 92vw)',
                boxShadow: '0 16px 40px rgba(247, 85, 138, 0.18)',
                textAlign: 'left',
                border: '1.5px solid rgba(255, 217, 232, 0.9)',
                position: 'relative'
              }}
            >
              {/* Soft watermark stamp */}
              <div
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 18,
                  opacity: 0.18,
                  fontSize: 44,
                  pointerEvents: 'none'
                }}
              >
                💌
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-hand)',
                  fontSize: '1.42rem',
                  lineHeight: 1.4,
                  whiteSpace: 'pre-wrap',
                  color: '#4a384f',
                  fontWeight: 600
                }}
              >
                {output1.join('\n')}
              </div>

              {done1 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 16,
                    gap: 8
                  }}
                >
                  <img
                    src={TEDDY_CUDDLE}
                    alt="Cuddle Moment"
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: 'contain',
                      borderRadius: 16
                    }}
                  />
                  <button
                    className="btn-primary"
                    onClick={handleFinishLetter1}
                    style={{ width: '100%', maxWidth: 280 }}
                  >
                    <span>Padh liya? →</span>
                  </button>
                </motion.div>
              )}
            </div>

            {/* Synced Lyric Overlay Bar (Chidiya) */}
            <motion.div
              style={{
                marginTop: 10,
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid var(--rose-pale)',
                borderRadius: 20,
                padding: '6px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 16px rgba(255, 107, 147, 0.15)'
              }}
            >
              <span style={{ fontSize: '1rem', color: '#ff6b93' }}>🎵</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={lyricIdx1}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  style={{
                    fontSize: '0.94rem',
                    fontWeight: 700,
                    color: 'var(--rose-deep)',
                    letterSpacing: '0.02em'
                  }}
                >
                  {LETTER_1_LYRICS[lyricIdx1]?.text}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* STAGE 2: SURPRISE TRANSITION ("Baccha... ruko. Ek aur hai") */}
        {/* ========================================================= */}
        {stage === 2 && (
          <motion.div
            key="transition"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={SPRING}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '24px 20px',
              maxWidth: 460,
              margin: '0 auto'
            }}
          >
            <motion.div
              animate={{ rotate: [-4, 4, -4], scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
              style={{ fontSize: 48, marginBottom: 8 }}
            >
              🎁👀
            </motion.div>

            <h2
              className="title-xl"
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 1.9rem)',
                color: 'var(--rose-deep)',
                margin: '6px 0 8px'
              }}
            >
              {LETTER_TRANSITION.line1}
            </h2>

            <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)', margin: '4px 0 6px' }}>
              {LETTER_TRANSITION.line2}
            </p>

            <p className="subtitle" style={{ fontSize: '0.98rem', marginBottom: 20 }}>
              {LETTER_TRANSITION.line3}
            </p>

            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleOpenLetter2}
              style={{ padding: '14px 32px', fontSize: '1.05rem', fontWeight: 800 }}
            >
              <span>{LETTER_TRANSITION.openBtn}</span>
            </motion.button>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* STAGE 3: LETTER 2 (Vilen Song + Teasing & Nakhre Story)   */}
        {/* ========================================================= */}
        {stage === 3 && (
          <motion.div
            key="letter2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={SPRING}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: 520,
              margin: '0 auto'
            }}
          >
            <div className="hand-note" style={{ marginBottom: 4 }}>
              💌 Dusra Letter • Thoda Sa Tang Karne Ke Liye 😏🎀
            </div>

            {/* Letter 2 Paper Container */}
            <div
              ref={scrollRef2}
              style={{
                marginTop: 6,
                maxHeight: '46dvh',
                overflowY: 'auto',
                background: '#fffdf7',
                borderRadius: 22,
                padding: '20px 22px',
                width: 'min(480px, 92vw)',
                boxShadow: '0 16px 40px rgba(168, 85, 247, 0.18)',
                textAlign: 'left',
                border: '1.5px solid rgba(230, 219, 255, 0.9)',
                position: 'relative'
              }}
            >
              {/* Soft watermark stamp */}
              <div
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 18,
                  opacity: 0.18,
                  fontSize: 44,
                  pointerEvents: 'none'
                }}
              >
                🎀
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-hand)',
                  fontSize: '1.42rem',
                  lineHeight: 1.4,
                  whiteSpace: 'pre-wrap',
                  color: '#4a384f',
                  fontWeight: 600
                }}
              >
                {output2.join('\n')}
              </div>

              {done2 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 16,
                    gap: 8
                  }}
                >
                  <img
                    src={TEDDY_CUDDLE}
                    alt="Final Hug"
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: 'contain',
                      borderRadius: 16
                    }}
                  />
                  <button
                    className="btn-primary"
                    onClick={handleFinishLetter2}
                    style={{ width: '100%', maxWidth: 280 }}
                  >
                    <span>{LETTER_UI.finishBtn}</span>
                  </button>
                </motion.div>
              )}
            </div>

            {/* Synced Lyric Overlay Bar (Vilen) */}
            <motion.div
              style={{
                marginTop: 10,
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(168, 85, 247, 0.35)',
                borderRadius: 20,
                padding: '6px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 16px rgba(168, 85, 247, 0.15)'
              }}
            >
              <span style={{ fontSize: '1rem', color: '#a855f7' }}>🎶</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={lyricIdx2}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  style={{
                    fontSize: '0.94rem',
                    fontWeight: 700,
                    color: '#7e22ce',
                    letterSpacing: '0.02em'
                  }}
                >
                  {LETTER_2_LYRICS[lyricIdx2]?.text}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SceneShell>
  )
}
