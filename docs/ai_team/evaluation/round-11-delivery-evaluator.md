# Round 11 Delivery Evaluation

This is an independent delivery evaluation of the exact C1–C6 set in `round-11-candidates.md`. I inspected the current homepage, guestbook runtime, article shells, editor renderer, XHS importer, manifest, and existing deterministic checks. I did not inspect the other Round 11 evaluator.

## Delivery rubric

All dimensions use a 0–10 scale, where a higher number is better. For regression risk, `10` means the least regression exposure; for cost, `10` means the cheapest implementation and maintenance burden.

| Dimension | Weight | Delivery interpretation |
| --- | ---: | --- |
| Feasibility | 20% | Can the feature be completed in this static-site architecture with the evidence and tooling currently available? |
| Factual correctness | 20% | Can every user-facing claim be proven by current repository and runtime behavior? |
| Progressive enhancement / accessibility | 15% | Does the baseline work without fragile runtime dependencies, and is its semantic contract sound? |
| Regression risk | 15% | How contained is the change across shared runtime, remote behavior, generated shells, and breakpoints? |
| Deterministic testability | 15% | Can acceptance be proved locally without relying on live services, external identities, or assistive-technology inference? |
| Engineering value | 10% | Does the work demonstrate or improve a meaningful engineering property rather than only add copy or decoration? |
| Cost | 5% | How small is the implementation, parity, QA, and future-maintenance burden? |

## Weighted ranking

| Rank | Candidate | Feas. | Factual | Progressive / a11y | Low regression | Testable | Eng. value | Cost | Weighted |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | C1. Informed Public Guestbook Entry | 9.5 | 9.5 | 9.5 | 9.5 | 9.5 | 5.5 | 9.5 | **9.10** |
| 2 | C5. No-script Guestbook Capability Notice | 10.0 | 9.5 | 9.5 | 10.0 | 9.5 | 3.0 | 10.0 | **9.05** |
| 3 | C3. Static Article Archive Signature | 8.0 | 9.0 | 9.5 | 8.0 | 8.5 | 6.0 | 8.0 | **8.30** |
| 4 | C2. Guestbook Announcement Discipline | 7.0 | 8.0 | 8.0 | 6.0 | 5.0 | 8.5 | 6.0 | **7.00** |
| 5 | C4. One Transparent Chronological Continuation | 6.0 | 9.0 | 7.0 | 5.5 | 6.0 | 8.0 | 5.5 | **6.85** |
| 6 | C6. Verified Article Account Destinations | 2.0 | 2.0 | 8.0 | 2.0 | 2.0 | 5.0 | 4.0 | **3.30** |

## Candidate assessments

### 1. C1. Informed Public Guestbook Entry — 9.10

The repository proves the disclosure: the public Worker returns signatures and messages, the homepage renders them, and a successful submission immediately refreshes the public list. A quiet static sentence before the compose control therefore has no service dependency and remains useful if JavaScript or the API fails. Renaming the control to `写公开留言` and connecting both control and form to one stable description ID are small, inspectable changes.

The main delivery guard is semantic accuracy. The text may say that the signature and message are publicly displayed and advise against private details; it must not imply moderation, confidentiality, guaranteed deletion, a reply, retention policy, or a private alternative. Deterministic checks can assert DOM order, one unique description ID, both `aria-describedby` references, persistent visibility through form expansion, and unchanged form/list/API hooks. The low engineering score reflects that this is primarily a trust and semantic repair, not a complex technical demonstration; that does not reduce its delivery priority.

### 2. C5. No-script Guestbook Capability Notice — 9.05

This is the easiest and lowest-risk candidate. A guestbook-local `<noscript>` sentence can truthfully state that viewing and sending remote messages requires JavaScript. Static containment and wording are deterministic, and the notice adds a progressive failure explanation without touching the API or shared runtime.

It ranks below C1 because its very narrow failure-mode value does not resolve the ambiguity experienced by the normal JavaScript-enabled visitor before public submission. Its excellent deliverability should not be mistaken for a stronger round outcome, and it must not be bundled with C1 under the single-feature rule.

### 3. C3. Static Article Archive Signature — 8.30

