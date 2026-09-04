import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import { CURATED_SONGS, SPOTIFY_PLAYLISTS } from '../../data/musicLibrary.js'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function SpotifyHomeView({ onSelectPlaylist }) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useMusicPlayer()
  const greeting = getGreeting()

  // 6 Quick-Access items
  const quickAccessItems = [
    {
      id: 'liked',
      title: 'Liked Songs',
      type: 'playlist',
      gradient: 'linear-gradient(135deg, #450af5, #c4efd9)',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      )
    },
    ...CURATED_SONGS.slice(0, 5).map((song) => ({
      id: song.id,
      title: song.title,
      type: 'song',
      image: song.image,
      songObj: song
    }))
  ]

  return (
    <div style={{ padding: '0 24px 80px', display: 'flex', flexDirection: 'column', gap: 36 }}>
      {/* 👑 Top Dynamic Greeting */}
      <div>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 900,
          color: '#ffffff',
          margin: '0 0 20px',
          letterSpacing: '-0.03em'
        }}>
          {greeting}, Sneha 💖
        </h1>

        {/* 6 Quick-Access Rectangle Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 12
        }}>
          {quickAccessItems.map((item) => {
            const isThisPlaying = item.type === 'song' && currentTrack?.id === item.id && isPlaying
            return (
              <QuickAccessCard
                key={item.id}
                item={item}
                isThisPlaying={isThisPlaying}
                onPlay={() => {
                  if (item.type === 'song') {
                    if (currentTrack?.id === item.id) {
                      togglePlay()
                    } else {
                      playTrack(item.songObj, CURATED_SONGS)
                    }
                  } else {
                    onSelectPlaylist && onSelectPlaylist({ id: 'liked', title: 'Liked Songs' })
                  }
                }}
              />
            )
          })}
        </div>
      </div>

      {/* SHELF 1: Made For Sneha */}
      <ShelfSection title="Made For Sneha">
        {SPOTIFY_PLAYLISTS.map((pl) => (
          <PlaylistCard
            key={pl.id}
            playlist={pl}
            onClick={() => onSelectPlaylist && onSelectPlaylist(pl)}
          />
        ))}
      </ShelfSection>

      {/* SHELF 2: Teddy's Special Picks (Vilen & Indie) */}
      <ShelfSection title="Teddy's Special Picks 🧸">
        {CURATED_SONGS.filter((s) => s.theme === 'vilen' || s.theme === 'indie').map((song) => (
          <SongSquareCard
            key={song.id}
            song={song}
            isCurrent={currentTrack?.id === song.id}
            isPlaying={isPlaying}
            onPlay={() => {
              if (currentTrack?.id === song.id) togglePlay()
              else playTrack(song, CURATED_SONGS)
            }}
          />
        ))}
      </ShelfSection>

      {/* SHELF 3: Romantic Bollywood Melodies */}
      <ShelfSection title="Romantic Bollywood Hits 💫">
        {CURATED_SONGS.filter((s) => s.theme === 'romantic').map((song) => (
          <SongSquareCard
            key={song.id}
            song={song}
            isCurrent={currentTrack?.id === song.id}
            isPlaying={isPlaying}
            onPlay={() => {
              if (currentTrack?.id === song.id) togglePlay()
              else playTrack(song, CURATED_SONGS)
            }}
          />
        ))}
      </ShelfSection>

      {/* SHELF 4: Late Night Lo-Fi & Chill */}
      <ShelfSection title="Late Night Chill & Lo-Fi 🌙">
        {CURATED_SONGS.filter((s) => s.theme === 'lofi').map((song) => (
          <SongSquareCard
            key={song.id}
            song={song}
            isCurrent={currentTrack?.id === song.id}
            isPlaying={isPlaying}
            onPlay={() => {
              if (currentTrack?.id === song.id) togglePlay()
              else playTrack(song, CURATED_SONGS)
            }}
          />
        ))}
      </ShelfSection>
    </div>
  )
}

function QuickAccessCard({ item, isThisPlaying, onPlay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onPlay}
      style={{
        height: 64,
        background: hovered ? '#383838' : '#282828',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'background 0.2s',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: '100%', minWidth: 0 }}>
        {item.gradient ? (
          <div style={{
            width: 64,
            height: 64,
            background: item.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {item.icon}
          </div>
        ) : (
          <img
            src={item.image}
            alt=""
            style={{ width: 64, height: 64, objectFit: 'cover', flexShrink: 0 }}
            onError={(e) => { e.currentTarget.src = 'assets/3d-emoji/sparkling_heart.png' }}
          />
        )}
        <span style={{
          fontSize: '14px',
          fontWeight: 700,
          color: '#ffffff',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          paddingRight: 10
        }}>
          {item.title}
        </span>
      </div>

      {/* Floating Green Play Button on Hover */}
      {(hovered || isThisPlaying) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            marginRight: 12,
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#1ed760',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
            color: '#000000',
            flexShrink: 0
          }}
        >
          {isThisPlaying ? (
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: 2 }}>
              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/>
            </svg>
          )}
        </motion.div>
      )}
    </div>
  )
}

function ShelfSection({ title, children }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
          {title}
        </h2>
        <span style={{ fontSize: '13px', fontWeight: 700, color: '#b3b3b3', cursor: 'pointer' }}>
          Show all
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 20
      }}>
        {children}
      </div>
    </div>
  )
}

function PlaylistCard({ playlist, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: hovered ? '#282828' : '#181818',
        padding: 16,
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'background 0.2s',
        position: 'relative'
      }}
    >
      <div style={{ position: 'relative', marginBottom: 14 }}>
        <img
          src={playlist.cover}
          alt=""
          style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 6 }}
          onError={(e) => { e.currentTarget.src = 'assets/3d-emoji/sparkling_heart.png' }}
        />
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              right: 8,
              bottom: 8,
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#1ed760',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
              color: '#000000'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: 2 }}>
              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/>
            </svg>
          </motion.div>
        )}
      </div>

      <div style={{
        fontSize: '15px',
        fontWeight: 700,
        color: '#ffffff',
        marginBottom: 6,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {playlist.title}
      </div>
      <div style={{
        fontSize: '12px',
        color: '#b3b3b3',
        lineHeight: 1.4,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {playlist.description}
      </div>
    </div>
  )
}

function SongSquareCard({ song, isCurrent, isPlaying, onPlay }) {
  const [hovered, setHovered] = useState(false)
  const isThisPlaying = isCurrent && isPlaying

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onPlay}
      style={{
        background: hovered ? '#282828' : '#181818',
        padding: 16,
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'background 0.2s',
        position: 'relative'
      }}
    >
      <div style={{ position: 'relative', marginBottom: 14 }}>
        <img
          src={song.image}
          alt=""
          style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 6 }}
          onError={(e) => { e.currentTarget.src = 'assets/3d-emoji/sparkling_heart.png' }}
        />
        {(hovered || isThisPlaying) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              right: 8,
              bottom: 8,
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#1ed760',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
              color: '#000000'
            }}
          >
            {isThisPlaying ? (
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: 2 }}>
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/>
              </svg>
            )}
          </motion.div>
        )}
      </div>

      <div style={{
        fontSize: '15px',
        fontWeight: 700,
        color: isCurrent ? '#1ed760' : '#ffffff',
        marginBottom: 6,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {song.title}
      </div>
      <div style={{
        fontSize: '12px',
        color: '#b3b3b3',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {song.artist}
      </div>
    </div>
  )
}
