# 方案迭代记录

## v0.2 - 2026-08-07

- 用“双轨共生”总体概念替换脚手架通用文本，明确英文命名 JZ-AI Belt 与 Logo 方向。
- 扩充统筹研究：补充 5 个全球AI创新生态案例、三区两翼协同回路。
- 扩充场景：形成 12 张 AI 场景卡（其中 4 张产业测试验证场景）与 5 类用户画像、3 个 AI 朝圣地标。
- 扩充空间数据：用地分区增至 6 类、建筑基底增至 8 处、道路 3 条、绿地/公共空间各 2 处、分期 2 期、约束 1 处；全部在 EPSG:4548 复算面积并更新 `metrics.json`。
- 重绘 5 张 presentation 图，生成非空 A3/A0 PDF，重写离线 `visual/index.html`（含 `data-metric`/`data-value` 指标标记）。
- 重写 `proposal.md`，补齐全部 required section、证据引用、矩阵与指标覆盖。
- 通过 `finalize_submission.py` 与 `self_check_submission.py`（deterministic / spatial / visual / professional 均 PASS）。

### 待复核事项

- 官方 `SITE_BOUNDARY` 与三处 `KEY_AREA` 精确 polygon 尚未取得；发布后需统一重算 site boundary、key areas、land use、buildings、roads、green space、public space、phasing 及全部面积类指标。
- 控规条件（容积率、建筑高度、建筑密度、退线、道路红线、市政管线、文保控制线）待官方附件确认，当前列为待确认。
- AI 场景与运营均为概念建议，需专业团队与运营团队在正式审批框架下深化。
