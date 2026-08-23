# 方案迭代记录

## v0.1 - 2026-08-08

- 建立 blobless 稀疏参与者工作区并同步 `main`。
- 阅读站点包（design_brief、agent_taskbook、allowed_design_space、sources、planning_limits、standards、provisional boundaries）与公开来源注册表。
- 确立总体概念「京张智轨（Jing-Zhang Intelligence Track）」：从百年钢轨到智能轨迹，形成「一带三核、多点场景、蓝绿智环」空间组织。
- 生成正式提交包骨架并替换全部模板内容：
  - `proposal.md`：13 章专业方案，覆盖公告 1.3/1.4/1.5 与 agent.1—agent.6，含证据引用、场景卡、画像、朝圣地标、文化叙事与运营体系。
  - 9 个 GeoJSON 图层（拓扑正确：land_use 全覆盖无重叠，指标可复算）。
  - `metrics.json`：12 个 known + 2 个 unknown（待补控规条件）。
  - 5 张演示级图、`visual/index.html` 离线可视化、A3 文册（4 页）与 A0 展板（2 页）。
  - 矩阵：compliance（23 项任务）、standard（6 项标准）、design_depth（15 项深度）。
- 运行 finalize、self_check 与 participant_preflight 至 PASS（见 self_check.json）。
- 已知限制：官方边界/控规/道路红线/权属/市政/文保待正式资料发布后重算；`floor_area_ratio`、`building_height_m` 为 unknown。

## v0.1.1 - 2026-08-08

- 新增 10 张结构化 AI 场景卡（proposal.md 场景章节内嵌结构化表格，字段对齐 `schema/scenario.schema.json`），
  含 3 张 AI 产业测试验证场景（jzit-card-02 安全治理沙盒、jzit-card-03 端侧算力驿站、jzit-card-10 城市智能体沙盒）；
  按任务书 agent.3「场景-空间-运营映射」要求逐卡登记空间位置、服务对象、数据来源、公共价值、风险点与人工复核。
  注：投稿包白名单不允许 scenarios/ 目录，结构化场景卡以表格形式落在 proposal.md 内，属合规落位。
- 场景卡重编号：卡10 由「全球 AI 活动周路线」调整为「城市智能体沙盒」；「全球 AI 活动周路线」归入年度活动与运营体系（agent.6），
  修复原稿「10 张枚举 + 额外沙盒」的计数不一致，保持 10 卡 / 3 测试验证与 metrics.json 一致。
- 合规矩阵差异化：为 agent.1—agent.6 与 1.5.2.3/1.5.2.4/1.5.2.5/1.5.3.x 补充任务专属章节/图层/指标证据，
  其余任务保持通用引用，任务覆盖 23 项不变。
- 字段统一：manifest.json 与 agent.json 的 agent_name / model 统一。
- metrics.json：scenario_card_count 来源更新为 proposal.md 结构化场景卡表。
- 术语核对：proposal.en.md 关键术语与赛事术语表保持一致。
- 已知限制：build_jzit_*.py 生成脚本尚未同步本次结构化场景卡与矩阵差异化内容，
  重新运行生成脚本将覆盖本版本手改内容，需在后续迭代中并入生成脚本。

## v0.2 - 2026-08-23

- 结合规划专家意见与官方最新发布优化方案（新增来源均已登记 sources.json，共 6 条）：
  - 引入「城市有机生命体」理论锚点，把百年钢轨转译为城市「动脉」、蓝绿智环为「生态脉动+智能神经」（吴志强院士、国家发改委）
  - 注入 2026 中关村论坛官方数据：9 公里创新廊道、AI 核心产业超 3500 亿元（约全国三成）、近 2000 家 AI 企业、30 余家高能级平台
  - 具身智能场景对接小月河翼具身智能产业园，纳入机器人配送/巡检/零售低速试点
  - 「算力网=继水网、电网、通信网后的新一代城市基础设施」概念落地到端侧算力驿站与分布式能源节点
  - 引用京张铁路遗址公园二期落地案例（约 9 公里绿廊贯通、清河连通、鱼骨状慢行道）支撑慢行缝合策略
  - 大钟寺铁路工业遗产活化清单（折返段转盘剧场、焊轨厂运动公园、冷库美术馆、路演厅）
  - 「从为人规划转向与人共同规划」开源共建运营机制（呼应海淀政策+技术+生态模式）
  - AI 公共服务「服务找人」主动服务模式（发改委城市智能体建议）
  - 「感知—数据—计算—明律—应用」城市智慧链条的空间映射
  - 指标颗粒度呼应 AIQ 地块街坊级评价趋势
- proposal.en.md 大模型重译同步（对照赛事术语表）
- 重渲染 report/proposal.html 与 proposal.en.html；manifest sha256 刷新
