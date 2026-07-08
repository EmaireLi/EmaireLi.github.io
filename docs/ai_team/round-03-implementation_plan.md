# Round 3 Implementation Plan

## Selected Feature

Guided Code Tour / Review Routes.

## Files To Modify

- `projects/code-tour.html`
  - New static page with review routes for SmartLabeling, Yomii, and this site.
- `index.html`
  - Add Code Tour link in the Proof Map review route.
- `projects/smartlabeling.html`
  - Add Code Tour navigation/link.
- `projects/yomii.html`
  - Add Code Tour navigation/link.
- `styles.css`
  - Reuse case-study styles and add small route/verification styles if needed.
- `README.md`
  - Add maintenance guidance for code tour links.

## Technical Approach

- Use static HTML/CSS only.
- Keep route links broad enough to survive repo changes: repo folders, docs, and major files instead of fragile line anchors.
- Include for each route:
  - What to inspect.
  - What it proves.
  - Ownership/verification note.
  - Direct links to case study and repository area.
- Avoid JavaScript and avoid touching `editor.html` or `script.js`.

## Data Structure Changes

No generated data changes.

## Risks

- External repo links can drift. Mitigation: use broad folders/docs and README maintenance notes.
- Code tour can duplicate case pages. Mitigation: keep it cross-project and reviewer-focused.
- Overclaiming ownership. Mitigation: phrase proof as "inspect this because..." and keep limitations visible.

## Verification

- `node --check script.js`
- `node --check scripts/import-xhs-notes.js`
- `node scripts/generate-posts-manifest.js`
- `git diff --check`
- HTML parse check for `index.html`, project pages, and `projects/code-tour.html`
- Local preview for desktop and mobile layout
