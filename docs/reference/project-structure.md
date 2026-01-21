# Project Structure

This document provides a comprehensive overview of the PM-Skills MCP repository structure. For a quick overview, see the [README.md](../../README.md#project-structure).

## Directory Overview

```
pm-skills-mcp/
├── src/                      # TypeScript source code
├── skills/                   # Embedded PM skills (from pm-skills)
├── tests/                    # Vitest test suites
├── scripts/                  # Build and utility scripts
├── dist/                     # Compiled JavaScript output
├── docs/                     # Documentation
├── AGENTS/                   # AI agent session context
├── .github/                  # GitHub configuration
└── [root files]              # README, LICENSE, etc.
```

---

## `/src/` — TypeScript Source Code

The MCP server implementation, organized by responsibility.

### Core Files

| File | Purpose |
|------|---------|
| `index.ts` | Entry point. Initializes and starts the MCP server. |
| `server.ts` | Main MCP server implementation. Registers tools, resources, and prompts. |
| `config.ts` | Configuration management. Environment variables and defaults. |
| `cache.ts` | Skill caching layer. Improves performance by caching parsed skills. |

### Subdirectories

```
src/
├── index.ts              # Entry point
├── server.ts             # MCP server implementation
├── config.ts             # Configuration management
├── cache.ts              # Skill caching layer
├── skills/               # Skill loader and parser
├── tools/                # MCP tool handlers
├── resources/            # MCP resource handlers
├── prompts/              # MCP prompt definitions
├── workflows/            # Workflow bundle logic
└── types/                # TypeScript type definitions
```

#### `/src/skills/` — Skill Loader

| File | Purpose |
|------|---------|
| `loader.ts` | Parses skill files from the embedded skills directory. Handles SKILL.md, TEMPLATE.md, and EXAMPLE.md. |

#### `/src/tools/` — MCP Tools

| File | Purpose |
|------|---------|
| `handler.ts` | Tool request handler. Routes tool calls to appropriate skill processors. |
| `schemas.ts` | JSON Schema definitions for tool parameters. |
| `validator.ts` | Validates artifacts against skill templates. |

#### `/src/resources/` — MCP Resources

| File | Purpose |
|------|---------|
| `index.ts` | Resource handlers. Exposes skills, templates, and examples via URI. |

#### `/src/prompts/` — MCP Prompts

| File | Purpose |
|------|---------|
| `index.ts` | Prompt definitions. Guided conversation starters for workflows. |

#### `/src/workflows/` — Workflow Bundles

| File | Purpose |
|------|---------|
| `index.ts` | Workflow bundle logic. Chains multiple skills into guided sequences. |

#### `/src/types/` — TypeScript Types

| File | Purpose |
|------|---------|
| `index.ts` | Shared TypeScript interfaces and type definitions. |

---

## `/skills/` — Embedded PM Skills

Contains the 24 PM skills from [pm-skills](https://github.com/product-on-purpose/pm-skills), embedded at build time.

### Organization

Skills are organized by **Triple Diamond phase**:

| Directory | Phase | Purpose | Skills |
|-----------|-------|---------|--------|
| `skills/discover/` | Discover | Research & understanding | 3 |
| `skills/define/` | Define | Problem framing | 4 |
| `skills/develop/` | Develop | Solution exploration | 4 |
| `skills/deliver/` | Deliver | Specification & shipping | 5 |
| `skills/measure/` | Measure | Validation & data | 4 |
| `skills/iterate/` | Iterate | Learning & improvement | 4 |

### Skill Structure

Each skill follows the [Agent Skills Specification](https://agentskills.io/specification):

```
skills/{phase}/{skill-name}/
├── SKILL.md              # Instructions for AI (required)
└── references/
    ├── TEMPLATE.md       # Output structure (required)
    └── EXAMPLE.md        # Real-world example (required)
```

**Note:** Skills are copied from pm-skills during the build process via `scripts/embed-skills.js`. To customize skills, set the `PM_SKILLS_PATH` environment variable to point to your own skill directory.

---

## `/tests/` — Test Suites

Comprehensive test coverage using [Vitest](https://vitest.dev/).

| File | Tests | Coverage |
|------|-------|----------|
| `loader.test.ts` | Skill loading and parsing | Skill file discovery, YAML frontmatter, content extraction |
| `handler.test.ts` | Tool request handling | Tool routing, parameter validation, response formatting |
| `validator.test.ts` | Artifact validation | Template compliance, required sections, format checking |
| `prompts.test.ts` | Prompt registration | Prompt discovery, argument handling |
| `workflows.test.ts` | Workflow execution | Bundle chaining, step sequencing |
| `cache.test.ts` | Caching behavior | Cache hits/misses, invalidation, TTL |
| `server.test.ts` | Server initialization | MCP protocol compliance, tool registration |

**Total tests:** 47

### Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Generate coverage report
```

---

## `/scripts/` — Build Scripts

| Script | Purpose |
|--------|---------|
| `embed-skills.js` | Copies skills from pm-skills into the `skills/` directory during build. Supports custom skill paths via `PM_SKILLS_PATH`. |

---

## `/dist/` — Compiled Output

Contains compiled JavaScript files. Generated by `npm run build`.

```
dist/
├── index.js          # Compiled entry point
├── server.js         # Compiled server
└── ...               # All compiled modules
```

**Note:** This directory is gitignored but included in npm package.

---

## `/docs/` — Documentation

```
docs/
└── reference/
    └── project-structure.md  # This file
```

---

## `/AGENTS/` — AI Agent Context

Session continuity for AI coding assistants.

```
AGENTS/
└── claude-opus-4.5/
    ├── CONTEXT.md            # Current project state
    └── ...
```

This directory helps AI assistants maintain context across sessions. Not required for using PM-Skills MCP.

---

## `/.github/` — GitHub Configuration

```
.github/
├── workflows/
│   ├── ci.yml            # Continuous integration
│   ├── publish.yml       # npm publishing on release
│   └── codeql.yml        # Security scanning
├── ISSUE_TEMPLATE/       # Issue templates
├── PULL_REQUEST_TEMPLATE.md
└── dependabot.yml        # Dependency updates
```

### Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | Push/PR to main | Lint, type-check, test on Node 18/20/22 |
| `publish.yml` | GitHub Release | Publish to npm with provenance |
| `codeql.yml` | Push to main, weekly | Security vulnerability scanning |

---

## Root Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview, installation, usage |
| `AGENTS.md` | Universal agent discovery file |
| `CHANGELOG.md` | Version history ([Keep a Changelog](https://keepachangelog.com/) format) |
| `CONTRIBUTING.md` | Contribution guidelines |
| `CODE_OF_CONDUCT.md` | Community standards |
| `SECURITY.md` | Vulnerability reporting policy |
| `LICENSE` | Apache 2.0 license |
| `CLAUDE.md` | Project-specific instructions for Claude Code |
| `package.json` | npm package configuration |
| `tsconfig.json` | TypeScript configuration |
| `vitest.config.ts` | Test configuration |
| `eslint.config.js` | Linting rules |
| `.prettierrc` | Code formatting rules |

---

## MCP Server Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    MCP Client Request                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    index.ts (Entry Point)                    │
│                    Initializes server                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    server.ts (MCP Server)                    │
│         Registers tools, resources, prompts                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐       │
│   │   Tools     │   │  Resources  │   │   Prompts   │       │
│   │ handler.ts  │   │  index.ts   │   │  index.ts   │       │
│   └──────┬──────┘   └──────┬──────┘   └──────┬──────┘       │
│          │                 │                 │               │
│          └────────────────┼─────────────────┘               │
│                           │                                 │
│                           ▼                                 │
│   ┌─────────────────────────────────────────────────────┐   │
│   │              skills/loader.ts                        │   │
│   │         Loads and parses skill files                 │   │
│   └──────────────────────────┬──────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                   cache.ts                           │   │
│   │            Caches parsed skills                      │   │
│   └──────────────────────────┬──────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │           /skills/ (Embedded PM Skills)              │   │
│   │     24 skills × (SKILL.md + TEMPLATE + EXAMPLE)      │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## File Naming Conventions

| Pattern | Meaning |
|---------|---------|
| `UPPERCASE.md` | Root-level documentation (README, CHANGELOG, etc.) |
| `lowercase.ts` | TypeScript source files |
| `lowercase.test.ts` | Test files |
| `lowercase-with-dashes/` | Skill directories |
| `SKILL.md` | Skill instruction file (always uppercase) |
| `TEMPLATE.md` | Output template (always uppercase) |
| `EXAMPLE.md` | Example output (always uppercase) |

---

## Related Documentation

- [README.md](../../README.md) — Project overview and usage
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — How to contribute
- [PM-Skills Repository](https://github.com/product-on-purpose/pm-skills) — Source skill files
- [Model Context Protocol](https://modelcontextprotocol.io) — MCP specification
