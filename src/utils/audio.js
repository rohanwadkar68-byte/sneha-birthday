const base = import.meta.env.BASE_URL || './'
const cleanBase = base.endsWith('/') ? base : `${base}/`
const BGM_SRC = `${cleanBase}assets/audio/bgm.mp3`

let currentBgmUrl = BGM_SRC
let currentSongTitle = 'Cozy Birthday Lo-Fi'

export function initBGM() {
  let el = typeof document !== 'undefined' ? document.getElementById('bgm-player') : null
  if (!el) {
    el = new Audio(currentBgmUrl)
    el.id = 'bgm-player'
    el.loop = true
    el.volume = 0.8
    el.preload = 'auto'
    if (typeof document !== 'undefined' && document.body) {
      document.body.appendChild(el)
    }
  }
  return el
}

export function changeBGM(url, title = 'Custom Song') {
  try {
    currentBgmUrl = url
    currentSongTitle = title
    const bgm = initBGM()
    if (bgm) {
      bgm.pause()
      bgm.src = url
      bgm.currentTime = 0
      bgm.loop = true
      bgm.volume = 0.8
      const p = bgm.play()
      if (p && p.catch) {
        p.catch(() => {})
      }
    }
  } catch (err) {
    console.warn('changeBGM error:', err)
  }
}

export function getCurrentBGMTitle() {
  return currentSongTitle
}

export function startMusic() {
  try {
    const bgm = initBGM()
    if (bgm) {
      bgm.loop = true
      bgm.volume = 0.8
      const p = bgm.play()
      if (p && p.catch) {
        p.catch(() => {})
      }
    }
  } catch (err) {
    console.warn('startMusic error:', err)
  }
}

export function stopMusic() {
  const bgm = initBGM()
  if (bgm) {
    bgm.pause()
  }
}

export function pauseBGM() {
  const bgm = initBGM()
  if (bgm) {
    bgm.pause()
  }
}

export function resumeBGM() {
  try {
    const bgm = initBGM()
    if (bgm) {
      bgm.loop = true
      bgm.volume = 0.8
      const p = bgm.play()
      if (p && p.catch) {
        p.catch(() => {})
      }
    }
  } catch (err) {
    console.warn('resumeBGM error:', err)
  }
}

let ctx = null

function ensureCtx() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return null
    ctx = new AudioCtx()
  }
  return ctx
}

function pluck(freq, when, vel, type = 'triangle') {
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, when)
  gain.gain.linearRampToValueAtTime(vel, when + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 1.4)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(when)
  osc.stop(when + 1.5)
}

export function blip() {
  // Silent on button clicks as requested
}

export function playSparkle() {
  // Silent on button clicks
}

export function playPop() {
  // Silent on button clicks as requested
}

export function playCandleBlow() {
  ensureCtx()
  if (!ctx || ctx.state === 'suspended') return
  const t = ctx.currentTime
  // Generate soft pink noise puff
  const bufferSize = ctx.sampleRate * 0.4
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.1))
  }
  const noise = ctx.createBufferSource()
  noise.buffer = buffer
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 600
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.25, t)
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4)
  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  noise.start(t)
  noise.stop(t + 0.45)
}

export function playTypewriter() {
  ensureCtx()
  if (!ctx || ctx.state === 'suspended') return
  const t = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(1200 + Math.random() * 300, t)
  gain.gain.setValueAtTime(0.04, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(t)
  osc.stop(t + 0.04)
}

export function playFanfare() {
  ensureCtx()
  if (!ctx || ctx.state === 'suspended') return
  const t = ctx.currentTime
  const fanfare = [
    [523.25, 0], [523.25, 0.12], [523.25, 0.24],
    [659.25, 0.36], [783.99, 0.54], [1046.5, 0.76]
  ]
  fanfare.forEach(([freq, delay]) => {
    pluck(freq, t + delay, 0.18, 'triangle')
  })
}

const KISS_MWAH_SRC = `${cleanBase}assets/audio/kiss-mwah.mp3`
const KISS_CHEEK_SRC = `${cleanBase}assets/audio/kiss-cheek.mp3`
const KISS_SOFT_SRC = `${cleanBase}assets/audio/kiss-soft.mp3`

// 💋 Real Recorded Authentic "Mwaaah! 💋" Kiss Sound Effects with BGM Auto-Pause
export function playKissSound(type = 'mwah') {
  try {
    pauseBGM() // 🔇 Pause background music during the kiss!

    let src = KISS_MWAH_SRC
    if (type === 'cheek') src = KISS_CHEEK_SRC
    else if (type === 'soft' || type === 'forehead' || type === 'nose') src = KISS_SOFT_SRC

    const audio = new Audio(src)
    audio.volume = 1.0

    // Automatically resume BGM when the kiss sound completes
    audio.onended = () => {
      resumeBGM()
    }

    const p = audio.play()
    if (p && p.catch) {
      p.catch(() => {
        resumeBGM()
      })
    }

    // Safety timeout in case onended doesn't fire
    setTimeout(() => {
      resumeBGM()
    }, 1800)
  } catch (err) {
    console.warn('playKissSound error:', err)
    resumeBGM()
  }
}
