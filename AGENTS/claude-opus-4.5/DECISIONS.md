# PM-Skills MCP - Technical Decisions

## 2026-01-17: Phase 1 Implementation

### Decision 1: Dynamic Skill Loading

**Context:** The implementation plan suggested individual tool files for each skill.

**Decision:** Use dynamic loading from pm-skills repository instead.

**Rationale:**
- All 24 skills automatically available without manual tool creation
- Single code path for all skills reduces maintenance
- Easier to add new skills - just add to pm-skills repo

### Decision 2: Zod Schemas for MCP SDK

**Context:** Initial implementation used JSON Schema objects for tool parameters.

**Decision:** Use Zod schema objects directly with MCP SDK's `tool()` method.

**Rationale:**
- MCP TypeScript SDK expects `ZodRawShapeCompat` for parameter schemas
- Zod provides runtime validation in addition to type safety

### Decision 3: HTML Comment Stripping

**Context:** SKILL.md files have `<!-- PM-Skills | ... -->` comments before frontmatter.

**Decision:** Strip leading HTML comments before parsing with gray-matter.

**Rationale:**
- gray-matter requires frontmatter to start at beginning of file
- Simple regex solution: `/^\s*<!--[\s\S]*?-->\s*/g`

### Decision 4: Development Fallback Path

**Context:** During development, embedded skills directory doesn't exist.

**Decision:** Check for embedded path first, fall back to pm-skills repo path.

**Note:** Hardcoded path should be removed before distribution.
