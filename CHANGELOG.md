# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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

### Changed
- Upgraded from planning to working implementation
- Tools now use Zod schemas for MCP SDK compatibility

### Previous (Planning Phase)
- Initial project structure
- README, LICENSE, and documentation templates
- Comprehensive MCP implementation plan
- Professional README with value proposition and architecture overview
