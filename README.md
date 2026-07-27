# personal-github-pages-site

一个可直接部署到 GitHub Pages 的个人静态网站模板。

## 本地预览

建议在项目目录启动一个静态服务器预览（避免 `file://` 下无法读取 `posts/posts.json`）。

## 写文章（博客模式）

1. 在站点 `blog` 页点击 **编写 / 保存文章** 进入 `editor.html`。
2. 写标题和正文，点击 **保存到本地**（会下载 `.html` 文件）。
3. 把下载的 `.html` 文件放入项目 `posts/` 目录。
4. `git add . && git commit -m "add new post" && git push`，GitHub Pages 部署流程会自动更新 `posts/posts.json` 并显示到 blog 列表。

## 站点定位

这是一个长期个人归档站，主要记录技术学习、项目实践和日常写作。首页应优先帮助读者进入文章、项目和时间线，不以招聘转化、岗位匹配或能力举证作为信息架构。

维护原则：

- 项目是个人归档的一部分，不是全站唯一主线。
- 求职相关文章和 `求职` 标签作为真实阶段记录保留，不把它们提升为站点定位。
- 首页文案描述正在学习、实践和记录的内容，避免 recruiter、reviewer、proof map、evidence receipt 等评审式表达。
- 搜索、时间线、标签筛选、编辑器和留言板是长期归档的基础能力，改版时应继续保留。

## 维护项目记录

首页“项目记录”区展示简短项目卡片，详细说明放在 `projects/` 下的静态项目页：

- `projects/smartlabeling.html`
- `projects/yomii.html`

维护原则：

- 首页记录项目用途、技术栈和阶段性收获。
- 项目页写清楚背景、结构、实现笔记、取舍、当前状态和后续记录。
- 如果后续补项目截图或流程图，放在 `assets/projects/<project-name>/`，避免热链外部图片。
- 不写夸张结论，也不把项目页包装成面试评审材料。

## 维护首页内容入口

首页的首屏和“站内路标”用于帮助第一次到访的人进入项目与文章时间线。

维护原则：

- 首屏简短说明“技术学习、项目实践和日常写作”的主题，不罗列岗位方向。
- 站内路标固定指向项目记录和时间线归档。

## 维护响应式搜索入口

首页搜索在桌面端位于左侧栏，在窄屏端紧跟站点页头，方便移动访客在进入长页面前直接检索文章。

维护原则：

- 首页只保留一个带有 `data-site-search` 的搜索区、一个 `#site-search-input` 和一套结果节点，不要为桌面端和移动端复制两套搜索。
- 在 `index.html` 中让搜索区保持在 `.main-inner` 之前；桌面位置由 CSS Grid 指定，窄屏顺序保持“页头 → 搜索 → 正文 → 站点概览 → 外部账号”。
- 搜索增强继续复用 `script.js` 里的清单缓存和结果渲染，不要新增第二条请求或筛选链路。
- JavaScript 不可用时，保留指向静态文章归档的本地阅读入口。
- 修改首页搜索的响应式样式后，同步更新 `index.html` 中 `styles.css` 的版本参数，避免部署后继续命中旧缓存。

## 维护移动端返回顶部

首页、文章页和项目案例页复用同一个返回顶部控件；移动端滚动超过阈值后显示，输入时临时隐藏，避免遮挡软键盘和表单。

维护原则：

- 任何渲染 `.back-to-top` 的页面都必须在 `<body>` 上提供唯一的 `id="top"`，并保留普通 `href="#top"` 作为无 JavaScript 回退。
- 控件标记默认带 `is-visible`；`script.js` 加载后立即同步滚动阈值和输入焦点状态，不要复制第二个移动端控件。
- 移动端触控区域保持至少 44×44px，并保留 safe-area 偏移、可见键盘焦点和 `prefers-reduced-motion` 行为。
- 同步维护 `script.js` 的编辑器导出模板、`scripts/import-xhs-notes.js` 的导入模板、现有文章/案例页及 CSS/脚本版本参数。

## 导入小红书笔记

当前浏览器安全策略不允许 Codex 直接自动读取 `xiaohongshu.com` 页面。可以把自己的笔记内容复制到本地 JSON，再导入到 `posts/`。

### 手动填写 JSON

1. 复制 `imports/xhs-notes.example.json` 为 `imports/xhs-notes.json`。
2. 按示例填写笔记标题、日期、原文链接、正文、标签和图片链接。
3. 运行：

   ```bash
   node scripts/import-xhs-notes.js imports/xhs-notes.json
   ```

脚本会生成 `posts/*.html`，并自动更新 `posts/posts.json`。

## 访客留言板

主页的“联系我”区域会从 `window.GUESTBOOK_API_URL` 读取留言 API 地址。公开站点只保存 Worker 地址，不保存管理员 token。

### 部署 Cloudflare Worker + D1

1. 创建 D1 数据库，并执行表结构：

   ```bash
   wrangler d1 execute <database-name> --file=guestbook/schema.sql
   ```

