import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'

export default function LyricsViewer() {
  const { currentTrack, currentTheme, isPlaying, currentTime, duration } = useMusicPlayer()
  const [copied, setCopied] = useState(false)

  if (!currentTrack) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: currentTheme.textSub }}>
        No track playing
      </div>
    )
  }

  const lines = currentTrack.lyrics
    ? currentTrack.lyrics.split('\n').filter((l) => l.trim().length > 0)
    : []

  // Estimate active line based on playback progress
  const progressRatio = duration > 0 ? currentTime / duration : 0
  const activeLineIndex = lines.length > 0 ? Math.min(Math.floor(progressRatio * lines.length), lines.length - 1) : 0

  const handleCopy = () => {
    if (!currentTrack.lyrics) return
    navigator.clipboard?.writeText(currentTrack.lyrics)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxHeight: '62vh',
      position: 'relative'
    }}>
      {/* Lyrics Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 16px',
        borderBottom: `1px solid ${currentTheme.border}`,
        marginBottom: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src={currentTrack.image}
            alt=""
            style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }}
            onError={(e) => { e.currentTarget.src = 'assets/3d-emoji/sparkling_heart.png' }}
          />
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: currentTheme.text }}>
              {currentTrack.title}
            </div>
            <div style={{ fontSize: '0.74rem', color: currentTheme.textSub }}>
              {currentTrack.artist} • Karaoke & Sing-Along
            </div>
          </div>
        </div>

        {lines.length > 0 && (
          <button
            onClick={handleCopy}
            style={{
              border: `1px solid ${currentTheme.border}`,
              background: currentTheme.surface,
              color: currentTheme.accentText,
              padding: '4px 12px',
              borderRadius: 999,
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {copied ? 'Copied! ✨' : 'Copy Lyrics 📋'}
          </button>
        )}
      </div>

      {/* Lyrics Scrollable Body */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0 16px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        scrollbarWidth: 'thin'
      }}>
        {lines.length > 0 ? (
          lines.map((line, idx) => {
            const isCurrent = idx === activeLineIndex && isPlaying
            return (
              <motion.div
                key={idx}
                animate={{
                  scale: isCurrent ? 1.04 : 1,
                  opacity: isCurrent ? 1 : idx < activeLineIndex ? 0.75 : 0.5
                }}
                transition={{ duration: 0.2 }}
                style={{
                  fontSize: isCurrent ? '1.18rem' : '1.02rem',
                  fontWeight: isCurrent ? 900 : 700,
                  color: isCurrent ? currentTheme.accentText : currentTheme.text,
                  lineHeight: 1.5,
                  textShadow: isCurrent ? `0 0 16px ${currentTheme.accent}` : 'none',
                  transition: 'color 0.2s, font-size 0.2s',
                  transformOrigin: 'left center'
                }}
              >
                {line}
              </motion.div>
            )
          })
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: currentTheme.textSub
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🎶✨</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: currentTheme.text, marginBottom: 6 }}>
              Sing Along with Sneha
            </div>
            <p style={{ fontSize: '0.85rem', maxWidth: 320, margin: '0 auto', lineHeight: 1.5 }}>
              Is gaane ki dhun par kho jao... Khubsoorat yaadein aur sweet vibes aapke saath hain! 🧸💖
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
