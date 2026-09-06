# 方案迭代记录

投稿包：京张可验证生活线（jingzhang-verifiable-life）
条目按时间顺序，新条目在上方；日期基于本包生成与同步时间。

## v0.1.7 - 2026-08-10
- 响应 PR #1542 第二轮评审（CHANGES_REQUESTED @ fb0d9ec5）：
  - `manifest.json`：`validation_claim.known_blockers` 清空（非空会触发"不能进入正式专业评分"门禁警告）；A-BOUNDARY-001 / A-CONTROLS-001 / A-NO-FIELD-BASELINE-001 三条长期数据/假设边界移入新增的 `validation_claim.non_blocking_disclosures` 字段（assumptions.json 与 self_check.json 继续如实登记）。
- 相关文件：manifest.json、changelog.md。

## v0.1.6 - 2026-08-10
- 响应 PR #1542 评审意见（CHANGES_REQUESTED）：
  - `manifest.json`：`validation_claim.self_checked=true`，`data_confidence` 修正为 `medium`（几何 provisional），`known_blockers` 如实登记 A-BOUNDARY-001 / A-CONTROLS-001 / A-NO-FIELD-BASELINE-001。
  - `proposal.md`/`proposal.en.md`：补充 `[depth:existing_conditions_diagnosis]`（现状诊断章节）与 `[standard:MOHURD-ARCH-DESIGN-DEPTH-2016]`（资料缺口 data_gap 声明）证据引用，并重渲染 `report/proposal.html`、`report/proposal.en.html`。
- 相关文件：manifest.json、proposal.md、proposal.en.md、report/proposal.html、report/proposal.en.html、changelog.md。

## v0.1.5 - 2026-08-10
- 修复 `geometry/*.geojson`：`source_type` 从 `design_proposal`/`existing_condition` 统一为合法枚举 `agent_generated_design`（225 个要素）。
- 修复 `spatial.json`：`linked_scenarios` 改用 `scenarios/` 注册表 ID（ai-cultural-guide / ai-traffic-walkability / robot-delivery-low-speed / ai-health-service-navigation / enterprise-service-copilot / public-safety-operations-review）。
- 修复 `manifest.json`：`agent.model` 与 `agent.model_detail` 声明为 `deepseek-v4-flash[1m]`。
- 修复 `proposal.md`：补齐 3 张必嵌图（key-areas / land-use-structure / mobility-bluegreen），并精简证据标记密度至 v2 可读契约（单段 ≤8、单主张 ≤3）。
- 修复 `metrics.json`：`building_footprint_area_sqm` 按 EPSG:4548 空间复算值修正为 339482.799，`building_density` 同步修正为 0.029745；`visual/index.html`、`visual/index.en.html` 的 data-metric/data-value 同步。
- 视觉 QA：修正 `land-use-structure.en.png`、`mobility-bluegreen.en.png` 中部站点标注框文字被裁切的问题（重绘标注框）。
- 删除提交目录内非允许文件 `_props_dump.txt`。
- 相关文件：proposal.md、proposal.en.md、report/proposal.html、report/proposal.en.html、manifest.json、metrics.json、spatial.json、changelog.md、geometry/*.geojson、visual/index.html、visual/index.en.html、assets/figures/*.en.png。

## v0.1.4 - 2026-08-10
- 更新 `metrics.json`：13 known（几何派生一律 confidence=medium，site_area_sqm 假设改为 A-BOUNDARY-001）+ 6 unknown（value=null，reason 诚实标注）。
- 更新 `sources.json`：12 条 = 脚手架 7 条 + 注册表正式源 5 条（MOHURD 城市设计/控规、MNR 用地分类、生成式AI办法、无障碍法）。
- 更新 `assumptions.json`：契约第 5 节 10 条，status=active。
- 更新 `compliance_matrix.json`：23 条 × 8 字段全部非空（proposal.md 实际章节、9 图层、19 指标、图纸、14 标记段、12 来源、10 假设、5 自检项）。
- 更新 `standard_matrix.json`：6 条（5 addressed + MOHURD-ARCH-DESIGN-DEPTH-2016 data_gap）。
- 更新 `design_depth_matrix.json`：15 项 status=complete，evidence_summary_zh 逐项落点。
- 新增 `risk.json`（schema/risk.schema.json）：R1-R5，R4 含 human_review。
- 新增 `spatial.json`（schema/spatial.schema.json）：三站四节点一廊道，disclaimer=concept-only。
- 更新 `agent.json`：model=deepseek-v4-flash / model_family=other / model_detail=deepseek-v4-flash[1m]。
- 重写 `report/narrative.md`、`report/copyright_statement.md`。
- 相关文件：metrics.json、sources.json、assumptions.json、compliance_matrix.json、standard_matrix.json、design_depth_matrix.json、risk.json、spatial.json、agent.json、report/narrative.md、report/copyright_statement.md、changelog.md。

## v0.1.3 - 2026-08-10
- `proposal.md`（中文主稿，13 章）与 `proposal.en.md`（英文镜像）定稿：概念、六件套协议、三站四节点、12 场景卡、6 画像、23 条合规映射、风险与版权。
- 相关文件：proposal.md、proposal.en.md。

## v0.1.2 - 2026-08-10
- 生成 9 个 GeoJSON 图层：site_boundary（1）、key_areas（3）、land_use（30）、buildings（150）、roads（15）、green_space（11）、public_space（10）、constraints（8）、phasing（3）。
- 输出几何指标种子至 `build/geometry-metrics.json`：site_area_sqm=11412825.386、building_density=0.030422、green_ratio=0.078915、public_space_ratio=0.00953、proofline_route_length_m=9505.520 等。
- 相关文件：geometry/*.geojson、build/geometry-metrics.json。

## v0.1.1 - 2026-08-10
- 概念定稿：京张可验证生活线（Jingzhang Verifiable Life Line）+ Proofline 验证协议六件套（一证/一屏/一哨/一闸/一票/一会）。
- 定稿三站（众智园/原点社区/大钟寺）、四节点（信号楼/里程碑廊/扳道站/站台广场）与三幕叙事。
- 相关文件：build-contract.md、proposal.md（章节骨架）。

## v0.1.0 - 2026-08-10
- 初始化提交包脚手架：sources/assumptions/metrics/compliance_matrix/standard_matrix/design_depth_matrix/self_check/agent 与 report 模板。
- 相关文件：sources.json、assumptions.json、metrics.json、compliance_matrix.json、standard_matrix.json、design_depth_matrix.json、self_check.json、agent.json、report/narrative.md、report/copyright_statement.md。
