import { describe, it, expect } from 'vitest';
import {
  validateOutput,
  formatValidationResult,
  type ValidationResult,
} from '../src/tools/validator.js';
import type { Skill } from '../src/types/index.js';

// Mock skill for testing
const mockSkill: Skill = {
  name: 'prd',
  description: 'Product Requirements Document',
  phase: 'deliver',
  path: '/mock/path',
  metadata: {
    name: 'prd',
    description: 'Product Requirements Document',
    license: 'Apache-2.0',
    metadata: {
      category: 'documentation',
      frameworks: [],
      author: 'test',
      version: '1.0.0',
    },
  },
  instructions: 'Test instructions',
  template: `# Product Requirements Document

## Problem Statement
What problem are we solving?

## Goals
What are we trying to achieve?

## Requirements
What needs to be built?

## Success Metrics
How will we measure success?
`,
  example: null,
};

describe('validateOutput', () => {
  it('should validate output with all sections present', () => {
    const output = `# Product Requirements Document

## Problem Statement
Users can't find products easily.

## Goals
- Improve search functionality
- Reduce time to find products

## Requirements
- Search bar on every page
- Filters for categories

## Success Metrics
- 30% reduction in time to find products
`;

    const result = validateOutput(mockSkill, output);

    expect(result.valid).toBe(true);
    expect(result.sectionsFound).toBe(4);
    expect(result.sectionsExpected).toBe(4);
    expect(result.sections.every((s) => s.found)).toBe(true);
  });

  it('should detect missing sections', () => {
    const output = `# Product Requirements Document

## Problem Statement
Users can't find products easily.

## Goals
- Improve search functionality
`;

    const result = validateOutput(mockSkill, output);

    expect(result.valid).toBe(false);
    expect(result.sectionsExpected).toBe(4);
    // At least some sections should be missing
    expect(result.sectionsFound).toBeLessThan(4);

    const missingSections = result.sections.filter((s) => !s.found);
    expect(missingSections.length).toBeGreaterThan(0);
    // Requirements and Success Metrics should be missing
    expect(missingSections.some((s) => s.name === 'Requirements')).toBe(true);
    expect(missingSections.some((s) => s.name === 'Success Metrics')).toBe(true);
  });

  it('should handle skills without templates', () => {
    const skillWithoutTemplate: Skill = {
      ...mockSkill,
      template: null,
    };

    const result = validateOutput(skillWithoutTemplate, 'Some content');

    expect(result.valid).toBe(true);
    expect(result.sectionsFound).toBe(0);
    expect(result.sectionsExpected).toBe(0);
    expect(result.suggestions).toContain(
      'This skill has no template - validation is based on content presence only.'
    );
  });

  it('should flag brief outputs', () => {
    const output = `# PRD

## Problem
Short.
`;

    const result = validateOutput(mockSkill, output);

    expect(result.valid).toBe(false);
    expect(result.suggestions.some((s) => s.includes('brief'))).toBe(true);
  });

  it('should record line numbers for found sections', () => {
    const output = `# Product Requirements Document

## Problem Statement
Line 4 content.

## Goals
Line 7 content.
`;

    const result = validateOutput(mockSkill, output);

    const problemSection = result.sections.find((s) => s.name === 'Problem Statement');
    expect(problemSection?.found).toBe(true);
    expect(problemSection?.line).toBe(3);
  });
});

describe('formatValidationResult', () => {
  it('should format passing result correctly', () => {
    const result: ValidationResult = {
      valid: true,
      skillName: 'prd',
      sectionsFound: 4,
      sectionsExpected: 4,
      sections: [
        { name: 'Problem Statement', found: true, line: 3 },
        { name: 'Goals', found: true, line: 6 },
        { name: 'Requirements', found: true, line: 9 },
        { name: 'Success Metrics', found: true, line: 12 },
      ],
      suggestions: [],
    };

    const formatted = formatValidationResult(result);

    expect(formatted).toContain('PASS');
    expect(formatted).toContain('prd');
    expect(formatted).toContain('4/4');
    expect(formatted).toContain('[x] Problem Statement');
  });

  it('should format failing result correctly', () => {
    const result: ValidationResult = {
      valid: false,
      skillName: 'prd',
      sectionsFound: 2,
      sectionsExpected: 4,
      sections: [
        { name: 'Problem Statement', found: true, line: 3 },
        { name: 'Goals', found: true, line: 6 },
        { name: 'Requirements', found: false },
        { name: 'Success Metrics', found: false },
      ],
      suggestions: ['Missing sections: Requirements, Success Metrics'],
    };

    const formatted = formatValidationResult(result);

    expect(formatted).toContain('NEEDS WORK');
    expect(formatted).toContain('2/4');
    expect(formatted).toContain('[x] Problem Statement');
    expect(formatted).toContain('[ ] Requirements');
    expect(formatted).toContain('Suggestions');
  });
});
