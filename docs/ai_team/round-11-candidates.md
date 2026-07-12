# Round 11 Deduplicated Candidate Set

Both evaluators score this exact set. Cost rewards lower effort. Select exactly one feature.

## C1. Informed Public Guestbook Entry

- **Value:** Before typing, visitors know their signature and message will be publicly displayed and avoid posting private details.
- **Approach:** Add one quiet always-visible factual disclosure before the compose control, rename it `写公开留言`, and reference the disclosure from both button and form with `aria-describedby`.
- **Cost:** S.
- **Risk:** Legalistic styling or unsupported privacy/moderation/deletion/reply claims would damage warmth and trust.

## C2. Guestbook Announcement Discipline

- **Value:** Screen-reader users receive concise async state rather than a live-region burst of all fetched messages.
- **Approach:** Make the list a normal labelled region, keep one atomic polite status, and manage `aria-busy` through fetch/submission states.
- **Cost:** M.
- **Risk:** Assistive-technology behavior needs live runtime evidence; fetch refactoring can regress messages and still leaves public intent undisclosed.

## C3. Static Article Archive Signature

- **Value:** Direct article visitors understand archive context and get truthful routes to First Reads and all articles.
- **Approach:** Add one quiet static endcap to five posts, the checked-in template, editor renderer, and XHS importer with deterministic parity checks.
- **Cost:** S–M.
- **Risk:** Broad ownership parity for modest navigation gain; prominent/promotional copy would intrude after personal writing.

## C4. One Transparent Chronological Continuation

- **Value:** Article finishers get exactly one clearly earlier/newer post without a homepage round trip.
- **Approach:** Exact Unicode filename match against manifest order, one date-labelled anchor, no relevance language, archive fallback retained.
- **Cost:** M.
- **Risk:** Direction, edges, encoding, shared runtime, and shell/generator parity are disproportionate at five posts.

## C5. No-script Guestbook Capability Notice

- **Value:** Visitors without JavaScript learn that viewing/sending remote guestbook messages requires it.
- **Approach:** One guestbook-local `<noscript>` sentence with no invented fallback.
- **Cost:** S.
- **Risk:** Narrow failure-mode value and does not solve the common public-submission ambiguity.

## C6. Verified Article Account Destinations

- **Value:** Direct article visitors reach Alex's profiles instead of generic service roots.
- **Approach:** Verify every identity externally, then synchronize five posts and both generators/templates.
- **Cost:** M.
- **Risk:** Destination ownership is not yet verified; one wrong mapping is a trust regression and disqualifies implementation now.

## Removed Before Evaluation

- Private form/email relay/résumé upload, moderation/deletion/reply promises: unsupported by current product.
- Consent checkbox/modal: adds consent theater without changing public publication.
- Related/AI recommendations, GPU/decorative work: corpus and visitor evidence do not support them.
