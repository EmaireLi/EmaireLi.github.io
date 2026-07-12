# Round 09 Product Evaluation

## Evaluation lens

This evaluation prioritizes the experience of a first-time reader or recruiter while rewarding features that strengthen the site's stated identity as a durable, proof-first personal archive.

Scores use a 1–10 scale. The weighted total is out of 10.

| Criterion | Weight | Product interpretation |
| --- | ---: | --- |
| Visitor value | 30% | How materially the feature improves discovery, comprehension, trust, or continued reading. |
| Personal-brand / recruiting impact | 25% | How clearly it strengthens Alex's credibility, range, or usefulness to a reviewer. |
| Strategic fit | 20% | How well it connects existing product surfaces without adding a conflicting information architecture. |
| Evidence strength | 15% | How directly current repository evidence proves the problem and supports the proposed solution. |
| Cost | 10% | Rewards lower delivery and maintenance effort; a higher score means lower cost. |

## Repository evidence used

- The canonical archive is an empty `<ul id="blog-auto-list">` in `index.html`; all five entries appear only after `posts/posts.json` is fetched and rendered by JavaScript.
- The homepage already contains search, four curated First Reads lanes, and exact-tag archive filters. Topic selection is not represented in the URL.
- All five current articles end with the same `Back to archive` link and no article-local continuation.
- The corpus is small and its tags are uneven: `生活` and `小红书` are broad/source-like labels, while several other tags occur on only one article.
- Contact offers a public guestbook but does not state its public nature before composition.
- A source scan finds no authored `h2`–`h6` elements in any of the five current article files, including the long 京吹 essay.
- `scripts/generate-posts-manifest.js` already deterministically owns manifest ordering and metadata extraction, providing a credible source for a generated static archive baseline.

## Scores and ranking

| Rank | Candidate | Visitor value | Brand / recruiting | Strategic fit | Evidence | Cost | Weighted total |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | C1 Static Archive Baseline | 9.0 | 8.5 | 9.0 | 9.5 | 6.5 | **8.70** |
| 2 | C2 Addressable Archive Topic Views | 8.0 | 8.5 | 9.0 | 9.0 | 8.0 | **8.48** |
| 3 | C4 Public Contact Intent Guide | 7.0 | 8.0 | 8.0 | 9.0 | 9.5 | **8.00** |
| 4 | C3 Transparent Chronological Continuation | 7.5 | 7.5 | 8.5 | 8.5 | 6.5 | **7.75** |
| 5 | C5 Article Closing Signature | 6.5 | 7.5 | 7.5 | 8.5 | 8.5 | **7.45** |
| 6 | C6 Longform Article Contents Navigator | 5.0 | 6.5 | 5.5 | 4.0 | 6.0 | **5.43** |

## Candidate judgments

### 1. C1 Static Archive Baseline

This fixes the clearest contradiction between product promise and implementation: a site presented as a durable archive currently loses its complete archive under a script or fetch failure. The benefit covers every article and every visitor, not just people who activate a filter or finish a post. It also creates unusually strong recruiting evidence for a static personal site: progressive enhancement, deterministic generation, explicit ownership boundaries, escaping, and idempotency are inspectable engineering decisions rather than decorative claims.

The cost is meaningful because a generator will own a marked region of a hand-authored homepage. That lowers its cost score, but the repository already has a manifest generator and a five-entry canonical dataset, so the delivery path is concrete and testable.

**Risk gate:** Do not ship if marker matching is permissive, a second generator run changes output, manifest entries can be duplicated, or fetch failure clears the static baseline. These would reverse the feature's central reliability claim.

### 2. C2 Addressable Archive Topic Views

This is the strongest product-growth alternative. It converts an existing filter into a shareable recruiter/reader route without adding homepage density. Exact `求职` or `技术` URLs could be useful in targeted review, and history semantics make the filter feel complete.

It ranks narrowly below C1 because every topic view still depends on the same currently fragile JavaScript-only archive. The small corpus also means several shareable routes expose a single article, limiting the strength of the recruiting slice today. It is valuable infrastructure, but C1 establishes the more fundamental archive contract first.

**Risk gate:** Invalid or stale tags must resolve to `全部`; Unicode state, unrelated query parameters, `#blog`, back/forward, `aria-pressed`, and focus behavior must remain coherent. A URL that visually claims a topic while rendering another is disqualifying.

### 3. C4 Public Contact Intent Guide

This has a direct trust benefit: a recruiter or reader should know before typing that the guestbook is public and should not contain private details. It is low-cost, evidence-backed, and honest about the lack of a private channel. Its ranking is constrained because copy cannot create the missing private recruiting path or materially deepen the existing body of work.

**Risk gate:** The guide must not imply privacy, guaranteed replies, availability, or a private endpoint. A large intent matrix would also be disproportionate to the warm, low-pressure contact section.

### 4. C3 Transparent Chronological Continuation

The article-end journey break is real, and explicit newer/older chronology is truthful where “related” recommendations would not be. It could improve reading depth and demonstrate careful Unicode-path and progressive-fallback handling.

Its product ceiling is lower than C1/C2 with only five posts: chronology can connect subjects that have little in common, and every current shell plus both generators creates a broad maintenance surface for a modest component. It should remain visually quiet and must never be framed as relevance or personalization.

**Risk gate:** Reversed newer/older labels, self-links, missing edge handling, or replacement of the static archive fallback are disqualifying. If the current filename cannot be matched exactly, render no continuation rather than guess.

### 5. C5 Article Closing Signature

This would improve authorship and archive context for direct landings, especially imported XHS notes, with less recommendation risk than C3. However, the global header/footer and local archive link already communicate basic ownership. The incremental behavior change is therefore modest, while promotional wording after intimate writing could weaken the site's authentic voice.

**Risk gate:** Avoid resume language, unsupported metadata, or a signature large enough to compete with the article ending. Shell/generator parity is mandatory.

### 6. C6 Longform Article Contents Navigator

The long 京吹 essay clearly has a scanning problem, but the proposed trigger depends on three or more authored headings and the current file contains no `h2`–`h6` elements. As written, the feature would not appear. Making it useful would first require an editorial restructuring of the article or an unreliable inference of headings from prose, neither of which is included in the candidate contract. It also benefits only one of five posts.

**Disqualifying evidence:** No current article satisfies the stated three-heading threshold. Do not select C6 unless authored heading structure becomes an explicit, reviewed part of the scope; do not infer a table of contents from bold text or paragraph content.

## Recommendation

Select **C1 Static Archive Baseline** as the single Round 09 feature.

It delivers the broadest visitor benefit, makes the site's archival identity true under failure, and creates the strongest inspectable engineering proof for recruiters. C2 should follow once the archive has a reliable semantic baseline; at that point addressable topics can enhance a complete underlying document instead of exposing another state of a JavaScript-only shell.
