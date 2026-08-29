import { useState, useEffect, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import confetti from 'canvas-confetti'
import { playPop, playSparkle } from '../utils/audio.js'

export default function InteractiveTeddy({
  size = 180,
  mood = 'happy', // 'happy' | 'blush' | 'kiss' | 'cake' | 'excited'
  interactive = true,
  glow = true
}) {
  const [petCount, setPetCount] = useState(0)
  const [isTickled, setIsTickled] = useState(false)
  const [isKissing, setIsKissing] = useState(false)
  const [isSquished, setIsSquished] = useState(false)
  const [hearts, setHearts] = useState([])
  const containerRef = useRef(null)

  // Cursor tracking motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const eyeX = useSpring(mouseX, { stiffness: 300, damping: 20 })
  const eyeY = useSpring(mouseY, { stiffness: 300, damping: 20 })
  const headRotate = useSpring(mouseX, { stiffness: 200, damping: 25 })

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = (e.clientX - centerX) / (window.innerWidth / 2)
      const dy = (e.clientY - centerY) / (window.innerHeight / 2)
      mouseX.set(Math.max(-8, Math.min(8, dx * 8)))
      mouseY.set(Math.max(-6, Math.min(6, dy * 6)))
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [mouseX, mouseY])

  // Tap Cheek: Squish & Blush
  const handleCheekSquish = (e) => {
    e.stopPropagation()
    playPop()
    setIsSquished(true)
    setTimeout(() => setIsSquished(false), 500)
    spawnHeart(e.clientX, e.clientY)
  }

  // Tap Head: Petting & Loving
  const handleHeadPet = (e) => {
    e.stopPropagation()
    playSparkle()
    setPetCount((p) => p + 1)
    setIsKissing(true)
    setTimeout(() => setIsKissing(false), 900)
    spawnHeart(e.clientX, e.clientY)
  }

  // Tap Tummy: Tickle Bounce
  const handleTummyTickle = (e) => {
    e.stopPropagation()
    playPop()
    setIsTickled(true)
    setTimeout(() => setIsTickled(false), 600)
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#ff8fb1', '#ffd166', '#ffffff']
    })
  }

  const spawnHeart = (x, y) => {
    const id = Date.now() + Math.random()
    setHearts((prev) => [...prev, { id, x, y }])
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id))
    }, 1000)
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        touchAction: 'none'
      }}
    >
      {/* Glow Aura */}
      {glow && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 10,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 133, 168, 0.45) 0%, transparent 70%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.6, 0.9, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        />
      )}

      {/* Floating Hearts from Petting */}
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          initial={{ opacity: 1, y: 0, scale: 0.6 }}
          animate={{ opacity: 0, y: -60, scale: 1.4 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: h.x || '50%',
            top: h.y || '50%',
            fontSize: 24,
            pointerEvents: 'none',
            zIndex: 9999
          }}
        >
          💖
        </motion.span>
      ))}

      {/* SVG Interactive Cute Vector Teddy */}
      <motion.svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        style={{ position: 'relative', zIndex: 1, cursor: interactive ? 'pointer' : 'default' }}
        animate={
          isTickled
            ? { y: [0, -18, 0, -12, 0], rotate: [0, -8, 8, -4, 0] }
            : isSquished
              ? { scaleX: 1.12, scaleY: 0.92 }
              : { y: [0, -4, 0] }
        }
        transition={
          isTickled
            ? { duration: 0.6 }
            : isSquished
              ? { type: 'spring', stiffness: 400, damping: 15 }
              : { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
        }
      >
        <defs>
          <radialGradient id="teddyBodyGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fff8f2" />
            <stop offset="70%" stopColor="#fae5d3" />
            <stop offset="100%" stopColor="#f0cfb5" />
          </radialGradient>
          <radialGradient id="earInnerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffc0d3" />
            <stop offset="100%" stopColor="#ff85a8" />
          </radialGradient>
          <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 105, 145, 0.65)" />
            <stop offset="100%" stopColor="rgba(255, 105, 145, 0)" />
          </radialGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="rgba(247, 85, 138, 0.25)" />
          </filter>
        </defs>

        {/* 🐻 Left Ear */}
        <motion.g animate={{ rotate: isTickled ? [-15, 15, -10, 0] : [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}>
          <circle cx="56" cy="56" r="24" fill="url(#teddyBodyGrad)" stroke="#e4bfa0" strokeWidth="2.5" />
          <circle cx="56" cy="56" r="14" fill="url(#earInnerGrad)" />
        </motion.g>

        {/* 🐻 Right Ear */}
        <motion.g animate={{ rotate: isTickled ? [15, -15, 10, 0] : [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}>
          <circle cx="144" cy="56" r="24" fill="url(#teddyBodyGrad)" stroke="#e4bfa0" strokeWidth="2.5" />
          <circle cx="144" cy="56" r="14" fill="url(#earInnerGrad)" />
        </motion.g>

        {/* 🐻 Body & Tummy */}
        <motion.g onClick={handleTummyTickle}>
          <ellipse cx="100" cy="142" rx="46" ry="40" fill="url(#teddyBodyGrad)" stroke="#e4bfa0" strokeWidth="2.5" filter="url(#softShadow)" />
          {/* Tummy Patch */}
          <ellipse cx="100" cy="144" rx="28" ry="24" fill="#ffffff" opacity="0.85" />
        </motion.g>

        {/* 🐻 Left & Right Paws */}
        <motion.ellipse
          cx="52"
          cy="138"
          rx="14"
          ry="18"
          fill="url(#teddyBodyGrad)"
          stroke="#e4bfa0"
          strokeWidth="2"
          animate={isKissing ? { y: -16, x: 12, rotate: -25 } : { rotate: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.ellipse
          cx="148"
          cy="138"
          rx="14"
          ry="18"
          fill="url(#teddyBodyGrad)"
          stroke="#e4bfa0"
          strokeWidth="2"
          animate={isKissing ? { y: -16, x: -12, rotate: 25 } : { rotate: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        {/* 🐻 Cute Head */}
        <motion.g onClick={handleHeadPet} style={{ transformOrigin: '100px 96px', rotate: headRotate }}>
          <ellipse cx="100" cy="96" rx="52" ry="46" fill="url(#teddyBodyGrad)" stroke="#e4bfa0" strokeWidth="2.5" filter="url(#softShadow)" />

          {/* 🌸 Cheeks (Clickable Squish Targets) */}
          <circle cx="68" cy="108" r="14" fill="url(#blushGrad)" onClick={handleCheekSquish} style={{ cursor: 'pointer' }} />
          <circle cx="132" cy="108" r="14" fill="url(#blushGrad)" onClick={handleCheekSquish} style={{ cursor: 'pointer' }} />

          {/* Snout Muzzle */}
          <ellipse cx="100" cy="104" rx="22" ry="16" fill="#ffffff" opacity="0.95" />

          {/* Little Button Nose */}
          <ellipse cx="100" cy="98" rx="6" ry="4.5" fill="#4a384f" />

          {/* Cute Mouth */}
          {isKissing ? (
            /* 💋 Mwaaah Kiss Mouth */
            <ellipse cx="100" cy="110" rx="4" ry="5" fill="#e11d48" />
          ) : isTickled ? (
            /* 😃 Big Laugh Smile */
            <path d="M 92 105 Q 100 118 108 105 Z" fill="#e11d48" stroke="#4a384f" strokeWidth="1.5" />
          ) : (
            /* 🐱 Cute W-Smile */
            <path d="M 94 104 Q 97 109 100 105 Q 103 109 106 104" fill="none" stroke="#4a384f" strokeWidth="2" strokeLinecap="round" />
          )}

          {/* 👀 Dynamic Tracking Eyes */}
          {isKissing || isSquished ? (
            /* Happy Closed Eyes ^^ */
            <g stroke="#4a384f" strokeWidth="2.5" strokeLinecap="round" fill="none">
              <path d="M 74 92 Q 80 84 86 92" />
              <path d="M 114 92 Q 120 84 126 92" />
            </g>
          ) : (
            /* Live Cursor Following Eyes with Catchlights */
            <g>
              {/* Left Eye */}
              <motion.g style={{ x: eyeX, y: eyeY }}>
                <circle cx="80" cy="88" r="6.5" fill="#2d1d29" />
                <circle cx="78" cy="86" r="2.2" fill="#ffffff" />
                <circle cx="82" cy="90" r="1.1" fill="#ffffff" />
              </motion.g>
              {/* Right Eye */}
              <motion.g style={{ x: eyeX, y: eyeY }}>
                <circle cx="120" cy="88" r="6.5" fill="#2d1d29" />
                <circle cx="118" cy="86" r="2.2" fill="#ffffff" />
                <circle cx="122" cy="90" r="1.1" fill="#ffffff" />
              </motion.g>
            </g>
          )}
        </motion.g>
      </motion.svg>
    </div>
  )
}
