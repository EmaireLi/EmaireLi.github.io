// Uses only a disposable local Miniflare D1 database. Never connects to production.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { Miniflare } = require('miniflare');

(async () => {
  const mf = new Miniflare({
    modules: true, scriptPath: path.resolve('guestbook/worker.mjs'),
    compatibilityDate: '2026-06-30', d1Databases: ['DB'],
    bindings: { ALLOWED_ORIGIN: 'https://example.test', ADMIN_TOKEN: 'local-test-only', RATE_LIMIT_SALT: 'local-test-only' },
  });
  try {
    const db = await mf.getD1Database('DB');
    for (const sql of fs.readFileSync('guestbook/schema.sql', 'utf8').split(';').filter(s => s.trim())) {
      await db.prepare(sql).run();
    }
    const request = (route, { method = 'GET', body, ip = '192.0.2.1', ua = 'test', admin = false, origin = 'https://example.test' } = {}) =>
      mf.dispatchFetch(`https://local.test${route}`, {
        method, headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': ip,
          'User-Agent': ua, Origin: origin, ...(admin ? { Authorization: 'Bearer local-test-only' } : {}) },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
    const sent = await Promise.all(Array.from({ length: 12 }, (_, i) =>
      request('/messages', { method: 'POST', body: { signature: `test-${i}`, message: '你好 <span> & 😀' } })));
    assert.equal(sent.filter(r => r.status === 201).length, 1, 'one concurrent message per IP');
    assert.equal(sent.filter(r => r.status === 429).length, 11);
    const first = (await sent.find(r => r.status === 201).json()).message;
    const duplicate = await request('/messages', { method: 'POST', ip: '192.0.2.2', body: { signature: first.signature, message: 'duplicate' } });
    assert.equal(duplicate.status, 409);
    assert.equal((await request('/messages', { method: 'POST', ip: '192.0.2.2', body: { signature: 'retry', message: 'valid retry' } })).status, 201, 'duplicate rolls back rate claim');
    await db.prepare('UPDATE guestbook_rate_limits SET last_posted_at = last_posted_at - 61').run();
    assert.equal((await request('/messages', { method: 'POST', body: { signature: 'after-interval', message: 'ok' } })).status, 201);
    for (const [route, method] of [['/admin/messages', 'GET'], ['/admin/visitors', 'GET'], [`/messages/${first.id}`, 'PATCH'], [`/messages/${first.id}`, 'DELETE']]) {
      assert.equal((await request(route, { method, body: method === 'PATCH' ? { message: 'unauthorized' } : undefined })).status, 401);
    }
    assert.equal((await request(`/messages/${first.id}`, { method: 'PATCH', admin: true, body: { message: '编辑正常' } })).status, 200);
    const list = await request('/messages');
    assert.equal(list.headers.get('X-Content-Type-Options'), 'nosniff');
    assert.equal((await list.json()).messages.find(m => m.id === first.id).message, '编辑正常');
    assert.equal((await request(`/messages/${first.id}`, { method: 'DELETE', admin: true })).status, 200);
    assert.equal((await request('/messages', { origin: 'https://untrusted.test' })).status, 403);

    const visits = await Promise.all(Array.from({ length: 12 }, (_, i) => request('/stats/visit', { method: 'POST', ua: `agent-${i}` })));
    for (const response of visits) assert.equal((await response.json()).visitors, 1, 'UA changes do not create visitors');
    assert.equal((await db.prepare('SELECT visit_count FROM site_visitors').first()).visit_count, 1);
    await db.prepare("UPDATE site_visitors SET last_seen_at = '2020-01-01T00:00:00.000Z'").run();
    await request('/stats/visit', { method: 'POST', ua: 'changed' });
    assert.equal((await db.prepare('SELECT visit_count FROM site_visitors').first()).visit_count, 2);
    assert.equal((await (await request('/stats/visit', { method: 'POST', ip: '192.0.2.3' })).json()).visitors, 2);

    // Legacy IP+UA rows and historical total must not be reset or duplicated.
    await db.prepare("INSERT INTO site_visitors VALUES ('legacy', '2019', '2020', 5, 'old', '192.0.2.9')").run();
    await db.prepare("UPDATE site_stats SET value = 100 WHERE key = 'visitors'").run();
    assert.equal((await (await request('/stats/visit', { method: 'POST', ip: '192.0.2.9', ua: 'new' })).json()).visitors, 100);
    assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM site_visitors WHERE ip_address = '192.0.2.9'").first()).n, 1);
    assert.equal((await db.prepare("SELECT visit_count FROM site_visitors WHERE visitor_hash = 'legacy'").first()).visit_count, 6);
    console.log('Worker security: PASS (real local D1 concurrency, rollback, admin CRUD, visit coalescing, legacy preservation)');
  } finally { await mf.dispose(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
