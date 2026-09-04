import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { CURATED_SONGS, DEFAULT_ALBUM_COVER } from '../data/musicLibrary.js'

const MusicPlayerContext = createContext(null)

const LIKED_STORAGE_KEY = 'sneha_spotify_liked_v2'
const RECENTLY_PLAYED_KEY = 'sneha_spotify_recent_v1'

export function detectSongMood(track) {
  if (!track) return 'romantic'
  if (track.theme) return track.theme

  const text = ((track.title || '') + ' ' + (track.artist || '') + ' ' + (track.genre || '')).toLowerCase()
  if (text.includes('lofi') || text.includes('chill') || text.includes('relax') || text.includes('midnight')) return 'lofi'
  if (text.includes('taylor') || text.includes('pop') || text.includes('english') || text.includes('stephen')) return 'pop'
  if (text.includes('anuv') || text.includes('indie') || text.includes('acoustic') || text.includes('prateek')) return 'indie'
  if (text.includes('punjabi') || text.includes('dhillon') || text.includes('sidhu') || text.includes('party')) return 'punjabi'
  return 'romantic'
}

export function getTrackAmbientColor(track) {
  const mood = detectSongMood(track)
  switch (mood) {
    case 'romantic':
      return '#be185d' // Elegant rose/pink glow
    case 'pop':
      return '#7c3aed' // Modern violet purple
    case 'lofi':
      return '#1e40af' // Deep midnight navy
    case 'indie':
      return '#0f766e' // Calm teal/emerald
    case 'punjabi':
      return '#ea580c' // Vibrant amber/orange
    default:
      return '#1db954' // Spotify signature green
  }
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

  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    try {
      const saved = localStorage.getItem(RECENTLY_PLAYED_KEY)
      return saved ? JSON.parse(saved) : CURATED_SONGS.slice(0, 4)
    } catch {
      return CURATED_SONGS.slice(0, 4)
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

  // Sleep Timer: { mode: 'minutes' | 'end_of_song', minutes?: number, endTime?: number }
  const [sleepTimer, setSleepTimer] = useState(null)
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState(null)

  const audioRef = useRef(null)
  const fetchingRecommendationsRef = useRef(false)
  const originalVolumeRef = useRef(0.85)
  const lastTimeRef = useRef(0)

  // Initialize HTML5 Audio instance
  useEffect(() => {
    if (typeof window === 'undefined') return

    const audio = new Audio()
    audio.preload = 'metadata'
    audio.volume = volume
    audioRef.current = audio

    const onTimeUpdate = () => {
      const cur = audio.currentTime || 0
      if (Math.abs(cur - lastTimeRef.current) >= 0.25 || cur === 0) {
        lastTimeRef.current = cur
        setCurrentTime(cur)
      }
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

  // Auto-play next track when current ends or on audio error
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onEnded = () => {
      // Check sleep timer end_of_song mode
      if (sleepTimer?.mode === 'end_of_song') {
        audio.pause()
        setIsPlaying(false)
        setSleepTimer(null)
        setSleepTimerRemaining(null)
        return
      }

      if (repeatMode === 'one') {
        audio.currentTime = 0
        audio.play().catch(() => {})
      } else {
        handleSmartNext(true)
      }
    }

    const onError = (e) => {
      console.warn('Audio playback stream error on track:', currentTrack?.title, e)
      handleSmartNext(true)
    }

    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [repeatMode, queue, currentIndex, isShuffle, currentTrack, sleepTimer])

  // Sleep timer interval watcher with smooth fade out
  useEffect(() => {
    if (!sleepTimer || sleepTimer.mode !== 'minutes') {
      setSleepTimerRemaining(null)
      return
    }

    const interval = setInterval(() => {
      const now = Date.now()
      const diffMs = sleepTimer.endTime - now

      if (diffMs <= 0) {
        // Sleep Timer Reached: Stop audio smoothly
        const audio = audioRef.current
        if (audio) {
          audio.pause()
          audio.volume = originalVolumeRef.current
        }
        setIsPlaying(false)
        setSleepTimer(null)
        setSleepTimerRemaining(null)
      } else {
        const totalSec = Math.ceil(diffMs / 1000)
        const mins = Math.floor(totalSec / 60)
        const secs = totalSec % 60
        setSleepTimerRemaining(`${mins}:${secs < 10 ? '0' : ''}${secs}`)

        // Smooth volume fade out in last 10 seconds
        if (totalSec <= 10) {
          const audio = audioRef.current
          if (audio) {
            const factor = Math.max(0, totalSec / 10)
            audio.volume = originalVolumeRef.current * factor
          }
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [sleepTimer])

  useEffect(() => {
    try {
      localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(likedIds))
    } catch (e) {
      console.warn(e)
    }
  }, [likedIds])

  useEffect(() => {
    try {
      localStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(recentlyPlayed))
    } catch (e) {
      console.warn(e)
    }
  }, [recentlyPlayed])

  const setSleepTimerMode = (minutesOrMode) => {
    if (!minutesOrMode) {
      cancelSleepTimer()
      return
    }

    originalVolumeRef.current = volume

    if (minutesOrMode === 'end_of_song') {
      setSleepTimer({ mode: 'end_of_song' })
      setSleepTimerRemaining('End of Song')
    } else {
      const mins = Number(minutesOrMode)
      const endTime = Date.now() + mins * 60 * 1000
      setSleepTimer({ mode: 'minutes', minutes: mins, endTime })
      setSleepTimerRemaining(`${mins}:00`)
    }
  }

  const cancelSleepTimer = () => {
    setSleepTimer(null)
    setSleepTimerRemaining(null)
    const audio = audioRef.current
    if (audio) {
      audio.volume = isMuted ? 0 : volume
    }
  }

  const clearRecentlyPlayed = () => {
    setRecentlyPlayed([])
    try {
      localStorage.removeItem(RECENTLY_PLAYED_KEY)
    } catch (e) {
      console.warn(e)
    }
  }

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
    originalVolumeRef.current = volume
    audio.volume = isMuted ? 0 : volume

    // Add to recently played (deduplicated, max 20)
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((item) => item.id !== track.id)
      return [track, ...filtered].slice(0, 20)
    })

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

    let nextIdx = -1

    if (isShuffle) {
      // Shuffle mode: Pick a random track matching the current mood
      const moodMatches = []
      queue.forEach((t, idx) => {
        if (idx !== currentIndex && detectSongMood(t) === currentMood) {
          moodMatches.push(idx)
        }
      })

      if (moodMatches.length > 0) {
        nextIdx = moodMatches[Math.floor(Math.random() * moodMatches.length)]
      } else {
        // Fallback to any random track not current
        const otherIdxs = queue.map((_, i) => i).filter((i) => i !== currentIndex)
        nextIdx = otherIdxs.length > 0 ? otherIdxs[Math.floor(Math.random() * otherIdxs.length)] : 0
      }
    } else {
      // Sequential smart mode: Look ahead for next song matching same mood
      for (let i = currentIndex + 1; i < queue.length; i++) {
        if (detectSongMood(queue[i]) === currentMood) {
          nextIdx = i
          break
        }
      }

      // If no upcoming song matches mood, pick immediate next in queue
      if (nextIdx === -1) {
        nextIdx = (currentIndex + 1) % queue.length
      }
    }

    const nextTrack = queue[nextIdx]
    if (nextTrack) {
      playTrack(nextTrack)
    }

    // Auto-fetch mood-matching recommendations when queue is low
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
                const imgUrl = item.image?.[item.image.length - 1]?.url || item.image?.[0]?.url || DEFAULT_ALBUM_COVER
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
      } catch (e) {
        console.warn('Auto-recommendation error:', e)
      } finally {
        fetchingRecommendationsRef.current = false
      }
    }
  }

  const handlePrev = () => {
    if (!queue || queue.length === 0) return
    const audio = audioRef.current

    // If more than 3 seconds into the track, restart it
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }

    const prevIdx = (currentIndex - 1 + queue.length) % queue.length
    playTrack(queue[prevIdx])
  }

  const seekTo = (seconds) => {
    const audio = audioRef.current
    if (!audio) return
    const secNum = Number(seconds)
    if (isNaN(secNum) || !isFinite(secNum)) return
    const durNum = (duration && isFinite(duration)) ? duration : 0
    const clamped = Math.max(0, Math.min(secNum, durNum))
    try {
      audio.currentTime = clamped
      setCurrentTime(clamped)
    } catch (e) {
      console.warn('Seek error:', e)
    }
  }

  const changeVolume = (newVol) => {
    const clamped = Math.max(0, Math.min(1, newVol))
    setVolume(clamped)
    originalVolumeRef.current = clamped
    setIsMuted(clamped === 0)
    if (audioRef.current) {
      audioRef.current.volume = clamped
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false)
      if (audioRef.current) audioRef.current.volume = volume > 0 ? volume : 0.5
    } else {
      setIsMuted(true)
      if (audioRef.current) audioRef.current.volume = 0
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

  const ambientColor = getTrackAmbientColor(currentTrack)

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
    recentlyPlayed,
    clearRecentlyPlayed,
    sleepTimer,
    sleepTimerRemaining,
    setSleepTimerMode,
    cancelSleepTimer,
    ambientColor,
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
