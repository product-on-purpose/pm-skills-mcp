import { describe, it, expect } from 'vitest';
import {
  buildResourceUri,
  buildPersonaUri,
  parseResourceUri,
  listResources,
} from '../src/resources/index.js';
import type { Skill } from '../src/types/index.js';

const baseSkill: Skill = {
  name: 'deliver-prd',
  description: 'Create a comprehensive Product Requirements Document',
  classification: 'domain',
  phase: 'deliver',
  path: '/mock/deliver-prd',
  metadata: {
    name: 'deliver-prd',
    description: 'Create a comprehensive Product Requirements Document',
    phase: 'deliver',
    license: 'Apache-2.0',
    metadata: {
      category: 'deliver',
      frameworks: [],
      author: 'test',
      version: '2.0.0',
    },
  },
  instructions: 'Skill instructions',
  template: 'Template content',
  example: 'Example content',
};

describe('buildResourceUri', () => {
  it('should build flat skill URI', () => {
    expect(buildResourceUri('skill', 'deliver-prd')).toBe('pm-skills://skills/deliver-prd');
  });

  it('should build flat template URI', () => {
    expect(buildResourceUri('template', 'define-hypothesis')).toBe(
      'pm-skills://templates/define-hypothesis'
    );
  });

  it('should build flat example URI', () => {
    expect(buildResourceUri('example', 'measure-experiment-design')).toBe(
      'pm-skills://examples/measure-experiment-design'
    );
  });

  it('should build persona URI', () => {
    expect(buildPersonaUri('marketing', 'sales-engineer')).toBe(
      'pm-skills://personas/marketing/sales-engineer'
    );
  });
});

describe('parseResourceUri', () => {
  it('should parse flat skill URI', () => {
    expect(parseResourceUri('pm-skills://skills/deliver-prd')).toEqual({
      type: 'skill',
      skill: 'deliver-prd',
    });
  });

  it('should parse flat template URI', () => {
    expect(parseResourceUri('pm-skills://templates/define-hypothesis')).toEqual({
      type: 'template',
      skill: 'define-hypothesis',
    });
  });

  it('should parse flat example URI', () => {
    expect(parseResourceUri('pm-skills://examples/measure-experiment-design')).toEqual({
      type: 'example',
      skill: 'measure-experiment-design',
    });
  });

  it('should parse persona URI', () => {
    expect(parseResourceUri('pm-skills://personas/marketing/sales-engineer')).toEqual({
      type: 'persona',
      category: 'marketing',
      persona: 'sales-engineer',
    });
  });

  it('should reject legacy nested URI format', () => {
    expect(parseResourceUri('pm-skills://skills/deliver/prd')).toBeNull();
  });

  it('should reject unsupported resource type', () => {
    expect(parseResourceUri('pm-skills://bundles/feature-kickoff')).toBeNull();
  });
});

describe('listResources', () => {
  it('should list skill, template, and example resources when all are present', () => {
    const skills = new Map<string, Skill>([[baseSkill.name, baseSkill]]);
    const resources = listResources(skills);

    expect(resources).toHaveLength(3);
    expect(resources.map((r) => r.uri)).toEqual([
      'pm-skills://skills/deliver-prd',
      'pm-skills://templates/deliver-prd',
      'pm-skills://examples/deliver-prd',
    ]);
  });

  it('should omit missing template/example resources', () => {
    const noExtras: Skill = {
      ...baseSkill,
      name: 'define-hypothesis',
      phase: 'define',
      template: null,
      example: null,
    };

    const skills = new Map<string, Skill>([[noExtras.name, noExtras]]);
    const resources = listResources(skills);

    expect(resources).toHaveLength(1);
    expect(resources[0].uri).toBe('pm-skills://skills/define-hypothesis');
    expect(resources[0].metadata.phase).toBe('define');
  });

  it('should include persona resources when provided', () => {
    const skills = new Map<string, Skill>([[baseSkill.name, baseSkill]]);
    const resources = listResources(skills, [
      {
        uri: 'pm-skills://personas/product/core-product-pm',
        name: 'product-core-product-pm',
        description: 'Core PM persona',
        mimeType: 'text/markdown',
        metadata: {
          type: 'persona',
          category: 'product',
          persona: 'core-product-pm',
        },
        content: '# Core Product PM',
      },
    ]);

    expect(resources.find((r) => r.uri === 'pm-skills://personas/product/core-product-pm')).toBeDefined();
  });
});
