# Round 4 Implementation Plan

Date: 2026-07-09

## Selected Feature

Homepage Evidence-Routing Pass

## Files To Modify

- `index.html`
  - Replace the generic welcome opening with a positioning-first identity panel.
  - Add a Start Here route block for recruiter, technical reviewer, reader, and contact/collaboration intent.
  - Add a Proof-to-Project bridge between Proof Map and Projects.
  - Add evidence receipt rows to project cards.

- `styles.css`
  - Add responsive styles for the identity panel, route cards, proof bridge, and evidence receipts.
  - Keep the existing glass/archive visual language.
  - Preserve mobile stacking and avoid sticky UI in this pass.

- `README.md`
  - Document the homepage evidence-routing convention and maintenance rules.

- `docs/ai_team/feature_decision.md`
  - Record the corrected Round 4 decision.

- `docs/ai_team/implementation_plan.md`
  - Record this implementation plan.

## Technical Approach

- Use static HTML and CSS only unless a problem requires JavaScript.
- Do not touch `editor.html` or `script.js`.
- Reuse existing classes where possible: buttons, project cards, section intro, proof labels, and evidence links.
- Keep copy factual and student-stage appropriate.
- Do not add external services, dependencies, or paid API surfaces.

## Data Structure Changes

None.

## Risks

- **Over-positioning:** The site may feel too much like a resume.  
  Mitigation: keep the copy personal, specific, and linked to existing archive/project sections.

- **Duplication:** Start Here routes can duplicate the top navigation.  
  Mitigation: use outcome-based labels rather than section names.

- **Density:** Adding receipts can make project cards too heavy.  
  Mitigation: use compact rows and keep proof bullets short.

- **Mobile layout:** New grids can overflow.  
  Mitigation: use one-column mobile layouts and verify in browser.

## Verification Plan

- `node --check script.js`
- `node --check scripts/import-xhs-notes.js`
- `node scripts/generate-posts-manifest.js`
- `git diff --check`
- Parse changed HTML files.
- Preview the homepage locally on desktop and mobile widths.

