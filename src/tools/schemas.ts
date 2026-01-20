/**
 * Zod schemas for MCP tool input validation
 */

import { z } from 'zod';

/**
 * Output format enum
 */
export const OutputFormatSchema = z.enum(['full', 'concise', 'template-only']);

/**
 * Common input schema for all skill tools
 */
export const SkillToolInputSchema = z.object({
  topic: z.string()
    .min(1, 'Topic is required')
    .max(500, 'Topic must not exceed 500 characters')
    .describe('The subject or feature to create this artifact for'),

  context: z.string()
    .max(5000, 'Context must not exceed 5000 characters')
    .optional()
    .describe('Additional context, constraints, or requirements'),

  format: OutputFormatSchema
    .default('full')
    .describe('Output format: full (instructions + template + guidance), concise (template + key points), template-only'),

  includeExample: z.boolean()
    .default(false)
    .describe('Include a completed example for reference'),
});

export type SkillToolInputType = z.infer<typeof SkillToolInputSchema>;
