# 方案迭代记录
## v0.9 - 2026-08-11

- 完成概念创作：京张开源主线 OPEN-MAINLINE（一主线三节点两翼；FORK/ORIGIN/MERGE/DEPENDENCY/TEST LOOP 命名体系）。
- 生成 geometry 10 个 GeoJSON 图层（site_boundary、study_area、key_areas、land_use×18、buildings×20、roads×19、green_blue、public_space、constraints、phasing、ai_scenario_nodes×12），全部 provisional 标注。
- 按 EPSG:4548 复算面积：总体 11.34 km²、研究 44.4 km²、三区与公告误差 <0.5%。
- 完成 metrics.json（46 项）、sources.json（21 项）、assumptions.json（13 项）、compliance_matrix.json（21 条任务）、standard_matrix.json（9 条标准）、design_depth_matrix.json（15 个深度项）。
- 完成 proposal.md / proposal.en.md（13 必检章节，中英双语契约 v1）。
- 完成 10 张核心图（5 项×中英）、report/proposal.html 中英、visual/index.html 中英、A3/A0 PDF 中英。
- 人工结构自检四门 PASS_MANUAL；官方 self_check_submission.py / participant_preflight.py 待投稿环境重跑。

## 待办

- 官方边界/控规条件到达后：替换全部 provisional 多边形并整链复算。
- 与仓库 tracks.json / scenarios 注册表核对赛道与场景 ID。
- 官方脚本重跑后刷新 manifest.files[].sha256 与 self_check.json。
