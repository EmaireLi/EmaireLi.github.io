# Round 5 Project Understanding

Date: 2026-07-09

## Current Website Positioning

The site is now a static GitHub Pages personal website with a stronger proof-first homepage:

- The first viewport introduces Alex as a personal archive and project-proof surface.
- `Start here` routes guide recruiters, technical reviewers, readers, and contacts.
- The Proof Map links role direction, capability evidence, and review routes.
- Project cards now include short evidence receipts.
- Case-study pages and Code Tour provide deeper project review routes.
- Search, editor, XHS import, generated manifest, and guestbook remain stable features.

## Current Advantages

- First-visit comprehension is much stronger than before Round 4.
- The site still works as plain HTML/CSS/JavaScript with no build step or package manager.
- Mobile order and keyboard focus order are aligned after Round 4 QA.
- Project evidence is more scannable without requiring external project deep-dives.
- AI-team docs now show a repeatable discovery, evaluation, implementation, QA, commit, and push loop.

## Current Defects

- The website itself still does not visibly explain its own engineering pipeline: editor, posts, XHS import, manifest generation, search, archive, guestbook, and GitHub Pages deployment.
- The archive remains mostly a chronological list; visitors do not yet see curated lanes for technical notes, life fragments, XHS imports, or project logs.
- Search exists but does not explain why a result matched.
- Contact still appears late and is mostly a guestbook, not a clear outreach surface.
- Account links are useful but read like a link list rather than an identity map.
- WebGL/canvas ideas remain premature until hierarchy and evidence are stronger.

## Highest-Value Improvement Directions

1. Add a compact "site pipeline lens" so the personal website itself demonstrates engineering/system thinking.
2. Add curated archive windows that turn posts and imported notes into a clearer body of work.
3. Improve contact intent and account-link presentation after proof/archives are clearer.
4. Improve search result explanations later, but avoid touching `script.js` unless the value is clear.
5. Defer WebGL/canvas visual systems until they support evidence rather than decoration.

## Technical Stack

- Plain HTML/CSS/JavaScript.
- No `package.json` and no package manager.
- Static posts under `posts/`.
- Generated post manifest via `scripts/generate-posts-manifest.js`.
- XHS import via `scripts/import-xhs-notes.js`.
- Guestbook Worker/D1 code under `guestbook/`.
- Shared visual system in `styles.css`.

## Recent Commits

- `b9519c0 Add homepage evidence routing`
- `fcd8d04 Add round 4 startup PM brainstorm`
- `bae97f3 Add round 4 UX brainstorm`
- `b335a43 Add guided code tour`
- `1830087 Add homepage proof map`

