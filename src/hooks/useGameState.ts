import { useState, useCallback, useRef } from 'react'
import { Gem, GameState, Position } from '../types'
import { createBoard, swapGems, areAdjacent } from '../game/board'
import { findMatches, markMatchedGems, calculateScore, removeMatchedGems } from '../game/match'
import { applyGravity, clearFallingState, delay } from '../game/fall'
import { LevelManager } from '../utils/LevelManager'
import { getSpecialGemType } from '../utils/specialGems'

const ANIMATION_DELAY = 300

export function useGameState(initialLevel: number = 1) {
  const levelManagerRef = useRef<LevelManager>(new LevelManager(initialLevel))
  const currentLevelConfig = levelManagerRef.current.getCurrentLevel()
  
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: createBoard(currentLevelConfig),
    score: 0,
    moves: currentLevelConfig.movesLimit,
    level: initialLevel,
    targetScore: currentLevelConfig.targetScore,
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
      
      const { newBoard: tempBoard } = removeMatchedGems(currentBoard)
      currentBoard = [...tempBoard]
      
      // Check for special gem creation based on match characteristics
      for (const match of matches) {
        if (match.length >= 4) {  // Create special gem for 4+ length matches
          const specialGemType = getSpecialGemType(match.length, match.type)
          if (specialGemType) {
            totalScore += 50  // Bonus for triggering special effect
          }
        }
      }
      
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
    
    const newScore = gameState.score + additionalScore
    
    setGameState(prev => ({
      ...prev,
      board: processedBoard,
      score: newScore,
      isAnimating: false
    }))
    
    // Check for level completion after score update
    if (newScore >= gameState.targetScore && gameState.moves > 1) { // moves > 1 because 1 was subtracted above
      // Player completed the level
      setTimeout(() => {
        if (levelManagerRef.current.getNextLevel()) {
          levelManagerRef.current.goToNextLevel()
          const nextLevelConfig = levelManagerRef.current.getCurrentLevel()
          
          setGameState({
            board: createBoard(nextLevelConfig),
            score: 0, // Reset score for new level
            moves: nextLevelConfig.movesLimit,
            level: nextLevelConfig.level,
            targetScore: nextLevelConfig.targetScore,
            isAnimating: false,
            selectedGem: null
          })
        }
      }, ANIMATION_DELAY * 3)
    }
    
    processingRef.current = false
  }, [gameState, processMatches, levelManagerRef])

  const resetGame = useCallback((_?: React.MouseEvent<HTMLButtonElement>) => {
    const startLevel = 1;
    levelManagerRef.current.goToLevel(startLevel)
    const currentLevelConfig = levelManagerRef.current.getCurrentLevel()

    processingRef.current = false
    setGameState({
      board: createBoard(currentLevelConfig),
      score: 0,
      moves: currentLevelConfig.movesLimit,
      level: startLevel,
      targetScore: currentLevelConfig.targetScore,
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