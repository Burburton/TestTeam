import { Gem, Match, Position } from '../types'
import { findLTShapePatterns } from '../utils/specialGems'

export function findMatches(board: Gem[][]): Match[] {
  const matches: Match[] = []
  const visited = new Set<string>()
  
  const ltMatches = findLTShapePatterns(board)
  for (const match of ltMatches) {
    const key = match.positions.map(p => `${p.row},${p.col}`).sort().join('|')
    if (!visited.has(key)) {
      visited.add(key)
      matches.push(match)
    }
  }
  
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      const horizontalMatch = findHorizontalMatch(board, row, col)
      if (horizontalMatch.length >= 3) {
        const key = horizontalMatch.positions.map(p => `${p.row},${p.col}`).join('|')
        const isInLTShape = ltMatches.some(lt => 
          lt.positions.some(p => horizontalMatch.positions.some(hp => hp.row === p.row && hp.col === p.col))
        )
        
        if (!visited.has(key) && !isInLTShape) {
          visited.add(key)
          matches.push(horizontalMatch)
        }
      }
      
      const verticalMatch = findVerticalMatch(board, row, col)
      if (verticalMatch.length >= 3) {
        const key = verticalMatch.positions.map(p => `${p.row},${p.col}`).join('|')
        const isInLTShape = ltMatches.some(lt => 
          lt.positions.some(p => verticalMatch.positions.some(vp => vp.row === p.row && vp.col === p.col))
        )
        
        if (!visited.has(key) && !isInLTShape) {
          visited.add(key)
          matches.push(verticalMatch)
        }
      }
    }
  }
  
  return matches
}

function findHorizontalMatch(board: Gem[][], row: number, col: number): Match {
  const type = board[row][col].type
  const positions: Position[] = [{ row, col }]
  
  for (let c = col + 1; c < board[0].length; c++) {
    if (board[row][c].type === type) {
      positions.push({ row, col: c })
    } else {
      break
    }
  }
  
  return {
    positions,
    type,
    length: positions.length,
    direction: 'horizontal',
    shape: 'line'
  }
}

function findVerticalMatch(board: Gem[][], row: number, col: number): Match {
  const type = board[row][col].type
  const positions: Position[] = [{ row, col }]
  
  for (let r = row + 1; r < board.length; r++) {
    if (board[r][col].type === type) {
      positions.push({ row: r, col })
    } else {
      break
    }
  }
  
  return {
    positions,
    type,
    length: positions.length,
    direction: 'vertical',
    shape: 'line'
  }
}

export function hasMatches(board: Gem[][]): boolean {
  return findMatches(board).length > 0
}

export function markMatchedGems(board: Gem[][], matches: Match[]): Gem[][] {
  const newBoard = board.map(row => row.map(gem => ({ ...gem })))
  
  matches.forEach(match => {
    match.positions.forEach(pos => {
      newBoard[pos.row][pos.col].isMatched = true
    })
  })
  
  return newBoard
}

export function calculateScore(matches: Match[]): number {
  return matches.reduce((total, match) => {
    const baseScore = match.length * 10
    const bonus = match.length > 3 ? (match.length - 3) * 20 : 0
    const shapeBonus = match.shape === 'L' ? 30 : match.shape === 'T' ? 40 : 0
    return total + baseScore + bonus + shapeBonus
  }, 0)
}

export function removeMatchedGems(board: Gem[][]): { newBoard: Gem[][], removedCount: number } {
  const newBoard = board.map(row => 
    row.map(gem => gem.isMatched ? null : gem)
  )
  
  let removedCount = 0
  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[0].length; col++) {
      if (newBoard[row][col] === null) {
        removedCount++
      }
    }
  }
  
  return { newBoard: newBoard as unknown as Gem[][], removedCount }
}

export function getMatchCenterPosition(match: Match): Position {
  const avgRow = match.positions.reduce((sum, p) => sum + p.row, 0) / match.positions.length
  const avgCol = match.positions.reduce((sum, p) => sum + p.col, 0) / match.positions.length
  
  let closestPos = match.positions[0]
  let minDist = Infinity
  
  for (const pos of match.positions) {
    const dist = Math.abs(pos.row - avgRow) + Math.abs(pos.col - avgCol)
    if (dist < minDist) {
      minDist = dist
      closestPos = pos
    }
  }
  
  return closestPos
}