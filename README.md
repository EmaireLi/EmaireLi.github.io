# personal-github-pages-site

一个可直接部署到 GitHub Pages 的个人静态网站模板。

## 本地预览

建议在项目目录启动一个静态服务器预览（避免 `file://` 下无法读取 `posts/posts.json`）。

## 写文章（博客模式）

1. 在站点 `blog` 页点击 **编写 / 保存文章** 进入 `editor.html`。
2. 写标题和正文，点击 **保存到本地**（会下载 `.html` 文件）。
3. 把下载的 `.html` 文件放入项目 `posts/` 目录。
4. `git add . && git commit -m "add new post" && git push`，GitHub Pages 部署流程会自动更新 `posts/posts.json` 并显示到 blog 列表。

## 维护项目案例

首页 `Projects` 区展示简短项目卡片，深度说明放在 `projects/` 下的静态案例页：

- `projects/smartlabeling.html`
- `projects/yomii.html`

维护原则：

- 首页只放可快速扫描的信息：项目定位、角色、技术栈、关键证据和入口链接。
- 案例页写清楚问题、架构、实现亮点、取舍、代码阅读入口和下一步证据。
- 如果后续补项目截图或流程图，放在 `assets/projects/<project-name>/`，避免热链外部图片。
- 不写无法从代码、文档或本地素材验证的夸张结论。

## 维护首页证据区

首页 `Proof Map` 区用于快速说明当前方向、能力证据和推荐阅读路线。

维护原则：

- 首屏优先回答“我是谁、现在往哪里走、应该先看什么”，不要退回成泛泛的博客欢迎语。
- `Start here` 路由使用访问者意图来命名，例如 recruiter、technical reviewer、reader、contact；不要只重复导航栏标签。
- `Claim to evidence` 桥接区只连接站内已有证据，不新增无法验证的能力声明。
- 项目卡片的 evidence receipts 应保持 `Problem / Role / Evidence` 这种短结构，避免写成长段项目报告。
- 每一条 capability 都必须链接到可验证证据，例如案例页、仓库、脚本、文档或站内功能。
- 使用事实性标签，不写星级、百分比或无法验证的熟练度。
- 如果项目职责、技术栈或代码入口变化，先更新对应案例页，再更新首页证据区。
- 保持该区块短而可扫描；更长的解释放到项目案例或后续独立 colophon 页面。

## 维护 Site Pipeline Lens

首页 `Site Pipeline Lens` 区用于说明这个个人网站本身如何被写作、导入、索引、浏览、搜索、留言和发布。

维护原则：

- 该区块优先展示个人网站本身的工程化维护流程，不把外部 GitHub 项目当主线。
- 每一步都必须链接到真实存在的站内页面、脚本、生成文件、文档或锚点。
- 文案面向访客解释“为什么这能提升可信度”，不要写成只给开发者看的文件清单。
- 如果文章导入、清单生成、搜索、留言或部署流程变化，先更新 README，再同步更新首页区块。
- 不新增付费服务、外部账号依赖或需要登录才能验证的证据。

## 维护精选阅读路径

首页 `First reads` 区用于给第一次访问的人推荐几条进入归档的阅读路径。

维护原则：

- 该区块是人工精选，不代替 `posts/posts.json` 生成的完整归档。
- 每条路径都要说明“为什么先读这条”，不要只堆文章链接。
- 只链接已经存在的本地 `posts/*.html`，不要热链外部文章。
- 新增更有代表性的文章后，优先替换该区块的推荐，而不是无限加卡片。
- 保持 3-4 条路径；如果分类变复杂，后续再评估独立的 Topic-Based Discovery Hub。

## 维护 Code Tour

`projects/code-tour.html` 给技术 reviewer 提供 10-15 分钟的代码阅读路线。

维护原则：

- 优先链接稳定的仓库目录、文档和主配置文件，少用容易失效的行号级链接。
- 每条路线都写清楚 `inspect this because...`：看什么、证明什么、限制是什么。
- 如果外部项目目录调整，先更新对应项目案例页，再同步更新 Code Tour。
- 没有真实截图、mask 或导出文件前，不把代表性流程图写成真实产品视觉证据。

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
