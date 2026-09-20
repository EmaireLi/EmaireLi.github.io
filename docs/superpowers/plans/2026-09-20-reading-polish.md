# Reading polish implementation plan

Approved scope: complete review items 4, 5, 6 without changing the site's layout direction or editor behavior.

- Improve typography in reading-layout.css: 16px reading text, clearer secondary text, 44px navigation/filter/search/action targets on mobile and desktop.
- Add consistent active/focus feedback for navigation, filters, buttons and gallery controls. Respect reduced motion in both CSS feedback and JavaScript gallery scrolling.
- Rename the public guestbook section; normalize social profile URLs in existing pages and generated templates; restyle social links as subdued controls with brand accents on interaction.
- Convert only the existing article's paired literal bold delimiters into strong markup; verify that stripping markup/delimiters leaves the original text unchanged.
- Run syntax checks, regenerate the manifest and run existing contracts. Exercise normal/reduced-motion gallery behavior with an isolated fixture.
- Browser-check mobile/desktop layout, targets, search/filter, gallery, guestbook and article formatting. Commit and push the current branch.

## Verification results

- Node syntax checks and existing static archive, filter-state, and guestbook disclosure checks pass; manifest refreshed.
- Normal gallery scrolling uses smooth; reduced-motion fixture uses auto.
- Browser checks at 320/390/768/1440 CSS px: no document overflow; measured navigation/filter/search/social targets are at least 44px high.
- Browser article text is 16px with 29.6px line height; no literal bold delimiters remain. All 9 repaired spans preserve original text.
- Existing article and template social account links match the homepage profiles.
- Archive filter returns the expected single ACGN result; gallery Next advances to 2 / 10.
- Guestbook form expands, but remote message loading failed in the local preview; no message submitted and backend delivery not verified.
- Visual checks use the connected browser. The previously observed missing Playwright dependency still precludes the-loop recording; no video or physical-device claim.
