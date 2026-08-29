import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import Sticker from '../components/Sticker.jsx'
import EarthAgeDashboard from '../components/EarthAgeDashboard.jsx'
import { MEMORIES, BIRTH_DATE, SCRAPBOOK_UI } from '../utils/content.js'
import { POOKIE, TEDDY_WEBM } from '../utils/assets.js'
import { playSparkle, playPop } from '../utils/audio.js'

export default function ScrapbookScene({ onNext }) {
  const [flipped, setFlipped] = useState({})

  const handlePolaroidClick = (i) => {
    playPop()
    setFlipped((prev) => ({ ...prev, [i]: !prev[i] }))
  }

  const handleNext = () => {
    playSparkle()
    onNext()
  }

  return (
    <SceneShell wide>
      <div className="hand-note" style={{ marginBottom: 2 }}>
        {SCRAPBOOK_UI.heading}
      </div>
      <p className="subtitle" style={{ marginBottom: 6, fontSize: '0.95rem' }}>
        ({SCRAPBOOK_UI.flipHint})
      </p>

      {/* 🌍 Live Earth Age Stopwatch & Cosmic Milestones Dashboard */}
      <EarthAgeDashboard />

      <div
        style={{
          maxHeight: '56dvh',
          width: '100%',
          overflowY: 'auto',
          padding: '24px 8px 30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 36,
          scrollbarWidth: 'thin'
        }}
      >
        {MEMORIES.map((m, i) => {
          const isFlipped = !!flipped[i]
          return (
            <motion.div
              key={i}
              className="polaroid"
              initial={{ opacity: 0, y: 40, rotate: m.rot * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: m.rot }}
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePolaroidClick(i)}
              transition={{ type: 'spring', stiffness: 140, damping: 18 }}
              style={{
                transform: `rotate(${m.rot}deg)`,
                cursor: 'pointer',
                background: isFlipped ? '#fffdf7' : '#ffffff',
                border: isFlipped ? '2px solid var(--rose-border)' : '1px solid rgba(0,0,0,0.06)'
              }}
            >
              {/* Washi Tape Strip */}
              <div
                className="tape-strip"
                style={{ background: m.tape, '--tape-rot': `${m.rot * -2}deg` }}
              />

              {/* Memory Tag */}
              {m.tag && <div className="polaroid-tag">{isFlipped ? '💌 SECRET NOTE' : m.tag}</div>}

              {!isFlipped ? (
                <>
                  {/* Polaroid Photo Frame with Animated Die-Cut Memory Sticker */}
                  <div className="polaroid-img-box">
                    {m.customSticker ? (
                      m.customSticker.endsWith('.webm') ? (
                        <Teddy src={m.customSticker} size={125} float glow />
                      ) : (
                        <motion.img
                          src={m.customSticker}
                          alt="Memory sticker"
                          style={{ width: 120, height: 120, objectFit: 'contain', borderRadius: 14 }}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                        />
                      )
                    ) : (
                      <Sticker
                        src={POOKIE.webp[m.pookieIdx ?? (i * 4 + 2)]}
                        size={125}
                        dieCut
                        float
                      />
                    )}
                  </div>

                  {/* Title & Caption */}
                  <div style={{ marginTop: 12, textAlign: 'center' }}>
                    <div
                      style={{
                        fontSize: '0.86rem',
                        fontWeight: 800,
                        color: 'var(--rose-deep)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: 4
                      }}
                    >
                      {m.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-hand)',
                        fontSize: '1.45rem',
                        lineHeight: 1.3,
                        color: 'var(--ink)',
                        fontWeight: 600
                      }}
                    >
                      {m.text}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--rose-deep)', marginTop: 4, fontWeight: 700 }}>
                      (tap to flip & read secret ↺)
                    </div>
                  </div>
                </>
              ) : (
                /* Back of Polaroid (Secret Confession Note) */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: '20px 12px 14px',
                    textAlign: 'center',
                    minHeight: 220,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>🔒💖</div>
                  <div
                    style={{
                      fontFamily: 'var(--font-hand)',
                      fontSize: '1.5rem',
                      lineHeight: 1.35,
                      color: 'var(--ink)',
                      fontWeight: 700
                    }}
                  >
                    {m.secretNote}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--ink-soft)', marginTop: 12, fontWeight: 700 }}>
                    (tap again to flip back ↺)
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}

        {/* Bottom Love Teddy */}
        <div style={{ margin: '10px 0' }}>
          <Teddy src={TEDDY_WEBM.love[0]} size={145} glow />
        </div>
      </div>

      <button className="btn-primary" onClick={handleNext} style={{ marginTop: 10 }}>
        <span>{SCRAPBOOK_UI.nextBtn}</span>
      </button>
    </SceneShell>
  )
}
