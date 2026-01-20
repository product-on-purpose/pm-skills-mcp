/**
 * Workflow Bundles - Pre-defined sequences of skills for common PM workflows
 *
 * Each workflow returns a plan that the AI client orchestrates.
 * The server remains stateless - it just provides the workflow definition.
 */

import type { Skill } from '../types/index.js';

/** A step in a workflow */
export interface WorkflowStep {
  /** Order in the workflow (1-based) */
  order: number;
  /** Skill name (e.g., "problem-statement") */
  skillName: string;
  /** Tool name to invoke (e.g., "pm_problem_statement") */
  toolName: string;
  /** Why this step is included */
  purpose: string;
  /** What to use as input for this step */
  inputGuidance: string;
  /** Whether this step is optional */
  optional?: boolean;
}

/** A workflow bundle definition */
export interface WorkflowBundle {
  /** Workflow identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** Description of when to use this workflow */
  description: string;
  /** The sequence of steps */
  steps: WorkflowStep[];
  /** Suggested use cases */
  useCases: string[];
  /** Estimated effort level */
  effort: 'quick' | 'standard' | 'comprehensive';
}

/**
 * Feature Kickoff workflow - for starting a new feature
 */
const featureKickoff: WorkflowBundle = {
  id: 'feature-kickoff',
  name: 'Feature Kickoff',
  description:
    'Complete workflow for kicking off a new feature, from problem definition through implementation-ready requirements.',
  effort: 'standard',
  useCases: [
    'Starting work on a new feature',
    'Transitioning from discovery to delivery',
    'Creating alignment before development begins',
  ],
  steps: [
    {
      order: 1,
      skillName: 'problem-statement',
      toolName: 'pm_problem_statement',
      purpose: 'Clearly define the problem being solved',
      inputGuidance: 'Use discovery findings, user feedback, or business requirements as context',
    },
    {
      order: 2,
      skillName: 'hypothesis',
      toolName: 'pm_hypothesis',
      purpose: 'Create a testable hypothesis for the solution',
      inputGuidance: 'Reference the problem statement; include success metrics',
    },
    {
      order: 3,
      skillName: 'solution-brief',
      toolName: 'pm_solution_brief',
      purpose: 'Outline the proposed solution approach',
      inputGuidance: 'Build on the hypothesis; consider alternatives evaluated',
    },
    {
      order: 4,
      skillName: 'prd',
      toolName: 'pm_prd',
      purpose: 'Document complete product requirements',
      inputGuidance: 'Incorporate problem statement, hypothesis, and solution brief',
    },
    {
      order: 5,
      skillName: 'user-stories',
      toolName: 'pm_user_stories',
      purpose: 'Break requirements into implementable stories',
      inputGuidance: 'Derive from the PRD; include acceptance criteria',
    },
  ],
};

/**
 * Lean Startup workflow - Build-Measure-Learn cycle
 */
const leanStartup: WorkflowBundle = {
  id: 'lean-startup',
  name: 'Lean Startup Validation',
  description:
    'Build-Measure-Learn cycle for validating product hypotheses through experimentation.',
  effort: 'comprehensive',
  useCases: [
    'Validating a risky assumption',
    'Testing product-market fit',
    'Making data-driven pivot/persevere decisions',
  ],
  steps: [
    {
      order: 1,
      skillName: 'hypothesis',
      toolName: 'pm_hypothesis',
      purpose: 'Define a testable hypothesis with clear success criteria',
      inputGuidance: "Be specific about what you believe and how you'll know if it's true",
    },
    {
      order: 2,
      skillName: 'experiment-design',
      toolName: 'pm_experiment_design',
      purpose: 'Design an experiment to test the hypothesis',
      inputGuidance: 'Reference the hypothesis; define control and treatment groups',
    },
    {
      order: 3,
      skillName: 'instrumentation-spec',
      toolName: 'pm_instrumentation_spec',
      purpose: 'Specify what data to collect',
      inputGuidance: 'Align with experiment success metrics',
      optional: true,
    },
    {
      order: 4,
      skillName: 'experiment-results',
      toolName: 'pm_experiment_results',
      purpose: 'Document and analyze experiment outcomes',
      inputGuidance: 'Include statistical significance; compare to hypothesis predictions',
    },
    {
      order: 5,
      skillName: 'pivot-decision',
      toolName: 'pm_pivot_decision',
      purpose: 'Decide whether to pivot, persevere, or iterate',
      inputGuidance: 'Reference experiment results; consider strategic context',
    },
  ],
};

