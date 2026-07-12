# Round 10 Brainstorm — Frontend and Delivery

## Repository evidence

- The homepage now contains all five posts as generated semantic HTML. JavaScript fetches `posts/posts.json` only to add exact-tag buttons and re-render the same timeline; a failed request removes the filter navigation but preserves the complete archive.
- Archive filter state is currently a function-local `activeTag = "全部"`. Button activation updates `aria-pressed` and the list, but it does not update the URL, restore after reload, or respond to browser Back/Forward.
- The filter vocabulary is manifest-derived and Unicode-heavy: `ACGN`, `小红书`, `工具`, `求职`, `技术`, and `生活`. Runtime normalization collapses whitespace, removes one leading `#`, de-duplicates case-insensitively, then retains the canonical display spelling. URL handling therefore must not invent a second normalization rule.
- The homepage already relies on `#blog` as the archive destination from navigation, footers, site-state links, and generated/imported article shells. Hash state is occupied and should not be repurposed for topics.
- `script.js` is a broad shared runtime used by the homepage, article shells, editor, guestbook administration, and project pages. Archive URL logic must remain contained inside archive initialization and must be guarded by the existing `listEl`/`statusEl` checks.
- The generated static archive and `scripts/check-static-archive.js` provide a strong progressive baseline and deterministic contract. Any new state verifier should extend this evidence instead of weakening the no-JavaScript path or treating a live browser smoke test as the only proof.
- The site has only five posts. It has enough exact taxonomy for honest filtering, but not enough content or evaluation evidence for embeddings, personalization, semantic recommendations, a chatbot, or a graphical topic network.

## Delivery principles for URL-backed state

If topic addressability is selected, define the URL contract before implementation:

1. Use one query key, preferably `tag`, while keeping `#blog` available as the stable section target.
2. Parse through `new URL(window.location.href)` and `URLSearchParams`; never manually concatenate or decode percent escapes.
3. Resolve a supplied value against the manifest-derived canonical tag map. A canonical match is the displayed manifest spelling; invalid, empty, duplicate/ambiguous, or stale state falls back to `全部` without hiding static content.
4. Treat `全部` as absence of the `tag` parameter. Preserve every unrelated query parameter, its repeated values, and the current hash when updating only archive state.
5. Use `history.pushState` only for a user-triggered change to a different valid state. Initial restoration and invalid-state cleanup should not add history entries; if canonical cleanup is desired, use `replaceState` once.
6. On `popstate`, derive state from the current URL and re-render without pushing or replacing another entry. Do not force focus or scroll; browser history should not unexpectedly move the reader.
7. Keep filter controls as real buttons with one `aria-pressed="true"` option. Add a concise result status/live region only if needed to make an in-place list change perceivable; do not turn the pills into misleading navigation links.
8. Preserve the generated full archive when JavaScript or the manifest fails. A URL such as `?tag=%E6%B1%82%E8%81%8C#blog` may progressively fall back to the complete archive, but it must never become an empty or incorrect server-rendered promise.

## Candidate D1 — Addressable Archive Topic Views

**Visitor value.** A reader or recruiter can share, bookmark, reload, and traverse history for an exact topic view such as `?tag=求职#blog`. This upgrades an existing useful interaction rather than adding a new content claim.

**Why it fits now.** Round 09 removed the largest prerequisite risk: the complete archive is already present without JavaScript. A topic URL can therefore degrade honestly to the full archive instead of an empty mount point. The feature also demonstrates disciplined client-side state design—canonical state, URL serialization, history semantics, and progressive enhancement—in a small dependency-free site.

**Implementation outline.** Add small pure helpers for canonical tag lookup, reading topic state from a URL, and producing a URL with only `tag` changed. After a successful manifest fetch and tag derivation, restore the canonical topic, render it, and attach one click handler plus one `popstate` handler. A user selection pushes one entry only when state changes; `全部` deletes `tag`. Invalid initial values render `全部`; either leave the invalid URL untouched with an explanatory status or canonicalize it once with `replaceState`, but document and test one policy. Reuse the current button markup and exact-tag matching.

