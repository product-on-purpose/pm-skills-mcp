# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.7.0] - 2026-03-22

### Added
- **2 new skill tools** from `pm-skills v2.7.0`:
  - `pm_acceptance_criteria` — Given/When/Then acceptance criteria generation (Deliver phase, specification category)
  - `pm_pm_skill_builder` — interactive PM skill creation with gap analysis, classification, and staging workflow (Utility classification, coordination category)
- First utility-classified skill tool in the MCP server.

### Changed
- Re-embedded all skills from `pm-skills v2.7.0` (27 skills, 81 files).
- Tool count: 40 tools (27 skills + 5 workflows + 8 utilities), up from 38.
- Resource count: 81 (27 skills x 3 types), up from 75.
- Advanced package/runtime version metadata to `2.7.0`:
  - `package.json`
  - `src/config.ts`
- Rolled source-pin metadata forward for direct tracking with `pm-skills v2.7.0`:
  - `pm-skills-source.json`
  - `pmSkillsRef=v2.7.0`
  - `pmSkillsVersion/outputContractVersion/configContractVersion=2.7.0`

### Release Notes
- First MCP release with a utility skill tool. `pm_pm_skill_builder` produces Skill Implementation Packets as text; file writing is client-dependent (works in Cursor/Claude Code, informational in Claude Desktop).
- `pm_acceptance_criteria` fills the last gap in the Deliver phase tool set.
- No breaking changes to existing tool names, parameters, or resource URIs.

## [2.6.0] - 2026-03-04

### Changed
- Advanced package/runtime version metadata to `2.6.0`:
  - `package.json`
  - `package-lock.json`
  - `src/config.ts`
- Rolled source-pin metadata forward for direct tracking with `pm-skills v2.6.0`:
  - `pm-skills-source.json`
  - `pmSkillsRef=v2.6.0`
  - `pmSkillsVersion/outputContractVersion/configContractVersion=2.6.0`
- Added release note artifact:
  - `docs/releases/Release_v2.6.0.md`

### Release Notes
- Maintenance release to keep `pm-skills-mcp` version and source-pin metadata aligned with `pm-skills v2.6.0`.
- No MCP tool/resource/prompt behavior changes from `v2.5.2`.

## [2.5.2] - 2026-03-04

### Changed
- Rewrote public release-facing docs for clearer user-first language.
- Removed internal planning shorthand from release-facing `v2.5.0` documentation.
- Advanced package/runtime version metadata to `2.5.2`:
  - `package.json`
  - `package-lock.json`
  - `src/config.ts`
- Rolled source-pin metadata forward for direct tracking with `pm-skills v2.5.2`:
  - `pm-skills-source.json`
  - `pmSkillsRef=v2.5.2`
  - `pmSkillsVersion/outputContractVersion/configContractVersion=2.5.2`
- Added release note artifact:
  - `docs/releases/Release_v2.5.2.md`

### Release Notes
- Patch release focused on public documentation quality and release-communication clarity.
- No MCP tool/resource/prompt behavior changes from `v2.5.1`.

## [2.5.1] - 2026-03-04

### Changed
- Canonicalized tracked Claude continuity workspace to `AGENTS/claude/` by renaming `AGENTS/claude-opus-4.5/`.
- Updated project-structure docs to reflect canonical `AGENTS/claude` path.
- Advanced package/runtime version metadata to `2.5.1`:
  - `package.json`
  - `package-lock.json`
  - `src/config.ts`
- Rolled source-pin metadata forward for direct tracking with `pm-skills v2.5.1`:
  - `pm-skills-source.json`
  - `pmSkillsRef=v2.5.1`
  - `pmSkillsVersion/outputContractVersion/configContractVersion=2.5.1`

### Release Notes
- Patch release focused on AGENTS continuity-path canonicalization and pin/version parity.
- No MCP tool/resource/prompt behavior changes from `v2.5.0`.

## [2.5.0] - 2026-03-02

