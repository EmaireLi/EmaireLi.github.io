# Feature Decision

Date: 2026-07-08

## Decision Inputs

- Phase 1 project understanding: `docs/ai_team/project_understanding.md`
- Brainstorm outputs: `docs/ai_team/brainstorm/`
- Evaluator outputs: `docs/ai_team/evaluation/`

## Top 3 Features

### 1. Project Case Study Pages + Homepage Project Cards

**Reason:**
This is the clearest consensus winner. The current Projects section only contains links, so visitors cannot judge ownership, technical depth, architecture, tradeoffs, or results. Case study pages directly improve hiring value while staying compatible with the static GitHub Pages architecture.

**Expected impact:**

- Recruiters can evaluate real project depth without leaving the site first.
- SmartLabeling and Yomii become evidence-rich portfolio entries instead of plain links.
- Creates a stable foundation for later SmartLabeling visualization, code reading guide, and capability matrix.

**Implementation plan:**

- Upgrade the homepage Projects section from a plain list to concise project cards.
- Add `projects/smartlabeling.html`.
- Add `projects/yomii.html`.
- Add a reusable case-study visual style in `styles.css`.
- Include project role, stack, problem, architecture, key tradeoffs, code links, outcomes, and next steps.
- Avoid claims that require external accounts or paid services.

### 2. Hiring Snapshot + Capability Evidence Matrix

**Reason:**
Multiple evaluators ranked this as the best low-cost recruiter conversion fix. It gives visitors a fast answer to “who is this person, what direction are they pursuing, and where can I verify it?”

**Expected impact:**

- Shortens the path from first visit to meaningful evaluation.
- Connects skills to evidence rather than subjective self-ratings.
- Supports personal branding without changing the site into a generic resume page.

**Implementation plan:**

- Add a restrained Hiring Snapshot near the top of the homepage body.
- Add a capability evidence matrix near About or Projects.
- Use labels such as `Used in project`, `Building`, `Learning`, and `Evidence`, not percentages or stars.
- Link each capability to a project, article, or repository.

### 3. SmartLabeling Visual Case Study Enhancement

**Reason:**
The technical-differentiation evaluator ranked SmartLabeling Visualizer highest, but the broader evaluator group warned against building a standalone AI demo too early. The right compromise is to embed static, honest visual proof inside the SmartLabeling case study.

**Expected impact:**

- Demonstrates AI tooling, computer vision workflow, UI thinking, and engineering communication.
- Avoids paid APIs and avoids pretending the browser is running real model inference.
- Sets up a future Mini Vision Lab or WebGPU overlay only if the static proof is strong.

**Implementation plan:**

- Start with static placeholders and descriptive sections if real screenshots/masks are not available in this repo.
- Structure the page for later local assets under `assets/projects/smartlabeling/`.
- Describe the intended flow: image input, model-assisted proposal, human correction, export.
- Add code-reading links to the GitHub repository.

## Clear Highest Priority

The first implementation target is:

**Project Case Study Pages + Homepage Project Cards**

This should include enough structure to later host the Hiring Snapshot, evidence matrix, and SmartLabeling visual proof without reworking the site.

## Explicitly Skipped For This Round

- Standalone WebGPU AI Playground: too broad and too risky before project evidence exists.
- Visitor funnel analytics: privacy and Worker scope risk.
- 3D timeline / particle identity card: high visual risk, low proof value.
- Knowledge graph / archive constellation: current data volume is too sparse.
- XHS Photo Notes: useful archive feature, but weaker for hiring and technical differentiation.
- Generic resume page: ordinary and likely to become stale.
