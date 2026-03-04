<a id="readme-top"></a>

<h1 align="center">
  <a href="https://github.com/product-on-purpose/pm-skills-mcp">PM-Skills MCP</a>
  <br>
</h1>

<h4 align="center">Open-source MCP with /pm-skills included 25 best-practice product management skills plus workflows, instantly accessible to any AI via Model Context Protocol.</h4>

<p align="center">
  <a href="https://github.com/product-on-purpose/pm-skills-mcp/issues/new?labels=bug">Report a Bug</a>
  ·
  <a href="https://github.com/product-on-purpose/pm-skills-mcp/issues/new?labels=enhancement">Request a Feature</a>
  ·
  <a href="https://github.com/product-on-purpose/pm-skills-mcp/discussions">Ask a Question</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Project Status: Active">
  <a href="https://github.com/product-on-purpose/pm-skills-mcp/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=flat-square" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/pm-skills-mcp">
    <img src="https://img.shields.io/npm/v/pm-skills-mcp?style=flat-square&color=blue" alt="npm version">
  </a>
  <a href="#tools">
    <img src="https://img.shields.io/badge/tools-38-brightgreen.svg?style=flat-square" alt="Tools">
  </a>
  <a href="https://modelcontextprotocol.io">
    <img src="https://img.shields.io/badge/protocol-MCP-purple.svg?style=flat-square" alt="MCP">
  </a>
  <a href="https://github.com/product-on-purpose/pm-skills">
    <img src="https://img.shields.io/badge/powered_by-pm--skills-orange.svg?style=flat-square" alt="PM-Skills">
  </a>
  <a href="https://github.com/product-on-purpose/pm-skills-mcp/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/product-on-purpose/pm-skills-mcp/ci.yml?style=flat-square&label=CI" alt="CI Status">
  </a>
</p>

