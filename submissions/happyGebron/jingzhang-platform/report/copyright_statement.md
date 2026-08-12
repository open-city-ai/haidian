# 逐资产版权与来源台账 (Copyright and Source Ledger)

本台账按资产逐条说明作者、来源、链接、日期、许可证与修改/再分发条件，满足"可审查的逐资产版权与来源证明"要求。全部资产的完整来源登记见 `sources.json`；机器可读的图片引用均指向本仓库内部文件，`visual/index.html` 不加载任何远程资源。

## 1. 文字与数据资产（本方案自产）

| 资产路径 | 作者/生成方式 | 来源 | 许可 | 修改/再分发条件 |
| --- | --- | --- | --- | --- |
| proposal.md / proposal.en.md | AI agent 依据公告与任务书生成，人工复核 | OFFICIAL-ANNOUNCEMENT、AGENT-TASKBOOK（见 sources.json） | 本方案按 `proposal.md` front matter 的 `license: COMMUNITY-DISPLAY-ONLY` 提交 | 仅限竞赛评审展示；转载需注明作者与出处；禁止商用 |
| report/proposal.html / report/proposal.en.html | `scripts/render_proposal_html.py` 从上述 md 渲染 | 同上 | 同上（随文册一并提交） | 同上；离线静态文件，不加载远程资源 |
| report/copyright_statement.md（本文件） | AI agent 编写 | 本仓库资产清单 | 同上 | 同上 |
| report/narrative.md | AI agent 编写 | 见 sources.json | 同上 | 同上 |
| sources.json | AI agent 整理登记 | 各来源发布方 | 登记表本身按本方案许可提交；各条目内许可分别标注 | 条目内容仅供评审引用 |
| metrics.json（复算日志 metrics_report.json 保存在仓库根目录 tools/，随分支提交但不进入提交包） | 仓库根目录 `tools/recompute_metrics.py` 复算生成 | 提交包 GeoJSON 图层（provisional） | 随本方案提交 | 官方边界发布后必须重算再提交 |
| assumptions.json / 各 .csv 表格 | AI agent 依据场地包整理 | SITE-PACKAGE、PROCESSED-FACT-PACK | 随本方案提交 | 评审可复核；不构成规划承诺 |
| compliance_matrix.json / standard_matrix.json / design_depth_matrix.json | AI agent 编写 | OFFICIAL-ANNOUNCEMENT、AGENT-TASKBOOK、MOHURD/MNR 标准（见 sources.json） | 随本方案提交 | 标准引用须保持文号与出处标注 |

## 2. 几何数据资产（提交包内自产或组织方提供）

| 资产路径 | 作者/生成方式 | 来源 | 许可 | 修改/再分发条件 |
| --- | --- | --- | --- | --- |
| geometry/site_boundary.geojson | 脚手架自 brief/site-package 复制，标注 provisional_constraint | BOUNDARY-SOURCE（组织方临时几何） | 组织方提供条款；本方案提交用途 | 非 official redline；官方边界发布后须重算并替换 |
| geometry/key_areas.geojson | 脚手架自 brief/site-package 复制，标注 provisional_constraint | KEY-AREA-SOURCE（组织方临时几何） | 同上 | 非官方重点区多边形；同上 |
| geometry/land_use.geojson、green_space.geojson、public_space.geojson、buildings.geojson、roads.geojson、phasing.geojson、constraints.geojson | AI agent 依据 allowed_design_space 与任务书生成，`recompute_metrics.py` 同步 declared 面积 | AGENT-TASKBOOK、allowed_design_space.json（设计建议层） | 随本方案提交（design_proposal 层） | 随官方边界重算；地块与红线仅作设计讨论 |
| 上述图层的 `area_sqm_declared` 字段 | `tools/recompute_metrics.py`（EPSG:4548） | 本图层几何 | 随本方案提交 | 修改几何后必须重跑复算脚本，禁止手工改值 |

## 3. 图件资产（由本仓库脚本生成，无第三方素材）