/**
 * Triple Diamond workflow - Full discovery to delivery
 */
const tripleDiamond: WorkflowBundle = {
  id: 'triple-diamond',
  name: 'Triple Diamond',
  description:
    'Comprehensive end-to-end workflow following the Triple Diamond framework from discovery through delivery.',
  effort: 'comprehensive',
  useCases: [
    'Major new initiatives',
    'Strategic product changes',
    'When thorough discovery is needed',
  ],
  steps: [
    {
      order: 1,
      skillName: 'interview-synthesis',
      toolName: 'pm_interview_synthesis',
      purpose: 'Synthesize user research findings',
      inputGuidance: 'Include interview notes, observations, and quotes',
      optional: true,
    },
    {
      order: 2,
      skillName: 'stakeholder-summary',
      toolName: 'pm_stakeholder_summary',
      purpose: 'Document stakeholder landscape and needs',
      inputGuidance: 'Map stakeholders, their interests, and influence',
      optional: true,
    },
    {
      order: 3,
      skillName: 'problem-statement',
      toolName: 'pm_problem_statement',
      purpose: 'Define the core problem based on research',
      inputGuidance: 'Synthesize discovery findings into a clear problem',
    },
    {
      order: 4,
      skillName: 'hypothesis',
      toolName: 'pm_hypothesis',
      purpose: 'Form a testable hypothesis',
      inputGuidance: 'Build on problem statement; include measurable outcomes',
    },
    {
      order: 5,
      skillName: 'opportunity-tree',
      toolName: 'pm_opportunity_tree',
      purpose: 'Map solution opportunities',
      inputGuidance: 'Explore multiple solutions before committing',
      optional: true,
    },
    {
      order: 6,
      skillName: 'solution-brief',
      toolName: 'pm_solution_brief',
      purpose: 'Document chosen solution approach',
      inputGuidance: 'Reference opportunity tree; justify selection',
    },
    {
      order: 7,
      skillName: 'prd',
      toolName: 'pm_prd',
      purpose: 'Create comprehensive requirements',
      inputGuidance: 'Full context from all previous steps',
    },
  ],
};

/**
 * Quick PRD workflow - Fast requirements documentation
 */
const quickPrd: WorkflowBundle = {
  id: 'quick-prd',
  name: 'Quick PRD',
  description:
    'Streamlined workflow for rapidly creating a PRD when the problem and solution are already well-understood.',
  effort: 'quick',
  useCases: [
    'Small features with clear requirements',
    'Time-constrained situations',
    'When discovery is already complete',
  ],
  steps: [
    {
      order: 1,
      skillName: 'problem-statement',
      toolName: 'pm_problem_statement',
      purpose: 'Briefly document the problem',
      inputGuidance: 'Can be concise if problem is well-understood',
    },
    {
      order: 2,
      skillName: 'prd',
      toolName: 'pm_prd',
      purpose: 'Create the PRD',
      inputGuidance: 'Include problem context; focus on requirements',
    },
  ],
};

/**
 * Experiment Cycle workflow - Full experimentation flow
 */
