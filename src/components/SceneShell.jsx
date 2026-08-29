import { motion } from 'framer-motion'
import FloatingParticles from './FloatingParticles.jsx'

export const SPRING = { type: 'spring', stiffness: 260, damping: 20 }

export default function SceneShell({ children, bg = null, wide = false, particles = true }) {
  return (
    <motion.section
      className="scene-root"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* 🌸 Dynamic Korean Liquid Aurora Background */}
      {bg || (
        <div className="bg-animated">
          <div className="bokeh-orb" style={{ width: 340, height: 340, background: '#fbcfe8', top: '-10%', left: '-10%' }} />
          <div className="bokeh-orb" style={{ width: 380, height: 380, background: '#e9d5ff', bottom: '-15%', right: '-10%', animationDelay: '-5s' }} />
          <div className="bokeh-orb" style={{ width: 300, height: 300, background: '#bae6fd', top: '40%', right: '15%', animationDelay: '-9s' }} />
        </div>
      )}
      {particles && <FloatingParticles count={16} />}

      {/* 🧊 Korean Claymorphism Floating Glass Island Container */}
      <div className={`korean-glass-island ${wide ? 'wide' : ''}`}>
        <div className="content-col" style={wide ? { width: 'min(640px, 100%)' } : undefined}>
          {children}
        </div>
      </div>
    </motion.section>
  )
}