### Breaking Changes
- `v2.5.0` includes explicit MCP contract changes while keeping version alignment with `pm-skills`.
- Skill taxonomy is now two-axis: `classification` is explicit, and `phase` can be `null` for non-domain (`foundation`/`utility`) skills.
- `pm_list_skills` and `pm_search_skills` outputs now include classification semantics and may report `Phase: n/a` for non-phase skills.
- Tool derivation now strips both workflow-phase and classification prefixes and hard-fails on derived-name collisions.

### Highlights
- Package and runtime version advanced to `2.5.0`:
  - `package.json`
  - `package-lock.json`
  - `src/config.ts`
- Ship persona skill support with `pm_persona` aligned to `pm-skills` `foundation-persona`.
- Keep `pm_list_personas` compatibility utility in runtime while default CI/publish payload embeds no persona files (`PM_INCLUDE_PERSONAS=false`).
- Keep runtime inventory at 38 tools (25 skills + 5 workflows + 8 utilities) and default 75 resources (skills/templates/examples only).
- Defer persona archetype resource-library shipment and full persona-resource parity claims to a future release.
- Harden embed validation invariants in `scripts/embed-skills.js` with explicit fail/warn checks.
- Enforce categorized drift findings in `pm-skills/.github/scripts/validate-mcp-sync.js` for inventory, classification, naming, command, and contract consistency.
- Pin `pm-skills-source.json` to published `pm-skills` ref `5586c98c0d0ca77c763440b58d266d2029ae2719` with `pmSkillsVersion/outputContractVersion/configContractVersion = 2.5.0`.

## [2.4.3] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.3.md`.

### Changed
- Package and runtime version advanced to `2.4.3`:
  - `package.json`
  - `package-lock.json`
  - `src/config.ts`
- Upstream pin metadata updated for direct tracking with `pm-skills v2.4.3`:
  - `pm-skills-source.json`
  - `pmSkillsRef` pinned to `b323d0d55c645009f72e22f9c437e5f21df4e61a`
  - `pmSkillsVersion`, `outputContractVersion`, and `configContractVersion` set to `2.4.3`
- Release documentation pointers rolled forward so tagged artifacts include latest published-link metadata:
  - `README.md`
  - `CHANGELOG.md`
  - `docs/releases/Release_v2.4.3.md`

### Release Notes
- Patch release to include post-`v2.4.2` documentation/release-link updates in tagged artifacts.
- No MCP tool/resource/prompt behavior changes from `v2.4.2`.

## [2.4.2] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.2.md`.
- Repository governance reference:
  - `docs/reference/repository-governance.md`

### Changed
- Package and runtime version advanced to `2.4.2`:
  - `package.json`
  - `package-lock.json`
  - `src/config.ts`
- Upstream pin metadata updated for direct tracking with `pm-skills v2.4.2`:
  - `pm-skills-source.json`
  - `pmSkillsRef` pinned to `0c76a76550faa9adea5cf9ba21b03817c67cc076`
  - `pmSkillsVersion`, `outputContractVersion`, and `configContractVersion` set to `2.4.2`
- Repository structure/governance docs aligned with current policy and layout:
  - `README.md`
  - `docs/customization.md`
  - `docs/migration-guide.md`
  - `docs/reference/project-structure.md`
  - `.gitignore`

### Release Notes
- Patch release for governance and documentation alignment with `pm-skills v2.4.2`.
- No MCP tool/resource/prompt surface changes from `v2.4.1`.
- Published GitHub release: `https://github.com/product-on-purpose/pm-skills-mcp/releases/tag/v2.4.2`.
- Published npm package: `pm-skills-mcp@2.4.2`.

## [2.4.1] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.1.md`.

### Changed
- Package and runtime version advanced to `2.4.1`:
  - `package.json`
  - `package-lock.json`
  - `src/config.ts`
- Upstream pin metadata updated for direct tracking with `pm-skills v2.4.1`:
  - `pm-skills-source.json`
  - `pmSkillsRef` pinned to `0a60ae4ebf110d63d24bda919e88e30e24d20bb1`
  - `pmSkillsVersion`, `outputContractVersion`, and `configContractVersion` set to `2.4.1`
