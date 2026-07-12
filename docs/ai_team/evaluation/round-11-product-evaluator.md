# Round 11 Product Evaluation

## Evaluation frame

This is an independent product evaluation of the exact C1–C6 set. Scores use a 0–10 scale and the following weights:

| Criterion | Weight | Product interpretation |
| --- | ---: | --- |
| Visitor truth / harm prevention | 30% | Prevents a visitor from acting on a false or missing premise, especially before publishing personal information. |
| Warmth | 15% | Preserves the site's personal, low-pressure character instead of adding legalistic or funnel-like UI. |
| Recruiting / contact clarity | 15% | Helps a recruiter, collaborator, or reader understand what contact path actually exists without implying a private channel. |
| Strategic fit | 15% | Advances the proof-led personal site at its present maturity and corpus size. |
| Evidence | 15% | Is justified by checked-in product behavior and can be validated without speculative claims. |
| Cost | 10% | Rewards a smaller ownership surface and lower regression burden. |

## Evidence used

- `index.html` labels the section `联系我`, invites visitors to chat, and offers a generic `留言` button before showing signature and message fields. It does not say before composition that the submission is public.
- `script.js` POSTs the signature and message, immediately refetches messages, and renders every returned entry into the visible guestbook list. This directly supports describing the message as publicly displayed; it does not support privacy, reply, moderation, deletion, or availability promises.
- The repository documents an administrator-only edit/delete route, but that control is not a visitor-facing withdrawal path and therefore must not be presented as one.
- Each of the five current article shells ends with only `Back to archive`; the checked-in template and both generation paths widen the maintenance surface of article-end changes.
- Article account links still include generic service roots while generated output contains profile-specific destinations, so C6 lacks a verified, consistent identity source.
- The article corpus contains five posts. That makes a static archive route useful, but it weakens the strategic case for navigation machinery or semantic recommendation language.

## Weighted scores

| Rank | Candidate | Truth / harm 30% | Warmth 15% | Contact clarity 15% | Strategic fit 15% | Evidence 15% | Cost 10% | Weighted score |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | **C1. Informed Public Guestbook Entry** | 9.8 | 8.8 | 9.6 | 9.3 | 9.8 | 9.4 | **9.51** |
| 2 | **C5. No-script Guestbook Capability Notice** | 7.0 | 9.1 | 6.0 | 6.5 | 9.5 | 9.8 | **7.38** |
| 3 | **C2. Guestbook Announcement Discipline** | 7.2 | 8.2 | 5.8 | 7.5 | 7.6 | 6.2 | **7.15** |
| 4 | **C3. Static Article Archive Signature** | 5.6 | 8.7 | 4.2 | 7.1 | 8.9 | 7.4 | **6.75** |
| 5 | **C4. One Transparent Chronological Continuation** | 4.8 | 7.5 | 3.5 | 6.4 | 7.4 | 5.0 | **5.67** |
| 6 | **C6. Verified Article Account Destinations** | 3.0 | 6.5 | 5.0 | 6.0 | 2.0 | 5.5 | **4.38** |

## Ranking rationale

### 1. C1 — Informed Public Guestbook Entry

C1 closes the clearest truth gap at the exact decision point where harm can occur. A visitor currently sees `联系我` and `留言`, language that can reasonably be interpreted as direct contact, before entering a signature and message that the runtime then publishes into the shared list. A quiet disclosure plus the explicit action label `写公开留言` establishes the real boundary without inventing a private alternative. The proposed `aria-describedby` relationship also keeps the disclosure available when a visitor reaches the controls non-visually. Its value is unusually high relative to its small, static implementation surface. The main product guardrail is tone: one factual sentence is enough; privacy-policy styling or extra warnings would reduce warmth.

### 2. C5 — No-script Guestbook Capability Notice

C5 is factual, cheap, progressive, and easy to validate. It prevents a no-script visitor from mistaking an inert remote feature for an empty or broken guestbook. However, it serves a narrower failure mode and does not help the much more common JavaScript-enabled visitor understand that submitting is public. It is a sound later enhancement, not the highest-priority single feature.

### 3. C2 — Guestbook Announcement Discipline

C2 addresses a credible accessibility defect: the current list itself is an `aria-live` region, so a fetch can announce an entire batch of messages. Normalizing the list and keeping one atomic status would be more disciplined. It ranks below C5 on this product pass because its user impact needs assistive-technology runtime evidence, its fetch/submission ownership is broader, and it does not correct the pre-submission public/private ambiguity. It should remain in the accessibility backlog.

### 4. C3 — Static Article Archive Signature

C3 would help direct article arrivals understand the archive and offers robust static navigation. Its tone can stay quiet and the behavior is evidence-based. The benefit is nonetheless modest because every post already has a working archive link, while consistent delivery requires touching five posts plus the template, editor renderer, and importer. It improves orientation rather than preventing a consequential misunderstanding.

### 5. C4 — One Transparent Chronological Continuation

C4 is honest about chronology and avoids unsupported relevance claims, but the current five-post corpus does not justify its state and edge-case burden. Exact Unicode filename matching, direction semantics, manifest ordering, terminal behavior, and generator parity create a sizable regression surface for a single extra link. The existing archive remains a clearer, lower-maintenance continuation path.

### 6. C6 — Verified Article Account Destinations

Profile-specific account links could strengthen identity continuity, but this candidate cannot be responsibly selected from current repository evidence. Generic roots are visibly weak, yet generated-output URLs are not by themselves proof that every external identity belongs to Alex or remains intended for public promotion. The candidate's own prerequisite—external identity verification—is unmet.

## Disqualifiers and guardrails

- **C6 is disqualified now:** destination ownership and publication intent are not verified for every account. A wrong identity mapping would create a larger trust failure than the generic links it replaces.
- **C1 is disqualified if scope expands into unsupported claims:** do not promise privacy, confidentiality, moderation, deletion, response, retention, or a private contact route. The only supported claim is that the entered signature and message are publicly displayed in the guestbook.
- **C2 needs stronger runtime evidence before selection:** source inspection establishes a plausible live-region burst, but not the actual experience across target screen readers and browsers.
- **C4 must not use `related`, `recommended`, or semantic-similarity language:** only chronology is evidenced by the manifest.
- **C3 and C4 require generator parity:** implementing only the five checked-in posts would create immediate drift with the template, editor renderer, and XHS importer.

## Recommendation

Select **C1. Informed Public Guestbook Entry** as Round 11's one feature. It fixes the most consequential, directly evidenced visitor misunderstanding before any personal text is entered, improves contact-channel clarity for recruiters and readers, preserves the site's warmth when expressed as one quiet factual sentence, and has the best value-to-cost ratio in the exact candidate set.