2. 部署 `guestbook/worker.mjs`，并给 Worker 绑定 D1，绑定名必须是 `DB`。
3. 设置 Worker 环境变量：
   - `ALLOWED_ORIGIN`：站点域名，例如 `https://emaireli.github.io`
   - `ADMIN_TOKEN`：只保存在 Worker secret 中的管理员 token
   - `RATE_LIMIT_SALT`：用于哈希访客 IP 的随机盐
   - `GUESTBOOK_POST_INTERVAL_SECONDS`：发送间隔，默认 `60`
4. 把 Worker URL 填进 `guestbook-config.js`：

   ```js
   window.GUESTBOOK_API_URL = "https://<your-worker>.<your-subdomain>.workers.dev";
   ```

### 留言规则

- 访客可以 `GET /messages` 读取留言。
- 访客可以 `POST /messages` 新增留言，请求体为 `{"signature":"署名","message":"留言"}`。
- Worker 强制署名必填、留言最多 100 字、发送间隔限制、同一规范化署名只能有一条留言。
- 访客端没有编辑和删除入口。
- 仓库管理者可以访问 `admin-guestbook.html`，输入 Worker secret 中的 `ADMIN_TOKEN` 后编辑或删除留言。
- 管理页也会展示 D1 中记录的访客 IP、User-Agent、访问次数、首次访问时间和最近访问时间。
- 仓库管理者也可以用 API 调用：

   ```bash
   curl -X PATCH "$GUESTBOOK_API/messages/<id>" \
     -H "Authorization: Bearer $ADMIN_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"message":"更新后的留言"}'

   curl -X DELETE "$GUESTBOOK_API/messages/<id>" \
     -H "Authorization: Bearer $ADMIN_TOKEN"
   ```

### 从小红书页面导出 JSON

1. 打开小红书主页或某篇笔记详情页。
2. 打开浏览器开发者工具 Console。
3. 复制 `scripts/xhs-export-console.js` 的全部内容粘贴运行。
4. 页面右下角会出现导出面板：
   - 在主页点击“收集当前页可见笔记链接”。
   - 逐篇打开笔记后点击“收集当前笔记详情”。
   - 完成后点击“下载 xhs-notes.json”。
5. 把下载的 `xhs-notes.json` 放到 `imports/xhs-notes.json`，再运行导入命令。

## 部署步骤

1. 在 GitHub 新建仓库（例如：`my-site`）。
2. 把本目录代码推送到该仓库的 `main` 分支。
3. 进入 GitHub 仓库：`Settings` → `Pages`。
4. 在 **Build and deployment** 中选择 **Source: GitHub Actions**。
5. 推送后等待 Actions 执行完成，访问：
   `https://<你的GitHub用户名>.github.io/<仓库名>/`

如果你使用仓库名 `username.github.io`（User Site），访问地址就是：
`https://username.github.io/`

## 维护静态文章归档

- `index.html` 中 `ARCHIVE:START` 与 `ARCHIVE:END` 之间由 `scripts/generate-posts-manifest.js` 自动生成，不要手动编辑。
- 运行 `node scripts/generate-posts-manifest.js` 会从同一份已排序文章数据同时更新 `posts/posts.json` 与首页静态归档。
- 生成器要求恰好一对且顺序正确的标记；标记缺失、重复或颠倒时会在写文件前失败。
- JavaScript 只增强静态归档的标签筛选。manifest 请求失败时必须保留静态文章链接，不能清空列表。
- 提交前连续运行两次生成命令；第二次应保持工作树不变。
- 运行 `node scripts/check-static-archive.js` 校验条目一致性、链接、转义、标记失败保护与运行时降级契约。

## 维护归档筛选 URL

- 精确标签筛选使用 `?tag=<manifest 中的标签>#blog`；“全部”用缺少 `tag` 表示，不维护第二份标签词表。
- 修改筛选状态时只删除/写入 `tag`，必须保留其他参数（包括重复值）与它们的顺序。
- 只有真实的用户筛选变化可以 `pushState`；初始规范化最多 `replaceState` 一次，`popstate` 只重绘且不能移动焦点或滚动。
- 空、未知、重复或值为“全部”的 `tag` 都降级到完整归档。无 JavaScript 或 manifest 失败时仍显示 Round 09 静态基线。
- 运行 `node scripts/check-archive-filter-state.js` 验证 Unicode、编码、参数保留和 history 决策契约。

## 维护公开留言说明

- 公开说明必须在留言按钮之前始终可见，并由按钮和表单共同通过 `aria-describedby` 引用。
- 文案只能陈述当前事实：署名和留言公开显示、不要填写私密信息、留言最多 100 字；不要承诺审核、隐私保护、删除、保留期限、回复或私密联系。
- 修改长度限制时，同步更新说明、textarea `maxlength`、`script.js` 的 `guestbookMaxLength` 与 Worker 的 `MESSAGE_MAX_LENGTH`。
- 运行 `node scripts/check-guestbook-disclosure.js` 验证顺序、语义引用、事实文案与四处长度一致性。
