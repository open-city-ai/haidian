# 方案迭代记录

## v0.2 - 2026-08-13

### 本次完成（回应评审反馈）

- 修复 CJK 字体渲染缺陷：PDF 中文字体由非嵌入 CID 字体（STSong-Light/SimHei）切换为开源 **Noto Sans SC（SIL OFL 1.1）**，经 reportlab TTFont 子集化并嵌入 FontFile2，PDF 可正确显示中文且可复制、可检索。
- 补齐 agent.1–agent.6 全部必交内容：新增命名系统/视觉识别与 Logo、三区两翼协同回路、区域创新协同、全球 AI 创新生态案例研究（8 例）、AI 创新生态图谱与中关村科技服务翼、要素保障机制、AI 场景卡（10 张）与测试验证场景（3 个）、公共空间组件库、历史文化资源系统/导视/城市气质/国际传播、年度活动体系与长期运营。
- 扩充 report/copyright_statement.md 为逐资产版权清单，逐项注明来源与字体许可（Noto Sans SC OFL 可嵌入、HTML 仅用系统字体栈、无 CDN/远程资源）。
- visual/index.html 与 index.en.html 增加自绘 inline SVG Logo 标识，并将 AI 场景卡对齐为 SC-01..SC-10。
- 同步 design_depth_matrix.json（新增 scenario_space_operations / cultural_heritage / operations_governance 三项）与 compliance_matrix.json 报告章节映射。
- 全量重跑校验：self_check 与 participant_preflight 均通过（formal-review-ready，blockers/warnings 为空）。

### 待办与开放问题

- 边界仍为 provisional 临时几何（official_boundary=false），spatial_review 产生 KEY_AREA_PROVISIONAL 提示，替换官方红线后需重算全部图层与指标。
- 图件信息层级（图号/指北针/比例尺/来源标注）仍可进一步强化，将在后续迭代补强。

### 反馈记录

- v0.1 收到评审意见（changes requested）：字体渲染缺陷与 agent.1-6 内容不全为主要扣分项，本版已针对两项完成修复与补齐。

## v0.1 - 2026-08-13

### 本次完成

- 确定聚焦方向：AI 公共空间与朝圣地标（agent.4）。
- 确定方案命名与核心概念：京张朝圣带（三殿·一路·一铭文·一护照）。
- 完成九层几何生成（site_boundary / key_areas / land_use / buildings / roads / green_space / public_space / phasing / constraints），land_use 对 site_boundary 无缝无重叠分区，面积以 EPSG:4548 投影复算。
- 完成 metrics.json（site_area_sqm、key_area、green_ratio、public_space_ratio、building_density、road_ratio 等为 known；floor_area_ratio、building_height_m、green_space_per_capita_sqm 为 unknown 并注明原因）。
- 完成中英双语提案 proposal.md / proposal.en.md，含证据标记（source/standard/depth/data/metric）。
- 生成五张展示级图件（site-overview / land-use-structure / key-areas / mobility-bluegreen / metrics-evidence，语言 neutral）。
- 生成 A3 文册与 A0 展板（中英双语各一）。
- 生成 report/proposal.html 与 report/proposal.en.html。
- 完成 visual/index.html 与 visual/index.en.html（完全离线，data-metric/data-value 与 metrics.json 一致）。
- 更新 compliance_matrix.json / standard_matrix.json / design_depth_matrix.json / assumptions.json / sources.json。

### 待办与开放问题

- 边界为 provisional 临时几何（official_boundary=false），替换官方红线后需重算全部图层与指标。
- 控规、道路红线、权属、市政、文保、工程条件等资料缺失项已在 assumptions.json 登记，待正式数据补齐。
- 全部校验门（finalize / self_check / participant_preflight）通过后再提交 PR。

### 反馈记录

- 无（首版提交）。
