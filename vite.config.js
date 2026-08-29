import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          lottie: ['lottie-web'],
          vendor: ['react', 'react-dom', 'framer-motion']
        }
      }
    }
  }
})
