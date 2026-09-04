/**
 * 🧸 SNEHA BIRTHDAY WORLD — PERMANENT WORLD ENGINE & DYNAMIC CALCULATOR
 * 
 * Rules from Specification:
 * - Birth Date: 01 September 2003 (Fixed)
 * - Timezone: Asia/Kolkata
 * - Dynamic Age (Never hardcoded in UI)
 * - Dynamic Countdown (Never hardcoded " 365 days\)
 * - Automatic Modes: PRE-BIRTHDAY, BIRTHDAY DAY, POST-BIRTHDAY, ARCHIVE
 */

export const BIRTHDAY_CONFIG = {
 name: 'Sneha',
 birthYear: 2003,
 birthMonth: 8, // 0-indexed: 8 = September
 birthDay: 1, // 1st of September
 birthDateString: '2003-09-01',
 timezone: 'Asia/Kolkata',
 firstChapterYear: 2026
}

/**
 * Returns current Date adjusted to Asia/Kolkata (IST: UTC + 5:30)
 */
export function getISTDate(date = new Date()) {
 try {
 const istString = date.toLocaleString('en-US', { timeZone: BIRTHDAY_CONFIG.timezone })
 return new Date(istString)
 } catch {
 // Fallback: UTC + 5.5 hours
 const utc = date.getTime() + (date.getTimezoneOffset() * 60000)
 return new Date(utc + (3600000 * 5.5))
 }
}

/**
 * Calculates Sneha's exact age dynamically based on IST date.
 * Rule:
 * If today is before September 1: age = currentYear - 2003 - 1
 * If today is September 1 or after: age = currentYear - 2003
 */
export function calculateAge(date = new Date()) {
 const ist = getISTDate(date)
 const currentYear = ist.getFullYear()
 const month = ist.getMonth()
 const day = ist.getDate()

 if (month < BIRTHDAY_CONFIG.birthMonth || (month === BIRTHDAY_CONFIG.birthMonth && day < BIRTHDAY_CONFIG.birthDay)) {
 return currentYear - BIRTHDAY_CONFIG.birthYear - 1
 }
 return currentYear - BIRTHDAY_CONFIG.birthYear
}

/**
 * Checks whether TODAY is Sneha's Birthday (01 September in Asia/Kolkata)
 */
export function isBirthdayToday(date = new Date()) {
 const ist = getISTDate(date)
 return ist.getMonth() === BIRTHDAY_CONFIG.birthMonth && ist.getDate() === BIRTHDAY_CONFIG.birthDay
}

/**
 * Checks whether today is before September 1 in the current year
 */
export function isBeforeBirthday(date = new Date()) {
 const ist = getISTDate(date)
 const month = ist.getMonth()
 const day = ist.getDate()
 return month < BIRTHDAY_CONFIG.birthMonth || (month === BIRTHDAY_CONFIG.birthMonth && day < BIRTHDAY_CONFIG.birthDay)
}

/**
 * Returns the Date object of the NEXT upcoming birthday in IST
 */
export function getNextBirthday(date = new Date()) {
 const ist = getISTDate(date)
 const currentYear = ist.getFullYear()

 if (isBeforeBirthday(ist)) {
 return new Date(currentYear, BIRTHDAY_CONFIG.birthMonth, BIRTHDAY_CONFIG.birthDay, 0, 0, 0)
 }
 if (isBirthdayToday(ist)) {
 // If today is birthday, next one is next year
 return new Date(currentYear + 1, BIRTHDAY_CONFIG.birthMonth, BIRTHDAY_CONFIG.birthDay, 0, 0, 0)
 }
 // Post-birthday (September 2 through December 31)
 return new Date(currentYear + 1, BIRTHDAY_CONFIG.birthMonth, BIRTHDAY_CONFIG.birthDay, 0, 0, 0)
}

/**
 * Calculates live time remaining until target birthday
 */
export function getTimeRemaining(targetDate, fromDate = new Date()) {
 const istNow = getISTDate(fromDate)
 const diffMs = targetDate.getTime() - istNow.getTime()

 if (diffMs <= 0) {
 return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0, isPassed: true }
 }

 const seconds = Math.floor((diffMs / 1000) % 60)
 const minutes = Math.floor((diffMs / (1000 * 60)) % 60)
 const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24)
 const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

 return { days, hours, minutes, seconds, totalMs: diffMs, isPassed: false }
}

/**
 * Resolves current website mode: 'birthday' | 'pre-birthday' | 'post-birthday'
 */
export function getBirthdayMode(date = new Date()) {
 if (isBirthdayToday(date)) return 'birthday'
 if (isBeforeBirthday(date)) return 'pre-birthday'
 return 'post-birthday'
}

/**
 * Resolves which chapter year is current/relevant
 */
export function getRelevantChapterYear(date = new Date()) {
 const ist = getISTDate(date)
 const year = ist.getFullYear()

 if (isBirthdayToday(ist)) return year
 if (isBeforeBirthday(ist)) return year - 1
 return year
}
