export const DATA_PATH = 'photos/data.json';
export const emptyData = () => ({ schemaVersion: 1, albums: [], photos: [] });
const idPattern = /^[a-zA-Z0-9_-]{1,80}$/;
const imagePattern = /^assets\/photos\/[a-zA-Z0-9_-]+\/(thumb|view)\.jpg$/;
export const imagePaths = data => new Set(data.photos.flatMap(p => [p.thumb, p.view]));
export function validateData(data) {
  const fail = () => { throw new Error('相册资料格式不正确，请检查 data.json；未覆盖现有内容。'); };
  if (!data || data.schemaVersion !== 1 || !Array.isArray(data.albums) || !Array.isArray(data.photos)) fail();
  const albums = new Set(), ids = new Set(), paths = new Set();
  for (const a of data.albums) {
    if (!a || typeof a.id !== 'string' || !idPattern.test(a.id) || albums.has(a.id) || typeof a.name !== 'string' || !a.name.trim() || a.name.length > 100) fail();
    albums.add(a.id);
  }
  for (const p of data.photos) {
    if (!p || typeof p.id !== 'string' || !idPattern.test(p.id) || ids.has(p.id) || (p.albumId !== '' && !albums.has(p.albumId)) ||
        typeof p.title !== 'string' || p.title.length > 200 || typeof p.description !== 'string' || p.description.length > 4000 ||
        !Number.isInteger(p.width) || !Number.isInteger(p.height) || p.width < 1 || p.height < 1 || p.width > 20000 || p.height > 20000) fail();
    for (const field of ['thumb', 'view']) {
      if (!imagePattern.test(p[field]) || paths.has(p[field]) || p[field] !== `assets/photos/${p.id}/${field}.jpg`) fail();
      paths.add(p[field]);
    }
    if (p.originalUrl && (typeof p.originalUrl !== 'string' || !/^https:\/\//.test(p.originalUrl))) fail();
    if (p.originalBytes != null && (!Number.isSafeInteger(p.originalBytes) || p.originalBytes < 0)) fail();
    ids.add(p.id);
  }
  return data;
}
export const visiblePhotos = (data, albumId = '') => data.photos.filter(p => !albumId || p.albumId === albumId);
export function summarizeChanges(before, after) {
  const lines = [];
  for (const [key, label] of [['albums', '相册'], ['photos', '照片']]) {
    const old = new Map(before[key].map(x => [x.id, x]));
    const next = new Map(after[key].map(x => [x.id, x]));
    for (const x of after[key]) {
      const name = x.name || x.title || x.id;
      if (!old.has(x.id)) lines.push(`新增${label}：${name}`);
      else if (JSON.stringify(old.get(x.id)) !== JSON.stringify(x)) lines.push(`修改${label}：${name}`);
    }
    for (const x of before[key]) if (!next.has(x.id)) lines.push(`删除${label}：${x.name || x.title || x.id}`);
    const sharedOld = before[key].filter(x => next.has(x.id)).map(x => x.id);
    const sharedNext = after[key].filter(x => old.has(x.id)).map(x => x.id);
    if (JSON.stringify(sharedOld) !== JSON.stringify(sharedNext)) lines.push(`调整${label}顺序`);
  }
  return lines;
}
