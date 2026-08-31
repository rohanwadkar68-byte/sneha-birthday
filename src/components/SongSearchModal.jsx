import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playSparkle, changeBGM, getCurrentBGMTitle } from '../utils/audio.js'

// Curated Romantic Hits & Lo-Fi Presets
const PRESET_SONGS = [
  {
    id: 'default',
    title: 'Cozy Birthday Lo-Fi (Default)',
    artist: 'Sneha Birthday Mix',
    image: 'assets/3d-emoji/birthday_cake.png',
    url: 'assets/audio/bgm.mp3'
  },
  {
    id: 'chidiya',
    title: 'Chidiya',
    artist: 'Vilen',
    image: 'assets/3d-emoji/sparkling_heart.png',
    url: 'assets/audio/song-2-chidiya.mp3'
  },
  {
    id: 'vilen_special',
    title: 'Kyun - Acoustic Special',
    artist: 'Vilen',
    image: 'assets/3d-emoji/two_hearts.png',
    url: 'assets/audio/song-1-vilen.mp3'
  }
]

const SUGGESTIONS = [
  'Arijit Singh Romantic',
  'Anuv Jain Husn',
  'Vilen Chidiya',
  'Tu Hai Kahan',
  'Taylor Swift Lover',
  'Kesariya',
  'Pehla Nasha',
  'Until I Found You'
]

export default function SongSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(PRESET_SONGS)
  const [activeTitle, setActiveTitle] = useState(getCurrentBGMTitle())
  const [selectedSuccess, setSelectedSuccess] = useState(null)
  const debounceRef = useRef(null)

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm)
    if (!searchTerm.trim()) {
      setResults(PRESET_SONGS)
      setLoading(false)
      return
    }

    setLoading(true)
    clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      try {
        let url = 'https://saavn.dev/api/search/songs?query=' + encodeURIComponent(searchTerm)
        let res = await fetch(url).catch(() => null)

        if (!res || !res.ok) {
          url = 'https://jiosaavn-api-privatecvc2.vercel.app/search/songs?query=' + encodeURIComponent(searchTerm)
          res = await fetch(url).catch(() => null)
        }

        if (res && res.ok) {
          const data = await res.json()
          const items = data?.data?.results || data?.results || []

          if (items.length > 0) {
            const formatted = items.slice(0, 10).map((item) => {
              const dlUrl =
                item.downloadUrl?.[item.downloadUrl.length - 1]?.url ||
                item.downloadUrl?.[0]?.url ||
                item.media_url ||
                item.url

              const imgUrl =
                item.image?.[item.image.length - 1]?.url ||
                item.image?.[0]?.url ||
                item.image ||
                'assets/3d-emoji/sparkling_heart.png'

              return {
                id: item.id || String(Math.random()),
                title: item.name || item.title || 'Romantic Track',
                artist: item.primaryArtists || item.artist || item.singers || 'Artist',
                image: imgUrl,
                url: dlUrl
              }
            }).filter((i) => !!i.url)

            if (formatted.length > 0) {
              setResults(formatted)
              setLoading(false)
              return
            }
          }
        }
      } catch (err) {
        console.warn('Search API error, showing presets', err)
      }

      const filtered = PRESET_SONGS.filter(
        (s) =>
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setResults(filtered.length > 0 ? filtered : PRESET_SONGS)
      setLoading(false)
    }, 400)
  }

  const handleSelectSong = (song) => {
    playSparkle()
    changeBGM(song.url, song.title)
    setActiveTitle(song.title)
    setSelectedSuccess(song.title)
    setTimeout(() => {
      setSelectedSuccess(null)
      onClose()
    }, 1200)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="cat-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ zIndex: 999999, padding: 14 }}
      >
        <motion.div
          className="cat-card"
          initial={{ scale: 0.85, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 30, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: 480,
            width: '100%',
            maxHeight: '84vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 16px',
            borderRadius: 24,
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(247, 85, 138, 0.25)',
            border: '2px solid rgba(255, 255, 255, 0.9)'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src="assets/3d-emoji/sparkles.png" alt="" style={{ width: 28, height: 28 }} />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--rose-deep)', fontWeight: 800 }}>
                  Mommy's Music Changer 🎧
                </h3>
                <span style={{ fontSize: '0.74rem', color: 'var(--ink-soft)', fontWeight: 600 }}>
                  Background me bajne wala song choose karein
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                border: 'none',
                background: 'rgba(0,0,0,0.05)',
                width: 32,
                height: 32,
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>
          </div>

          {/* Currently Playing Badge */}
          <div
            style={{
              background: 'linear-gradient(135deg, #fff0f6, #ffe6f2)',
              padding: '6px 14px',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
              border: '1px solid rgba(247, 85, 138, 0.2)'
            }}
          >
            <span style={{ fontSize: '0.78rem', color: 'var(--rose-deep)', fontWeight: 700 }}>
              🎵 Playing Now:
            </span>
            <span
              style={{
                fontSize: '0.78rem',
                color: 'var(--ink)',
                fontWeight: 800,
                maxWidth: 240,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {activeTitle}
            </span>
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', marginBottom: 10 }}>
            <input
              type="text"
              placeholder="Search any song / artist (Arijit, Vilen, Taylor Swift)..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 38px 12px 14px',
                borderRadius: 14,
                border: '2px solid rgba(247, 85, 138, 0.3)',
                fontSize: '0.9rem',
                outline: 'none',
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                fontFamily: 'inherit',
                fontWeight: 600
              }}
            />
            <span style={{ position: 'absolute', right: 12, top: 12, fontSize: '1rem', pointerEvents: 'none' }}>
              {loading ? '⏳' : '🔍'}
            </span>
          </div>

          {/* Quick Suggestions Chips */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 8, scrollbarWidth: 'none' }}>
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSearch(s)}
                style={{
                  border: 'none',
                  background: 'rgba(255, 238, 246, 0.9)',
                  color: 'var(--rose-deep)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 999,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              paddingRight: 4,
              maxHeight: '44vh'
            }}
          >
            {results.map((song) => {
              const isCurrent = activeTitle === song.title
              return (
                <motion.div
                  key={song.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectSong(song)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 14,
                    background: isCurrent ? 'linear-gradient(135deg, #ffeef6, #fff5f8)' : '#fff',
                    border: isCurrent ? '1.5px solid var(--rose-deep)' : '1px solid rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
                    <img
                      src={song.image}
                      alt=""
                      style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
                      onError={(e) => {
                        e.target.src = 'assets/3d-emoji/sparkling_heart.png'
                      }}
                    />
                    <div style={{ overflow: 'hidden' }}>
                      <div
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: 800,
                          color: 'var(--ink)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {song.title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          color: 'var(--ink-soft)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {song.artist}
                      </div>
                    </div>
                  </div>

                  <button
                    style={{
                      border: 'none',
                      background: isCurrent ? 'var(--rose-deep)' : 'rgba(247, 85, 138, 0.12)',
                      color: isCurrent ? '#fff' : 'var(--rose-deep)',
                      padding: '6px 12px',
                      borderRadius: 999,
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    {isCurrent ? 'Playing 🎵' : 'Play 🎧'}
                  </button>
                </motion.div>
              )
            })}
          </div>

          {/* Success Toast */}
          <AnimatePresence>
            {selectedSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  background: 'var(--rose-deep)',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: 999,
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  textAlign: 'center',
                  marginTop: 10,
                  boxShadow: '0 4px 14px rgba(247, 85, 138, 0.35)'
                }}
              >
                ✓ Set as Background Music: {selectedSuccess} 🎶
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}