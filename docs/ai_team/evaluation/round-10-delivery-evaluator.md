# Round 10 Delivery Evaluation

This is an independent delivery review of the exact C1–C6 set. I did not inspect the product evaluator. Scores use the team rubric: **Value 40%, Technical demonstration 25%, Implementation cost 20%, Long-term benefit 15%**. Cost uses `10 = cheapest/easiest`, so a higher cost score rewards a smaller delivery and maintenance burden.

## Weighted ranking

| Rank | Candidate | Value | Technical | Cost | Long-term | Weighted total |
| ---: | --- | ---: | ---: | ---: | ---: | ---: |
| 1 | C1 Addressable Archive Filter State | 8 | 9 | 6 | 8 | **7.85** |
| 2 | C5 Filter Result-State Announcement | 7 | 5 | 9 | 7 | **6.90** |
| 3 | C2 Public Guestbook Safety Note | 7 | 3 | 10 | 7 | **6.60** |
| 4 | C4 Single Chronological Next Read | 6 | 7 | 5 | 7 | **6.20** |
| 5 | C3 Article Archive Signature | 6 | 4 | 8 | 7 | **6.05** |
| 6 | C6 Generated Static Topic Pages | 4 | 7 | 2 | 4 | **4.35** |

## Delivery evidence and risk gates

| Candidate | Feasibility and progressive enhancement | Correctness, regression, and testability | Showcase and cost judgment | Disqualifier / gate |
| --- | --- | --- | --- | --- |
| **C1** | Feasible as an isolated extension to `initBlogAutoList()`: the manifest already supplies canonical tags, buttons already use `aria-pressed`, and Round 09's generated homepage archive remains complete if JavaScript or fetch fails. No new service, route, dependency, or page shell is required. | The hard part is a precise state machine: canonical Unicode tag lookup, duplicate/empty/invalid `tag` handling, preservation of unrelated and repeated parameters plus `#blog`, same-state no-op, one initial `replaceState` at most, user-only `pushState`, and mutation-free `popstate`. Pure URL helpers and a focused history harness make this deterministically testable; click-only QA is insufficient. Shared-runtime regression is containable if all logic remains guarded inside archive initialization. | Best engineering demonstration in the set: it exposes URL canonicalization, browser-history semantics, accessible in-place state, progressive fallback, and test design in plain JavaScript. S–M is credible only with narrow helpers rather than an archive rewrite. | **Disqualify the implementation** if it drops or reorders unrelated repeated parameters, repurposes the hash, pushes on initial load/same-state/history restoration, creates a Back loop, accepts a non-canonical or ambiguous tag, hides the static archive on failure, moves focus/scroll on `popstate`, or ships without deterministic Unicode/history fixtures. |
| **C5** | Very feasible and accessibility-positive. The existing status element can report the active exact tag and count while the static archive remains the baseline. Button semantics stay intact, and no URL/history behavior is introduced. | Count derivation is deterministic from the same filtered array. Tests should cover every generated tag, `全部`, exactly one pressed button, no duplicate announcement for a same-state activation, and fetch failure. Main regression risk is noisy live-region output or conflating the persistent visible summary with the fetch-error status. | Excellent cost/risk ratio but a moderate showcase: it completes feedback for the existing interaction without solving reload, share, or Back/Forward continuity. | **Disqualify the implementation** if it announces on every render, announces the full list, reports a count from a second data source, replaces the fetch-failure message, or makes the static archive less usable. |
| **C2** | Easiest and safest candidate. Static copy before composition works without JavaScript and can be associated with the form/action without touching Worker behavior. It directly improves informed use of a public surface. | Source and accessibility checks can prove placement, unique ID relationships, and consistency with the 100-character limit. Regression surface is almost entirely copy/layout. Correctness nevertheless requires claims to match the repository: no private channel, deletion, moderation, notification, encryption, or response promise may be invented. | Highest cost score and useful trust maintenance, but the weakest technical demonstration after C3. It cannot repair the absence of a private contact path. | **Disqualify the copy** if it promises privacy or operational behavior the current guestbook cannot provide, or asks visitors to use a private/recruiting channel that does not exist. |
| **C4** | Implementable, but broader than its visible size suggests. Exact current-file matching must work across all five Unicode filenames, current shells, editor output, XHS importer output, and the shared runtime while retaining the static archive fallback. | Deterministic fixtures can cover manifest positions, first/last behavior, URI encoding/decoding, malformed or unmatched paths, no self-link, order direction, and fetch failure. The principal risk is silently reversing newer/older semantics or creating generator drift for a one-link component. | Good local retrieval and Unicode-path showcase, but medium cost and multi-shell regression exposure are disproportionate to a five-post corpus. | **Disqualify the implementation** if it uses relevance/personalization language, guesses from dates or DOM order instead of exact manifest identity, reverses chronology, removes the static archive fallback, or omits generator parity and Unicode-path tests. |
| **C3** | Straightforward static progressive enhancement if one quiet endcap is applied consistently to every current article shell and both generators. No runtime or manifest dependency is necessary. | Shell/generator contract checks are deterministic, but the number of touched artifacts raises parity risk. The content must use only local, stable routes and must remain visually subordinate after intimate longform writing. | Low-to-medium delivery cost with modest durable brand coherence; technical evidence is limited to disciplined template parity. | **Disqualify the implementation** if promotional copy interrupts article tone, metadata is duplicated manually and can drift, a shell or generator is missed, or the generic archive fallback is weakened. |
| **C6** | Technically possible through the existing generator, and strongest at the no-JavaScript layer. Delivery is not proportionate now: six pages for five posts require URL naming, collision policy, escaping, stale-output cleanup, canonical metadata, navigation, and generated-artifact ownership. | It demands byte-stable generation tests, exact membership/order for every tag, Unicode filename/slug collision fixtures, link resolution, escaping, and stale-page deletion. Those tests are feasible, but they confirm a much larger maintenance surface and do not solve thin content. | Some generator/showcase value, but cost is highest and long-term return is weak until the taxonomy and corpus become materially deeper. | **Disqualify for Round 10** because the current six-tag/five-post corpus produces thin or duplicate landing pages and disproportionate SEO/artifact lifecycle complexity. Reconsider only after corpus depth makes multiple topic documents substantively distinct. |

