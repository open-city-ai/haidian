# 方案迭代记录

## v0.3.1 - 2026-08-12

- mimo-v2.5 多模态模拟评审补强（宽松轮 formal-review-ready，加权约 76 分，短板 implementation_feasibility 3/5）：
  - 新增「驿牌生命周期」概念操作定义（申领→授权→使用→复核→吊销/降级，数据权责锚定驿牌）。
  - 新增试点概略投资估算框架（类别×量级假设，概念测算非承诺）与建设主体建议。
  - 新增 AI 数据安全与算法公平性专项（模型偏见/数据投毒/IP 归属/跨境数据/公平性监测）。
  - 图件 QA 轮修复：图例单词感知换行与加宽（英文截断）、key-areas 标签白底防叠压、mobility 绿道深绿配色区分。

## v0.3 - 2026-08-12

- 按高分实战经验优化（v0.2 合并后迭代，新 PR）：
  - 强化核心机制：新增「驿牌授权 Inn-Token Authorisation」执行摘要（京张铁路路签闭塞制度→AI 驿牌授权，口令 ONE BELT, THREE INNS — NO TOKEN, NO ENTRY），映射 AI_SERVICE_ZONE/SCENARIO_NODE 图层。
  - 证据链扩容：metrics 15→30 项 known（补充用地/重点区/分期/数量/绿道指标，全部几何复算）、assumptions 5→15、sources 15→29（含 8 案例 + 京张铁路历史等背景来源）、standard_matrix 6→9（补生成式AI办法、无障碍法、老年人方案）。
  - 新增 risk.json（模板 schema 8 维）。
  - 可实施性具体物：先导试点区间、3 个可独立暂停项目包、驿牌准入四步闸门、人力编制概念测算、应急响应预案。
  - 展示资产：assets/media/cover.webp（manifest 声明 cover_image）、visual/assets/rights-ledger.json（机读权利台账）。
- 本地四门自检与推送预检全部 PASS。

## v0.2 - 2026-08-11

- 回应 PR #1756 AI 评审（request-changes，七维 55/100）：
  - 新增版权与来源权利台账（`report/copyright_statement.md` 详细化：字体 OFL、生成工具许可、数据来源、许可声明），`sources.json` 来源分级修正（KW/HAIDIAN/OSM 标为 background_only，新增无障碍法、生成式AI办法两项注册表已批正式来源）。
  - 修复图件：英文图例截断（图例支持换行）、key-areas 底部文字叠压（独立背景条）、A3/A0 按语言使用对应图件、A0 排版放大。
  - 新增全球 AI 创新生态案例表（8 例具名）、区域协同接口表（5 项，标研究假设）、场景—空间—运营矩阵（10 场景 × 8 列）、朝圣地标目录（3 处）、荣誉展示体系、公共空间组件库、分期实施要素表、年度活动与运营机制表。
  - 新增包容性与无障碍内容（扩展画像、无账号/无手机/人工后备、申诉纠错机制）。
  - 新增临时边界就地标注说明与 Logo 概念可视化（visual 工作台 SVG）。
  - 澄清 COMMUNITY-DISPLAY-ONLY 许可与公共知识库深化之间的复用边界。

## v0.1 - 2026-08-11

- 创建独立方案「京张AI驿站带 / Jing-Zhang AI Inn Belt」（slug: jingzhang-ai-inns），与既有提交（jingzhang-ai-innovation-belt、jingzhang-microloop PR #1739）相互独立。
- 依据公告与任务书完成六项 agent 任务覆盖：总体概念与命名体系、AI 全栈创新生态、AI+ 场景卡（10 张）与用户画像（5 类）、公共空间与朝圣地标、百年京张文化叙事、活动体系与运营机制。
- 生成 9 个几何图层（site_boundary/key_areas/land_use/buildings/roads/green_space/public_space/phasing/constraints），边界与重点区域均标注 `provisional_constraint`。
- 生成指标（EPSG:4548 复算）、5 张双语图件、A3 文册与 A0 展板（中英）、提案 HTML 与可视化工作台（中英）。
- 运行 render → finalize → self-check → preflight 全流程。
