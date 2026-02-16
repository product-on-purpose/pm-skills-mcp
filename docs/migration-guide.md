# Migration Guide

This guide helps you move between file-based PM-Skills and MCP-based PM-Skills-MCP approaches, or use both together.

---

## Table of Contents

- [Overview](#overview)
- [From File-Based to MCP](#from-file-based-to-mcp)
- [From MCP to File-Based](#from-mcp-to-file-based)
- [Hybrid Approach](#hybrid-approach)
- [Command to Tool Mapping](#command-to-tool-mapping)
- [Preserving Customizations](#preserving-customizations)
- [Team Migration](#team-migration)

---

## Overview

PM-Skills exists in two forms:

| Approach | Repository | How It Works |
|----------|------------|--------------|
| **File-based** | [pm-skills](https://github.com/product-on-purpose/pm-skills) | Clone repo, use slash commands or reference files |
| **MCP-based** | [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp) | Install server, AI invokes tools via MCP protocol |

Both provide the same 24 PM skills—just different interfaces. You can migrate between them or use both simultaneously.

---

## From File-Based to MCP

Moving from cloned pm-skills to pm-skills-mcp.

### Why Migrate?

| File-Based Pain Point | MCP Solution |
|----------------------|--------------|
| Need to clone/update repo | `npm update -g pm-skills-mcp` |
| Navigate file structure | AI invokes tools directly |
| Slash commands only in Claude Code | Works in any MCP client |
| Manual skill chaining | Workflow bundle tools |

### Before You Start

Complete this checklist:

- [ ] **Note any custom modifications** — Check if you've edited any skill files
- [ ] **Document current workflows** — List slash commands you use regularly
- [ ] **Identify your MCP client** — Claude Desktop, Cursor, Continue, etc.
- [ ] **Verify Node.js 18+** — Run `node --version`

### Migration Steps

#### Step 1: Install pm-skills-mcp

```bash
# Option A: Global install
npm install -g pm-skills-mcp

# Option B: Use npx (no install needed)
# Just configure your client to use npx
```

#### Step 2: Configure Your MCP Client

Add to your client's MCP configuration:

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

See [Integration Guide](./integration-guide.md) for client-specific paths.

#### Step 3: Restart Your Client

Quit and reopen your MCP client to load the new server.

#### Step 4: Test Equivalent Workflows

| Old (File-Based) | New (MCP) |
|------------------|-----------|
| `/prd "feature"` | `Use pm_prd for "feature"` |
| `/hypothesis "idea"` | `Use pm_hypothesis for "idea"` |
| `/kickoff "project"` | `Use pm_workflow_feature_kickoff for "project"` |

#### Step 5: Handle Customizations (If Any)

If you modified skill files in your pm-skills clone:

1. Keep your modified pm-skills directory
2. Configure MCP to use it:
   ```json
   {
     "env": {
       "PM_SKILLS_PATH": "/path/to/your/pm-skills/skills"
     }
   }
   ```

See [Customization Guide](./customization.md) for details.

#### Step 6: (Optional) Remove File-Based Setup

Once MCP is working:

```bash
# If you cloned pm-skills and no longer need it
rm -rf /path/to/pm-skills

# If pm-skills was a submodule
git submodule deinit .pm-skills
git rm .pm-skills
```

**Keep the clone if:**
- You have customizations
- You want slash commands in Claude Code
- You want to browse skill files directly

---

## From MCP to File-Based

Moving from pm-skills-mcp to cloned pm-skills.

### Why Migrate?

| MCP Pain Point | File-Based Solution |
|----------------|---------------------|
| Prefer slash commands | Native in Claude Code |
| Want to read skill files | Direct file access |
| Heavy customization needs | Edit files in place |
| GitHub Copilot user | Discovers via AGENTS.md |

### Migration Steps

#### Step 1: Clone pm-skills

```bash
# Into your project
git clone https://github.com/product-on-purpose/pm-skills.git

# Or as a submodule
git submodule add https://github.com/product-on-purpose/pm-skills.git .pm-skills
```

#### Step 2: Copy Custom Skills (If Any)

If you used PM_SKILLS_PATH with pm-skills-mcp:

```bash
# Copy your customizations to the new clone
cp -r /your/custom/skills/* ./pm-skills/skills/
```

#### Step 3: Remove MCP Configuration

Remove the pm-skills server from your MCP config:

```json
{
  "mcpServers": {
    // Remove or comment out pm-skills entry
  }
}
```

#### Step 4: Start Using Slash Commands

In Claude Code:

```
/prd "new search feature"
/hypothesis "users want faster checkout"
```

Or reference skills directly:

```
Use the prd skill from skills/deliver-prd to create requirements for...
```

#### Step 5: (Optional) Uninstall pm-skills-mcp

```bash
npm uninstall -g pm-skills-mcp
```

---

## Hybrid Approach

Use both approaches simultaneously for different contexts.

### Configuration

**Claude Code** (file-based slash commands):
- Keep pm-skills cloned in your project
- Use `/prd`, `/hypothesis`, etc.

**Claude Desktop** (MCP tools):
- Keep pm-skills-mcp configured
- Use `pm_prd`, `pm_hypothesis`, etc.

### Workflow Example

```
Developer workflow (Claude Code):
  /prd "implement OAuth2"           <- Slash command
  /user-stories                     <- Chained slash command

PM workflow (Claude Desktop):
  Use pm_prd for OAuth2 feature     <- MCP tool
  Use pm_experiment_design for...   <- MCP tool
```

### Keeping Skills in Sync

If you customize skills and want both approaches to use them:

1. Maintain one source of truth (your pm-skills fork)
2. Point pm-skills-mcp to the same directory:
   ```json
   {
     "env": {
       "PM_SKILLS_PATH": "/path/to/pm-skills/skills"
     }
   }
   ```
3. Both approaches now use identical skills

---

## Command to Tool Mapping

Complete mapping of slash commands to MCP tools.

### Discovery Phase

| Slash Command | MCP Tool |
|--------------|----------|
| `/interview-synthesis` | `pm_interview_synthesis` |
| `/competitive-analysis` | `pm_competitive_analysis` |
| `/stakeholder-summary` | `pm_stakeholder_summary` |

### Define Phase

| Slash Command | MCP Tool |
|--------------|----------|
| `/problem-statement` | `pm_problem_statement` |
| `/hypothesis` | `pm_hypothesis` |
| `/opportunity-tree` | `pm_opportunity_tree` |
| `/jtbd-canvas` | `pm_jtbd_canvas` |

### Develop Phase

| Slash Command | MCP Tool |
|--------------|----------|
| `/solution-brief` | `pm_solution_brief` |
| `/spike-summary` | `pm_spike_summary` |
| `/adr` | `pm_adr` |
| `/design-rationale` | `pm_design_rationale` |

### Deliver Phase

| Slash Command | MCP Tool |
|--------------|----------|
| `/prd` | `pm_prd` |
| `/user-stories` | `pm_user_stories` |
| `/edge-cases` | `pm_edge_cases` |
| `/launch-checklist` | `pm_launch_checklist` |
| `/release-notes` | `pm_release_notes` |

### Measure Phase

| Slash Command | MCP Tool |
|--------------|----------|
| `/experiment-design` | `pm_experiment_design` |
| `/instrumentation-spec` | `pm_instrumentation_spec` |
| `/dashboard-requirements` | `pm_dashboard_requirements` |
| `/experiment-results` | `pm_experiment_results` |

### Iterate Phase

| Slash Command | MCP Tool |
|--------------|----------|
| `/retrospective` | `pm_retrospective` |
| `/lessons-log` | `pm_lessons_log` |
| `/refinement-notes` | `pm_refinement_notes` |
| `/pivot-decision` | `pm_pivot_decision` |

### Workflow Bundles

| Slash Command | MCP Tool |
|--------------|----------|
| `/kickoff` | `pm_workflow_feature_kickoff` |
| (manual chaining) | `pm_workflow_lean_startup` |
| (manual chaining) | `pm_workflow_quick_prd` |
| (manual chaining) | `pm_workflow_experiment_cycle` |
| (manual chaining) | `pm_workflow_triple_diamond` |

### Invocation Syntax Comparison

**File-based (slash commands):**
```
/prd "feature description with context"

/prd
> Please describe the feature...
```

**MCP (tool invocation):**
```
Use pm_prd with topic "feature description" and context "additional details"

Use pm_prd for the following feature:
[detailed description]
```

---

## Preserving Customizations

### Scenario 1: Modified Templates

You edited `skills/deliver-prd/references/TEMPLATE.md`.

**Migration approach:**
1. Copy your modified files to a persistent location
2. Set PM_SKILLS_PATH to that location
3. Both file-based and MCP can use the same customizations

### Scenario 2: Custom Skills

You created new skills in your pm-skills clone.

**Migration approach:**
1. Keep your fork as the source of truth
2. Configure both approaches to use it:
   - File-based: Clone is already in place
   - MCP: Set PM_SKILLS_PATH to your fork's skills directory

### Scenario 3: Heavy Modifications

You've extensively customized multiple skills.

**Recommended approach:**
1. Maintain your fork of pm-skills
2. Sync with upstream periodically
3. Use PM_SKILLS_PATH for MCP
4. Document your customizations for team

---

## Team Migration

### Migrating a Team to MCP

1. **Create shared configuration**

   Document the MCP config for your team:
   ```json
   {
     "mcpServers": {
       "pm-skills": {
         "command": "npx",
         "args": ["pm-skills-mcp"],
         "env": {
           "PM_SKILLS_PATH": "/path/to/team/pm-skills/skills"
         }
       }
     }
   }
   ```

2. **Update onboarding documentation**
   - Remove git clone instructions
   - Add MCP client configuration steps
   - Include tool invocation examples

3. **Train on new workflow**
   - Share command-to-tool mapping
   - Demonstrate workflow bundles
   - Show pm_list_skills and pm_search_skills utilities

4. **Phased rollout**
   - Start with willing early adopters
   - Gather feedback
   - Address issues before full rollout

### Migrating a Team to File-Based

1. **Add pm-skills to project repo**
   ```bash
   git submodule add https://github.com/product-on-purpose/pm-skills.git
   ```

2. **Document slash commands**
   - List commonly used commands
   - Add to team wiki or README

3. **Remove MCP configurations**
   - Provide instructions for each client
   - Verify removal across team

---

## Related Documentation

- [Getting Started](./getting-started.md) — Initial MCP setup
- [Integration Guide](./integration-guide.md) — Client-specific configuration
- [Customization Guide](./customization.md) — Using custom skills
- [PM-Skills Getting Started](https://github.com/product-on-purpose/pm-skills/blob/main/docs/getting-started.md) — File-based setup guide

---

*Questions about migration? [Open an issue](https://github.com/product-on-purpose/pm-skills-mcp/issues) or [start a discussion](https://github.com/product-on-purpose/pm-skills-mcp/discussions).*
