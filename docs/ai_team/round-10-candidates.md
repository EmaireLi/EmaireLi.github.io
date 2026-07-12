# Round 10 Deduplicated Candidate Set

Both evaluators score this exact set. Cost rewards lower effort. Select exactly one feature.

## C1. Addressable Archive Filter State

- **Value:** Bookmark, share, reload, and traverse an exact manifest tag filter.
- **Approach:** Use `?tag=<canonical>#blog`; validate exact tags; 全部 removes `tag`; preserve unrelated and repeated parameters; push only on actual user state change; canonicalize invalid initial state with at most one replace; popstate re-renders without URL mutation, focus, or scroll.
- **Cost:** S–M.
- **Risk:** Only 求职 is a focused multi-post recruiter slice; do not call this a Topic Hub. Unicode, invalid values, history, and hash semantics must be exact.

## C2. Public Guestbook Safety Note

- **Value:** Warn before composition that messages are public and should not contain private recruiting/contact details.
- **Approach:** Add concise static copy beside the existing compose action; no new endpoint, privacy promise, availability claim, or response-time claim.
- **Cost:** S.
- **Risk:** Important trust hygiene but cannot create a private contact channel and offers limited engineering depth.

## C3. Article Archive Signature

- **Value:** Direct article visitors understand that a post belongs to Alex's personal archive and can return to curated First Reads or the full archive.
- **Approach:** Add one quiet static endcap across current shells and both generators using existing metadata and local routes.
- **Cost:** S–M.
- **Risk:** Modest behavioral gain; promotional wording could intrude after intimate writing.

## C4. Single Chronological Next Read

- **Value:** Article finishers get one transparent newer/older continuation without an archive round trip.
- **Approach:** Exact current-file match against manifest order, at most one chronological next link, static archive fallback retained, no relevance/personalization language.
- **Cost:** M.
- **Risk:** Sparse corpus and Unicode path/generator parity create a broad regression surface for a small component.

## C5. Filter Result-State Announcement

- **Value:** Filter users, including screen-reader users, receive a clear current tag and result count.
- **Approach:** Add one restrained polite status tied to existing filter updates; no URL state.
- **Cost:** S.
- **Risk:** Improves feedback but leaves share/reload/history behavior incomplete and can become noisy if announced redundantly.

## C6. Generated Static Topic Pages

- **Value:** Each exact tag gets a shareable, no-JavaScript page.
- **Approach:** Extend generation to create escaped tag pages from the manifest with canonical links back to the homepage archive.
- **Cost:** L.
- **Risk:** Six tags across five posts create thin/duplicate pages, noisy generated artifacts, and disproportionate SEO/maintenance complexity.

## Removed Before Evaluation

- First Reads completion cue: weak until deeper routes exist and several lanes have only one article.
- Topic Hub framing: corpus depth does not support it.
- Embeddings, RAG, chatbot, GPU graph, animation: no evaluation corpus or visitor problem justifies the claims/cost.
