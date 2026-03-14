
# Complete AI Team Repo Template for OpenCode + GitHub

This document defines a **complete AI team repository template** for building a semi-autonomous software development workflow with:

- **OpenCode** as the AI engineering execution engine
- **GitHub** as the task, review, and delivery system
- **GitHub Actions** as the automation runtime
- **Layered memory isolation** to keep AI roles stable and reduce cross-role contamination

The design goal is to make one repository behave like a **small AI engineering organization** with clear responsibilities, repeatable workflows, and controlled memory sharing.

---

# 1. High-Level Design

This system has five layers.

## Layer 1 — Project Management

GitHub handles:

- issues
- pull requests
- labels
- milestones
- project board states
- CI status
- review history

GitHub is the **source of truth for task status and delivery state**.

---

## Layer 2 — AI Execution

OpenCode handles:

- repository understanding
- architecture analysis
- implementation
- bug fixing
- test generation
- review suggestions

OpenCode is the **AI engineering execution layer**.

---

## Layer 3 — Workflow Automation

GitHub Actions handles:

- issue comment triggers
- PR comment triggers
- scheduled jobs
- isolated execution
- CI validation
- branch automation

GitHub Actions is the **runtime that connects GitHub and OpenCode**.

---

## Layer 4 — Rules and Knowledge

Repository-local files define:

- architecture guidance
- coding standards
- dependency rules
- testing rules
- AI roles
- reusable skills
- reusable commands

This layer keeps AI behavior consistent across tasks.

---

## Layer 5 — Memory System

The memory system is split into:

- global shared memory
- role-isolated memory
- task-scoped memory

This prevents role contamination while still preserving useful shared context.

---

# 2. Core Principles

## Principle 1 — GitHub manages workflow, OpenCode executes work

GitHub decides:

- what exists as work
- what is in progress
- what is under review
- what is merged

OpenCode decides:

- how to analyze
- how to implement
- how to validate
- how to review technically

---

## Principle 2 — Roles should be specialized

Do not let one agent do all tasks by default.

Recommended role split:

- Architect
- Developer
- QA
- Reviewer

Optional later roles:

- Product Manager
- Project Manager
- DevOps
- Release Manager

---

## Principle 3 — Memory should be layered, not fully shared

Do not use one giant shared memory pool.

Use:

- **global memory** for stable project truths
- **role memory** for role-specific reasoning
- **task memory** for temporary task context

---

## Principle 4 — Human approval remains required

AI can:

- analyze
- suggest
- implement
- validate
- review

Humans should still:

- approve architecture changes
- approve merges
- approve changes to global memory
- decide priority

---

# 3. Repository Layout

```text
repo/
├─ .github/
│  ├─ workflows/
│  │  ├─ opencode.yml
│  │  ├─ ci.yml
│  │  ├─ pr-check.yml
│  │  └─ nightly-ai-maintenance.yml
│  │
│  ├─ ISSUE_TEMPLATE/
│  │  ├─ feature_request.md
│  │  ├─ bug_report.md
│  │  └─ tech_task.md
│  │
│  └─ pull_request_template.md
│
├─ .opencode/
│  ├─ agents/
│  │  ├─ architect.md
│  │  ├─ developer.md
│  │  ├─ qa.md
│  │  └─ reviewer.md
│  │
│  ├─ skills/
│  │  ├─ repo-architecture-reader/
│  │  ├─ cpp-bugfix-playbook/
│  │  ├─ threading-race-investigator/
│  │  ├─ cmake-build-troubleshooter/
│  │  ├─ test-first-feature-dev/
│  │  ├─ safe-refactor-checklist/
│  │  ├─ performance-hotpath-review/
│  │  └─ code-review-checklist/
│  │
│  ├─ commands/
│  │  ├─ design.md
│  │  ├─ implement.md
│  │  ├─ test.md
│  │  ├─ review.md
│  │  └─ triage.md
│  │
│  ├─ memory/
│  │  ├─ architect/
│  │  │  ├─ architecture_notes.md
│  │  │  ├─ module_map.md
│  │  │  └─ design_rationale.md
│  │  │
│  │  ├─ developer/
│  │  │  ├─ implementation_notes.md
│  │  │  ├─ bug_investigation.md
│  │  │  └─ build_issues.md
│  │  │
│  │  ├─ qa/
│  │  │  ├─ test_strategy.md
│  │  │  ├─ regression_cases.md
│  │  │  └─ validation_notes.md
│  │  │
│  │  └─ reviewer/
│  │     ├─ review_notes.md
│  │     ├─ quality_rules.md
│  │     └─ recurring_risks.md
│  │
│  └─ opencode.jsonc
│
├─ docs/
│  ├─ PRD/
│  ├─ architecture/
│  ├─ decisions/
│  ├─ standards/
│  └─ runbooks/
│
├─ tasks/
│  ├─ issue-101/
│  │  ├─ analysis.md
│  │  ├─ design.md
│  │  ├─ implementation.md
│  │  ├─ validation.md
│  │  └─ review.md
│  │
│  └─ issue-102/
│     └─ ...
│
├─ AGENTS.md
└─ src/
```

