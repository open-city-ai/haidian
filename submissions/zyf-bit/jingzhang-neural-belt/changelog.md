# 方案迭代记录

## v1.3 - 2026-08-11
- 修复 standard_matrix.json：添加 schema_version，重命名 standard_matrix 为 standards
- 修复 design_depth_matrix.json：添加 schema_version，重命名 design_depth_matrix 为 items，depth_item 为 item_id
- 修复 self_check.json：在 checks 数组中添加四个必需的 gate 条目
- 修复 changelog.md：标题改为 # 方案迭代记录
- 修复 proposal.md：在参考资料部分添加机器可读证据引用
- 创建双语对照文件：proposal.en.md, report/proposal.en.html, visual/index.en.html, PDF英文版
- 更新 manifest.json：添加双语文件并重新计算所有 SHA-256 哈希


## v1.0 - 2026-08-10
- 初始方案生成
- 基于 provisional boundary 完成空间设计和指标复算
- 覆盖 agent.1 至 agent.6 全部六项智能体任务
- 生成12张AI场景卡、6类用户画像、3个AI朝圣地标
- 完成7个全球AI创新生态案例研究
- 生成5张专业图表和HTML可视化
- 提交 Pull Request

## v1.1 - 2026-08-11
- 修复 manifest.json：重建为 schema 0.1.0 格式，匹配实际文件路径并写入 SHA-256
- 修复 self_check.json：填充 result/severity/target/message 字段，移除 null suggested_fix
- 修复 risk.json：迁移到 version=1 + dimensions[] schema，所有维度补齐 human_review
- 修复 geometry 文件：road_centerline→roads 重命名，删除 ai_service_zone/scenario_node，新建 constraints.geojson
- 移除 manifest 中不存在的 proposal.en.md 引用

## v1.2 - 2026-08-11
- 验证全部 29 个 SHA-256 哈希与实际文件匹配
- 确认 geometry 目录仅包含 ALLOWED_GEOMETRY_FILES 白名单内文件
- 确认 risk.json 全部 8 个维度 ID 均在枚举范围内
- 推送 no-op 更新以触发 CI 重新运行