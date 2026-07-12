# Round 4 Brainstorm - Agent 8: Startup Product Manager

Date: 2026-07-09

## Scope

This pass is limited to the personal website itself: visual design, homepage structure, lightweight interaction, and content presentation. It does not recommend digging into external GitHub projects or modifying external repos.

## Product Lens

The site already has useful raw material: a personal archive, proof map, project cards, search, account links, editor, guestbook, and AI-team docs. The conversion issue is not lack of content; it is that first-time visitors still have to assemble the story themselves. The next homepage improvements should make the site answer three questions faster:

- Who is Alex becoming professionally?
- What should I inspect first based on my intent?
- Why does this site feel more distinctive than a generic student blog?

## Feature Ideas

### 1. Positioning-First Homepage Hero

- **User value:** A recruiter, reviewer, or new reader understands the site's purpose in the first 5 seconds instead of seeing a generic blog welcome.
- **Why it fits current site:** The current homepage already contains stronger positioning in the Proof Map, but it appears after a broad welcome. Promoting that narrative would reuse existing content rather than adding a new system.
- **Plain HTML/CSS/JS implementation approach:** Replace the first welcome block with a static hero containing a concise role thesis, 2-3 proof bullets, and primary links to Proof, Projects, Archives, and Contact. Use existing glass surface styles and anchor links; no framework or build step.
- **Estimated development cost:** Low.
- **Display effect:** The page shifts from "personal blog archive" to "personal site with a clear professional narrative" while preserving the archive identity.
- **Risk:** If written too aggressively, it may feel over-positioned for a personal site. Copy should stay honest and student-stage appropriate.

### 2. Visitor Intent Router

- **User value:** Different visitors can choose a path immediately: recruiter, technical reviewer, reader, friend/collaborator.
- **Why it fits current site:** The homepage already has distinct destinations, but navigation labels are section-based. Intent-based routing would make the site easier to scan without adding new content.
- **Plain HTML/CSS/JS implementation approach:** Add a compact "Start here" strip near the top with four static route cards. Each card links to existing anchors or local pages and uses one sentence of expectation-setting copy.
- **Estimated development cost:** Low.
- **Display effect:** Creates a conversion-oriented decision point above the fold and reduces homepage wandering.
- **Risk:** Can duplicate the main nav if the labels are generic. Each route must explain the visitor outcome, not just restate the section name.

### 3. Proof Narrative Ladder

- **User value:** Visitors see a coherent progression from direction to capability to evidence to next action.
- **Why it fits current site:** The Proof Map, Projects, Archives, and Contact sections exist, but they currently read as adjacent blocks rather than a guided story.
- **Plain HTML/CSS/JS implementation approach:** Reorder and lightly rewrite homepage sections into a ladder: Direction, Proof, Project Evidence, Writing Archive, Contact. Add small section lead-ins and consistent "next step" links at the end of each block.
- **Estimated development cost:** Low to medium.
- **Display effect:** The homepage feels intentional and editorially guided without requiring complex interaction.
- **Risk:** Over-structuring could reduce the relaxed personal archive feel. Keep the copy short and leave room for personality.

### 4. Capability Filter Chips

- **User value:** Reviewers can quickly filter visible evidence by interest, such as frontend, full-stack, AI tooling, writing, or site tooling.
- **Why it fits current site:** The homepage already maps capabilities to proof. A lightweight filter would make that map interactive while staying compatible with static hosting.
- **Plain HTML/CSS/JS implementation approach:** Add data attributes to proof/project/archive preview items and use a small JavaScript controller to toggle visible cards. Include an "All" chip and preserve all content in the DOM for accessibility and no-JS fallback.
- **Estimated development cost:** Medium.
- **Display effect:** Makes the homepage feel productized and responsive to visitor intent.
- **Risk:** Adds state and maintenance overhead. If too many tags are introduced, the filter can become noisy.

### 5. Curated Archive Windows

