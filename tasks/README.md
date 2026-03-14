# Task Memory Directory

This directory contains task-scoped memory for each issue/feature.

## Purpose

Each task gets its own subdirectory (`issue-{id}/`) containing:
- Analysis notes
- Design documents
- Implementation notes
- Validation records
- Review outcomes

## Structure

```
tasks/
├── issue-101/
│   ├── analysis.md      # Architect's analysis
│   ├── design.md        # Design document
│   ├── implementation.md # Developer's notes
│   ├── validation.md    # QA's validation record
│   └── review.md        # Reviewer's findings
│
├── issue-102/
│   └── ...
│
└── README.md            # This file
```

## Lifecycle

1. **Creation**: Task directory is created when work begins
2. **Active**: Files are updated during task execution
3. **Completed**: Task memory is preserved for traceability
4. **Archive**: Optionally archived after project milestones

## Permissions

| Role | Can Read | Can Write |
|------|----------|-----------|
| Architect | All tasks | analysis.md, design.md |
| Developer | Current task | implementation.md |
| QA | Current task | validation.md |
| Reviewer | Current task | review.md |

## Naming Convention

- Directory: `issue-{github-issue-number}`
- Files: `[role]-notes.md` or by phase name

## Notes

- Task memory helps maintain context across sessions
- Provides traceable history of decisions
- Supports knowledge transfer for similar future tasks