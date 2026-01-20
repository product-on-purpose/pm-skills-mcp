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
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Default source path (sibling pm-skills repo)
const DEFAULT_SOURCE = path.resolve(PROJECT_ROOT, '../pm-skills/skills');

// Destination path within this package
const DEST_PATH = path.resolve(PROJECT_ROOT, 'skills');

// Files to copy from each skill directory
// Structure: SKILL.md at root, TEMPLATE.md and EXAMPLE.md in references/
const ROOT_FILES = ['SKILL.md'];
const REFERENCE_FILES = ['TEMPLATE.md', 'EXAMPLE.md'];

// Phase directories (Triple Diamond phases)
const PHASES = ['discover', 'define', 'develop', 'deliver', 'measure', 'iterate'];

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

/**
 * Recursively copy skill directories
 */
function copySkills(sourcePath, destPath) {
  let skillCount = 0;
  let fileCount = 0;

  for (const phase of PHASES) {
    const phaseSource = path.join(sourcePath, phase);
    const phaseDest = path.join(destPath, phase);

    if (!fs.existsSync(phaseSource)) {
      console.log(`  Skipping ${phase}/ (not found)`);
      continue;
    }

    // Create phase directory
    fs.mkdirSync(phaseDest, { recursive: true });

    // Get skill directories within the phase
    const skills = fs.readdirSync(phaseSource, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const skill of skills) {
      const skillSource = path.join(phaseSource, skill);
      const skillDest = path.join(phaseDest, skill);

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

    console.log(`  ${phase}/: ${skills.length} skills`);
  }

  return { skillCount, fileCount };
}

/**
 * Main function
 */
function main() {
  // Determine source path
  const sourcePath = process.argv[2] || process.env.PM_SKILLS_SOURCE || DEFAULT_SOURCE;

  console.log('PM-Skills MCP: Embedding skills');
  console.log(`  Source: ${sourcePath}`);
  console.log(`  Destination: ${DEST_PATH}`);
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

  // Clean destination if it exists
  if (fs.existsSync(DEST_PATH)) {
    console.log('Cleaning existing skills directory...');
    fs.rmSync(DEST_PATH, { recursive: true });
  }

  // Create destination
  fs.mkdirSync(DEST_PATH, { recursive: true });

  // Copy skills
  console.log('Copying skills:');
  const { skillCount, fileCount } = copySkills(sourcePath, DEST_PATH);

  console.log('');
  console.log(`Done! Embedded ${skillCount} skills (${fileCount} files)`);
}

main();
