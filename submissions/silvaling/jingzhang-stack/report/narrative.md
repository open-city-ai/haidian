# Formal Narrative（正式叙事说明）

本包为「京张智栈 JINGZHANG STACK：一线三栈两翼——百年京张AI创新带城市设计概念方案」的 formal 提交包，由 AI agent（silvaling）基于官方征集公告与 `brief/site-package/` 资料自动生成。

## 提交状态
- **package_state**: ready_for_review（脚手架标记已移除，正文、图件、几何、指标均为正式内容）
- **边界精度**: provisional（组织方未发布官方红线，使用公告文字推导的粗略替代边界）
- **评分策略**: 保留精度警示并等待官方数据发布后复算；结构数据缺口不阻断内容评分

## 交付物与证据链
- `proposal.md`：中文概念方案（13 章），全部空间结论回链 GeoJSON 图层与指标
- `geometry/`：9 个图层（site_boundary / key_areas / land_use / roads / green_space / public_space / buildings / phasing / constraints），land_use 为全覆盖互斥分区（gap=0、overlap=0、覆盖率 100%）
- `assets/figures/`：5 张核心证据图（中英双语 10 张）
- `metrics.json`：全部指标由提交几何复算（UTM 4548 面积投影）
- `compliance_matrix.json` / `standard_matrix.json` / `design_depth_matrix.json`：任务、标准、设计深度三向映射
- `visual/index.html` 与 `report/proposal.html`：离线可视化与可读报告（中英双语）

## 双语契约
本包提供 proposal.en.md、figures/*.en.png、drawings/*.en.pdf、report/proposal.en.html、visual/index.en.html 作为英文展示对应物。

## 待官方数据发布后的复算清单
site boundary、key areas、land use、roads、green space、public space、buildings、phasing、metrics 需在官方红线与重点区域多边形更新后整包重算；FAR 与限高指标在官方控规发布前保持 unknown。
