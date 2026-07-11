# Round 07 Brainstorm — Frontend, UX, Graphics, and AI

## Current Implementation Grounding

- At `max-width: 991px`, the homepage orders the header first, the entire article second, sidebar third, search fourth, and accounts fifth. This explains the measured mobile search position around 10,220px.
- The mobile header exposes About, Proof, Projects, Archives, and Editor, but neither Search nor Contact.
- At `max-width: 767px`, the existing back-to-top control is hidden, leaving fewer escape routes on the 10,000px+ page.
- Search already has the right data foundation:
  - one canonical `[data-site-search]` root;
  - one input and result container;
  - `fetchPosts()` backed by a shared `Map` cache;
  - `searchText` containing title, date, tags, and article text;
  - shared excerpt and highlighting helpers.
- `initSiteSearch()` currently owns query state inside one closure. New launchers, query chips, or alternate presentations should call a shared controller rather than implement a second filter/render path.
- The existing search status is visible text but is not currently an `aria-live` status.
- Existing section IDs already cover About, Proof, Projects, Site Pipeline, First Reads, Archive, and Contact. Long-page navigation can therefore remain semantic and dependency-free.

## Senior Frontend Engineering

### FE-1. Canonical Responsive Search Disclosure

- **Visitor value:** Search becomes reachable directly from the mobile header without requiring a 10,220px traversal, while desktop visitors retain the existing sidebar search.
- **Fit:** The site already has a complete search surface and shared manifest cache. The missing capability is access, not another search engine.
- **Implementation approach:**
  - Keep exactly one `[data-site-search]`, one input, one status node, and one result list.
  - Move the canonical search section earlier in the homepage DOM so its mobile visual order and keyboard order agree; retain its current desktop grid coordinates through CSS.
  - Add a header anchor such as `href="#site-search"` with `aria-controls` and an enhanced `aria-expanded` state.
  - On mobile, render the search as an inline disclosure immediately below the header. It remains collapsed until requested, preserving the identity hero as the default first view.
  - A no-JavaScript fallback can use the hash target to reveal or reach the canonical section.
  - With JavaScript, opening focuses the existing input; Escape closes the disclosure and returns focus to the launcher. Because it is inline rather than modal, it needs no focus trap, background inerting, or body-scroll lock.
  - Give the status node `role="status"` and `aria-live="polite"`.
- **Estimated cost:** M.
- **Showcase effect:** Demonstrates progressive enhancement, responsive DOM-order discipline, accessible focus handling, and reuse of an existing frontend subsystem.
- **Risk:** Hash cleanup, viewport-resize state, and desktop/mobile tab order require careful QA. A permanently expanded search card would weaken the opening hierarchy, so the mobile disclosure should stay compact until activated.

### FE-2. Semantic Long-Page Review Ribbon

- **Visitor value:** Visitors can move among Proof, Projects, Site Pipeline, First Reads, Archive, Contact, Search, and Top without repeatedly traversing the full page.
- **Fit:** All major destinations already have stable IDs, and the mobile back-to-top control is currently disabled.
- **Implementation approach:**
  - Add one semantic `<nav aria-label="On this page">` containing ordinary anchors.
  - Present it as a compact sticky ribbon on narrow screens and optionally as a quiet sidebar index on desktop.
  - Keep the initial version HTML/CSS-only; an active-section scrollspy is not necessary for the navigation to be useful.
  - Use minimum 44px touch targets, explicit `:focus-visible` styling, and `scroll-margin-top` on destinations so a sticky ribbon does not cover headings.
  - Prefer wrapping or a carefully tested horizontal scroller over a fixed bottom dock that obscures content.
- **Estimated cost:** S–M.
- **Showcase effect:** Shows mature information architecture and accessibility work on a genuinely long document.
- **Risk:** It can duplicate the existing header navigation or occupy too much mobile viewport height. Labels must remain few and task-oriented.

### FE-3. Search Surface Controller and Keyboard Contract

