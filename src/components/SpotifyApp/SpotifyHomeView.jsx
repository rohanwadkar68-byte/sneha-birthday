import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import { CURATED_SONGS, SPOTIFY_PLAYLISTS, DEFAULT_ALBUM_COVER } from '../../data/musicLibrary.js'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function SpotifyHomeView({ onSelectPlaylist }) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useMusicPlayer()
  const greeting = getGreeting()

  const quickAccessItems = [
    {
      id: 'liked',
      title: 'Liked Songs',
      type: 'playlist',
      gradient: 'linear-gradient(135deg, #450af5, #8e8ee5)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
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
    <div style={{ padding: '0 16px 80px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Dynamic Greeting */}
      <div>
        <h1 style={{
          fontSize: 'clamp(22px, 4vw, 32px)',
          fontWeight: 900,
          color: '#ffffff',
          margin: '0 0 16px',
          letterSpacing: '-0.03em'
        }}>
          {greeting}
        </h1>

        {/* 6 Quick-Access Cards Grid (Responsive 2 columns on mobile, 3 columns on desktop) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 150px), 1fr))',
          gap: 8
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

      {/* SHELF 1: Playlists */}
      <ShelfSection title="Featured Playlists">
        {SPOTIFY_PLAYLISTS.map((pl) => (
          <PlaylistCard
            key={pl.id}
            playlist={pl}
            onClick={() => onSelectPlaylist && onSelectPlaylist(pl)}
          />
        ))}
      </ShelfSection>

      {/* SHELF 2: Romantic Hits */}
      <ShelfSection title="Romantic Melodies">
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

      {/* SHELF 3: Pop & Indie */}
      <ShelfSection title="Pop & Indie Favorites">
        {CURATED_SONGS.filter((s) => s.theme === 'pop' || s.theme === 'indie').map((song) => (
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

      {/* SHELF 4: Lo-Fi */}
      <ShelfSection title="Lo-Fi & Relax">
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
        height: 52,
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: '100%', minWidth: 0, flex: 1, paddingRight: 6 }}>
        {item.gradient ? (
          <div style={{
            width: 52,
            height: 52,
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
            style={{ width: 52, height: 52, objectFit: 'cover', flexShrink: 0 }}
            onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
          />
        )}
        <span style={{
          fontSize: '12px',
          fontWeight: 700,
          color: '#ffffff',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {item.title}
        </span>
      </div>

      {(hovered || isThisPlaying) && (
        <div style={{
          marginRight: 8,
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#1ed760',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000000',
          flexShrink: 0,
          boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
        }}>
          {isThisPlaying ? (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: 1 }}>
              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/>
            </svg>
          )}
        </div>
      )}
    </div>
  )
}

function ShelfSection({ title, children }) {
  return (
    <div>
      <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: '0 0 14px' }}>
        {title}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 140px), 1fr))',
        gap: 14
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
        padding: 12,
        borderRadius: 6,
        cursor: 'pointer',
        transition: 'background 0.2s',
        position: 'relative'
      }}
    >
      <img
        src={playlist.cover}
        alt=""
        style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 4, marginBottom: 10 }}
        onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
      />
      <div style={{
        fontSize: '13px',
        fontWeight: 700,
        color: '#ffffff',
        marginBottom: 4,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {playlist.title}
      </div>
      <div style={{
        fontSize: '11px',
        color: '#b3b3b3',
        lineHeight: 1.3,
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
        padding: 12,
        borderRadius: 6,
        cursor: 'pointer',
        transition: 'background 0.2s',
        position: 'relative'
      }}
    >
      <img
        src={song.image}
        alt=""
        style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 4, marginBottom: 10 }}
        onError={(e) => { e.currentTarget.src = DEFAULT_ALBUM_COVER }}
      />
      <div style={{
        fontSize: '13px',
        fontWeight: 700,
        color: isCurrent ? '#1ed760' : '#ffffff',
        marginBottom: 4,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {song.title}
      </div>
      <div style={{
        fontSize: '11px',
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
