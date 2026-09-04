# 方案迭代记录

## v1.2 - 2026-08-26（响应维护者自动评审 request-changes）

- [字体] visual 与 report 四个 HTML 嵌入 Noto Sans SC（OFL 1.1）1020字形子集（woff2/base64，262KB），无中文字体环境不再出现方框；版权声明登记名称/版本/许可/来源/工具。
- [英文图] 全部 .en 图件完成本地化清扫：图例、页脚、注释、流程框、页签不再残留中文；A3/A0 .en 版同步。
- [A0排版] 重写版面引擎：图片与文字栏不再重叠；A0 字号放大2.05倍、主图占60%版面，消除"内容极小+大面积空白框"。
- [证据链] 修正 Ch11"全球案例7个"→8个（中英）；metrics.json 公共脊来源 RD-009→RD-011（与 roads.geojson 实际要素一致）。
- [标准归因] 场景"五要素"与"≥1.8m净宽"明确标注为**本方案建议规则/概念设计参数**（在现行法规之上的自设建议，非法条直接规定）；国办发〔2020〕45号仅作背景政策参照；standard_matrix.json 三条 evidence_summary 同步改写。
- [区域协同] 补充与北纬社区等既有社区的"驿站服务清单+场景试点征询"协同接口（中英）。
- 修复后四门自检再次全部 PASS（formal-review-ready）。

## v1.1 - 2026-08-25

## v1.1 - 2026-08-25

- 独立严格评审（评审员"铁轨"）首轮78.5/100，十大弱点逐项修复：
- [P0] 修正正文建筑数字（63处/15.4万㎡，与buildings.geojson复算一致）。
- [P1] 新增A3"标准轨剖面与驿站基本间"页（110m带剖面+15×24m组件+800m标准段拼贴，概念示意）；FIG01/FIG04标注防碰撞重排；两翼虚线边界上图。
- [P1] 新增概念体量敏感性区间（FAR 0.8–1.6、密度10–20%，低置信度假设）与十项目资金机制选项。
- [P2] 看板新增场景卡/更新项目/建筑三个内容块与SVG图例；万轨厅明确为第二个朝圣地标；小月河加临时对位注记；案例更新为8例（新增e-Estonia、AI Verify、Dubai Future Accelerators）并登记GLOBAL-CASES来源。
- 修复后四门自检再次全部PASS（formal-review-ready）。

## v1.0 - 2026-08-25

- 初版 formal 提交包：京张轨距 GAUGE 1435。
- 概念：以1435mm标准轨距为元隐喻，构建空间/场景/测试/治理四类城市AI标准；一脊三区两翼十二站。
- 几何：9图层全部由脚本生成，131用地单元无缝剖分，EPSG:4548复算；三项核心视觉指标 known 且与 visual data-value 一致。
- 双语：proposal.md（zh）+ proposal.en.md（en）；图件/PDF/HTML/看板均提供 .en 对应版本。
- 任务覆盖：公告1.3/1.4/1.5共23项 + agent.1-6 全部登记 compliance_matrix；5项强制标准+3项响应标准登记 standard_matrix；15项设计深度全部 complete。
- 质检：deterministic_validation / spatial_review / visual_review / professional_review 四门 PASS（self_check.json），participant_preflight PASS。
- 待补：官方边界、控规条件、文保范围发布后整体复算（见 assumptions.json 触发条件）。
