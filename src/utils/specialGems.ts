import { Gem, SpecialGemType, GemType, Position } from '../types'

/**
 * Determines if creating a special gem based on match characteristics
 */
export function getSpecialGemType(matchLength: number, matchType: GemType): SpecialGemType | undefined {
  if (matchLength >= 5) {
    return 'hypercube'  // Made from 5+ match
  } else if (matchLength === 4) {
    return 'bomb'        // Made from 4 match
  } else if (matchType === 'pink') {  // For pink gems - could represent a special event
    // Maybe pink gems have chance to become lightning? Adjust as needed 
    if (Math.random() > 0.9) {
      return 'lightning'
    }
  }
  return undefined
}

/**
 * Creates a special gem that is generated upon a successful match
 */
export function createSpecialGem(gem: Gem, specialType: SpecialGemType): Gem {
  return {
    ...gem,
    special: specialType
  }
}

/**
 * Handles the explosion effect for different special gems
 */
export function handleSpecialGemEffect(specialType: SpecialGemType, board: Gem[][], position: Position): { board: Gem[][], scoreBonus: number } {
  const newBoard = board.map(row => row.map(gem => ({ ...gem })))
  let scoreBonus = 0
  
  switch (specialType) {
    case 'bomb':
      // Destroy all gems in surrounding 3x3 area
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const r = position.row + dr
          const c = position.col + dc
          if (r >= 0 && r < board.length && c >= 0 && c < board[0].length) {
            if (newBoard[r][c]) {
              newBoard[r][c].isMatched = true
              scoreBonus += 20
            }
          }
        }
      }
      break
    case 'lightning':
      // Strike entire column
      for (let r = 0; r < board.length; r++) {
        newBoard[r][position.col].isMatched = true
        scoreBonus += 15
      }
      break
    case 'hypercube':
      // Random special effect, for now destroy whole row
      for (let c = 0; c < board[0].length; c++) {
        newBoard[position.row][c].isMatched = true
        scoreBonus += 25
      }
      break
  }
  
  return { board: newBoard, scoreBonus }
}

/**
 * Calculates extra score based on special gem presence
 */
export function calculateSpecialGemBonus(gem?: Gem): number {
  if (!gem?.special) {
    return 0
  }
  
  const specialBonuses: Record<SpecialGemType, number> = {
    bomb: 30,
    lightning: 40,
    hypercube: 50
  }
  
  return specialBonuses[gem.special]
}