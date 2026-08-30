import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
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
const TEDDY_SWEET = `${BASE}assets/kisses/milk_mocha_kiss_3.gif`

export default function LetterScene({ onNext }) {
  // STAGES:
  // 0: Overthinking Reassurance
  // 1: Letter 1 (Pure Reading - No Music/No Overlays)
  // 2: Song 1 Dedicated Listening Room (Chidiya + Real-Time Synced Lyrics)
  // 3: Surprise Transition ("Baccha... ruko. Ek aur hai.")
  // 4: Letter 2 (Pure Reading - No Music/No Overlays)
  // 5: Song 2 Dedicated Listening Room (Vilen + Real-Time Synced Lyrics)
  const [stage, setStage] = useState(0)
  const [opened1, setOpened1] = useState(false)
  const [opened2, setOpened2] = useState(false)

  // Audio Playback & Real-Time Time Sync
  const [activeLyricIdx, setActiveLyricIdx] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef(null)
  const scrollRef1 = useRef(null)
  const scrollRef2 = useRef(null)
  const lyricsContainerRef = useRef(null)

  // Typewriter hooks for clean letters
  const { output: output1, done: done1 } = useTypewriter(opened1 ? LETTER_LINES : [], 22)
  const { output: output2, done: done2 } = useTypewriter(opened2 ? LETTER_2_LINES : [], 22)

  // Cleanup audio on unmount or stage change
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Auto-scroll active lyric into center view
  useEffect(() => {
    if (lyricsContainerRef.current) {
      const activeEl = lyricsContainerRef.current.querySelector('.active-lyric')
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [activeLyricIdx])

  // Real-time audio time listener
  const setupAudio = (src, cues) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    const audio = new Audio(src)
    audio.volume = 1.0 // Full 100% crystal-clear immersive volume
    audioRef.current = audio

    audio.ontimeupdate = () => {
      const cur = audio.currentTime
      setCurrentTime(cur)
      setDuration(audio.duration || 1)

      // Find current active lyric
      for (let i = cues.length - 1; i >= 0; i--) {
        if (cur >= cues[i].time - 0.25) {
          setActiveLyricIdx(i)
          break
        }
      }
    }

    audio.onended = () => {
      setIsPlaying(false)
    }

    audio.onplay = () => setIsPlaying(true)
    audio.onpause = () => setIsPlaying(false)

    audio.play().catch(() => {
      setIsPlaying(false)
    })
  }

  // STAGE HANDLERS

  // Stage 0 -> 1: Open Letter 1 (Pure Reading)
  const handleOpenLetter1 = () => {
    playPop()
    playSparkle()
    setStage(1)
    setOpened1(true)
    setTimeout(() => scrollRef1.current?.scrollTo({ top: 99999, behavior: 'smooth' }), 400)
  }

  // Stage 1 -> 2: Go to Song 1 Listening Room (Chidiya)
  const handleStartSong1 = () => {
    playSparkle()
    setStage(2)
    setActiveLyricIdx(0)
    setCurrentTime(0)
    setupAudio(SONG_2_CHIDIYA, LETTER_1_LYRICS)
  }

  // Stage 2 -> 3: Go to Surprise Transition
  const handleFinishSong1 = () => {
    playPop()
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setStage(3)
  }

  // Stage 3 -> 4: Open Letter 2 (Pure Reading)
  const handleOpenLetter2 = () => {
    playPop()
    playSparkle()
    setStage(4)
    setOpened2(true)
    setTimeout(() => scrollRef2.current?.scrollTo({ top: 99999, behavior: 'smooth' }), 400)
  }

  // Stage 4 -> 5: Go to Song 2 Listening Room (Vilen)
  const handleStartSong2 = () => {
    playSparkle()
    setStage(5)
    setActiveLyricIdx(0)
    setCurrentTime(0)
    setupAudio(SONG_1_VILEN, LETTER_2_LYRICS)
  }

  // Stage 5 -> Finish
  const handleFinishAll = () => {
    playSparkle()
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    onNext()
  }

  // Audio Controls
  const togglePlayPause = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
  }

  const handleReplay = (cues) => {
    playSparkle()
    if (!audioRef.current) return
    audioRef.current.currentTime = 0
    setActiveLyricIdx(0)
    audioRef.current.play().catch(() => {})
  }

  const handleSeekLyric = (cueTime) => {
    if (!audioRef.current) return
    playPop()
    audioRef.current.currentTime = cueTime
    audioRef.current.play().catch(() => {})
  }

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <SceneShell wide>
      <AnimatePresence mode="wait">
        {/* ========================================================= */}
        {/* STAGE 0: OVERTHINKING REASSURANCE                         */}
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
        {/* STAGE 1: LETTER 1 (Pure Peaceful Reading)                 */}
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

            {/* Clean Letter Paper */}
            <div
              ref={scrollRef1}
              style={{
                marginTop: 6,
                maxHeight: '52dvh',
                overflowY: 'auto',
                background: '#fffdf7',
                borderRadius: 22,
                padding: '22px 24px',
                width: 'min(480px, 92vw)',
                boxShadow: '0 16px 40px rgba(247, 85, 138, 0.18)',
                textAlign: 'left',
                border: '1.5px solid rgba(255, 217, 232, 0.9)',
                position: 'relative'
              }}
            >
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
                  lineHeight: 1.45,
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
                    marginTop: 20,
                    gap: 10
                  }}
                >
                  <img
                    src={TEDDY_SWEET}
                    alt="Cute Teddy"
                    style={{
                      width: 90,
                      height: 90,
                      objectFit: 'contain',
                      borderRadius: 16
                    }}
                  />
                  <button
                    className="btn-primary"
                    onClick={handleStartSong1}
                    style={{ width: '100%', maxWidth: 300, padding: '14px 20px', fontSize: '1rem' }}
                  >
                    <span>Padh liya? Ab Gaana Sunte Hain 🎧✨</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* STAGE 2: FULL-SCREEN WARM ROMANTIC LOFI ROOM (Chidiya)    */}
        {/* ========================================================= */}
        {stage === 2 && (
          <motion.div
            key="song1room"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 99999,
              background: 'radial-gradient(ellipse at 50% 15%, #3d1442 0%, #200d2b 45%, #0e0517 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 'clamp(12px, 2.5vh, 20px) clamp(14px, 3.5vw, 24px)',
              textAlign: 'center',
              overflow: 'hidden'
            }}
          >
            {/* Ambient Warm Golden Moon & Twinkling Stars */}
            <div
              style={{
                position: 'absolute',
                top: 18,
                right: 22,
                width: 58,
                height: 58,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #fffdf0 0%, #ffdf9e 55%, rgba(255,223,158,0) 80%)',
                boxShadow: '0 0 40px rgba(255, 223, 158, 0.8)',
                opacity: 0.95,
                pointerEvents: 'none'
              }}
            />

            {/* Glowing Warm Sunset Orbs */}
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.55, 0.35] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: '10%',
                left: '6%',
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'rgba(255, 120, 160, 0.28)',
                filter: 'blur(70px)',
                pointerEvents: 'none'
              }}
            />

            {/* Top Bubu Smiling Teddy Encouraging Her to Smile */}
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255, 182, 193, 0.4)',
                borderRadius: 24,
                padding: '6px 16px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                zIndex: 3
              }}
            >
              <img
                src={TEDDY_BLUSH}
                alt="Bubu Smiling"
                style={{
                  width: 38,
                  height: 38,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(255,107,147,0.5))'
                }}
              />
              <span style={{ fontSize: 'clamp(0.85rem, 2.8vw, 0.98rem)', fontWeight: 800, color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>
                Bubu: <span style={{ color: '#ffd54f' }}>"Chalo ab smile karo na baccha… mst wali 🥺✨"</span>
              </span>
            </motion.div>

            {/* Central Animated Lo-Fi Vinyl + Cuddle Teddies */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 2,
                margin: '4px 0'
              }}
            >
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
                style={{
                  width: 'clamp(115px, 26vw, 155px)',
                  height: 'clamp(115px, 26vw, 155px)',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #521946 25%, #190a26 65%, #ff7597 100%)',
                  boxShadow: '0 0 45px rgba(255, 117, 151, 0.6), inset 0 0 20px rgba(0,0,0,0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6
                }}
              >
                <img
                  src={TEDDY_CUDDLE}
                  alt="Listening Teddies"
                  style={{ width: '80%', height: '80%', objectFit: 'contain', borderRadius: '50%' }}
                />
              </motion.div>

              {/* Lo-Fi Frequency Equalizer Bar */}
              <div style={{ display: 'flex', gap: 3.5, height: 14, alignItems: 'flex-end', marginTop: 8 }}>
                {[10, 18, 13, 22, 15, 11, 20, 14, 18, 12].map((h, idx) => (
                  <motion.span
                    key={idx}
                    animate={{ height: isPlaying ? [4, h, 6, h * 0.75, 4] : 3 }}
                    transition={{ repeat: Infinity, duration: 1.1 + (idx * 0.1), ease: 'easeInOut' }}
                    style={{
                      width: 3.5,
                      borderRadius: 2,
                      background: idx % 2 === 0 ? '#ff7597' : '#ffd54f',
                      boxShadow: '0 0 8px rgba(255, 117, 151, 0.8)'
                    }}
                  />
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: 2 }}>
                <div style={{ fontSize: 'clamp(0.95rem, 3vw, 1.15rem)', fontWeight: 900, color: '#ffe4ec', letterSpacing: '0.02em' }}>
                  🕊️ Chidiya • Special Track
                </div>
                <div style={{ fontSize: '0.82rem', color: '#ffd54f', fontWeight: 800 }}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </motion.div>

            {/* CINEMATIC LYRICS LIST */}
            <div
              ref={lyricsContainerRef}
              style={{
                width: '100%',
                maxHeight: 'clamp(140px, 22vh, 180px)',
                overflowY: 'auto',
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
                zIndex: 2
              }}
            >
              {LETTER_1_LYRICS.map((cue, idx) => {
                const isActive = activeLyricIdx === idx
                return (
                  <motion.div
                    key={idx}
                    onClick={() => handleSeekLyric(cue.time)}
                    className={isActive ? 'active-lyric' : ''}
                    animate={{
                      scale: isActive ? 1.08 : 0.94,
                      opacity: isActive ? 1 : 0.3,
                      y: isActive ? 0 : 2
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    style={{
                      fontSize: isActive ? 'clamp(1.3rem, 4.8vw, 1.75rem)' : 'clamp(1rem, 3.6vw, 1.25rem)',
                      fontWeight: isActive ? 900 : 600,
                      color: isActive ? '#ffeaa7' : '#e0d5ec',
                      textShadow: isActive
                        ? '0 0 24px rgba(255, 234, 167, 0.9), 0 0 45px rgba(255, 117, 151, 0.7)'
                        : 'none',
                      letterSpacing: '0.03em',
                      cursor: 'pointer',
                      filter: isActive ? 'none' : 'blur(0.3px)'
                    }}
                  >
                    "{cue.text}"
                  </motion.div>
                )
              })}
            </div>

            {/* LO-FI GLASS CONTROL DOCK WITH PROMINENT NEXT BUTTON */}
            <div
              style={{
                width: '100%',
                maxWidth: 500,
                background: 'rgba(255, 255, 255, 0.09)',
                backdropFilter: 'blur(20px)',
                borderRadius: 22,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '10px 16px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                zIndex: 3
              }}
            >
              {/* Scrubber & Time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', minWidth: 30 }}>
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration || 1}
                  step={0.1}
                  value={currentTime}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value)
                    if (audioRef.current) {
                      audioRef.current.currentTime = val
                    }
                  }}
                  style={{
                    flex: 1,
                    accentColor: '#ff7597',
                    cursor: 'pointer',
                    height: 4
                  }}
                />
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', minWidth: 30 }}>
                  {formatTime(duration)}
                </span>
              </div>

              {/* Action Buttons with Big Prominent Next Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={handleReplay}
                    style={{
                      background: 'rgba(255, 255, 255, 0.14)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      borderRadius: 18,
                      color: '#fff',
                      padding: '6px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    🔄 Replay
                  </button>

                  <button
                    onClick={togglePlayPause}
                    style={{
                      background: 'linear-gradient(135deg, #ff7597, #ff4b72)',
                      border: 'none',
                      borderRadius: '50%',
                      width: 40,
                      height: 40,
                      color: '#fff',
                      fontSize: '1.05rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 16px rgba(255, 75, 114, 0.6)'
                    }}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>
                </div>

                {/* Big Prominent Next CTA */}
                <motion.button
                  onClick={handleFinishSong1}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="btn-primary"
                  style={{
                    padding: '10px 20px',
                    fontSize: '0.94rem',
                    fontWeight: 900,
                    letterSpacing: '0.03em',
                    background: 'linear-gradient(135deg, #ff7597 0%, #ff2a5f 100%)',
                    boxShadow: '0 4px 18px rgba(255, 42, 95, 0.5)',
                    border: '1.5px solid rgba(255, 255, 255, 0.4)'
                  }}
                >
                  <span>Aage Chalein? 😏 ➔</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* STAGE 3: SURPRISE TRANSITION                              */}
        {/* ========================================================= */}
        {stage === 3 && (
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
        {/* STAGE 4: LETTER 2 (Pure Peaceful Reading)                 */}
        {/* ========================================================= */}
        {stage === 4 && (
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

            {/* Clean Letter 2 Paper */}
            <div
              ref={scrollRef2}
              style={{
                marginTop: 6,
                maxHeight: '52dvh',
                overflowY: 'auto',
                background: '#fffdf7',
                borderRadius: 22,
                padding: '22px 24px',
                width: 'min(480px, 92vw)',
                boxShadow: '0 16px 40px rgba(168, 85, 247, 0.18)',
                textAlign: 'left',
                border: '1.5px solid rgba(230, 219, 255, 0.9)',
                position: 'relative'
              }}
            >
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
                  lineHeight: 1.45,
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
                    marginTop: 20,
                    gap: 10
                  }}
                >
                  <img
                    src={TEDDY_BLUSH}
                    alt="Blushing Teddy"
                    style={{
                      width: 90,
                      height: 90,
                      objectFit: 'contain',
                      borderRadius: 16
                    }}
                  />
                  <button
                    className="btn-primary"
                    onClick={handleStartSong2}
                    style={{ width: '100%', maxWidth: 300, padding: '14px 20px', fontSize: '1rem' }}
                  >
                    <span>Ye Bhi Padh Liya? Ab Gaana Suno 🎶✨</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* STAGE 5: FULL-SCREEN WARM VIOLET LOFI ROOM (Vilen)        */}
        {/* ========================================================= */}
        {stage === 5 && (
          <motion.div
            key="song2room"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              inset: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 99999,
              background: 'radial-gradient(ellipse at 50% 15%, #3d1554 0%, #1e0a2e 45%, #0d0317 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 'clamp(12px, 2.5vh, 20px) clamp(14px, 3.5vw, 24px)',
              textAlign: 'center',
              overflow: 'hidden'
            }}
          >
            {/* Ambient Warm Violet Moon & Twinkling Stars */}
            <div
              style={{
                position: 'absolute',
                top: 18,
                right: 22,
                width: 58,
                height: 58,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #fffdf0 0%, #e9d5ff 55%, rgba(233,213,255,0) 80%)',
                boxShadow: '0 0 40px rgba(216, 180, 254, 0.8)',
                opacity: 0.95,
                pointerEvents: 'none'
              }}
            />

            {/* Glowing Warm Violet Orbs */}
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.55, 0.35] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: '10%',
                left: '6%',
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'rgba(192, 132, 252, 0.28)',
                filter: 'blur(70px)',
                pointerEvents: 'none'
              }}
            />

            {/* Top Bubu Smiling Teddy Encouraging Her to Smile */}
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(216, 180, 254, 0.4)',
                borderRadius: 24,
                padding: '6px 16px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                zIndex: 3
              }}
            >
              <img
                src={TEDDY_BLUSH}
                alt="Bubu Smiling"
                style={{
                  width: 38,
                  height: 38,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(192,132,252,0.5))'
                }}
              />
              <span style={{ fontSize: 'clamp(0.85rem, 2.8vw, 0.98rem)', fontWeight: 800, color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>
                Bubu: <span style={{ color: '#ffd54f' }}>"Chalo ab smile karo na baccha… mst wali 🥺✨"</span>
              </span>
            </motion.div>

            {/* Central Animated Lo-Fi Vinyl + Cuddle Teddies */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 2,
                margin: '4px 0'
              }}
            >
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
                style={{
                  width: 'clamp(115px, 26vw, 155px)',
                  height: 'clamp(115px, 26vw, 155px)',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #581c87 25%, #18092a 65%, #c084fc 100%)',
                  boxShadow: '0 0 45px rgba(192, 132, 252, 0.6), inset 0 0 20px rgba(0,0,0,0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 6
                }}
              >
                <img
                  src={TEDDY_CUDDLE}
                  alt="Listening Teddies"
                  style={{ width: '80%', height: '80%', objectFit: 'contain', borderRadius: '50%' }}
                />
              </motion.div>

              {/* Lo-Fi Frequency Equalizer Bar */}
              <div style={{ display: 'flex', gap: 3.5, height: 14, alignItems: 'flex-end', marginTop: 8 }}>
                {[10, 18, 13, 22, 15, 11, 20, 14, 18, 12].map((h, idx) => (
                  <motion.span
                    key={idx}
                    animate={{ height: isPlaying ? [4, h, 6, h * 0.75, 4] : 3 }}
                    transition={{ repeat: Infinity, duration: 1.1 + (idx * 0.1), ease: 'easeInOut' }}
                    style={{
                      width: 3.5,
                      borderRadius: 2,
                      background: idx % 2 === 0 ? '#c084fc' : '#ffd54f',
                      boxShadow: '0 0 8px rgba(192, 132, 252, 0.8)'
                    }}
                  />
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: 2 }}>
                <div style={{ fontSize: 'clamp(0.95rem, 3vw, 1.15rem)', fontWeight: 900, color: '#f3e8ff', letterSpacing: '0.02em' }}>
                  ✨ Vilen • Ji Le Zindagi
                </div>
                <div style={{ fontSize: '0.82rem', color: '#ffd54f', fontWeight: 800 }}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            </motion.div>

            {/* CINEMATIC LYRICS LIST */}
            <div
              ref={lyricsContainerRef}
              style={{
                width: '100%',
                maxHeight: 'clamp(140px, 22vh, 180px)',
                overflowY: 'auto',
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
                zIndex: 2
              }}
            >
              {LETTER_2_LYRICS.map((cue, idx) => {
                const isActive = activeLyricIdx === idx
                return (
                  <motion.div
                    key={idx}
                    onClick={() => handleSeekLyric(cue.time)}
                    className={isActive ? 'active-lyric' : ''}
                    animate={{
                      scale: isActive ? 1.08 : 0.94,
                      opacity: isActive ? 1 : 0.3,
                      y: isActive ? 0 : 2
                    }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    style={{
                      fontSize: isActive ? 'clamp(1.3rem, 4.8vw, 1.75rem)' : 'clamp(1rem, 3.6vw, 1.25rem)',
                      fontWeight: isActive ? 900 : 600,
                      color: isActive ? '#ffd54f' : '#e9d5ff',
                      textShadow: isActive
                        ? '0 0 24px rgba(255, 213, 79, 0.9), 0 0 45px rgba(192, 132, 252, 0.7)'
                        : 'none',
                      letterSpacing: '0.03em',
                      cursor: 'pointer',
                      filter: isActive ? 'none' : 'blur(0.3px)'
                    }}
                  >
                    "{cue.text}"
                  </motion.div>
                )
              })}
            </div>

            {/* LO-FI GLASS CONTROL DOCK WITH PROMINENT CAKE BUTTON */}
            <div
              style={{
                width: '100%',
                maxWidth: 500,
                background: 'rgba(255, 255, 255, 0.09)',
                backdropFilter: 'blur(20px)',
                borderRadius: 22,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '10px 16px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                zIndex: 3
              }}
            >
              {/* Scrubber & Time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', minWidth: 30 }}>
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration || 1}
                  step={0.1}
                  value={currentTime}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value)
                    if (audioRef.current) {
                      audioRef.current.currentTime = val
                    }
                  }}
                  style={{
                    flex: 1,
                    accentColor: '#c084fc',
                    cursor: 'pointer',
                    height: 4
                  }}
                />
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', minWidth: 30 }}>
                  {formatTime(duration)}
                </span>
              </div>

              {/* Action Buttons with Big Prominent Next Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={handleReplay}
                    style={{
                      background: 'rgba(255, 255, 255, 0.14)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      borderRadius: 18,
                      color: '#fff',
                      padding: '6px 12px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    🔄 Replay
                  </button>

                  <button
                    onClick={togglePlayPause}
                    style={{
                      background: 'linear-gradient(135deg, #c084fc, #7e22ce)',
                      border: 'none',
                      borderRadius: '50%',
                      width: 40,
                      height: 40,
                      color: '#fff',
                      fontSize: '1.05rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 16px rgba(192, 132, 252, 0.6)'
                    }}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>
                </div>

                {/* Big Prominent Cake Next CTA */}
                <motion.button
                  onClick={handleFinishAll}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="btn-primary"
                  style={{
                    padding: '10px 20px',
                    fontSize: '0.94rem',
                    fontWeight: 900,
                    letterSpacing: '0.03em',
                    background: 'linear-gradient(135deg, #a855f7 0%, #6b21a8 100%)',
                    boxShadow: '0 4px 18px rgba(168, 85, 247, 0.5)',
                    border: '1.5px solid rgba(255, 255, 255, 0.4)'
                  }}
                >
                  <span>Cake Par Chalein 🎂✨ ➔</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SceneShell>
  )
}
