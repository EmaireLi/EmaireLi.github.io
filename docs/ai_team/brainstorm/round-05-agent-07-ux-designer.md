# Round 05 Brainstorm - Agent 07 UX Designer

Scope: improve visitor paths, hierarchy, content presentation, interaction, and trust for the personal website itself.

## Feature Ideas

### 1. Site Pipeline Lens

- User value: visitors understand the site as a maintained publishing system, not just a static resume.
- Fit: the site already has editor, XHS import, manifest generation, archive, search, guestbook, and GitHub Pages deployment.
- Technical plan: add a homepage section with 5-7 static steps: Write, Import, Index, Browse, Search, Respond, Publish. Link to existing pages, docs, and scripts where appropriate.
- Estimated cost: medium.
- Showcase effect: makes hidden engineering work visible and credible.
- Risk: can feel self-referential if the copy is too technical or too long.

### 2. Curated Archive Lanes

- User value: readers can enter the writing archive by intent instead of only by date.
- Fit: the current archive is functional but still mostly chronological.
- Technical plan: add homepage lanes such as Technical Notes, Study/Career, Life Notes, ACGN, and XHS Imports using existing post metadata or manual curated links.
- Estimated cost: medium.
- Showcase effect: turns the archive into a clearer content product.
- Risk: manual curation can go stale; inconsistent tags may weaken automation.

### 3. Contact Intent Panel

- User value: visitors know what kind of outreach is welcome before leaving a message.
- Fit: contact currently depends mostly on the guestbook and external account links.
- Technical plan: add 3-4 compact cards above the guestbook: technical feedback, writing feedback, recruiting/interview, project discussion.
- Estimated cost: low.
- Showcase effect: improves conversion and makes the site feel more approachable.
- Risk: wording must avoid implying guaranteed availability or response time.

### 4. Account Identity Map

- User value: visitors understand what each external account represents.
- Fit: the sidebar already has Bilibili, XHS, GitHub, Steam, Bangumi, and LeetCode, but they read as a raw link list.
- Technical plan: group links by purpose: Code, Writing, Video, Notes, ACGN, Practice.
- Estimated cost: low.
- Showcase effect: makes the personal identity more coherent without adding new systems.
- Risk: low standalone impact if not paired with stronger homepage hierarchy.

### 5. Homepage Review Minimap

- User value: recruiters, technical reviewers, and readers can jump through the homepage without scrolling blindly.
- Fit: the page now has several meaningful sections: About, Proof Map, Projects, Archive, Contact.
- Technical plan: add a compact in-page navigation strip near the top or sidebar with active section styling if JS is acceptable, or static anchors if not.
- Estimated cost: medium.
- Showcase effect: makes the homepage feel intentionally designed as a review path.
- Risk: sticky or active-state behavior can clutter mobile if not restrained.

### 6. Evidence Freshness Markers

- User value: visitors know which sections are current and maintained.
- Fit: the site is actively updated through posts, docs, and generated manifests.
- Technical plan: add small "Updated" or "Last checked" labels to proof, archive, and site-system sections.
- Estimated cost: low.
- Showcase effect: signals care, maintenance, and trust.
- Risk: stale freshness labels damage trust more than having no labels.

### 7. Visual Archive Preview Strip

- User value: the homepage feels more human and scannable, especially for XHS-imported writing.
- Fit: local XHS image assets already exist under `assets/xhs/`.
- Technical plan: add a responsive image rail with local thumbnails, fixed aspect ratios, lazy loading, and links to related posts.
- Estimated cost: medium.
- Showcase effect: balances the text-heavy proof sections with lived personal material.
- Risk: image cropping and performance need care; too many images could dilute the proof-first structure.

### 8. Search Match Reasons

- User value: search results feel more transparent because visitors can see whether a match came from title, tag, date, or excerpt.
- Fit: local post search already exists.
- Technical plan: extend current search rendering in `script.js` with small reason badges.
- Estimated cost: medium.
- Showcase effect: adds product polish to an existing interaction.
- Risk: touches shared JavaScript, so regression risk is higher than static HTML/CSS additions.

### 9. Reading Route Cards

- User value: different visitors get clearer next steps after the hero.
- Fit: "Start here" already exists, but routes could become more outcome-oriented.
- Technical plan: refine route cards around tasks: "Judge fit quickly," "Inspect how the site works," "Read recent writing," "Leave feedback."
- Estimated cost: low.
- Showcase effect: improves first-visit comprehension with minimal complexity.
- Risk: overlaps with existing Start Here content unless the copy is sharpened.

## Recommended Top 3

1. Site Pipeline Lens
2. Curated Archive Lanes
3. Contact Intent Panel
