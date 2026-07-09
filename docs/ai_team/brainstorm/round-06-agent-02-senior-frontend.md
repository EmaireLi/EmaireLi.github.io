# Round 06 Brainstorm - Agent 02 Senior Frontend Engineer

## Feature Ideas

### 1. Curated Reading Lanes

- User value: helps visitors choose what to read first instead of scanning a chronological archive.
- Fit: the site already has generated posts, tags, excerpts, and mixed technical/personal writing.
- Technical plan: add a static homepage section above `近期更新` with 3-4 curated lanes such as Technical Notes, Project Building, Life Archive, and XHS Visual Notes. Link to existing posts manually; no `script.js` change required.
- Estimated cost: medium.
- Showcase effect: shows editorial judgment and turns the archive into a guided personal knowledge map.
- Risk: stale featured posts could make the site feel less maintained.

### 2. Contact Intent Cards

- User value: makes it easier for recruiters, technical peers, readers, or collaborators to know what kind of message to leave.
- Fit: the guestbook exists, but contact is emotionally warm rather than conversion-oriented.
- Technical plan: add compact cards before the guestbook button: Project review, Recruiting, Article feedback, Collaboration.
- Estimated cost: low.
- Showcase effect: improves contact conversion without adding services.
- Risk: too much career framing could weaken the archive feeling.

### 3. Account Identity Map

- User value: visitors understand why each external account exists.
- Fit: sidebar links are currently flat platform labels.
- Technical plan: group account links with short role labels: Code, Writing/Notes, Video, ACGN, Practice.
- Estimated cost: low.
- Showcase effect: makes personal identity clearer.
- Risk: sidebar crowding on desktop and mobile.

### 4. Featured Proof Strip

- User value: gives first-time visitors a fast best-evidence path before the dense Proof Map.
- Fit: the homepage is proof-first, but strongest proof is distributed.
- Technical plan: add a narrow strip near the hero with 3 linked proof chips: SmartLabeling, Yomii, Site Pipeline / Code Tour.
- Estimated cost: low.
- Showcase effect: improves hierarchy.
- Risk: duplicate Start Here and Proof Map unless restrained.

### 5. Archive Why Read This Notes

- User value: makes selected post entries meaningful by explaining what each article contributes.
- Fit: archive already shows excerpts and tags.
- Technical plan: add manual static notes only for curated posts, either in reading lanes or highlighted entries above the generated archive.
- Estimated cost: medium.
- Showcase effect: turns archive from a list into a guided body of work.
- Risk: notes can drift from post content.

### 6. Search Starter Prompts

- User value: helps users discover searchable topics before typing.
- Fit: search already exists in the sidebar.
- Technical plan: add static prompt chips below the search input, or make query chips with small `script.js` change.
- Estimated cost: low without JS, medium with JS.
- Showcase effect: makes search feel designed and content-aware.
- Risk: touching `script.js` can regress search.

### 7. Proof Map Compression

- User value: reduces homepage density while keeping evidence available.
- Fit: Proof Map is useful but text-heavy.
- Technical plan: keep top-level capability rows visible; make secondary notes quieter or move them into native details/summary.
- Estimated cost: low to medium.
- Showcase effect: improves scan quality.
- Risk: hiding evidence can weaken proof-first impression.

### 8. Local Visual Archive Preview

- User value: adds warmth and makes imported XHS content easier to notice.
- Fit: local XHS image assets exist.
- Technical plan: add a small responsive image rail with selected local thumbnails and lazy loading.
- Estimated cost: medium.
- Showcase effect: adds visual texture without hotlinks.
- Risk: image selection/cropping must be carefully QA'd.

## Top 3

1. Curated Reading Lanes
2. Contact Intent Cards
3. Account Identity Map