- Documentation/release references updated for latest patch state:
  - `README.md`
  - `docs/architecture.md`

### Release Notes
- Patch follow-up for version/pin parity with `pm-skills v2.4.1`.
- No changes to MCP tool surface or contract behavior from `v2.4.0`.

## [2.4.0] - 2026-02-16

### Added
- Release note artifact: `docs/releases/Release_v2.4.0.md`.
- Source-tracking metadata file for deterministic upstream alignment:
  - `pm-skills-source.json`
- Dedicated resource URI contract tests (`tests/resources.test.ts`) covering:
  - URI builder/parsing for flat format
  - rejection of legacy nested URI format
  - resource listing behavior with/without template/example files

### Changed
- Adopted direct version tracking with `pm-skills` beginning at `v2.4.0` for `pm-skills-mcp`.
- Package and runtime version advanced to `2.4.0`:
  - `package.json`
  - `package-lock.json`
  - `src/config.ts`
- Corrected server-info version example in architecture docs:
  - `docs/architecture.md`
- CI and publish workflows now clone `pm-skills` from the pinned source metadata in `pm-skills-source.json` instead of floating `main`.
- Added explicit `pm-skills-source.json` compatibility metadata (repo/ref/version + contract versions) for reproducible embeds and release traceability.
- Corrected MCP contract docs to flat resource URIs (`pm-skills://{skills|templates|examples}/{skill}`):
  - `AGENTS.md`
  - `docs/getting-started.md`
  - `docs/architecture.md`
- Updated docs to reflect current tool surface: 36 tools total (24 skills + 5 workflows + 7 utilities):
  - `README.md`
  - `docs/getting-started.md`
  - `docs/architecture.md`
  - `docs/integration-guide.md`
- Updated release/project docs for v2.4 direct tracking policy:
  - `README.md`
- Tightened npm publish surface in `package.json` `files` to include runtime JS + type declarations, excluding source maps.
- Hardened `.gitignore` for packaging/env hygiene (`*.tgz`, `.env.*`, allowlist `.env.example`).

## [2.1.0] - 2026-01-27

### Breaking Changes
- **Resource URIs flattened** - URIs now use `pm-skills://skills/{skill}` format (was `pm-skills://skills/{phase}/{skill}`)
- **Internal skill directory structure** - Now flat `skills/{phase-skill}/` matching pm-skills v2.x

### Changed
- Skill loader now reads `phase` from SKILL.md frontmatter instead of directory path
- Tool metadata includes phase information for programmatic access
- Updated `embed-skills.js` for flat pm-skills v2.x source layout
- All 36 tools verified (24 skills + 5 workflows + 7 utilities)
- Tool names remain stable (`pm_prd`, `pm_hypothesis`, etc.) derived from full skill names

### Fixed
- Aligns with pm-skills v2.0.2+ flat structure
- Workflow bundle skill lookups updated for new naming convention

## [1.1.0] - 2026-01-21

