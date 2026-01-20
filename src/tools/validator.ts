/**
 * Output Validator - Validates PM artifacts against skill templates
 *
 * Checks that outputs contain required sections and follows the expected structure.
 */

import type { Skill } from '../types/index.js';

/** Validation result for a single section */
interface SectionValidation {
  name: string;
  found: boolean;
  line?: number;
}

/** Overall validation result */
export interface ValidationResult {
  valid: boolean;
  skillName: string;
  sectionsFound: number;
  sectionsExpected: number;
  sections: SectionValidation[];
  suggestions: string[];
}

/**
 * Extract expected sections from a skill's template
 *
 * Looks for markdown headers (##, ###) in the template
 */
function extractExpectedSections(template: string): string[] {
  const lines = template.split('\n');
  const sections: string[] = [];

  for (const line of lines) {
    // Match markdown headers (## or ###)
    const headerMatch = line.match(/^#{2,3}\s+(.+?)(?:\s*\{.*\})?\s*$/);
    if (headerMatch) {
      const sectionName = headerMatch[1].trim();
      // Skip placeholders like "[Your Title]"
      if (!sectionName.startsWith('[') && !sectionName.includes('{{')) {
        sections.push(sectionName);
      }
    }
  }

  return sections;
}

/**
 * Find if a section exists in the output
 *
 * Uses word-based matching to handle slight variations
 */
function findSection(output: string, sectionName: string): { found: boolean; line?: number } {
  const lines = output.split('\n');
  const normalizedSection = sectionName.toLowerCase().trim();
  const sectionWords = normalizedSection.split(/\s+/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Match any header level
    const headerMatch = line.match(/^#+\s+(.+)$/);
    if (headerMatch) {
      const headerText = headerMatch[1].toLowerCase().trim();

      // Exact match
      if (headerText === normalizedSection) {
        return { found: true, line: i + 1 };
      }

      // Word-based matching: all section words must appear in header
      // and header shouldn't be much longer (prevents "Product Requirements Document" matching "Requirements")
      const headerWords = headerText.split(/\s+/);
      const allWordsFound = sectionWords.every((word) =>
        headerWords.some((hw) => hw === word || hw.startsWith(word) || word.startsWith(hw))
      );

      // Only match if header is roughly the same length (within 1 extra word)
      // This prevents "Product Requirements Document" from matching "Requirements"
      if (allWordsFound && headerWords.length <= sectionWords.length + 1) {
        return { found: true, line: i + 1 };
      }
    }
  }

  return { found: false };
}

/**
 * Validate an output against a skill's template structure
 */
export function validateOutput(skill: Skill, output: string): ValidationResult {
  // Handle skills without templates
  if (!skill.template) {
    return {
      valid: true,
      skillName: skill.name,
      sectionsFound: 0,
      sectionsExpected: 0,
      sections: [],
      suggestions: ['This skill has no template - validation is based on content presence only.'],
    };
  }

  const expectedSections = extractExpectedSections(skill.template);
  const sections: SectionValidation[] = [];
  let foundCount = 0;

  for (const sectionName of expectedSections) {
    const result = findSection(output, sectionName);
    sections.push({
      name: sectionName,
      found: result.found,
      line: result.line,
    });
    if (result.found) {
      foundCount++;
    }
  }

  // Generate suggestions for missing sections
  const suggestions: string[] = [];
  const missingSections = sections.filter((s) => !s.found);

  if (missingSections.length > 0) {
    suggestions.push(`Missing sections: ${missingSections.map((s) => s.name).join(', ')}`);
    suggestions.push(`Consider adding these sections to make your ${skill.name} more complete.`);
  }

  // Check if output is too short
  const outputLines = output.split('\n').filter((l) => l.trim().length > 0);
  if (outputLines.length < 10) {
    suggestions.push('Output appears brief. Consider adding more detail to each section.');
  }

  const valid =
    foundCount >= Math.ceil(expectedSections.length * 0.7) && // At least 70% of sections
    outputLines.length >= 10; // Minimum content

  return {
    valid,
    skillName: skill.name,
    sectionsFound: foundCount,
    sectionsExpected: expectedSections.length,
    sections,
    suggestions,
  };
}

/**
 * Format validation result as markdown
 */
export function formatValidationResult(result: ValidationResult): string {
  const lines: string[] = [];

  const statusEmoji = result.valid ? 'PASS' : 'NEEDS WORK';
  lines.push(`# Validation Result: ${statusEmoji}`);
  lines.push('');
  lines.push(`**Skill:** ${result.skillName}`);
  lines.push(`**Sections:** ${result.sectionsFound}/${result.sectionsExpected} found`);
  lines.push('');

  lines.push('## Section Checklist');
  lines.push('');

  for (const section of result.sections) {
    const status = section.found ? '[x]' : '[ ]';
    const location = section.line ? ` (line ${section.line})` : '';
    lines.push(`- ${status} ${section.name}${location}`);
  }
  lines.push('');

  if (result.suggestions.length > 0) {
    lines.push('## Suggestions');
    lines.push('');
    for (const suggestion of result.suggestions) {
      lines.push(`- ${suggestion}`);
    }
    lines.push('');
  }

  if (result.valid) {
    lines.push('> **Result:** Output structure looks good! Review content quality manually.');
  } else {
    lines.push('> **Result:** Output needs additional sections. See suggestions above.');
  }

  return lines.join('\n');
}
