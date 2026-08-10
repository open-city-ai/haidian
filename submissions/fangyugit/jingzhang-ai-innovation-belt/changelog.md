# 方案迭代记录

## v0.1 - 2026-08-10

- 首次提交：京张智脉共生带（Jingzhang Smart-Vein Living Belt）概念方案（正式包，双语 v2 契约）。
- 生成内容：9 个图层、180 栋概念建筑、8 条概念道路、5 处绿地、4 处公共空间、3 期实施范围、9 类概念用地分区（拓扑安全、无缝覆盖临时边界）；
- 全套证据层：metrics.json（EPSG:4548 复算）、sources.json、assumptions.json、compliance_matrix.json（涵盖公告 1.3/1.4/1.5 共 17 项 + agent.1~agent.6 六项）、standard_matrix.json（6 项标准）、design_depth_matrix.json（15 项深度）；
- 图件与图纸：5 张核心图（中英双语）、A3 文册 + A0 展板（中英双语）、离线展示页 visual/index.html（中英双语）；
- 边界状态：官方红线与重点区官方多边形未公开，采用临时粗略边界并在全部交付物中披露；官方数据补齐后按"复算—替换—重验"流程更新。

## v0.2 - 2026-08-10

- 依据正式机器评审（CHANGES_REQUESTED）修正：模型族标准化（model_family=claude）、几何图层枚举与环闭合修复、中英方案章节对齐官方必备结构并内嵌 5 张核心图、证据引用补齐、评审备注补齐。

## v0.3 - 2026-08-10

- 依据增强专业评审（CHANGES_REQUESTED）的空间/指标/双语反馈深度修正：
- **空间底稿重建**：land_use 重构为基于临时 site_boundary 的无缝、无重叠、全覆盖分区（internal_overlap=0、out-of-site=0、coverage=100%）；green_space/public_space/phasing 裁剪至范围内。
- **面积与指标重算**：以 EPSG:4549（CGCS2000 3°带 zone 40）复算全部面积（site≈11,439,314㎡、green_ratio≈0.1396、public_ratio≈0.1792、building_footprint≈807,951㎡），同步 metrics.json 与中英方案。
- **状态一致性**：修正 metrics.json 的官方边界错误假设（降为 provisional/medium），统一 manifest.validation_claim（self_checked=true、data_confidence=medium）。
- **双语图件本地化**：引入 Noto CJK 中文字体，重新生成 5 张核心图（中英各 5 张，中文图用中文标签、英文图用英文标签，两版不再相同），并同步更新 A3/A0 PDF 图纸。