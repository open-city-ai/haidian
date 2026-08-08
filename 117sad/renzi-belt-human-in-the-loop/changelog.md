# 方案迭代记录

> 本目录由 117sad / renzi-belt-human-in-the-loop 自动维护；记录每一次实质性内容、几何、引用或合规状态的更新。仅记录长期有参考价值的变化；临时调试与自动校验细节不写入。

## v0.1 - 2026-06-14

### 范围与命名
- 创建提交目录 `submissions/117sad/renzi-belt-human-in-the-loop/`，完成基础骨架 manifest / agent / sources / metrics / assumptions / compliance_matrix / standard_matrix / design_depth_matrix 等元数据。
- 命名：RENZI BELT · The Human-in-the-Loop AI Belt；中文"京张人字带"。子品牌 FORGE / ORIGIN / CLOCK / LOOP。

### 主要设计判断
- 总体设计范围采用 provisional 边界（11.41 km²，agent_inferred_from_public_data），仅支持 intake 展示。
- 一脊：京张遗址公园连续绿脊 GREEN-001（9.71 km）。
- 两折：西折返（清河—学院路）+ 东折返（北三环—大钟寺）。
- 三点：众智园 AI 自主创新加速区 / 北京 AI 原点社区 / 大钟寺 AI 产业聚集区（provisional_constraint）。
- 两翼：西翼自主创新研发翼 / 东翼智能经济服务翼。
- 五返：5 处人机折返装置（折返柱、人字桥台、时间广场钟廊、开源纪念墙、AI 原点广场）。

### 几何层
- 共 9 个 GeoJSON 图层：site_boundary (1)、key_areas (3)、land_use (19)、buildings (129)、roads (14)、green_space (3)、public_space (8)、phasing (3)、constraints (0 · 公开资料未发布)。
- 全部面积在 EPSG:4548 复算；坐标输出 EPSG:4326。
- 拓扑自检 `spatial_review.py`：land_use 重叠 0.0012 sqm、缝隙 44.162 sqm，均在容差内；GEOMETRY_VALIDITY PASS；CONTAINMENT PASS；KEY_AREA_PROVISIONAL MINOR（intake 允许）。

### 指标复算
- site_area_sqm = 11,412,825.386 sqm（known · high）
- building_footprint_area_sqm = 579,731.853 sqm（known · medium）
- green_ratio = 0.224527（known · medium）
- public_space_ratio = 0.133130（known · medium）
- key_area_count = 3（known · high）
- floor_area_ratio = unknown（缺官方控规容积率，已在 assumptions.json 声明影响）

### 引用覆盖
- 7 条公开来源 sources.json
- 6 项标准 standard_matrix.json（MOHURD 城市设计管理办法 / 控制性详细规划 / MNR 用地分类 / 项目公告 / agent 任务书 / MOHURD 历史文化名城保护）
- 15 项设计深度 design_depth_matrix.json
- 9 个 PROPOSAL_READABLE_DATA_REFS 必填数据路径全部出现
- 5 张必填方案图全部存在

### 图纸与可视化
- 生成 5 张方案图：site-overview.png / land-use-structure.png / key-areas.png / mobility-bluegreen.png / metrics-evidence.png
- 生成 report/proposal.html + report/proposal.en.html
- 生成 visual/index.html（28 KB，离线无外部资源）
- 生成 drawings/a3-booklet.pdf（8 页含指标卡 / 空间结构 / 用地 / 重点区域 / 慢行 / 场景 / 来源）
- 生成 drawings/a0-boards.pdf（1 页展板：人字结构 + 6 项指标 + 五句方案说明）

### 合规与自检
- 四道校验全部 PASS intake：deterministic validation / spatial review / self_check / participant preflight
- 明确排除：人脸追踪 / 行为评分 / 未授权推送
- 临时边界声明 + assumptions.json 缺失条件列表

### 下一步
- 替换 provisional 边界为官方多边形 → 提交正式专业评分。
- 补控规指标 → 更新 metrics.json 已知项 + 解除 floor_area_ratio unknown 状态。
- 增加 AR/VR 数字孪生模块 + 国际开源联盟联络清单。