const base = import.meta.env.BASE_URL

export const getTeddyWebp = (n) => `${base}assets/teddy/${n}.webp`
export const getTeddyWebm = (n) => `${base}assets/teddy-webm/${n}.webm`
export const getPookieWebp = (n) => `${base}assets/pookie-webp/${n}.webp`
export const getPookieJpeg = (n) => `${base}assets/pookie-jpeg/${n}.jpeg`
export const getEmojiWebm = (n) => `${base}assets/emoji/${n}.webm`
export const getDeco = (n) => `${base}assets/misc/deco-${n}.webp`

// Teddy animated webp — primary character emotions
export const TEDDY = {
  wave: getTeddyWebp(0),
  idle: getTeddyWebp(1),
  happy: getTeddyWebp(2),
  excited: getTeddyWebp(3),
  blush: getTeddyWebp(4),
  sad: getTeddyWebp(5),
  sleepy: getTeddyWebp(6),
  dance: getTeddyWebp(7),
  angry: getTeddyWebp(8),
  curious: getTeddyWebp(9),
  love: getTeddyWebp(10),
  shocked: getTeddyWebp(11),
  giggle: getTeddyWebp(12),
  think: getTeddyWebp(13),
  party: getTeddyWebp(14),
  hug: getTeddyWebp(15)
}

// Curated high-resolution WebM animated stickers
export const TEDDY_WEBM = {
  happy: [0, 2, 5, 7, 12, 14, 25, 48].map(getTeddyWebm),
  excited: [3, 20, 30, 34, 43, 60, 68].map(getTeddyWebm),
  party: [4, 21, 42, 46, 67, 75, 80].map(getTeddyWebm),
  love: [1, 10, 15, 27, 54, 62, 77].map(getTeddyWebm),
  curious: [9, 28, 33, 39, 52, 65].map(getTeddyWebm),
  dance: [11, 35, 44, 47, 70, 78, 81].map(getTeddyWebm),
  cheer: [6, 8, 24, 50, 57, 72, 79].map(getTeddyWebm),
  blush: [13, 16, 22, 31, 40, 55, 69].map(getTeddyWebm),
  sleepy: [17, 18, 26, 37, 58].map(getTeddyWebm),
  food: [19, 23, 32, 45, 63].map(getTeddyWebm),
  chaos: [29, 36, 41, 51, 66, 74].map(getTeddyWebm)
}

// Pookie bear character collection (animated webp & static jpeg)
export const POOKIE = {
  webp: Array.from({ length: 58 }, (_, i) => getPookieWebp(i)),
  jpeg: Array.from({ length: 58 }, (_, i) => getPookieJpeg(i))
}

// Emoji-shaped animated stickers (74 webm)
export const EMOJI_WEBM = {
  row: [0, 2, 4, 6, 8, 10, 12].map(getEmojiWebm),
  fest: [1, 3, 5, 7, 9, 11, 13, 15].map(getEmojiWebm),
  hearts: [16, 18, 20, 22, 24, 26].map(getEmojiWebm),
  stars: [28, 30, 32, 34, 36].map(getEmojiWebm),
  all: Array.from({ length: 74 }, (_, i) => getEmojiWebm(i))
}

// 💋 Freshly downloaded Milk & Mocha / Bubu Kiss & Cuddle animations
export const KISS_ANIMATIONS = [
  `${base}assets/kisses/milk_mocha_kiss_3.gif`,
  `${base}assets/kisses/milk_mocha_kiss_5.gif`,
  `${base}assets/kisses/milk_mocha_kiss_7.gif`,
  `${base}assets/kisses/milk_mocha_kiss_9.gif`,
  `${base}assets/kisses/milk_mocha_kiss_11.gif`,
  `${base}assets/kisses/milk_mocha_kiss_13.gif`,
  `${base}assets/kisses/cuddle_3.gif`,
  `${base}assets/kisses/cuddle_5.gif`,
  `${base}assets/kisses/cuddle_8.gif`,
  `${base}assets/kisses/cuddle_9.gif`,
  `${base}assets/kisses/bubu_kiss_3.gif`,
  `${base}assets/kisses/bubu_kiss_5.gif`,
  `${base}assets/kisses/bubu_kiss_7.gif`,
  `${base}assets/kisses/bubu_kiss_8.gif`,
  `${base}assets/kisses/milk_mocha_kiss_1.webm`,
  `${base}assets/kisses/cuddle_1.webm`,
  `${base}assets/kisses/bubu_kiss_1.webm`
]

// Cat Lottie animations
const cat = (name) => `${base}assets/cats/${name}.json`
export const CATS = {
  smug: cat('smug'),
  suspicious: cat('suspicious'),
  sleepy: cat('sleepy'),
  dramatic: cat('dramatic'),
  cute: cat('cute'),
  judging: cat('judging'),
  shocked: cat('shocked'),
  party: cat('party')
}

export const DECOS = Array.from({ length: 12 }, (_, i) => getDeco(i))

