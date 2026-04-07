/**
 * Workflows - Pre-defined sequences of skills for common PM workflows
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

/** A workflow definition */
export interface Workflow {
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
const featureKickoff: Workflow = {
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
const leanStartup: Workflow = {
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
const tripleDiamond: Workflow = {
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
const quickPrd: Workflow = {
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
const experimentCycle: Workflow = {
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
 * Customer Discovery workflow - Research to validated problem
 */
const customerDiscovery: Workflow = {
  id: 'customer-discovery',
  name: 'Customer Discovery',
  description:
    'Transform raw research into a clear, validated problem worth solving.',
  effort: 'standard',
  useCases: [
    'Starting a new product initiative',
    'Validating a problem space before solutioning',
    'Synthesizing user research into actionable direction',
  ],
  steps: [
    {
      order: 1,
      skillName: 'interview-synthesis',
      toolName: 'pm_interview_synthesis',
      purpose: 'Synthesize raw research into structured findings',
      inputGuidance: 'Include interview notes, observations, and quotes',
    },
    {
      order: 2,
      skillName: 'jtbd-canvas',
      toolName: 'pm_jtbd_canvas',
      purpose: 'Frame customer jobs, outcomes, and alternatives',
      inputGuidance: 'Reference synthesis findings; capture functional, emotional, and social jobs',
    },
    {
      order: 3,
      skillName: 'opportunity-tree',
      toolName: 'pm_opportunity_tree',
      purpose: 'Map outcomes to prioritized opportunities',
      inputGuidance: 'Build on JTBD canvas outcomes; explore multiple solution paths',
    },
    {
      order: 4,
      skillName: 'problem-statement',
      toolName: 'pm_problem_statement',
      purpose: 'Create a research-grounded problem framing',
      inputGuidance: 'Synthesize all discovery work into a clear problem definition',
    },
  ],
};

/**
 * Sprint Planning workflow - Backlog to sprint-ready stories
 */
const sprintPlanning: Workflow = {
  id: 'sprint-planning',
  name: 'Sprint Planning',
  description:
    'Prepare sprint-ready stories with edge case coverage from a backlog or PRD.',
  effort: 'quick',
  useCases: [
    'Preparing stories for sprint planning',
    'Breaking down a PRD into implementable work',
    'Ensuring edge case coverage before development',
  ],
  steps: [
    {
      order: 1,
      skillName: 'refinement-notes',
      toolName: 'pm_refinement_notes',
      purpose: 'Document refinement session outcomes',
      inputGuidance: 'Include backlog items discussed, decisions made, and open questions',
    },
    {
      order: 2,
      skillName: 'user-stories',
      toolName: 'pm_user_stories',
      purpose: 'Generate stories with acceptance criteria',
      inputGuidance: 'Derive from refinement notes or PRD; include INVEST criteria',
    },
    {
      order: 3,
      skillName: 'edge-cases',
      toolName: 'pm_edge_cases',
      purpose: 'Document edge cases and boundary conditions',
      inputGuidance: 'Review each story for error states, boundaries, and recovery paths',
    },
  ],
};

/**
 * Product Strategy workflow - Strategic initiative framing
 */
const productStrategy: Workflow = {
  id: 'product-strategy',
  name: 'Product Strategy',
  description:
    'Frame a major strategic initiative with competitive context and documented decisions.',
  effort: 'comprehensive',
  useCases: [
    'Launching a new product line',
    'Major strategic pivots',
    'Building executive-level product cases',
  ],
  steps: [
    {
      order: 1,
      skillName: 'competitive-analysis',
      toolName: 'pm_competitive_analysis',
      purpose: 'Map competitive landscape and opportunities',
      inputGuidance: 'Include direct and indirect competitors; identify gaps and differentiators',
    },
    {
      order: 2,
      skillName: 'stakeholder-summary',
      toolName: 'pm_stakeholder_summary',
      purpose: 'Document stakeholder needs and influence',
      inputGuidance: 'Map key stakeholders, their priorities, and decision-making authority',
    },
    {
      order: 3,
      skillName: 'opportunity-tree',
      toolName: 'pm_opportunity_tree',
      purpose: 'Prioritize opportunities against outcomes',
      inputGuidance: 'Use competitive and stakeholder context to evaluate opportunities',
    },
    {
      order: 4,
      skillName: 'solution-brief',
      toolName: 'pm_solution_brief',
      purpose: 'Propose solution approach with trade-offs',
      inputGuidance: 'Reference opportunity tree; justify selected approach',
    },
    {
      order: 5,
      skillName: 'adr',
      toolName: 'pm_adr',
      purpose: 'Document key architecture decisions',
      inputGuidance: 'Record strategic and technical decisions with context and consequences',
    },
  ],
};

/**
 * Post-Launch Learning workflow - Measurement and learning capture
 */
const postLaunchLearning: Workflow = {
  id: 'post-launch-learning',
  name: 'Post-Launch Learning',
  description:
    'Set up measurement, evaluate results, and capture learnings after a feature ships.',
  effort: 'comprehensive',
  useCases: [
    'Post-launch feature evaluation',
    'Building measurement infrastructure for shipped features',
    'Capturing team learnings for future initiatives',
  ],
  steps: [
    {
      order: 1,
      skillName: 'instrumentation-spec',
      toolName: 'pm_instrumentation_spec',
      purpose: 'Define event tracking requirements',
      inputGuidance: 'Specify events, properties, and success metrics to track',
    },
    {
      order: 2,
      skillName: 'dashboard-requirements',
      toolName: 'pm_dashboard_requirements',
      purpose: 'Specify analytics dashboard needs',
      inputGuidance: 'Define visualizations, filters, and data sources for monitoring',
    },
    {
      order: 3,
      skillName: 'experiment-results',
      toolName: 'pm_experiment_results',
      purpose: 'Evaluate feature performance vs targets',
      inputGuidance: 'Include collected data, analysis, and comparison to success criteria',
    },
    {
      order: 4,
      skillName: 'retrospective',
      toolName: 'pm_retrospective',
      purpose: 'Facilitate team retrospective on the lifecycle',
      inputGuidance: 'Cover what went well, what to improve, and action items',
    },
    {
      order: 5,
      skillName: 'lessons-log',
      toolName: 'pm_lessons_log',
      purpose: 'Distill learnings into organizational memory',
      inputGuidance: 'Capture key learnings, patterns, and recommendations for future teams',
    },
  ],
};

/**
 * Stakeholder Alignment workflow - Building leadership buy-in
 */
const stakeholderAlignment: Workflow = {
  id: 'stakeholder-alignment',
  name: 'Stakeholder Alignment',
  description:
    'Build a compelling case for leadership buy-in before committing resources.',
  effort: 'standard',
  useCases: [
    'Pitching a new initiative to leadership',
    'Getting cross-functional alignment',
    'Preparing for investment decisions',
  ],
  steps: [
    {
      order: 1,
      skillName: 'stakeholder-summary',
      toolName: 'pm_stakeholder_summary',
      purpose: 'Map stakeholders and their priorities',
      inputGuidance: 'Identify key decision-makers, their concerns, and influence',
    },
    {
      order: 2,
      skillName: 'problem-statement',
      toolName: 'pm_problem_statement',
      purpose: 'Frame problem in stakeholder language',
      inputGuidance: 'Align problem framing with stakeholder priorities and business goals',
    },
    {
      order: 3,
      skillName: 'solution-brief',
      toolName: 'pm_solution_brief',
      purpose: 'Propose executive-ready solution',
      inputGuidance: 'Focus on value proposition, trade-offs, and resource requirements',
    },
    {
      order: 4,
      skillName: 'launch-checklist',
      toolName: 'pm_launch_checklist',
      purpose: 'Demonstrate execution readiness',
      inputGuidance: 'Show comprehensive readiness across engineering, design, and operations',
    },
  ],
};

/**
 * Technical Discovery workflow - Feasibility and architecture decisions
 */
const technicalDiscovery: Workflow = {
  id: 'technical-discovery',
  name: 'Technical Discovery',
  description:
    'Evaluate technical feasibility and document architecture decisions.',
  effort: 'standard',
  useCases: [
    'Evaluating a new technology or approach',
    'Making build vs buy decisions',
    'Documenting architecture choices for the team',
  ],
  steps: [
    {
      order: 1,
      skillName: 'spike-summary',
      toolName: 'pm_spike_summary',
      purpose: 'Document time-boxed exploration results',
      inputGuidance: 'Include hypothesis, methodology, findings, and recommendations',
    },
    {
      order: 2,
      skillName: 'adr',
      toolName: 'pm_adr',
      purpose: 'Record architecture decision with context',
      inputGuidance: 'Document decision, alternatives considered, and consequences',
    },
    {
      order: 3,
      skillName: 'design-rationale',
      toolName: 'pm_design_rationale',
      purpose: 'Document design reasoning and trade-offs',
      inputGuidance: 'Explain why this approach was chosen over alternatives',
    },
  ],
};

/**
 * All available workflows
 */
export const WORKFLOWS: Record<string, Workflow> = {
  'feature-kickoff': featureKickoff,
  'lean-startup': leanStartup,
  'triple-diamond': tripleDiamond,
  'quick-prd': quickPrd,
  'experiment-cycle': experimentCycle,
  'customer-discovery': customerDiscovery,
  'sprint-planning': sprintPlanning,
  'product-strategy': productStrategy,
  'post-launch-learning': postLaunchLearning,
  'stakeholder-alignment': stakeholderAlignment,
  'technical-discovery': technicalDiscovery,
};

/**
 * Get a workflow by ID
 */
export function getWorkflow(id: string): Workflow | undefined {
  return WORKFLOWS[id];
}

/**
 * List all available workflows
 */
export function listWorkflows(): Workflow[] {
  return Object.values(WORKFLOWS);
}

/**
 * Format a workflow for tool output
 */
export function formatWorkflowOutput(
  workflow: Workflow,
  skills: Map<string, Skill>,
  topic: string,
  context?: string
): string {
  const lines: string[] = [];

  lines.push(`# ${workflow.name} Workflow`);
  lines.push('');
  lines.push(workflow.description);
  lines.push('');
  lines.push(`**Topic:** ${topic}`);
  if (context) {
    lines.push(`**Context:** ${context}`);
  }
  lines.push(`**Effort Level:** ${workflow.effort}`);
  lines.push('');

  lines.push('## Use Cases');
  lines.push('');
  for (const useCase of workflow.useCases) {
    lines.push(`- ${useCase}`);
  }
  lines.push('');

  lines.push('## Workflow Steps');
  lines.push('');

  for (const step of workflow.steps) {
    // Find skill by matching the short name (after phase prefix)
    // e.g., step.skillName="problem-statement" matches skill.name="define-problem-statement"
    let skill: Skill | undefined;
    for (const [, s] of skills) {
      if (s.name.endsWith(`-${step.skillName}`) || s.name === step.skillName) {
        skill = s;
        break;
      }
    }
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
  for (const step of workflow.steps) {
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
