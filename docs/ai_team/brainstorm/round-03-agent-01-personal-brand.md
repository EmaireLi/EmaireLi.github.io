# Round 3 Brainstorm - Agent 1: Personal Brand Expert

## 1. SmartLabeling Mask Workflow Visualizer

- User value: Recruiters and technical reviewers can see AI tooling ability immediately instead of only reading about it.
- Why it fits: SmartLabeling is already a strongest proof point, but the page still lacks visual proof.
- Technical approach: Add local images under `assets/projects/smartlabeling/`; build a static before/after mask overlay with HTML/CSS and small JavaScript toggles for points, boxes, mask, and export.
- Estimated cost: Medium.
- Display effect: Polished interactive strip showing image to prompt points to mask overlay to exported artifact.
- Risks: Must use truthful screenshots or clearly labeled representative assets; avoid implying live model inference.

## 2. Yomii Request-to-Result Trace

- User value: Shows full-stack thinking: frontend action, API call, database boundary, model/evaluation response.
- Why it fits: Yomii has architecture text, but a trace would make the system inspectable in 30 seconds.
- Technical approach: Add a static sequence component to `projects/yomii.html` with HTML steps and CSS connectors; optional tabs for dictionary, review, and essay evaluation.
- Estimated cost: Medium.
- Display effect: System trace where each step highlights UI, FastAPI, storage, and AI evaluation responsibilities.
- Risks: Can become too diagram-heavy unless examples are concrete.

## 3. Code Tour Index

- User value: Technical reviewers get a guided path through best code evidence without hunting through GitHub.
- Why it fits: Current project pages link code areas, but there is no unified review surface.
- Technical approach: Add a static `projects/code-tour.html` or homepage section with grouped links by frontend, backend, AI/model, tests, and process.
- Estimated cost: Low.
- Display effect: Reviewer-focused map with "what to inspect" and "what this proves."
- Risks: Needs maintenance if repositories move or code structure changes.

## 4. Site Engineering Colophon

- User value: Turns the personal site itself into evidence of maintainable engineering process.
- Why it fits: The repo has imports, generated manifests, guestbook worker code, AI-team docs, and verification commands.
- Technical approach: Add a dedicated static page explaining architecture, content pipeline, XHS import, editor, manifest generation, guestbook boundary, and QA commands.
- Estimated cost: Low to medium.
- Display effect: Concise "how this site is built and maintained" engineering artifact.
- Risks: Must avoid overclaiming complexity.

## 5. AI Workflow Receipts

- User value: Shows AI-assisted engineering process instead of buzzword usage.
- Why it fits: `docs/ai_team/` already records planning, evaluation, decisions, and implementation loops.
- Technical approach: Add a static timeline summarizing brainstorm to evaluation to decision to implementation to verification.
- Estimated cost: Low.
- Display effect: Process timeline tied to shipped site improvements.
- Risks: Can feel self-referential unless tied to outcomes.

## 6. Project Evidence Gallery

- User value: Gives visual proof before visitors open GitHub.
- Why it fits: Case studies are credible but text-heavy.
- Technical approach: Add screenshot galleries to project pages with figures, captions, responsive CSS grid, and optional lightbox.
- Estimated cost: Medium.
- Display effect: Screenshots, architecture captures, export artifacts, and workflow images with proof captions.
- Risks: Requires accurate assets.

## 7. Engineering Decision Cards

- User value: Shows judgment: tradeoffs, constraints, and why choices were made.
- Why it fits: Case studies mention tradeoffs, but they are embedded in prose.
- Technical approach: Add reusable static cards: constraint, choice, alternative, result.
- Estimated cost: Low.
- Display effect: Dense, skimmable engineering reasoning.
- Risks: Can become repetitive if generic.

## 8. Local Search With Match Reasons

- User value: Helps visitors find relevant technical posts faster.
- Why it fits: Search already exists and uses the local post manifest.
- Technical approach: Extend search to show snippets, matched fields, filters, and scoring labels.
- Estimated cost: Medium.
- Display effect: Results show matched title/tag/excerpt.
- Risks: Touches shared `script.js`.

## Priority Order

1. SmartLabeling visualizer
2. Yomii trace
3. Code Tour Index
4. AI Workflow Receipts
5. Site Engineering Colophon
6. Project Evidence Gallery
7. Engineering Decision Cards
8. Explainable Search
