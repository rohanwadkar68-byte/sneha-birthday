import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SceneShell from '../components/SceneShell.jsx'
import { FAKE_LOADING_STEPS, GIRL } from '../utils/content.js'
import Teddy from '../components/Teddy.jsx'
import { TEDDY_WEBM } from '../utils/assets.js'
import { blip, playSparkle, startMusic } from '../utils/audio.js'

export default function FakeLoading({ onDone, duration = 4000 }) {
  const total = FAKE_LOADING_STEPS.length
  const [step, setStep] = useState(0)

  useEffect(() => {
    startMusic() // Attempt autoplay on mount
    const timer = setInterval(() => {
      setStep((s) => {
        if (s + 1 >= total) {
          clearInterval(timer)
          playSparkle()
          setTimeout(onDone, 650)
          return s
        }
        blip(480 + (s + 1) * 60)
        return s + 1
      })
    }, duration / (total - 1))
    return () => clearInterval(timer)
  }, [duration, onDone, total])

  const current = FAKE_LOADING_STEPS[Math.min(step, total - 1)]

  return (
    <SceneShell>
      <div
        onClick={startMusic}
        onTouchStart={startMusic}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 460, cursor: 'pointer' }}
      >
        <Teddy
          src={step >= total - 2 ? TEDDY_WEBM.happy[0] : TEDDY_WEBM.curious[0]}
          size={160}
          glow={step >= total - 2}
        />
        <div className="loading-title">
          Load ho raha hai… bas ek second bharosa rakhiye 🙏
        </div>
        <div className="loading-track">
          <motion.div
            className="loading-fill"
            initial={{ width: 0 }}
            animate={{ width: `${current.pct}%` }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        </div>
        <motion.div
          key={step}
          className="loading-label"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {current.label.replace('{name}', GIRL)}
          <span style={{ opacity: 0.6, fontWeight: 700 }}> {Math.round(current.pct)}%</span>
        </motion.div>
        {step >= total - 2 && (
          <motion.div
            className="hand-note"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ fontSize: '1.4rem', marginTop: 8 }}
          >
            bas, ab asli surprise shuru 🎁✨
          </motion.div>
        )}
      </div>
    </SceneShell>
  )
}
