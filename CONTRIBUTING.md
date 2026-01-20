# Contributing to PM-Skills-MCP

Thank you for your interest in contributing to PM-Skills-MCP! This document provides guidelines for contributing code, documentation, and other improvements.

## Project Overview

PM-Skills-MCP is a Model Context Protocol (MCP) server that exposes the [pm-skills](https://github.com/product-on-purpose/pm-skills) library as tools for AI assistants. Skills are embedded at build time from the upstream pm-skills repository.

## Contribution Model

PM-Skills-MCP uses a **standard open-source** contribution model:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
5. Address review feedback
6. Merge after approval

## Types of Contributions

### Bug Fixes
- Fix issues with MCP server functionality
- Correct TypeScript type definitions
- Resolve compatibility issues with MCP clients

### New Features
- Add new MCP tools or resources
- Improve skill embedding process
- Enhance error handling and logging

### Documentation
- Improve README and usage guides
- Add code comments and JSDoc
- Update CHANGELOG

### Testing
- Add unit tests (Vitest)
- Improve test coverage
- Add integration tests

## Development Setup

```bash
# Clone the repository
git clone https://github.com/product-on-purpose/pm-skills-mcp.git
cd pm-skills-mcp

# Install dependencies
npm install

# Clone pm-skills for local development
git clone https://github.com/product-on-purpose/pm-skills.git ../pm-skills

# Embed skills
npm run embed-skills ../pm-skills/skills

# Build
npm run build

# Run tests
npm test

# Start development server
npm run dev
```

## Code Standards

### TypeScript
- Use strict TypeScript (`strict: true` in tsconfig)
- No explicit `any` types (warning enabled)
- All public functions should have JSDoc comments

### Formatting
- ESLint for linting (`npm run lint`)
- Prettier for formatting (`npm run format`)
- Run `npm run format:check` before committing

### Testing
- Write tests for new functionality
- Maintain existing test coverage
- Use Vitest test runner

## Pull Request Process

1. **Create a branch**: `feature/<description>` or `fix/<description>`
2. **Make changes** following the code standards above
3. **Run checks locally**:
   ```bash
   npm run lint
   npm run format:check
   npm run build
   npm test
   npx tsc --noEmit
   ```
4. **Submit PR** with:
   - Clear description of changes
   - Link to related issues (if any)
   - Confirmation that tests pass

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to providing a welcoming and inclusive environment.

## Questions?

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- See the [README](README.md) for project context

## Skill Contributions

To contribute new PM skills, please contribute to the upstream [pm-skills](https://github.com/product-on-purpose/pm-skills) repository. This repository only handles the MCP server implementation.

---

*By contributing, you agree that your contributions will be licensed under the Apache 2.0 license.*
