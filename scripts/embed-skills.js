#!/usr/bin/env node
/**
 * Embed Skills Script
 *
 * Copies skill files from the pm-skills repository into this package
 * for standalone distribution.
 *
 * Usage:
 *   node scripts/embed-skills.js [source-path]
 *
 * If source-path is not provided, it uses PM_SKILLS_SOURCE env var or
 * falls back to the default sibling directory path.
 *
 * Persona library embedding is opt-in:
 *   PM_INCLUDE_PERSONAS=true node scripts/embed-skills.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Default source path (sibling pm-skills repo)
const DEFAULT_SOURCE = path.resolve(PROJECT_ROOT, '../pm-skills/skills');
const DEFAULT_PERSONA_SOURCE = path.resolve(PROJECT_ROOT, '../pm-skills/library/personas');

// Destination path within this package
const DEST_PATH = path.resolve(PROJECT_ROOT, 'skills');
const DEST_PERSONA_PATH = path.resolve(PROJECT_ROOT, 'library/personas');
const INCLUDE_PERSONAS = (process.env.PM_INCLUDE_PERSONAS || '').toLowerCase() === 'true';

// Files to copy from each skill directory
// Structure: SKILL.md at root, TEMPLATE.md and EXAMPLE.md in references/
const ROOT_FILES = ['SKILL.md'];
const REFERENCE_FILES = ['TEMPLATE.md', 'EXAMPLE.md'];
const SKILL_PHASES = ['discover', 'define', 'develop', 'deliver', 'measure', 'iterate'];
const SKILL_CLASSIFICATIONS = ['domain', 'foundation', 'utility'];
const ALLOWED_ROOT_ENTRIES = new Set(['SKILL.md', 'references']);

/**
 * Copy a file if it exists
 */
function copyFileIfExists(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

function createInvariant(id, type, message, remediation) {
  return { id, type, message, remediation };
}

function formatInvariants(invariants) {
  if (invariants.length === 0) {
    return '  - (none)';
  }

  return invariants
    .map(
      (invariant) =>
        `  - [${invariant.type}] ${invariant.id}: ${invariant.message}\n    remediation: ${invariant.remediation}`
    )
    .join('\n');
}

function listSkillDirs(sourcePath) {
  return fs
    .readdirSync(sourcePath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) => !dirent.name.startsWith('.'))
    .map((dirent) => dirent.name)
    .sort((left, right) => left.localeCompare(right));
}

