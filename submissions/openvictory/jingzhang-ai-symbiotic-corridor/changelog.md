# 方案迭代记录

## v0.2 - 2026-08-08

响应维护者评审意见（PR #92 评审，七维加权分 55.0/100，request-changes）：

- P0 统一建筑基底面积证据：geometry/buildings.geojson 全部 declared 面积按 EPSG:4548 投影复算核对，总计 1,211,832.4 sqm（6 栋）；metrics.json、assets/figures/*.png、drawings/*.pdf、report/proposal.html 全部以复算值重新生成，消除 310,807 与 1,211,832 的跨成果不一致。
- P0 重做 A0 与 A3：消除大面积留白，A3 册扩展为 5 页（封面/总览与指标/三处重点区域/场景卡与画像/项目与分期），A0 展板扩展为三区详情+指标+场景卡三栏布局，全部图纸含临时边界醒目警示。
- P0 版权与来源尽调：report/copyright_statement.md 重写为逐资产权利登记表（7 类资产），含字体许可声明、数据边界声明、第三方内容声明和 AI 生成披露。
- P1 补充 agent.1：新增英文命名（Jing-Zhang AI Symbiotic Corridor / JZ-AI-SC）、Logo 概念方案（人字形轨道+AI回路三层结构）、品牌色板、导视符号系统。
- P1 补充 agent.2：新增 7 个全球 AI 创新生态对标案例（Station F / One-North / Mission Bay / 深圳南山 / Eindhoven HTCE / 涩谷 / 波士顿海港区）、6 层生态机制图谱、区域协同连接方案。
- P1 补充 agent.3：10 张场景卡扩展为六列完整矩阵（空间节点/数据源/模型能力/运营主体/人工复核/KPI），新增 3 个产业测试验证场景（T-01~T-03）。
- P1 补充 agent.4：新增三大 AI 朝圣地标（京张智脉塔/原点开源广场/大钟寺AI之眼）含空间特征与数据落点；新增荣誉贡献体系（贡献者墙/代码胶囊/组件库）。
- P1 补充 agent.5：新增三层文化叙事结构（历史层/创新层/未来层）、导视符号系统四色编码、国际传播机制。
- P1 补充 agent.6：新增年度活动日历（6 项/年）、开发者社区理事会治理架构、场景开放机制（90 天全流程）、贡献积分体系、人才招引转化漏斗、运营风险控制措施。
- P1 修正临时数据表达：site_area_sqm / green_ratio / public_space_ratio 等临时边界派生指标降级为 medium 置信度，manifest.validation_claim 修正为 self_checked=true / data_confidence=medium。
- 补充弱势群体和非数字用户设计验证：在场景卡矩阵和运营风险控制中体现人工接管、无障碍推荐和低噪声活动管控。

## v0.1 - 2026-08-07

- 由 AI agent OpenSquilla（GitHub: openvictory）基于 site-package 0.1.0、资格预审公告和面向智能体任务书生成 formal 投稿包。
- 六项 agent 任务（总体概念/生态案例/场景卡/朝圣地标/文化叙事/长期运营）在 proposal.md 正文与 compliance_matrix.json 中逐条响应。
- 空间图层：site_boundary、key_areas（3 处重点区 provisional）、land_use（4 分区）、buildings（6 处锚点建筑）、roads（5 条设计线路）、green_space、public_space、phasing、constraints。
- 自检结果：self_check_submission.py --pr-author openvictory 全部 PASS，审核状态 formal-review-ready。
- 已知披露：官方精确 polygon 未发布，边界采用 PROV-* 临时粗略边界，仅作展示与生成约束，正式数据发布后需复算。

## 待复核事项

- 官方红线、地块与控规条件到位后，替换 provisional 边界并复算全部面积指标。
- A3/A0 图纸随方案内容迭代继续完善图面表达。
- 全球案例参考文献待正式提交前补充详细比较研究。
- 字体商用授权在正式出版前需单独确认。
