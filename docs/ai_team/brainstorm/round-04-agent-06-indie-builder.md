# Round 4 Brainstorm - Agent 6: Indie Builder

Date: 2026-07-09

## Scope

Only personal website visual design, homepage structure, interaction, and content presentation.

## Approach Options

1. **Visual polish pass:** improve rhythm and handcrafted details.
2. **Homepage route refinement:** best value; guide visitors faster.
3. **Content presentation layer:** makes posts/projects more browsable.

## Recommendation

Prioritize homepage route refinement, then selective visual polish.

## Feature Ideas

### 1. Start Here Review Strip

- **User value:** Gives first-time visitors a route: recruiter, technical reviewer, reader.
- **Why it fits:** Proof Map routes sit lower on the page.
- **Technical approach:** Add a compact three-link strip below the intro.
- **Cost:** Low.
- **Display effect:** More intentional first screen.
- **Risk:** Can duplicate Proof Map content.

### 2. Current Focus Card

- **User value:** Shows what Alex is learning/building now.
- **Why it fits:** Sidebar says "JavaBoy 转行引擎开发中" but does not explain it.
- **Technical approach:** Add 2-3 manually edited lines: current direction, recent artifact, next target.
- **Cost:** Low.
- **Display effect:** Living-site feeling.
- **Risk:** Stale text.

### 3. Section Progress Rail

- **User value:** Helps visitors orient on the long homepage.
- **Why it fits:** Page has clear anchors.
- **Technical approach:** CSS sticky mini-rail; optional `IntersectionObserver`.
- **Cost:** Medium.
- **Display effect:** Polished navigation.
- **Risk:** Mobile clutter.

### 4. Project Snapshot Toggle

- **User value:** Lets visitors skim project cards at two depths.
- **Why it fits:** Cards have detailed role/stack/proof lists.
- **Technical approach:** Convert secondary proof details to native `<details>` blocks.
- **Cost:** Low.
- **Display effect:** Cleaner homepage.
- **Risk:** Hidden evidence if summaries are weak.

### 5. Archive Mood Filters

- **User value:** Browse posts by feeling/type, not just chronology.
- **Why it fits:** Site mixes technical, personal, XHS, and ACGN writing.
- **Technical approach:** Filter chips above recent posts using existing manifest/tag/title inference.
- **Cost:** Medium.
- **Display effect:** More curated archive.
- **Risk:** Inference can be brittle.

### 6. Local Image Post Preview Row

- **User value:** Makes XHS visual posts discoverable.
- **Why it fits:** Local XHS images already exist.
- **Technical approach:** Add a manually listed `Photo notes` row with constrained images.
- **Cost:** Medium.
- **Display effect:** Warmer and less text-heavy.
- **Risk:** Aspect-ratio/layout jumps.

### 7. Handwritten Update Log

- **User value:** Shows the site is maintained.
- **Why it fits:** Recent commits and AI-team planning already exist.
- **Technical approach:** Add short manual list with date, change, and section link.
- **Cost:** Low.
- **Display effect:** Indie-builder personality.
- **Risk:** Noise if every tiny change is listed.

### 8. Softer Guestbook Preview

- **User value:** Makes contact more inviting.
- **Why it fits:** Guestbook exists but feels functional.
- **Technical approach:** Improve copy and empty/loading visual states.
- **Cost:** Low.
- **Display effect:** Contact feels integrated into the archive.
- **Risk:** Over-styling distracts.

## Final Recommendation

Start with Start Here Review Strip, Current Focus Card, and Project Snapshot Toggle.

