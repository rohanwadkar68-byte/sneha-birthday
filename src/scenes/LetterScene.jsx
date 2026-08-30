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
  // 2: Song 1 Dedicated Listening Room (Chidiya + Lyrics + Feelings)
  // 3: Surprise Transition ("Baccha... ruko. Ek aur hai.")
  // 4: Letter 2 (Pure Reading - No Music/No Overlays)
  // 5: Song 2 Dedicated Listening Room (Vilen + Lyrics + Feelings)
  const [stage, setStage] = useState(0)
  const [opened1, setOpened1] = useState(false)
  const [opened2, setOpened2] = useState(false)
  const [lyricIdx1, setLyricIdx1] = useState(0)
  const [lyricIdx2, setLyricIdx2] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef1 = useRef(null)
  const audioRef2 = useRef(null)
  const scrollRef1 = useRef(null)
  const scrollRef2 = useRef(null)

  // Typewriter hooks for clean letters
  const { output: output1, done: done1 } = useTypewriter(opened1 ? LETTER_LINES : [], 22)
  const { output: output2, done: done2 } = useTypewriter(opened2 ? LETTER_2_LINES : [], 22)

  // Cleanup audio on unmount
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

  // Lyrics timeline for Song 1 (Chidiya) in Stage 2
  useEffect(() => {
    if (stage !== 2) return
    setLyricIdx1(0)
    let idx = 0
    const interval = setInterval(() => {
      idx++
      if (idx < LETTER_1_LYRICS.length) {
        setLyricIdx1(idx)
      } else {
        clearInterval(interval)
      }
    }, 4200)
    return () => clearInterval(interval)
  }, [stage])

  // Lyrics timeline for Song 2 (Vilen) in Stage 5
  useEffect(() => {
    if (stage !== 5) return
    setLyricIdx2(0)
    let idx = 0
    const interval = setInterval(() => {
      idx++
      if (idx < LETTER_2_LYRICS.length) {
        setLyricIdx2(idx)
      } else {
        clearInterval(interval)
      }
    }, 4500)
    return () => clearInterval(interval)
  }, [stage])

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
    setIsPlaying(true)

    try {
      if (audioRef2.current) {
        audioRef2.current.currentTime = 0
        audioRef2.current.play()
      } else {
        const a = new Audio(SONG_2_CHIDIYA)
        a.volume = 0.75
        a.play().catch(() => {})
        audioRef2.current = a
        a.onended = () => setIsPlaying(false)
      }
    } catch (e) {}
  }

  // Stage 2 -> 3: Go to Surprise Transition
  const handleFinishSong1 = () => {
    playPop()
    if (audioRef2.current) {
      audioRef2.current.pause()
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
    setIsPlaying(true)

    try {
      if (audioRef1.current) {
        audioRef1.current.currentTime = 0
        audioRef1.current.play()
      } else {
        const a = new Audio(SONG_1_VILEN)
        a.volume = 0.75
        a.play().catch(() => {})
        audioRef1.current = a
        a.onended = () => setIsPlaying(false)
      }
    } catch (e) {}
  }

  // Stage 5 -> Finish
  const handleFinishAll = () => {
    playSparkle()
    if (audioRef1.current) {
      audioRef1.current.pause()
    }
    onNext()
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
              {/* Soft stamp */}
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
        {/* STAGE 2: SONG 1 LISTENING ROOM (Chidiya Track & Feelings)  */}
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
              padding: '16px 14px'
            }}
          >
            <div className="hand-note" style={{ marginBottom: 8 }}>
              🎧 Close Your Eyes & Feel The Music 🕊️🩶
            </div>

            {/* Cinematic Music Card */}
            <div
              style={{
                width: '100%',
                background: 'linear-gradient(145deg, #1b1638, #2a1f4a)',
                borderRadius: 28,
                padding: '24px 20px',
                border: '2px solid rgba(255, 215, 230, 0.3)',
                boxShadow: '0 20px 50px rgba(18, 14, 40, 0.5)',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16
              }}
            >
              {/* Spinning / Glowing Teddy Vinyl Visual */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #3d2f66 35%, #18122b 70%, #ff85a8 100%)',
                  boxShadow: '0 0 30px rgba(255, 133, 168, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <img
                  src={TEDDY_CUDDLE}
                  alt="Listening Teddies"
                  style={{
                    width: 96,
                    height: 96,
                    objectFit: 'contain',
                    borderRadius: '50%',
                    filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))'
                  }}
                />
              </motion.div>

              {/* Dynamic Floating Lyric Display */}
              <div
                style={{
                  minHeight: 64,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '4px 10px'
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lyricIdx1}
                    initial={{ opacity: 0, y: 12, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1.05 }}
                    exit={{ opacity: 0, y: -12, scale: 0.94 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                      fontSize: 'clamp(1.15rem, 4.2vw, 1.45rem)',
                      fontWeight: 800,
                      color: lyricIdx1 === LETTER_1_LYRICS.length - 1 ? '#ffd54f' : '#ffe4ec',
                      textShadow: '0 0 16px rgba(255, 182, 193, 0.65)',
                      letterSpacing: '0.03em'
                    }}
                  >
                    "{LETTER_1_LYRICS[lyricIdx1]?.text}"
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress dots */}
              <div style={{ display: 'flex', gap: 5 }}>
                {LETTER_1_LYRICS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: lyricIdx1 === i ? 18 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: lyricIdx1 === i ? '#ff7597' : 'rgba(255,255,255,0.25)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>

              {/* Continue button */}
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFinishSong1}
                style={{
                  width: '100%',
                  marginTop: 6,
                  padding: '13px 20px',
                  background: 'linear-gradient(135deg, #ff85a8 0%, #ff4b72 100%)',
                  border: 'none'
                }}
              >
                <span>Aage Chalein? 😏→</span>
              </motion.button>
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
              {/* Soft stamp */}
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
        {/* STAGE 5: SONG 2 LISTENING ROOM (Vilen Track & Feelings)    */}
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
              padding: '16px 14px'
            }}
          >
            <div className="hand-note" style={{ marginBottom: 8 }}>
              🎶 Feel The Soul & The Meaning ✨🩶
            </div>

            {/* Cinematic Music Card 2 */}
            <div
              style={{
                width: '100%',
                background: 'linear-gradient(145deg, #201438, #3b1845)',
                borderRadius: 28,
                padding: '24px 20px',
                border: '2px solid rgba(255, 200, 240, 0.3)',
                boxShadow: '0 20px 50px rgba(18, 14, 40, 0.5)',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16
              }}
            >
              {/* Spinning / Glowing Teddy Vinyl Visual */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #5b21b6 35%, #1e1138 70%, #c084fc 100%)',
                  boxShadow: '0 0 30px rgba(192, 132, 252, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <img
                  src={TEDDY_CUDDLE}
                  alt="Vilen Song Teddies"
                  style={{
                    width: 96,
                    height: 96,
                    objectFit: 'contain',
                    borderRadius: '50%',
                    filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))'
                  }}
                />
              </motion.div>

              {/* Dynamic Floating Lyric Display */}
              <div
                style={{
                  minHeight: 64,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '4px 10px'
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lyricIdx2}
                    initial={{ opacity: 0, y: 12, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1.05 }}
                    exit={{ opacity: 0, y: -12, scale: 0.94 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                      fontSize: 'clamp(1.15rem, 4.2vw, 1.45rem)',
                      fontWeight: 800,
                      color: lyricIdx2 === LETTER_2_LYRICS.length - 1 ? '#ffd54f' : '#f3e8ff',
                      textShadow: '0 0 16px rgba(192, 132, 252, 0.65)',
                      letterSpacing: '0.03em'
                    }}
                  >
                    "{LETTER_2_LYRICS[lyricIdx2]?.text}"
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress dots */}
              <div style={{ display: 'flex', gap: 5 }}>
                {LETTER_2_LYRICS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: lyricIdx2 === i ? 18 : 6,
                      height: 6,
                      borderRadius: 3,
                      background: lyricIdx2 === i ? '#c084fc' : 'rgba(255,255,255,0.25)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>

              {/* Next Cake Button */}
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFinishAll}
                style={{
                  width: '100%',
                  marginTop: 6,
                  padding: '13px 20px',
                  background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
                  border: 'none'
                }}
              >
                <span>Bas ab cake ka number hai 🎂✨</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SceneShell>
  )
}
