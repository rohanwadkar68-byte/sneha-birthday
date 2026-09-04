import React from 'react'

export default class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Global error caught:', error, errorInfo)
  }

  handleReload = () => {
    window.location.hash = '#/birthday'
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#0d0d15',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          zIndex: 99999999
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎂✨</div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px', color: '#ff77aa' }}>
            Sneha's Birthday Celebration
          </h1>
          <p style={{ fontSize: '14px', color: '#cccccc', maxWidth: '380px', marginBottom: '24px', lineHeight: 1.5 }}>
            A smooth refresh is happening to keep everything buttery soft.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              background: 'linear-gradient(135deg, #ff4081, #9c27b0)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '30px',
              padding: '12px 28px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(255, 64, 129, 0.4)'
            }}
          >
            Back to Birthday World 🎈
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
