import { GameConfig } from '../types'

export interface LevelConfig extends GameConfig {
  level: number
  name: string
  description: string
  targetScoreMultiplier: number
}

export interface GameProgress {
  currentLevel: number
  highestLevel: number
  levelScores: Record<number, number>
  levelStars: Record<number, number>
  totalGamesPlayed: number
}

const STORAGE_KEY = 'match3_game_progress'

const BASE_LEVELS: LevelConfig[] = [
  {
    level: 1,
    name: "Beginner",
    description: "Get familiar with the basics",
    rows: 8,
    cols: 8,
    gemTypes: ['red', 'blue', 'green', 'yellow'],
    targetScore: 500,
    movesLimit: 30,
    targetScoreMultiplier: 1
  },
  {
    level: 2,
    name: "Easy",
    description: "A little more challenging",
    rows: 8,
    cols: 8,
    gemTypes: ['red', 'blue', 'green', 'yellow'],
    targetScore: 800,
    movesLimit: 28,
    targetScoreMultiplier: 1.2
  },
  {
    level: 3,
    name: "Medium",
    description: "Increasing complexity",
    rows: 8,
    cols: 8,
    gemTypes: ['red', 'blue', 'green', 'yellow', 'purple'],
    targetScore: 1200,
    movesLimit: 25,
    targetScoreMultiplier: 1.5
  },
  {
    level: 4,
    name: "Hard",
    description: "Advanced play required",
    rows: 8,
    cols: 8,
    gemTypes: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'],
    targetScore: 1600,
    movesLimit: 22,
    targetScoreMultiplier: 2
  },
  {
    level: 5,
    name: "Expert",
    description: "Maximum challenge",
    rows: 9,
    cols: 9,
    gemTypes: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'],
    targetScore: 2200,
    movesLimit: 20,
    targetScoreMultiplier: 2.5
  }
]

const GEM_TYPES = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'] as const

function generateInfiniteLevel(levelNumber: number): LevelConfig {
  const cycle = Math.floor((levelNumber - 1) / 10)
  const stage = ((levelNumber - 1) % 10) + 1
  
  const baseRows = 8
  const baseCols = 8
  const baseGemTypes = 4
  const baseTargetScore = 600
  const baseMoves = 28
  
  const gemTypeCount = Math.min(baseGemTypes + Math.floor(stage / 3) + cycle, 7)
  const gemTypes = GEM_TYPES.slice(0, gemTypeCount)
  
  const rows = Math.min(baseRows + Math.floor(stage / 5) + Math.floor(cycle / 2), 10)
  const cols = Math.min(baseCols + Math.floor(stage / 5) + Math.floor(cycle / 2), 10)
  
  const difficultyMultiplier = 1 + (stage * 0.08) + (cycle * 0.15)
  const targetScore = Math.round(baseTargetScore * difficultyMultiplier * (1 + gemTypeCount * 0.1))
  
  const movesReduction = Math.floor(stage / 2) + cycle
  const movesLimit = Math.max(baseMoves - movesReduction, 15)
  
  let name: string
  if (levelNumber <= 10) {
    name = `Level ${levelNumber}`
  } else {
    const tier = Math.floor((levelNumber - 1) / 10) + 1
    const tierNames = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Legend', 'Champion', 'Ultimate']
    name = `${tierNames[Math.min(tier - 1, tierNames.length - 1)]} ${stage}`
  }
  
  return {
    level: levelNumber,
    name,
    description: `Infinite level ${levelNumber}`,
    rows,
    cols,
    gemTypes: [...gemTypes],
    targetScore,
    movesLimit,
    targetScoreMultiplier: difficultyMultiplier
  }
}

export const LEVELS = BASE_LEVELS

export class LevelManager {
  private currentLevelIndex: number = 0
  private progress: GameProgress
  
  constructor(startingLevel: number = 1) {
    this.progress = this.loadProgress()
    this.currentLevelIndex = Math.max(0, Math.min(startingLevel - 1, this.progress.highestLevel - 1))
  }
  
