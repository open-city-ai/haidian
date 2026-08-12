# 方案迭代记录

本文件记录「京张·智缝带 JingZhang AI Stitch Belt」方案的版本演进。

## v0.2 - 2026-08-10 — 图件深度重做 + 实物补齐（响应第二轮 AI 评审）

### 视觉交付根本性升级（5 核心图 → 真实 GeoJSON 场地化图纸）

- 5 张核心图从抽象框图升级为基于真实 GeoJSON 渲染的场地化图纸（geopandas + matplotlib）
- 配齐上游全部缺失的制图要素：指北针、比例尺、经纬度网格、分组图例、建筑节点编号（BF-001~012）
- A3/A0 PDF 改为满版图证展板（每页主图占 65% 版面 + 数据条），消除大面积留白

### 实物补齐（agent.1 / agent.4）

- logo-spec.png：JZ-Stitch Logo 规范（主版/反白/最小尺寸 12mm/三色色值）
- component-library.png：公共空间组件库（L1/L2/L3 地标 + 口袋广场/驿站/场景壳）
- visual/assets/asset-rights.json：11 个资产逐项权利台账

### 内容深化

- 3 个高影响场景（医疗/教育/公共安全）逐卡规格表（数据最小化/合法依据/留存期/KPI/偏差测试/退出）
- 近期项目概念实施矩阵（RACI/前置数据/阶段门/验收/回退）
- 弱势群体（老幼残障/低收入/小商户）包容性补充

### 自检状态

- self_check 四项 PASS（deterministic + spatial + visual + professional）
- preflight PASS（34 文件、3.6 MiB）
- 上游差异化：经盘点，本方案是仓库内首个渲染真实 GeoJSON 的图件

## v0.1 - 2026-08-09

### 新增

- **概念确立**：确定方案主名「京张·智缝带 JingZhang AI Stitch Belt」与双主线（京张缝合 + AI 自主创新）。
- **proposal.md**：13 章节 formal 完整稿，含 front matter、统一边界声明、三层范围对照表、命名体系与 Logo 方向、6 个全球案例（含非照搬边界声明）、一脊两带三区两翼空间结构、三区详细设计（七维结构）、12 张 AI 场景卡（含 4 张产业测试验证场景）、5 类用户画像、3 个 AI 朝圣地标、年度活动与运营机制、指标复算与风险合规。
- **机器可读证据**：
  - `metrics.json`：已知面积 known + 控规项 unknown/null 纪律；EPSG:4548 复算。
  - `compliance_matrix.json`：23 条全覆盖（17 official + agent.1-6）。
  - `standard_matrix.json`：5 mandatory（addressed）+ 1 data_gap。
  - `design_depth_matrix.json`：15 深度项全 complete。
  - `sources.json` / `assumptions.json` / `agent.json`。

### 边界声明

- 本版本基于 provisional 边界：`package_state` 将在 finalize 后转为 ready_for_review。
- 全部空间落地均为概念建议，待官方边界与控规发布后复算。

### 模型披露

- agent: lugoudu (ZCode)，model_family=glm，model_detail=GLM-5.2。
