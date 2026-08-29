import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import Sticker from '../components/Sticker.jsx'
import CutenessMeter from '../components/CutenessMeter.jsx'
import { COMPLIMENTS, COMPLIMENTS_UI } from '../utils/content.js'
import { POOKIE, TEDDY_WEBM, getTeddyWebm } from '../utils/assets.js'
import { playSparkle, blip } from '../utils/audio.js'

export default function ComplimentDeck({ onNext }) {
  const [index, setIndex] = useState(0)
  const [squishCount, setSquishCount] = useState(0)
  const card = COMPLIMENTS[index]
  const last = index === COMPLIMENTS.length - 1

  const advance = () => {
    if (!last) {
      playSparkle()
      setIndex((i) => i + 1)
    }
  }

  const prev = () => {
    if (index > 0) {
      blip(520)
      setIndex((i) => i - 1)
    }
  }

  return (
    <SceneShell>
      <div className="hand-note" style={{ marginBottom: 2 }}>
        {COMPLIMENTS_UI.heading}
      </div>

      {/* 💋 Interactive Playful Nibble & Squish Pass */}
      <motion.div
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          playPop()
          setSquishCount((s) => (s + 1) % 4)
        }}
        style={{
          background: 'rgba(255, 255, 255, 0.92)',
          borderRadius: 999,
          padding: '5px 16px',
          fontSize: '0.78rem',
          fontWeight: 800,
          color: 'var(--rose-deep)',
          border: '1.5px solid var(--rose-border)',
          boxShadow: '0 2px 8px rgba(247, 85, 138, 0.15)',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 6
        }}
      >
        <span>
          {squishCount === 0 && '🤤 Target: Soft Cheek Squish (0% escape)'}
          {squishCount === 1 && '🫦 Target: Neck & Collarbone Soft Nibbles 🙈'}
          {squishCount === 2 && '🫂 Target: Warm Cuddle & Forehead Hugs'}
          {squishCount === 3 && '🤭 Target: 100% Naughty Teasing Mode On!'}
        </span>
        <span style={{ fontSize: '0.68rem', color: 'var(--ink-soft)', opacity: 0.8 }}>(tap ↺)</span>
      </motion.div>

      {/* 🃏 3D Holographic Photocard */}
      <div className="photocard-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="photocard-3d"
            initial={{ rotateY: 85, opacity: 0, scale: 0.88 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: -85, opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.36, ease: 'easeOut' }}
            onClick={() => !last && advance()}
            style={{
              background: card.gradient || 'linear-gradient(135deg, #fff0f6 0%, #ffe6f2 100%)',
              cursor: last ? 'default' : 'pointer'
            }}
          >
            {/* Holographic Rainbow Foil Reflection */}
            <div className="photocard-foil" />

            {/* Top Bar with Badge and Counter */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
              <span
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  padding: '4px 14px',
                  borderRadius: 999,
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: 'var(--rose-deep)',
                  boxShadow: '0 2px 8px rgba(247, 85, 138, 0.18)'
                }}
              >
                {card.title || `Reason #${index + 1}`}
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--ink-soft)' }}>
                {index + 1} / {COMPLIMENTS.length}
              </span>
            </div>

            {/* Animated Die-Cut Character Sticker with Squish Tap Interaction */}
            <motion.div
              style={{ margin: '2px 0', zIndex: 2, cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
              whileTap={{ scale: 0.88, rotate: -6 }}
              onClick={(e) => {
                e.stopPropagation()
                playPop()
              }}
            >
              {card.customSticker ? (
                card.customSticker.endsWith('.webm') ? (
                  <Teddy src={card.customSticker} size={124} float glow />
                ) : (
                  <motion.img
                    src={card.customSticker}
                    alt="Milk and Mocha Romance"
                    style={{
                      width: 124,
                      height: 124,
                      objectFit: 'contain',
                      borderRadius: 16,
                      filter: 'drop-shadow(0 8px 18px rgba(247, 85, 138, 0.35))'
                    }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  />
                )
              ) : (
                <Teddy
                  src={
                    card.teddyWebm !== undefined
                      ? getTeddyWebm(card.teddyWebm)
                      : TEDDY_WEBM[card.teddyMood]?.[0] || TEDDY_WEBM.happy[0]
                  }
                  size={124}
                  float
                  glow
                />
              )}
            </motion.div>

            {/* Romantic Compliment Text */}
            <div
              style={{
                fontSize: '1.08rem',
                lineHeight: 1.42,
                fontWeight: 700,
                color: 'var(--ink)',
                textAlign: 'center',
                padding: '0 6px',
                zIndex: 2
              }}
            >
              {card.text}
            </div>

            {/* Bottom Hint */}
            <div style={{ fontSize: '0.75rem', color: 'var(--ink-soft)', opacity: 0.75, fontWeight: 700, zIndex: 2 }}>
              {!last ? 'tap karke agli wajah dekhein →' : '💖 poora dil aapka hi hai 💖'}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
        {index > 0 && (
          <button className="btn-ghost" onClick={prev} style={{ marginTop: 0, padding: '8px 20px', fontSize: '0.9rem' }}>
            ← peeche
          </button>
        )}
        {!last && (
          <button className="btn-ghost" onClick={advance} style={{ marginTop: 0, padding: '8px 24px', fontSize: '0.9rem' }}>
            agli wajah 👉
          </button>
        )}
      </div>

      {/* Reactive WebM Teddy at bottom */}
      <div style={{ marginTop: 4 }}>
        <Teddy emotion={card.teddyMood || 'blush'} size={95} float={false} glow />
      </div>

      {/* Dynamic Cuteness Meter */}
      <CutenessMeter level={(index / (COMPLIMENTS.length - 1)) * 100} />

      {last && (
        <motion.button
          className="btn-primary"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={onNext}
          style={{ marginTop: 12 }}
        >
          <span>{COMPLIMENTS_UI.finishBtn}</span>
        </motion.button>
      )}
    </SceneShell>
  )
}
