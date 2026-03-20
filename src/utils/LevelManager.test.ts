import { describe, it, expect, beforeEach } from 'vitest'
import { LevelManager } from './LevelManager'

describe('LevelManager', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize at level 1 by default', () => {
    const manager = new LevelManager()
    expect(manager.getCurrentLevelNumber()).toBe(1)
    expect(manager.getCurrentLevel().level).toBe(1)
  })

  it('should progress through levels correctly', () => {
    const manager = new LevelManager()
    manager.unlockNextLevel()
    manager.goToNextLevel()
    expect(manager.getCurrentLevelNumber()).toBe(2)
    
    manager.unlockNextLevel()
    manager.goToNextLevel()
    expect(manager.getCurrentLevelNumber()).toBe(3)
  })

  it('should support infinite levels', () => {
    const manager = new LevelManager()
    
    for (let i = 0; i < 20; i++) {
      manager.unlockNextLevel()
    }
    
    expect(manager.getHighestLevel()).toBe(21)
    expect(manager.isLastLevel()).toBe(false)
  })

  it('should generate levels beyond base levels', () => {
    const manager = new LevelManager()
    
    const level10 = manager.getLevelConfig(10)
    expect(level10.level).toBe(10)
    expect(level10.name).toContain('Level 10')
    
    const level15 = manager.getLevelConfig(15)
    expect(level15.level).toBe(15)
    expect(level15.name).toContain('Silver')
  })

  it('should save and load progress', () => {
    const manager1 = new LevelManager()
    manager1.unlockNextLevel()
    manager1.unlockNextLevel()
    manager1.updateProgress(1500, 3)
    
    const progress = manager1.getProgress()
    expect(progress.highestLevel).toBe(3)
    expect(progress.levelScores[1]).toBe(1500)
    expect(progress.levelStars[1]).toBe(3)
    
    const manager2 = new LevelManager()
    expect(manager2.getHighestLevel()).toBe(3)
  })

  it('should track level scores and stars', () => {
    const manager = new LevelManager()
    manager.updateProgress(1000, 2)
    
    expect(manager.getLevelScore(1)).toBe(1000)
    expect(manager.getLevelStars(1)).toBe(2)
    
    manager.updateProgress(1200, 3)
    expect(manager.getLevelScore(1)).toBe(1200)
    expect(manager.getLevelStars(1)).toBe(3)
  })

  it('should prevent going to locked levels', () => {
    const manager = new LevelManager()
    expect(manager.canPlayLevel(1)).toBe(true)
    expect(manager.canPlayLevel(2)).toBe(false)
    
    manager.goToLevel(2)
    expect(manager.getCurrentLevelNumber()).toBe(1)
    
    manager.unlockNextLevel()
    expect(manager.canPlayLevel(2)).toBe(true)
  })

  it('should have reduced difficulty in base levels', () => {
    const manager = new LevelManager()
    const level1 = manager.getLevelConfig(1)
    const level2 = manager.getLevelConfig(2)
    
    expect(level1.targetScore).toBeLessThan(800)
    expect(level1.movesLimit).toBeGreaterThan(25)
    expect(level1.gemTypes.length).toBe(4)
    
    expect(level2.gemTypes.length).toBe(4)
  })

  it('should generate increasingly difficult infinite levels', () => {
    const manager = new LevelManager()
    
    const level6 = manager.getLevelConfig(6)
    const level15 = manager.getLevelConfig(15)
    
    expect(level15.targetScore).toBeGreaterThan(level6.targetScore)
    expect(level15.movesLimit).toBeLessThanOrEqual(level6.movesLimit)
  })
})