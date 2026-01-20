# PM-Skills-MCP Planning Approach Discussion

> **Date:** 2026-01-16
> **Model:** Claude Opus 4.5
> **Context:** Pre-implementation planning for pm-skills-mcp

---

## User Prompt #1

> Review the following instructions and resources:
> ---
> Continue implementing pm-skills-mcp. The implementation plan is approved at:
> _NOTES/efforts/plan-v1/mcp-implementation-plan_claude-opus-4.5.md
>
> Start with Phase 1:
> 1. Install dependencies (@modelcontextprotocol/sdk, gray-matter, zod)
> 2. Create MCP server scaffold (src/index.ts, server.ts, config.ts)
> 3. Implement skill loader to parse SKILL.md frontmatter
> 4. Create first working tool (pm_prd) as proof of concept
>
> Skills to embed: E:\Projects\product-on-purpose\pm-skills\skills\
> ---
> Do not start the effort yet, I need to learn:
>
> What is the best way to manage this work? End of session updates to the plan file? Github issues with meta / tags / labels? Something else?

---

## Assistant Response #1

Good question to ask before diving in. Here are the main approaches, with trade-offs:

### Option 1: Plan File Updates
Update `_NOTES/efforts/plan-v1/mcp-implementation-plan_claude-opus-4.5.md` at end of each session.

**Pros:**
- Single source of truth
- Already exists and is approved
- Stays internal (gitignored `_NOTES/`)
- No context switching between tools

**Cons:**
- No linking to commits/PRs
- Harder to track granular tasks
- History is implicit in file diffs

---

### Option 2: GitHub Issues
Create issues for each phase/task with labels like `phase-1`, `mcp-server`, etc.

**Pros:**
- Links naturally to PRs and commits
- Public visibility for contributors
- Built-in progress tracking (open/closed)
- Good for async collaboration

**Cons:**
- Overhead for a focused implementation sprint
- Fragments context across issues

---

### Option 3: Hybrid (Recommended)
- **Plan file** tracks phase-level progress and decisions
- **GitHub issues** only for discrete bugs/features that emerge
- **Session logs** via `wrap-session` skill for handoff context

This keeps the plan as your north star while using issues sparingly for things that need external tracking.

---

### Questions to Decide

1. Is anyone else collaborating on this implementation, or is it solo?
2. Do you want public progress visibility, or is internal tracking sufficient?
3. How many sessions do you expect this to span?

What's your situation?

---

## User Prompt #2

> This is a solo project.
> I don't want public progress visibility, internal tracking is sufficient.
> No clue whatsoever.
>
> Are there other repos or tools that are helpful for solving this?

---

## Assistant Response #2

Given solo + internal tracking, keep it simple:

**Recommendation: Plan file + wrap-session**
- Update the plan file when you complete phases
- Run `/wrap-session` at end of each session for handoff context
- Skip GitHub issues unless something specific needs tracking

---

### Research: Helpful Resources for MCP Development

#### Web Search Results

**Official TypeScript SDK**

The official TypeScript SDK at `modelcontextprotocol/typescript-sdk` contains:
- MCP server libraries (tools/resources/prompts, Streamable HTTP, stdio, auth helpers)
- MCP client libraries (transports, high-level helpers, OAuth helpers)
- Runnable examples under the `examples/` directory

Installation:
```bash
npm install @modelcontextprotocol/server zod
npm install @modelcontextprotocol/client zod
```

**Key Features & Transports**

For most use cases you will use `McpServer` from `@modelcontextprotocol/server` and choose a transport. Streamable HTTP is the modern, fully featured transport that supports both stateless and stateful modes.

- **Tools** let LLMs ask your server to take actions (computation, side effects, network calls)
- **Resources** expose read-only data that clients can surface to users or models
- **Prompts** are reusable templates that help users talk to models in a consistent way

**Basic Server Code Structure**

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({
  name: "My Server",
  version: "1.0.0",
});
```

**Important Notes**

When implementing STDIO-based MCP servers, never write to standard output (stdout) as this will corrupt the JSON-RPC messages and break your server.

---

#### Local Resources Found

**awesome-claude-skills/mcp-builder/reference/**

Two highly relevant reference files were found in the workspace:

1. **node_mcp_server.md** - Complete TypeScript implementation guide covering:
   - Project structure
   - Tool registration patterns
   - Zod schema validation
   - Response formatting (JSON/Markdown)
   - Error handling
   - Pagination
   - Complete working examples

2. **mcp_best_practices.md** - Comprehensive guidelines covering:
   - Server naming conventions
   - Tool naming and design
   - Response format guidelines
   - Pagination best practices
   - Character limits and truncation
   - Transport options (stdio, HTTP, SSE)
   - Security considerations
   - Testing requirements

---

#### Implementation Plan Review

The approved implementation plan at `_NOTES/efforts/plan-v1/mcp-implementation-plan_claude-opus-4.5.md` contains:

- **6 Phases**: Foundation, Tools, Resources, Prompts, Configuration, Testing
- **29 total tools**: 24 skills + 3 workflows + 2 utilities (search, validate)
- **75+ resources**: Skills, templates, examples
- **6 prompt templates**: Feature kickoff, lean validation, etc.

**Phase 1 Tasks:**
1. Initialize project dependencies
2. Create MCP server scaffold
3. Implement skill loader
4. Create base tool handler
5. Implement MCP error schema

**Phase 1 Deliverables:**
- Working MCP server that starts and connects
- Skill loader that reads all 24 skills
- One sample tool (`prd`) fully functional

---

## Final Recommendation

### Resources for Building pm-skills-mcp

#### Official References
- [Official TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) - main library
- [Build Server Tutorial](https://modelcontextprotocol.io/docs/develop/build-server) - official walkthrough
- [SDK Docs - server.md](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/server.md) - detailed server docs

#### Already in Your Workspace
Excellent reference material in `awesome-claude-skills/mcp-builder/reference/`:
- `node_mcp_server.md` - complete TypeScript implementation guide with patterns
- `mcp_best_practices.md` - naming, pagination, error handling, security

These two files cover everything needed: project structure, Zod schemas, tool registration, response formatting, error handling, and quality checklists.

#### Community Tutorials
- [FreeCodeCamp TypeScript MCP Guide](https://www.freecodecamp.org/news/how-to-build-a-custom-mcp-server-with-typescript-a-handbook-for-developers/)
- [Star Wars API Example](https://dev.to/glaucia86/from-zero-to-mcp-building-a-model-context-protocol-server-with-typescript-and-the-star-wars-api-1kdi)

---

### Work Management Decision

Given: **solo + internal tracking + unknown duration**

**Keep it simple:**
1. **Plan file** (`_NOTES/efforts/plan-v1/mcp-implementation-plan_claude-opus-4.5.md`) - mark phases complete as you go
2. **`/wrap-session`** at end of each session - creates handoff context for continuity

No GitHub issues needed. Start Phase 1 when ready.

---

*Exported from Claude Code conversation on 2026-01-16*
