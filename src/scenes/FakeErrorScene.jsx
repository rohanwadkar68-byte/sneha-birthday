import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneShell from '../components/SceneShell.jsx'
import { FAKE_ERRORS, FAKE_ERROR_FIX, GIRL } from '../utils/content.js'
import Sticker from '../components/Sticker.jsx'
import Teddy from '../components/Teddy.jsx'
import { POOKIE, TEDDY_WEBM } from '../utils/assets.js'
import { playPop, playSparkle } from '../utils/audio.js'

export default function FakeErrorScene({ onNext }) {
  const [index, setIndex] = useState(0)
  const last = index >= FAKE_ERRORS.length
  const fix = FAKE_ERROR_FIX[Math.min(index, FAKE_ERROR_FIX.length - 1)]

  const handleRetry = () => {
    playPop()
    setIndex((i) => i + 1)
  }

  const handleDone = () => {
    playSparkle()
    onNext()
  }

  return (
    <SceneShell>
      {!last ? (
        <motion.div
          key={index}
          className="error-dialog"
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          style={{ margin: '0 auto' }}
        >
          <div className="err-head">
            <span style={{ fontSize: 22 }}>⚠️</span>
            <span>SYSTEM ERROR 0x420</span>
          </div>
          <div className="err-body">{FAKE_ERRORS[index].replace('{name}', GIRL)}</div>
          <div className="err-foot">
            <button className="err-ok" onClick={handleRetry}>
              Retry 🔄
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="fixed"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 16 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 10
          }}
        >
          <Sticker src={POOKIE.webp[4]} size={160} className="sticker-die-cut" float />
          <h2 className="title-xl" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)' }}>
            Error Fixed ✅
          </h2>
          <p className="subtitle" style={{ maxWidth: 440 }}>{fix.replace('{name}', GIRL)}</p>
          <p className="hand-note" style={{ fontSize: '1.35rem' }}>
            (asli baat toh ye hai: system aapke bina chalta hi nahi)
          </p>
          <button className="btn-primary" onClick={handleDone}>
            <span>Chalo theek hai, ab aage chalo</span> 👉✨
          </button>
        </motion.div>
      )}
    </SceneShell>
  )
}
