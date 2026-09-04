import { motion } from 'framer-motion'

export default function SpotifyTopBar({
  activeView,
  setActiveView,
  searchQuery,
  setSearchQuery,
  onBackToWorld
}) {
  return (
    <header style={{
      height: 64,
      background: 'rgba(18, 18, 18, 0.85)',
      backdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8
    }}>
      {/* LEFT: History Buttons & Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {/* Back Button */}
          <button
            onClick={() => setActiveView('home')}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.7)',
              border: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Go back"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8.53a.75.75 0 0 1 0-1.06L9.97.47a.75.75 0 0 1 1.06 0z"/>
            </svg>
          </button>

          {/* Forward Button */}
          <button
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.4)',
              border: 'none',
              color: 'rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'not-allowed'
            }}
            disabled
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8.53a.75.75 0 0 0 0-1.06L6.03.47a.75.75 0 0 0-1.06 0z"/>
            </svg>
          </button>
        </div>

        {/* Search Input Bar (Visible in Search View) */}
        {activeView === 'search' && (
          <div style={{ position: 'relative', width: 340 }}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#747474"
              style={{ position: 'absolute', left: 12, top: 11, pointerEvents: 'none' }}
            >
              <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.279 7.407-7.279s7.407 3.273 7.407 7.279-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.279z"/>
            </svg>
            <input
              type="text"
              placeholder="What do you want to play?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                background: '#242424',
                border: 'none',
                borderRadius: 9999,
                padding: '10px 36px 10px 40px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
                fontWeight: 500
              }}
              onFocus={(e) => { e.currentTarget.style.border = '2px solid #ffffff' }}
              onBlur={(e) => { e.currentTarget.style.border = 'none' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 10,
                  border: 'none',
                  background: 'transparent',
                  color: '#b3b3b3',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>

      {/* RIGHT: Return to World Button & Sneha Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Return to Birthday World Button */}
        <button
          onClick={onBackToWorld}
          style={{
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.08)',
            color: '#ffffff',
            padding: '7px 16px',
            borderRadius: 9999,
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'background 0.2s, transform 0.15s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.18)'
            e.currentTarget.style.transform = 'scale(1.04)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <span>←</span>
          <span>Return to Birthday World</span>
        </button>

        {/* Sneha Profile Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(0,0,0,0.6)',
          padding: '3px 12px 3px 4px',
          borderRadius: 9999,
          cursor: 'pointer'
        }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f43f5e, #be185d)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '12px'
          }}>
            S
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
            Sneha 👑
          </span>
        </div>
      </div>
    </header>
  )
}
