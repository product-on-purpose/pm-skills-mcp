import { describe, it, expect } from 'vitest';
import {
  WORKFLOW_BUNDLES,
  getWorkflowBundle,
  listWorkflowBundles,
  formatWorkflowOutput,
} from '../src/workflows/index.js';
import type { Skill } from '../src/types/index.js';

describe('WORKFLOW_BUNDLES', () => {
  it('should have 5 workflow bundles', () => {
    expect(Object.keys(WORKFLOW_BUNDLES).length).toBe(5);
  });

  it('should contain expected workflows', () => {
    expect(WORKFLOW_BUNDLES['feature-kickoff']).toBeDefined();
    expect(WORKFLOW_BUNDLES['lean-startup']).toBeDefined();
    expect(WORKFLOW_BUNDLES['triple-diamond']).toBeDefined();
    expect(WORKFLOW_BUNDLES['quick-prd']).toBeDefined();
    expect(WORKFLOW_BUNDLES['experiment-cycle']).toBeDefined();
  });

  it('each workflow should have required properties', () => {
    for (const [id, bundle] of Object.entries(WORKFLOW_BUNDLES)) {
      expect(bundle.id).toBe(id);
      expect(bundle.name).toBeDefined();
      expect(bundle.description).toBeDefined();
      expect(bundle.steps.length).toBeGreaterThan(0);
      expect(bundle.useCases.length).toBeGreaterThan(0);
      expect(['quick', 'standard', 'comprehensive']).toContain(bundle.effort);
    }
  });
});

describe('getWorkflowBundle', () => {
  it('should return workflow by id', () => {
    const bundle = getWorkflowBundle('feature-kickoff');
    expect(bundle).toBeDefined();
    expect(bundle?.name).toBe('Feature Kickoff');
  });

  it('should return undefined for unknown id', () => {
    const bundle = getWorkflowBundle('unknown-workflow');
    expect(bundle).toBeUndefined();
  });
});

describe('listWorkflowBundles', () => {
  it('should return all workflows', () => {
    const bundles = listWorkflowBundles();
    expect(bundles.length).toBe(5);
    expect(bundles.map((b) => b.id)).toContain('feature-kickoff');
  });
});

describe('formatWorkflowOutput', () => {
  const mockSkills = new Map<string, Skill>();
  mockSkills.set('problem_statement', {
    name: 'problem_statement',
    description: 'Define the problem',
    phase: 'define',
    path: '/mock',
    metadata: {
      name: 'problem_statement',
      description: 'Define the problem',
      license: 'Apache-2.0',
      metadata: { category: 'define', frameworks: [], author: 'test', version: '1.0.0' },
    },
    instructions: 'Test',
    template: null,
    example: null,
  });

  it('should format workflow output correctly', () => {
    const bundle = WORKFLOW_BUNDLES['quick-prd'];
    const output = formatWorkflowOutput(bundle, mockSkills, 'Test Feature', 'Test context');

    expect(output).toContain('Quick PRD Workflow');
    expect(output).toContain('Test Feature');
    expect(output).toContain('Test context');
    expect(output).toContain('## Workflow Steps');
    expect(output).toContain('## How to Execute');
  });

  it('should handle workflow without context', () => {
    const bundle = WORKFLOW_BUNDLES['quick-prd'];
    const output = formatWorkflowOutput(bundle, mockSkills, 'Test Feature');

    expect(output).toContain('Test Feature');
    expect(output).not.toContain('**Context:**');
  });
});
