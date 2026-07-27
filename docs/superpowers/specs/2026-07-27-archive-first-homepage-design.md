# 归档优先首页改版设计

## 目标

把首页从面向招聘者的“能力证明型作品集”改回个人长期归档站。站点首先用于记录技术学习、项目实践和日常写作；项目内容仍然保留，但不再承担岗位匹配、招聘转化或能力举证的任务。

## 定位原则

- 首屏直接说明站点记录技术学习、项目实践和日常写作。
- 首页围绕“最近在写什么、做过什么、如何继续阅读”组织，不围绕“我适合什么岗位、如何验证能力”组织。
- 求职相关文章和“求职”标签作为真实阶段记录保留，不把它们提升为全站定位。
- 保留原生 HTML、CSS、JavaScript 架构，不增加框架或外部依赖。
- 保留搜索、编辑器、时间线归档、标签筛选、留言板和外部账号入口。

## 首页信息架构

首页按以下顺序组织：

1. 简短自我介绍和三条内容入口：最近阅读、项目记录、文章归档。
2. About：保留学生身份、兴趣和长期归档说明。
3. 精选阅读：按技术与工具、项目与实践、生活记录、ACGN 随笔组织。
4. 项目记录：展示项目用途、本人参与部分、技术栈和阶段性收获。
5. 关于本站：用简短说明介绍本地写作、XHS 导入、文章索引、搜索和静态发布方式。
6. 时间线文章归档。
7. 留言与外部账号。

导航调整为 `About / Reading / Projects / Archives / Editor`，删除 `Proof`。

## 删除范围

- 删除 `Proof Map`、Hiring Snapshot、能力证据矩阵、Suggested review routes 和 Claim to evidence。
- 删除以 Recruiter、Technical reviewer、Process reviewer 为对象的访问路径。
- 删除项目卡片里的 `Problem / Role / Evidence` receipts 和 proof list。
- 删除首页对 Code Tour 和 AI-team 决策文档的公开引导。
- 删除首屏中的 `proof-first portfolio`、`Best first proof`、`Review proof`、`Not only a resume` 等求职作品集措辞。

## 改写范围

- 首屏改为个人归档介绍，不罗列岗位方向或技术能力标签。
- `Projects` 的对外语义改为“项目记录”；保留真实项目、技术栈和 GitHub 链接。
- 项目详情页保留架构、实现和取舍，删除 `Proof`、`Current Evidence`、`Next Proof To Add`、reviewer route 等审查式表达。
- `Site Pipeline Lens` 缩短为“关于本站”，只解释内容维护流程，不强调可信度或可检查性。
- `First reads` 保留，但重排为内容主题入口，不把 Career / direction 放在第一位。
- README 删除会驱动后续改版回到招聘导向的维护规则，并明确“长期个人归档优先”。

## Code Tour 处理

`projects/code-tour.html` 不再作为公开阅读路径。首页和项目详情页移除所有入口；文件本身暂时保留，避免为一次定位改版做不可逆删除，后续可单独决定是否彻底移除。

## 样式与响应式

复用现有视觉语言和卡片系统，删除只服务于 Proof Map、review routes 和 evidence receipts 的样式。桌面与移动端都保持清晰的阅读顺序，不改动搜索、归档筛选和留言交互。

## 验证

- 检查首页与三个项目页不再出现 recruiter、reviewer、proof-first、hiring、evidence receipt 等求职评审措辞。
- 检查首页所有内部链接和锚点有效。
- 运行 `node --check script.js`。
- 运行 `node --check scripts/import-xhs-notes.js`。
- 运行 `node scripts/generate-posts-manifest.js`。
- 运行已有静态归档、筛选状态和留言披露检查。
- 本地预览首页和项目页的桌面、移动布局。

## 非目标

- 不删除真实文章或“求职”标签。
- 不重写文章正文。
- 不改留言后端、访客统计或编辑器行为。
- 不引入新的构建系统、CMS 或 JavaScript 框架。