- **Visitor value:** Search behaves consistently whether activated from the header, topic prompts, empty-state recovery, or the existing input.
- **Fit:** `initSiteSearch()` currently binds filtering and rendering directly to one input event. Adding independent handlers would invite duplicate search logic and inconsistent status text.
- **Implementation approach:**
  - Extract a small controller around the existing root with methods such as `run(query)`, `setQuery(query, options)`, `clear()`, and `focus()`.
  - Keep `fetchPosts()`, `renderSearchResults()`, excerpt generation, and highlighting as the only data/render path.
  - The existing input listener, header launcher, query chips, and clear control all call this controller.
  - Scope Escape behavior to the active search surface; do not hijack browser Find or add an undiscoverable global keyboard shortcut.
  - Add deterministic checks for title, tag, body-text, empty-query, no-match, and manifest-failure states.
- **Estimated cost:** M.
- **Showcase effect:** Makes the search code easier to extend and demonstrates disciplined state ownership in plain JavaScript.
- **Risk:** This is enabling infrastructure rather than a strong standalone visual feature. It should remain narrowly scoped and accompany a visitor-facing search improvement.

## User Experience Design

### UX-1. Header-Level “Search / 搜索” Entry

- **Visitor value:** A visitor who already knows what they want can search immediately instead of interpreting every homepage section first.
- **Fit:** Search is a high-value utility but currently appears after almost all mobile content. The header already establishes the site’s primary routes.
- **Implementation approach:**
  - Add a clearly named search entry to the existing header navigation.
  - Open the single canonical inline search disclosure rather than navigating to or cloning another search page.
  - Focus the input after activation, announce index readiness or failure, and return focus to the launcher when closed.
  - Preserve a working anchor fallback when JavaScript is unavailable.
- **Estimated cost:** S–M.
- **Showcase effect:** Makes the mobile information hierarchy feel deliberate rather than inherited from desktop layout.
- **Risk:** A sixth navigation item may wrap awkwardly at 390px. Navigation copy and spacing need visual QA, and Editor should not be accidentally removed as a stable feature.

### UX-2. Mobile Review Path Navigator

- **Visitor value:** Recruiters, technical reviewers, and readers can switch routes after entering a deep section instead of using only linear scrolling.
- **Fit:** Start Here provides good initial routing, but it stops helping once the visitor has moved several thousand pixels down the page.
- **Implementation approach:**
  - Provide a persistent but restrained section navigator with labels such as Proof, Projects, Read, Archive, Contact, and Search.
  - Include Top because the current mobile back-to-top control is hidden.
  - Keep every destination an ordinary anchor and preserve the browser’s back/forward behavior.
  - If active-section indication is later added, expose it with `aria-current="location"` and use a single `IntersectionObserver`.
- **Estimated cost:** M.
- **Showcase effect:** Converts the long homepage into a reviewable information space without hiding existing evidence.
- **Risk:** A fixed app-style bottom dock would obstruct content and feel out of character. A sticky inline ribbon is the safer presentation.

### UX-3. Guided Search Recovery

- **Visitor value:** Visitors who do not know the site’s vocabulary receive useful starting points, and a failed query does not become a dead end.
- **Fit:** The manifest already exposes tags such as 求职, 技术, 工具, 生活, and ACGN. Current no-match behavior only says that nothing matched.
- **Implementation approach:**
  - Show a small set of topic buttons derived from actual manifest tags or a tightly curated subset.
  - Clicking a topic writes into the existing input through the shared search controller and renders through the current result path.
  - For no matches, offer Clear and related topic options rather than a second result renderer.
  - Keep every chip a real `type="button"` with visible focus treatment.
- **Estimated cost:** S–M.
- **Showcase effect:** Makes the local archive feel intentionally searchable without pretending to provide personalization.
- **Risk:** Too many prompts become decorative clutter. Suggestions must be sourced from real content and kept to roughly four or five.

