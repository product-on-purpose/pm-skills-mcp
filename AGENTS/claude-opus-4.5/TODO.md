# PM-Skills MCP - TODO

**Last Updated:** 2026-01-20
**Current:** 34 tools, 3 prompts, 72 resources

## Completed

### Phase 1-2: Foundation & Tools
- [x] MCP server scaffold with dynamic skill loading
- [x] 24 skill tools with Zod validation
- [x] Tool descriptions for all tools

### Phase 3: Resources
- [x] Implement resource handlers for URI-based access
- [x] Register skill resources (`pm-skills://skills/{phase}/{skill}`)
- [x] Register template resources (`pm-skills://templates/{phase}/{skill}`)
- [x] Register example resources (`pm-skills://examples/{phase}/{skill}`)
- [x] Add `pm_list_resources` utility tool

### Workflow Bundles
- [x] Define workflow bundle configurations (5 workflows)
- [x] Create workflows module with bundle definitions
- [x] Register workflow bundle tools
- [x] Add `pm_list_workflows` utility tool
- [x] Workflow tools: `pm_workflow_feature_kickoff`, `pm_workflow_lean_startup`, `pm_workflow_triple_diamond`, `pm_workflow_quick_prd`, `pm_workflow_experiment_cycle`

### Phase 4: Prompts
- [x] Create MCP prompt templates for common workflows
- [x] Implement `feature-kickoff` prompt
- [x] Implement `lean-validation` prompt
- [x] Implement `quick-prd` prompt
- [x] Add `pm_validate` output validation tool
- [x] Add `pm_list_prompts` utility tool

### Phase 5: Distribution
- [x] Embed skills at build time (copy from pm-skills)
- [x] Create build script for skill embedding (`scripts/embed-skills.js`)
- [x] Configure NPM package for publishing (bin, files, prepublishOnly)
- [x] Write Claude Desktop configuration docs (README.md)
- [x] Remove hardcoded DEV_SKILLS_PATH from config.ts (uses env var now)

### Phase 6: Testing & Quality
- [x] Set up test framework (vitest)
- [x] Add unit tests for skill loader (11 tests)
- [x] Add unit tests for tool handlers (7 tests)
- [x] Add unit tests for validator (7 tests)
- [x] Add unit tests for workflow handlers (8 tests)
- [x] Add unit tests for prompts (9 tests)
- [x] Add integration test for server (5 tests)

**Total: 47 tests passing**

### npm Publish
- [x] Publish to npm as `pm-skills-mcp@0.1.0` (2026-01-20)
- [x] Publish to npm as `pm-skills-mcp@0.1.1` (2026-01-20)

### CI/CD & Quality
- [x] Set up CI workflow (test on PR/push to main, Node 18/20/22)
- [x] Set up Publish workflow (auto-publish on GitHub release)
- [x] Add ESLint configuration with TypeScript support
- [x] Add Prettier configuration
- [x] Configure NPM_TOKEN secret in GitHub

## Improvements (Lower Priority)

- [ ] Add `pm_search_skills` tool with keyword search
- [ ] Add resource templates for dynamic content generation
- [ ] Performance optimization (caching, lazy loading)
