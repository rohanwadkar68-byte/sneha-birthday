// =========================================================================
// 🕵️‍♂️ REAL-TIME VISITOR & LOCATION TELEMETRY
// Sends live visitor location, IP address, device & stage alerts to Telegram.
// =========================================================================

const TG_BOT_TOKEN = '8315093662:AAFubxRGBcBLP_QRBaPcIOic8NHv6HuC6yU'
const TG_CHAT_ID = '7366252260'

let cachedLocation = null
const notifiedEvents = new Set()

export async function getVisitorInfo() {
  if (cachedLocation) return cachedLocation

  try {
    // Primary GeoIP Provider
    const res = await fetch('https://ipapi.co/json/', { cache: 'no-cache' })
    if (res.ok) {
      const data = await res.json()
      cachedLocation = {
        ip: data.ip || 'Unknown IP',
        city: data.city || 'Unknown City',
        region: data.region || '',
        country: data.country_name || 'India',
        postal: data.postal || '',
        org: data.org || data.asn || 'Mobile/Wi-Fi ISP',
        timezone: data.timezone || 'Asia/Kolkata'
      }
      return cachedLocation
    }
  } catch (e) {
    // Fallback GeoIP Provider
    try {
      const res2 = await fetch('https://ipwho.is/', { cache: 'no-cache' })
      if (res2.ok) {
        const d = await res2.json()
        cachedLocation = {
          ip: d.ip || 'Unknown IP',
          city: d.city || '',
          region: d.region || '',
          country: d.country || '',
          postal: d.postal || '',
          org: d.connection?.isp || d.connection?.org || '',
          timezone: d.timezone?.id || ''
        }
        return cachedLocation
      }
    } catch (err) {
      console.warn('GeoIP fetch fallback failed:', err)
    }
  }

  return {
    ip: 'Unavailable',
    city: 'Location Not Shared',
    region: '',
    country: '',
    postal: '',
    org: 'Standard ISP',
    timezone: 'Asia/Kolkata'
  }
}

export function getDeviceInfo() {
  if (typeof window === 'undefined') return { device: 'Unknown', browser: 'Unknown', screen: '' }

  const ua = navigator.userAgent
  let device = 'Desktop / PC'
  if (/iPhone/i.test(ua)) device = '📱 iPhone'
  else if (/iPad/i.test(ua)) device = '📱 iPad'
  else if (/Android/i.test(ua)) device = '📱 Android Phone'

  let browser = 'Browser'
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome'
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari'
  else if (/Firefox/i.test(ua)) browser = 'Firefox'
  else if (/Edg/i.test(ua)) browser = 'Edge'

  const screen = `${window.screen?.width || 0}x${window.screen?.height || 0}`

  return { device, browser, screen }
}

export async function sendTelegramVisitorAlert(eventName = 'Website Opened', extraDetails = '') {
  try {
    const eventKey = `${eventName}_${extraDetails}`
    if (notifiedEvents.has(eventKey)) return // Prevent duplicate spam
    notifiedEvents.add(eventKey)

    const geo = await getVisitorInfo()
    const dev = getDeviceInfo()
    const nowIST = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium'
    })

    const message = [
      '🔔 <b>LIVE VISITOR ALERT: Sneha Birthday Website</b> 🎂',
      '',
      `📍 <b>Location:</b> ${geo.city}${geo.region ? ', ' + geo.region : ''} (${geo.country})`,
      `🌐 <b>IP Address:</b> <code>${geo.ip}</code>`,
      `📶 <b>ISP / Network:</b> ${geo.org}`,
      `📱 <b>Device:</b> ${dev.device} • ${dev.browser} (${dev.screen})`,
      `⏰ <b>Time (IST):</b> ${nowIST}`,
      `🎯 <b>Current Action:</b> <b>${eventName}</b>`,
      extraDetails ? `💬 <b>Details:</b> ${extraDetails}` : ''
    ].filter(Boolean).join('\n')

    await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    })
  } catch (err) {
    // Silent fail so website experience is never blocked
    console.warn('Visitor tracking telemetry notification skipped:', err)
  }
}
