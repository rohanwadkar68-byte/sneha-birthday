import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import { TEDDY_WEBM } from '../utils/assets.js'
import { playSparkle } from '../utils/audio.js'

export default function CatBreakScene({ onNext, caption }) {
  const [canProceed, setCanProceed] = useState(false)

  useEffect(() => {
    // 500ms tap guard to prevent ghost clicks from previous scene
    const t = setTimeout(() => setCanProceed(true), 500)
    return () => clearTimeout(t)
  }, [])

  const handleNext = () => {
    if (!canProceed) return
    playSparkle()
    onNext()
  }

  return (
    <SceneShell>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={SPRING}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 10
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #ff85a8, #f472b6)',
            color: '#fff',
            padding: '4px 16px',
            borderRadius: 999,
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.04em'
          }}
        >
          🐾 SPECIAL PAW-SE MOMENT 🐾
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <Teddy src={TEDDY_WEBM.curious[0]} size={160} glow delay={0.2} />
          <motion.img
            src="assets/memes/cat_jam.gif"
            alt="Cat Jam Meme"
            style={{ width: 68, height: 68, borderRadius: 16, boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          />
        </div>

        <motion.div
          className="bubble"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ maxWidth: 420, fontSize: '1.05rem', margin: '4px 0 10px' }}
        >
          {caption || 'Meow break! Ab 23 age ki hone wali world ki sabse cute mommy aayi hain 🐾💖'}
        </motion.div>

        <motion.button
          className="btn-primary"
          onClick={handleNext}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.94 }}
        >
          <span>Theek hai Mommy! Aage Chalein 🐾👉</span>
        </motion.button>
      </motion.div>
    </SceneShell>
  )
}
