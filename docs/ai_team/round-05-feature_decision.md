# Feature Decision - Round 05

Top 3 features:

## Feature: Site Pipeline Lens - highest priority for implementation now

Reason: Best overall balance of product value, accessibility, and delivery risk. It improves the personal website by showing how the site is maintained, published, and kept trustworthy without turning the homepage into a developer dashboard.

Expected impact: Makes the site feel more credible, technically intentional, and recruiter-friendly by exposing the static-site workflow behind the writing and project archive.

Implementation plan: Add a compact homepage section that explains the publishing pipeline: local writing, imported notes, generated post manifest, archive/search rendering, guestbook contact, and GitHub Pages delivery. Keep it visual, scannable, and tied to reader trust rather than internal tooling.

## Feature: Curated Archive Lanes

Reason: The archive needs stronger content presentation than a flat list. Curated lanes improve discoverability while staying aligned with a static personal site.

Expected impact: Helps visitors quickly understand the author's interests, themes, and body of work, increasing reading depth and reducing homepage ambiguity.

Implementation plan: Group selected posts into a few curated lanes such as Featured, Technical Notes, Life/Writing, and Visual/XHS Imports. Use existing post metadata and local image assets where available. Avoid new persistence or admin workflows.

## Feature: Search Match Reasons and Context

Reason: Search already supports site exploration, but explaining why a result matched adds technical differentiation and improves usability.

Expected impact: Makes search feel more intentional and useful, especially for recruiters or readers scanning for specific themes, projects, or skills.

Implementation plan: Extend search results to show short match context snippets and lightweight labels such as title match, tag match, excerpt match, or content match. Keep the logic client-side and compatible with the static manifest.

## Decision

Implement Site Pipeline Lens now. Defer Curated Archive Lanes and Search Match Reasons to later rounds because they are valuable but either require content curation or changes to shared search JavaScript. Round 05 should stay focused on homepage structure, visitor trust, and the personal website itself.
