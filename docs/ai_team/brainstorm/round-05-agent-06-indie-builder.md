# Round 05 Brainstorm - Agent 06 Independent Developer

Scope: choose improvements that a solo builder can maintain on a static GitHub Pages site. Avoid paid services and fragile complexity.

## Direction Options

- Site-as-artifact: show the website as a maintained product.
- Archive curation: make existing content easier to reuse.
- Trust/freshness: make ongoing iteration visible.
- Contact/identity: improve conversion.

Recommendation: site-as-artifact plus archive curation.

## Feature Ideas

### 1. Site Pipeline Lens

- User value: visitors see how the personal site is produced and maintained.
- Fit: the current repo already has the required assets and scripts.
- Technical plan: static section showing write/import/generate manifest/render archive/search/publish.
- Estimated cost: low.
- Showcase effect: turns a simple static site into a visible system.
- Risk: needs crisp wording to avoid being boring.

### 2. Curated Archive Windows

- User value: visitors can enter the post library through useful windows.
- Fit: posts are already structured through `posts/posts.json`.
- Technical plan: static homepage blocks for Technical, Career, Life, ACGN, and XHS imports.
- Estimated cost: low to medium.
- Showcase effect: improves content usefulness.
- Risk: manual curation can go stale.

### 3. Current Build Note

- User value: visitors see what is being improved now.
- Fit: the site is being iterated in documented rounds.
- Technical plan: small "Now building" note linked to latest AI-team decision.
- Estimated cost: low.
- Showcase effect: shows momentum.
- Risk: stale current note hurts credibility.

### 4. Project Decision Trail

- User value: visitors can inspect how features were selected.
- Fit: feature decisions and implementation plans exist.
- Technical plan: add links from homepage proof areas to decision docs and code tour.
- Estimated cost: low.
- Showcase effect: makes process transparent.
- Risk: internal docs may not be polished for all visitors.

### 5. Search Result Reason Labels

- User value: search feels clearer.
- Fit: existing local search can be enhanced.
- Technical plan: add match reason labels in `script.js`.
- Estimated cost: medium.
- Showcase effect: better product feel.
- Risk: changes shared JavaScript.

### 6. Account Identity Map

- User value: external accounts are easier to understand.
- Fit: link list already exists.
- Technical plan: group by platform purpose.
- Estimated cost: low.
- Showcase effect: better personal brand.
- Risk: low engineering value alone.

### 7. Homepage Reading Mode Toggle

- User value: readers can switch between concise and detailed view.
- Fit: homepage is getting denser.
- Technical plan: CSS/JS toggle for compact vs detail sections.
- Estimated cost: medium.
- Showcase effect: polished interaction.
- Risk: unnecessary complexity.

### 8. Post Preview Image Strip

- User value: the homepage becomes more visual.
- Fit: XHS image assets exist locally.
- Technical plan: render local thumbnails with stable dimensions.
- Estimated cost: low to medium.
- Showcase effect: humanizes the site.
- Risk: performance and crop quality.

### 9. Contact Intent Cards

- User value: visitors know the best way to reach out.
- Fit: contact section exists.
- Technical plan: add intent-specific cards.
- Estimated cost: low.
- Showcase effect: improves conversion.
- Risk: may be redundant with account map.

## Final Recommendation

Implement Site Pipeline Lens first. It is visible, honest, maintainable, and directly reinforces the personal website as a crafted product.
