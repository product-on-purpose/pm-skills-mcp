<a id="readme-top"></a>

<h1 align="center">
  <br>
  <a href="https://github.com/product-on-purpose/pm-skills-mcp">PM-Skills MCP</a>
  <br>
</h1>

<h4 align="center">24 professional PM skills, instantly accessible to any AI via the Model Context Protocol.</h4>

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
    <img src="https://img.shields.io/badge/tools-36-brightgreen.svg?style=flat-square" alt="Tools">
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
    - [Works with...](#works-with)
    - [Project Structure](#project-structure)
- [Getting Started](#getting-started)
    - [Claude Desktop](#claude-desktop)
    - [NPM Global Install](#npm-global-install)
    - [From Source](#from-source)
    - [Configuration](#configuration)
- [Usage](#usage)
    - [How It Works](#how-it-works)
    - [Tools](#tools)
    - [🔍 Discover Phase](#-discover-phase)
    - [📋 Define Phase](#-define-phase)
    - [💡 Develop Phase](#-develop-phase)
    - [🚀 Deliver Phase](#-deliver-phase)
    - [📊 Measure Phase](#-measure-phase)
    - [🔄 Iterate Phase](#-iterate-phase)
    - [🔗 Workflow Bundles](#-workflow-bundles)
    - [🛠️ Utility Tools](#️-utility-tools)
    - [Resources](#resources)
    - [Prompts](#prompts)
- [Project Status](#project-status)
    - [Changelog](#changelog)
    - [Roadmap](#roadmap)
- [Development](#development)
    - [Testing](#testing)
    - [Code Quality](#code-quality)
    - [CI/CD](#cicd)
- [Security](#security)
- [Comparison](#comparison)
    - [PM-Skills vs PM-Skills MCP](#pm-skills-vs-pm-skills-mcp)
    - [When to Use Which](#when-to-use-which)
- [Contributing](#contributing)
    - [How to Contribute](#how-to-contribute)
    - [Reporting Bugs](#reporting-bugs)
- [About](#about)
    - [Author](#author)
    - [License](#license)
    - [Security](#security-1)
- [Community](#community)

</details>

---

**Quick Start** (NPM Global Install)

```bash
npm install -g pm-skills-mcp
```

---

## The Big Idea

**PM-Skills MCP** is an MCP server that transforms [PM-Skills](https://github.com/product-on-purpose/pm-skills)—a collection of 24 battle-tested product management skills—into programmatically accessible tools, resources, and prompts for any AI assistant that speaks the Model Context Protocol.

**_One connection. 24 skills. Any MCP client._**

### Why MCP?

The [Model Context Protocol](https://modelcontextprotocol.io) is an open standard that lets AI assistants connect to external tools and data sources. Instead of manually copying skill files or uploading ZIP archives, PM-Skills MCP gives your AI **direct, programmatic access** to the entire PM skill library.

### The Transformation

| File-Based Approach                | MCP-Powered Approach              |
| ---------------------------------- | --------------------------------- |
| Clone repo, navigate to skills     | `npx pm-skills-mcp` — done        |
| Copy/paste skill content into chat | AI invokes tools directly         |
| Manual template injection          | Automatic template retrieval      |
| Platform-specific slash commands   | Universal across all MCP clients  |
| Static markdown files              | Dynamic, parameterized tools      |
| Works in one IDE/client            | Works everywhere MCP is supported |

### Key Features

- **35 MCP Tools** — 24 PM skills + 5 workflow bundles + 6 utility tools
- **72 MCP Resources** — Skills, templates, and examples accessible via URI
- **3 MCP Prompts** — Guided conversation starters for common workflows
- **5 Workflow Bundles** — Pre-built multi-skill workflows for common scenarios
- **47 Automated Tests** — Comprehensive test coverage with Vitest
- **Zero Configuration** — Works out of the box with embedded skills
- **Universal Compatibility** — Claude Desktop, Cursor, Continue, and any MCP client
- **Customizable** — Override with your own skill modifications
- **Lightweight** — Minimal dependencies, fast startup
- **Security Scanning** — CodeQL analysis on every push

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

- **[Model Context Protocol](https://modelcontextprotocol.io)** — Open standard for AI tool connectivity
- **[PM-Skills](https://github.com/product-on-purpose/pm-skills)** — The 24 PM skills this server exposes
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe implementation
- **[Vitest](https://vitest.dev/)** — Fast, modern testing framework

### Works with...

PM-Skills MCP works with any client that supports the Model Context Protocol. Here's a quick overview:

#### Platform Compatibility

| Platform            | Status    | Integration Type       | Notes                           |
| ------------------- | --------- | ---------------------- | ------------------------------- |
| **Claude Code**     | ✅ Native | MCP Server             | Full tool access via CLI        |
| **Claude Desktop**  | ✅ Native | MCP Server             | Recommended for best experience |
| **Claude.ai**       | ✅ Native | MCP Server (Projects)  | Via MCP integration in Projects |
| **Cursor**          | ✅ Native | MCP Server             | AI-powered IDE                  |
| **VS Code**         | ✅ Native | Via Cline/Continue     | Multiple MCP-compatible extensions |
| **Continue**        | ✅ Native | MCP Server             | Open-source coding assistant    |
| **Cline**           | ✅ Native | MCP Server             | VS Code extension               |
| **Windsurf**        | ✅ Native | MCP Server             | AI-native IDE                   |
| **GitHub Copilot**  | 🔶 Indirect | Via MCP-enabled tools | Use with Copilot Chat + MCP     |
| **ChatGPT / Codex** | 🔶 Manual | Copy skill content     | No native MCP support           |
| **Any MCP Client**  | ✅ Universal | Protocol-level       | Full compatibility              |

#### Quick Start by Platform

<details>
<summary><strong>Claude Code (CLI)</strong></summary>

Add to your Claude Code MCP settings (`~/.claude/claude_desktop_config.json` or project `.claude/settings.json`):

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

Then use tools directly in your CLI session:
```
> Use the pm_prd tool to create a PRD for user authentication
```

</details>

<details>
<summary><strong>Claude Desktop</strong></summary>

Add to `claude_desktop_config.json` (see [Getting Started](#claude-desktop) for path):

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

Restart Claude Desktop. Tools appear in the 🔧 menu.

</details>

<details>
<summary><strong>Claude.ai (Projects)</strong></summary>

Claude.ai supports MCP servers in Projects. Add PM-Skills MCP as an integration in your Project settings. Once connected, all 35 tools become available in your project conversations.

</details>

<details>
<summary><strong>VS Code (Cline / Continue)</strong></summary>

**With Cline:**
1. Install [Cline extension](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)
2. Open Cline settings → MCP Servers
3. Add pm-skills-mcp configuration

**With Continue:**
1. Install [Continue extension](https://marketplace.visualstudio.com/items?itemName=Continue.continue)
2. Edit `~/.continue/config.json` to add MCP server

</details>

<details>
<summary><strong>Cursor</strong></summary>

Add to Cursor's MCP configuration in Settings → Features → MCP Servers:

```json
{
  "pm-skills": {
    "command": "npx",
    "args": ["pm-skills-mcp"]
  }
}
```

</details>

<details>
<summary><strong>ChatGPT / Codex (Manual)</strong></summary>

ChatGPT doesn't support MCP natively. However, you can:

1. Clone the [pm-skills](https://github.com/product-on-purpose/pm-skills) repository
2. Copy the content of any `SKILL.md` file into your conversation as context
3. Ask ChatGPT to follow the skill instructions

For programmatic access, consider using MCP-compatible clients instead.

</details>

<details>
<summary><strong>GitHub Copilot</strong></summary>

GitHub Copilot doesn't have native MCP support, but you can:

1. Use Copilot Chat in VS Code with an MCP-enabled extension (Cline, Continue)
2. Clone [pm-skills](https://github.com/product-on-purpose/pm-skills) to your repo—Copilot will discover skills via `AGENTS.md`

For full MCP tool access, use a dedicated MCP client.

</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Project Structure

```
pm-skills-mcp/
├── src/                      # TypeScript source code
│   ├── index.ts              # Entry point
│   ├── server.ts             # MCP server implementation
│   ├── config.ts             # Configuration management
│   ├── cache.ts              # Skill caching layer
│   ├── skills/               # Skill loader and parser
│   ├── tools/                # MCP tool handlers (35 tools)
│   ├── resources/            # MCP resource handlers (72 resources)
│   ├── prompts/              # MCP prompt definitions (3 prompts)
│   ├── workflows/            # Workflow bundle logic
│   └── types/                # TypeScript type definitions
├── skills/                   # Embedded PM skills (copied from pm-skills)
│   ├── discover/             # Research phase skills
│   ├── define/               # Problem framing skills
│   ├── develop/              # Solution exploration skills
│   ├── deliver/              # Specification skills
│   ├── measure/              # Validation skills
│   └── iterate/              # Learning skills
├── tests/                    # Vitest test suites (47 tests)
├── scripts/                  # Build and utility scripts
├── dist/                     # Compiled JavaScript output
├── .github/                  # CI/CD workflows
│   └── workflows/            # ci.yml, publish.yml, codeql.yml
├── AGENTS.md                 # Agent discovery file
├── CONTRIBUTING.md           # Contribution guidelines
├── SECURITY.md               # Security policy
└── CHANGELOG.md              # Version history
```

See [docs/reference/project-structure.md](docs/reference/project-structure.md) for detailed descriptions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting Started

### Claude Desktop

Add to your Claude Desktop configuration (`claude_desktop_config.json`):

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

Restart Claude Desktop. You now have access to all 24 PM skills as tools.

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

### Configuration

#### Environment Variables

| Variable             | Default    | Description                     |
| -------------------- | ---------- | ------------------------------- |
| `PM_SKILLS_PATH`     | (embedded) | Path to custom skills directory |
| `PM_SKILLS_FORMAT`   | `full`     | Default output format           |
| `PM_SKILLS_EXAMPLES` | `false`    | Include examples by default     |

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
│   │   35 Tools  │   │ 72 Resources│   │  3 Prompts  │       │
│   │             │   │             │   │             │       │
│   │ • 24 skills │   │ • templates │   │ • kickoff   │       │
│   │ • 5 flows   │   │ • examples  │   │ • lean      │       │
│   │ • 6 utils   │   │ • skills    │   │ • quick-prd │       │
│   │             │   │             │   │             │       │
│   └─────────────┘   └─────────────┘   └─────────────┘       │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │              Embedded PM-Skills Library              │   │
│   │     24 skills × (SKILL.md + TEMPLATE + EXAMPLE)      │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

1. **You ask** your AI to create a PRD, hypothesis, or any PM artifact
2. **AI invokes** the appropriate `pm_*` tool via MCP
3. **Server returns** skill instructions, template, and optionally an example
4. **AI generates** a professional-quality artifact following the skill framework

### Tools

PM-Skills MCP exposes each skill as an invokable tool. Every tool accepts:

| Parameter        | Required | Description                            |
| ---------------- | -------- | -------------------------------------- |
| `topic`          | Yes      | What to create the artifact for        |
| `context`        | No       | Additional requirements or constraints |
| `format`         | No       | `full`, `concise`, or `template-only`  |
| `includeExample` | No       | Include a worked example               |

### 🔍 Discover Phase

*Find the right problem*

| Tool                      | Description                                 |
| ------------------------- | ------------------------------------------- |
| `pm_interview_synthesis`  | Turn user research into actionable insights |
| `pm_competitive_analysis` | Map the landscape, find opportunities       |
| `pm_stakeholder_summary`  | Understand who matters and what they need   |

### 📋 Define Phase

*Frame the problem*

| Tool                   | Description                               |
| ---------------------- | ----------------------------------------- |
| `pm_problem_statement` | Crystal-clear problem framing             |
| `pm_hypothesis`        | Testable assumptions with success metrics |
| `pm_opportunity_tree`  | Teresa Torres-style outcome mapping       |
| `pm_jtbd_canvas`       | Jobs to be Done framework                 |

### 💡 Develop Phase

*Explore solutions*

| Tool                  | Description                     |
| --------------------- | ------------------------------- |
| `pm_solution_brief`   | One-page solution pitch         |
| `pm_spike_summary`    | Document technical explorations |
| `pm_adr`              | Architecture Decision Records   |
| `pm_design_rationale` | Why you made that design choice |

### 🚀 Deliver Phase

*Ship it*

| Tool                  | Description                                       |
| --------------------- | ------------------------------------------------- |
| `pm_prd`              | Comprehensive product requirements                |
| `pm_user_stories`     | INVEST-compliant stories with acceptance criteria |
| `pm_edge_cases`       | Error states, boundaries, recovery paths          |
| `pm_launch_checklist` | Never miss a launch step again                    |
| `pm_release_notes`    | User-facing release communication                 |

### 📊 Measure Phase

*Validate with data*

| Tool                        | Description                         |
| --------------------------- | ----------------------------------- |
| `pm_experiment_design`      | Rigorous A/B test planning          |
| `pm_instrumentation_spec`   | Event tracking requirements         |
| `pm_dashboard_requirements` | Analytics dashboard specs           |
| `pm_experiment_results`     | Document learnings from experiments |

### 🔄 Iterate Phase

*Learn and improve*

| Tool                  | Description                              |
| --------------------- | ---------------------------------------- |
| `pm_retrospective`    | Team retros that drive action            |
| `pm_lessons_log`      | Build organizational memory              |
| `pm_refinement_notes` | Capture backlog refinement outcomes      |
| `pm_pivot_decision`   | Evidence-based pivot/persevere framework |

### 🔗 Workflow Bundles

*Multi-skill workflows*

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Resources

Access skill content directly via MCP resources:

```
pm-skills://skills/{phase}/{skill}      → Full skill instructions
pm-skills://templates/{phase}/{skill}   → Template only
pm-skills://examples/{phase}/{skill}    → Worked example
pm-skills://bundles/{bundle-name}       → Workflow bundle
```

**Examples:**

```
pm-skills://skills/deliver/prd
pm-skills://templates/define/hypothesis
pm-skills://examples/measure/experiment-design
pm-skills://bundles/feature-kickoff
```

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

## Project Status

### Changelog

See [CHANGELOG.md](CHANGELOG.md) for full version history.

| Version   | Highlights                                             |
| --------- | ------------------------------------------------------ |
| **1.0.0** | Initial release with 35 tools, 72 resources, 3 prompts |

### Roadmap

See the [open issues](https://github.com/product-on-purpose/pm-skills-mcp/issues) for planned features.

- [x] Core MCP server with all 24 PM skills
- [x] Workflow bundle tools
- [x] MCP resources for direct skill access
- [x] MCP prompts for guided workflows
- [x] Automated npm publishing
- [ ] Skill versioning and compatibility tracking
- [ ] Additional workflow bundles
- [ ] Custom skill contribution support

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Development

### Testing

The project uses [Vitest](https://vitest.dev/) for testing with 47 tests across 6 test files.

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
- Clones pm-skills and embeds skills for testing

**Publish Workflow** (`.github/workflows/publish.yml`)

- Triggers on GitHub release creation
- Auto-publishes to npm with provenance
- Uses npm automation token for authentication

**CodeQL Workflow** (`.github/workflows/codeql.yml`)

- Security scanning for JavaScript/TypeScript
- Runs on push to main and weekly schedule

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Security

We take security seriously. This project includes:

- **CodeQL Analysis** — Automated security scanning on every push
- **Dependabot** — Automated dependency updates for npm and GitHub Actions
- **Vulnerability Reporting** — See [SECURITY.md](SECURITY.md) for our security policy

To report a vulnerability, please email security concerns privately rather than opening a public issue. See [SECURITY.md](SECURITY.md) for details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Comparison

### PM-Skills vs PM-Skills MCP

| Aspect               | pm-skills                        | pm-skills-mcp                 |
| -------------------- | -------------------------------- | ----------------------------- |
| **Access method**    | Git clone, file upload           | MCP server connection         |
| **Setup time**       | 2-5 minutes                      | 30 seconds                    |
| **Client support**   | Claude Code, manual upload       | Any MCP client                |
| **Skill invocation** | Slash commands, manual reference | Programmatic tool calls       |
| **Template access**  | Navigate file system             | URI-based resources           |
| **Workflow bundles** | Manual orchestration             | Tool-based execution          |
| **Customization**    | Fork and modify                  | Environment variable override |
| **Updates**          | Git pull                         | npm update                    |

### When to Use Which

**Use PM-Skills (file-based) when:**

- You prefer slash commands in Claude Code
- You want to browse and read skill files directly
- You're customizing skills heavily

**Use PM-Skills MCP when:**

- You want instant setup with zero file management
- You're using Claude Desktop, Cursor, or other MCP clients
- You want programmatic access to skills
- You want consistent tool interfaces across clients

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

- **Reproducible** — Include steps to reproduce the problem
- **Specific** — Include as much detail as possible (version, environment, etc.)
- **Unique** — Do not duplicate existing opened issues
- **Scoped** — One bug per report

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

- **CodeQL Analysis** — Automated security scanning on every push
- **Dependabot** — Automated dependency updates for npm and GitHub Actions
- **Vulnerability Reporting** — See [SECURITY.md](SECURITY.md) for our security policy

To report a vulnerability, please email security concerns privately rather than opening a public issue.

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
