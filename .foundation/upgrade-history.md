# Upgrade History

This file records all foundation upgrades applied to this project.

## Initial Setup

- **Date**: 2026-03-14
- **Foundation Version**: 2.0.0
- **Overlay**: none
- **Action**: Initial project creation

---

## Upgrade - 2026-03-16

- **From Version**: 2.0.0
- **To Version**: 2.2.0
- **Action**: Controlled upgrade applied
- **Files Updated**:
  - VERSION
  - .ai-team/agents/planner.md (workflow orchestration, /auto command)
  - .ai-team/agents/ci-analyst.md (blocker diagnosis)
  - .ai-team/agents/developer.md (git identity, PR rules)
  - .opencode/agents/planner.md (/auto command table)
  - .opencode/agents/developer.md (updated permissions)
  - .opencode/commands/resume.md (new)
  - .foundation/foundation.lock
- **Files Skipped**: None
- **Conflicts Found**: None
- **Manual Decisions**: None
- **Protected Files**: Skipped

---

## Upgrade Template

Copy this template for each upgrade:

```markdown
## Upgrade - YYYY-MM-DD

- **From Version**: X.X.X
- **To Version**: Y.Y.Y
- **Action**: Controlled upgrade applied
- **Files Added**: [list]
- **Files Skipped**: [list]
- **Conflicts Found**: [list or "None"]
- **Manual Decisions**: [list or "None"]
- **Protected Files**: Skipped / None
```

---

## Notes

- Keep this file updated after each upgrade
- Record any manual decisions made during upgrade
- Note any conflicts that required resolution
- This file is preserved during upgrades