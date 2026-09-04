/**
 * 📔 SNEHA'S BIRTHDAY WORLD — CHAPTER REGISTRY
 * 
 * Rules from Specification:
 * - Every birthday gets one immutable chapter.
 * - 2026 = Chapter 01 (Age 23)
 * - 2027 = Chapter 02 (Age 24)
 * - 2028 = Chapter 03 (Age 25)
 * - Future chapters show " Coming Soon\ until built.
 * - Never overwrite old chapters.
 */

export const BIRTHDAY_CHAPTERS = {
 2026: {
 year: 2026,
 age: 23,
 chapterNumber: 1,
 title: 'Chapter 01 — Level 23',
 subtitle: 'The First Birthday World',
 tagline: '6 Months of Closeness, 12 AM Attendance & 3 AM Cuddles 🧸',
 description: 'Hamari pehli birthday memory: Free Fire ki random meeting se lekar daily late night bakbak, Teddy room, Compliment cards, emotional letters, cake cutting aur signature 3 AM cuddle.',
 available: true,
 badge: 'Completed ✨',
 icon: '🧸',
 route: '/birthday/2026',
 coverTheme: 'linear-gradient(135deg, #ff7597 0%, #f43f5e 100%)',
 stats: {
 scenes: 17,
 songs: 2,
 teddies: 2,
 specialTime: '03:01 AM'
 }
 },

 2027: {
 year: 2027,
 age: 24,
 chapterNumber: 2,
 title: 'Chapter 02 — Level 24',
 subtitle: 'Next Birthday Adventure',
 tagline: 'Unlocks on 01 September 2027 🎂',
 description: 'Sneha ke 24th birthday ka agla surprise chapter. Secretly in progress...',
 available: false,
 badge: 'Coming Soon 🔒',
 icon: '✨',
 route: '/birthday/2027',
 coverTheme: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
 unlockDate: '01 September 2027'
 },

 2028: {
 year: 2028,
 age: 25,
 chapterNumber: 3,
 title: 'Chapter 03 — Level 25',
 subtitle: 'Quarter-Century Milestone',
 tagline: 'Unlocks on 01 September 2028 🌟',
 description: 'Sneha ka 25th Silver Jubilee chapter. Hamesha ke liye preserved.',
 available: false,
 badge: 'Locked 🔒',
 icon: '🌟',
 route: '/birthday/2028',
 coverTheme: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
 unlockDate: '01 September 2028'
 }
}

/**
 * Returns chapter metadata or fallback safe object if not yet registered
 */
export function getChapter(year) {
 const numYear = Number(year)
 if (BIRTHDAY_CHAPTERS[numYear]) {
 return BIRTHDAY_CHAPTERS[numYear]
 }

  return {
    year: numYear,
    chapterNumber: numYear - 2026 + 1,
    title: 'Chapter ' + (numYear - 2026 + 1) + ' — Level ' + (numYear - 2003),
    subtitle: 'Future Chapter',
    description: 'Is saal ka chapter abhi ready nahi hai. Thoda wait kijiye ji 🧸',
    available: false,
    badge: 'Coming Soon 🔒',
    icon: '🎁',
    route: '/birthday/' + numYear
  }
}

export function getAllChaptersList() {
 return Object.values(BIRTHDAY_CHAPTERS).sort((a, b) => b.year - a.year)
}
