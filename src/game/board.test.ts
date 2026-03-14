import { describe, it, expect } from 'vitest'
import { createBoard, areAdjacent, swapGems } from '../game/board'
import { findMatches, calculateScore } from '../game/match'
import { DEFAULT_CONFIG } from '../types'

describe('Board', () => {
  it('should create a board with correct dimensions', () => {
    const board = createBoard(DEFAULT_CONFIG)
    expect(board.length).toBe(DEFAULT_CONFIG.rows)
    expect(board[0].length).toBe(DEFAULT_CONFIG.cols)
  })

  it('should not have initial matches', () => {
    const board = createBoard(DEFAULT_CONFIG)
    const matches = findMatches(board)
    expect(matches.length).toBe(0)
  })
})

describe('Position', () => {
  it('should detect adjacent positions', () => {
    expect(areAdjacent({ row: 0, col: 0 }, { row: 0, col: 1 })).toBe(true)
    expect(areAdjacent({ row: 0, col: 0 }, { row: 1, col: 0 })).toBe(true)
    expect(areAdjacent({ row: 0, col: 0 }, { row: 1, col: 1 })).toBe(false)
  })
})

describe('Match', () => {
  it('should calculate score correctly', () => {
    expect(calculateScore([{ positions: [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }], type: 'red', length: 3 }])).toBe(30)
    expect(calculateScore([{ positions: [], type: 'blue', length: 4 }])).toBe(60)
    expect(calculateScore([{ positions: [], type: 'green', length: 5 }])).toBe(90)
  })
})