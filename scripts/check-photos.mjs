import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import { emptyData, validateData, visiblePhotos, summarizeChanges } from '../photos/model.mjs';
import { createClient, loadRemote, publish } from '../photos/admin/github.mjs';
import { validateSettings, defaults } from '../photos/admin/images.mjs';
const photo = id => ({ id, albumId: 'a', title: '中文 <script>', description: '', thumb: `assets/photos/${id}/thumb.jpg`, view: `assets/photos/${id}/view.jpg`, width: 2400, height: 1600 });
const data = { schemaVersion: 1, albums: [{ id: 'a', name: '旅行' }], photos: [photo('p1'), photo('p2')] };
const baseline = { head: 'old', data: emptyData() };
function mock({ heads = ['old', 'old'], patchError = false } = {}) {
  const calls = []; let reads = 0;
  const api = async (path, method = 'GET', body) => {
    calls.push({ path, method, body });
    if (path.startsWith('/git/ref/')) return { object: { sha: heads[Math.min(reads++, heads.length - 1)] } };
    if (path === '/git/commits/old') return { tree: { sha: 'base-tree' } };
    if (path === '/git/blobs') return { sha: 'blob' };
    if (path === '/git/trees') return { sha: 'tree' };
    if (path === '/git/commits') return { sha: 'new' };
    if (path.startsWith('/git/refs/')) { if (patchError) throw new Error('network'); return {}; }
    throw new Error(`unexpected ${path}`);
  };
  return { api, calls };
}
const pending = () => new Map(data.photos.flatMap(p => [p.thumb, p.view]).map(p => [p, new Blob(['jpeg'])]));
test('schema, safe local paths, albums and stable ordering', () => {
  validateData(data); assert.deepEqual(visiblePhotos(data, 'a'), data.photos); assert.equal(visiblePhotos(data, 'missing').length, 0);
  for (const mutate of [d => d.photos[0].thumb = '../secret', d => d.photos[0].albumId = 'bad', d => d.photos[0].originalUrl = 'javascript:alert(1)', d => d.photos.push(d.photos[0]), d => d.photos[0].width = -1]) { const d = structuredClone(data); mutate(d); assert.throws(() => validateData(d)); }
  const reversed = structuredClone(data); reversed.photos.reverse(); assert(summarizeChanges(data, reversed).includes('调整照片顺序'));
  validateSettings(defaults); assert.throws(() => validateSettings({ ...defaults, viewEdge: 100000 }));
});
test('one commit/ref update for multiple images; no unrelated tree edits', async () => {
  const { api, calls } = mock(); const result = await publish(api, baseline, data, pending());
  assert.equal(result.head, 'new'); assert.equal(calls.filter(x => x.path === '/git/commits').length, 1);
  const updates = calls.filter(x => x.method === 'PATCH'); assert.equal(updates.length, 1); assert.equal(updates[0].body.force, false);
  const tree = calls.find(x => x.path === '/git/trees').body; assert.equal(tree.base_tree, 'base-tree'); assert.equal(tree.tree.length, 5);
  assert(tree.tree.every(x => x.path === 'photos/data.json' || x.path.startsWith('assets/photos/')));
});
test('remote changes before upload or during upload never update ref', async () => {
  for (const heads of [['other'], ['old', 'other']]) { const { api, calls } = mock({ heads }); await assert.rejects(publish(api, baseline, data, pending()), /远端分支已有变化/); assert(!calls.some(x => x.method === 'PATCH')); }
});
test('missing blobs rejected; removed files deleted atomically', async () => {
  await assert.rejects(publish(mock().api, baseline, data, new Map()), /缺少展示图/);
  const { api, calls } = mock(); await publish(api, { head: 'old', data }, emptyData(), new Map());
  assert.equal(calls.find(x => x.path === '/git/trees').body.tree.filter(x => x.sha === null).length, 4);
});
test('lost PATCH response reconciled only when exact commit is head', async () => {
  assert.equal((await publish(mock({ heads: ['old', 'old', 'new'], patchError: true }).api, baseline, data, pending())).head, 'new');
  await assert.rejects(publish(mock({ patchError: true }).api, baseline, data, pending()), /核对提交/);
  const m = mock({ patchError: true }); let reads = 0;
  await assert.rejects(publish(async (...args) => { if (args[0].startsWith('/git/ref/') && ++reads === 3) throw new Error(); return m.api(...args); }, baseline, data, pending()), /结果暂时无法确认/);
});
test('failed blob upload cannot commit or move branch', async () => {
  const { api, calls } = mock(); await assert.rejects(publish((...args) => args[0] === '/git/blobs' ? Promise.reject(new Error('network')) : api(...args), baseline, data, pending()));
  assert(!calls.some(x => x.method === 'PATCH' || x.path === '/git/commits'));
});
test('API classifies rate limits, permissions, network; never exposes response bodies', async () => {
  for (const [status, headers, pattern] of [[429, { 'retry-after': '30' }, /限流.*30/], [403, { 'x-ratelimit-remaining': '0' }, /限流/], [401, {}, /Token 无效/], [422, {}, /拒绝更新/]]) {
    const api = createClient(() => 'test-only', async () => new Response('SECRET_RESPONSE', { status, headers }));
    await assert.rejects(api('/git/blobs'), pattern);
  }
  await assert.rejects(createClient(() => 'test', async () => { throw new Error('SECRET'); })('/git/blobs'), /网络连接失败/);
  let called = false; await assert.rejects(createClient(() => '', async () => { called = true; })('/git/blobs')); assert.equal(called, false);
});
test('remote JSON read uses immutable commit and decodes Chinese', async () => {
  const paths = []; const remote = await loadRemote(async path => { paths.push(path); return path.startsWith('/git/ref/') ? { object: { sha: 'exact' } } : { encoding: 'base64', content: Buffer.from(JSON.stringify(data)).toString('base64') }; });
  assert.equal(remote.data.albums[0].name, '旅行'); assert(paths[1].endsWith('?ref=exact'));
});
test('no persistence or third party scripts in admin; deployed files included', () => {
  for (const file of ['photos/admin/admin.mjs', 'photos/admin/github.mjs', 'photos/admin/images.mjs']) {
    const source = fs.readFileSync(file, 'utf8'); assert(!/localStorage|sessionStorage|indexedDB|document\.cookie|console\./.test(source));
  }
  const html = fs.readFileSync('photos/admin/index.html', 'utf8'); assert(html.includes('Content-Security-Policy')); assert(!/<script[^>]+src="https?:/.test(html));
  assert(fs.readFileSync('.github/workflows/deploy.yml', 'utf8').includes('projects photos scripts'));
  assert(fs.readFileSync('.gitignore', 'utf8').split('\n').includes('/assets/local-image/'));
  assert(fs.readFileSync('.github/workflows/deploy.yml', 'utf8').includes("--exclude='/local-image/'"));
  validateData(JSON.parse(fs.readFileSync('photos/data.json', 'utf8')));
});
