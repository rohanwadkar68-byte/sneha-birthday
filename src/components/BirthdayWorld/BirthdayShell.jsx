import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateAge, getBirthdayMode, getISTDate, isBirthdayToday } from '../../utils/birthdayWorld.js'
import BirthdayCountdown from './BirthdayCountdown.jsx'
import BirthdayArchive from './BirthdayArchive.jsx'
import TeddyForeverAssistant from './TeddyForeverAssistant.jsx'
import Chapter2026Experience from '../../data/chapters/2026.jsx'
import { BIRTHDAY_CHAPTERS } from '../../data/chapters/chapterRegistry.js'
import { TEDDY_WEBM } from '../../utils/assets.js'
import { playPop, playSparkle } from '../../utils/audio.js'

export default function BirthdayShell() {
  const [currentRoute, setCurrentRoute] = useState(() => window.location.hash || '#/birthday')
  const [archiveModalOpen, setArchiveModalOpen] = useState(false)
  const [now, setNow] = useState(() => new Date())
  
  const mode = getBirthdayMode(now)
  const age = calculateAge(now)

  // Listen to hash changes for direct URL access (/birthday/2026, /birthday/archive, etc.)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/birthday'
      setCurrentRoute(hash)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Midnight date watcher (Checks date transition every 10 seconds)
  useEffect(() => {
    const watcher = setInterval(() => {
      setNow(new Date())
    }, 10000)
    return () => clearInterval(watcher)
  }, [])

  const navigateTo = (hash) => {
    window.location.hash = hash
    setCurrentRoute(hash)
  }

  // If user is currently playing Chapter 01 (2026)
  if (currentRoute === '#/birthday/2026' || currentRoute === '#/2026') {
    return (
      <Chapter2026Experience
        isMemoryMode={mode !== 'birthday'}
        onBackToWorld={() => navigateTo('#/birthday')}
      />
    )
  }

  // If user is accessing future Chapter (2027 Coming Soon)
  if (currentRoute === '#/birthday/2027' || currentRoute === '#/2027') {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #ffe4e6 100%)',
        padding: 20
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            background: '#ffffff',
            padding: '36px 28px',
            borderRadius: 32,
            boxShadow: '0 20px 50px rgba(244, 63, 94, 0.2)',
            maxWidth: 440,
            textAlign: 'center',
            border: '2px solid #fda4af'
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: 10 }}>🔒</div>
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            color: '#be185d',
            background: '#ffe4e6',
            padding: '4px 12px',
            borderRadius: 999,
            display: 'inline-block',
            marginBottom: 10
          }}>
            CHAPTER 02 • LEVEL 24
          </div>
          <h2 style={{ margin: '0 0 10px', color: '#1e293b', fontSize: '1.5rem', fontWeight: 900 }}>
            Unlocks on 01 September 2027 🎂
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.5, margin: '0 0 24px' }}>
            Ye chapter abhi secret preparation mein hai. Sneha ke 24th birthday par automatically open hoga! 🧸✨
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={() => navigateTo('#/birthday')}
              style={{
                border: 'none',
                background: 'linear-gradient(135deg, #ff7597, #f43f5e)',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: 999,
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              ← World Home
            </button>
            <button
              onClick={() => navigateTo('#/birthday/2026')}
              style={{
                border: '1.5px solid #fda4af',
                background: '#fff',
                color: '#be185d',
                padding: '10px 20px',
                borderRadius: 999,
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Replay 2026 🧸
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff5f7 0%, #ffe4e6 50%, #fdf2f8 100%)',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'auto',
      fontFamily: 'inherit',
      paddingBottom: 90
    }}>
      {/* 👑 Top Permanent Shell Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1.5px solid rgba(254, 205, 211, 0.7)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(244, 63, 94, 0.08)'
      }}>
        {/* Left: Brand & Age */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.5rem' }}>🧸</span>
          <div>
            <div style={{
              fontSize: '1rem',
              fontWeight: 900,
              color: '#881337',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span>SNEHA'S BIRTHDAY WORLD</span>
              <span style={{
                background: 'linear-gradient(135deg, #ff7597, #f43f5e)',
                color: '#fff',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 999
              }}>
                Level {age}
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
              Permanent Yearly Memory Platform • Asia/Kolkata
            </div>
          </div>
        </div>

        {/* Right: Quick Navigation Tabs */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => {
              playPop()
              setArchiveModalOpen(true)
            }}
            style={{
              border: '1.5px solid #fda4af',
              background: '#fff',
              color: '#be185d',
              padding: '6px 14px',
              borderRadius: 999,
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>📔</span>
            <span>Archive</span>
          </button>

          <button
            onClick={() => {
              playSparkle()
              navigateTo('#/birthday/2026')
            }}
            style={{
              border: 'none',
              background: 'linear-gradient(135deg, #ff7597, #f43f5e)',
              color: '#fff',
              padding: '7px 16px',
              borderRadius: 999,
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(244, 63, 94, 0.28)',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>🎂</span>
            <span>Chapter 01 (2026)</span>
          </button>
        </div>
      </header>

      {/* 🌟 Main Body Content */}
      <main style={{ maxWidth: 840, margin: '0 auto', padding: '32px 16px' }}>
        {/* Mode Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginBottom: 32
          }}
        >
          {mode === 'birthday' ? (
            <div style={{
              background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
              border: '2.5px solid #fda4af',
              borderRadius: 32,
              padding: '28px 20px',
              boxShadow: '0 16px 40px rgba(244, 63, 94, 0.18)',
              marginBottom: 24
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 6 }}>🎂🎉✨</div>
              <h1 style={{
                margin: '0 0 8px',
                fontSize: '2rem',
                fontWeight: 900,
                color: '#e11d48'
              }}>
                HAPPY BIRTHDAY, SNEHA! 🧸
              </h1>
              <p style={{
                margin: '0 0 18px',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#475569'
              }}>
                Aaj aap officially <b>Level {age}</b> ki ho gayi hain! Aaj ka pura din sirf aapka hai.
              </p>
              <button
                onClick={() => {
                  playSparkle()
                  navigateTo('#/birthday/2026')
                }}
                style={{
                  border: 'none',
                  background: 'linear-gradient(135deg, #ff7597, #f43f5e)',
                  color: '#fff',
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  padding: '14px 32px',
                  borderRadius: 999,
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(244, 63, 94, 0.4)'
                }}
              >
                🎂 Birthday Surprise Kholo →
              </button>
            </div>
          ) : (
            <div>
              <h1 style={{
                margin: '0 0 10px',
                fontSize: '2.2rem',
                fontWeight: 900,
                color: '#881337',
                letterSpacing: '-0.03em'
              }}>
                Sneha's Forever Birthday World 🧸
              </h1>
              <p style={{
                margin: '0 auto 24px',
                fontSize: '1rem',
                color: '#64748b',
                fontWeight: 600,
                maxWidth: 520,
                lineHeight: 1.5
              }}>
                Ye website hamesha zinda rahegi. Har saal ek naya chapter unlock hoga, aur purani yaadein hamesha yahin sambhali rahengi.
              </p>
            </div>
          )}

          {/* Live Countdown Component */}
          <BirthdayCountdown onOpenBirthday={() => navigateTo('#/birthday/2026')} />
        </motion.div>

        {/* 📚 Chapter Showcase Cards */}
        <section style={{ marginTop: 36 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '1.3rem',
              fontWeight: 800,
              color: '#1e293b'
            }}>
              Birthday Chapters
            </h2>
            <button
              onClick={() => setArchiveModalOpen(true)}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#e11d48',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              View Full Archive →
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16
          }}>
            {/* Chapter 01 (2026) Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              style={{
                background: '#ffffff',
                border: '2px solid #fda4af',
                borderRadius: 24,
                padding: '20px',
                boxShadow: '0 10px 30px rgba(244, 63, 94, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: '1.8rem' }}>🧸</span>
                  <span style={{
                    background: '#ffe4e6',
                    color: '#be185d',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: 999
                  }}>
                    Chapter 01 • Available
                  </span>
                </div>
                <h3 style={{ margin: '0 0 6px', fontSize: '1.2rem', fontWeight: 900, color: '#1e293b' }}>
                  2026 • Level 23
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.45, margin: '0 0 16px' }}>
                  {BIRTHDAY_CHAPTERS[2026].description}
                </p>
              </div>

              <button
                onClick={() => {
                  playSparkle()
                  navigateTo('#/birthday/2026')
                }}
                style={{
                  border: 'none',
                  background: 'linear-gradient(135deg, #ff7597, #f43f5e)',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: 999,
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(244, 63, 94, 0.32)'
                }}
              >
                Play Chapter 01 Experience →
              </button>
            </motion.div>

            {/* Chapter 02 (2027) Card */}
            <motion.div
              style={{
                background: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: 24,
                padding: '20px',
                opacity: 0.8,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: '1.8rem' }}>✨</span>
                  <span style={{
                    background: '#e2e8f0',
                    color: '#64748b',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: 999
                  }}>
                    Chapter 02 • Coming Soon
                  </span>
                </div>
                <h3 style={{ margin: '0 0 6px', fontSize: '1.2rem', fontWeight: 900, color: '#475569' }}>
                  2027 • Level 24
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.45, margin: '0 0 16px' }}>
                  {BIRTHDAY_CHAPTERS[2027].description}
                </p>
              </div>

              <div style={{
                textAlign: 'center',
                padding: '9px 16px',
                borderRadius: 999,
                background: '#e2e8f0',
                color: '#64748b',
                fontSize: '0.82rem',
                fontWeight: 800
              }}>
                🔒 Unlocks 01 Sept 2027
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* 📔 Archive Modal Overlay */}
      <AnimatePresence>
        {archiveModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999999,
              background: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16
            }}
            onClick={() => setArchiveModalOpen(false)}
          >
            <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 680 }}>
              <BirthdayArchive
                onClose={() => setArchiveModalOpen(false)}
                onSelectChapter={(year) => {
                  setArchiveModalOpen(false)
                  navigateTo('#/birthday/' + year)
                }}
                onSurpriseMe={() => {
                  setArchiveModalOpen(false)
                  navigateTo('#/birthday/2026')
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧸 Permanent Teddy Assistant Floating Companion */}
      <TeddyForeverAssistant
        onOpenArchive={() => setArchiveModalOpen(true)}
        onOpenChapter={(yr) => navigateTo('#/birthday/' + yr)}
        onOpenCountdown={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onSurpriseMe={() => navigateTo('#/birthday/2026')}
      />
    </div>
  )
}
