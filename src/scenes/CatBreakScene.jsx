import CatReaction from '../components/CatReaction.jsx'

export default function CatBreakScene({ onNext, cat, caption }) {
  return <CatReaction catSrc={cat} caption={caption} onDismiss={onNext} />
}
