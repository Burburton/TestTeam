interface GameInfoProps {
  score: number
  moves: number
  targetScore: number
  level: number
}

export function GameInfo({ score, moves, targetScore, level }: GameInfoProps) {
  const progress = Math.min((score / targetScore) * 100, 100)
  
  return (
    <div className="game-info">
      <div className="info-item">
        <span className="info-label">关卡</span>
        <span className="info-value">{level}</span>
      </div>
      
      <div className="info-item">
        <span className="info-label">分数</span>
        <span className="info-value">{score}</span>
      </div>
      
      <div className="info-item">
        <span className="info-label">目标</span>
        <span className="info-value">{targetScore}</span>
      </div>
      
      <div className="info-item">
        <span className="info-label">步数</span>
        <span className={`info-value ${moves <= 5 ? 'warning' : ''}`}>{moves}</span>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}