### UX Idea To Skip: Collapsible Proof Sections

- **Visitor value claimed:** Shorter mobile page.
- **Fit problem:** The site is explicitly proof-first; hiding Proof Map, project receipts, pipeline evidence, or reading paths would reduce discoverability.
- **Implementation approach if attempted:** Native disclosures around secondary content.
- **Estimated cost:** M.
- **Showcase effect:** Limited; it mostly conceals accumulated content.
- **Risk:** Anchor destinations, search-engine visibility, keyboard state, and recruiter scanning all regress. This treats page length rather than navigation as the problem.
- **Disposition:** Skip.

## WebGL / WebGPU Perspective

### GFX-1. Semantic Document Minimap Without WebGL

- **Visitor value:** A compact visual representation of page depth helps visitors understand where Proof, Projects, Reading, Archive, and Contact sit in the overall journey.
- **Fit:** The homepage is now long enough to benefit from a route map, but its section structure is simple and stable.
- **Implementation approach:**
  - Use a semantic anchor list styled as a vertical track on desktop and compact ribbon on mobile.
  - CSS lines, dots, and labels can communicate depth; SVG may be used only as decorative enhancement with hidden semantics.
  - If current-section highlighting is added, use one `IntersectionObserver` and update `aria-current`; do not animate continuous scroll position.
  - Respect reduced motion and retain complete functionality with CSS disabled.
- **Estimated cost:** M.
- **Showcase effect:** Demonstrates information-visualization judgment and restraint rather than raw GPU novelty.
- **Risk:** It may duplicate the normal navigation and can become visually busy. This should deduplicate with the long-page navigator, not ship as a second navigation system.

### GFX-2. Archive Constellation or Topic Terrain

- **Visitor value claimed:** Visual exploration of posts by tag and date.
- **Fit problem:** The current archive is small and already has tags, chronology, First Reads, and lexical search. A spatial plot would not reveal enough structure.
- **Implementation approach if attempted:** Canvas/WebGL nodes generated from `posts.json`, with DOM fallback.
- **Estimated cost:** L.
- **Showcase effect:** Visually conspicuous but weakly connected to a real visitor task.
- **Risk:** GPU/battery cost, keyboard equivalence, screen-reader duplication, sparse data, mobile legibility, and maintenance all outweigh the benefit.
- **Disposition:** Skip for the current content volume.

### GFX-3. Ambient Shader, Particle Hero, or Scroll-Reactive Background

- **Visitor value claimed:** A more memorable visual identity.
- **Fit problem:** The site already has a coherent glass/grid language, and the current round’s measurable problem is utility reachability.
- **Implementation approach if attempted:** Progressive WebGL canvas behind the hero with a static fallback.
- **Estimated cost:** M–L.
- **Showcase effect:** Demonstrates graphics technique but distracts from verified project and writing evidence.
- **Risk:** Mobile performance, reduced-motion handling, contrast, battery use, and visual competition with dense content.
- **Disposition:** Skip.

## AI Applications Perspective

### AI-1. Deterministic Search Intent Seeds

- **Visitor value:** Visitors can ask simple archive-level questions such as “show career notes,” “show technical writing,” or “show ACGN essays” without learning exact tags first.
- **Fit:** `posts.json` already contains tags and full `searchText`; no model or remote service is required.
- **Implementation approach:**
  - Present a few human-authored intent labels backed by real query strings or manifest tags.
  - Route every seed through the canonical search controller.
  - Keep labels honest: call them topics or starting points, not personalized recommendations.
  - Optionally derive availability from the loaded manifest so a seed is hidden if no content supports it.
- **Estimated cost:** S–M.
- **Showcase effect:** Shows AI-product judgment by choosing transparent deterministic retrieval where a model would add little value.
- **Risk:** Weak or overly broad seeds can feel ornamental and may duplicate First Reads or archive filters.

### AI-2. Explainable Search Match Reasons

