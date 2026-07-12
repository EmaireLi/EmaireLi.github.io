# Round 08 Brainstorm — Brand, Hiring, Indie Product, and Startup Product

## Evidence Baseline

- At 390×844 the homepage is ~10,615px tall: Proof ~1,967px, Projects ~4,144px, Pipeline ~6,027px, First Reads ~7,469px, Archive ~8,570px, Contact ~9,950px, and external accounts ~10,433px.
- The mobile header and Start Here routes remain at the document start; after a deep anchor jump, route-switching guidance disappears.
- `initBackToTop()` already reveals the existing control after `scrollY > 240`, but the `max-width: 767px` rule sets `.back-to-top { display: none; }`.
- Existing major-section anchors make ordinary-anchor improvements feasible without scrollspy.
- All five current posts end with only the global footer link “Back to archive”; there is no previous/next or topic continuation. `posts/posts.json`, `fetchPosts()`, and `normalizePostTags()` already provide a local source for conservative continuation.
- Contact currently has one generic sentence and one public guestbook action. External account pills name services but do not explain what visitors will find there.
- Ideas below do not revisit search, change external projects, require paid/private services, invent evidence, or introduce a new identity.

## Personal Brand

### Narrative Section Handoffs

- **Visitor value:** Someone who lands directly in Proof, Projects, Pipeline, First Reads, or Archive can choose a meaningful next route without reversing thousands of pixels or returning to the opening Start Here block.
- **Fit:** The site already presents a deliberate proof-first story, but that story is only routed at the top. Small handoffs can preserve the distinction between recruiter, technical-reviewer, and reader journeys deep in the page.
- **Implementation approach:** Add a restrained, non-sticky `nav` or closing row to only the major decision boundaries: Proof → Projects / Code Tour; Projects → Pipeline / Contact; First Reads → Archive / Contact; Archive → Contact / Top. Use existing anchors and concise contextual labels such as “Continue the review” or “Switch to reading.” No JavaScript or duplicated full menu.
- **Estimated cost:** S.
- **Showcase effect:** Demonstrates editorial information architecture and an understanding that a portfolio is a guided review experience, not just a stack of sections.
- **Risk:** Too many repeated rows would feel promotional and lengthen an already long page. Restrict the system to a few genuine handoff points and no more destinations than the existing header.

### Intent-Aware Contact and Account Guide

- **Visitor value:** Visitors can understand what kinds of conversations are welcome, that the guestbook is public, and which external profile contains code, writing/media, or interests before opening another site.
- **Fit:** The current Contact line is warm but generic, while the external account pills at ~10,433px expose only service names. The existing identity already spans engineering, personal writing, and ACGN; this feature explains that breadth without adding claims.
- **Implementation approach:** Within Contact, add three factual intent rows—recruiting/context, project or code discussion, and reading feedback—feeding the same guestbook compose action without automatic prefill. Explicitly label the guestbook as public. Add short descriptors to existing account links or group them under factual headings. Keep the same URLs and avoid promising response times or a private channel.
- **Estimated cost:** S–M.
- **Showcase effect:** Turns scattered outbound links into a coherent and honest personal-brand map while making the contact surface more purposeful.
- **Risk:** More explanation can make the bottom of the page heavier, and the absence of a private recruiting channel remains real. The copy must not imply that a public guestbook is appropriate for confidential outreach.

### Archive Closing Signature

- **Visitor value:** After finishing a post, a reader sees how the note belongs to Alex’s broader archive and can move to another local route instead of reaching a dead end.
- **Fit:** Personal essays and tool notes currently terminate abruptly before a generic footer. A neutral endcap can connect archive writing back to the proof-first site without rewriting or reframing the articles themselves.
- **Implementation approach:** Add a compact article endcap that identifies the item as part of the local archive, shows only manifest-backed date/tags, links to First Reads or the complete archive, and optionally exposes one transparently labeled continuation. Generate it from the manifest or use a shared placeholder enhanced by `script.js`; preserve the existing Back to archive footer as the no-JavaScript fallback.
- **Estimated cost:** M.
- **Showcase effect:** Shows that the brand system extends through the reading experience and that content metadata is used consistently.
- **Risk:** A resume-like endcap could intrude on intimate life writing. Tone should remain neutral, avoid capability claims, and keep the block visually quieter than the article.

## Hiring Management

### Recruiter Review Checkpoints

