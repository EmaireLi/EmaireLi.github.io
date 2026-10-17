const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'post-directories-'));
const generator = path.resolve('scripts/generate-posts-manifest.js');
const importer = path.resolve('scripts/import-xhs-notes.js');
const write = (file, value) => fs.writeFileSync(path.join(root, file), value);
const generate = () => {
  execFileSync(process.execPath, [generator], { cwd: root });
  return JSON.parse(fs.readFileSync(path.join(root, 'posts/posts.json'), 'utf8'));
};
try {
  for (const dir of ['posts/xhs', 'posts/articles', 'scripts']) fs.mkdirSync(path.join(root, dir), { recursive: true });
  write('index.html', '<!-- ARCHIVE:START --><!-- ARCHIVE:END -->');
  const page = '<h1>同一个标题</h1><article>这篇文章介绍小红书和 xhs 的用法，以及保研、实习和专业代码。<p class="post-tags"><span class="post-tag">#摄影</span></p><span class="xhs-tag">#旧标签</span></article>';
  write('posts/xhs/2026-10-16-同一个标题.html', page);
  write('posts/articles/2026-10-16-同一个标题.html', page);
  write('posts/articles/new-post-template.html', page);
  write('posts/old-link.html', page);
  let entries = generate();
  assert.equal(entries.length, 2);
  assert(entries.every(p => p.title === '同一个标题' && p.date === '2026-10-16'));
  assert(entries.every(p => p.tags.includes('摄影') && p.tags.includes('旧标签')));
  assert(entries.every(p => !p.tags.includes('求职') && !p.tags.includes('技术')), 'explicit tags must override inferred keywords');
  write('posts/articles/2026-10-14-empty.html', '<h1>保研代码</h1><p class="post-tags" hidden></p>');
  assert.deepEqual(generate().find(p => p.file.endsWith('empty.html')).tags, [], 'explicit empty tags must stay empty');
  fs.unlinkSync(path.join(root, 'posts/articles/2026-10-14-empty.html'));
  assert(entries.find(p => p.file.startsWith('xhs/')).tags.includes('小红书'));
  assert(!entries.find(p => p.file.startsWith('articles/')).tags.includes('小红书'));
  fs.copyFileSync(generator, path.join(root, 'scripts/generate-posts-manifest.js'));
  write('notes.json', JSON.stringify([{ title: '无来源前缀', date: '2026-10-15', content: '无来源前缀\n这是一段用于验证导入流程的文章正文，包含足够长度并保留原始内容。\n2026-10-15' }]));
  for (let i = 0; i < 2; i++) execFileSync(process.execPath, [importer, 'notes.json'], { cwd: root });
  entries = generate();
  assert.equal(entries.length, 3, 'repeat import must not duplicate posts');
  const imported = fs.readFileSync(path.join(root, 'posts/xhs/2026-10-15-无来源前缀.html'), 'utf8');
  assert(imported.includes('href="../../styles.css'));
  assert(imported.includes('data-post-base="../../posts/"'));
  console.log('Post directories: pass (same titles, dates, folder-based source, excluded redirects/template, repeated import, nested paths)');
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
