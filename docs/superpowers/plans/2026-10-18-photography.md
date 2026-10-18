# Photography Implementation Plan

**Goal:** 在静态个人归档中实现独立摄影页及浏览器批量管理发布。
**Architecture:** 页面、数据校验、图像处理、GitHub 发布各自独立的原生模块。共享 JSON 结构不依赖文章产物。
**Tech Stack:** HTML / CSS / ES modules / Canvas / GitHub REST Git API / Node tests。

## Global Constraints

遵守同日 photography design 和当前用户要求；不改 smartlabeling、文章生成物或原有图片目录；Token 不持久化；不强推；无真实样片则压缩参数暂定。

## 执行任务（当前会话顺序实施）

- [x] `photos/model.mjs` 定义 validateData、visiblePhotos、summarizeChanges、imagePaths；schemaVersion=1，albums={id,name}，photos={id,albumId,title,description,thumb,view,width,height,originalUrl?,originalBytes?}。
- [x] `photos/index.html`、`photos/photos.css`、`photos/gallery.mjs`：数据读取重试、按相册筛选、原比例照片墙、dialog 图片状态与可访问交互；`photos/data.json` 初始为空。
- [x] `photos/admin/images.mjs`：逐张 createImageBitmap/from-image 解码、两级 canvas JPEG、释放资源；返回展示图 blob 与尺寸。
- [x] `photos/admin/github.mjs`：注入 fetch 的 API 客户端、固定 commit 读取、串行 blob 上传、tree/commit/ref 原子提交与保守冲突处理。
- [x] `photos/admin/index.html`、`admin.mjs`：内存编辑、新增相册/照片、排序/删除确认、压缩参数与生成大小、发布摘要、显式发布、凭证清除及离页提醒。
- [x] 首页添加入口；部署复制 photos；README 记录流程、限制与检查命令；assets/photos/README 说明只存展示图。
- [x] `scripts/check-photos.mjs` 用 node:test 及注入 fetch 检查数据、安全路径、发布成功/失败/冲突/限流；`node --check` 检查所有新增模块。
- [x] 本地 HTTP 预览桌面与窄屏；临时合成图测试查看器、管理页与压缩；不写入发布数据。执行 `node scripts/check-static-archive.js`、`git diff --check`。
- [ ] 检查 task diff、原 smartlabeling 校验和、暂存明确文件，commit/push main；只读查询 Actions 及线上页面，报告可验证状态。

不依赖未安装的执行技能或另一个会话；按用户要求直接推进。压缩真实样片比较和真实凭证上传留作明确的未验证项，不作为虚构的完成记录。
