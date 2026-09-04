import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { CURATED_SONGS } from '../data/musicLibrary.js'

const MusicPlayerContext = createContext(null)

const LIKED_STORAGE_KEY = 'sneha_spotify_liked_v2'

function detectSongMood(track) {
  if (!track) return 'romantic'
  if (track.theme) return track.theme

  const text = ((track.title || '') + ' ' + (track.artist || '') + ' ' + (track.genre || '')).toLowerCase()
  if (text.includes('lofi') || text.includes('chill') || text.includes('relax') || text.includes('midnight')) return 'lofi'
  if (text.includes('taylor') || text.includes('pop') || text.includes('english') || text.includes('stephen')) return 'pop'
  if (text.includes('anuv') || text.includes('indie') || text.includes('acoustic') || text.includes('prateek')) return 'indie'
  if (text.includes('punjabi') || text.includes('dhillon') || text.includes('sidhu') || text.includes('party')) return 'punjabi'
  return 'romantic'
}

function decodeHtml(html) {
  if (!html) return ''
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export function MusicPlayerProvider({ children }) {
  const [likedIds, setLikedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(LIKED_STORAGE_KEY)
      return saved ? JSON.parse(saved) : ['kesariya', 'tu_hai_kahan', 'apna_bana_le']
    } catch {
      return ['kesariya', 'tu_hai_kahan', 'apna_bana_le']
    }
  })

  const [queue, setQueue] = useState(CURATED_SONGS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentTrack, setCurrentTrack] = useState(CURATED_SONGS[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.85)
  const [isMuted, setIsMuted] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState('all') // off | all | one

  const audioRef = useRef(null)
  const fetchingRecommendationsRef = useRef(false)

  // Initialize HTML5 Audio instance
  useEffect(() => {
    if (typeof window === 'undefined') return

    const audio = new Audio()
    audio.preload = 'metadata'
    audio.volume = volume
    audioRef.current = audio

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0)
    }

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
    }
  }, [])

  // Auto-play next track when current ends
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0
        audio.play().catch(() => {})
      } else {
        handleSmartNext(true)
      }
    }

    audio.addEventListener('ended', onEnded)
    return () => audio.removeEventListener('ended', onEnded)
  }, [repeatMode, queue, currentIndex, isShuffle, currentTrack])

  useEffect(() => {
    try {
      localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(likedIds))
    } catch (e) {
      console.warn(e)
    }
  }, [likedIds])

  const playTrack = (track, customQueue = null) => {
    if (!track || !track.url) return
    const audio = audioRef.current
    if (!audio) return

    if (customQueue && customQueue.length > 0) {
      setQueue(customQueue)
      const foundIdx = customQueue.findIndex((t) => t.id === track.id)
      setCurrentIndex(foundIdx >= 0 ? foundIdx : 0)
    } else {
      const foundIdx = queue.findIndex((t) => t.id === track.id)
      if (foundIdx >= 0) {
        setCurrentIndex(foundIdx)
      } else {
        setQueue((q) => [track, ...q])
        setCurrentIndex(0)
      }
    }

    setCurrentTrack(track)
    audio.src = track.url
    audio.currentTime = 0
    audio.volume = isMuted ? 0 : volume

    const playPromise = audio.play()
    if (playPromise && playPromise.catch) {
      playPromise.catch(() => {})
    }
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      if (!audio.src && currentTrack?.url) {
        audio.src = currentTrack.url
      }
      audio.play().catch(() => {})
    }
  }

  /**
   * Smart Mood-Based Next:
   * Chooses next track matching the same mood/genre/artist.
   * If queue has < 2 songs left, auto-fetches 5 similar songs from JioSaavn!
   */
  const handleSmartNext = async (isAuto = false) => {
    if (!queue || queue.length === 0) return

    const currentMood = detectSongMood(currentTrack)
    const primaryArtist = (currentTrack?.artist || '').split(',')[0].trim()

    // 1. If repeat is off and it's auto-end at the very last song
    if (repeatMode === 'off' && currentIndex >= queue.length - 1 && isAuto) {
      setIsPlaying(false)
      return
    }

    // 2. If shuffle is enabled or choosing next mood track
    let nextIdx = currentIndex + 1

    if (isShuffle) {
      // Pick random song from queue that shares the same mood
      const sameMoodIndices = []
      queue.forEach((song, idx) => {
        if (idx !== currentIndex && detectSongMood(song) === currentMood) {
          sameMoodIndices.push(idx)
        }
      })

      if (sameMoodIndices.length > 0) {
        nextIdx = sameMoodIndices[Math.floor(Math.random() * sameMoodIndices.length)]
      } else {
        nextIdx = Math.floor(Math.random() * queue.length)
      }
    }

    // 3. If upcoming queue is ending (<= 2 songs remaining), auto-fetch mood-matching songs!
    if (nextIdx >= queue.length - 2 && !fetchingRecommendationsRef.current && primaryArtist) {
      fetchingRecommendationsRef.current = true
      try {
        const query = `${primaryArtist} ${currentMood === 'romantic' ? 'romantic' : ''} hits`
        const res = await fetch('https://jiosaavn-api-nine.vercel.app/api/search/songs?query=' + encodeURIComponent(query))
        if (res.ok) {
          const data = await res.json()
          const items = data?.data?.results || []
          if (items.length > 0) {
            const existingIds = new Set(queue.map((s) => s.id))
            const newTracks = items
              .map((item) => {
                const dlUrl = item.downloadUrl?.[item.downloadUrl.length - 1]?.url || item.downloadUrl?.[0]?.url || item.url
                const imgUrl = item.image?.[item.image.length - 1]?.url || item.image?.[0]?.url || 'assets/3d-emoji/sparkling_heart.png'
                const artistName = item.artists?.primary?.[0]?.name || item.primaryArtists || 'Artist'
                return {
                  id: item.id || String(Math.random()),
                  title: decodeHtml(item.name || item.title || 'Song'),
                  artist: decodeHtml(artistName),
                  image: imgUrl,
                  url: dlUrl,
                  theme: currentMood,
                  duration: item.duration ? Math.floor(item.duration / 60) + ':' + (item.duration % 60 < 10 ? '0' : '') + (item.duration % 60) : '3:30'
                }
              })
              .filter((t) => !!t.url && !existingIds.has(t.id))
              .slice(0, 5)

            if (newTracks.length > 0) {
              setQueue((prev) => [...prev, ...newTracks])
            }
          }
        }
      } catch (err) {
        console.warn('Smart mood recommendation fetch error:', err)
      } finally {
        fetchingRecommendationsRef.current = false
      }
    }

    if (nextIdx >= queue.length) {
      nextIdx = 0
    }

    const nextTrackItem = queue[nextIdx]
    if (nextTrackItem) {
      setCurrentIndex(nextIdx)
      playTrack(nextTrackItem)
    }
  }

  const handlePrev = () => {
    const audio = audioRef.current
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }

    if (!queue || queue.length === 0) return

    let prevIdx = currentIndex - 1
    if (prevIdx < 0) {
      prevIdx = queue.length - 1
    }

    const prevTrackItem = queue[prevIdx]
    if (prevTrackItem) {
      setCurrentIndex(prevIdx)
      playTrack(prevTrackItem)
    }
  }

  const seekTo = (seconds) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = seconds
    setCurrentTime(seconds)
  }

  const changeVolume = (val) => {
    const v = Math.max(0, Math.min(1, val))
    setVolume(v)
    if (audioRef.current) {
      audioRef.current.volume = v
      if (v > 0 && isMuted) setIsMuted(false)
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isMuted) {
      setIsMuted(false)
      audio.volume = volume
    } else {
      setIsMuted(true)
      audio.volume = 0
    }
  }

  const toggleLike = (songId) => {
    setLikedIds((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    )
  }

  const isLiked = (songId) => likedIds.includes(songId)

  const toggleShuffle = () => setIsShuffle((prev) => !prev)

  const toggleRepeat = () => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all'
      if (prev === 'all') return 'one'
      return 'off'
    })
  }

  const value = {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    queue,
    currentIndex,
    isShuffle,
    repeatMode,
    likedIds,
    playTrack,
    togglePlay,
    nextTrack: () => handleSmartNext(false),
    prevTrack: handlePrev,
    seekTo,
    changeVolume,
    toggleMute,
    toggleLike,
    isLiked,
    toggleShuffle,
    toggleRepeat,
    setQueue
  }

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  )
}

export function useMusicPlayer() {
  const ctx = useContext(MusicPlayerContext)
  if (!ctx) {
    throw new Error('useMusicPlayer must be used within MusicPlayerProvider')
  }
  return ctx
}