| 资产路径 | 生成方式 | 数据来源 | 许可 | 修改/再分发条件 |
| --- | --- | --- | --- | --- |
| assets/figures/*.png（10 张：5 图 × 中英文） | 仓库根目录 `tools/generate_figures.py`（matplotlib，EPSG:4548 投影） | geometry/*.geojson + metrics.json（同一规范数据源） | 随本方案提交（COMMUNITY-DISPLAY-ONLY） | 修改几何或指标后必须重跑脚本重新生成；图内无第三方照片、标志或字体 |

图件中引用的全部颜色、线型与文字均为本方案自定；未使用任何第三方地图底图、卫星影像、照片、图标、徽标或商业字体（中文使用系统字体栈，SVG 已转为路径）。

## 4. 图纸资产（A3 文册 / A0 展板，已重建）

| 资产路径 | 生成方式 | 数据来源 | 许可 |
| --- | --- | --- | --- |
| drawings/a3-booklet.pdf / a3-booklet.en.pdf | `tools/generate_drawings.py`（HTML → 无头 Chrome 打印；正文文本镜像 proposal.md / proposal.en.md） | metrics.json + assets/figures/*.png（同规范数据源） | 随本方案提交（COMMUNITY-DISPLAY-ONLY） |
| drawings/a0-boards.pdf / a0-boards.en.pdf | 同上 | 同上 | 同上 |

修改几何或指标后必须重跑仓库根目录 `tools/` 下的 `recompute_metrics.py`、`generate_figures.py`、`generate_visual.py` 与 `generate_drawings.py` 重新生成，禁止手工改值或手工拼图。

### 4.1 A3 文册页目（中 / 英文各 10 页，图面一一对应）

| 页码 | 页题 | 图面内容 | 数据来源页 |
| --- | --- | --- | --- |
| 01 | 封面 | 命名、三定位、三座月台、关键指标带 | metrics.json |
| 02 | 总览与三层范围 | 图 site-overview + 三层范围卡 | geometry/*.geojson、metrics.json |
| 03 | 重点区域 | 图 key-areas + 公告/复算面积对照表（368.4/369.3 ha） | geometry/key_areas.geojson、metrics.json |
| 04 | 用地结构与分期 | 图 land-use-structure + 用地/分期/建筑指标 | geometry/land_use、phasing、buildings |
| 05 | 交通与蓝绿公共空间 | 图 mobility-bluegreen + 路网/绿地/公共空间指标 | geometry/roads、green_space、public_space |
| 06 | AI生态图谱与场景体系 | 五链图谱、区域协同表、12场景卡、3测试场景、六项治理 | proposal.md（概念建议）、sources.json CASE-* |
| 07 | 包容性设计 | 六类画像表 + 四项机制 | proposal.md（概念建议） |
| 08 | 指标体系与证据链 | 图 metrics-evidence + 12 项指标复算表 | metrics.json（EPSG:4548 复算） |
| 09 | 实施运营与更新 | JZ-01~06 清单、运营四板块、组件库六组件 | proposal.md（概念建议） |
| 10 | 版权、来源与假设 | 许可与 19 条来源、7 条假设 | report/copyright_statement.md、sources.json、assumptions.json |

### 4.2 A0 展板页目（中 / 英文各 4 板，图面一一对应）

| 板号 | 板题 | 图面内容 | 数据来源页 |
| --- | --- | --- | --- |
| B01 | 总体概念与总览地图 | 图 site-overview + 一条联廊三座月台两股轨道 + 指标带 | geometry/*.geojson、metrics.json |
| B02 | AI生态、场景与治理 | 五链图谱、12场景卡、3测试场景表、六项治理、区域协同表 | proposal.md（概念建议） |
| B03 | 重点区域与公共空间 | 图 key-areas + 面积对照表 + 组件库 + 包容性画像 | geometry/key_areas.geojson、proposal.md |
| B04 | 实施运营与指标证据 | 图 mobility-bluegreen + 图 metrics-evidence + JZ 清单 + 12 项指标 + 许可声明 | geometry/*.geojson、metrics.json |

所有页面的临时几何复算警告、许可行与来源行在每页页脚随图面同步输出；页脚来源行统一为 `sources.json / metrics.json / geometry`。

## 5. 电子展示资产

| 资产路径 | 生成方式 | 数据来源 | 许可与限制 |
| --- | --- | --- | --- |
| visual/index.html / visual/index.en.html | 仓库根目录 `tools/generate_visual.py`（内嵌 SVG 地图 + data-metric 指标） | geometry/*.geojson + metrics.json | 离线静态页面；无 CDN、远程脚本、远程地图瓦片、远程字体、iframe、表单或外部 API；不跟踪评审者行为 |

## 6. 外部来源引用（正文 `[source:...]` 与 `[standard:...]` 引用的第三方内容）

| 引用 id | 第三方内容 | 使用方式 | 许可证与再分发条件 |
| --- | --- | --- | --- |
| OFFICIAL-ANNOUNCEMENT | 海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》 | 文字转述任务与范围 | 政府公开信息；标注出处；不修改正文 |
| CASE-KINGS-CROSS 等 7 个案例 | 案例官网/公开资料 | 仅提取机制概念做文字转译，**不复制任何图片、数据表、品牌与商标** | 官网公开资料；转译文字为本方案自产 |
| MOHURD-* / MNR-* 标准 | 部门规章与技术指南 | 引用文号与专业要求 | 政府公开文本；引用须保持文号出处 |

## 7. 声明

- 本方案全部文字、表格、图件与 HTML 由声明的 AI agent 生成或使用已清权的公开/组织方资料；不包含未经授权的第三方图片、照片、肖像、商标、字体或数据。
- 若评审认为任一引用需要更细粒度许可，请以 `sources.json` 中对应条目的 `risk_note` 与本节为准提出返修。
- 官方边界与重点区 polygon 发布后，本文档随几何、指标、图件与图纸一并重算更新。
