import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FakeLoading from './scenes/FakeLoading.jsx'
import FakeErrorScene from './scenes/FakeErrorScene.jsx'
import Welcome from './scenes/Welcome.jsx'
import RunawayScene from './scenes/RunawayScene.jsx'
import FakeGiftScene from './scenes/FakeGiftScene.jsx'
import DreamReveal from './scenes/DreamReveal.jsx'
import CatBreakScene from './scenes/CatBreakScene.jsx'
import ExplorerScene from './scenes/ExplorerScene.jsx'
import LittleWorldScene from './scenes/LittleWorldScene.jsx'
import ComplimentDeck from './scenes/ComplimentDeck.jsx'
import KissCeremonyScene from './scenes/KissCeremonyScene.jsx'
import ScratchCardScene from './scenes/ScratchCardScene.jsx'
import ScrapbookScene from './scenes/ScrapbookScene.jsx'
import LetterScene from './scenes/LetterScene.jsx'
import CakeScene from './scenes/CakeScene.jsx'
import FinaleScene from './scenes/FinaleScene.jsx'
import FinalMessage from './scenes/FinalMessage.jsx'
import TrueEnd from './scenes/TrueEnd.jsx'
import Teddy from './components/Teddy.jsx'
import { CAT_BREAKS, SECRET_REWARD, HUD_UI } from './utils/content.js'
import { CATS, TEDDY_WEBM } from './utils/assets.js'
import { startMusic, stopMusic, blip, playSparkle, playPop } from './utils/audio.js'

// index constants
const LOADING = 0
const FAKE_ERROR = 1
const WELCOME = 2
const RUN_AWAY = 3
const FAKE_GIFT = 4
const DREAM = 5

export default function App() {
  const [sceneIndex, setSceneIndex] = useState(LOADING)
  const [bonusFinale, setBonusFinale] = useState(false)
  const [muted, setMuted] = useState(true)
  const [dontClicks, setDontClicks] = useState(0)
  const [secretOpen, setSecretOpen] = useState(false)
  const [started, setStarted] = useState(false)

  const go = (i) => setSceneIndex(i)
  const next = () => setSceneIndex((i) => i + 1)

  const startJourney = () => {
    setStarted(true)
    startMusic()
    setMuted(false)
    playSparkle()
    next()
  }

  const toggleMute = () => {
    if (muted) startMusic()
    else stopMusic()
    setMuted((m) => !m)
  }

  const dontClick = () => {
    playPop()
    setDontClicks((n) => n + 1)
  }

  useEffect(() => {
    if (dontClicks >= 5) {
      playSparkle()
      setSecretOpen(true)
    }
  }, [dontClicks])

  const finalNext = () => {
    if (sceneIndex === scenes.length - 2 && !bonusFinale) {
      setBonusFinale(true)
      go(scenes.length - 3)
    } else {
      next()
    }
  }

  const scenes = [
    <FakeLoading key="loading" onDone={() => go(1)} />,
    <FakeErrorScene key="fakeerr" onNext={() => go(2)} />,
    <Welcome key="welcome" onNext={startJourney} />,
    <RunawayScene key="runaway" onNext={next} />,
    <FakeGiftScene key="gift" onNext={next} />,
    <DreamReveal key="dream" onNext={next} />,
    <CatBreakScene key="cat1" {...CAT_BREAKS[0]} cat={CATS[CAT_BREAKS[0].cat]} onNext={next} />,
    <ExplorerScene key="explore" onNext={next} />,
    <LittleWorldScene key="littleworld" onNext={next} />,
    <ComplimentDeck key="compliments" onNext={next} />,
    <KissCeremonyScene key="kissceremony" onNext={next} />,
    <ScratchCardScene key="scratch" onNext={next} />,
    <ScrapbookScene key="scrapbook" onNext={next} />,
    <LetterScene key="letter" onNext={next} />,
    <CakeScene key="cake" onNext={next} />,
    <FinaleScene key="finale" bonus={bonusFinale} onNext={next} />,
    <FinalMessage key="final" onNext={finalNext} />,
    <TrueEnd key="trueend" onReplay={() => window.location.reload()} />
  ]

  const showHUD = started && sceneIndex > 2 && sceneIndex !== scenes.length - 1

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">{scenes[sceneIndex]}</AnimatePresence>

      {showHUD && (
        <>
          <button className="mute-btn" onClick={toggleMute} aria-label="toggle sound">
            {muted ? '🔇' : '🎵'}
          </button>

          {!secretOpen && (
            <button className="dont-click" onClick={dontClick}>
              <span>{HUD_UI.dontClick}</span>
              {dontClicks > 0 && dontClicks < 5 ? ` (${dontClicks}/5)` : ''}
            </button>
          )}

          {sceneIndex > 2 && (
            <div className="progress-dots" aria-hidden>
              {scenes.map((_, i) => (
                <div key={i} className={`dot ${i === sceneIndex ? 'on' : ''}`} />
              ))}
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {secretOpen && (
          <motion.div
            className="cat-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setSecretOpen(false); setDontClicks(0) }}
          >
            <motion.div
              className="cat-card"
              initial={{ scale: 0.3, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Teddy src={TEDDY_WEBM.love[0]} size={160} float glow />
              <h3 style={{ margin: '10px 0 6px', color: 'var(--rose-deep)', fontSize: '1.3rem' }}>
                {SECRET_REWARD.title}
              </h3>
              <div style={{ fontSize: '0.98rem', lineHeight: 1.45, color: 'var(--ink)', fontWeight: 600, textAlign: 'center' }}>
                {SECRET_REWARD.body}
              </div>
              <button
                className="btn-primary"
                style={{ marginTop: 16 }}
                onClick={() => { setSecretOpen(false); setDontClicks(0) }}
              >
                Done! Deal done 🤝💖
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
