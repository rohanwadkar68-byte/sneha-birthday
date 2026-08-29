import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import lottie from 'lottie-web'
import Sticker from './Sticker.jsx'
import { POOKIE } from '../utils/assets.js'

export default function CatReaction({ catSrc, caption, onDismiss }) {
  const boxRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let anim
    let alive = true
    fetch(catSrc)
      .then((r) => {
        if (!r.ok) throw new Error('Not found')
        return r.json()
      })
      .then((data) => {
        if (!alive || !boxRef.current) return
        anim = lottie.loadAnimation({
          container: boxRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: data
        })
      })
      .catch(() => {
        if (alive) setFailed(true)
      })
    return () => {
      alive = false
      anim?.destroy()
    }
  }, [catSrc])

  return (
    <motion.div
      className="cat-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onDismiss}
    >
      <motion.div
        className="cat-card"
        initial={{ scale: 0.4, y: 60, rotate: -6 }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        onClick={(e) => e.stopPropagation()}
      >
        {!failed ? (
          <div ref={boxRef} style={{ width: 180, height: 180 }} />
        ) : (
          <Sticker src={POOKIE.webp[10]} size={160} dieCut float />
        )}
        <div className="bubble">{caption}</div>
        <button className="btn-primary" style={{ marginTop: 14 }} onClick={onDismiss}>
          theek hai! 🐾
        </button>
      </motion.div>
    </motion.div>
  )
}
