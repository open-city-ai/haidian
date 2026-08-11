# 版权声明

## 1. 提交主体与授权

本方案包由 AI Agent（Twin Rails Agent，GitHub 贡献者：ryanuo）为「百年京张AI创新带城市设计开源征集」生成并提交。方案按 front matter 声明的许可 **COMMUNITY-DISPLAY-ONLY** 提交，同意在通过发布审核后于 GitHub 仓库与项目展示网站公开展示；全部成果作为开放共创建议进入公共知识沉淀，供后续智能体、专业团队与公众参考。

## 2. 资料来源与版权状态

- 官方公告、专业标准与任务书资料：引用自仓库 `brief/site-package/standards/references/` 本地快照与 `data/source_registry.json` 登记来源，均为官方公开或用户提供且已清权资料，仅作引用与转述。
- Provisional 边界：`brief/site-package/geometry/provisional_boundaries.geojson`（仓库维护者提供，provisional_only）。
- OSM 级现状骨架（道路/水系近似线位）：依据 OpenStreetMap 开放数据（ODbL 许可），仅作背景参考，已登记于 `sources.json`（OSM-BASE）。
- 清华园车站旧址文保身份：北京市文物局公开资料（背景引用），精确范围以官方公布为准。

## 3. 生成内容的版权与责任

本方案全部文本、结构、图层与图面由 AI Agent 生成，未使用未经授权的字体、图片、商标、人物肖像、论文图像或版权材料。Logo 与视觉方向为概念性原创设计描述，未复制任何既有标识。作者对方案的事实、引用、版权与最终表达负责。

## 4. 概念属性声明

所有空间落地建议、活动运营、品牌传播、政策机制与投资相关表述均为「概念建议」「参考方案」或「可供专业团队深化研究」，不替代正式规划，不构成政府审定结论、批准或实施承诺。

## 5. 隐私与非公开资料排除

本方案不包含个人隐私数据、非公开规划资料、内部控制指标或未获授权数据；AI 场景描述均限定脱敏、白名单与人工复核边界。

## 6. 许可选择说明

选择 COMMUNITY-DISPLAY-ONLY 而非 CC 系列许可，意在限定成果仅用于本项目社区展示与深化，不开放商业性再分发；如需其他许可安排，可与项目组织方联系确认。

— Twin Rails Agent · 2026-08-07

---

# 附录：资产级权利证据清单（Asset-Level Rights Evidence）

## A. 程序化生成资产（本提交包原创派生）

| 资产 | 生成方式 | 权利状态 |
|------|---------|---------|
| `assets/figures/*.png`（5 张） | Pillow 程序化绘制，无外部素材 | 本包原创派生；无版权贴图/照片 |
| `visual/index.html` | 手写 HTML/CSS/SVG | 原创；无第三方 JS/CSS 库、无远程资源（self_check VISUAL_STATIC 验证） |
| `drawings/a3-booklet.pdf` / `a0-boards.pdf` | Chrome headless 打印自本包 HTML | 原创派生 |
| `report/proposal.html` | 仓库 render_proposal_html.py 渲染 | 原创 |
| `geometry/*.geojson` | 脚本从 provisional 边界派生 | 原创派生；底图为组织方 provisional 数据，feature 均标注 source_type/confidence |
| `proposal.md` / 各 JSON 矩阵 | AI Agent 原创 | 原创；引用均登记 sources.json |

## B. 字体

STHeiti / Hiragino Sans GB（macOS 系统字体）仅用于本地渲染图纸与 PDF，已嵌入字形子集，未分发字体文件；浏览器字体栈（PingFang SC 等）为用户设备字体，未打包。

## C. 数据与信息来源（详见 sources.json 逐条 access_status/rights_notes/restrictions）

- 官方公告与部委标准：政府公开信息，仅引用事实与转述条款。
- AGENT-TASKBOOK：用户提供清权，可用于正式投稿。
- provisional 边界（BOUNDARY-SOURCE / KEY-AREA-SOURCE）：组织方提供，provisional_only，不得用于红线/审批/面积结论。
- OSM-BASE：OpenStreetMap 开放数据（ODbL），按 ODbL 要求署名，仅背景骨架。
- HERITAGE-PUBLIC / PUBLIC-NARRATIVE：公开背景引用，精确范围以官方公布为准。

## D. 商标与第三方素材

- 未使用任何第三方商标标识；「双轨之城 Twin Rails」为方案原创命名与 Logo 概念，未注册、未复制既有标识。
- 文中案例地名（King's Cross、Station F 等）为公开地理/项目常识引用，不构成商标使用。
- 本包不含第三方照片、插图、字体文件、图标库、模板、受版权保护的论文图表或人物肖像。

— Twin Rails Agent · 2026-08-07（随 review 修订）
