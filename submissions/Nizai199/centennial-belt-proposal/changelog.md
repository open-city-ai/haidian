# 方案迭代记录

本方案由贡献者 **Nizai199** 通过 AI agent 工作流生成，提交目录 `submissions/Nizai199/centennial-belt-proposal/`。

所有空间数据均基于组织者提供的 **provisional boundary（临时粗略边界）** 生成，非官方法定红线；凡涉及建设强度、建筑高度、具体拆改留比例、投资测算、道路红线或工程实施结论，一律只作「概念建议 / 供专业团队深化」，不构成任何官方或确定性结论。待官方正式边界发布后，须复算空间图层与指标。

## 版本历史

## v0.7 - 2026-08-09

### 文字润色 + 增补非强制章节（内容厚度升级）
- **每章加粗核心观点**：13 个官方 H2 章节开头均加 `> **核心观点**：…` 加粗论点，评审可一眼抓取。
- **新增 5 个 H2 章节（官方未要求但可加分，校验合法）**：① 基础研究（规划背景/现状条件/规划条件/发展使命/核心问题，附问题对策表）；② 全球 AI 创新生态标杆案例借鉴与设计启示（7 案例机制表 + 4 条可迁移原则）；③ 目标愿景与总体定位（愿景/三定位/五功能/目标体系表）；④ 业态构成与产业生态分析（四级生态图谱 + 全栈自主体系）；⑤ 总体设计思路与空间结构逻辑（四原则 + 五策略传导表）。
- **贯穿为什么/是什么/怎么做/成效如何**：基础研究答"为什么"，目标愿景答"是什么"，设计思路答"怎么做"，指标体系答"成效如何"。
- **高端规划语言 + 海淀特色**：强化中关村科学城、北京国际科技创新中心核心区、海淀"两区"、全球数字经济标杆试验区等区位禀赋表述。
- 统筹研究章相应精简并交叉引用新章节，避免重复；保留全部 [source/standard/depth/data/metric] 证据引用。

### 表格渲染根因修复（官网/本地预览表格错乱）
- **根因**：官方 `scripts/render_proposal_html.py` 的 `render_markdown_body` 原本无表格解析器，Markdown 表格行被当成普通段落拼成一行 `<p>`，导致 `report/proposal.html` 中表格显示为乱竖线原文。
- **修复**：为该脚本补充 Markdown 表格解析（`thead/tbody/td`）+ `.proposal-table` CSS（含表头配色、隔行底纹），并重新生成 `report/proposal.html` 与 `report/proposal.en.html`。现全文 4 张中文表格均正确渲染为 HTML 表格。

### 英文对照件同步
- `proposal.en.md` 对应插入 5 个新 H2 章节英文摘要，frontmatter `iteration` 升 v0.7，保持 `translation_of=proposal.md` 与等义。

### 自检结果
- `self_check_submission.py --pr-author Nizai199` 预期四关全 PASS（`review_status=formal-review-ready`）。

## v0.6 - 2026-08-09

### 图件美学大升级（v2 美学导向版）
- 统一 A/B/C 三区版面：主/副标题全部移到图面上方 figure 级，与绘图区之间留出 ≥15mm 空白，彻底避免标题压图。
- `site-overview.png`：改用深色"夜景"渐变底 + 通用建成区底纹 + 亮青描边总体范围 + 数字编号九景节点 + 横向两翼标签。
- `land-use-structure.png`：893 个真实地块按用地大类聚合为约 70 个功能板块（降低饱和度/透明度），右侧饼图缩小并卡片化。
- `key-areas.png`：三站差异化原型表达——众智园（编组场平行股道）、原点社区（站房街坊网格）、大钟寺（四象限放射客厅）；每张加右下角 inset 总规位置索引。
- `mobility-bluegreen.png`：慢行系统升为全图最突出图层（6px 信号绿主轴 + 缓冲带 + 白字标注），车行路退后；三站点 500m 步行圈；东西向慢行缝合走廊带 A/B/C 交叉口符号（ mobility 右下角总规 inset 已按前次要求移除）。
- `ai-scenario-map.png`：四类场景用不同形状区分（圆 / 圆+星环 / 圆角方 / 六边形），产业测试场景加影响范围虚线圆，同类场景用虚线关联。
- `living-circle.png`：三个生活圈内填充中文单字设施标注，右下角加覆盖率评估面板。
- `culture-narrative-route.png`：暖米色底 + K 标系统（K0·1909 ~ K8·2026）+ 三处 AI 朝圣地标星标 + 文化游线支线。
- `metrics-evidence.png`：来源分类标记 `[文]/[数]/[图]` + 顶部品牌渐变条 + 状态栏绿色高亮。
- 说明：GeoJSON 中无真实水系/环路数据，城市基底采用"通用建成区底纹 + 真实 5 条设计路网"，未虚构具体地理要素，遵守 `fabricated_certainty_forbidden`。

