# AGENTS.md

## Project

This is a static GitHub Pages personal site. Keep changes simple, local, and compatible with plain HTML/CSS/JavaScript. Preserve the markdown editor in `editor.html` and `script.js` unless a task explicitly changes it.

## Workflow

- Use `rg` or `rg --files` for code search.
- Follow the existing visual style in `styles.css`.
- Keep generated blog posts under `posts/`.
- Keep XHS image assets under `assets/xhs/`.
- Do not commit secrets, browser cookies, or account session data.

## XHS Import

- Source data lives in `imports/xhs-notes.json`.
- Import notes with `node scripts/import-xhs-notes.js imports/xhs-notes.json`.
- If posts are edited manually, refresh the manifest with `node scripts/generate-posts-manifest.js`.
- Imported XHS posts should use local image paths, not hotlinked XHS image URLs.

## Verification

Run the relevant checks before finishing code changes:

- `node --check script.js`
- `node --check scripts/import-xhs-notes.js`
- `node scripts/generate-posts-manifest.js`

For visual changes, preview the affected page locally when the environment allows it.

## Git Requirement

每次修改代码不管是修bug还是增加功能都自动gitpush以方便我在开发环境查看。

After verification, run `git status`, stage only files related to the current task, commit with a clear message, and push the current branch to `origin`. If push fails, report the exact reason in the final response.

## Reference

This file follows the Codex AGENTS.md guidance: https://developers.openai.com/codex/guides/agents-md#create-global-guidance
