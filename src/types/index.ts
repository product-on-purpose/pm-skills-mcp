/**
 * PM-Skills MCP Server Type Definitions
 */

/**
 * Skill metadata from SKILL.md frontmatter
 */
export interface SkillMetadata {
  name: string;
  description: string;
  license: string;
  metadata: {
    category: string;
    frameworks: string[];
    author: string;
    version: string;
  };
}

/**
 * Parsed skill with all content
 */
export interface Skill {
  /** Unique skill identifier (e.g., "prd") */
  name: string;
  /** Human-readable description */
  description: string;
  /** Phase this skill belongs to */
  phase: SkillPhase;
  /** Full path to skill directory */
  path: string;
  /** Parsed frontmatter metadata */
  metadata: SkillMetadata;
  /** Main skill instructions (SKILL.md body) */
  instructions: string;
  /** Template content (TEMPLATE.md) */
  template: string | null;
  /** Example content (EXAMPLE.md) */
  example: string | null;
}

/**
 * Triple Diamond phases
 */
export type SkillPhase =
  | 'discover'
  | 'define'
  | 'develop'
  | 'deliver'
  | 'measure'
  | 'iterate';

/**
 * All valid phases as array for iteration
 */
export const SKILL_PHASES: SkillPhase[] = [
  'discover',
  'define',
  'develop',
  'deliver',
  'measure',
  'iterate'
];

/**
 * Tool output format preference
 */
export type OutputFormat = 'full' | 'concise' | 'template-only';

/**
 * Common input schema for skill tools
 */
export interface SkillToolInput {
  /** The subject or feature to create this artifact for */
  topic: string;
  /** Additional context, constraints, or requirements */
  context?: string;
  /** Output format preference */
  format?: OutputFormat;
  /** Whether to include a completed example */
  includeExample?: boolean;
}

/**
 * Tool response content structure
 */
export interface SkillToolContent {
  /** The core template */
  template: string;
  /** Detailed instructions (included in 'full' format) */
  instructions?: string;
  /** Completed example (when includeExample is true) */
  example?: string;
  /** Quality checklist items */
  checklist?: string[];
}

/**
 * Full tool response
 */
export interface SkillToolResponse {
  /** The skill name */
  skill: string;
  /** Human-readable description */
  description: string;
  /** Main content based on format */
  content: SkillToolContent;
  /** Skill metadata */
  metadata: {
    phase: SkillPhase;
    category: string;
    version: string;
  };
}

/**
 * Server configuration
 */
export interface ServerConfig {
  /** Path to skills directory (default: embedded) */
  skillsPath: string;
  /** Enable/disable specific phases */
  enabledPhases?: SkillPhase[];
  /** Default output format */
  defaultFormat?: OutputFormat;
  /** Include examples by default */
  includeExamplesByDefault?: boolean;
}
