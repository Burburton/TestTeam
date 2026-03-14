import { describe, it, expect } from 'vitest'
import { LevelManager } from './LevelManager'

describe('LevelManager', () => {
  it('should initialize at the correct level', () => {
    const manager = new LevelManager(1)
    expect(manager.getCurrentLevelNumber()).toBe(1)
    expect(manager.getCurrentLevel().level).toBe(1)
  })

  it('should progress through levels correctly', () => {
    const manager = new LevelManager(1)
    expect(manager.getCurrentLevelNumber()).toBe(1)

    manager.goToNextLevel()
    expect(manager.getCurrentLevelNumber()).toBe(2)

    manager.goToNextLevel()
    expect(manager.getCurrentLevelNumber()).toBe(3)
  })

  it('should prevent going past the last level', () => {
    const manager = new LevelManager(5) // Max level initially
    expect(manager.isLastLevel()).toBe(true)
    expect(manager.getNextLevel()).toBeNull()
  })

  it('should calculate progress correctly', () => {
    const manager = new LevelManager(3) // Middle level (3 out of 5)
    expect(manager.getLevelProgress()).toBeCloseTo(60, 0)
  }) 

  it('should go back to previous level', () => {
    const manager = new LevelManager(3)
    manager.goToPreviousLevel()
    expect(manager.getCurrentLevelNumber()).toBe(2)
  })
})