# Claude Code Instructions

## Project Context

- **pm-skills-mcp** is a Model Context Protocol (MCP) server
- Exposes the [pm-skills](https://github.com/product-on-purpose/pm-skills) library as MCP tools
- Skills are embedded at build time from the upstream pm-skills repository
- Apache 2.0 licensed

## Documentation Rules

### Public vs Private Files

- **`_NOTES/`** is gitignored - external readers cannot access these paths
- **Never reference `_NOTES/`** in public-facing files:
  - README.md
  - CHANGELOG.md
  - CONTRIBUTING.md
  - Any file a user cloning the repo would read
- If content from `_NOTES/` needs to be public, move it to a tracked location first

### Skills Directory

- **`skills/`** is gitignored - embedded at build time, not tracked in git
- In documentation, describe skills as "embedded at build time from pm-skills"
- For skill content issues, direct users to the upstream pm-skills repository

### CHANGELOG Best Practices

- Describe **what changed**, not where your working files are
- Reference public paths only
- Link to GitHub issues/PRs for context, not internal planning docs

### File References

When referencing files in documentation:
- Use relative paths from repo root
- Only reference tracked (non-gitignored) files
- If a file is gitignored, summarize its content instead of linking

## Architecture Notes

### Build Process
1. `npm run embed-skills` copies skills from pm-skills repo
2. `npm run build` compiles TypeScript to `dist/`
3. `npm run prepublishOnly` runs embed + build before npm publish

### Key Directories
- `src/` - TypeScript source code
- `tests/` - Vitest test suite
- `dist/` - Compiled output (gitignored)
- `skills/` - Embedded skills (gitignored, populated at build)

### MCP Protocol
- Tools: One per PM skill (24 total)
- Resources: Skill templates and examples
- Prompts: Pre-configured skill invocations
