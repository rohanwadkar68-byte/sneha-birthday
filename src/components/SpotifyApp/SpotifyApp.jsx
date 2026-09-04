import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import SpotifySidebar from './SpotifySidebar.jsx'
import SpotifyTopBar from './SpotifyTopBar.jsx'
import SpotifyHomeView from './SpotifyHomeView.jsx'
import SpotifySearchView from './SpotifySearchView.jsx'
import SpotifyPlaylistView from './SpotifyPlaylistView.jsx'
import SpotifyLyricsView from './SpotifyLyricsView.jsx'
import SpotifyQueueView from './SpotifyQueueView.jsx'
import SpotifyPlayerBar from './SpotifyPlayerBar.jsx'

export default function SpotifyApp({ onBackToWorld }) {
  const [activeView, setActiveView] = useState('home') // home | search | playlist | lyrics | queue
  const [activePlaylist, setActivePlaylist] = useState({ id: 'liked', title: 'Liked Songs' })
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  const [mobileNowPlayingOpen, setMobileNowPlayingOpen] = useState(false)

  const { currentTrack, isPlaying, currentTime, duration, togglePlay, nextTrack, prevTrack, seekTo, toggleLike, isLiked } = useMusicPlayer()

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Dynamic Spotify top ambient background color based on active view & track
  const getAmbientGradient = () => {
    if (activeView === 'lyrics') {
      return 'linear-gradient(to bottom, #381224 0%, #121212 450px)'
    }
    if (activeView === 'playlist') {
      return activePlaylist.id === 'liked'
        ? 'linear-gradient(to bottom, #2b1154 0%, #121212 360px)'
        : 'linear-gradient(to bottom, #1d273a 0%, #121212 360px)'
    }
    if (activeView === 'search') {
      return 'linear-gradient(to bottom, #1c1c1c 0%, #121212 250px)'
    }
    return 'linear-gradient(to bottom, #153323 0%, #121212 360px)'
  }

  const handleSelectPlaylist = (pl) => {
    setActivePlaylist(pl)
    setActiveView('playlist')
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#000000',
      color: '#ffffff',
      fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'fixed',
      inset: 0,
      zIndex: 999999
    }}>
      {/* MAIN DESKTOP / TABLET WORKSPACE */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* LEFT SIDEBAR (Hidden on small mobile) */}
        {!isMobile && (
          <SpotifySidebar
            activeView={activeView}
            setActiveView={setActiveView}
            onSelectPlaylist={handleSelectPlaylist}
          />
        )}

        {/* MAIN SCROLLABLE CONTENT CONTAINER */}
        <div style={{
          flex: 1,
          background: '#121212',
          backgroundImage: getAmbientGradient(),
          borderRadius: !isMobile ? 8 : 0,
          margin: !isMobile ? '8px 8px 8px 0' : 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          scrollbarWidth: 'thin'
        }}>
          {/* Top Bar with Search & World Exit */}
          <SpotifyTopBar
            activeView={activeView}
            setActiveView={setActiveView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onBackToWorld={onBackToWorld}
          />

          {/* Views Routing */}
          <div style={{ flex: 1, paddingTop: 16 }}>
            {activeView === 'home' && (
              <SpotifyHomeView onSelectPlaylist={handleSelectPlaylist} />
            )}
            {activeView === 'search' && (
              <SpotifySearchView
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            )}
            {activeView === 'playlist' && (
              <SpotifyPlaylistView playlist={activePlaylist} />
            )}
            {activeView === 'lyrics' && (
              <SpotifyLyricsView />
            )}
            {activeView === 'queue' && (
              <SpotifyQueueView />
            )}
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION (Visible only on mobile < 768px) */}
      {isMobile && (
        <div style={{
          height: 56,
          background: '#121212',
          borderTop: '1px solid #282828',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 110,
          userSelect: 'none'
        }}>
          {/* Home */}
          <button
            onClick={() => setActiveView('home')}
            style={{
              border: 'none',
              background: 'transparent',
              color: activeView === 'home' ? '#ffffff' : '#b3b3b3',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <span>🏠</span>
            <span>Home</span>
          </button>

          {/* Search */}
          <button
            onClick={() => setActiveView('search')}
            style={{
              border: 'none',
              background: 'transparent',
              color: activeView === 'search' ? '#ffffff' : '#b3b3b3',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <span>🔍</span>
            <span>Search</span>
          </button>

          {/* Your Library */}
          <button
            onClick={() => {
              setActivePlaylist({ id: 'liked', title: 'Liked Songs' })
              setActiveView('playlist')
            }}
            style={{
              border: 'none',
              background: 'transparent',
              color: activeView === 'playlist' ? '#ffffff' : '#b3b3b3',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <span>📚</span>
            <span>Your Library</span>
          </button>

          {/* Return to World */}
          <button
            onClick={onBackToWorld}
            style={{
              border: 'none',
              background: 'transparent',
              color: '#1ed760',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            <span>🧸</span>
            <span>World</span>
          </button>
        </div>
      )}

      {/* BOTTOM PERSISTENT SPOTIFY NOW PLAYING BAR */}
      <SpotifyPlayerBar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenMobileNowPlaying={() => setMobileNowPlayingOpen(true)}
      />

      {/* MOBILE FULL SCREEN NOW PLAYING MODAL */}
      <AnimatePresence>
        {isMobile && mobileNowPlayingOpen && currentTrack && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999999,
              background: 'linear-gradient(to bottom, #2b1154 0%, #121212 70%)',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px 20px',
              color: '#ffffff'
            }}
          >
            {/* Top Close Chevron */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <button
                onClick={() => setMobileNowPlayingOpen(false)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: '#ffffff',
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
              >
                ⌄
              </button>
              <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                PLAYING FOR SNEHA
              </div>
              <div style={{ width: 24 }} />
            </div>

            {/* Giant Album Art */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <img
                src={currentTrack.image}
                alt=""
                style={{
                  width: '84vw',
                  maxWidth: 320,
                  aspectRatio: '1/1',
                  borderRadius: 8,
                  objectFit: 'cover',
                  boxShadow: '0 16px 50px rgba(0,0,0,0.6)'
                }}
                onError={(e) => { e.currentTarget.src = 'assets/3d-emoji/sparkling_heart.png' }}
              />
            </div>

            {/* Track Info + Like */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 4px', color: '#ffffff' }}>
                  {currentTrack.title}
                </h2>
                <div style={{ fontSize: '15px', color: '#b3b3b3', fontWeight: 600 }}>
                  {currentTrack.artist}
                </div>
              </div>

              <button
                onClick={() => toggleLike(currentTrack.id)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                {isLiked(currentTrack.id) ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1ed760">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Scrubber Slider */}
            <div style={{ marginBottom: 24 }}>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={(e) => seekTo(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1ed760', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#b3b3b3', marginTop: 4 }}>
                <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60) < 10 ? '0' : ''}{Math.floor(currentTime % 60)}</span>
                <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60) < 10 ? '0' : ''}{Math.floor(duration % 60)}</span>
              </div>
            </div>

            {/* Play Controls Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: 28 }}>
              <button
                onClick={prevTrack}
                style={{ border: 'none', background: 'transparent', color: '#ffffff', cursor: 'pointer', fontSize: '24px' }}
              >
                ⏮
              </button>

              <button
                onClick={togglePlay}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  fontSize: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              <button
                onClick={nextTrack}
                style={{ border: 'none', background: 'transparent', color: '#ffffff', cursor: 'pointer', fontSize: '24px' }}
              >
                ⏭
              </button>
            </div>

            {/* Quick Swipe-Up Lyrics Pill */}
            <button
              onClick={() => {
                setMobileNowPlayingOpen(false)
                setActiveView('lyrics')
              }}
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                padding: '12px',
                borderRadius: 16,
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              📜 View Full Karaoke Lyrics
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
