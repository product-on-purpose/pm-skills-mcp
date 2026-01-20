/**
 * PM-Skills MCP Server Configuration
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import type { ServerConfig, SkillPhase, OutputFormat } from './types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Default skills path - embedded skills directory
 * Can be overridden via PM_SKILLS_PATH environment variable
 *
 * For development, falls back to the pm-skills repo if embedded path doesn't exist
 */
const EMBEDDED_SKILLS_PATH = path.resolve(__dirname, '../skills');
const DEV_SKILLS_PATH = 'E:/Projects/product-on-purpose/pm-skills/skills';

function getDefaultSkillsPath(): string {
  // Check if embedded skills exist
  if (fs.existsSync(EMBEDDED_SKILLS_PATH)) {
    return EMBEDDED_SKILLS_PATH;
  }
  // Fall back to dev path for development
  if (fs.existsSync(DEV_SKILLS_PATH)) {
    return DEV_SKILLS_PATH;
  }
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
    enabledPhases = process.env.PM_SKILLS_PHASES.split(',').map(p => p.trim()) as SkillPhase[];
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

  return {
    skillsPath,
    enabledPhases,
    defaultFormat,
    includeExamplesByDefault,
  };
}

/**
 * Server metadata
 */
export const SERVER_INFO = {
  name: 'pm-skills-mcp',
  version: '0.1.0',
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
