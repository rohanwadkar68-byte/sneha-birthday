import { MusicPlayerProvider } from './context/MusicPlayerContext.jsx'
import BirthdayShell from './components/BirthdayWorld/BirthdayShell.jsx'
import GlobalErrorBoundary from './components/GlobalErrorBoundary.jsx'

export default function App() {
  return (
    <GlobalErrorBoundary>
      <MusicPlayerProvider>
        <BirthdayShell />
      </MusicPlayerProvider>
    </GlobalErrorBoundary>
  )
}


