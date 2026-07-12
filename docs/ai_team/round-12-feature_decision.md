# Feature Decision — Round 12

## Decision

Select **C0: stop the improvement loop**. Implement no Round 12 product feature.

## Why

No candidate materially beats the stable existing behavior. The article footer already provides a no-JavaScript archive route, while the homepage supplies curated reading, search, complete chronology, and addressable tags. Current corpus size and evidence do not justify nine-point static parity work or a broader runtime/history/fetch surface.

## Preserved state

- Keep `Back to archive` on every article and in all generators.
- Keep semantic-related, personalized, and AI recommendation claims absent.
- Keep the Round 11 public guestbook disclosure unchanged.
- Do not add a signature merely for polish.

## Reopen triggers

- At least 12 published posts.
- Explicit series/collection metadata.
- Evidence that readers abandon at article endings or request continuation.
- One canonical article-generation path replacing current ownership duplication.
