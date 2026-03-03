/**
 * Skill Loader - Parses SKILL.md files and loads associated templates/examples
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';
import type {
  Skill,
  SkillMetadata,
  SkillPhase,
  SkillClassification,
  ServerConfig,
} from '../types/index.js';
import { SKILL_PHASES, SKILL_CLASSIFICATIONS } from '../types/index.js';
import { getSkillCache } from '../cache.js';

/**
 * Parse a SKILL.md file and extract frontmatter and content
 */
async function parseSkillFile(filePath: string): Promise<{ metadata: SkillMetadata; content: string }> {
  let fileContent = await fs.readFile(filePath, 'utf-8');

  // Strip leading HTML comments (e.g., <!-- PM-Skills | ... -->)
  // gray-matter requires frontmatter to start at the beginning of the file
  fileContent = fileContent.replace(/^\s*<!--[\s\S]*?-->\s*/g, '');

  const { data, content } = matter(fileContent);

  // Validate required fields
  if (!data.name || !data.description) {
    throw new Error(`Invalid SKILL.md at ${filePath}: missing required fields (name, description)`);
  }

  const metadata: SkillMetadata = {
    name: data.name,
    description: data.description,
    phase: data.phase as SkillPhase | undefined, // Read phase from frontmatter
    classification: (data.classification || data.metadata?.classification) as
      | SkillClassification
      | undefined,
    license: data.license || 'Apache-2.0',
    metadata: {
      category: data.metadata?.category || 'general',
      frameworks: data.metadata?.frameworks || [],
      author: data.metadata?.author || 'unknown',
      version: data.metadata?.version || '1.0.0',
    },
  };

  return { metadata, content: content.trim() };
}

/**
 * Load optional file content (template or example)
 */
async function loadOptionalFile(filePath: string): Promise<string | null> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content.trim();
  } catch {
    return null;
  }
}

/**
 * Extract classification from skill metadata (frontmatter or name prefix)
 */
function extractClassificationFromMetadata(metadata: SkillMetadata): SkillClassification {
  // First check explicit classification field from frontmatter
  if (metadata.classification && SKILL_CLASSIFICATIONS.includes(metadata.classification)) {
    return metadata.classification;
  }

  // Fallback: derive from skill name prefix (e.g., "foundation-persona")
  if (metadata.name.startsWith('foundation-')) {
    return 'foundation';
  }
  if (metadata.name.startsWith('utility-')) {
    return 'utility';
  }

  // Default classification for phase-oriented skills
  return 'domain';
}

/**
 * Extract phase from skill metadata (frontmatter or name prefix)
 */
function extractPhaseFromMetadata(
  metadata: SkillMetadata,
  classification: SkillClassification
): SkillPhase | null {
  // First check explicit phase field from frontmatter
  if (metadata.phase && SKILL_PHASES.includes(metadata.phase)) {
    return metadata.phase;
  }

  // Foundation/utility are classification namespaces, not workflow phases.
  if (classification !== 'domain') {
    return null;
  }

  // Fallback: derive from skill name (e.g., "deliver-prd" → "deliver")
  for (const phase of SKILL_PHASES) {
    if (metadata.name.startsWith(`${phase}-`)) {
      return phase;
    }
  }
  throw new Error(`Cannot determine phase for skill: ${metadata.name}`);
}

/**
 * Load a single skill from its directory
 */
async function loadSkill(skillDir: string): Promise<Skill> {
  const skillFilePath = path.join(skillDir, 'SKILL.md');
  const templatePath = path.join(skillDir, 'references', 'TEMPLATE.md');
  const examplePath = path.join(skillDir, 'references', 'EXAMPLE.md');

  // Parse the main skill file
  const { metadata, content } = await parseSkillFile(skillFilePath);

  // Load optional files
  const [template, example] = await Promise.all([
    loadOptionalFile(templatePath),
    loadOptionalFile(examplePath),
  ]);

  // Extract classification/phase from metadata (frontmatter or name)
  const classification = extractClassificationFromMetadata(metadata);
  const phase = extractPhaseFromMetadata(metadata, classification);

  return {
    name: metadata.name,
    description: metadata.description,
    classification,
    phase,
    path: skillDir,
    metadata,
    instructions: content,
    template,
    example,
  };
}

