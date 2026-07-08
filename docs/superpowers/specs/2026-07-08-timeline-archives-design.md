# Timeline Archives Design

## Summary

Replace the current plain "近期更新" post list with a timeline-style archive on the home page. The archive is grouped by year, each post keeps its full date, and visitors can filter posts by tag without leaving the page.

The site remains a static GitHub Pages site. The feature uses the existing `posts/posts.json` manifest, `script.js` client rendering, and `styles.css` visual system.

## Goals

- Make the archive feel like a long-term personal record instead of a short recent-post list.
- Preserve fast access to older writing through year grouping and tag filtering.
- Keep the implementation compatible with plain HTML, CSS, and JavaScript.
- Keep the existing editor, search, XHS import flow, guestbook, and visitor counter behavior intact.

## Non-Goals

- Do not add a backend, database, build framework, or client router.
- Do not create a separate archive page in the first version.
- Do not combine search and tag filtering into one complex query system.
- Do not require every historical post to be manually edited before the archive works.

## User Experience

The home page `Archives` section becomes the primary archive surface:

1. A compact filter row appears above the timeline.
2. The first filter is `全部`.
3. Other filters are generated from tags present in `posts/posts.json`.
4. Posts are grouped by year, such as `2026` and `2025`.
5. Each post item shows:
   - full date, for example `2026-05-13`
   - title linking to the post
   - short excerpt
   - tag chips when tags exist
6. Clicking a tag filter keeps the year groups visible only when they contain matching posts.
7. If no post matches a filter, the archive shows a short empty state.

The existing site search remains separate. Search continues to use the search card and `searchText` field. This keeps the archive interaction simple and avoids surprising state coupling between search input and tag filters.

## Data Model

`posts/posts.json` entries gain an optional `tags` field:

```json
{
  "file": "2026-05-13-xhs-apple土区礼品卡充值流程订阅gpt-plus.html",
  "title": "Apple土区礼品卡充值流程（订阅GPT Plus）",
  "date": "2026-05-13",
  "excerpt": "小红书同步...",
  "searchText": "Apple土区礼品卡...",
  "tags": ["工具", "小红书"]
}
```

Rules:

- `tags` is an array of short strings.
- Missing, empty, or invalid `tags` values are treated as no tags.
- Untagged posts still render in the timeline.
- Tag filter options are generated from existing tags, not from a hard-coded global list.

## Tag Sources

The manifest generator should extract tags from post HTML.

For XHS imports, `scripts/import-xhs-notes.js` already renders tags as:

```html
<p class="xhs-tags"><span class="xhs-tag">#工具</span></p>
```

`scripts/generate-posts-manifest.js` should read `.xhs-tag` text, remove a leading `#`, normalize whitespace, deduplicate tags, and store them in the manifest.

For manually written posts, the first version can support the same rendered class pattern if a post contains tag markup. The editor does not need new controls in the first version.

## Rendering Architecture

Keep rendering inside `script.js` near the existing `initBlogAutoList()` behavior.

Suggested helpers:

- `normalizePostTags(post)` returns a clean array of tags.
- `getPostYear(post)` returns the first four digits of `post.date`, or `未归档` when missing.
- `getArchiveTags(posts)` returns sorted unique tags.
- `groupPostsByYear(posts)` returns year groups in descending order.
- `renderTimelineArchive(posts, activeTag)` renders filtered groups into `#blog-auto-list`.

The existing `#blog-auto-list` element can remain the mount point, but the rendered markup should use timeline-specific classes so CSS can style it without overloading the old list styles.

## Error Handling

- If `posts/posts.json` fails to load, keep the existing status message behavior.
- If a post has no date, place it under `未归档`.
- If a post has malformed tags, ignore invalid tag values and still render the post.
- If a selected tag produces no matches, render an empty state instead of an empty list.

## Styling

Follow the current glassy, quiet archive style in `styles.css`.

The timeline should be readable before decorative:

- year headers should be clear but not hero-sized
- post rows should align date, title, excerpt, and tags predictably
- tag chips should reuse the site's accent and soft border colors
- mobile layout should stack cleanly with no horizontal overflow
- hover states should match existing link and card motion

## Compatibility

This feature should not change:

- `editor.html` layout or markdown editing flow
- post HTML generation from the editor, except that untagged posts remain valid
- guestbook API behavior
- visitor counter behavior
- XHS image localization behavior
- the existing search card behavior

## Verification

Run the project checks after implementation:

```bash
node --check script.js
node --check scripts/import-xhs-notes.js
node scripts/generate-posts-manifest.js
```

Also verify the home page locally when possible:

- archive groups posts by year
- full dates are visible for each post
- `全部` shows all posts
- clicking a tag filters the timeline
- untagged posts remain visible under `全部`
- search still works independently

## Implementation Scope

This is small enough for one implementation pass:

1. Extend manifest generation to include `tags`.
2. Update the home archive renderer in `script.js`.
3. Add archive timeline and tag filter styles in `styles.css`.
4. Regenerate `posts/posts.json`.
5. Run verification checks.

