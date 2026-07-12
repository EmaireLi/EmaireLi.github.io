# Round 09 Brainstorm — Brand and Product

## Evidence baseline

- The homepage already gives four explicit entry routes, a proof map, project cases, a site-pipeline explanation, four curated First Reads paths, search, and a manifest-backed archive. Adding another opening-level chooser would mostly duplicate a journey that is already well signposted.
- The corpus is still only five posts. The manifest has useful dates and tags, but tag supply is uneven: `生活` appears on four posts, `小红书` on four, `求职` on two, `ACGN` on one, `工具` on one, and `技术` on one. That limits how confidently the site can claim a “related” continuation.
- Every current article ends with the same `Back to archive` footer. There is no local editorial handoff after either a short utility note or a long personal essay.
- First Reads already curates four distinct identity threads—career, tool/workflow, life archive, and ACGN longform—but those editorial choices are not carried into article endings or addressable archive state.
- The archive filter is useful inside the homepage but cannot be linked with its selected topic. A recruiter or reader cannot share a focused career/technical slice, and First Reads cannot hand off into an already-filtered archive.
- Contact says only “乐意与同行的你聊聊” and offers a public guestbook. It does not explicitly warn that messages are public. The six external-account links state platform names but not what each destination is for.
- Several article shells still expose generic platform homepages for some account links, while the homepage has Alex-specific destinations. Any article-end feature that promotes external identity must first avoid amplifying this inconsistency.

## Candidate 1 — Addressable Archive Topic Routes

**Feature:** Make the existing archive topic filter reflect a small, human-readable URL state such as `#blog?topic=求职` or a query parameter, restore that state on load, and give each real topic a copyable local link.

**Evidence and why now:** The filter and manifest data already exist, so the missing capability is not another discovery surface but persistence and handoff. First Reads explicitly presents career, tools, life, and ACGN routes; today those routes terminate in a single article or an unfiltered archive. A focused `求职` or `技术` view is especially valuable when Alex sends the site to a recruiter because it keeps personal writing present without making a reviewer sift through all five posts.

**Visitor value:** A recruiter can receive a truthful career/technical slice; a reader can bookmark a topic; First Reads and future article endcaps can link to a meaningful archive state. Back/forward navigation also becomes predictable if state handling is disciplined.

**Scope:** S–M. Reuse the current filter controller and real manifest tags; parse one topic value, validate it against available tags, update the URL without reload, restore it on page load, and preserve a plain `#blog` fallback. Add no taxonomy and claim no personalization.

**Risk:** Non-Latin URL encoding and hash/query interaction can be fragile. With only five posts, some topic routes contain one result, so the UI must show honest counts and must not present every singleton tag as a major editorial category.

**Brand/product impact:** Strong. It turns the archive into a shareable evidence surface and connects the curated homepage story to the complete writing trail without adding more homepage length.

## Candidate 2 — Editorial Continue Reading, Not “Related Posts”

**Feature:** Add one compact end-of-article handoff: one deterministic next read plus a link to the relevant archive topic and the full archive. Label the rule plainly—such as “Next in the archive” or “More under 求职”—instead of implying algorithmic relevance.

**Evidence and why now:** All five articles currently stop at a generic archive link, so there is a real journey break. The manifest and First Reads provide enough local evidence for a restrained handoff. However, the small and uneven corpus does **not** support two or three convincing “related” recommendations on every page.

**Visitor value:** Readers who finish a utility note or long essay get one clear next action without returning to the homepage and reorienting. The endcap can keep Alex’s personal archive voice intact by offering a quiet editorial route rather than a conversion panel.

**Scope:** M. Resolve the current filename exactly, fetch the existing manifest, choose one transparent rule—same meaningful tag when available, otherwise chronological neighbor—and render into an article-end placeholder. Keep the static `Back to archive` fallback and update all current shells plus both generators in parity.

**Risk:** The carried-forward idea becomes weak if it renders a carousel or calls broad tags such as `生活` and `小红书` “related.” Generator parity and encoded filenames add delivery surface. An injected block after an intimate essay can feel mechanistic unless it is visually quiet.

**Brand/product impact:** Medium–strong. It closes the reading loop and demonstrates editorial restraint, but its present conversion ceiling is only five articles. It should win only if the implementation is explicitly singular and explainable; a generic multi-card Continue Reading system is premature.

## Candidate 3 — Public Contact Intent Guide

**Feature:** Turn the existing Contact introduction into a concise, honest guide: what public messages are welcome, what should not be posted, and which existing external destinations are appropriate for code versus personal interests. Keep one guestbook form and the existing URLs.

