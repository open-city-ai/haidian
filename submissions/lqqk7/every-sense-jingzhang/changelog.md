# 方案迭代记录

本文件记录 `submissions/lqqk7/every-sense-jingzhang` 的版本演进。所有条目按仓库提交历史如实登记，不包含尚未完成的工作结论。

## v4.0 - 2026-08-11

**首屏可读性、控规参照台账与运营节律**

- `visual/index.html` 与 `visual/index.en.html` 首屏修复：导航条十四项由占位文字「章节 / Chapter」替换为各章真实短标题；`.hero` 最小高度由 `88vh` 收敛为 `clamp(460px,58vh,640px)`；`.hero aside strong` 字号收敛并锁定单行，使「AI ON = AI OFF」不再折行。修复后 1440×1600 首屏可同时呈现核心主张、完整导航、第 02 章全部内容与第 03 章开头。
- 重写 `report/narrative.md`，替换脚手架生成的三行占位文本，补入核心命题、三层范围、十节点、G0—G3 证据纪律、品牌文化叙事与诚实边界。
- 新建本迭代记录文件。
- 新增「控规官方参照台账」小节：登记 HD00-1601 等街区控规采信通告、蓝景丽家地块方案公示采信、大钟寺先导区城市更新案例与《海淀区城市更新导则（2025 年版）》四份已核验官方来源；台账仅登记不援引，本方案不为任何地块预设控制值。`sources.json` 相应新增四条来源，`metrics.json` 新增四项参照指标（含已查证公开渠道确无的 `reference_plot_far`），`assumptions.json` 与 `standard_matrix.json` 同步更新。
- 新增「季/月/周/常态」四层年度运营节律表与 L0—L4 场景开放机制表，空间节点复用 OP-01—OP-10，逐层对齐 G0—G3 闸门。
- 品牌系统图 `assets/figures/brand-system.png` 进入正文引用，双语报告重新渲染。

## v3.0 - 2026-08-11

**文化叙事、区域协同、品牌系统、几何加密与出版重建（对应 PR #1453）**

- 新增品牌系统：`assets/logo.svg` 与 `assets/figures/brand-system.png`（含英文版），提案增补京张铁路遗产四层资源清权、中关村创新文化到 AI 新文化的三步转译，以及主脊叙事线—地标—节点微叙事三级空间文化系统。
- 增补区域协同章节与八类要素保障准入条件，并与 G0—G3 四道闸门衔接。
- 几何加密：`buildings`、`green_space`、`public_space`、`phasing` 四个图层要素扩充，面积在 EPSG:4548 下复算，`metrics.json` 同步更新。
- 出版重建：A0 展板与 A3 图册双语 PDF 重排并压缩体积；`report/proposal.html` 与英文版同步重新生成。
- `sources.json` 补充公开来源条目，`standard_matrix.json` 与 `compliance_matrix.json` 相应扩展；`self_check.json` 按现行 `mark-self-checked` 流程重新登记。

## v2.0 - 2026-08-10

**证据与表达修复**

- 新增 `risk.json`，逐条登记风险、责任专业、停止条件与恢复证据。
- `geometry/constraints.geojson` 扩充为十个独立完成点 OP-01—OP-10，与十张场景卡 S01—S10 同序绑定。
- `metrics.json` 补入包容性绩效指标族（独立完成率、双通道信息冗余率、AI 开关服务等价差、被迫放弃率、人工接管成功率与耗时、感官负荷超限点、共同设计角色覆盖率），全部标记为待真实测试。
- `compliance_matrix.json`、`design_depth_matrix.json`、`standard_matrix.json` 大幅精简，删除模板化与不可核验条目，改为可追溯表述；`assumptions.json` 重写补数触发条件。
- 修订 `site_boundary.geojson` 与 `constraints.geojson` 的来源标注，明确临时几何性质；重新生成 A0/A3 双语 PDF 与展示页证据引用。

## v1.0 - 2026-08-10

**正式投稿（PR #1315，已合并入 main）**

- 首次提交完整结构化包：中英双语 `proposal`、九个 `geometry` 图层、`metrics.json`、`compliance_matrix.json`、`design_depth_matrix.json`、`standard_matrix.json`、`sources.json`、`assumptions.json`、`self_check.json` 与 `manifest.json`。
- 出版物：A0 展板与 A3 图册双语 PDF、`report/proposal` 双语 HTML、`visual/index` 双语离线展示页。
- 确立核心命题「AI ON = AI OFF」，建立三层范围工作框架与三处重点区的验证—共创—采用分工。

## 待复核事项

- 官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` 精确多边形尚未取得；发布后需统一重算全部面积类图层与指标，当前面积仅为公告近似值。
- 容积率、建筑高度、建筑密度、退线、道路红线、市政容量与文保控制线保持未知，待官方控规条件确认。
- 全部包容性绩效指标缺少现场基线与目标值，须在取得伦理与隐私协议后由真实参与者测试获得。
- 文中空间动作、场景、品牌、活动与区域协同均为概念建议，须由相应专业团队在正式审批框架下深化。

## 公开资料与合规说明

各版本仅使用已公开发布、由组织方提供或已进入来源登记的材料，不包含个人隐私信息、受控地图资料、机构内部文件或未审定的规划控制指标。OSM 快照仅作背景识别线索，不用于推定或替换项目及重点区边界。