<!-- ========== NEW: Skill Library Cross-Reference Callout ========== -->
> **Want to customize skills or use slash commands?** This server is powered by [pm-skills](https://github.com/product-on-purpose/pm-skills)—the open-source skill library you can fork and modify.

<!-- ========== END NEW ========== -->

---

<p align="center">
  <a href="#the-big-idea">About</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#usage">Usage</a> •
  <a href="#project-status">Status</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#community">Community</a>
</p>

<details>
<summary><strong>Table of Contents</strong></summary>

- [The Big Idea](#the-big-idea)
  - [Why MCP?](#why-mcp)
  - [The Transformation](#the-transformation)
  - [Key Features](#key-features)
  - [Built with...](#built-with)
  - [Works for...](#works-for)
  - [Comparison: `pm-skills-mcp` (this repo) vs. `pm-skills`](#comparison-pm-skills-mcp-this-repo-vs-pm-skills)
- [Getting Started](#getting-started)
  - [NPM Global Install](#npm-global-install)
  - [From Source](#from-source)
  - [Quick Start by Platform](#quick-start-by-platform)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [How It Works](#how-it-works)
  - [Tools](#tools)
  - [The Skills](#the-skills)
  - [🔗 Workflow Bundles - *Multi-skill workflows*](#-workflow-bundles---multi-skill-workflows)
  - [🛠️ Utility Tools](#️-utility-tools)
  - [MCP Resources](#mcp-resources)
  - [Prompts](#prompts)
- [Guides](#guides)
- [Project Status](#project-status)
  - [Releases](#releases)
  - [Project Structure](#project-structure)
  - [Changelog](#changelog)
  - [Roadmap](#roadmap)
- [Development](#development)
  - [Testing](#testing)
  - [Code Quality](#code-quality)
  - [CI/CD](#cicd)
- [Security](#security)
- [Contributing](#contributing)
  - [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
- [About](#about)
  - [Author](#author)
  - [License](#license)
  - [Security](#security-1)
  - [Acknowledgments](#acknowledgments)
- [Community](#community)

</details>

---

**Quick Start** (NPM Global Install)

```bash
npm install -g pm-skills-mcp
```

---

## The Big Idea

**PM-Skills MCP** is an MCP server that transforms [PM-Skills](https://github.com/product-on-purpose/pm-skills)... a collection of 25 battle-tested product management skills... into programmatically accessible tools, resources, and prompts for any AI assistant that speaks the Model Context Protocol.

<!-- ========== ENHANCED: Additional ecosystem context ========== -->
PM-Skills MCP is built on [pm-skills](https://github.com/product-on-purpose/pm-skills), an open-source collection of 25 battle-tested product management skills. While pm-skills offers file-based access with slash commands and AGENTS.md discovery, pm-skills-mcp wraps those same skills in an MCP server for programmatic access.

**Not sure which to use?** See the [Comparison](#comparison) section below.
<!-- ========== END ENHANCED ========== -->

**_One connection. 25 skills. Any MCP client._**

### Why MCP?

The [Model Context Protocol](https://modelcontextprotocol.io) is an open standard that lets AI assistants connect to external tools and data sources. Instead of manually copying skill files or uploading ZIP archives, PM-Skills MCP gives your AI **direct, programmatic access** to the entire PM skill library.

### The Transformation

| File-Based Approach                | MCP-Powered Approach              |
| ---------------------------------- | --------------------------------- |
| Clone repo, navigate to skills     | `npx pm-skills-mcp` - done        |
| Copy/paste skill content into chat | AI invokes tools directly         |
| Manual template injection          | Automatic template retrieval      |
| Platform-specific slash commands   | Universal across all MCP clients  |
| Static markdown files              | Dynamic, parameterized tools      |
| Works in one IDE/client            | Works everywhere MCP is supported |

### Key Features

- **38 MCP Tools** - 25 PM skills + 5 workflow bundles + 8 utility tools
- **MCP Resources** - Skill instructions, templates, and examples via URI, with optional persona resources when enabled
- **3 MCP Prompts** - Guided conversation starters for common workflows
- **5 Workflow Bundles** - Pre-built multi-skill workflows for common scenarios
- **81 Automated Tests** - Comprehensive test coverage with Vitest
- **Zero Configuration** - Works out of the box with embedded skills
- **Universal Compatibility** - Claude Desktop, Cursor, Continue, and any MCP client
- **Customizable** - Override with your own skill modifications
- **Lightweight** - Minimal dependencies, fast startup
- **Security Scanning** - CodeQL analysis on every push

### Built with...

<p align="left">
  <a href="https://modelcontextprotocol.io">
    <img src="https://img.shields.io/badge/Model_Context_Protocol-1.0-purple?style=for-the-badge" alt="MCP">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  </a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  </a>
</p>

- **[Model Context Protocol](https://modelcontextprotocol.io)** - Open standard for AI tool connectivity
- **[PM-Skills](https://github.com/product-on-purpose/pm-skills)** - The 25 PM skills this server exposes
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe implementation
- **[Vitest](https://vitest.dev/)** - Fast, modern testing framework

### Works for...

PM-Skills MCP works with any client that supports the Model Context Protocol. Here's a quick overview:

#### Platform Compatibility

| Platform            | Status       | Integration Type      | Notes                              |
| ------------------- | ------------ | --------------------- | ---------------------------------- |
| **Claude Code**     | ✅ Native    | MCP Server            | Full tool access via CLI           |
| **Claude Desktop**  | ✅ Native    | MCP Server            | Recommended for best experience    |
| **Claude.ai**       | ✅ Native    | MCP Server (Projects) | Via MCP integration in Projects    |
| **Cursor**          | ✅ Native    | MCP Server            | AI-powered IDE                     |
| **VS Code**         | ✅ Native    | Via Cline/Continue    | Multiple MCP-compatible extensions |
| **Continue**        | ✅ Native    | MCP Server            | Open-source coding assistant       |
| **Cline**           | ✅ Native    | MCP Server            | VS Code extension                  |
| **Windsurf**        | ✅ Native    | MCP Server            | AI-native IDE                      |
| **GitHub Copilot**  | 🔶 Indirect | Via MCP-enabled tools | Use with Copilot Chat + MCP        |
| **OpenCode**        | 🔶 Indirect | Via MCP-compatible config | Use standard stdio MCP server pattern |
| **ChatGPT / Codex** | 🔶 Manual   | Copy skill content    | No native MCP support              |
| **Any MCP Client**  | ✅ Universal | Protocol-level        | Full compatibility                 |

See the [Integration Guide](docs/integration-guide.md) for detailed setup instructions for each platform.

### Comparison: `pm-skills-mcp` (this repo) vs. `pm-skills`

`PM-Skills` is available in two complementary forms:

|  | pm-skills-mcp (this repo) | [pm-skills](https://github.com/product-on-purpose/pm-skills) |
|---|---|---|
| **What it is** | MCP server wrapping the skill library | Skill library as markdown files |
| **Access method** | `npx pm-skills-mcp` | Git clone, ZIP upload |
| **Setup time** | 30 seconds | 2-5 minutes |
| **Skill invocation** | MCP tool calls | Slash commands (Claude Code) |
| **Auto-discovery** | MCP protocol (Claude Desktop, Cursor) | AGENTS.md (Copilot, Cursor, Windsurf) |
| **Template access** | URI-based resources | Navigate file system |
| **Workflow bundles** | Tool-based execution | Manual orchestration |
| **Customization** | Set `PM_SKILLS_PATH` to custom folder | Edit files directly |
| **Updates** | `npm update pm-skills-mcp` | `git pull` |

**Use `pm-skills-mcp` (this repo) when:**

- You want instant setup with `npx pm-skills-mcp`
- You're using Claude Desktop, Cursor, or any MCP client
- You want programmatic tool access without managing files
- You prefer consistent interfaces across different AI clients

**Use [pm-skills](https://github.com/product-on-purpose/pm-skills) (file-based) when:**

- You prefer slash commands in Claude Code (`/prd`, `/hypothesis`)
- You want to browse, read, and customize skill files directly
- You're using GitHub Copilot, OpenCode, or Windsurf without reliable MCP support
- You want to fork and heavily customize skills for your team

**Using Both Together:**
Fork [pm-skills](https://github.com/product-on-purpose/pm-skills) to customize skills, then point `pm-skills-mcp` to your fork:

```json
{
  "mcpServers": {
    "pm-skills": {
      "command": "npx",
      "args": ["pm-skills-mcp"],
      "env": {
        "PM_SKILLS_PATH": "/path/to/my/forked/pm-skills/skills"
      }
    }
  }
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting Started

This section covers quick installation. For a comprehensive walkthrough including core concepts, your first tool invocation, workflows, and troubleshooting, see the **[Getting Started Guide](docs/getting-started.md)**.

### NPM Global Install

```bash
npm install -g pm-skills-mcp
```

Run directly:

```bash
pm-skills-mcp
```

### From Source

```bash
git clone https://github.com/product-on-purpose/pm-skills-mcp.git
cd pm-skills-mcp
npm install
npm run build
npm start
```

### Quick Start by Platform

<details>
<summary><strong>Claude Desktop</strong></summary>

The recommended client for pm-skills-mcp. Add to your Claude Desktop configuration:

**Config file location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

**Configuration:**

```json
{
  "mcpServers": {
    "pm-skills": {
      "command": "npx",
      "args": ["pm-skills-mcp"]
    }
  }
}
```

Restart Claude Desktop. You now have access to all 25 PM skills as tools.

</details>

<details>
<summary><strong>Claude Code (CLI)</strong></summary>

Add to `.claude/settings.json` in your project or `~/.claude/settings.json` globally:

```json
{
  "mcpServers": {
    "pm-skills": {
      "command": "npx",
      "args": ["pm-skills-mcp"]
    }
  }
}
```

</details>

<details>
<summary><strong>Cursor</strong></summary>

Navigate to Settings → Features → MCP Servers, then add:

```json
{
  "pm-skills": {
    "command": "npx",
    "args": ["pm-skills-mcp"]
  }
}
```

Restart Cursor. The 25 PM skill tools will be available in AI chat.

</details>

<details>
<summary><strong>GitHub Copilot (MCP-enabled)</strong></summary>

Configure your Copilot MCP extension/integration with the same stdio server pattern:

```json
{
  "mcpServers": {
    "pm-skills": {
      "command": "npx",
      "args": ["pm-skills-mcp"]
    }
  }
}
```

If your Copilot surface does not currently expose MCP server configuration, use file-based
[pm-skills](https://github.com/product-on-purpose/pm-skills) with
[AGENTS.md](https://github.com/product-on-purpose/pm-skills/blob/main/AGENTS.md) as the fallback path.

</details>

<details>
<summary><strong>OpenCode (MCP-enabled)</strong></summary>

Use OpenCode's MCP server configuration with the standard `npx pm-skills-mcp` pattern:

```json
{
  "mcpServers": {
    "pm-skills": {
      "command": "npx",
      "args": ["pm-skills-mcp"]
    }
  }
}
```

If MCP is unavailable in your current OpenCode setup, use file-based
[pm-skills](https://github.com/product-on-purpose/pm-skills) and
[AGENTS.md](https://github.com/product-on-purpose/pm-skills/blob/main/AGENTS.md).

</details>

<details>
<summary><strong>VS Code (Cline / Continue)</strong></summary>

**With Cline:**
1. Install [Cline](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev) from VS Code Marketplace
2. Open Cline settings and configure MCP server:
   ```json
   {
     "pm-skills": {
       "command": "npx",
       "args": ["pm-skills-mcp"]
     }
   }
   ```

**With Continue:**
1. Install [Continue](https://marketplace.visualstudio.com/items?itemName=Continue.continue) from VS Code Marketplace
2. Configure MCP in Continue settings

</details>

<details>
<summary><strong>Other MCP Clients</strong></summary>

Any MCP-compatible client can use pm-skills-mcp. The general pattern:

1. Configure an MCP server with command `npx` and args `["pm-skills-mcp"]`
2. Restart the client
3. All 25 PM skills become available as tools

See the [Integration Guide](docs/integration-guide.md) for detailed instructions for all platforms.

</details>

### Configuration

#### Environment Variables

| Variable             | Default    | Description                     |
| -------------------- | ---------- | ------------------------------- |
| `PM_SKILLS_PATH`     | (embedded) | Path to custom skills directory |
| `PM_PERSONAS_PATH`   | (auto)     | Path to persona library resources |
| `PM_SKILLS_FORMAT`   | `full`     | Default output format           |
| `PM_SKILLS_INCLUDE_EXAMPLES` | `false` | Include examples by default |

#### Custom Skills Path

Override embedded skills with your customized versions:

```json
{
  "mcpServers": {
    "pm-skills": {
      "command": "npx",
      "args": ["pm-skills-mcp"],
      "env": {
        "PM_SKILLS_PATH": "/path/to/my/custom/skills"
      }
    }
  }
}
```

<!-- ========== NEW: Fork Workflow ========== -->
#### Using Custom Skills from a pm-skills Fork

If you've forked [pm-skills](https://github.com/product-on-purpose/pm-skills) to customize skills:

1. Clone your fork locally
2. Make changes to skills in `skills/{phase-skill}/` (e.g., `skills/deliver-prd/`)
3. Point pm-skills-mcp to your fork:

```json
{
  "mcpServers": {
    "pm-skills": {
      "command": "npx",
      "args": ["pm-skills-mcp"],
      "env": {
        "PM_SKILLS_PATH": "/path/to/my-pm-skills-fork/skills"
      }
    }
  }
}
```

See the [pm-skills authoring guide](https://github.com/product-on-purpose/pm-skills/blob/main/docs/guides/authoring-pm-skills.md) for skill modification guidelines.
<!-- ========== END NEW ========== -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Usage

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                    Your AI Assistant                        │
│              (Claude, Cursor, Continue, etc.)               │
└──────────────────────────┬──────────────────────────────────┘
                           │ MCP Protocol
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    pm-skills-mcp Server                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐       │
│   │   38 Tools  │   │  Resources  │   │  3 Prompts  │       │
│   │             │   │             │   │             │       │
│   │ • 25 skills │   │ • templates │   │ • kickoff   │       │
│   │ • 5 flows   │   │ • examples  │   │ • lean      │       │
│   │ • 8 utils   │   │ • skills    │   │ • quick-prd │       │
│   │             │   │             │   │             │       │
│   └─────────────┘   └─────────────┘   └─────────────┘       │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │              Embedded PM-Skills Library             │   │
│   │     25 skills × (SKILL.md + TEMPLATE + EXAMPLE)     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

1. **You ask** your AI to create a PRD, hypothesis, or any PM artifact
2. **AI invokes** the appropriate `pm_*` tool via MCP
3. **Server returns** skill instructions, template, and optionally an example
4. **AI generates** a professional-quality artifact following the skill framework

### Tools

PM-Skills MCP wraps each skill from [pm-skills](https://github.com/product-on-purpose/pm-skills) as an MCP tool. The **25 skill tools** (like `pm_prd`, `pm_hypothesis`) generate PM artifacts, while **5 workflow tools** and **8 utility tools** help you orchestrate and validate skill usage. See the [Comparison](#comparison) section for when to use MCP tools vs file-based slash commands.

Every skill tool accepts these parameters:

| Parameter | Required | Description |
|-----------|----------|-------------|
| `topic` | **Yes** | The subject or feature to create this artifact for. Be specific—"user authentication for mobile app" is better than "auth". |
| `context` | No | Additional requirements, constraints, or background. Use this for business context, technical constraints, or stakeholder needs. |
| `format` | No | Output verbosity: `full` (default, includes all guidance), `concise` (template + key points), or `template-only` (just structure). |
| `includeExample` | No | Set to `true` to include a completed example for reference. Helpful when learning a new skill. |

**Example invocations:**

```
# Basic usage
Use pm_prd with topic "user authentication for mobile app"

# With context
Use pm_hypothesis with topic "checkout abandonment" and context "We see 40%
cart abandonment. Hypothesis: users abandon due to required account creation."

# Request concise output with example
Use pm_user_stories with topic "dark mode" format "concise" includeExample true
```

### The Skills

#### 🔍 Discover Phase - *Find the right problem*

| Tool                      | Description                                 |
| ------------------------- | ------------------------------------------- |
| `pm_interview_synthesis`  | Turn user research into actionable insights |
| `pm_competitive_analysis` | Map the landscape, find opportunities       |
| `pm_stakeholder_summary`  | Understand who matters and what they need   |

#### 📋 Define Phase - *Frame the problem*

| Tool                   | Description                               |
| ---------------------- | ----------------------------------------- |
| `pm_problem_statement` | Crystal-clear problem framing             |
| `pm_hypothesis`        | Testable assumptions with success metrics |
| `pm_opportunity_tree`  | Teresa Torres-style outcome mapping       |
| `pm_jtbd_canvas`       | Jobs to be Done framework                 |

#### 💡 Develop Phase - *Explore solutions*

| Tool                  | Description                     |
| --------------------- | ------------------------------- |
| `pm_solution_brief`   | One-page solution pitch         |
| `pm_spike_summary`    | Document technical explorations |
| `pm_adr`              | Architecture Decision Records   |
| `pm_design_rationale` | Why you made that design choice |

#### 🚀 Deliver Phase - *Ship it*

| Tool                  | Description                                       |
| --------------------- | ------------------------------------------------- |
| `pm_prd`              | Comprehensive product requirements                |
| `pm_user_stories`     | INVEST-compliant stories with acceptance criteria |
| `pm_edge_cases`       | Error states, boundaries, recovery paths          |
| `pm_launch_checklist` | Never miss a launch step again                    |
| `pm_release_notes`    | User-facing release communication                 |

#### 📊 Measure Phase - *Validate with data*

| Tool                        | Description                         |
| --------------------------- | ----------------------------------- |
| `pm_experiment_design`      | Rigorous A/B test planning          |
| `pm_instrumentation_spec`   | Event tracking requirements         |
| `pm_dashboard_requirements` | Analytics dashboard specs           |
| `pm_experiment_results`     | Document learnings from experiments |

#### 🔄 Iterate Phase - *Learn and improve*

| Tool                  | Description                              |
| --------------------- | ---------------------------------------- |
| `pm_retrospective`    | Team retros that drive action            |
| `pm_lessons_log`      | Build organizational memory              |
| `pm_refinement_notes` | Capture backlog refinement outcomes      |
| `pm_pivot_decision`   | Evidence-based pivot/persevere framework |

#### 🧭 Foundation - *Cross-cutting capability*

| Tool         | Description                                                                  |
| ------------ | ---------------------------------------------------------------------------- |
| `pm_persona` | Generate product or marketing personas with explicit assumptions and evidence |

### 🔗 Workflow Bundles - *Multi-skill workflows*

| Tool                           | Effort        | Description                                        |
| ------------------------------ | ------------- | -------------------------------------------------- |
| `pm_workflow_feature_kickoff`  | standard      | problem → hypothesis → solution → PRD → stories    |
| `pm_workflow_lean_startup`     | comprehensive | hypothesis → experiment → results → pivot decision |
| `pm_workflow_triple_diamond`   | comprehensive | Full discovery to delivery sequence                |
| `pm_workflow_quick_prd`        | quick         | Fast problem → PRD workflow                        |
| `pm_workflow_experiment_cycle` | standard      | hypothesis → experiment → results → lessons        |

### 🛠️ Utility Tools

| Tool                | Description                                                      |
| ------------------- | ---------------------------------------------------------------- |
| `pm_list_skills`    | List all available PM skill tools                                |
| `pm_list_resources` | List all available MCP resources                                 |
| `pm_list_workflows` | List all workflow bundles with steps                             |
| `pm_list_prompts`   | List available conversation prompts                              |
| `pm_validate`       | Validate artifact against skill template                         |
| `pm_search_skills`  | Search skills by keyword across names, descriptions, and content |
| `pm_cache_stats`    | Show skill-cache hit rate, size, and TTL diagnostics            |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### MCP Resources

Access skill content directly via MCP resources:

```
pm-skills://skills/{skill}      → Full skill instructions
pm-skills://templates/{skill}   → Template only
pm-skills://examples/{skill}    → Worked example
```

**Examples:**

```
pm-skills://skills/deliver-prd
pm-skills://templates/define-hypothesis
pm-skills://examples/measure-experiment-design
```

> **Note:** Phase information is available in resource metadata.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Prompts

MCP prompts provide guided conversation starters for common workflows. Use `prompts/get` with the prompt name and a topic to begin.

| Prompt            | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| `feature-kickoff` | Complete feature kickoff: Problem → Hypothesis → Solution → PRD → Stories |
| `lean-validation` | Build-Measure-Learn cycle: Hypothesis → Experiment → Results → Pivot      |
| `quick-prd`       | Fast PRD creation when requirements are clear: Problem → PRD              |

**Usage example:**

```
prompts/get name="feature-kickoff" arguments={"topic": "dark mode support"}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Guides

Comprehensive documentation for setup, customization, and understanding pm-skills-mcp.

| Guide | Description |
|-------|-------------|
| **[Getting Started](docs/getting-started.md)** | Complete walkthrough from installation to your first tool invocation. Covers core concepts, platform-specific setup, workflows, and troubleshooting. |
| **[Integration Guide](docs/integration-guide.md)** | Detailed setup instructions for each MCP client (Claude Desktop, Cursor, Continue, Cline, etc.) with troubleshooting tips. |
| **[Customization Guide](docs/customization.md)** | How to use custom skills with pm-skills-mcp. Covers environment variable overrides, forking pm-skills, and creating new skills. |
| **[Migration Guide](docs/migration-guide.md)** | Moving between file-based pm-skills and MCP-based pm-skills-mcp. Includes command-to-tool mapping and hybrid approaches. |
| **[Architecture](docs/architecture.md)** | Technical deep-dive for contributors. Covers server internals, data flow, extension points, and performance considerations. |
| **[Repository Governance](docs/reference/repository-governance.md)** | Top-level ownership and tracked-vs-local persistence policy for contributors. |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Project Status

### Releases

All releases are available on the [GitHub Releases](https://github.com/product-on-purpose/pm-skills-mcp/releases) page.

**Install the latest version:**

```bash
npm install -g pm-skills-mcp
```

**Install a pinned release:**

```bash
npm install -g pm-skills-mcp@2.6.0
```

[![npm version](https://img.shields.io/npm/v/pm-skills-mcp?style=for-the-badge&label=npm)](https://www.npmjs.com/package/pm-skills-mcp)
[![GitHub Release](https://img.shields.io/github/v/release/product-on-purpose/pm-skills-mcp?style=for-the-badge&label=release)](https://github.com/product-on-purpose/pm-skills-mcp/releases/latest)

From `v2.4.0` onward, `pm-skills-mcp` directly tracks `pm-skills` release versions.
Pinned source compatibility metadata is declared in `pm-skills-source.json` for each release.

Latest release notes:
- [`docs/releases/Release_v2.6.0.md`](docs/releases/Release_v2.6.0.md)
- [`docs/releases/Release_v2.5.2.md`](docs/releases/Release_v2.5.2.md)
- [`docs/releases/Release_v2.5.1.md`](docs/releases/Release_v2.5.1.md)
- [`docs/releases/Release_v2.5.0.md`](docs/releases/Release_v2.5.0.md)
- [`docs/releases/Release_v2.4.3.md`](docs/releases/Release_v2.4.3.md)
- [`docs/releases/Release_v2.4.2.md`](docs/releases/Release_v2.4.2.md)
- [`docs/releases/Release_v2.4.1.md`](docs/releases/Release_v2.4.1.md)
- [`docs/releases/Release_v2.4.0.md`](docs/releases/Release_v2.4.0.md)
- Published release tag: [`v2.6.0`](https://github.com/product-on-purpose/pm-skills-mcp/releases/tag/v2.6.0)

### Project Structure
See [docs/reference/project-structure.md](docs/reference/project-structure.md) for detailed descriptions.

```
pm-skills-mcp/
├── src/                      # TypeScript source code
│   ├── index.ts              # Entry point
│   ├── server.ts             # MCP server implementation
│   ├── config.ts             # Configuration management
│   ├── cache.ts              # Skill caching layer
│   ├── skills/               # Skill loader and parser
│   ├── tools/                # MCP tool handlers (38 tools)
│   ├── resources/            # MCP resource handlers (skills/templates/examples + optional personas)
│   ├── prompts/              # MCP prompt definitions (3 prompts)
│   ├── workflows/            # Workflow bundle logic
│   └── types/                # TypeScript type definitions
├── skills/                   # Embedded PM skills (flat, copied from pm-skills v2.x)
│   ├── deliver-prd/          # Example: phase-prefixed skill directories
│   ├── define-hypothesis/    # Each skill has SKILL.md + references/
│   ├── discover-interview-synthesis/
│   └── ...                   # 25 skills total
├── docs/                     # Documentation
│   ├── getting-started.md    # Complete setup and first-use guide
│   ├── integration-guide.md  # Client-specific configuration
│   ├── customization.md      # Using custom skills with MCP
│   ├── migration-guide.md    # Moving between file-based and MCP
│   ├── architecture.md       # Technical internals for contributors
│   ├── releases/             # Shipped release notes
│   └── reference/            # Reference documentation
│       ├── project-structure.md
│       └── repository-governance.md
├── tests/                    # Vitest test suites (81 tests)
├── scripts/                  # Build and utility scripts
├── dist/                     # Compiled JavaScript output
├── .github/                  # CI/CD workflows
│   └── workflows/            # ci.yml, publish.yml, codeql.yml
├── pm-skills-source.json     # Pinned pm-skills repo/ref/version metadata
├── AGENTS.md                 # Agent discovery file
├── CONTRIBUTING.md           # Contribution guidelines
├── SECURITY.md               # Security policy
└── CHANGELOG.md              # Version history
```



### Changelog

See [CHANGELOG.md](CHANGELOG.md) for full version history.

| Version   | Date       | Highlights                                                    |
| --------- | ---------- | ------------------------------------------------------------- |
| **2.6.0** | 2026-03-04 | Maintenance release for `pm-skills v2.6.0` version/source-pin parity |
| **2.5.2** | 2026-03-04 | Public release-doc readability cleanup + 2.5.2 source-pin/runtime parity |
| **2.5.1** | 2026-03-04 | Canonical `AGENTS/claude` continuity path + 2.5.1 source-pin/runtime parity |
| **2.5.0** | 2026-03-02 | Persona tool support + taxonomy contract updates + 2.5.0 pin alignment |
| **2.4.3** | 2026-02-16 | Patch release to include post-`v2.4.2` documentation/release-link updates |
| **2.4.2** | 2026-02-16 | Governance + structure-doc alignment with pm-skills `v2.4.2` |
| **2.4.1** | 2026-02-16 | Patch version/pin parity with pm-skills `v2.4.1` |
| **2.4.0** | 2026-02-16 | Direct version tracking with pm-skills + pinned source metadata |
| **2.1.0** | 2026-01-27 | Flat skill structure alignment with pm-skills v2.x            |
| **1.1.0** | 2026-01-21 | Comprehensive documentation suite, platform compatibility     |
| **1.0.0** | 2026-01-21 | First stable release baseline with MCP tooling, resources, and caching |
| **0.1.2** | 2026-01-20 | CI/CD infrastructure, branch migration to main                |
| **0.1.1** | 2026-01-20 | GitHub Actions CI/CD, ESLint + Prettier, npm package setup    |
| **0.1.0** | 2026-01-20 | Initial implementation baseline for PM-skills MCP integration  |

### Roadmap

See the [open issues](https://github.com/product-on-purpose/pm-skills-mcp/issues) for planned features.

- [x] Core MCP server with all 25 PM skills
- [x] Workflow bundle tools
- [x] MCP resources for direct skill access
- [x] MCP prompts for guided workflows
- [x] Automated npm publishing
- [x] Skill versioning and compatibility tracking
- [ ] Additional workflow bundles
- [ ] Custom skill contribution support

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Development

### Testing

The project uses [Vitest](https://vitest.dev/) for testing with 81 tests across multiple test files.

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Test coverage includes:**

- Skill loader and parser
- Tool handler and response formatting
- Workflow bundle execution
- Prompt registration
- Output validation
- Server initialization

### Code Quality

```bash
# Lint with ESLint
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Format with Prettier
npm run format

# Check formatting
npm run format:check

# Type check
npx tsc --noEmit
```

### CI/CD

The project uses GitHub Actions for continuous integration and deployment:

**CI Workflow** (`.github/workflows/ci.yml`)

- Triggers on push/PR to `main`
- Tests on Node.js 18, 20, and 22
- Runs lint, format check, type check, and tests
- Clones pm-skills at the pinned ref from `pm-skills-source.json` and embeds skills for testing

**Publish Workflow** (`.github/workflows/publish.yml`)

- Triggers on GitHub release creation
- Auto-publishes to npm with provenance
- Uses npm automation token for authentication
- Embeds skills from the same pinned pm-skills ref declared in `pm-skills-source.json`

**CodeQL Workflow** (`.github/workflows/codeql.yml`)

- Security scanning for JavaScript/TypeScript
- Runs on push to main and weekly schedule

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Security

We take security seriously. This project includes:

- **CodeQL Analysis** - Automated security scanning on every push
- **Dependabot** - Automated dependency updates for npm and GitHub Actions
- **Vulnerability Reporting** - See [SECURITY.md](SECURITY.md) for our security policy

To report a vulnerability, please email security concerns privately rather than opening a public issue. See [SECURITY.md](SECURITY.md) for details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make will benefit everybody else and are **greatly appreciated**.

### How to Contribute

**Quick contribution steps:**

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes using [Conventional Commits](https://www.conventionalcommits.org/) (`git commit -m 'feat: add amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.**

### Reporting Bugs

Please try to create bug reports that are:

- **Reproducible** - Include steps to reproduce the problem
- **Specific** - Include as much detail as possible (version, environment, etc.)
- **Unique** - Do not duplicate existing opened issues
- **Scoped** - One bug per report

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## About

### Author

<p align="center">
  <a href="https://github.com/jprisant">
    <img src="https://img.shields.io/badge/Created_by-Jonathan_Prisant-blue?style=for-the-badge&logo=github" alt="Created by Jonathan Prisant">
  </a>
</p>

Howdy, I'm Jonathan Prisant, a product leader/manager/nerd in the church technology space who gets unreasonably excited about understanding + solving problems, serving humans, designing elegant systems, and getting stuff done. I enjoy optimizing and scaling workflows more than is probably healthy... NOT because I'm particularly fond of "business process definition", but because I think in systems and value the outcomes of increased "effectiveness and efficiency" (i.e. doing less of the boring work and more of the work I actually enjoy).

I am a follower of Jesus Christ, grateful husband to my beloved, proud (and exhausted) dad of 4 humans of various sizes and ages, D&D geek, 3d printing enthusiast, formerly-consistent strength trainer, smart home enthusiast, insatiable learner, compulsive tech-experimenter, writer-of-words that aggregate into sentences and paragraphs, and a bunch of other stuff too. I have too many projects going on across too many domains and need better self control, but hopefully you find this open-source repo helpful and useful.

*If PM-Skills has helped you ship better products, consider giving the repo a star and sharing it with your team.*

### License

Distributed under the **Apache License 2.0**. See [LICENSE](LICENSE) for more information.

This means you can:

- Use PM-Skills MCP commercially
- Modify and distribute
- Use privately
- Include in proprietary software

The only requirements are attribution and including the license notice.

### Security

We take security seriously. This project includes:

- **CodeQL Analysis** - Automated security scanning on every push
- **Dependabot** - Automated dependency updates for npm and GitHub Actions
- **Vulnerability Reporting** - See [SECURITY.md](SECURITY.md) for our security policy

To report a vulnerability, please email security concerns privately rather than opening a public issue.

<!-- ========== NEW: Acknowledgments ========== -->
### Acknowledgments

- **[PM-Skills](https://github.com/product-on-purpose/pm-skills)** - The skill library that powers this MCP server. All 25 PM skills, templates, and examples come from pm-skills.
- **[Model Context Protocol](https://modelcontextprotocol.io)** - The protocol that makes this possible
- **[Anthropic](https://anthropic.com)** - For creating MCP and Claude
<!-- ========== END NEW ========== -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Community

Have ideas for making PM-Skills MCP even better? Here are some ways to contribute and connect:

**Feature Ideas**

- Open a [feature request](https://github.com/product-on-purpose/pm-skills-mcp/issues/new?labels=enhancement) to suggest improvements
- Join the [Discussions](https://github.com/product-on-purpose/pm-skills-mcp/discussions) to brainstorm with the community

**Spread the Word**

- Give the repo a star if you find it useful
- Share PM-Skills MCP with your team
- Write about how you use PM-Skills MCP in your workflow

**Feedback**

- Found something confusing? [Open an issue](https://github.com/product-on-purpose/pm-skills-mcp/issues/new)
- Want to chat? Start a [discussion](https://github.com/product-on-purpose/pm-skills-mcp/discussions)

---

<p align="center">
  <strong>Built with purpose by <a href="https://github.com/product-on-purpose">Product on Purpose</a></strong><br>
  <sub>Bringing professional PM skills to every AI assistant</sub>
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
