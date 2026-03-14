# OpenCode AI Team -- Automated Workflow Template

This document defines a **complete AI-assisted development team
structure** that can run largely automatically using:

-   OpenCode (AI engineering execution)
-   GitHub (task management + collaboration)
-   GitHub Actions (automation runtime)

The goal is to let a repository operate like a **small autonomous
engineering team** with defined roles, workflows, and guardrails.

------------------------------------------------------------------------

# 1. System Architecture

The system is divided into four layers.

## Layer 1 --- Task & Collaboration (GitHub)

GitHub acts as the **project control plane**.

Responsibilities:

-   Issues = work requests
-   Pull Requests = deliverables
-   CI = validation
-   Reviews = approval gate
-   Projects = task state tracking

GitHub is the **source of truth for task state**.

------------------------------------------------------------------------

## Layer 2 --- AI Execution (OpenCode)

OpenCode provides:

-   repository understanding
-   architecture analysis
-   code implementation
-   bug fixing
-   test generation
-   code review

AI roles are defined as **agents** inside `.opencode/agents`.

------------------------------------------------------------------------

## Layer 3 --- Automation (GitHub Actions)

GitHub Actions runs OpenCode automatically when triggered by:

-   Issue comments
-   Pull Request comments
-   Scheduled workflows
-   Manual workflow runs

Actions provide:

-   isolated execution environment
-   CI test validation
-   commit and branch automation

------------------------------------------------------------------------

## Layer 4 --- Knowledge & Rules

Stored in the repository:

-   architecture documents
-   team rules
-   reusable skills
-   workflow commands

These ensure consistent AI behavior.

------------------------------------------------------------------------

# 2. Repository Layout

    repo/
    ├─ .github/
    │  ├─ workflows/
    │  │  ├─ opencode.yml
    │  │  ├─ ci.yml
    │  │  └─ pr-check.yml
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
    │  │  ├─ test-first-feature-dev/
    │  │  └─ safe-refactor-checklist/
    │  │
    │  ├─ commands/
    │  │  ├─ design.md
    │  │  ├─ implement.md
    │  │  ├─ test.md
    │  │  └─ review.md
    │  │
    │  └─ opencode.jsonc
    │
    ├─ docs/
    │  ├─ PRD/
    │  ├─ architecture/
    │  ├─ decisions/
    │  └─ runbooks/
    │
    ├─ AGENTS.md
    └─ src/

------------------------------------------------------------------------

# 3. AI Roles

The automated AI team uses four core agents.

## Architect

Responsibilities:

-   understand requirements
-   analyze system design
-   identify impacted modules
-   propose implementation strategy
-   document architecture notes

Output:

-   architecture summary
-   implementation plan
-   technical risk analysis

Architect **does not modify code directly**.

------------------------------------------------------------------------

## Developer

Responsibilities:

-   implement features
-   fix defects
-   update minimal code required
-   follow architecture guidance
-   add or update tests

Output:

-   commits
-   pull requests
-   change descriptions

Developer focuses on **implementation quality**.

------------------------------------------------------------------------

## QA Engineer

Responsibilities:

-   design test cases
-   validate feature behavior
-   verify bug fixes
-   identify regression risks

Output:

-   validation report
-   additional test coverage

QA ensures **correct behavior**.

------------------------------------------------------------------------

## Reviewer

Responsibilities:

-   review pull requests
-   identify correctness issues
-   detect hidden risks
-   evaluate maintainability

Output:

-   review comments
-   merge recommendation

Reviewer ensures **long‑term code quality**.

------------------------------------------------------------------------

# 4. Issue Types

## Feature Request

Used for new capabilities.

Required fields:

-   background
-   problem statement
-   expected behavior
-   acceptance criteria

------------------------------------------------------------------------

## Bug Report

Used for defects.

Required fields:

-   reproduction steps
-   logs or stack traces
-   expected behavior
-   environment details

------------------------------------------------------------------------

## Technical Task

Used for internal improvements.

Examples:

-   refactoring
-   dependency upgrades
-   performance improvements
-   infrastructure changes

------------------------------------------------------------------------

# 5. Pull Request Template

All pull requests must include:

-   summary of change
-   motivation
-   affected modules
-   risk analysis
-   validation steps
-   test status

This provides context for the Reviewer agent.

------------------------------------------------------------------------

# 6. Automated Workflow

## Feature Development

1.  Human creates Feature Issue
2.  Architect analyzes requirements
3.  Developer implements changes
4.  CI pipeline runs tests
5.  QA verifies behavior
6.  Reviewer evaluates code
7.  Human approves merge

------------------------------------------------------------------------

## Bug Fix

1.  Bug Issue created
2.  Architect identifies root cause
3.  Developer applies minimal fix
4.  CI runs regression tests
5.  QA validates resolution
6.  Reviewer checks safety
7.  Human merges PR

------------------------------------------------------------------------

# 7. GitHub Actions Example

Example `.github/workflows/opencode.yml`:

``` yaml
name: OpenCode Agent

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  run-opencode:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Install OpenCode
        run: npm install -g opencode-ai

      - name: Run OpenCode Agent
        run: |
          opencode run
```

This workflow allows comments like:

    /opencode use architect to analyze this issue

to trigger automated AI execution.

------------------------------------------------------------------------

# 8. AGENTS.md Global Rules

The `AGENTS.md` file should define:

-   coding standards
-   architectural constraints
-   testing strategy
-   dependency rules
-   safe‑change guidelines

Example principles:

-   minimal changes
-   no unrelated refactoring
-   preserve public interfaces
-   add tests for bug fixes

------------------------------------------------------------------------

# 9. Safety Guidelines

AI agents must follow these constraints:

-   avoid modifying unrelated files
-   avoid destructive operations
-   prefer incremental commits
-   require human approval before merge

------------------------------------------------------------------------

# 10. Benefits

This architecture provides:

-   repeatable engineering workflow
-   clear separation of responsibilities
-   scalable AI collaboration
-   compatibility with real engineering teams

------------------------------------------------------------------------

# 11. Summary

GitHub = task management system

OpenCode = AI engineering execution engine

GitHub Actions = automation runtime

Together they form a **semi‑autonomous AI development team** capable of
planning, implementing, testing, and reviewing software changes with
human oversight.
