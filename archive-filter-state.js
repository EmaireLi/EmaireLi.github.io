(function exposeArchiveFilterState(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.ArchiveFilterState = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createArchiveFilterState() {
  const ALL_TAG = "全部";

  function toUrl(urlInput) {
    return new URL(String(urlInput), "https://archive.local/");
  }

  function resolveArchiveState(urlInput, validTags) {
    const url = toUrl(urlInput);
    const values = url.searchParams.getAll("tag");
    const tags = new Set(validTags || []);

    if (values.length === 0) {
      return { tag: ALL_TAG, shouldReplace: false };
    }

    if (values.length === 1 && values[0] !== ALL_TAG && tags.has(values[0])) {
      return { tag: values[0], shouldReplace: url.hash !== "#blog" };
    }

    return { tag: ALL_TAG, shouldReplace: true };
  }

  function buildArchiveUrl(urlInput, tag, { ensureBlogHash = true } = {}) {
    const url = toUrl(urlInput);
    url.searchParams.delete("tag");
    if (tag && tag !== ALL_TAG) url.searchParams.append("tag", tag);
    if (ensureBlogHash) url.hash = "blog";
    return url;
  }

  function planArchiveTransition(currentTag, nextState, cause) {
    if (cause === "popstate") return { action: "render", tag: nextState.tag };
    if (cause === "user") {
      return currentTag === nextState.tag ? { action: "none", tag: currentTag } : { action: "push", tag: nextState.tag };
    }
    return { action: nextState.shouldReplace ? "replace" : "render", tag: nextState.tag };
  }

  return { ALL_TAG, resolveArchiveState, buildArchiveUrl, planArchiveTransition };
});
