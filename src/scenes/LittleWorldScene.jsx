import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneShell from '../components/SceneShell.jsx'
import { LITTLE_WORLD_CONTENT, GIRL } from '../utils/content.js'
import { playSparkle, playPop, blip } from '../utils/audio.js'

// Curated Milk & Mocha / Bubu & Dudu cuddle & reaction animations
const BASE = import.meta.env.BASE_URL
const ASSET_CUDDLE_LOOP = `${BASE}assets/kisses/cuddle_3.gif`
const ASSET_CUDDLE_CLOSE = `${BASE}assets/kisses/milk_mocha_kiss_3.gif`
const ASSET_GIFT = `${BASE}assets/kisses/cuddle_5.gif`
const ASSET_KISS_SWEET = `${BASE}assets/kisses/bubu_kiss_5.gif`
const ASSET_TALK = `${BASE}assets/kisses/milk_mocha_kiss_13.gif`
const ASSET_EAT = `${BASE}assets/kisses/cuddle_8.gif`

const SPRING = { type: 'spring', stiffness: 260, damping: 20 }

export default function LittleWorldScene({ onNext }) {
  const { intro, clockMilestones, storyDialogues, petControls, nextBtn } = LITTLE_WORLD_CONTENT

  // State
  const [stage, setStage] = useState(0) // 0: Waiting, 1: Walk-In, 2: Game-to-Bakbak, 3: Late Chat, 4: Muh Phulana, 5: 3AM Cuddle
  const [clockIdx, setClockIdx] = useState(0)
  const [activeDialogue, setActiveDialogue] = useState('')
  const [activeSpeaker, setActiveSpeaker] = useState('sys')
  const [petAction, setPetAction] = useState(null)
  const [petMessage, setPetMessage] = useState('')
  const [feedCount, setFeedCount] = useState(0)
  const [cuddleSparkles, setCuddleSparkles] = useState([])

  // Clock time sync with story stage
  useEffect(() => {
    switch (stage) {
      case 0:
        setClockIdx(0) // 11:59 PM
        setActiveDialogue(storyDialogues.waiting)
        setActiveSpeaker('sys')
        break
      case 1:
        setClockIdx(1) // 12:00 AM
        setActiveDialogue(`P1: "${storyDialogues.enter.p1}"  •  P2: "${storyDialogues.enter.p2}"`)
        setActiveSpeaker('p1')
        playSparkle()
        break
      case 2:
        setClockIdx(3) // 12:12 AM
        setActiveDialogue(`${storyDialogues.gameOffer.p1} → "${storyDialogues.gameOffer.p2}"`)
        setActiveSpeaker('p2')
        playPop()
        break
      case 3:
        setClockIdx(4) // 01:18 AM
        setActiveDialogue('Late night bakbak mode ON… 12 se 3 kab ho gaya pata hi nahi chalta 😂📱')
        setActiveSpeaker('sys')
        break
      case 4:
        setClockIdx(5) // 02:04 AM
        setActiveDialogue(storyDialogues.muhPhulana.system)
        setActiveSpeaker('sys')
        playPop()
        break
      case 5:
        setClockIdx(7) // 03:01 AM
        setActiveDialogue(`"${storyDialogues.cuddle3am.p1}"  "${storyDialogues.cuddle3am.p2}"  "${storyDialogues.cuddle3am.p1Again}"`)
        setActiveSpeaker('cuddle')
        playSparkle()
        break
      default:
        break
    }
  }, [stage])

  // Pet action handlers
  const handleFeed = () => {
    playPop()
    setPetAction('feed')
    const count = (feedCount + 1) % petControls.feed.length
    setFeedCount(count)
    setPetMessage(petControls.feed[count])
    setTimeout(() => {
      setPetAction(null)
      setPetMessage('')
    }, 4500)
  }

  const handleCuddle = () => {
    playSparkle()
    setPetAction('cuddle')
    setStage(5)
    const randSparkles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 220,
      y: (Math.random() - 0.5) * 180,
      size: Math.random() * 20 + 14
    }))
    setCuddleSparkles(randSparkles)
    setPetMessage(petControls.cuddle[Math.floor(Math.random() * petControls.cuddle.length)])
    setTimeout(() => {
      setPetAction(null)
      setPetMessage('')
    }, 5000)
  }

  const handleGift = () => {
    playSparkle()
    setPetAction('gift')
    setPetMessage(petControls.gift[Math.floor(Math.random() * petControls.gift.length)])
    setTimeout(() => {
      setPetAction(null)
      setPetMessage('')
    }, 4500)
  }

  const handleSleep = () => {
    playPop()
    setPetAction('sleep')
    setPetMessage(petControls.sleep.systemNote)
    setTimeout(() => {
      setPetAction(null)
      setPetMessage('')
    }, 4500)
  }

  const getRoomLighting = () => {
    if (stage >= 5) {
      return 'linear-gradient(180deg, #120e28 0%, #211942 50%, #36295e 100%)'
    } else if (stage >= 3) {
      return 'linear-gradient(180deg, #1b1638 0%, #2f2554 50%, #4a3b78 100%)'
    }
    return 'linear-gradient(180deg, #261f47 0%, #3d2f66 50%, #5d488c 100%)'
  }

  const getTeddyAsset = () => {
    if (petAction === 'feed') return ASSET_EAT
    if (petAction === 'gift') return ASSET_GIFT
    if (petAction === 'cuddle' || stage === 5) return ASSET_CUDDLE_CLOSE
    if (stage === 2 || stage === 3) return ASSET_TALK
    if (stage === 4) return ASSET_KISS_SWEET
    return ASSET_CUDDLE_LOOP
  }

  return (
    <SceneShell>
      <div
        className="little-world-container"
        style={{
          width: '100%',
          maxWidth: 680,
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12
        }}
      >
        {/* Header Badge */}
        <motion.div
          className="crown-badge"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 0 }}
        >
          {intro.badge}
        </motion.div>

        {/* Room Viewport */}
        <motion.div
          className="little-world-room"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={SPRING}
          style={{
            width: '100%',
            height: 'clamp(330px, 48vh, 420px)',
            borderRadius: 28,
            background: getRoomLighting(),
            border: '2px solid rgba(255, 230, 240, 0.4)',
            boxShadow: '0 16px 40px rgba(18, 14, 40, 0.45)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 16px 12px',
            transition: 'background 1.5s ease'
          }}
        >
          {/* Hanging Fairy Lights */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 24,
              display: 'flex',
              justifyContent: 'space-around',
              padding: '0 20px',
              zIndex: 3,
              pointerEvents: 'none'
            }}
          >
            {['✨', '💛', '✨', '💖', '✨', '💛', '✨'].map((spark, i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }}
                transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                style={{ fontSize: '0.85rem' }}
              >
                {spark}
              </motion.span>
            ))}
          </div>

          {/* Window & Moon */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              right: 22,
              width: 58,
              height: 58,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #fffde8 0%, #ffeaa7 60%, rgba(255,234,167,0) 80%)',
              boxShadow: '0 0 25px rgba(255, 243, 176, 0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>🌙</span>
          </div>

          {/* Night Clock Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              zIndex: 4
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(0, 0, 0, 0.45)',
                backdropFilter: 'blur(8px)',
                padding: '4px 12px',
                borderRadius: 20,
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '0.88rem',
                fontWeight: 800,
                letterSpacing: '0.06em'
              }}
            >
              <span style={{ color: '#ffd54f' }}>⏰</span>
              <span>{clockMilestones[clockIdx].time}</span>
            </div>

            {/* Stage Selector Dots */}
            <div style={{ display: 'flex', gap: 6 }}>
              {[0, 1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => { playPop(); setStage(s) }}
                  style={{
                    width: stage === s ? 22 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: stage === s ? '#ff7597' : 'rgba(255,255,255,0.3)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  title={`Stage ${s + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Central Teddies Stage */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2
            }}
          >
            {/* Carpet Glow */}
            <div
              style={{
                position: 'absolute',
                bottom: 6,
                width: '80%',
                height: 48,
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(255, 182, 193, 0.35) 0%, rgba(255, 105, 180, 0.1) 65%, transparent 100%)',
                filter: 'blur(6px)',
                zIndex: 1
              }}
            />

            {/* Main Animated Teddy Asset */}
            <motion.div
              key={`${stage}-${petAction}`}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={SPRING}
              style={{ position: 'relative', zIndex: 3 }}
            >
              <img
                src={getTeddyAsset()}
                alt="Player 1 & Player 2 Teddies"
                style={{
                  width: 'clamp(170px, 36vw, 220px)',
                  height: 'clamp(170px, 36vw, 220px)',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.35))',
                  userSelect: 'none',
                  pointerEvents: 'none'
                }}
              />
            </motion.div>

            {/* Sparkles on Cuddle */}
            {cuddleSparkles.map((sp) => (
              <motion.span
                key={sp.id}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1.5, x: sp.x, y: sp.y }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  fontSize: sp.size,
                  pointerEvents: 'none',
                  zIndex: 10
                }}
              >
                💖
              </motion.span>
            ))}
          </div>

          {/* Live Dialogue Card */}
          <div
            style={{
              width: '100%',
              background: 'rgba(18, 14, 38, 0.78)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 200, 220, 0.25)',
              borderRadius: 18,
              padding: '10px 14px',
              zIndex: 4,
              textAlign: 'center',
              minHeight: 52,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={petMessage || activeDialogue}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                style={{
                  fontSize: 'clamp(0.88rem, 2.7vw, 0.98rem)',
                  color: '#fff',
                  fontWeight: 700,
                  lineHeight: 1.4
                }}
              >
                {petMessage ? (
                  <span style={{ color: '#ffd54f' }}>✨ {petMessage}</span>
                ) : (
                  <span>{activeDialogue}</span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Story Stepper Buttons */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 6,
            width: '100%',
            marginTop: 2
          }}
        >
          <button
            onClick={() => { playPop(); setStage(1) }}
            style={{
              background: stage === 1 ? 'var(--rose-pale)' : 'rgba(255,255,255,0.7)',
              border: stage === 1 ? '1.5px solid var(--rose)' : '1px solid rgba(0,0,0,0.06)',
              borderRadius: 12,
              padding: '6px 8px',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: stage === 1 ? 'var(--rose-deep)' : 'var(--ink)',
              cursor: 'pointer'
            }}
          >
            🚪 12:00 Entry
          </button>
          <button
            onClick={() => { playPop(); setStage(2) }}
            style={{
              background: stage === 2 ? 'var(--rose-pale)' : 'rgba(255,255,255,0.7)',
              border: stage === 2 ? '1.5px solid var(--rose)' : '1px solid rgba(0,0,0,0.06)',
              borderRadius: 12,
              padding: '6px 8px',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: stage === 2 ? 'var(--rose-deep)' : 'var(--ink)',
              cursor: 'pointer'
            }}
          >
            🎮 Game → Bakbak
          </button>
          <button
            onClick={() => { playSparkle(); setStage(5) }}
            style={{
              background: stage === 5 ? 'var(--rose-pale)' : 'rgba(255,255,255,0.7)',
              border: stage === 5 ? '1.5px solid var(--rose)' : '1px solid rgba(0,0,0,0.06)',
              borderRadius: 12,
              padding: '6px 8px',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: stage === 5 ? 'var(--rose-deep)' : 'var(--ink)',
              cursor: 'pointer'
            }}
          >
            🫂 3:00 Cuddle
          </button>
        </div>

        {/* Virtual Pet Control Dock */}
        <div
          style={{
            width: '100%',
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(12px)',
            borderRadius: 22,
            border: '1.5px solid var(--rose-pale)',
            padding: '10px 12px',
            boxShadow: '0 8px 24px rgba(255, 107, 147, 0.12)',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: 8
          }}
        >
          <button
            className="pet-btn"
            onClick={handleFeed}
            style={{
              flex: 1,
              padding: '8px 6px',
              borderRadius: 14,
              border: 'none',
              background: 'linear-gradient(135deg, #fff3c9 0%, #ffd8a8 100%)',
              color: '#8c5000',
              fontWeight: 800,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>🍰</span>
            <span>Feed</span>
          </button>

          <button
            className="pet-btn"
            onClick={handleCuddle}
            style={{
              flex: 1.1,
              padding: '8px 6px',
              borderRadius: 14,
              border: 'none',
              background: 'linear-gradient(135deg, #ffd9e8 0%, #ff85a8 100%)',
              color: '#9c1c4d',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              boxShadow: '0 4px 12px rgba(255, 107, 147, 0.25)'
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>🫂</span>
            <span>Cuddle</span>
          </button>

          <button
            className="pet-btn"
            onClick={handleGift}
            style={{
              flex: 1,
              padding: '8px 6px',
              borderRadius: 14,
              border: 'none',
              background: 'linear-gradient(135deg, #e6dbff 0%, #c4b5fd 100%)',
              color: '#5b21b6',
              fontWeight: 800,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>🎁</span>
            <span>Gift</span>
          </button>

          <button
            className="pet-btn"
            onClick={handleSleep}
            style={{
              flex: 1,
              padding: '8px 6px',
              borderRadius: 14,
              border: 'none',
              background: 'linear-gradient(135deg, #dcfce7 0%, #86efac 100%)',
              color: '#166534',
              fontWeight: 800,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>😴</span>
            <span>Sleep</span>
          </button>
        </div>

        {/* Next Scene CTA */}
        <motion.button
          className="btn-primary"
          onClick={() => {
            playSparkle()
            onNext()
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            width: '100%',
            marginTop: 4,
            padding: '14px 20px',
            fontSize: '1rem',
            fontWeight: 800,
            letterSpacing: '0.03em'
          }}
        >
          {nextBtn}
        </motion.button>
      </div>
    </SceneShell>
  )
}
