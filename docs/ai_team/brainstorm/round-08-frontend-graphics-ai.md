# Round 08 Brainstorm — Frontend, UX, Graphics, and AI

## Evidence Baseline

The current post-Round-07 site is a dependency-free static GitHub Pages archive with five manifest-backed posts. On 390×844 the homepage is about 10,615px tall: search is now reachable near 200px, while Proof, Projects, Site Pipeline, First Reads, Archive, and Contact begin around 1,967px, 4,144px, 6,027px, 7,469px, 8,570px, and 9,950px. The mobile header is non-sticky and exists only at the document start. `script.js` toggles `.back-to-top.is-visible` after 240px, but `styles.css` sets `.back-to-top { display: none; }` below 767px. Post pages end with article content plus a generic footer Back to archive. The date-sorted manifest contains file, title, date, excerpt, search text, and tags. Continuation can remain local and transparent, but the five-post corpus and generic `小红书` source tag make claims of personalization or semantic relevance inappropriate.

No files were edited. The ideas below are not scored and no winner is selected.

## Senior Frontend Engineering

### SFE-1. Accessible Mobile Return-to-Top Restoration

- **Visitor value:** Gives a reader in Projects, Pipeline, First Reads, Archive, Contact, or a long article a one-action return path instead of thousands of pixels of reverse scrolling. Returning to the top restores access to the existing header routes without inventing another full navigation system.
- **Fit:** Most implementation already exists: anchor, visibility class, scroll threshold, and click handler. The defect is the mobile `display: none`, compounded by the 34×34px control being small for touch.
- **Implementation approach:** Re-enable the control below 767px; use at least a 44×44px hit target; position it with safe-area fallbacks; keep it visually restrained; ensure all homepage/post shells and templates provide a real `#top` target for no-JavaScript hash fallback. Make scripted smooth scrolling conditional on `prefers-reduced-motion`, because the existing explicit `window.scrollTo({behavior: "smooth"})` is not neutralized by CSS. Verify it does not cover text, gallery controls, guestbook actions, or the mobile keyboard area.
- **Estimated cost:** S.
- **Showcase effect:** Demonstrates progressive enhancement, safe-area support, touch sizing, reduced-motion handling, and reuse of an existing component.
- **Risk:** A fixed control can obscure content or collide with the guestbook and browser chrome. Updating only the homepage would leave long post pages inconsistent; updating generators/templates/current files widens the regression surface.

### SFE-2. Manifest-Backed Article End Navigator

- **Visitor value:** After finishing an article, a reader can open a genuinely adjacent or same-topic local post without returning to the long homepage.
- **Fit:** First Reads provides curated entry, but article pages remain dead ends except for the footer archive link. `fetchPosts()` already caches the same manifest requested by each post search card, so this can reuse the existing request/schema. Deterministic chronology is more honest than a recommendation engine.
- **Implementation approach:** On non-home `.article-content` pages, decode the current filename and match `post.file`. Render a semantic `Continue reading` nav after the article with Newer and Older posts from manifest order. Optionally add at most one topic continuation only for a shared meaningful tag; ignore source-only tags such as `小红书`, label the exact reason, and never call it personalized or AI-recommended. On missing manifest/current match, fetch failure, or JavaScript disabled, retain the static Back to archive route. Update editor/import templates and script cache queries consistently.
- **Estimated cost:** M.
- **Showcase effect:** Completes the content-product loop using one source of truth, transparent heuristics, Unicode-path handling, and failure-safe progressive enhancement.
- **Risk:** Unicode filenames, ambiguous previous/next language, generic tags, stale cache queries, and shared-script regressions across all posts require deterministic tests. The endcap must not merely duplicate the footer.

### SFE-3. Semantic Section Handoffs

