/**
 * MCP Resources - URI-based access to skills, templates, examples, and persona library files
 *
 * Resource URI Schemas:
 * - pm-skills://skills/{skill}              - Full skill instructions
 * - pm-skills://templates/{skill}           - Template only
 * - pm-skills://examples/{skill}            - Example only
 * - pm-skills://personas/{category}/{name}  - Persona library entry
 */

import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { Skill, SkillPhase, SkillClassification } from '../types/index.js';

/** Resource types supported */
export type ResourceType = 'skill' | 'template' | 'example' | 'persona';

/** Persona resource entry */
export interface PersonaResource {
  uri: string;
  name: string;
  description: string;
  mimeType: 'text/markdown';
  metadata: {
    type: 'persona';
    category: string;
    persona: string;
  };
  content: string;
}

/** Resource metadata structure */
export interface ResourceInfo {
  uri: string;
  name: string;
  description: string;
  mimeType: 'text/markdown';
  metadata: {
    type: ResourceType;
    skill?: string;
    phase?: SkillPhase | null;
    classification?: SkillClassification;
    category?: string;
    persona?: string;
  };
}

type ParsedSkillResourceUri =
  | { type: 'skill'; skill: string }
  | { type: 'template'; skill: string }
  | { type: 'example'; skill: string };

type ParsedPersonaResourceUri = {
  type: 'persona';
  category: string;
  persona: string;
};

type ParsedResourceUri = ParsedSkillResourceUri | ParsedPersonaResourceUri;

/**
 * Build a skill resource URI (flat format)
 */
export function buildResourceUri(type: Exclude<ResourceType, 'persona'>, skillName: string): string {
  const typeMap: Record<Exclude<ResourceType, 'persona'>, string> = {
    skill: 'skills',
    template: 'templates',
    example: 'examples',
  };
  return `pm-skills://${typeMap[type]}/${skillName}`;
}

/**
 * Build a persona resource URI
 */
export function buildPersonaUri(category: string, persona: string): string {
  return `pm-skills://personas/${category}/${persona}`;
}

/**
 * Parse a resource URI to extract type and identifiers
 */
export function parseResourceUri(uri: string): ParsedResourceUri | null {
  const personaMatch = uri.match(/^pm-skills:\/\/personas\/([a-z0-9-]+)\/([a-z0-9-]+)$/);
  if (personaMatch) {
    return {
      type: 'persona',
      category: personaMatch[1],
      persona: personaMatch[2],
    };
  }

  const skillMatch = uri.match(/^pm-skills:\/\/(skills|templates|examples)\/([a-z0-9-]+)$/);
  if (!skillMatch) return null;

  const typeMap: Record<string, 'skill' | 'template' | 'example'> = {
    skills: 'skill',
    templates: 'template',
    examples: 'example',
  };

  return {
    type: typeMap[skillMatch[1]],
    skill: skillMatch[2],
  };
}

/**
 * Build resource info for a skill
 */
function buildSkillResourceInfo(
  skill: Skill,
  type: Exclude<ResourceType, 'persona'>
): ResourceInfo {
  const uri = buildResourceUri(type, skill.name);
  const typeDescriptions: Record<Exclude<ResourceType, 'persona'>, string> = {
    skill: `Full instructions for creating a ${skill.name.toUpperCase()} artifact`,
    template: `Blank template for ${skill.name.toUpperCase()} artifact`,
    example: `Completed example of ${skill.name.toUpperCase()} artifact`,
  };

  return {
    uri,
    name: `${skill.name}-${type}`,
    description: typeDescriptions[type],
    mimeType: 'text/markdown',
    metadata: {
      phase: skill.phase,
      classification: skill.classification,
      skill: skill.name,
      type,
    },
  };
}

/**
 * Build resource info for persona library entry
 */
function buildPersonaResourceInfo(persona: PersonaResource): ResourceInfo {
  return {
    uri: persona.uri,
    name: persona.name,
    description: persona.description,
    mimeType: 'text/markdown',
    metadata: {
      type: 'persona',
      category: persona.metadata.category,
      persona: persona.metadata.persona,
    },
  };
}

/**
 * Get content for a skill resource
 */
function getSkillResourceContent(
  skill: Skill,
  type: Exclude<ResourceType, 'persona'>
): string | null {
  switch (type) {
    case 'skill':
      return skill.instructions;
    case 'template':
      return skill.template;
    case 'example':
      return skill.example;
    default:
      return null;
  }
}

