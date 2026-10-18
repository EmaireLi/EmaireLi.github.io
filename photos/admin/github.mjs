import { DATA_PATH, validateData, imagePaths } from '../model.mjs';
export const repository = { owner: 'EmaireLi', repo: 'EmaireLi.github.io', branch: 'main' };
export function createClient(getToken, fetcher = fetch) {
  return async function api(path, method = 'GET', body) {
    const token = getToken();
    if (!token) throw new Error('请先输入当前页面使用的 Token。');
    let response;
    try {
      response = await fetcher(`https://api.github.com/repos/${repository.owner}/${repository.repo}${path}`, {
        method, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(60000),
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      });
    } catch { throw new Error('网络连接失败或请求超时。草稿仍在当前页面；请检查网络后重试。'); }
    if (!response.ok) {
      const retry = response.headers.get('retry-after'), reset = response.headers.get('x-ratelimit-reset');
      if (response.status === 429 || (response.status === 403 && (retry || response.headers.get('x-ratelimit-remaining') === '0'))) {
        const wait = retry ? `等待 ${retry} 秒` : reset ? `${new Date(Number(reset) * 1000).toLocaleString()} 后` : '稍后';
        throw new Error(`GitHub 请求限流，请${wait}重试。草稿已保留在当前页面。`);
      }
      const messages = { 401: 'Token 无效或已过期。', 403: '访问被拒绝，请检查 Contents 权限、分支规则，或稍后再试（可能为限流）。', 404: '仓库、分支或相册资料不存在，或 Token 无访问权限。', 409: '远端发生冲突，未覆盖分支。', 422: '远端拒绝更新，可能有新提交或分支规则限制，未强制覆盖。' };
      throw new Error(messages[response.status] || `GitHub 请求失败（HTTP ${response.status}）。草稿仍在当前页面。`);
    }
    return response.json();
  };
}
const refPath = `/git/ref/heads/${repository.branch}`;
export async function loadRemote(api) {
  const head = (await api(refPath)).object.sha;
  const file = await api(`/contents/${DATA_PATH}?ref=${head}`);
  if (file.encoding !== 'base64' || typeof file.content !== 'string') throw new Error('相册资料无法读取或过大。');
  const bytes = Uint8Array.from(atob(file.content.replace(/\s/g, '')), c => c.charCodeAt(0));
  return { head, data: validateData(JSON.parse(new TextDecoder().decode(bytes))) };
}
export async function toBase64(blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = '';
  for (let i = 0; i < bytes.length; i += 16384) binary += String.fromCharCode(...bytes.subarray(i, i + 16384));
  return btoa(binary);
}
export async function publish(api, baseline, data, pending, report = () => {}) {
  validateData(data);
  const conflict = () => new Error('远端分支已有变化。未覆盖；请保留草稿，重新读取远端并核对后再发布。');
  if ((await api(refPath)).object.sha !== baseline.head) throw conflict();
  const parent = await api(`/git/commits/${baseline.head}`);
  const wanted = imagePaths(data), previous = imagePaths(baseline.data), tree = [];
  for (const path of wanted) if (!previous.has(path) && !pending.has(path)) throw new Error('新增照片缺少展示图，请重新选择该照片。');
  let done = 0;
  for (const [path, blob] of pending) {
    if (!wanted.has(path)) continue;
    report(`正在上传展示图 ${++done} / ${[...pending.keys()].filter(p => wanted.has(p)).length}`);
    const result = await api('/git/blobs', 'POST', { content: await toBase64(blob), encoding: 'base64' });
    tree.push({ path, mode: '100644', type: 'blob', sha: result.sha });
  }
  for (const path of previous) if (!wanted.has(path)) tree.push({ path, mode: '100644', type: 'blob', sha: null });
  tree.push({ path: DATA_PATH, mode: '100644', type: 'blob', content: JSON.stringify(data, null, 2) + '\n' });
  report('正在合并图片与资料，创建一次提交…');
  const newTree = await api('/git/trees', 'POST', { base_tree: parent.tree.sha, tree });
  const commit = await api('/git/commits', 'POST', { message: 'Update photography albums', tree: newTree.sha, parents: [baseline.head] });
  if ((await api(refPath)).object.sha !== baseline.head) throw conflict();
  try {
    await api(`/git/refs/heads/${repository.branch}`, 'PATCH', { sha: commit.sha, force: false });
  } catch (error) {
    // A response can be lost after GitHub accepted the update. Never blindly replay it.
    let head;
    try { head = (await api(refPath)).object.sha; } catch {
      throw new Error(`发布结果暂时无法确认。请到 GitHub 提交记录核对 ${commit.sha}，不要直接重复发布。草稿仍在当前页面。`);
    }
    if (head !== commit.sha) throw new Error(`${error.message} 请核对提交 ${commit.sha} 是否已进入分支历史后再操作。`);
  }
  return { head: commit.sha, data: structuredClone(data) };
}