- **Visitor value:** A time-limited reviewer can finish Proof or Projects and immediately open the Code Tour, reach Contact, or return to Top rather than hunting through the remaining 6,000–8,000px.
- **Fit:** The opening promises a “60 秒判断方向和证据” route, but once the reviewer reaches Proof (~1,967px) or Projects (~4,144px), no nearby action completes that promise.
- **Implementation approach:** Reuse the Narrative Section Handoff pattern at the end of Proof and Projects with recruiter-specific labels: Inspect code, Continue to site engineering, Contact, and Back to top. Keep these as ordinary links and do not create new evidence or metrics.
- **Estimated cost:** S.
- **Showcase effect:** Signals respect for reviewer time and deliberate prioritization of verifiable evidence.
- **Risk:** Repeating calls to action can look like conversion optimization rather than a personal archive. Keep copy factual and sparse.

### Mobile Section Compass

- **Visitor value:** On a 390px viewport, visitors can switch among a small set of high-value destinations and return to Top after the original header has scrolled away.
- **Fit:** The measured page length and non-persistent header create a concrete orientation gap. Existing anchors already cover Proof, Projects, First Reads, Contact, and Top, so a compass need not invent route state.
- **Implementation approach:** Add one compact semantic `nav` that becomes sticky only on narrow screens after its natural position near Start Here. Limit it to four principal destinations plus Top, no more than the current five header links. Use ordinary anchors, visible keyboard focus, horizontal containment or carefully abbreviated labels, `scroll-margin-top` for targets, and no scrollspy. Avoid a bottom dock so it cannot collide with the guestbook keyboard.
- **Estimated cost:** M.
- **Showcase effect:** Demonstrates accessible responsive navigation, touch-target discipline, and careful constraint handling on a very long mobile page.
- **Risk:** A sticky strip consumes scarce viewport height, can duplicate the header, and can cover anchor targets if offsets are wrong. It needs 320/390px, 200% zoom, keyboard, and reduced-motion QA.

### Transparent Contact Expectations

- **Visitor value:** Hiring reviewers can tell what the public guestbook can and cannot be used for before investing time composing a message, and can jump to existing code-profile destinations when that is the more useful next action.
- **Fit:** Contact is currently generic, and no private recruiting endpoint exists in the repository. Honest expectation setting is more credible than implying a private inbox.
- **Implementation approach:** Add a short privacy/visibility note, name appropriate public-message use cases, and offer existing GitHub/profile links as alternate evidence routes. Keep one guestbook action; do not invent email, LinkedIn, availability, response-time, or hiring claims.
- **Estimated cost:** S.
- **Showcase effect:** Strengthens engineering and product credibility through transparent constraints and clear error prevention.
- **Risk:** It surfaces the real limitation that confidential recruiting outreach has no local channel. The copy should clarify rather than apologize or overcompensate.

## Independent Product Building

### Manifest-Driven Continue Reading

- **Visitor value:** A reader finishing any article can move to a chronological neighbor or a genuinely related post, with the reason for each link visible.
- **Fit:** The five-post archive is small but already has useful overlap: two 求职 posts, several 生活 posts, and manifest-backed dates/tags. `script.js` already caches the manifest and normalizes tags, while current article pages all load the shared script and end only with Back to archive.
- **Implementation approach:** On article pages, decode the current filename, locate it in `posts/posts.json`, and render a compact endcap. Offer chronological previous/next and at most one shared-tag alternative labeled with the exact shared tag; never call the result “recommended” or imply ranking. If the current item is absent, the manifest fails, or no same-tag item exists, retain a simple complete-archive link. Update the editor HTML renderer, XHS importer, new-post template, and existing post script/style version references so future and existing articles follow the same contract.
- **Estimated cost:** M.
- **Showcase effect:** Demonstrates progressive enhancement, reuse of one content model across archive/search/reading, deterministic recommendation logic, and maintenance of multiple publishing paths.
- **Risk:** Sparse content can make the same-tag choice repetitive; URL encoding and current-path matching need deterministic tests. A fetch failure must not erase navigation, and DOM insertion must not duplicate an endcap.

### Addressable Topic Return Routes

