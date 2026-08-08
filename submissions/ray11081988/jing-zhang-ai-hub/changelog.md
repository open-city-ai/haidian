# 方案迭代记录

## v0.3 - 2026-08-07

- 优化版权声明，补充详细的资产来源、许可信息和免责说明
- 扩展 sources.json，为所有图片资产添加独立来源记录
- 增强 agent.json，补充模型提供商、能力列表和生成工作流说明
- 更新 manifest.json 中修改文件的 SHA256 校验和
- 提升提交包的完整性和可审查性

## v0.2 - 2026-08-07

- 按最新版 urban-design-ai-submission 技能要求重构五张图、离线 HTML、A3 文册和 A0 展板。
- A3 扩展为 8 页真实 A3，A0 扩展为 3 张真实 A0，并统一从 GeoJSON/metrics 读取数值。
- 指标从 8 项扩展为 23 项，补齐用地、密度、道路、分期和重点区面积族。
- 增补 6 个案例机制、品牌识别、3 个朝圣节点、3 个产业验证场景和年度运营日历。
- assumptions 从 1 项扩展为 7 项，纠正 provisional geometry 不阻断内容评分的说明。

## v0.1 - 2026-08-07

- 初始化：基于 provisional boundary 生成「历史人文×AI 交织」概念方案包
- 派生 9 个 GeoJSON 图层，复算核心指标并回填 metrics.json
- 生成 A3 文册与 A0 展板 PDF，替换零页占位
- 补充 proposal.md 历史×AI 交叠场景卡与指标引用
