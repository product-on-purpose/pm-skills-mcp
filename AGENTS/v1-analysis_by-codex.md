# PM-Skills MCP v1 Repository Review (Codex)

## Executive Summary
PM-Skills MCP is a TypeScript MCP server that packages the PM-Skills library into MCP tools, resources, and prompts, with a clear focus on DX and operational simplicity. The architecture is clean, with a small surface area for configuration, reasonable guardrails for output formatting, and a test suite that covers core behaviors. Key strengths are the predictable resource schema, strong workflow definitions, and a lightweight runtime. Primary risks center on silent partial loading, cache configuration persistence, and a few operational footguns around missing embedded skills and optional data.

## Repository Purpose and Scope
- **Purpose:** Expose 24 PM skills as MCP tools/resources/prompts, enabling any MCP client to generate PM artifacts with structured guidance.
- **Scope:** MCP server implementation, prompt workflows, skill loading and caching, validation utilities, and a packaging script for embedding skills.

Primary user-facing documentation and scope are laid out in `README.md`. The MCP server entry point and runtime behavior are defined in `src/index.ts` and `src/server.ts`.

## Architecture Overview

### High-Level Runtime Flow
1. CLI starts via `src/index.ts`, loads configuration, initializes `PMSkillsServer`, and connects to MCP over stdio. 
2. `PMSkillsServer.initialize()` loads all skills from disk (with caching), registers tools, workflows, prompts, and resources. 
3. Each skill is exposed as a tool, providing a formatted artifact scaffold based on requested output format. 

This flow keeps state minimal and defers orchestration to the MCP client.

### Key Modules
- **Entry Point:** `src/index.ts` (stdio transport, startup logging). 
- **Configuration:** `src/config.ts` (env var handling, defaults, cache config). 
- **Skill Loader & Cache:** `src/skills/loader.ts`, `src/cache.ts` (parses SKILL.md, reads templates/examples, TTL LRU cache). 
- **Tools:** `src/tools/handler.ts`, `src/tools/validator.ts`, `src/tools/schemas.ts` (input parsing, output formatting, validation). 
- **Resources:** `src/resources/index.ts` (URI-based access to instructions/templates/examples). 
- **Prompts:** `src/prompts/index.ts` (feature kickoff, lean validation, quick PRD). 
- **Workflows:** `src/workflows/index.ts` (bundles of skills for common PM flows). 

## Configuration & Operational Behavior

### Configuration Surface
`src/config.ts` defines:
- `PM_SKILLS_PATH` for explicit skill directory override.
- `PM_SKILLS_DEV_PATH` as a fallback for local development.
- `PM_SKILLS_PHASES` to scope phases.
- `PM_SKILLS_FORMAT` for default output format.
- `PM_SKILLS_INCLUDE_EXAMPLES` for example inclusion.
- `PM_SKILLS_CACHE_*` for TTL and cache size settings.

### Skills Loading & Caching
- Skills are discovered via `glob` on `**/SKILL.md` and parsed with `gray-matter`.
- Skill content is cached using a TTL LRU cache in `src/cache.ts`.
- The cache is global; once initialized, further config changes won’t alter the cache settings.

### Tools & Output Formatting
- Tool outputs are formatted in `src/tools/handler.ts` using three formats: `full`, `concise`, `template-only`.
- The “full” output includes instructions and template; “concise” includes template + checklist; “template-only” only template content.
- Checklists are extracted from skill instructions by pattern scanning for `## Quality Checklist`.

### Resource Model
- Resources are URI-based (`pm-skills://skills/...`, `pm-skills://templates/...`, `pm-skills://examples/...`) and resolved by `src/resources/index.ts`.
- Resources are registered under a single resource handler; no server-side resource listing is enforced beyond `list_resources` tool.

### Prompt & Workflow Bundles
- Prompts cover three flows: feature kickoff, lean validation, quick PRD.
- Workflow bundles define step sequences with purpose and input guidance; orchestration is delegated to the client.

## Testing & Tooling
- **Testing:** Vitest (`tests/`), 7 test files covering loader, cache, workflows, prompts, validator, handler, and server initialization. 
- **Lint/Format:** ESLint and Prettier scripts in `package.json`. 
- **Build:** `tsc` compile, `tsx` for dev.
- **Embedding:** `scripts/embed-skills.js` copies skills from the upstream pm-skills repo.

## Strengths
- **Clear separation of concerns:** configuration, data loading, tool formatting, and workflow/prompt definitions are cleanly segmented.
- **Predictable tool surface:** uniform tool schema and a consistent naming convention (`pm_*`, `pm_workflow_*`).
- **Resource schema clarity:** clean URI pattern with skill/phase/type match checking.
- **Practical utilities:** `pm_list_*`, `pm_search_skills`, and `pm_validate` are strong complement tools.
- **Test coverage alignment:** tests appear aligned with the core runtime behavior.

## Risks / Improvement Opportunities
1. **Silent partial loading of skills:** If skills are missing, server continues with zero or partial skills and only logs to stderr. For production use, a hard fail or warning tool output may be preferable.
2. **Cache configuration mutability:** `getSkillCache` only accepts config on first call; later config updates are ignored. If the server is reinitialized in-process, this could lead to unexpected cache behavior.
3. **Resource list vs. registration mismatch:** The resource handler is generic, but discovery relies on the `pm_list_resources` tool. Some MCP clients might expect `resources/list` behavior; consider registering a resource list as MCP supports.
4. **Search performance:** `pm_search_skills` optionally searches all instructions with `includes` scans. This is acceptable at 24 skills, but would not scale to large skill libraries without indexing.
5. **Validation heuristics:** The validator uses a heuristic 70% threshold and minimum line count. This is reasonable but may be too strict for concise or template-only outputs; consider format-aware validation.

## Suggested Next Steps (if pursuing v1+ enhancements)
- Add a guard to fail startup when no skills are found, with actionable error messaging.
- Allow cache config updates or explicitly document “cache config read once on boot” behavior.
- Register an explicit MCP resource list handler for better client interoperability.
- Consider format-aware validation and/or a “validate with template-only” mode.

## Appendix: File Map Snapshot
- **Entry Point:** `src/index.ts`
- **Server:** `src/server.ts`
- **Configuration:** `src/config.ts`
- **Skills & Cache:** `src/skills/loader.ts`, `src/cache.ts`
- **Tools & Validation:** `src/tools/handler.ts`, `src/tools/validator.ts`
- **Resources:** `src/resources/index.ts`
- **Prompts:** `src/prompts/index.ts`
- **Workflows:** `src/workflows/index.ts`
- **Tests:** `tests/*.test.ts`
- **Embedding Script:** `scripts/embed-skills.js`

