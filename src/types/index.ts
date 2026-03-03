/**
 * PM-Skills MCP Server Type Definitions
 */

/**
 * Skill metadata from SKILL.md frontmatter
 */
export interface SkillMetadata {
  name: string;
  description: string;
  /** Phase from frontmatter (optional, can be derived from name) */
  phase?: SkillPhase;
  /** Classification from frontmatter (optional, can be derived from name) */
  classification?: SkillClassification;
  license: string;
  metadata: {
    category: string;
    frameworks: string[];
    author: string;
    version: string;
  };
}

/**
 * Triple Diamond phases
 */
export type SkillPhase = 'discover' | 'define' | 'develop' | 'deliver' | 'measure' | 'iterate';

/**
 * Taxonomy classification axis
 */
export type SkillClassification = 'domain' | 'foundation' | 'utility';

/**
 * Parsed skill with all content
 */
export interface Skill {
  /** Unique skill identifier (e.g., "prd") */
  name: string;
  /** Human-readable description */
  description: string;
  /** Taxonomy classification */
  classification: SkillClassification;
  /** Workflow phase (null for non-phase classifications like foundation/utility) */
  phase: SkillPhase | null;
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
 * All valid phases as array for iteration
 */
export const SKILL_PHASES: SkillPhase[] = [
  'discover',
  'define',
  'develop',
  'deliver',
  'measure',
  'iterate',
];

/**
 * All valid classifications as array for iteration
 */
export const SKILL_CLASSIFICATIONS: SkillClassification[] = ['domain', 'foundation', 'utility'];

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
    phase: SkillPhase | null;
    classification: SkillClassification;
    category: string;
    version: string;
  };
}

/**
 * Cache configuration
 */
export interface CacheConfig {
  /** Time-to-live in milliseconds (default: 5 minutes) */
  ttlMs?: number;
  /** Maximum cache entries (default: 100) */
  maxEntries?: number;
  /** Enable cache (default: true) */
  enabled?: boolean;
}

/**
 * Server configuration
 */
export interface ServerConfig {
  /** Path to skills directory (default: embedded) */
  skillsPath: string;
  /** Path to persona library directory (default: embedded) */
  personasPath?: string;
  /** Enable/disable specific phases */
  enabledPhases?: SkillPhase[];
  /** Enable/disable specific classifications */
  enabledClassifications?: SkillClassification[];
  /** Default output format */
  defaultFormat?: OutputFormat;
  /** Include examples by default */
  includeExamplesByDefault?: boolean;
  /** Cache configuration for performance optimization */
  cache?: CacheConfig;
}
