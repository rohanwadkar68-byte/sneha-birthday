const BASE = import.meta.env.BASE_URL
const BGM_SRC = `${BASE}assets/audio/bgm.mp3`

let bgmAudio = null

function getBgm() {
  if (!bgmAudio) {
    bgmAudio = new Audio(BGM_SRC)
    bgmAudio.loop = true
    bgmAudio.volume = 0.75
  }
  return bgmAudio
}

export function startMusic() {
  const bgm = getBgm()
  bgm.loop = true
  bgm.play().catch(() => {})
}

export function stopMusic() {
  if (bgmAudio) {
    bgmAudio.pause()
  }
}

export function pauseBGM() {
  if (bgmAudio) {
    bgmAudio.pause()
  }
}

export function resumeBGM() {
  if (bgmAudio) {
    bgmAudio.loop = true
    bgmAudio.play().catch(() => {})
  }
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

// 💋 Ultra-Realistic Juicy "Mwaaah! 💋" Kiss Synthesizer with Lip Suction & Acoustic Resonance
export function playKissSound(type = 'cheek') {
  ensureCtx()
  if (!ctx || ctx.state === 'suspended') return
  const t = ctx.currentTime

  const playSingleSmooch = (startTime, volume = 0.45) => {
    // 1. Lip Suction / Pop Noise Transient (The "Chup" sound of lips separating)
    const bufSize = Math.floor(ctx.sampleRate * 0.08)
    const noiseBuf = ctx.createBuffer(1, bufSize, ctx.sampleRate)
    const outData = noiseBuf.getChannelData(0)
    for (let i = 0; i < bufSize; i++) {
      outData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.018))
    }
    const noiseSrc = ctx.createBufferSource()
    noiseSrc.buffer = noiseBuf

    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.setValueAtTime(1400, startTime)
    bandpass.Q.setValueAtTime(3.5, startTime)

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(volume * 0.7, startTime)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.07)

    noiseSrc.connect(bandpass)
    bandpass.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noiseSrc.start(startTime)
    noiseSrc.stop(startTime + 0.08)

    // 2. Formant "Mwaaah" Tone Glide (Vocal mouth chamber resonance)
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const toneGain = ctx.createGain()

    osc1.type = 'sine'
    osc2.type = 'triangle'

    // Formant glide: low suction -> peak open mouth -> gentle release
    osc1.frequency.setValueAtTime(380, startTime)
    osc1.frequency.exponentialRampToValueAtTime(1280, startTime + 0.06)
    osc1.frequency.exponentialRampToValueAtTime(620, startTime + 0.19)

    osc2.frequency.setValueAtTime(760, startTime)
    osc2.frequency.exponentialRampToValueAtTime(2100, startTime + 0.06)
    osc2.frequency.exponentialRampToValueAtTime(1100, startTime + 0.19)

    toneGain.gain.setValueAtTime(0.001, startTime)
    toneGain.gain.linearRampToValueAtTime(volume, startTime + 0.035)
    toneGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22)

    osc1.connect(toneGain)
    osc2.connect(toneGain)
    toneGain.connect(ctx.destination)

    osc1.start(startTime)
    osc2.start(startTime)
    osc1.stop(startTime + 0.24)
    osc2.stop(startTime + 0.24)

    // 3. Cute sparkling acoustic overtone
    pluck(1174.66, startTime + 0.04, 0.12, 'sine')
    pluck(1567.98, startTime + 0.11, 0.14, 'triangle')
  }

  if (type === 'cheek' || type === 'kiss') {
    // Juicy full-bodied cheek smooch
    playSingleSmooch(t, 0.55)
  } else if (type === 'nibble') {
    // Cute playful nibble-nibble bite sound
    playSingleSmooch(t, 0.35)
    setTimeout(() => playSingleSmooch(ctx.currentTime, 0.4), 110)
  } else if (type === 'forehead') {
    // Gentle tender forehead kiss + dreamy celestial chimes
    playSingleSmooch(t, 0.38)
    const chord = [523.25, 659.25, 783.99, 1046.5, 1318.51]
    chord.forEach((f, i) => {
      pluck(f, t + 0.06 + i * 0.07, 0.16, 'sine')
    })
  }
}
