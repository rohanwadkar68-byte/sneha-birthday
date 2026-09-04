import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FakeLoading from '../../scenes/FakeLoading.jsx'
import FakeErrorScene from '../../scenes/FakeErrorScene.jsx'
import Welcome from '../../scenes/Welcome.jsx'
import RunawayScene from '../../scenes/RunawayScene.jsx'
import FakeGiftScene from '../../scenes/FakeGiftScene.jsx'
import DreamReveal from '../../scenes/DreamReveal.jsx'
import CatBreakScene from '../../scenes/CatBreakScene.jsx'
import ExplorerScene from '../../scenes/ExplorerScene.jsx'
import LittleWorldScene from '../../scenes/LittleWorldScene.jsx'
import ComplimentDeck from '../../scenes/ComplimentDeck.jsx'
import KissCeremonyScene from '../../scenes/KissCeremonyScene.jsx'
import ScrapbookScene from '../../scenes/ScrapbookScene.jsx'
import LetterScene from '../../scenes/LetterScene.jsx'
import CakeScene from '../../scenes/CakeScene.jsx'
import FinaleScene from '../../scenes/FinaleScene.jsx'
import FinalMessage from '../../scenes/FinalMessage.jsx'
import TrueEnd from '../../scenes/TrueEnd.jsx'
import Teddy from '../../components/Teddy.jsx'
import SongSearchModal from '../../components/SongSearchModal.jsx'
import CatBgmAssistant from '../../components/CatBgmAssistant.jsx'
import { CAT_BREAKS, SECRET_REWARD, HUD_UI } from '../../utils/content.js'
import { CATS, TEDDY_WEBM } from '../../utils/assets.js'
import { startMusic, stopMusic, blip, playSparkle, playPop } from '../../utils/audio.js'
import { sendTelegramVisitorAlert } from '../../utils/tracker.js'

// index constants
const LOADING = 0
const FAKE_ERROR = 1
const WELCOME = 2
const RUN_AWAY = 3
const FAKE_GIFT = 4
const DREAM = 5

