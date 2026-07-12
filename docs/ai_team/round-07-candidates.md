# Round 07 Deduplicated Candidate Set

Both evaluator workers must score this same set. Cost scores should reward lower delivery cost. The main agent will reconcile the results and select no more than one feature.

## C1. Canonical Mobile Search Doorway

- **Visitor value:** Makes the existing article search reachable immediately on the homepage instead of after roughly 10,220px of mobile scrolling.
- **Fit:** Search already has a canonical input/results surface, shared manifest cache, highlighted excerpts, result counts, and failure copy. Other article and case pages already place their search before mobile content; the reachability defect is isolated to the homepage grid.
- **Implementation approach:** Move the single homepage search element earlier in the real DOM so mobile visual and keyboard order agree, preserve its desktop grid coordinates, give it a stable target ID, and expose it through a compact mobile header entry or inline disclosure. Reuse the existing search renderer and fetch path. Add polite live status and, if disclosure behavior is selected, focus entry, Escape close, focus return, and a working anchor/no-JavaScript fallback.
- **Estimated cost:** M, or S if the canonical card remains visibly inline rather than disclosed.
- **Showcase effect:** Responsive information architecture, progressive enhancement, accessible focus behavior, and disciplined reuse in plain JavaScript.
- **Key risk:** A sixth header item can wrap; an always-open card may push identity down; a custom disclosure can create focus/hash/resize regressions.

## C2. Semantic Long-Page Review Navigator

- **Visitor value:** Lets visitors jump among Proof, Projects, Site Pipeline, First Reads, Archive, Search, Contact, and Top without linearly traversing a 10,555px mobile page.
- **Fit:** All destinations already have stable IDs. Start Here provides entry routing but disappears after the initial jump, and the current back-to-top control is hidden below 767px.
- **Implementation approach:** Add one semantic `On this page` nav made of ordinary anchors. Present it as a restrained sticky mobile ribbon or compact document track, with 44px touch targets, visible focus, and destination scroll margins. Keep the first version HTML/CSS-first; active-section tracking is optional and must use one observer if added.
- **Estimated cost:** S–M.
- **Showcase effect:** Demonstrates information architecture and accessibility on a genuinely long document without hiding proof.
- **Key risk:** Can duplicate the header/Start Here, consume viewport space, or feel like an app dock if too persistent or crowded.

## C3. Intent-Aware Contact Bridge

- **Visitor value:** Gives recruiters, project reviewers, and readers a clear reason and prompt to contact Alex after reviewing evidence.
- **Fit:** Start Here promises project questions, reading feedback, and collaboration, but Contact currently contains one generic sentence and a compose button around 9,795px on mobile.
- **Implementation approach:** Add three compact intent prompts inside the existing Contact section, keep the guestbook central, and provide a direct mobile/header anchor. Each prompt should expand/focus the existing form without overwriting an in-progress draft. Static prompts and focus are the baseline; editable prefill is optional only if it preserves the 100-character counter, validation, configured/unconfigured API states, and user text.
- **Estimated cost:** S for static prompts; M with controlled interaction.
- **Showcase effect:** Converts passive contact into a purposeful product endpoint while remaining personable.
- **Key risk:** Adds mobile height, can sound overly recruitment-focused, and interactive prefill can regress guestbook behavior.

## C4. Explainable Search And Recovery

- **Visitor value:** Shows why each result matched—title, tag, excerpt, date, or content—and gives real topic starting points or recovery after a no-match query.
- **Fit:** The manifest already exposes structured title/date/tags/excerpt plus full `searchText`; current search highlights snippets but does not explain result relevance or use tags as a visible retrieval field.
- **Implementation approach:** Extract one pure field-aware matcher and return structured reasons through the existing result renderer. Use a clear precedence, calculate total before the eight-result display limit, add one or two compact reason labels, and route a small real-tag topic set and Clear action through the same controller. Do not claim semantic AI or personalization.
- **Estimated cost:** M.
- **Showcase effect:** Explainable deterministic retrieval and transparent AI-product restraint without external services.
- **Key risk:** Field duplication inside `searchText` can misattribute reasons, sidebar results can become crowded, and polish does not fix mobile reachability by itself.

