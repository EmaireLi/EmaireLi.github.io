# Round 12 Delivery Evaluation

This is an independent delivery evaluation of the exact C0–C4 set in `round-12-candidates.md`. I inspected the five current article shells, checked-in post template, editor renderer, XHS importer, manifest generator, and existing deterministic archive check. I did not inspect the other Round 12 evaluator.

## Delivery rubric

All dimensions use a 0–10 scale, where a higher number is better. `Regression / ownership` rewards a contained ownership surface and low regression exposure; `Maintenance coupling` rewards low ongoing coupling. A feature is selectable only if its evidence-backed total materially exceeds C0, not merely if it is implementable.

| Dimension | Weight | Delivery interpretation |
| --- | ---: | --- |
| Feasibility | 20% | Can the outcome be delivered completely in the current static-site architecture? |
| Progressive enhancement / accessibility | 15% | Does the semantic baseline work without JavaScript or fragile runtime state? |
| Regression / ownership | 15% | Is the change contained across current shells, both generators, template, shared runtime, and archive behavior? |
| Deterministic testability | 15% | Can parity, boundaries, failure paths, and destinations be proven locally? |
| Maintenance coupling | 15% | How little future synchronization or regeneration burden does the option introduce? |
| Net delivery value | 20% | After costs and risks, how much incremental visitor value remains beyond the current archive exit? |

## Weighted ranking

| Rank | Candidate | Feas. | Progressive / a11y | Regression / ownership | Testable | Maintenance coupling | Net value | Weighted |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | C0. Stop the Improvement Loop | 10.0 | 9.5 | 10.0 | 10.0 | 10.0 | 8.5 | **9.65** |
| 2 | C1. Quiet Static Archive Signature | 8.5 | 9.5 | 6.5 | 8.5 | 6.0 | 5.0 | **7.30** |
| 3 | C3. Static Generated Chronological Continuation | 6.0 | 9.0 | 4.5 | 7.0 | 3.0 | 5.0 | **5.78** |
| 4 | C2. One Runtime Chronological Continuation | 6.5 | 6.0 | 4.0 | 5.5 | 4.5 | 5.0 | **5.38** |
| 5 | C4. Topic-Based Continuation | 5.5 | 6.5 | 4.0 | 5.0 | 4.0 | 2.5 | **4.53** |

No feature comes close to C0, let alone materially exceeds it. The gap between C0 and the strongest feature is 2.35 weighted points.

## Candidate assessments

### 1. C0. Stop the Improvement Loop — 9.65

The present article ending already completes the essential task with an ordinary relative link to `../index.html#blog`. It is visible in all five current posts and exists in the checked-in template, editor renderer, and XHS importer. It does not depend on the shared script, manifest fetch, filename matching, or client state. The archive target itself now has a checked static baseline and JavaScript enhancement, so the exit remains useful through runtime failure.

C0 introduces no new ownership or regression surface and is fully verifiable with repository inspection plus the existing static archive contract. Its only deficit is editorial warmth, not function. At five heterogeneous posts, there is no behavioral or corpus evidence that warmer copy or another continuation link would produce enough benefit to offset even a small permanent synchronization burden. The listed reopen triggers are appropriately concrete and would change that evidence balance.

### 2. C1. Quiet Static Archive Signature — 7.30

C1 is technically straightforward and would retain excellent progressive enhancement: a semantic endcap with local links can work without JavaScript, keyboard behavior, or state management. Its text and destinations are also locally testable.

Its delivery surface is nevertheless broad relative to its gain. Complete ownership requires five current article files, `posts/new-post-template.html`, the editor renderer in `script.js`, the XHS importer renderer, styling, and a new parity check. Those points already disagree on some account destinations, which is evidence that duplicated shell ownership can drift. The current header identifies the site, the footer identifies Alex, and the same footer already links to the complete archive. Adding ownership copy, First Reads, and another archive route largely repeats established information after intimate writing. It is deliverable, but its net value is not close to C0.

### 3. C3. Static Generated Chronological Continuation — 5.78

A checked-in ordinary link would be accessible and resilient at read time, and chronological order can be derived deterministically from the manifest. Those are meaningful advantages over runtime insertion.

The generation contract is the problem. Every publication, date correction, deletion, filename change, or ordering change can alter two neighboring article files in addition to the manifest and homepage archive. The current manifest generator reads article files and rewrites only `posts.json` plus the marked homepage archive; making it rewrite source article shells creates a bidirectional pipeline with noisy multi-file diffs and new idempotence requirements. It must define oldest/newest edge behavior, preserve the existing archive fallback, avoid rewriting the checked-in template as a real post, and keep both independent article renderers compatible. Deterministic tests are possible, but the ongoing publication coupling is disproportionate for one extra link among five unrelated posts.

### 4. C2. One Runtime Chronological Continuation — 5.38

The manifest already exposes filename and date, so the happy path is feasible and chronological wording can avoid a false relevance claim. It also avoids rewriting neighbors when the corpus changes.

However, the visitor outcome would depend on a manifest fetch and correct matching of the current document to a Unicode filename. Complete delivery needs explicit behavior for newest and oldest edges, encoded and decoded paths, query/hash suffixes, missing or duplicate entries, malformed manifests, fetch failure, file protocol behavior, and self-link prevention. A no-JavaScript baseline must keep the current archive exit, making the new path nonessential by design. Tests would require extracting a pure selector plus a broad fixture matrix; browser checks alone would be too weak. This expands shared-runtime ownership and failure states for modest continuation value, so it does not clear the stop bar.

### 5. C4. Topic-Based Continuation — 4.53

C4 has the weakest evidence. Exact tags exist in the manifest, but five posts cannot support a credible topic graph: several tags are singleton or inferred, `生活` is too broad to imply affinity, and `小红书` denotes source rather than subject. Excluding broad and source tags further reduces the already sparse match set.

The implementation would inherit C2's runtime, filename, edge, fetch, and fallback obligations, then add tag eligibility, tie-breaking, explanation labels, and fixtures for missing or multiple matches. Ordinary link semantics can be accessible, but the selection logic would remain unavailable without JavaScript and hard to justify to readers. Transparent wording cannot manufacture relevance evidence. This option should not be implemented until explicit series or curated relationship metadata exists.

## Delivery gates and disqualifiers

- **C1:** reject partial ownership, duplicate archive routes without distinct value, promotional/recruiting copy, or any version that replaces the existing static archive escape.
- **C2:** reject relevance wording, self-links, ambiguous chronological direction, runtime-only removal of the fallback, or missing fixtures for Unicode paths, corpus edges, query/hash suffixes, absent matches, and fetch failure.
- **C3:** reject non-idempotent generation, unexplained neighbor rewrites, publication-order drift, destructive parsing of hand-edited articles, or failure to update both neighboring pages atomically.
- **C4:** hard-reject use of `生活` or `小红书` as evidence of reader relevance; also reject hidden tie-breaking, unsupported personalization language, or runtime behavior without deterministic selector fixtures.
- **All feature candidates:** complete ownership includes all five current posts, the checked-in template, editor renderer, and XHS importer wherever shell output changes. Visual QA may establish layout behavior but must not be described as assistive-technology or no-JavaScript proof.

## Exactly one recommendation

**Select C0. Stop the Improvement Loop.** None of C1–C4 materially exceeds the existing article-end experience after regression, ownership, testing, and maintenance costs are counted. Preserve the current semantic `Back to archive` route, perform final verification and documentation only, and reopen article-end work when one of the stated evidence triggers occurs: a corpus of at least 12 posts, genuine series metadata, reader evidence of end-of-article drop-off, or consolidation to one canonical article generator.
