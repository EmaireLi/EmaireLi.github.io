# Round 07 Brainstorm — Brand, Hiring, Indie Building, and Startup Product

## Scope Note

The worker read `AGENTS.md`, `README.md`, the current `index.html`, all of `styles.css` and `script.js`, Round 07 project understanding, and recent Round 04–06 decisions. No files were edited and no winner was selected. The current site already has a strong proof-first hero, Start Here routing, Proof Map, project receipts, Site Pipeline Lens, First Reads, generated archive/search, and guestbook. The defining Round 07 constraint is reachability: the rendered document is about 6,315px on desktop and 10,555px on mobile; on mobile contact begins around 9,795px, site overview around 10,043px, search around 10,220px, and account links around 10,373px. The existing mobile header has About / Proof / Projects / Archives / Editor, but not Search or Contact.

## Personal Brand

### PB-1. Mobile Archive Doorway

- **Visitor value:** A first-time reader can search Alex’s writing immediately instead of discovering the search input only after roughly 10,220px of mobile scrolling. It turns the archive from a background asset into an obvious part of the personal identity.
- **Fit for the current site:** Search already uses `posts/posts.json`, a shared fetch cache, highlighted excerpts, result counts, and local failure copy. The missing piece is placement and entry, not a new search engine.
- **Implementation approach:** Add a clearly labeled “Search writing” action to the mobile header/utility area and expose one compact search surface near the top. Prefer reusing the existing `.site-search-card` and its single input/results instance—either by restructuring the homepage DOM so CSS can place it after the header on mobile, or by an accessible launcher that moves/reveals the same component. Preserve a plain anchor fallback to `#site-search-input`; if a panel is used, implement initial focus, Escape close, and focus return.
- **Estimated cost:** M.
- **Showcase effect:** Signals that the writing archive is a first-class product surface, while demonstrating responsive information architecture and accessible interaction design.
- **Risk:** Duplicating the input would create conflicting IDs/listeners; moving the entire card too high could make the opening feel utility-first rather than identity-first. A dialog/drawer also adds focus-management regression risk to an already ~1,200-line shared script.

### PB-2. Current Scope Snapshot (“Can own / Learning / Looking for”)

- **Visitor value:** Clarifies what Alex can credibly contribute now, what is still a learning direction, and what conversations are welcome, without forcing visitors to reconcile the hero, Proof Map, and sidebar wording themselves.
- **Fit for the current site:** The hero says frontend/full-stack/AI tooling with engine-learning momentum, while the sidebar still says “JavaBoy 转行引擎开发中.” Both are honest, but their relationship is implicit. Existing project and site evidence can support a compact scope statement without inventing metrics.
- **Implementation approach:** Extend the existing identity panel or hiring snapshot with three factual rows: “Can own now” (frontend/full-stack workflows, static content tooling, AI-service integration), “Learning next” (engine development), and “Useful conversations” (project review, recruiting, technical/reading feedback). Link each claim to current case studies, Site Pipeline Lens, or contact. Add a visible “updated” date only if the README establishes a maintenance rule.
- **Estimated cost:** S.
- **Showcase effect:** Produces a more mature, honest brand: demonstrated capability is separated from aspiration instead of being flattened into a skill list.
- **Risk:** Copy can drift into resume language or become stale. It must remain compact because the opening already contains identity, actions, Start Here, and a direction panel.

### PB-3. Account Purpose Map

- **Visitor value:** Explains what a visitor will find before leaving the site—GitHub for code, XHS for short notes, Bilibili for media, Bangumi/Steam for interests, and LeetCode for practice.
- **Fit for the current site:** The six external accounts are currently colored platform pills with no purpose labels and appear after ~10,373px on mobile. They show breadth but do not yet tell a coherent identity story.
- **Implementation approach:** Replace the flat pill-only treatment with a compact, purpose-labeled map, ideally near the contact endpoint or in a small expandable “Elsewhere” block. Keep every URL unchanged, avoid third-party widgets, and retain the current plain-link behavior. On desktop it can remain in the left rail; on mobile it should be reachable from Contact or a header “Elsewhere” anchor rather than only after the whole document.
- **Estimated cost:** S.
- **Showcase effect:** Connects code, writing, media, and ACGN interests into one human profile without changing the site’s core identity.
- **Risk:** Pulling external platforms too far forward can weaken the local, inspectable archive as the primary proof. More descriptive labels also consume scarce mobile space.

