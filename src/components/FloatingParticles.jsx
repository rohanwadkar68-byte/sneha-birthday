import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PARTICLE_EMOJIS = ['✦', '♡', '✧', '˚', '·', '❋', '✿', '💖', '✨']
const SOFT_COLORS = ['#ff8fb1', '#e6dbff', '#cde8ff', '#ffd9e8', '#ffc4d8', '#ffd166']
const TRAIL_EMOJIS = ['💖', '✨', '🌸', '💫', '💕', '⭐']

export default function FloatingParticles({ count = 22, style }) {
  const [trail, setTrail] = useState([])

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: PARTICLE_EMOJIS[i % PARTICLE_EMOJIS.length],
        color: SOFT_COLORS[i % SOFT_COLORS.length],
        x: `${(i * 59 + 13) % 96 + 2}%`,
        y: `${(i * 43 + 7) % 92 + 2}%`,
        size: 11 + ((i * 7) % 15),
        dur: 4.5 + (i % 5),
        delay: (i * 0.25) % 3,
        drift: 10 + ((i * 5) % 22)
      })),
    [count]
  )

  useEffect(() => {
    let lastTime = 0
    const handleMove = (e) => {
      const now = Date.now()
      if (now - lastTime < 70) return // Throttle
      lastTime = now

      const clientX = e.clientX ?? e.touches?.[0]?.clientX
      const clientY = e.clientY ?? e.touches?.[0]?.clientY
      if (clientX == null || clientY == null) return

      const newHeart = {
        id: Math.random(),
        x: clientX,
        y: clientY,
        emoji: TRAIL_EMOJIS[Math.floor(Math.random() * TRAIL_EMOJIS.length)],
        size: 14 + Math.random() * 14
      }

      setTrail((prev) => [...prev.slice(-15), newHeart])
      setTimeout(() => {
        setTrail((prev) => prev.filter((item) => item.id !== newHeart.id))
      }, 1100)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('touchmove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleMove)
    }
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        ...style
      }}
      aria-hidden
    >
      {/* Dreamy Ambient Bokeh Lights */}
      <div
        className="bokeh-orb"
        style={{
          width: 260,
          height: 260,
          background: 'rgba(255, 143, 177, 0.25)',
          top: '8%',
          left: '5%'
        }}
      />
      <div
        className="bokeh-orb"
        style={{
          width: 320,
          height: 320,
          background: 'rgba(183, 156, 255, 0.22)',
          top: '55%',
          right: '4%',
          animationDelay: '-4s'
        }}
      />
      <div
        className="bokeh-orb"
        style={{
          width: 220,
          height: 220,
          background: 'rgba(109, 181, 255, 0.2)',
          bottom: '5%',
          left: '20%',
          animationDelay: '-7s'
        }}
      />

      {/* Floating Sparkle Symbols */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            fontSize: p.size,
            color: p.color,
            willChange: 'transform'
          }}
          animate={{
            y: [0, -p.drift, 0],
            x: [0, p.drift * 0.4, 0],
            opacity: [0.2, 0.75, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            repeat: Infinity,
            duration: p.dur,
            delay: p.delay,
            ease: 'easeInOut'
          }}
        >
          {p.emoji}
        </motion.span>
      ))}

      {/* Interactive Cursor Hearts & Sparkle Trail */}
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 1, scale: 0.5, x: item.x, y: item.y }}
            animate={{ opacity: 0, scale: 1.4, y: item.y - 70, x: item.x + (Math.random() * 30 - 15) }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              fontSize: item.size,
              pointerEvents: 'none',
              zIndex: 999,
              filter: 'drop-shadow(0 2px 6px rgba(247, 106, 153, 0.4))'
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
