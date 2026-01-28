/**
 * PM-Skills MCP Server Configuration
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import type { ServerConfig, SkillPhase, OutputFormat, CacheConfig } from './types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Default skills path - embedded skills directory
 * Can be overridden via PM_SKILLS_PATH environment variable
 *
 * Resolution order:
 * 1. PM_SKILLS_PATH env var (explicit override)
 * 2. Embedded skills in package (./skills relative to dist)
 * 3. PM_SKILLS_DEV_PATH env var (for development)
 */
const EMBEDDED_SKILLS_PATH = path.resolve(__dirname, '../skills');

function getDefaultSkillsPath(): string {
  // Check if embedded skills exist (production mode)
  if (fs.existsSync(EMBEDDED_SKILLS_PATH)) {
    return EMBEDDED_SKILLS_PATH;
  }

  // Check for dev path via environment variable
  const devPath = process.env.PM_SKILLS_DEV_PATH;
  if (devPath && fs.existsSync(devPath)) {
    return devPath;
  }

  // Return embedded path even if it doesn't exist (will error later with helpful message)
  return EMBEDDED_SKILLS_PATH;
}

const DEFAULT_SKILLS_PATH = getDefaultSkillsPath();

/**
 * Load configuration from environment and defaults
 */
export function loadConfig(): ServerConfig {
  const skillsPath = process.env.PM_SKILLS_PATH || DEFAULT_SKILLS_PATH;

  // Parse enabled phases from environment if provided
  let enabledPhases: SkillPhase[] | undefined;
  if (process.env.PM_SKILLS_PHASES) {
    enabledPhases = process.env.PM_SKILLS_PHASES.split(',').map((p) => p.trim()) as SkillPhase[];
  }

  // Parse default format
  let defaultFormat: OutputFormat = 'full';
  if (process.env.PM_SKILLS_FORMAT) {
    const format = process.env.PM_SKILLS_FORMAT.toLowerCase();
    if (format === 'concise' || format === 'template-only') {
      defaultFormat = format;
    }
  }

  // Parse include examples default
  const includeExamplesByDefault = process.env.PM_SKILLS_INCLUDE_EXAMPLES === 'true';

  // Parse cache configuration
  const cache: CacheConfig = {
    enabled: process.env.PM_SKILLS_CACHE_DISABLED !== 'true',
    ttlMs: process.env.PM_SKILLS_CACHE_TTL_MS
      ? parseInt(process.env.PM_SKILLS_CACHE_TTL_MS, 10)
      : 5 * 60 * 1000, // 5 minutes default
    maxEntries: process.env.PM_SKILLS_CACHE_MAX_ENTRIES
      ? parseInt(process.env.PM_SKILLS_CACHE_MAX_ENTRIES, 10)
      : 100,
  };

  return {
    skillsPath,
    enabledPhases,
    defaultFormat,
    includeExamplesByDefault,
    cache,
  };
}

/**
 * Server metadata
 */
export const SERVER_INFO = {
  name: 'pm-skills-mcp',
  version: '2.1.0',
  description: 'MCP server exposing 24 product management skills as tools',
} as const;

/**
 * Tool naming configuration
 */
export const TOOL_CONFIG = {
  /** Prefix for all skill tools */
  prefix: 'pm_',
  /** Prefix for workflow bundle tools */
  workflowPrefix: 'pm_workflow_',
} as const;
