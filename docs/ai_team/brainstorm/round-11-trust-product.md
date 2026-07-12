# Round 11 — Trust / Product Research

## Lens and evidence

This review asks a narrow question: what single change most improves an informed visitor's relationship with Alex without manufacturing a recruiting funnel or a service promise?

The current site has a warm invitation — “这里是个记录旅程的地方，乐意与同行的你聊聊” — followed by a button labelled only “留言” (`index.html:539–543`). The form then asks for `From` and a message, but gives no visibility or privacy context before submission (`index.html:546–562`). That omission matters because the actual product is unambiguously public:

- `GET /messages` is a public route, while only `/admin/messages` requires an admin token (`guestbook/worker.mjs:123–142`, `326–329`).
- The public response contains `signature`, `message`, and timestamps (`guestbook/worker.mjs:123–135`).
- The homepage renders each returned signature and message into the visible guestbook list (`script.js:686–727`).
- After a successful submission, the client immediately fetches the list again and renders it (`script.js:908–919`).

The recruiting/contact truth is therefore: this is a public guestbook, not a private contact channel. “联系我” is emotionally warm but can be read as a private route by a recruiter or collaborator landing with contact intent. The site must correct that interpretation before typing, without inventing email, response-time, availability, moderation, deletion, or privacy guarantees.

Direct article landings have a separate, real but less harmful context gap. Every current article ends in the global footer with the English utility label `Back to archive`; there is no closing sentence establishing that the article belongs to Alex's personal archive. The same footer is also emitted by the editor and XHS importer (`script.js:318–327`; `scripts/import-xhs-notes.js:373–382`). This costs brand warmth and orientation, but it does not expose a visitor's own words.

## Challenge to “Public Guestbook Safety Note”

The hypothesis is directionally right but the name and likely treatment are risky.

Calling it a **safety** note would imply a level of protection the product does not establish. The repository proves public display, length limits, rate limiting, unique signatures, and administrator edit/delete capabilities; it does not prove pre-publication moderation, confidentiality, guaranteed removal, a response policy, or that disclosure of sensitive information can be made safe. A warning-styled card could also turn the site's warmest human invitation into compliance copy.

The useful product is not a “safety note.” It is a **plain visibility disclosure at the decision point**. Recommended wording:

> 留言会公开显示在这里，请不要留下邮箱、手机号等私密信息。

This wording says only what current behavior supports. It should remain visible before the compose button is pressed and while the form is open. It should not say “我们保护你的隐私,” “审核后展示,” “可随时删除,” “我会回复,” or “用于招聘请联系…”. The note should read as a quiet courtesy, not an alert.

I would also consider changing the button label from `留言` to `写公开留言`. That makes the action itself intelligible out of context and helps screen-reader/button-only navigation. I would **not** rename the section heading from `联系我` in this round: the surrounding public disclosure can remove ambiguity while preserving the personal warmth and existing anchor.

## Single-feature candidates

### 1. Informed Public Guestbook Entry — recommended

**Feature.** Add one quiet, always-visible disclosure beside the guestbook invitation and rename the compose action to `写公开留言`. Keep the form fields, list, API, submission flow, and `#contact` anchor unchanged.

**Evidence / visitor value.** The visitor currently supplies identity-like text before the interface states that both fields are returned through a public endpoint and rendered on-page. Disclosure before interaction restores informed use. Recruiters also stop mistaking the only contact surface for a private message channel, without the site falsely offering an alternative.

**Brand effect.** High trust gain with low tonal cost if styled as muted helper copy. It communicates care through precision rather than legal language.

**Scope.** `index.html` copy plus a small reusable helper style in `styles.css`; optionally connect the disclosure to the form with `aria-describedby` so it remains programmatically available after expansion. No Worker or JavaScript behavior change is required.

**Risks.** A warning icon, red treatment, “privacy” heading, or long list of prohibited content would feel institutional. `邮箱、手机号` are examples, not a complete privacy policy; wording must avoid implying exhaustive protection. If the note disappears when the compose button hides, the feature fails its informed-use purpose.

**Why now.** This is the only identified gap where a visitor can make an irreversible public disclosure under an ambiguous label. It should precede improvements that merely increase reading depth.

### 2. Personal Archive Closing Signature

