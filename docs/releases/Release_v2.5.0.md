# PM-Skills MCP v2.5.0 Release Notes

Date: 2026-03-02  
Status: Ready for release cut (pre-tag; matrix rerun 2026-03-02 17:57 PT passed)

## Summary

`v2.5.0` MCP scope is aligned to the narrowed `pm-skills v2.5.0` lane:
1. `F-02` persona skill support (`pm_persona`).
2. `M-09` foundation/utility taxonomy behavior.
3. `M-10` sample-library validation support.

Deferred from `v2.5.0`:
1. `F-03` persona archetype library content shipment.
2. `F-04` full persona MCP exposure parity shipment claim.

## BREAKING CHANGES

`v2.5.0` follows the approved D6 compatibility-signaling exception posture:
1. Release labels remain aligned at `v2.5.0`.
2. MCP contract-impacting changes are explicitly disclosed.
3. Migration actions are required before release cut.

### Contract Surfaces Impacted

1. Skill taxonomy metadata is two-axis (`classification` + nullable `phase`).
2. Skill listing/search outputs expose classification semantics and can emit `Phase: n/a` for non-domain skills.
3. Derived MCP tool names strip both phase and classification prefixes, with startup hard-fail on collisions.

## Delivered Scope

1. Persona skill support:
   - `foundation-persona` is embedded and exposed as `pm_persona`.
2. Taxonomy/runtime parity:
   - Foundation/utility skills are modeled as classifications, not pseudo-phases.
   - Resource and tool metadata include explicit classification.
3. Validation hardening:
   - D9 categorized drift checks (`INV-*`, `CLS-*`, `NAM-*`, `CMD-*`, `CTR-*`) enforced by `pm-skills/.github/scripts/validate-mcp-sync.js`.
   - D10 embed invariants (`EMB-*`) enforced by `scripts/embed-skills.js` in this repo.
4. Compatibility utility posture:
   - `pm_list_personas` remains available.
   - Default CI/publish payload embeds no persona files (`PM_INCLUDE_PERSONAS=false`), so persona listings are empty by default.

## Deferred Scope (Future Release)

1. `F-03`: shipping canonical persona archetype content as bundled MCP resources.
2. `F-04`: claiming full persona-resource parity as shipped behavior in v2.5.0.

## Release-Cut Notes

1. Release package/version pin metadata is now aligned to `v2.5.0`:
   - `package.json` version: `2.5.0`.
   - `pm-skills-source.json`: `pmSkillsVersion/outputContractVersion/configContractVersion = 2.5.0`.
   - `pmSkillsRef`: `01891fe26a456a423be6f14d4feaf6aeb95b4e4f` (final release-cut source ref pending `v2.5.0` tag creation).

## Validation Matrix

1. In `pm-skills-mcp`: `$env:PM_INCLUDE_PERSONAS='false'; node scripts/embed-skills.js ../pm-skills/skills`
2. In `pm-skills-mcp`: `npm run build`
3. In `pm-skills-mcp`: `npm test`
4. In `pm-skills`: `$env:VALIDATE_MCP_SYNC_MODE='block'; $env:PM_SKILLS_MCP_PATH='../pm-skills-mcp'; node .github/scripts/validate-mcp-sync.js`
5. Latest rerun timestamp: `2026-03-02 17:57 PT` (all checks passed).

## Canonical References

1. `../pm-skills/docs/releases/Release_v2.5.0.md`
2. `../pm-skills/docs/internal/release-planning/checklist_v2.5.0.md`
3. `../pm-skills/docs/internal/release-planning/Release_v2.2_to_v2.5_execution-plan.md`
4. `../pm-skills-mcp/CHANGELOG.md`
