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

## Round 2 Decision

### Top 3 Features

#### 1. Hiring Snapshot + Capability Evidence Matrix

**Reason:**
Four of five Round 2 evaluators ranked this first, and the remaining technical evaluator ranked it second. It gives the highest recruiter comprehension gain with the least code risk.

**Expected impact:**

- Visitors can quickly understand role direction, inspect proof behind capability claims, and choose the right project/code route without reading the entire site.
- Recruiters get a faster path from first visit to evidence-backed evaluation.
- The homepage gains a durable proof map for future projects and posts.

**Implementation plan:**

- Add a homepage `#proof` section after About.
- Include a compact hiring snapshot, evidence-linked capability rows, ownership cues, and reviewer routes.
- Use static HTML/CSS only and avoid touching `script.js`.

#### 2. SmartLabeling Mask Visualizer / Visual Proof Strip

**Reason:**
This is the strongest technical-differentiation candidate, but asset and accessibility risks make it better as the next technical round after the proof layer is in place.

**Expected impact:**

- Connects AI tooling, frontend interaction, and graphics to a real project.
- Gives SmartLabeling a stronger visual proof surface.

**Implementation plan:**

- Defer until accurate local visuals or clearly labeled representative assets exist.
- Avoid implying real browser-side model inference unless that is actually implemented.

#### 3. Site-as-Project / Engineering Colophon

**Reason:**
Low-risk way to show process, scripts, QA, and static-site architecture as portfolio evidence.

**Expected impact:**

- Makes the site itself an engineering artifact.
- Helps technical visitors verify maintenance and workflow discipline.

**Implementation plan:**

- Include a site-process row in the evidence matrix now.
- Consider a dedicated page later if the material grows.

### Round 2 Clear Highest Priority

The second implementation target is:

**Hiring Snapshot + Capability Evidence Matrix**

This should include enough ownership and code-review cues to improve hiring value immediately without adding JavaScript complexity.

## Round 3 Decision

### Top 3 Features

#### 1. Guided Code Tour / Review Routes

**Reason:**
Round 3 evaluators agreed that SmartLabeling visual proof would be valuable, but the repository currently has no real local project screenshots or mask artifacts. A guided code tour is the highest-value unconditional feature: it improves verification, stays honest, and avoids fake visual proof.

**Expected impact:**

- Technical reviewers can inspect the strongest code evidence faster.
- The homepage Proof Map gets a concrete review route instead of broad repo links.
- Project claims become easier to verify without running each app.

**Implementation plan:**

- Add a static `projects/code-tour.html` page.
- Cover SmartLabeling, Yomii, and this site.
- Link it from the homepage Proof Map and project case pages.
- Keep links broad enough to avoid brittle deep-path drift.

#### 2. SmartLabeling Visual Evidence Strip

**Reason:**
This remains the strongest technical-display candidate, but only if real screenshots, saved masks, or export artifacts are available.

**Expected impact:**

- Makes AI labeling workflow understandable in seconds.
- Adds visual AI/frontend proof to the strongest project page.

**Implementation plan:**

- Defer until assets exist under `assets/projects/smartlabeling/`.
- Do not imply live model inference or present generated placeholders as real product output.

#### 3. Yomii Request-to-Result / Essay Evaluation Trace

**Reason:**
Good full-stack/AI proof candidate, especially if implemented as one concrete workflow with route/test links.

**Expected impact:**

- Helps reviewers understand Yomii's UI/API/data/model loop.

**Implementation plan:**

- Defer to a later round after the code tour.
- Use sample payloads and code/test links rather than broad diagrams.

### Round 3 Clear Highest Priority

The third implementation target is:

**Guided Code Tour / Review Routes**
