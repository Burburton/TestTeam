import { GameConfig } from '../types'

export interface LevelConfig extends GameConfig {
  level: number
  name: string
  description: string
  targetScoreMultiplier: number // Multiplier for calculating required score 
}

export const LEVELS: LevelConfig[] = [
  {
    level: 1,
    name: "Beginner",
    description: "Get familiar with the basics",
    rows: 8,
    cols: 8,
    gemTypes: ['red', 'blue', 'green', 'yellow'],
    targetScore: 800,
    movesLimit: 25,
    targetScoreMultiplier: 1
  },
  {
    level: 2,
    name: "Easy",
    description: "A little more challenging",
    rows: 8,
    cols: 8,
    gemTypes: ['red', 'blue', 'green', 'yellow', 'purple'], 
    targetScore: 1200,
    movesLimit: 22,
    targetScoreMultiplier: 1.5
  },
  {
    level: 3,
    name: "Medium",
    description: "Increasing complexity",
    rows: 8,
    cols: 8,
    gemTypes: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'],
    targetScore: 1800,
    movesLimit: 20,
    targetScoreMultiplier: 2
  },
  {
    level: 4,
    name: "Hard",
    description: "Advanced play required",
    rows: 9,
    cols: 9,
    gemTypes: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'],
    targetScore: 2500,
    movesLimit: 18,
    targetScoreMultiplier: 2.5
  },
  {
    level: 5,
    name: "Expert",
    description: "Maximum challenge",
    rows: 10,
    cols: 10,
    gemTypes: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'],
    targetScore: 3500,
    movesLimit: 16,
    targetScoreMultiplier: 3
  }
]

export class LevelManager {
  private currentLevelIndex: number = 0
  
  constructor(startingLevel: number = 1) {
    this.currentLevelIndex = Math.max(0, Math.min(startingLevel - 1, LEVELS.length - 1))
  }
  
  getCurrentLevel(): LevelConfig {
    return LEVELS[this.currentLevelIndex]
  }
  
  getNextLevel(): LevelConfig | null {
    if (this.currentLevelIndex < LEVELS.length - 1) {
      return LEVELS[this.currentLevelIndex + 1]
    }
    return null
  }
  
  getPreviousLevel(): LevelConfig | null {
    if (this.currentLevelIndex > 0) {
      return LEVELS[this.currentLevelIndex - 1]
    }
    return null
  }
  
  goToNextLevel(): boolean {
    if (this.currentLevelIndex < LEVELS.length - 1) {
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
    if (levelNumber >= 1 && levelNumber <= LEVELS.length) {
      this.currentLevelIndex = levelNumber - 1
      return true
    }
    return false
  }
  
  getCurrentLevelNumber(): number {
    return this.currentLevelIndex + 1
  }
  
  isLastLevel(): boolean {
    return this.currentLevelIndex === LEVELS.length - 1
  }
  
  getLevelProgress(): number {
    return (this.getCurrentLevelNumber() / LEVELS.length) * 100
  }
}