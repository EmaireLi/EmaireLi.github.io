# Round 07 Project Understanding

## Round Contract

- Latest instruction: continue the AI Team loop without asking the user questions; resolve interrupting choices with the repository evidence and the skill's decision rules.
- Mode: continuous rounds. Complete one evidence-driven feature at a time, verify it, commit it, push it, then reassess the stop conditions.
- Approval interpretation: the user's explicit no-interruption instruction delegates routine product and implementation choices to the AI Team. Round documents must therefore preserve the alternatives, decision rationale, and self-review that would otherwise be discussed interactively.
- Stable positioning, editor behavior, import flow, archive, guestbook, and prior proof features must remain intact.

## Current Positioning And Audience

The site is a proof-first personal archive for recruiters, technical reviewers, readers, and potential collaborators. It presents Alex as an SCU software-engineering undergraduate moving from general Java work toward frontend/full-stack/AI tooling and engine-learning work. The site itself is also evidence: plain HTML/CSS/JavaScript, local writing and XHS import, a generated post manifest, client-side archive/search, a Cloudflare Worker guestbook, and a documented AI-team release loop.

## Current Implementation Read

- Architecture: static GitHub Pages site with no package-managed frontend build.
- Primary files: `index.html`, `styles.css`, `script.js`, `editor.html`, `projects/`, `posts/`, `scripts/`, `guestbook/`, and `docs/ai_team/`.
- Recent delivered rounds:
  - Round 02: Hiring Snapshot + Capability Evidence Matrix.
  - Round 03: Guided Code Tour.
  - Round 04: Homepage Evidence Routing.
  - Round 05: Site Pipeline Lens.
  - Round 06: Curated Reading Paths / First Reads.
- Current homepage order: identity hero, Start Here routes, About, Proof Map, Projects, Site Pipeline Lens, First Reads, archive, contact, then mobile-only flow into site overview, search, and account links.
- Search already has a shared manifest cache, highlighted excerpts, result counts, and a local-only failure state. It is visually fixed in the desktop sidebar but follows the full article in the mobile document flow.

## Rendered Baseline Evidence

Local preview was inspected at 1440×900 and 390×844.

- Desktop document height: about 6,315px. No horizontal overflow or console warnings/errors were detected.
- Mobile document height: about 10,555px. No horizontal overflow or console warnings/errors were detected.
- Mobile section positions: Proof Map ~1,811px, Projects ~3,989px, Site Pipeline ~5,925px, First Reads ~7,350px, archive ~8,415px, contact ~9,795px.
- On mobile, the site overview begins around 10,043px, search around 10,220px, and account links around 10,373px.
- The mobile header exposes About, Proof, Projects, Archives, and Editor, but no direct search control. A visitor must traverse nearly the whole page before reaching the existing search input.
- Responsive grids correctly collapse to one column, and no text or card overflow was observed. The main weakness is reachability and density, not layout breakage.

## Existing Strengths And Visible Proof

- The opening viewport clearly states identity, direction, best proof, and audience-specific routes.
- Claims are connected to local case studies, repositories, scripts, decision records, and a guided code tour.
- The publishing pipeline is transparent and stays compatible with static hosting.
- The archive has generated year groups, tag filters, excerpts, and a curated First Reads layer.
- Project ownership and limitations are described without manufactured metrics or fake screenshots.
- The visual system is consistent: restrained glass surfaces, muted cyan accent, mono evidence labels, accessible focus styles, and responsive single-column fallbacks.

## Current Weaknesses

### Usability

- Mobile content discovery is structurally late: search is placed after more than 10,000px of page content.
- Contact remains near the end of a long page and does not help visitors choose a useful message intent.
- The mobile navigation covers major sections but omits two high-value utilities: search and contact.
- The page has accumulated strong sections, but the mobile experience requires substantial scrolling even when the visitor already knows what they want.

### Visual And Content Hierarchy

- Proof Map, project receipts, pipeline cards, reading cards, archive entries, and contact all stack vertically on mobile. Each section works in isolation, but the aggregate has high decision and scrolling cost.
- External account chips are visually recognizable on desktop but provide no explanation of what evidence or personal facet each account contains.
- Contact copy is warm but generic; it does not convert project review or reading interest into a specific next step.

### Accessibility And Technical Quality

- Current search input behavior is keyboard-compatible, but a new mobile launcher would need deterministic focus entry/return, Escape handling, a non-JavaScript fallback, and reduced-motion-safe transitions.
- Any attempt to hide large proof sections behind disclosure controls could reduce evidence discoverability and introduce state/anchor regressions.
- Shared `script.js` is already about 1,200 lines. New behavior should be isolated in small helpers and reuse the existing search renderer/cache rather than duplicate search logic.

## Highest-Value Directions For Round 07

1. **Mobile-first search access:** make the existing archive search reachable from the header or an accessible lightweight search surface before the visitor traverses the page. This improves utility without adding content or external dependencies.
2. **Intent-aware contact conversion:** turn the bottom contact block into a clearer bridge from project, writing, or collaboration interest to a useful message while preserving the guestbook.
3. **In-page review navigation:** give long-page visitors a compact way to jump among proof, projects, reading, archive, and contact without hiding existing evidence.
4. **Search result explanation:** explain title/tag/content matches, improving trust in the existing search, but only if it does not distract from the more basic mobile reachability gap.

## Inherited Constraints And Explicit Skips

- Keep plain HTML/CSS/JavaScript and GitHub Pages compatibility.
- Preserve `editor.html` and current markdown workflow unless the selected feature genuinely requires a compatible extension.
- Do not add paid services, private-account access, new external dependencies, analytics, or a new site identity.
- Do not manufacture project screenshots, WebGL demos, capability metrics, or evidence that is not already verifiable.
- Do not implement several small backlog items in one round; select one feature after independent evaluation.
- Avoid feature work centered on external projects rather than the personal site experience.
