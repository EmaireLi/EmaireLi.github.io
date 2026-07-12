# Round 10 Brainstorm — Brand and Product

## Evidence baseline

- The homepage already routes four visitor intents through `Start here`, then supplies a Proof Map, two project cases, a site-pipeline explanation, four manually curated First Reads paths, search, a complete static archive, and a public guestbook. A new top-level discovery layer would duplicate an unusually well-signposted homepage rather than repair a missing journey.
- Round 09 made all five articles available in source HTML. JavaScript now adds six exact-tag buttons plus `全部`, but `activeTag` exists only inside `initBlogAutoList()`. A click re-renders the archive without changing `location`, history, or a shareable control state.
- The corpus is still very small and uneven. `生活` appears on four posts, `小红书` on four, `求职` on two, while `技术`, `工具`, and `ACGN` each appear once. A topic URL can truthfully expose an exact filter, but it cannot yet claim a deep topical collection or recommendation system.
- First Reads already performs the editorial work that a taxonomy normally would: career has two articles, while tools, life, and ACGN each nominate one representative article. None of those cards currently hands off to a focused archive state.
- Every current article, including the long ACGN essay and short imported notes, ends with the same `Back to archive` footer. Direct article visitors receive no local authorship/archive context and no next reading choice.
- The opening Contact route promises “项目问题、阅读反馈、合作讨论,” but the destination says only “乐意与同行的你聊聊.” The form is a public guestbook and the repository documents that public messages cannot be edited or deleted by visitors, yet the interface does not disclose either fact before composition.
- Homepage external-account links point to Alex-specific profiles, while several existing article shells still link Bilibili, Xiaohongshu, GitHub, and Steam labels to generic platform homepages. Promoting those article-level destinations would currently reduce, not increase, identity trust.

## Challenge to the leading hypothesis

**Addressable Archive Topic Views solve a real state-continuity defect, but their present brand value is narrower than the name suggests.** Only `求职` has both a focused recruiter use case and more than one article without being a generic import/life label. `技术`, `工具`, and `ACGN` each produce a one-item view; `生活` and `小红书` are broad provenance/diary groupings rather than crisp evidence routes. The feature should therefore be framed as an exact, bookmarkable archive filter—not a Topic Hub, curated collection, or richer information architecture.

The strongest argument for implementing it now is infrastructural continuity: the state already exists, Round 09 supplied a resilient static baseline, and a validated URL contract can later connect First Reads and article endings. The strongest argument against selecting it now is immediate visitor impact: unless this round also rewires curated links—which would violate the one-feature boundary—most visitors will encounter the same buttons and the same five entries, with only reload/back/share behavior improved. A concise public-message warning fixes a more consequential trust failure for every person who reaches Contact, and a quiet article signature improves every direct article landing. Independent evaluators should decide whether durable URL behavior outweighs those more visible but less technically demonstrative gains.

## Personal brand perspective

### Candidate A — Addressable Archive Topic Views

**Single feature:** Give the existing exact-tag archive filter a validated URL state, restore it on load, and keep filter clicks synchronized with browser history while preserving the complete static archive as the fallback.

**Repository evidence / why now:** `script.js` already derives real tags, renders `aria-pressed` buttons, and filters the manifest; only the state contract is missing. Round 09 removed the largest progressive-enhancement risk by placing all five posts in `index.html` before JavaScript. The homepage describes the site as both proof-first portfolio and personal archive, so a link such as `?topic=求职#blog` can share that dual identity more honestly than a résumé-only page.

**Visitor value:** A recruiter can open or share the two-post `求职` trail; a reader can bookmark an exact slice; reload and back/forward stop discarding the visitor's choice. Invalid or absent state can return to `全部` without hiding content.

**Implementation shape and cost:** M. Parse one allow-listed parameter after manifest validation, preserve unrelated query parameters and `#blog`, update it on button activation with an intentional push/replace policy, listen to `popstate`, and keep the existing button semantics and no-JavaScript archive. Do not add copy buttons, counts, new tags, curated topic copy, or First Reads rewiring in this feature.

**Showcase effect:** Demonstrates product-aware URL design, progressive enhancement, encoded Chinese state, and accessible control synchronization in plain JavaScript.

**Risk:** The visible difference is subtle. Singleton and broad tags can overstate archive depth if the UI calls them “topics.” History updates, percent-encoding, invalid values, repeated parameters, and unrelated query preservation require deterministic tests. The feature should retain the current “tag” language even if the URL parameter is named `topic`.

## Hiring management perspective

### Candidate B — Public Contact Safety Note

**Single feature:** Add a concise, always-visible expectation block immediately before the existing guestbook action: messages are public, appropriate for project questions and reading feedback, and should not contain private recruiting or personal information.

**Repository evidence / why now:** `Start here` directs recruiting, project, reading, and collaboration intent to Contact, but the endpoint exposes a public form with no warning. README states that visitors can read all messages, cannot edit/delete them, and that the admin view records operational metadata. The current UI therefore asks a visitor to act before communicating the most important constraint.

**Visitor value:** A recruiter is less likely to post confidential contact details; a reader knows what the guestbook is for; everyone makes an informed choice before typing. This is error prevention, not merely warmer copy.

**Implementation shape and cost:** S. Add factual static copy and a visually quiet privacy line inside the current Contact block. Keep the same button, fields, API, and public-message list. Do not invent email, LinkedIn, response-time, availability, private delivery, or new intent cards.

**Showcase effect:** Shows responsible product communication and privacy-aware UX, which are strong trust signals even without new technical machinery.

