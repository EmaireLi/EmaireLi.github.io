# Round 4 Brainstorm - Agent 3: WebGL/WebGPU Expert

Date: 2026-07-09

## Scope

Only personal website visuals, homepage structure, interactions, and content presentation. WebGL/WebGPU must be progressive enhancement with no dependencies and full fallback.

## Approach Options

1. **Ambient enhancement:** subtle shader/canvas effects; lowest risk, weakest evidence.
2. **Evidence visualization:** visualizes proof relationships; best fit.
3. **Interactive artifact viewer:** high value only after real local assets exist.

## Feature Ideas

### 1. Proof Constellation Canvas

- **User value:** Shows how role signals, projects, code tour, and archive connect.
- **Why it fits:** Extends the Proof Map without adding new claims.
- **Technical approach:** Add canvas beside/behind Proof Map; source nodes from static data attributes; fallback to HTML relationship map.
- **Cost:** Medium.
- **Display effect:** Restrained interactive node field.
- **Risk:** Can become decorative if not tied to routes.

### 2. Static Site Pipeline Lens

- **User value:** Makes the site itself an engineering artifact.
- **Why it fits:** The site has editor, XHS import, manifest, search, archive, and guestbook paths.
- **Technical approach:** Draw pipeline stages with HTML/CSS or optional canvas lines.
- **Cost:** Low to medium.
- **Display effect:** Compact systems diagram for the site itself.
- **Risk:** Too much process detail can distract.

### 3. Archive Heatmap Field

- **User value:** Helps readers scan when posts were written and topic clusters.
- **Why it fits:** Uses `posts/posts.json` and archive identity.
- **Technical approach:** Load manifest and render heatmap/particle grid with fallback CSS sections.
- **Cost:** Medium.
- **Display effect:** Quiet calendar-like visual.
- **Risk:** Current post count may be sparse.

### 4. Case Study Depth Map

- **User value:** Shows evidence depth and known gaps without leaving the site.
- **Why it fits:** The site values honest evidence.
- **Technical approach:** Render evidence stacks with static JS data and fallback cards.
- **Cost:** Medium.
- **Display effect:** Layered evidence view.
- **Risk:** Can unfairly rank projects.

### 5. Shader Headband Upgrade

- **User value:** Adds a memorable but lightweight first impression.
- **Why it fits:** Current `headband` is already a minimal motif.
- **Technical approach:** Tiny canvas/WebGL line, respects `prefers-reduced-motion`; fallback to CSS.
- **Cost:** Low.
- **Display effect:** Subtle technical signal.
- **Risk:** Low proof value.

### 6. Search Result Signal View

- **User value:** Explains why search results matched.
- **Why it fits:** Search already exists.
- **Technical approach:** Add text snippets and optional small bars/sparklines.
- **Cost:** Medium.
- **Display effect:** More transparent search.
- **Risk:** WebGL likely unnecessary until ranking improves.

## Recommendation

Prioritize evidence visualization only if it clarifies the homepage. Avoid WebGL for decoration this round; the first-viewport narrative problem is higher value.