### Added
- **Comprehensive Documentation Suite** (Issues #8, #9, #10, #11)
  - `docs/getting-started.md` — Complete setup guide with core concepts, platform setup, first tool walkthrough, workflows, and troubleshooting
  - `docs/integration-guide.md` — Client-specific setup for Claude Desktop, Claude Code, Cursor, Continue, Cline, Windsurf with troubleshooting
  - `docs/customization.md` — Environment variable overrides, fork workflow, skill structure requirements, testing custom skills
  - `docs/migration-guide.md` — File-based ↔ MCP migration, command-to-tool mapping table, hybrid approach
  - `docs/architecture.md` — Server internals, component breakdown, data flow diagrams, extension points, performance considerations
- **README Guides section** — New section with links and descriptions for all 5 documentation guides
- **Platform Compatibility table** — Expanded "Works with..." section with 11 platforms, status indicators, and integration types
- **Project Structure section** — Tree diagram in README.md showing repository layout including new docs/
- **docs/reference/project-structure.md** — Comprehensive documentation with full `/src/` module breakdown, test suite descriptions, MCP server architecture diagram
- **README header callout** — Cross-reference to pm-skills for customization and slash commands
- **README "Using Both Together" section** — Guide for using pm-skills fork with pm-skills-mcp
- **README fork workflow** — Configuration section for using custom pm-skills fork
- **README Acknowledgments section** — Credits for pm-skills, MCP, and Anthropic
- **README Releases section** — Added under Project Status with npm/GitHub badges

### Changed
- **README.md Getting Started** — Added intro paragraph with link to getting-started.md, added Claude Code and Cursor/VS Code sections with config file paths
- **README.md Usage > Tools** — Added intro explaining pm-skills relationship (24 skill tools vs 6 utility tools), enhanced parameter table with detailed descriptions and example invocations
- **README.md "Works with..."** — Consolidated Quick Start by Platform into Getting Started, replaced with link to Integration Guide
- **Table of Contents** — Restructured with Guides section and updated heading anchors
- **README "The Big Idea"** — Added ecosystem context explaining pm-skills relationship
- **README Comparison section** — Expanded to "PM-Skills Ecosystem" with comprehensive feature table
- **README Table of Contents** — Updated with new sections (Using Both Together, Acknowledgments, Releases)
- **README formatting** — Standardized em dashes to hyphens throughout

## [1.0.0] - 2026-01-21

First stable release of pm-skills-mcp with all 24 PM skills, performance caching, and complete infrastructure.

### Added
- **Performance Caching** (Issue #5)
  - In-memory LRU cache for skill content with 5-minute TTL
  - `pm_cache_stats` utility tool for monitoring cache performance
  - Configurable via environment variables (`PM_SKILLS_CACHE_*`)
  - Reduces filesystem reads during sessions
- **Community Governance Files**
  - `SECURITY.md` - Vulnerability reporting policy (48h/72h SLA)
  - `CONTRIBUTING.md` - Contribution guidelines for MCP server development
  - `CODE_OF_CONDUCT.md` - Contributor Covenant v2.1
  - `CLAUDE.md` - Claude Code instructions for project context
- **GitHub Issue & PR Templates**
  - `.github/ISSUE_TEMPLATE/config.yml` - Disables blank issues, links to upstream pm-skills
  - `.github/ISSUE_TEMPLATE/bug_report.yml` - Structured bug report form
  - `.github/ISSUE_TEMPLATE/feature_request.yml` - Feature request form
  - `.github/PULL_REQUEST_TEMPLATE.md` - PR checklist with TypeScript requirements
- **Security Scanning**
  - `.github/workflows/codeql.yml` - JavaScript/TypeScript CodeQL analysis

### Changed
- **Tool Count**: 36 tools (24 skills + 5 workflows + 7 utilities)
- **Test Count**: 66 tests (added 19 cache tests)
- **Dependabot Configuration**
  - Fixed npm package ecosystem directory from `/.github/scripts` to `/` (root)
  - Added `open-pull-requests-limit: 10` for npm updates
- **Git Configuration**
  - Updated `.gitignore` with `.obsidian`, `.claude/settings.local.json`, `AGENTS/*/` patterns, `coverage/`
  - Fixed stale git upstream tracking (removed reference to deleted `origin/master`)

## [0.1.2] - 2026-01-20

### Changed
- **CI/CD Infrastructure**
  - Migrated default branch from `master` to `main`
  - CI now clones pm-skills repo at build time (skills not duplicated in repo)
  - Publish workflow uses npm automation token for 2FA bypass
  - Repository made public for npm Trusted Publishing compatibility
- **Skills Management**
  - Skills directory (`skills/`) now gitignored (embedded at build time only)
  - pm-skills remains the single source of truth for skill content

### Fixed
- CI/CD workflows now trigger on correct branch (`main`)
- Publish workflow authentication with npm automation token

## [0.1.1] - 2026-01-20

### Added
- **GitHub Actions CI/CD**
  - CI workflow (`.github/workflows/ci.yml`): runs tests, lint, and type check on PR/push to main
  - Publish workflow (`.github/workflows/publish.yml`): auto-publishes to npm on GitHub release
  - Tests run on Node.js 18, 20, and 22 matrix
- **ESLint + Prettier configuration**
  - ESLint with TypeScript support (`eslint.config.js`)
  - Prettier for code formatting (`.prettierrc`, `.prettierignore`)
  - New scripts: `npm run lint`, `npm run format`, `npm run format:check`
- **Internal documentation**
  - Local CI/CD setup notes for npm token and workflow onboarding

### Changed
- Removed unused imports to fix ESLint warnings
- Code formatting applied across all source files

## [0.1.0] - 2026-01-20

### Added
- **Phase 4 Complete: MCP Prompts**
  - Prompts module (`src/prompts/index.ts`)
  - 3 MCP prompts: `feature-kickoff`, `lean-validation`, `quick-prd`
  - `pm_list_prompts` utility tool
  - `pm_validate` output validation tool with word-based section matching
  - Validator module (`src/tools/validator.ts`)
- **Phase 5 Complete: Distribution**
  - Skill embedding script (`scripts/embed-skills.js`)
  - NPM package configuration (bin, files, prepublishOnly)
  - Claude Desktop configuration docs in README
  - Environment variable `PM_SKILLS_DEV_PATH` for development mode
- **Phase 6 Complete: Testing**
  - Vitest test framework with 47 tests
  - Unit tests for validator, workflows, prompts, handlers, loader
  - Integration tests for server initialization
  - Test scripts: `npm test`, `npm run test:watch`, `npm run test:coverage`
- Tool count: 34 (24 skills + 5 workflows + 5 utilities)
- Prompt count: 3
- Resource count: 72

### Changed
- Removed hardcoded DEV_SKILLS_PATH from config.ts
- Updated README with prompts section and accurate counts
- Improved validator fuzzy matching to prevent false positives

### Previous (Phase 3 + Workflows)
- **Phase 3 Complete: MCP Resources**
  - Resource registration module (`src/resources/index.ts`)
  - 72 MCP resources (24 skills × 3 types: instructions, templates, examples)
  - URI schema: `pm-skills://skills|templates|examples/{phase}/{skill}`
  - `pm_list_resources` utility tool
- **Workflow Bundle Tools**
  - Workflow definitions module (`src/workflows/index.ts`)
  - 5 workflow bundles: feature-kickoff, lean-startup, triple-diamond, quick-prd, experiment-cycle
  - `pm_workflow_*` tools that return execution plans
  - `pm_list_workflows` utility tool
- Rich tool descriptions for all 32 tools

### Previous (Phase 1-2)
- **Phase 1 Complete: Core MCP Server Implementation**
  - MCP server scaffold (`src/index.ts`, `src/server.ts`, `src/config.ts`)
  - Type definitions (`src/types/index.ts`)
  - Skill loader with frontmatter parsing (`src/skills/loader.ts`)
  - Tool schemas with Zod validation (`src/tools/schemas.ts`)
  - Tool response handler (`src/tools/handler.ts`)
- 25 working MCP tools: 24 skill tools + `pm_list_skills` discovery tool
- Dynamic skill loading from pm-skills repository
- Support for HTML comment stripping in SKILL.md files
- Three output formats: `full`, `concise`, `template-only`
- Optional example inclusion via `includeExample` parameter
- Environment variable configuration (`PM_SKILLS_PATH`, `PM_SKILLS_FORMAT`, etc.)
- TypeScript strict mode with full type safety
- Development fallback path for local pm-skills repo
- Tools now use Zod schemas for MCP SDK compatibility

### Previous (Planning Phase)
- Initial project structure
- README, LICENSE, and documentation templates
- Comprehensive MCP implementation plan
- Professional README with value proposition and architecture overview
