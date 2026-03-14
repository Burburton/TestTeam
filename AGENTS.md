# AGENTS.md - Global Rules for AI Agents

This file defines the global rules and guidelines that all AI agents must follow.

## Project Overview

**TestTeam**: 网页版消消乐游戏 - Match-3 Puzzle Game

- **Language**: typescript
- **Framework**: react

## Coding Standards

### General Principles

1. **Clean Code**
   - Write readable, self-documenting code
   - Use meaningful names
   - Keep functions small (max 30 lines)
   - Avoid deep nesting (max 3 levels)

2. **DRY (Don't Repeat Yourself)**
   - Extract common logic
   - Avoid duplication
   - Use composition over inheritance

3. **SOLID Principles**
   - Single Responsibility
   - Open/Closed
   - Liskov Substitution
   - Interface Segregation
   - Dependency Inversion

## Git Workflow

### Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feat/issue-123-desc` | `feat/issue-123-user-auth` |
| Bug Fix | `fix/issue-456-desc` | `fix/issue-456-login-bug` |
| Refactor | `refactor/desc` | `refactor/user-service` |

### Commit Messages

Follow Conventional Commits:
```
<type>(<scope>): <description>

Types: feat, fix, refactor, test, docs, chore
```

## Memory System

This project uses layered memory architecture:

```
┌─────────────────────────────────────┐
│        GLOBAL MEMORY (docs/)         │
│   Read-only, requires approval       │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│       ROLE MEMORY (.ai-team/memory/) │
│   Read/Write by owning role          │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│      FAILURES LIBRARY                │
│   Shared failure patterns            │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│       TASK MEMORY (tasks/)           │
│   Task-scoped, auto-created          │
└─────────────────────────────────────┘
```

## Agent Commands

| Command | Agent | Purpose |
|---------|-------|---------|
| `/triage` | Triage | Classify and investigate issue |
| `/design` | Architect | Analyze and design |
| `/implement` | Developer | Implement changes |
| `/test` | QA | Validate and test |
| `/review` | Reviewer | Code review |
| `/ci-analyze` | CI Analyst | Analyze CI failures |
| `/release-check` | Reviewer | Validate release readiness |

## Task States

```
backlog → ready → in_analysis → in_design → in_implementation → in_validation → in_review → release_candidate → done
```

## Safety Constraints

1. No destructive operations without confirmation
2. Minimal changes only
3. Human approval required for merges
4. All changes must be reversible

## Governance

### Protected Areas (require human approval)
- `docs/architecture/`
- `docs/decisions/`

### Human Approval Gates
- Architecture changes
- Merge to protected branches
- Release operations
