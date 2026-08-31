import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SCROLL_ASSISTANT_CONTENT } from '../utils/content.js'

export default function ScrollAssistantCat({
  targetRef = null,
  text = null,
  containerSelector = null
}) {
  const [showScrollHint, setShowScrollHint] = useState(true)

  useEffect(() => {
    const checkScroll = () => {
      let el = targetRef?.current
      if (!el && containerSelector) {
        el = document.querySelector(containerSelector)
      }
      if (!el) {
        el = document.querySelector('.korean-glass-island')
      }

      if (!el) return

      const isScrollable = el.scrollHeight > el.clientHeight + 25
      const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 45

      if (!isScrollable || isAtBottom || el.scrollTop > 35) {
        setShowScrollHint(false)
      } else {
        setShowScrollHint(true)
      }
    }

    let el = targetRef?.current
    if (!el && containerSelector) {
      el = document.querySelector(containerSelector)
    }
    if (!el) {
      el = document.querySelector('.korean-glass-island')
    }

    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true })
      checkScroll()
      window.addEventListener('resize', checkScroll)
      return () => {
        el.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    } else {
      window.addEventListener('scroll', checkScroll, { passive: true })
      return () => window.removeEventListener('scroll', checkScroll)
    }
  }, [targetRef, containerSelector])

  const handleTapScroll = () => {
    let el = targetRef?.current
    if (!el && containerSelector) {
      el = document.querySelector(containerSelector)
    }
    if (!el) {
      el = document.querySelector('.korean-glass-island')
    }
    if (el) {
      el.scrollBy({ top: 220, behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {showScrollHint && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          onClick={handleTapScroll}
          style={{
            position: 'sticky',
            bottom: 6,
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(255, 240, 248, 0.94))',
            border: '2px solid rgba(255, 117, 151, 0.45)',
            boxShadow: '0 8px 24px rgba(225, 29, 72, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
            borderRadius: 999,
            padding: '6px 14px 6px 10px',
            cursor: 'pointer',
            marginTop: 8,
            marginBottom: 2,
            userSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
            maxWidth: '92%'
          }}
        >
          {/* 🐱 Animated Bouncing 3D / Meme Cat */}
          <motion.div
            animate={{
              y: [0, -6, 0],
              rotate: [0, 4, -4, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: 'easeInOut'
            }}
            style={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.45rem',
              flexShrink: 0
            }}
          >
            <img
              src="assets/memes/popcat.gif"
              alt="Cute Cat Assistant"
              style={{
                width: 30,
                height: 30,
                objectFit: 'contain',
                borderRadius: '50%'
              }}
              onError={(e) => {
                e.target.style.display = 'none'
                if (e.target.parentNode) e.target.parentNode.innerText = '🐱'
              }}
            />
          </motion.div>

          {/* 🐾 Cute Guidance Text & Bouncing Arrow */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span
              style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                color: 'var(--rose-deep)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2
              }}
            >
              {text || SCROLL_ASSISTANT_CONTENT?.prompt || 'Mommy, neeche scroll kijiye 🐾👇'}
            </span>
          </div>

          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
            style={{ fontSize: '1rem', marginLeft: 2 }}
          >
            👇
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
