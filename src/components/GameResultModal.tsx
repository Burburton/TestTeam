import { GameStatus } from '../types'
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
  if (status === 'playing') {
    return null
  }

  const isWon = status === 'won'

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