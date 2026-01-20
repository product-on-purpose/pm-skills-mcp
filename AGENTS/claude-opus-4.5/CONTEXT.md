# PM-Skills MCP - Project Context

**Last Updated:** 2026-01-17
**Status:** Phase 1 Complete, Phase 2 Effectively Complete

## Project Overview

PM-Skills MCP is an MCP server that exposes the 24 PM-Skills as programmatically accessible tools for any MCP-compatible AI client.

## Current State

### Working Implementation

The server is fully functional with:
- **25 MCP tools** registered and working
  - 24 skill tools (e.g., `pm_prd`, `pm_hypothesis`, `pm_experiment_design`)
  - 1 utility tool (`pm_list_skills`)
- **Dynamic skill loading** from pm-skills repository
- **Three output formats**: `full`, `concise`, `template-only`
- **Example inclusion** via `includeExample` parameter

### File Structure

```
src/
├── index.ts              # Entry point, server initialization
├── server.ts             # MCP server class, tool registration
├── config.ts             # Configuration management
├── types/
│   └── index.ts          # Shared type definitions
├── skills/
│   └── loader.ts         # SKILL.md parser, template/example loader
└── tools/
    ├── schemas.ts        # Zod input validation schemas
    └── handler.ts        # Response formatting
```

### Commands

```bash
npm run build    # Compile TypeScript
npm run dev      # Run with tsx (development)
npm start        # Run compiled version
```

## Implementation Plan Status

Based on: `_NOTES/efforts/plan-v1/mcp-implementation-plan_claude-opus-4.5.md`

| Phase | Status | Notes |
|-------|--------|-------|
| Phase 1: Foundation | **Complete** | Server scaffold, skill loader, base tools |
| Phase 2: All Tools | **Complete** | Dynamic loading handles all 24 skills |
| Phase 3: Resources | Pending | URI-based resource access |
| Phase 4: Prompts | Pending | Workflow prompt templates |
| Phase 5: Distribution | Pending | NPM packaging, Claude Desktop config |
| Phase 6: Testing | Pending | Unit tests, integration tests, CI/CD |

## Next Steps

See `TODO.md` for prioritized task list.