function validateSkillDirectory(sourcePath, skillDir) {
  const errors = [];
  const warnings = [];
  const skillSource = path.join(sourcePath, skillDir);
  const skillFilePath = path.join(skillSource, 'SKILL.md');
  const referencesPath = path.join(skillSource, 'references');

  if (!fs.existsSync(skillFilePath)) {
    errors.push(
      createInvariant(
        'EMB-001',
        'hard-fail',
        `Missing SKILL.md for skill '${skillDir}'.`,
        'Add SKILL.md at the skill root.'
      )
    );
    return { errors, warnings };
  }

  let frontmatter = null;
  try {
    const raw = fs.readFileSync(skillFilePath, 'utf8');
    const withoutLeadingComment = raw.replace(/^\s*<!--[\s\S]*?-->\s*/g, '');
    frontmatter = matter(withoutLeadingComment).data;
  } catch (error) {
    errors.push(
      createInvariant(
        'EMB-002',
        'hard-fail',
        `Could not parse SKILL.md frontmatter for '${skillDir}': ${error instanceof Error ? error.message : String(error)}.`,
        'Fix YAML frontmatter syntax and required keys.'
      )
    );
    return { errors, warnings };
  }

  const name = typeof frontmatter.name === 'string' ? frontmatter.name.trim() : '';
  const description =
    typeof frontmatter.description === 'string' ? frontmatter.description.trim() : '';
  const phase = typeof frontmatter.phase === 'string' ? frontmatter.phase.trim() : '';
  const classification =
    typeof frontmatter.classification === 'string' ? frontmatter.classification.trim() : '';
  const version = typeof frontmatter.version === 'string' ? frontmatter.version.trim() : '';

  if (!name || !description) {
    errors.push(
      createInvariant(
        'EMB-002',
        'hard-fail',
        `SKILL.md for '${skillDir}' must include frontmatter keys 'name' and 'description'.`,
        'Add required frontmatter keys.'
      )
    );
  }

  if (name && name !== skillDir) {
    errors.push(
      createInvariant(
        'EMB-003',
        'hard-fail',
        `Frontmatter name '${name}' does not match directory '${skillDir}'.`,
        'Align the skill directory name and frontmatter name.'
      )
    );
  }

  const hasValidPhase = phase.length > 0 && SKILL_PHASES.includes(phase);
  const hasValidClassification =
    classification.length > 0 && SKILL_CLASSIFICATIONS.includes(classification);

  if (!hasValidPhase && !hasValidClassification) {
    errors.push(
      createInvariant(
        'EMB-004',
        'hard-fail',
        `Skill '${skillDir}' must provide a valid phase or classification.`,
        `Set phase (${SKILL_PHASES.join(', ')}) or classification (${SKILL_CLASSIFICATIONS.join(
          ', '
        )}) in frontmatter.`
      )
    );
  }

  if (fs.existsSync(referencesPath)) {
    if (!fs.statSync(referencesPath).isDirectory()) {
      errors.push(
        createInvariant(
          'EMB-005',
          'hard-fail',
          `references path is not a directory for '${skillDir}'.`,
          'Use a references/ directory and include TEMPLATE.md.'
        )
      );
    } else if (!fs.existsSync(path.join(referencesPath, 'TEMPLATE.md'))) {
      errors.push(
        createInvariant(
          'EMB-005',
          'hard-fail',
          `references/TEMPLATE.md is missing for '${skillDir}'.`,
          'Add TEMPLATE.md under references/.'
        )
      );
    }
  }

  const rootEntries = fs.readdirSync(skillSource, { withFileTypes: true });
  const unexpectedEntries = rootEntries
    .map((entry) => entry.name)
    .filter((entryName) => !entryName.startsWith('.'))
    .filter((entryName) => !ALLOWED_ROOT_ENTRIES.has(entryName));
  if (unexpectedEntries.length > 0) {
    warnings.push(
      createInvariant(
        'EMB-006',
        'warning',
        `Skill '${skillDir}' has unexpected root entries: ${unexpectedEntries.join(', ')}.`,
        "Keep only SKILL.md and references/ at skill root (or consciously accept this warning)."
      )
    );
  }

  if (!version) {
    warnings.push(
      createInvariant(
        'EMB-009',
        'warning',
        `Skill '${skillDir}' is missing frontmatter version.`,
        'Add a version field to SKILL.md frontmatter.'
      )
    );
  }

  if (skillDir.startsWith('foundation-') || skillDir.startsWith('utility-')) {
    const expectedClassification = skillDir.startsWith('foundation-') ? 'foundation' : 'utility';
    if (classification !== expectedClassification) {
      errors.push(
        createInvariant(
          'EMB-010',
          'hard-fail',
          `Skill '${skillDir}' classification '${classification || '(missing)'}' does not match expected '${expectedClassification}'.`,
          `Set classification: ${expectedClassification} in SKILL.md frontmatter.`
        )
      );
    }
  }

  return { errors, warnings };
}

function validateSkills(sourcePath, skillDirs) {
  const errors = [];
  const warnings = [];

  for (const skillDir of skillDirs) {
    const result = validateSkillDirectory(sourcePath, skillDir);
    errors.push(...result.errors);
    warnings.push(...result.warnings);
  }

  return { errors, warnings };
}

/**
 * Copy skills from flat pm-skills v2.x structure
 * Source: skills/{phase-skill}/SKILL.md (e.g., skills/deliver-prd/SKILL.md)
 * Dest: skills/{phase-skill}/SKILL.md (preserved flat)
 */
