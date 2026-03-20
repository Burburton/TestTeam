import { useState, useEffect, useRef } from 'react'
import '../styles/GameInfo.css'

interface GameInfoProps {
  score: number
  moves: number
  targetScore: number
  level: number
  combo: number
}

function calculateStars(score: number, targetScore: number): number {
  if (score >= targetScore * 1.5) return 3
  if (score >= targetScore * 1.2) return 2
  if (score >= targetScore) return 1
  return 0
}

export function GameInfo({ score, moves, targetScore, level, combo }: GameInfoProps) {
  const [scoreAnimate, setScoreAnimate] = useState(false)
  const [comboAnimate, setComboAnimate] = useState(false)
  const [comboFadeOut, setComboFadeOut] = useState(false)
  const [displayCombo, setDisplayCombo] = useState(0)
  const [progressAnimate, setProgressAnimate] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const prevScoreRef = useRef(score)
  const prevComboRef = useRef(combo)
  const prevProgressRef = useRef(0)
  const progress = Math.min((score / targetScore) * 100, 100)
  const levelName = level <= 5 ? ['Beginner', 'Easy', 'Medium', 'Hard', 'Expert'][level - 1] : 'Max Level'
  const stars = calculateStars(score, targetScore)
  
  useEffect(() => {
    if (score !== prevScoreRef.current) {
      setScoreAnimate(true)
      prevScoreRef.current = score
      const timer = setTimeout(() => setScoreAnimate(false), 300)
      return () => clearTimeout(timer)
    }
  }, [score])

  useEffect(() => {
    const prevCombo = prevComboRef.current
    
    if (combo > 1 && combo !== prevCombo) {
      setComboFadeOut(false)
      setDisplayCombo(combo)
      setComboAnimate(true)
      prevComboRef.current = combo
      const timer = setTimeout(() => setComboAnimate(false), 500)
      return () => clearTimeout(timer)
    } else if (prevCombo > 1 && combo <= 1) {
      setComboAnimate(false)
      setComboFadeOut(true)
      prevComboRef.current = combo
      const timer = setTimeout(() => {
        setComboFadeOut(false)
        setDisplayCombo(0)
      }, 600)
      return () => clearTimeout(timer)
    } else if (combo <= 1 && prevCombo <= 1) {
      setDisplayCombo(0)
    }
  }, [combo])

  useEffect(() => {
    const prevProgress = prevProgressRef.current
    if (progress !== prevProgress) {
      setProgressAnimate(true)
      prevProgressRef.current = progress
      const timer = setTimeout(() => setProgressAnimate(false), 500)
      return () => clearTimeout(timer)
    }
  }, [progress])

  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      setIsComplete(true)
    } else if (progress < 100) {
      setIsComplete(false)
    }
  }, [progress, isComplete])

  const showComboIndicator = combo > 1 || comboFadeOut

  return (
    <div className="game-info">
      <div className="info-item">
        <span className="info-label">关卡</span>
        <span className="info-value">{level} ({levelName})</span>
      </div>
      
      <div className="info-item">
        <span className="info-label">分数</span>
        <span className={`info-value ${scoreAnimate ? 'score-pop' : ''}`}>{score}</span>
        {showComboIndicator && (
          <span className={`combo-indicator ${comboAnimate ? 'combo-pop' : ''} ${comboFadeOut ? 'combo-fade-out' : ''}`}>
            x{comboFadeOut ? displayCombo : combo}
          </span>
        )}
      </div>
      
      <div className="info-item">
        <span className="info-label">目标</span>
        <span className="info-value">{targetScore}</span>
      </div>
      
      <div className="info-item">
        <span className="info-label">步数</span>
        <span className={`info-value ${moves <= 5 ? 'warning' : ''} ${moves <= 3 ? 'urgent' : ''} ${moves <= 1 ? 'critical' : ''}`}>{moves}</span>
      </div>
      
      <div className="progress-container">
        <div className="progress-text">
          进度: {Math.round(progress)}%
          <span className="star-rating">
            {[1, 2, 3].map(star => (
              <span key={star} className={`star ${star <= stars ? 'filled' : ''}`}>
                ★
              </span>
            ))}
          </span>
        </div>
        <div className={`progress-bar ${isComplete ? 'celebrating' : ''}`}>
          <div 
            className={`progress-fill ${progressAnimate ? 'progress-animate' : ''} ${isComplete ? 'complete' : ''}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}