- **User value:** Readers get a more meaningful preview of the writing archive than a raw recent-post list.
- **Why it fits current site:** The site has imported XHS posts and longer blog entries, but the homepage does not frame what the archive says about the author.
- **Plain HTML/CSS/JS implementation approach:** Add 2-3 static or manifest-driven archive groupings, such as "Technical notes," "Learning logs," and "Life fragments." Reuse the existing post manifest and render a few featured links per group.
- **Estimated development cost:** Medium.
- **Display effect:** The archive becomes part of the personal narrative instead of only a chronological feed.
- **Risk:** Manual curation can go stale. The first version should use simple labels and a small featured set.

### 6. Account Links as Identity Map

- **User value:** Visitors understand why each external profile is present and which one to use for a specific intent.
- **Why it fits current site:** The sidebar already lists Bilibili, XHS, GitHub, Steam, Bangumi, and LeetCode. They are useful but currently detached from the homepage story.
- **Plain HTML/CSS/JS implementation approach:** Keep the existing account links but add short category labels or tooltips: code, writing, video, ACGN, practice. Optionally mirror the most important links in the Contact section.
- **Estimated development cost:** Low.
- **Display effect:** The sidebar feels less like a link dump and more like a compact personal identity graph.
- **Risk:** Too much explanation can clutter the sidebar. Labels should be very short.

### 7. Lightweight Homepage Changelog

- **User value:** Repeat visitors and reviewers can see that the site is actively maintained and shipped in small increments.
- **Why it fits current site:** The repo already has planning docs, feature decisions, generated manifests, and recent homepage upgrades. A public-facing summary would turn maintenance into credibility.
- **Plain HTML/CSS/JS implementation approach:** Add a small "Recently shipped" section with 3-5 manually maintained entries, each linking to a local page or section. Keep it static to avoid needing git parsing or external APIs.
- **Estimated development cost:** Low.
- **Display effect:** Signals momentum and gives the site a living-product quality.
- **Risk:** Stale dates damage trust. Only include it if the owner is willing to update it during future site changes.

### 8. Contact Conversion Prompts

- **User value:** Visitors who want to reach out get clearer prompts and less blank-page friction.
- **Why it fits current site:** The guestbook already exists, but the Contact section gives minimal guidance. Small prompts can improve conversion without changing the backend.
- **Plain HTML/CSS/JS implementation approach:** Add static prompt chips above the guestbook form, such as "project question," "reading note," "collaboration," or "say hi." Clicking a chip can set the textarea placeholder or prepend a short template.
- **Estimated development cost:** Low to medium.
- **Display effect:** The Contact area becomes warmer and more action-oriented while preserving the informal guestbook feel.
- **Risk:** Prompt chips can feel gimmicky if they over-prescribe the message. They should guide, not automate the conversation.

### 9. Distinctive Static Visual Motif

- **User value:** The site becomes more memorable without adding heavy media or complex animation.
- **Why it fits current site:** The current glass/archive style is coherent but not yet strongly ownable. A repeated visual motif can differentiate the homepage while staying maintainable.
- **Plain HTML/CSS/JS implementation approach:** Define a small CSS-only motif system: timeline ticks, archive labels, thin proof connectors, or notebook-like section markers. Apply it consistently to hero, Proof, Projects, Archives, and Contact.
- **Estimated development cost:** Medium.
- **Display effect:** Creates a recognizable "personal archive as product surface" feeling, not a generic template.
- **Risk:** Decorative CSS can distract from content or age poorly. The motif should clarify hierarchy, not become ornamental noise.

## Recommendation

Prioritize the ideas that improve conversion and narrative clarity without increasing maintenance burden:

1. **Positioning-First Homepage Hero** - highest impact for first impressions and simplest to ship.
2. **Visitor Intent Router** - converts the existing page into clear visitor journeys.
3. **Proof Narrative Ladder** - makes current content work harder through structure and copy.
4. **Curated Archive Windows** - differentiates the site as both portfolio and personal archive.
5. **Distinctive Static Visual Motif** - adds memorability after the narrative structure is solid.

Defer **Capability Filter Chips** until the homepage has more evidence items to filter, and only add **Lightweight Homepage Changelog** if future updates can keep it fresh.
