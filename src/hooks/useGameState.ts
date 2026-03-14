import { useState, useCallback, useRef } from 'react'
import { Gem, GameState, Position, DEFAULT_CONFIG } from '../types'
import { createBoard, swapGems, areAdjacent } from '../game/board'
import { findMatches, markMatchedGems, calculateScore, removeMatchedGems } from '../game/match'
import { applyGravity, clearFallingState, delay } from '../game/fall'

const ANIMATION_DELAY = 300

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: createBoard(DEFAULT_CONFIG),
    score: 0,
    moves: DEFAULT_CONFIG.movesLimit,
    level: 1,
    targetScore: DEFAULT_CONFIG.targetScore,
    isAnimating: false,
    selectedGem: null
  }))
  
  const processingRef = useRef(false)
  
  const processMatches = useCallback(async (board: Gem[][]): Promise<{ newBoard: Gem[][], additionalScore: number }> => {
    let currentBoard = board
    let totalScore = 0
    
    let matches = findMatches(currentBoard)
    
    while (matches.length > 0) {
      currentBoard = markMatchedGems(currentBoard, matches)
      setGameState(prev => ({ ...prev, board: currentBoard, isAnimating: true }))
      
      await delay(ANIMATION_DELAY)
      
      const { newBoard } = removeMatchedGems(currentBoard)
      currentBoard = newBoard
      
      currentBoard = applyGravity(currentBoard)
      setGameState(prev => ({ ...prev, board: currentBoard }))
      
      await delay(ANIMATION_DELAY)
      
      currentBoard = clearFallingState(currentBoard)
      totalScore += calculateScore(matches)
      
      matches = findMatches(currentBoard)
    }
    
    return { newBoard: currentBoard, additionalScore: totalScore }
  }, [])
  
  const handleGemClick = useCallback(async (position: Position) => {
    if (processingRef.current || gameState.isAnimating || gameState.moves <= 0) {
      return
    }
    
    if (!gameState.selectedGem) {
      setGameState(prev => ({ ...prev, selectedGem: position }))
      return
    }
    
    if (gameState.selectedGem.row === position.row && gameState.selectedGem.col === position.col) {
      setGameState(prev => ({ ...prev, selectedGem: null }))
      return
    }
    
    if (!areAdjacent(gameState.selectedGem, position)) {
      setGameState(prev => ({ ...prev, selectedGem: position }))
      return
    }
    
    processingRef.current = true
    
    const newBoard = swapGems(gameState.board, gameState.selectedGem, position)
    const matches = findMatches(newBoard)
    
    if (matches.length === 0) {
      const revertedBoard = swapGems(newBoard, position, gameState.selectedGem)
      setGameState(prev => ({ 
        ...prev, 
        board: revertedBoard, 
        selectedGem: null 
      }))
      processingRef.current = false
      return
    }
    
    setGameState(prev => ({ 
      ...prev, 
      board: newBoard, 
      selectedGem: null,
      moves: prev.moves - 1,
      isAnimating: true
    }))
    
    await delay(ANIMATION_DELAY)
    
    const { newBoard: processedBoard, additionalScore } = await processMatches(newBoard)
    
    setGameState(prev => ({
      ...prev,
      board: processedBoard,
      score: prev.score + additionalScore,
      isAnimating: false
    }))
    
    processingRef.current = false
  }, [gameState, processMatches])
  
  const resetGame = useCallback(() => {
    processingRef.current = false
    setGameState({
      board: createBoard(DEFAULT_CONFIG),
      score: 0,
      moves: DEFAULT_CONFIG.movesLimit,
      level: 1,
      targetScore: DEFAULT_CONFIG.targetScore,
      isAnimating: false,
      selectedGem: null
    })
  }, [])
  
  return {
    gameState,
    handleGemClick,
    resetGame,
    isProcessing: processingRef.current
  }
}