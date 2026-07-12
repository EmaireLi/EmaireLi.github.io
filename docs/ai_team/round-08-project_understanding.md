# Round 08 Project Understanding

## Round Contract

- Latest user instruction still requests continuous autonomous rounds with no questions.
- Round 07 is committed and pushed; the working tree was clean at Round 08 discovery start.
- Select one new feature only. Do not bundle deferred search relevance/index work into the newly delivered search placement.
- Preserve the proof-first archive identity, stable editor/import/archive/search/guestbook behavior, and all existing evidence sections.

## Current Positioning And Audience

The site remains a proof-first personal archive for recruiters, technical reviewers, readers, and collaborators. It combines honest current-direction framing, project evidence, a code tour, a transparent static publishing pipeline, curated reading entry points, a generated archive/search system, and contact through a guestbook and external profiles.

## Newly Verified Current State

- Round 07 fixed homepage mobile search reachability with one canonical surface.
- At 390×844:
  - document height: ~10,615px;
  - search: top ~200px;
  - main article: top ~354px;
  - Proof Map: ~1,967px;
  - Projects: ~4,144px;
  - Site Pipeline: ~6,027px;
  - First Reads: ~7,469px;
  - Archive: ~8,570px;
  - Contact: ~9,950px;
  - site overview: ~10,256px;
  - external accounts: ~10,433px.
- The mobile back-to-top control is explicitly `display: none` below 767px.
- The mobile header remains at the document start and is not persistent. Start Here provides initial routes, but route guidance disappears after the visitor jumps into a deep section.
- There is no horizontal overflow and no current console error.

## Existing Strengths

- Mobile readers can now search before entering the long homepage.
- The opening explains identity, direction, and audience routes without unsupported metrics.
- Proof, project ownership, code-review routes, site pipeline, First Reads, archive tags, and local search are all inspectable.
- Static architecture remains dependency-free and resilient.
- Responsive cards collapse correctly and current anchors already cover major destinations.

## Current Weaknesses

### Long-Page Movement

- A visitor who enters Proof, Projects, Pipeline, First Reads, Archive, or Contact has no persistent or nearby way to switch paths.
- Returning to the top on mobile requires a long reverse scroll because the existing back-to-top control is hidden.
- Contact is still around 9,950px; it is directly anchorable from Start Here but difficult to reach from other deep contexts.

### Reading Continuity

- First Reads improves entry into the archive, but individual posts still end without conservative previous/next or same-tag continuation.
- The archive is small (5 posts), so any recommendation behavior must remain transparent and avoid overstating relevance.

### Contact And Identity

- Contact copy is warm but generic and does not distinguish recruiting, code/project, or reading feedback.
- External account pills still do not explain what each destination contains.

### Technical And Accessibility Constraints

- A fixed mobile dock could obscure content, collide with the guestbook or on-screen keyboard, and consume scarce viewport height.
- A sticky ribbon with too many destinations could duplicate the existing header and Start Here.
- Scrollspy or intent-mode state would add JavaScript for value that ordinary anchors may already provide.
- Any CSS change to the homepage requires advancing the stylesheet version query.

## Highest-Value Directions For Round 08

1. **Semantic long-page navigation / mobile return path:** provide a restrained ordinary-anchor way to move among a few high-value destinations and return to Top without hiding content.
2. **Article continue-reading navigation:** connect completed reading to adjacent or genuinely same-tag posts using the existing manifest with conservative fallbacks.
3. **Intent-aware contact bridge:** make the existing guestbook endpoint clearer without prefill or draft risk.
4. **Mobile back-to-top restoration:** a narrowly scoped alternative to a larger navigator, using the existing control and safe placement.

## Constraints And Explicit Skips

- Do not immediately extend search matching, topic prompts, or the searchable corpus; Round 07 only just repaired access.
- Do not add a second navigation system with more destinations than the existing header.
- Do not hide Proof, Projects, Pipeline, First Reads, or archive sections to reduce page length.
- Do not introduce WebGL decoration, LLM/RAG services, analytics, paid services, private-account access, or a new identity.
- Do not change external project repositories to manufacture evidence.
- Keep one selected feature and checks proportional to its real regression surface.