/**
 * Create a deterministic persona resource ID.
 */
function personaResourceName(category: string, persona: string): string {
  return `${category}-${persona}`;
}

/**
 * Load persona library resources from filesystem.
 */
export async function loadPersonaResources(personasPath?: string): Promise<PersonaResource[]> {
  if (!personasPath) {
    return [];
  }

  try {
    await fs.access(personasPath);
  } catch {
    return [];
  }

  const pattern = path.join(personasPath, '**', '*.md').replace(/\\/g, '/');
  const files = await glob(pattern, { nodir: true });
  const personas: PersonaResource[] = [];

  for (const file of files) {
    const relative = path.relative(personasPath, file).replace(/\\/g, '/');
    const segments = relative.split('/').filter(Boolean);

    // Expected layout: personas/{category}/{persona}.md (skip README index files)
    if (segments.length < 2 || segments[segments.length - 1].toLowerCase() === 'readme.md') {
      continue;
    }

    const category = segments[0];
    const personaFile = segments[segments.length - 1];
    const persona = personaFile.replace(/\.md$/i, '');

    const content = (await fs.readFile(file, 'utf-8')).trim();
    if (!content) {
      continue;
    }

    const uri = buildPersonaUri(category, persona);
    personas.push({
      uri,
      name: personaResourceName(category, persona),
      description: `Persona library reference for ${persona.replace(/-/g, ' ')}`,
      mimeType: 'text/markdown',
      metadata: {
        type: 'persona',
        category,
        persona,
      },
      content,
    });
  }

  return personas.sort((a, b) => a.uri.localeCompare(b.uri));
}

/**
 * Register all resources for the loaded skills + persona library
 */
export function registerResources(
  server: McpServer,
  skills: Map<string, Skill>,
  personas: PersonaResource[] = []
): number {
  // Build list of all resources
  const allResources: ResourceInfo[] = listResources(skills, personas);
  const personaByUri = new Map(personas.map((persona) => [persona.uri, persona]));

  server.resource('pm-skills-skill-resources', 'pm-skills://{type}/{skill}', async (uri) => {
    const parsed = parseResourceUri(uri.href);
    if (!parsed) {
      throw new Error(`Invalid resource URI: ${uri.href}`);
    }
    if (parsed.type === 'persona') {
      throw new Error(`Persona resources require persona URI pattern: ${uri.href}`);
    }

    const skill = skills.get(parsed.skill);
    if (!skill) {
      throw new Error(`Skill not found: ${parsed.skill}`);
    }

    const content = getSkillResourceContent(skill, parsed.type);
    if (!content) {
      throw new Error(`${parsed.type} not available for skill: ${parsed.skill}`);
    }

    return {
      contents: [
        {
          uri: uri.href,
          mimeType: 'text/markdown',
          text: content,
        },
      ],
    };
  });

  server.resource(
    'pm-skills-persona-resources',
    'pm-skills://personas/{category}/{persona}',
    async (uri) => {
      const parsed = parseResourceUri(uri.href);
      if (!parsed || parsed.type !== 'persona') {
        throw new Error(`Invalid persona resource URI: ${uri.href}`);
      }

      const personaUri = buildPersonaUri(parsed.category, parsed.persona);
      const persona = personaByUri.get(personaUri);
      if (!persona) {
        throw new Error(`Persona resource not found: ${personaUri}`);
      }

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'text/markdown',
            text: persona.content,
          },
        ],
      };
    }
  );

  const resourceCount = allResources.length;
  console.error(`Registered ${resourceCount} resources`);
  return resourceCount;
}

/**
 * List all available resources (for use in handlers)
 */
export function listResources(
  skills: Map<string, Skill>,
  personas: PersonaResource[] = []
): ResourceInfo[] {
  const resources: ResourceInfo[] = [];
  const sortedSkills = Array.from(skills.values()).sort((a, b) => a.name.localeCompare(b.name));

  for (const skill of sortedSkills) {
    // Always add skill resource
    resources.push(buildSkillResourceInfo(skill, 'skill'));

    // Add template if available
    if (skill.template) {
      resources.push(buildSkillResourceInfo(skill, 'template'));
    }

    // Add example if available
    if (skill.example) {
      resources.push(buildSkillResourceInfo(skill, 'example'));
    }
  }

  for (const persona of personas.slice().sort((a, b) => a.uri.localeCompare(b.uri))) {
    resources.push(buildPersonaResourceInfo(persona));
  }

  return resources;
}
