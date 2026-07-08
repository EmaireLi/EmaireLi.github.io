# Round 3 Brainstorm - Agent 2: Senior Frontend Engineer

## 1. SmartLabeling Visual Proof Strip

- User value: Makes the AI labeling workflow understandable in seconds.
- Why it fits: The SmartLabeling page already identifies visual proof as the next missing evidence.
- Technical approach: Add local assets under `assets/projects/smartlabeling/`, then a static HTML/CSS before to prompt to mask to export strip. Optional tiny JavaScript only for image comparison.
- Estimated cost: Medium.
- Display effect: Strong visual upgrade that feels like real product proof.
- Risks: Needs truthful screenshots/masks.

## 2. Yomii Learning Loop Timeline

- User value: Shows how search, review, quiz, and essay feedback connect.
- Why it fits: Complements the Yomii case page without rewriting it.
- Technical approach: Static workflow module with screenshots or UI-state crops; CSS grid on desktop and vertical timeline on mobile.
- Estimated cost: Low to medium.
- Display effect: Makes the full-stack workflow concrete.
- Risks: Screenshots need consistent sizing and should not overload the page.

## 3. Site Engineering Colophon

- User value: Turns the GitHub Pages site into its own engineering artifact.
- Why it fits: Proof Map mentions site tooling, but there is no focused page explaining it.
- Technical approach: Static page describing posts manifest, XHS import, editor, guestbook, verification commands, and deployment constraints.
- Estimated cost: Low.
- Display effect: Quiet but credible static-system proof.
- Risks: Can go stale unless kept short and file-linked.

## 4. Curated Reading Paths

- User value: Helps recruiters, technical reviewers, and personal readers choose what to open next.
- Why it fits: Builds on review routes without duplicating the Proof Map.
- Technical approach: Add a compact "Start here" section near archives with three static paths.
- Estimated cost: Low.
- Display effect: Improves navigation and intentionality.
- Risks: Too many paths become another menu.

## 5. Case Study Asset Gallery Pattern

- User value: Lets visitors inspect screenshots, diagrams, and artifacts in one consistent module.
- Why it fits: Reusable for SmartLabeling, Yomii, and future projects.
- Technical approach: CSS-only responsive gallery with captions, source notes, and optional repo links.
- Estimated cost: Low.
- Display effect: More polished portfolio feel with low JavaScript risk.
- Risks: Requires real assets.

## 6. Article Reading Quality Pass

- User value: Long posts become easier to read and scan.
- Why it fits: Blog/archive remains a core surface but is less urgent than project proof.
- Technical approach: Scoped CSS improvements for post rhythm, heading anchors, image captions, code spacing, and mobile typography.
- Estimated cost: Low.
- Display effect: Better reading comfort across posts.
- Risks: Broad CSS changes can regress imported XHS posts.

## 7. Explainable Search V2

- User value: Search results show why they matched and surface better snippets.
- Why it fits: Existing local search is useful but basic.
- Technical approach: Isolated changes inside search functions: weighted matching, match reason labels, better excerpts.
- Estimated cost: Medium.
- Display effect: Search feels like a built product feature.
- Risks: Touches shared `script.js`.

## 8. Responsive Polish Audit Layer

- User value: Makes the site feel sturdier on mobile and narrow desktop.
- Why it fits: Current layout is card/sidebar-heavy.
- Technical approach: CSS-only pass on project cards, Proof Map rows, case-flow grids, search card, and guestbook spacing.
- Estimated cost: Low.
- Display effect: Less cramped mobile experience.
- Risks: Needs visual preview because global styles are centralized.

## Priority Order

1. SmartLabeling Visual Proof Strip
2. Yomii Learning Loop Timeline
3. Site Engineering Colophon
