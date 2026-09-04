import { MusicPlayerProvider } from './context/MusicPlayerContext.jsx'
import BirthdayShell from './components/BirthdayWorld/BirthdayShell.jsx'

export default function App() {
  return (
    <MusicPlayerProvider>
      <BirthdayShell />
    </MusicPlayerProvider>
  )
}

