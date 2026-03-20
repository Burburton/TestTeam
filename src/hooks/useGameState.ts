import { useState, useCallback, useRef, useEffect } from 'react'
import type { MouseEvent } from 'react'
import { Gem, GameState, Position, GameStatus, Match, SpecialGemType, ScorePopup } from '../types'
import { createBoard, swapGems, areAdjacent } from '../game/board'
import { findMatches, markMatchedGems, calculateScore, removeMatchedGems, getMatchCenterPosition } from '../game/match'
import { applyGravity, clearFallingState, delay } from '../game/fall'
import { LevelManager } from '../utils/LevelManager'
import { getSpecialGemType, createSpecialGem, handleSpecialGemEffect, shouldCreateSpecialGem, getSpecialGemPositions } from '../utils/specialGems'
import { calculateStars } from '../utils/starRating'

const ANIMATION_DELAY = 300
const POPUP_DURATION = 1000

export function useGameState(initialLevel?: number) {
  const levelManagerRef = useRef<LevelManager | null>(null)
  const popupIdRef = useRef(0)
  
  const getInitialLevel = useCallback((): number => {
    if (initialLevel !== undefined) {
      return initialLevel
    }
    if (levelManagerRef.current) {
      return levelManagerRef.current.getProgress().currentLevel
    }
    return 1
  }, [initialLevel])
  
  const initializeGameState = useCallback((level: number): GameState => {
    const config = levelManagerRef.current!.getLevelConfig(level)
    return {
      board: createBoard(config),
      score: 0,
      moves: config.movesLimit,
      level: level,
      targetScore: config.targetScore,
      isAnimating: false,
      selectedGem: null,
      status: 'playing' as GameStatus,
      hoveredSpecialGem: null,
      blastPreviewPositions: [],
      combo: 0,
      lastScoreGain: 0,
      scorePopups: []
    }
  }, [])
  
  const [gameState, setGameState] = useState<GameState>(() => {
    levelManagerRef.current = new LevelManager()
    const level = getInitialLevel()
    return initializeGameState(level)
  })
  
  const processingRef = useRef(false)
  
  useEffect(() => {
    if (!levelManagerRef.current) {
      levelManagerRef.current = new LevelManager(initialLevel)
    }
  }, [initialLevel])
  
  const addScorePopups = useCallback((matches: Match[], score: number) => {
    if (score <= 0 || matches.length === 0) return
    
    const newPopups: ScorePopup[] = matches.map(match => {
      const centerPos = getMatchCenterPosition(match)
      return {
        id: `popup-${popupIdRef.current++}`,
        score: Math.round(score / matches.length),
        row: centerPos.row,
        col: centerPos.col
      }
    })
    
    setGameState(prev => ({
      ...prev,
      scorePopups: [...prev.scorePopups, ...newPopups]
    }))
    
    setTimeout(() => {
      const popupIds = newPopups.map(p => p.id)
      setGameState(prev => ({
        ...prev,
        scorePopups: prev.scorePopups.filter(p => !popupIds.includes(p.id))
      }))
    }, POPUP_DURATION)
  }, [])
  
  const createSpecialGemAtPosition = useCallback((board: Gem[][], match: Match, specialType: SpecialGemType): Gem[][] => {
    const newBoard = board.map(row => row.map(gem => ({ ...gem })))
    const centerPos = getMatchCenterPosition(match)
    const gem = newBoard[centerPos.row][centerPos.col]
    
    if (gem && !gem.isMatched) {
      newBoard[centerPos.row][centerPos.col] = createSpecialGem(
        { ...gem, isMatched: false },
        specialType
      )
    }
    
    match.positions.forEach(pos => {
      if (pos.row !== centerPos.row || pos.col !== centerPos.col) {
        if (newBoard[pos.row][pos.col]) {
          newBoard[pos.row][pos.col].isMatched = true
        }
      }
    })
    
    return newBoard
  }, [])
  
  const processMatches = useCallback(async (board: Gem[][], currentCombo: number = 0): Promise<{ newBoard: Gem[][], additionalScore: number, combo: number }> => {
    let currentBoard = board
    let totalScore = 0
    let combo = currentCombo
    
    let matches = findMatches(currentBoard)
    
    while (matches.length > 0) {
      combo++
      for (const match of matches) {
        const specialType = getSpecialGemType(match)
        
        if (specialType && shouldCreateSpecialGem(match.length)) {
          const centerPos = getMatchCenterPosition(match)
          const existingGem = currentBoard[centerPos.row][centerPos.col]
          
          if (existingGem?.special) {
            const result = handleSpecialGemEffect(existingGem.special, currentBoard, centerPos)
            currentBoard = result.board
            totalScore += result.scoreBonus
          } else {
            currentBoard = createSpecialGemAtPosition(currentBoard, match, specialType)
            totalScore += 50
          }
        }
      }
      
      const specialGemsToProcess: { position: Position, specialType: SpecialGemType }[] = []
      for (const match of matches) {
        for (const pos of match.positions) {
          const gem = currentBoard[pos.row][pos.col]
          if (gem?.special && !gem.isMatched) {
            specialGemsToProcess.push({
              position: pos,
              specialType: gem.special
            })
          }
        }
      }
      
      for (const { position, specialType } of specialGemsToProcess) {
        const result = handleSpecialGemEffect(specialType, currentBoard, position)
        currentBoard = result.board
        totalScore += result.scoreBonus
      }
      
      currentBoard = markMatchedGems(currentBoard, matches)
      setGameState(prev => ({ ...prev, board: currentBoard, isAnimating: true }))
      
      await delay(ANIMATION_DELAY)
      
      const roundScore = calculateScore(matches)
      addScorePopups(matches, roundScore)
      
      const { newBoard: tempBoard } = removeMatchedGems(currentBoard)
      currentBoard = [...tempBoard]
      
      currentBoard = applyGravity(currentBoard)
      setGameState(prev => ({ ...prev, board: currentBoard }))
      
      await delay(ANIMATION_DELAY)
      
      currentBoard = clearFallingState(currentBoard)
      totalScore += roundScore
      
      matches = findMatches(currentBoard)
    }
    
    return { newBoard: currentBoard, additionalScore: totalScore, combo }
  }, [createSpecialGemAtPosition, addScorePopups])
  
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
    
    const swappedGem = newBoard[position.row][position.col]
    if (swappedGem?.special) {
      const specialResult = handleSpecialGemEffect(swappedGem.special, newBoard, position)
      let processedBoard = specialResult.board
      const specialScore = specialResult.scoreBonus
      
      if (specialScore > 0) {
        const popup: ScorePopup = {
          id: `popup-${popupIdRef.current++}`,
          score: specialScore,
          row: position.row,
          col: position.col
        }
        setGameState(prev => ({
          ...prev,
          board: processedBoard,
          isAnimating: true,
          scorePopups: [...prev.scorePopups, ...[popup]]
        }))
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            scorePopups: prev.scorePopups.filter(p => p.id !== popup.id)
          }))
        }, POPUP_DURATION)
      } else {
        setGameState(prev => ({ ...prev, board: processedBoard, isAnimating: true }))
      }
      
      processedBoard = markMatchedGems(processedBoard, [{ positions: [position], type: swappedGem.type, length: 1 }])
      
      await delay(ANIMATION_DELAY)
      
      const { newBoard: tempBoard } = removeMatchedGems(processedBoard)
      processedBoard = tempBoard
      
      processedBoard = applyGravity(processedBoard)
      setGameState(prev => ({ ...prev, board: processedBoard }))
      
      await delay(ANIMATION_DELAY)
      
      processedBoard = clearFallingState(processedBoard)
      
      const { newBoard: finalBoard, additionalScore, combo: newCombo } = await processMatches(processedBoard, 1)
      const newScore = gameState.score + specialScore + additionalScore
      
      setGameState(prev => ({
        ...prev,
        board: finalBoard,
        score: newScore,
        isAnimating: false,
        selectedGem: null,
        moves: prev.moves - 1,
        combo: newCombo,
        lastScoreGain: specialScore + additionalScore
      }))
      
      if (newScore >= gameState.targetScore) {
        const stars = calculateStars(newScore, gameState.targetScore)
        levelManagerRef.current?.updateProgress(newScore, stars)
        levelManagerRef.current?.unlockNextLevel()
        setGameState(prev => ({ ...prev, status: 'won' }))
      } else if (gameState.moves - 1 <= 0) {
        setGameState(prev => ({ ...prev, status: 'lost' }))
      }
      
      processingRef.current = false
      return
    }
    
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
    
    const { newBoard: processedBoard, additionalScore, combo: newCombo } = await processMatches(newBoard, 1)
    
    const newScore = gameState.score + additionalScore
    
    setGameState(prev => ({
      ...prev,
      board: processedBoard,
      score: newScore,
      isAnimating: false,
      combo: newCombo,
      lastScoreGain: additionalScore
    }))
    
    if (newScore >= gameState.targetScore) {
      const stars = calculateStars(newScore, gameState.targetScore)
      levelManagerRef.current?.updateProgress(newScore, stars)
      levelManagerRef.current?.unlockNextLevel()
      setGameState(prev => ({ ...prev, status: 'won' }))
    } else if (gameState.moves - 1 <= 0) {
      setGameState(prev => ({ ...prev, status: 'lost' }))
    }
    
    processingRef.current = false
  }, [gameState, processMatches])

  const resetGame = useCallback((_?: MouseEvent<HTMLButtonElement>) => {
    const progress = levelManagerRef.current?.getProgress()
    const startLevel = progress?.highestLevel || 1
    levelManagerRef.current?.setCurrentLevel(startLevel)
    levelManagerRef.current?.goToLevel(startLevel)
    
    processingRef.current = false
    setGameState(initializeGameState(startLevel))
  }, [initializeGameState])
  
  const goToNextLevel = useCallback(() => {
    const currentLevel = gameState.level
    const nextLevel = currentLevel + 1
    
    levelManagerRef.current?.setCurrentLevel(nextLevel)
    levelManagerRef.current?.goToLevel(nextLevel)
    
    const nextLevelConfig = levelManagerRef.current?.getLevelConfig(nextLevel)
    if (nextLevelConfig) {
      processingRef.current = false
      setGameState({
        board: createBoard(nextLevelConfig),
        score: 0,
        moves: nextLevelConfig.movesLimit,
        level: nextLevel,
        targetScore: nextLevelConfig.targetScore,
        isAnimating: false,
        selectedGem: null,
        status: 'playing',
        hoveredSpecialGem: null,
        blastPreviewPositions: [],
        combo: 0,
        lastScoreGain: 0,
        scorePopups: []
      })
    }
  }, [gameState.level])
  
  const retryLevel = useCallback(() => {
    const currentLevel = gameState.level
    const currentLevelConfig = levelManagerRef.current?.getLevelConfig(currentLevel)
    if (currentLevelConfig) {
      processingRef.current = false
      setGameState({
        board: createBoard(currentLevelConfig),
        score: 0,
        moves: currentLevelConfig.movesLimit,
        level: currentLevel,
        targetScore: currentLevelConfig.targetScore,
        isAnimating: false,
        selectedGem: null,
        status: 'playing',
        hoveredSpecialGem: null,
        blastPreviewPositions: [],
        combo: 0,
        lastScoreGain: 0,
        scorePopups: []
      })
    }
  }, [gameState.level])
  
  const handleGemHover = useCallback((position: Position | null) => {
    if (!position) {
      setGameState(prev => ({
        ...prev,
        hoveredSpecialGem: null,
        blastPreviewPositions: []
      }))
      return
    }
    
    const gem = gameState.board[position.row]?.[position.col]
    if (!gem?.special) {
      setGameState(prev => ({
        ...prev,
        hoveredSpecialGem: null,
        blastPreviewPositions: []
      }))
      return
    }
    
    const blastPositions = getSpecialGemPositions(gem.special, gameState.board, position)
    setGameState(prev => ({
      ...prev,
      hoveredSpecialGem: position,
      blastPreviewPositions: blastPositions
    }))
  }, [gameState.board])
  
  const getProgress = useCallback(() => {
    return levelManagerRef.current?.getProgress() || {
      currentLevel: 1,
      highestLevel: 1,
      levelScores: {},
      levelStars: {},
      totalGamesPlayed: 0
    }
  }, [])
  
  const getLevelName = useCallback((level: number): string => {
    return levelManagerRef.current?.getLevelConfig(level)?.name || `Level ${level}`
  }, [])
  
  return {
    gameState,
    handleGemClick,
    handleGemHover,
    resetGame,
    goToNextLevel,
    retryLevel,
    isProcessing: processingRef.current,
    hasMoreLevels: true,
    getProgress,
    getLevelName
  }
}