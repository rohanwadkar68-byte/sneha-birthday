import { useEffect, useState } from 'react'
import { playTypewriter } from '../utils/audio.js'

export default function useTypewriter(lines, speed = 28, linePause = 450) {
  const [output, setOutput] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false
    let timeout

    const run = async () => {
      const out = []
      for (const line of lines) {
        let shown = ''
        for (let i = 0; i < line.length; i++) {
          if (cancelled) return
          shown += line[i]
          setOutput([...out, shown])
          if (i % 3 === 0 && line[i] !== ' ') {
            playTypewriter()
          }
          await new Promise((r) => { timeout = setTimeout(r, speed) })
        }
        out.push(shown)
        setOutput([...out])
        await new Promise((r) => { timeout = setTimeout(r, linePause) })
      }
      if (!cancelled) setDone(true)
    }

    setOutput([])
    setDone(false)
    run()
    return () => { cancelled = true; clearTimeout(timeout) }
  }, [lines, speed, linePause])

  return { output, done }
}