export const DECO_BY_NAME = {
  star: getDeco(0),
  heart: getDeco(1),
  flower: getDeco(2),
  bow: getDeco(3),
  sparkle: getDeco(4),
  cloud: getDeco(5),
  moon: getDeco(6),
  rainbow: getDeco(7),
  cupcake: getDeco(8),
  gift: getDeco(9),
  balloon: getDeco(10),
  cake: getDeco(11)
}

// 🌟 Modern 3D Animated Cute Emojis (Microsoft Fluent 3D Set)
export const get3dEmoji = (name) => `${base}assets/3d-emoji/${name}.png`

export const EMOJI_3D = {
  hearts: [
    get3dEmoji('sparkling_heart'),
    get3dEmoji('two_hearts'),
    get3dEmoji('growing_heart'),
    get3dEmoji('heart_with_ribbon'),
    get3dEmoji('revolving_hearts'),
    get3dEmoji('heart_decoration'),
    get3dEmoji('red_heart')
  ],
  smilies: [
    get3dEmoji('smiling_face_with_hearts'),
    get3dEmoji('face_blowing_a_kiss'),
    get3dEmoji('smiling_face_with_heart_eyes'),
    get3dEmoji('partying_face'),
    get3dEmoji('star_struck'),
    get3dEmoji('hugging_face'),
    get3dEmoji('pleading_face'),
    get3dEmoji('kissing_cat')
  ],
  party: [
    get3dEmoji('birthday_cake'),
    get3dEmoji('party_popper'),
    get3dEmoji('wrapped_gift'),
    get3dEmoji('sparkles'),
    get3dEmoji('sparkler'),
    get3dEmoji('balloon'),
    get3dEmoji('crown'),
    get3dEmoji('clinking_glasses')
  ],
  sweets: [
    get3dEmoji('cupcake'),
    get3dEmoji('shortcake'),
    get3dEmoji('ice_cream'),
    get3dEmoji('doughnut'),
    get3dEmoji('chocolate_bar'),
    get3dEmoji('candy'),
    get3dEmoji('lollipop'),
    get3dEmoji('strawberry'),
    get3dEmoji('cherries')
  ],
  cute: [
    get3dEmoji('teddy_bear'),
    get3dEmoji('ribbon'),
    get3dEmoji('shooting_star'),
    get3dEmoji('glowing_star'),
    get3dEmoji('love_letter'),
    get3dEmoji('fire')
  ]
}

// 🎭 Viral & Relatable Trending Chat Meme Stickers
export const getMeme = (name) => `${base}assets/memes/${name}`

export const MEME_STICKERS = {
  catJam: getMeme('cat_jam.gif'),
  huhCat: getMeme('confused_huh_cat.gif'),
  angryCat: getMeme('angry_cat.png'),
  sadCat: getMeme('sad_cat.png'),
  gaspCat: getMeme('gasp_cat.gif'),
  coolDoge: getMeme('cool_doge.gif'),
  danceDoggo: getMeme('dance_doggo.gif'),
  dogJam: getMeme('dog_jam.gif'),
  typingCat: getMeme('typing_cat.gif'),
  tryNotToCry: getMeme('try_not_to_cry.gif'),
  cheems: getMeme('cheems.png'),
  pikachu: getMeme('surprised_pikachu.png')
}

// 🌸 Ultra-Aesthetic 60fps HTML5 Canvas Rose & Sakura Petals Engine
let petalCanvas = null
let petalCtx = null
let petalAnimId = null
let activePetals = []

const PETAL_PALETTE = [
  { start: '#f43f5e', end: '#fda4af' }, // Rose Pink
  { start: '#e11d48', end: '#fb7185' }, // Crimson Rose
  { start: '#be123c', end: '#f43f5e' }, // Velvet Dark Rose
  { start: '#f472b6', end: '#ffe4e6' }, // Sakura Soft Pink
  { start: '#fb7185', end: '#fff1f2' }  // Satin Pearl Blush
]

function initPetalCanvas() {
  if (typeof document === 'undefined') return
  if (!petalCanvas) {
    petalCanvas = document.createElement('canvas')
    petalCanvas.id = 'rose-petals-canvas'
    petalCanvas.style.position = 'fixed'
    petalCanvas.style.inset = '0'
    petalCanvas.style.width = '100vw'
    petalCanvas.style.height = '100vh'
    petalCanvas.style.pointerEvents = 'none'
    petalCanvas.style.zIndex = '999999'
    document.body.appendChild(petalCanvas)
  }
  petalCtx = petalCanvas.getContext('2d')
  resizePetalCanvas()
}

function resizePetalCanvas() {
  if (!petalCanvas) return
  const dpr = window.devicePixelRatio || 1
  petalCanvas.width = window.innerWidth * dpr
  petalCanvas.height = window.innerHeight * dpr
  if (petalCtx) petalCtx.scale(dpr, dpr)
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', resizePetalCanvas)
}

