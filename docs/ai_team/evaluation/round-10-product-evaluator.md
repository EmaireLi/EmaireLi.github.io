# Round 10 Product Evaluation

## Evaluation lens

This evaluation considers a first-time reader, recruiter, or technical reviewer and rewards improvements that make the site's proof-first archive more useful without overstating the depth of its five-post corpus.

Scores use a 1–10 scale. The weighted total is out of 10. Cost is scored inversely: a higher score means lower implementation and maintenance cost.

| Criterion | Weight | Product interpretation |
| --- | ---: | --- |
| Visitor value | 30% | Material improvement to discovery, comprehension, trust, accessibility, or continued reading. |
| Personal-brand / recruiting impact | 25% | Stronger clarity, credibility, or usefulness when Alex shares the site with a reviewer. |
| Strategic fit | 20% | Alignment with the proof-first, progressively enhanced static archive and its existing information architecture. |
| Evidence strength | 15% | How directly current repository evidence demonstrates the problem and supports the proposed response. |
| Cost | 10% | Rewards lower delivery and ongoing maintenance effort. |

## Repository evidence used

- The homepage already renders all five archive entries statically and enhances them with exact-tag buttons after loading `posts/posts.json`.
- `script.js` keeps the active archive tag in local runtime state only; filter clicks do not update the URL, reload state, or browser history.
- The current corpus contains only five posts and six uneven tags. `求职` is the only focused recruiter-oriented tag with more than one result; several other tags are broad, source-like, or single-post slices.
- The guestbook compose affordance appears before any warning that submissions become public, while the repository documents a public read/write API and no private visitor channel.
- Every current article has a local `Back to archive` route, but no article-level archive signature or continuation.
- The generator already owns deterministic article metadata and homepage archive output, making URL-filter validation against canonical tags practical without adding a service or taxonomy.

## Scores and ranking

| Rank | Candidate | Visitor value | Brand / recruiting | Strategic fit | Evidence | Cost | Weighted total |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | C1 Addressable Archive Filter State | 8.5 | 8.5 | 9.5 | 9.5 | 7.5 | **8.75** |
| 2 | C5 Filter Result-State Announcement | 7.5 | 6.5 | 8.0 | 9.0 | 9.5 | **7.78** |
| 3 | C2 Public Guestbook Safety Note | 7.0 | 6.5 | 7.5 | 9.0 | 10.0 | **7.58** |
| 4 | C3 Article Archive Signature | 6.5 | 7.5 | 7.5 | 8.5 | 8.5 | **7.45** |
| 5 | C4 Single Chronological Next Read | 6.5 | 6.5 | 7.5 | 8.5 | 6.0 | **6.95** |
| 6 | C6 Generated Static Topic Pages | 5.5 | 6.5 | 4.5 | 8.0 | 3.0 | **5.68** |

## Candidate judgments

### 1. C1 Addressable Archive Filter State

C1 completes an interaction the site already teaches visitors to use. A recruiter can share the exact `求职` slice, a reader can bookmark `ACGN`, and every visitor can reload or use back/forward without silently losing context. It adds no homepage density and makes the current archive feel like a coherent product surface rather than a transient widget.

The recruiting benefit is credible but should remain precise: only `求职` currently forms a focused multi-post recruiting slice. The feature's strongest brand signal is therefore not corpus depth but careful product and frontend engineering—Unicode validation, progressive enhancement, history semantics, parameter preservation, and deterministic invalid-state recovery.

**Risk gate:** Disqualify the implementation if it makes the static archive depend on JavaScript, accepts partial or stale tag matches, drops unrelated/repeated query parameters, loses `#blog`, creates duplicate history entries, or causes `popstate` to move focus or scroll. The selected button, rendered results, and URL must never disagree.

### 2. C5 Filter Result-State Announcement

C5 gives immediate, accessible confirmation of the chosen tag and result count. That is meaningful for screen-reader users and also reduces ambiguity for sighted visitors when the short archive changes. It is inexpensive and directly supported by the existing dynamic render path.

It ranks below C1 because it describes ephemeral state without making that state durable. A visitor still cannot share, reload, or traverse the chosen view. If delivered later, it should complement C1 and announce only genuine user-visible changes, not initial hydration or redundant rerenders.

**Risk gate:** Repeated announcements, an assertive live region, or counts that diverge from the visible entries would make the enhancement distracting or misleading.

### 3. C2 Public Guestbook Safety Note

This is strong trust hygiene at almost no delivery cost. The repository's guestbook is publicly readable, so warning before composition protects visitors from placing private recruiting or contact details in a public message. The value is especially concrete because there is no private alternative on the current site.

Its ceiling is limited: static copy cannot create a private channel, deepen portfolio evidence, or substantially improve the site's recruiting journey. It remains a worthwhile small follow-up, not the strongest single product improvement in this round.

**Risk gate:** The note must not imply privacy, moderation guarantees, availability, response time, or a private contact path that does not exist.

### 4. C3 Article Archive Signature

A quiet endcap would help direct article visitors understand authorship and find the curated or complete archive. This is most useful on imported XHS posts, where a visitor may otherwise experience the page as a detached note. It could modestly reinforce Alex's identity as the curator of a durable personal archive.

The existing global site shell and `Back to archive` link already provide much of this orientation, so the behavioral gain is limited. Applying it across all current shells and both generators also creates more maintenance surface than a homepage-only improvement.

**Risk gate:** Reject promotional resume copy, unsupported metadata, or a large component that intrudes on intimate writing. Exact parity across current pages and both generation paths is required.

### 5. C4 Single Chronological Next Read

One explicitly chronological link is more honest than a faux-related recommendation and could remove an archive round trip for article finishers. It also offers some inspectable generator/runtime discipline.

With five posts, however, chronology often connects unrelated subjects and offers little recruiter-specific value. Unicode current-file matching, edge handling, manifest failure, and generator parity create a broad regression surface for a modest continuation benefit.

**Risk gate:** Reversed chronology, self-links, guessed filename matches, relevance language, or removal of the archive fallback are disqualifying. An unmatched current file must render no next link.

### 6. C6 Generated Static Topic Pages

Static topic pages would provide durable, no-JavaScript routes, but the current corpus cannot support the proposed breadth. Generating six pages from five posts would make several routes thin or duplicative, enlarge the generated surface, and risk implying a mature taxonomy the archive does not yet have.

The idea may become valuable after the corpus grows. Today, C1 captures most of the practical sharing benefit while retaining one canonical archive and far lower maintenance cost.

**Disqualifier:** The present five-post, six-tag distribution is too sparse for six independently generated topic pages. Do not select C6 this round; reconsider only after multiple tags have enough distinct, durable entries to justify standalone pages.

## Recommendation

Select **C1 Addressable Archive Filter State** as the single Round 10 feature.

It has the strongest combined visitor, recruiting, and strategic value because it turns an already useful exact-tag filter into a dependable route without adding content claims or a new information architecture. Implement it as progressive enhancement over the complete static archive, preserve URL and history semantics exactly, and describe the result as addressable filter state—not as a Topic Hub.

## Rejected ideas

- **C5** is the best follow-up accessibility enhancement, but it leaves the larger share/reload/history gap unresolved.
- **C2** should remain in the backlog as low-cost trust hygiene; it cannot substitute for a private channel or stronger portfolio evidence.
- **C3** and **C4** offer modest direct-article improvements but do not beat C1's broader reuse of an established interaction.
- **C6** is rejected for this round because the corpus is too sparse for six useful standalone pages.
