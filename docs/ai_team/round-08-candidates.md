# Round 08 Deduplicated Candidate Set

Both evaluator workers must score this same set. Cost scores reward lower delivery cost. The main agent will reconcile the results and select exactly one feature.

## C1. Accessible Mobile Back-to-Top Restoration

- **Visitor value:** Lets a mobile visitor escape a 10,615px page or a long article and recover access to the existing header routes with one action.
- **Fit:** The anchor, scroll threshold, visibility class, and click handler already exist; only the narrow-screen CSS hides the control. Current 34×34px sizing is below a strong touch target.
- **Implementation approach:** Re-enable the existing control below 767px, grow the hit target to at least 44×44px, position it with safe-area fallbacks, ensure all shells/templates expose a real `#top`, and make scripted smooth scrolling respect `prefers-reduced-motion`. Verify it clears gallery controls, guestbook actions, browser chrome, and focused form fields.
- **Estimated cost:** S.
- **Showcase effect:** Progressive enhancement, touch accessibility, safe-area handling, reduced-motion correctness, and disciplined reuse.
- **Key risk:** A fixed control can cover content or collide with forms. It solves return-to-top, not cross-section switching.

## C2. Contextual Section Handoffs

- **Visitor value:** At a natural completion point, visitors can choose one or two logical next routes or Top without reversing thousands of pixels.
- **Fit:** Proof, Projects, First Reads, and Archive are strong but currently flow straight into another heading. All destinations already have stable anchors.
- **Implementation approach:** Add visually quiet semantic `Where next?` nav rows only after a few major boundaries. Keep each to one primary and one alternate ordinary anchor, avoid repeating the full menu, use destination-value copy, and require no JavaScript.
- **Estimated cost:** S.
- **Showcase effect:** Editorial information architecture, semantic HTML, and resilient visitor sequencing.
- **Key risk:** Repeated rows add height and can feel promotional or over-guided; weak handoff choices may not materially improve navigation.

## C3. Compact Mobile Section Compass

- **Visitor value:** Keeps a bounded set of high-value destinations available after the initial header/Start Here has scrolled away, enabling deep route switching.
- **Fit:** The measured page length and non-persistent header create a real orientation gap. Existing anchors cover Proof, Projects, First Reads, Contact, and Top.
- **Implementation approach:** Add one semantic nav near the opening that becomes sticky on narrow screens. Limit it to four task routes and use the separate Top control for return. Use normal anchors, no scrollspy/current-section claim, 44px touch targets, anchor scroll margins, and disable stickiness where labels wrap or viewport height is too constrained.
- **Estimated cost:** M.
- **Showcase effect:** Responsive information architecture, sticky-layout restraint, and accessible touch/focus design.
- **Key risk:** Consumes viewport height, can duplicate the header/Start Here, obscure headings, collide with expanded search results, or wrap at 320px.

## C4. Manifest-Driven Continue Reading

- **Visitor value:** After finishing an article, a reader can continue to a chronological neighbor or one genuinely shared-topic post instead of returning to the homepage archive.
- **Fit:** First Reads creates entry paths, but all five posts end with only a generic footer archive link. The shared script, manifest cache, date order, filenames, and tags already provide a local source of truth.
- **Implementation approach:** On article pages, decode the current filename, match it to the manifest, and inject a compact `Continue reading` nav after `.article-content`. Show Newer/Older titles and dates, plus at most one exact shared meaningful tag after filtering source-only `小红书`; label the reason transparently and never call it personalized. Preserve the static Back to archive footer for missing data, fetch failure, and no JavaScript. Update editor/import/template generation contracts and cache versions consistently.
- **Estimated cost:** M.
- **Showcase effect:** Completes the content lifecycle through progressive enhancement, deterministic explainable retrieval, Unicode-path handling, and reuse of one content model.
- **Key risk:** Shared-script changes affect every post; encoded filenames, generic tags, duplication, edge posts, generator parity, and fetch fallback require strong deterministic/browser tests.

## C5. Addressable Topic Return Routes

- **Visitor value:** A post tag can link back to the archive already filtered to that topic instead of dropping the reader into the full list around 8,570px.
- **Fit:** Archive filter buttons and tags already work, but selected state is transient and cannot be shared or linked from a post.
- **Implementation approach:** Add a validated URL contract such as `?tag=生活#blog`, initialize the current archive filter only when the query matches a manifest tag, update the URL on selection, and let endcap tags link to that route. Unknown tags fall back to 全部; no JavaScript still reaches the full archive.
- **Estimated cost:** M.
- **Showcase effect:** Product-minded URL/state design and a reusable bridge between article metadata and archive navigation.
- **Key risk:** Query/hash ordering, encoded Chinese tags, browser history, focus, and rerender behavior add disproportionate state complexity for five posts.

## C6. Intent-Aware Contact Handoff

- **Visitor value:** Visitors can act after Projects or First Reads and understand which public messages are appropriate without assuming the guestbook is private.
- **Fit:** Contact begins around 9,950px, has one generic sentence, and offers no private endpoint. Existing Start Here copy already names project questions, reading feedback, and collaboration.
- **Implementation approach:** Add at most two contextual Contact links at real decision moments, then add concise factual intent/privacy guidance inside the existing Contact section. All routes converge on the one current compose action; no prefill, draft mutation, response-time promise, new endpoint, or invented email/LinkedIn.
- **Estimated cost:** S–M.
- **Showcase effect:** Honest product conversion, constraint communication, and coherent visitor handoff without turning the archive into a sales funnel.
- **Key risk:** Adds page height and can feel recruitment-heavy or promotional. The public-only limitation may reduce conversion but must remain explicit.

## Removed Before Evaluation

- External Account Destination Guide: useful polish, but external destinations remain secondary to local navigation and reading continuity.
- Archive Closing Signature: overlaps C4 and should be part of its tone/presentation, not a separate feature.
- DOM route trace: optional decoration only, not enough independent visitor value.
- WebGL minimap/backgrounds, WebGPU scenes: ordinary semantic anchors solve the task with less performance/accessibility cost.
- Build-time embeddings/similarity graph: five posts do not justify opaque models or generated artifacts.
- Portfolio chatbot/RAG: duplicates existing structured routes and introduces hallucination, service, privacy, and recurring-cost risks.
