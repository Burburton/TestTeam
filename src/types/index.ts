export interface Gem {
  id: string
  type: GemType
  row: number
  col: number
  isMatched: boolean
  isFalling: boolean
  special?: SpecialGemType
  power?: number // For special effect strength
}

export type GemType = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'pink'
export type SpecialGemType = 'bomb' | 'lightning' | 'hypercube' | 'rowBlaster' | 'columnBlaster' | 'diagonal'

export interface Position {
  row: number
  col: number
}

export interface Match {
  positions: Position[]
  type: GemType
  length: number
  direction?: 'horizontal' | 'vertical'
  shape?: 'line' | 'L' | 'T'
}

export type GameStatus = 'playing' | 'won' | 'lost'

export interface GameState {
  board: Gem[][]
  score: number
  moves: number
  level: number
  targetScore: number
  isAnimating: boolean
  selectedGem: Position | null
  status: GameStatus
  hoveredSpecialGem: Position | null
  blastPreviewPositions: Position[]
}

export interface GameConfig {
  rows: number
  cols: number
  gemTypes: GemType[]
  targetScore: number
  movesLimit: number
}

export interface AnimationConfig {
  swapDuration: number
  fallDuration: number
  matchDuration: number
}

export const DEFAULT_CONFIG: GameConfig = {
  rows: 8,
  cols: 8,
  gemTypes: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'],
  targetScore: 1000,
  movesLimit: 30
}

export const ANIMATION_CONFIG: AnimationConfig = {
  swapDuration: 200,
  fallDuration: 150,
  matchDuration: 300
}

export const GEM_COLORS: Record<GemType, string> = {
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#22c55e',
  yellow: '#eab308',
  purple: '#a855f7',
  orange: '#f97316',
  pink: '#ec4899'
}

export const GEM_EMOJIS: Record<GemType, string> = {
  red: '🔴',
  blue: '🔵',
  green: '🟢',
  yellow: '🟡',
  purple: '🟣',
  orange: '🟠',
  pink: '🌸'
}

export const SPECIAL_GEM_EMOJIS: Record<SpecialGemType, string> = {
  bomb: '💣',
  lightning: '⚡',
  hypercube: '🔥',
  rowBlaster: '➡️',
  columnBlaster: '⬇️',
  diagonal: '✖️'
}