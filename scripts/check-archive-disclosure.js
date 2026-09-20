const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { renderArchive } = require('./generate-posts-manifest.js');
const source = fs.readFileSync('script.js', 'utf8');
const start = source.indexOf('function initArchiveDisclosure(');
const end = source.indexOf('\nasync function initBlogAutoList', start);
const listeners = {};
const years = [2026, 2025].map(year => ({ year, open: false, matches: s => s === '.archive-year-disclosure' }));
const summaries = years.map(year => ({ closest: () => year }));
const list = {
  addEventListener: (type, handler) => { listeners[type] = handler; },
  contains: summary => summaries.includes(summary),
  querySelectorAll: () => years.filter(year => year.open),
};
const media = { matches: true };
const context = vm.createContext({ window: { matchMedia: () => media } });
vm.runInContext(source.slice(start, end), context);
context.initArchiveDisclosure(list);
const move = (index, pointerType = 'mouse') => listeners.pointermove({ pointerType, target: { closest: () => summaries[index] } });
assert.deepEqual(years.map(y => y.open), [false, false]);
move(0);
assert.deepEqual(years.map(y => y.open), [true, false]);
move(1);
assert.deepEqual(years.map(y => y.open), [false, true]);
// Clicking the current summary can close it without movement reopening it immediately.
years[1].open = false;
move(1);
assert.equal(years[1].open, false);
listeners.pointerleave();
move(0, 'touch');
assert.equal(years[0].open, false);
media.matches = false;
move(0);
assert.equal(years[0].open, false);
// Native keyboard/click opening enforces exclusivity even without details[name].
years.forEach(y => { y.open = true; });
listeners.toggle({ target: years[1] });
assert.deepEqual(years.map(y => y.open), [false, true]);
const html = renderArchive([
  { file: 'a.html', date: '2026-01-01', title: 'One', tags: [] },
  { file: 'b.html', date: '2026-02-01', title: 'Two', tags: [] },
  { file: 'c.html', date: '2025-01-01', title: 'Three', tags: [] },
]);
assert.equal((html.match(/<details /g) || []).length, 2);
assert(!/<details[^>]*\sopen(?:\s|>|=)/.test(html));
assert(html.includes('2 篇') && html.includes('1 篇'));
assert.equal((html.match(/class="item-title archive-entry-title"/g) || []).length, 3);
console.log('Archive disclosure: pass (default closed, exclusive hover, touch, keyboard, counts, static links)');
