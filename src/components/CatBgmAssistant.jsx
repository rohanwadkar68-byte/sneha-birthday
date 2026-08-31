import { motion, AnimatePresence } from 'framer-motion'
import { playPop, playSparkle } from '../utils/audio.js'
import { CAT_ASSISTANT_CONTENT } from '../utils/content.js'

export default function CatBgmAssistant({ isOpen, onYes, onNo }) {
  const handleYes = () => {
    playSparkle()
    onYes()
  }

  const handleNo = () => {
    playPop()
    onNo()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cat-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999999,
            background: 'rgba(56, 30, 48, 0.65)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16
          }}
        >
          <motion.div
            className="cat-card"
            initial={{ scale: 0.75, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.75, y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 420,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '24px 20px',
              borderRadius: 28,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 24px 60px rgba(247, 85, 138, 0.35)',
              border: '2.5px solid rgba(255, 217, 232, 0.95)'
            }}
          >
            {/* Top Badge */}
            <div
              style={{
                background: 'linear-gradient(135deg, #ff85a8, #f472b6)',
                color: '#fff',
                padding: '4px 16px',
                borderRadius: 999,
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                marginBottom: 10
              }}
            >
              {CAT_ASSISTANT_CONTENT.badge}
            </div>

            {/* Animated Cat with Mug Image / GIF */}
            <div style={{ position: 'relative', margin: '4px 0 10px' }}>
              <motion.img
                src="assets/memes/cat_jam.gif"
                alt="Cat with Mug"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 24,
                  objectFit: 'contain',
                  boxShadow: '0 8px 24px rgba(247, 85, 138, 0.25)'
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
              {/* Steaming Mug Emoji Overlay */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: -6,
                  right: -6,
                  background: '#fff',
                  borderRadius: '50%',
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                  border: '2px solid rgba(247, 85, 138, 0.3)'
                }}
                animate={{ scale: [1, 1.12, 1], rotate: [0, 6, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                ☕
              </motion.div>
            </div>

            {/* Speech Bubble */}
            <motion.div
              className="bubble"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.45,
                fontWeight: 700,
                color: 'var(--ink)',
                margin: '4px 0 16px',
                maxWidth: 360
              }}
            >
              {CAT_ASSISTANT_CONTENT.prompt}
            </motion.div>

            {/* Action Buttons (Yes & No) */}
            <div style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'center' }}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.04 }}
                onClick={handleNo}
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  borderRadius: 16,
                  border: '2px solid rgba(0,0,0,0.08)',
                  background: 'rgba(245, 245, 245, 0.9)',
                  color: 'var(--ink-soft)',
                  fontSize: '0.86rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {CAT_ASSISTANT_CONTENT.noBtn}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.04 }}
                onClick={handleYes}
                className="btn-primary"
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  fontSize: '0.86rem',
                  margin: 0
                }}
              >
                <span>{CAT_ASSISTANT_CONTENT.yesBtn}</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}