## Hiring Management

### HM-1. 60-Second Review Dock

- **Visitor value:** A recruiter or interviewer can move among Proof, Projects, Code Tour, Search, and Contact from anywhere on the 10,555px mobile page, instead of repeatedly scrolling or returning to the top.
- **Fit for the current site:** Start Here already promises a recruiter route, and Proof Map already defines recommended review paths. The missing layer is persistent movement after the initial jump. The current mobile nav omits Search and Contact, and contact is around 9,795px.
- **Implementation approach:** Add a mobile-only, accessible review dock (bottom rail or compact sticky strip) with four carefully chosen destinations, e.g. Proof, Projects, Find, Contact; keep Code Tour as a contextual action inside Proof/Projects if five items are too dense. Use real anchors and labels, respect safe-area insets, add page bottom padding, and optionally use the existing IntersectionObserver pattern for current-section indication. The no-JS version must still work as anchor navigation.
- **Estimated cost:** M.
- **Showcase effect:** Demonstrates that the portfolio is designed for actual review behavior, not merely arranged as a sequence of sections.
- **Risk:** A fixed rail consumes viewport area on 390×844, may collide with keyboards or the guestbook, and can feel app-like on a personal archive. Too many actions would recreate the crowded header in a second location.

### HM-2. Intent-Aware Contact Brief

- **Visitor value:** A recruiter, project reviewer, or reader knows what kind of message is useful and can reach the right field with minimal hesitation.
- **Fit for the current site:** Contact is warm but generic—one sentence and a “留言” button—despite Start Here promising “项目问题、阅读反馈、合作讨论.” Because contact is ~9,795px down on mobile, clearer conversion copy matters once visitors arrive, and it should be paired with a direct route from the header/dock.
- **Implementation approach:** Add three compact intent cards within the current Contact section: Opportunity / role fit, Project or code question, Writing / learning exchange. Each card should state an honest prompt and use an anchor to expand/focus the existing guestbook form. Optional prefill should insert only a short editable prefix and respect the 100-character limit; static anchor behavior is the safer baseline. Keep the configured/unconfigured guestbook states intact.
- **Estimated cost:** S for static prompts; M with focus/prefill behavior.
- **Showcase effect:** Converts a passive footer-like endpoint into a purposeful, personable next step while preserving the guestbook.
- **Risk:** Prefill can interfere with validation, character counts, or a user’s existing draft. Recruiting wording can over-promise availability, and additional cards increase the already long mobile document.

### HM-3. Unified Evidence Finder

- **Visitor value:** Lets a reviewer search not only articles but also the two case studies, Code Tour, site pipeline, and decision/QA records for terms such as FastAPI, Electron, AI tooling, accessibility, or import workflow.
- **Fit for the current site:** The component is labeled site search, but current filtering is article-only (`posts/posts.json`) and does not surface project/case-study pages. Those pages are among the strongest recruiting evidence, so a reviewer’s likely query and the searchable corpus are misaligned.
- **Implementation approach:** Generate or maintain a small local `site-search.json` containing typed entries for posts, projects, code tour, and selected site evidence. Keep the post manifest untouched for archive rendering. Extend the current search renderer with type labels and one result schema, and link only to existing inspectable pages/anchors. Update the manifest-generation workflow or add a deterministic generator/check so entries do not silently stale.
- **Estimated cost:** L.
- **Showcase effect:** Turns search into a genuine proof-navigation system and demonstrates careful static indexing without adding a service or dependency.
- **Risk:** This broadens content maintenance and shared JavaScript. Automatically extracting useful page text is harder than indexing post metadata; a hand-maintained index can become stale. It should not be used to postpone the simpler mobile-reachability fix.

## Independent Product Building

### IB-1. Contextual Section Handoffs