class CanvasPetal {
  constructor(x, y, burst = true) {
    const w = typeof window !== 'undefined' ? window.innerWidth : 800
    const h = typeof window !== 'undefined' ? window.innerHeight : 600

    this.x = x ?? (burst ? w * 0.5 : Math.random() * w)
    this.y = y ?? (burst ? h * 0.55 : -20)
    this.size = 14 + Math.random() * 16
    this.color = PETAL_PALETTE[Math.floor(Math.random() * PETAL_PALETTE.length)]

    const angle = burst ? Math.random() * Math.PI * 2 : Math.PI / 2
    const speed = burst ? 4 + Math.random() * 9 : 1.2 + Math.random() * 2

    this.vx = burst ? Math.cos(angle) * speed : Math.random() * 2 - 1
    this.vy = burst ? Math.sin(angle) * speed - 4.5 : 1.5 + Math.random() * 2
    this.gravity = 0.12
    this.friction = 0.96

    this.rotX = Math.random() * Math.PI * 2
    this.rotY = Math.random() * Math.PI * 2
    this.rotZ = Math.random() * Math.PI * 2
    this.rotSpeedX = (Math.random() * 0.05 + 0.02) * (Math.random() > 0.5 ? 1 : -1)
    this.rotSpeedY = (Math.random() * 0.04 + 0.015) * (Math.random() > 0.5 ? 1 : -1)
    this.rotSpeedZ = Math.random() * 0.03 + 0.01

    this.sway = Math.random() * Math.PI * 2
    this.swaySpeed = 0.03 + Math.random() * 0.03
    this.alpha = 1
    this.decay = burst ? 0.0035 + Math.random() * 0.003 : 0.002
    this.type = Math.random() > 0.35 ? 'rose' : 'sakura'
  }

  update() {
    this.vx *= this.friction
    this.vy += this.gravity
    this.sway += this.swaySpeed
    this.x += this.vx + Math.sin(this.sway) * 1.8
    this.y += this.vy

    this.rotX += this.rotSpeedX
    this.rotY += this.rotSpeedY
    this.rotZ += this.rotSpeedZ
    this.alpha -= this.decay

    return this.alpha > 0 && this.y < window.innerHeight + 50 && this.x > -60 && this.x < window.innerWidth + 60
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotZ)
    ctx.scale(Math.cos(this.rotX), Math.sin(this.rotY))
    ctx.globalAlpha = Math.max(0, this.alpha)

    const grad = ctx.createLinearGradient(0, -this.size, 0, this.size)
    grad.addColorStop(0, this.color.start)
    grad.addColorStop(1, this.color.end)
    ctx.fillStyle = grad
    ctx.shadowColor = 'rgba(244, 63, 94, 0.35)'
    ctx.shadowBlur = 6

    ctx.beginPath()
    if (this.type === 'rose') {
      ctx.moveTo(0, -this.size)
      ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.8, this.size * 0.9, this.size * 0.6, 0, this.size)
      ctx.bezierCurveTo(-this.size * 0.9, this.size * 0.6, -this.size * 0.8, -this.size * 0.8, 0, -this.size)
    } else {
      ctx.moveTo(0, -this.size)
      ctx.bezierCurveTo(this.size * 0.7, -this.size * 0.9, this.size * 0.85, this.size * 0.5, 0, this.size)
      ctx.bezierCurveTo(-this.size * 0.85, this.size * 0.5, -this.size * 0.7, -this.size * 0.9, 0, -this.size)
    }
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
}

function petalLoop() {
  if (!petalCtx || !petalCanvas) return
  const dpr = window.devicePixelRatio || 1
  petalCtx.clearRect(0, 0, petalCanvas.width / dpr, petalCanvas.height / dpr)

  activePetals = activePetals.filter((p) => {
    const alive = p.update()
    if (alive) p.draw(petalCtx)
    return alive
  })

  if (activePetals.length > 0) {
    petalAnimId = requestAnimationFrame(petalLoop)
  } else {
    petalAnimId = null
  }
}

export function triggerRosePetals(options = {}) {
  try {
    initPetalCanvas()
    const {
      particleCount = 5,
      origin = { x: 0.5, y: 0.5 },
      burst = true
    } = options

    const w = typeof window !== 'undefined' ? window.innerWidth : 800
    const h = typeof window !== 'undefined' ? window.innerHeight : 600
    const startX = origin.x != null ? (origin.x <= 1 ? origin.x * w : origin.x) : w * 0.5
    const startY = origin.y != null ? (origin.y <= 1 ? origin.y * h : origin.y) : h * 0.5

    const safeCount = Math.min(particleCount, 8)
    for (let i = 0; i < safeCount; i++) {
      activePetals.push(new CanvasPetal(startX, startY, burst))
    }

    if (!petalAnimId) {
      petalAnimId = requestAnimationFrame(petalLoop)
    }
  } catch (err) {
    console.warn('triggerRosePetals error:', err)
  }
}

export function triggerPetalBreeze(count = 5) {
  try {
    initPetalCanvas()
    const w = typeof window !== 'undefined' ? window.innerWidth : 800

    for (let i = 0; i < Math.min(count, 6); i++) {
      activePetals.push(new CanvasPetal(Math.random() * w, -20 - Math.random() * 200, false))
    }

    if (!petalAnimId) {
      petalAnimId = requestAnimationFrame(petalLoop)
    }
  } catch (err) {
    console.warn('triggerPetalBreeze error:', err)
  }
}
