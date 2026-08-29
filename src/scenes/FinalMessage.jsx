import { motion } from 'framer-motion'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import { FINAL_MESSAGE } from '../utils/content.js'
import { TEDDY_WEBM } from '../utils/assets.js'

export default function FinalMessage({ onNext }) {
  return (
    <SceneShell>
      <Teddy src={TEDDY_WEBM.love[1] || TEDDY_WEBM.love[0]} size={180} glow />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10, maxWidth: 480 }}>
        {FINAL_MESSAGE.map((line, i) => (
          <motion.p
            key={i}
            className={i === FINAL_MESSAGE.length - 1 ? 'hand-note' : 'subtitle'}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.45, ...SPRING }}
            style={{
              margin: '2px 0',
              fontWeight: i === 0 || i === FINAL_MESSAGE.length - 1 ? 800 : 600,
              fontSize: i === FINAL_MESSAGE.length - 1 ? '1.55rem' : '1.1rem'
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + FINAL_MESSAGE.length * 0.45 + 0.3 }}
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}
      >
        <button className="btn-primary" onClick={onNext}>
          <span>Khatam? 🤔</span>
        </button>
      </motion.div>
    </SceneShell>
  )
}
