# Round 4 Project Understanding

Date: 2026-07-09

## Scope Correction

The user clarified that this round must focus only on the personal website itself:

- visual design;
- homepage structure;
- interactions;
- content presentation.

External GitHub projects may remain as links on the site, but this round must not use external project deep-dives as the main feature direction.

## Current Website Positioning

The site is a static GitHub Pages personal archive that is gradually becoming a portfolio-facing personal website. It currently combines:

- a sidebar with identity, search, account links, and stats;
- a homepage body with welcome copy, About, Proof Map, Projects, Archives, and Contact;
- static case-study pages under `projects/`;
- local article writing via `editor.html`;
- generated post manifest and XHS import tooling;
- guestbook integration through a separate Worker.

## Current Advantages

- The site is simple, static, and deployable without a build step.
- The Proof Map already connects personal positioning, capability claims, and review paths.
- Search, archive listing, editor, imports, and guestbook give the site useful working interactions.
- The visual system has a coherent glass/archive style with restrained colors and responsive behavior.
- AI-team docs already preserve product thinking, evaluation, implementation plans, and QA records.

## Current Defects

- The first viewport still reads like a generic blog template: "欢迎来到我的个人博客" appears before the stronger personal positioning.
- The best personal-brand content is buried under the welcome/About flow instead of leading the page.
- The homepage has multiple useful sections, but the visitor journey is not clearly staged from identity to proof to reading/contact.
- The sidebar account links are useful but feel separate from the main narrative.
- Visual hierarchy is competent but not distinctive enough to signal "personal website upgraded as a product surface."
- Blog/archive interaction is functional, but the homepage does not preview the archive as a curated body of work.

## Highest-Value Improvement Directions

1. Redesign the homepage first viewport into a stronger personal identity and navigation gateway.
2. Add an at-a-glance "start here" structure that routes visitors by intent: recruiter, technical reviewer, reader, collaborator.
3. Improve visual composition with a distinctive but lightweight static hero treatment.
4. Make the existing Proof Map and Projects feel like part of one narrative rather than separate sections.
5. Preserve editor, search, guestbook, import scripts, and static deployment behavior.

## Technical Stack

- Plain HTML/CSS/JavaScript.
- No package manager or `package.json`.
- Static posts under `posts/`.
- Generated manifest via `scripts/generate-posts-manifest.js`.
- XHS import via `scripts/import-xhs-notes.js`.
- Guestbook Worker/D1 code under `guestbook/`.
- Shared visual style in `styles.css`.

## Recent Commits

- `b335a43 Add guided code tour`
- `1830087 Add homepage proof map`
- `c68cd88 Add project case study pages`
- `7889ccb Document AI team feature planning`
- `a7f0f55 Add timeline archive filters`

