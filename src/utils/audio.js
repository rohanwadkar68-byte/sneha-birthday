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

// 💋 Juicy Romantic "Mwaaah" Kiss & Soft Nibble Synthesizer
export function playKissSound(type = 'cheek') {
  ensureCtx()
  if (!ctx || ctx.state === 'suspended') return
  const t = ctx.currentTime

  if (type === 'cheek' || type === 'kiss') {
    // 1. Suction Kiss Pop & Mwaaah Glide
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(450, t)
    osc.frequency.exponentialRampToValueAtTime(1150, t + 0.08)
    osc.frequency.exponentialRampToValueAtTime(750, t + 0.18)

    gain.gain.setValueAtTime(0.01, t)
    gain.gain.linearRampToValueAtTime(0.35, t + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.26)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.28)

    // 2. Sparkle chime overtone
    pluck(1046.5, t + 0.06, 0.12, 'sine')
    pluck(1318.5, t + 0.14, 0.14, 'triangle')
  } else if (type === 'nibble') {
    // Soft playful double bite pop
    [0, 0.1].forEach((delay) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(600, t + delay)
      osc.frequency.exponentialRampToValueAtTime(950, t + delay + 0.04)

      gain.gain.setValueAtTime(0.2, t + delay)
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.08)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(t + delay)
      osc.stop(t + delay + 0.09)
    })
    pluck(1567.98, t + 0.18, 0.12, 'sine')
  } else if (type === 'forehead') {
    // Soft angelic harmonic chord
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      pluck(f, t + i * 0.08, 0.15, 'sine')
    })
  }
}