**Risk:** It highlights that no private recruiting channel exists and may reduce message volume; that is an honest product constraint, not a regression. Copy must distinguish “do not post confidential details” from a claim that no server metadata is processed. A broad account guide would exceed this single feature and would inherit inconsistent article-shell URLs.

## Independent product builder perspective

### Candidate C — Article Archive Signature

**Single feature:** Add one static, tone-neutral endcap to every article identifying it as part of Alex's personal archive and offering two stable local exits: curated First Reads and the complete archive.

**Repository evidence / why now:** All five articles and the new-post template terminate in an identical global footer with only `Back to archive`. The homepage carefully explains why engineering proof and personal writing coexist, but a visitor arriving directly from XHS or a shared article does not receive that context. Existing editor and importer templates make parity a concrete maintenance requirement.

**Visitor value:** Readers understand whose archive they are in and can choose curation or chronology after finishing a post. The feature works equally for intimate writing, a utility note, and the long ACGN essay without claiming that any one post proves professional capability.

**Implementation shape and cost:** S–M. Add the same semantic endcap to five current posts, `new-post-template.html`, `renderPostHtml()`, and the XHS importer template; use ordinary local links and no runtime recommendation logic. Keep the global footer and no-JavaScript behavior intact.

**Showcase effect:** Extends the site's editorial identity through direct-entry pages and demonstrates publishing-path consistency.

**Risk:** The handoff is useful but not personalized, so engagement gain may be modest. Promotional or résumé-like wording would be intrusive after vulnerable personal posts. Repeating date/tags would require generator-backed metadata parity and is unnecessary for the minimal version.

### Candidate D — Chronological Next Read

**Single feature:** At each article ending, expose exactly one deterministic “Next in the archive” link based on manifest chronology, with a static complete-archive link as fallback.

**Repository evidence / why now:** The five articles already form an ordered manifest, yet every reading journey stops at the same archive footer. Chronology is truthful across the entire corpus, unlike “related” selection: it does not depend on broad tags, singleton categories, scoring, embeddings, or an editorial claim the repository cannot support.

**Visitor value:** A reader can continue through the archive without returning to and re-scanning a very long homepage. One link keeps the end of a personal essay calm and understandable.

**Implementation shape and cost:** M. Match the decoded current filename against `posts/posts.json`, choose one documented chronological direction with wrap/no-wrap behavior, and enhance a shared article-end placeholder. Update current pages and both publishing generators; retain ordinary local archive navigation if fetch, matching, or JavaScript fails.

**Showcase effect:** Demonstrates transparent content-model reuse and resilient progressive enhancement without false AI branding.

**Risk:** With five posts, the next item may cross abruptly from an intimate diary note to a payment tutorial. Chronology is explainable but not necessarily desirable continuity. Filename encoding, direct `file://` use, manifest failure, and duplicate initialization expand the QA surface. This should not be labeled “recommended” or “related.”

## Startup product management perspective

### Candidate E — First Reads Completion Cue

**Single feature:** Add one compact static completion cue at the end of First Reads that sends visitors to the full archive and explicitly states that five posts are currently available, without creating topic routes or new cards.

**Repository evidence / why now:** First Reads is the site's deliberate editorial acquisition surface and sits immediately above the archive, but its closing copy only says to continue below. The static archive now has a reliable five-item baseline, so the transition can be explicit and truthful without JavaScript.

**Visitor value:** A first-time reader sees where curation ends and the complete record begins, understands the small corpus honestly, and can jump directly to it with an ordinary anchor.

**Implementation shape and cost:** S. Add a quiet local link/count line derived during the existing manifest generation or worded without a dynamic count. Do not add topic links, filter state, recommendation logic, or another homepage section.

**Showcase effect:** Shows editorial funnel clarity and restraint, though it is a modest engineering demonstration.

**Risk:** The archive is already directly below First Reads, so this may be redundant and deliver little behavior change. A hard-coded count can drift; generator ownership outside the current archive markers would broaden implementation risk. It should rank below features that repair an actual state or trust defect.

## Candidate comparison for downstream deduplication

| Candidate | Primary journey repaired | Immediate reach | Cost | Main risk |
| --- | --- | --- | --- | --- |
| A. Addressable Archive Topic Views | Filter → reload/share/back | Archive users; strongest for the two-post `求职` slice | M | Subtle payoff and overstated singleton “topics” |
| B. Public Contact Safety Note | Intent → informed public message | Every Contact visitor | S | Exposes absence of a private channel |
| C. Article Archive Signature | Direct article → site context | Every direct/finishing reader | S–M | Can feel promotional if tone is wrong |
| D. Chronological Next Read | Article finish → another article | Every finishing reader | M | Chronological adjacency can be tonally abrupt |
| E. First Reads Completion Cue | Curated reading → full corpus | Homepage readers | S | Likely redundant with adjacent archive |

## Research recommendation to evaluators

Retain **A, B, C, and D** for independent scoring; reject **E** unless another worker finds measured confusion at the First Reads/archive boundary. A remains the strongest technical/product-system candidate, but it should not win merely because it was carried forward: evaluators should discount singleton topic depth and score the actual gain—share/reload/history continuity. B has the clearest high-severity trust benefit and lowest cost. C has the broadest editorial-authenticity benefit for direct landings. D is the strongest content-continuity alternative only if its deliberately chronological, one-link contract is considered tonally acceptable.

Do not combine these in Round 10. In particular, addressable filters plus First Reads links, article tag returns, or an article continuation block would be feature accumulation even if they share a data source.
