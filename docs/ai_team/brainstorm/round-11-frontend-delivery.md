# Round 11 Brainstorm — Frontend and Delivery

## Repository evidence

- The Contact block presents “留言” before it explains the publishing consequence. Its visible introduction says only that Alex is happy to chat; neither the compose button nor the initially hidden form says that the submitted signature and message will appear publicly on this page.
- Public display is a factual property of the current implementation, not a proposed policy. `POST /messages` inserts the normalized signature and message, the client immediately fetches `GET /messages` after a successful post, and the unauthenticated list endpoint returns `signature`, `message`, `created_at`, and `updated_at`. `renderGuestbookMessages` then renders those fields into the homepage list.
- The safe wording boundary is narrow. The Worker enforces required fields, a 24-character signature maximum, a 100-character message maximum, a per-IP interval, and a unique normalized signature. It does **not** implement an approval queue, response notification, private delivery, expiration, or a user-facing edit/delete route. Admin-authenticated code can edit and delete entries. Therefore the UI may say “署名和留言会公开显示在本页” and “请勿填写隐私信息”; it must not promise permanence, moderation, a reply, or a private recruiting channel.
- The safety context must precede typing and survive JavaScript/API failure. A note inserted only when the form expands, after submit, or after `GET /messages` succeeds is too late and is not progressive. Static text in `.guestbook-copy`, before the compose control in DOM order, remains available even when the form cannot expand or the Worker is unavailable.
- The form already has useful native constraints and status semantics: associated labels, `required`, `maxlength`, a live character counter, and a polite submission status. The disclosure should supplement these rather than introduce a consent checkbox, modal, alert, or second submit gate.
- The current guestbook list itself has `aria-live="polite"`, while the separate submission status also has a polite live region. Initial fetch inserts every returned entry into the live list. This can be noisy for assistive technology, but changing announcement architecture is a separate behavioral feature and should not be bundled into a copy-only safety disclosure without focused testing.
- Article parity is broader than it first appears. Five current posts, `posts/new-post-template.html`, the editor's `renderPostHtml`, and the XHS importer's `renderPostHtml` all end with the same generic “Back to archive” footer. A static article endcap must update all eight ownership points or regeneration will reintroduce drift.
- Article adjacency can be derived honestly from the five-entry manifest, but it is not “related content.” Unicode filenames, encoded `location.pathname`, first/last positions, editor/import parity, and fetch failure make even a single chronological continuation materially riskier than static copy.
- Existing deterministic checks cover archive generation/fallback and URL-state behavior, but there is no guestbook disclosure or article-shell parity checker. Round 11 should add a narrowly scoped contract for whichever surface is selected rather than treating a visual smoke test as structural proof.
- The in-app browser error-page restriction remains a known tooling constraint. If interactive local QA cannot be recovered, source assertions are evidence only for structure and state contracts; they are not evidence that mobile layout or focus behavior was visually inspected.

## Delivery principles

1. Prefer a static, visible baseline for trust-critical information. JavaScript may enhance interaction but must not be required to discover that a submission is public.
2. Use only claims directly supported by the current client and Worker. Do not infer moderation, retention, notification, privacy, or response behavior from the existence of an admin page.
3. Put instructions where the decision occurs. A disclosure beneath the message list or only inside a post-submit status does not inform the compose decision.
4. Give the disclosure one stable id. Reference it from the compose button and form with `aria-describedby` so button users and form users can recover the same context; retain the button's existing `aria-controls` and expanded state.
5. Keep the note visually subordinate but readable. Reuse the site's muted typography and spacing; do not use warning-red styling for normal publishing context.
6. Treat “one feature” as one visitor outcome. Do not use the safety note as permission to redesign Contact, add a private channel, change Worker storage, refactor all live regions, or add legal boilerplate.
7. For any article feature, preserve a real static archive link and update both generators plus the template in the same change. Runtime-only insertion is an enhancement, not a complete parity strategy.

## Candidate D1 — Pre-compose Public Guestbook Disclosure

**Visitor value.** Before choosing to type, a visitor knows that both the chosen signature and message will be displayed on the public homepage and can avoid posting a phone number, email address, résumé link, or other private recruiting/contact detail.

**Implementation outline.** Add one concise static sentence in `.guestbook-copy`, immediately before the compose button in DOM order. A supportable wording shape is: “署名和留言会公开显示在本页；请勿填写手机号、邮箱或其他隐私信息。留言最多 100 字。” Give it a stable id and reference that id from both the compose button and form via `aria-describedby`. Style it with an existing muted treatment or one narrowly scoped class. Do not add a checkbox, modal, second confirmation, private-contact promise, or Worker change.

