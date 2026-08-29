import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TEDDY } from '../utils/assets.js'
import { blip } from '../utils/audio.js'

export const SPRING = { type: 'spring', stiffness: 260, damping: 20 }

export default function Teddy({
  emotion = 'idle',
  src = null,
  size = 180,
  float = true,
  delay = 0,
  glow = false,
  interactive = true,
  onClick = null
}) {
  const videoRef = useRef(null)
  const resolvedSrc = src || TEDDY[emotion] || TEDDY.idle
  const isWebM = resolvedSrc?.endsWith?.('.webm')

  useEffect(() => {
    if (isWebM && videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play?.().catch(() => {})
    }
  }, [isWebM, resolvedSrc])

  const handleClick = (e) => {
    if (interactive) {
      blip(740)
    }
    if (onClick) onClick(e)
  }

  const baseStyle = {
    width: size,
    height: size,
    objectFit: 'contain',
    cursor: interactive ? 'pointer' : 'default'
  }

  const anim = float
    ? { scale: 1, rotate: 0, y: [0, -12, 0] }
    : { scale: 1, rotate: 0 }

  const trans = {
    scale: { ...SPRING, delay },
    rotate: { ...SPRING, delay },
    y: float
      ? { repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay }
      : {}
  }

  if (isWebM) {
    return (
      <motion.video
        ref={videoRef}
        className={glow ? 'teddy-img teddy-glow' : 'teddy-img'}
        src={resolvedSrc}
        autoPlay
        loop
        muted
        playsInline
        style={baseStyle}
        initial={{ scale: 0, rotate: -12 }}
        animate={anim}
        transition={trans}
        whileHover={interactive ? { scale: 1.08, rotate: [0, -5, 5, 0] } : {}}
        whileTap={interactive ? { scale: 0.92 } : {}}
        onClick={handleClick}
      />
    )
  }

  return (
    <motion.img
      className={glow ? 'teddy-img teddy-glow' : 'teddy-img'}
      src={resolvedSrc}
      alt="teddy"
      style={baseStyle}
      initial={{ scale: 0, rotate: -12 }}
      animate={anim}
      transition={trans}
      whileHover={interactive ? { scale: 1.08, rotate: [0, -5, 5, 0] } : {}}
      whileTap={interactive ? { scale: 0.92 } : {}}
      onClick={handleClick}
    />
  )
}
