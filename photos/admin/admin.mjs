import { validateData, summarizeChanges, imagePaths } from '../model.mjs';
import { createClient, loadRemote, publish } from './github.mjs';
import { processPhoto, MAX_PENDING_BYTES } from './images.mjs';
const $ = id => document.getElementById(id);
let data, baseData, baseline, busy = false, reviewed = '';
const pending = new Map(), previews = new Map();
const api = createClient(() => $('token').value.trim());
const dirty = () => data && JSON.stringify(data) !== JSON.stringify(baseData);
const status = message => { $('admin-status').textContent = message; };
const bytes = n => `${(n / 1024 / 1024).toFixed(2)} MiB`;
const totalBytes = () => [...pending.values()].reduce((sum, blob) => sum + blob.size, 0);
function lock(value) { busy = value; $('workspace').disabled = value || !data; $('connect').disabled = value; $('token').disabled = value; }
function changed() { reviewed = ''; $('review-panel').hidden = true; }
function release(id) { for (const type of ['thumb', 'view']) { const key = `assets/photos/${id}/${type}.jpg`; pending.delete(key); if (previews.has(key)) URL.revokeObjectURL(previews.get(key)); previews.delete(key); } }
function preview(path) { return previews.get(path) || new URL(`../../${path}`, import.meta.url).href; }
function button(text, action) { const b = document.createElement('button'); b.type = 'button'; b.textContent = text; b.onclick = action; return b; }
function field(text, value, onInput, multiline = false) {
  const label = document.createElement('label'); label.textContent = text;
  const input = document.createElement(multiline ? 'textarea' : 'input'); input.value = value; input.maxLength = multiline ? 4000 : 200;
  input.oninput = () => { onInput(input.value); changed(); }; label.append(input); return label;
}
function albumOptions(select, value = '') {
  select.replaceChildren();
  for (const a of [{ id: '', name: '未归类（只显示在全部作品）' }, ...data.albums]) { const o = document.createElement('option'); o.value = a.id; o.textContent = a.name; select.append(o); }
  select.value = value;
}
function render() {
  const previousAlbum = $('new-album').value;
  albumOptions($('new-album'), data.albums.some(a => a.id === previousAlbum) ? previousAlbum : '');
  $('albums').replaceChildren(); $('photos').replaceChildren();
  data.albums.forEach(a => {
    const row = document.createElement('div'); row.className = 'album-row';
    const name = field('相册名称', a.name, value => { a.name = value; albumOptions($('new-album')); for (const select of $('photos').querySelectorAll('select')) albumOptions(select, select.value); });
    name.querySelector('input').maxLength = 100;
    row.append(name, button('删除相册', () => {
      if (!confirm(`删除相册“${a.name}”？其中照片会移到未归类，不删除照片。`)) return;
      data.albums = data.albums.filter(x => x.id !== a.id); for (const p of data.photos) if (p.albumId === a.id) p.albumId = ''; changed(); render();
    })); $('albums').append(row);
  });
  data.photos.forEach((p, index) => {
    const row = document.createElement('article'); row.className = 'admin-row'; row.dataset.id = p.id;
    const img = document.createElement('img'); img.src = preview(p.thumb); img.alt = p.title || '照片预览';
    const content = document.createElement('div'), fields = document.createElement('div'); fields.className = 'fields';
    const title = field('标题', p.title, value => { p.title = value; });
    const label = document.createElement('label'); label.textContent = '归属相册'; const select = document.createElement('select'); albumOptions(select, p.albumId); select.onchange = () => { p.albumId = select.value; changed(); }; label.append(select);
    const description = field('说明', p.description, value => { p.description = value; }, true); description.className = 'wide'; fields.append(title, label, description);
    const toolbar = document.createElement('div'); toolbar.className = 'toolbar';
    const move = delta => { const to = index + delta; [data.photos[index], data.photos[to]] = [data.photos[to], data.photos[index]]; changed(); render(); $('photos').querySelector(`[data-id="${p.id}"] button:not(:disabled)`)?.focus(); };
    const up = button('上移', () => move(-1)), down = button('下移', () => move(1)); up.disabled = index === 0; down.disabled = index === data.photos.length - 1;
    const remove = button('删除照片', () => { if (!confirm(`删除“${p.title || '未命名'}”及其两级展示图？发布后生效。`)) return; data.photos.splice(index, 1); release(p.id); changed(); render(); });
    toolbar.append(up, down, remove);
    for (const [key, name] of [['thumb', '缩略图'], ['view', '查看图']]) { const a = document.createElement('a'); a.href = preview(p[key]); a.target = '_blank'; a.rel = 'noopener'; a.textContent = `${name} ↗${pending.has(p[key]) ? ` (${bytes(pending.get(p[key]).size)})` : ''}`; toolbar.append(a); }
    content.append(fields, toolbar); row.append(img, content); $('photos').append(row);
  });
}
async function loadLocal() {
  lock(true);
  $('reload-local').hidden = true;
  try { const r = await fetch('../data.json', { cache: 'no-store', signal: AbortSignal.timeout(30000) }); if (!r.ok) throw new Error(); data = validateData(await r.json()); baseData = structuredClone(data); render(); lock(false); status('可以先整理草稿；发布前需输入 Token 并读取远端资料。'); }
  catch { status('读取相册资料失败。请重试，或输入 Token 读取远端资料。'); $('reload-local').hidden = false; }
  finally { lock(false); }
}
$('reload-local').onclick = loadLocal;
$('connect').onclick = async () => {
  lock(true);
  try {
    const remote = await loadRemote(api);
    if (dirty() && JSON.stringify(remote.data) !== JSON.stringify(baseData)) {
      throw new Error('远端相册与当前草稿基线不同。草稿已保留；请在另一窗口查看远端并记录需要保留的编辑，再刷新本页重新整理。');
    }
    if (!dirty()) { data = structuredClone(remote.data); baseData = structuredClone(remote.data); }
    baseline = remote; changed(); render(); status(`已读取 main @ ${remote.head.slice(0, 8)}。发布前仍会再次检查远端版本。`);
  } catch (e) { status(e.message); } finally { lock(false); }
};
const clearToken = () => { $('token').value = ''; };
$('clear-token').onclick = () => { clearToken(); status('Token 已清除，后续 GitHub 请求需重新输入。已发出的请求无法撤回；草稿仍在当前页面。'); };
window.addEventListener('pagehide', () => { clearToken(); for (const url of previews.values()) URL.revokeObjectURL(url); previews.clear(); });
window.addEventListener('pageshow', e => { clearToken(); if (e.persisted) { for (const [path, blob] of pending) previews.set(path, URL.createObjectURL(blob)); render(); } });
window.addEventListener('beforeunload', e => { if (dirty() || busy) { e.preventDefault(); e.returnValue = ''; } });
$('add-album').onclick = () => { data.albums.push({ id: `a-${crypto.randomUUID()}`, name: '新相册' }); changed(); render(); $('albums').lastElementChild.querySelector('input').focus(); };
$('files').onchange = async e => {
  const files = [...e.target.files]; e.target.value = ''; if (!files.length) return;
  if (files.length > 20) { status('每批最多 20 张，请分批选择。'); return; }
  const albumId = $('new-album').value;
  const settings = { thumbEdge: Number($('thumb-edge').value), viewEdge: Number($('view-edge').value), thumbQuality: Number($('thumb-quality').value), viewQuality: Number($('view-quality').value) };
  lock(true); changed(); $('processing-results').replaceChildren();
  try {
    for (let i = 0; i < files.length; i++) {
      status(`正在处理 ${i + 1} / ${files.length}：${files[i].name}`);
      const result = document.createElement('li');
      try {
        const output = await processPhoto(files[i], settings);
        if (totalBytes() + output.thumb.blob.size + output.view.blob.size > MAX_PENDING_BYTES) throw new Error('待发布展示图达到 100 MiB 上限，请先发布已有批次。');
        const id = `p-${crypto.randomUUID()}`;
        const p = { id, albumId, title: files[i].name.replace(/\.[^.]+$/, '').slice(0, 200), description: '', thumb: `assets/photos/${id}/thumb.jpg`, view: `assets/photos/${id}/view.jpg`, width: output.view.width, height: output.view.height };
        for (const type of ['thumb', 'view']) { pending.set(p[type], output[type].blob); previews.set(p[type], URL.createObjectURL(output[type].blob)); }
        data.photos.push(p);
        result.textContent = `${files[i].name}：原文件 ${bytes(files[i].size)} → 缩略 ${output.thumb.width}×${output.thumb.height} / ${bytes(output.thumb.blob.size)}，查看 ${output.view.width}×${output.view.height} / ${bytes(output.view.blob.size)}`;
      } catch (error) { result.textContent = `${files[i].name}：${error.message}`; }
      $('processing-results').append(result);
    }
    render(); status('本批处理结束。请检查逐张结果与预览；失败照片可重新选择。尚未上传。');
  } finally { lock(false); }
};
$('review').onclick = () => {
  try {
    validateData(data); const summary = summarizeChanges(baseData, data); $('summary').replaceChildren();
    for (const line of summary) { const li = document.createElement('li'); li.textContent = line; $('summary').append(li); }
    const removed = [...imagePaths(baseData)].filter(p => !imagePaths(data).has(p)).length;
    $('upload-size').textContent = `目标 main · 上传 ${pending.size} 个展示图文件，共 ${bytes(totalBytes())}；删除 ${removed} 个展示图文件；另含独立相册资料。原图不上传。`;
    $('publish').disabled = !summary.length; reviewed = JSON.stringify(data); $('review-panel').hidden = false;
    if (!summary.length) status('没有待提交变更。');
  } catch (e) { status(e.message); }
};
$('publish').onclick = async () => {
  if (!baseline) { status('请先输入 Token 并读取远端资料，再检查摘要。'); return; }
  if (JSON.stringify(data) !== reviewed) { status('草稿已变化，请重新查看摘要。'); changed(); return; }
  lock(true);
  try {
    baseline = await publish(api, baseline, data, pending, status); baseData = structuredClone(data); pending.clear(); changed();
    // Keep local previews until leaving so a successful commit is viewable before Pages catches up.
    status(`提交成功：${baseline.head}。Pages 部署仍需等待，尚未验证线上结果。本地仓库请同步远端（git pull --ff-only）。`);
  } catch (e) { status(e.message); } finally { lock(false); }
};
loadLocal();