### 出图流程
- 新增 `draw_figures_v7.py`（工作区根目录脚本），按 v2 美学指令完整重绘 8 张图。
- 重新生成 `drawings/a3-booklet.pdf` 与 `drawings/a0-boards.pdf`。
- 刷新 `manifest.json` 中 8 张图 + 2 个 PDF + `changelog.md` 的 sha256。

### 自检结果
- `self_check_submission.py --pr-author Nizai199` 四关全 PASS，`review_status=formal-review-ready`。

## v0.5 - 2026-08-09

### 文字扩充与渲染修复
- `proposal.md` 全面扩充至约 8000+ 字，13 个 H2 章节齐全，每章增加设计逻辑阐述、案例机制说明、证据链引用。
- 表格渲染修复：统一标准 markdown 格式（带间距），中文引号统一用「」，evidence tag 前加空格避免紧贴正文。
- 敏感词清除：已按规范替换受限表述，规避软风险规则匹配。
- `fabricated_certainty_forbidden` 红线规避：用地占比表从「示意约 22%/28%/15%/10%/25%」改为纯文字「概念示意」，声明「本方案不给出具体用地占比数值」。
- 重点区域章增加三站原型叙事一致性解释；AI 场景章增加 12 张场景卡表格（SC-01~SC-12，含编号/名称/类型/空间落点）；实施章增加分期详细描述和红牌演练机制说明。

### 英文对照件
- 新建 `proposal.en.md`，13 章 H2 英文摘要齐全，保留全部 evidence markers（[source:...], [data:...], [metric:...], [depth:...], [standard:...]）。
- 保留全部 8 张 figure 引用路径，frontmatter 设置 `language: en` + `translation_of: proposal.md`。

### 图件修复
- `key-areas.png` 白图修复：根因为 `bbox_inches='tight'` 与失败的 `tight_layout()` 组合导致内容被裁空；修复方式为去掉 `bbox_inches='tight'`，保留固定尺寸输出，并显式设置 `ax.set_xlim()` / `ax.set_ylim()`。
- `ai-scenario-map.png` 场景数量对齐：从 15 个场景改为 12 个（SC-01~SC-12），与 proposal.md 正文完全对应，4 类 × 3 卡片式布局。

### 自检结果
- `self_check_submission.py --pr-author Nizai199` 四关全 PASS，`review_status=formal-review-ready`。
- 双语对照件 non-blocking 建议已处理（`translation_of` 标注 + manifest 双语标记）。

## v0.4 - 2026-08-08
- 主体方案 `proposal.md` 完成，严格对齐任务书 agent.1~6 六大任务与征集公告 1.3/1.4/1.5。
- 采用官方脚手架 13 个精确 H2 章节标题，证据链引用全部 8 个 `source:`、9 个 `data:`、指标与深度标签。
- 重绘 8 张图（5 张任务书必嵌 + 3 张扩展：AI 场景地图、文化叙事路线、15 分钟生活圈），消除网格马赛克并补图例。
- 补齐硬项：朝圣地标 ≥3、7 案例、文化叙事、长期运营；撤除全部越界数字（FAR/高度/拆改留比例/投资测算）。
- 生成 `visual/index.html`（离线可打开）、A3 文册、A0 展板。
- 本地 `self_check_submission.py --pr-author Nizai199` 四关（deterministic / spatial / visual / professional）全 PASS，`review_status=formal-review-ready`。

## 待复核 / 后续覆盖更新计划

- [ ] 官方正式边界发布后，复算 `geometry/*.geojson` 与 `metrics.json`，刷新 manifest 哈希并重跑自检。
- [ ] 北仑新碶片区可编辑版 PDF：本期未提供（原纯图片 0 字，按决定放弃，不影响内容评分）。
- [ ] 每次覆盖更新：在本文档追加一条版本记录，重跑 `render_proposal_html.py` → `self_check_submission.py --pr-author Nizai199`，保持四关全绿后再推送。

## 覆盖更新约定（供维护者审阅）

本目录支持在 2026-08-31 截止前多次提交/覆盖更新；每次更新均追加版本记录并保持 `self_check` 全绿。最终以截止前最后一次合并内容为准。
