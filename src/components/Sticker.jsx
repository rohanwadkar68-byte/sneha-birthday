import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { playPop } from '../utils/audio.js'

export default function Sticker({
  src,
  size = 140,
  float = false,
  interactive = false,
  dieCut = false,
  onClick = null,
  style = {},
  className = ''
}) {
  const ref = useRef(null)
  const isWebM = src?.endsWith?.('.webm')

  useEffect(() => {
    if (isWebM && ref.current) {
      ref.current.muted = true
      ref.current.play?.().catch(() => {})
    }
  }, [isWebM, src])

  const handleClick = (e) => {
    if (interactive || onClick) playPop()
    if (onClick) onClick(e)
  }

  const baseClass = `${className} ${dieCut ? 'sticker-die-cut' : ''}`.trim()

  const baseStyle = {
    width: size,
    height: size,
    objectFit: 'contain',
    pointerEvents: interactive || onClick ? 'auto' : 'none',
    cursor: interactive || onClick ? 'pointer' : 'default',
    ...style
  }

  const anim = float ? { y: [0, -10, 0], rotate: [0, 2, -2, 0] } : {}
  const trans = float ? { repeat: Infinity, duration: 3.2, ease: 'easeInOut' } : {}

  if (isWebM) {
    return (
      <motion.video
        ref={ref}
        className={baseClass}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        style={baseStyle}
        animate={anim}
        transition={trans}
        whileHover={interactive || onClick ? { scale: 1.12, rotate: 3 } : {}}
        whileTap={interactive || onClick ? { scale: 0.88, rotate: -4 } : {}}
        onClick={handleClick}
      />
    )
  }

  return (
    <motion.img
      className={baseClass}
      src={src}
      alt=""
      style={baseStyle}
      animate={anim}
      transition={trans}
      whileHover={interactive || onClick ? { scale: 1.12, rotate: 3 } : {}}
      whileTap={interactive || onClick ? { scale: 0.88, rotate: -4 } : {}}
      onClick={handleClick}
    />
  )
}
