import { motion } from 'framer-motion'
import { getAllChaptersList } from '../../data/chapters/chapterRegistry.js'
import { playPop, playSparkle } from '../../utils/audio.js'

export default function BirthdayArchive({ onSelectChapter, onClose, onSurpriseMe }) {
  const chapters = getAllChaptersList()

  return (
    <div style={{
      width: '100%',
      maxWidth: 680,
      margin: '0 auto',
      padding: '24px 18px',
      background: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(25px)',
      borderRadius: 32,
      boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
      border: '2px solid rgba(254, 205, 211, 0.9)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.78rem',
            fontWeight: 800,
            color: '#e11d48',
            background: '#ffe4e6',
            padding: '4px 12px',
            borderRadius: 999,
            marginBottom: 6
          }}>
            <span>📔</span>
            <span>PERMANENT MEMORIES VAULT</span>
          </div>
          <h2 style={{
            margin: 0,
            fontSize: '1.45rem',
            fontWeight: 900,
            color: '#1e293b'
          }}>
            Birthday Archive 🧸
          </h2>
          <p style={{
            margin: '4px 0 0',
            fontSize: '0.86rem',
            color: '#64748b',
            fontWeight: 600
          }}>
            Har saal ka ek naya chapter, hamesha ke liye zinda.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: '#f1f5f9',
              color: '#475569',
              width: 36,
              height: 36,
              borderRadius: '50%',
              fontSize: '1.1rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Random Surprise Button */}
      <div style={{ marginBottom: 18, textAlign: 'center' }}>
        <button
          onClick={() => {
            playSparkle()
            onSurpriseMe && onSurpriseMe()
          }}
          style={{
            background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
            border: '1.5px dashed #f472b6',
            color: '#be185d',
            padding: '8px 18px',
            borderRadius: 999,
            fontSize: '0.84rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(244, 114, 182, 0.15)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <span>✨</span>
          <span>Surprise Me (Open Random Memory)</span>
        </button>
      </div>

      {/* Chapters Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {chapters.map((ch) => (
          <motion.div
            key={ch.year}
            whileHover={ch.available ? { scale: 1.02, y: -2 } : {}}
            style={{
              background: ch.available ? '#ffffff' : '#f8fafc',
              border: ch.available ? '2px solid #fda4af' : '1.5px solid #e2e8f0',
              borderRadius: 24,
              padding: '16px 18px',
              boxShadow: ch.available ? '0 8px 24px rgba(244, 63, 94, 0.12)' : 'none',
              opacity: ch.available ? 1 : 0.75,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 12
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: '1.4rem' }}>{ch.icon}</span>
                  <span style={{
                    fontSize: '1.15rem',
                    fontWeight: 900,
                    color: ch.available ? '#e11d48' : '#64748b'
                  }}>
                    {ch.year} • Level {ch.age}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: ch.available ? '#ffe4e6' : '#f1f5f9',
                    color: ch.available ? '#be185d' : '#94a3b8'
                  }}>
                    {ch.badge}
                  </span>
                </div>

                <div style={{
                  fontSize: '0.94rem',
                  fontWeight: 800,
                  color: '#334155',
                  marginBottom: 4
                }}>
                  {ch.title}
                </div>

                <div style={{
                  fontSize: '0.82rem',
                  color: '#64748b',
                  lineHeight: 1.45,
                  fontWeight: 500,
                  maxWidth: 460
                }}>
                  {ch.description}
                </div>
              </div>

              {/* Action Button */}
              <div>
                {ch.available ? (
                  <button
                    onClick={() => {
                      playSparkle()
                      onSelectChapter && onSelectChapter(ch.year)
                    }}
                    style={{
                      border: 'none',
                      background: 'linear-gradient(135deg, #ff7597 0%, #f43f5e 100%)',
                      color: '#fff',
                      fontSize: '0.86rem',
                      fontWeight: 800,
                      padding: '9px 18px',
                      borderRadius: 999,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(244, 63, 94, 0.32)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Open Memory →
                  </button>
                ) : (
                  <div style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    color: '#94a3b8',
                    padding: '8px 14px',
                    borderRadius: 999,
                    background: '#e2e8f0',
                    whiteSpace: 'nowrap'
                  }}>
                    {ch.unlockDate || 'Coming Soon'}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
