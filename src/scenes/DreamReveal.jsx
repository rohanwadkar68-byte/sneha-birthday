import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import Sticker from '../components/Sticker.jsx'
import { TEDDY_WEBM, POOKIE, triggerRosePetals } from '../utils/assets.js'
import { playSparkle, playFanfare } from '../utils/audio.js'

const FLOATERS = ['💖', '⭐', '☁️', '🌸', '🫧', '🌟', '💗', '✨', '🎈', '🍬']

export default function DreamReveal({ onNext }) {
  const floaters = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        emoji: FLOATERS[i % FLOATERS.length],
        left: `${(i * 61) % 92 + 3}%`,
        top: `${(i * 37) % 82 + 3}%`,
        size: 20 + ((i * 11) % 24),
        dur: 3.5 + (i % 4),
        delay: i * 0.1
      })),
    []
  )

  useEffect(() => {
    const t = setTimeout(() => {
      playSparkle()
      playFanfare()
    }, 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <SceneShell
      bg={
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(160deg, #ffe0ef 0%, #efe2ff 35%, #dcecff 70%, #fff8f0 100%)'
            }}
          />
          {floaters.map((f, i) => (
            <motion.div
              key={i}
              className="floaty"
              style={{ left: f.left, top: f.top, fontSize: f.size }}
              animate={{ y: [0, -22, 0], rotate: [0, i % 2 ? 12 : -12, 0] }}
              transition={{
                repeat: Infinity,
                duration: f.dur,
                delay: f.delay,
                ease: 'easeInOut'
              }}
            >
              {f.emoji}
            </motion.div>
          ))}
        </motion.div>
      }
      particles={false}
    >
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...SPRING, delay: 0.2 }}
        style={{
          display: 'inline-block',
          background: 'rgba(255, 255, 255, 0.85)',
          padding: '4px 16px',
          borderRadius: 999,
          fontSize: '0.85rem',
          fontWeight: 700,
          color: 'var(--rose-deep)',
          boxShadow: 'var(--shadow-soft)',
          marginBottom: 8
        }}
      >
        ✨ Welcome to your wonderland ✨
      </motion.div>

      <motion.h1
        className="title-xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...SPRING, delay: 0.4 }}
      >
        Welcome to AAPKA Din 🎉💖
      </motion.h1>

      <Teddy src={TEDDY_WEBM.excited[0]} size={210} delay={0.6} glow />

      <motion.p
        className="subtitle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{ maxWidth: 460, marginTop: 8 }}
      >
        Yahan har ek cheez sirf isliye exist karti hai kyunki aap meri duniya me hain.
      </motion.p>

      {/* Animated Pookie Parade Row */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, ...SPRING }}
        style={{
          display: 'flex',
          gap: 12,
          marginTop: 6,
          background: 'rgba(255, 255, 255, 0.55)',
          padding: '8px 18px',
          borderRadius: 999,
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 16px rgba(247, 106, 153, 0.15)'
        }}
      >
        {[0, 1, 2, 3, 4].map((idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.25, rotate: [0, -10, 10, 0] }}
            style={{ cursor: 'pointer' }}
          >
            <Sticker src={POOKIE.webp[idx]} size={56} float />
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        className="btn-primary"
        onClick={onNext}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
      >
        <span>Explore karein</span> 🗺️✨
      </motion.button>
    </SceneShell>
  )
}
