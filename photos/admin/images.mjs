export const defaults = { thumbEdge: 960, viewEdge: 3200, thumbQuality: 0.86, viewQuality: 0.90 };
export const MAX_PENDING_BYTES = 100 * 1024 * 1024;
export function validateSettings(s) {
  if (!Number.isInteger(s.thumbEdge) || s.thumbEdge < 320 || s.thumbEdge > 1600 || !Number.isInteger(s.viewEdge) || s.viewEdge < 1600 || s.viewEdge > 4800 || s.thumbEdge > s.viewEdge ||
    ![s.thumbQuality, s.viewQuality].every(q => Number.isFinite(q) && q >= 0.6 && q <= 0.98)) throw new Error('压缩参数超出范围：缩略长边 320–1600、查看长边 1600–4800、JPEG 质量 0.60–0.98。');
}
async function encode(source, edge, quality) {
  const scale = Math.min(1, edge / Math.max(source.width, source.height));
  const width = Math.max(1, Math.round(source.width * scale)), height = Math.max(1, Math.round(source.height * scale));
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  try {
    const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('无法分配图像内存。');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, width, height); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source, 0, 0, width, height);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', quality));
    if (!blob || blob.type !== 'image/jpeg') throw new Error('浏览器无法生成 JPEG。');
    return { blob, width, height };
  } finally { canvas.width = canvas.height = 1; }
}
export async function processPhoto(file, settings = defaults) {
  validateSettings(settings);
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('请选择 JPEG、PNG 或 WebP；RAW/HEIC 请先在本地导出 JPEG。');
  if (file.size > 100 * 1024 * 1024) throw new Error('单张文件超过 100 MiB，请先在本地导出较小 JPEG。');
  if (!globalThis.createImageBitmap) throw new Error('当前浏览器不支持此图像处理方式，请使用新版 Chrome、Edge 或 Safari。');
  let bitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const thumb = await encode(bitmap, settings.thumbEdge, settings.thumbQuality);
    const view = await encode(bitmap, settings.viewEdge, settings.viewQuality);
    return { thumb, view };
  } catch (error) {
    throw new Error(`图片处理失败，可能是格式不支持或解码内存不足。可减少批次或先在本地缩小后重试。${error.message === '浏览器无法生成 JPEG。' ? error.message : ''}`);
  } finally { bitmap?.close(); }
}
