# Feature Decision — Round 11

Implement **Informed Public Guestbook Entry** only.

- Add one quiet always-visible sentence before the compose button.
- State that signature and message will be publicly shown here; advise against phone, email, or other private information; accurately state the 100-character limit.
- Rename the action to `写公开留言`.
- Give the disclosure one stable id and reference it from both button and form via `aria-describedby`.
- Preserve `联系我`, the warm introduction, `#contact`, form/list/API behavior, and all Worker behavior.
- Add no checkbox, modal, private endpoint, response promise, moderation/deletion/retention claim, article feature, or guestbook live-region refactor.
