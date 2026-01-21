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
import { SkillToolInputSchema } from './tools/schemas.js';
import { buildToolOutput, createErrorResponse, createSuccessResponse } from './tools/handler.js';
import { validateOutput, formatValidationResult } from './tools/validator.js';
import { registerResources, listResources } from './resources/index.js';
import { listWorkflowBundles, formatWorkflowOutput } from './workflows/index.js';
import { registerPrompts, listPrompts } from './prompts/index.js';

/**
 * Zod schema for skill tool parameters (for MCP SDK)
 */
const SkillToolParamsSchema = {
  topic: z.string().describe('The subject or feature to create this artifact for'),
  context: z.string().optional().describe('Additional context, constraints, or requirements'),
  format: z
    .enum(['full', 'concise', 'template-only'])
    .optional()
    .describe(
      "Output format: 'full' (instructions + template + guidance), 'concise' (template + key points), 'template-only'"
    ),
  includeExample: z.boolean().optional().describe('Include a completed example for reference'),
};

/**
 * PM-Skills MCP Server class
 */
export class PMSkillsServer {
  private server: McpServer;
  private skills: Map<string, Skill> = new Map();
  private config: ServerConfig;
  private resourceCount: number = 0;
  private workflowCount: number = 0;
  private promptCount: number = 0;

  constructor(config: ServerConfig) {
    this.config = config;
    this.server = new McpServer({
      name: SERVER_INFO.name,
      version: SERVER_INFO.version,
    });
  }

  /**
   * Initialize the server by loading skills and registering tools/resources
   */
  async initialize(): Promise<void> {
    // Load all skills
    this.skills = await loadAllSkills(this.config);
    console.error(`Loaded ${this.skills.size} skills from ${this.config.skillsPath}`);

    // Register a tool for each skill
    for (const skill of this.skills.values()) {
      this.registerSkillTool(skill);
    }

    // Register utility tools
    this.registerListSkillsTool();
    this.registerListResourcesTool();
    this.registerValidateTool();
    this.registerSearchSkillsTool();

    // Register workflow bundle tools
    this.workflowCount = this.registerWorkflowTools();
    this.registerListWorkflowsTool();

    // Register MCP prompts
    this.promptCount = registerPrompts(this.server);
    this.registerListPromptsTool();

    const totalTools = this.skills.size + 6 + this.workflowCount; // skills + utilities (6) + workflows
    console.error(
      `Registered ${totalTools} tools (${this.skills.size} skills, ${this.workflowCount} workflows, 6 utilities)`
    );
    console.error(`Registered ${this.promptCount} prompts`);

    // Register MCP resources
    this.resourceCount = registerResources(this.server, this.skills);
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

    // Register tool with description and schema
    this.server.tool(toolName, description, SkillToolParamsSchema, async (params) => {
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
    });
  }

  /**
   * Register a tool to list all available skills
   */
  private registerListSkillsTool(): void {
    const description = `List all available PM-Skills tools.

Returns a categorized list of all 24 product management skills organized by phase (Discover, Define, Develop, Deliver, Measure, Iterate).

Use this tool to discover which skills are available before invoking specific skill tools.

Returns:
  Markdown formatted list of all skills with their tool names and descriptions.`;

    this.server.tool(`${TOOL_CONFIG.prefix}list_skills`, description, async () => {
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
    });
  }

  /**
   * Register a tool to list all available resources
   */
  private registerListResourcesTool(): void {
    const description = `List all available PM-Skills MCP resources.

Returns a categorized list of all skill instructions, templates, and examples available as MCP resources.

Resources can be accessed via \`resources/read\` using URIs like:
- pm-skills://skills/{phase}/{skill} - Full skill instructions
- pm-skills://templates/{phase}/{skill} - Blank template
- pm-skills://examples/{phase}/{skill} - Completed example

Returns:
  Markdown formatted list of all resources organized by type with their URIs.`;

    this.server.tool(`${TOOL_CONFIG.prefix}list_resources`, description, async () => {
      const resources = listResources(this.skills);

      // Group by type
      const byType = new Map<string, typeof resources>();
      for (const resource of resources) {
        const typeResources = byType.get(resource.metadata.type) || [];
        typeResources.push(resource);
        byType.set(resource.metadata.type, typeResources);
      }

      // Build output
      const lines: string[] = [];
      lines.push('# PM-Skills Resources');
      lines.push('');
      lines.push(`Total: ${resources.length} resources`);
      lines.push('');
      lines.push('Access resources using their URI with `resources/read`.');
      lines.push('');

      const typeOrder = ['skill', 'template', 'example'];
      const typeLabels: Record<string, string> = {
        skill: 'Skill Instructions',
        template: 'Templates',
        example: 'Examples',
      };

      for (const type of typeOrder) {
        const typeResources = byType.get(type);
        if (!typeResources || typeResources.length === 0) continue;

        lines.push(`## ${typeLabels[type]} (${typeResources.length})`);
        lines.push('');
        for (const resource of typeResources) {
          lines.push(`- \`${resource.uri}\` - ${resource.description}`);
        }
        lines.push('');
      }

      return createSuccessResponse(lines.join('\n'));
    });
  }

