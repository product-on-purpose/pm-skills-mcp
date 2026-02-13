# PM-Skills MCP Architecture

This document describes the internal architecture of pm-skills-mcp for contributors and advanced users who want to understand how the server works.

---

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Components](#components)
  - [Entry Point (index.ts)](#entry-point-indexts)
  - [Server (server.ts)](#server-serverts)
  - [Skill Loader (skills/)](#skill-loader-skills)
  - [Tool Handler (tools/)](#tool-handler-tools)
  - [Resource Server (resources/)](#resource-server-resources)
  - [Prompt Server (prompts/)](#prompt-server-prompts)
  - [Workflow Bundles (workflows/)](#workflow-bundles-workflows)
  - [Cache Layer (cache.ts)](#cache-layer-cachets)
  - [Configuration (config.ts)](#configuration-configts)
  - [Types (types/)](#types-types)
- [Data Flow](#data-flow)
- [MCP Protocol Integration](#mcp-protocol-integration)
- [Extension Points](#extension-points)
- [Performance Considerations](#performance-considerations)
- [Testing Architecture](#testing-architecture)

---

## Overview

PM-Skills MCP is a Model Context Protocol server that exposes product management skills as programmatically accessible tools. It follows a modular architecture with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                    MCP Client                               │
│              (Claude Desktop, Cursor, etc.)                 │
└──────────────────────────┬──────────────────────────────────┘
                           │ MCP Protocol (stdio)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    pm-skills-mcp Server                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐       │
│   │ Tool Handler│   │Resource Srv │   │ Prompt Srv  │       │
│   │  (36 tools) │   │(72 resources│   │ (3 prompts) │       │
│   └──────┬──────┘   └──────┬──────┘   └──────┬──────┘       │
│          │                 │                 │              │
│          └─────────────────┼─────────────────┘              │
│                            │                                │
│                            ▼                                │
│               ┌─────────────────────────┐                   │
│               │      Skill Loader       │                   │
│               │   (skills/loader.ts)    │                   │
│               └────────────┬────────────┘                   │
│                            │                                │
│                            ▼                                │
│               ┌─────────────────────────┐                   │
│               │      Cache Layer        │                   │
│               │      (cache.ts)         │                   │
│               └────────────┬────────────┘                   │
│                            │                                │
│                            ▼                                │
│               ┌─────────────────────────┐                   │
│               │   Embedded/Custom Skills │                   │
│               │      (skills/ dir)      │                   │
│               └─────────────────────────┘                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## System Architecture

### High-Level Components

| Component | Location | Responsibility |
|-----------|----------|----------------|
| Entry Point | `src/index.ts` | Initialize server, connect transport |
| Server | `src/server.ts` | MCP server implementation, tool registration |
| Skill Loader | `src/skills/` | Parse and cache skill files |
| Tool Handler | `src/tools/` | Tool invocation logic, output formatting |
| Resource Server | `src/resources/` | Expose skills as MCP resources |
| Prompt Server | `src/prompts/` | Conversation prompts for workflows |
| Workflows | `src/workflows/` | Multi-skill workflow bundles |
| Cache | `src/cache.ts` | In-memory skill caching |
| Config | `src/config.ts` | Environment and default configuration |
| Types | `src/types/` | TypeScript type definitions |

### Directory Structure

```
src/
├── index.ts              # Entry point
├── server.ts             # MCP server implementation (main class)
├── config.ts             # Configuration management
├── cache.ts              # Skill caching layer
├── skills/
│   └── loader.ts         # Skill file parsing and loading
├── tools/
│   ├── handler.ts        # Tool request handling, output building
│   ├── schemas.ts        # JSON Schema for tool parameters
│   └── validator.ts      # Artifact validation logic
├── resources/
│   └── index.ts          # MCP resource handlers
├── prompts/
│   └── index.ts          # MCP prompt definitions
├── workflows/
│   └── index.ts          # Workflow bundle logic
└── types/
    └── index.ts          # Shared TypeScript interfaces
```

---

## Components

### Entry Point (index.ts)

**Responsibility:** Bootstrap the server and connect to stdio transport.

**Flow:**
1. Load configuration from environment
2. Create `PMSkillsServer` instance
3. Call `initialize()` to load skills and register tools
4. Create stdio transport
5. Connect server to transport
6. Begin listening for MCP protocol messages

```typescript
// Simplified flow
const config = loadConfig();
const server = new PMSkillsServer(config);
await server.initialize();
const transport = new StdioServerTransport();
await server.getServer().connect(transport);
```

### Server (server.ts)

**Responsibility:** Core MCP server implementation.

**Key class:** `PMSkillsServer`

**Initialization sequence:**
1. Load all skills via `loadAllSkills()`
2. Register a tool for each skill using stable `pm_*` names derived from skill names (phase prefix removed)
3. Register utility tools (list, search, validate)
4. Register workflow bundle tools
5. Register MCP prompts
6. Register MCP resources

**Tool registration pattern:**
```typescript
registerSkillTool(skill: Skill): void {
  const toolName = deriveToolName(skill.name); // e.g., deliver-prd -> pm_prd
  this.server.tool(toolName, schema, async (args) => {
    // Build and return skill output
  });
}
```

**State management:**
- `skills: Map<string, Skill>` — Loaded skills indexed by name
- `config: ServerConfig` — Server configuration
- `resourceCount`, `workflowCount`, `promptCount` — Registration counters

### Skill Loader (skills/)

**Responsibility:** Discover, parse, and cache skill files.

**Key file:** `loader.ts`

**Functions:**
| Function | Purpose |
|----------|---------|
| `loadAllSkills(config)` | Load all skills from configured path |
| `listSkills()` | Return list of loaded skill metadata |
| `getCacheStats()` | Return cache hit/miss statistics |

**Skill discovery:**
1. Recursively scan `{skillsPath}/**/SKILL.md`
2. For each skill directory:
   - Parse `SKILL.md` (required)
   - Parse `references/TEMPLATE.md` (optional)
   - Parse `references/EXAMPLE.md` (optional)
3. Extract YAML frontmatter from SKILL.md
4. Derive phase from frontmatter (fallback: skill-name prefix)
5. Build `Skill` object with parsed content

**YAML frontmatter parsing:**
```yaml
---
name: prd
description: Create a Product Requirements Document
version: 1.0.0
category: deliver
tags:
  - requirements
  - planning
---
```

### Tool Handler (tools/)

**Responsibility:** Handle tool invocations and format output.

**Key files:**
| File | Purpose |
|------|---------|
| `handler.ts` | Build tool output from skill content |
| `schemas.ts` | JSON Schema definitions for tool parameters |
| `validator.ts` | Validate artifacts against skill templates |

**Tool parameters (from schemas.ts):**
```typescript
interface SkillToolInput {
  topic: string;           // Required: What to create artifact for
  context?: string;        // Additional requirements
  format?: 'full' | 'concise' | 'template-only';
  includeExample?: boolean;
}
```

**Output building (handler.ts):**
```typescript
buildToolOutput(skill: Skill, input: SkillToolInput): string {
  // Combine skill instructions, template, and optional example
  // Format based on input.format
  // Return formatted string for AI consumption
}
```

**Validation (validator.ts):**
- Compares artifact against skill template
- Checks for required sections
- Returns validation result with suggestions

### Resource Server (resources/)

**Responsibility:** Expose skills as MCP resources via URI.

**URI scheme:**
```
pm-skills://skills/{skill}      → Full skill instructions
pm-skills://templates/{skill}   → Template only
pm-skills://examples/{skill}    → Example only
```

**Registration:**
```typescript
registerResources(server: McpServer, skills: Map<string, Skill>): number {
  // For each skill, register 3 resources:
  // - skill instructions
  // - template
  // - example
  // Return total resource count
}
```

**Resource read handler:**
```typescript
server.resource(uri, async () => {
  // Parse URI to determine type and skill
  // Return appropriate content
});
```

### Prompt Server (prompts/)

**Responsibility:** Provide guided conversation prompts.

**Available prompts:**
| Prompt | Purpose |
|--------|---------|
| `feature-kickoff` | Complete feature development workflow |
| `lean-validation` | Build-measure-learn cycle |
| `quick-prd` | Fast requirements creation |

**Prompt structure:**
```typescript
interface Prompt {
  name: string;
  description: string;
  arguments: { name: string; description: string }[];
  template: (args: Record<string, string>) => string;
}
```

**Registration:**
```typescript
registerPrompts(server: McpServer): number {
  // Register each prompt with the server
  // Return prompt count
}
```

### Workflow Bundles (workflows/)

**Responsibility:** Chain multiple skills into guided sequences.

**Available workflows:**
| Workflow | Skills Sequence |
|----------|-----------------|
| `feature-kickoff` | problem-statement → hypothesis → solution-brief → prd → user-stories |
| `lean-startup` | hypothesis → experiment-design → experiment-results → pivot-decision |
| `quick-prd` | problem-statement → prd |
| `experiment-cycle` | hypothesis → experiment-design → experiment-results → lessons-log |
| `triple-diamond` | All 24 skills in order |

**Workflow execution:**
```typescript
formatWorkflowOutput(bundleName: string, topic: string): string {
  // Get workflow definition
  // Build output with ordered skill sequence
  // Return formatted guidance
}
```

### Cache Layer (cache.ts)

**Responsibility:** Cache parsed skills to avoid re-reading files.

**Caching strategy:**
- Skills loaded once at startup
- Cached in memory (`Map<string, Skill>`)
- No TTL (skills don't change during runtime)
- Cache stats available via `pm_cache_stats` tool

**Cache interface:**
```typescript
interface SkillCache {
  get(key: string): Skill | undefined;
  set(key: string, skill: Skill): void;
  stats(): { hits: number; misses: number; size: number };
}
```

### Configuration (config.ts)

**Responsibility:** Load and validate server configuration.

**Configuration sources (priority order):**
1. Environment variables
2. Default values

**Environment variables:**
| Variable | Default | Description |
|----------|---------|-------------|
| `PM_SKILLS_PATH` | (embedded) | Path to skills directory |
| `PM_SKILLS_FORMAT` | `full` | Default output format |
| `PM_SKILLS_EXAMPLES` | `false` | Include examples by default |

**Server info:**
```typescript
export const SERVER_INFO = {
  name: 'pm-skills-mcp',
  version: '2.1.0',
};
```

### Types (types/)

**Responsibility:** Shared TypeScript type definitions.

**Key types:**
```typescript
interface Skill {
  name: string;
  description: string;
  version?: string;
  category: string;
  tags: string[];
  instructions: string;
  template: string;
  example: string;
}

interface ServerConfig {
  skillsPath: string;
  defaultFormat: 'full' | 'concise' | 'template-only';
  includeExamples: boolean;
}

interface ToolInput {
  topic: string;
  context?: string;
  format?: 'full' | 'concise' | 'template-only';
  includeExample?: boolean;
}
```

---

## Data Flow

### Tool Invocation Flow

```
┌──────────────┐
│  MCP Client  │
│  (tool call) │
└──────┬───────┘
       │ tools/call: pm_prd { topic: "search" }
       ▼
┌──────────────────────────────────────────────────────────┐
│                    PMSkillsServer                         │
│                                                          │
│  1. Receive tool call via MCP protocol                   │
│  2. Look up skill in this.skills Map                     │
│  3. Call buildToolOutput(skill, input)                   │
│     ├─ Format skill instructions                         │
│     ├─ Include template                                  │
│     └─ Optionally include example                        │
│  4. Return formatted content                             │
│                                                          │
└──────────────────────────────────────────────────────────┘
       │
       ▼ Tool result (skill content)
┌──────────────┐
│  MCP Client  │
│  (generates  │
│   artifact)  │
└──────────────┘
```

### Resource Access Flow

```
┌──────────────┐
│  MCP Client  │
│  (resource)  │
└──────┬───────┘
       │ resources/read: pm-skills://templates/deliver-prd
       ▼
┌──────────────────────────────────────────────────────────┐
│                    PMSkillsServer                         │
│                                                          │
│  1. Parse URI to extract: type=templates, skill=prd      │
│  2. Look up skill in this.skills Map                     │
│  3. Return skill.template content                        │
│                                                          │
└──────────────────────────────────────────────────────────┘
       │
       ▼ Resource content (template markdown)
┌──────────────┐
│  MCP Client  │
└──────────────┘
```

### Initialization Flow

```
main()
  │
  ├─► loadConfig()
  │     └─ Read environment variables
  │
  ├─► new PMSkillsServer(config)
  │
  ├─► server.initialize()
  │     │
  │     ├─► loadAllSkills(config)
  │     │     ├─ Scan skills directory
  │     │     ├─ Parse each skill's files
  │     │     ├─ Cache parsed skills
  │     │     └─ Return Map<string, Skill>
  │     │
  │     ├─► registerSkillTool() × 24
  │     │
  │     ├─► registerUtilityTools() × 7
  │     │
  │     ├─► registerWorkflowTools() × 5
  │     │
  │     ├─► registerPrompts() × 3
  │     │
  │     └─► registerResources() × 72
  │
  ├─► new StdioServerTransport()
  │
  └─► server.connect(transport)
        └─ Begin listening for MCP messages
```

---

## MCP Protocol Integration

### Transport

PM-Skills MCP uses **stdio transport**:
- Input: stdin (JSON-RPC messages from client)
- Output: stdout (JSON-RPC responses to client)
- Logs: stderr (diagnostic output)

### Capabilities Advertised

```json
{
  "capabilities": {
    "tools": {
      "listChanged": false
    },
    "resources": {
      "listChanged": false
    },
    "prompts": {
      "listChanged": false
    }
  }
}
```

### Protocol Flow

```
Client                              Server
  │                                    │
  ├─── initialize ────────────────────►│
  │◄── initializeResult ───────────────┤
  │                                    │
  ├─── tools/list ────────────────────►│
  │◄── tools/list result (36 tools) ───┤
  │                                    │
  ├─── tools/call (pm_prd) ───────────►│
  │◄── tool result (skill content) ────┤
  │                                    │
  ├─── resources/list ────────────────►│
  │◄── resources/list (72 resources) ──┤
  │                                    │
  ├─── resources/read (uri) ──────────►│
  │◄── resource content ───────────────┤
  │                                    │
```

---

## Extension Points

### Adding New Tools

1. **Create tool handler** in `src/tools/`:
   ```typescript
   export function handleMyTool(args: MyToolArgs): string {
     // Tool logic
     return result;
   }
   ```

2. **Register in server.ts**:
   ```typescript
   this.server.tool('pm_my_tool', schema, async (args) => {
     return handleMyTool(args);
   });
   ```

3. **Add tests** in `tests/`

### Adding New Workflows

1. **Define workflow** in `src/workflows/index.ts`:
   ```typescript
   const MY_WORKFLOW: WorkflowBundle = {
     name: 'my-workflow',
     description: 'My custom workflow',
     skills: ['skill-1', 'skill-2', 'skill-3'],
   };
   ```

2. **Register in WORKFLOW_BUNDLES** array

3. **Tool is automatically registered** as `pm_workflow_my_workflow`

### Adding New Resources

1. **Define URI pattern** in `src/resources/index.ts`

2. **Add resource handler**:
   ```typescript
   server.resource(`pm-skills://my-resource/{id}`, async (uri) => {
     const id = parseUri(uri);
     return getMyResource(id);
   });
   ```

### Custom Skill Loading

Override the embedded skills:
1. Set `PM_SKILLS_PATH` environment variable
2. Point to directory with valid skill structure
3. Server loads from custom path instead of embedded

---

## Performance Considerations

### Startup Performance

| Operation | Typical Time |
|-----------|--------------|
| Load config | < 1ms |
| Scan skills directory | 10-30ms |
| Parse 24 skills | 50-100ms |
| Register tools/resources | 10-20ms |
| **Total startup** | **100-200ms** |

### Runtime Performance

- **Tool invocation:** < 1ms (skill already cached)
- **Resource read:** < 1ms (content in memory)
- **No file I/O after startup** (except custom skills path with file watching disabled)

### Memory Usage

- Base server: ~20MB
- Cached skills: ~2-5MB (24 skills × ~100KB each)
- Total: ~25MB typical

### Optimization Strategies

1. **Lazy loading** (not implemented)
   - Could load skills on first access
   - Trade-off: slower first invocation

2. **File watching** (not implemented)
   - Could watch for skill file changes
   - Trade-off: complexity, memory for watchers

3. **Skill compilation** (not implemented)
   - Could pre-compile skills at build time
   - Trade-off: build complexity

---

## Testing Architecture

### Test Structure

```
tests/
├── loader.test.ts        # Skill loading and parsing
├── handler.test.ts       # Tool invocation handling
├── validator.test.ts     # Artifact validation
├── prompts.test.ts       # Prompt registration
├── workflows.test.ts     # Workflow bundle logic
├── cache.test.ts         # Cache behavior
└── server.test.ts        # Server initialization
```

### Test Categories

| Category | What's Tested |
|----------|---------------|
| Unit | Individual functions (loader, handler, validator) |
| Integration | Component interaction (server + loader) |
| Protocol | MCP message handling |

### Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Generate coverage report
```

### Test Configuration

- **Framework:** Vitest
- **Config:** `vitest.config.ts`
- **Coverage target:** Core functions (loader, handler, validator)

---

## Related Documentation

- [Getting Started](./getting-started.md) — User setup guide
- [Integration Guide](./integration-guide.md) — Client configuration
- [Customization Guide](./customization.md) — Using custom skills
- [MCP Specification](https://modelcontextprotocol.io) — Protocol details
- [Contributing](../CONTRIBUTING.md) — How to contribute

---

*Questions about architecture? [Open an issue](https://github.com/product-on-purpose/pm-skills-mcp/issues) or [start a discussion](https://github.com/product-on-purpose/pm-skills-mcp/discussions).*
