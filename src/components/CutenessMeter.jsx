import { motion } from 'framer-motion'

export default function CutenessMeter({ level }) {
  const broken = level >= 100
  const clamped = Math.min(level, 100)
  return (
    <motion.div
      className="cuteness-meter"
      animate={broken ? { x: [0, -3, 3, -2, 0] } : { x: 0 }}
      transition={broken ? { repeat: Infinity, duration: 0.4 } : {}}
    >
      <div className="meter-track">
        <motion.div
          className="meter-fill"
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          style={broken ? {
            background: 'linear-gradient(90deg, #ff6b8a, #e5484d, #ff6b8a)',
            backgroundSize: '200% 100%'
          } : undefined}
        />
      </div>
      <div className={`meter-label ${broken ? 'meter-error' : ''}`}>
        {broken
          ? '⚠ ERROR: TOO CUTE TO MEASURE 😵'
          : `cuteness meter… ${Math.round(clamped)}%`}
      </div>
      {broken && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: 4,
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--rose-deep)'
          }}
        >
          (system overload detected 💗)
        </motion.div>
      )}
    </motion.div>
  )
}
