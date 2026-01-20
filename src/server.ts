/**
 * PM-Skills MCP Server
 *
 * Exposes product management skills as MCP tools
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { Skill, ServerConfig } from './types/index.js';
import { loadAllSkills, listSkills } from './skills/loader.js';
import { SERVER_INFO, TOOL_CONFIG } from './config.js';
import { SkillToolInputSchema, type SkillToolInputType } from './tools/schemas.js';
import { buildToolOutput, createErrorResponse, createSuccessResponse } from './tools/handler.js';

/**
 * Zod schema for skill tool parameters (for MCP SDK)
 */
const SkillToolParamsSchema = {
  topic: z.string().describe('The subject or feature to create this artifact for'),
  context: z.string().optional().describe('Additional context, constraints, or requirements'),
  format: z.enum(['full', 'concise', 'template-only']).optional().describe("Output format: 'full' (instructions + template + guidance), 'concise' (template + key points), 'template-only'"),
  includeExample: z.boolean().optional().describe('Include a completed example for reference'),
};

/**
 * PM-Skills MCP Server class
 */
export class PMSkillsServer {
  private server: McpServer;
  private skills: Map<string, Skill> = new Map();
  private config: ServerConfig;

  constructor(config: ServerConfig) {
    this.config = config;
    this.server = new McpServer({
      name: SERVER_INFO.name,
      version: SERVER_INFO.version,
    });
  }

  /**
   * Initialize the server by loading skills and registering tools
   */
  async initialize(): Promise<void> {
    // Load all skills
    this.skills = await loadAllSkills(this.config);
    console.error(`Loaded ${this.skills.size} skills from ${this.config.skillsPath}`);

    // Register a tool for each skill
    for (const skill of this.skills.values()) {
      this.registerSkillTool(skill);
    }

    // Register the skill list tool
    this.registerListSkillsTool();

    console.error(`Registered ${this.skills.size + 1} tools`);
  }

  /**
   * Register a single skill as an MCP tool
   */
  private registerSkillTool(skill: Skill): void {
    const toolName = `${TOOL_CONFIG.prefix}${skill.name}`;
    const description = `${skill.description}

Use this tool to get guidance and a template for creating a ${skill.name.toUpperCase()} artifact.

Args:
  - topic (string, required): The subject or feature to create this artifact for
  - context (string, optional): Additional context, constraints, or requirements
  - format ('full' | 'concise' | 'template-only', default: 'full'): Output format
  - includeExample (boolean, default: false): Include a completed example

Returns:
  Markdown content with instructions, template, and optionally an example for creating the artifact.

Phase: ${skill.phase} | Category: ${skill.metadata.metadata.category}`;

    // Use the Zod schema object format for tool registration
    this.server.tool(
      toolName,
      SkillToolParamsSchema,
      async (params) => {
        try {
          // Parse and validate input
          const input = SkillToolInputSchema.parse({
            topic: params.topic,
            context: params.context,
            format: params.format ?? this.config.defaultFormat ?? 'full',
            includeExample: params.includeExample ?? this.config.includeExamplesByDefault ?? false,
          });

          // Build the output
          const output = buildToolOutput(skill, input);

          return createSuccessResponse(output);
        } catch (error) {
          if (error instanceof Error) {
            return createErrorResponse(error.message);
          }
          return createErrorResponse('An unexpected error occurred');
        }
      }
    );
  }

  /**
   * Register a tool to list all available skills
   */
  private registerListSkillsTool(): void {
    // Empty schema for list tool (no parameters)
    const emptySchema = {};

    this.server.tool(
      `${TOOL_CONFIG.prefix}list_skills`,
      emptySchema,
      async () => {
        const skillList = listSkills(this.skills);

        // Group by phase
        const byPhase = new Map<string, Skill[]>();
        for (const skill of skillList) {
          const phaseSkills = byPhase.get(skill.phase) || [];
          phaseSkills.push(skill);
          byPhase.set(skill.phase, phaseSkills);
        }

        // Build output
        const lines: string[] = [];
        lines.push('# PM-Skills Available');
        lines.push('');
        lines.push(`Total: ${skillList.length} skills across ${byPhase.size} phases`);
        lines.push('');

        const phaseOrder = ['discover', 'define', 'develop', 'deliver', 'measure', 'iterate'];
        for (const phase of phaseOrder) {
          const skills = byPhase.get(phase);
          if (!skills || skills.length === 0) continue;

          lines.push(`## ${phase.charAt(0).toUpperCase() + phase.slice(1)} Phase`);
          lines.push('');
          for (const skill of skills) {
            lines.push(`- **${TOOL_CONFIG.prefix}${skill.name}**: ${skill.description}`);
          }
          lines.push('');
        }

        return createSuccessResponse(lines.join('\n'));
      }
    );
  }

  /**
   * Get the underlying MCP server instance
   */
  getServer(): McpServer {
    return this.server;
  }

  /**
   * Get loaded skills count
   */
  getSkillsCount(): number {
    return this.skills.size;
  }
}
