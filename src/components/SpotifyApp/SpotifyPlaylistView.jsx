import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import { CURATED_SONGS } from '../../data/musicLibrary.js'

export default function SpotifyPlaylistView({ playlist }) {
  const { currentTrack, isPlaying, playTrack, togglePlay, likedIds, isLiked, toggleLike } = useMusicPlayer()

  const isLikedPlaylist = playlist?.id === 'liked'

  const songs = isLikedPlaylist
    ? CURATED_SONGS.filter((s) => likedIds.includes(s.id))
    : CURATED_SONGS.filter((s) => playlist?.songIds?.includes(s.id) || false)

  const isCurrentPlaylistPlaying = songs.some((s) => s.id === currentTrack?.id) && isPlaying

  const handlePlayAll = () => {
    if (songs.length === 0) return
    if (isCurrentPlaylistPlaying) {
      togglePlay()
    } else {
      const startSong = songs.find((s) => s.id === currentTrack?.id) || songs[0]
      playTrack(startSong, songs)
    }
  }

  return (
    <div style={{ padding: '0 16px 80px' }}>
      {/* PLAYLIST HEADER */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 20,
        paddingBottom: 20,
        marginBottom: 20,
        flexWrap: 'wrap'
      }}>
        {isLikedPlaylist ? (
          <div style={{
            width: 'clamp(140px, 30vw, 192px)',
            height: 'clamp(140px, 30vw, 192px)',
            borderRadius: 6,
            background: 'linear-gradient(135deg, #450af5, #8e8ee5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
            flexShrink: 0
          }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        ) : (
          <img
            src={playlist?.cover}
            alt=""
            style={{
              width: 'clamp(140px, 30vw, 192px)',
              height: 'clamp(140px, 30vw, 192px)',
              borderRadius: 6,
              objectFit: 'cover',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              flexShrink: 0
            }}
            onError={(e) => { e.currentTarget.src = 'assets/3d-emoji/sparkling_heart.png' }}
          />
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0, flex: 1 }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#b3b3b3', letterSpacing: '0.05em' }}>
            Playlist
          </span>
          <h1 style={{
            fontSize: 'clamp(24px, 5vw, 48px)',
            fontWeight: 900,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-0.03em',
            lineHeight: 1.1
          }}>
            {isLikedPlaylist ? 'Liked Songs' : playlist?.title}
          </h1>
          <p style={{ fontSize: '13px', color: '#b3b3b3', margin: 0, lineHeight: 1.4 }}>
            {isLikedPlaylist ? 'Your personal saved collection.' : playlist?.description}
          </p>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff' }}>
            {songs.length} songs
          </div>
        </div>
      </div>

      {/* PLAY BUTTON */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayAll}
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: '#1ed760',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
            color: '#000000'
          }}
          title={isCurrentPlaylistPlaying ? 'Pause' : 'Play'}
        >
          {isCurrentPlaylistPlaying ? (
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: 2 }}>
              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/>
            </svg>
          )}
        </motion.button>
      </div>

      {/* TRACKS LIST */}
      {songs.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {songs.map((song, idx) => {
            const isThisTrackCurrent = currentTrack?.id === song.id
            const isThisPlaying = isThisTrackCurrent && isPlaying

            return (
              <PlaylistTrackRow
                key={song.id}
                index={idx + 1}
                song={song}
                isCurrent={isThisTrackCurrent}
                isPlaying={isThisPlaying}
                isLiked={isLiked(song.id)}
                onLike={() => toggleLike(song.id)}
                onPlay={() => {
                  if (isThisTrackCurrent) togglePlay()
                  else playTrack(song, songs)
                }}
              />
            )
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#b3b3b3' }}>
          <div style={{ fontSize: '36px', marginBottom: 12 }}>🤍</div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: '0 0 6px' }}>
            No songs here yet
          </h3>
          <p style={{ fontSize: '13px', margin: 0 }}>
            Tap the heart icon on any song to save it to your Liked Songs.
          </p>
        </div>
      )}
    </div>
  )
}

function PlaylistTrackRow({ index, song, isCurrent, isPlaying, isLiked, onLike, onPlay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onPlay}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        borderRadius: 4,
        background: hovered ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.15s',
        gap: 12
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
        <img
          src={song.image}
          alt=""
          style={{ width: 42, height: 42, borderRadius: 4, objectFit: 'cover', flexShrink: 0 }}
          onError={(e) => { e.currentTarget.src = 'assets/3d-emoji/sparkling_heart.png' }}
        />
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
            color: isCurrent ? '#1ed760' : '#ffffff',
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
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onLike()
          }}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: 4,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {isLiked ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1ed760">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          )}
        </button>

        <span style={{ fontSize: '12px', color: '#b3b3b3' }}>
          {song.duration || '3:30'}
        </span>
      </div>
    </div>
  )
}