---

# 4. Role Definitions

## Architect

Responsibilities:

- understand requirements
- analyze affected modules
- design implementation strategy
- identify technical risks
- propose boundaries and invariants

Expected outputs:

- architecture summary
- implementation plan
- risk analysis
- affected modules list

Rules:

- should not directly implement code by default
- should prioritize long-term maintainability
- should document architectural trade-offs

---

## Developer

Responsibilities:

- implement approved changes
- fix bugs with minimal scope
- add or update tests when needed
- preserve interfaces unless approved otherwise

Expected outputs:

- code changes
- commit summary
- test updates
- implementation notes

Rules:

- should not redesign architecture without explicit direction
- should avoid unrelated refactoring
- should keep changes small and reviewable

---

## QA

Responsibilities:

- design test cases
- verify bug fixes
- identify regression risks
- validate acceptance criteria

Expected outputs:

- validation report
- regression checklist
- additional tests where needed

Rules:

- should focus on observable behavior
- should verify failure paths as well as success paths
- should not modify production logic except test support when necessary

---

## Reviewer

Responsibilities:

- inspect pull requests
- identify correctness issues
- detect hidden risks
- assess maintainability
- flag performance or safety concerns

Expected outputs:

- review comments
- merge recommendation
- risk warnings

Rules:

- should focus on correctness first
- should distinguish blockers from improvements
- should record recurring quality risks in reviewer memory

---

# 5. Memory Architecture

The memory model uses **three layers**.

## 5.1 Global Memory

Global memory is shared read-mostly knowledge.

Recommended locations:

- `AGENTS.md`
- `docs/architecture/`
- `docs/decisions/`
- `docs/standards/`
- `docs/runbooks/`

Global memory should contain only stable project truths such as:

- system architecture
- approved technical decisions
- coding standards
- testing strategy
- security rules
- performance constraints

### Global Memory Rule

AI should **not automatically write persistent global memory** unless:

- a human explicitly requests it
- or a review gate approves it

This prevents drift and false project truths.

---

## 5.2 Role Memory

Each role gets isolated memory.

### Architect Memory

Store:

- module boundaries
- design trade-offs
- dependency decisions
- architecture notes

### Developer Memory

Store:

- implementation strategies
- bug investigation notes
- build/toolchain issues
- code-level observations

### QA Memory

Store:

- test strategy
- regression patterns
- validation environment notes
- repeated failure cases

### Reviewer Memory

Store:

- recurring code quality issues
- common hidden risks
- review heuristics
- maintainability concerns

---

## 5.3 Task Memory

Each task should have its own scoped working memory.

Recommended location:

- `tasks/issue-{id}/`

Task memory may contain:

- task analysis
- design notes
- implementation notes
- validation record
- review outcome

### Task Memory Rule

Task memory is allowed to be:

- created automatically
- updated during task execution
- archived after task completion

This keeps long-term memory clean.

---

# 6. Memory Permissions

Use the following read/write model.

## Architect Permissions

Read:

- `docs/`
- `AGENTS.md`
- `.opencode/memory/architect/`
- `tasks/*`

Write:

- `.opencode/memory/architect/`
- `tasks/{current_task}/analysis.md`
- `tasks/{current_task}/design.md`

Should not write:

- developer memory
- qa memory
- reviewer memory
- global memory without approval

---

## Developer Permissions

Read:

- `docs/`
- `AGENTS.md`
- `.opencode/memory/architect/`
- `.opencode/memory/developer/`
- `tasks/{current_task}/`

Write:

