# Technical Decisions: pm-skills-mcp

**Last Updated:** 2026-01-20

## 2026-01-20: Open-Source Governance Configuration

### Context
Repository needed to be audited and aligned with open-source best practices, using pm-skills as the reference standard.

### Decisions Made

#### 1. Security Policy (SECURITY.md)
**Decision:** Adapted pm-skills security policy for MCP server context.
**Rationale:**
- Same 48h/72h response SLA as pm-skills
- Added MCP-specific security concerns (prompt injection, path traversal, input validation)
- Directed users to GitHub's private vulnerability reporting

#### 2. Dependabot Configuration
**Decision:** Fixed npm package ecosystem directory from `/.github/scripts` to `/`.
**Rationale:**
- pm-skills has npm dependencies in `.github/scripts/` (issue creation scripts)
- pm-skills-mcp has npm dependencies at root `/` (it's an npm package)
- Original config was incorrectly copied from pm-skills pattern

#### 3. Issue Templates
**Decision:** Created templates that distinguish between MCP server issues and upstream skill issues.
**Rationale:**
- Skill content issues should go to pm-skills repo
- MCP server implementation issues stay in pm-skills-mcp
- config.yml includes link to upstream repo for skill-related issues

#### 4. CodeQL Workflow
**Decision:** Configured for `javascript-typescript` language (not just `javascript`).
**Rationale:**
- pm-skills uses `javascript` (markdown templates, minimal JS)
- pm-skills-mcp is a TypeScript project
- TypeScript analysis provides better security scanning for typed code

#### 5. .gitignore Additions
**Decision:** Added patterns for `.obsidian`, `.claude/settings.local.json`, `AGENTS/*/` working files, `coverage/`.
**Rationale:**
- Aligns with pm-skills standard patterns
- Prevents personal tooling config from being committed
- Agent working files (SESSION-LOG, TODO, PLANNING) are transient
