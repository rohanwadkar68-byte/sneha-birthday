import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import { LOVE_COUPONS, SCRATCH_UI } from '../utils/content.js'
import { TEDDY_WEBM, triggerRosePetals } from '../utils/assets.js'
import { playSparkle, playPop } from '../utils/audio.js'

export default function ScratchCardScene({ onNext }) {
  const [unlocked, setUnlocked] = useState({})

  const handleScratch = (id) => {
    if (!unlocked[id]) {
      playPop()
      playSparkle()
      triggerRosePetals({
        particleCount: 30,
        origin: { x: 0.5, y: 0.6 },
        burst: true
      })
      setUnlocked((prev) => ({ ...prev, [id]: true }))
    }
  }

  const allUnlocked = Object.keys(unlocked).length >= LOVE_COUPONS.length

  const handleNext = () => {
    playSparkle()
    onNext()
  }

  return (
    <SceneShell wide>
      <div className="hand-note" style={{ marginBottom: 2 }}>
        {SCRATCH_UI.heading}
      </div>
      <p className="subtitle" style={{ marginBottom: 12, fontSize: '0.95rem' }}>
        {SCRATCH_UI.subtitle}
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          width: '100%',
          maxWidth: 440,
          margin: '4px 0 10px'
        }}
      >
        {LOVE_COUPONS.map((c) => {
          const isRevealed = !!unlocked[c.id]
          return (
            <motion.div
              key={c.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleScratch(c.id)}
              style={{
                position: 'relative',
                background: isRevealed ? c.color : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
                borderRadius: 18,
                padding: '14px 18px',
                border: '2px dashed rgba(255,255,255,0.8)',
                boxShadow: isRevealed ? '0 8px 24px rgba(247, 85, 138, 0.25)' : 'var(--shadow-card)',
                cursor: isRevealed ? 'default' : 'pointer',
                overflow: 'hidden',
                transition: 'background 0.4s ease, box-shadow 0.4s ease'
              }}
            >
              {/* Scratch Foil Overlay */}
              {!isRevealed ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: '#475569',
                    fontWeight: 800
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.4rem' }}>🔒</span>
                    <div>
                      <div style={{ fontSize: '0.95rem', color: '#1e293b' }}>Mystery VIP Coupon #{c.id}</div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>Tap to scratch off foil ✨</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '1.2rem' }}>✨</span>
                </div>
              ) : (
                /* Unlocked Prize */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ color: '#fff', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                        {c.icon} {c.title}
                      </span>
                      <span
                        style={{
                          background: 'rgba(255,255,255,0.3)',
                          padding: '2px 8px',
                          borderRadius: 999,
                          fontSize: '0.68rem',
                          fontWeight: 900,
                          letterSpacing: '0.05em'
                        }}
                      >
                        {c.stamp}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 600, opacity: 0.95, lineHeight: 1.35, textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>
                      {c.desc}
                    </div>
                  </div>
                  {c.customSticker ? (
                    c.customSticker.endsWith('.webm') ? (
                      <Teddy src={c.customSticker} size={64} float={false} />
                    ) : (
                      <img
                        src={c.customSticker}
                        alt="Coupon prize"
                        style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: 12 }}
                      />
                    )
                  ) : (
                    <Teddy
                      src={[TEDDY_WEBM.love[1], TEDDY_WEBM.food[0], TEDDY_WEBM.party[1]][c.id - 1]}
                      size={64}
                      float={false}
                    />
                  )}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      <Teddy src={allUnlocked ? TEDDY_WEBM.party[0] : TEDDY_WEBM.excited[0]} size={120} glow={allUnlocked} />

      <motion.button
        className="btn-primary"
        onClick={handleNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        style={{ marginTop: 10 }}
      >
        <span>{allUnlocked ? SCRATCH_UI.nextBtnUnlocked : SCRATCH_UI.nextBtnLocked}</span>
      </motion.button>
    </SceneShell>
  )
}
