# Feature Decision - Round 06

Top 3 features:

## Feature: Curated Reading Paths / First Reads

Reason: All five evaluators ranked this first. The archive exists and is searchable, but first-time visitors still need editorial guidance about what to read first and why. This directly improves personal website content presentation without changing search, editor, or import behavior.

Expected impact: Visitors get a clear entry point into writing instead of relying only on chronology or tag filters. The site feels more authored, warmer, and easier to scan while staying within the proof-first personal archive positioning.

Implementation plan: Add a compact static section between `Site Pipeline Lens` and `近期更新`. Use existing posts and existing visual language. Each reading path should include a label, short reason, selected post links, dates/tags, and a direct first-read action. Do not modify `script.js`.

## Feature: Contact Intent Cards / Panel

Reason: Contact exists but is passive. A few intent cards would help recruiters, readers, and collaborators know what kind of message to leave.

Expected impact: Improves conversion from browsing to contact while keeping the guestbook central.

Implementation plan: Add a small static card group near the guestbook in a later round. Avoid prefill or guestbook JavaScript changes unless a future decision explicitly chooses interactivity.

## Feature: Account Identity Map

Reason: External account links are currently flat platform labels. Purpose labels would clarify why each account matters without making external platforms the main site feature.

Expected impact: Improves trust and personal coherence with low implementation risk.

Implementation plan: Add short purpose labels to existing account links or a compact identity block in a later round. Keep URLs unchanged and avoid third-party widgets.

## Decision

Implement Curated Reading Paths / First Reads now. Defer Contact Intent Cards and Account Identity Map because they are useful but secondary to the current archive discovery gap.
