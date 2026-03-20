import { useState, useEffect } from 'react'
import { GameStatus } from '../types'
import { calculateStars } from '../utils/starRating'
import '../styles/GameResultModal.css'

interface GameResultModalProps {
  status: GameStatus
  score: number
  targetScore: number
  level: number
  hasMoreLevels: boolean
  onNextLevel: () => void
  onRetry: () => void
  onMainMenu: () => void
}

export function GameResultModal({
  status,
  score,
  targetScore,
  level,
  hasMoreLevels,
  onNextLevel,
  onRetry,
  onMainMenu
}: GameResultModalProps) {
  const [visibleStars, setVisibleStars] = useState(0)
  const finalStars = calculateStars(score, targetScore)
  const isWon = status === 'won'

  useEffect(() => {
    if (isWon && finalStars > 0) {
      setVisibleStars(0)
      const timers: ReturnType<typeof setTimeout>[] = []
      for (let i = 1; i <= finalStars; i++) {
        const timer = setTimeout(() => {
          setVisibleStars(i)
        }, i * 300)
        timers.push(timer)
      }
      return () => {
        timers.forEach(timer => clearTimeout(timer))
      }
    } else {
      setVisibleStars(0)
    }
  }, [isWon, finalStars])

  if (status === 'playing') {
    return null
  }

  return (
    <div className="modal-overlay">
      <div className={`modal-container ${isWon ? 'won' : 'lost'}`}>
        <div className="modal-header">
          <span className="modal-icon">{isWon ? '🎉' : '😢'}</span>
          <h2 className="modal-title">{isWon ? '恭喜过关！' : '挑战失败'}</h2>
        </div>
        
        <div className="modal-body">
          <div className="result-stats">
            <div className="stat-item">
              <span className="stat-label">关卡</span>
              <span className="stat-value">{level}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">得分</span>
              <span className="stat-value">{score}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">目标</span>
              <span className="stat-value">{targetScore}</span>
            </div>
          </div>
          
          {isWon && (
            <div className="star-result-container">
              <div className="star-result">
                {[1, 2, 3].map(star => (
                  <span 
                    key={star} 
                    className={`result-star ${star <= visibleStars ? 'filled' : ''} ${star === visibleStars ? 'animate' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="star-label">
                {finalStars === 3 && '完美通关！'}
                {finalStars === 2 && '表现出色！'}
                {finalStars === 1 && '成功过关！'}
              </div>
            </div>
          )}
          
          {isWon && (
            <div className="result-message success">
              太棒了！你成功达成了目标分数！
            </div>
          )}
          
          {!isWon && (
            <div className="result-message failure">
              还差一点就达成了，再试一次吧！
            </div>
          )}
        </div>
        
        <div className="modal-actions">
          {isWon && hasMoreLevels && (
            <button 
              className="btn-action btn-next" 
              onClick={onNextLevel}
            >
              下一关
            </button>
          )}
          <button 
            className="btn-action btn-retry" 
            onClick={onRetry}
          >
            {isWon ? '再玩一次' : '重试'}
          </button>
          <button 
            className="btn-action btn-menu" 
            onClick={onMainMenu}
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  )
}