import { motion } from 'framer-motion'
import SceneShell, { SPRING } from '../components/SceneShell.jsx'
import Teddy from '../components/Teddy.jsx'
import Sticker from '../components/Sticker.jsx'
import { DECOS, TEDDY_WEBM, POOKIE } from '../utils/assets.js'
import { GIRL, BIRTH_DATE, BIRTH_DATE_PRETTY, FINALE_UI, TRUE_END_CONTENT } from '../utils/content.js'
import { playSparkle } from '../utils/audio.js'

export default function TrueEnd({ onReplay }) {
  const handleReplay = () => {
    playSparkle()
    onReplay()
  }

  return (
    <SceneShell wide>
      {/* Main Love Teddy */}
      <Teddy src={TEDDY_WEBM.love[0]} size={165} glow />

      {/* 🎫 Official Holographic VIP Birthday Pass */}
      <motion.div
        className="vip-pass"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={SPRING}
        style={{ marginTop: 6 }}
      >
        {/* Pass Top Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--rose-deep)', letterSpacing: '0.06em' }}>
            {TRUE_END_CONTENT.vipBadge}
          </span>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--gold)' }}>
            {TRUE_END_CONTENT.specialTag}
          </span>
        </div>

        <h2 className="title-xl" style={{ margin: '2px 0 4px', fontSize: 'clamp(1.65rem, 6vw, 2.3rem)' }}>
          Happy Birthday, {GIRL}! 💖
        </h2>

        <div style={{ fontSize: '0.86rem', color: 'var(--rose-deep)', fontWeight: 800, marginBottom: 6 }}>
          {TRUE_END_CONTENT.edition}
        </div>

        <p className="subtitle" style={{ margin: '4px 0', fontSize: '0.96rem', color: 'var(--ink)', lineHeight: 1.4 }}>
          {TRUE_END_CONTENT.certifyText}
        </p>

        <p className="hand-note" style={{ margin: '8px 0 4px', fontSize: '1.45rem' }}>
          {TRUE_END_CONTENT.handNote}
        </p>

        {/* Verification Stamp */}
        <div className="pass-stamp">
          {TRUE_END_CONTENT.stampText}
        </div>
      </motion.div>

      {/* Replay 3D Button */}
      <motion.button
        className="btn-primary"
        onClick={handleReplay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        style={{
          marginTop: 16,
          background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)'
        }}
      >
        <span>{FINALE_UI.replayBtn}</span>
      </motion.button>
    </SceneShell>
  )
}
