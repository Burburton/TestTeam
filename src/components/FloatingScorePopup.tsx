import { ScorePopup } from '../types'
import '../styles/FloatingScorePopup.css'

interface FloatingScorePopupProps {
  popup: ScorePopup
}

export function FloatingScorePopup({ popup }: FloatingScorePopupProps) {
  const GEM_SIZE = 50
  const GAP = 4
  const PADDING = 10
  
  const left = PADDING + popup.col * (GEM_SIZE + GAP) + GEM_SIZE / 2
  const top = PADDING + popup.row * (GEM_SIZE + GAP) + GEM_SIZE / 2
  
  return (
    <div
      className="floating-score-popup"
      style={{
        left: `${left}px`,
        top: `${top}px`
      }}
    >
      +{popup.score}
    </div>
  )
}