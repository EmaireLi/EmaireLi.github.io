# Round 2 Implementation Plan

## Selected Feature

Hiring Snapshot + Capability Evidence Matrix.

## Files To Modify

- `index.html`
  - Add `Proof` to the main navigation.
  - Add a new `#proof` section after About.
  - Include hiring snapshot, capability evidence rows, ownership labels, code review routes, and site-as-project proof.
- `styles.css`
  - Add styles for the snapshot, capability matrix, evidence chips, and responsive layout.
  - Reuse existing colors, glass surfaces, card radii, and typography.
- `README.md`
  - Document how to maintain the homepage proof section.

## Technical Approach

- Keep everything static and GitHub Pages-compatible.
- Use semantic HTML: `section`, headings, lists, `dl`, and links.
- Avoid JavaScript so existing search, editor, guestbook, XHS import, and post manifest behavior stay untouched.
- Keep claims evidence-backed by linking to project case pages, GitHub repos, scripts, README sections, and visible site areas.

## Data Structure Changes

No generated data changes. The evidence matrix is static homepage HTML for now.

Future option: if the matrix grows, move proof entries into a small JSON file or a build script, but that would be unnecessary for the current scale.

## Risks

- Copy could become too generic or inflated. Mitigation: use specific evidence labels and direct links.
- Homepage could become too dense. Mitigation: compact two-column layout on desktop and single-column layout on mobile.
- External repo links can drift. Mitigation: keep links at repo/project level rather than deep file anchors for now.
- Matrix can become stale. Mitigation: README maintenance notes require proof links to be updated with project changes.

## Verification

- `node --check script.js`
- `node --check scripts/import-xhs-notes.js`
- `node scripts/generate-posts-manifest.js`
- `git diff --check`
- Local preview for desktop and mobile layout.
