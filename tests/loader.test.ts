import { describe, it, expect, beforeAll } from 'vitest';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadAllSkills, listSkills, getSkill, groupSkillsByPhase } from '../src/skills/loader.js';
import type { ServerConfig } from '../src/types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use embedded skills for testing (assumes npm run embed-skills has been run)
const SKILLS_PATH = path.resolve(__dirname, '../skills');

describe('loadAllSkills', () => {
  let skills: Map<string, import('../src/types/index.js').Skill>;

  beforeAll(async () => {
    const config: ServerConfig = {
      skillsPath: SKILLS_PATH,
    };
    skills = await loadAllSkills(config);
  });

  it('should load 24 skills', () => {
    expect(skills.size).toBe(24);
  });

  it('should load skills with required properties', () => {
    for (const skill of skills.values()) {
      expect(skill.name).toBeDefined();
      expect(skill.description).toBeDefined();
      expect(skill.phase).toBeDefined();
      expect(skill.instructions).toBeDefined();
      expect(skill.metadata).toBeDefined();
    }
  });

  it('should load skills from all phases', () => {
    const phases = new Set<string>();
    for (const skill of skills.values()) {
      phases.add(skill.phase);
    }
    expect(phases.size).toBe(6);
    expect(phases.has('discover')).toBe(true);
    expect(phases.has('define')).toBe(true);
    expect(phases.has('develop')).toBe(true);
    expect(phases.has('deliver')).toBe(true);
    expect(phases.has('measure')).toBe(true);
    expect(phases.has('iterate')).toBe(true);
  });

  it('should load templates for skills', () => {
    const skillsWithTemplates = Array.from(skills.values()).filter((s) => s.template !== null);
    // Most skills should have templates
    expect(skillsWithTemplates.length).toBeGreaterThan(20);
  });

  it('should load examples for skills', () => {
    const skillsWithExamples = Array.from(skills.values()).filter((s) => s.example !== null);
    // Most skills should have examples
    expect(skillsWithExamples.length).toBeGreaterThan(20);
  });
});

describe('getSkill', () => {
  let skills: Map<string, import('../src/types/index.js').Skill>;

  beforeAll(async () => {
    const config: ServerConfig = { skillsPath: SKILLS_PATH };
    skills = await loadAllSkills(config);
  });

  it('should return skill by name', () => {
    const skill = getSkill(skills, 'deliver-prd');
    expect(skill).toBeDefined();
    expect(skill?.name).toBe('deliver-prd');
  });

  it('should return undefined for unknown skill', () => {
    const skill = getSkill(skills, 'unknown-skill');
    expect(skill).toBeUndefined();
  });
});

describe('listSkills', () => {
  let skills: Map<string, import('../src/types/index.js').Skill>;

  beforeAll(async () => {
    const config: ServerConfig = { skillsPath: SKILLS_PATH };
    skills = await loadAllSkills(config);
  });

  it('should return all skills as array', () => {
    const skillList = listSkills(skills);
    expect(skillList.length).toBe(24);
    expect(Array.isArray(skillList)).toBe(true);
  });
});

describe('groupSkillsByPhase', () => {
  let skills: Map<string, import('../src/types/index.js').Skill>;

  beforeAll(async () => {
    const config: ServerConfig = { skillsPath: SKILLS_PATH };
    skills = await loadAllSkills(config);
  });

  it('should group skills by phase', () => {
    const grouped = groupSkillsByPhase(skills);

    expect(grouped.size).toBe(6);
    expect(grouped.get('discover')?.length).toBeGreaterThan(0);
    expect(grouped.get('define')?.length).toBeGreaterThan(0);
    expect(grouped.get('develop')?.length).toBeGreaterThan(0);
    expect(grouped.get('deliver')?.length).toBeGreaterThan(0);
    expect(grouped.get('measure')?.length).toBeGreaterThan(0);
    expect(grouped.get('iterate')?.length).toBeGreaterThan(0);
  });

  it('should have correct distribution across phases', () => {
    const grouped = groupSkillsByPhase(skills);

    // Based on pm-skills structure
    expect(grouped.get('discover')?.length).toBe(3);
    expect(grouped.get('define')?.length).toBe(4);
    expect(grouped.get('develop')?.length).toBe(4);
    expect(grouped.get('deliver')?.length).toBe(5);
    expect(grouped.get('measure')?.length).toBe(4);
    expect(grouped.get('iterate')?.length).toBe(4);
  });
});

describe('loadAllSkills with phase filter', () => {
  it('should filter by enabled phases', async () => {
    const config: ServerConfig = {
      skillsPath: SKILLS_PATH,
      enabledPhases: ['deliver', 'measure'],
    };
    const skills = await loadAllSkills(config);

    expect(skills.size).toBe(9); // 5 deliver + 4 measure

    for (const skill of skills.values()) {
      expect(['deliver', 'measure']).toContain(skill.phase);
    }
  });
});
