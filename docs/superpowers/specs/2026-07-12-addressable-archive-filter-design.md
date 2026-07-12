# Addressable Archive Filter State Design

## URL contract

An enhanced filtered archive uses `?tag=<canonical manifest tag>#blog`. Absence of `tag` means 全部. Values are exact and case-sensitive because the manifest is the vocabulary. Empty, unknown, duplicated, or `全部` values are ambiguous/invalid and fall back to 全部.

Changing the archive state deletes only existing `tag` values. Other query entries—including repeated keys and their order—remain untouched. A user change sets `#blog`; initial invalid cleanup preserves the current hash. A valid initial tag without `#blog` is canonicalized with `replaceState` to add the stable section hash without navigation.

## State flow

```text
manifest tags known
      ↓
resolve initial URL ── invalid/ambiguous ─→ 全部 + one replaceState cleanup
      │
      └─ valid exact tag ─→ filtered render (+ replaceState only if #blog missing)

button actual change → render + one polite summary + pushState
popstate             → resolve + render only
```

## Progressive behavior

Without JavaScript or on fetch failure, every URL still exposes the Round 09 complete static archive. The query is an enhancement request, not a claim that the server rendered a topic page.

## Accessibility

Existing filter buttons retain `aria-pressed`. After a meaningful in-place change, one short polite status names the exact state and result count. Initial 全部 state stays quiet; history restoration updates the persistent state without moving focus or scroll.
