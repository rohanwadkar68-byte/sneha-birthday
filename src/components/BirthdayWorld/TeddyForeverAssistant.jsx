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
  onSurpriseMe,
  onOpenSpotify
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [bubbleText, setBubbleText] = useState('')
  const [showBubble, setShowBubble] = useState(true)
  const now = new Date()
  const mode = getBirthdayMode(now)
  const age = calculateAge(now)

  const getContextualMessages = () => {
    if (mode === 'birthday') {
      return [
        'Happy Birthday! Aaj aap officially Level ' + age + ' ki ho gayi hain!',
        'Spotify par party songs suno aur celebrate karo!',
        'Chaliye is saal ka chapter unlock karte hain.'
      ]
    }
    if (mode === 'pre-birthday') {
      return [
        'Tab tak songs sun lo! Spotify player ready hai.',
        'Birthday countdown chal raha hai... Tab tak gaane sunte hain.',
        'Aap phir countdown dekhne aa gayi? Gaana lagau?',
        'Spotify par jo marzi gaana search karke sun sakti ho.'
      ]
    }
    return [
      'Birthday khatam ho gaya toh kya hua? Songs suno aur relax karo.',
      'Spotify lounge hamesha khula hai aapke liye.',
      'Purana birthday chapter replay karna hai?'
    ]
  }

  useEffect(() => {
    const msgs = getContextualMessages()
    setBubbleText(msgs[0])
    setShowBubble(true)

    const bubbleTimer = setInterval(() => {
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)]
      setBubbleText(randomMsg)
      setShowBubble(true)
    }, 15000)

    return () => clearInterval(bubbleTimer)
  }, [mode, age])

  const handleTeddyClick = () => {
    playPop()
    setIsOpen(!isOpen)
  }

  const handleBubbleClick = () => {
    if (bubbleText.includes('song') || bubbleText.includes('Spotify') || bubbleText.includes('gaane')) {
      playSparkle()
      onOpenSpotify && onOpenSpotify()
    } else {
      setShowBubble(false)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 20,
      zIndex: 99995,
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
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(16px)',
              border: '2px solid #fda4af',
              borderRadius: 20,
              padding: '10px 16px',
              maxWidth: 240,
              marginBottom: 10,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: '#1e293b',
              lineHeight: 1.4,
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={handleBubbleClick}
          >
            {bubbleText}
            <div style={{
              fontSize: '0.7rem',
              color: '#059669',
              marginTop: 4,
              fontWeight: 700
            }}>
              Tap to open Spotify / Close
            </div>
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
              background: '#ffffff',
              border: '2px solid #fda4af',
              borderRadius: 24,
              padding: '16px',
              width: 250,
              marginBottom: 12,
              boxShadow: '0 18px 45px rgba(0, 0, 0, 0.18)',
              textAlign: 'center'
            }}
          >
            <div style={{
              fontSize: '0.84rem',
              fontWeight: 800,
              color: '#be185d',
              marginBottom: 10
            }}>
              Quick Menu
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Spotify Web Button */}
              <button
                onClick={() => {
                  playSparkle()
                  setIsOpen(false)
                  onOpenSpotify && onOpenSpotify()
                }}
                style={{
                  border: 'none',
                  background: '#000000',
                  color: '#ffffff',
                  padding: '10px 14px',
                  borderRadius: 14,
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: 'center'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1ed760">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.309c-.217.357-.681.472-1.038.254-2.846-1.74-6.429-2.133-10.648-1.17-.409.094-.816-.164-.91-.572-.094-.408.163-.815.572-.91 4.624-1.057 8.577-.611 11.77 1.341.356.218.471.682.254 1.057zm1.469-3.267c-.274.444-.858.586-1.302.312-3.257-2.002-8.223-2.583-12.076-1.413-.501.152-1.033-.135-1.185-.636-.152-.501.135-1.033.636-1.185 4.408-1.338 9.882-.693 13.615 1.621.444.275.586.859.312 1.301zm.127-3.411c-3.906-2.319-10.347-2.533-14.073-1.401-.6.182-1.237-.162-1.419-.762-.182-.6.162-1.237.762-1.419 4.279-1.299 11.393-1.043 15.892 1.628.539.32.715 1.02.396 1.558-.32.539-1.02.715-1.558.396z"/>
                </svg>
                <span>Spotify Web Player</span>
              </button>

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
          width: 64,
          height: 64,
          borderRadius: '50%',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(244, 63, 94, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
        title="Assistant"
      >
        <video
          src={TEDDY_WEBM.love[0]}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: 52, height: 52, objectFit: 'contain' }}
        />
      </motion.button>
    </div>
  )
}