**Feature.** Place a restrained closing block after every article body: a short line such as `这是 Alex 个人归档中的一篇记录。` and one explicit link `回到全部文章 →`. Keep it distinct from the copyright footer.

**Evidence / visitor value.** All five current post shells end with only `Back to archive`; direct visitors receive no explanation of the site's archive identity. The site header says `个人归档站`, so the proposed identity claim is already supported. This turns an abrupt article ending into a human handoff and explains what the destination contains.

**Scope.** All five posts, `posts/new-post-template.html`, the editor renderer in `script.js`, and the XHS importer template. A small style block would be needed. Deterministic parity checks are essential because future posts come from two generators.

**Risks.** Repeating the site identity too loudly can feel self-promotional; adding project/contact CTAs would turn a reflective ending into a recruiter funnel. Changing only current posts would create immediate template drift.

**Why now.** The archive is now static, filterable, and addressable, so `全部文章` is a truthful destination. Still, the value is navigational/brand polish rather than protection from visitor harm, so it ranks second.

### 3. Transparent Chronological Continuation

**Feature.** Add exactly one date-derived `上一篇` or `下一篇` article link at each article ending, with the linked title visible; derive the order from `posts/posts.json` rather than claiming semantic relatedness.

**Evidence / visitor value.** The corpus has five dated posts, sufficient for chronology but too small and heterogeneous for credible “related posts.” A single transparent continuation gives a direct landing one more authentic reading choice without claiming recommendation intelligence.

**Scope.** A generator or manifest-aware build step, current posts, and both post-production paths. Endpoint posts must clearly fall back to the archive rather than wrap around invisibly.

**Risks.** Chinese `上一篇/下一篇` direction is often interpreted inconsistently; titles and dates should carry the truth. Any client-only fetch makes the ending weaker under failure. Manual neighbor links will drift whenever posts are imported.

**Why now.** Addressable archive state makes deeper reading useful, but chronological navigation optimizes consumption before the site has made its public contact interaction fully informed.

### 4. Verified Account Destinations Across Article Shells

**Feature.** After destination verification, make article-shell account links point to the same specific profiles as the homepage instead of generic service roots.

**Evidence / visitor value.** The homepage names specific Bilibili, XHS, GitHub, Steam, Bangumi, and LeetCode profiles (`index.html:592–598`), while current article shells still send several labels to service homepages. A recruiter landing directly on an article could reasonably interpret a `GitHub` account link as Alex's GitHub, but it currently points to `https://github.com/` in the checked-in posts.

**Scope.** Five posts, the static template, editor renderer, and XHS importer. Verify every destination externally before promotion; do not infer that every homepage URL belongs to Alex merely because it is present.

**Risks.** This is a trust regression if even one identity mapping is wrong. It also creates broad shell churn for a secondary navigation surface. Without external verification, implementation would violate Round 11's truthfulness constraint.

**Why now.** The inconsistency is real and recruiting-relevant, but it is not ready **now**: the project understanding explicitly records destination verification as missing. Keep it as a queued audit, not the selected implementation.

## Product ranking

| Rank | Candidate | Visitor truth | Brand warmth | Recruiting/contact clarity | Delivery confidence |
| --- | --- | ---: | ---: | ---: | ---: |
| 1 | Informed Public Guestbook Entry | Very high | High | Very high | Very high |
| 2 | Personal Archive Closing Signature | High | Very high | Medium | High |
| 3 | Transparent Chronological Continuation | High | Medium | Low | Medium |
| 4 | Verified account destinations | Potentially high | Medium | High | Low until verified |

## Recommendation and acceptance boundary

Select **Informed Public Guestbook Entry**, framed as disclosure rather than safety. The smallest complete version should satisfy all of these:

1. A visitor sees that the message will be public **before** opening the form or entering text.
2. The disclosure remains visible when the form is expanded and can be associated with the form for assistive technology.
3. The compose action itself communicates public posting (`写公开留言` or equally explicit wording).
4. Copy does not promise privacy, moderation, deletion, response, availability, or a private alternative.
5. The original warm invitation, `#contact` route, public list, and guestbook behavior remain intact.
6. The disclosure is visually quiet at mobile and desktop sizes; it must not resemble an error state.

This feature earns priority not because it is larger or more impressive, but because it closes the only current gap between what a visitor may reasonably believe at the moment of action and what the system demonstrably does with their words.
