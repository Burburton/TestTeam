# Level System Design Document

## Overview
This document outlines the implementation of a level system to enhance the match-3 puzzle game. The system will introduce structured progression through different levels, each with unique objectives and challenges. Players must achieve specific goals within each level to advance, making the gameplay progressively more engaging and complex. The design incorporates special game elements, scoring mechanisms, and level progression to enhance player satisfaction and replayability.

## Data Structures

```typescript
// Represents properties specific to each level type
interface LevelObjective {
  id: string;
  type: 'moves' | 'time' | 'score' | 'collect' | 'special';
  targetValue?: number; // For score/move limits, time limits, or quantity requirements
  itemIds?: string[]; // For collectible elements
}

// Properties defining a specific level configuration
interface LevelConfiguration {
  id: string;
  name: string;
  objective: LevelObjective;
  boardSize?: { rows: number; cols: number };
  initialBoardState?: GameElement[][];
  specialElements?: SpecialElementConfig[];
  elementLimit?: { [elementId: string]: number }; // Limited availability of special elements
}

interface PlayerProgress {
  currentLevel: number;
  stars: StarRating[];
  bestScores: number[];
  unlockedLevels: string[];
}

enum SpecialElementType {
  BOMB = 'bomb',
  LINE_BOMB = 'line_bomb',
  CHARMER = 'charmer',
  RAINBOW = 'rainbow',
  TIME_EXTENSION = 'time_extension'
}

interface SpecialElementConfig {
  id: string;
  type: SpecialElementType;
  activationCriteria: string; // How the element is formed
  effect: string; // What the element does
  powerMultiplier?: number;
}

interface ActiveEffect {
  id: string;
  remainingTurns: number;
  effectType: string;
  affectedCells?: { row: number; col: number }[];
}

interface GameState {
  levelId: string;
  movesRemaining: number;
  timer: number;
  activeEffects: ActiveEffect[];
  collectedItems?: { [itemId: string]: number };
  score: number;
}
```

## Key Components

1. **LevelProgressionScreen** - Displays unlockable levels, player progress, and star ratings.
2. **GameHeaderBar** - Extended version showing level-specific objectives, remaining moves/timer, and collected items.
3. **SpecialElementIndicator** - Visual indicator showing available special elements and their activation methods.
4. **LevelResultOverlay** - Screen shown upon completion displaying success/failure and star awards.
5. **ElementalEffects** - Updated grid-cell rendering to reflect temporary state modifications.
6. **LevelSelectButton** - Individual level tile showing difficulty, star rating, and lock status.

## Implementation Steps

1. Define level progression schema and sample configurations
2. Implement data store updates to track level progression
3. Create UI components for level selection screen
4. Extend game header to display level objectives
5. Modify main game loop to enforce level constraints
6. Implement special game element mechanics
7. Add win/lose condition checking for each level
8. Create result screen with star rating system
9. Integrate backend persistence for player progress
10. Add visual effects for special elements
11. Implement tutorial overlay for new players
12. Add accessibility features for complex interactions
13. Test level balance and adjust difficulty curves