function copySkills(sourcePath, destPath, skillDirs) {
  let skillCount = 0;
  let fileCount = 0;

  for (const skillDir of skillDirs) {
    // skillDir is like "deliver-prd", "define-hypothesis"
    const skillSource = path.join(sourcePath, skillDir);
    const skillDest = path.join(destPath, skillDir);

    // Create skill directory
    fs.mkdirSync(skillDest, { recursive: true });

    // Copy root files (SKILL.md)
    let copiedFiles = 0;
    for (const file of ROOT_FILES) {
      if (copyFileIfExists(
        path.join(skillSource, file),
        path.join(skillDest, file)
      )) {
        copiedFiles++;
        fileCount++;
      }
    }

    // Copy reference files (TEMPLATE.md, EXAMPLE.md)
    // Preserve references/ directory structure as expected by loader
    const srcRefDir = path.join(skillSource, 'references');
    const destRefDir = path.join(skillDest, 'references');

    if (fs.existsSync(srcRefDir)) {
      // Source has references/ subfolder - preserve structure
      fs.mkdirSync(destRefDir, { recursive: true });
      for (const file of REFERENCE_FILES) {
        if (copyFileIfExists(
          path.join(srcRefDir, file),
          path.join(destRefDir, file)
        )) {
          copiedFiles++;
          fileCount++;
        }
      }
    } else {
      // Fallback: try root files if no references folder
      // Copy to references/ to match loader expectations
      let foundAny = false;
      for (const file of REFERENCE_FILES) {
        if (fs.existsSync(path.join(skillSource, file))) {
          foundAny = true;
          break;
        }
      }
      if (foundAny) {
        fs.mkdirSync(destRefDir, { recursive: true });
        for (const file of REFERENCE_FILES) {
          if (copyFileIfExists(
            path.join(skillSource, file),
            path.join(destRefDir, file)
          )) {
            copiedFiles++;
            fileCount++;
          }
        }
      }
    }

    if (copiedFiles > 0) {
      skillCount++;
    }
  }

  console.log(`  Found ${skillDirs.length} skill directories`);

  return { skillCount, fileCount };
}

function verifyCopyParity(expectedSkillDirs, destPath) {
  const errors = [];
  const copiedSkillDirs = listSkillDirs(destPath).filter((skillDir) =>
    fs.existsSync(path.join(destPath, skillDir, 'SKILL.md'))
  );

  if (copiedSkillDirs.length !== expectedSkillDirs.length) {
    errors.push(
      createInvariant(
        'EMB-007',
        'hard-fail',
        `Copied skill count ${copiedSkillDirs.length} does not match source count ${expectedSkillDirs.length}.`,
        'Investigate embed copy logic and rerun embed-skills.'
      )
    );
    return errors;
  }

  const missingCopiedSkills = expectedSkillDirs.filter(
    (skillDir) => !copiedSkillDirs.includes(skillDir)
  );
  if (missingCopiedSkills.length > 0) {
    errors.push(
      createInvariant(
        'EMB-007',
        'hard-fail',
        `Missing copied skills: ${missingCopiedSkills.join(', ')}.`,
        'Ensure all source skills are copied to destination.'
      )
    );
  }

  return errors;
}

function assertDestinationClean(destPath) {
  const errors = [];
  if (!fs.existsSync(destPath)) {
    return errors;
  }

  const stats = fs.statSync(destPath);
  if (!stats.isDirectory()) {
    errors.push(
      createInvariant(
        'EMB-008',
        'hard-fail',
        `Destination path exists but is not a directory: ${destPath}.`,
        'Remove the conflicting file and rerun embed-skills.'
      )
    );
    return errors;
  }

  const remainingEntries = fs.readdirSync(destPath);
  if (remainingEntries.length > 0) {
    errors.push(
      createInvariant(
        'EMB-008',
        'hard-fail',
        `Destination skills directory is not empty before copy: ${remainingEntries.join(', ')}.`,
        'Ensure destination is fully cleaned before embedding.'
      )
    );
  }

  return errors;
}

/**
 * Copy persona library files while preserving category structure
 */
function copyPersonaLibrary(sourcePath, destPath) {
  let personaCount = 0;
  let fileCount = 0;

  if (!fs.existsSync(sourcePath)) {
    return { personaCount, fileCount, found: false };
  }

  const copyRecursive = (srcDir, dstDir) => {
    const entries = fs.readdirSync(srcDir, { withFileTypes: true });
    fs.mkdirSync(dstDir, { recursive: true });

    for (const entry of entries) {
      const src = path.join(srcDir, entry.name);
      const dst = path.join(dstDir, entry.name);

      if (entry.isDirectory()) {
        copyRecursive(src, dst);
        continue;
      }

      if (!entry.isFile() || !entry.name.toLowerCase().endsWith('.md')) {
        continue;
      }

      fs.copyFileSync(src, dst);
      fileCount++;

      if (entry.name.toLowerCase() !== 'readme.md') {
        personaCount++;
      }
    }
  };

  copyRecursive(sourcePath, destPath);
  return { personaCount, fileCount, found: true };
}