- `.opencode/memory/developer/`
- `tasks/{current_task}/implementation.md`

Should not write:

- architect memory
- qa memory
- reviewer memory
- global memory without approval

---

## QA Permissions

Read:

- `docs/`
- `AGENTS.md`
- `tasks/{current_task}/`
- `.opencode/memory/qa/`

Write:

- `.opencode/memory/qa/`
- `tasks/{current_task}/validation.md`

Should not write:

- architect memory
- developer memory
- reviewer memory
- global memory without approval

---

## Reviewer Permissions

Read:

- `docs/`
- `AGENTS.md`
- `tasks/{current_task}/`
- all role memories when needed for inspection

Write:

- `.opencode/memory/reviewer/`
- `tasks/{current_task}/review.md`

Should not write:

- global memory without approval
- modify implementation directly unless explicitly asked

---

# 7. GitHub Issue Types

## Feature Request

Purpose:

- new user-facing functionality
- major behavior changes
- new subsystem work

Required fields:

- background
- problem statement
- expected behavior
- acceptance criteria
- non-goals
- affected area if known

Suggested labels:

- `feature`
- `module:*`
- `priority:*`

---

## Bug Report

Purpose:

- defect tracking
- incorrect behavior
- crash, hang, corruption, regression

Required fields:

- reproduction steps
- observed behavior
- expected behavior
- logs or stack trace
- environment details

Suggested labels:

- `bug`
- `severity:*`
- `module:*`

---

## Tech Task

Purpose:

- refactoring
- dependency upgrade
- performance tuning
- test coverage improvement
- build system maintenance

Required fields:

- motivation
- scope
- constraints
- expected outcome

Suggested labels:

- `tech-debt`
- `refactor`
- `performance`
- `test`
- `infra`

---

# 8. Pull Request Rules

Every PR should include:

- what changed
- why it changed
- affected modules
- risk analysis
- validation steps
- test status
- rollback or recovery note if relevant

PRs should remain:

- minimal in scope
- easy to review
- traceable to a GitHub issue

---

# 9. Automated Workflow

## 9.1 Feature Workflow

1. Human creates a Feature Issue
2. Architect analyzes requirements and writes:
   - `tasks/issue-{id}/analysis.md`
   - `tasks/issue-{id}/design.md`
3. Developer implements on a new branch
4. CI runs build and tests
5. QA validates behavior and writes:
   - `tasks/issue-{id}/validation.md`
6. Reviewer inspects the PR and writes:
   - `tasks/issue-{id}/review.md`
7. Human approves and merges
8. Task memory is archived or left as traceable project history

---

## 9.2 Bug-Fix Workflow

1. Human creates a Bug Issue
2. Architect identifies likely root cause and risk areas
3. Developer applies the smallest safe fix
4. CI runs regression tests
5. QA verifies the failure is gone and checks nearby behavior
6. Reviewer evaluates correctness and regression risk
7. Human merges after approval

---

## 9.3 Tech Task Workflow

1. Human creates a Tech Task
2. Architect or Reviewer defines constraints
3. Developer executes minimal scoped improvements
4. CI validates stability
5. Reviewer checks scope creep and maintainability
6. Human decides merge timing

---

# 10. Suggested GitHub Actions

## 10.1 OpenCode Trigger Workflow

Example `.github/workflows/opencode.yml`:

```yaml
name: OpenCode Agent

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  workflow_dispatch:

jobs:
  run-opencode:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install OpenCode
        run: npm install -g opencode-ai

      - name: Run OpenCode
        run: |
          opencode run
```

Example comment trigger:

```text
/opencode use architect to analyze this issue, identify affected modules, and write the task design files.
```

---

## 10.2 CI Workflow

Example `.github/workflows/ci.yml` should include:

- build
- unit tests
- lint
- platform-specific validation where needed

---

## 10.3 PR Check Workflow

Example `.github/workflows/pr-check.yml` should include:

- required checks
- PR title or template validation
- label checks if you enforce issue type workflow

---

# 11. AGENTS.md Guidance

The top-level `AGENTS.md` should define repository-wide AI rules such as:

- understand before editing
- prefer minimal safe changes
- reproduce bugs before fixing when practical
- avoid unrelated refactoring
- preserve public interfaces
- inspect build and test layout before touching build logic
- summarize root cause, fix scope, and validation

Example content outline:

