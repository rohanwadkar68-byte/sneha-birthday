import { motion } from 'framer-motion'
import FloatingParticles from './FloatingParticles.jsx'

export const SPRING = { type: 'spring', stiffness: 220, damping: 24, mass: 0.8 }

export default function SceneShell({ children, bg = null, wide = false, particles = true }) {
  return (
    <motion.section
      className="scene-root"
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.99, y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 🌸 Dynamic Korean Liquid Aurora Background */}
      {bg || (
        <div className="bg-animated">
          <div className="bokeh-orb" style={{ width: 340, height: 340, background: '#fbcfe8', top: '-10%', left: '-10%' }} />
          <div className="bokeh-orb" style={{ width: 380, height: 380, background: '#e9d5ff', bottom: '-15%', right: '-10%', animationDelay: '-5s' }} />
          <div className="bokeh-orb" style={{ width: 300, height: 300, background: '#bae6fd', top: '40%', right: '15%', animationDelay: '-9s' }} />
        </div>
      )}


      {/* 🧊 Korean Claymorphism Floating Glass Island Container */}
      <div className={`korean-glass-island ${wide ? 'wide' : ''}`}>
        <div className="content-col" style={wide ? { width: 'min(640px, 100%)' } : undefined}>
          {children}
        </div>
      </div>
    </motion.section>
  )
}
