/**
 * Generic tool handler for skill tools
 */

import type { Skill, SkillToolResponse } from '../types/index.js';
import type { SkillToolInputType } from './schemas.js';

/**
 * Extract quality checklist from skill instructions
 */
function extractChecklist(instructions: string): string[] {
  const checklistMatch = instructions.match(/## Quality Checklist[\s\S]*?(?=##|$)/);
  if (!checklistMatch) return [];

  const checklistItems: string[] = [];
  const lines = checklistMatch[0].split('\n');

  for (const line of lines) {
    // Match lines starting with - [ ] or - [x]
    const match = line.match(/^-\s*\[[ x]\]\s*(.+)$/);
    if (match) {
      checklistItems.push(match[1].trim());
    }
  }

  return checklistItems;
}

/**
 * Format skill response based on format preference
 */
export function formatSkillResponse(skill: Skill, input: SkillToolInputType): SkillToolResponse {
  const { format, includeExample } = input;

  // Build content based on format
  const content: SkillToolResponse['content'] = {
    template: skill.template || '(No template available)',
  };

  // Add instructions for 'full' and 'concise' formats
  if (format === 'full') {
    content.instructions = skill.instructions;
    content.checklist = extractChecklist(skill.instructions);
  } else if (format === 'concise') {
    // For concise, include just the key sections
    content.checklist = extractChecklist(skill.instructions);
  }

  // Add example if requested and available
  if (includeExample && skill.example) {
    content.example = skill.example;
  }

  return {
    skill: skill.name,
    description: skill.description,
    content,
    metadata: {
      phase: skill.phase,
      category: skill.metadata.metadata.category,
      version: skill.metadata.metadata.version,
    },
  };
}

/**
 * Build formatted text output for tool response
 */
export function buildToolOutput(skill: Skill, input: SkillToolInputType): string {
  const { topic, context, format, includeExample } = input;
  const lines: string[] = [];

  // Header
  lines.push(`# ${skill.name.toUpperCase()}: ${topic}`);
  lines.push('');

  // Context section if provided
  if (context) {
    lines.push('## Context');
    lines.push(context);
    lines.push('');
  }

  // Format-specific content
  if (format === 'full') {
    // Full format: instructions + template + checklist
    lines.push('## Instructions');
    lines.push('');
    lines.push(skill.instructions);
    lines.push('');

    if (skill.template) {
      lines.push('---');
      lines.push('');
      lines.push('## Template');
      lines.push('');
      lines.push('Use the following template to create your artifact:');
      lines.push('');
      lines.push(skill.template);
    }
  } else if (format === 'concise') {
    // Concise format: template + checklist
    if (skill.template) {
      lines.push('## Template');
      lines.push('');
      lines.push(skill.template);
      lines.push('');
    }

    const checklist = extractChecklist(skill.instructions);
    if (checklist.length > 0) {
      lines.push('## Quality Checklist');
      lines.push('');
      for (const item of checklist) {
        lines.push(`- [ ] ${item}`);
      }
    }
  } else {
    // Template-only format
    if (skill.template) {
      lines.push(skill.template);
    } else {
      lines.push('(No template available for this skill)');
    }
  }

  // Add example if requested
  if (includeExample && skill.example) {
    lines.push('');
    lines.push('---');
    lines.push('');
    lines.push('## Example');
    lines.push('');
    lines.push('Here is a completed example for reference:');
    lines.push('');
    lines.push(skill.example);
  }

  // Footer with metadata
  lines.push('');
  lines.push('---');
  lines.push(
    `*Skill: ${skill.name} | Phase: ${skill.phase} | Category: ${skill.metadata.metadata.category}*`
  );

  return lines.join('\n');
}

/**
 * Create an error response
 */
export function createErrorResponse(message: string): {
  isError: true;
  content: Array<{ type: 'text'; text: string }>;
} {
  return {
    isError: true,
    content: [
      {
        type: 'text',
        text: `Error: ${message}`,
      },
    ],
  };
}

/**
 * Create a success response
 */
export function createSuccessResponse(text: string): {
  content: Array<{ type: 'text'; text: string }>;
} {
  return {
    content: [
      {
        type: 'text',
        text,
      },
    ],
  };
}