  private loadProgress(): GameProgress {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as GameProgress
        return {
          currentLevel: parsed.currentLevel || 1,
          highestLevel: parsed.highestLevel || 1,
          levelScores: parsed.levelScores || {},
          levelStars: parsed.levelStars || {},
          totalGamesPlayed: parsed.totalGamesPlayed || 0
        }
      }
    } catch {
      // Ignore errors
    }
    return {
      currentLevel: 1,
      highestLevel: 1,
      levelScores: {},
      levelStars: {},
      totalGamesPlayed: 0
    }
  }
  
  saveProgress(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress))
    } catch {
      // Ignore errors
    }
  }
  
  getProgress(): GameProgress {
    return { ...this.progress }
  }
  
  updateProgress(score: number, stars: number): void {
    const level = this.getCurrentLevelNumber()
    
    if (!this.progress.levelScores[level] || score > this.progress.levelScores[level]) {
      this.progress.levelScores[level] = score
    }
    
    if (!this.progress.levelStars[level] || stars > this.progress.levelStars[level]) {
      this.progress.levelStars[level] = stars
    }
    
    this.progress.totalGamesPlayed++
    this.saveProgress()
  }
  
  unlockNextLevel(): void {
    const nextLevel = this.progress.highestLevel + 1
    this.progress.highestLevel = nextLevel
    this.progress.currentLevel = nextLevel
    this.saveProgress()
  }
  
  setCurrentLevel(level: number): void {
    this.progress.currentLevel = level
    this.saveProgress()
  }
  
  getLevelConfig(levelNumber: number): LevelConfig {
    if (levelNumber <= BASE_LEVELS.length) {
      return BASE_LEVELS[levelNumber - 1]
    }
    return generateInfiniteLevel(levelNumber)
  }
  
  getCurrentLevel(): LevelConfig {
    return this.getLevelConfig(this.currentLevelIndex + 1)
  }
  
  getNextLevel(): LevelConfig | null {
    return this.getLevelConfig(this.currentLevelIndex + 2)
  }
  
  getPreviousLevel(): LevelConfig | null {
    if (this.currentLevelIndex > 0) {
      return this.getLevelConfig(this.currentLevelIndex)
    }
    return null
  }
  
  goToNextLevel(): boolean {
    const nextLevel = this.currentLevelIndex + 2
    if (nextLevel <= this.progress.highestLevel) {
      this.currentLevelIndex++
      return true
    }
    return false
  }
  
  goToPreviousLevel(): boolean {
    if (this.currentLevelIndex > 0) {
      this.currentLevelIndex--
      return true
    }
    return false
  }
  
  goToLevel(levelNumber: number): boolean {
    if (levelNumber >= 1 && levelNumber <= this.progress.highestLevel) {
      this.currentLevelIndex = levelNumber - 1
      return true
    }
    return false
  }
  
  getCurrentLevelNumber(): number {
    return this.currentLevelIndex + 1
  }
  
  isLastLevel(): boolean {
    return false
  }
  
  getLevelProgress(): number {
    return ((this.currentLevelIndex + 1) / this.progress.highestLevel) * 100
  }
  
  getHighestLevel(): number {
    return this.progress.highestLevel
  }
  
  canPlayLevel(levelNumber: number): boolean {
    return levelNumber >= 1 && levelNumber <= this.progress.highestLevel
  }
  
  getLevelScore(levelNumber: number): number {
    return this.progress.levelScores[levelNumber] || 0
  }
  
  getLevelStars(levelNumber: number): number {
    return this.progress.levelStars[levelNumber] || 0
  }
  
  resetProgress(): void {
    this.progress = {
      currentLevel: 1,
      highestLevel: 1,
      levelScores: {},
      levelStars: {},
      totalGamesPlayed: 0
    }
    this.currentLevelIndex = 0
    this.saveProgress()
  }
}