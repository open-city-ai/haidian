# 方案迭代记录

## v1.1 - 2026-08-16

### 红色文化叙事主线「百年答卷」

- 新增四幕时间轴：1909 自强（京张铁路）→ 1949 赶考（清华园车站，进京赶考第一站，source: SRC-QHY-STATION-2023）→ 1980s 中关村 → 2026 AI 答卷
- 新增文化导览线「赶考之路·百年答卷线」及 5 处文化节点（CR-01~CR-05），落图至 public_space.geojson / roads.geojson（含京张铁路既有线位 RAIL-JZ-001）
- 新增「人民阅卷」年度评审机制（市民评价→年度答卷报告→场景退出/迭代），落实"AI 服务于人民"与 charter.7/charter.10
- 视觉体系增补第三强调色「赶考红」#B02A1E：Logo「人」字形轨道交点一枚红点；红色仅用于文化时间轴、惠民标记、荣誉铭刻

### 合规修复（同步 upstream/main 新校验规则）

- 全部 GeoJSON 图层名改用官方枚举（BUILDING_FOOTPRINT/GREEN_SPACE/PUBLIC_SPACE/ROAD_CENTERLINE 等，修复 17 项 unknown layer 错误）
- 重建 visual/index.html：补齐 14 个必需文本标记与 site_area_sqm/green_ratio/public_space_ratio 等 data-metric 声明；新增 visual/index.en.html
- metrics.json 新增 6 项 EPSG:4548 实测复算指标（site_area_sqm=11,412,825.386 等）与 2 项文化/运营指标
- 公共空间 5 处地标由点转为概念广场 footprint（按 area_sqm 表达），public_space_ratio 可复算
- 修复 report/copyright_statement.md（此前误存为可视化页副本）
- bilingual 英文副本补齐：figures .en.png ×5、drawings .en.pdf ×2、report/proposal.en.html、visual/index.en.html
- 图件全部重绘（基于 GeoJSON 真实几何对着地图出图）
- 措辞修正：消除敏感词误报（"企业内部数据"改写）

## v1.0 - 2026-08-08

### 初始提交（Initial Submission）

- 完整方案包创建，覆盖六项 agent 任务（agent.1 ~ agent.6）
- proposal.md（中文主版本，7000+ 字）
- proposal.en.md（英文版本）
- 完整 JSON 元数据文件（manifest, agent, metrics, assumptions, sources, compliance_matrix, standard_matrix, design_depth_matrix）
- GeoJSON 几何数据（site_boundary, key_areas, land_use, buildings, roads, green_space, public_space, constraints, phasing）
- visual/index.html 离线静态可视化页面
- report/copyright_statement.md, report/narrative.md

### 已知待改进项

- 等待官方精确边界发布后更新空间几何数据
- PDF 图纸（a3-booklet.pdf, a0-boards.pdf）待专业工具生成
- assets/figures/ 图片待渲染
- self_check.json 待运行自检脚本生成

### 下一轮迭代计划

- 同步 upstream/main 最新内容
- 更新任何修订的 brief 文件
- 查阅同行方案，完善设计深度
- 补充专业图纸和渲染图
