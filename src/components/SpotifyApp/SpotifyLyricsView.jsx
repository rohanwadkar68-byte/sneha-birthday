import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'

export default function SpotifyLyricsView() {
  const { currentTrack, isPlaying, currentTime, duration, seekTo } = useMusicPlayer()
  const [copied, setCopied] = useState(false)
  const lyricsContainerRef = useRef(null)

  if (!currentTrack) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#b3b3b3' }}>
        No track playing right now.
      </div>
    )
  }

  const lines = currentTrack.lyrics
    ? currentTrack.lyrics.split('\n').filter((l) => l.trim().length > 0)
    : []

  const progressRatio = duration > 0 ? currentTime / duration : 0
  const activeLineIndex = lines.length > 0 ? Math.min(Math.floor(progressRatio * lines.length), lines.length - 1) : 0

  // Auto-scroll active line into center
  useEffect(() => {
    if (!lyricsContainerRef.current) return
    const activeEl = lyricsContainerRef.current.querySelector('[data-active="true"]')
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [activeLineIndex])

  const handleCopy = () => {
    if (!currentTrack.lyrics) return
    navigator.clipboard?.writeText(currentTrack.lyrics)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      minHeight: '100%',
      padding: '0 32px 120px',
      position: 'relative',
      userSelect: 'none'
    }}>
      {/* Top Floating Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 24,
        marginBottom: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img
            src={currentTrack.image}
            alt=""
            style={{ width: 48, height: 48, borderRadius: 4, objectFit: 'cover' }}
            onError={(e) => { e.currentTarget.src = 'assets/3d-emoji/sparkling_heart.png' }}
          />
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
              {currentTrack.title}
            </div>
            <div style={{ fontSize: '13px', color: '#b3b3b3', fontWeight: 600 }}>
              {currentTrack.artist} • Karaoke Lyrics
            </div>
          </div>
        </div>

        {lines.length > 0 && (
          <button
            onClick={handleCopy}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              padding: '8px 18px',
              borderRadius: 9999,
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)' }}
          >
            {copied ? 'Copied! ✨' : 'Copy Lyrics 📋'}
          </button>
        )}
      </div>

      {/* Giant Spotify Lyrics Body */}
      <div
        ref={lyricsContainerRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          maxWidth: 720
        }}
      >
        {lines.length > 0 ? (
          lines.map((line, idx) => {
            const isCurrent = idx === activeLineIndex && isPlaying
            const isPast = idx < activeLineIndex

            return (
              <motion.div
                key={idx}
                data-active={isCurrent ? 'true' : 'false'}
                onClick={() => {
                  if (duration > 0 && lines.length > 0) {
                    seekTo((idx / lines.length) * duration)
                  }
                }}
                style={{
                  fontSize: 'clamp(24px, 3.8vw, 36px)',
                  fontWeight: 900,
                  color: isCurrent ? '#ffffff' : isPast ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.28)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.02em',
                  cursor: 'pointer',
                  transformOrigin: 'left center',
                  transform: isCurrent ? 'scale(1.03)' : 'scale(1)',
                  transition: 'color 0.2s, transform 0.2s',
                  textShadow: isCurrent ? '0 0 30px rgba(255,255,255,0.4)' : 'none'
                }}
              >
                {line}
              </motion.div>
            )
          })
        ) : (
          <div style={{ padding: '60px 0', color: '#b3b3b3' }}>
            <div style={{ fontSize: '48px', marginBottom: 16 }}>🎵</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
              Sing along with Sneha
            </div>
            <p style={{ fontSize: '15px', maxWidth: 440, lineHeight: 1.6, margin: 0 }}>
              Is gaane ki dhun sunte huye dil se gaao! Saare romantic vibes aur yaadein aapke saath hain. 🧸💖
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