const experimentCycle: WorkflowBundle = {
  id: 'experiment-cycle',
  name: 'Experiment Cycle',
  description: 'Complete experimentation workflow from hypothesis through learning capture.',
  effort: 'standard',
  useCases: ['A/B testing a feature', 'Validating a product change', 'Data-driven decision making'],
  steps: [
    {
      order: 1,
      skillName: 'hypothesis',
      toolName: 'pm_hypothesis',
      purpose: "Define what you're testing",
      inputGuidance: 'Include specific, measurable success criteria',
    },
    {
      order: 2,
      skillName: 'experiment-design',
      toolName: 'pm_experiment_design',
      purpose: 'Design the experiment',
      inputGuidance: 'Define methodology, sample size, duration',
    },
    {
      order: 3,
      skillName: 'instrumentation-spec',
      toolName: 'pm_instrumentation_spec',
      purpose: 'Specify tracking requirements',
      inputGuidance: 'Events, properties, and analytics needed',
    },
    {
      order: 4,
      skillName: 'experiment-results',
      toolName: 'pm_experiment_results',
      purpose: 'Document outcomes',
      inputGuidance: 'Include data, analysis, and conclusions',
    },
    {
      order: 5,
      skillName: 'lessons-log',
      toolName: 'pm_lessons_log',
      purpose: 'Capture learnings for future reference',
      inputGuidance: "What worked, what didn't, what to do differently",
    },
  ],
};

/**
 * All available workflow bundles
 */
export const WORKFLOW_BUNDLES: Record<string, WorkflowBundle> = {
  'feature-kickoff': featureKickoff,
  'lean-startup': leanStartup,
  'triple-diamond': tripleDiamond,
  'quick-prd': quickPrd,
  'experiment-cycle': experimentCycle,
};

/**
 * Get a workflow bundle by ID
 */
export function getWorkflowBundle(id: string): WorkflowBundle | undefined {
  return WORKFLOW_BUNDLES[id];
}

/**
 * List all available workflow bundles
 */
export function listWorkflowBundles(): WorkflowBundle[] {
  return Object.values(WORKFLOW_BUNDLES);
}

/**
 * Format a workflow bundle for tool output
 */
export function formatWorkflowOutput(
  bundle: WorkflowBundle,
  skills: Map<string, Skill>,
  topic: string,
  context?: string
): string {
  const lines: string[] = [];

  lines.push(`# ${bundle.name} Workflow`);
  lines.push('');
  lines.push(bundle.description);
  lines.push('');
  lines.push(`**Topic:** ${topic}`);
  if (context) {
    lines.push(`**Context:** ${context}`);
  }
  lines.push(`**Effort Level:** ${bundle.effort}`);
  lines.push('');

  lines.push('## Use Cases');
  lines.push('');
  for (const useCase of bundle.useCases) {
    lines.push(`- ${useCase}`);
  }
  lines.push('');

  lines.push('## Workflow Steps');
  lines.push('');

  for (const step of bundle.steps) {
    const skill = skills.get(step.skillName.replace(/-/g, '_'));
    const optionalTag = step.optional ? ' *(optional)*' : '';

    lines.push(`### Step ${step.order}: ${step.skillName}${optionalTag}`);
    lines.push('');
    lines.push(`**Tool:** \`${step.toolName}\``);
    lines.push(`**Purpose:** ${step.purpose}`);
    lines.push(`**Input Guidance:** ${step.inputGuidance}`);

    if (skill) {
      lines.push(`**Skill Description:** ${skill.description}`);
    }
    lines.push('');
  }

  lines.push('## How to Execute');
  lines.push('');
  lines.push(
    'Call each tool in sequence, using the output from previous steps as context for the next:'
  );
  lines.push('');
  lines.push('```');
  for (const step of bundle.steps) {
    const optionalComment = step.optional ? ' // optional' : '';
    lines.push(
      `${step.order}. ${step.toolName}(topic: "${topic}", context: "<previous outputs>")${optionalComment}`
    );
  }
  lines.push('```');
  lines.push('');

  lines.push(
    '> **Note:** The AI client orchestrates execution. Pass outputs from each step as context to the next.'
  );

  return lines.join('\n');
}