- **Visitor value:** At the end of each large block, visitors get one or two clear next choices instead of encountering another heading or having to find navigation again—e.g. Proof → Projects / Code Tour, Projects → Site Pipeline / Contact, First Reads → Full archive, Archive → Contact.
- **Fit for the current site:** The homepage’s individual sections are strong, but their aggregate mobile stack is ~10,555px. Static handoffs reduce decision friction without hiding sections or adding a second mode.
- **Implementation approach:** Add a reusable `.journey-handoff` row to the end of only the highest-friction sections. Keep it to a primary next step and one alternate, both normal anchors. Use existing pill/button styling and concise copy (“Continue with the site pipeline” / “I have enough context—contact Alex”). No JavaScript is required.
- **Estimated cost:** S.
- **Showcase effect:** Shows product sequencing and editorial judgment rather than merely adding more cards.
- **Risk:** Repeated CTAs add some vertical height and can feel sales-oriented. Too many handoffs would duplicate Start Here and the proposed review dock.

### IB-2. Site Shipping Log

- **Visitor value:** Makes it easy to see that this site is actively improved through discrete releases, what each release changed for visitors, and where the underlying decision/QA evidence lives.
- **Fit for the current site:** Rounds 02–06 already delivered Project/Capability Evidence, Code Tour, Evidence Routing, Site Pipeline Lens, and First Reads, with decision and QA documents committed locally. The evidence exists but is scattered through `docs/ai_team/` and is mainly legible to repository reviewers.
- **Implementation approach:** Add a compact static “Site evolution” page, linked once from Site Pipeline Lens, with one row per shipped round: visible feature, visitor problem, proof link, and verification status. Keep raw agent documents secondary. Do not add the full log to the already long homepage; show only a single latest-shipment teaser if needed.
- **Estimated cost:** M.
- **Showcase effect:** Demonstrates sustained independent product practice—discovery, scoped delivery, QA, and iteration—using real repository history.
- **Risk:** It can feel self-referential or overemphasize the AI-team process over Alex’s own work. It also needs a lightweight update rule after each round.

### IB-3. Continue Reading on Article Pages

- **Visitor value:** After reading a post, a visitor can continue to one adjacent or related local article instead of returning to the homepage and searching again.
- **Fit for the current site:** First Reads improves entry into writing, but individual generated/imported posts still terminate at a generic archive return. The shared post manifest already contains file, date, excerpt, and tags.
- **Implementation approach:** On post pages, use the existing manifest cache to identify the current filename and render a small end-of-article block: previous/next chronologically plus up to two same-tag articles. If tags are insufficient, fall back to chronology rather than pretending relevance. Provide a static Back to archive link while data loads or fetch fails. Keep the editor-generated post shell compatible.
- **Estimated cost:** M.
- **Showcase effect:** Shows a complete content-product loop—curation gets readers in, related navigation keeps the archive connected.
- **Risk:** Shared `script.js` behavior affects many old posts; current filenames/encoding and sparse tags require careful testing. A weak relevance rule could reduce trust.

## Startup Product Management

### SPM-1. Visitor-Intent Route Mode (Guidance Without Hiding)

- **Visitor value:** Clicking Recruiter, Technical reviewer, Reader, or Contact in Start Here would activate a short route such as “Proof → Projects → Contact” and keep that route visible while the visitor moves through the long page.
- **Fit for the current site:** Start Here currently performs a single anchor jump even though each card’s copy implies a multi-step journey. Proof Map also contains recommended routes, but the guidance disappears once the user scrolls.
- **Implementation approach:** Keep all homepage content visible. On a route-card click, set a small in-page route state (URL query/hash or session-only JS) and reveal a dismissible compact route strip with 2–3 anchors. Highlight the active checkpoint with IntersectionObserver; use ordinary links as the fallback. Do not persist beyond the session and do not filter or collapse sections.
- **Estimated cost:** M.
- **Showcase effect:** Turns existing audience segmentation into an actual guided product flow and makes the long page easier to use without creating separate landing pages.
- **Risk:** It overlaps with a universal review dock and can introduce state/hash edge cases. Route-specific guidance may be more UI than the small content set needs.

