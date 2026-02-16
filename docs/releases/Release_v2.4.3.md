# PM-Skills MCP v2.4.3 Release Notes

Date: 2026-02-16  
Status: Shipped

## Big Idea

`v2.4.3` is a documentation/tag-alignment patch so the latest tagged artifact includes post-`v2.4.2` release-link updates.

## Published Artifacts

- GitHub release: `https://github.com/product-on-purpose/pm-skills-mcp/releases/tag/v2.4.3`
- npm package: `https://www.npmjs.com/package/pm-skills-mcp/v/2.4.3`

## What Was Delivered

1. MCP package/runtime patch release:
- `package.json` -> `2.4.3`
- `package-lock.json` -> `2.4.3`
- `src/config.ts` server info version -> `2.4.3`

2. Source pin and compatibility metadata alignment:
- Updated `pm-skills-source.json` to:
  - `pmSkillsRef: b323d0d55c645009f72e22f9c437e5f21df4e61a`
  - `pmSkillsVersion: 2.4.3`
  - `outputContractVersion: 2.4.3`
  - `configContractVersion: 2.4.3`

3. Latest release pointers and metadata links rolled to `v2.4.3`:
- `README.md`
- `CHANGELOG.md`
- `docs/releases/Release_v2.4.3.md`

## Validation Performed

- `npm run embed-skills -- ../pm-skills/skills` (pass)
- `npm test` (pass)
- `validate-mcp-sync` in block mode from `pm-skills` against this repo:
  - skill inventory parity pass
  - pin/contract metadata parity pass

## What This Means

- `pm-skills-mcp v2.4.3` remains behaviorally equivalent to `v2.4.2`.
- Tagged artifacts now include complete published-link metadata.

## Non-Goals for v2.4.3

- No new MCP tools or workflows.
- No behavioral contract expansion beyond the existing v2.4 baseline.
