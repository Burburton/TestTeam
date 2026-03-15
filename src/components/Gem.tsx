import { Gem, Position, GEM_COLORS, GEM_EMOJIS } from '../types'
import { SPECIAL_GEM_EMOJIS } from '../types'
import '../styles/Gem.css'

interface GemProps {
  gem: Gem
  isSelected: boolean
  isBlastPreview: boolean
  onClick: (position: Position) => void
  onHover: (position: Position | null) => void
  disabled: boolean
}

export function GemComponent({ 
  gem, 
  isSelected, 
  isBlastPreview, 
  onClick, 
  onHover,
  disabled 
}: GemProps) {
  const handleClick = () => {
    if (!disabled) {
      onClick({ row: gem.row, col: gem.col })
    }
  }
  
  const handleMouseEnter = () => {
    if (!disabled) {
      onHover({ row: gem.row, col: gem.col })
    }
  }
  
  const handleMouseLeave = () => {
    if (!disabled) {
      onHover(null)
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
    getSpecialClass(),
    isBlastPreview ? 'blast-preview' : ''
  ].filter(Boolean).join(' ')
  
  return (
    <div
      className={classNames}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        backgroundColor: GEM_COLORS[gem.type],
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      role="button"
      tabIndex={0}
      aria-label={`${gemContent} gem at row ${gem.row}, column ${gem.col}${gem.special ? ` with ${gem.special} effect` : ''}`}
    >
      <span className="gem-emoji">{gemContent}</span>
      {gem.special && (
        <div className="blast-range-indicator" data-type={gem.special}>
          <BlastRangeIcon type={gem.special} />
        </div>
      )}
    </div>
  )
}

function BlastRangeIcon({ type }: { type: string }) {
  switch (type) {
    case 'bomb':
      return (
        <svg viewBox="0 0 24 24" className="blast-icon">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      )
    case 'lightning':
    case 'columnBlaster':
      return (
        <svg viewBox="0 0 24 24" className="blast-icon">
          <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        </svg>
      )
    case 'hypercube':
      return (
        <svg viewBox="0 0 24 24" className="blast-icon">
          <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        </svg>
      )
    case 'rowBlaster':
      return (
        <svg viewBox="0 0 24 24" className="blast-icon">
          <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        </svg>
      )
    case 'diagonal':
      return (
        <svg viewBox="0 0 24 24" className="blast-icon">
          <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          <line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        </svg>
      )
    default:
      return null
  }
}