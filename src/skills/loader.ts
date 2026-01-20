/**
 * Skill Loader - Parses SKILL.md files and loads associated templates/examples
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { glob } from 'glob';
import type { Skill, SkillMetadata, SkillPhase, ServerConfig } from '../types/index.js';
import { SKILL_PHASES } from '../types/index.js';

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
 * Determine phase from directory path
 */
function extractPhase(skillPath: string): SkillPhase {
  const normalizedPath = skillPath.replace(/\\/g, '/');
  for (const phase of SKILL_PHASES) {
    if (normalizedPath.includes(`/${phase}/`) || normalizedPath.includes(`\\${phase}\\`)) {
      return phase;
    }
  }
  // Default to 'deliver' if phase cannot be determined
  return 'deliver';
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

  // Extract phase from path
  const phase = extractPhase(skillDir);

  return {
    name: metadata.name,
    description: metadata.description,
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

  // Load each skill
  for (const skillFile of skillFiles) {
    const skillDir = path.dirname(skillFile);
    try {
      const skill = await loadSkill(skillDir);

      // Filter by enabled phases if configured
      if (config.enabledPhases && !config.enabledPhases.includes(skill.phase)) {
        continue;
      }

      skills.set(skill.name, skill);
    } catch (error) {
      console.error(`Failed to load skill from ${skillDir}:`, error);
    }
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
    const phaseSkills = grouped.get(skill.phase);
    if (phaseSkills) {
      phaseSkills.push(skill);
    }
  }

  return grouped;
}
