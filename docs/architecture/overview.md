# Architecture Overview

## System Design

This project implements an AI-powered autonomous development team using a layered architecture.

### Layer 1: Task Management (GitHub)

GitHub serves as the project control plane:
- **Issues**: Work requests and bug reports
- **Pull Requests**: Deliverables
- **Actions**: Automation runtime
- **Projects**: Task state tracking

### Layer 2: AI Execution (OpenCode)

OpenCode provides the AI capabilities:
- Repository understanding
- Architecture analysis
- Code implementation
- Bug fixing
- Test generation
- Code review

### Layer 3: Automation (GitHub Actions)

GitHub Actions provides:
- Event-triggered execution
- Isolated environment
- CI/CD integration
- Automated workflows

### Layer 4: Knowledge (Repository)

Knowledge is stored in the repository:
- `.opencode/agents/`: AI role definitions
- `.opencode/skills/`: Reusable skills
- `.opencode/commands/`: Workflow commands
- `AGENTS.md`: Global rules

## AI Team Structure

```
┌─────────────────────────────────────────────┐
│                  Issue                       │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│              Architect Agent                 │
│  - Analyze requirements                      │
│  - Design solution                          │
│  - Create implementation plan               │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│             Developer Agent                  │
│  - Implement features                       │
│  - Fix bugs                                │
│  - Create PR                               │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│               QA Agent                       │
│  - Validate implementation                  │
│  - Test coverage                           │
│  - Quality report                          │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│             Reviewer Agent                   │
│  - Code review                             │
│  - Quality gate                            │
│  - Merge decision                          │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│           Human Approval                     │
│  - Final review                            │
│  - Merge decision                          │
└─────────────────────────────────────────────┘
```

## Workflow

### Feature Development

1. Human creates Feature Issue
2. Architect analyzes requirements
3. Developer implements changes
4. CI pipeline runs tests
5. QA verifies behavior
6. Reviewer evaluates code
7. Human approves merge

### Bug Fix

1. Bug Issue created
2. Architect identifies root cause
3. Developer applies minimal fix
4. CI runs regression tests
5. QA validates resolution
6. Reviewer checks safety
7. Human merges PR

## Directory Structure

```
amazingteam/
├── .github/
│   ├── workflows/           # GitHub Actions
│   ├── ISSUE_TEMPLATE/      # Issue templates
│   └── pull_request_template.md
├── .opencode/
│   ├── agents/              # AI role definitions
│   ├── skills/              # Reusable skills
│   ├── commands/            # Workflow commands
│   └── opencode.jsonc       # Configuration
├── docs/
│   ├── PRD/                 # Product requirements
│   ├── architecture/        # Architecture docs
│   ├── decisions/           # ADR records
│   └── runbooks/            # Operational guides
├── src/                     # Source code
├── infra/                   # Infrastructure
└── AGENTS.md               # Global rules
```

## Technologies

- **Runtime**: Node.js
- **Language**: TypeScript
- **CI/CD**: GitHub Actions
- **AI**: OpenCode