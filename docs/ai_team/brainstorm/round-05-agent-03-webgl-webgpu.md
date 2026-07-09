# Round 05 Brainstorm - Agent 03 WebGL/WebGPU Expert

Scope: avoid adding graphics for novelty. The current personal site needs clearer visitor value before heavy WebGL/WebGPU work.

## Direction Options

- HTML-first evidence visuals: static diagrams and compact information graphics.
- Canvas/WebGL progressive overlays: optional enhancement only after the information architecture is strong.
- Defer WebGPU demos: WebGPU would be better as a focused future project, not homepage decoration.

## Feature Ideas

### 1. Site Pipeline Lens

- User value: visitors see the site as a working content system.
- Fit: current static architecture has meaningful stages: editor/import, manifest, archive, search, guestbook, and deploy.
- Technical plan: HTML/CSS pipeline with optional connector lines; no WebGL required.
- Estimated cost: low to medium.
- Showcase effect: makes engineering process visible.
- Risk: can become decorative if cards lack links to real artifacts.

### 2. Proof Route Flow Map

- User value: recruiter/reviewer/reader paths become easier to follow.
- Fit: the homepage already has Start Here routes.
- Technical plan: add a compact flow map linking audience routes to proof sections.
- Estimated cost: medium.
- Showcase effect: shows UX systems thinking.
- Risk: duplicates the existing Start Here section.

### 3. Archive Topic Terrain

- User value: posts become visually searchable by topic/year.
- Fit: `posts/posts.json` can power a simple map.
- Technical plan: first implement as tag/year lanes; later add canvas scatter if data density supports it.
- Estimated cost: medium.
- Showcase effect: could hint at data visualization capability.
- Risk: sparse or uneven tags may weaken the visualization.

### 4. Search Match Inspector

- User value: local search becomes more transparent.
- Fit: search already exists.
- Technical plan: show matched fields and highlighted terms in result cards.
- Estimated cost: medium.
- Showcase effect: demonstrates frontend detail work.
- Risk: touches shared JavaScript.

### 5. Evidence Density Markers

- User value: visitors can quickly distinguish stronger proof from lighter references.
- Fit: project receipts already list proof links.
- Technical plan: add simple evidence badges such as Demo, Code, Decision, QA.
- Estimated cost: low.
- Showcase effect: communicates proof quality.
- Risk: scoring can feel artificial.

### 6. Code Tour Mini Map

- User value: visitors understand the static site architecture.
- Fit: a code tour page already exists.
- Technical plan: add a small file/module map on the homepage.
- Estimated cost: medium.
- Showcase effect: shows architecture awareness.
- Risk: file paths can go stale.

### 7. Contact Intent Panel

- User value: visitors know where to direct questions.
- Fit: current contact is link-heavy.
- Technical plan: intent cards with platform links.
- Estimated cost: low.
- Showcase effect: improves conversion.
- Risk: low technical differentiation.

### 8. Case Study Preview Strip

- User value: visitors can sample project workflows quickly.
- Fit: the homepage already has project evidence rows.
- Technical plan: add workflow strips inside project cards.
- Estimated cost: medium.
- Showcase effect: improves scan depth.
- Risk: duplicates case-study pages.

## Recommendation

Implement Site Pipeline Lens first. It gives the most truthful technical signal with the least complexity. Archive Topic Terrain may be worth a later round after content metadata is reviewed. Avoid WebGPU for now.
