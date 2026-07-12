# Feature Decision — Round 10

## Decision

Implement **Addressable Archive Filter State** only.

## Scope

- Canonical URL contract: `?tag=<exact manifest tag>#blog`.
- 全部 is represented by no `tag` parameter.
- Preserve every unrelated parameter, including repeated values and order.
- Initial invalid/empty/duplicate/ambiguous state renders 全部 and canonicalizes once with `replaceState`.
- User changes push only when the active tag changes.
- `popstate` parses and re-renders without push/replace, focus, or scroll.
- Existing static archive and fetch-failure fallback remain complete.
- Add only a restrained live result summary needed for accessible in-place state.

Do not add article tag links, First Reads rewiring, static topic pages, continuation, guestbook copy, or Topic Hub language.
