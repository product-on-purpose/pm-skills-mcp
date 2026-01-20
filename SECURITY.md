# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1.0 | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in pm-skills-mcp, please report it responsibly.

**Do not report security vulnerabilities through public GitHub issues.**

Instead, please use GitHub's [private vulnerability reporting](https://github.com/product-on-purpose/pm-skills-mcp/security/advisories/new) feature.

We will:
- Acknowledge receipt within 48 hours
- Provide a detailed response within 72 hours
- Keep you informed of progress toward resolution

## Scope

This security policy applies to:
- The pm-skills-mcp MCP server implementation
- TypeScript source code and build artifacts
- GitHub Actions workflows in this repository
- npm package distribution

## Primary Concerns

Since pm-skills-mcp is an MCP server that processes skill templates, the primary security concerns are:

- **Prompt injection** through malicious skill content
- **Path traversal** in file read operations
- **Dependency vulnerabilities** in npm packages
- **Input validation** for MCP tool parameters
- **Resource exhaustion** through malformed requests
