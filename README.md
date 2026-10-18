# personal-github-pages-site

一个可直接部署到 GitHub Pages 的个人静态网站模板。

## 本地预览

建议在项目目录启动一个静态服务器预览（避免 `file://` 下无法读取 `posts/posts.json`）。

## 写文章（博客模式）

1. 在首页页脚点击圆点入口（提示为“编写文章”）进入 `editor.html`。
2. 写标题和正文，点击 **保存到本地**（会下载 `.html` 文件）。
3. 把下载的 `.html` 文件放入项目 `posts/articles/` 目录。
4. 按文末“维护验证”更新并检查归档，只提交本次文章、图片和相关生成文件，然后推送。GitHub Actions 部署时也会重新生成归档。

## 编辑器图片工具

左侧工具栏的“插入图片”会在正文光标位置插入 `![](../../assets/posts/文章标题/01.jpg)`；如果选中了正文，则替换选中的部分。插入后继续在正文编辑，预览同步更新。已填写标题时，路径自动使用该标题（路径分隔符替换为短横线，空格等特殊字符转义）；未填写时使用“文章标题”。文件名按 `01.jpg`、`02.jpg` 递增，已有编号图片也会被计入。标题修改不会改写已插入的路径。请把图片按对应名称放到 `assets/posts/` 文件夹；按钮只插入引用，不上传图片。

## 编辑器标签

编辑区下方可输入标签并按回车（或点“添加”），也可从历史标签下拉框选择。已选标签支持移除、忽略大小写去重，保存时作为隐藏标签数据附在文章中，不在正文和预览中显示；尚未按回车的输入也会随保存加入。

历史列表来自 `assets/tags.json`，记录已发布文章的标签及文章使用次数，按使用次数排序。`node scripts/generate-posts-manifest.js` 与线上部署都会刷新它。保存到本地不会写回服务器：新标签在文章加入 `posts/articles/`、提交并部署后进入历史列表。历史读取失败不影响手动添加和导出。手动设置过标签的文章不再补充关键词推断标签；新导出文章未选标签时保持无标签。旧文章未设置标签时仍按关键词推断，小红书来源标签仍由目录决定。

## 文章目录与识别规则

- 小红书同步文章：`posts/xhs/日期-标题.html`。
- 其他文章：`posts/articles/日期-标题.html`。
- 两类文章使用相同命名习惯，例如 `2026-10-16-川大随拍.html`，不需要 `xhs-` 前缀。
- 扫描这两个目录第一层的 `.html` 文件；标题读取正文第一个 `<h1>`，没有时读取 `<title>`。日期建议使用文件名开头的 `YYYY-MM-DD`。
- “小红书”来源标签由 `posts/xhs/` 目录判断，不再根据标题、正文或文件名中的关键词推断。其他主题标签继续按正文推断。
- 图片仍放在 `assets/` 下。文章多了一层目录，图片引用应写成 `../../assets/posts/文章名称/01.jpg`，Markdown 示例：`![说明](../../assets/posts/文章名称/01.jpg)`。
- 图片资源按展示方式分为两个目录：正文插图放在 `assets/posts/文章标题/`，顶部多图轮播放在 `assets/gallery/日期-标题/`。
- 小红书导入器使用 `assets/gallery/`，自动维护本地图片路径；编辑器插图按钮仍使用 `assets/posts/`。目录名不决定展示方式，正文图片或轮播组件的 HTML 决定实际布局。
- `posts/articles/new-post-template.html` 是模板，不被收录。`posts/` 根目录仅保留旧文章跳转页和清单，跳转页不重复收录。
- 放入文件后运行 `node scripts/generate-posts-manifest.js` 可本地更新列表；提交并推送到 `main` 后，部署流程会自动生成清单并发布。

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
- 项目页按实际资料组织内容，不强制固定章节；以用户提供的汇报或 README 为依据，区分个人贡献、团队成果与尚未验证的计划。
- 项目侧栏搜索位于说明卡片上方；卡片标题和章节链接由 `initArticleOutline()` 从 `.post-title` 与 `.article-content h2` 自动生成，不手写第二份目录。
- 如果后续补项目截图或流程图，放在 `assets/projects/<project-name>/`，避免热链外部图片。
- 不写夸张结论，也不把项目页包装成面试评审材料。

## 维护首页内容入口

首页按“现有个人介绍 → 文章归档 → 项目记录 → 留言”排列，保留液态玻璃样式和项目卡片结构。

维护原则：

- 公共导航使用“文章 / 项目 / 关于”，沿用 `#blog`、`#projects`、`#about`。
- 编辑器入口放在首页页脚；修改导航时同步现有页面、编辑器导出模板和小红书导入模板。
- 不添加站内路标或泛化板块导语，个人介绍与文章原文保持原样。
- 静态和动态归档仅显示日期、标题和标签；清单中的摘要和全文数据继续供搜索使用。

## 维护搜索入口