## C5. Article Continue-Reading Navigation

- **Visitor value:** Helps a reader move from one post to a chronological neighbor or genuinely same-tag article rather than returning to the homepage.
- **Fit:** First Reads now improves entry, while post pages still end without a connected archive path. The shared manifest contains filenames, dates, excerpts, and tags.
- **Implementation approach:** Detect the current post filename, reuse the manifest cache, and render a compact end-of-article block with previous/next chronology plus at most two same-tag options. Fall back to chronology or a static Back to archive link when tag evidence or fetch data is insufficient. Keep generated and imported post shells compatible.
- **Estimated cost:** M.
- **Showcase effect:** Completes the content discovery loop and demonstrates reusable client-side content relationships.
- **Key risk:** Affects all post pages, filename encoding must be exact, sparse tags can create weak recommendations, and generated templates need maintenance updates.

## C6. Current Capability / Aspiration Snapshot

- **Visitor value:** Separates what Alex can credibly own now, what is actively being learned, and which conversations are useful.
- **Fit:** The hero names frontend/full-stack/AI tooling with engine-learning momentum, while the sidebar still says “JavaBoy 转行引擎开发中.” Both are honest but the relationship is implicit.
- **Implementation approach:** Refine the existing identity panel or hiring snapshot into three factual, evidence-linked rows: Can own now, Learning next, and Useful conversations. Do not add metrics, availability claims, or unsupported role promises.
- **Estimated cost:** S.
- **Showcase effect:** Strengthens mature personal-brand honesty by separating evidence from aspiration.
- **Key risk:** Can duplicate existing opening copy, drift into resume language, or become stale while adding no new navigation utility.

## C7. Unified Evidence Finder

- **Visitor value:** Lets reviewers search posts, project cases, Code Tour, site workflow, and selected decision/QA evidence from one local index.
- **Fit:** The component is called site search but currently searches posts only, while case studies and code routes are among the strongest recruiting evidence.
- **Implementation approach:** Generate a deterministic typed `site-search.json` for posts and selected local evidence, keep `posts/posts.json` as the archive manifest, extend the existing result schema with type labels, and add generator/check documentation so entries cannot silently stale.
- **Estimated cost:** L.
- **Showcase effect:** Demonstrates static indexing and proof-oriented information retrieval without a service.
- **Key risk:** Broadens content maintenance and shared JavaScript, useful page extraction is nontrivial, and the small corpus may not justify the machinery yet.

## C8. Purpose-Labeled Account Identity Map

- **Visitor value:** Explains what each external destination contributes—code, short notes, media, ACGN interests, or practice—before a visitor leaves the local site.
- **Fit:** Six account pills already exist but are unlabeled by purpose and appear around 10,373px on mobile.
- **Implementation approach:** Keep all current URLs and replace or extend flat pills with concise purpose labels in a compact Elsewhere block near Contact while preserving a restrained desktop rail treatment. Avoid embeds, login dependencies, or third-party data.
- **Estimated cost:** S.
- **Showcase effect:** Connects engineering and personal interests into one coherent human profile.
- **Key risk:** Pulling external platforms forward can weaken the local proof-first hierarchy and add mobile density.

## Removed Before Evaluation

- Contextual section handoffs: useful but duplicates C2 and adds repeated CTA height.
- Visitor-intent route mode: overlaps C2 while adding state/hash complexity.
- Site shipping log: real evidence exists, but another self-referential product-process surface is lower value than visitor navigation.
- WebGL topic terrain, shaders, particle backgrounds: sparse data and current reachability needs do not justify performance/accessibility cost.
- LLM chatbot, RAG, embeddings: small local corpus, external service/key/privacy cost, hallucination risk, and weak current fit.
- Collapsible Proof sections: shortens the page by hiding the exact evidence the site is designed to surface.
