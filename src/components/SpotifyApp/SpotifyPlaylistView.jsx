import { useState } from 'react'
import { motion } from 'framer-motion'
import { useMusicPlayer } from '../../context/MusicPlayerContext.jsx'
import { CURATED_SONGS } from '../../data/musicLibrary.js'

export default function SpotifyPlaylistView({ playlist }) {
  const { currentTrack, isPlaying, playTrack, togglePlay, likedIds, isLiked, toggleLike } = useMusicPlayer()

  const isLikedPlaylist = playlist?.id === 'liked'

  // Resolve songs
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
    <div style={{ padding: '0 24px 80px' }}>
      {/* 👑 PLAYLIST HERO HEADER */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 24,
        paddingBottom: 24,
        marginBottom: 24,
        flexWrap: 'wrap'
      }}>
        {/* Cover Art */}
        {isLikedPlaylist ? (
          <div style={{
            width: 200,
            height: 200,
            borderRadius: 6,
            background: 'linear-gradient(135deg, #450af5, #c4efd9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
            flexShrink: 0
          }}>
            <svg width="72" height="72" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        ) : (
          <img
            src={playlist?.cover}
            alt=""
            style={{
              width: 200,
              height: 200,
              borderRadius: 6,
              objectFit: 'cover',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
              flexShrink: 0
            }}
            onError={(e) => { e.currentTarget.src = 'assets/3d-emoji/sparkling_heart.png' }}
          />
        )}

        {/* Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#ffffff', letterSpacing: '0.05em' }}>
            Public Playlist
          </span>
          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: 900,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-0.04em',
            lineHeight: 1
          }}>
            {isLikedPlaylist ? 'Liked Songs' : playlist?.title}
          </h1>
          <p style={{ fontSize: '14px', color: '#b3b3b3', margin: 0 }}>
            {isLikedPlaylist ? 'Your handpicked favorites collection for Sneha' : playlist?.description}
          </p>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>Sneha</span>
            <span>•</span>
            <span style={{ color: '#b3b3b3' }}>{songs.length} songs</span>
          </div>
        </div>
      </div>

      {/* ACTION BAR: Big Green Play Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayAll}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#1ed760',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            color: '#000000'
          }}
          title={isCurrentPlaylistPlaying ? 'Pause' : 'Play'}
        >
          {isCurrentPlaylistPlaying ? (
            <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor" style={{ marginLeft: 3 }}>
              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/>
            </svg>
          )}
        </motion.button>
      </div>

      {/* TRACKLIST TABLE */}
      {songs.length > 0 ? (
        <div>
          {/* Header Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr 1fr 60px',
            padding: '8px 16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#b3b3b3',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 8
          }}>
            <span>#</span>
            <span>Title</span>
            <span>Album</span>
            <span style={{ textAlign: 'right' }}>🕒</span>
          </div>

          {/* Rows */}
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
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#b3b3b3' }}>
          <div style={{ fontSize: '48px', marginBottom: 16 }}>🤍</div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px' }}>
            Songs you like will appear here
          </h3>
          <p style={{ fontSize: '14px', margin: 0 }}>
            Save songs by tapping the heart icon on any track in Search or Home.
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
        display: 'grid',
        gridTemplateColumns: '40px 1fr 1fr 60px',
        alignItems: 'center',
        padding: '8px 16px',
        borderRadius: 4,
        background: hovered ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.15s'
      }}
    >
      {/* Index or Play Icon */}
      <div style={{ fontSize: '14px', color: isCurrent ? '#1ed760' : '#b3b3b3', display: 'flex', alignItems: 'center' }}>
        {hovered ? (
          isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#1ed760">
              <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#ffffff">
              <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/>
            </svg>
          )
        ) : isPlaying ? (
          <span style={{ color: '#1ed760' }}>▶</span>
        ) : (
          index
        )}
      </div>

      {/* Title & Artist */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, paddingRight: 12 }}>
        <img
          src={song.image}
          alt=""
          style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover', flexShrink: 0 }}
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

      {/* Album Name */}
      <div style={{
        fontSize: '13px',
        color: '#b3b3b3',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingRight: 12
      }}>
        {song.album || 'Single'}
      </div>

      {/* Duration & Like */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onLike()
          }}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            color: isLiked ? '#1ed760' : '#b3b3b3'
          }}
        >
          {isLiked ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#1ed760">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          )}
        </button>

        <span style={{ fontSize: '13px', color: '#b3b3b3' }}>
          {song.duration || '3:30'}
        </span>
      </div>
    </div>
  )
}
