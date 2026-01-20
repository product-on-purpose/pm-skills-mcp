import { describe, it, expect, beforeAll } from 'vitest';
import path from 'path';
import { fileURLToPath } from 'url';
import { PMSkillsServer } from '../src/server.js';
import type { ServerConfig } from '../src/types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use embedded skills for testing
const SKILLS_PATH = path.resolve(__dirname, '../skills');

describe('PMSkillsServer', () => {
  let server: PMSkillsServer;

  beforeAll(async () => {
    const config: ServerConfig = {
      skillsPath: SKILLS_PATH,
    };
    server = new PMSkillsServer(config);
    await server.initialize();
  });

  it('should initialize with correct skill count', () => {
    expect(server.getSkillsCount()).toBe(24);
  });

  it('should initialize with correct resource count', () => {
    // 24 skills * 3 (skill, template, example) = 72
    expect(server.getResourcesCount()).toBe(72);
  });

  it('should initialize with correct prompt count', () => {
    expect(server.getPromptsCount()).toBe(3);
  });

  it('should have MCP server instance', () => {
    const mcpServer = server.getServer();
    expect(mcpServer).toBeDefined();
  });
});

describe('PMSkillsServer with phase filter', () => {
  it('should respect enabled phases filter', async () => {
    const config: ServerConfig = {
      skillsPath: SKILLS_PATH,
      enabledPhases: ['deliver'],
    };
    const server = new PMSkillsServer(config);
    await server.initialize();

    expect(server.getSkillsCount()).toBe(5); // Only deliver phase skills
  });
});
