# PM-Skills MCP - TODO

**Last Updated:** 2026-01-17

## Next Priority: Phase 3 - Resources

- [ ] Implement resource handlers for URI-based access
- [ ] Register skill resources (`pm-skills://skills/{phase}/{skill}`)
- [ ] Register template resources (`pm-skills://templates/{phase}/{skill}`)
- [ ] Register example resources (`pm-skills://examples/{phase}/{skill}`)

## Phase 4: Prompts

- [ ] Create prompt templates for common workflows
- [ ] Implement `feature-kickoff` prompt
- [ ] Implement `lean-validation` prompt
- [ ] Implement `quick-prd` prompt
- [ ] Add `pm_validate` output validation tool

## Phase 5: Distribution

- [ ] Embed skills at build time (copy from pm-skills)
- [ ] Create build script for skill embedding
- [ ] Configure NPM package for publishing
- [ ] Write Claude Desktop configuration docs
- [ ] Remove hardcoded DEV_SKILLS_PATH from config.ts

## Phase 6: Testing & Quality

- [ ] Add unit tests for skill loader
- [ ] Add unit tests for tool handlers
- [ ] Add integration tests for MCP protocol
- [ ] Set up CI/CD pipeline
- [ ] Add ESLint and Prettier configuration

## Improvements (Lower Priority)

- [ ] Add tool descriptions to MCP registration
- [ ] Add workflow bundle tools
- [ ] Add `pm_search_skills` tool with keyword search
