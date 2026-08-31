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
  LETTER_UI,
  SCROLL_ASSISTANT_CONTENT
} from '../utils/content.js'
import { playSparkle, playPop, pauseBGM, resumeBGM } from '../utils/audio.js'
import ScrollAssistantCat from '../components/ScrollAssistantCat.jsx'

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

  // Typewriter hooks for clean letters (slow, soulful & emotional)
  const { output: output1, done: done1 } = useTypewriter(opened1 ? LETTER_LINES : [], 34, 650)
  const { output: output2, done: done2 } = useTypewriter(opened2 ? LETTER_2_LINES : [], 34, 650)

  // Cleanup audio on unmount or stage change
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      resumeBGM()
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

    pauseBGM() // Automatically stop background BGM during vocal songs

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
    pauseBGM()
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
    resumeBGM()
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
    pauseBGM()
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
    resumeBGM()
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

  // Check if song is completed or within last 5 seconds
  const canGoNext1 = (duration > 5 && currentTime >= duration - 5) || currentTime >= 15 || activeLyricIdx >= LETTER_1_LYRICS.length - 1
  const canGoNext2 = (duration > 5 && currentTime >= duration - 5) || currentTime >= 15 || activeLyricIdx >= LETTER_2_LYRICS.length - 1

  if (stage === 2) {
    return (
      <motion.div
        key="song1room"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100dvh',
          zIndex: 999999,
          background: 'radial-gradient(circle at 50% 10%, #520f3e 0%, #200626 45%, #08010f 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: '5%', left: '8%', width: 280, height: 280, borderRadius: '50%', background: 'rgba(255, 75, 130, 0.28)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '8%', width: 320, height: 320, borderRadius: '50%', background: 'rgba(255, 213, 79, 0.18)', filter: 'blur(90px)', pointerEvents: 'none' }} />

        {/* 🎧 OUTSIDE CANVAS (TOP-LEFT): Earphones Recommended Badge */}
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ position: 'fixed', top: 'max(16px, env(safe-area-inset-top, 16px))', left: 'max(16px, env(safe-area-inset-left, 16px))', zIndex: 1000000, display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255, 255, 255, 0.14)', backdropFilter: 'blur(20px)', border: '1.5px solid rgba(255, 117, 151, 0.55)', borderRadius: 24, padding: '8px 18px', color: '#ffe4ec', fontSize: 'clamp(0.78rem, 2.2vw, 0.92rem)', fontWeight: 800, boxShadow: '0 8px 25px rgba(0,0,0,0.6)' }}>
          <span>🎧 Earphones Recommended • Feel Every Word 🕊️</span>
        </motion.div>

        {/* 👉 OUTSIDE CANVAS (TOP-RIGHT): Big Glowing Persistent Next Button (Appears 5s before end) */}
        <AnimatePresence>
          {canGoNext1 && (
            <motion.button
              onClick={handleFinishSong1}
              initial={{ scale: 0, opacity: 0, y: -10 }}
              animate={{ scale: [1, 1.06, 1], opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ scale: { repeat: Infinity, duration: 2, ease: 'easeInOut' }, duration: 0.4 }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              style={{
                position: 'fixed',
                top: 'max(14px, env(safe-area-inset-top, 14px))',
                right: 'max(16px, env(safe-area-inset-right, 16px))',
                zIndex: 1000000,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'linear-gradient(135deg, #ff3366 0%, #ff6699 100%)',
                border: '2px solid rgba(255, 255, 255, 0.85)',
                borderRadius: 28,
                padding: '10px 22px',
                color: '#fff',
                fontSize: 'clamp(0.88rem, 2.5vw, 1.05rem)',
                fontWeight: 900,
                boxShadow: '0 0 28px rgba(255, 51, 102, 0.85)',
                cursor: 'pointer'
              }}
            >
              <span>Aage Chalein 😏 ➔</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* 🧸 OUTSIDE CANVAS (BOTTOM-LEFT): Smiling Bubu Mascot with Speech Card */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} style={{ position: 'fixed', bottom: 'max(16px, env(safe-area-inset-bottom, 16px))', left: 'max(16px, env(safe-area-inset-left, 16px))', zIndex: 1000000, display: 'flex', alignItems: 'flex-end', gap: 12, maxWidth: 'min(380px, 85vw)', pointerEvents: 'none' }}>
          <img src={TEDDY_BLUSH} alt="Bubu Smiling" style={{ width: 64, height: 64, objectFit: 'contain', filter: 'drop-shadow(0 4px 16px rgba(255,107,147,0.9))', flexShrink: 0 }} />
          <div style={{ background: 'rgba(255, 255, 255, 0.18)', backdropFilter: 'blur(20px)', border: '1.5px solid rgba(255, 213, 79, 0.75)', borderRadius: '20px 20px 20px 4px', padding: '10px 16px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)', textAlign: 'left' }}>
            <div style={{ fontSize: '0.74rem', color: '#ffd54f', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>🧸 Bubu's Message:</div>
            <div style={{ fontSize: 'clamp(0.82rem, 2.3vw, 0.92rem)', color: '#fff', fontWeight: 800, lineHeight: 1.35 }}>"Aise muh mat latkao baccha... <span style={{ color: '#ffd54f' }}>'Teri Hi Muskaan Se Bani Hai'</span> 🤍 toh ab mst cute si smile karo! 🥺💖"</div>
          </div>
        </motion.div>

        {/* 🌟 CENTER CANVAS: Spinning Vinyl Player + Pure Synced Lyrics */}
        <div style={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, zIndex: 2, margin: 'auto 0' }}>
          <motion.div animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ repeat: Infinity, duration: 14, ease: 'linear' }} style={{ width: 'clamp(110px, 22vw, 145px)', height: 'clamp(110px, 22vw, 145px)', borderRadius: '50%', background: 'radial-gradient(circle, #521946 25%, #190a26 65%, #ff7597 100%)', boxShadow: '0 0 50px rgba(255, 117, 151, 0.7), inset 0 0 20px rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6 }}>
            <img src={TEDDY_CUDDLE} alt="Listening Teddies" style={{ width: '80%', height: '80%', objectFit: 'contain', borderRadius: '50%' }} />
          </motion.div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: 3.5, height: 14, alignItems: 'flex-end', justifyContent: 'center', marginBottom: 6 }}>
              {[10, 18, 13, 22, 15, 11, 20, 14, 18, 12].map((h, idx) => (
                <motion.span key={idx} animate={{ height: isPlaying ? [4, h, 6, h * 0.75, 4] : 3 }} transition={{ repeat: Infinity, duration: 1.1 + (idx * 0.1), ease: 'easeInOut' }} style={{ width: 3.5, borderRadius: 2, background: idx % 2 === 0 ? '#ff7597' : '#ffd54f', boxShadow: '0 0 8px rgba(255, 117, 151, 0.9)' }} />
              ))}
            </div>
            <div style={{ fontSize: 'clamp(1.05rem, 3vw, 1.25rem)', fontWeight: 900, color: '#ffe4ec', letterSpacing: '0.02em' }}>🕊️ Chidiya • Special Track</div>
            <div style={{ fontSize: '0.82rem', color: '#ffd54f', fontWeight: 800 }}>{formatTime(currentTime)} / {formatTime(duration)}</div>
          </div>
          <div ref={lyricsContainerRef} style={{ width: '100%', maxHeight: 'clamp(140px, 24vh, 200px)', overflowY: 'auto', padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 12, scrollBehavior: 'smooth', scrollbarWidth: 'none', maskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)', zIndex: 2 }}>
            {LETTER_1_LYRICS.map((cue, idx) => {
              const isActive = activeLyricIdx === idx
              return (
                <motion.div key={idx} onClick={() => handleSeekLyric(cue.time)} className={isActive ? 'active-lyric' : ''} animate={{ scale: isActive ? 1.12 : 0.94, opacity: isActive ? 1 : 0.28, y: isActive ? 0 : 2 }} transition={{ duration: 0.35, ease: 'easeOut' }} style={{ fontSize: isActive ? 'clamp(1.4rem, 5vw, 1.85rem)' : 'clamp(1rem, 3.6vw, 1.25rem)', fontWeight: isActive ? 900 : 600, color: isActive ? '#ffd54f' : '#e0d5ec', textShadow: isActive ? '0 0 26px rgba(255, 213, 79, 0.95), 0 0 48px rgba(255, 117, 151, 0.8)' : 'none', letterSpacing: '0.03em', cursor: 'pointer', filter: isActive ? 'none' : 'blur(0.3px)' }}>"{cue.text}"</motion.div>
              )
            })}
          </div>
        </div>

        {/* 🎵 OUTSIDE CANVAS (BOTTOM-RIGHT): Sleek Music Controller Dock */}
        <div style={{ position: 'fixed', bottom: 'max(16px, env(safe-area-inset-bottom, 16px))', right: 'max(16px, env(safe-area-inset-right, 16px))', zIndex: 1000000, width: 'min(380px, 92vw)', background: 'rgba(255, 255, 255, 0.14)', backdropFilter: 'blur(22px)', borderRadius: 22, border: '1.5px solid rgba(255, 255, 255, 0.3)', padding: '8px 16px', boxShadow: '0 12px 35px rgba(0, 0, 0, 0.65)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
            <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.85)', minWidth: 28 }}>{formatTime(currentTime)}</span>
            <input type="range" min={0} max={duration || 1} step={0.1} value={currentTime} onChange={(e) => { if (audioRef.current) audioRef.current.currentTime = parseFloat(e.target.value) }} style={{ flex: 1, accentColor: '#ff7597', cursor: 'pointer', height: 4 }} />
            <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.85)', minWidth: 28 }}>{formatTime(duration)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <button onClick={handleReplay} style={{ background: 'rgba(255, 255, 255, 0.16)', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: 16, color: '#fff', padding: '5px 12px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}>🔄 Replay</button>
            <button onClick={togglePlayPause} style={{ background: 'linear-gradient(135deg, #ff4071, #ff7597)', border: 'none', borderRadius: '50%', width: 38, height: 38, color: '#fff', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(255, 64, 113, 0.7)' }}>{isPlaying ? '⏸' : '▶'}</button>
            {canGoNext1 ? (
              <button onClick={handleFinishSong1} style={{ background: 'linear-gradient(135deg, #ff3366, #ff6699)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: 16, color: '#fff', padding: '6px 14px', fontSize: '0.82rem', fontWeight: 900, cursor: 'pointer' }}>Next ➔</button>
            ) : (
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>🎧 Enjoying Track...</span>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  if (stage === 5) {
    return (
      <motion.div
        key="song2room"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100dvh',
          zIndex: 999999,
          background: 'radial-gradient(circle at 50% 10%, #4a0d68 0%, #170428 45%, #06000f 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: '5%', right: '8%', width: 280, height: 280, borderRadius: '50%', background: 'rgba(192, 132, 252, 0.28)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '8%', width: 320, height: 320, borderRadius: '50%', background: 'rgba(168, 85, 247, 0.2)', filter: 'blur(90px)', pointerEvents: 'none' }} />

        {/* 🎶 OUTSIDE CANVAS (TOP-LEFT): Deep Violet Night Badge */}
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ position: 'fixed', top: 'max(16px, env(safe-area-inset-top, 16px))', left: 'max(16px, env(safe-area-inset-left, 16px))', zIndex: 1000000, display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255, 255, 255, 0.14)', backdropFilter: 'blur(20px)', border: '1.5px solid rgba(192, 132, 252, 0.55)', borderRadius: 24, padding: '8px 18px', color: '#f3e8ff', fontSize: 'clamp(0.78rem, 2.2vw, 0.92rem)', fontWeight: 800, boxShadow: '0 8px 25px rgba(0,0,0,0.6)' }}>
          <span>🎶 Midnight Violet Room • Ji Le Zindagi 😌✨</span>
        </motion.div>

        {/* 🎂 OUTSIDE CANVAS (TOP-RIGHT): Big Glowing Cake CTA (Appears 5s before end) */}
        <AnimatePresence>
          {canGoNext2 && (
            <motion.button
              onClick={handleFinishAll}
              initial={{ scale: 0, opacity: 0, y: -10 }}
              animate={{ scale: [1, 1.06, 1], opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ scale: { repeat: Infinity, duration: 2, ease: 'easeInOut' }, duration: 0.4 }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              style={{
                position: 'fixed',
                top: 'max(14px, env(safe-area-inset-top, 14px))',
                right: 'max(16px, env(safe-area-inset-right, 16px))',
                zIndex: 1000000,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
                border: '2px solid rgba(255, 255, 255, 0.85)',
                borderRadius: 28,
                padding: '10px 22px',
                color: '#fff',
                fontSize: 'clamp(0.88rem, 2.5vw, 1.05rem)',
                fontWeight: 900,
                boxShadow: '0 0 28px rgba(168, 85, 247, 0.85)',
                cursor: 'pointer'
              }}
            >
              <span>Cake Par Chalein 🎂✨ ➔</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* 🧸 OUTSIDE CANVAS (BOTTOM-LEFT): Smiling Bubu Mascot with Speech Card */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} style={{ position: 'fixed', bottom: 'max(16px, env(safe-area-inset-bottom, 16px))', left: 'max(16px, env(safe-area-inset-left, 16px))', zIndex: 1000000, display: 'flex', alignItems: 'flex-end', gap: 12, maxWidth: 'min(380px, 85vw)', pointerEvents: 'none' }}>
          <img src={TEDDY_BLUSH} alt="Bubu Smiling" style={{ width: 64, height: 64, objectFit: 'contain', filter: 'drop-shadow(0 4px 16px rgba(192,132,252,0.9))', flexShrink: 0 }} />
          <div style={{ background: 'rgba(255, 255, 255, 0.18)', backdropFilter: 'blur(20px)', border: '1.5px solid rgba(216, 180, 254, 0.75)', borderRadius: '20px 20px 20px 4px', padding: '10px 16px', boxShadow: '0 10px 30px rgba(0,0,0,0.6)', textAlign: 'left' }}>
            <div style={{ fontSize: '0.74rem', color: '#e9d5ff', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>🧸 Bubu's Message:</div>
            <div style={{ fontSize: 'clamp(0.82rem, 2.3vw, 0.92rem)', color: '#fff', fontWeight: 800, lineHeight: 1.35 }}>"Besharm zamane ko chodo... <span style={{ color: '#ffd54f' }}>'Aage Badhke Jile Zindagi'</span>! Mst smile karo aur cake kato ab! 😌🎂💖"</div>
          </div>
        </motion.div>

        {/* 🌟 CENTER CANVAS: Spinning Vinyl Player + Pure Synced Lyrics */}
        <div style={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, zIndex: 2, margin: 'auto 0' }}>
          <motion.div animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ repeat: Infinity, duration: 14, ease: 'linear' }} style={{ width: 'clamp(110px, 22vw, 145px)', height: 'clamp(110px, 22vw, 145px)', borderRadius: '50%', background: 'radial-gradient(circle, #581c87 25%, #18092a 65%, #c084fc 100%)', boxShadow: '0 0 50px rgba(192, 132, 252, 0.7), inset 0 0 20px rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6 }}>
            <img src={TEDDY_CUDDLE} alt="Listening Teddies" style={{ width: '80%', height: '80%', objectFit: 'contain', borderRadius: '50%' }} />
          </motion.div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: 3.5, height: 14, alignItems: 'flex-end', justifyContent: 'center', marginBottom: 6 }}>
              {[10, 18, 13, 22, 15, 11, 20, 14, 18, 12].map((h, idx) => (
                <motion.span key={idx} animate={{ height: isPlaying ? [4, h, 6, h * 0.75, 4] : 3 }} transition={{ repeat: Infinity, duration: 1.1 + (idx * 0.1), ease: 'easeInOut' }} style={{ width: 3.5, borderRadius: 2, background: idx % 2 === 0 ? '#c084fc' : '#ffd54f', boxShadow: '0 0 8px rgba(192, 132, 252, 0.9)' }} />
              ))}
            </div>
            <div style={{ fontSize: 'clamp(1.05rem, 3vw, 1.25rem)', fontWeight: 900, color: '#f3e8ff', letterSpacing: '0.02em' }}>✨ Vilen • Ji Le Zindagi</div>
            <div style={{ fontSize: '0.82rem', color: '#ffd54f', fontWeight: 800 }}>{formatTime(currentTime)} / {formatTime(duration)}</div>
          </div>
          <div ref={lyricsContainerRef} style={{ width: '100%', maxHeight: 'clamp(140px, 24vh, 200px)', overflowY: 'auto', padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 12, scrollBehavior: 'smooth', scrollbarWidth: 'none', maskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)', zIndex: 2 }}>
            {LETTER_2_LYRICS.map((cue, idx) => {
              const isActive = activeLyricIdx === idx
              return (
                <motion.div key={idx} onClick={() => handleSeekLyric(cue.time)} className={isActive ? 'active-lyric' : ''} animate={{ scale: isActive ? 1.12 : 0.94, opacity: isActive ? 1 : 0.28, y: isActive ? 0 : 2 }} transition={{ duration: 0.35, ease: 'easeOut' }} style={{ fontSize: isActive ? 'clamp(1.4rem, 5vw, 1.85rem)' : 'clamp(1rem, 3.6vw, 1.25rem)', fontWeight: isActive ? 900 : 600, color: isActive ? '#ffd54f' : '#e9d5ff', textShadow: isActive ? '0 0 26px rgba(255, 213, 79, 0.95), 0 0 48px rgba(192, 132, 252, 0.8)' : 'none', letterSpacing: '0.03em', cursor: 'pointer', filter: isActive ? 'none' : 'blur(0.3px)' }}>"{cue.text}"</motion.div>
              )
            })}
          </div>
        </div>

        {/* 🎵 OUTSIDE CANVAS (BOTTOM-RIGHT): Sleek Music Controller Dock */}
        <div style={{ position: 'fixed', bottom: 'max(16px, env(safe-area-inset-bottom, 16px))', right: 'max(16px, env(safe-area-inset-right, 16px))', zIndex: 1000000, width: 'min(380px, 92vw)', background: 'rgba(255, 255, 255, 0.14)', backdropFilter: 'blur(22px)', borderRadius: 22, border: '1.5px solid rgba(255, 255, 255, 0.3)', padding: '8px 16px', boxShadow: '0 12px 35px rgba(0, 0, 0, 0.65)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
            <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.85)', minWidth: 28 }}>{formatTime(currentTime)}</span>
            <input type="range" min={0} max={duration || 1} step={0.1} value={currentTime} onChange={(e) => { if (audioRef.current) audioRef.current.currentTime = parseFloat(e.target.value) }} style={{ flex: 1, accentColor: '#c084fc', cursor: 'pointer', height: 4 }} />
            <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.85)', minWidth: 28 }}>{formatTime(duration)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <button onClick={handleReplay} style={{ background: 'rgba(255, 255, 255, 0.16)', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: 16, color: '#fff', padding: '5px 12px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}>🔄 Replay</button>
            <button onClick={togglePlayPause} style={{ background: 'linear-gradient(135deg, #c084fc, #7e22ce)', border: 'none', borderRadius: '50%', width: 38, height: 38, color: '#fff', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(192, 132, 252, 0.7)' }}>{isPlaying ? '⏸' : '▶'}</button>
            {canGoNext2 ? (
              <button onClick={handleFinishAll} style={{ background: 'linear-gradient(135deg, #a855f7, #7e22ce)', border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: 16, color: '#fff', padding: '6px 14px', fontSize: '0.82rem', fontWeight: 900, cursor: 'pointer' }}>Cake 🎂 ➔</button>
            ) : (
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>🎧 Enjoying Track...</span>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <SceneShell wide>
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div key="reassurance" initial={{ opacity: 0, scale: 0.92, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -15 }} transition={SPRING} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px 20px', maxWidth: 480, margin: '0 auto' }}>
            <motion.div animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }} style={{ marginBottom: 12 }}>
              <img src={TEDDY_BLUSH} alt="Teddy Reassurance" style={{ width: 140, height: 140, objectFit: 'contain', filter: 'drop-shadow(0 10px 24px rgba(247, 85, 138, 0.35))' }} />
            </motion.div>
            <h2 className="title-xl" style={{ fontSize: 'clamp(1.3rem, 4.5vw, 1.65rem)', color: 'var(--rose-deep)', margin: '6px 0 10px', lineHeight: 1.35 }}>{LETTER_REASSURANCE.title}</h2>
            <div style={{ background: 'rgba(255, 255, 255, 0.95)', borderRadius: 20, padding: '16px 20px', border: '1.5px solid rgba(255, 182, 193, 0.6)', boxShadow: '0 8px 24px rgba(247, 85, 138, 0.12)', margin: '8px 0 20px', textAlign: 'left' }}>
              <p style={{ fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--ink)', margin: '0 0 8px', fontWeight: 600 }}>{LETTER_REASSURANCE.body}</p>
              <p style={{ fontSize: '0.86rem', color: 'var(--rose-deep)', fontWeight: 800, margin: 0 }}>{LETTER_REASSURANCE.subtext}</p>
            </div>
            <button className="btn-primary" onClick={handleOpenLetter1} style={{ padding: '15px 36px', fontSize: '1.05rem' }}><span>{LETTER_REASSURANCE.btnText}</span></button>
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div key="stage1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div className="hand-note" style={{ marginBottom: 4 }}>{LETTER_UI.typewriter}</div>
            <div ref={scrollRef1} style={{ marginTop: 6, maxHeight: '52dvh', overflowY: 'auto', background: '#fffdf7', borderRadius: 22, padding: '22px 24px', width: 'min(480px, 92vw)', boxShadow: '0 16px 40px rgba(247, 85, 138, 0.16)', textAlign: 'left', border: '1.5px solid rgba(255, 214, 224, 0.9)', position: 'relative' }}>
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: '1.42rem', lineHeight: 1.45, whiteSpace: 'pre-wrap', color: '#4a2835', fontWeight: 600 }}>{output1.join('\n')}</div>
              {done1 && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20, gap: 10 }}>
                  <img src={TEDDY_BLUSH} alt="Blushing Teddy" style={{ width: 90, height: 90, objectFit: 'contain', borderRadius: 16 }} />
                  <button className="btn-primary" onClick={handleStartSong1} style={{ width: '100%', maxWidth: 300, padding: '14px 20px', fontSize: '1rem' }}><span>Padh liya? Ab Gaana Sunte Hain 🎧✨</span></button>
                </motion.div>
              )}
            </div>
            {/* 🐱 Cute Animated Scroll Assistant Cat */}
            <ScrollAssistantCat targetRef={scrollRef1} text={SCROLL_ASSISTANT_CONTENT.letterPrompt} />
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div key="transition" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={SPRING} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px 20px', maxWidth: 460, margin: '0 auto' }}>
            <motion.div animate={{ rotate: [-4, 4, -4], scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 2.4 }} style={{ fontSize: 48, marginBottom: 8 }}>🎁👀</motion.div>
            <h2 className="title-xl" style={{ fontSize: 'clamp(1.5rem, 5vw, 1.9rem)', color: 'var(--rose-deep)', margin: '6px 0 8px' }}>{LETTER_TRANSITION.line1}</h2>
            <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)', margin: '4px 0 6px' }}>{LETTER_TRANSITION.line2}</p>
            <p className="subtitle" style={{ fontSize: '0.98rem', marginBottom: 20 }}>{LETTER_TRANSITION.line3}</p>
            <button className="btn-primary" onClick={handleOpenLetter2} style={{ padding: '15px 36px', fontSize: '1.05rem' }}><span>{LETTER_TRANSITION.btnText}</span></button>
          </motion.div>
        )}

        {stage === 4 && (
          <motion.div key="stage4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div className="hand-note" style={{ marginBottom: 4 }}>💌 Dusra Letter • Thoda Sa Tang Karne Ke Liye 😏🎀</div>
            <div ref={scrollRef2} style={{ marginTop: 6, maxHeight: '52dvh', overflowY: 'auto', background: '#fffdf7', borderRadius: 22, padding: '22px 24px', width: 'min(480px, 92vw)', boxShadow: '0 16px 40px rgba(168, 85, 247, 0.18)', textAlign: 'left', border: '1.5px solid rgba(230, 219, 255, 0.9)', position: 'relative' }}>
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: '1.42rem', lineHeight: 1.45, whiteSpace: 'pre-wrap', color: '#4a384f', fontWeight: 600 }}>{output2.join('\n')}</div>
              {done2 && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20, gap: 10 }}>
                  <img src={TEDDY_BLUSH} alt="Blushing Teddy" style={{ width: 90, height: 90, objectFit: 'contain', borderRadius: 16 }} />
                  <button className="btn-primary" onClick={handleStartSong2} style={{ width: '100%', maxWidth: 300, padding: '14px 20px', fontSize: '1rem' }}><span>Ye Bhi Padh Liya? Ab Gaana Suno 🎶✨</span></button>
                </motion.div>
              )}
            </div>
            {/* 🐱 Cute Animated Scroll Assistant Cat */}
            <ScrollAssistantCat targetRef={scrollRef2} text={SCROLL_ASSISTANT_CONTENT.letterPrompt} />
          </motion.div>
        )}
      </AnimatePresence>
    </SceneShell>
  )
}
