# Round 12 Delivery / Stop-Condition Research

## Lens and inspected evidence

This is an independent delivery-risk review of the article-end opportunity. I inspected all five checked-in post shells, `posts/new-post-template.html`, the editor renderer in `script.js`, the XHS renderer in `scripts/import-xhs-notes.js`, `scripts/generate-posts-manifest.js`, `posts/posts.json`, and the archive/search runtime.

The current system already provides a truthful, durable end state:

- every one of the five current posts has exactly one ordinary `Back to archive` link;
- that link resolves to the now static-first `#blog` archive, so it remains useful without JavaScript or a manifest fetch;
- the manifest contains exactly the same five filenames and is deterministically sorted newest-first;
- the corpus spans personal/job-search notes, ACGN criticism, and a payment tutorial. Its shared tags are too broad to prove semantic relationship;
- future article-shell ownership is split across three independent sources: the hand-authored template, editor renderer, and XHS importer.

The delivery bar for another article-end feature should therefore be higher than “adds one more link.” It must provide a materially clearer next action than the existing archive route, remain truthful for every article, and justify both current-shell parity and future-generator parity.

## Quantified ownership and regression surface

| Option | Minimum production ownership | Ongoing ownership | Distinct failure modes that need coverage | Incremental value over today |
| --- | ---: | ---: | --- | --- |
| A. Quiet static archive signature | 5 current posts + template + editor renderer + XHS importer + CSS = **9 touchpoints** | 3 future shell sources must retain copy/markup parity | duplicated or drifting copy; footer/signature redundancy; mobile wrapping; article-tone mismatch; archive href parity | Low: all five pages already identify Alex in the footer and expose `Back to archive` |
| B. One chronological continuation, runtime-derived | shared runtime + article hook/markup in 5 posts + 3 shell sources + CSS = **10 touchpoints**, plus manifest contract | filename matching and manifest ordering become navigation contracts | Unicode/encoded pathname mismatch; direction-label ambiguity; newest/oldest terminal state; same-date ordering; fetch/JSON failure; stale manifest; JS-disabled state; duplicate escape routes; focus/layout regression | Low-to-moderate: one extra post is reachable, but chronology does not imply relevance in this heterogeneous five-post corpus |
| C. One chronological continuation, statically hardcoded | 5 posts + 3 shell sources + CSS, plus a new regeneration/rewriting mechanism if parity is to remain deterministic = **at least 9 touchpoints** | each new post must update itself and at least one existing boundary post, or all shells must be regenerated | stale neighbor links; accidental content overwrite during regeneration; direction/terminal errors; encoded filenames; generator disagreement | Same visitor value as B with higher publication coupling |
| D. Tag/topic continuation | runtime + hooks in 8 shell locations + CSS + selection rule = **10+ touchpoints** | tag taxonomy and tie-breaking become public recommendation contracts | broad tags (`生活`, `小红书`) presented as relevance; unstable ties; zero/one-result states; fetch failure; misleading reason labels | Weak: current tags support filtering, not a defensible “related article” promise |
| E. No new article-end feature | **0 production touchpoints** | none | existing archive link remains the sole contract | Preserves the clearest current action and avoids adding unsupported hierarchy |

The counts deliberately exclude documentation and QA artifacts; including them would increase every implementation option further. They also understate runtime chronology cost because `script.js` already owns archive, search, editor, gallery, guestbook, and navigation behavior. Adding article adjacency expands the regression scope of that shared file even if the line diff is small.

## Test surface by option

### A. Static archive signature

The minimum credible gate is not a single visual spot-check. It requires a parity assertion across five current shells and all three future shell sources; link-resolution checks from the nested `posts/` path; mobile checks for the shortest and longest titles/content endings; and a no-JavaScript check. The signature must also remain visibly distinct from, but not redundant with, the existing copyright/footer row. There is no observed visitor failure that would make this breadth proportionate.

### B/C. Chronological continuation

A deterministic adjacency feature requires at least these cases:

1. all five Unicode filenames resolve to exactly the expected manifest entry;
2. newest, three middle, and oldest articles expose the correct terminal behavior;
3. “newer” versus “older” wording agrees with the manifest's newest-first ordering;
4. missing, malformed, empty, and stale manifests preserve the static archive escape route;
5. encoded and decoded pathnames behave identically;
6. JavaScript-disabled pages remain complete;
7. keyboard focus order and narrow/mobile wrapping remain usable;
8. a newly created editor post and a newly imported XHS post do not ship a broken or misleading neighbor;
9. any static generation path proves it does not overwrite article bodies while refreshing adjacency.

That is a substantial contract for one chronology-based link. Chronology is transparent, but in this corpus it is not a strong proxy for reader intent: the newest tutorial, an anime essay, and personal life notes do not form an evidenced sequence.

### D. Another article-end improvement: topic continuation

The manifest does make tag links technically possible, especially now that archive filter state is addressable. However, four of five posts carry `生活`, four carry `小红书`, and the remaining narrower categories do not form a consistently useful pair. A rule such as “first non-XHS tag” would be an editorial taxonomy policy invented for the feature, not evidence already maintained by the site. Sending readers to an archive filter could be honest if labeled literally, but it still duplicates the existing archive escape route while adding rule and parity tests.

## Benefit/cost decision

No feature clears a reasonable benefit/cost bar in Round 12.

- **A does not clear the value bar.** A quiet “part of Alex's archive” sentence would reinforce identity, but the page footer already says `© Alex` and `Back to archive`. The proposed feature is mostly copy duplication spread across nine production touchpoints.
- **B is the strongest implementation candidate but still does not clear the bar.** It offers a measurable extra click path, yet asks a shared runtime and a five-post, Unicode-heavy corpus to support at least nine behavioral edge cases. With heterogeneous subjects, the link is merely adjacent, not meaningfully better than letting the reader choose from the complete archive.
- **C is dominated by B.** It removes fetch dependence but introduces publication-time rewrites and stale-boundary risk that the current one-way manifest generator does not own.
- **D lacks evidence.** Existing tags are suitable as explicit archive filters, not as article-level relevance claims.
- **E is the recommended decision.** Preserve the static `Back to archive` link as the honest article-end action and stop adding product surface solely to keep the loop moving.

## Stop-condition recommendation

Round 12 should select the explicit no-feature option and stop the AI-team improvement loop after recording the decision and verifying the already-delivered rounds. The remaining article-end idea is now a content-scale trigger, not an implementation backlog item.

Reopen chronological or topic continuation only when one of these observable conditions becomes true:

- the corpus grows enough that returning to the complete archive imposes a real discovery burden (a practical review trigger is **12 or more posts**);
- analytics or direct reader feedback shows article-end abandonment or requests a next-reading path;
- a genuine multi-part series introduces author-maintained sequence metadata;
- the publishing pipeline gains one canonical post-shell/adjacency generator, reducing the current three-source parity burden.

Until then, stopping is the higher-quality delivery decision. It protects the site's restrained archive tone, avoids claiming relevance that the data cannot prove, and leaves every direct article landing with a complete, progressive, already-tested route back to discovery.
