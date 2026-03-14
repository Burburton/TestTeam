# Issue #3 Analysis: [FEAT] amazingteam update

## 1. Issue Classification

**Type:** Feature / Maintenance

**Category:** Dependency Update / Infrastructure

This is a request to update the upstream foundation template (amazingteam) and integrate changes into the downstream project (TestTeam).

## 2. Priority

**Priority: P2 (Medium)**

Rationale:
- Not blocking current development
- Infrastructure improvement that should be planned
- Requires careful testing to avoid breaking existing functionality
- Can be scheduled during maintenance window

## 3. Suggested Labels

- `feature`
- `infrastructure`
- `foundation-update`
- `needs-planning`
- `risk: medium`

## 4. Brief Analysis

### Current State
- **Project (TestTeam)**: Version 2.0.0, based on amazingteam template
- **Source (amazingteam)**: https://github.com/Burburton/amazingteam
- **Project Type**: Web-based match-3 puzzle game (TypeScript + React)

### Scope of Update
Based on the amazingteam repository structure and the project's current state:

1. **Files to potentially update**:
   - `.ai-team/agents/` - Agent definitions (7 roles)
   - `.ai-team/skills/` - Reusable skills
   - `.ai-team/commands/` - Workflow commands
   - `.ai-team/memory/` - Role memory templates
   - `scripts/` - Bootstrap and upgrade scripts
   - `.github/ISSUE_TEMPLATE/` - Issue templates
   - `docs/patterns/`, `docs/runbooks/` - Documentation

2. **Protected files** (require manual review):
   - `docs/architecture/` - Project-specific architecture
   - `docs/decisions/` - Decision records
   - `AGENTS.md` - Project-specific rules
   - `ai-team.config.yaml` - Project configuration
   - `src/` - Game source code (消消乐)

3. **Risk Assessment**:
   - **Medium Risk**: AI Team infrastructure changes could affect workflows
   - **Low Risk**: Game source code is isolated from foundation
   - **Mitigation**: Backup before upgrade, test in isolation

### Upgrade Process
The amazingteam foundation provides controlled upgrade mechanism:
1. Run `plan_upgrade.sh` to generate upgrade plan (read-only)
2. Review `upgrade-plan.md` for changes
3. Run `upgrade_foundation.sh --dry-run` to preview
4. Execute upgrade with backup
5. Validate with `validate_project_setup.sh`
6. Test all AI workflows

## 5. Recommended Next Steps

### Immediate Actions
1. **Fetch latest amazingteam version**: Compare VERSION file with upstream
2. **Generate upgrade plan**: Run `./scripts/plan_upgrade.sh .` to identify changes
3. **Review diff**: Analyze what files will be added/modified

### Implementation Steps
1. Create branch `feat/issue-3-foundation-update`
2. Backup current `.ai-team/` directory
3. Run upgrade scripts (Class A files auto-apply)
4. Manually review Class B files (agents, skills, commands)
5. Update `.foundation/foundation.lock` with new version
6. Test all AI agent commands (`/triage`, `/design`, `/implement`, etc.)
7. Run full test suite to verify no regression

### Verification Checklist
- [ ] All 7 AI agents still functional
- [ ] Memory system intact
- [ ] GitHub Actions workflows working
- [ ] Game build and tests pass
- [ ] No conflicts with project-specific AGENTS.md

### Documentation
- Update `.foundation/upgrade-history.md`
- Document any breaking changes in CHANGELOG.md
- Update `.foundation/foundation.lock` metadata

---

**Analysis Date**: 2026-03-14  
**Analyzed By**: Architect Agent  
**Related Issue**: #3