- **Visitor value:** At the end of a deep homepage block, visitors can return to Top or switch to one or two logical destinations without waiting for Start Here to reappear.
- **Fit:** Major sections already have stable anchors. The problem is movement between strong sections, not missing content. Ordinary anchors preserve static behavior and avoid scrollspy state, a fixed dock, or a second fetch path.
- **Implementation approach:** Add a reusable semantic nav only at high-friction boundaries such as Proof, Projects, First Reads, and Archive. Limit each to Top plus no more than two contextual routes; do not repeat every header item. Use visible focus, scroll margins where needed, and no JavaScript.
- **Estimated cost:** S.
- **Showcase effect:** Shows semantic HTML, editorial sequencing, and resilient navigation with CSS/JavaScript unavailable.
- **Risk:** Repetition adds height and can feel promotional. Too many links duplicate Start Here and the header; too few may not materially improve route switching.

## User Experience Design

### UX-1. Compact Four-Stop Mobile Route Ribbon

- **Visitor value:** Keeps a restrained set of destinations available after a visitor jumps deep into the page, so Proof, Projects, Reading, and Contact can be switched without a long return journey.
- **Fit:** Start Here correctly segments intent, but guidance disappears after the first jump; the header is non-persistent. A narrow ribbon addresses continuity only if it stays smaller than the full header.
- **Implementation approach:** Place one semantic mobile-only nav in source order near the start of the article and make it sticky rather than fixed. Keep exactly four text destinations; let the separate Top control handle return. Use ordinary anchors, no scrollspy/current-section claim, no horizontal-scroll-only affordance, and a modest single row. Respect safe areas, add anchor scroll margins, and disable stickiness where wrapping would cover content.
- **Estimated cost:** M.
- **Showcase effect:** Demonstrates mobile information architecture and conservative sticky positioning.
- **Risk:** A sticky row consumes viewport height, can obscure anchor headings, collide with open search results, or duplicate navigation. Four labels may wrap at 320px.

### UX-2. Contextual “Where Next?” Endposts

- **Visitor value:** Reduces decision friction at natural completion points: Proof can offer Projects/Code Tour, Projects can offer Pipeline/Contact, First Reads can offer Archive, and Archive can offer Contact/Top.
- **Fit:** Visitors currently fall from one block into the next heading without an explicit choice. The site already uses concise route copy and pill/button styles.
- **Implementation approach:** Add compact, quiet section-end navigation with one primary and one alternate normal anchor. Use destination-value copy, keep it out of short sections, and avoid repeating the same pair. It remains a semantic landmark and works without JavaScript.
- **Estimated cost:** S.
- **Showcase effect:** Makes product sequencing visible without hiding evidence or adding persistent UI.
- **Risk:** It lengthens the document and can feel over-guided. It overlaps with a sticky ribbon; treat them as alternatives.

### UX-3. Honest Article Completion Panel

- **Visitor value:** Gives a finished reader three understandable choices: continue chronologically, continue a real topic, or return to the full archive.
- **Fit:** Current article endings provide only a remote footer archive link. First Reads categories and manifest tags provide a vocabulary for continuation, while the small archive argues for clarity over abundance.
- **Implementation approach:** Present no more than two post links plus Back to all posts. Use Newer/Older and, only when warranted, an exact topic label. Include title/date, not long excerpts. Do not show empty slots; collapse naturally. Place it after content/XHS tags and before the global footer.
- **Estimated cost:** M.
- **Showcase effect:** Shows disciplined content design and honest recommendation language instead of a generic carousel.
- **Risk:** Even three choices can be disproportionate with five posts. Chronology is not similarity, and `小红书` must not be shown as a meaningful relationship.

## WebGL / WebGPU

### WG-1. DOM-First Route Trace (Graphics Layer Only)

- **Visitor value:** A thin visual trace can make semantic route navigation easier to scan without changing behavior.
- **Fit:** The current glass/cyan system already uses hairlines, mono labels, and indexed pipeline markers. CSS or a tiny inline SVG can extend that language; a graphics API is unnecessary.
- **Implementation approach:** Keep real nav/anchors as the entire interaction. Add only aria-hidden CSS pseudo-elements or a static inline SVG motif. Do not animate or claim live reading progress; remove it in forced colors/reduced motion or tight space. Treat it only as presentation of a navigation candidate.
- **Estimated cost:** S.
- **Showcase effect:** Demonstrates judgment about the lightest rendering primitive and keeping graphics subordinate to semantics.
- **Risk:** A route trace can falsely imply current position or completion. Decorative polish alone is not enough round value.

