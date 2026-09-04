import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getNextBirthday, getTimeRemaining, calculateAge, getBirthdayMode, getISTDate } from '../../utils/birthdayWorld.js'
import { playPop, playSparkle } from '../../utils/audio.js'

export default function BirthdayCountdown({ onOpenBirthday }) {
  const [now, setNow] = useState(() => new Date())
  const mode = getBirthdayMode(now)
  const nextBday = getNextBirthday(now)
  const remaining = getTimeRemaining(nextBday, now)
  const currentAge = calculateAge(now)
  const nextAge = currentAge + 1

  // Single clean interval for the live 1-second countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const cards = [
    { label: 'DAYS', value: String(remaining.days).padStart(2, '0') },
    { label: 'HOURS', value: String(remaining.hours).padStart(2, '0') },
    { label: 'MINUTES', value: String(remaining.minutes).padStart(2, '0') },
    { label: 'SECONDS', value: String(remaining.seconds).padStart(2, '0') }
  ]

  return (
    <div style={{
      width: '100%',
      maxWidth: 580,
      margin: '0 auto',
      textAlign: 'center',
      padding: '24px 20px',
      background: 'rgba(255, 255, 255, 0.88)',
      backdropFilter: 'blur(20px)',
      borderRadius: 28,
      boxShadow: '0 16px 40px rgba(244, 63, 94, 0.16)',
      border: '2px solid rgba(254, 205, 211, 0.8)'
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 16px',
        borderRadius: 999,
        background: 'rgba(244, 63, 94, 0.1)',
        color: '#e11d48',
        fontSize: '0.82rem',
        fontWeight: 800,
        letterSpacing: '0.04em',
        marginBottom: 12
      }}>
        <span>⏳</span>
        <span>NEXT BIRTHDAY: 01 SEPTEMBER • TURNING {nextAge}</span>
      </div>

      <h3 style={{
        margin: '0 0 16px',
        fontSize: '1.25rem',
        fontWeight: 800,
        color: '#1e293b'
      }}>
        {mode === 'pre-birthday' && 'Bas thoda aur wait, baccha... 👀'}
        {mode === 'post-birthday' && 'Next Birthday Ka Countdown Chalu Hai! 🚀'}
        {mode === 'birthday' && 'Aaj Ka Din Sirf Aapka Hai! 🎂✨'}
      </h3>

      {/* 4 Countdown Flip Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        marginBottom: 18
      }}>
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #fff1f2 100%)',
              border: '1.5px solid #fecdd3',
              borderRadius: 18,
              padding: '12px 6px',
              boxShadow: '0 6px 16px rgba(244, 63, 94, 0.08)'
            }}
          >
            <div style={{
              fontSize: '1.8rem',
              fontWeight: 900,
              fontFamily: 'monospace',
              color: '#e11d48',
              lineHeight: 1.1
            }}>
              {c.value}
            </div>
            <div style={{
              fontSize: '0.66rem',
              fontWeight: 800,
              color: '#94a3b8',
              letterSpacing: '0.06em',
              marginTop: 4
            }}>
              {c.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{
        fontSize: '0.88rem',
        color: '#64748b',
        fontWeight: 600,
        lineHeight: 1.4
      }}>
        {mode === 'birthday' ? (
          <button
            onClick={() => {
              playSparkle()
              onOpenBirthday && onOpenBirthday()
            }}
            style={{
              border: 'none',
              background: 'linear-gradient(135deg, #ff7597 0%, #f43f5e 100%)',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 800,
              padding: '12px 28px',
              borderRadius: 999,
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(244, 63, 94, 0.38)'
            }}
          >
            🎂 Birthday Surprise Kholo →
          </button>
        ) : (
          <span>
            Pura saal ye website zinda rahegi. Jab mann kare purana birthday yaad karne tab khol lena 🧸
          </span>
        )}
      </div>
    </div>
  )
}
