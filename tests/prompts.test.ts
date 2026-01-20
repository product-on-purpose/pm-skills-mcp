import { describe, it, expect } from 'vitest';
import { PROMPTS, listPrompts } from '../src/prompts/index.js';

describe('PROMPTS', () => {
  it('should have 3 prompts', () => {
    expect(PROMPTS.length).toBe(3);
  });

  it('should contain expected prompts', () => {
    const names = PROMPTS.map((p) => p.name);
    expect(names).toContain('feature-kickoff');
    expect(names).toContain('lean-validation');
    expect(names).toContain('quick-prd');
  });

  it('each prompt should have required properties', () => {
    for (const prompt of PROMPTS) {
      expect(prompt.name).toBeDefined();
      expect(prompt.description).toBeDefined();
      expect(prompt.args).toBeDefined();
      expect(prompt.args.topic).toBeDefined();
      expect(prompt.handler).toBeDefined();
      expect(typeof prompt.handler).toBe('function');
    }
  });
});

describe('prompt handlers', () => {
  it('feature-kickoff handler should generate correct message', () => {
    const prompt = PROMPTS.find((p) => p.name === 'feature-kickoff');
    const result = prompt!.handler({ topic: 'Dark Mode', context: 'User requested' });

    expect(result.messages.length).toBe(1);
    expect(result.messages[0].role).toBe('user');
    expect(result.messages[0].content.type).toBe('text');
    expect(result.messages[0].content.text).toContain('Dark Mode');
    expect(result.messages[0].content.text).toContain('User requested');
    expect(result.messages[0].content.text).toContain('pm_problem_statement');
  });

  it('lean-validation handler should generate correct message', () => {
    const prompt = PROMPTS.find((p) => p.name === 'lean-validation');
    const result = prompt!.handler({ topic: 'New Pricing' });

    expect(result.messages[0].content.text).toContain('New Pricing');
    expect(result.messages[0].content.text).toContain('pm_hypothesis');
    expect(result.messages[0].content.text).toContain('Build-Measure-Learn');
  });

  it('quick-prd handler should generate correct message', () => {
    const prompt = PROMPTS.find((p) => p.name === 'quick-prd');
    const result = prompt!.handler({ topic: 'Search Feature' });

    expect(result.messages[0].content.text).toContain('Search Feature');
    expect(result.messages[0].content.text).toContain('pm_prd');
    expect(result.messages[0].content.text).toContain('streamlined');
  });

  it('handlers should work without context', () => {
    const prompt = PROMPTS.find((p) => p.name === 'feature-kickoff');
    const result = prompt!.handler({ topic: 'Test Feature' });

    expect(result.messages[0].content.text).toContain('Test Feature');
    expect(result.messages[0].content.text).not.toContain('Additional Context');
  });
});

describe('listPrompts', () => {
  it('should return all prompts', () => {
    const prompts = listPrompts();
    expect(prompts.length).toBe(3);
  });

  it('should return name and description', () => {
    const prompts = listPrompts();
    for (const prompt of prompts) {
      expect(prompt.name).toBeDefined();
      expect(prompt.description).toBeDefined();
    }
  });
});