/**
 * Load all skills from a skills directory
 */
export async function loadAllSkills(config: ServerConfig): Promise<Map<string, Skill>> {
  const skills = new Map<string, Skill>();
  const skillsPath = config.skillsPath;

  // Initialize the skill cache with config
  const cache = getSkillCache(config.cache);

  // Check if skills directory exists
  try {
    await fs.access(skillsPath);
  } catch {
    console.error(`Skills directory not found: ${skillsPath}`);
    return skills;
  }

  // Find all SKILL.md files
  const pattern = path.join(skillsPath, '**', 'SKILL.md').replace(/\\/g, '/');
  const skillFiles = await glob(pattern);

  // Load each skill (checking cache first)
  for (const skillFile of skillFiles) {
    const skillDir = path.dirname(skillFile);
    const skillName = path.basename(skillDir);

    try {
      // Check cache first
      let skill = cache.getSkill(skillName);

      if (!skill) {
        // Cache miss - load from disk
        skill = await loadSkill(skillDir);
        // Store in cache for future requests
        cache.setSkill(skill);
      }

      // Filter by enabled classifications if configured
      if (
        config.enabledClassifications &&
        !config.enabledClassifications.includes(skill.classification)
      ) {
        continue;
      }

      // Filter by enabled phases if configured
      if (config.enabledPhases && (!skill.phase || !config.enabledPhases.includes(skill.phase))) {
        continue;
      }

      skills.set(skill.name, skill);
    } catch (error) {
      console.error(`Failed to load skill from ${skillDir}:`, error);
    }
  }

  // Log cache stats on load
  const stats = cache.getStats();
  if (stats.hits > 0 || stats.misses > 0) {
    console.error(
      `Cache stats: ${stats.hits} hits, ${stats.misses} misses (${stats.hitRate.toFixed(1)}% hit rate)`
    );
  }

  return skills;
}

/**
 * Get a skill by name
 */
export function getSkill(skills: Map<string, Skill>, name: string): Skill | undefined {
  return skills.get(name);
}

/**
 * List all loaded skills
 */
export function listSkills(skills: Map<string, Skill>): Skill[] {
  return Array.from(skills.values());
}

/**
 * Group skills by phase
 */
export function groupSkillsByPhase(skills: Map<string, Skill>): Map<SkillPhase, Skill[]> {
  const grouped = new Map<SkillPhase, Skill[]>();

  for (const phase of SKILL_PHASES) {
    grouped.set(phase, []);
  }

  for (const skill of skills.values()) {
    if (!skill.phase) {
      continue;
    }
    const phaseSkills = grouped.get(skill.phase);
    if (phaseSkills) {
      phaseSkills.push(skill);
    }
  }

  return grouped;
}

/**
 * Reload a single skill from disk, invalidating cache
 */
export async function reloadSkill(skillDir: string): Promise<Skill> {
  const cache = getSkillCache();
  const skillName = path.basename(skillDir);

  // Invalidate cache entry
  cache.invalidateSkill(skillName);

  // Load fresh from disk
  const skill = await loadSkill(skillDir);

  // Store in cache
  cache.setSkill(skill);

  return skill;
}

/**
 * Get cache statistics
 */
export function getCacheStats(): import('../cache.js').CacheStats {
  return getSkillCache().getStats();
}

/**
 * Clear the skill cache
 */
export function clearSkillCache(): void {
  getSkillCache().clear();
}

/**
 * Prune expired entries from cache
 */
export function pruneSkillCache(): number {
  return getSkillCache().prune();
}
