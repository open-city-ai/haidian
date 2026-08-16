# 版权、来源与权利台账（Copyright, Source & Rights Ledger）

> 本文件为 `submission-validation` 评审要求的"可核验版权与来源台账"的实质化交付。逐文件说明作者/生成工具、字体与许可证、底层数据、代码许可证、第三方素材、允许复用范围与署名要求；不能证明者明确标注为"待替换/待补证"。

## 0. 总体许可与生成性质

- **生成主体**：本投稿包全部文本、几何、图纸、PDF 与静态 HTML 资产均由 `agent.json` 声明的 AI 智能体（小满 AI 设计伙伴 / WorkBuddy）在 `open-city-ai/haidian` 官方技能链下生成，属**模型生成物**，须经资质建筑师/规划师复核后方可用于实施。
- **包级许可**：`COMMUNITY-DISPLAY-ONLY`（社区展示用途）。未授予商业利用、二次发行或建改许可；地标/Logo/字体/人物/企业名称均按"概念候选"处理，不构成已批建或已签约标识。
- **严禁主张**：本包不表述任何已批准、已实施或已签约内容；所有"建设、运营、政策、合作"均为概念建议，所有涉及政府/医院/高校/企业/平台的主体均标注"拟议主体/待协商，无既有协议证据"。

## 1. 逐文件权利台账

