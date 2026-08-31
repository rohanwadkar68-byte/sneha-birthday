import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import Sticker from '../components/Sticker.jsx'
import { blip, playSparkle, playPop, playFanfare } from '../utils/audio.js'
import { EXPLORER_PROPS, EXPLORER_CONTENT, PICKUP_LINES } from '../utils/content.js'
import { TEDDY_WEBM, POOKIE, triggerRosePetals } from '../utils/assets.js'

export default function ExplorerScene({ onNext }) {
  const [found, setFound] = useState({})
  const [activeLine, setActiveLine] = useState(null)
  const [balloonAlive, setBalloonAlive] = useState(true)
  const [hearts, setHearts] = useState([])
  const [sparkles, setSparkles] = useState([])
  const count = Object.keys(found).length
  const allFound = count === EXPLORER_PROPS.length
  const pickup = useMemo(() => PICKUP_LINES[Math.floor(Math.random() * PICKUP_LINES.length)], [])

  const discover = (id) => {
    const prop = EXPLORER_PROPS.find((p) => p.id === id)
    if (prop?.line) {
      setActiveLine(prop.line)
    }

    if (!found[id]) {
      setFound((f) => {
        const next = { ...f, [id]: true }
        if (Object.keys(next).length === EXPLORER_PROPS.length) {
          setTimeout(playFanfare, 400)
        }
        return next
      })
      playPop()
    }

    playSparkle()

    const burst = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 80,
      y: (Math.random() - 0.5) * 60
    }))
    setSparkles((s) => [...s, ...burst])
    setTimeout(() => setSparkles((s) => s.filter((x) => !burst.includes(x))), 1200)
  }

  const tapBalloon = () => {
    if (!balloonAlive) return
    playPop()
    setBalloonAlive(false)
    setTimeout(() => setBalloonAlive(true), 1400)
    discover('balloon')
  }

  const tapCloud = () => {
    discover('cloud')
    const burst = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50
    }))
    setHearts((h) => [...h, ...burst])
    setTimeout(() => setHearts((h) => h.filter((x) => !burst.includes(x))), 1600)
  }

  const tapNote = () => {
    blip(784)
    setTimeout(() => blip(988), 120)
    discover('note')
  }

  const tapHeart = () => {
    discover('heart')
  }

  const handleTap = (id) => {
    if (id === 'balloon') return tapBalloon()
    if (id === 'cloud') return tapCloud()
    if (id === 'note') return tapNote()
    if (id === 'heart') return tapHeart()
    discover(id)
  }

  return (
    <SceneShell wide>
      <div className="hand-note" style={{ marginBottom: 2 }}>
        Sneha's Enchanted Wonderland Room 🏰✨
      </div>

      {/* Collectibles Pill Header */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '4px 14px',
          borderRadius: 999,
          fontSize: '0.84rem',
          fontWeight: 800,
          color: 'var(--rose-deep)',
          boxShadow: '0 2px 8px rgba(247, 85, 138, 0.15)',
          marginBottom: 8
        }}
      >
        <span>✨</span> {count} / {EXPLORER_PROPS.length} Secret Items Discovered
      </div>

      <div
        style={{
          position: 'relative',
          width: 'min(580px, 94vw)',
          height: 380,
          borderRadius: 30,
          background: 'rgba(255, 255, 255, 0.72)',
          boxShadow: 'var(--shadow-card)',
          border: '2px solid rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden'
        }}
      >
        {/* Heart rain from cloud */}
        <AnimatePresence>
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ x: h.x, y: 50, opacity: 1, fontSize: 26 }}
              animate={{ y: 320, opacity: 0, rotate: 45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeIn' }}
              style={{ position: 'absolute', left: '80%', top: 0, pointerEvents: 'none' }}
            >
              💖
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Sparkle bursts */}
        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 1, scale: 1.2, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 0.2, x: s.x, y: s.y }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                fontSize: 22,
                color: 'var(--gold)',
                pointerEvents: 'none'
              }}
            >
              ✦
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Interactive Speech Line Bubble */}
        <AnimatePresence>
          {activeLine && (
            <motion.div
              key={activeLine}
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={SPRING}
              style={{
                position: 'absolute',
                top: 14,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255, 255, 255, 0.96)',
                border: '2px solid var(--rose)',
                borderRadius: 999,
                padding: '6px 20px',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: 'var(--rose-deep)',
                boxShadow: '0 6px 18px rgba(247, 85, 138, 0.2)',
                zIndex: 10,
                pointerEvents: 'none',
                maxWidth: '85%'
              }}
            >
              {activeLine}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Center Teddy Character */}
        <div
          style={{
            position: 'absolute',
            top: '52%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          <Teddy
            src={
              allFound
                ? TEDDY_WEBM.party[0]
                : count > 3
                  ? TEDDY_WEBM.excited[0]
                  : TEDDY_WEBM.happy[0]
            }
            size={120}
            glow={allFound}
            float
          />
        </div>

        {/* Interactive Props Grid */}
        {EXPLORER_PROPS.map((p, idx) => (
          <motion.button
            key={p.id}
            aria-label={p.label}
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              fontSize: 44,
              padding: 10,
              lineHeight: 1,
              background: found[p.id] ? 'rgba(255, 219, 232, 0.5)' : 'transparent',
              border: found[p.id] ? '2px dashed var(--rose)' : 'none',
              borderRadius: 22,
              cursor: 'pointer',
              filter: found[p.id]
                ? 'drop-shadow(0 0 14px rgba(247, 85, 138, 0.6))'
                : 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.08))'
            }}
            whileHover={{ scale: 1.22, rotate: [0, -8, 8, 0] }}
            whileTap={{ scale: 0.85 }}
            onClick={() => handleTap(p.id)}
            animate={
              found[p.id]
                ? p.id === 'star'
                  ? { rotate: 360, scale: [1, 1.25, 1] }
                  : p.id === 'note'
                    ? { rotate: [0, -16, 16, 0] }
                    : { scale: [1, 1.15, 1] }
                : { y: [0, -8, 0] }
            }
            transition={
              found[p.id]
                ? { duration: 0.8 }
                : { repeat: Infinity, duration: 2.2 + idx * 0.25, ease: 'easeInOut' }
            }
          >
            {p.id === 'balloon' && !balloonAlive ? '💥' : p.emoji}
          </motion.button>
        ))}

        {/* Dynamic WebM Teddy in Room Corner */}
        <div style={{ position: 'absolute', right: 12, bottom: 8, pointerEvents: 'none' }}>
          <Teddy
            src={allFound ? TEDDY_WEBM.dance[0] : TEDDY_WEBM.curious[0]}
            size={125}
            float={!allFound}
            glow={allFound}
          />
        </div>
      </div>

      <AnimatePresence>
        {allFound && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={SPRING}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginTop: 10 }}
          >
            <div className="hand-note" style={{ fontSize: '1.45rem' }}>{pickup}</div>
            <button className="btn-primary" onClick={onNext} style={{ marginTop: 4 }}>
              <span>{EXPLORER_CONTENT.nextBtn}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </SceneShell>
  )
}
