import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import { TEDDY_WEBM } from '../utils/assets.js'
import { playPop, playSparkle } from '../utils/audio.js'

export default function FakeGiftScene({ onNext }) {
  const [phase, setPhase] = useState('closed')

  useEffect(() => {
    if (phase === 'opened') {
      const t1 = setTimeout(() => setPhase('wait'), 1400)
      return () => clearTimeout(t1)
    }
  }, [phase])

  const handleOpen = () => {
    if (phase === 'closed') {
      playPop()
      playSparkle()
      setPhase('opened')
    }
  }

  const handleNext = () => {
    playSparkle()
    onNext()
  }

  return (
    <SceneShell>
      {/* Teddy Delivery Courier Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginBottom: 6 }}
      >
        <Teddy
          src={
            phase === 'closed'
              ? TEDDY_WEBM.happy[0]
              : phase === 'opened'
                ? TEDDY_WEBM.curious[0]
                : TEDDY_WEBM.party[0]
          }
          size={140}
          glow={phase === 'wait'}
        />
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '4px 16px',
            borderRadius: 999,
            fontSize: '0.84rem',
            fontWeight: 800,
            color: 'var(--rose-deep)',
            boxShadow: '0 2px 10px rgba(247, 85, 138, 0.18)',
            border: '1.5px solid rgba(255, 255, 255, 0.9)'
          }}
        >
          {phase === 'closed' && '📦 Knock Knock! Mommy ke liye secret parcel aaya hai 🐻💖'}
          {phase === 'opened' && '😦 Arey… parcel ke andar kya hai?!'}
          {phase === 'wait' && '✨ Surprise Ready! Tap to enter wonderland! 👑'}
        </div>
      </motion.div>

      <motion.div
        style={{
          position: 'relative',
          width: 220,
          height: 180,
          cursor: phase === 'closed' ? 'pointer' : 'default',
          marginTop: 6
        }}
        onClick={handleOpen}
        animate={
          phase === 'closed'
            ? { rotate: [-3, 3, -3] }
            : phase === 'wait'
              ? { x: [0, -8, 8, -6, 6, 0], rotate: 0 }
              : { rotate: 0 }
        }
        transition={
          phase === 'closed'
            ? { repeat: Infinity, duration: 1.6 }
            : { duration: 0.5 }
        }
      >
        {/* Ribbon cross */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 18,
          height: '100%',
          background: '#fff',
          opacity: 0.9,
          borderRadius: 8,
          zIndex: 2,
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }} />
        <div style={{
          position: 'absolute',
          top: '45%',
          left: 0,
          width: '100%',
          height: 18,
          background: '#fff',
          opacity: 0.9,
          borderRadius: 8,
          zIndex: 2,
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }} />

        <AnimatePresence>
          {phase === 'closed' && (
            <motion.div
              key="lid"
              style={{
                position: 'absolute',
                top: 0,
                left: -14,
                width: 248,
                height: 56,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #f7558a, #ff9fbe)',
                boxShadow: 'var(--shadow-soft)',
                border: '2px solid rgba(255,255,255,0.7)',
                zIndex: 3
              }}
              exit={{ y: -150, rotate: -24, opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
            />
          )}
        </AnimatePresence>

        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 220,
            height: 136,
            borderRadius: '18px 18px 28px 28px',
            background:
              phase === 'opened'
                ? 'linear-gradient(135deg, #e8d7ff, #d4c2ff)'
                : 'linear-gradient(135deg, #ff85a8, #ffb3cd)',
            boxShadow: 'var(--shadow-card)',
            border: '2px solid rgba(255,255,255,0.7)'
          }}
        />

        {/* Sparkle particles on open */}
        <AnimatePresence>
          {phase === 'opened' && (
            <>
              {['✨', '⭐', '🌟', '💫', '✧'].map((e, i) => (
                <motion.span
                  key={i}
                  style={{
                    position: 'absolute',
                    left: 45 + i * 32,
                    top: 35 + (i % 2) * 20,
                    fontSize: 18 + i * 3,
                    zIndex: 5
                  }}
                  initial={{ opacity: 0, y: 20, scale: 0.5 }}
                  animate={{ opacity: 1, y: -35 - i * 10, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  {e}
                </motion.span>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="wait">
        {phase === 'closed' && (
          <motion.p key="t0" className="subtitle" exit={{ opacity: 0 }} style={{ marginTop: 14 }}>
            (Gift box ko tap karke kholo 🎁)
          </motion.p>
        )}
        {phase === 'opened' && (
          <motion.div
            key="t1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginTop: 10 }}
          >
            <div className="hand-note" style={{ fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>…Khaali hai?! 😦</span>
              <img
                src="assets/memes/confused_huh_cat.gif"
                alt="Huh Cat"
                style={{ width: 44, height: 44, borderRadius: 8 }}
              />
            </div>
            <Teddy src={TEDDY_WEBM.curious[0]} size={140} float={false} />
          </motion.div>
        )}
        {phase === 'wait' && (
          <motion.div
            key="t2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING}
            style={{ marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <h2 className="title-xl" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', margin: '4px 0' }}>
              RUK JAAO!! ✋🔥
            </h2>
            <p className="subtitle" style={{ fontSize: '1rem', margin: '2px 0 12px' }}>
              Asli gift ko thodi dramatic entry chahiye thi…
            </p>
            <button className="btn-primary" onClick={handleNext}>
              <span>Asli Wonderland Kholein 👉✨</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </SceneShell>
  )
}
