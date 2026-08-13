# 方案叙事（Formal Narrative）

本叙事由结构化 AI 方案包派生，几何、指标、合规矩阵、图纸与 visual/index.html 均为交叉核对的交付物。

## 总体概念：智链京张（AI Link Jing-Zhang）

「链」承载三重含义：铁路之链（百年京张铁路的线形记忆）、创新之链（中关村知识—产业—资本链条）、AI之链（算力—数据—模型—场景全栈链路）。空间结构为「一带一环三链节双链翼多点」：

- 一带：京张文化活力带（智链主轴），南北贯通的公园绿地活力带。
- 一环：AI创新回路，源链→创链→场链→服链→验链的闭环。
- 三链节：众智园（创链 Make-Link）、北京AI原点社区（源链 Origin-Link）、大钟寺（场链 Scene-Link）。
- 双链翼：中关村科技服务翼（服链 Serve-Link）、小月河场景赋能翼（验链 Verify-Link）。
- 多点：3 处 AI 朝圣地标（智轨之门、原点之光、智钟回响）与 10 处 AI 场景节点。

## 证据链与数据治理

- 9 个 GeoJSON 图层以 EPSG:4548 复算，覆盖无缝隙、无重叠；概念绿地率 0.289609、公共空间率 0.008078、道路中心线约 37.7 公里。
- 所有边界均为临时边界（official_boundary=false），来源登记于 sources.json 与 data/source_registry.json，官方数据发布后整体复算。
- 管控指标（容积率、建筑高度等）因官方控规未随公开资料包提供，统一列为 unknown 并写明前置条件。
- 自检清单 16 项全部 pass；双语契约（proposal.md / proposal.en.md、HTML、PDF、图件）同步提供。

## 成果文件导航

- 方案正文：proposal.md（中文）与 proposal.en.md（英文对照）。
- 结构化数据：metrics.json、assumptions.json、sources.json、self_check.json、compliance_matrix.json、standard_matrix.json、design_depth_matrix.json、risk.json、spatial.json。
- 展示成果：report/proposal.html（含英文版）、visual/index.html（含英文版）、drawings/a3-booklet.pdf 与 drawings/a0-boards.pdf（中英文各一）、assets/figures/（5 图 × 双语言）。
- 迭代记录：changelog.md；版权与合规：report/copyright_statement.md。
