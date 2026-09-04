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
  const { currentTrack, isPlaying } = useMusicPlayer()

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

  // If Spotify Web App is opened
  if (isSpotifyOpen) {
    return <SpotifyApp onBackToWorld={closeSpotify} />
  }

  // Chapter 01 (2026) Experience
  if (currentRoute === '#/birthday/2026' || currentRoute === '#/2026') {
    return (
      <Chapter2026Experience
        isMemoryMode={mode !== 'birthday'}
        onBackToWorld={() => navigateTo('#/birthday')}
      />
    )
  }

  // Chapter 02 (2027 Coming Soon)
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
            Ye chapter abhi preparation mein hai. Sneha ke 24th birthday par automatically open hoga!
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
              Replay 2026
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
      {/* Top Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        background: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(254, 205, 211, 0.7)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        gap: 10
      }}>
        {/* Brand & Age */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '1.4rem' }}>🧸</span>
          <div>
            <div style={{
              fontSize: '0.94rem',
              fontWeight: 900,
              color: '#881337',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <span>Sneha's World</span>
              <span style={{
                background: '#f43f5e',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: 999
              }}>
                Level {age}
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>
              Asia/Kolkata
            </div>
          </div>
        </div>

        {/* Right Navigation */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Spotify Web Button */}
          <button
            onClick={openSpotify}
            style={{
              border: 'none',
              background: '#000000',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: 999,
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#1ed760">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.309c-.217.357-.681.472-1.038.254-2.846-1.74-6.429-2.133-10.648-1.17-.409.094-.816-.164-.91-.572-.094-.408.163-.815.572-.91 4.624-1.057 8.577-.611 11.77 1.341.356.218.471.682.254 1.057zm1.469-3.267c-.274.444-.858.586-1.302.312-3.257-2.002-8.223-2.583-12.076-1.413-.501.152-1.033-.135-1.185-.636-.152-.501.135-1.033.636-1.185 4.408-1.338 9.882-.693 13.615 1.621.444.275.586.859.312 1.301zm.127-3.411c-3.906-2.319-10.347-2.533-14.073-1.401-.6.182-1.237-.162-1.419-.762-.182-.6.162-1.237.762-1.419 4.279-1.299 11.393-1.043 15.892 1.628.539.32.715 1.02.396 1.558-.32.539-1.02.715-1.558.396z"/>
            </svg>
            <span>Spotify</span>
          </button>

          <button
            onClick={() => {
              playPop()
              setArchiveModalOpen(true)
            }}
            style={{
              border: '1px solid #fda4af',
              background: '#fff',
              color: '#be185d',
              padding: '6px 12px',
              borderRadius: 999,
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Archive
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
              padding: '6px 14px',
              borderRadius: 999,
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Chapter 01
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main style={{ maxWidth: 840, margin: '0 auto', padding: '24px 16px' }}>
        {/* Countdown / Birthday Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 28 }}
        >
          {mode === 'birthday' ? (
            <div style={{
              background: '#ffffff',
              border: '2px solid #fda4af',
              borderRadius: 24,
              padding: '24px 16px',
              marginBottom: 20
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 4 }}>🎂✨</div>
              <h1 style={{ margin: '0 0 6px', fontSize: '1.8rem', fontWeight: 900, color: '#e11d48' }}>
                Happy Birthday, Sneha!
              </h1>
              <p style={{ margin: '0 0 16px', fontSize: '0.98rem', fontWeight: 600, color: '#475569' }}>
                Officially <b>Level {age}</b>! Aaj ka pura din sirf aapka hai.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigateTo('#/birthday/2026')}
                  style={{
                    border: 'none',
                    background: 'linear-gradient(135deg, #ff7597, #f43f5e)',
                    color: '#fff',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    padding: '10px 24px',
                    borderRadius: 999,
                    cursor: 'pointer'
                  }}
                >
                  Open Birthday Surprise →
                </button>
                <button
                  onClick={openSpotify}
                  style={{
                    border: 'none',
                    background: '#000000',
                    color: '#1ed760',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    padding: '10px 20px',
                    borderRadius: 999,
                    cursor: 'pointer'
                  }}
                >
                  Spotify Music
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1 style={{
                margin: '0 0 8px',
                fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                fontWeight: 900,
                color: '#881337',
                letterSpacing: '-0.02em'
              }}>
                Sneha's Forever Birthday World
              </h1>
              <p style={{
                margin: '0 auto 20px',
                fontSize: '0.92rem',
                color: '#64748b',
                fontWeight: 600,
                maxWidth: 480,
                lineHeight: 1.5
              }}>
                Har saal ek naya chapter unlock hoga. Tab tak Spotify par songs suno aur countdown check karo!
              </p>
            </div>
          )}

          <BirthdayCountdown onOpenBirthday={() => navigateTo('#/birthday/2026')} />
        </motion.div>

        {/* Clean Spotify Web Banner */}
        <div style={{
          background: '#121212',
          border: '1px solid #282828',
          borderRadius: 18,
          padding: '18px 20px',
          color: '#ffffff',
          marginBottom: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div style={{ maxWidth: 460 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '11px',
              fontWeight: 800,
              color: '#1ed760',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 6
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#1ed760">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.309c-.217.357-.681.472-1.038.254-2.846-1.74-6.429-2.133-10.648-1.17-.409.094-.816-.164-.91-.572-.094-.408.163-.815.572-.91 4.624-1.057 8.577-.611 11.77 1.341.356.218.471.682.254 1.057zm1.469-3.267c-.274.444-.858.586-1.302.312-3.257-2.002-8.223-2.583-12.076-1.413-.501.152-1.033-.135-1.185-.636-.152-.501.135-1.033.636-1.185 4.408-1.338 9.882-.693 13.615 1.621.444.275.586.859.312 1.301zm.127-3.411c-3.906-2.319-10.347-2.533-14.073-1.401-.6.182-1.237-.162-1.419-.762-.182-.6.162-1.237.762-1.419 4.279-1.299 11.393-1.043 15.892 1.628.539.32.715 1.02.396 1.558-.32.539-1.02.715-1.558.396z"/>
              </svg>
              <span>Spotify Music Player</span>
            </div>
            <h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
              Tab tak songs sun lo! 🎧
            </h3>
            <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#b3b3b3', lineHeight: 1.4 }}>
              Countdown chal raha hai, tab tak Spotify par romantic songs, lo-fi beats aur lyrics ka maza lo. Koi bhi gaana search karke sun sakti ho!
            </p>
            <button
              onClick={openSpotify}
              style={{
                border: 'none',
                background: '#1ed760',
                color: '#000000',
                fontWeight: 800,
                fontSize: '13px',
                padding: '9px 20px',
                borderRadius: 9999,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <span>▶</span>
              <span>Open Spotify Web</span>
            </button>
          </div>

          <div
            onClick={openSpotify}
            style={{
              background: '#242424',
              borderRadius: 12,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              minWidth: 190
            }}
          >
            <img
              src={currentTrack?.image || DEFAULT_ALBUM_COVER}
              alt=""
              style={{ width: 44, height: 44, borderRadius: 4, objectFit: 'cover' }}
              onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '11px', color: '#1ed760', fontWeight: 700 }}>
                {isPlaying ? 'PLAYING' : 'TAP TO LISTEN'}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>
                {currentTrack?.title || 'Kesariya'}
              </div>
              <div style={{ fontSize: '11px', color: '#b3b3b3' }}>
                {currentTrack?.artist || 'Arijit Singh'}
              </div>
            </div>
          </div>
        </div>

        {/* Chapters */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#1e293b' }}>
              Birthday Chapters
            </h2>
            <button
              onClick={() => setArchiveModalOpen(true)}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#e11d48',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              View Full Archive →
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 14
          }}>
            {/* Chapter 01 (2026) Card */}
            <div style={{
              background: '#ffffff',
              border: '2px solid #fda4af',
              borderRadius: 20,
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '1.6rem' }}>🧸</span>
                  <span style={{
                    background: '#ffe4e6',
                    color: '#be185d',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: 999
                  }}>
                    Available
                  </span>
                </div>
                <h3 style={{ margin: '0 0 4px', fontSize: '1.15rem', fontWeight: 800, color: '#1e293b' }}>
                  2026 • Level 23
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.4, margin: '0 0 14px' }}>
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
                  padding: '9px 18px',
                  borderRadius: 999,
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Play Chapter 01 →
              </button>
            </div>

            {/* Chapter 02 (2027) Card */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 20,
              padding: '18px',
              opacity: 0.8,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '1.6rem' }}>✨</span>
                  <span style={{
                    background: '#e2e8f0',
                    color: '#64748b',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: 999
                  }}>
                    Coming Soon
                  </span>
                </div>
                <h3 style={{ margin: '0 0 4px', fontSize: '1.15rem', fontWeight: 800, color: '#475569' }}>
                  2027 • Level 24
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.4, margin: '0 0 14px' }}>
                  {BIRTHDAY_CHAPTERS[2027].description}
                </p>
              </div>

              <div style={{
                textAlign: 'center',
                padding: '8px 14px',
                borderRadius: 999,
                background: '#e2e8f0',
                color: '#64748b',
                fontSize: '0.8rem',
                fontWeight: 800
              }}>
                Unlocks 01 Sept 2027
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Archive Modal */}
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

      {/* Assistant */}
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
