# PM-Skills MCP v2.5.1 Release Notes

Date: 2026-03-04  
Status: Released (`v2.5.1` tag + GitHub release published; npm publish succeeded)

## Summary

`v2.5.1` is a patch release focused on continuity-path canonicalization and source-pin/version parity.

## Changed

1. Canonicalized tracked Claude continuity workspace path:
   - `AGENTS/claude-opus-4.5/` -> `AGENTS/claude/`
2. Updated project-structure documentation to reflect canonical `AGENTS/claude`.
3. Advanced runtime/package metadata to `2.5.1`:
   - `package.json`
   - `package-lock.json`
   - `src/config.ts`
4. Rolled source-pin metadata to `pm-skills v2.5.1`:
   - `pm-skills-source.json`
   - `pmSkillsRef=v2.5.1`
   - `pmSkillsVersion/outputContractVersion/configContractVersion=2.5.1`

## Impact

1. No MCP tool/resource/prompt behavior changes from `v2.5.0`.
2. No taxonomy contract behavior changes from `v2.5.0`.

## Published Artifacts

1. GitHub release: `https://github.com/product-on-purpose/pm-skills-mcp/releases/tag/v2.5.1`
2. npm package: `pm-skills-mcp@2.5.1`

## Canonical References

1. `CHANGELOG.md`
2. `pm-skills-source.json`
3. `../pm-skills/docs/releases/Release_v2.5.1.md`
