# Round 2 Feature Decision

## Inputs

- Round 2 project understanding: `docs/ai_team/round-02-project_understanding.md`
- Brainstorm outputs: `docs/ai_team/brainstorm/round-02-agent-01-personal-brand.md` through `round-02-agent-08-startup-pm.md`
- Evaluation outputs: `docs/ai_team/evaluation/round-02-evaluator-01-product-value.md` through `round-02-evaluator-05-delivery-risk.md`

## Top 3 Features

### 1. Hiring Snapshot + Capability Evidence Matrix

**Reason:** Four of five evaluators ranked this first, and the fifth ranked it second. It directly fixes the current site's highest-value gap: visitors can see role fit, strengths, and evidence quickly without reading every case study.

**Expected impact:** Higher recruiter comprehension, stronger personal brand clarity, and a durable navigation layer that routes technical reviewers to project pages, repos, and site-process proof.

**Implementation plan:** Add a homepage `#proof` section after About. Include a concise hiring snapshot, capability rows with linked evidence, ownership labels, and reviewer routes. Use static HTML/CSS only.

### 2. SmartLabeling Mask Visualizer / Visual Proof Strip

**Reason:** The technical-differentiation evaluator ranked this first because it would connect AI, frontend interaction, and graphics to a real project. Other evaluators pushed it down due to asset, accessibility, and simulation risks.

**Expected impact:** Strong technical demonstration if built with truthful local screenshots or representative assets.

**Implementation plan:** Defer to a later round. Before implementation, collect real project visuals or build an explicitly labeled static/canvas explanation that does not pretend to run the actual model.

### 3. Site-as-Project / Engineering Colophon

**Reason:** Evaluators consistently ranked this as a low-risk credibility booster. The repo already has import scripts, generated manifests, guestbook Worker notes, QA commands, and AI-team decision docs.

**Expected impact:** Shows process maturity and makes the portfolio itself an inspectable engineering artifact.

**Implementation plan:** Fold a small site-process cue into the evidence matrix now. Consider a dedicated page later if the content grows.

## Decision

Implement **Hiring Snapshot + Capability Evidence Matrix** for Round 2.

Scope includes:

- Hiring snapshot near the top of homepage content.
- Capability evidence matrix linking claims to proof.
- Ownership and code-review cues inside the matrix.
- A small site-as-project row, not a separate page yet.

Scope excludes:

- New JavaScript search behavior.
- WebGPU, shader, or canvas demos.
- Placeholder proof gallery assets.
- New paid services or external account integration.
