# PM-Skills MCP v2.4.0 Release Notes

Date: 2026-02-16  
Status: Shipped

## Big Idea

`pm-skills-mcp` now directly tracks `pm-skills` release versions.  
This release aligns MCP package/runtime versioning with `pm-skills v2.4.0` and locks upstream source ingestion to a pinned ref.

## What Was Delivered

1. Direct version tracking alignment:
- `pm-skills-mcp` version moved to `2.4.0` (`package.json`, `package-lock.json`, `src/config.ts`).
- Versioning policy updated in `README.md` and release tables.

2. Deterministic source pinning for embed/publish:
- Added `pm-skills-source.json` with pinned upstream metadata:
  - `pmSkillsRepository`
  - `pmSkillsRef`
  - `pmSkillsVersion`
  - `outputContractVersion`
  - `configContractVersion`
- CI and publish workflows now clone the pinned ref instead of floating `main`:
  - `.github/workflows/ci.yml`
  - `.github/workflows/publish.yml`

3. Release/doc consistency updates:
- Changelog finalized for `2.4.0` release.
- Integration and README docs updated for current tool surface (`36` tools total, `7` utilities).
- Architecture doc version snippet updated to `2.4.0`.

## Validation Performed

- `npm run embed-skills ../pm-skills/skills` (pass)
- `npm test` (pass, `76/76`)
- `validate-mcp-sync` in `block` mode from `pm-skills` against this repo:
  - skill inventory parity pass (`24` vs `24`)
  - source pin and contract metadata checks pass

## What This Means

- `pm-skills-mcp` releases now follow `pm-skills` version numbers directly.
- Every MCP release carries explicit, machine-readable upstream pin metadata.
- Drift checks now validate both inventory parity and version/contract alignment.
