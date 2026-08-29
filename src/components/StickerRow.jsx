import { motion } from 'framer-motion'
import Sticker from './Sticker.jsx'

// A row of evenly-spaced animated stickers (webp/webm) used for ambient cuteness.
export default function StickerRow({ stickers, size = 90, gap = 16, float = true, style }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap,
        flexWrap: 'wrap',
        width: '100%',
        ...style
      }}
    >
      {stickers.map((src, i) => (
        <motion.div
          key={i}
          animate={float ? { y: [0, -10 - (i % 3) * 4, 0], rotate: [0, i % 2 ? 6 : -6, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2.4 + i * 0.3, ease: 'easeInOut', delay: i * 0.15 }}
        >
          <Sticker src={src} size={size} />
        </motion.div>
      ))}
    </div>
  )
}
