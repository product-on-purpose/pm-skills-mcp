# PM-Skills MCP v2.4.2 Release Notes

Date: 2026-02-16  
Status: Shipped

## Big Idea

`v2.4.2` is a governance-and-docs alignment patch that keeps `pm-skills-mcp` pinned to `pm-skills v2.4.2` and clarifies tracked vs local repository policy.

## What Was Delivered

1. MCP package/runtime patch release:
- `package.json` -> `2.4.2`
- `package-lock.json` -> `2.4.2`
- `src/config.ts` server info version -> `2.4.2`

2. Source pin and compatibility metadata alignment:
- Updated `pm-skills-source.json` to:
  - `pmSkillsRef: 0c76a76550faa9adea5cf9ba21b03817c67cc076`
  - `pmSkillsVersion: 2.4.2`
  - `outputContractVersion: 2.4.2`
  - `configContractVersion: 2.4.2`

3. File-structure and governance documentation alignment:
- Added tracked governance reference:
  - `docs/reference/repository-governance.md`
- Updated docs to reflect current flat skill layout and tracked-vs-local persistence rules:
  - `README.md`
  - `docs/customization.md`
  - `docs/migration-guide.md`
  - `docs/reference/project-structure.md`
  - `.gitignore`

## Validation Performed

- `npm run embed-skills ../pm-skills/skills` (pass)
- `npm test` (pass)
- `validate-mcp-sync` in block mode from `pm-skills` against this repo:
  - skill inventory parity pass
  - pin/contract metadata parity pass

## What This Means

- `pm-skills-mcp v2.4.2` is pinned to the current `pm-skills v2.4.2` baseline.
- Governance/documentation now better reflects which artifacts are canonical tracked truth vs local working files.
- MCP tool/resource/prompt behavior remains unchanged from `v2.4.1`.

## Non-Goals for v2.4.2

- No new MCP tools or workflows.
- No behavioral contract expansion beyond the existing v2.4 baseline.
