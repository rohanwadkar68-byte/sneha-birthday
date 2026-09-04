import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { CURATED_SONGS } from '../data/musicLibrary.js'

const MusicPlayerContext = createContext(null)

const LIKED_STORAGE_KEY = 'sneha_spotify_liked_v2'

export function MusicPlayerProvider({ children }) {
  // Liked songs state
  const [likedIds, setLikedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(LIKED_STORAGE_KEY)
      return saved ? JSON.parse(saved) : ['kesariya', 'tu_hai_kahan', 'apna_bana_le']
    } catch {
      return ['kesariya', 'tu_hai_kahan', 'apna_bana_le']
    }
  })

  // Full player open state
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('home')

  // Playback state
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

  // Initialize Audio instance once
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
        handleNext(true)
      }
    }

    audio.addEventListener('ended', onEnded)
    return () => audio.removeEventListener('ended', onEnded)
  }, [repeatMode, queue, currentIndex, isShuffle])

  // Save liked songs
  useEffect(() => {
    try {
      localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(likedIds))
    } catch (e) {
      console.warn(e)
    }
  }, [likedIds])

  // Load and play a specific track
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
      playPromise.catch((err) => console.log('Playback notice:', err))
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

  const handleNext = (isAuto = false) => {
    if (!queue || queue.length === 0) return

    let nextIdx = currentIndex + 1

    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * queue.length)
      if (queue.length > 1 && nextIdx === currentIndex) {
        nextIdx = (currentIndex + 1) % queue.length
      }
    } else if (nextIdx >= queue.length) {
      if (repeatMode === 'off' && isAuto) {
        setIsPlaying(false)
        return
      }
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

  const openFullPlayer = (tab = 'home') => {
    setActiveTab(tab)
    setIsFullPlayerOpen(true)
  }

  const closeFullPlayer = () => setIsFullPlayerOpen(false)

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
    isFullPlayerOpen,
    activeTab,
    playTrack,
    togglePlay,
    nextTrack: () => handleNext(false),
    prevTrack: handlePrev,
    seekTo,
    changeVolume,
    toggleMute,
    toggleLike,
    isLiked,
    toggleShuffle,
    toggleRepeat,
    openFullPlayer,
    closeFullPlayer,
    setActiveTab,
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
