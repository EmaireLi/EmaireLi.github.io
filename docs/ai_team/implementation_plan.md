# Implementation Plan

Date: 2026-07-08

## Selected Feature

Project Case Study Pages + Homepage Project Cards

## Files To Modify

- `index.html`
  - Replace the current simple Projects list with richer project cards.
  - Link to new case study pages.
  - Optionally add a small hiring-oriented intro for the project section, not a full resume page.

- `styles.css`
  - Add reusable styles for project cards and case study pages.
  - Preserve the existing glass/archive visual style.
  - Keep mobile layout stable and readable.

- `README.md`
  - Document the new project case study pages and the maintenance convention.

## Files To Add

- `projects/smartlabeling.html`
  - Static case study page for SmartLabeling.

- `projects/yomii.html`
  - Static case study page for Yomii.

Potential later additions, not required in the first patch:

- `assets/projects/smartlabeling/`
- `assets/projects/yomii/`

## Technical Approach

- Keep the implementation plain HTML/CSS/JavaScript.
- Do not add dependencies or a build step.
- Use static HTML for the first version because there are only two projects.
- Reuse existing page chrome: `headband`, `.main`, `.column`, `.post-block`, `.post-body`, footer.
- Make project cards scan-friendly:
  - project name;
  - one-line positioning;
  - role/ownership;
  - technology tags;
  - key proof points;
  - links to case study and GitHub.
- Make case studies evidence-first:
  - problem;
  - role;
  - architecture/data flow;
  - implementation highlights;
  - tradeoffs;
  - code reading links;
  - outcomes and next steps.

## Data Structure Changes

None in the first implementation.

Rationale:

- A `projects.json` file is unnecessary until the project count grows or multiple pages need dynamic rendering.
- Static HTML keeps the change compatible with GitHub Pages and the existing no-build workflow.

## Risks

- Project details may be incomplete without screenshots or exact metrics.
  - Mitigation: use honest “current evidence / next proof to add” wording.
- Homepage cards could become visually heavy.
  - Mitigation: keep cards compact and let detail pages carry the deeper content.
- External GitHub file links may drift over time.
  - Mitigation: link to repository-level paths first, and use code-reading notes that remain useful even if files move.
- This plan touches user-facing HTML/CSS.
  - Mitigation: run syntax checks and local visual preview when possible.

## Verification Plan

- `node --check script.js`
- `node --check scripts/import-xhs-notes.js`
- `node scripts/generate-posts-manifest.js`
- Start a local static server and preview:
  - homepage Projects section;
  - `projects/smartlabeling.html`;
  - `projects/yomii.html`;
  - mobile-width layout if browser tooling is available.

## Implementation Gate

The active goal continuation explicitly directed continued autonomous progress. Implementation proceeded on the documented highest-priority feature while preserving the original design and decision records.

## Round 4 Implementation Plan

Date: 2026-07-09

### Selected Feature

Homepage Evidence-Routing Pass

### Files To Modify

- `index.html`
  - Replace the generic welcome opening with a positioning-first identity panel.
  - Add Start Here route cards.
  - Add a Proof-to-Project bridge.
  - Add project evidence receipt rows.
- `styles.css`
  - Add responsive styles for the new homepage components.
- `README.md`
  - Document homepage evidence-routing maintenance.

### Technical Approach

- Keep the implementation static HTML/CSS.
- Preserve `editor.html` and `script.js`.
- Reuse existing visual tokens and project-card patterns.
- Avoid hidden-content filters or new interaction state in this pass.

### Data Structure Changes

None.

### Risks

- The hero could feel too much like a resume.
- Route cards could duplicate navigation.
- Project receipts could increase page density.
- New grids could overflow on mobile.

### Verification Plan

- Run the required JavaScript checks and manifest generation.
- Run `git diff --check`.
- Parse changed HTML files.
- Preview the homepage locally on desktop and mobile widths.