**Accessibility.** Preserve button semantics and `aria-pressed`. Because the archive list changes in place, expose a stable concise status such as “求职 · 2 篇” in the existing status element, with a restrained polite announcement for user-initiated and history changes. Do not focus the heading or active pill on `popstate`, and do not announce the entire regenerated list.

**Deterministic verification.** Test Chinese, ASCII, space-containing, `#`-like, and mixed-case fixtures; percent encoding; `+` decoding; empty and unknown values; duplicate `tag` keys; removal on `全部`; unrelated repeated parameters; query ordering policy; hash preservation; same-state no-op; user push versus initial/history no-push; and Back/Forward restoration. A focused Node contract can evaluate pure helpers or a narrowly isolated archive-state module, while source checks confirm the static list and failure path remain intact. Browser QA should cover direct-load, reload, click, Back, Forward, keyboard activation, invalid state, and fetch failure at mobile and desktop widths.

**Cost.** S–M.

**Risks and challenge.** The current corpus is tiny, and `生活` matches four of five posts, so addressability is convenience rather than a discovery breakthrough. Async initialization means the static full list appears before enhancement; the implementation must not claim that the server delivered a filtered page. Bad history handling can create duplicate entries or a Back-button loop. URL cleanup can silently delete unrelated state. Unicode comparisons can diverge if the URL path and manifest use different normalization. These risks are manageable only with an explicit contract and deterministic fixtures; a few happy-path clicks are insufficient evidence.

## Candidate D2 — Static Topic Landing Pages Generated from the Manifest

**Visitor value.** Each topic would have a genuinely addressable, JavaScript-independent document rather than a query URL that falls back to the complete archive.

**Why consider it.** This is the strongest progressive-enhancement challenge to D1. It would make “shareable topic view” true at the HTML source layer and could expose semantic headings and canonical topic links.

**Implementation outline.** Extend the manifest generator to emit one simple page per canonical topic using the same escaped archive renderer, with a full-archive fallback link. Topic pills could become links to those pages, while JavaScript remains optional.

**Deterministic verification.** Assert one generated page per canonical tag, exact post membership/order, resolvable encoded links, escaping, stale-page cleanup, byte-stable regeneration, and no collisions after filename slugging.

**Cost.** M–L.

**Risks and challenge.** Six topic pages for five posts create disproportionate generated surface, duplicated excerpts, URL naming and stale-file lifecycle problems, and possible search-index duplication. It also changes filter controls from in-place buttons to navigation and expands generator ownership beyond Round 10's likely single-feature budget. This is more truthful under no JavaScript, but currently over-engineered; D1's complete-archive fallback is an acceptable progressive contract if described honestly.

## Candidate D3 — Public Guestbook Intent and Privacy Guide

**Visitor value.** Before composing a public message, a visitor learns that the message is public, what information to avoid, the length constraint, and what response channel to use for private or recruiting contact.

**Why it fits.** The contact section says only that the owner is happy to chat, while the form collects a signature and public message. This is a concrete trust gap with no dependency on network success, browser history, or corpus size.

**Implementation outline.** Add concise static copy beside the existing compose action and associate it with the form using `aria-describedby`. State visibility, moderation expectation if applicable, 100-character limit, and a private-contact alternative only if a real channel already exists. Do not add consent theater, legal boilerplate, or an unimplemented privacy claim.

**Deterministic verification.** Source checks can require the disclosure before the form, an id reference that resolves exactly once, accurate `maxlength`, and preservation across the hidden/expanded states. Keyboard and screen-reader QA should verify that disclosure context is available before submission.

**Cost.** S.

**Risks and challenge.** This has high trust value but modest portfolio differentiation. Copy must not promise deletion, encryption, notification, or moderation behavior not established by the Worker. It is a better low-risk choice if URL-state behavior cannot be isolated and tested cleanly, but it does less for archive discovery.

## Candidate D4 — Explicit Chronological Article Continuation

**Visitor value.** At the end of an article, readers can move to the immediately older or newer post without returning to the homepage archive.

