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

  // Contextual messages per mode with strong Spotify prompts
  const getContextualMessages = () => {
    if (mode === 'birthday') {
      return [
        'HEY MOMMY!!! 🎂 Aaj aap officially Level ' + age + ' ki ho gayi hain!',
        'Tab tak Spotify par celebratory songs suno na! 🎵🎉',
        'Aaj ka pura din sirf aapka hai! Chaliye chapter unlock karein 🧸',
        'Teddy ka Spotify Lounge on hai! Favorite gaana lagao 🎧'
      ]
    }
    if (mode === 'pre-birthday') {
      return [
        'Tab tak songs suno na Mommy! 🎵 Maine pura Spotify banaya hai aapke liye!',
        'Birthday countdown chal raha hai... Tab tak Teddy ke gaane sunte hain 🎧💖',
        'Mera favorite gaana "Chidiya" suno na? Ya "Kesariya"? 🧸',
        'Aap phir countdown dekhne aa gayi? 👀 Gaana bajau?',
        'Teddy\'s Music Lounge mein saare romantic & lo-fi songs hain! 🎶'
      ]
    }
    // post-birthday
    return [
      'Birthday khatam ho gaya toh kya hua? Tab tak songs sunte hain! 🎧',
      'Teddy\'s Spotify Lounge hamesha aapke liye khula hai 🧸💖',
      'Jab bhi mood kharab ho ya yaad aaye, yahan aakar gaane sun lena 😌🎵',
      'Main yahin hoon 🧸 Waise purana birthday chapter dekhna hai?'
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
    }, 14000)

    return () => clearInterval(bubbleTimer)
  }, [mode, age])

  const handleTeddyClick = () => {
    playPop()
    setIsOpen(!isOpen)
  }

  const handleBubbleClick = () => {
    // If bubble asks to listen to songs, tapping directly opens Spotify!
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
      bottom: 80, // slightly elevated above the mini player
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
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(16px)',
              border: '2px solid #fda4af',
              borderRadius: 20,
              padding: '10px 16px',
              maxWidth: 250,
              marginBottom: 10,
              boxShadow: '0 10px 30px rgba(244, 63, 94, 0.22)',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: '#881337',
              lineHeight: 1.4,
              cursor: 'pointer',
              position: 'relative'
            }}
            onClick={handleBubbleClick}
            title="Click to interact"
          >
            {bubbleText}
            <div style={{
              fontSize: '0.7rem',
              color: '#f43f5e',
              marginTop: 4,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
              <span>🎧 Tap to open Spotify / Close</span>
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
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              border: '2.5px solid #fda4af',
              borderRadius: 24,
              padding: '16px',
              width: 260,
              marginBottom: 12,
              boxShadow: '0 18px 45px rgba(0, 0, 0, 0.2)',
              textAlign: 'center'
            }}
          >
            <div style={{
              fontSize: '0.84rem',
              fontWeight: 900,
              color: '#e11d48',
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}>
              <span>🧸</span>
              <span>Teddy's Companion Menu</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Highlighted Spotify Lounge Button */}
              <button
                onClick={() => {
                  playSparkle()
                  setIsOpen(false)
                  onOpenSpotify && onOpenSpotify()
                }}
                style={{
                  border: 'none',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#fff',
                  padding: '10px 14px',
                  borderRadius: 14,
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: 'center'
                }}
              >
                <span>🎧</span>
                <span>Sneha's Spotify Lounge</span>
                <span style={{
                  background: 'rgba(255,255,255,0.25)',
                  fontSize: '0.62rem',
                  padding: '1px 5px',
                  borderRadius: 999
                }}>
                  NEW
                </span>
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
