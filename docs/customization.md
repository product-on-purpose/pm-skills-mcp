# Customizing PM-Skills for MCP

This guide explains how to customize PM skills when using pm-skills-mcp. Whether you want to tweak a template or create entirely new skills, this document covers the full workflow.

---

## Table of Contents

- [Overview](#overview)
- [Customization Options](#customization-options)
- [Option 1: Environment Variable Override](#option-1-environment-variable-override)
- [Option 2: Full Fork Workflow](#option-2-full-fork-workflow)
- [Skill Structure Requirements](#skill-structure-requirements)
- [Testing Custom Skills](#testing-custom-skills)
- [Examples](#examples)
- [Keeping Your Fork in Sync](#keeping-your-fork-in-sync)
- [Troubleshooting](#troubleshooting)

---

## Overview

PM-Skills MCP can use skills from any directory that follows the pm-skills structure. By default, it uses embedded skills (copied from pm-skills at build time), but you can override this with your own customized skills.

**Customization scenarios:**
- Add company-specific sections to templates
- Modify output formats for your team's preferences
- Add new skills for your organization's processes
- Remove skills you don't use
- Translate skills to other languages

---

## Customization Options

| Approach | Complexity | Best For |
|----------|------------|----------|
| Environment variable override | Low | Quick modifications, testing |
| Full fork workflow | Medium | Long-term customization, team sharing |

---

## Option 1: Environment Variable Override

The simplest approach—point pm-skills-mcp to any skills directory.

### Setup

1. **Create your skills directory**
   ```bash
   mkdir -p ~/my-pm-skills
   ```

2. **Copy existing skills to modify**
   ```bash
   # Clone pm-skills to get the base skills
   git clone https://github.com/product-on-purpose/pm-skills.git /tmp/pm-skills

   # Copy the skills directory
   cp -r /tmp/pm-skills/skills/* ~/my-pm-skills/
   ```

3. **Configure pm-skills-mcp**

   In your MCP client config (e.g., `claude_desktop_config.json`):
   ```json
   {
     "mcpServers": {
       "pm-skills": {
         "command": "npx",
         "args": ["pm-skills-mcp"],
         "env": {
           "PM_SKILLS_PATH": "/Users/you/my-pm-skills"
         }
       }
     }
   }
   ```

4. **Restart your MCP client**

5. **Modify skills as needed**

   Edit files in `~/my-pm-skills/` — changes take effect on next tool invocation.

### Pros and Cons

| Pros | Cons |
|------|------|
| Quick to set up | Manual update process |
| No git knowledge needed | Not easily shareable |
| Easy to test changes | No version control by default |

---

## Option 2: Full Fork Workflow

For long-term customization with version control and easy team sharing.

### Step 1: Fork pm-skills

```bash
# Fork via GitHub CLI
gh repo fork product-on-purpose/pm-skills --clone

# Or fork via GitHub UI, then clone
git clone https://github.com/YOUR-USERNAME/pm-skills.git
cd pm-skills
```

### Step 2: Understand the Structure

Skills live in `skills/{phase}/{skill-name}/`:

```
skills/
├── discover/
│   ├── interview-synthesis/
│   ├── competitive-analysis/
│   └── stakeholder-summary/
├── define/
│   ├── problem-statement/
│   ├── hypothesis/
│   ├── opportunity-tree/
│   └── jtbd-canvas/
├── develop/
│   ├── solution-brief/
│   ├── spike-summary/
│   ├── adr/
│   └── design-rationale/
├── deliver/
│   ├── prd/
│   ├── user-stories/
│   ├── edge-cases/
│   ├── launch-checklist/
│   └── release-notes/
├── measure/
│   ├── experiment-design/
│   ├── instrumentation-spec/
│   ├── dashboard-requirements/
│   └── experiment-results/
└── iterate/
    ├── retrospective/
    ├── lessons-log/
    ├── refinement-notes/
    └── pivot-decision/
```

Each skill folder contains:
```
skill-name/
├── SKILL.md              # Instructions for the AI (required)
└── references/
    ├── TEMPLATE.md       # Output structure (required)
    └── EXAMPLE.md        # Worked example (required)
```

### Step 3: Modify Skills

**Example: Adding a company section to PRD template**

Edit `skills/deliver/prd/references/TEMPLATE.md`:

```markdown
# Product Requirements Document

## Overview
...

## Company-Specific Requirements

### Compliance Checklist
- [ ] GDPR review completed
- [ ] Security review scheduled
- [ ] Legal approval obtained

### Internal Stakeholders
| Team | Contact | Sign-off Status |
|------|---------|-----------------|
| Legal | @legal-team | Pending |
| Security | @security-team | Pending |
| Finance | @finance-team | Pending |

## Technical Specifications
...
```

### Step 4: Configure pm-skills-mcp

Point to your forked skills directory:

```json
{
  "mcpServers": {
    "pm-skills": {
      "command": "npx",
      "args": ["pm-skills-mcp"],
      "env": {
        "PM_SKILLS_PATH": "/path/to/your/pm-skills/skills"
      }
    }
  }
}
```

**Important:** Point to the `skills/` subdirectory, not the repo root.

### Step 5: Test Changes

1. Restart your MCP client
2. Invoke the modified skill:
   ```
   Use pm_prd for a new feature
   ```
3. Verify your customizations appear in output

### Step 6: Commit and Share

```bash
git add skills/deliver/prd/references/TEMPLATE.md
git commit -m "Add company compliance section to PRD template"
git push origin main
```

Team members can clone your fork and use the same custom skills.

---

## Skill Structure Requirements

pm-skills-mcp expects skills to follow a specific structure.

### Directory Structure

```
skills/
└── {phase}/                    # discover, define, develop, deliver, measure, iterate
    └── {skill-name}/           # lowercase with hyphens
        ├── SKILL.md            # Required
        └── references/
            ├── TEMPLATE.md     # Required
            └── EXAMPLE.md      # Required
```

### SKILL.md Requirements

```markdown
---
name: skill-name
description: Brief description of what this skill creates
version: 1.0.0
category: phase-name
tags:
  - relevant
  - tags
---

# Skill Name

## Purpose

What this skill helps create and why.

## Instructions

Step-by-step guidance for the AI.

## Output Format

Description of expected output structure.

## Quality Criteria

What makes a good output.
```

**Required frontmatter fields:**
- `name`: Skill identifier (used in tool name: `pm_{name}`)
- `description`: Brief description (shown in tool list)

**Optional frontmatter fields:**
- `version`: Skill version
- `category`: Phase name
- `tags`: Keywords for search

### TEMPLATE.md Requirements

The template defines the output structure. Use markdown headers to define sections:

```markdown
# Document Title

## Section 1
[Description or placeholder]

## Section 2

### Subsection 2.1
[Content guidance]

### Subsection 2.2
[Content guidance]

## Section 3
[Content guidance]
```

### EXAMPLE.md Requirements

A complete, realistic example that demonstrates quality output:

```markdown
# Example: [Specific Topic]

## Section 1
[Filled-in content showing what good looks like]

## Section 2
[Filled-in content...]
```

---

## Testing Custom Skills

### Local Testing Workflow

1. **Set environment variable**
   ```bash
   export PM_SKILLS_PATH=/path/to/your/skills
   ```

2. **Run server directly to check for errors**
   ```bash
   npx pm-skills-mcp
   # Should start without errors
   # Ctrl+C to stop
   ```

3. **Restart MCP client**

4. **Test skill listing**
   ```
   Use pm_list_skills to show all skills
   ```

   Verify your skills appear in the list.

5. **Test individual skill**
   ```
   Use pm_{your-skill-name} for test topic
   ```

6. **Check output matches expectations**
   - Template structure followed
   - Custom sections included
   - No parsing errors

### Using pm_validate

The `pm_validate` tool checks artifacts against skill templates:

```
Use pm_validate to check if this PRD follows the template:
[paste your PRD content]
```

### Common Issues

| Symptom | Likely Cause |
|---------|--------------|
| Skill not appearing | Missing SKILL.md or frontmatter |
| Parsing errors | Invalid YAML in frontmatter |
| Template not used | TEMPLATE.md not found |
| Skill invocation fails | Directory structure incorrect |

---

## Examples

### Example 1: Adding Company Branding

Modify `skills/deliver/release-notes/references/TEMPLATE.md`:

```markdown
# Release Notes

![Company Logo](https://example.com/logo.png)

**Product:** [Product Name]
**Version:** [Version Number]
**Release Date:** [Date]

---

## What's New
...
```

### Example 2: Modifying Output Format

Change PRD from sections to a more compact format.

Edit `skills/deliver/prd/SKILL.md`:

```markdown
## Output Format

Generate a concise PRD using this structure:
- Use bullet points instead of long paragraphs
- Limit to 2 pages maximum
- Include executive summary at top
- Technical details in appendix only
```

### Example 3: Adding a Custom Skill

Create a new skill for your organization's specific artifact:

```bash
mkdir -p skills/deliver/launch-brief/references
```

Create `skills/deliver/launch-brief/SKILL.md`:

```markdown
---
name: launch-brief
description: Create a one-page launch brief for executive review
version: 1.0.0
category: deliver
tags:
  - launch
  - executive
  - brief
---

# Launch Brief Skill

## Purpose

Create a concise, one-page launch brief for executive stakeholders.

## Instructions

1. Summarize the launch in 3 sentences
2. List key dates and milestones
3. Identify top 3 risks and mitigations
4. Include success metrics
5. List required approvals

## Output Format

Single page with:
- Executive summary (3 sentences)
- Timeline table
- Risk matrix
- Metrics dashboard mockup
- Approval checklist

## Quality Criteria

- Fits on one page
- No jargon—executive readable
- Clear call to action
```

Create `skills/deliver/launch-brief/references/TEMPLATE.md`:

```markdown
# Launch Brief: [Product/Feature Name]

**Prepared by:** [Author]
**Date:** [Date]
**Status:** Draft | Ready for Review | Approved

---

## Executive Summary

[3 sentences: What, Why, When]

## Timeline

| Milestone | Date | Owner | Status |
|-----------|------|-------|--------|
| Development Complete | | | |
| QA Sign-off | | | |
| Launch | | | |

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| | | | |

## Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| | | |

## Required Approvals

- [ ] Product Lead
- [ ] Engineering Lead
- [ ] Legal
- [ ] Executive Sponsor
```

Create `skills/deliver/launch-brief/references/EXAMPLE.md`:

```markdown
# Launch Brief: Dark Mode Support

**Prepared by:** Jane Smith
**Date:** 2024-01-15
**Status:** Ready for Review

---

## Executive Summary

We're launching dark mode support to reduce eye strain and improve battery life on OLED devices. This addresses our #2 most-requested feature with 2,400 user votes. Target launch is February 1st with a phased rollout.

## Timeline

| Milestone | Date | Owner | Status |
|-----------|------|-------|--------|
| Development Complete | Jan 20 | @dev-team | Complete |
| QA Sign-off | Jan 25 | @qa-team | In Progress |
| Launch (10% rollout) | Feb 1 | @product | Planned |
| Full rollout | Feb 15 | @product | Planned |

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Color contrast issues | Medium | High | Accessibility audit scheduled |
| Performance regression | Low | Medium | Performance benchmarks in CI |
| User confusion | Low | Low | In-app tutorial planned |

## Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Adoption rate | 30% in 30 days | Analytics dashboard |
| User satisfaction | 4.5+ rating | In-app survey |
| Support tickets | <50 related tickets | Support tracking |

## Required Approvals

- [x] Product Lead — @jane-smith
- [x] Engineering Lead — @john-doe
- [ ] Legal — @legal-team
- [ ] Executive Sponsor — @exec
```

---

## Keeping Your Fork in Sync

Stay updated with upstream pm-skills improvements:

### Initial Setup

```bash
cd your-pm-skills-fork
git remote add upstream https://github.com/product-on-purpose/pm-skills.git
```

### Regular Sync

```bash
# Fetch upstream changes
git fetch upstream

# Merge into your branch
git checkout main
git merge upstream/main

# Resolve any conflicts in your customized files
# Then push to your fork
git push origin main
```

### Handling Merge Conflicts

When upstream changes conflict with your customizations:

1. Open conflicted files
2. Look for conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
3. Keep your customizations while incorporating upstream improvements
4. Test the merged skill
5. Commit the resolution

---

## Troubleshooting

### Custom skills not loading

**Check 1:** Verify PM_SKILLS_PATH is set correctly
```bash
echo $PM_SKILLS_PATH
# Should show your skills directory
```

**Check 2:** Verify directory structure
```bash
ls -la $PM_SKILLS_PATH
# Should show: discover/ define/ develop/ deliver/ measure/ iterate/
```

**Check 3:** Verify skill has required files
```bash
ls -la $PM_SKILLS_PATH/deliver/prd/
# Should show: SKILL.md  references/
```

### YAML parsing errors

**Symptom:** Server fails to start or skill doesn't load.

**Solution:** Validate YAML frontmatter:
```yaml
---
name: skill-name          # No special characters
description: "Use quotes if description has colons: like this"
version: 1.0.0           # Quoted if needed
---
```

Use an online YAML validator to check syntax.

### Skill appears but template not used

**Check:** Ensure TEMPLATE.md exists in references/
```bash
cat $PM_SKILLS_PATH/deliver/prd/references/TEMPLATE.md
```

### Changes not taking effect

1. Restart your MCP client (not just the conversation)
2. Verify you edited the correct file (not embedded skills)
3. Check PM_SKILLS_PATH points to the right directory

---

## Related Documentation

- [Getting Started](./getting-started.md) — Initial setup
- [Integration Guide](./integration-guide.md) — Client-specific configuration
- [PM-Skills Authoring Guide](https://github.com/product-on-purpose/pm-skills/blob/main/docs/guides/authoring-pm-skills.md) — Detailed skill authoring reference
- [Agent Skills Specification](https://agentskills.io/specification) — The underlying skill format standard

---

*Have questions about customization? [Open an issue](https://github.com/product-on-purpose/pm-skills-mcp/issues) or [start a discussion](https://github.com/product-on-purpose/pm-skills-mcp/discussions).*
