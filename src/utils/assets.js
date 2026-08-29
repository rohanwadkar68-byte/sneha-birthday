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
