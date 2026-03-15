import { GameBoard } from './components/GameBoard'
import { GameInfo } from './components/GameInfo'
import { GameResultModal } from './components/GameResultModal'
import { useGameState } from './hooks/useGameState'
import './styles/App.css'

function App() {
  const {
    gameState,
    handleGemClick,
    resetGame,
    goToNextLevel,
    retryLevel,
    isProcessing,
    hasMoreLevels
  } = useGameState(1)

  return (
    <div className="app">
      <header className="app-header">
        <h1>消消乐</h1>
        <p>Match-3 Puzzle Game</p>
      </header>
      
      <main className="game-container">
        <GameInfo 
          score={gameState.score}
          moves={gameState.moves}
          targetScore={gameState.targetScore}
          level={gameState.level}
        />
        
        <GameBoard 
          board={gameState.board}
          selectedGem={gameState.selectedGem}
          onGemClick={handleGemClick}
          isProcessing={isProcessing}
        />
        
        <div className="game-controls">
          <button 
            onClick={resetGame}
            className="btn-reset"
            disabled={isProcessing}
          >
            重新开始
          </button>
        </div>
      </main>
      
      <GameResultModal
        status={gameState.status}
        score={gameState.score}
        targetScore={gameState.targetScore}
        level={gameState.level}
        hasMoreLevels={hasMoreLevels}
        onNextLevel={goToNextLevel}
        onRetry={retryLevel}
        onMainMenu={resetGame}
      />
      
      <footer className="app-footer">
        <p>AI Team Development - Powered by React + TypeScript</p>
      </footer>
    </div>
  )
}

export default App