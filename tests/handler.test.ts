import { describe, it, expect } from 'vitest';
import {
  buildToolOutput,
  createSuccessResponse,
  createErrorResponse,
} from '../src/tools/handler.js';
import type { Skill } from '../src/types/index.js';

const mockSkill: Skill = {
  name: 'hypothesis',
  description: 'Create a testable hypothesis',
  phase: 'define',
  path: '/mock/path',
  metadata: {
    name: 'hypothesis',
    description: 'Create a testable hypothesis',
    license: 'Apache-2.0',
    metadata: {
      category: 'definition',
      frameworks: ['lean'],
      author: 'test',
      version: '1.0.0',
    },
  },
  instructions: '# Hypothesis\n\nInstructions for creating a hypothesis.',
  template: '## Hypothesis Template\n\nWe believe [assumption]...',
  example: '## Example Hypothesis\n\nWe believe that users want dark mode...',
};

describe('buildToolOutput', () => {
  it('should build full output with topic', () => {
    const output = buildToolOutput(mockSkill, {
      topic: 'Dark Mode',
      format: 'full',
      includeExample: false,
    });

    expect(output).toContain('Dark Mode');
    expect(output).toContain('hypothesis');
    expect(output).toContain('Instructions');
    expect(output).toContain('Template');
  });

  it('should include context when provided', () => {
    const output = buildToolOutput(mockSkill, {
      topic: 'Dark Mode',
      context: 'Users requested this in feedback',
      format: 'full',
      includeExample: false,
    });

    expect(output).toContain('Dark Mode');
    expect(output).toContain('Users requested this in feedback');
  });

  it('should include example when requested', () => {
    const output = buildToolOutput(mockSkill, {
      topic: 'Dark Mode',
      format: 'full',
      includeExample: true,
    });

    expect(output).toContain('Example');
    expect(output).toContain('dark mode');
  });

  it('should build concise output', () => {
    const output = buildToolOutput(mockSkill, {
      topic: 'Dark Mode',
      format: 'concise',
      includeExample: false,
    });

    expect(output).toContain('Dark Mode');
    expect(output).toContain('Template');
    // Concise should not include full instructions
    expect(output.length).toBeLessThan(
      buildToolOutput(mockSkill, {
        topic: 'Dark Mode',
        format: 'full',
        includeExample: false,
      }).length
    );
  });

  it('should build template-only output', () => {
    const output = buildToolOutput(mockSkill, {
      topic: 'Dark Mode',
      format: 'template-only',
      includeExample: false,
    });

    expect(output).toContain('Hypothesis Template');
    // Template-only should be shortest
    expect(output.length).toBeLessThan(
      buildToolOutput(mockSkill, {
        topic: 'Dark Mode',
        format: 'concise',
        includeExample: false,
      }).length
    );
  });
});

describe('createSuccessResponse', () => {
  it('should create success response with text content', () => {
    const response = createSuccessResponse('Test content');

    expect(response.content).toHaveLength(1);
    expect(response.content[0].type).toBe('text');
    expect(response.content[0].text).toBe('Test content');
  });
});

describe('createErrorResponse', () => {
  it('should create error response with isError flag', () => {
    const response = createErrorResponse('Something went wrong');

    expect(response.isError).toBe(true);
    expect(response.content).toHaveLength(1);
    expect(response.content[0].type).toBe('text');
    expect(response.content[0].text).toContain('Something went wrong');
  });
});
