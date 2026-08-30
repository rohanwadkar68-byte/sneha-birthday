import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import useBlowDetection from '../hooks/useBlowDetection.js'
import { playCandleBlow, playFanfare, playSparkle, playPop } from '../utils/audio.js'
import { TEDDY_WEBM, triggerRosePetals } from '../utils/assets.js'
import { CAKE_UI } from '../utils/content.js'

const CANDLE_COUNT = 3

export default function CakeScene({ onNext }) {
  const [lit, setLit] = useState(Array(CANDLE_COUNT).fill(true))
  const [cutStep, setCutStep] = useState('candles') // 'candles' | 'ready_to_cut' | 'cutting' | 'sliced'
  const [biteCount, setBiteCount] = useState(0)

  const blowOutOne = () => {
    setLit((prev) => {
      const next = [...prev]
      const idx = next.indexOf(true)
      if (idx !== -1) {
        next[idx] = false
        playCandleBlow()

        if (!next.includes(true)) {
          setTimeout(() => {
            playSparkle()
            triggerRosePetals({ particleCount: 30, origin: { x: 0.5, y: 0.45 } })
            setCutStep('ready_to_cut')
          }, 600)
        }
      }
      return next
    })
  }

  const { state, start } = useBlowDetection(blowOutOne)
  const litCount = lit.filter(Boolean).length

  const handleCutCake = () => {
    playPop()
    setCutStep('cutting')

    setTimeout(() => {
      playFanfare()
      playSparkle()
      setCutStep('sliced')
      triggerRosePetals({
        particleCount: 70,
        origin: { x: 0.5, y: 0.52 },
        burst: true
      })
    }, 1000)
  }

  const handleBite = () => {
    playSparkle()
    setBiteCount((b) => b + 1)
    triggerRosePetals({
      particleCount: 25,
      origin: { x: 0.5, y: 0.62 },
      burst: true
    })
  }

  return (
    <SceneShell wide>
      {/* 🐻 Animated Teddy Presenting Cake Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 2 }}
      >
        {cutStep === 'sliced' ? (
          <motion.img
            src="assets/kisses/bubu_kiss_3.gif"
            alt="Cake Feeding Kiss"
            style={{
              width: 88,
              height: 88,
              objectFit: 'contain',
              borderRadius: 16,
              filter: 'drop-shadow(0 6px 16px rgba(247, 85, 138, 0.4))'
            }}
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        ) : (
          <Teddy
            src={
              cutStep === 'candles'
                ? TEDDY_WEBM.food[0] || TEDDY_WEBM.happy[0]
                : TEDDY_WEBM.curious[0]
            }
            size={84}
          />
        )}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '4px 14px',
            borderRadius: 999,
            fontSize: '0.82rem',
            fontWeight: 800,
            color: 'var(--rose-deep)',
            boxShadow: '0 2px 10px rgba(247, 85, 138, 0.15)',
            border: '1.5px solid rgba(255, 255, 255, 0.9)'
          }}
        >
          {cutStep === 'candles' && '🎂 Mommy, cake aa gaya! Pehle wish karo aur phooko! ✨'}
          {cutStep === 'ready_to_cut' && '🔪 Wish complete! Ab knife se cake cut karo!'}
          {cutStep === 'cutting' && '🍰 Cut ho raha hai… ekdam perfect!'}
          {cutStep === 'sliced' && '😋 Yayyy! Pehla bite Mommy ke liye!'}
        </div>
      </motion.div>

      <p className="subtitle" style={{ marginBottom: 8, fontSize: '0.92rem' }}>
        {cutStep === 'candles' && '(candles phooko ya tap karke bujhao)'}
        {cutStep === 'ready_to_cut' && '(golden knife se cake par slice lagayein!)'}
        {cutStep === 'sliced' && '(cake slice par tap karke bite khilayein!)'}
      </p>

      {/* 🎂 Realistic Luxury Haute-Pâtisserie 3D Cake Visual */}
      <div
        style={{
          position: 'relative',
          width: 320,
          height: 270,
          margin: '6px auto 12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          perspective: 1000
        }}
      >
        {/* Fine Marble & Gold Leaf Platter */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 290,
            height: 24,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 50% 40%, #ffffff 0%, #f8fafc 60%, #cbd5e1 100%)',
            border: '2px solid #ffd700',
            boxShadow: '0 16px 36px rgba(0,0,0,0.18), inset 0 2px 6px rgba(255,215,0,0.6)',
            zIndex: 1
          }}
        />

        {/* Cake Bottom Tier: Belgian Chocolate Ganache & Rose Velvet */}
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 240,
            height: 96,
            borderRadius: '24px 24px 28px 28px',
            background: 'linear-gradient(180deg, #be123c 0%, #881337 40%, #4c0519 100%)',
            boxShadow: '0 14px 32px rgba(76, 5, 25, 0.45), inset 0 3px 8px rgba(255,255,255,0.4)',
            border: '1.5px solid rgba(255,255,255,0.4)',
            zIndex: 2,
            overflow: 'hidden'
          }}
        >
          {/* Gloss Mirror Glaze Light Reflection */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '10%',
              width: '80%',
              height: 18,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
              borderRadius: 999,
              opacity: 0.7
            }}
          />

          {/* Gold Flakes Accents */}
          {[15, 60, 110, 160, 205].map((x, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: 24 + (i % 3) * 16,
                left: x,
                width: 5 + (i % 2) * 3,
                height: 5 + (i % 2) * 3,
                background: 'linear-gradient(135deg, #ffd700, #f59e0b)',
                borderRadius: '40% 60% 70% 30%',
                boxShadow: '0 0 6px rgba(255,215,0,0.8)',
                transform: `rotate(${i * 45}deg)`
              }}
            />
          ))}
        </div>

        {/* Cake Top Tier: Champagne Rose Cream & Gold Leaf Filigree */}
        <div
          style={{
            position: 'absolute',
            bottom: 102,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 170,
            height: 72,
            borderRadius: '18px 18px 22px 22px',
            background: 'linear-gradient(180deg, #fff1f2 0%, #fecdd3 60%, #fda4af 100%)',
            boxShadow: '0 10px 24px rgba(225, 29, 72, 0.25), inset 0 2px 6px #ffffff',
            border: '2px solid rgba(255,255,255,0.9)',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Custom Engraved Gold Birthday Plaque */}
          <div
            style={{
              background: 'linear-gradient(135deg, #fef08a 0%, #ffd700 50%, #b45309 100%)',
              padding: '4px 14px',
              borderRadius: 999,
              fontSize: '0.74rem',
              fontWeight: 900,
              color: '#451a03',
              boxShadow: '0 3px 10px rgba(0,0,0,0.25), inset 0 1px 2px #fff',
              letterSpacing: '0.06em',
              border: '1px solid #ffffff'
            }}
          >
            👑 QUEEN SNEHA 👑
          </div>
        </div>

        {/* 🍰 Sliced Detached Triangular Cake Slice on Luxury Plate */}
        {cutStep === 'sliced' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, x: 92, y: 16 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            onClick={handleBite}
            style={{
              position: 'absolute',
              bottom: 18,
              left: '42%',
              width: 82,
              height: 78,
              background: 'linear-gradient(135deg, #9f1239 0%, #4c0519 100%)',
              borderRadius: '10px 26px 16px 8px',
              border: '2.5px solid #fff',
              boxShadow: '0 14px 30px rgba(0,0,0,0.3)',
              zIndex: 10,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              padding: 4
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            {/* Sponge & Cream Layers Visual inside Slice */}
            <div style={{ width: '80%', height: 4, background: '#fda4af', borderRadius: 2, marginBottom: 3 }} />
            <div style={{ width: '80%', height: 4, background: '#fff', borderRadius: 2, marginBottom: 3 }} />
            <div style={{ width: '80%', height: 4, background: '#fda4af', borderRadius: 2 }} />
            <div style={{ fontSize: '0.64rem', fontWeight: 900, textAlign: 'center', marginTop: 4, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              {biteCount === 0 ? '🍰 Tap To Eat' : biteCount === 1 ? 'Sneha Yum! 😋' : 'Teammate Bite! 🤤'}
            </div>
          </motion.div>
        )}

        {/* 3 Luxury Champagne Candles */}
        {[-44, 0, 44].map((offset, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: 164,
              left: `calc(50% + ${offset}px)`,
              transform: 'translateX(-50%)',
              width: 8,
              height: 42,
              borderRadius: 4,
              background: 'linear-gradient(180deg, #ffffff 0%, #fef08a 30%, #ffd700 70%, #d97706 100%)',
              boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
              zIndex: 4,
              border: '1px solid rgba(255,255,255,0.8)'
            }}
          >
            <AnimatePresence>
              {lit[i] ? (
                <motion.div
                  key="flame"
                  exit={{ scale: 0, y: -18, opacity: 0, transition: { duration: 0.3 } }}
                  style={{
                    position: 'absolute',
                    left: -6,
                    top: -24,
                    width: 20,
                    height: 28,
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    background: 'radial-gradient(circle at 50% 75%, #ffffff 0%, #fef08a 35%, #f59e0b 75%, #dc2626 100%)',
                    boxShadow: '0 0 24px 10px rgba(245, 158, 11, 0.75)'
                  }}
                  animate={{ scaleY: [1, 1.25, 0.95, 1.15, 1], scaleX: [1, 0.95, 1.05, 0.98, 1] }}
                  transition={{ repeat: Infinity, duration: 0.7 + i * 0.12 }}
                />
              ) : (
                <motion.div
                  key="smoke"
                  initial={{ opacity: 0.8, y: -4, scale: 0.4 }}
                  animate={{ opacity: 0, y: -34, scale: 1.8 }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  style={{ position: 'absolute', left: -2, top: -16, fontSize: 14, pointerEvents: 'none' }}
                >
                  💨
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* 🔪 Luxury Chef's Damascus Golden Slicing Knife */}
        {(cutStep === 'ready_to_cut' || cutStep === 'cutting') && (
          <motion.div
            initial={{ opacity: 0, y: -80, x: 40, rotate: -30 }}
            animate={
              cutStep === 'cutting'
                ? { opacity: 1, y: 45, x: 0, rotate: 0 }
                : { opacity: 1, y: -30, x: 30, rotate: -25 }
            }
            transition={{ type: 'spring', stiffness: 180, damping: 16 }}
            style={{
              position: 'absolute',
              top: 15,
              left: '52%',
              zIndex: 20,
              pointerEvents: 'none'
            }}
          >
            {/* Knife Blade with Specular Shimmer */}
            <div
              style={{
                width: 16,
                height: 130,
                background: 'linear-gradient(90deg, #ffffff 0%, #fef08a 25%, #ffd700 65%, #b45309 100%)',
                borderRadius: '2px 2px 18px 18px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                border: '1.5px solid #ffffff'
              }}
            />
            {/* Knife Wooden/Gold Handle */}
            <div
              style={{
                width: 14,
                height: 36,
                background: 'linear-gradient(90deg, #78350f, #451a03)',
                borderRadius: '4px 4px 0 0',
                margin: '-166px auto 0',
                border: '1px solid #ffd700'
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Control Buttons based on Ceremony Phase */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 4 }}>
        {cutStep === 'candles' && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              className="btn-primary"
              onClick={blowOutOne}
              style={{ marginTop: 0, padding: '12px 24px', fontSize: '0.96rem' }}
            >
              <span>{CAKE_UI.blowTapBtn} ({litCount})</span>
            </button>
            {state === 'idle' && (
              <button
                className="btn-ghost"
                onClick={start}
                style={{ marginTop: 0, padding: '10px 18px', fontSize: '0.88rem' }}
              >
                <span>{CAKE_UI.blowMicBtn}</span>
              </button>
            )}
          </div>
        )}

        {cutStep === 'ready_to_cut' && (
          <motion.button
            className="btn-primary"
            onClick={handleCutCake}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: [1, 1.04, 1], opacity: 1 }}
            transition={{ scale: { repeat: Infinity, duration: 1.6 } }}
            style={{ marginTop: 0, background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}
          >
            <span>{CAKE_UI.cutBtn}</span>
          </motion.button>
        )}

        {cutStep === 'sliced' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--rose-deep)' }}>
              {biteCount === 0 && CAKE_UI.slicedBite0}
              {biteCount === 1 && CAKE_UI.slicedBite1}
              {biteCount >= 2 && CAKE_UI.slicedBite2}
            </div>
            <button className="btn-primary" onClick={onNext} style={{ marginTop: 4 }}>
              <span>{CAKE_UI.nextBtn}</span>
            </button>
          </motion.div>
        )}
      </div>
    </SceneShell>
  )
}