- **Visitor value:** Each result can say whether it matched the title, tag, date, excerpt, or article content, making local search easier to trust.
- **Fit:** Structured title, date, tags, and excerpt fields already exist, while `searchText` provides the content fallback. This was previously deferred and remains technically compatible with the static architecture.
- **Implementation approach:**
  - Extract a pure matching helper that normalizes fields once and returns `{post, reasons, excerpt}`.
  - Use a clear precedence such as title → tag → excerpt → date → content.
  - Render one or two compact reason labels and a contextual excerpt through the existing result renderer.
  - Calculate total matches before applying the eight-result display limit so the status can distinguish total from displayed results.
  - Keep `fetchPosts()` and the canonical controller unchanged as the data source.
- **Estimated cost:** M.
- **Showcase effect:** Demonstrates explainable information retrieval and careful product communication without claiming semantic AI.
- **Risk:** `searchText` repeats title and tags, so field classification must avoid false “content” reasons. Shared search regression risk is higher than a pure accessibility change.

### AI-3. Personal-Site Chatbot, RAG Concierge, or Embedding Search

- **Visitor value claimed:** Natural-language answers about Alex’s projects and writing.
- **Fit problem:** The corpus is small, the site is static, and verified evidence is already directly linked. A conversational layer would obscure rather than clarify sources.
- **Implementation approach if attempted:** External model API or precomputed embeddings plus a client retrieval layer.
- **Estimated cost:** L.
- **Showcase effect:** Superficially AI-forward, but likely to look bolted on.
- **Risk:** API keys, cost, privacy, hallucinated claims, larger payloads, inaccessible conversation state, and ongoing content-index maintenance.
- **Disposition:** Skip.

## Deduplicated Candidate Set From This Group

The list is intentionally unordered and contains no winner selection.

### C1. Canonical Mobile Search Disclosure

Combines FE-1 and UX-1.

- One existing search root, exposed from the header through a responsive inline disclosure.
- Includes progressive anchor fallback, input focus on open, Escape close, focus return, live status, and DOM/visual-order alignment.
- **Cost:** M.
- **Primary risk:** Mobile header density and responsive state handling.

### C2. Semantic Long-Page Review Navigator

Combines FE-2, UX-2, and GFX-1.

- One anchor-based navigator for Proof, Projects, Pipeline, Reading, Archive, Contact, Search, and Top.
- Can carry a restrained document-minimap visual treatment without WebGL.
- **Cost:** M.
- **Primary risk:** Navigation duplication and sticky viewport crowding.

### C3. Guided Local Search and Empty-State Recovery

Combines UX-3 and AI-1.

- Real topic seeds and no-result recovery routed through the canonical search controller.
- Uses existing tags and manifest content; no recommendation claims or model service.
- **Cost:** S–M.
- **Primary risk:** Prompt clutter or overlap with First Reads/archive filters.

### C4. Explainable Search Matches

From AI-2 and prior deferred search work.

- Structured match reasons, contextual snippets, accurate total/display counts, and live result status.
- Uses one pure matcher and the current renderer/cache.
- **Cost:** M.
- **Primary risk:** Shared search regression and inaccurate field attribution if `searchText` duplication is not handled.

## Cross-Cutting Implementation Requirement

FE-3 should be treated as a boundary for any selected search candidate rather than a separate homepage feature: no cloned search input, no second manifest fetch path, no duplicated filtering/rendering, and no global shortcut that conflicts with browser behavior.

## Explicitly Skipped Across Roles

- WebGL archive constellations, ambient shaders, particle backgrounds, and GPU decoration.
- LLM chatbot, RAG concierge, embeddings, or remote AI services.
- Collapsing major proof sections merely to shorten the page.
- A second mobile-only search component or duplicated result renderer.
- CSS visual reordering that leaves DOM and keyboard order inconsistent.
- A modal search implementation unless it fully provides Escape, close control, focus containment, and focus restoration; the inline disclosure avoids that complexity.
