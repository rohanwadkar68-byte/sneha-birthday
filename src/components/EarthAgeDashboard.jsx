import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playPop, playSparkle } from '../utils/audio.js'

export default function EarthAgeDashboard() {
  const [now, setNow] = useState(new Date())
  const [viewMode, setViewMode] = useState('detailed') // 'detailed' | 'cosmic'

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const birthDate = new Date('2003-09-01T00:00:00')
  const diffMs = Math.max(0, now - birthDate)

  // Calculations
  const totalSeconds = Math.floor(diffMs / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)

  // Breakdown in years, months, days
  let years = now.getFullYear() - birthDate.getFullYear()
  let months = now.getMonth() - birthDate.getMonth()
  let days = now.getDate() - birthDate.getDate()

  if (days < 0) {
    months -= 1
    const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    days += prevMonthDays
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  // Cosmic & Biological fun statistics
  const estimatedHeartbeats = Math.floor(totalMinutes * 75) // avg 75 bpm
  const estimatedSunsets = totalDays
  const runningYear = years + 1

  const handleToggle = () => {
    playPop()
    setViewMode((v) => (v === 'detailed' ? 'cosmic' : 'detailed'))
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 240, 248, 0.92))',
        border: '2px solid rgba(255, 255, 255, 0.9)',
        borderRadius: 24,
        padding: '14px 16px',
        width: '100%',
        maxWidth: 460,
        boxShadow: '0 10px 30px rgba(247, 85, 138, 0.15)',
        margin: '6px 0 10px',
        textAlign: 'center'
      }}
    >
      {/* Header Tag */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span
          style={{
            background: 'linear-gradient(135deg, #ff85a8, #f472b6)',
            color: '#fff',
            padding: '3px 12px',
            borderRadius: 999,
            fontSize: '0.74rem',
            fontWeight: 800,
            letterSpacing: '0.04em'
          }}
        >
          🌍 SNEHA'S TIME ON EARTH
        </span>
        <button
          onClick={handleToggle}
          style={{
            background: 'rgba(247, 85, 138, 0.1)',
            border: '1px solid var(--rose-border)',
            borderRadius: 999,
            padding: '2px 10px',
            fontSize: '0.72rem',
            fontWeight: 800,
            color: 'var(--rose-deep)',
            cursor: 'pointer'
          }}
        >
          {viewMode === 'detailed' ? '✨ Cosmic Mode' : '⏱️ Timer Mode'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'detailed' ? (
          <motion.div
            key="detailed"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            {/* Live Age Counter Digits */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: 6,
                marginTop: 4
              }}
            >
              {[
                { val: years, unit: 'Years' },
                { val: months, unit: 'Mos' },
                { val: days, unit: 'Days' },
                { val: String(hours).padStart(2, '0'), unit: 'Hrs' },
                { val: String(minutes).padStart(2, '0'), unit: 'Mins' },
                { val: String(seconds).padStart(2, '0'), unit: 'Secs', highlight: true }
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: item.highlight ? 'linear-gradient(135deg, #ffebf3, #ffd6e7)' : '#ffffff',
                    border: item.highlight ? '1.5px solid var(--rose-deep)' : '1px solid rgba(0,0,0,0.06)',
                    borderRadius: 12,
                    padding: '6px 2px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 900,
                      color: item.highlight ? 'var(--rose-deep)' : 'var(--ink)',
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  >
                    {item.val}
                  </div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--ink-soft)' }}>
                    {item.unit}
                  </div>
                </div>
              ))}
            </div>

            {/* Running Year Highlight */}
            <div
              style={{
                marginTop: 8,
                fontSize: '0.82rem',
                fontWeight: 800,
                color: 'var(--rose-deep)',
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '4px 10px',
                borderRadius: 999,
                display: 'inline-block'
              }}
            >
              👑 Duniya Ki <b>Sabse Pyaari & Gorgeous</b> Mommy! 💖
            </div>
          </motion.div>
        ) : (
          /* Cosmic & Biological Stats Mode */
          <motion.div
            key="cosmic"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 8,
              marginTop: 4
            }}
          >
            <div style={{ background: '#fff', borderRadius: 14, padding: '8px 10px', textAlign: 'left', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-soft)', fontWeight: 700 }}>☀️ Trips Around Sun</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--gold)' }}>{years} Complete (Yr {runningYear})</div>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: '8px 10px', textAlign: 'left', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-soft)', fontWeight: 700 }}>💓 Heartbeats on Earth</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--rose-deep)' }}>{(estimatedHeartbeats / 1000000).toFixed(1)}M+ Beats</div>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: '8px 10px', textAlign: 'left', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-soft)', fontWeight: 700 }}>🌅 Sunsets Blessed</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#f97316' }}>{estimatedSunsets.toLocaleString()}+ Days</div>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, padding: '8px 10px', textAlign: 'left', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-soft)', fontWeight: 700 }}>⏱️ Total Seconds Alive</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#8b5cf6', fontVariantNumeric: 'tabular-nums' }}>
                {(totalSeconds / 1000000).toFixed(2)}M Secs
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
