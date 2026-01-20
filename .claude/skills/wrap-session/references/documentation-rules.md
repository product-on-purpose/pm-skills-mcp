# Documentation Rules

Guidelines for managing public vs private files when wrapping up sessions.

## Public vs Private Files

### `_NOTES/` is Private

The `_NOTES/` folder is gitignored by default. External readers (anyone cloning the repo) cannot access these paths.

**Never reference `_NOTES/` in public-facing files:**
- README.md
- CHANGELOG.md
- CONTRIBUTING.md
- Any file a user cloning the repo would read

### What to Do Instead

| Scenario | Solution |
|----------|----------|
| Content needs to be public | Move it out of `_NOTES/` to a tracked location |
| Need to mention planning work | Describe what was done, not where files are |
| Linking to decisions | Use GitHub issues/PRs instead of internal docs |
| Agent coordination | `AGENTS/` files may reference `_NOTES/` |

## CHANGELOG Best Practices

**Do:**
```markdown
### Added
- Prepared PR content for awesome-claude-skills submission
- Filed [#48](https://github.com/org/repo/issues/48) for bug fix
```

**Don't:**
```markdown
### Added
- `_NOTES/efforts/project/plan.md` — planning document
- `_NOTES/efforts/project/pr-content.md` — PR content
```

Describe **what changed**, not where your working files are.

## File References in Documentation

When referencing files:
- Use relative paths from repo root
- Only reference tracked (non-gitignored) files
- If a file is gitignored, summarize its content instead of linking

## Agent Context Files

Files in `AGENTS/` (CONTEXT.md, TODO.md, SESSION-LOG/) may reference `_NOTES/` because:
- They're for internal/agent coordination
- They track where planning artifacts live
- They're not the primary docs external users read
