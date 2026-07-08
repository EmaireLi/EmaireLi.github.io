# personal-github-pages-site

一个可直接部署到 GitHub Pages 的个人静态网站模板。

## 本地预览

建议在项目目录启动一个静态服务器预览（避免 `file://` 下无法读取 `posts/posts.json`）。

## 写文章（博客模式）

1. 在站点 `blog` 页点击 **编写 / 保存文章** 进入 `editor.html`。
2. 写标题和正文，点击 **保存到本地**（会下载 `.html` 文件）。
3. 把下载的 `.html` 文件放入项目 `posts/` 目录。
4. `git add . && git commit -m "add new post" && git push`，GitHub Pages 部署流程会自动更新 `posts/posts.json` 并显示到 blog 列表。

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
