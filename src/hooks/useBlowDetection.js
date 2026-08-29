import { useEffect, useRef, useState } from 'react'

const BLOW_THRESHOLD = 0.42
const BLOW_DURATION_MS = 300

export default function useBlowDetection(onBlow) {
  const [state, setState] = useState('idle')
  const cbRef = useRef(onBlow)
  cbRef.current = onBlow

  const refs = useRef({ stream: null, ctx: null, raf: 0 })

  const stop = () => {
    cancelAnimationFrame(refs.current.raf)
    refs.current.stream?.getTracks().forEach((t) => t.stop())
    refs.current.ctx?.close().catch(() => {})
    refs.current.stream = null
    refs.current.ctx = null
    setState('idle')
  }

  const start = async () => {
    if (refs.current.ctx) return
    try {
      const AC = window.AudioContext || window.webkitAudioContext
      const actx = new AC()
      const analyser = actx.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.3
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
      })
      actx.createMediaStreamSource(stream).connect(analyser)
      refs.current.stream = stream
      refs.current.ctx = actx

      const data = new Uint8Array(analyser.frequencyBinCount)
      let loudSince = 0

      const loop = () => {
        analyser.getByteFrequencyData(data)
        let sum = 0
        for (let i = 0; i < 10; i++) sum += data[i]
        const level = sum / 10 / 255
        const now = performance.now()
        if (level > BLOW_THRESHOLD) {
          if (!loudSince) loudSince = now
          else if (now - loudSince > BLOW_DURATION_MS) {
            loudSince = 0
            cbRef.current(level)
          }
        } else {
          loudSince = 0
        }
        refs.current.raf = requestAnimationFrame(loop)
      }
      loop()
      setState('listening')
    } catch {
      setState('denied')
    }
  }

  useEffect(() => stop, [])
  return { state, start, stop }
}
