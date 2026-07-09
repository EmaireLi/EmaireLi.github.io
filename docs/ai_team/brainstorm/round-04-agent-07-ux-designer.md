# Round 4 Brainstorm - Agent 7: UX Designer

Date: 2026-07-09

## Context

This round is limited to the personal website itself: visual design, homepage structure, interaction, and content presentation. The site is a static GitHub Pages personal archive that has grown into a portfolio-facing homepage with a sidebar, search, account links, Proof Map, project cards, archives, and guestbook.

The main UX issue is first-visit comprehension. The strongest proof exists, but a new visitor still has to assemble the story from multiple sections. The homepage should answer four questions faster:

- Who is Alex?
- What kind of work should I associate with this site?
- Where should I go first?
- What evidence can I verify without digging?

## Options Considered

1. **Homepage routing upgrade:** Improve the first viewport, navigation, and visitor paths while keeping all content static.
2. **Reading-system upgrade:** Make posts, archives, and long case-study pages easier to scan and continue reading.
3. **Accessibility and mobile polish pass:** Reduce friction on small screens, keyboard navigation, and long-form reading.

## Recommendation

Prioritize a homepage routing upgrade first, then add reading-system improvements. The homepage is the highest-leverage surface because every audience enters through it, and most proposed changes can be done with plain HTML/CSS and light JavaScript without changing the editor, import scripts, or GitHub Pages deployment model.

## Feature Ideas

### 1. First-Viewport Identity Panel

- **User value:** First-time visitors understand the site owner, direction, and strongest proof before scrolling.
- **Why it fits current site:** The homepage already has Proof Map and Projects, but the opening still reads like a generic blog welcome. A stronger first viewport would connect the existing archive identity with the newer portfolio purpose.
- **Plain HTML/CSS/JS implementation approach:** Replace the current welcome block with a static hero-style section inside the existing `post-body`. Use semantic headings, a short bilingual positioning line, two primary links to `#proof` and `#projects`, and one quiet secondary link to `#blog`. Style with existing glass, line, accent, and button tokens in `styles.css`; no new dependency.
- **Estimated development cost:** Low to medium.
- **Display effect:** The first screen becomes an intentional identity gateway instead of a blog template opening.
- **Risk:** Over-polishing could make the site feel less like a personal archive. Keep the copy specific, restrained, and evidence-linked.

### 2. Start Here Visitor Routes

- **User value:** Visitors can choose the right path quickly: recruiter, technical reviewer, reader, or collaborator.
- **Why it fits current site:** The Proof Map already contains suggested review routes, but they sit inside a larger proof section. A compact routing block near the top would make those paths visible earlier.
- **Plain HTML/CSS/JS implementation approach:** Add a static `Start here` section with 3-4 route cards linking to existing anchors and pages: `#proof`, `#projects`, `./projects/code-tour.html`, `#blog`, and `#contact`. Use list markup so the layout remains accessible without JavaScript.
- **Estimated development cost:** Low.
- **Display effect:** Clearer decision path after the first headline, especially for visitors who do not know whether to read posts or projects first.
- **Risk:** Route cards can duplicate existing navigation. Keep labels outcome-oriented rather than repeating `About / Proof / Projects / Archives`.

### 3. Mobile Section Jump Bar

- **User value:** Mobile visitors can move between About, Proof, Projects, Archives, and Contact without scrolling back to the top.
- **Why it fits current site:** The left column works well on desktop, but on mobile the homepage becomes a long stacked page and the main navigation loses persistence.
- **Plain HTML/CSS/JS implementation approach:** Add a mobile-only horizontal anchor nav, either below the header or sticky under the top edge. Use plain anchor links and CSS media queries. JavaScript is optional for active-section highlighting via `IntersectionObserver`.
- **Estimated development cost:** Low.
- **Display effect:** Faster mobile scanning and less vertical hunting.
- **Risk:** A sticky bar can consume valuable vertical space. Use compact labels, allow horizontal scrolling, and keep it mobile-only.

### 4. Proof-to-Project Bridge

- **User value:** Visitors understand how homepage proof claims map directly to project evidence.
- **Why it fits current site:** Proof Map and Projects are adjacent but separate. A bridge would make the transition feel like one narrative: claim, evidence, case study.
- **Plain HTML/CSS/JS implementation approach:** Add a short transition strip after Proof Map with three static links: capability, matching project, and evidence type. Keep it in HTML as a small `dl` or list. Style as a compact band, not a new card-heavy section.
- **Estimated development cost:** Low.
- **Display effect:** The homepage reads less like independent sections and more like a guided review.
- **Risk:** May repeat existing evidence rows. The bridge should summarize relationships, not add new claims.

### 5. Project Card Scan Upgrade

