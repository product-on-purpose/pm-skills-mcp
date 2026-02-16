# Repository Governance and File-Structure Review

Date: 2026-02-16  
Status: Active

## Purpose

Document top-level ownership boundaries and persistence rules for `pm-skills-mcp` so contributors can distinguish canonical tracked artifacts from local working files.

## Top-Level Ownership Model

| Path | Ownership | Persistence | Notes |
| --- | --- | --- | --- |
| `src/` | Runtime implementation | Tracked | Source of truth for MCP behavior |
| `tests/` | Behavioral verification | Tracked | Must match runtime behavior |
| `scripts/` | Build/embed tooling | Tracked | Embed and release flow support |
| `docs/` | Public/project docs | Tracked | Must avoid references to ignored-only files |
| `skills/` | Embedded skill snapshot | Ignored | Build-time copy from pinned `pm-skills` ref |
| `dist/` | Build output | Ignored | Generated via build/publish steps |
| Local planning scratch directory | Local planning/scratch | Ignored | Non-canonical working context |
| `.claude/` | Local assistant config | Ignored | Personal machine context |
| `AGENTS/*/CONTEXT.md` | Durable continuity | Trackable by policy | Shared high-signal project context |
| `AGENTS/*/DECISIONS.md` | Durable decisions | Trackable by policy | Shared high-signal decisions |
| `AGENTS/*/SESSION-LOG`, `TODO`, `PLANNING` | High-churn logs/plans | Ignored | Session-only working artifacts |

## Governance Rules

1. Public docs should reference tracked artifacts only.
2. Local planning scratch notes may store detailed evidence but are non-canonical.
3. Agent continuity is split:
- Durable: `CONTEXT.md`, `DECISIONS.md`.
- Ephemeral: `SESSION-LOG`, `TODO`, `PLANNING`.
4. Structural documentation must reflect current flat skill layout (`skills/{phase-skill}/`).

## 2026-02-16 Review Outcomes

1. `.gitignore` AGENTS rules aligned with pm-skills governance for durable continuity files.
2. Structure docs were corrected to reflect flat phase-prefixed skill directories.
3. Customization guide paths were corrected from legacy nested examples to flat skill paths.
