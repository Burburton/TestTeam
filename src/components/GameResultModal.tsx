import '../styles/GameResultModal.css'

interface GameResultModalProps {
  status: 'won' | 'lost' | 'playing'
  level: number
  score: number
  targetScore: number
  hasMoreLevels: boolean
  onNextLevel: () => void
  onRetry: () => void
  onMainMenu: () => void
}

export function GameResultModal({
  status,
  level,
  score,
  targetScore,
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
      <div className={`modal-container ${isWon ? 'modal-won' : 'modal-lost'}`}>
        <div className="modal-header">
          <span className="modal-icon">{isWon ? '🎉' : '😢'}</span>
          <h2 className="modal-title">{isWon ? '恭喜过关！' : '游戏结束'}</h2>
        </div>
        
        <div className="modal-content">
          <div className="modal-info">
            <span className="info-label">关卡</span>
            <span className="info-value">{level}</span>
          </div>
          <div className="modal-info">
            <span className="info-label">得分</span>
            <span className="info-value">{score}</span>
          </div>
          <div className="modal-info">
            <span className="info-label">目标</span>
            <span className="info-value">{targetScore}</span>
          </div>
        </div>

        <div className="modal-actions">
          {isWon && hasMoreLevels && (
            <button className="btn-modal btn-primary" onClick={onNextLevel}>
              下一关
            </button>
          )}
          <button className="btn-modal btn-secondary" onClick={onRetry}>
            {isWon ? '再玩一次' : '重试'}
          </button>
          <button className="btn-modal btn-tertiary" onClick={onMainMenu}>
            返回首页
          </button>
        </div>
      </div>
    </div>
  )
}