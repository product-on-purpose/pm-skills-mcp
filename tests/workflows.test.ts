import { describe, it, expect } from 'vitest';
import {
  WORKFLOWS,
  getWorkflow,
  listWorkflows,
  formatWorkflowOutput,
} from '../src/workflows/index.js';
import type { Skill } from '../src/types/index.js';

describe('WORKFLOWS', () => {
  it('should have 11 workflows', () => {
    expect(Object.keys(WORKFLOWS).length).toBe(11);
  });

  it('should contain expected workflows', () => {
    expect(WORKFLOWS['feature-kickoff']).toBeDefined();
    expect(WORKFLOWS['lean-startup']).toBeDefined();
    expect(WORKFLOWS['triple-diamond']).toBeDefined();
    expect(WORKFLOWS['quick-prd']).toBeDefined();
    expect(WORKFLOWS['experiment-cycle']).toBeDefined();
    expect(WORKFLOWS['customer-discovery']).toBeDefined();
    expect(WORKFLOWS['sprint-planning']).toBeDefined();
    expect(WORKFLOWS['product-strategy']).toBeDefined();
    expect(WORKFLOWS['post-launch-learning']).toBeDefined();
    expect(WORKFLOWS['stakeholder-alignment']).toBeDefined();
    expect(WORKFLOWS['technical-discovery']).toBeDefined();
  });

  it('each workflow should have required properties', () => {
    for (const [id, workflow] of Object.entries(WORKFLOWS)) {
      expect(workflow.id).toBe(id);
      expect(workflow.name).toBeDefined();
      expect(workflow.description).toBeDefined();
      expect(workflow.steps.length).toBeGreaterThan(0);
      expect(workflow.useCases.length).toBeGreaterThan(0);
      expect(['quick', 'standard', 'comprehensive']).toContain(workflow.effort);
    }
  });
});

describe('getWorkflow', () => {
  it('should return workflow by id', () => {
    const workflow = getWorkflow('feature-kickoff');
    expect(workflow).toBeDefined();
    expect(workflow?.name).toBe('Feature Kickoff');
  });

  it('should return undefined for unknown id', () => {
    const workflow = getWorkflow('unknown-workflow');
    expect(workflow).toBeUndefined();
  });
});

describe('listWorkflows', () => {
  it('should return all workflows', () => {
    const workflows = listWorkflows();
    expect(workflows.length).toBe(11);
    expect(workflows.map((w) => w.id)).toContain('feature-kickoff');
  });
});

describe('formatWorkflowOutput', () => {
  const mockSkills = new Map<string, Skill>();
  mockSkills.set('problem_statement', {
    name: 'problem_statement',
    description: 'Define the problem',
    classification: 'domain',
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
    const workflow = WORKFLOWS['quick-prd'];
    const output = formatWorkflowOutput(workflow, mockSkills, 'Test Feature', 'Test context');

    expect(output).toContain('Quick PRD Workflow');
    expect(output).toContain('Test Feature');
    expect(output).toContain('Test context');
    expect(output).toContain('## Workflow Steps');
    expect(output).toContain('## How to Execute');
  });

  it('should handle workflow without context', () => {
    const workflow = WORKFLOWS['quick-prd'];
    const output = formatWorkflowOutput(workflow, mockSkills, 'Test Feature');

    expect(output).toContain('Test Feature');
    expect(output).not.toContain('**Context:**');
  });
});
