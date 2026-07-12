# Round 06 Brainstorm - Agent 01 Personal Brand

## Feature Ideas

### 1. Curated Reading Paths

- User value: helps first-time visitors decide what to read without scanning the full archive.
- Fit: the homepage already has Start Here, Proof Map, and Archive. A curated layer connects personal writing to visitor intent.
- Technical plan: add a compact section before `近期更新` with 3-4 manually chosen paths, such as technical growth, project review, life observation, and ACGN essays. Each path links to existing posts or tags.
- Estimated cost: low.
- Showcase effect: makes the site feel edited, intentional, and more human than a generic post list.
- Risk: manual curation can become stale.

### 2. Personal Positioning Snapshot

- User value: gives recruiters, collaborators, and readers a fast answer to "Who is Alex right now?"
- Fit: current hero is solid, but positioning is spread across several sections.
- Technical plan: add a small Now / Learning / Building / Looking For snapshot near the hero or sidebar.
- Estimated cost: low.
- Showcase effect: strengthens personal brand clarity without turning the site into a resume.
- Risk: formal copy may weaken the personal archive tone.

### 3. Evidence Highlights Strip

- User value: lets visitors quickly see the strongest proof points before the detailed Proof Map.
- Fit: the Proof Map is detailed; a shorter highlight strip could reduce cognitive load.
- Technical plan: add 3-5 compact proof chips under the hero, linking to static content pipeline, AI labeling workflow, Electron/FastAPI app, local search/archive, and guestbook integration.
- Estimated cost: low.
- Showcase effect: makes the homepage more scannable and gives stronger early proof.
- Risk: may duplicate the Proof Map.

### 4. Contact Intent Cards

- User value: makes it easier for visitors to know what kind of message to leave.
- Fit: contact currently exists, but conversion is passive.
- Technical plan: add prompt cards above the guestbook for project discussion, article feedback, learning exchange, and collaboration/recruiting.
- Estimated cost: medium if cards prefill the textarea; low if static.
- Showcase effect: improves warmth and response rate.
- Risk: prefill interaction touches `script.js` and may interfere with guestbook logic.

### 5. Archive First Reads

- User value: gives readers a clear first-click recommendation instead of only chronological browsing.
- Fit: the archive already has generated posts and tags, but no editorial priority.
- Technical plan: add a static First Reads block with 3 selected posts, each with title, reason, tag, and date.
- Estimated cost: low.
- Showcase effect: makes writing feel more valuable and curated.
- Risk: requires manual maintenance.

### 6. Account Links With Purpose Labels

- User value: visitors understand why each external account matters before leaving the site.
- Fit: account links are currently a flat platform list.
- Technical plan: group or label links: GitHub for code, Bilibili for media, XHS for notes, Bangumi/Steam for interests, LeetCode for practice.
- Estimated cost: low.
- Showcase effect: turns external links into a personal identity map.
- Risk: can take too much sidebar space.

### 7. What This Site Proves Trust Note

- User value: helps technical visitors understand the site as evidence.
- Fit: Site Pipeline Lens already frames the site as a project.
- Technical plan: add a concise note near Site Pipeline Lens about plain static site, local content, generated manifest, no framework dependency, and inspectable scripts.
- Estimated cost: low.
- Showcase effect: reinforces engineering judgment.
- Risk: redundant if placed too close to existing pipeline proof.

### 8. Homepage Section Navigator

- User value: makes the dense homepage easier to move through.
- Fit: the page now has several valuable sections.
- Technical plan: add a small sticky in-page index or enhance sidebar nav with current-section highlighting.
- Estimated cost: medium.
- Showcase effect: improves polish and usability.
- Risk: more JavaScript and responsive QA; current sidebar is already busy.

## Top 3

1. Curated Reading Paths
2. Contact Intent Cards
3. Personal Positioning Snapshot
