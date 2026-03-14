import { Gem, Position } from '../types'
import { GemComponent } from './Gem'
import '../styles/GameBoard.css'

interface GameBoardProps {
  board: Gem[][]
  selectedGem: Position | null
  onGemClick: (position: Position) => void
  isProcessing: boolean
}

export function GameBoard({ board, selectedGem, onGemClick, isProcessing }: GameBoardProps) {
  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((gem, colIndex) => (
            <GemComponent
              key={gem.id}
              gem={gem}
              isSelected={selectedGem?.row === rowIndex && selectedGem?.col === colIndex}
              onClick={onGemClick}
              disabled={isProcessing}
            />
          ))}
        </div>
      ))}
    </div>
  )
}