// Local files + mocked API only. Requires Playwright and markdown-it (or MARKDOWN_IT_PATH).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { chromium } = require('playwright');
const markdownPath = process.env.MARKDOWN_IT_PATH || require.resolve('markdown-it/dist/markdown-it.min.js');
const root = process.cwd();

(async () => {
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    let baseline = false;
    const oldSource = process.env.COMPARE_BASELINE ? execFileSync('git', ['show', `${process.env.COMPARE_BASELINE}:script.js`], { encoding: 'utf8' }) : null;
    await page.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.hostname === 'cdn.jsdelivr.net' && url.pathname.includes('markdown-it')) {
        return route.fulfill({ contentType: 'text/javascript', body: fs.readFileSync(markdownPath) });
      }
      if (url.hostname !== 'site.test') {
        if (url.pathname.endsWith('/messages')) return route.fulfill({ json: { messages: [{ id: 'fixture', signature: '测试访客', message: '正常留言 <span> 按文字显示', created_at: '2026-01-01T00:00:00Z' }] } });
        if (url.pathname.endsWith('/stats/visit')) return route.fulfill({ json: { visitors: 42 } });
        return route.abort();
      }
      const relative = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
      const filename = path.resolve(root, `.${relative}`);
      if (!filename.startsWith(`${root}${path.sep}`) || !fs.existsSync(filename)) return route.fulfill({ status: 404, body: '' });
      const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
      return route.fulfill({ contentType: types[path.extname(filename)] || 'application/octet-stream', body: baseline && relative === '/script.js' ? oldSource : fs.readFileSync(filename) });
    });
    await page.goto('https://site.test/editor.html');
    await page.waitForFunction(() => window.DOMPurify?.isSupported && typeof window.markdownit === 'function');
    const payloads = [
      '<img src=x onerror="window.securityProof=1">',
      '<svg onload="window.securityProof=1"></svg>',
      '<math><mtext><img src=x onerror="window.securityProof=1"></mtext></math>',
      '<iframe srcdoc="<script>parent.securityProof=1</script>"></iframe>',
      '<a href="javascript:window.securityProof=1">click</a>',
      '&lt;span onmouseover="window.securityProof=1"&gt;example&lt;/span&gt;',
      '&amp;lt;img src=x onerror="window.securityProof=1"&amp;gt;',
      '```html\n<img src=x onerror="window.securityProof=1">\n```',
    ];
    await page.evaluate(() => { window.securityProof = 0; });
    for (const payload of payloads) {
      await page.locator('#md-input').fill(payload);
      await page.waitForTimeout(40);
      assert.equal(await page.evaluate(() => window.securityProof), 0);
      assert.equal(await page.locator('#md-preview').evaluate(el => [...el.querySelectorAll('*')].some(node =>
        /^(SCRIPT|IFRAME|OBJECT|EMBED|SVG|MATH)$/.test(node.tagName) || [...node.attributes].some(a => /^on/i.test(a.name) || (/^(href|src)$/i.test(a.name) && /^javascript:/i.test(a.value))))), false);
    }
    const normal = '# 标题\n\n**加粗**与[链接](https://example.test)。\n\n<span style="color: red; font-size: 25px">彩色文字</span>\n\n![说明](../../assets/image/avatar.webp)\n\n| A | B |\n| - | - |\n| 1 | 2 |';
    await page.locator('#md-input').fill(normal);
    assert.equal(await page.locator('#md-preview h1').textContent(), '标题');
    assert.equal(await page.locator('#md-preview table').count(), 1);
    assert.equal(await page.locator('#md-preview .post-image-caption').textContent(), '说明');
    assert.equal(await page.locator('#md-preview span[style]').evaluate(el => getComputedStyle(el).fontSize), '25px');
    await page.locator('#md-title-input').fill('安全验证');
    await page.locator('#md-input').fill('<img src=x onerror="window.securityProof=1"><span style="color:red">正常</span>');
    const downloaded = page.waitForEvent('download');
    await page.locator('#save-local-btn').click();
    const exported = fs.readFileSync(await (await downloaded).path(), 'utf8');
    assert(!exported.includes('onerror='));
    assert(exported.includes('color:red') || exported.includes('color: red'));
    await page.evaluate(() => {
      const fixture = document.createElement('div'); document.body.append(fixture);
      const tag = 'test" onclick="window.securityProof=1';
      renderArchiveFilters(fixture, [tag], tag);
      const button = fixture.querySelectorAll('button')[1]; button.click();
      if (button.dataset.archiveTag !== tag || button.textContent !== tag || button.hasAttribute('onclick')) throw Error('tag injection');
      renderGuestbookMessages(fixture, [{ signature: '<svg onload="window.securityProof=1">', message: '<img src=x onerror="window.securityProof=1">' }]);
      if (fixture.querySelector('svg,img,script')) throw Error('guestbook injection');
      const purify = window.DOMPurify; window.DOMPurify = undefined;
      fixture.innerHTML = renderMarkdownToHtml('<img src=x onerror="window.securityProof=1">');
      if (fixture.querySelector('img')) throw Error('missing sanitizer must fail closed');
      window.DOMPurify = purify; fixture.remove();
    });
    assert.equal(await page.evaluate(() => window.securityProof), 0);

    if (oldSource) {
      const article = fs.readdirSync('posts/articles').find(name => name.includes('火在烧'));
      for (const width of [1280, 390]) {
        await page.setViewportSize({ width, height: 900 });
        for (const route of ['/index.html', `/posts/articles/${article}`, '/editor.html']) {
          const screenshots = [];
          for (const before of [true, false]) {
            baseline = before;
            await page.goto(`https://site.test${route}`);
            if (route === '/editor.html') await page.locator('#md-input').fill(normal);
            await page.waitForLoadState('networkidle');
            await page.mouse.move(0, 0);
            await page.evaluate(async () => {
              document.activeElement?.blur();
              window.scrollTo(0, 0);
              await document.fonts.ready;
              await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
              // focusout and scroll handlers update controls on the next frame.
              await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            });
            const screenshot = await page.screenshot({ fullPage: true, animations: 'disabled' });
            screenshots.push(screenshot);
            if (process.env.SCREENSHOT_DIR) {
              fs.mkdirSync(process.env.SCREENSHOT_DIR, { recursive: true });
              fs.writeFileSync(path.join(process.env.SCREENSHOT_DIR, `${path.basename(route)}-${width}-${before ? 'before' : 'after'}.png`), screenshot);
            }
          }
          assert(screenshots[0].equals(screenshots[1]), `visual mismatch: ${route} at ${width}px`);
        }
      }
    }
    console.log('Browser security: PASS (Markdown payloads, safe fallback, export, tags, guestbook, normal formatting' + (oldSource ? ', identical desktop/mobile screenshots' : '') + ')');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
