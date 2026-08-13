# 版权、授权与生成方法声明

方案：京张人字智带 · 城市即接口（`submissions/wenkang-xie/city-as-interface`）
贡献者 GitHub：wenkang-xie　·　Agent：Claude Opus 5 (Anthropic)　·　许可：CC-BY-4.0　·　迭代：v1.1

## 1. 授权与许可

本提交包内由本方案创作的全部内容——`proposal.md` 正文与其等价英文译稿 `proposal.en.md`、9 个 GeoJSON 图层、
`metrics.json` 与三张矩阵、5 张图示（中英各一套）、A3 文册与 A0 展板（中英各一套）、`visual/index.html` 与
`report/proposal.html` 及其英文副本——以 **CC-BY-4.0** 授权，
允许征集组织方、维护者、评审专家与后续专业团队复制、改编、深化与再发布，署名保留贡献者 GitHub 名与 Agent 名即可。

## 2. 第三方素材：无

本提交包**不包含任何第三方素材**：

- 未使用第三方图片、照片、渲染图、插画或图标文件。
- 未使用第三方商标、企业标识、人物肖像或论文图像。
- 未使用商用地图瓦片、卫星影像或付费底图。
- 未分发任何字体文件。图纸与页面中的中文字形由本机系统字体（PingFang SC）在生成时渲染为 PDF 矢量轮廓与 PNG 位图，
  提交包内不含字体二进制，也不再分发字体本身；`visual/index.html` 与 `report/proposal.html` 只声明字体族名并回退到系统字体，
  不加载任何远程或本地字体文件。
- 文中引用的七个国际案例（King's Cross Knowledge Quarter、Station F、one-north、MaRS Discovery District、
  Maria 01、Stanford Research Park、张江人工智能岛）**仅以文字描述其公开可核的机制特征**，未使用其标识、图像、
  规划图纸或未经核实的经营数据。

## 3. 数据来源与边界

空间数据来源见 `sources.json`，共 9 条，全部为公开或仓库已登记清权的材料。其中：

- `BOUNDARY-SOURCE` 与 `KEY-AREA-SOURCE` 为仓库登记的 **provisional 粗略替代边界**，
  `official_boundary=false`、`geometry_role=provisional_constraint`、`boundary_precision=provisional_rough`。
  **不是官方红线**，不得用于精确面积、法定管控、审批或权属/工程边界。
- 未使用任何非公开地图、未经授权的企业数据或个人数据。
- `geometry/constraints.geojson` 中的铁路走廊示意中心线为依据公开走向绘制的 `analysis_helper`，
  不表达铁路用地界、保护范围或工程条件。

## 4. 生成方法披露（对应共创原则第 6 条）

| 成果 | 生成方式 | 人工环节 |
| --- | --- | --- |
| `proposal.md` 正文 | Agent 依据公告、面向智能体任务书、结构化任务包与本地标准快照撰写 | 人工确定选题方向、核实事实边界、决定最终发布 |
| 9 个 GeoJSON 图层 | Agent 编写的 Python 脚本在 EPSG:4548 中以有序 claim 栈剖分提交边界后生成，导出为 EPSG:4326；依赖 shapely、pyproj | 人工复核拓扑结果与用途分配逻辑 |
| `metrics.json` | 由提交 GeoJSON 投影至 EPSG:4548 复算；管控类指标保持 unknown | 人工确认哪些指标不得给出数值 |
| 5 张图示、A3 文册、A0 展板 | Agent 编写的 matplotlib 脚本从同一批 GeoJSON、metrics 与矩阵文件生成，无外部素材 | 人工审阅版面与可读性 |
| `visual/index.html` | Agent 生成的离线静态页面，地图为由 GeoJSON 直接导出的内联 SVG | 人工核对指标一致性与合规声明 |
| `report/proposal.html` | 先运行仓库 `scripts/render_proposal_html.py`，再由本方案的渲染器重排以支持 Markdown 表格显示（仓库渲染器不渲染表格）；输出仍为离线、仅本地图片、无脚本 | 人工核对五张必需图示与证据标签显示 |
| `proposal.en.md` | Agent 依据中文正文逐章改写为等价英文稿，术语统一采用仓库 `docs/terminology-glossary.md` 的推荐译法；**不是逐字机器翻译** | 人工核对章节、主张、指标与证据引用与中文版逐条对齐 |
| `*.en.png` / `*.en.pdf` / `visual/index.en.html` | 同一批生成脚本在 `FIG_LANG=en` 下重新出图，沿用 Agent 编写的中英对照词表替换标签文字 | 人工审阅英文版面换行与可读性 |
| `report/proposal.en.html` | 由本方案渲染器**直接渲染 `proposal.en.md`**，而不是翻译中文 HTML，避免译稿与阅读版脱节 | 人工核对五张英文图示显示 |

生成脚本为本方案的工作工具，按提交包路径规则不随包提交；上述描述与 `agent.json` 的 `generation_disclosure_zh` 一致，
可据此复现。

**双语一致性说明。** 英文副本与中文版共用同一批 GeoJSON、`metrics.json` 与矩阵文件，几何、数值与证据引用在两种语言中
**完全相同**，差异仅限文字标签与叙述语言。中文为主体语言（`language: "zh"`），英文为等价译稿
（`translation_of: "proposal.md"`），对应关系在 `manifest.json` 中逐条声明。若两版出现任何数值或结论冲突，
以中文版与结构化文件为准。

## 5. 内容合规

- 全文不含个人隐私、身份证号、手机号或可识别到具体自然人的信息。
- 不含攻击性、歧视性、违法或恶意内容。
- 不声称获得任何官方审定、审批、背书或实施承诺；不构成法定规划、控规调整、土地权属、投资测算或工程可行性结论。
- 全部空间落地建议均表述为**概念建议、参考方案或可供专业团队深化研究的材料**。
- 所提出的感知与场景机制以数据最小化、只用公开或已授权数据、保留人工复核为前提；不含个人画像、人脸识别或无人工复核的自动处置。

## 6. 后续处置

若组织方发布官方精确 polygon、控规条件或其他清权资料，本方案承诺按 `assumptions.json` 中 A-BOUNDARY-001 的解除条件
**整包重算全部图层、指标、图纸与页面**，并提交迭代版本，而不是只替换单个边界文件。
