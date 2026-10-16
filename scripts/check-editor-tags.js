const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('script.js', 'utf8');
const context = vm.createContext({});
for (const name of ['escapeHtml', 'normalizePostTags', 'renderEditorTags']) {
  const start = source.indexOf(`function ${name}(`);
  assert(start >= 0);
  const end = source.indexOf('\n}', start) + 2;
  vm.runInContext(source.slice(start, end), context);
}
const render = tags => context.renderEditorTags(tags);
assert.equal(render([]), '');
assert.equal((render([' #摄影 ', '摄影', 'JAVA', 'java']).match(/class="xhs-tag"/g) || []).length, 2);
const escaped = render(['<img src=x onerror=alert(1)>', 'A&B']);
assert(!escaped.includes('<img'));
assert(escaped.includes('&lt;img'));
assert(escaped.includes('A&amp;B'));
const posts = JSON.parse(fs.readFileSync('posts/posts.json', 'utf8'));
const history = JSON.parse(fs.readFileSync('assets/tags.json', 'utf8'));
for (const entry of history) {
  assert.equal(entry.count, posts.filter(post => post.tags.some(tag => tag.toLowerCase() === entry.tag.toLowerCase())).length);
}
assert.equal(new Set(history.map(entry => entry.tag.toLowerCase())).size, history.length);
assert(history.every((entry, index) => !index || history[index - 1].count >= entry.count));
console.log('Editor tags: pass (empty, normalized deduplication, escaped export, history counts and ordering)');
