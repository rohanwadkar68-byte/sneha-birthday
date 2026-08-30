import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import { TEDDY_WEBM } from '../utils/assets.js'
import { WELCOME_CONTENT } from '../utils/content.js'
import { startMusic } from '../utils/audio.js'

export default function Welcome({ onNext }) {
  const [doorOpen, setDoorOpen] = useState(false)

  const handleOpenDoor = () => {
    if (doorOpen) return
    startMusic() // Immediately unlock and start continuous MP3 BGM on user gesture!
    setDoorOpen(true)
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff8fb1', '#ffd9e8', '#e6dbff', '#ffffff']
    })
    setTimeout(() => {
      onNext()
    }, 1100)
  }

  return (
    <SceneShell wide>
      {/* Top Floating Crown Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, ...SPRING }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'linear-gradient(135deg, #fff 0%, #fff0f7 100%)',
          padding: '6px 18px',
          borderRadius: 999,
          fontSize: '0.86rem',
          fontWeight: 800,
          color: 'var(--rose-deep)',
          boxShadow: '0 4px 16px rgba(247, 85, 138, 0.2)',
          marginBottom: 4,
          border: '2px solid rgba(255, 255, 255, 0.9)'
        }}
      >
        <span>👑</span> {WELCOME_CONTENT.crownBadge}
      </motion.div>

      {/* Hero Teddy (The Beloved Mwaaah Flying Kiss Animation) */}
      <div style={{ margin: '2px 0 6px' }}>
        <Teddy src={TEDDY_WEBM.happy[0]} size={180} glow delay={0.2} />
      </div>

      <h1 className="title-xl" style={{ margin: '0 0 2px' }}>
        {WELCOME_CONTENT.title}
      </h1>

      <p className="subtitle" style={{ maxWidth: 440, margin: '2px 0 14px', fontSize: '1.02rem' }}>
        {WELCOME_CONTENT.subtitle}
      </p>

      {/* 🚪 Interactive Magic Wonderland Door */}
      <motion.div
        onClick={handleOpenDoor}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        style={{
          position: 'relative',
          width: 220,
          height: 150,
          borderRadius: '24px 24px 16px 16px',
          background: 'linear-gradient(135deg, #fff0f6 0%, #ffe0ef 100%)',
          border: '2.5px solid #ff85a8',
          boxShadow: '0 12px 30px rgba(247, 85, 138, 0.25), inset 0 2px 8px #ffffff',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 14,
          margin: '0 auto 12px',
          overflow: 'hidden'
        }}
      >
        {/* Shimmering Golden Door Handle */}
        <div
          style={{
            position: 'absolute',
            right: 28,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #fef08a, #ffd700, #b45309)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.25)'
          }}
        />

        <div style={{ fontSize: '2.2rem', marginBottom: 4 }}>
          {doorOpen ? '✨🚪✨' : '🚪✨'}
        </div>
        <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--rose-deep)', textAlign: 'center' }}>
          {doorOpen ? WELCOME_CONTENT.doorOpen : WELCOME_CONTENT.doorClosed}
        </div>
        <div style={{ fontSize: '0.74rem', color: 'var(--ink-soft)', fontWeight: 600, marginTop: 2 }}>
          {doorOpen ? WELCOME_CONTENT.doorOpenSub : WELCOME_CONTENT.doorClosedSub}
        </div>
      </motion.div>

      {/* Chunky 3D Squishy CTA Button */}
      <motion.button
        className="btn-primary"
        onClick={handleOpenDoor}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ scale: { repeat: Infinity, duration: 2.4 } }}
        style={{ marginTop: 4 }}
      >
        <span>{WELCOME_CONTENT.ctaBtn}</span>
      </motion.button>
    </SceneShell>
  )
}
