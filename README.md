# personal-github-pages-site

一个可直接部署到 GitHub Pages 的个人静态网站模板。

## 本地预览

直接双击 `index.html`，或在项目目录启动一个静态服务器。

## 写文章（博客模式）

1. 在站点 `blog` 页点击 **编写 / 保存文章** 进入 `editor.html`。
2. 写标题和正文，点击 **保存到本地**（会同时下载 `.md` 和 `.html` 文件）。
3. 把下载的 `.html` 文件放入项目 `posts/` 目录。
4. 在 `index.html` 的 blog 列表中新增文章链接。
5. `git add . && git commit -m "add new post" && git push`，GitHub Pages 会自动更新。

## 部署步骤

1. 在 GitHub 新建仓库（例如：`my-site`）。
2. 把本目录代码推送到该仓库的 `main` 分支。
3. 进入 GitHub 仓库：`Settings` → `Pages`。
4. 在 **Build and deployment** 中选择 **Source: GitHub Actions**。
5. 推送后等待 Actions 执行完成，访问：
   `https://<你的GitHub用户名>.github.io/<仓库名>/`

如果你使用仓库名 `username.github.io`（User Site），访问地址就是：
`https://username.github.io/`
