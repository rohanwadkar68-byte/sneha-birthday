import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import Sticker from '../components/Sticker.jsx'
import { TAUNTS, RUNAWAY_CONTENT } from '../utils/content.js'
import { TEDDY_WEBM } from '../utils/assets.js'
import { playPop, playFanfare, playSparkle } from '../utils/audio.js'

export default function RunawayScene({ onNext }) {
  const [dodges, setDodges] = useState(0)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const caught = dodges >= TAUNTS.length - 1
  const areaRef = useRef(null)

  const dodge = () => {
    if (caught) return
    playPop()
    const rect = areaRef.current?.getBoundingClientRect()
    const rangeX = Math.min(160, (rect?.width ?? 600) / 2 - 90)
    const rangeY = Math.min(120, (rect?.height ?? 400) / 2 - 70)
    setPos({ x: (Math.random() * 2 - 1) * rangeX, y: (Math.random() * 2 - 1) * rangeY })
    setDodges((d) => {
      const next = d + 1
      if (next >= TAUNTS.length - 1) {
        setTimeout(() => {
          playFanfare()
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff8fb1', '#ffd9e8', '#e6dbff', '#ffd166']
          })
        }, 200)
      }
      return next
    })
  }

  const handleNext = () => {
    playSparkle()
    onNext()
  }

  return (
    <SceneShell wide>
      <Teddy
        src={caught ? TEDDY_WEBM.party[0] : TEDDY_WEBM.curious[0]}
        size={160}
        glow={caught}
      />
      <h2 className="title-xl" style={{ fontSize: 'clamp(1.6rem, 5.5vw, 2.3rem)' }}>
        {caught ? 'Theek hai theek hai… jeet gayi aap 😤💖' : RUNAWAY_CONTENT.heading}
      </h2>
      <p className="subtitle" style={{ maxWidth: 460 }}>
        {caught ? 'Button ne unconditional surrender kar diya! Ab aage chalo.' : RUNAWAY_CONTENT.subtitle}
      </p>

      <div
        ref={areaRef}
        style={{
          position: 'relative',
          width: 'min(520px, 92vw)',
          height: 260,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <motion.button
          className="btn-primary"
          style={{ marginTop: 0, position: 'absolute', x: pos.x, y: pos.y }}
          animate={{ x: pos.x, y: pos.y, rotate: caught ? [0, -4, 4, 0] : 0 }}
          transition={
            caught
              ? { repeat: Infinity, duration: 0.5 }
              : { type: 'spring', stiffness: 350, damping: 14 }
          }
          onMouseEnter={dodge}
          onTouchStart={(e) => { if (!caught) { e.preventDefault(); dodge() } }}
          onClick={() => caught && handleNext()}
        >
          <span>{caught ? RUNAWAY_CONTENT.caughtBtn : 'Mujhe click karo 👉'}</span>
        </motion.button>

        {!caught && (
          <motion.div
            key={dodges}
            className="hand-note"
            style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%) rotate(-3deg)', fontSize: '1.4rem' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {TAUNTS[dodges]}
          </motion.div>
        )}
      </div>
    </SceneShell>
  )
}