## Recommendation

Select **C1: Addressable Archive Filter State**.

Round 09 established the prerequisite that makes C1 safe: the homepage source already contains all five posts, so URL-enhanced filtering can fail back to a truthful complete archive. C1 is therefore the only candidate that combines material state continuity with a strong, inspectable engineering demonstration while staying inside one homepage subsystem. It should be framed narrowly as a bookmarkable exact filter—not a Topic Hub—and accepted only if deterministic tests prove the URL/history contract.

Minimum delivery contract:

1. Reuse the manifest-derived canonical tag vocabulary and existing `aria-pressed` buttons; introduce no second taxonomy or data source.
2. Treat `全部` as absence of `tag`; invalid, empty, duplicated, or ambiguous initial state renders the full archive and is canonicalized at most once with `replaceState`.
3. Preserve unrelated parameters, repeated values, their order, and the current hash while changing only `tag`.
4. Use `pushState` only for an actual user change. `popstate` must only parse and render—never push, replace, focus, or scroll.
5. Keep the complete source archive and fetch-failure behavior usable for every URL. The enhanced URL must not be described as server-rendered topic content.
6. Add deterministic fixtures for Chinese and ASCII canonical tags, percent encoding, `+`, empty/unknown/duplicate keys, parameter preservation, same-state no-op, initial replacement, user push, and Back/Forward restoration.
7. Include a restrained result-state announcement only to make the in-place change accessible; do not expand the round into C5's separate presentation work.

## Deferred and rejected

- **C5** is the best low-risk fallback and the correct accessibility accompaniment in minimal form, but by itself it leaves the evidenced share/reload/history defect intact.
- **C2** should remain a future trust-hygiene round. Its static delivery is exceptionally safe, but it offers little engineering evidence and cannot supply a private channel.
- **C4** is honest and testable, yet Unicode pathname handling plus every-shell/generator parity create more regression surface than C1 for less immediate value.
- **C3** is durable editorial polish, not the highest-priority behavioral improvement. It should wait until the article-end journey is reconsidered as its own round.
- **C6** is rejected at the current corpus size. Its stronger no-JavaScript semantics do not justify thin pages, generated-file cleanup, URL collision rules, or maintenance overhead.
