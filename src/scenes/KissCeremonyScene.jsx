import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import { KISS_CEREMONY_CONTENT } from '../utils/content.js'
import { TEDDY_WEBM, KISS_ANIMATIONS } from '../utils/assets.js'
import { playKissSound, playSparkle, playPop, playFanfare } from '../utils/audio.js'

export default function KissCeremonyScene({ onNext }) {
  const [step, setStep] = useState(1) // 1 | 2 | 3 | 4 | 5
  const [selectedOption, setSelectedOption] = useState(null)
  const [hearts, setHearts] = useState([])

  const spawnHearts = (e) => {
    const rect = e?.target?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top : window.innerHeight / 2
    const id = Date.now() + Math.random()
    setHearts((prev) => [...prev, { id, x, y }])
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id))
    }, 1200)
  }

  const handleStep1 = (e) => {
    playKissSound('cheek')
    setTimeout(() => playKissSound('nibble'), 180)
    spawnHearts(e)
    setStep(2)
  }

  const handleStep2 = (e) => {
    playKissSound('cheek')
    setTimeout(() => playKissSound('cheek'), 220)
    spawnHearts(e)
    setStep(3)
  }

  const handleStep3 = (e) => {
    playKissSound('forehead')
    spawnHearts(e)
    setStep(4)
  }

  const handleSelectOption = (opt) => {
    setSelectedOption(opt)
    playPop()
    playSparkle()
    playFanfare()
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff8fb1', '#ffd166', '#a855f7', '#ff4d6d', '#ffffff']
    })
    setStep(5)
  }

  return (
    <SceneShell wide>
      {/* Title Header */}
      <div className="hand-note" style={{ marginBottom: 2 }}>
        {KISS_CEREMONY_CONTENT.title}
      </div>

      {/* Floating Kiss Heart Particles */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, scale: 0.5, x: h.x - 12, y: h.y - 12 }}
            animate={{ opacity: 0, scale: 1.8, y: h.y - 100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              pointerEvents: 'none',
              zIndex: 9999,
              fontSize: 28,
              filter: 'drop-shadow(0 4px 10px rgba(247, 85, 138, 0.6))'
            }}
          >
            💋💖✨
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Interactive Ceremony Card Container */}
      <div
        style={{
          position: 'relative',
          width: 'min(480px, 94vw)',
          minHeight: 330,
          borderRadius: 28,
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 240, 248, 0.9))',
          border: '2.5px solid rgba(255, 255, 255, 0.98)',
          boxShadow: '0 24px 60px -10px rgba(225, 29, 72, 0.18), inset 0 2px 4px #ffffff',
          padding: '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 6
        }}
      >
        <AnimatePresence mode="wait">
          {/* STEP 1: Left Cheek Kiss & Soft Nibble */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              transition={SPRING}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}
            >
              <div style={{ margin: '2px 0 8px' }}>
                <img
                  src={KISS_ANIMATIONS[0]}
                  alt="Left Cheek Kiss"
                  style={{ width: 140, height: 140, objectFit: 'contain', borderRadius: 16, filter: 'drop-shadow(0 8px 18px rgba(247, 85, 138, 0.35))' }}
                />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--rose-deep)', margin: '4px 0' }}>
                Step 1: Left Cheek Kiss & Nibble 🫦
              </h3>
              <p className="subtitle" style={{ fontSize: '1.02rem', margin: '4px 0 14px' }}>
                {KISS_CEREMONY_CONTENT.step1.prompt}
              </p>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleStep1}
                style={{ marginTop: 6 }}
              >
                <span>{KISS_CEREMONY_CONTENT.step1.actionBtn}</span>
              </motion.button>
            </motion.div>
          )}

          {/* STEP 2: Right Cheek Kiss & Squish */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              transition={SPRING}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}
            >
              <div style={{ margin: '2px 0 8px' }}>
                <img
                  src={KISS_ANIMATIONS[4]}
                  alt="Right Cheek Kiss"
                  style={{ width: 140, height: 140, objectFit: 'contain', borderRadius: 16, filter: 'drop-shadow(0 8px 18px rgba(247, 85, 138, 0.35))' }}
                />
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--rose-deep)', fontWeight: 800, marginBottom: 2 }}>
                {KISS_CEREMONY_CONTENT.step1.reaction}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--rose-deep)', margin: '4px 0' }}>
                Step 2: Right Cheek Kiss & Squish 👉🫦
              </h3>
              <p className="subtitle" style={{ fontSize: '1.02rem', margin: '4px 0 14px' }}>
                {KISS_CEREMONY_CONTENT.step2.prompt}
              </p>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleStep2}
                style={{ marginTop: 6 }}
              >
                <span>{KISS_CEREMONY_CONTENT.step2.actionBtn}</span>
              </motion.button>
            </motion.div>
          )}

          {/* STEP 3: Forehead Sweet Kiss of Protection */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              transition={SPRING}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}
            >
              <div style={{ margin: '2px 0 8px' }}>
                <img
                  src={KISS_ANIMATIONS[1]}
                  alt="Forehead Kiss"
                  style={{ width: 140, height: 140, objectFit: 'contain', borderRadius: 16, filter: 'drop-shadow(0 8px 18px rgba(247, 85, 138, 0.35))' }}
                />
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--rose-deep)', fontWeight: 800, marginBottom: 2 }}>
                {KISS_CEREMONY_CONTENT.step2.reaction}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--rose-deep)', margin: '4px 0' }}>
                Step 3: Sweet Forehead Kiss 🥺✨
              </h3>
              <p className="subtitle" style={{ fontSize: '1.02rem', margin: '4px 0 14px' }}>
                {KISS_CEREMONY_CONTENT.step3.prompt}
              </p>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleStep3}
                style={{ marginTop: 6 }}
              >
                <span>{KISS_CEREMONY_CONTENT.step3.actionBtn}</span>
              </motion.button>
            </motion.div>
          )}

          {/* STEP 4: Interactive 4th Kiss Question */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              transition={SPRING}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}
            >
              <div style={{ margin: '2px 0 6px' }}>
                <img
                  src={KISS_ANIMATIONS[2]}
                  alt="Curious Teddy"
                  style={{ width: 120, height: 120, objectFit: 'contain', borderRadius: 16 }}
                />
              </div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--rose-deep)', margin: '4px 0' }}>
                {KISS_CEREMONY_CONTENT.step4.prompt}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 360, marginTop: 10 }}>
                {KISS_CEREMONY_CONTENT.step4.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.03, x: 4 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleSelectOption(opt)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: '2px solid var(--blush)',
                      borderRadius: 16,
                      padding: '10px 14px',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      color: 'var(--ink)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      boxShadow: '0 4px 12px rgba(247, 85, 138, 0.1)'
                    }}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5: Romantic Tease Climax ("Raat Ko Milegi!") */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={SPRING}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}
            >
              <div style={{ margin: '2px 0 6px' }}>
                <Teddy src={TEDDY_WEBM.blush[2] || TEDDY_WEBM.love[0]} size={145} glow />
              </div>
              <div
                style={{
                  background: 'linear-gradient(135deg, #fff0f6, #ffe0ef)',
                  border: '2px dashed var(--rose)',
                  borderRadius: 18,
                  padding: '12px 14px',
                  margin: '6px 0 12px',
                  fontSize: '0.96rem',
                  lineHeight: 1.45,
                  fontWeight: 700,
                  color: 'var(--ink)'
                }}
              >
                {KISS_CEREMONY_CONTENT.step4.revealDialog}
              </div>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={onNext}
                style={{ marginTop: 4 }}
              >
                <span>{KISS_CEREMONY_CONTENT.step4.finishBtn}</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneShell>
  )
}
