# Round 05 Brainstorm - Agent 02 Senior Frontend Engineer

Scope: homepage and site experience only. The site should feel like a polished personal site whose static implementation still demonstrates engineering judgment.

## Direction Options

- Site-as-system presentation: expose the existing frontend/content pipeline.
- Archive curation: improve navigation through existing writing.
- Interaction polish: add lightweight affordances without increasing fragility.

Recommended direction: site-as-system first, archive curation second.

## Feature Ideas

### 1. Site Pipeline Lens

- User value: visitors can understand how the site is authored, indexed, searched, and deployed.
- Fit: the repository already contains editor, import script, manifest generator, archive, search, and guestbook.
- Technical plan: static HTML/CSS section with ordered pipeline cards and local links to `editor.html`, scripts, `posts/posts.json`, archive/search, guestbook, and README.
- Estimated cost: low to medium.
- Showcase effect: highlights practical frontend/content engineering without new dependencies.
- Risk: too much implementation detail can distract nontechnical visitors.

### 2. Curated Archive Windows

- User value: readers get useful entry points instead of scanning a long chronological feed.
- Fit: the site has imported posts and mixed personal/technical writing.
- Technical plan: create static homepage lanes or a small archive section using current post metadata.
- Estimated cost: medium.
- Showcase effect: improves IA and content product thinking.
- Risk: metadata may need cleanup.

### 3. Search Match Reasons

- User value: search results explain why they appeared.
- Fit: local search already exists.
- Technical plan: adjust `script.js` result rendering to attach labels for title, tag, and excerpt matches.
- Estimated cost: low to medium.
- Showcase effect: makes the site feel more productized.
- Risk: touching shared search code can regress current behavior.

### 4. Account Identity Map

- User value: external accounts become navigational signals.
- Fit: the site already lists many platforms.
- Technical plan: regroup links into Code, Writing, Video, Notes, ACGN, and Contact.
- Estimated cost: low.
- Showcase effect: reduces ambiguity around personal brand.
- Risk: may duplicate existing contact content.

### 5. Contact Intent Cards

- User value: visitors know how to approach the owner.
- Fit: the current contact section is link-heavy.
- Technical plan: add cards for project discussion, article feedback, technical review, and recruiting.
- Estimated cost: low.
- Showcase effect: improves conversion.
- Risk: wording must avoid overpromising.

### 6. Proof Map Progressive Disclosure

- User value: keeps homepage dense but not overwhelming.
- Fit: the Proof Map is now useful but information-heavy.
- Technical plan: use native `details`/`summary` or CSS-only collapsed rows for secondary proof.
- Estimated cost: low.
- Showcase effect: improves scanning.
- Risk: hiding proof may weaken the first impression.

### 7. Homepage Review Minimap

- User value: visitors can jump between identity, proof, projects, posts, and contact.
- Fit: homepage now has several meaningful sections.
- Technical plan: small sticky or inline jump nav.
- Estimated cost: medium.
- Showcase effect: feels like a designed portfolio surface.
- Risk: sticky UI may distract on mobile.

### 8. Evidence Freshness Markers

- User value: visitors know which proof is current.
- Fit: project/docs changes happen frequently.
- Technical plan: add "updated" or "last checked" badges near evidence rows.
- Estimated cost: low.
- Showcase effect: signals maintenance.
- Risk: stale dates hurt trust.

### 9. Local Visual Archive Preview

- User value: visitors get a visual sample of imported XHS content.
- Fit: local XHS image assets already exist.
- Technical plan: render a lightweight image rail with local thumbnails.
- Estimated cost: medium.
- Showcase effect: makes the site less text-only.
- Risk: image sizing/performance needs care.

## Top Picks

1. Site Pipeline Lens
2. Curated Archive Windows
3. Search Match Reasons
4. Contact Intent Cards
5. Account Identity Map
