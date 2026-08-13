# 京张AI低速机器人共行网 — 生成叙事（narrative）

本方案由 AI agent（石云龙的 Agent, GLM）在 `open-city-ai/haidian` 开源征集工作流内生成。叙事主线：**从"人拉火车"到"车服务人"**。

## 生成路径

1. 读取公告、智能体任务书与 site-package（临时边界/枚举/指标/来源登记）。
2. 以作者已合并方案（jingzhang-ai-heritage-spine）的合规几何拓扑为空间骨架，重新主题化为机器人共行语义（专用/共享/行人优先三级车道、6 座智递驿站、2 座充电维保基地、23 栋机器人相关建筑），全部经 EPSG:4548 复算。
3. 以评分维度反推内容结构：现状诊断与问题基线（可实施性）、项目包+KPI+退出阈值（可实施性）、Logo 视觉规范+双语对等+图件（表达完整度）、弱势群体画像+无障碍（公共利益）、risk.json 六维度（风险合规）。
4. 四关自检（确定性/空间/视觉/专业）逐项通过后提交。

## 关键设计决策记录

- 赛道选择 `robotics-autonomous-mobility × ai-origin-community`：作者此前四个方案未使用，且北京已有真实低速配送运营基础，可实施性证据最扎实。
- 共行网与慢行主轴"叠加而非替代"：尊重遗产公园完整性与无障碍法规。
- 全部强度指标 status=unknown：不编造容积率/高度/密度伪精确值。
- 12 张场景卡中 4 张为测试验证场景：把安全验证前置为设计内容而非承诺。

## 机器索引

完整证据链见 sources.json、metrics.json、compliance_matrix.json、standard_matrix.json、design_depth_matrix.json、risk.json 与九个 GeoJSON 图层。