  /**
   * Register a tool to validate PM artifact outputs
   */
  private registerValidateTool(): void {
    const description = `Validate a PM artifact against its skill template.

Checks that an output document contains the expected sections from a skill's template.

Args:
  - skill (string, required): The skill name to validate against (e.g., "prd", "hypothesis", "user_stories")
  - output (string, required): The artifact content to validate

Returns:
  Validation result with section checklist and suggestions for improvement.`;

    const validateSchema = {
      skill: z.string().describe('Skill name to validate against (e.g., "prd", "hypothesis")'),
      output: z.string().describe('The artifact content to validate'),
    };

    this.server.tool(
      `${TOOL_CONFIG.prefix}validate`,
      description,
      validateSchema,
      async (params) => {
        try {
          // Normalize skill name (support both "prd" and "pm_prd" formats)
          let skillName = params.skill;
          if (skillName.startsWith('pm_')) {
            skillName = skillName.slice(3);
          }
          skillName = skillName.replace(/-/g, '_');

          const skill = this.skills.get(skillName);
          if (!skill) {
            // List available skills in error message
            const available = Array.from(this.skills.keys()).slice(0, 5).join(', ');
            return createErrorResponse(
              `Skill "${params.skill}" not found. Available skills include: ${available}...`
            );
          }

          const result = validateOutput(skill, params.output);
          const formatted = formatValidationResult(result);

          return createSuccessResponse(formatted);
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
   * Register a tool to search skills by keyword
   */
  private registerSearchSkillsTool(): void {
    const description = `Search PM-Skills by keyword.

Searches across skill names, descriptions, and content to find relevant skills for your needs.

Args:
  - query (string, required): Search term(s) to find matching skills
  - searchContent (boolean, default: false): Also search within skill instructions

Returns:
  Markdown formatted list of matching skills with relevance context.`;

    const searchSchema = {
      query: z.string().describe('Search term(s) to find matching skills'),
      searchContent: z
        .boolean()
        .optional()
        .describe('Also search within skill instructions (slower but more thorough)'),
    };

    this.server.tool(
      `${TOOL_CONFIG.prefix}search_skills`,
      description,
      searchSchema,
      async (params) => {
        try {
          const query = params.query.toLowerCase().trim();
          const searchContent = params.searchContent ?? false;

          if (!query) {
            return createErrorResponse('Search query cannot be empty');
          }

          const results: Array<{
            skill: Skill;
            matchType: 'name' | 'description' | 'content';
            matchContext?: string;
          }> = [];

          // Search through all skills
          for (const skill of this.skills.values()) {
            // Check name match
            if (skill.name.toLowerCase().includes(query)) {
              results.push({ skill, matchType: 'name' });
              continue;
            }

            // Check description match
            if (skill.description.toLowerCase().includes(query)) {
              results.push({ skill, matchType: 'description' });
              continue;
            }

            // Check content match (if enabled)
            if (searchContent && skill.instructions.toLowerCase().includes(query)) {
              // Extract context around the match
              const lowerInstructions = skill.instructions.toLowerCase();
              const matchIndex = lowerInstructions.indexOf(query);
              const start = Math.max(0, matchIndex - 50);
              const end = Math.min(skill.instructions.length, matchIndex + query.length + 50);
              const matchContext = '...' + skill.instructions.slice(start, end).trim() + '...';
              results.push({ skill, matchType: 'content', matchContext });
            }
          }

          // Build output
          const lines: string[] = [];
          lines.push(`# Search Results for "${params.query}"`);
          lines.push('');

          if (results.length === 0) {
            lines.push('No skills found matching your search.');
            lines.push('');
            lines.push('**Suggestions:**');
            lines.push('- Try broader search terms');
            lines.push('- Use `pm_list_skills` to see all available skills');
            lines.push('- Enable `searchContent: true` for deeper search');
          } else {
            lines.push(`Found ${results.length} matching skill${results.length === 1 ? '' : 's'}:`);
            lines.push('');

            for (const result of results) {
              const toolName = `${TOOL_CONFIG.prefix}${result.skill.name}`;
              lines.push(`## ${result.skill.name}`);
              lines.push('');
              lines.push(`**Tool:** \`${toolName}\``);
              lines.push(`**Phase:** ${result.skill.phase}`);
              lines.push(`**Match:** ${result.matchType}`);
              lines.push('');
              lines.push(result.skill.description);

              if (result.matchContext) {
                lines.push('');
                lines.push(`**Context:** ${result.matchContext}`);
              }

              lines.push('');
            }
          }

          return createSuccessResponse(lines.join('\n'));
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
   * Register all workflow bundle tools
   */
  private registerWorkflowTools(): number {
    const bundles = listWorkflowBundles();
    const workflowParamsSchema = {
      topic: z.string().describe('The subject or feature for this workflow'),
      context: z.string().optional().describe('Additional context, constraints, or requirements'),
    };

    for (const bundle of bundles) {
      const toolName = `${TOOL_CONFIG.prefix}workflow_${bundle.id.replace(/-/g, '_')}`;
      const stepList = bundle.steps
        .map((s) => `${s.order}. ${s.toolName}${s.optional ? ' (optional)' : ''}`)
        .join('\n');

      const description = `${bundle.name} workflow - ${bundle.description}

**Effort Level:** ${bundle.effort}

**Steps:**
${stepList}

Use this tool to get a complete workflow plan. The AI client orchestrates execution by calling each step's tool in sequence.

Args:
  - topic (string, required): The subject or feature for this workflow
  - context (string, optional): Additional context for the workflow

Returns:
  Markdown workflow plan with steps, guidance, and execution instructions.`;

      this.server.tool(toolName, description, workflowParamsSchema, async (params) => {
        try {
          const output = formatWorkflowOutput(bundle, this.skills, params.topic, params.context);
          return createSuccessResponse(output);
        } catch (error) {
          if (error instanceof Error) {
            return createErrorResponse(error.message);
          }
          return createErrorResponse('An unexpected error occurred');
        }
      });
    }

    return bundles.length;
  }

  /**
   * Register a tool to list all available workflows
   */
  private registerListWorkflowsTool(): void {
    const description = `List all available PM-Skills workflow bundles.

Workflow bundles are pre-defined sequences of skills for common PM workflows like feature kickoff, lean validation, and experimentation.

Use this tool to discover available workflows before invoking a specific workflow tool.

Returns:
  Markdown formatted list of all workflows with their descriptions and steps.`;

    this.server.tool(`${TOOL_CONFIG.prefix}list_workflows`, description, async () => {
      const bundles = listWorkflowBundles();

      const lines: string[] = [];
      lines.push('# PM-Skills Workflow Bundles');
      lines.push('');
      lines.push(`Total: ${bundles.length} workflows`);
      lines.push('');
      lines.push(
        'Workflows are pre-defined sequences of skills. Call a workflow tool to get the full plan.'
      );
      lines.push('');

      for (const bundle of bundles) {
        const toolName = `${TOOL_CONFIG.prefix}workflow_${bundle.id.replace(/-/g, '_')}`;
        lines.push(`## ${bundle.name}`);
        lines.push('');
        lines.push(`**Tool:** \`${toolName}\``);
        lines.push(`**Effort:** ${bundle.effort}`);
        lines.push(`**Description:** ${bundle.description}`);
        lines.push('');
        lines.push('**Steps:**');
        for (const step of bundle.steps) {
          const optional = step.optional ? ' *(optional)*' : '';
          lines.push(`${step.order}. \`${step.toolName}\` - ${step.purpose}${optional}`);
        }
        lines.push('');
      }

      return createSuccessResponse(lines.join('\n'));
    });
  }

  /**
   * Register a tool to list all available prompts
   */
  private registerListPromptsTool(): void {
    const description = `List all available PM-Skills MCP prompts.

Prompts are conversation starters that help you begin common PM workflows with appropriate context.

Use this tool to discover available prompts. Then use MCP's \`prompts/get\` to invoke a prompt with your topic.

Returns:
  Markdown formatted list of all prompts with their descriptions.`;

    this.server.tool(`${TOOL_CONFIG.prefix}list_prompts`, description, async () => {
      const prompts = listPrompts();

      const lines: string[] = [];
      lines.push('# PM-Skills Prompts');
      lines.push('');
      lines.push(`Total: ${prompts.length} prompts`);
      lines.push('');
      lines.push(
        'Prompts are conversation starters. Use `prompts/get` with your topic to begin a workflow.'
      );
      lines.push('');

      for (const prompt of prompts) {
        lines.push(`## ${prompt.name}`);
        lines.push('');
        lines.push(prompt.description);
        lines.push('');
        lines.push(
          '**Usage:** `prompts/get` with `name: "' +
            prompt.name +
            '"` and `arguments: { topic: "your topic" }`'
        );
        lines.push('');
      }

      return createSuccessResponse(lines.join('\n'));
    });
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

  /**
   * Get registered resources count
   */
  getResourcesCount(): number {
    return this.resourceCount;
  }

  /**
   * Get registered prompts count
   */
  getPromptsCount(): number {
    return this.promptCount;
  }
}
