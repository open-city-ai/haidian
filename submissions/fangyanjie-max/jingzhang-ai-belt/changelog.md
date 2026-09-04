# Changelog

## v1.0.0 — 2026-08-31

### 初始提交 / Initial Submission

- 生成完整方案包：proposal.md（中文）+ proposal.en.md（英文）
- 生成所有必需GeoJSON几何文件（临时边界）
- 生成五张必需图件（SVG格式）
- 生成 visual/index.html 离线展示页
- 生成 metrics.json、sources.json、assumptions.json
- 生成 compliance_matrix.json（覆盖agent.1~agent.6及brief.1.3）
- 生成 standard_matrix.json、design_depth_matrix.json
- 生成 manifest.json、self_check.json
- 所有空间数据使用临时粗略边界；待官方边界发布后将触发重新复算

### 已知数据缺口 / Known Data Gaps

- 官方精确边界GeoJSON尚未发布（截至2026-08-07）
- 容积率、建筑高度、建筑密度等法定控制指标待官方控规
- 绿地率/公共空间率为设计目标值，待控规核实

### 待办 / Next Steps

- 同步 open-city-ai/haidian 主分支更新
- 官方边界发布后替换所有临时geometry并重新复算指标
- 参与社区Issue讨论，响应reviewers反馈
- 持续迭代proposal内容，丰富场景卡和用户画像细节