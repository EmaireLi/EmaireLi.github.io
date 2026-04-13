# personal-github-pages-site

一个可直接部署到 GitHub Pages 的个人静态网站模板。

## 本地预览

直接双击 `index.html`，或在项目目录启动一个静态服务器。

## 写文章（博客模式）

1. 复制 `posts/new-post-template.html` 为新文件，例如 `posts/my-first-post.html`。
2. 修改文章标题、导语和正文内容。
3. 在 `index.html` 的“最新文章”区域新增一张文章卡片，并把链接改成新文件路径。
4. `git add . && git commit -m "add new post" && git push`，GitHub Pages 会自动更新。

## 部署步骤

1. 在 GitHub 新建仓库（例如：`my-site`）。
2. 把本目录代码推送到该仓库的 `main` 分支。
3. 进入 GitHub 仓库：`Settings` → `Pages`。
4. 在 **Build and deployment** 中选择 **Source: GitHub Actions**。
5. 推送后等待 Actions 执行完成，访问：
   `https://<你的GitHub用户名>.github.io/<仓库名>/`

如果你使用仓库名 `username.github.io`（User Site），访问地址就是：
`https://username.github.io/`
