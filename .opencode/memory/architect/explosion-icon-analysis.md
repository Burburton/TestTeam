# Explosion Effect Icons - Architectural Analysis

**Issue**: [FEAT] 爆炸特效图标 (Explosion Effect Icons)  
**Date**: 2026-03-15  
**Status**: Analysis Complete

---

## 1. Executive Summary

This analysis covers the architectural considerations for adding visual explosion effect icons to indicate which blocks have explosion functionality and their blast range in the match-3 puzzle game.

**Current State**: Special gems with explosion capabilities exist but only show an emoji icon. There is no visual indicator of the blast radius/range.

**Proposed Solution**: Add visual indicators showing the affected area when a special gem is selected or hovered.

---

## 2. Current Architecture Findings

### 2.1 Special Gem Types (src/types/index.ts:13)

The system supports 6 special gem types:

| Type | Emoji | Effect | Blast Range |
|------|-------|--------|-------------|
| `bomb` | 💣 | 3x3 area around position | 8 surrounding cells + center |
| `lightning` | ⚡ | Full column | All cells in same column |
| `hypercube` | 🔥 | Full row + column | Cross pattern |
| `rowBlaster` | ➡️ | Full row | All cells in same row |
| `columnBlaster` | ⬇️ | Full column | All cells in same column |
| `diagonal` | ✖️ | Both diagonals | X pattern |

### 2.2 Component Hierarchy

```
App.tsx
└── GameBoard.tsx
    └── GemComponent (per gem)
        └── gem-emoji (span)
```

### 2.3 Current Rendering Flow

1. `GemComponent` receives `Gem` object with `special?: SpecialGemType`
2. Displays emoji from `SPECIAL_GEM_EMOJIS` mapping
3. Applies CSS class based on `special-${type}` for glow effects
4. No blast range visualization exists

### 2.4 Existing Visual Effects (src/styles/Gem.css:26-52)

Current special gem visual treatment:
- `.gem.special` - Pulse glow animation
- `.special-bomb` - Red glow
- `.special-lightning` - Blue glow
- `.special-hypercube` - Gold glow
- `.special-rowBlaster` - Orange glow
- `.special-columnBlaster` - Green glow
- `.special-diagonal` - Magenta glow

### 2.5 Blast Range Calculation (src/utils/specialGems.ts:31-94)

The function `getSpecialGemPositions()` already calculates affected positions for each special type. This is the authoritative source for blast range logic.

---

## 3. Integration Points

### 3.1 Primary Integration Points

| File | Integration Purpose |
|------|---------------------|
| `src/components/Gem.tsx` | Add hover/selection blast preview |
| `src/components/GameBoard.tsx` | Pass blast preview state to gems |
| `src/hooks/useGameState.ts` | Track hovered/selected special gem |
| `src/types/index.ts` | Add new types for preview state |
| `src/styles/Gem.css` | Add blast range indicator styles |

### 3.2 Data Flow

```
User hovers/selects gem
    ↓
GameBoard detects special gem
    ↓
Call getSpecialGemPositions() 
    ↓
Pass affected positions to GameBoard state
    ↓
Render overlay indicators on affected gems
```

---

## 4. Implementation Recommendations

### 4.1 Proposed Architecture

#### Option A: Overlay-Based Approach (Recommended)

Add a visual overlay system that highlights affected cells when hovering over or selecting a special gem.

**Pros:**
- Non-intrusive to existing gem rendering
- Clear visual indication of blast range
- Can animate the preview
- Works with existing CSS effects

**Cons:**
- Requires additional state management
- Slight increase in render complexity

#### Option B: Icon-Based Approach

Add a secondary icon indicator to special gems showing their type/range.

**Pros:**
- Simpler implementation
- Always visible

**Cons:**
- Clutters gem appearance
- Harder to show actual affected area
- Less intuitive

### 4.2 Recommended Implementation: Option A

#### 4.2.1 New Types (src/types/index.ts)

```typescript
export interface BlastPreviewState {
  sourcePosition: Position | null
  affectedPositions: Position[]
  specialType: SpecialGemType | null
}
```

#### 4.2.2 State Changes (src/hooks/useGameState.ts)

Add:
- `blastPreview: BlastPreviewState` to GameState
- `handleGemHover(position: Position | null)` function
- Logic to compute affected positions using `getSpecialGemPositions()`

#### 4.2.3 Component Changes

**GameBoard.tsx:**
- Accept `blastPreview` prop
- Pass `isInBlastRange` prop to each GemComponent
- Handle hover events for special gems

**Gem.tsx:**
- Accept `isInBlastRange: boolean` prop
- Accept `isBlastSource: boolean` prop
- Add CSS classes for blast preview indicators

#### 4.2.4 CSS Additions (src/styles/Gem.css)

```css
.gem.in-blast-range {
  box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.5), 
              0 0 15px rgba(255, 0, 0, 0.3);
  animation: pulse-danger 0.5s ease-in-out infinite alternate;
}

.gem.blast-source {
  animation: pulse-source 0.3s ease-in-out infinite alternate;
}

@keyframes pulse-danger {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}
```

