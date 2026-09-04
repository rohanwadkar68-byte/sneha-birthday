import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import { CURATED_SONGS, SPOTIFY_PLAYLISTS, SPOTIFY_THEMES, SEARCH_CHIPS } from '../../data/musicLibrary.js'
import LyricsViewer from './LyricsViewer.jsx'

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

function decodeHtml(html) {
  if (!html) return ''
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export default function SpotifyFullPlayer() {
  const {
    isFullPlayerOpen,
    closeFullPlayer,
    activeTab,
    setActiveTab,
    themeId,
    setThemeId,
    currentTheme,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    likedIds,
    queue,
    playTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    changeVolume,
    toggleMute,
    toggleLike,
    isLiked,
    toggleShuffle,
    toggleRepeat
  } = useMusicPlayer()

  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const debounceRef = useRef(null)

  if (!isFullPlayerOpen) return null

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      let found = []

      // 1. JioSaavn API
      try {
        const res = await fetch('https://jiosaavn-api-nine.vercel.app/api/search/songs?query=' + encodeURIComponent(query))
        if (res.ok) {
          const data = await res.json()
          const items = data?.data?.results || []
          if (items.length > 0) {
            found = items.slice(0, 15).map((item) => {
              const dlUrl =
                item.downloadUrl?.[item.downloadUrl.length - 1]?.url ||
                item.downloadUrl?.[0]?.url ||
                item.url

              const imgUrl =
                item.image?.[item.image.length - 1]?.url ||
                item.image?.[0]?.url ||
                'assets/3d-emoji/sparkling_heart.png'

              const artistName =
                item.artists?.primary?.[0]?.name ||
                item.primaryArtists ||
                item.album?.name ||
                'Artist'

              return {
                id: item.id || String(Math.random()),
                title: decodeHtml(item.name || item.title || 'Song'),
                artist: decodeHtml(artistName),
                image: imgUrl,
                url: dlUrl,
                lyrics: item.hasLyrics ? null : null
              }
            }).filter((i) => !!i.url)
          }
        }
      } catch (e) {
        console.warn('JioSaavn search err:', e)
      }

      // 2. iTunes Fallback
      if (found.length === 0) {
        try {
          const itunesRes = await fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(query) + '&entity=song&limit=12')
          if (itunesRes.ok) {
            const data = await itunesRes.json()
            if (data.results && data.results.length > 0) {
              found = data.results.map((item) => ({
                id: String(item.trackId || Math.random()),
                title: decodeHtml(item.trackName || 'Song'),
                artist: decodeHtml(item.artistName || 'Artist'),
                image: item.artworkUrl100?.replace('100x100', '300x300') || 'assets/3d-emoji/sparkling_heart.png',
                url: item.previewUrl
              })).filter((i) => !!i.url)
            }
          }
        } catch (e) {
          console.warn('iTunes search err:', e)
        }
      }

      setSearchResults(found)
      setIsSearching(false)
    }, 350)
  }

  // Liked songs list
  const likedSongsList = CURATED_SONGS.filter((s) => likedIds.includes(s.id))

  const playPlaylist = (playlist) => {
    const songs = CURATED_SONGS.filter((s) => playlist.songIds.includes(s.id))
    if (songs.length > 0) {
      playTrack(songs[0], songs)
    }
  }

  const playAllLiked = () => {
    if (likedSongsList.length > 0) {
      playTrack(likedSongsList[0], likedSongsList)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999999,
          background: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px'
        }}
        onClick={closeFullPlayer}
      >
        <motion.div
          initial={{ scale: 0.92, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 30 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: 780,
            height: '92vh',
            maxHeight: 860,
            background: currentTheme.bg,
            border: `2px solid ${currentTheme.border}`,
            borderRadius: 28,
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.45)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            color: currentTheme.text
          }}
        >
          {/* Top Bar */}
          <div style={{
            padding: '12px 18px',
            background: currentTheme.surface,
            borderBottom: `1px solid ${currentTheme.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}>
            {/* Left: Close & Branding */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={closeFullPlayer}
                style={{
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: currentTheme.text,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800
                }}
                title="Minimize Player"
              >
                ✕
              </button>

              <div>
                <div style={{
                  fontSize: '0.98rem',
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: currentTheme.text
                }}>
                  <span>SNEHA'S SPOTIFY</span>
                  <span style={{
                    fontSize: '0.65rem',
                    background: currentTheme.accent,
                    color: '#fff',
                    padding: '1px 6px',
                    borderRadius: 999,
                    fontWeight: 800
                  }}>
                    PRO
                  </span>
                </div>
                <div style={{ fontSize: '0.68rem', color: currentTheme.textSub }}>
                  Autoplay • Karaoke Lyrics • Endless Music
                </div>
              </div>
            </div>

            {/* Right: Theme Switcher Pills */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {Object.values(SPOTIFY_THEMES).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setThemeId(t.id)}
                  title={t.name}
                  style={{
                    border: themeId === t.id ? `2px solid ${t.accent}` : '1px solid rgba(255,255,255,0.15)',
                    background: themeId === t.id ? t.surface : 'transparent',
                    color: t.text,
                    fontSize: '0.8rem',
                    padding: '4px 8px',
                    borderRadius: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  <span>{t.icon}</span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, display: window.innerWidth < 480 ? 'none' : 'inline' }}>
                    {t.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: `1px solid ${currentTheme.border}`,
            background: currentTheme.surface,
            padding: '0 12px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            flexShrink: 0
          }}>
            {[
              { id: 'home', label: '🏠 Home' },
              { id: 'search', label: '🔍 Search Any' },
              { id: 'liked', label: `💚 Liked (${likedIds.length})` },
              { id: 'lyrics', label: '📜 Lyrics' },
              { id: 'queue', label: `📋 Queue (${queue.length})` }
            ].map((tab) => {
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: active ? currentTheme.accentText : currentTheme.textSub,
                    fontWeight: active ? 800 : 600,
                    fontSize: '0.84rem',
                    padding: '10px 14px',
                    cursor: 'pointer',
                    position: 'relative',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                  {active && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 10,
                        right: 10,
                        height: 3,
                        background: currentTheme.accent,
                        borderRadius: 999
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Middle Body Content Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            position: 'relative',
            background: currentTheme.bg
          }}>
            {/* TAB 1: HOME */}
            {activeTab === 'home' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Greeting & Now Playing Vinyl Spotlight */}
                <div style={{
                  background: currentTheme.surface,
                  border: `1px solid ${currentTheme.border}`,
                  borderRadius: 20,
                  padding: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  flexWrap: 'wrap'
                }}>
                  <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ repeat: Infinity, duration: 9, ease: 'linear' }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: `3px solid ${currentTheme.accent}`,
                      boxShadow: `0 0 20px ${currentTheme.accent}50`
                    }}
                  >
                    <img
                      src={currentTrack.image}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.currentTarget.src = 'assets/3d-emoji/sparkling_heart.png' }}
                    />
                  </motion.div>

                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontSize: '0.72rem', color: currentTheme.accentText, fontWeight: 800 }}>
                      NOW PLAYING • AUTOPLAY ACTIVE
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: currentTheme.text }}>
                      {currentTrack.title}
                    </div>
                    <div style={{ fontSize: '0.84rem', color: currentTheme.textSub, fontWeight: 600 }}>
                      {currentTrack.artist} • {currentTrack.album || 'Single'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => setActiveTab('lyrics')}
                      style={{
                        border: `1px solid ${currentTheme.border}`,
                        background: 'transparent',
                        color: currentTheme.text,
                        padding: '8px 14px',
                        borderRadius: 999,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      📜 View Lyrics
                    </button>
                    <button
                      onClick={togglePlay}
                      style={{
                        border: 'none',
                        background: currentTheme.accent,
                        color: '#fff',
                        padding: '8px 18px',
                        borderRadius: 999,
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: `0 4px 14px ${currentTheme.accent}50`
                      }}
                    >
                      {isPlaying ? '⏸ Pause' : '▶ Play'}
                    </button>
                  </div>
                </div>

                {/* Featured Playlists Carousel */}
                <div>
                  <h3 style={{ margin: '0 0 12px', fontSize: '1.05rem', fontWeight: 900, color: currentTheme.text }}>
                    Curated Playlists For Sneha 💖
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 12
                  }}>
                    {SPOTIFY_PLAYLISTS.map((pl) => (
                      <motion.div
                        key={pl.id}
                        whileHover={{ y: -3, scale: 1.02 }}
                        onClick={() => playPlaylist(pl)}
                        style={{
                          background: currentTheme.surface,
                          border: `1px solid ${currentTheme.border}`,
                          borderRadius: 18,
                          padding: '14px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <img
                            src={pl.cover}
                            alt=""
                            style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', marginBottom: 10 }}
                          />
                          <div style={{ fontSize: '0.92rem', fontWeight: 800, color: currentTheme.text, marginBottom: 4 }}>
                            {pl.title}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: currentTheme.textSub, lineHeight: 1.4 }}>
                            {pl.description}
                          </div>
                        </div>
                        <div style={{
                          marginTop: 12,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{ fontSize: '0.72rem', color: currentTheme.accentText, fontWeight: 700 }}>
                            {pl.songIds.length} Songs
                          </span>
                          <span style={{
                            background: currentTheme.accent,
                            color: '#fff',
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem'
                          }}>
                            ▶
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* All Curated Hits */}
                <div>
                  <h3 style={{ margin: '0 0 12px', fontSize: '1.05rem', fontWeight: 900, color: currentTheme.text }}>
                    Romantic & Lo-Fi Vault 🎶
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {CURATED_SONGS.map((song, idx) => {
                      const isCurrent = currentTrack.id === song.id
                      const liked = isLiked(song.id)
                      return (
                        <motion.div
                          key={song.id}
                          whileHover={{ x: 3 }}
                          onClick={() => playTrack(song, CURATED_SONGS)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 12px',
                            borderRadius: 14,
                            background: isCurrent ? currentTheme.surface : 'transparent',
                            border: isCurrent ? `1.5px solid ${currentTheme.accent}` : `1px solid ${currentTheme.border}`,
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                            <span style={{
                              fontSize: '0.76rem',
                              fontWeight: 800,
                              color: isCurrent ? currentTheme.accentText : currentTheme.textSub,
                              width: 20
                            }}>
                              {isCurrent && isPlaying ? '▶' : idx + 1}
                            </span>
                            <img
                              src={song.image}
                              alt=""
                              style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }}
                              onError={(e) => { e.currentTarget.src = 'assets/3d-emoji/sparkling_heart.png' }}
                            />
                            <div style={{ minWidth: 0 }}>
                              <div style={{
                                fontSize: '0.86rem',
                                fontWeight: 800,
                                color: isCurrent ? currentTheme.accentText : currentTheme.text,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                {song.title}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: currentTheme.textSub }}>
                                {song.artist}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleLike(song.id)
                              }}
                              style={{
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                padding: 2
                              }}
                            >
                              {liked ? '💖' : '🤍'}
                            </button>
                            <span style={{ fontSize: '0.74rem', color: currentTheme.textSub, minWidth: 32, textAlign: 'right' }}>
                              {song.duration}
                            </span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SEARCH */}
            {activeTab === 'search' && (
              <div>
                <div style={{ position: 'relative', marginBottom: 12 }}>
                  <input
                    type="text"
                    placeholder="Search any Bollywood, Punjabi, English song or singer..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 40px 12px 16px',
                      borderRadius: 16,
                      background: currentTheme.surface,
                      border: `2px solid ${currentTheme.border}`,
                      color: currentTheme.text,
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      outline: 'none',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
                    }}
                  />
                  <span style={{ position: 'absolute', right: 14, top: 13, fontSize: '1rem', pointerEvents: 'none' }}>
                    {isSearching ? '⏳' : '🔍'}
                  </span>
                </div>

                {/* Quick Recommendation Chips */}
                <div style={{
                  display: 'flex',
                  gap: 6,
                  overflowX: 'auto',
                  paddingBottom: 10,
                  marginBottom: 14,
                  scrollbarWidth: 'none'
                }}>
                  {SEARCH_CHIPS.map((chip, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearch(chip)}
                      style={{
                        border: `1px solid ${currentTheme.border}`,
                        background: currentTheme.surface,
                        color: currentTheme.text,
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '5px 12px',
                        borderRadius: 999,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Search Results */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {searchResults.map((song) => {
                    const isCurrent = currentTrack.id === song.id
                    const liked = isLiked(song.id)
                    return (
                      <motion.div
                        key={song.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => playTrack(song, [song, ...queue])}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          borderRadius: 14,
                          background: isCurrent ? currentTheme.surface : 'transparent',
                          border: isCurrent ? `1.5px solid ${currentTheme.accent}` : `1px solid ${currentTheme.border}`,
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                          <img
                            src={song.image}
                            alt=""
                            style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover' }}
                            onError={(e) => { e.currentTarget.src = 'assets/3d-emoji/sparkling_heart.png' }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <div style={{
                              fontSize: '0.88rem',
                              fontWeight: 800,
                              color: isCurrent ? currentTheme.accentText : currentTheme.text,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {song.title}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: currentTheme.textSub }}>
                              {song.artist}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleLike(song.id)
                            }}
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.1rem' }}
                          >
                            {liked ? '💖' : '🤍'}
                          </button>
                          <span style={{
                            background: currentTheme.accent,
                            color: '#fff',
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.85rem'
                          }}>
                            ▶
                          </span>
                        </div>
                      </motion.div>
                    )
                  })}

                  {searchResults.length === 0 && !isSearching && (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: currentTheme.textSub }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>🎧</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: currentTheme.text, marginBottom: 4 }}>
                        Search any song for Sneha
                      </div>
                      <p style={{ fontSize: '0.82rem', margin: 0 }}>
                        Arijit Singh, Vilen, Anuv Jain, ya Taylor Swift ka koi bhi gaana dhoondho aur turant bajao!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: LIKED SONGS (WISHLIST) */}
            {activeTab === 'liked' && (
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
                  borderRadius: 22,
                  padding: '24px 20px',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 18,
                  boxShadow: '0 10px 30px rgba(244, 63, 94, 0.35)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      PLAYLIST • SNEHA'S WISHLIST
                    </div>
                    <h2 style={{ margin: '4px 0 6px', fontSize: '1.6rem', fontWeight: 900 }}>
                      Liked Songs 💖
                    </h2>
                    <div style={{ fontSize: '0.82rem', opacity: 0.9 }}>
                      {likedSongsList.length} favorite songs saved permanently
                    </div>
                  </div>

                  {likedSongsList.length > 0 && (
                    <button
                      onClick={playAllLiked}
                      style={{
                        border: 'none',
                        background: '#ffffff',
                        color: '#be123c',
                        padding: '10px 22px',
                        borderRadius: 999,
                        fontSize: '0.9rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                      }}
                    >
                      ▶ Play All
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {likedSongsList.length > 0 ? (
                    likedSongsList.map((song, idx) => {
                      const isCurrent = currentTrack.id === song.id
                      return (
                        <div
                          key={song.id}
                          onClick={() => playTrack(song, likedSongsList)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 12px',
                            borderRadius: 14,
                            background: isCurrent ? currentTheme.surface : 'transparent',
                            border: isCurrent ? `1.5px solid ${currentTheme.accent}` : `1px solid ${currentTheme.border}`,
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                            <span style={{ fontSize: '0.76rem', color: currentTheme.textSub, width: 20 }}>
                              {idx + 1}
                            </span>
                            <img
                              src={song.image}
                              alt=""
                              style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }}
                              onError={(e) => { e.currentTarget.src = 'assets/3d-emoji/sparkling_heart.png' }}
                            />
                            <div style={{ minWidth: 0 }}>
                              <div style={{
                                fontSize: '0.86rem',
                                fontWeight: 800,
                                color: isCurrent ? currentTheme.accentText : currentTheme.text,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                {song.title}
                              </div>
                              <div style={{ fontSize: '0.72rem', color: currentTheme.textSub }}>
                                {song.artist}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleLike(song.id)
                              }}
                              style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.1rem' }}
                            >
                              💖
                            </button>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: currentTheme.textSub }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>🤍</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: currentTheme.text, marginBottom: 4 }}>
                        Aapki Wishlist Khaali Hai
                      </div>
                      <p style={{ fontSize: '0.82rem', margin: 0 }}>
                        Kisi bhi song par ❤️ (heart) click karein aur wo yahan hamesha ke liye save ho jayega!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: LYRICS */}
            {activeTab === 'lyrics' && (
              <LyricsViewer />
            )}

            {/* TAB 5: QUEUE */}
            {activeTab === 'queue' && (
              <div>
                <h3 style={{ margin: '0 0 12px', fontSize: '1rem', fontWeight: 800, color: currentTheme.text }}>
                  Now Playing
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 16,
                  background: currentTheme.surface,
                  border: `1.5px solid ${currentTheme.accent}`,
                  marginBottom: 20
                }}>
                  <img
                    src={currentTrack.image}
                    alt=""
                    style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: currentTheme.accentText }}>
                      {currentTrack.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: currentTheme.textSub }}>
                      {currentTrack.artist}
                    </div>
                  </div>
                </div>

                <h3 style={{ margin: '0 0 12px', fontSize: '1rem', fontWeight: 800, color: currentTheme.text }}>
                  Next In Queue (Autoplay Next)
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {queue.map((song, i) => (
                    <div
                      key={i}
                      onClick={() => playTrack(song, queue)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: 12,
                        background: currentTrack.id === song.id ? currentTheme.surface : 'transparent',
                        border: `1px solid ${currentTheme.border}`,
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <span style={{ fontSize: '0.75rem', color: currentTheme.textSub, width: 20 }}>
                          {i + 1}
                        </span>
                        <div style={{ minWidth: 0 }}>
                          <div style={{
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            color: currentTrack.id === song.id ? currentTheme.accentText : currentTheme.text,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {song.title}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: currentTheme.textSub }}>
                            {song.artist}
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.74rem', color: currentTheme.textSub }}>
                        {song.duration || '3:00'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Persistent Control Bar */}
          <div style={{
            background: currentTheme.surface,
            borderTop: `1px solid ${currentTheme.border}`,
            padding: '12px 18px',
            flexShrink: 0
          }}>
            {/* Scrubber Progress Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: '0.72rem', color: currentTheme.textSub, minWidth: 32 }}>
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={(e) => seekTo(Number(e.target.value))}
                style={{
                  flex: 1,
                  accentColor: currentTheme.accent,
                  cursor: 'pointer',
                  height: 4
                }}
              />
              <span style={{ fontSize: '0.72rem', color: currentTheme.textSub, minWidth: 32, textAlign: 'right' }}>
                {formatTime(duration)}
              </span>
            </div>

            {/* Playback Control Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 10
            }}>
              {/* Left: Quick Track Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 160 }}>
                <button
                  onClick={() => toggleLike(currentTrack.id)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    padding: 0
                  }}
                  title="Wishlist"
                >
                  {isLiked(currentTrack.id) ? '💖' : '🤍'}
                </button>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    color: currentTheme.text,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: 160
                  }}>
                    {currentTrack.title}
                  </div>
                  <div style={{
                    fontSize: '0.68rem',
                    color: currentTheme.textSub,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: 160
                  }}>
                    {currentTrack.artist}
                  </div>
                </div>
              </div>

              {/* Center: Play, Prev, Next, Shuffle, Repeat */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {/* Shuffle */}
                <button
                  onClick={toggleShuffle}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: isShuffle ? currentTheme.accentText : currentTheme.textSub,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    padding: 4
                  }}
                  title={isShuffle ? 'Shuffle On' : 'Shuffle Off'}
                >
                  🔀
                </button>

                {/* Previous */}
                <button
                  onClick={prevTrack}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: currentTheme.text,
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    padding: 4
                  }}
                  title="Previous Track"
                >
                  ⏮
                </button>

                {/* Big Play/Pause */}
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={togglePlay}
                  style={{
                    border: 'none',
                    background: currentTheme.accent,
                    color: '#fff',
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    boxShadow: `0 4px 16px ${currentTheme.accent}60`
                  }}
                >
                  {isPlaying ? '⏸' : '▶'}
                </motion.button>

                {/* Next */}
                <button
                  onClick={nextTrack}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: currentTheme.text,
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    padding: 4
                  }}
                  title="Next Track"
                >
                  ⏭
                </button>

                {/* Repeat */}
                <button
                  onClick={toggleRepeat}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: repeatMode !== 'off' ? currentTheme.accentText : currentTheme.textSub,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    padding: 4,
                    position: 'relative'
                  }}
                  title={`Repeat: ${repeatMode}`}
                >
                  🔁
                  {repeatMode === 'one' && (
                    <span style={{
                      position: 'absolute',
                      top: -2,
                      right: -4,
                      fontSize: '0.6rem',
                      fontWeight: 900,
                      background: currentTheme.accent,
                      color: '#fff',
                      borderRadius: '50%',
                      width: 12,
                      height: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      1
                    </span>
                  )}
                </button>
              </div>

              {/* Right: Volume Slider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button
                  onClick={toggleMute}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  {isMuted || volume === 0 ? '🔇' : '🔊'}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.02}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => changeVolume(Number(e.target.value))}
                  style={{
                    width: 70,
                    accentColor: currentTheme.accent,
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