## Project Rules
- repository purpose
- key modules
- forbidden edit zones
- dependency constraints

## Coding Rules
- style
- ownership rules
- threading expectations
- logging rules
- performance expectations

## Build and Test Rules
- preferred commands
- target test strategy
- CI expectations

## Memory Rules
- global memory write restrictions
- role memory boundaries
- task memory lifecycle

---

# 12. OpenCode Directory Roles

## `.opencode/agents/`

Defines role prompts:

- `architect.md`
- `developer.md`
- `qa.md`
- `reviewer.md`

Each file should describe:

- role responsibilities
- role boundaries
- read/write memory rules
- expected outputs

---

## `.opencode/skills/`

Contains reusable skills such as:

- architecture reading
- bug fixing
- race investigation
- build troubleshooting
- testing-first feature work
- safe refactoring
- code review

Skills help standardize execution quality.

---

## `.opencode/commands/`

Contains reusable workflow commands such as:

- design
- implement
- test
- review
- triage

These commands reduce prompt inconsistency.

---

## `.opencode/memory/`

Contains role-isolated memory.

This should be treated as:

- persistent but scoped
- updateable by the owning role
- readable only according to policy

---

# 13. Safety and Change-Control Rules

AI agents must:

- avoid destructive commands unless explicitly approved
- avoid writing to unrelated files
- avoid rewriting architecture casually
- avoid storing uncertain information as global truth
- prefer incremental, traceable changes
- avoid mixing refactor and behavior change in one step

Humans should gate:

- merge to protected branches
- architecture-level changes
- updates to `docs/decisions/`
- updates to `docs/architecture/`
- release actions

---

# 14. Recommended Default Commands for OpenCode

Suggested AI command intents:

## Design
Analyze the issue and produce:
- affected modules
- design constraints
- implementation plan
- risk summary

## Implement
Implement the approved design:
- minimal code changes
- tests where needed
- concise change notes

## Test
Validate:
- acceptance criteria
- regression paths
- missing test coverage

## Review
Inspect:
- correctness
- hidden risks
- maintainability
- performance regressions

## Triage
Classify:
- feature vs bug vs tech task
- severity or priority
- recommended next role

---

# 15. Recommended Project Board States

Suggested GitHub Project columns:

- Backlog
- Ready
- In Analysis
- In Implementation
- In Review
- In Validation
- Blocked
- Done

Mapping suggestion:

- Architect mainly works when item is in **In Analysis**
- Developer mainly works when item is in **In Implementation**
- Reviewer mainly works when item is in **In Review**
- QA mainly works when item is in **In Validation**

---

# 16. What Should Be Automated vs Human-Controlled

## Good to Automate

- issue analysis
- PR drafting
- small implementation tasks
- regression checklist generation
- review comment generation
- task memory updates
- CI-triggered validation

## Better to Keep Human-Controlled

- final prioritization
- architectural policy changes
- global memory changes
- release approval
- production deployment
- risk acceptance

---

# 17. Minimal Viable Version

If the full structure feels heavy, start with:

- 4 agents
- 5 skills
- 4 commands
- global + role + task memory
- GitHub issue templates
- PR template
- one OpenCode workflow
- one CI workflow

That is enough to create a stable AI team MVP.

---

# 18. Expansion Path

Phase 1:
- Architect
- Developer
- QA
- Reviewer

Phase 2:
- add Product Manager
- add Project Manager
- improve labels and board states
- add nightly maintenance workflows

Phase 3:
- add DevOps role
- add release automation
- add richer MCP integrations
- add cross-repo knowledge sync with human approval gates

---

# 19. Implementation Goal for OpenCode

If OpenCode is instructed to configure this repository, it should:

1. create the directory structure
2. generate role agent files
3. generate initial skills and commands
4. create GitHub workflow files
5. create issue templates and PR template
6. initialize memory directories
7. add placeholder docs for architecture and decisions
8. preserve human approval gates

---

# 20. Final Summary

This template defines a **complete AI team repository layout** with:

- OpenCode-driven AI execution
- GitHub-based project management
- GitHub Actions automation
- layered role-aware memory isolation
- task-scoped working memory
- human-controlled global truth

In this model:

- **GitHub** manages work state
- **OpenCode** performs engineering work
- **Memory isolation** preserves role quality
- **Humans** retain governance

This is the recommended structure for building a stable, scalable AI-assisted software development repository.
