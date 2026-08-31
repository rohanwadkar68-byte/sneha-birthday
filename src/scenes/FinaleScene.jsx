import { useEffect } from 'react'
import { motion } from 'framer-motion'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import { FINALE_LETTERS, GIRL, FINALE_UI } from '../utils/content.js'
import { triggerRosePetals } from '../utils/assets.js'
import { playFanfare, playSparkle } from '../utils/audio.js'

// 🌟 Fresh 3D Animated Celebration Floating Icons
const FLOATING_3D_ICONS = [
  { src: 'assets/3d-emoji/birthday_cake.png', size: 42, left: '8%', top: '12%', dur: 3.8 },
  { src: 'assets/3d-emoji/crown.png', size: 38, left: '84%', top: '10%', dur: 4.2 },
  { src: 'assets/3d-emoji/sparkling_heart.png', size: 36, left: '12%', top: '68%', dur: 3.5 },
  { src: 'assets/3d-emoji/party_popper.png', size: 40, left: '86%', top: '70%', dur: 4.0 },
  { src: 'assets/3d-emoji/wrapped_gift.png', size: 38, left: '5%', top: '42%', dur: 4.5 },
  { src: 'assets/3d-emoji/cupcake.png', size: 36, left: '88%', top: '40%', dur: 3.9 }
]

export default function FinaleScene({ onNext, bonus = false }) {
  useEffect(() => {
    playFanfare()
    // 🌸 Single gentle, subtle breeze — clean & peaceful (no screen crowding)
    const t1 = setTimeout(() => {
      triggerRosePetals({
        particleCount: 16,
        origin: { x: 0.5, y: 0.4 },
        burst: false
      })
    }, 400)

    return () => clearTimeout(t1)
  }, [bonus])

  return (
    <SceneShell wide>
      {/* 🌟 Floating 3D Animated Party & Cake Emojis */}
      {FLOATING_3D_ICONS.map((icon, i) => (
        <motion.img
          key={i}
          src={icon.src}
          alt="3D Celebration Icon"
          style={{
            position: 'absolute',
            left: icon.left,
            top: icon.top,
            width: icon.size,
            height: icon.size,
            objectFit: 'contain',
            filter: 'drop-shadow(0 4px 12px rgba(247, 85, 138, 0.25))',
            pointerEvents: 'none',
            zIndex: 0
          }}
          animate={{
            y: [0, -14, 0],
            rotate: [0, i % 2 ? 8 : -8, 0],
            scale: [1, 1.06, 1]
          }}
          transition={{ repeat: Infinity, duration: icon.dur, ease: 'easeInOut' }}
        />
      ))}

      {/* Birthday Girl Crown Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '5px 20px',
          borderRadius: 999,
          fontSize: '0.92rem',
          fontWeight: 800,
          color: 'var(--rose-deep)',
          boxShadow: '0 4px 16px rgba(247, 85, 138, 0.2)',
          marginBottom: 6,
          border: '2px solid rgba(255, 255, 255, 0.9)'
        }}
      >
        <span>👑</span> {FINALE_UI.heading}
      </motion.div>

      {/* 3D Animated Letters */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {FINALE_LETTERS.map((word, wi) => (
          <div key={wi} style={{ display: 'flex' }}>
            {[...word].map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: -140, opacity: 0, rotate: -25, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                transition={{ ...SPRING, delay: wi * 0.4 + i * 0.07 }}
                whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                style={{
                  fontSize: 'clamp(2.4rem, 10vw, 4.2rem)',
                  fontWeight: 900,
                  color: ['#f76a99', '#a78bfa', '#38bdf8', '#fb7185'][i % 4],
                  textShadow: '0 6px 18px rgba(247, 106, 153, 0.25)',
                  display: 'inline-block',
                  margin: '0 2px'
                }}
              >
                {ch}
              </motion.span>
            ))}
          </div>
        ))}
      </div>

      <motion.div
        className="hand-note"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, ...SPRING }}
        style={{ marginTop: 6, fontSize: '1.45rem' }}
      >
        {bonus ? '…AUR EK AUR CHOTA SA SURPRISE!! 🥳' : `World ki best insaan ke liye — Happy Birthday ${GIRL}! 🥳💖`}
      </motion.div>

      {/* 🧸 Hero Centerpiece: Bubu & Dudu Romantic Celebration Cuddle */}
      <motion.div
        style={{ margin: '8px 0', display: 'flex', justifyContent: 'center' }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, ...SPRING }}
      >
        <motion.img
          src="assets/kisses/cuddle_3.gif"
          alt="Bubu Dudu Celebration"
          style={{
            width: 175,
            height: 175,
            objectFit: 'contain',
            borderRadius: 24,
            filter: 'drop-shadow(0 8px 24px rgba(247, 85, 138, 0.4))'
          }}
          animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* 🎭 Cute Meme & Mascot Parade Below (Cat Jam, Bubu Kiss, Dancing Doggo) */}
      <motion.div
        style={{
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: 4
        }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        {/* 🐱 Cat Jam Meme */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
        >
          <img
            src="assets/memes/cat_jam.gif"
            alt="Cat Jam"
            style={{ width: 62, height: 62, borderRadius: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
        </motion.div>

        {/* 🧸 Bubu Dudu Sweet Kiss */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
        >
          <img
            src="assets/kisses/bubu_kiss_5.gif"
            alt="Bubu Kiss"
            style={{ width: 70, height: 70, borderRadius: 16, filter: 'drop-shadow(0 4px 12px rgba(247, 85, 138, 0.3))' }}
          />
        </motion.div>

        {/* 🐕 Dancing Doggo Meme */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 1.3, delay: 0.4, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
        >
          <img
            src="assets/memes/dance_doggo.gif"
            alt="Dancing Doggo"
            style={{ width: 62, height: 62, borderRadius: 14, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
        </motion.div>
      </motion.div>

      <motion.button
        className="btn-primary"
        onClick={onNext}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        style={{ marginTop: 14 }}
      >
        <span>{bonus ? 'Theek hai AB aage badho' : 'Aage dekhiye… aur bhi hai'}</span> 👉✨
      </motion.button>
    </SceneShell>
  )
}