### 4.3 Implementation Breakdown

| Phase | Task | Files Affected |
|-------|------|----------------|
| 1 | Add BlastPreviewState type | types/index.ts |
| 2 | Add blast preview state to useGameState | hooks/useGameState.ts |
| 3 | Add hover handlers in GameBoard | components/GameBoard.tsx |
| 4 | Add blast range visual props to GemComponent | components/Gem.tsx |
| 5 | Add CSS styles for blast indicators | styles/Gem.css |
| 6 | Add unit tests | tests/ |

---

## 5. Risk Assessment

### 5.1 Low Risk

| Risk | Mitigation |
|------|------------|
| State complexity | Minimal - single new state object |
| Performance | Only computed on hover, not per frame |
| Breaking changes | Additive only, no existing API changes |

### 5.2 Medium Risk

| Risk | Mitigation |
|------|------------|
| Visual clutter | Use subtle, semi-transparent overlays |
| Animation conflicts | Use CSS class composition, not overrides |

### 5.3 Dependencies

- `getSpecialGemPositions()` function already exists and is well-tested
- No new external dependencies required
- No breaking changes to existing interfaces

---

## 6. Module Boundaries

### 6.1 Changes Within Scope

```
src/
├── types/
│   └── index.ts          # Add BlastPreviewState
├── hooks/
│   └── useGameState.ts   # Add blast preview state + handlers
├── components/
│   ├── GameBoard.tsx     # Add hover handling, pass blast state
│   └── Gem.tsx           # Add blast range visual props
└── styles/
    └── Gem.css           # Add blast indicator styles
```

### 6.2 No Changes Required

- `src/game/board.ts` - Board creation logic unchanged
- `src/game/match.ts` - Match detection unchanged
- `src/game/fall.ts` - Gravity logic unchanged
- `src/utils/specialGems.ts` - Already provides needed functions
- `src/utils/LevelManager.ts` - Level config unchanged

---

## 7. Testing Considerations

### 7.1 Unit Tests Required

1. `getSpecialGemPositions()` with edge cases (corners, center)
2. Blast preview state updates correctly on hover
3. Blast preview clears when mouse leaves
4. Multiple special gems don't conflict

### 7.2 Integration Tests Required

1. Hover over each special type shows correct affected positions
2. Preview disappears when gem is clicked (during animation)
3. Preview works correctly after board updates

### 7.3 Visual Regression Tests

1. Screenshot comparison for each special gem type preview
2. Animation states for blast indicators

---

## 8. Performance Considerations

### 8.1 Current Performance Profile

- Board size: 8x8 = 64 gems max
- Re-renders only on game state changes
- CSS animations are hardware-accelerated

### 8.2 Impact Analysis

| Concern | Impact | Notes |
|---------|--------|-------|
| Hover calculations | Negligible | `getSpecialGemPositions()` is O(board_size) |
| Additional state | Minimal | Single object with 3 fields |
| Render cycles | Low | Only on hover enter/leave |
| Memory | Negligible | Small array of positions |

### 8.3 Optimization Opportunities

- Debounce hover events if needed (unlikely at 8x8 board)
- Use CSS transforms instead of box-shadow for better GPU acceleration
- Consider `will-change: transform` for animated elements

---

## 9. Acceptance Criteria

1. **AC1**: Hovering over a special gem highlights all affected cells
2. **AC2**: Each special type shows its unique blast pattern
3. **AC3**: Preview is visually distinct but not distracting
4. **AC4**: Preview clears when mouse leaves the gem
5. **AC5**: Works for all 6 special gem types
6. **AC6**: No performance degradation
7. **AC7**: Accessible (screen reader announces blast range info)
8. **AC8**: Works on touch devices (show on tap/select)

---

## 10. Recommended Subtasks

| # | Subtask | Owner | Dependencies |
|---|---------|-------|--------------|
| 1 | Add BlastPreviewState type definition | Developer | None |
| 2 | Update useGameState with blast preview logic | Developer | #1 |
| 3 | Update GameBoard with hover handlers | Developer | #2 |
| 4 | Update GemComponent with blast range props | Developer | #3 |
| 5 | Add CSS styles for blast indicators | Developer | #4 |
| 6 | Write unit tests | QA | #5 |
| 7 | Add accessibility improvements | Developer | #5 |
| 8 | Code review | Reviewer | #7 |
| 9 | Integration testing | QA | #8 |

---

## 11. Conclusion

The explosion icon feature is a straightforward visual enhancement that fits cleanly into the existing architecture. The key integration points are:

1. **Data Layer**: `getSpecialGemPositions()` already exists and handles all blast calculations
2. **State Layer**: Add `BlastPreviewState` to track hovered gem and affected cells
3. **Component Layer**: Pass blast preview props through `GameBoard` → `GemComponent`
4. **Visual Layer**: CSS classes for affected cell highlighting

The implementation is low-risk with clear boundaries and no breaking changes. Estimated effort: 2-3 subtasks for core implementation, 1-2 for testing.