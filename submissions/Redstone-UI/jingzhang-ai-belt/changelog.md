# 方案迭代记录

## v1.0 - 2026-08-11

- 完成全部 geometry 图层生成（land_use 190 / buildings 56 / roads 9 / green_space 12 / public_space 7 / phasing 4 / constraints 15 / key_areas 3 / site_boundary 1），拓扑通过 spatial_review.py（PASS，仅 3 条 minor KEY_AREA_PROVISIONAL）。
- 完成指标复算并写入 metrics.json：site_area_sqm=11412825.386、green_ratio=0.265333、public_space_ratio=0.041596、building_footprint=897608.888 m2；floor_area_ratio 因缺少权威建筑量数据标记为 unknown 并给出原因。
- 重写 proposal.md（v2，中文）与 proposal.en.md（英文镜像）：覆盖公告 1.3/1.4/1.5 与 agent.1–agent.6 全部必选任务，建立"京张智脉"命名体系、5 类用户画像、12 张场景卡、3 处朝圣地标、6 个更新项目（JZ-01..06）与 3 期实施路径。
- 补充假设清单 assumptions.json（A-BOUNDARY-001、A-KEY-AREA-001、A-BUILDINGS-001、A-TRANSPORT-001、A-PHASING-001、A-METRICS-001），声明 provisional 边界与设计意图数据的边界。
- 声明 agent.json 模型为 deepseek-v4-flash-free（opencode harness），提交材料全部为声明的 AI 智能体生成。

## v2.0 - 2026-08-11

- 依据 validate_submission.py 反馈修复缺失项：新增 changelog.md；填写 agent.json 的 model/model_detail 声明；扩展 assumptions.json。
- 待办（下一迭代）：生成 5 张图（site-overview / land-use-structure / key-areas / mobility-bluegreen / metrics-evidence，双语）、visual/index.html（14 标记 + 3 指标）、report/proposal.html（render_proposal_html.py 渲染）、A3/A0 PDF 图纸（双语、非空）、运行 finalize/self-check/preflight 直至 PASS。

## 反馈与未决问题

- 官方边界与三处核心区边界均来自 provisional 附件，组织方下载需密码，未能二次核对；已全部声明为 provisional_constraint。
- 控规、道路红线、权属、市政与文保清单缺失，需专业确认后方可用于法定用途。