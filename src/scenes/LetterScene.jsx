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
        {/* STAGE 2: SONG 1 LISTENING ROOM (Chidiya - Real-Time Sync)  */}
        {/* ========================================================= */}
        {stage === 2 && (
          <motion.div
            key="song1room"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={SPRING}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              width: '100%',
              maxWidth: 500,
              margin: '0 auto',
              padding: '12px 14px'
            }}
          >
            <div className="hand-note" style={{ marginBottom: 8 }}>
              🎧 Close Your Eyes & Feel The Soul 🕊️🩶
            </div>

            {/* Cinematic Lo-Fi Music Card with Real-Time Synced Lyrics */}
            <div
              style={{
                width: '100%',
                background: 'linear-gradient(155deg, #100a26 0%, #1f1238 60%, #301444 100%)',
                borderRadius: 32,
                padding: '24px 20px',
                border: '2px solid rgba(255, 117, 151, 0.35)',
                boxShadow: '0 25px 60px rgba(10, 6, 25, 0.75), inset 0 1px 0 rgba(255,255,255,0.15)',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14
              }}
            >
              {/* Header: Rotating Vinyl + Equalizer + Track Info */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: '100%' }}>
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
                  style={{
                    width: 'clamp(110px, 25vw, 140px)',
                    height: 'clamp(110px, 25vw, 140px)',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #4a1942 30%, #130a22 65%, #ff7597 100%)',
                    boxShadow: '0 0 40px rgba(255, 117, 151, 0.45), inset 0 0 20px rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8
                  }}
                >
                  <img
                    src={TEDDY_CUDDLE}
                    alt="Listening Teddies"
                    style={{ width: '80%', height: '80%', objectFit: 'contain', borderRadius: '50%' }}
                  />
                </motion.div>

                {/* Lo-Fi Frequency Equalizer Bar */}
                <div style={{ display: 'flex', gap: 3.5, height: 16, alignItems: 'flex-end', marginTop: 4 }}>
                  {[10, 18, 14, 24, 16, 12, 22, 15, 20, 13].map((h, idx) => (
                    <motion.span
                      key={idx}
                      animate={{ height: isPlaying ? [5, h, 7, h * 0.75, 5] : 4 }}
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
                  <div style={{ fontSize: '1.12rem', fontWeight: 900, color: '#ffe4ec', letterSpacing: '0.02em' }}>
                    🕊️ Chidiya • Special Lofi Track
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#ffd54f', fontWeight: 700 }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
              </div>

              {/* Real-Time Synced Scrollable Lyrics List */}
              <div
                ref={lyricsContainerRef}
                style={{
                  width: '100%',
                  height: 'clamp(180px, 28vh, 230px)',
                  overflowY: 'auto',
                  background: 'rgba(0, 0, 0, 0.35)',
                  borderRadius: 18,
                  padding: '16px 12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  scrollBehavior: 'smooth'
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
                        scale: isActive ? 1.05 : 0.96,
                        opacity: isActive ? 1 : 0.42
                      }}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 14,
                        background: isActive ? 'rgba(255, 117, 151, 0.22)' : 'transparent',
                        border: isActive ? '1px solid rgba(255, 117, 151, 0.45)' : '1px solid transparent',
                        color: isActive ? '#ffd54f' : '#f0e6ff',
                        fontWeight: isActive ? 900 : 600,
                        fontSize: isActive ? '1.15rem' : '0.94rem',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        textShadow: isActive ? '0 0 14px rgba(255, 213, 79, 0.5)' : 'none'
                      }}
                    >
                      {cue.text}
                    </motion.div>
                  )
                })}
              </div>

              {/* Progress Slider */}
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10 }}>
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
                    height: 5
                  }}
                />
              </div>

              {/* Controls Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, width: '100%' }}>
                <button
                  onClick={() => handleReplay(LETTER_1_LYRICS)}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: 20,
                    color: '#fff',
                    padding: '6px 14px',
                    fontSize: '0.84rem',
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
                    width: 44,
                    height: 44,
                    color: '#fff',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(255, 75, 114, 0.4)'
                  }}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>

                <button
                  onClick={handleFinishSong1}
                  className="btn-primary"
                  style={{
                    padding: '8px 18px',
                    fontSize: '0.9rem',
                    background: 'linear-gradient(135deg, #ff85a8 0%, #ff4b72 100%)'
                  }}
                >
                  <span>Aage Chalein? 😏→</span>
                </button>
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
        {/* STAGE 5: SONG 2 LISTENING ROOM (Vilen - Real-Time Sync)    */}
        {/* ========================================================= */}
        {stage === 5 && (
          <motion.div
            key="song2room"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={SPRING}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              width: '100%',
              maxWidth: 500,
              margin: '0 auto',
              padding: '12px 14px'
            }}
          >
            <div className="hand-note" style={{ marginBottom: 8 }}>
              🎶 Deep Violet Night • Feel Every Word ✨🩶
            </div>

            {/* Cinematic Lo-Fi Music Card with Real-Time Synced Lyrics */}
            <div
              style={{
                width: '100%',
                background: 'linear-gradient(155deg, #120924 0%, #221038 60%, #3d144d 100%)',
                borderRadius: 32,
                padding: '24px 20px',
                border: '2px solid rgba(192, 132, 252, 0.35)',
                boxShadow: '0 25px 60px rgba(10, 5, 25, 0.75), inset 0 1px 0 rgba(255,255,255,0.15)',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14
              }}
            >
              {/* Header: Rotating Vinyl + Equalizer + Track Info */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: '100%' }}>
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
                  style={{
                    width: 'clamp(110px, 25vw, 140px)',
                    height: 'clamp(110px, 25vw, 140px)',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #5b21b6 30%, #150928 65%, #c084fc 100%)',
                    boxShadow: '0 0 40px rgba(192, 132, 252, 0.45), inset 0 0 20px rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8
                  }}
                >
                  <img
                    src={TEDDY_CUDDLE}
                    alt="Listening Teddies"
                    style={{ width: '80%', height: '80%', objectFit: 'contain', borderRadius: '50%' }}
                  />
                </motion.div>

                {/* Lo-Fi Frequency Equalizer Bar */}
                <div style={{ display: 'flex', gap: 3.5, height: 16, alignItems: 'flex-end', marginTop: 4 }}>
                  {[12, 22, 16, 28, 18, 14, 26, 17, 24, 15].map((h, idx) => (
                    <motion.span
                      key={idx}
                      animate={{ height: isPlaying ? [5, h, 7, h * 0.75, 5] : 4 }}
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
                  <div style={{ fontSize: '1.12rem', fontWeight: 900, color: '#f3e8ff', letterSpacing: '0.02em' }}>
                    ✨ Vilen • Ji Le Zindagi
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#ffd54f', fontWeight: 700 }}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
              </div>

              {/* Real-Time Synced Scrollable Lyrics List */}
              <div
                ref={lyricsContainerRef}
                style={{
                  width: '100%',
                  height: 'clamp(180px, 28vh, 230px)',
                  overflowY: 'auto',
                  background: 'rgba(0, 0, 0, 0.35)',
                  borderRadius: 18,
                  padding: '16px 12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  scrollBehavior: 'smooth'
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
                        scale: isActive ? 1.05 : 0.96,
                        opacity: isActive ? 1 : 0.42
                      }}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 14,
                        background: isActive ? 'rgba(192, 132, 252, 0.22)' : 'transparent',
                        border: isActive ? '1px solid rgba(192, 132, 252, 0.45)' : '1px solid transparent',
                        color: isActive ? '#ffd54f' : '#f0e6ff',
                        fontWeight: isActive ? 900 : 600,
                        fontSize: isActive ? '1.15rem' : '0.94rem',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        textShadow: isActive ? '0 0 14px rgba(255, 213, 79, 0.5)' : 'none'
                      }}
                    >
                      {cue.text}
                    </motion.div>
                  )
                })}
              </div>

              {/* Progress Slider */}
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10 }}>
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
                    height: 5
                  }}
                />
              </div>

              {/* Controls Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, width: '100%' }}>
                <button
                  onClick={() => handleReplay(LETTER_2_LYRICS)}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: 20,
                    color: '#fff',
                    padding: '6px 14px',
                    fontSize: '0.84rem',
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
                    width: 44,
                    height: 44,
                    color: '#fff',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(126, 34, 206, 0.4)'
                  }}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>

                <button
                  onClick={handleFinishAll}
                  className="btn-primary"
                  style={{
                    padding: '8px 18px',
                    fontSize: '0.9rem',
                    background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)'
                  }}
                >
                  <span>Cake Par Chalein 🎂✨</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SceneShell>
  )
}
