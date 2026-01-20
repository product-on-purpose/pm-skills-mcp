# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

_No unreleased changes._

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
  - `_NOTES/npm-github-cicd.md` - CI/CD setup guide and npm token instructions

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
