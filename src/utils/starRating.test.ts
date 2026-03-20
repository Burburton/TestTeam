import { describe, it, expect } from 'vitest'
import { calculateStars } from './starRating'

describe('calculateStars', () => {
  it('should return 0 stars when score is below target', () => {
    expect(calculateStars(500, 1000)).toBe(0)
    expect(calculateStars(999, 1000)).toBe(0)
  })

  it('should return 1 star when score meets target', () => {
    expect(calculateStars(1000, 1000)).toBe(1)
    expect(calculateStars(1100, 1000)).toBe(1)
    expect(calculateStars(1199, 1000)).toBe(1)
  })

  it('should return 2 stars when score is 1.2x target', () => {
    expect(calculateStars(1200, 1000)).toBe(2)
    expect(calculateStars(1400, 1000)).toBe(2)
    expect(calculateStars(1499, 1000)).toBe(2)
  })

  it('should return 3 stars when score is 1.5x target', () => {
    expect(calculateStars(1500, 1000)).toBe(3)
    expect(calculateStars(2000, 1000)).toBe(3)
    expect(calculateStars(3000, 1000)).toBe(3)
  })

  it('should handle different target scores', () => {
    expect(calculateStars(2000, 2000)).toBe(1)
    expect(calculateStars(2400, 2000)).toBe(2)
    expect(calculateStars(3000, 2000)).toBe(3)
  })
})