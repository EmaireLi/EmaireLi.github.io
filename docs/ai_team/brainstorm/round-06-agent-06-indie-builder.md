# Round 06 Brainstorm - Agent 06 Independent Developer

## Feature Ideas

### 1. Curated Reading Paths

- User value: helps visitors decide what to read first instead of scanning a raw archive.
- Fit: the site already has posts, tags, excerpts, and proof-first routing. A curated layer can make the archive feel intentional.
- Technical plan: add a static homepage section near `近期更新` with 3-4 editorial paths such as job/technical growth, life records, ACGN longform, and tool experience. Each path links to selected posts and explains why they matter. No JS required.
- Estimated cost: low.
- Showcase effect: makes the site feel more like a personal knowledge archive than a post dump.
- Risk: needs occasional manual updates.

### 2. Featured Post With Evidence Framing

- User value: gives first-time visitors one strong article to click immediately.
- Fit: homepage already frames projects as evidence; a featured post can do the same for writing.
- Technical plan: add a compact Featured Writing block above archive with title, date, tags, excerpt, and why-this-represents-me note.
- Estimated cost: low.
- Showcase effect: stronger personal voice and better content conversion.
- Risk: stale featured post weakens freshness.

### 3. Contact Intent Cards

- User value: makes it easier for visitors to know what kind of message to leave.
- Fit: guestbook exists, but it feels generic.
- Technical plan: add 3 small static cards above guestbook: project exchange, reading feedback, opportunity contact. Optionally buttons can scroll/focus the form later.
- Estimated cost: low to medium.
- Showcase effect: turns contact from passive into guided conversion.
- Risk: too much guidance makes guestbook less casual.

### 4. External Account Labels

- User value: helps visitors understand why each external link exists.
- Fit: sidebar account list lacks context.
- Technical plan: update account link markup/styles to include one-line role labels, e.g. GitHub/code, LeetCode/practice, Bangumi/media archive, XHS/life notes.
- Estimated cost: low.
- Showcase effect: makes sidebar more trustworthy and scannable.
- Risk: sidebar can become crowded.

### 5. Homepage Now Snapshot

- User value: quickly answers what Alex is focused on right now.
- Fit: hero says direction, but a timestamped Now block adds freshness.
- Technical plan: add a small static section with studying, building, next step, and last-updated date.
- Estimated cost: low.
- Showcase effect: humanizes the portfolio and signals maintenance.
- Risk: stale Now content is worse than no Now section.

### 6. Archive Stats Strip

- User value: gives readers a quick sense of archive shape before browsing.
- Fit: `posts/posts.json` has post count, dates, and tags.
- Technical plan: extend archive initialization in `script.js` to calculate post count, tag counts, newest post date, and top tags.
- Estimated cost: medium.
- Showcase effect: makes archive feel more data-backed.
- Risk: adds JS complexity.

### 7. Search Result Type Badges

- User value: search results become easier to judge.
- Fit: posts already have tags, dates, excerpts, and search text.
- Technical plan: render up to two badges in each search result, optionally showing matched field.
- Estimated cost: medium.
- Showcase effect: improves interaction polish.
- Risk: search UI can become noisy.

### 8. Project-To-Post Bridge

- User value: connects projects with related learning notes and process.
- Fit: projects and posts currently feel like separate browsing modes.
- Technical plan: add Related Writing under project cards or case pages with manual links.
- Estimated cost: low to medium.
- Showcase effect: makes the site cohesive.
- Risk: current post set may not have enough directly related technical writing.

### 9. Lightweight Trust Footer

- User value: gives technical visitors confidence that the site is maintained honestly and simply.
- Fit: Site Pipeline Lens already exposes static workflow.
- Technical plan: add three footer links: static site, local images, generated manifest.
- Estimated cost: low.
- Showcase effect: reinforces transparency.
- Risk: footer may become link-heavy.

## Top 3

1. Curated Reading Paths
2. Contact Intent Cards
3. Project-To-Post Bridge
