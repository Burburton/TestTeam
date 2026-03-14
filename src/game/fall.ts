import { Gem, GemType, GameConfig, DEFAULT_CONFIG } from '../types'

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

function getRandomGemType(types: GemType[]): GemType {
  return types[Math.floor(Math.random() * types.length)]
}

export function applyGravity(board: (Gem | null)[][], config: GameConfig = DEFAULT_CONFIG): Gem[][] {
  const rows = board.length
  const cols = board[0].length
  const newBoard: Gem[][] = Array(rows).fill(null).map(() => Array(cols).fill(null))
  
  for (let col = 0; col < cols; col++) {
    let writeRow = rows - 1
    
    for (let row = rows - 1; row >= 0; row--) {
      if (board[row][col] !== null) {
        const gem = board[row][col]!
        newBoard[writeRow][col] = {
          ...gem,
          row: writeRow,
          col,
          isFalling: writeRow !== row
        }
        writeRow--
      }
    }
    
    while (writeRow >= 0) {
      newBoard[writeRow][col] = {
        id: generateId(),
        type: getRandomGemType(config.gemTypes),
        row: writeRow,
        col,
        isMatched: false,
        isFalling: true
      }
      writeRow--
    }
  }
  
  return newBoard
}

export function clearFallingState(board: Gem[][]): Gem[][] {
  return board.map(row => 
    row.map(gem => ({ ...gem, isFalling: false }))
  )
}

export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}