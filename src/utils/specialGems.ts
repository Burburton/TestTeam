import { Gem, SpecialGemType, GemType, Position, Match } from '../types'

export function getSpecialGemType(match: Match): SpecialGemType | undefined {
  if (match.shape === 'L' || match.shape === 'T') {
    return 'diagonal'
  }
  
  if (match.length >= 5) {
    return 'hypercube'
  }
  
  if (match.length === 4) {
    if (match.direction === 'horizontal') {
      return 'rowBlaster'
    } else if (match.direction === 'vertical') {
      return 'columnBlaster'
    }
    return 'bomb'
  }
  
  return undefined
}

export function createSpecialGem(gem: Gem, specialType: SpecialGemType): Gem {
  return {
    ...gem,
    special: specialType
  }
}

export function getSpecialGemPositions(specialType: SpecialGemType, board: Gem[][], position: Position): Position[] {
  const affectedPositions: Position[] = []
  const rows = board.length
  const cols = board[0].length
  
  switch (specialType) {
    case 'bomb':
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const r = position.row + dr
          const c = position.col + dc
          if (r >= 0 && r < rows && c >= 0 && c < cols) {
            affectedPositions.push({ row: r, col: c })
          }
        }
      }
      break
      
    case 'lightning':
      for (let r = 0; r < rows; r++) {
        affectedPositions.push({ row: r, col: position.col })
      }
      break
      
    case 'hypercube':
      for (let c = 0; c < cols; c++) {
        affectedPositions.push({ row: position.row, col: c })
      }
      for (let r = 0; r < rows; r++) {
        affectedPositions.push({ row: r, col: position.col })
      }
      break
      
    case 'rowBlaster':
      for (let c = 0; c < cols; c++) {
        affectedPositions.push({ row: position.row, col: c })
      }
      break
      
    case 'columnBlaster':
      for (let r = 0; r < rows; r++) {
        affectedPositions.push({ row: r, col: position.col })
      }
      break
      
    case 'diagonal':
      for (let i = -Math.max(rows, cols); i <= Math.max(rows, cols); i++) {
        const r1 = position.row + i
        const c1 = position.col + i
        const r2 = position.row + i
        const c2 = position.col - i
        
        if (r1 >= 0 && r1 < rows && c1 >= 0 && c1 < cols) {
          affectedPositions.push({ row: r1, col: c1 })
        }
        if (r2 >= 0 && r2 < rows && c2 >= 0 && c2 < cols && (i !== 0 || affectedPositions.length === 0)) {
          affectedPositions.push({ row: r2, col: c2 })
        }
      }
      break
  }
  
  return [...new Map(affectedPositions.map(p => [`${p.row},${p.col}`, p])).values()]
}

export function handleSpecialGemEffect(
  specialType: SpecialGemType, 
  board: Gem[][], 
  position: Position
): { board: Gem[][], scoreBonus: number, affectedPositions: Position[] } {
  const newBoard = board.map(row => row.map(gem => ({ ...gem })))
  const affectedPositions = getSpecialGemPositions(specialType, board, position)
  
  let scoreBonus = 0
  const bonusScores: Record<SpecialGemType, number> = {
    bomb: 20,
    lightning: 15,
    hypercube: 25,
    rowBlaster: 18,
    columnBlaster: 18,
    diagonal: 22
  }
  
  affectedPositions.forEach(pos => {
    if (newBoard[pos.row][pos.col]) {
      newBoard[pos.row][pos.col].isMatched = true
      scoreBonus += bonusScores[specialType]
    }
  })
  
  return { board: newBoard, scoreBonus, affectedPositions }
}

export function calculateSpecialGemBonus(gem?: Gem): number {
  if (!gem?.special) {
    return 0
  }
  
  const specialBonuses: Record<SpecialGemType, number> = {
    bomb: 30,
    lightning: 40,
    hypercube: 50,
    rowBlaster: 35,
    columnBlaster: 35,
    diagonal: 45
  }
  
  return specialBonuses[gem.special]
}

export function findLTShapePatterns(board: Gem[][]): Match[] {
  const matches: Match[] = []
  const visited = new Set<string>()
  
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      const type = board[row][col].type
      
      const lShape = findLShape(board, row, col, type)
      if (lShape) {
        const key = lShape.positions.map(p => `${p.row},${p.col}`).sort().join('|')
        if (!visited.has(key)) {
          visited.add(key)
          matches.push(lShape)
        }
      }
      
      const tShape = findTShape(board, row, col, type)
      if (tShape) {
        const key = tShape.positions.map(p => `${p.row},${p.col}`).sort().join('|')
        if (!visited.has(key)) {
          visited.add(key)
          matches.push(tShape)
        }
      }
    }
  }
  
  return matches
}

