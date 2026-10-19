import { validateData, visiblePhotos } from './model.mjs';
import { createPhotoReveal } from './reveal.mjs';
const $ = id => document.getElementById(id);
const root = new URL('../', import.meta.url);
let data, filtered = [], selected = '', current = 0, opener, generation = 0, loadTimer;
const viewer = $('viewer');
const reveal = createPhotoReveal($('wall'));
const src = path => new URL(path, root).href;
function render(animate = true) {
  reveal.reset();
  filtered = visiblePhotos(data, selected);
  $('wall').replaceChildren();
  $('count').textContent = `${filtered.length} 张作品`;
  $('status').textContent = filtered.length ? '' : data.photos.length ? '这个相册还没有作品。' : '照片还在整理，稍后见。';
  $('status').hidden = !!filtered.length;
  $('status').classList.toggle('empty', !filtered.length);
  for (const b of $('filters').children) b.setAttribute('aria-pressed', String(b.dataset.album === selected));
  filtered.forEach((p, index) => {
    const item = document.createElement('article'); item.className = 'photo'; item.dataset.photoId = p.id;
    const button = document.createElement('button'); button.className = 'photo-open'; button.setAttribute('aria-label', `查看 ${p.title || '未命名照片'}`);
    const img = document.createElement('img'); img.width = p.width; img.height = p.height; img.alt = p.title; img.loading = 'lazy'; img.decoding = 'async'; img.src = src(p.thumb);
    const error = document.createElement('span'); error.className = 'thumb-error'; error.hidden = true; error.textContent = '缩略图加载失败，仍可点击查看大图。';
    const retry = document.createElement('button'); retry.textContent = '重试缩略图'; retry.hidden = true;
    img.onerror = () => { error.hidden = retry.hidden = false; };
    img.onload = () => { error.hidden = retry.hidden = true; };
    retry.onclick = () => { img.src = `${src(p.thumb)}?retry=${Date.now()}`; };
    button.append(img, error); button.onclick = () => { opener = button; current = index; viewer.showModal(); $('close').focus(); showPhoto(); };
    const label = document.createElement('div'); label.className = 'photo-label';
    const title = document.createElement('span'); title.textContent = p.title || '未命名';
    const number = document.createElement('span'); number.textContent = String(index + 1).padStart(2, '0');
    label.append(title, number); item.append(button, label, retry); $('wall').append(item);
  });
  reveal.observe(animate);
}
function showPhoto(retry = false) {
  clearTimeout(loadTimer);
  if (document.activeElement === $('retry')) $('close').focus();
  const p = filtered[current], version = ++generation;
  $('position').textContent = `${current + 1} / ${filtered.length}`;
  $('photo-title').textContent = p.title || '未命名'; $('photo-description').textContent = p.description;
  $('original').hidden = !p.originalUrl; $('original').removeAttribute('href');
  if (p.originalUrl) $('original').href = p.originalUrl;
  $('previous').disabled = $('next').disabled = filtered.length < 2;
  $('full-image').hidden = true; $('full-image').alt = p.title;
  $('image-status').textContent = '正在加载查看图…'; $('retry').hidden = true; $('stage').setAttribute('aria-busy', 'true');
  const loader = new Image();
  loader.onload = () => {
    if (version !== generation || !viewer.open) return;
    clearTimeout(loadTimer);
    $('full-image').src = loader.src; $('full-image').hidden = false; $('image-status').textContent = ''; $('stage').setAttribute('aria-busy', 'false');
    if (!navigator.connection?.saveData) for (const offset of [-1, 1]) {
      const neighbor = filtered[current + offset]; if (neighbor) new Image().src = src(neighbor.view);
    }
  };
  loader.onerror = () => {
    if (version !== generation || !viewer.open) return;
    clearTimeout(loadTimer);
    $('image-status').textContent = '图片加载失败，请检查网络后重试。'; $('retry').hidden = false; $('stage').setAttribute('aria-busy', 'false');
  };
  loadTimer = setTimeout(() => loader.onerror(), 30000);
  loader.src = src(p.view) + (retry ? `?retry=${Date.now()}` : '');
}
const step = delta => { current = (current + delta + filtered.length) % filtered.length; showPhoto(); };
$('close').onclick = () => viewer.close();
viewer.addEventListener('close', () => { generation++; clearTimeout(loadTimer); $('full-image').removeAttribute('src'); opener?.focus({ preventScroll: true }); });
$('previous').onclick = () => step(-1); $('next').onclick = () => step(1); $('retry').onclick = () => showPhoto(true);
viewer.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); step(e.key === 'ArrowLeft' ? -1 : 1); }
  if (e.key === 'Tab') {
    const controls = [...viewer.querySelectorAll('button:not(:disabled),a[href]')].filter(x => !x.hidden);
    const first = controls[0], last = controls.at(-1);
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
let touch;
$('stage').addEventListener('touchstart', e => { touch = e.touches.length === 1 ? [e.touches[0].clientX, e.touches[0].clientY] : null; }, { passive: true });
$('stage').addEventListener('touchmove', e => { if (e.touches.length > 1) touch = null; }, { passive: true });
$('stage').addEventListener('touchcancel', () => { touch = null; });
$('stage').addEventListener('touchend', e => {
  if (!touch) return;
  const dx = e.changedTouches[0].clientX - touch[0], dy = e.changedTouches[0].clientY - touch[1]; touch = null;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
}, { passive: true });
async function load() {
  $('reload').hidden = true; $('status').hidden = false; $('status').textContent = '正在读取作品…';
  try {
    const response = await fetch(new URL('./data.json', import.meta.url), { cache: 'no-cache', signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(); data = validateData(await response.json());
    $('filters').replaceChildren();
    for (const a of [{ id: '', name: '全部作品' }, ...data.albums]) {
      const b = document.createElement('button'); b.textContent = a.name; b.dataset.album = a.id;
      b.onclick = event => { selected = a.id; render(event.detail !== 0); }; $('filters').append(b);
    }
    selected = ''; render();
  } catch { $('status').textContent = '暂时无法读取相册，请稍后重试。'; $('reload').hidden = false; }
}
$('reload').onclick = load;
load();
