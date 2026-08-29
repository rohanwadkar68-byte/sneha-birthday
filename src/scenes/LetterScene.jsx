import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import Sticker from '../components/Sticker.jsx'
import useTypewriter from '../hooks/useTypewriter.js'
import { LETTER_LINES, LETTER_UI } from '../utils/content.js'
import { TEDDY_WEBM, POOKIE, DECOS } from '../utils/assets.js'
import { playSparkle, playPop } from '../utils/audio.js'

export default function LetterScene({ onNext }) {
  const [opened, setOpened] = useState(false)
  const { output, done } = useTypewriter(opened ? LETTER_LINES : [], 24)
  const scrollRef = useRef(null)

  const open = () => {
    if (!opened) {
      playPop()
      playSparkle()
      setOpened(true)
      setTimeout(() => scrollRef.current?.scrollTo({ top: 99999, behavior: 'smooth' }), 400)
    }
  }

  return (
    <SceneShell>
      <div className="hand-note" style={{ marginBottom: 4 }}>
        {LETTER_UI.heading}
      </div>

      {/* Interactive Envelope with Wax Seal */}
      <motion.div
        onClick={open}
        style={{
          position: 'relative',
          width: 240,
          height: opened ? 48 : 160,
          cursor: opened ? 'default' : 'pointer',
          marginTop: 8
        }}
        layout
        transition={SPRING}
      >
        <AnimatePresence>
          {!opened && (
            <motion.div
              key="flap"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                borderLeft: '120px solid transparent',
                borderRight: '120px solid transparent',
                borderTop: '90px solid #ffb3cd',
                filter: 'drop-shadow(0 6px 10px rgba(247,106,153,0.25))',
                zIndex: 3
              }}
              exit={{ rotateX: 180, opacity: 0, transition: { duration: 0.4 } }}
            />
          )}
        </AnimatePresence>

        {/* Envelope Body */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: 240,
            height: 120,
            borderRadius: 14,
            background: 'linear-gradient(180deg, #ffd9e8, #ffc4d8)',
            boxShadow: 'var(--shadow-card)',
            border: '1.5px solid rgba(255,255,255,0.7)',
            zIndex: 1
          }}
        />

        {/* Wax Seal with Initial 'S' */}
        {!opened && (
          <motion.div
            className="wax-seal"
            style={{
              position: 'absolute',
              left: '50%',
              top: 68,
              transform: 'translate(-50%, -50%)',
              zIndex: 5
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            whileHover={{ scale: 1.2 }}
          >
            S
          </motion.div>
        )}

        {/* Stamp & Ribbon deco */}
        {!opened && (
          <motion.div
            style={{
              position: 'absolute',
              right: 14,
              top: 55,
              width: 32,
              height: 32,
              borderRadius: 6,
              background: 'linear-gradient(135deg, #e6dbff, #cde8ff)',
              border: '2px dashed var(--lavender)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              zIndex: 2
            }}
          >
            🌸
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.p key="hint" className="subtitle" style={{ marginTop: 12 }}>
            (wax seal ko tap karke chitthi kholo… sirf aapke liye hai 👀)
          </motion.p>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={SPRING}
            ref={scrollRef}
            style={{
              marginTop: 10,
              maxHeight: '48dvh',
              overflowY: 'auto',
              background: '#fffdf7',
              borderRadius: 22,
              padding: '22px 24px',
              width: 'min(460px, 92vw)',
              boxShadow: 'var(--shadow-card)',
              textAlign: 'left',
              border: '1.5px solid rgba(255, 217, 232, 0.8)',
              position: 'relative'
            }}
          >
            {/* Soft watermark / stamp */}
            <div
              style={{
                position: 'absolute',
                top: 14,
                right: 18,
                opacity: 0.18,
                fontSize: 48,
                pointerEvents: 'none'
              }}
            >
              💌
            </div>

            <div
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1.45rem',
                lineHeight: 1.38,
                whiteSpace: 'pre-wrap',
                color: '#4a384f',
                fontWeight: 600
              }}
            >
              {output.join('\n')}
            </div>

            {done && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: 18,
                  gap: 10
                }}
              >
                <motion.img
                  src="assets/kisses/milk_mocha_kiss_13.gif"
                  alt="Milk and Mocha Warm Embrace"
                  style={{
                    width: 110,
                    height: 110,
                    objectFit: 'contain',
                    borderRadius: 18,
                    filter: 'drop-shadow(0 8px 20px rgba(247, 85, 138, 0.4))'
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                />
                <button
                  className="btn-primary"
                  onClick={onNext}
                  style={{ width: '100%', maxWidth: 280 }}
                >
                  <span>{LETTER_UI.finishBtn}</span>
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </SceneShell>
  )
}