function findLShape(board: Gem[][], startRow: number, startCol: number, type: GemType): Match | null {
  const rows = board.length
  const cols = board[0].length
  
  const checkL = (cornerR: number, cornerC: number, verticalDir: number, horizontalDir: number): Position[] | null => {
    const positions: Position[] = [{ row: cornerR, col: cornerC }]
    
    for (let i = 1; i <= 3; i++) {
      const r = cornerR + i * verticalDir
      if (r >= 0 && r < rows && board[r][cornerC].type === type) {
        positions.push({ row: r, col: cornerC })
      } else {
        break
      }
    }
    
    if (positions.length < 3) return null
    
    for (let i = 1; i <= 3; i++) {
      const c = cornerC + i * horizontalDir
      if (c >= 0 && c < cols && board[cornerR][c].type === type) {
        positions.push({ row: cornerR, col: c })
      } else {
        break
      }
    }
    
    const uniquePositions = [...new Map(positions.map(p => [`${p.row},${p.col}`, p])).values()]
    return uniquePositions.length >= 5 ? uniquePositions : null
  }
  
  const directions = [
    { v: 1, h: 1 },
    { v: 1, h: -1 },
    { v: -1, h: 1 },
    { v: -1, h: -1 }
  ]
  
  for (const { v, h } of directions) {
    const positions = checkL(startRow, startCol, v, h)
    if (positions) {
      return {
        positions,
        type,
        length: positions.length,
        shape: 'L'
      }
    }
  }
  
  return null
}

function findTShape(board: Gem[][], startRow: number, startCol: number, type: GemType): Match | null {
  const rows = board.length
  const cols = board[0].length
  
  const checkT = (
    baseR: number, 
    baseC: number, 
    stemDirR: number, 
    stemDirC: number,
    crossDir: 'row' | 'col'
  ): Position[] | null => {
    const positions: Position[] = [{ row: baseR, col: baseC }]
    
    for (let i = 1; i <= 3; i++) {
      const r = baseR + i * stemDirR
      const c = baseC + i * stemDirC
      if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c].type === type) {
        positions.push({ row: r, col: c })
      } else {
        break
      }
    }
    
    if (positions.length < 2) return null
    
    const crossR = positions[positions.length - 1].row
    const crossC = positions[positions.length - 1].col
    
    if (crossDir === 'row') {
      for (const dir of [-1, 1]) {
        for (let i = 1; i <= 2; i++) {
          const c = crossC + i * dir
          if (c >= 0 && c < cols && board[crossR][c].type === type) {
            positions.push({ row: crossR, col: c })
          } else {
            break
          }
        }
      }
    } else {
      for (const dir of [-1, 1]) {
        for (let i = 1; i <= 2; i++) {
          const r = crossR + i * dir
          if (r >= 0 && r < rows && board[r][crossC].type === type) {
            positions.push({ row: r, col: crossC })
          } else {
            break
          }
        }
      }
    }
    
    const uniquePositions = [...new Map(positions.map(p => [`${p.row},${p.col}`, p])).values()]
    return uniquePositions.length >= 5 ? uniquePositions : null
  }
  
  const stemDirections = [
    { r: 1, c: 0 },
    { r: -1, c: 0 },
    { r: 0, c: 1 },
    { r: 0, c: -1 }
  ]
  
  for (const stem of stemDirections) {
    const crossDir = stem.r !== 0 ? 'row' : 'col'
    const positions = checkT(startRow, startCol, stem.r, stem.c, crossDir)
    if (positions) {
      return {
        positions,
        type,
        length: positions.length,
        shape: 'T'
      }
    }
  }
  
  return null
}

export function findSpecialGemsOnBoard(board: Gem[][]): { position: Position, specialType: SpecialGemType }[] {
  const specialGems: { position: Position, specialType: SpecialGemType }[] = []
  
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      const gem = board[row][col]
      if (gem?.special) {
        specialGems.push({
          position: { row, col },
          specialType: gem.special
        })
      }
    }
  }
  
  return specialGems
}

export function shouldCreateSpecialGem(matchLength: number): boolean {
  return matchLength >= 4
}