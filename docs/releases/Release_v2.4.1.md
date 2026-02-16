# PM-Skills MCP v2.4.1 Release Notes

Date: 2026-02-16  
Status: Shipped

## Big Idea

`v2.4.1` is a patch follow-up release to keep `pm-skills-mcp` version and source pin metadata aligned with `pm-skills v2.4.1`.

## What Was Delivered

1. MCP package/runtime version patch:
- `package.json` -> `2.4.1`
- `package-lock.json` -> `2.4.1`
- `src/config.ts` server info version -> `2.4.1`

2. Direct-tracking source metadata alignment:
- Updated `pm-skills-source.json` to:
  - `pmSkillsRef: 0a60ae4ebf110d63d24bda919e88e30e24d20bb1`
  - `pmSkillsVersion: 2.4.1`
  - `outputContractVersion: 2.4.1`
  - `configContractVersion: 2.4.1`

3. Release/doc consistency updates:
- `CHANGELOG.md` finalized for `2.4.1`.
- `README.md` release table/list updated.
- `docs/architecture.md` server version snippet updated.

## Validation Performed

- `npm run embed-skills ../pm-skills/skills` (pass)
- `npm test` (pass)
- `validate-mcp-sync` in block mode from `pm-skills` against this repo:
  - skill inventory parity pass
  - pin/contract metadata parity pass

## What This Means

- `pm-skills-mcp v2.4.1` is aligned to the current `pm-skills v2.4.1` patch baseline.
- Tool/resource/prompt surface remains unchanged from `v2.4.0`.

## Non-Goals for v2.4.1

- No new MCP tools or workflows.
- No behavioral contract expansion beyond v2.4.0 baseline.