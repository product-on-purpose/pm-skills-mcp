# Client Integration Guide

This guide provides detailed setup instructions for integrating PM-Skills MCP with various AI clients. For a quick overview, see [Getting Started](./getting-started.md).

---

## Table of Contents

- [Claude Desktop](#claude-desktop)
- [Claude Code (CLI)](#claude-code-cli)
- [Claude.ai (Projects)](#claudeai-projects)
- [Cursor](#cursor)
- [Continue](#continue)
- [Cline (VS Code Extension)](#cline-vs-code-extension)
- [Windsurf](#windsurf)
- [Generic MCP Client](#generic-mcp-client)
- [Testing Your Setup](#testing-your-setup)
- [When to Use MCP vs AGENTS.md](#when-to-use-mcp-vs-agentsmd)

---

## Claude Desktop

Claude Desktop has native MCP support, making it the recommended client for PM-Skills MCP.

### Configuration Location

| OS | Path |
|----|------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

### Setup Steps

1. **Locate config file**
   - macOS: Open Finder, press `Cmd+Shift+G`, paste the path above
   - Windows: Press `Win+R`, type `%APPDATA%\Claude`, press Enter
   - Linux: Open terminal, `cd ~/.config/Claude`

2. **Open or create the config file**
   ```bash
   # macOS/Linux
   open ~/Library/Application\ Support/Claude/claude_desktop_config.json
   # or create if it doesn't exist
   touch ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

3. **Add pm-skills-mcp configuration**
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

4. **Restart Claude Desktop**
   - Quit completely (not just close window)
   - Reopen the app

5. **Verify setup**
   - Look for the 🔧 tools icon in the input area
   - Click it—you should see `pm_prd`, `pm_hypothesis`, etc.

### Configuration with Custom Skills

```json
{
  "mcpServers": {
    "pm-skills": {
      "command": "npx",
      "args": ["pm-skills-mcp"],
      "env": {
        "PM_SKILLS_PATH": "/Users/you/my-custom-skills"
      }
    }
  }
}
```

### Troubleshooting

#### Server not appearing in tool list

**Symptoms:** No PM skill tools visible in the 🔧 menu.

**Solutions:**
1. Verify JSON syntax is valid (use [jsonlint.com](https://jsonlint.com))
2. Check file is in correct location for your OS
3. Ensure Node.js 18+ is installed: `node --version`
4. Try running server manually: `npx pm-skills-mcp` (should start without errors)
5. Check Claude Desktop logs:
   - macOS: `~/Library/Logs/Claude/`
   - Windows: `%APPDATA%\Claude\logs\`

#### Permission errors

**Symptoms:** "Permission denied" or "EACCES" errors.

**Solutions:**
1. Check npm global directory permissions
2. Try using a local install instead of npx:
   ```bash
   npm install -g pm-skills-mcp
   ```
3. On macOS/Linux, avoid using `sudo` with npm—fix permissions instead:
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   export PATH=~/.npm-global/bin:$PATH
   ```

#### Node.js version issues

**Symptoms:** Syntax errors or "unexpected token" messages.

**Solutions:**
1. Check version: `node --version` (need 18+)
2. Update Node.js: [nodejs.org](https://nodejs.org)
3. If using nvm: `nvm install 18 && nvm use 18`

---

## Claude Code (CLI)

Claude Code supports MCP servers for enhanced tool access.

### Configuration Location

| Scope | Path |
|-------|------|
| Project | `.claude/settings.json` (in project root) |
| User | `~/.claude/settings.json` |
| Desktop config | `claude_desktop_config.json` (see Claude Desktop section) |

### Setup Steps

#### Project-Level (Recommended)

1. Create `.claude/settings.json` in your project root:
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

2. The server activates when you run Claude Code in that directory.

#### Global Setup

1. Create or edit `~/.claude/settings.json`:
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

2. PM-Skills tools are available in all Claude Code sessions.

### Usage

```
> Use pm_prd to create a PRD for user authentication
> List all available PM skill tools
> Use pm_workflow_feature_kickoff for a new search feature
```

### Troubleshooting

#### Tools not available

1. Verify config file location and syntax
2. Check that Claude Code recognizes the server:
   ```
   > What MCP servers are connected?
   ```
3. Restart Claude Code session

---

## Claude.ai (Projects)

Claude.ai supports MCP servers through the Projects feature.

### Prerequisites

- Claude Pro, Team, or Enterprise subscription
- Access to Projects feature

### Setup Steps

1. Go to [claude.ai](https://claude.ai)
2. Open or create a **Project**
3. Click on **Project Settings** (gear icon)
4. Navigate to **Integrations** or **MCP Servers**
5. Click **Add MCP Server**
6. Configure:
   - Name: `pm-skills`
   - Command: `npx`
   - Arguments: `pm-skills-mcp`
7. Save and start a new conversation in the project

### Usage

All 36 tools are available within project conversations:
```
Use pm_prd to create a PRD for adding dark mode support
```

### Limitations

- MCP servers are project-scoped (not available in regular chats)
- Configuration may vary by subscription tier
- Check Claude.ai documentation for current MCP support status

---

## Cursor

Cursor has built-in MCP support for AI-powered development.

### Configuration Location

Settings are managed through the Cursor UI.

### Setup Steps

1. Open Cursor
2. Open Settings (`Cmd/Ctrl + ,`)
3. Navigate to **Features** → **MCP Servers**
4. Click **Add Server** or edit the JSON:
   ```json
   {
     "pm-skills": {
       "command": "npx",
       "args": ["pm-skills-mcp"]
     }
   }
   ```
5. Save and restart Cursor

### Alternative: Config File

Create or edit `~/.cursor/mcp.json`:
```json
{
  "servers": {
    "pm-skills": {
      "command": "npx",
      "args": ["pm-skills-mcp"]
    }
  }
}
```

### Usage

In Composer or Chat:
```
Use pm_prd to create a PRD for implementing OAuth2 authentication
```

### Troubleshooting

#### Server not connecting

1. Check Cursor's MCP server status in Settings
2. Verify Node.js is in Cursor's PATH
3. Try using absolute path to npx:
   ```json
   {
     "pm-skills": {
       "command": "/usr/local/bin/npx",
       "args": ["pm-skills-mcp"]
     }
   }
   ```

---

## Continue

Continue is an open-source AI coding assistant with MCP support.

### Configuration Location

`~/.continue/config.json`

### Setup Steps

1. Install [Continue extension](https://marketplace.visualstudio.com/items?itemName=Continue.continue)
2. Open Continue config:
   - VS Code: `Cmd/Ctrl + Shift + P` → "Continue: Open Config"
   - Or edit `~/.continue/config.json` directly

3. Add MCP server configuration:
   ```json
   {
     "models": [...],
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

4. Restart VS Code

### Usage

In Continue chat panel:
```
Use the pm_prd tool to create requirements for a notification system
```

### Troubleshooting

#### Server not appearing

1. Check Continue output panel for errors
2. Verify `experimental` section is properly nested
3. Try with absolute npx path
4. Update Continue extension to latest version

---

## Cline (VS Code Extension)

Cline (formerly Claude Dev) is a VS Code extension with MCP support.

### Setup Steps

1. Install [Cline extension](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)
2. Open Cline panel in VS Code
3. Click the gear icon to open settings
4. Navigate to **MCP Servers** section
5. Click **Add Server**
6. Configure:
   - Name: `pm-skills`
   - Command: `npx`
   - Arguments: `pm-skills-mcp`
7. Save and restart

### Alternative: Settings JSON

1. Open VS Code settings (`Cmd/Ctrl + ,`)
2. Search for "Cline MCP"
3. Edit in settings.json:
   ```json
   {
     "cline.mcpServers": {
       "pm-skills": {
         "command": "npx",
         "args": ["pm-skills-mcp"]
       }
     }
   }
   ```

### Usage

Ask Cline:
```
Use pm_user_stories to create user stories for the checkout flow improvements
```

### Troubleshooting

#### Connection issues

1. Check Cline output panel: View → Output → Select "Cline"
2. Verify API key is configured in Cline
3. Restart VS Code after config changes

---

## Windsurf

Windsurf is an AI-native IDE with MCP support.

### Configuration Location

MCP settings are in Windsurf's configuration UI or config file.

### Setup Steps

1. Open Windsurf Settings
2. Navigate to AI/MCP configuration
3. Add pm-skills-mcp:
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
4. Restart Windsurf

### Usage

In Windsurf's AI chat:
```
Use pm_adr to create an architecture decision record for choosing PostgreSQL
```

---

## Generic MCP Client

PM-Skills MCP works with any client that supports the Model Context Protocol.

### Protocol Requirements

- **Transport:** stdio (standard input/output)
- **Capabilities:** Tool invocation
- **Optional:** Resource access, prompt handling

### Minimum Configuration

```json
{
  "server": {
    "command": "npx",
    "args": ["pm-skills-mcp"],
    "transport": "stdio"
  }
}
```

### Running the Server Manually

For debugging or custom integrations:

```bash
# Run with npx (downloads if needed)
npx pm-skills-mcp

# Or install globally first
npm install -g pm-skills-mcp
pm-skills-mcp

# With custom skills path
PM_SKILLS_PATH=/path/to/skills pm-skills-mcp
```

### Server Capabilities

The server advertises these MCP capabilities:

| Capability | Description |
|------------|-------------|
| `tools` | 36 invokable tools (24 skills + 5 workflows + 7 utilities) |
| `resources` | 72 readable resources (skills, templates, examples) |
| `prompts` | 3 conversation prompts |

### Integration Example (Node.js)

```javascript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'npx',
  args: ['pm-skills-mcp']
});

const client = new Client({ name: 'my-client', version: '1.0.0' });
await client.connect(transport);

// List available tools
const tools = await client.listTools();
console.log(tools);

// Invoke a tool
const result = await client.callTool({
  name: 'pm_prd',
  arguments: {
    topic: 'search feature',
    format: 'full'
  }
});
```

---

## Testing Your Setup

### Verification Steps

After configuring any client:

1. **Check server is recognized**
   ```
   "What MCP servers are connected?" or "List available tools"
   ```

2. **Test tool listing**
   ```
   "Use pm_list_skills to show all available PM skills"
   ```

   **Expected:** List of 24 skills organized by phase (Discover, Define, Develop, Deliver, Measure, Iterate)

3. **Test a simple skill**
   ```
   "Use pm_hypothesis with topic 'users want faster checkout'"
   ```

   **Expected:** Structured hypothesis with assumption, success metrics, and test approach

4. **Test workflow bundle**
   ```
   "Use pm_workflow_quick_prd for adding a dark mode toggle"
   ```

   **Expected:** Problem statement followed by PRD content

### Expected Tool Count

| Category | Count | Examples |
|----------|-------|----------|
| Skill tools | 24 | `pm_prd`, `pm_hypothesis`, `pm_adr` |
| Workflow tools | 5 | `pm_workflow_feature_kickoff` |
| Utility tools | 7 | `pm_list_skills`, `pm_search_skills` |
| **Total** | **36** | |

### What Success Looks Like

When properly configured:
- AI can list PM skill tools
- Tool invocations return structured skill content
- AI follows skill framework to generate artifacts
- Resources are accessible via `pm-skills://` URIs

---

## When to Use MCP vs AGENTS.md

Both PM-Skills (file-based) and PM-Skills MCP can provide the same skills to AI assistants. Here's when to use each:

### Use MCP (pm-skills-mcp) When

- **You want zero file management** — No cloning, no file navigation
- **You use Claude Desktop, Cursor, or Continue** — Native MCP support
- **You want consistent tool interfaces** — Same invocation across all clients
- **You prefer npm-based updates** — `npm update -g pm-skills-mcp`
- **You need programmatic access** — Building integrations or custom workflows

### Use AGENTS.md (pm-skills files) When

- **You prefer slash commands** — `/prd`, `/hypothesis` in Claude Code
- **You want to browse skill files** — Read SKILL.md, TEMPLATE.md directly
- **You're heavily customizing skills** — Easier to edit files in place
- **You use GitHub Copilot** — Discovers skills via AGENTS.md
- **You want skills in your repo** — Submodule or copy skills into project

### Hybrid Approach

You can use both simultaneously:

| Context | Method |
|---------|--------|
| Claude Code (coding) | Slash commands from cloned pm-skills |
| Claude Desktop (PM work) | MCP tools from pm-skills-mcp |

Both access the same underlying skill library—just different interfaces.

---

## Related Documentation

- [Getting Started](./getting-started.md) — Quick start and first tool walkthrough
- [Customization Guide](./customization.md) — Using custom skills with MCP
- [Migration Guide](./migration-guide.md) — Moving between file-based and MCP approaches
- [Architecture](./architecture.md) — How pm-skills-mcp works internally

---

*Need help with a specific client? [Open an issue](https://github.com/product-on-purpose/pm-skills-mcp/issues) or [start a discussion](https://github.com/product-on-purpose/pm-skills-mcp/discussions).*
