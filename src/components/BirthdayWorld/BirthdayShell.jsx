import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateAge, getBirthdayMode } from '../../utils/birthdayWorld.js'
import BirthdayCountdown from './BirthdayCountdown.jsx'
import BirthdayArchive from './BirthdayArchive.jsx'
import TeddyForeverAssistant from './TeddyForeverAssistant.jsx'
import Chapter2026Experience from '../../data/chapters/2026.jsx'
import { BIRTHDAY_CHAPTERS } from '../../data/chapters/chapterRegistry.js'
import { playPop, playSparkle } from '../../utils/audio.js'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import SpotifyApp from '../SpotifyApp/SpotifyApp.jsx'

export default function BirthdayShell() {
  const [currentRoute, setCurrentRoute] = useState(() => window.location.hash || '#/birthday')
  const [archiveModalOpen, setArchiveModalOpen] = useState(false)
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(() => window.location.hash === '#/spotify')
  const [now, setNow] = useState(() => new Date())
  
  const mode = getBirthdayMode(now)
  const age = calculateAge(now)
  const { currentTrack, isPlaying, togglePlay } = useMusicPlayer()

  // Listen to hash changes for direct URL access (/birthday/2026, /birthday/archive, /spotify)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/birthday'
      setCurrentRoute(hash)
      if (hash === '#/spotify') {
        setIsSpotifyOpen(true)
      }
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
    if (hash === '#/spotify') {
      setIsSpotifyOpen(true)
    }
  }

  const openSpotify = () => {
    playSparkle()
    window.location.hash = '#/spotify'
    setIsSpotifyOpen(true)
  }

  const closeSpotify = () => {
    setIsSpotifyOpen(false)
    if (window.location.hash === '#/spotify') {
      window.location.hash = '#/birthday'
    }
  }

  // 🎧 If authentic Spotify App is opened
  if (isSpotifyOpen) {
    return <SpotifyApp onBackToWorld={closeSpotify} />
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
      paddingBottom: 110
    }}>
      {/* 👑 Top Permanent Shell Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1.5px solid rgba(254, 205, 211, 0.7)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(244, 63, 94, 0.08)',
        flexWrap: 'wrap',
        gap: 10
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
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Authentic Spotify Pill Button */}
          <button
            onClick={openSpotify}
            style={{
              border: 'none',
              background: '#000000',
              color: '#ffffff',
              padding: '7px 16px',
              borderRadius: 999,
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              transition: 'transform 0.15s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1ed760">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.309c-.217.357-.681.472-1.038.254-2.846-1.74-6.429-2.133-10.648-1.17-.409.094-.816-.164-.91-.572-.094-.408.163-.815.572-.91 4.624-1.057 8.577-.611 11.77 1.341.356.218.471.682.254 1.057zm1.469-3.267c-.274.444-.858.586-1.302.312-3.257-2.002-8.223-2.583-12.076-1.413-.501.152-1.033-.135-1.185-.636-.152-.501.135-1.033.636-1.185 4.408-1.338 9.882-.693 13.615 1.621.444.275.586.859.312 1.301zm.127-3.411c-3.906-2.319-10.347-2.533-14.073-1.401-.6.182-1.237-.162-1.419-.762-.182-.6.162-1.237.762-1.419 4.279-1.299 11.393-1.043 15.892 1.628.539.32.715 1.02.396 1.558-.32.539-1.02.715-1.558.396z"/>
            </svg>
            <span>Spotify Web</span>
            <span style={{
              background: '#1ed760',
              color: '#000000',
              fontSize: '0.62rem',
              fontWeight: 900,
              padding: '1px 5px',
              borderRadius: 999
            }}>
              PRO
            </span>
          </button>

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
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '28px 16px' }}>
        {/* Mode Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginBottom: 28
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
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    playSparkle()
                    navigateTo('#/birthday/2026')
                  }}
                  style={{
                    border: 'none',
                    background: 'linear-gradient(135deg, #ff7597, #f43f5e)',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: 900,
                    padding: '12px 28px',
                    borderRadius: 999,
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(244, 63, 94, 0.4)'
                  }}
                >
                  🎂 Birthday Surprise Kholo →
                </button>
                <button
                  onClick={openSpotify}
                  style={{
                    border: 'none',
                    background: '#000000',
                    color: '#1ed760',
                    fontSize: '1rem',
                    fontWeight: 800,
                    padding: '12px 24px',
                    borderRadius: 999,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                  }}
                >
                  <span>🎧</span>
                  <span>Spotify Party Music</span>
                </button>
              </div>
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
                Ye website hamesha zinda rahegi. Har saal ek naya chapter unlock hoga, aur tab tak Spotify par gaane suno aur yaadein tazi karo!
              </p>
            </div>
          )}

          {/* Live Countdown Component */}
          <BirthdayCountdown onOpenBirthday={() => navigateTo('#/birthday/2026')} />
        </motion.div>

        {/* 🎧 AUTHENTIC SPOTIFY FEATURE CARD ON WORLD HOME */}
        <motion.section
          whileHover={{ y: -3 }}
          style={{
            background: '#000000',
            border: '2px solid #1ed760',
            borderRadius: 24,
            padding: '24px',
            color: '#ffffff',
            boxShadow: '0 16px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(30, 215, 96, 0.2)',
            marginBottom: 32,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20
          }}>
            <div style={{ maxWidth: 520 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#121212',
                border: '1px solid #1ed760',
                padding: '4px 12px',
                borderRadius: 9999,
                fontSize: '12px',
                fontWeight: 800,
                color: '#1ed760',
                marginBottom: 12
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1ed760">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.309c-.217.357-.681.472-1.038.254-2.846-1.74-6.429-2.133-10.648-1.17-.409.094-.816-.164-.91-.572-.094-.408.163-.815.572-.91 4.624-1.057 8.577-.611 11.77 1.341.356.218.471.682.254 1.057zm1.469-3.267c-.274.444-.858.586-1.302.312-3.257-2.002-8.223-2.583-12.076-1.413-.501.152-1.033-.135-1.185-.636-.152-.501.135-1.033.636-1.185 4.408-1.338 9.882-.693 13.615 1.621.444.275.586.859.312 1.301zm.127-3.411c-3.906-2.319-10.347-2.533-14.073-1.401-.6.182-1.237-.162-1.419-.762-.182-.6.162-1.237.762-1.419 4.279-1.299 11.393-1.043 15.892 1.628.539.32.715 1.02.396 1.558-.32.539-1.02.715-1.558.396z"/>
                </svg>
                <span>SPOTIFY WEB • SNEHA EDITION</span>
              </div>

              <h2 style={{
                margin: '0 0 10px',
                fontSize: '28px',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.02em'
              }}>
                Tab Tak Gaane Suno Na Mommy! 🎧
              </h2>

              <p style={{
                margin: '0 0 20px',
                fontSize: '14px',
                color: '#b3b3b3',
                lineHeight: 1.6
              }}>
                Birthday aane tak bore mat ho! Pura authentic Spotify Web Player ready hai with <b>Romantic Mixes</b>, <b>Teddy's Vilen Vault</b>, <b>Late Night Lo-Fi</b>, <b>Karaoke Lyrics</b>, and <b>Live Song Search</b>!
              </p>

              <button
                onClick={openSpotify}
                style={{
                  border: 'none',
                  background: '#1ed760',
                  color: '#000000',
                  fontWeight: 900,
                  fontSize: '15px',
                  padding: '12px 28px',
                  borderRadius: 9999,
                  cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(30, 215, 96, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  transition: 'transform 0.15s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
              >
                <span>▶</span>
                <span>Launch Spotify Web App</span>
              </button>
            </div>

            {/* Currently Playing / Preview Card */}
            <div
              onClick={openSpotify}
              style={{
                background: '#181818',
                border: '1px solid #282828',
                borderRadius: 16,
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                cursor: 'pointer',
                minWidth: 220,
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#222222' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#181818' }}
            >
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #1ed760',
                  flexShrink: 0
                }}
              >
                <img
                  src={currentTrack?.image || 'assets/3d-emoji/sparkling_heart.png'}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.src = 'assets/3d-emoji/sparkling_heart.png' }}
                />
              </motion.div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '11px', color: '#1ed760', fontWeight: 800, textTransform: 'uppercase' }}>
                  {isPlaying ? 'NOW PLAYING' : 'CLICK TO LISTEN'}
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#ffffff',
                  maxWidth: 140,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {currentTrack?.title || 'Chidiya'}
                </div>
                <div style={{ fontSize: '12px', color: '#b3b3b3' }}>
                  {currentTrack?.artist || 'Vilen'}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 📚 Chapter Showcase Cards */}
        <section style={{ marginTop: 24 }}>
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
        onOpenSpotify={openSpotify}
      />
    </div>
  )
}