- 首页搜索位于“近期更新”标题下方；项目详情页搜索在左侧说明卡片上方；文章阅读页保留顶部搜索入口。不要将不同页面强制改成同一种布局。
- 每个页面只保留一套搜索输入与结果节点，复用 `script.js` 的清单缓存和结果渲染。
- JavaScript 不可用时，保留静态文章归档与阅读链接。
- 改动搜索样式或交互时检查桌面和窄屏布局，并更新受影响页面的资源版本参数。

## 维护移动端返回顶部

首页、文章页和项目案例页复用同一个返回顶部控件；移动端滚动超过阈值后显示，输入时临时隐藏，避免遮挡软键盘和表单。

维护原则：

- 任何渲染 `.back-to-top` 的页面都必须在 `<body>` 上提供唯一的 `id="top"`，并保留普通 `href="#top"` 作为无 JavaScript 回退。
- 控件标记默认带 `is-visible`；`script.js` 加载后立即同步滚动阈值和输入焦点状态，不要复制第二个移动端控件。
- 移动端触控区域保持至少 44×44px，并保留 safe-area 偏移、可见键盘焦点和 `prefers-reduced-motion` 行为。
- 同步维护 `script.js` 的编辑器导出模板、`scripts/import-xhs-notes.js` 的导入模板、现有文章/案例页及 CSS/脚本版本参数。

## 导入小红书笔记

导入器读取本地 JSON，不依赖浏览器登录态。可手动整理自己的笔记，或使用下方的页面导出脚本，再导入到 `posts/xhs/`。

### 手动填写 JSON

1. 复制 `imports/xhs-notes.example.json` 为 `imports/xhs-notes.json`。
2. 按示例填写笔记标题、日期、原文链接、正文、标签和图片链接。
3. 运行：

   ```bash
   node scripts/import-xhs-notes.js imports/xhs-notes.json
   ```

脚本会生成 `posts/xhs/*.html`，并自动更新 `posts/posts.json`。

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
- 运行 `node scripts/generate-posts-manifest.js` 会从同一份已排序文章数据同时更新 `posts/posts.json`、首页静态归档与 `assets/tags.json`。
- 生成器要求恰好一对且顺序正确的标记；标记缺失、重复或颠倒时会在写文件前失败。
- JavaScript 只增强静态归档的标签筛选。manifest 请求失败时必须保留静态文章链接，不能清空列表。
- 仅在修改生成器时检查幂等性：连续生成两次，第二次输出应保持不变。普通文章更新生成一次即可。

## 维护归档筛选 URL

- 精确标签筛选使用 `?tag=<manifest 中的标签>#blog`；“全部”用缺少 `tag` 表示，不维护第二份标签词表。
- 修改筛选状态时只删除/写入 `tag`，必须保留其他参数（包括重复值）与它们的顺序。
- 只有真实的用户筛选变化可以 `pushState`；初始规范化最多 `replaceState` 一次，`popstate` 只重绘且不能移动焦点或滚动。
- 空、未知、重复或值为“全部”的 `tag` 都降级到完整归档。无 JavaScript 或 manifest 失败时仍显示已生成的静态归档。

## 维护公开留言说明

- 公开说明必须在留言按钮之前始终可见，并由按钮和表单共同通过 `aria-describedby` 引用。
- 文案只能陈述当前事实：署名和留言公开显示、不要填写私密信息、留言最多 100 字；不要承诺审核、隐私保护、删除、保留期限、回复或私密联系。
- 修改长度限制时，同步更新说明、textarea `maxlength`、`script.js` 的 `guestbookMaxLength` 与 Worker 的 `MESSAGE_MAX_LENGTH`。

## 维护验证

按改动选择检查；无需每次执行整套。授权与提交规则统一见 [AGENTS.md](AGENTS.md)。

| 受影响内容 | 检查 |
| --- | --- |
| JavaScript | 对修改的文件运行 `node --check <文件路径>` |
| 文章或清单生成规则 | `node scripts/generate-posts-manifest.js`，然后 `node scripts/check-static-archive.js` |
| XHS 导入、文章目录识别 | `node --check scripts/import-xhs-notes.js`、`node scripts/check-post-directories.js`；发布说明见“导入小红书笔记” |
| 编辑器标签 | `node scripts/check-editor-tags.js` |
| 归档标签 URL、年份展开 | 分别运行 `node scripts/check-archive-filter-state.js`、`node scripts/check-archive-disclosure.js` |
| 公开留言说明 | `node scripts/check-guestbook-disclosure.js`；这不代替 Worker/API 行为验证 |
| 页面样式与交互 | 本地预览受影响页面，检查相关交互、链接、图片及窄屏溢出 |
| 仅文档 | 核对文档涉及的路径与命令，运行 `git diff --check` |

生成命令会写入三个归档产物；不要把它作为无关修改的例行检查。现有 `check-*.js` 使用本地文件或临时测试目录，不访问线上留言数据库。新增或修改测试时重新确认其副作用。

部署配置以 `.github/workflows/deploy.yml` 为准：推送 `main` 会生成归档并发布 `_site/`。增加发布资源时核对复制列表；推送成功不等于部署成功，只有观察到 Actions 或线上结果后才能声称已上线。