**Why it fits.** Every article currently ends with only “Back to archive.” Chronological adjacency is honest and deterministic; semantic “related” or personalized language is not justified by five posts.

**Implementation outline.** Match the decoded current filename against the sorted manifest, then render at most one newer and one older article with title/date and an explicit chronological label. Preserve the current static archive footer when JavaScript or fetch fails. Keep selection logic pure and update generated/editor/import shells only if a semantic mount point is required.

**Deterministic verification.** Cover all five positions, first/last collapse, no self-link, Unicode pathname decoding, encoded filenames, missing current post, malformed path, and fetch failure. Browser QA should verify keyboard order and 320px wrapping on one longform and one XHS post.

**Cost.** M.

**Risks and challenge.** This touches every article shell and the shared runtime for a small corpus. Older/newer labels are easy to reverse, and dynamic insertion is absent without JavaScript. It improves reading flow but does not resolve the already-evidenced archive state loss, so it ranks behind D1 this round.

## Candidate D5 — Archive Result-State Announcement

**Visitor value.** Filter users, especially screen-reader users, receive a concise topic and result count after an in-place update instead of inferring success from a visually replaced list.

**Why it fits.** Buttons already expose selection through `aria-pressed`, but the current status element is reserved for fetch failure and stays hidden during successful filtering. The archive has no explicit “2 posts” feedback.

**Implementation outline.** Reuse the existing status node for a visible, low-emphasis state summary, and place a separate visually hidden polite announcement only if repeated rendering would otherwise be noisy. Update only after actual state changes; do not announce during initial static paint.

**Deterministic verification.** For every tag and `全部`, assert the count matches exact manifest membership, one pressed button exists, empty results are impossible for generated buttons, and announcements do not duplicate on same-state activation.

**Cost.** S.

**Risks and challenge.** This repairs an accessibility feedback gap but does not make state durable or shareable. It is best folded into D1 only when treated as required state communication, not expanded into a separate dashboard or decorative counter. If Round 10 insists on exactly one narrowly scoped deliverable, D1 can include the minimal announcement necessary for accessibility without adding unrelated archive analytics.

## Explicitly rejected

- **Embedding similarity, RAG, “AI recommendations,” or a portfolio chatbot:** five posts, broad/source tags, no evaluation set, and no service/privacy boundary cannot support these claims. Exact local filtering is more credible.
- **WebGL/WebGPU topic constellation:** six tags and five posts do not justify GPU cost, a second accessible representation, motion controls, or mobile interaction complexity. The semantic archive already communicates the relationship.
- **Animated URL/filter transitions or a history timeline graphic:** they decorate state rather than improve its correctness and increase reduced-motion and regression surface.
- **Client-only fake static topic pages or SEO claims:** a query URL that depends on runtime filtering must be described as an enhanced view with a complete static fallback, not as independently rendered topic content.

## Comparative recommendation

1. **D1 Addressable Archive Topic Views** is the best Round 10 feature if implemented with the URL contract above. It addresses direct repository evidence, builds on Round 09's resilient baseline, and provides a compact but credible engineering showcase. Selection should be conditional on deterministic URL/history fixtures—not merely source inspection.
2. **D3 Public Guestbook Intent and Privacy Guide** is the safest high-trust alternative. Prefer it if archive URL logic would be bundled into unrelated refactoring or cannot preserve parameters/history deterministically.
3. **D4 Explicit Chronological Article Continuation** is honest and useful, but its multi-shell reach and JavaScript-only enhancement produce more regression surface than D1.
4. **D5 Archive Result-State Announcement** is valuable accessibility work but too small as a standalone product improvement; make its minimal form part of D1's state feedback.
5. **D2 Static Topic Landing Pages** offers the strongest no-JavaScript semantics but is disproportionate for the current corpus and generator surface.

The leading hypothesis survives this challenge, but only narrowly: Round 09 made its fallback honest, and Round 10 can make the state contract rigorous. Do not bundle article continuation, clickable entry tags, taxonomy changes, First Reads rewiring, contact copy, or a new visual system into D1.
