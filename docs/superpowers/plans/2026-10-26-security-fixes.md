# Security fixes implementation plan

Goal: fix the four reviewed issues without changing page layout or adding user interaction.

- Preserve ordinary Markdown and HTML typography, images, tables, editor export, search, tags and guestbook administration.
- Remove entity decoding that turns escaped examples into active HTML. Sanitize editor preview and export with a pinned, locally served DOMPurify build; fail closed if unavailable.
- Escape attribute quotes and render archive filters through DOM properties.
- Claim the message rate limit and insert the message in one D1 batch transaction. Rejected duplicate signatures must roll back the claim.
- Reuse existing visitor records by IP, keep historical totals and records, and coalesce repeat visits within 60 seconds. User-Agent remains display metadata only. Add an IP lookup index without deleting records.
- Test browser payloads, normal formatting, export, local SQLite concurrency/rollback, statistics, and admin authorization. Preview with mocked API traffic only.
- Commit and push only related files. Report static deployment and Worker deployment separately; do not alter live message/visitor records in testing.

Scope: this does not make arbitrary manually authored HTML files safe to publish, or replace infrastructure-level protection against distributed traffic floods.