export default function Chapter2026Experience({ onBackToWorld, isMemoryMode = false }) {
  const [sceneIndex, setSceneIndex] = useState(LOADING)
  const [bonusFinale, setBonusFinale] = useState(false)
  const [muted, setMuted] = useState(false)
  const [dontClicks, setDontClicks] = useState(0)
  const [secretOpen, setSecretOpen] = useState(false)
  const [started, setStarted] = useState(false)

  // 🐱 BGM Assistant & Music Changer States
  const [catAssistantOpen, setCatAssistantOpen] = useState(false)
  const [hasShownCatAssistant, setHasShownCatAssistant] = useState(false)
  const [musicModalOpen, setMusicModalOpen] = useState(false)
  const [showTutorialPointer, setShowTutorialPointer] = useState(false)

  // 🕵️‍♂️ Send Live Visitor IP & Location alert to Telegram on first arrival
  useEffect(() => {
    sendTelegramVisitorAlert('Website Opened / Loading', 'Sneha arrived on website!')
  }, [])

  // 🎯 Track Major Milestone Progress across the Website
  useEffect(() => {
    const SCENE_TITLES = {
      2: 'Welcome Gate Opened',
      3: 'Runaway Button & Cat Waiter',
      7: 'Room Explorer',
      8: 'Our Little World (12 to 3 AM Room)',
      9: '10 Reasons / Compliments Deck',
      10: 'Kissing Ceremony Ritual',
      11: 'Scrapbook Polaroid Memories',
      12: 'Emotional Letters & Songs Room',
      13: 'Birthday Cake Cutting',
      14: 'Grand Finale Banner',
      16: 'True End Official VIP Pass'
    }

    if (SCENE_TITLES[sceneIndex]) {
      sendTelegramVisitorAlert(SCENE_TITLES[sceneIndex], `Navigated to stage: ${SCENE_TITLES[sceneIndex]}`)
    }
  }, [sceneIndex])

  // Start BGM immediately on website load + first touch unlock
  useEffect(() => {
    startMusic()
    setMuted(false)

    const handleFirstTouch = () => {
      startMusic()
      window.removeEventListener('pointerdown', handleFirstTouch)
      window.removeEventListener('touchstart', handleFirstTouch)
      window.removeEventListener('click', handleFirstTouch)
    }

    window.addEventListener('pointerdown', handleFirstTouch, { once: true })
    window.addEventListener('touchstart', handleFirstTouch, { once: true })
    window.addEventListener('click', handleFirstTouch, { once: true })

    return () => {
      window.removeEventListener('pointerdown', handleFirstTouch)
      window.removeEventListener('touchstart', handleFirstTouch)
      window.removeEventListener('click', handleFirstTouch)
    }
  }, [])

  const go = (i) => setSceneIndex(i)
  const next = () => setSceneIndex((i) => i + 1)

  const startJourney = () => {
    setStarted(true)
    startMusic()
    setMuted(false)
    next()
    sendTelegramVisitorAlert('Welcome Door Unlocked', 'Sneha tapped on the Magic Door!')
    // 🐱 Guarantee Cat Waiter Popup appears right after Welcome doors unlock
    setTimeout(() => {
      setCatAssistantOpen(true)
    }, 500)
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

  // 🐱 Also trigger Cat BGM Assistant if landed on Scene 3
  useEffect(() => {
    if (sceneIndex === 3 && !hasShownCatAssistant) {
      setHasShownCatAssistant(true)
      const timer = setTimeout(() => {
        setCatAssistantOpen(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [sceneIndex, hasShownCatAssistant])

  const handleCatAssistantYes = () => {
    setCatAssistantOpen(false)
    setShowTutorialPointer(true)
    setMusicModalOpen(true)
  }

  const handleCatAssistantNo = () => {
    setCatAssistantOpen(false)
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
            {/* 🧭 Top Banner for Memory Mode / Return to Birthday World */}
      {onBackToWorld && (
        <div style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 99999,
          display: 'flex',
          gap: 8,
          alignItems: 'center'
        }}>
          <button
            onClick={onBackToWorld}
            style={{
              border: 'none',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(12px)',
              padding: '7px 14px',
              borderRadius: 999,
              fontSize: '0.82rem',
              fontWeight: 800,
              color: 'var(--rose-deep, #e11d48)',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'transform 0.2s'
            }}
            title="Return to Birthday World Home"
          >
            <span>🧸</span>
            <span>World Home</span>
          </button>
          
          {isMemoryMode && (
            <span style={{
              background: 'rgba(244, 63, 94, 0.9)',
              color: '#fff',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: 999,
              boxShadow: '0 2px 8px rgba(244, 63, 94, 0.25)'
            }}>
              📔 Memory Mode • 2026
            </span>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">{scenes[sceneIndex]}</AnimatePresence>

      {/* 🐱 Cat BGM Assistant Popup */}
      <CatBgmAssistant
        isOpen={catAssistantOpen}
        onYes={handleCatAssistantYes}
        onNo={handleCatAssistantNo}
      />

      {/* 🎵 Live Song Search & BGM Changer Modal */}
      <SongSearchModal
        isOpen={musicModalOpen}
        onClose={() => setMusicModalOpen(false)}
      />

      {/* 👆 Animated Tutorial Pointer pointing to top Music HUD */}
      <AnimatePresence>
        {showTutorialPointer && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{
              position: 'fixed',
              top: 68,
              right: 16,
              zIndex: 999999,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              padding: '12px 18px',
              borderRadius: 20,
              boxShadow: '0 12px 35px rgba(247, 85, 138, 0.38)',
              border: '2.5px solid var(--rose-deep)',
              maxWidth: 290,
              textAlign: 'right'
            }}
          >
            <div style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--rose-deep)', lineHeight: 1.4, marginBottom: 6 }}>
              👆 Mommy, yahan se music band (🔇) ya naya gaana change (🎵) kar sakti hain!
            </div>
            <button
              onClick={() => setShowTutorialPointer(false)}
              style={{
                border: 'none',
                background: 'var(--rose-deep)',
                color: '#fff',
                fontSize: '0.76rem',
                fontWeight: 800,
                padding: '5px 14px',
                borderRadius: 999,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(247, 85, 138, 0.3)'
              }}
            >
              Samajh gayi! 👍
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {showHUD && (
        <>
          {/* Top Right Music Controls Group */}
          <div style={{ position: 'fixed', top: 16, right: 16, display: 'flex', gap: 8, zIndex: 99999 }}>
            <button
              className="mute-btn"
              onClick={toggleMute}
              aria-label="toggle sound"
              title={muted ? 'Unmute Music' : 'Mute Music'}
              style={{ position: 'static' }}
            >
              {muted ? '🔇' : '🔊'}
            </button>
            <button
              className="mute-btn"
              onClick={() => {
                playSparkle()
                setShowTutorialPointer(false)
                setMusicModalOpen(true)
              }}
              aria-label="change music"
              title="Change Background Song"
              style={{
                position: 'static',
                background: 'linear-gradient(135deg, #ff7597, #f43f5e)',
                color: '#fff',
                boxShadow: '0 4px 14px rgba(244, 63, 94, 0.35)'
              }}
            >
              🎵
            </button>
          </div>

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
