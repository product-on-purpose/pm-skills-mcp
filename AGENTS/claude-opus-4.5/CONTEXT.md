# PM-Skills MCP - Project Context

**Last Updated:** 2026-01-20
**Status:** v0.1.1 Published to npm with CI/CD

## Project Overview

PM-Skills MCP is an MCP server that exposes the 24 PM-Skills as programmatically accessible tools, resources, and workflow bundles for any MCP-compatible AI client.

## Current State

### Working Implementation

The server is fully functional with:
- **34 MCP tools** registered and working
  - 24 skill tools (e.g., `pm_prd`, `pm_hypothesis`, `pm_experiment_design`)
  - 5 workflow tools (e.g., `pm_workflow_feature_kickoff`, `pm_workflow_lean_startup`)
  - 5 utility tools (`pm_list_skills`, `pm_list_resources`, `pm_list_workflows`, `pm_list_prompts`, `pm_validate`)
- **3 MCP prompts** for guided workflows
  - `feature-kickoff` - Complete feature development workflow
  - `lean-validation` - Build-Measure-Learn cycle
  - `quick-prd` - Streamlined PRD creation
- **72 MCP resources** registered
  - 24 skill instructions (`pm-skills://skills/{phase}/{skill}`)
  - 24 templates (`pm-skills://templates/{phase}/{skill}`)
  - 24 examples (`pm-skills://examples/{phase}/{skill}`)
- **Dynamic skill loading** from pm-skills repository
- **Three output formats**: `full`, `concise`, `template-only`
- **Example inclusion** via `includeExample` parameter
- **Rich tool descriptions** for all tools

### Workflow Bundles

| Workflow | Tool Name | Effort | Description |
|----------|-----------|--------|-------------|
| Feature Kickoff | `pm_workflow_feature_kickoff` | standard | Problem → Hypothesis → Solution → PRD → Stories |
| Lean Startup | `pm_workflow_lean_startup` | comprehensive | Hypothesis → Experiment → Results → Pivot Decision |
| Triple Diamond | `pm_workflow_triple_diamond` | comprehensive | Full discovery to delivery sequence |
| Quick PRD | `pm_workflow_quick_prd` | quick | Fast problem → PRD workflow |
| Experiment Cycle | `pm_workflow_experiment_cycle` | standard | Hypothesis → Experiment → Results → Lessons |

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
├── tools/
│   ├── schemas.ts        # Zod input validation schemas
│   ├── handler.ts        # Response formatting
│   └── validator.ts      # Output validation logic
├── resources/
│   └── index.ts          # Resource registration and handlers
├── workflows/
│   └── index.ts          # Workflow bundle definitions
└── prompts/
    └── index.ts          # MCP prompt templates
```

### Commands

```bash
npm run build         # Compile TypeScript
npm run dev           # Run with tsx (development)
npm start             # Run compiled version
npm test              # Run all tests
npm run test:coverage # Run tests with coverage
npm run embed-skills  # Copy skills from pm-skills repo
```

## Implementation Plan Status

Based on: `_NOTES/efforts/plan-v1/mcp-implementation-plan_claude-opus-4.5.md`

| Phase | Status | Notes |
|-------|--------|-------|
| Phase 1: Foundation | **Complete** | Server scaffold, skill loader, base tools |
| Phase 2: All Tools | **Complete** | Dynamic loading handles all 24 skills |
| Phase 3: Resources | **Complete** | URI-based resource access (72 resources) |
| Workflow Bundles | **Complete** | 5 workflow tools added |
| Phase 4: Prompts | **Complete** | 3 prompts + pm_validate tool |
| Phase 5: Distribution | **Complete** | npm package, embed-skills script, README |
| Phase 6: Testing | **Complete** | 47 tests (vitest), all passing |

## Resource URI Schema

Resources are accessible via MCP's `resources/read` with these URI patterns:

| Pattern | Description | Example |
|---------|-------------|---------|
| `pm-skills://skills/{phase}/{skill}` | Full skill instructions | `pm-skills://skills/deliver/prd` |
| `pm-skills://templates/{phase}/{skill}` | Template only | `pm-skills://templates/deliver/prd` |
| `pm-skills://examples/{phase}/{skill}` | Example only | `pm-skills://examples/deliver/prd` |

## npm Package

Published to npm as `pm-skills-mcp@0.1.1` on 2026-01-20.

```bash
npm install -g pm-skills-mcp
# or
npx pm-skills-mcp
```

Package: https://www.npmjs.com/package/pm-skills-mcp

## CI/CD Pipeline

GitHub Actions workflows configured:
- **CI** (`ci.yml`): Runs on PR/push to main - tests, lint, type check (Node 18/20/22)
- **Publish** (`publish.yml`): Auto-publishes to npm on GitHub release

NPM_TOKEN secret configured in GitHub repository settings.

## Next Steps

See `TODO.md` for prioritized task list.
