import { Gem, Position } from '../types'
import { GemComponent } from './Gem'
import '../styles/GameBoard.css'

interface GameBoardProps {
  board: Gem[][]
  selectedGem: Position | null
  onGemClick: (position: Position) => void
  onGemHover: (position: Position | null) => void
  isProcessing: boolean
  blastPreviewPositions: Position[]
}

export function GameBoard({ 
  board, 
  selectedGem, 
  onGemClick, 
  onGemHover, 
  isProcessing,
  blastPreviewPositions 
}: GameBoardProps) {
  const isBlastPreview = (row: number, col: number) => {
    return blastPreviewPositions.some(pos => pos.row === row && pos.col === col)
  }
  
  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((gem, colIndex) => (
            <GemComponent
              key={gem.id}
              gem={gem}
              isSelected={selectedGem?.row === rowIndex && selectedGem?.col === colIndex}
              isBlastPreview={isBlastPreview(rowIndex, colIndex)}
              onClick={onGemClick}
              onHover={onGemHover}
              disabled={isProcessing}
            />
          ))}
        </div>
      ))}
    </div>
  )
}