### WG-2. WebGL Scroll Minimap — Skip

- **Visitor value claimed:** A page-scale minimap could show current depth and clickable destinations.
- **Fit problem:** Labeled anchors are clearer; canvas hit testing weakens semantics/keyboard behavior and conflicts with the quiet identity.
- **Implementation approach if attempted:** Canvas/WebGL, section geometry sync, observers, pointer hit testing, parallel accessible controls, reduced-motion and context-loss fallbacks.
- **Estimated cost:** L.
- **Showcase effect:** Superficial graphics demonstration disconnected from the site’s strongest evidence.
- **Risk:** Main-thread/GPU work, battery use, layout drift, inaccessible interaction, and high QA cost. Explicitly skipped.

### WG-3. WebGPU/3D Background or Pipeline Scene — Skip

- **Visitor value claimed:** Visual novelty around the pipeline or engine-learning direction.
- **Fit problem:** Would manufacture a showcase without project evidence, distract from proof/writing, and imply stronger capability than the site verifies.
- **Estimated cost:** L.
- **Risk:** New identity, heavier load, motion/accessibility regressions, and disproportionate maintenance. Explicitly skipped.

## AI Applications

### AI-1. Explainable Local Continuation (No Model)

- **Visitor value:** Helps readers find one sensible next post while making the basis visible rather than pretending the site knows their preferences.
- **Fit:** The manifest has the only trustworthy signals available: date and tags. With five posts, a model or embedding index adds no credible benefit.
- **Implementation approach:** Prefer a meaningful exact shared tag after filtering source-only tags; otherwise use chronological adjacency. Label the reason and cap results. Add deterministic checks for no self-links, existing files, correct older/newer ordering, and truthful tag labels. Keep computation local or precompute with the existing generator; no network inference.
- **Estimated cost:** M.
- **Showcase effect:** Demonstrates mature AI-product judgment: explainability, bounded heuristics, and knowing when not to use a model.
- **Risk:** Broad tags such as 生活/求职 remain coarse. Calling results related can overstate relevance; exact reason labels are essential.

### AI-2. Build-Time Embedding or Similarity Graph — Defer/Skip

- **Visitor value claimed:** With a much larger archive, a generated graph might connect posts without shared tags.
- **Fit problem:** Five posts do not justify embeddings, a new artifact, model/version documentation, or opaque thresholds. Search expansion was also explicitly deferred.
- **Estimated cost:** L now.
- **Risk:** Non-determinism, stale embeddings, opaque ranking, larger artifacts, dependency burden, and weak evidence. Not retained for Round 08.

### AI-3. Portfolio Chatbot / RAG Guide — Skip

- **Visitor value claimed:** Visitors could ask about projects, posts, or contact routes.
- **Fit problem:** The content is already structured into Start Here, Proof Map, Code Tour, Pipeline, First Reads, search, and filters. A chatbot duplicates routes, needs a service/key, and can produce unsupported claims.
- **Estimated cost:** L.
- **Risk:** Hallucination, recurring cost, account dependence, latency, privacy, accessibility, and maintenance. Explicitly skipped.

## Deduplicated Candidate Set From This Group

The list is unordered and contains no winner selection.

- Accessible mobile return-to-top restoration, including touch sizing, safe-area placement, real hash fallback, and reduced-motion-safe behavior.
- Semantic long-page wayfinding, with contextual section handoffs and a compact four-stop sticky ribbon treated as alternative implementations rather than an automatic bundle.
- Manifest-backed article continuation with chronological neighbors, at most one transparently labeled meaningful-tag route, and a static archive fallback.
