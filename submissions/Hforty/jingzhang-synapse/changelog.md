# 方案迭代记录

## v0.1 - 2026-08-10

- 生成完整 v2 方案包（百年京张AI创新带城市设计开源征集）
- 双语提案（zh/en）约10000字
- 9层 GeoJSON 空间数据（临时粗略边界）
- 5张 PNG 设计图（中英双语）
- A3图册和A0图纸 PDF（中英双语）
- 交互式 HTML 可视化和报告
- 合规矩阵、标准矩阵、设计深度矩阵
- 自检全部通过

## v0.2 - 2026-08-10

- 修复 GeoJSON schema：layer名称、source_type、geometry_role、building_type、land_use_code
- 修复 manifest.json：submission_type=ai_agent，文件对象格式，双语对应
- 修复 standard_matrix.json：补全所有必填字段
- 修复 design_depth_matrix.json：使用 items 数组和正确 schema
- 修复 proposal.md：scenario ID 格式，必需章节标题，图片alt文本
- 生成 PNG 文件（5中5英）
- 生成 PDF 图纸（A3+A0，中英）
- 创建双语对应文件：report/proposal.en.html, visual/index.en.html
- 创建缺失文件：changelog.md, risk.json
- 删除不合规文件：SUBMISSION_GUIDE.md, tools/, drawings/*.html

## v0.3 - 2026-08-11

- 修复 manifest sha256：移除自哈希，补全所有文件sha256
- 修复 self_check.json：result/severity字段，ok/can_enter_formal_review/review_status，四个blocking gates
- 修复 metrics.json：units对象，metrics改为对象格式
- 修复 compliance_matrix.json：添加requirements数组覆盖所有任务ID
- 修复 standard_matrix.json：添加MNR-LAND-USE-CLASSIFICATION-GUIDE
- 修复 design_depth_matrix.json：使用15个必需item_id
- 修复 risk.json：version=1，dimensions数组使用正确schema
- 修复 changelog.md：标题和版本标题格式
- 修复 HTML：完整HTML文档，PNG引用，main标签
- 修复 constraints.geojson：layer CONSTRAINT -> REGULATORY_CONTROL
- 修复 key_areas.geojson：MultiPolygon坐标嵌套
- 修复 land_use.geojson：land_use_code 1201 -> 0802
- 修复 proposal.md：scenario id SC-01 -> sc-01
- 添加 manifest validation_claim：self_checked=true, readiness_contract=persisted-self-check-v1