**Accessibility and progressive enhancement.** The note is readable before focus enters the control and remains present with scripts disabled, API configuration missing, fetch failure, or form collapse. The compose button retains an accessible name, `aria-controls`, and `aria-expanded`; the description adds context without replacing its label. Referencing the same id from the form makes the instruction available after the button is hidden and focus moves to the signature field.

**Deterministic verification.** Add a small Node contract that parses or tightly inspects `index.html` and asserts: exactly one disclosure id; disclosure precedes the compose button; both button and form reference the existing id; all referenced ids resolve exactly once; public-display wording names both signature and message; the stated 100-character limit agrees with the textarea `maxlength`, the client constant, and the Worker constant; no private, response-time, moderation, or permanence claim was introduced. Run `node --check script.js`, `node --check guestbook/worker.mjs`, existing archive checks, `git diff --check`, and a no-change manifest regeneration. Browser QA, when available, should inspect 320/390/768/1440 widths, keyboard focus and accessible description before expansion, focus transfer after expansion, API-error state, text wrapping, and overlap with the mobile back-to-top control. Submission is an external write and is not required for this static contract.

**Cost.** S.

**Risks and challenge.** The feature has limited engineering depth and cannot solve the absence of a private recruiting channel. Repeating “public” too loudly could make a personal invitation feel legalistic, while a vague “注意隐私” would leave the publishing consequence unclear. `aria-describedby` also must not point to hidden or duplicated text. These are controllable copy and contract risks. The leading hypothesis survives the challenge because the repository proves a pre-decision trust gap with a static, failure-resistant remedy; it should be selected for visitor safety, not presented as a portfolio showcase.

## Candidate D2 — Guestbook Announcement Discipline

**Visitor value.** Screen-reader users hear a concise loading/result/submission state rather than potentially receiving a burst of every guestbook item when the initial fetch populates an `aria-live` container.

**Implementation outline.** Make the message list a normal labelled region/list and keep one dedicated, atomic polite status for loading, failure, successful submission, and result count. Set and clear `aria-busy` around fetches. Preserve semantic articles for each message and avoid announcing the full list after refresh.

**Accessibility and progressive enhancement.** This directly improves async feedback, but it must distinguish initial loading from a user-triggered submission and must not suppress actionable error text. Static guestbook content remains absent because messages are remote; the enhancement should fail to the existing visible status rather than a silent empty region.

**Deterministic verification.** Assert one live status, no live ancestor around message cards, correct `aria-busy` transitions on success and rejection, one announcement per state change, no duplicate announcement after the post-submit refetch, and unchanged text-node rendering of untrusted message content. Browser QA should use an intercepted deterministic API fixture if the browser tooling permits it; do not mutate the live guestbook.

**Cost.** M.

**Risks and challenge.** The actual verbosity of DOM insertions varies by assistive technology, so source semantics alone cannot prove the experience. Refactoring the fetch pipeline creates more regression risk than D1 and still leaves the public-submission disclosure missing. This is valuable follow-up accessibility work, not the best first trust repair.

## Candidate D3 — Static Article Archive Signature

**Visitor value.** A direct article visitor understands that the piece is part of Alex's personal archive and gets two truthful routes: the curated “First Reads” section and the complete chronological archive.

**Implementation outline.** Add a quiet endcap between article content and the existing footer with static wording such as “From Alex's personal archive,” plus local links to `../index.html#featured-reading` and `../index.html#blog`. Apply the same semantic markup to all five current articles, the checked-in template, the editor generator, and the XHS importer. Keep “Back to archive” as the baseline route; do not add author availability, recruiting intent, or semantic-related claims.

**Accessibility and progressive enhancement.** Use a labelled `aside` or `nav` only if its label communicates a real navigation purpose; otherwise a paragraph with two ordinary links is simpler. It works without JavaScript and gives direct landings context without interrupting intimate posts with promotional cards.

**Deterministic verification.** A parity script should enumerate current article HTML plus both generator source templates and assert one endcap, two resolvable local anchors, no duplicate archive link within the component, stable DOM order after `.post-body`, and correct relative paths. Regenerate an editor fixture and an XHS fixture in a temporary directory if the scripts can be invoked without network/image downloads. Browser QA should inspect the shortest XHS post and longest ACGN post at 320 and 1440 pixels.

**Cost.** S–M.

**Risks and challenge.** The current footer already supplies the essential archive escape route, so this feature improves context more than task completion. Copy duplication across eight ownership points is real, and a prominent card would feel promotional after personal writing. It is a stronger portfolio-navigation improvement than D1, but a weaker response to an evidenced visitor-harm risk.

## Candidate D4 — One Transparent Chronological Continuation

**Visitor value.** At the end of a post, a reader can continue to exactly one adjacent post without returning to the archive.