### SPM-2. Two-Action Mobile Utility Rail

- **Visitor value:** Exposes the two missing high-intent actions—Find and Contact—without requiring visitors to traverse to ~10,220px or ~9,795px.
- **Fit for the current site:** The mobile header already covers core content sections but omits these utilities. A minimal rail is a deliberately smaller alternative to a full 60-second review dock.
- **Implementation approach:** Add a mobile-only compact sticky control with exactly “Search” and “Contact.” Search opens/reveals the existing search component; Contact is a normal `#contact` anchor. Show it after the hero or once the fixed header leaves view, and hide/settle it when the relevant target is in view. Respect reduced motion and safe-area padding, and ensure the rail does not cover form controls.
- **Estimated cost:** S–M.
- **Showcase effect:** Demonstrates ruthless prioritization around the two clearest conversion gaps rather than adding another full navigation system.
- **Risk:** Search still needs accessible focus behavior, and even a two-action fixed element consumes mobile viewport space. Implementing both this and a full review dock would be redundant.

### SPM-3. Transparent Search Match Reasons

- **Visitor value:** Users can tell why a result appeared—title, tag, excerpt/body, or date—making the local search easier to trust and scan.
- **Fit for the current site:** Results already show title, date, highlighted excerpts, and an eight-result cap, but the filter does not explicitly use/render normalized tags and provides no match reason. The current search code is centralized enough to extend once.
- **Implementation approach:** Normalize query matching by field, assign one concise reason label per result (`Title`, `Tag`, `Content`, `Date`), and order exact title/tag matches before body-only matches. Render existing tags only when relevant, keep the UI compact, and preserve the current local-only failure state. Treat this as an enhancement to the current renderer, not a new algorithm/service.
- **Estimated cost:** M.
- **Showcase effect:** Adds visible product judgment and technical polish to an already real feature.
- **Risk:** Match scoring can become over-engineered for a small archive, and badges can crowd the narrow sidebar. Improving match explanation does not solve the more basic mobile access problem by itself.

## Deduplicated Candidate Set From This Group

The order below is a neutral grouping, not a ranking or winner selection.

1. **Mobile Search / Archive Doorway** — PB-1 plus the Search half of SPM-2: make the existing single search surface reachable from the header or a minimal utility control, with accessible focus and a plain anchor fallback.
2. **Persistent Mobile Review Navigation** — HM-1 plus SPM-1: either a universal review dock or an intent-specific route strip; both address movement across Proof, Projects, Reading, Search, and Contact, but should not be implemented together without consolidation.
3. **Intent-Aware Contact Bridge** — HM-2 plus the Contact half of SPM-2: provide a direct mobile route to contact and concise prompts for recruiting, project questions, and reading/learning feedback.
4. **Current Capability / Aspiration Snapshot** — PB-2: clarify what Alex can own now, what is being learned, and what conversations fit, all backed by existing evidence.
5. **Purpose-Labeled Account Identity Map** — PB-3: explain the role of each existing external account and make “Elsewhere” reachable without a 10,373px traverse.
6. **Unified Evidence Finder** — HM-3: expand the searchable corpus from posts to typed local evidence such as case studies, Code Tour, and site-process records.
7. **Contextual Section Handoffs** — IB-1: place restrained next-step links at the end of major sections to reduce decision friction through the long page.
8. **Site Shipping Log** — IB-2: surface the real feature/decision/QA history on a compact separate page linked from Site Pipeline Lens.
9. **Article Continue-Reading Navigation** — IB-3: use manifest metadata to add chronological and tag-based continuation at the end of posts.
10. **Transparent Search Match Reasons** — SPM-3: expose title/tag/content/date match reasons and simple relevance ordering inside the existing result renderer.

## Cross-Cutting Guardrails

- Keep one real search input/results instance.
- Do not hide existing proof sections.
- Avoid implementing both a full review dock and a second fixed utility rail.
- Preserve non-JavaScript anchor fallbacks.
- Test focus entry/return, Escape, safe-area spacing, mobile keyboard overlap, reduced motion, and the guestbook’s configured/unconfigured states.
