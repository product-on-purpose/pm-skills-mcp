# Project Context: pm-skills-mcp

**Last Updated:** 2026-01-21
**Version:** 1.1.0 (Released)
**Status:** Stable — README cross-linking with pm-skills complete

## Overview

MCP server that exposes 24 product management skills from [pm-skills](https://github.com/product-on-purpose/pm-skills) as tools, resources, and prompts for AI assistants.

## Current State

### v1.1.0 Released
- **npm:** https://www.npmjs.com/package/pm-skills-mcp
- **GitHub Release:** Pending tag creation

### Statistics
| Metric | Count |
|--------|-------|
| MCP Tools | 36 (24 skills + 5 workflows + 7 utilities) |
| MCP Resources | 72 |
| MCP Prompts | 3 |
| Automated Tests | 66 |
| Documentation Guides | 5 |

### Key Features
- Performance caching with 5-minute TTL (`src/cache.ts`)
- `pm_cache_stats` utility for monitoring
- Full CI/CD pipeline with auto-publish to npm
- CodeQL security scanning
- **Comprehensive documentation suite** (new in v1.1.0)

## Documentation Suite (v1.1.0)

| Document | Purpose |
|----------|---------|
| `docs/getting-started.md` | Complete setup guide with core concepts, platform setup, first tool walkthrough |
| `docs/integration-guide.md` | Client-specific setup for Claude Desktop, Code, Cursor, Continue, Cline, Windsurf |
| `docs/customization.md` | Environment variable overrides, fork workflow, skill structure requirements |
| `docs/migration-guide.md` | File-based ↔ MCP migration, command-to-tool mapping, hybrid approach |
| `docs/architecture.md` | Server internals, data flow diagrams, extension points, performance |
| `docs/reference/project-structure.md` | Full src/ module breakdown, test descriptions |

## Architecture

```
src/
├── index.ts           # Entry point
├── server.ts          # PMSkillsServer class
├── config.ts          # Environment configuration
├── cache.ts           # LRU cache implementation
├── types/index.ts     # TypeScript types
├── skills/loader.ts   # Skill parsing with cache
├── tools/             # Tool handlers and schemas
├── resources/         # MCP resource registration
├── workflows/         # Workflow bundle definitions
└── prompts/           # MCP prompt definitions
```

### Utility Tools (7)
| Tool | Description |
|------|-------------|
| `pm_list_skills` | List all available skills |
| `pm_list_resources` | List all MCP resources |
| `pm_list_workflows` | List workflow bundles |
| `pm_list_prompts` | List available prompts |
| `pm_validate` | Validate artifact against template |
| `pm_search_skills` | Keyword search across skills |
| `pm_cache_stats` | Cache performance metrics |

## Recent Changes

### README Cross-Linking Session (2026-01-21)
1. **README pm-skills Cross-Reference**
   - Added header callout linking to pm-skills for customization
   - Enhanced "The Big Idea" with ecosystem context
   - Expanded Comparison to "PM-Skills Ecosystem" section
   - Added "Using Both Together" subsection
   - Added fork workflow to Configuration section
   - Added Acknowledgments section

### v1.1.0 Session

1. **Comprehensive Documentation Suite** (Issues #8, #9, #10, #11)
   - 5 new documentation guides covering setup, integration, customization, migration, architecture
   - ~2,500 lines of documentation added
2. **README.md Major Enhancements**
   - Added Guides section with links to all documentation
   - Enhanced Getting Started with platform-specific sections
   - Added intro to Tools section explaining pm-skills relationship
   - Enhanced tool parameters with detailed descriptions and examples
   - Updated Project Structure with docs/ directory
   - Consolidated Quick Start by Platform into Integration Guide
3. **GitHub Issues Closed**: #8, #9, #10, #11

## Open Items

### Backlog
- Issue #6: Add Architecture Decision Records (docs/adr/)

### Optional Enhancements
- Enable GitHub Discussions
- Add `.github/CODEOWNERS`
- Configure branch protection rulesets

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PM_SKILLS_PATH` | embedded | Custom skills directory |
| `PM_SKILLS_CACHE_DISABLED` | `false` | Disable caching |
| `PM_SKILLS_CACHE_TTL_MS` | `300000` | Cache TTL (5 min) |
| `PM_SKILLS_CACHE_MAX_ENTRIES` | `100` | Max cache entries |

## Development

```bash
npm test              # Run all tests (66 tests)
npm run build         # Compile TypeScript
npm run lint          # ESLint
npm run dev           # Development mode with tsx
```

## Links

| Resource | URL |
|----------|-----|
| npm Package | https://www.npmjs.com/package/pm-skills-mcp |
| GitHub Repository | https://github.com/product-on-purpose/pm-skills-mcp |
| Getting Started Guide | docs/getting-started.md |
| Integration Guide | docs/integration-guide.md |
