# Versioning Policy

This document describes how AI Team Foundation handles versioning and upgrades.

## Version Format

AI Team Foundation uses [Semantic Versioning](https://semver.org/) with the format `MAJOR.MINOR.PATCH`:

- **MAJOR**: Breaking changes that require manual intervention
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes, backward compatible

## Version Files

### VERSION

Single-line file containing the current version:

```
2.0.0
```

### CHANGELOG.md

Documents all changes in each release:

- New features
- Changed files
- Deprecated elements
- Breaking changes
- Migration notes

## Upgrade Paths

### Patch Upgrades (2.0.0 → 2.0.1)

**Risk Level**: Low

- Bug fixes only
- No structural changes
- Safe to apply automatically

**Action**: Run `upgrade_foundation.sh --auto`

### Minor Upgrades (2.0.0 → 2.1.0)

**Risk Level**: Medium

- New features added
- New files may be created
- Existing files may receive additions

**Action**: 
1. Run `plan_upgrade.sh` to see changes
2. Review the upgrade plan
3. Run `upgrade_foundation.sh`

### Major Upgrades (2.0.0 → 3.0.0)

**Risk Level**: High

- Breaking changes possible
- Manual migration may be required
- Structure changes possible

**Action**:
1. Read CHANGELOG.md migration notes
2. Run `diff_foundation_vs_project.sh`
3. Manually resolve conflicts
4. Run `upgrade_foundation.sh --careful`
5. Test thoroughly

## Foundation Lock File

Each downstream project has `.foundation/foundation.lock`:

```yaml
foundation_repo: ai-team-foundation
foundation_version: 2.0.0
overlay: python-backend
initialized_at: 2026-03-14
last_upgrade_at: 2026-03-20
upgrade_policy: controlled
```

This file tracks:
- Which foundation version the project was initialized from
- Which overlay was applied
- When upgrades were last applied

## Upgrade History

Each downstream project has `.foundation/upgrade-history.md`:

```markdown
## Upgrade 2026-03-20

- **From**: 2.0.0
- **To**: 2.1.0
- **Type**: Minor
- **Files Added**: 3
- **Files Modified**: 2
- **Files Skipped**: 1 (protected)
- **Conflicts**: 0
- **Manual Decisions**: None
```

## Checking for Updates

```bash
# Check current version
cat VERSION

# Check your project's foundation version
cat .foundation/foundation.lock

# Compare versions
./scripts/plan_upgrade.sh
```

## Breaking Change Policy

When a breaking change is introduced:

1. **Announce in CHANGELOG.md** with migration instructions
2. **Provide migration script** if applicable
3. **Support previous version** for one major release cycle
4. **Document in upgrade notes** specific actions required

## Overlay Compatibility

Each overlay specifies compatible foundation versions:

```yaml
# overlays/python-backend/overlay.yaml
compatible_foundation_versions:
  - "2.0.0"
  - "2.1.0"
```

Before applying an upgrade, validate overlay compatibility:

```bash
./scripts/validate_project_setup.sh
```

## Version Lifecycle

| Version Stage | Description | Support Level |
|--------------|-------------|---------------|
| Current | Latest release | Full support |
| Previous | Prior major | Security fixes |
| Deprecated | EOL versions | No support |

## Deprecation Policy

1. **Announce deprecation** 3 months in advance
2. **Document migration path** 
3. **Provide deprecation warnings** in upgrade scripts
4. **Remove in next major version**