import { Gem, Position, GEM_COLORS, GEM_EMOJIS } from '../types'
import { SPECIAL_GEM_EMOJIS } from '../types'
import '../styles/Gem.css'

interface GemProps {
  gem: Gem
  isSelected: boolean
  onClick: (position: Position) => void
  disabled: boolean
}

export function GemComponent({ gem, isSelected, onClick, disabled }: GemProps) {
  const handleClick = () => {
    if (!disabled) {
      onClick({ row: gem.row, col: gem.col })
    }
  }
  
  const gemContent = gem.special 
    ? SPECIAL_GEM_EMOJIS[gem.special]
    : GEM_EMOJIS[gem.type]
  
  const getSpecialClass = (): string => {
    if (!gem.special) return ''
    return `special-${gem.special}`
  }
  
  const classNames = [
    'gem',
    isSelected ? 'selected' : '',
    gem.isMatched ? 'matched' : '',
    gem.isFalling ? 'falling' : '',
    gem.special ? 'special' : '',
    getSpecialClass()
  ].filter(Boolean).join(' ')
  
  return (
    <div
      className={classNames}
      onClick={handleClick}
      style={{ 
        backgroundColor: GEM_COLORS[gem.type],
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      role="button"
      tabIndex={0}
      aria-label={`${gemContent} gem at row ${gem.row}, column ${gem.col}${gem.special ? ` with ${gem.special} effect` : ''}`}
    >
      <span className="gem-emoji">{gemContent}</span>
    </div>
  )
}