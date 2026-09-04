import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateAge, getBirthdayMode } from '../../utils/birthdayWorld.js'
import { TEDDY_WEBM } from '../../utils/assets.js'
import { playPop, playSparkle } from '../../utils/audio.js'

export default function TeddyForeverAssistant({
  currentView = 'home',
  onOpenArchive,
  onOpenChapter,
  onOpenCountdown,
  onSurpriseMe
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [bubbleText, setBubbleText] = useState('')
  const [showBubble, setShowBubble] = useState(true)
  const now = new Date()
  const mode = getBirthdayMode(now)
  const age = calculateAge(now)

  // Contextual messages per mode
  const getContextualMessages = () => {
    if (mode === 'birthday') {
      return [
        'HEY MOMMY!!! 🎂😭 Aaj aap officially ' + age + ' ki ho gayi hain!',
        'Aaj ka pura din sirf aapka hai. Chaliye birthday celebrate karein! 🎉',
        'Chaliye... is saal ka chapter unlock karte hain 🧸'
      ]
    }
    if (mode === 'pre-birthday') {
      return [
        'Aap phir countdown dekhne aa gayi? 👀',
        'Birthday aa raha hai... Bas thoda aur wait, baccha. 😏',
        'Main sab sambhal ke rakhta hoon 🧸'
      ]
    }
    // post-birthday
    return [
      'Birthday khatam ho gaya ji 😤 Ab agle saal ka wait.',
      'Main yahin hoon 🧸 Waise purana birthday dekhna hai?',
      'Jab bhi mood kharab ho, yahan aakar baith jana 😌'
    ]
  }

  // Set initial and rotating bubble message
  useEffect(() => {
    const msgs = getContextualMessages()
    setBubbleText(msgs[0])
    setShowBubble(true)

    const bubbleTimer = setInterval(() => {
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)]
      setBubbleText(randomMsg)
      setShowBubble(true)
    }, 18000)

    return () => clearInterval(bubbleTimer)
  }, [mode, age])

  const handleTeddyClick = () => {
    playPop()
    setIsOpen(!isOpen)
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 20,
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      pointerEvents: 'none'
    }}>
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              pointerEvents: 'auto',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '2px solid #fda4af',
              borderRadius: 20,
              padding: '10px 16px',
              maxWidth: 240,
              marginBottom: 10,
              boxShadow: '0 8px 24px rgba(244, 63, 94, 0.2)',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: '#881337',
              lineHeight: 1.4,
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={() => setShowBubble(false)}
          >
            {bubbleText}
            <div style={{
              position: 'absolute',
              bottom: -8,
              right: 24,
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #fda4af'
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              pointerEvents: 'auto',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              border: '2.5px solid #fda4af',
              borderRadius: 24,
              padding: '16px',
              width: 250,
              marginBottom: 12,
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.18)',
              textAlign: 'center'
            }}
          >
            <div style={{
              fontSize: '0.82rem',
              fontWeight: 800,
              color: '#e11d48',
              marginBottom: 10
            }}>
              Teddy Companion Menu
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                onClick={() => {
                  playSparkle()
                  setIsOpen(false)
                  onOpenChapter && onOpenChapter(2026)
                }}
                style={{
                  border: 'none',
                  background: 'linear-gradient(135deg, #ff7597, #f43f5e)',
                  color: '#fff',
                  padding: '9px 14px',
                  borderRadius: 14,
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(244, 63, 94, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: 'center'
                }}
              >
                <span>🎂</span>
                <span>Chapter 01 (2026)</span>
              </button>

              <button
                onClick={() => {
                  playPop()
                  setIsOpen(false)
                  onOpenArchive && onOpenArchive()
                }}
                style={{
                  border: '1.5px solid #fecdd3',
                  background: '#fff',
                  color: '#be185d',
                  padding: '9px 14px',
                  borderRadius: 14,
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: 'center'
                }}
              >
                <span>📔</span>
                <span>Birthday Archive</span>
              </button>

              <button
                onClick={() => {
                  playPop()
                  setIsOpen(false)
                  onOpenCountdown && onOpenCountdown()
                }}
                style={{
                  border: '1.5px solid #e2e8f0',
                  background: '#f8fafc',
                  color: '#475569',
                  padding: '9px 14px',
                  borderRadius: 14,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: 'center'
                }}
              >
                <span>⏳</span>
                <span>Live Countdown</span>
              </button>

              <button
                onClick={() => {
                  playSparkle()
                  setIsOpen(false)
                  onSurpriseMe && onSurpriseMe()
                }}
                style={{
                  border: 'none',
                  background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
                  color: '#be185d',
                  padding: '9px 14px',
                  borderRadius: 14,
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: 'center'
                }}
              >
                <span>✨</span>
                <span>Surprise Memory</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Teddy Button */}
      <motion.button
        onClick={handleTeddyClick}
        whileHover={{ scale: 1.1, rotate: 4 }}
        whileTap={{ scale: 0.95 }}
        style={{
          pointerEvents: 'auto',
          border: '3px solid #fda4af',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          width: 68,
          height: 68,
          borderRadius: '50%',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(244, 63, 94, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
        title="Teddy Companion"
      >
        <video
          src={TEDDY_WEBM.love[0]}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: 56, height: 56, objectFit: 'contain' }}
        />
        <span style={{
          position: 'absolute',
          bottom: 2,
          right: 2,
          background: '#e11d48',
          color: '#fff',
          fontSize: '0.55rem',
          fontWeight: 900,
          padding: '1px 5px',
          borderRadius: 999
        }}>
          AI
        </span>
      </motion.button>
    </div>
  )
}
