export function calculateStars(score: number, targetScore: number): number {
  if (score >= targetScore * 1.5) return 3
  if (score >= targetScore * 1.2) return 2
  if (score >= targetScore) return 1
  return 0
}