- **Visitor value:** A post’s tag can return the reader to the exact matching archive view rather than dropping them into the unfiltered archive around ~8,570px.
- **Fit:** Archive tag buttons already filter manifest-backed content, but the selected tag is transient and cannot be linked from an article endcap or shared URL.
- **Implementation approach:** Support a small URL contract such as `index.html?tag=%E7%94%9F%E6%B4%BB#blog`; initialize the existing archive filter from a validated manifest tag and update the URL when a tag is selected. Render endcap tag links to that route. Unknown tags fall back to 全部; without JavaScript the page still reaches the complete archive.
- **Estimated cost:** M.
- **Showcase effect:** Shows product-minded URL/state design, progressive fallback, and a reusable bridge between article metadata and archive discovery.
- **Risk:** Query/hash ordering, browser history, encoded Chinese tags, focus placement, and re-render behavior add state complexity. With only five posts, this must remain a narrow route enhancement rather than a larger discovery system.

### Mobile Back-to-Top Restoration

- **Visitor value:** A mobile visitor anywhere below the opening can escape a 10,615px reverse scroll with one predictable action.
- **Fit:** The behavior is already implemented and activated at 240px; only the mobile CSS suppresses it. This directly addresses measured evidence without creating a second navigation system.
- **Implementation approach:** Remove the narrow-screen `display: none`, size the control to at least a 44px touch target, position it with `env(safe-area-inset-bottom)`, maintain visible focus, and keep the existing reduced-motion behavior. Verify it stays clear of the guestbook submit area and on-screen keyboard; if needed, suppress it while a form field has focus rather than adding a dock.
- **Estimated cost:** S.
- **Showcase effect:** Demonstrates evidence-driven usability repair, touch accessibility, and reuse of stable existing behavior.
- **Risk:** Any fixed control can obscure content or overlap guestbook interactions. This solves return-to-top only, not cross-section switching.

## Startup Product Management

### Compact Mobile Task Switcher

- **Visitor value:** The homepage supports the four already-stated visitor intents throughout the journey instead of only at acquisition/top-of-page time.
- **Fit:** Search access was repaired in Round 07, so the adjacent funnel problem is route persistence after visitors commit to a deep section—not more search work.
- **Implementation approach:** Use the bounded Mobile Section Compass contract: a small set of existing destinations, ordinary anchors, no active-section tracking, no analytics, and no new content system. Validate that it remains materially smaller than the header and Start Here cards it supplements.
- **Estimated cost:** M.
- **Showcase effect:** Shows disciplined prioritization of a measured navigation bottleneck and an MVP that avoids unnecessary JavaScript state.
- **Risk:** If it duplicates too much of the header it adds interface inventory without improving decisions. The acceptance test must be route switching from deep sections, not merely visual presence.

### Decision-Moment Contact Handoff

- **Visitor value:** Visitors can act when interest is highest—after reviewing project evidence or finishing a reading path—without remembering that Contact is another 2,500–5,800px below.
- **Fit:** Contact is directly reachable from Start Here but difficult from deep contexts, and its current generic copy does not distinguish recruiting, project/code, and reading feedback.
- **Implementation approach:** Add no more than two contextual in-page contact links at strong decision moments (after Projects and First Reads), then make the existing Contact section intent-aware and explicit about public messages. All routes converge on the one current compose action; no prefill, saved drafts, additional endpoint, or duplicated form.
- **Estimated cost:** S–M.
- **Showcase effect:** Demonstrates funnel continuity and scope control while preserving the archive’s non-commercial tone.
- **Risk:** Too many contact prompts would feel sales-oriented, and a public guestbook is unsuitable for confidential details. Limit placements and state that constraint clearly.

### Conservative Reading Loop

- **Visitor value:** Article readers get a clear next action, which makes First Reads an entry into an actual reading journey rather than a one-page dead end.
- **Fit:** The archive has only five posts, so transparent deterministic continuity is credible while algorithmic recommendations would be overstated.
- **Implementation approach:** Apply the Manifest-Driven Continue Reading contract with chronological adjacency and exact shared-tag labels, capped to a very small number of links and with archive fallback. Do not add scoring, personalization, analytics, or an AI service.
- **Estimated cost:** M.
- **Showcase effect:** Shows lifecycle thinking across acquisition, consumption, and continuation within a static product.
- **Risk:** Low inventory means some paths repeat, and a long post may make an endcap hard to discover unless its hierarchy is clear but restrained.

## Deduplicated Candidate Set From This Group

The list is unordered and contains no winner selection.

- Narrative Section Handoffs / Recruiter Review Checkpoints.
- Mobile Section Compass / Compact Mobile Task Switcher.
- Mobile Back-to-Top Restoration.
- Manifest-Driven Continue Reading / Conservative Reading Loop.
- Addressable Topic Return Routes.
- Intent-Aware Contact / Decision-Moment Contact Handoff.
- External Account Destination Guide.
- Archive Closing Signature.