| 文件 | 作者/生成工具 | 底层数据来源 | 字体/许可证 | 代码许可证 | 复用范围与署名 |
|---|---|---|---|---|---|
| `manifest.json` | AI 生成 | — | — | MIT（脚本） | 随包展示，须署名 ceceliacchen |
| `agent.json` | AI 生成 | — | — | — | 随包展示 |
| `proposal.md` / `proposal.en.md` | AI 生成（中/英） | 公告+任务书+provisional 几何 | 文本（无嵌入字体文件） | — | COMMUNITY-DISPLAY-ONLY；署名 ceceliacchen |
| `report/narrative.md` | AI 生成 | 同上 | 文本 | — | 同上 |
| `report/proposal.html` / `proposal.en.html` | AI 由 proposal.md 转译 | 同上 | 系统 CJK 字体栈（无字体文件分发） | — | 同上 |
| `visual/index.html` / `index.en.html` | AI 生成 | 同上 | 系统 CJK 字体栈 | — | 同上 |
| `self_check.json` | AI 生成 | 内部自检 | — | — | 随包展示 |
| `assumptions.json` | AI 生成 | 临时边界/假设模型 | — | — | 随包展示 |
| `sources.json` | AI 生成（来源台账） | 公告/任务书/规范 | — | — | 随包展示 |
| `compliance_matrix.json` | AI 生成 | 公告 1.5 + 任务书 agent.1–6 | — | — | 随包展示 |
| `standard_matrix.json` | AI 生成 | 7 项国家/行业规范 | — | — | 随包展示；规范文本版权归原发布机关 |
| `design_depth_matrix.json` | AI 生成 | provisional/假设 | — | — | 随包展示；状态已按下调 |
| `metrics.json` | AI 由 geometry 复算 | geometry/*.geojson（provisional） | — | — | 随包展示；数值非批准指标 |
| `geometry/*.geojson`（9 个） | AI 基于 `brief/site-package/provisional_boundaries.geojson` 生成 | **临时边界，非官方红线 polygon** | — | — | 仅供摄取/复算/可视化；**不作为正式空间控制依据** |
| `assets/figures/*.png`（5 张） | `build_scripts/figures.py`（matplotlib） | geometry + metrics | 文字已栅格化（**无字体文件分发**）；SimHei 为系统字体仅用于渲染 | 脚本 MIT | 图可随包展示；署名 ceceliacchen |
| `drawings/a3-booklet.pdf` 等 4 个 | `build_scripts/drawings.py`（reportlab） | 同上 + figures | **PDF 内嵌 SimHei 字形**（微软系统字体，再分发受限，见 §3） | 脚本 MIT | 随包展示；正式发布前建议换 SIL 字体 |
| `report/copyright_statement.md` | 本文件 | — | — | — | 随包展示 |

## 2. 底层数据与来源分级（对应 source_registry_summary）

- **provisional_only（临时，非法定）**：`geometry/site_boundary.geojson` 及全部由临时边界派生的面积/比例。仅用于方向性估算与复算方法演示，**不作正式空间控制依据**，官方 polygon 到位后须全量重算。
- **background_only（背景，不作合规证明）**：8 个全球案例（Mission Bay / Quayside / Seaport / King's Cross / Punggol / Sangam / 未来科技城 / 张江）为综述性背景启发，**无逐案可核验来源、发布时间/访问日期、许可与事实交叉验证**，不能单独证明原创性或作为合规依据；老年智能技术文件（ELDERLY-SMART-TECH-PLAN-2020-45）仅作背景，不作正式合规结论。
- **已批准正式来源**：征集公告、面向智能体任务书、以及 standard_matrix 中 7 项国家/行业规范（住建部城市设计管理办法、控规深度、建筑设计深度 2016、自然资源部用地分类指南、生成式 AI 暂行办法、无障碍环境建设法）。其中 `MOHURD-ARCH-DESIGN-DEPTH-2016` 等以"方法参照"方式引用，非对地块的批准结论。

## 3. 字体许可与再分发说明

- **HTML / PNG**：CJK 文字经系统字体（SimHei / Noto Sans SC 候选）渲染后**栅格化为像素**，**不随产物分发任何字体文件**，无字体再分发问题。
- **PDF（A3/A0）**：reportlab 将 SimHei（微软 Windows 系统字体）字形嵌入 PDF。系统字体嵌入再分发属许可灰区；**在面向公众的正式发布前，建议改用 SIL Open Font License 的 Noto Sans SC 并显式嵌入**，以彻底清除字体许可风险。本包当前以 COMMUNITY-DISPLAY-ONLY 展示，不构成商业分发。

## 4. 第三方素材与署名

- 未使用任何需二次授权的图片、地图底图、代码库或商业素材；地图为底图自绘（基于 provisional 边界），不含第三方瓦片。
- 规范、公告、任务书版权归原发布机关，本包仅作方法性引用并标注来源，不主张其版权。
- 案例城市名称仅作背景类比，不涉及其专有标识或图像。

## 5. 不能证明 / 须替换或删除的项（诚实声明）

- **精确规划数字**（84 栋拆改留、4–16 层、FAR 0.79、总建面 905.7 万㎡、分期精确面积等）：源于假设模型，不能作为专业/法定结论，本包已将其状态下调为参数化演示/方向性估算，并建议正式提交前以官方普查与控规条件替换。
- **配套深化交付物（概念级，已全部形成可审阅成果）**：14 张完整场景卡（`visual/assets/scenario-cards.json` + `report/narrative.md`）、Logo/VI（`report/narrative.md` + `visual/assets/logo.svg` + `report/narrative.md`）、生态图谱（`report/narrative.md` + `report/narrative.md`）、EN–ZH 术语表（`visual/assets/visual/assets/glossary.json` + `report/narrative.md`）、实施运营矩阵（`visual/assets/visual/assets/implementation-matrix.json` + `report/narrative.md`）、公共空间组件库（`visual/assets/visual/assets/component-library.json` + `report/narrative.md`）、荣誉体系（`report/narrative.md`）、开发者治理与转化路径（`report/narrative.md`）、小月河连续路径（`report/narrative.md`）、国际传播结构（`report/narrative.md`）。以上均为概念级，须经资质团队与官方资料复核后深化，已在 `assumptions.json` 登记。
- **合作/运营能力证据**：与政府、医院、高校、企业、平台的合作均为"拟议主体/待协商，无既有协议证据"，不主张任何既有合作。

> 本台账所列"AI 生成""provisional""background_only"等分类均可在 `sources.json`、`assumptions.json` 与 `standard_matrix.json` 中交叉核验；凡标注"待替换/待补证"者，均不构成现实世界版权或审批证明。
