# Formal Narrative（派生摘要）

> 本文件是结构化 AI 设计包的派生摘要，不替代 `proposal.md`；正文、几何、指标、合规矩阵、图纸与展示页共同构成可交叉核验的正式提交。

## 方案定位

**京张·AI 原生带（JZ AI-Native Belt）**——治理驱动的三层 AI 创新城市。以"治理即基础设施"为核心组织逻辑，把规则、检查、评分、报告四步治理引擎嵌入城市设计的生态、服务、设施三层，回答"AI 创新生态怎么生长、AI+ 公共服务怎么落地、AI 原生城市怎么承载、AI 城市怎么可信"四个问题。

## 核心主张

1. **三区承接全栈要素**：众智园承接算力/模型、北京 AI 原点社区承接人才/场景、大钟寺承接产业/资本，沿京张走廊形成"研究—转化—资本"闭环；6 个全球案例（新加坡、杭州、深圳、硅谷、特拉维夫、奥斯汀）指向同一结论——成功的 AI 创新生态都把治理内置为基础设施。
2. **场景落到空间与治理边界**：10 张 AI 场景卡 + 3 个产业测试验证场景 + 5 类用户画像，每张场景卡标注服务对象、空间位置、数据来源、隐私边界、人工复核机制与运营主体；场景引用具体图层与指标（如 [data:geometry/roads.geojson#ROAD-001]、[metric:green_ratio]），证明设计对象可核验。
3. **四可治理底座（差异化核心）**：可管（制度）→ 可控（检查）→ 可信（披露）→ 可持续（更新），与合规矩阵、标准矩阵、设计深度矩阵联动，形成"规则→检查→评分→报告"的持续治理闭环。

## 证据结构

- 正文 `proposal.md` 使用 [source:]/[standard:]/[depth:]/[data:]/[metric:] 锚点指向结构化证据；`sources.json`（20 条）、`metrics.json`（6 项）、`standard_matrix.json`（6 项）、`design_depth_matrix.json`（15 项）与 `compliance_matrix.json`（覆盖 agent.1–agent.6）构成完整复算与合规层。
- 双语：`proposal.en.md` 为完整等义译稿，锚点逐一核对一致；HTML、图纸、图件均提供 .en 副本。
- 图纸与展示：A3 手册（封面/分区总览/场景索引）、A0 展板（信息图总览）、`report/proposal.html`（离线阅读）、`visual/index.html`（展示页，含核心指标 data-metric）。

## 边界与限制

方案使用 `brief/site-package` 中维护者登记的 **provisional 边界**（`site_boundary.geojson`、`key_areas.geojson` 均标注 `provisional_constraint`、`official_boundary=false`、精度警示）。官方 SITE_BOUNDARY / KEY_AREA 与控规控制线发布后，正文所列空间结构、场景、项目与指标需按复算清单重算；组织方数据缺口不影响本包内容评分。
