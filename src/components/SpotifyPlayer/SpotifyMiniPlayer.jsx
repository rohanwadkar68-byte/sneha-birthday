import { motion } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'

export default function SpotifyMiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    currentTheme,
    togglePlay,
    nextTrack,
    toggleLike,
    isLiked,
    openFullPlayer
  } = useMusicPlayer()

  if (!currentTrack) return null

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const liked = isLiked(currentTrack.id)

  return (
    <div style={{
      position: 'fixed',
      bottom: 12,
      left: 14,
      right: 14,
      maxWidth: 720,
      margin: '0 auto',
      zIndex: 99990,
      pointerEvents: 'auto'
    }}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        onClick={() => openFullPlayer('home')}
        style={{
          background: currentTheme.surface,
          border: `1.5px solid ${currentTheme.border}`,
          borderRadius: 18,
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.22)',
          backdropFilter: 'blur(24px)',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        {/* Top Progress Line */}
        <div style={{
          width: '100%',
          height: 3,
          background: 'rgba(255, 255, 255, 0.1)',
          position: 'relative'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: currentTheme.accent,
            transition: 'width 0.25s linear'
          }} />
        </div>

        {/* Content Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          gap: 10
        }}>
          {/* Left: Spinning Cover + Title/Artist */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                border: `2px solid ${currentTheme.accent}`,
                boxShadow: `0 0 12px ${currentTheme.accent}40`
              }}
            >
              <img
                src={currentTrack.image}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.src = 'assets/3d-emoji/sparkling_heart.png' }}
              />
            </motion.div>

            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: '0.86rem',
                fontWeight: 800,
                color: currentTheme.text,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {currentTrack.title}
              </div>
              <div style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                color: currentTheme.textSub,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {currentTrack.artist}
              </div>
            </div>
          </div>

          {/* Right: Like + Controls */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lyrics Shortcut button */}
            <button
              onClick={() => openFullPlayer('lyrics')}
              title="View Lyrics"
              style={{
                border: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
                color: currentTheme.text,
                padding: '5px 9px',
                borderRadius: 999,
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Lyrics 📜
            </button>

            {/* Heart Wishlist Button */}
            <motion.button
              whileTap={{ scale: 1.3 }}
              onClick={() => toggleLike(currentTrack.id)}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '4px 6px',
                lineHeight: 1
              }}
              title={liked ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              {liked ? '💖' : '🤍'}
            </motion.button>

            {/* Play/Pause Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              style={{
                border: 'none',
                background: currentTheme.accent,
                color: '#fff',
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: `0 4px 14px ${currentTheme.accent}50`,
                fontSize: '0.95rem'
              }}
            >
              {isPlaying ? '⏸' : '▶'}
            </motion.button>

            {/* Next Track Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={nextTrack}
              style={{
                border: 'none',
                background: 'transparent',
                color: currentTheme.text,
                cursor: 'pointer',
                fontSize: '1.1rem',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Next Track"
            >
              ⏭
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
