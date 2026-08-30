import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import Sticker from '../components/Sticker.jsx'
import { FINALE_LETTERS, GIRL, FINALE_UI } from '../utils/content.js'
import { TEDDY_WEBM, POOKIE, DECOS } from '../utils/assets.js'
import { playFanfare, playSparkle } from '../utils/audio.js'

const CONFETTI_COLORS = ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#ffe4e6', '#fff1f2', '#e11d48']

export default function FinaleScene({ onNext, bonus = false }) {
  useEffect(() => {
    playFanfare()
    const burst = (origin, count = 45) => {
      playSparkle()
      confetti({
        particleCount: count,
        spread: 80,
        origin,
        colors: CONFETTI_COLORS,
        scalar: 1.35,
        gravity: 0.5,
        drift: 0.25,
        ticks: 320
      })
    }

    burst({ x: 0.2, y: 0.55 })
    const t1 = setTimeout(() => burst({ x: 0.8, y: 0.55 }), 400)
    const t2 = setTimeout(() => burst({ x: 0.5, y: 0.35 }, 150), 800)
    const t3 = setTimeout(() => burst({ x: 0.5, y: 0.65 }, 170), 1600)

    if (bonus) {
      const t4 = setTimeout(() => burst({ x: 0.3, y: 0.5 }, 130), 2200)
      const t5 = setTimeout(() => burst({ x: 0.7, y: 0.5 }, 130), 2700)
      const t6 = setTimeout(() => burst({ x: 0.5, y: 0.3 }, 200), 3200)
      return () => [t1, t2, t3, t4, t5, t6].forEach(clearTimeout)
    }
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [bonus])

  return (
    <SceneShell wide>
      {/* Floating background decos */}
      {DECOS.slice(0, 8).map((d, i) => (
        <motion.img
          key={i}
          src={d}
          alt=""
          className="deco-img"
          style={{
            position: 'absolute',
            left: `${8 + (i * 14) % 84}%`,
            top: `${6 + (i * 24) % 80}%`,
            width: 32 + (i % 3) * 6,
            opacity: 0.4,
            zIndex: 0
          }}
          animate={{
            y: [0, -12 - i * 3, 0],
            rotate: [0, i % 2 ? 14 : -14, 0]
          }}
          transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: 'easeInOut' }}
        />
      ))}

      {/* Birthday Girl Crown Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING}
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '4px 18px',
          borderRadius: 999,
          fontSize: '0.9rem',
          fontWeight: 800,
          color: 'var(--rose-deep)',
          boxShadow: 'var(--shadow-soft)',
          marginBottom: 6
        }}
      >
        {FINALE_UI.heading}
      </motion.div>

      {/* 3D Animated Letters */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {FINALE_LETTERS.map((word, wi) => (
          <div key={wi} style={{ display: 'flex' }}>
            {[...word].map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: -140, opacity: 0, rotate: -25, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                transition={{ ...SPRING, delay: wi * 0.4 + i * 0.07 }}
                whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                style={{
                  fontSize: 'clamp(2.4rem, 10vw, 4.2rem)',
                  fontWeight: 900,
                  color: ['#f76a99', '#a78bfa', '#38bdf8', '#fb7185'][i % 4],
                  textShadow: '0 6px 18px rgba(247, 106, 153, 0.25)',
                  display: 'inline-block',
                  margin: '0 2px'
                }}
              >
                {ch}
              </motion.span>
            ))}
          </div>
        ))}
      </div>

      <motion.div
        className="hand-note"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, ...SPRING }}
        style={{ marginTop: 6, fontSize: '1.5rem' }}
      >
        {bonus ? '…AUR EK AUR CHOTA SA SURPRISE!! 🥳' : `World ki best insaan ke liye — Happy Birthday ${GIRL}! 🥳💖`}
      </motion.div>

      {/* Dancing WebM Teddy Hero */}
      <div style={{ margin: '8px 0' }}>
        <Teddy src={TEDDY_WEBM.dance[0]} size={210} delay={1.3} glow />
      </div>

      {/* Dancing Pookie Parade below */}
      <motion.div
        style={{
          display: 'flex',
          gap: 14,
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
      >
        {[20, 21, 22].map((idx, i) => (
          <motion.div
            key={idx}
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.2 }}
          >
            <Sticker src={POOKIE.webp[idx]} size={60} float />
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        className="btn-primary"
        onClick={onNext}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0 }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        style={{ marginTop: 14 }}
      >
        <span>{bonus ? 'Theek hai AB aage badho' : 'Aage dekhiye… aur bhi hai'}</span> 👉✨
      </motion.button>
    </SceneShell>
  )
}
