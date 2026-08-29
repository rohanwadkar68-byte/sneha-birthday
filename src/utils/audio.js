let ctx = null
let master = null
let delayNode = null
let timer = null
let step = 0

// Romantic Music Box Melody
const PATTERN = [
  [523.25, 0], [659.25, 1], [783.99, 2], [659.25, 1],
  [587.33, 0], [783.99, 2], [880.0, 3], [1046.5, 4],
  [783.99, 2], [659.25, 1], [523.25, 0], [587.33, 1],
  [659.25, 0], [783.99, 1], [987.77, 2], [1046.5, 3]
]

function ensureCtx() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return null
    ctx = new AudioCtx()
    master = ctx.createGain()
    master.gain.value = 0
    delayNode = ctx.createDelay(1)
    delayNode.delayTime.value = 0.34
    const fb = ctx.createGain()
    fb.gain.value = 0.28
    const wet = ctx.createGain()
    wet.gain.value = 0.22
    delayNode.connect(fb)
    fb.connect(delayNode)
    master.connect(ctx.destination)
    master.connect(wet)
    wet.connect(delayNode)
    delayNode.connect(ctx.destination)
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
  gain.connect(master)
  osc.start(when)
  osc.stop(when + 1.5)
}

function tick() {
  if (!ctx || ctx.state === 'suspended') return
  const [freq, beat] = PATTERN[step % PATTERN.length]
  pluck(freq, ctx.currentTime + beat * 0.14, 0.16)
  if (step % 4 === 0) pluck(freq / 2, ctx.currentTime, 0.08, 'sine')
  step += 1
}

export function startMusic() {
  ensureCtx()
  if (!ctx) return
  if (ctx.state === 'suspended') ctx.resume()
  master.gain.cancelScheduledValues(ctx.currentTime)
  master.gain.setTargetAtTime(0.85, ctx.currentTime, 0.6)
  if (!timer) timer = setInterval(tick, 520)
}

export function stopMusic() {
  if (ctx && master) master.gain.setTargetAtTime(0, ctx.currentTime, 0.25)
  if (timer) { clearInterval(timer); timer = null }
}

export function blip(base = 660) {
  ensureCtx()
  if (!ctx || ctx.state === 'suspended') return
  const t = ctx.currentTime
  ;[base, base * 1.25].forEach((f, i) => pluck(f, t + i * 0.08, 0.12, 'sine'))
}

export function playSparkle() {
  ensureCtx()
  if (!ctx || ctx.state === 'suspended') return
  const t = ctx.currentTime
  const notes = [880, 1108.73, 1318.51, 1760]
  notes.forEach((freq, idx) => {
    pluck(freq, t + idx * 0.06, 0.1, 'sine')
  })
}

export function playPop() {
  ensureCtx()
  if (!ctx || ctx.state === 'suspended') return
  const t = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(400, t)
  osc.frequency.exponentialRampToValueAtTime(880, t + 0.08)
  gain.gain.setValueAtTime(0.2, t)
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(t)
  osc.stop(t + 0.12)
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
