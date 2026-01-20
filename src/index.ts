#!/usr/bin/env node
/**
 * PM-Skills MCP Server Entry Point
 *
 * This MCP server exposes product management skills as tools
 * that can be invoked by any MCP-compatible AI client.
 */

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { loadConfig, SERVER_INFO } from './config.js';
import { PMSkillsServer } from './server.js';

/**
 * Main function - initializes and starts the MCP server
 */
async function main(): Promise<void> {
  // Load configuration
  const config = loadConfig();

  // Log startup info to stderr (stdout is reserved for MCP protocol)
  console.error(`Starting ${SERVER_INFO.name} v${SERVER_INFO.version}`);
  console.error(`Skills path: ${config.skillsPath}`);

  // Create and initialize server
  const pmServer = new PMSkillsServer(config);
  await pmServer.initialize();

  // Create stdio transport
  const transport = new StdioServerTransport();

  // Connect server to transport
  await pmServer.getServer().connect(transport);

  console.error(`${SERVER_INFO.name} running via stdio`);
}

// Run the server
main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