**Implementation outline.** Derive one explicitly labelled chronological link from manifest order—prefer “上一篇（更早）” or “下一篇（更新）” with an unambiguous date, never “相关” or “为你推荐.” Match the decoded current filename exactly, render no self-link, and retain the static archive footer for missing manifests, unrecognized paths, and JavaScript-disabled visits.

**Accessibility and progressive enhancement.** Render a real anchor inside a labelled continuation region, keep title and direction in accessible text, and allow long Chinese titles to wrap at 320 pixels. Do not auto-focus, scroll, or announce the inserted route as an alert.

**Deterministic verification.** Pure fixtures must cover all five manifest positions, chosen direction at the boundary, no self-link, exactly one link, encoded and decoded Unicode pathnames, malformed percent escapes, query/hash exclusion, absent current file, duplicate manifest file, fetch failure, and title/date escaping. Shell checks must prove the mount/fallback remains present in five articles, the template, and both generators.

**Cost.** M.

**Risks and challenge.** The corpus is only five posts, chronological direction labels are easy to reverse, and runtime behavior expands shared-script and shell parity risk for a modest reading-flow gain. A static per-post continuation generated at publish time would be more progressive but requires rewriting neighboring posts whenever chronology changes. This remains honest, but it should rank below the trust disclosure this round.

## Candidate D5 — No-script Guestbook Capability Notice

**Visitor value.** When JavaScript is unavailable, the visitor is told that the remote guestbook form cannot be opened rather than being left with a compose button that has no effect.

**Implementation outline.** Add a restrained `<noscript>` message inside the guestbook explaining only that viewing/sending messages requires JavaScript. Do not imply that an external account is private or route visitors to a fabricated fallback.

**Accessibility and progressive enhancement.** This makes the failure mode explicit and is entirely static. It does not make the guestbook itself work without JavaScript, because the remote API requires client behavior, but it truthfully describes the boundary.

**Deterministic verification.** Assert one guestbook-local `<noscript>` notice, exact containment, no unsupported fallback link, and no duplicate notice when scripts run. A browser with JavaScript disabled is the strongest runtime evidence; otherwise report the static check honestly.

**Cost.** S.

**Risks and challenge.** This affects a relatively uncommon failure mode and does nothing for the much more likely visitor who has JavaScript enabled but does not realize their message is public. It is too small to outrank D1 and should not be bundled merely to enlarge the selected feature.

## Explicitly rejected

- **Private recruiting form, email relay, or résumé upload:** no endpoint, inbox ownership, spam boundary, privacy statement, or retention policy exists. Adding copy that implies these capabilities would be false.
- **Moderation badge, “reviewed before publishing,” deletion promise, or response-time promise:** the Worker publishes on insert and the UI immediately refetches; admin edit/delete capability does not establish a moderation or service commitment.
- **Consent checkbox or confirmation modal:** this adds friction and consent theater without changing the publishing model. A clear pre-compose disclosure is the appropriate control.
- **Semantic related posts, embeddings, RAG, or personalized recommendations:** five posts and coarse tags provide no evaluation corpus for relevance claims. Chronological adjacency is the only defensible continuation relation.
- **Decorative article carousel, animated guestbook cards, or GPU visualization:** none resolves the trust, context, or accessibility gaps, and each increases motion/mobile QA surface.
- **Combining disclosure, live-region refactor, no-script notice, article endcap, and continuation:** these are separate outcomes and would violate the round's single-feature constraint while obscuring regression attribution.

## Comparative recommendation

1. **D1 Pre-compose Public Guestbook Disclosure** is the best Round 11 feature. It addresses the clearest evidenced harm before the decision point, stays factual under the current API, works through JavaScript and network failure, and has a deterministic accessibility contract.
2. **D3 Static Article Archive Signature** is the best alternative if independent evaluation prioritizes direct-landing context and portfolio navigation. It is honest and progressive, but the existing archive footer means its incremental value is smaller.
3. **D2 Guestbook Announcement Discipline** addresses a plausible assistive-technology issue, but needs stronger runtime evaluation and carries more behavioral risk while leaving public intent undisclosed.
4. **D4 One Transparent Chronological Continuation** is useful and falsifiable, yet broad shell/runtime parity and a five-post corpus make it disproportionate for this round.
5. **D5 No-script Guestbook Capability Notice** is truthful resilience copy, but its audience and product value are too narrow for selection.

The safety-note hypothesis therefore survives a serious delivery challenge, but only in a disciplined form: static before the compose action, explicit about both signature and message, associated with button and form, and silent about moderation, retention, replies, or private contact. Its small implementation size is a strength for trust and regression control, not evidence of technical differentiation.