- **User value:** A visitor can compare projects in a few seconds by role, problem, outcome, and verification path.
- **Why it fits current site:** Project cards already include role, stack, proof bullets, and actions. They can be made easier to scan without changing project content.
- **Plain HTML/CSS/JS implementation approach:** Reorder each project card into consistent short rows: `Problem`, `Role`, `Evidence`, `Read next`. Use existing `dl` patterns and button styles. CSS can tighten spacing and improve mobile stacking.
- **Estimated development cost:** Low to medium.
- **Display effect:** Projects feel more like case-study previews and less like long text cards.
- **Risk:** Compressing too much could flatten project personality. Keep one human sentence per project.

### 6. Reading Flow Table of Contents

- **User value:** Long posts and case-study pages become easier to scan, resume, and navigate.
- **Why it fits current site:** The site has long-form posts and project pages, but reading orientation is basic. This improves the archive experience without changing content tooling.
- **Plain HTML/CSS/JS implementation approach:** Use JavaScript to scan `h2` and `h3` headings inside the main article, generate an `On this page` list, and highlight the active section with `IntersectionObserver`. On mobile, collapse the TOC into a small disclosure element. Leave pages readable if JavaScript fails.
- **Estimated development cost:** Medium.
- **Display effect:** More polished reading experience and better structure for dense case studies.
- **Risk:** Sticky or generated navigation can crowd small screens. Needs keyboard focus handling and reduced visual weight.

### 7. Archive Preview With Curated Lanes

- **User value:** Visitors understand what kind of writing exists before entering the full archive list.
- **Why it fits current site:** Archives currently show recent updates, but the homepage does not present the archive as a body of work. Curated lanes would make writing topics easier to grasp.
- **Plain HTML/CSS/JS implementation approach:** Add a static or manifest-driven preview above the archive list with lanes such as `Technical notes`, `Project logs`, `ACGN / life`, and `Imported XHS notes`. If driven by `posts.json`, keep the grouping in simple JavaScript with graceful fallback text.
- **Estimated development cost:** Medium.
- **Display effect:** The archive feels intentional and browsable instead of only chronological.
- **Risk:** Categories may be uneven if post metadata is inconsistent. Start with broad labels and avoid promising comprehensive taxonomy.

### 8. Search Result Reasons

- **User value:** Search feels more trustworthy because visitors can see why each result matched.
- **Why it fits current site:** Local search already exists in the sidebar, but result relevance is opaque. Small reason labels would improve comprehension without backend changes.
- **Plain HTML/CSS/JS implementation approach:** Extend existing search rendering in `script.js` to show labels such as `title`, `excerpt`, `tag`, or `body` based on matched fields from `posts.json`. Use existing result markup and highlight styles.
- **Estimated development cost:** Medium.
- **Display effect:** Search feels smarter and easier to evaluate at a glance.
- **Risk:** Matching remains simple substring search, especially for Chinese text. Do not present it as semantic search.

### 9. Contact Intent Prompts

- **User value:** Visitors have an easier starting point when leaving a guestbook message or deciding why to contact Alex.
- **Why it fits current site:** The guestbook exists, but the contact area gives little guidance beyond a friendly sentence.
- **Plain HTML/CSS/JS implementation approach:** Add 3-4 small prompt chips such as `project question`, `reading note`, `collaboration`, and `just saying hi`. Clicking a chip can update the textarea placeholder or prepend a short draft phrase. Keep form submission behavior unchanged.
- **Estimated development cost:** Low.
- **Display effect:** Contact feels more approachable and less blank.
- **Risk:** Prompt chips can feel gimmicky if too playful. Keep tone calm and optional.

### 10. Accessibility Comfort Pass

- **User value:** The site becomes easier to read and navigate for keyboard users, low-vision users, and mobile readers.
- **Why it fits current site:** The glass visual style is attractive but depends on careful contrast, focus states, spacing, and motion restraint.
- **Plain HTML/CSS/JS implementation approach:** Audit focus-visible states, contrast on glass surfaces, link target size, form labels, sticky elements, and reduced-motion behavior. Add CSS improvements and optional reading preferences through CSS variables only if they do not clutter the interface.
- **Estimated development cost:** Medium.
- **Display effect:** More reliable reading and interaction quality across devices.
- **Risk:** Accessibility work can become broad. Scope it to homepage, navigation, search, project cards, archive preview, and guestbook first.

## Suggested Build Order

1. First-Viewport Identity Panel
2. Start Here Visitor Routes
3. Mobile Section Jump Bar
4. Proof-to-Project Bridge
5. Project Card Scan Upgrade
6. Accessibility Comfort Pass

The remaining ideas are good follow-ups once the homepage route is clearer: Reading Flow Table of Contents, Archive Preview With Curated Lanes, Search Result Reasons, and Contact Intent Prompts.
