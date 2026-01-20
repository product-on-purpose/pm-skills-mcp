/**
 * MCP Prompts - Conversation starters for PM workflows
 *
 * Prompts provide pre-configured conversation templates that help users
 * kick off common product management workflows with appropriate context.
 */

import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { TOOL_CONFIG } from '../config.js';

/** Prompt argument schema */
const PromptArgsSchema = {
  topic: z.string().describe('The feature, product, or initiative to work on'),
  context: z
    .string()
    .optional()
    .describe('Additional context such as constraints, goals, or background information'),
};

/**
 * Feature Kickoff prompt - starts a complete feature development workflow
 */
function createFeatureKickoffPrompt(): {
  name: string;
  description: string;
  args: typeof PromptArgsSchema;
  handler: (args: { topic: string; context?: string }) => {
    messages: Array<{ role: 'user'; content: { type: 'text'; text: string } }>;
  };
} {
  return {
    name: 'feature-kickoff',
    description: `Start a complete feature kickoff workflow.

This prompt guides you through the full feature development process:
1. Problem Statement - Define the problem being solved
2. Hypothesis - Create a testable hypothesis
3. Solution Brief - Outline the proposed solution
4. PRD - Document comprehensive requirements
5. User Stories - Break down into implementable stories

Best for: Starting work on new features, transitioning from discovery to delivery.`,
    args: PromptArgsSchema,
    handler: (args) => {
      const contextSection = args.context ? `\n\n**Additional Context:**\n${args.context}` : '';

      return {
        messages: [
          {
            role: 'user' as const,
            content: {
              type: 'text' as const,
              text: `# Feature Kickoff: ${args.topic}

I need to kick off development of a new feature: **${args.topic}**${contextSection}

Please guide me through the complete feature kickoff workflow using the PM-Skills tools. We'll work through each step in sequence:

1. **Problem Statement** (\`${TOOL_CONFIG.prefix}problem_statement\`) - Help me clearly define the problem we're solving
2. **Hypothesis** (\`${TOOL_CONFIG.prefix}hypothesis\`) - Create a testable hypothesis for our solution
3. **Solution Brief** (\`${TOOL_CONFIG.prefix}solution_brief\`) - Outline the proposed solution approach
4. **PRD** (\`${TOOL_CONFIG.prefix}prd\`) - Document the complete product requirements
5. **User Stories** (\`${TOOL_CONFIG.prefix}user_stories\`) - Break requirements into implementable stories

Let's start with Step 1: Problem Statement. Use the \`${TOOL_CONFIG.prefix}problem_statement\` tool to help me articulate the problem clearly.`,
            },
          },
        ],
      };
    },
  };
}

/**
 * Lean Validation prompt - starts a Build-Measure-Learn cycle
 */
function createLeanValidationPrompt(): {
  name: string;
  description: string;
  args: typeof PromptArgsSchema;
  handler: (args: { topic: string; context?: string }) => {
    messages: Array<{ role: 'user'; content: { type: 'text'; text: string } }>;
  };
} {
  return {
    name: 'lean-validation',
    description: `Start a Lean Startup validation workflow.

This prompt guides you through the Build-Measure-Learn cycle:
1. Hypothesis - Define a testable hypothesis with success criteria
2. Experiment Design - Design an experiment to test the hypothesis
3. Instrumentation Spec - Specify data collection requirements (optional)
4. Experiment Results - Document and analyze outcomes
5. Pivot Decision - Decide whether to pivot, persevere, or iterate

Best for: Validating risky assumptions, testing product-market fit, data-driven decisions.`,
    args: PromptArgsSchema,
    handler: (args) => {
      const contextSection = args.context ? `\n\n**Additional Context:**\n${args.context}` : '';

      return {
        messages: [
          {
            role: 'user' as const,
            content: {
              type: 'text' as const,
              text: `# Lean Validation: ${args.topic}

I need to validate an assumption or hypothesis about: **${args.topic}**${contextSection}

Please guide me through the Lean Startup validation workflow using PM-Skills tools. We'll follow the Build-Measure-Learn cycle:

1. **Hypothesis** (\`${TOOL_CONFIG.prefix}hypothesis\`) - Define what we believe and how we'll know if it's true
2. **Experiment Design** (\`${TOOL_CONFIG.prefix}experiment_design\`) - Design an experiment to test our hypothesis
3. **Instrumentation Spec** (\`${TOOL_CONFIG.prefix}instrumentation_spec\`) - Specify what data to collect (optional)
4. **Experiment Results** (\`${TOOL_CONFIG.prefix}experiment_results\`) - Document and analyze outcomes
5. **Pivot Decision** (\`${TOOL_CONFIG.prefix}pivot_decision\`) - Decide next steps based on learnings

Let's start with Step 1: Hypothesis. Use the \`${TOOL_CONFIG.prefix}hypothesis\` tool to help me formulate a clear, testable hypothesis.`,
            },
          },
        ],
      };
    },
  };
}

/**
 * Quick PRD prompt - streamlined PRD creation
 */
function createQuickPrdPrompt(): {
  name: string;
  description: string;
  args: typeof PromptArgsSchema;
  handler: (args: { topic: string; context?: string }) => {
    messages: Array<{ role: 'user'; content: { type: 'text'; text: string } }>;
  };
} {
  return {
    name: 'quick-prd',
    description: `Start a streamlined PRD creation workflow.

This prompt provides a fast path to a PRD when requirements are clear:
1. Problem Statement - Briefly document the problem
2. PRD - Create comprehensive requirements

Best for: Small features, time-constrained situations, when discovery is already complete.`,
    args: PromptArgsSchema,
    handler: (args) => {
      const contextSection = args.context ? `\n\n**Additional Context:**\n${args.context}` : '';

      return {
        messages: [
          {
            role: 'user' as const,
            content: {
              type: 'text' as const,
              text: `# Quick PRD: ${args.topic}

I need to create a PRD for: **${args.topic}**${contextSection}

The problem and solution are already well-understood. Please help me create the PRD efficiently using the streamlined workflow:

1. **Problem Statement** (\`${TOOL_CONFIG.prefix}problem_statement\`) - Briefly capture the problem (concise format)
2. **PRD** (\`${TOOL_CONFIG.prefix}prd\`) - Create the full product requirements document

Let's start with Step 1: Problem Statement. Use the \`${TOOL_CONFIG.prefix}problem_statement\` tool with format='concise' to briefly document the problem.`,
            },
          },
        ],
      };
    },
  };
}

/**
 * All prompt definitions
 */
export const PROMPTS = [
  createFeatureKickoffPrompt(),
  createLeanValidationPrompt(),
  createQuickPrdPrompt(),
];

/**
 * Register all prompts with the MCP server
 */
export function registerPrompts(server: McpServer): number {
  for (const prompt of PROMPTS) {
    server.prompt(prompt.name, prompt.description, prompt.args, async (args) =>
      prompt.handler(args as { topic: string; context?: string })
    );
  }

  return PROMPTS.length;
}

/**
 * List all available prompts
 */
export function listPrompts(): Array<{ name: string; description: string }> {
  return PROMPTS.map((p) => ({
    name: p.name,
    description: p.description,
  }));
}
