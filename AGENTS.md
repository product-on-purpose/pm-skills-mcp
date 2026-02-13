# PM-Skills MCP

> MCP server exposing 24 professional PM skills as tools, resources, and prompts

This MCP server provides programmatic access to the [PM-Skills](https://github.com/product-on-purpose/pm-skills) library via the Model Context Protocol. AI agents can invoke skill tools, read skill resources, and use guided prompts.

## Tools

### Discover Phase

#### pm_interview_synthesis
Turn user research interviews into actionable insights, patterns, and recommendations.

#### pm_competitive_analysis
Create structured competitive analysis comparing features, positioning, and strategy.

#### pm_stakeholder_summary
Document stakeholder needs, concerns, and influence for a project or initiative.

---

### Define Phase

#### pm_problem_statement
Create a clear problem framing document with user impact, business context, and success criteria.

#### pm_hypothesis
Define a testable hypothesis with clear success metrics and validation approach.

#### pm_opportunity_tree
Create an opportunity solution tree mapping outcomes to opportunities and solutions.

#### pm_jtbd_canvas
Create a Jobs to be Done canvas capturing functional, emotional, and social dimensions.

---

### Develop Phase

#### pm_solution_brief
Create a concise one-page solution overview with approach, decisions, and trade-offs.

#### pm_spike_summary
Document results of a time-boxed technical or design exploration (spike).

#### pm_adr
Create an Architecture Decision Record following the Nygard format.

#### pm_design_rationale
Document reasoning behind design decisions including alternatives and trade-offs.

---

### Deliver Phase

#### pm_prd
Create a comprehensive Product Requirements Document for engineering handoff.

#### pm_user_stories
Generate user stories with clear acceptance criteria from product requirements.

#### pm_edge_cases
Document edge cases, error states, boundary conditions, and recovery paths.

#### pm_launch_checklist
Create comprehensive pre-launch checklist covering all readiness areas.

#### pm_release_notes
Create user-facing release notes in clear, benefit-focused language.

---

### Measure Phase

#### pm_experiment_design
Design an A/B test with hypothesis, variants, metrics, sample size, and duration.

#### pm_instrumentation_spec
Specify event tracking and analytics instrumentation requirements.

#### pm_dashboard_requirements
Specify requirements for analytics dashboards including metrics and visualizations.

#### pm_experiment_results
Document completed experiment results with statistical analysis and recommendations.

---

### Iterate Phase

#### pm_retrospective
Facilitate and document team retrospective with actions and improvements.

#### pm_lessons_log
Create structured lessons learned entry for organizational memory.

#### pm_refinement_notes
Document backlog refinement session outcomes including stories and decisions.

#### pm_pivot_decision
Document strategic pivot/persevere decision with evidence and rationale.

---

## Workflow Tools

| Tool | Effort | Description |
|------|--------|-------------|
| `pm_workflow_feature_kickoff` | standard | problem → hypothesis → solution → PRD → stories |
| `pm_workflow_lean_startup` | comprehensive | hypothesis → experiment → results → pivot decision |
| `pm_workflow_triple_diamond` | comprehensive | Full discovery to delivery sequence |
| `pm_workflow_quick_prd` | quick | Fast problem → PRD workflow |
| `pm_workflow_experiment_cycle` | standard | hypothesis → experiment → results → lessons |

---

## Utility Tools

| Tool | Description |
|------|-------------|
| `pm_list_skills` | List all available PM skill tools |
| `pm_list_resources` | List all available MCP resources |
| `pm_list_workflows` | List all workflow bundles with steps |
| `pm_list_prompts` | List available conversation prompts |
| `pm_validate` | Validate artifact against skill template |
| `pm_search_skills` | Search skills by keyword across names, descriptions, and content |
| `pm_cache_stats` | Show in-memory cache statistics |

---

## Resources

Access skill content via MCP resources using these URI patterns:

```
pm-skills://skills/{skill}      → Full skill instructions
pm-skills://templates/{skill}   → Template only
pm-skills://examples/{skill}    → Worked example
```

**72 total resources:** 24 skills × 3 types (instructions, templates, examples)

---

## Prompts

| Prompt | Description |
|--------|-------------|
| `feature-kickoff` | Complete feature kickoff workflow |
| `lean-validation` | Build-Measure-Learn cycle |
| `quick-prd` | Fast PRD creation |

---

## Tool Parameters

All skill tools accept these parameters:

| Parameter | Required | Description |
|-----------|----------|-------------|
| `topic` | Yes | What to create the artifact for |
| `context` | No | Additional requirements or constraints |
| `format` | No | `full`, `concise`, or `template-only` |
| `includeExample` | No | Include a worked example |

---

## Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `PM_SKILLS_PATH` | (embedded) | Path to custom skills directory |
| `PM_SKILLS_FORMAT` | `full` | Default output format |
| `PM_SKILLS_EXAMPLES` | `false` | Include examples by default |

---

## License

Apache-2.0

---

*Built by [Product on Purpose](https://github.com/product-on-purpose) for AI-powered product management.*