The archive and First Reads destinations exist and are local, so a restrained static endcap is factually safe and works without JavaScript. It has solid deterministic potential: enumerate five current posts plus the checked-in template, editor renderer, and XHS importer; assert one component, correct relative anchors, stable placement, and future-output parity.

Its delivery burden is broader than its modest navigation gain. The current footer already supplies an archive route, while this candidate creates at least eight ownership points and requires representative mobile/desktop visual checks after personal writing of very different lengths. Any implementation that updates only current posts, or only one generator, is incomplete. Promotional or recruiter-oriented wording would also violate the round boundary.

### 4. C2. Guestbook Announcement Discipline — 7.00

Separating the message list from one atomic polite status and managing `aria-busy` is a legitimate accessibility and engineering improvement. The present fetch/submission path, however, has initial load, failure, validation, submit, post-submit refetch, and final-success states. Refactoring those transitions touches live behavior and can accidentally clear useful errors, leave busy state stuck, duplicate announcements, or regress visible messages.

DOM and mocked-fetch tests can prove state transitions, but they cannot by themselves prove real screen-reader verbosity. The known local browser constraint further weakens available runtime evidence. This candidate should proceed only with deterministic API fixtures, explicit success/rejection coverage, no mutation of the live guestbook, and an honest limit on assistive-technology claims. It also leaves the more immediate public-intent ambiguity unresolved.

### 5. C4. One Transparent Chronological Continuation — 6.85

Manifest dates and filenames can support one honest chronological link without claiming semantic relevance. The implementation is nevertheless disproportionate for five posts: it must define direction unambiguously, handle both corpus edges, encoded and decoded Unicode filenames, malformed paths, missing or duplicate manifest entries, query/hash suffixes, fetch failure, and exact escaping. Runtime insertion also needs a real static fallback and shell parity across current posts and both generation paths.

This candidate is testable only after extracting a pure decision function and building a comprehensive fixture matrix. A client-only happy-path implementation or any `相关`/personalized language is disqualifying. The engineering value is respectable, but the reading benefit does not justify the larger shared-runtime and maintenance surface this round.

### 6. C6. Verified Article Account Destinations — 3.30

The article shells contain generic service-root links, so destination improvement could eventually be useful. It is not currently deliverable under the round's factual-correctness constraint: repository similarity to homepage links is not proof that every destination belongs to Alex, and the project understanding explicitly records external ownership verification as missing. Synchronizing an unverified mapping across five posts and two generators would amplify a trust error.

This candidate is disqualified now. It can return to a future candidate set only after each identity is verified from authoritative, current external evidence and the exact mapping is recorded. Verification would then need link parity, safe external-link attributes, and representative browser checks.

## Disqualifiers and delivery gates

- **C1:** disqualify any copy promising privacy, moderation, deletion, reply, availability, or a private contact route; also reject a disclosure that appears only after typing begins.
- **C2:** disqualify an implementation that makes the message list a live region, mutates the live guestbook during QA, lacks success and rejection fixtures, or claims verified screen-reader behavior from source inspection alone.
- **C3:** disqualify partial shell ownership, broken relative anchors, duplicate endcaps, or promotional/recruiting copy after personal articles.
- **C4:** disqualify relevance/personalization claims, self-links, ambiguous direction, loss of the no-JavaScript/archive fallback, or missing Unicode and boundary fixtures.
- **C5:** disqualify an invented non-JavaScript submission fallback or any implication that an external account is private.
- **C6:** **hard-disqualified in the current round** until every account destination is independently verified; visual or naming similarity is insufficient evidence of ownership.
- **All candidates:** reject bundling separate outcomes merely to enlarge the round, and preserve the editor/XHS import paths whenever article-shell output is affected.

## Exactly one recommendation

**Select C1. Informed Public Guestbook Entry.** It closes the most consequential evidenced trust gap at the correct decision point while requiring no remote-service mutation, no shared fetch refactor, and no unsupported claim. Its complete delivery contract is compact but substantive: one always-visible factual disclosure before the compose action, the explicit `写公开留言` label, programmatic description of both control and form, quiet responsive styling, and deterministic proof that the existing guestbook hooks and behavior remain intact.
