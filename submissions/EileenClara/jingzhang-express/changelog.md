# 方案迭代记录

## v0.1 - 2026-08-11

### 改动摘要

- 建立「京张直快 JINGZHANG EXPRESS」总体概念：把百年京张铁路重塑为一条创新产线，形成"一正线三站两翼"的空间结构（众智园·源头站 → 原点社区·转化站 → 大钟寺·到达站；中关村科技服务翼 + 小月河场景赋能翼）。
- 明确命名层级：官方规划命名层（三处重点区与三条主题带）与品牌叙事层（京张直快）区分，品牌层不替代官方命名。
- 完成三层范围工作框架（统筹研究约 43.6 km² / 总体设计约 11.4 km² / 重点区域约 368.4 ha）。
- 生成 9 个 GeoJSON 概念图层（site_boundary、key_areas、land_use、buildings、roads、green_space、public_space、constraints、phasing），land_use 为无缝拓扑分区，面积按 EPSG:4548 复算。
- 编制 metrics.json（39 项 known 指标 + 5 项待确认控规指标，均标注 unknown 并给出原因）、assumptions.json（12 项假设，含 provisional 边界披露）。
- 撰写中英双语 proposal（proposal.md / proposal.en.md，各 13 章，147 条证据标记 1:1 对齐），覆盖官方公告 1.3/1.4/1.5 全部任务与智能体任务书 agent.1–agent.6。
- 提供 13 张 AI 场景卡（含 4 个产业测试验证场景）、6 类用户画像、3 个 AI 朝圣地标、8 个全球 AI 创新生态案例、三站×三带交叉矩阵、文化导览路线与年度活动运营体系。
- 完成三矩阵（compliance 23 项 / standard 8 项 / design-depth 15 项）、risk.json（8 维度）、sources.json（11 条来源登记）。
- 产出交付物：5 张必交图 × 中英、A3 文册与 A0 展板 × 中英、离线 visual/index.html 与 report/proposal.html 双语阅读版。
- 自检通过：deterministic validation / spatial review / visual packaging / professional evidence 四门全 PASS，package_state=ready_for_review。

### 采纳反馈

- 按人工目检反馈修复视觉问题：land-use-structure 底部条带三个站点标记投影 bug（原渲染偏移出画布，已修正为条带内正确位置并左北右南排列）、条带标题措辞、site-overview 主标题改为顶部居中更醒目、visual 总览 SVG 两翼标签与三带标签错位及重叠（已下移至地图框下方留白）、A3/A0 PDF 字号统一为 8 级体系并修正中文换行。
- 修正 proposal.en.md 中 4 处转义引号（`\"` → 正常引号），消除渲染后的反斜杠乱码。
- 依据评审修正赛道声明（5 个 → 3 个顶层赛道，`jingzhang-heritage-narrative` / `ai-origin-community` / `ai-public-services`，另 2 个保留于正文与场景卡）、核实全部 6 个标准场景 ID、补齐三处重点区域官方面积对照与 provisional 边界披露。

### 暂未采纳或待复核事项

- 官方精确红线、重点区域官方 polygon 与控规条件尚未公开发布，当前使用 provisional 临时边界；官方数据到位后需整体复算图层与指标。
- 容积率、建筑高度、建筑密度、绿地率（官方口径）、退线等控规指标标注为待正式数据补齐，不以推测值冒充审定指标。
- 图件与 PDF 的最终视觉观感仍需人工复核（AI 生成器无法目检像素级细节）。
- 具体地块拆改留、道路线位、市政管线、投资测算与开发时序均需专业团队依据正式资料深化。

### 公开资料与合规说明

- 本版本仅使用公开任务书、官方公告、公共政策标准与用户提供且已清权资料，不包含个人隐私、未经公开授权的资料与图件，或未审定的规划控制指标。
- 全部空间建议均为概念建议/参考方案，不构成政府审定结论或实施承诺。
- 提交包内 visual/index.html 与 report/*.html 均为离线静态文件，不加载远程资源，不采集或跟踪用户行为。
