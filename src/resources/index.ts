/**
 * MCP Resources - URI-based access to skills, templates, and examples
 *
 * Resource URI Schema (v2.1 flat format):
 * - pm-skills://skills/{skill}     - Full skill instructions
 * - pm-skills://templates/{skill}  - Template only
 * - pm-skills://examples/{skill}   - Example only
 *
 * Phase information is available in resource metadata.
 */

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { Skill, SkillPhase } from '../types/index.js';

/** Resource types supported */
export type ResourceType = 'skill' | 'template' | 'example';

/** Resource metadata structure */
export interface ResourceInfo {
  uri: string;
  name: string;
  description: string;
  mimeType: 'text/markdown';
  metadata: {
    phase: SkillPhase;
    skill: string;
    type: ResourceType;
  };
}

/**
 * Build a resource URI (flat format)
 */
export function buildResourceUri(type: ResourceType, skillName: string): string {
  const typeMap: Record<ResourceType, string> = {
    skill: 'skills',
    template: 'templates',
    example: 'examples',
  };
  return `pm-skills://${typeMap[type]}/${skillName}`;
}

/**
 * Parse a resource URI to extract type and skill (flat format)
 */
export function parseResourceUri(uri: string): { type: ResourceType; skill: string } | null {
  const match = uri.match(/^pm-skills:\/\/(skills|templates|examples)\/([a-z0-9-]+)$/);
  if (!match) return null;

  const typeMap: Record<string, ResourceType> = {
    skills: 'skill',
    templates: 'template',
    examples: 'example',
  };

  return {
    type: typeMap[match[1]],
    skill: match[2],
  };
}

/**
 * Build resource info for a skill
 */
function buildResourceInfo(skill: Skill, type: ResourceType): ResourceInfo {
  const uri = buildResourceUri(type, skill.name);
  const typeDescriptions: Record<ResourceType, string> = {
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
      skill: skill.name,
      type,
    },
  };
}

/**
 * Get content for a resource
 */
function getResourceContent(skill: Skill, type: ResourceType): string | null {
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
 * Register all resources for the loaded skills
 */
export function registerResources(server: McpServer, skills: Map<string, Skill>): number {
  let resourceCount = 0;

  // Build list of all resources
  const allResources: ResourceInfo[] = [];

  for (const skill of skills.values()) {
    // Always add skill resource (instructions)
    allResources.push(buildResourceInfo(skill, 'skill'));

    // Add template resource if available
    if (skill.template) {
      allResources.push(buildResourceInfo(skill, 'template'));
    }

    // Add example resource if available
    if (skill.example) {
      allResources.push(buildResourceInfo(skill, 'example'));
    }
  }

  // Register the resource list handler (flat URI format)
  server.resource('pm-skills-resources', 'pm-skills://{type}/{skill}', async (uri) => {
    const parsed = parseResourceUri(uri.href);
    if (!parsed) {
      throw new Error(`Invalid resource URI: ${uri.href}`);
    }

    // Find the skill
    const skill = skills.get(parsed.skill);
    if (!skill) {
      throw new Error(`Skill not found: ${parsed.skill}`);
    }

    // Get the content
    const content = getResourceContent(skill, parsed.type);
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

  resourceCount = allResources.length;

  console.error(`Registered ${resourceCount} resources`);
  return resourceCount;
}

/**
 * List all available resources (for use in handlers)
 */
export function listResources(skills: Map<string, Skill>): ResourceInfo[] {
  const resources: ResourceInfo[] = [];

  for (const skill of skills.values()) {
    // Always add skill resource
    resources.push(buildResourceInfo(skill, 'skill'));

    // Add template if available
    if (skill.template) {
      resources.push(buildResourceInfo(skill, 'template'));
    }

    // Add example if available
    if (skill.example) {
      resources.push(buildResourceInfo(skill, 'example'));
    }
  }

  return resources;
}
