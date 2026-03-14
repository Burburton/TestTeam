import { Gem, GemType, GameConfig, DEFAULT_CONFIG, Position } from '../types'

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

function getRandomGemType(types: GemType[]): GemType {
  return types[Math.floor(Math.random() * types.length)]
}

export function createBoard(config: GameConfig = DEFAULT_CONFIG): Gem[][] {
  const board: Gem[][] = []
  
  for (let row = 0; row < config.rows; row++) {
    board[row] = []
    for (let col = 0; col < config.cols; col++) {
      let gemType = getRandomGemType(config.gemTypes)
      
      while (
        (col >= 2 && 
          board[row][col - 1].type === gemType && 
          board[row][col - 2].type === gemType) ||
        (row >= 2 && 
          board[row - 1][col].type === gemType && 
          board[row - 2][col].type === gemType)
      ) {
        gemType = getRandomGemType(config.gemTypes)
      }
      
      board[row][col] = {
        id: generateId(),
        type: gemType,
        row,
        col,
        isMatched: false,
        isFalling: false
      }
    }
  }
  
  return board
}

export function swapGems(
  board: Gem[][], 
  pos1: Position, 
  pos2: Position
): Gem[][] {
  const newBoard = board.map(row => row.map(gem => ({ ...gem })))
  
  const gem1 = newBoard[pos1.row][pos1.col]
  const gem2 = newBoard[pos2.row][pos2.col]
  
  newBoard[pos1.row][pos1.col] = { ...gem2, row: pos1.row, col: pos1.col }
  newBoard[pos2.row][pos2.col] = { ...gem1, row: pos2.row, col: pos2.col }
  
  return newBoard
}

export function areAdjacent(pos1: Position, pos2: Position): boolean {
  const rowDiff = Math.abs(pos1.row - pos2.row)
  const colDiff = Math.abs(pos1.col - pos2.col)
  
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)
}

export function isValidPosition(pos: Position, board: Gem[][]): boolean {
  return pos.row >= 0 && 
         pos.row < board.length && 
         pos.col >= 0 && 
         pos.col < board[0].length
}