/**
 * Main function
 */
function main() {
  // Determine source path
  const sourcePath = process.argv[2] || process.env.PM_SKILLS_SOURCE || DEFAULT_SOURCE;
  const personaSourcePath =
    process.env.PM_PERSONAS_SOURCE || path.resolve(sourcePath, '..', 'library', 'personas');
  const resolvedPersonaSourcePath = fs.existsSync(personaSourcePath)
    ? personaSourcePath
    : DEFAULT_PERSONA_SOURCE;

  console.log('PM-Skills MCP: Embedding skills');
  console.log(`  Source: ${sourcePath}`);
  console.log(`  Destination: ${DEST_PATH}`);
  if (INCLUDE_PERSONAS) {
    console.log(`  Persona source: ${resolvedPersonaSourcePath}`);
    console.log(`  Persona destination: ${DEST_PERSONA_PATH}`);
  } else {
    console.log('  Persona embedding: disabled (set PM_INCLUDE_PERSONAS=true to enable)');
  }
  console.log('');

  // Validate source exists
  if (!fs.existsSync(sourcePath)) {
    console.error(`Error: Source path does not exist: ${sourcePath}`);
    console.error('');
    console.error('Provide the path to the pm-skills/skills directory:');
    console.error('  node scripts/embed-skills.js /path/to/pm-skills/skills');
    console.error('  OR set PM_SKILLS_SOURCE environment variable');
    process.exit(1);
  }

  const skillDirs = listSkillDirs(sourcePath);
  console.log(`Discovered ${skillDirs.length} skill directories in source.`);

  console.log('Validating embed invariants (D10):');
  const invariantValidation = validateSkills(sourcePath, skillDirs);
  const preflightErrors = [...invariantValidation.errors];

  if (invariantValidation.warnings.length > 0) {
    console.log('Warnings:');
    console.log(formatInvariants(invariantValidation.warnings));
  } else {
    console.log('Warnings:');
    console.log('  - (none)');
  }

  if (preflightErrors.length > 0) {
    console.error('Hard-fail invariant errors:');
    console.error(formatInvariants(preflightErrors));
    process.exit(1);
  }

  // Clean destination if it exists
  if (fs.existsSync(DEST_PATH)) {
    console.log('Cleaning existing skills directory...');
    fs.rmSync(DEST_PATH, { recursive: true });
  }
  if (fs.existsSync(DEST_PERSONA_PATH)) {
    console.log('Cleaning existing persona library directory...');
    fs.rmSync(DEST_PERSONA_PATH, { recursive: true });
  }

  // Create destination and verify clean state (EMB-008)
  fs.mkdirSync(DEST_PATH, { recursive: true });
  const destinationErrors = assertDestinationClean(DEST_PATH);
  if (destinationErrors.length > 0) {
    console.error('Hard-fail invariant errors:');
    console.error(formatInvariants(destinationErrors));
    process.exit(1);
  }

  // Copy skills
  console.log('Copying skills:');
  const { skillCount, fileCount } = copySkills(sourcePath, DEST_PATH, skillDirs);

  const parityErrors = verifyCopyParity(skillDirs, DEST_PATH);
  if (parityErrors.length > 0) {
    console.error('Hard-fail invariant errors:');
    console.error(formatInvariants(parityErrors));
    process.exit(1);
  }

  let personaCopy = { personaCount: 0, fileCount: 0, found: false };
  if (INCLUDE_PERSONAS) {
    console.log('Copying persona library:');
    personaCopy = copyPersonaLibrary(resolvedPersonaSourcePath, DEST_PERSONA_PATH);
    if (!personaCopy.found) {
      console.log('  Persona source not found, skipping persona copy.');
    } else {
      console.log(
        `  Copied ${personaCopy.personaCount} personas (${personaCopy.fileCount} markdown files)`
      );
    }
  } else {
    console.log('Copying persona library: skipped (PM_INCLUDE_PERSONAS is not true).');
  }

  console.log('');
  if (INCLUDE_PERSONAS) {
    console.log(
      `Done! Embedded ${skillCount} skills (${fileCount} files) and ${personaCopy.personaCount} personas`
    );
  } else {
    console.log(`Done! Embedded ${skillCount} skills (${fileCount} files).`);
  }
}

main();
