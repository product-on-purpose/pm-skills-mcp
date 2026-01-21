# Getting Started with PM-Skills MCP

Welcome to PM-Skills MCP! This guide will help you set up and start using professional PM skills with any MCP-compatible AI assistant.

---

## Table of Contents

- [Quick Start](#quick-start)
- [What is PM-Skills MCP?](#what-is-pm-skills-mcp)
- [Core Concepts](#core-concepts)
  - [What is MCP?](#what-is-mcp)
  - [Tools, Resources, and Prompts](#tools-resources-and-prompts)
  - [How It All Connects](#how-it-all-connects)
- [Platform Setup Guides](#platform-setup-guides)
  - [Claude Desktop](#claude-desktop)
  - [Claude Code (CLI)](#claude-code-cli)
  - [Claude.ai (Projects)](#claudeai-projects)
  - [Cursor](#cursor)
  - [VS Code (Cline / Continue)](#vs-code-cline--continue)
  - [Other MCP Clients](#other-mcp-clients)
- [Your First Tool](#your-first-tool)
- [Working with Workflows](#working-with-workflows)
- [Accessing Resources Directly](#accessing-resources-directly)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

---

## Quick Start

**30 seconds to professional PM skills:**

Add this to your MCP client configuration:

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

Restart your AI assistant. Done! You now have access to 24 PM skills, 5 workflow bundles, and 6 utility tools.

**Try it:**
> "Use the pm_prd tool to create a PRD for adding dark mode to our app"

---

## What is PM-Skills MCP?

**PM-Skills MCP** is an MCP server that gives AI assistants instant access to 24 professional product management skills. Instead of copying files or writing prompts, your AI can invoke tools directly to create PRDs, hypotheses, user stories, and more.

### The Problem It Solves

**Without PM-Skills MCP:**
```
You: "Write me a PRD"
AI: *Produces generic document, missing key sections, inconsistent format*
```

**With PM-Skills MCP:**
```
You: "Use the pm_prd tool for a search feature"
AI: *Invokes pm_prd tool, follows structured skill framework*
    *Produces comprehensive PRD with problem statement, success metrics,
     user stories, scope boundaries, technical considerations*
```

### How It Differs from PM-Skills (File-Based)

| Aspect | pm-skills (files) | pm-skills-mcp (server) |
|--------|-------------------|------------------------|
| Setup | Clone repo, navigate files | Add config, restart |
| Invocation | Slash commands or "use skill X" | AI invokes tools directly |
| Template access | Read from file system | Automatic via MCP |
| Works with | Claude Code, manual upload | Any MCP client |
| Updates | `git pull` | `npm update -g pm-skills-mcp` |

**Bottom line:** PM-Skills MCP is the zero-friction way to use PM skills with any MCP-compatible AI.

---

## Core Concepts

### What is MCP?

The **Model Context Protocol** (MCP) is an open standard that lets AI assistants connect to external tools and data sources. Think of it as a universal adapter:

```
┌─────────────────┐         ┌─────────────────┐
│  AI Assistant   │◄──MCP──►│   MCP Server    │
│ (Claude, etc.)  │         │ (pm-skills-mcp) │
└─────────────────┘         └─────────────────┘
```

When you configure an MCP server, your AI gains new capabilities—in this case, 24 PM skills.

### Tools, Resources, and Prompts

MCP exposes three types of capabilities:

#### Tools (35 total)

Tools are **actions the AI can invoke**. Each PM skill is exposed as a tool:

| Tool | What it creates |
|------|-----------------|
| `pm_prd` | Product Requirements Document |
| `pm_hypothesis` | Testable hypothesis with success metrics |
| `pm_user_stories` | INVEST-compliant user stories |
| `pm_experiment_design` | A/B test plan |
| ... | 20 more skills |

Plus workflow bundles (`pm_workflow_feature_kickoff`, etc.) and utility tools (`pm_list_skills`, `pm_search_skills`, etc.).

#### Resources (72 total)

Resources are **content the AI can read** via URI:

```
pm-skills://skills/deliver/prd        → Full skill instructions
pm-skills://templates/deliver/prd     → Output template only
pm-skills://examples/deliver/prd      → Worked example
```

Useful when you want the AI to reference a template without invoking the full skill.

#### Prompts (3 total)

Prompts are **guided conversation starters**:

| Prompt | Workflow |
|--------|----------|
| `feature-kickoff` | Problem → Hypothesis → Solution → PRD → Stories |
| `lean-validation` | Hypothesis → Experiment → Results → Pivot |
| `quick-prd` | Problem → PRD (fast track) |

Start a conversation with a prompt for structured multi-step workflows.

### How It All Connects

```
┌─────────────────────────────────────────────────────────────┐
│                    Your AI Assistant                         │
└──────────────────────────┬──────────────────────────────────┘
                           │ "Create a PRD for search"
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    pm-skills-mcp Server                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   AI invokes: pm_prd(topic: "search feature")               │
│                         │                                   │
│                         ▼                                   │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  Skill Loader reads:                                │   │
│   │  • SKILL.md (instructions)                          │   │
│   │  • TEMPLATE.md (structure)                          │   │
│   │  • EXAMPLE.md (if requested)                        │   │
│   └─────────────────────────────────────────────────────┘   │
│                         │                                   │
│                         ▼                                   │
│   Returns: Skill content for AI to follow                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│   AI generates PRD following skill framework                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Platform Setup Guides

### Claude Desktop

**Location of config file:**

| OS | Path |
|----|------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

**Setup:**

1. Open (or create) your `claude_desktop_config.json`
2. Add the pm-skills server:

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

3. Restart Claude Desktop
4. Look for the 🔧 tools icon—PM skills should appear

**Verify it works:**
> "List all available PM skill tools"

Claude will invoke `pm_list_skills` and show you all 24 skills.

---

### Claude Code (CLI)

**Project-level setup** (recommended):

Create `.claude/settings.json` in your project root:

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

**Global setup:**

Add to `~/.claude/settings.json` (or `claude_desktop_config.json`).

**Usage:**

```
> Use pm_prd to create a PRD for user authentication
```

Claude Code will invoke the tool and generate the PRD.

---

### Claude.ai (Projects)

Claude.ai supports MCP servers in **Projects**:

1. Go to [claude.ai](https://claude.ai)
2. Open or create a Project
3. Go to Project Settings → Integrations
4. Add PM-Skills MCP as an MCP server integration
5. All 35 tools become available in project conversations

**Note:** MCP integration availability may vary by plan. Check Claude.ai documentation for current support.

---

### Cursor

1. Open Cursor Settings (`Cmd/Ctrl + ,`)
2. Navigate to **Features → MCP Servers**
3. Add configuration:

```json
{
  "pm-skills": {
    "command": "npx",
    "args": ["pm-skills-mcp"]
  }
}
```

4. Restart Cursor
5. Use in Composer or Chat: "Use pm_prd for..."

---

### VS Code (Cline / Continue)

#### With Cline

1. Install [Cline extension](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)
2. Open Cline settings (click gear icon in Cline panel)
3. Go to **MCP Servers** section
4. Click **Add Server** and configure:
   - Command: `npx`
   - Args: `pm-skills-mcp`
5. Save and restart

#### With Continue

1. Install [Continue extension](https://marketplace.visualstudio.com/items?itemName=Continue.continue)
2. Edit `~/.continue/config.json`:

```json
{
  "experimental": {
    "modelContextProtocolServers": [
      {
        "transport": {
          "type": "stdio",
          "command": "npx",
          "args": ["pm-skills-mcp"]
        }
      }
    ]
  }
}
```

3. Restart VS Code

---

### Other MCP Clients

PM-Skills MCP works with any MCP-compatible client. The general pattern:

1. Find your client's MCP server configuration
2. Add pm-skills-mcp with command `npx` and args `["pm-skills-mcp"]`
3. Restart the client

For clients that require a running server URL, you can run pm-skills-mcp locally and configure the connection accordingly.

---

## Your First Tool

Let's walk through using a PM skill tool for the first time.

### Scenario

You're starting a new feature and need to create a problem statement.

### Step 1: Verify Setup

Ask your AI:
> "What PM skill tools are available?"

The AI should invoke `pm_list_skills` and return a list of 24 skills organized by phase.

### Step 2: Invoke the Tool

Ask:
> "Use the pm_problem_statement tool to create a problem statement for: Users are abandoning checkout because the process takes too long. We estimate $50k/month in lost revenue."

### Step 3: Review the Output

The AI will:
1. Invoke `pm_problem_statement` with your context
2. Receive the skill instructions, template, and structure
3. Generate a formatted problem statement following the framework

### Step 4: Iterate

Not quite right? Ask:
> "Expand the impact analysis section"
> "Add more detail about the user segment"
> "Reframe this from the customer's perspective"

### Step 5: Chain to Next Skill

Once you're happy with the problem statement:
> "Now use pm_hypothesis to create a testable hypothesis based on this problem"

The AI maintains context and builds on previous artifacts.

---

## Working with Workflows

**Workflow bundles** chain multiple skills into guided sequences for common scenarios.

### Available Workflows

| Workflow Tool | Skills Chained | Use When |
|---------------|----------------|----------|
| `pm_workflow_feature_kickoff` | problem → hypothesis → solution → PRD → stories | Starting a new feature |
| `pm_workflow_lean_startup` | hypothesis → experiment → results → pivot | Rapid validation |
| `pm_workflow_quick_prd` | problem → PRD | Requirements are clear |
| `pm_workflow_experiment_cycle` | hypothesis → experiment → results → lessons | Running experiments |
| `pm_workflow_triple_diamond` | All 24 skills in sequence | Comprehensive product development |

### Using a Workflow

**Start the workflow:**
> "Use pm_workflow_feature_kickoff for adding real-time collaboration to our document editor"

**What happens:**
1. AI invokes the workflow tool
2. Server returns the first skill (problem statement) with instructions
3. AI generates the artifact and proceeds to the next skill
4. Process repeats through all skills in the bundle

**Control the pace:**
> "Run the feature kickoff workflow, but pause after each skill for my feedback"

### Workflow vs Individual Tools

| Approach | Best For |
|----------|----------|
| Individual tools | Targeted artifact creation, ad-hoc needs |
| Workflows | End-to-end processes, comprehensive documentation |

---

## Accessing Resources Directly

Sometimes you want the template or example without invoking the full skill.

### Resource URI Patterns

```
pm-skills://skills/{phase}/{skill}      → Full skill instructions
pm-skills://templates/{phase}/{skill}   → Template structure only
pm-skills://examples/{phase}/{skill}    → Worked example only
pm-skills://bundles/{bundle-name}       → Workflow bundle definition
```

### Examples

```
pm-skills://skills/deliver/prd
pm-skills://templates/define/hypothesis
pm-skills://examples/measure/experiment-design
pm-skills://bundles/feature-kickoff
```

### When to Use Resources

- **Want to see the template structure** before generating content
- **Need the example** as a reference for quality
- **Building custom workflows** that combine skill components
- **Debugging** to understand what instructions the AI receives

### How to Access

Ask your AI:
> "Read the resource at pm-skills://templates/deliver/prd and show me the template structure"

---

## Customization

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PM_SKILLS_PATH` | (embedded) | Path to custom skills directory |
| `PM_SKILLS_FORMAT` | `full` | Default output format (`full`, `concise`, `template-only`) |
| `PM_SKILLS_EXAMPLES` | `false` | Include examples by default |

### Using Custom Skills

Override the embedded skills with your own customized versions:

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

Your custom skills directory should follow the same structure:

```
my-skills/
├── discover/
│   └── interview-synthesis/
│       ├── SKILL.md
│       └── references/
│           ├── TEMPLATE.md
│           └── EXAMPLE.md
├── define/
│   └── ...
└── ...
```

### Tool Parameters

Every skill tool accepts these parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `topic` | string (required) | What to create the artifact for |
| `context` | string | Additional requirements or constraints |
| `format` | string | `full`, `concise`, or `template-only` |
| `includeExample` | boolean | Include worked example in response |

**Example with parameters:**
> "Use pm_prd with topic 'search feature', context 'must integrate with existing Elasticsearch cluster', format 'concise', includeExample true"

---

## Troubleshooting

### "MCP server not found" or "Tool not available"

**Cause:** Server not properly configured or not started.

**Solutions:**
- Verify config file path is correct for your OS
- Check JSON syntax (use a validator)
- Ensure Node.js 18+ is installed: `node --version`
- Try running directly: `npx pm-skills-mcp` (should start without errors)
- Restart your AI client after config changes

### "npm/npx command not found"

**Cause:** Node.js not installed or not in PATH.

**Solutions:**
- Install Node.js 18+: [nodejs.org](https://nodejs.org)
- On Windows, restart terminal after installation
- Verify: `npm --version` and `npx --version`

### "The AI doesn't use the tools"

**Cause:** AI may not recognize tool invocation is needed.

**Solutions:**
- Be explicit: "Use the pm_prd **tool**" not just "create a PRD"
- Verify tools are registered: "List all available MCP tools"
- Check if your AI client supports MCP tool invocation

### "Output doesn't match expected format"

**Cause:** AI may not be following the full skill instructions.

**Solutions:**
- Request format explicitly: "Follow the template structure exactly"
- Include example: "Use pm_prd with includeExample true"
- Use `template-only` format and provide your own content

### "Server crashes or times out"

**Cause:** Usually a Node.js or dependency issue.

**Solutions:**
- Update Node.js to latest LTS version
- Clear npm cache: `npm cache clean --force`
- Install globally instead of using npx: `npm install -g pm-skills-mcp`

### "Custom skills not loading"

**Cause:** Path or structure issues.

**Solutions:**
- Verify path is absolute, not relative
- Check directory structure matches expected format
- Ensure SKILL.md exists in each skill folder
- Check for YAML frontmatter syntax errors in SKILL.md

---

## Next Steps

### Explore All Tools

Use the utility tools to discover what's available:

```
pm_list_skills      → See all 24 skills with descriptions
pm_list_workflows   → See all workflow bundles with steps
pm_list_resources   → See all available resources
pm_search_skills    → Search skills by keyword
```

### Learn the Skills

Each skill is designed for a specific PM artifact. Browse by phase:

| Phase | Focus | Skills |
|-------|-------|--------|
| **Discover** | Research | interview-synthesis, competitive-analysis, stakeholder-summary |
| **Define** | Problem framing | problem-statement, hypothesis, opportunity-tree, jtbd-canvas |
| **Develop** | Solutions | solution-brief, spike-summary, adr, design-rationale |
| **Deliver** | Shipping | prd, user-stories, edge-cases, launch-checklist, release-notes |
| **Measure** | Validation | experiment-design, instrumentation-spec, dashboard-requirements, experiment-results |
| **Iterate** | Learning | retrospective, lessons-log, refinement-notes, pivot-decision |

### Read the Full Documentation

- [README](../README.md) — Complete reference
- [Project Structure](./reference/project-structure.md) — Technical architecture
- [PM-Skills Repository](https://github.com/product-on-purpose/pm-skills) — Source skills and detailed documentation
- [Model Context Protocol](https://modelcontextprotocol.io) — MCP specification

### Contribute

Found a bug? Have an idea? Want to add a skill?

- [Open an issue](https://github.com/product-on-purpose/pm-skills-mcp/issues)
- [Start a discussion](https://github.com/product-on-purpose/pm-skills-mcp/discussions)
- [Read CONTRIBUTING.md](../CONTRIBUTING.md)

---

## Quick Reference

### Most-Used Tools

| Need | Tool |
|------|------|
| Define the problem | `pm_problem_statement` |
| Write requirements | `pm_prd` |
| Create user stories | `pm_user_stories` |
| Plan an experiment | `pm_experiment_design` |
| Prepare for launch | `pm_launch_checklist` |

### Common Invocations

```
"Use pm_prd for [feature description]"
"Use pm_hypothesis to create a testable hypothesis for [assumption]"
"Use pm_workflow_feature_kickoff for [new feature]"
"Search PM skills for [keyword]"
"List all workflow bundles"
```

### Config Template

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

---

*Built by [Product on Purpose](https://github.com/product-on-purpose) for PMs who ship.*
