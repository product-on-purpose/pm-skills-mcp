# PM-Skills MCP v2.7.0 Release Notes

**Date**: 2026-03-22
**Status**: Released (tag `v2.7.0`)
**Upstream**: Synced with [pm-skills v2.7.0](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.7.0)

## Summary

v2.7.0 adds two new skill tools from the pm-skills v2.7.0 release, bringing the MCP server to 27 skill tools (40 tools total). This is the first release to include a utility-classified skill tool.

## New Tools

### `pm_acceptance_criteria`

Generates structured Given/When/Then acceptance criteria for user stories or feature slices. Covers happy path, edge cases, error states, and non-functional expectations.

- **Phase**: Deliver
- **Category**: specification
- **Source skill**: `deliver-acceptance-criteria`

### `pm_pm_skill_builder`

Interactive PM skill creation with gap analysis, Why Gate, classification, exemplar-driven drafting, and staging workflow. Produces a Skill Implementation Packet as text content.

- **Classification**: Utility
- **Category**: coordination
- **Source skill**: `utility-pm-skill-builder`
- **Note**: File writing is client-dependent. Works fully in Cursor and Claude Code. In Claude Desktop, the packet content is returned as text for manual file creation.

## Tool Naming

The `pm_pm_skill_builder` name follows the standard convention: strip the classification prefix (`utility-`), convert hyphens to underscores, prepend `pm_`. The double `pm_` is intentional — it preserves the skill name intact and is consistent with the future `pm_agent_skill_builder` (F-09).

## Counts

| Category | Count | Change |
|----------|-------|--------|
| Skill tools | 27 | +2 |
| Workflow tools | 5 | — |
| Utility tools | 8 | — |
| **Total tools** | **40** | **+2** |
| Resources | 81 | +6 |

## Breaking Changes

None. All existing tool names, parameters, and resource URIs are unchanged.

## Validation

- All 27 skills embedded (81 files)
- Source pin: `pm-skills v2.7.0`
- Package version: `2.7.0`

## Canonical References

- `CHANGELOG.md`
- `pm-skills-source.json`
- Upstream: `docs/releases/Release_v2.7.0.md` in pm-skills