**Evidence and why now:** Start Here promises project questions, reading feedback, and collaboration, yet the eventual contact surface supplies only a generic sentence. The guestbook is public by product design, but the interface does not say so before composition. This is a conversion and trust gap, not merely a copy-polish opportunity.

**Visitor value:** A recruiter avoids posting confidential details publicly; a technical reviewer knows project questions are welcome; a reader can leave feedback with the right expectation. Purpose labels help people choose GitHub, Bilibili/XHS, Bangumi, or LeetCode without exploratory outbound clicks.

**Scope:** S. Add static intent/privacy copy around the existing compose action and short factual descriptors near existing account links. Do not add prefill, a fake private channel, response-time promises, availability claims, or new external accounts.

**Risk:** This cannot solve the absence of private contact. Too many intent cards would over-formalize a warm personal site and make the final section longer. Article-shell account URLs should not be promoted until their destinations are verified and made consistent.

**Brand/product impact:** Strong on honesty and trust, moderate on recruiting conversion. It improves the credibility of the endpoint even though it cannot create a private recruiting funnel.

## Candidate 4 — Article Closing Signature

**Feature:** Add a static, tone-neutral closing signature to every article: “Part of Alex’s personal archive,” the manifest-backed date/tags, and two local exits—First Reads and Archive. No recommendation ranking.

**Evidence and why now:** The homepage carefully explains that the archive preserves both engineering evidence and real life, but direct article visitors never receive that framing. They see a generic site header and then an abrupt `Back to archive` footer. A closing signature can establish authorship and archive context without pretending the post is professional proof.

**Visitor value:** Direct visitors understand whose archive they are in and can deliberately move either to curated reading or the complete chronology. This is particularly useful for XHS-synced posts that may otherwise feel like detached imports.

**Scope:** S–M. Add one shared article-end component to current shells and both generators, using only metadata already present in each page or the manifest. Preserve the existing footer as fallback.

**Risk:** It overlaps Continue Reading without delivering a specific next article, so engagement gain may be modest. Resume-like brand language would be intrusive after personal posts; wording must stay archival, not promotional.

**Brand/product impact:** Medium. It improves editorial continuity and direct-landing clarity with lower recommendation risk than Continue Reading.

## Candidate 5 — First Reads to Archive Handoff

**Feature:** At the end of the existing First Reads section, add one compact “Continue exploring” row that links each curated path to its matching addressable topic view, while leaving the four featured articles unchanged.

**Evidence and why now:** First Reads is the strongest editorial articulation of Alex’s multidimensional identity, but each card currently offers only one article and no next-level route. The archive immediately below is complete but generic. A restrained bridge would turn curation into a two-step journey: representative read first, broader archive second.

**Visitor value:** Visitors can deepen the exact thread that brought them in without scanning unrelated entries or repeating a search. Recruiters can continue from the career story into other job-related notes; personal readers can stay within life or ACGN.

**Scope:** S if Candidate 1’s addressable state exists; otherwise M and inseparable from URL-state work. Use only real topic counts and suppress routes that would merely repeat the same singleton article.

**Risk:** As a standalone feature it depends on functionality that is currently absent. With the corpus this small, several paths have no second article, so an unconditional four-link row would overpromise depth.

**Brand/product impact:** Medium now, stronger as the archive grows. It is a good consequence of addressable topics, but a weak first choice by itself.

## Comparative recommendation

1. **Addressable Archive Topic Routes** is the strongest Round 09 candidate. It is a compact product capability, creates honest shareable recruiter/reader journeys, reuses an existing surface, and becomes infrastructure for future handoffs without adding a second navigation system.
2. **Editorial Continue Reading** is the strongest direct-reading alternative, but only in a reduced one-choice form with transparent rules. The carried-forward multi-recommendation framing should not win: five posts and broad/singleton tags cannot sustain a credible “related content” promise.
3. **Public Contact Intent Guide** has the clearest trust benefit and lowest implementation risk. It should outrank Continue Reading if evaluators prioritize honest conversion over reader depth.
4. **Article Closing Signature** is safer than recommendations but less behaviorally useful.
5. **First Reads to Archive Handoff** should follow addressable topics rather than be selected independently.

The key product judgment is that Round 09 should connect existing strong surfaces instead of adding another homepage layer. Addressable topic state connects curation, archive, recruiter sharing, and later article handoffs; Continue Reading currently connects only five article endings and risks overstating relevance.
