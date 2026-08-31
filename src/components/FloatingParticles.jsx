import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SOFT_SPARKLES = ['✨', '🤍', '🌸']

export default function FloatingParticles({ count = 5, style }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: SOFT_SPARKLES[i % SOFT_SPARKLES.length],
        x: `${(i * 67 + 17) % 88 + 6}%`,
        y: `${(i * 53 + 11) % 84 + 8}%`,
        size: 12 + ((i * 3) % 6),
        dur: 7 + (i % 4),
        delay: (i * 0.5) % 3,
        drift: 10 + ((i * 4) % 12)
      })),
    [count]
  )

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

      {/* Gentle Floating Ambient Sparkles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            fontSize: p.size,
            filter: 'drop-shadow(0 2px 8px rgba(251, 113, 133, 0.25))',
            willChange: 'transform'
          }}
          animate={{
            y: [0, p.drift, p.drift * 2],
            opacity: [0, 0.6, 0],
            scale: [0.8, 1, 0.8]
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
    </div>
  )
}
