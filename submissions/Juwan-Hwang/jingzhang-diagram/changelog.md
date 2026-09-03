# 方案迭代记录

## v1.5 - 2026-09-02

针对 PR #4365 第二轮维护者评审意见（71.0/100，request-changes，10 项 required repairs）的全量修复，并同步落地对标冠军方案与同行方案的优化建议：

- **任务书相关性 · 全球案例对照表（case_study_table）**：将原“名称+机制并列”段落升级为 7 案例×6 列对照表（来源/可借鉴机制/不可照搬条件/京张空间产业转译/风险教训），含 Quayside 反面案例；7 条 CASE-* 来源（含 URL 与访问日期）登记入 `sources.json` 并在正文逐项引用，明确标注为背景资料、待 registry review、不作正式依据。
- **任务书相关性 · 区域协同矩阵**：新增专节，逐节点（北纬社区/未来科学城/怀柔科学城/经开区/中关村/京津冀）明确双向输入输出、空间/运营接口与现状区分（概念建议 vs 现状建成区）。
- **原创性 · 去绝对比较表述 + 概念谱系**：删除“此前所有方案都漏掉”“第一次被同一张图收编”“首个外部采用方”等无法复核的绝对比较，改为“本方案提出/整合尝试”；新增概念谱系声明，区分作者原创转译/公共理论/全球案例/SEB 社区贡献四类来源（中英正文与 visual 页同步）。
- **AI 创新 · 场景—空间—运营统一映射矩阵**：新增 12 场景×9 列机器可读矩阵（feature_id/用户/拟议主体/风险等级/数据边界/人工复核与成败判据/退出条件/成熟度 C・T・P），明确合成桌面推演不升级为现场安全证据。
- **可实施性 · 精确数字全量审计**：发现并修正“12.8 km 连续绿道”与几何不符的问题——按 EPSG:4548 复算 greenway 中心线，登记 `slow_corridor_length_m = 11,005.9 m`（主脊 ROAD-001 约 9.47 km + 3 条缝合廊道约 1.54 km）入 `metrics.json`（含公式），正文与全部图件/A0/A3 同步改为复算值；3 秒长按、≤15 km/h、50 米、24 小时 SLA、100% 覆盖类表述全部降格为设计假设/拟议目标值，新增 4 条 A-DESIGN-* 假设入 `assumptions.json` 并在正文逐项引用。
- **可实施性 · JZ-01~10 台账升级**：扩展为 8 列（前置依赖/拟议主体/最小资源类型/阶段验收条件/退出机制与退出成本），全部主体统一标注“拟议主体（待授权）”并声明不得表述为已成立/已承诺。
- **风险合规 · 资产级来源与权利台账**：`report/copyright_statement.md` 新增 10 行逐项台账（类别/作者发布者/URL或版本/访问日期/许可原文依据/是否改编/署名位置/允许用途），覆盖自绘图、PDF、字体 OFL、SEB CC BY-SA、事实引用、案例背景、GeoJSON 衍生、代码 MIT 与数据 CC0。
- **风险合规 · 审查状态统一**：`assumptions.json` 中 4 条 `status: verified` 全部改为 `participant_self_checked_pending_registry_review`（字段 verified_* 更名 checked_*）；正文/参考文献中“已核定/verified”统一改为“投稿者自检核对（待 registry review）”。
- **表达完整度 · 新增五组真实空间图件（双语共 10 张）**：基于包内 provisional GeoJSON 用 matplotlib+shapely+pyproj（EPSG:4548）绘制——总体空间结构定位图（spatial-structure，九图层叠合 + 指北针 + 比例尺 + 图例 + feature_id 标注 + provisional 警示）；三张重点区平面图（key-area-plan-zhongzhiyuan/origin/dazhongsi，视口外扩 350 m，含用地分带/建筑基底/公共节点/文保避让标注）；人字折返主脊代表性流程断面（switchback-section，横轴为 ROAD-001 真实里程投影，治理流程/空间层/慢行层三泳道，显式标注非测绘断面）。
- **表达完整度 · A0/A3 重排**：A0 首页改为大幅总定位图 + 三张重点区平面填满版面，第二页 2×2 信息图网格，消除截图过小与大面积空白；A3 文本册扩充为 11 页（封面 + 10 图），封面版本更新 v1.5；双语对应位置与数值一致。
- **优化建议落地**：新增 30 秒速读层（START HERE 前）；用地功能混合度解读（0802 约 70.8% / 1401 约 13.7% / 05 约 6.3% / 0803・0702 各约 4.6%，基于 area_sqm_declared 复算）；包容性共创与反绅士化拟议监测指标（工作坊频次/居民代表占比/留存率与租金预警线，均标注拟议目标值）。
- **产物重生成**：重绘全部 10 张既有信息图（修正里程与 100% 措辞）；重渲染双语报告 HTML 并重建字体子集；刷新 `manifest.json`（含 10 张新图条目）与 `self_check.json`。

## v1.4 - 2026-09-01

针对 PR #4365 维护者评审意见（77.0/100，request-changes）的六项阻断修复：

- **表达完整度 · 中文字体完整内嵌（闭环缺字方框）**：移除纯系统字体回退方案，改为将 Noto Sans SC（SIL OFL 1.1）按本包四个 HTML 的实际用字（1212 字符）子集化为 WOFF2（Regular/Bold 双字重，约 300KB/重），以 data URI 内嵌于 `visual/assets/fonts/notosanssc-subset.css` 并由四个 HTML 相对引用；经 cmap 逐字核验 0 缺字。字体许可、嵌入权与子集化方式在 `sources.json`（`FONT-NOTOSANSSC-OFL`）与版权声明中登记。
- **表达完整度 · 计数口径全载体统一**：将导读、Rubric 映射表、图件与英文对应文本中的场景卡/测试场/画像计数统一为 12 张场景卡、4 个产业测试验证场景、6 类用户画像；消除 site-overview 图件副标题“Four Test Grounds/四处测试验证场”与三处重点区域块之间的矛盾，改为显式列出四处产业测试验证场景；修复 site-overview.en 卡片文字截断。
- **风险与合规 · SEB 措辞全面降级**：删除中英正文、HTML、图件与 PDF 中的“机器验证/逐条校验/7/7 certified/verified”等第三方认证暗示，统一为“参与者桌面自检：7/7 合成样例与预期一致，未经本评审执行或第三方独立认证，不构成安全性能证明或合规结论”。
- **风险与合规 · 逐资产权利与来源矩阵**：扩充 `report/copyright_statement.md`：新增内嵌字体条目（名称/许可/嵌入权/再分发条件），补全图件作者与生成工具、地图数据来源与复用条款、SEB 逐文件 CC BY-SA 4.0 署名与同方式共享义务；明确 COMMUNITY-DISPLAY-ONLY 仅覆盖原创表达类文件，消除正文“全部开源图纸/开源许可发布”等冲突表述。
- **风险与合规 · 登记摘要口径修正**：删除“登记摘要为 formal 可用三类”“公开数据源 100% 可追溯”等与仓库空 source_registry_summary 不一致的超额表述，改写为“投稿方来源清单逐条登记可核对，正式可用性待 registry review”。
- **可实施性 · 人本制动闸分级安全接口（The Human Switch）**：新增专节，将停止权定义为三级接口：L1 公众告警（任何人可报，即时登记公示，不直接驱动设备）→ L2 现场授权急停（公示授权角色，3 秒长按+双人确认防误触，场景降级与区间隔离）→ L3 专业恢复（调度大厅与责任自然人共同核对，物理钥匙复位，恢复决定写入路票台账）；配套误触/滥用追责与不可篡改审计留痕，并明确声明为概念接口设计、非现成安全保障承诺。同步更新 JZ-06 退出条款与图件卡片。
- **产物重生成**：重绘 6 张被点名图件（中英各 3）；重建双语 A0 展板与 A3 文本册 PDF（封面为内嵌 OFL 字体子集的真实文本层）；重渲染双语报告 HTML；刷新 `manifest.json` SHA-256 与 `self_check.json`。

## v1.3 - 2026-08-31

- **空间指标拓扑复算与全链路统一**：在 `metrics.json`、`visual/index.html`、`visual/index.en.html`、`proposal.md` 与 `proposal.en.md` 中全面统一空间指标计算口径。分子采用 EPSG:4548 坐标系下 unary_union 融合并与 provisional 边界相交裁剪的精确面积：`green_space_area_sqm` (1,789,421.322 m²) / `public_space_area_sqm` (1,062,301.122 m²)，比值精确统一为 `green_ratio = 0.15679 (15.68%)` 与 `public_space_ratio = 0.09308 (9.31%)`，消除同名指标口径差异。
- **第一手权威史实与公报来源升级（去绝对化表述）**：
  1. 依据中华人民共和国交通运输部官方公报与新闻发布记录（`AUTHORITY-MOT-HSR`），统一采用完整定调“世界首条时速350公里的智能化高速铁路”，杜绝泛化表述；
  2. 依据中国科协科学家精神档案与中国铁道博物馆官方史料（`AUTHORITY-ZHANTIANYOU`, `AUTHORITY-JINGZHANG-1909`），核定詹天佑先生 1914 年演讲词与 1909 年通车时间线；
  3. 将 1980s 与 2026 年条目在全案中明确界定为历史叙事里程碑与方案概念设计主张，删除无法核验的绝对化定性；
  4. 将正文中“100%可追溯/全部史实已核定”等夸大表述软化为审慎的“核心史料已严格核对交通运输部与铁道文博官方档案”。
- **随包离线中文字体子集内嵌（Noto Sans SC · OFL 1.1）**：在 `visual/assets/fonts/notosanssc-subset.css` 中以 WOFF2 data URI 内嵌轻量中文字体子集，解决沙盒评审容器无 CJK 系统字体导致的缺字方框（tofu）问题；并在 `report/copyright_statement.md`、`manifest.json` 与 `sources.json`（`FONT-NOTOSANSSC-OFL`）中完成合规登记。
- **服务等价基准升级（SEB v0.5.0 · Issue #2549）**：将服务等价基准由 v0.3.0 正式升级至社区最新 v0.5.0 版本，更新 `seb-spec.json`、`seb-tabletop-run.js` 与 `seb-change-receipt-sample.json`；完善 7 项联锁测试样例的 `funding_owner` 生命周期与 `adopter_lexicon_evidence` 证据字段，保持 7/7 机器校验全量通过；精修免责声明与内部 posting 指针。
- **场景演练台账与离线基准（simulation.json）**：依照 `docs/simulations.md` 规范，补齐覆盖 10 大场景的离线合成演练台账 `simulation.json` 与 `urban_llm_harness` 评测基准；在 `metrics.json` 中登记 6 项演练保留指标（任务数 10、成功率 90.0%、工具 schema 100.0%、能耗超限 1 次、审计完整度 90.0%、重规划 p95 延迟 5.8s），并在主报告中形成证据闭环。
- **终局评审直通车（START HERE）**：在主报告与英文翻译件导言区增设「8 分钟极速导读导航」，提炼 5 站式快速导读动线，直接链接核心元概念、空间操作系统、AI 治理四制、实施台账与 Rubric 证据矩阵。
- **七维度 Rubric 显式证据映射表**：严格对齐官方 `docs/review-rubric.md` 7 大评审维度（`brief_alignment` 20%、`originality` 10%、`ai_planning_innovation` 15%、`implementation_feasibility` 20%、`public_interest_inclusion` 10%、`risk_compliance` 10%、`expression_completeness` 15%）与 `agent_taskbook.json` 的 6 项智能体任务，将得分点、章节编号、图件名、GeoJSON 图层与证据标签全部逐一锚定。
- **实施与权属台账深化**：将原概念性项目清单升级为包含「主要依赖与权属边界」、「运营/准入主体」、「应急熔断与退出机制」的权责矩阵，强化全生命周期治理闭环。
- **人本治理与紧急制动闸（The Human Switch）**：强化弱势群体与市民在 AI 进城中的知情权与随时下车权（Emergency Stop & Opt-Out），呼应任务书 Charter 10 人本治理原则。
- **展示页 Front-Matter 标量兼容性规范**：将主文 `summary` 字段统一为单行双引号字符串，避免自动化展示页提取时的截断隐患。
- **双语离线报告与校验和重算**：使用 `render_proposal_html.py` 重新生成中英双语 HTML 报告，使用 `refresh_submission_manifest.py` 刷新全量资产 SHA-256 哈希，4 道本地 Gate 全部通过。

## v1.2 - 2026-08-15 (PR #2779)

- **文保来源登记与置信度升级**：依据北京市人民政府公开发布的《北京市第十一批文物保护单位名单》（京政发〔2025〕3号）与北京市文物局法定文保名录，登记清华园车站旧址与觉生寺（大钟寺）的公开文保依据（`HERITAGE-LIST-11TH`、`HERITAGE-QINGHUAYUAN`、`HERITAGE-PING-SUI-XIZHIMEN`、`HERITAGE-DAZHONGSI`），升级 `CONS-001` 置信度为 `medium`。
- **文保图层合规边界明确**：在 `geometry/constraints.geojson` 与 `assumptions.json` 中明确声明文保红线为 `provisional_constraint`，以避让原则为底线，严禁任何侵入性工程。

## v1.1 - 2026-08-14 (PR #2682)

- **服务等价基准（SEB）v0.3.0 快照集成**：作为首个外部采纳方，在 `visual/assets/` 中引入 SEB v0.3.0 规范与桌面校验器，建立 7 项联锁机验证测试套件（`jingzhang-seb-fixtures.json`），实现 7/7 全量机器可验证通过。
- **变更收据与快照机制**：提交 `seb-change-receipt-sample.json` 与 `seb-snapshot.json`，确保治理四制与联锁规则具备字节级可审计性。

## v1.0 - 2026-08-13 (PR #2360)

- **三大史实权威核定与假设状态转正**：
  1. 詹天佑“各出所学，各尽所知”题词出处：核定为 1914 年汉口欧美同学恳亲会演说，正文与假设表据此修正；
  2. 京张高铁表述口径：核定为交通运输部 2025 年官方定调“世界首条时速 350 公里的智能化高铁”；
  3. 京张铁路通车纪念日：核定 1909 年 10 月 2 日为南口通车典礼，9 月 24 日为全线开行列车日。
- **假设表状态更新**：在 `assumptions.json` 中将对应的 `A-FACT-*` 条目由 `pending_authoritative_verification` 转为 `verified`。

## v0.9 - 2026-08-12 (PR #2029)

- **证据概览与摘要解析修复**：
  1. 修复展示页摘要提取：将 `proposal.md` front-matter 中的 `summary` 字段由 YAML `>-` 块标量重构为单行字符串，解决展示页卡片摘要解析截断问题；
  2. 补齐边界与自检证据标记：在正文中补充 4 处 `[assumption:*]` 与 2 处 `[self_check:*]` 标记，使证据概览面板完全闭环。

## v0.8 - 2026-08-11 (PR #1918 & PR #1925)

- **证据引用补全 (PR #1918)**：在 `proposal.md` 中补齐 `[metric:key_area_count]`、`[metric:green_ratio]`、`[metric:public_space_ratio]`、`[metric:floor_area_ratio]` 等指标与深度标签，在 `standard_matrix.json` 中补充 3 项专业标准条目。
- **上游工具链贡献 (PR #1925)**：向开源主仓提交工具链修复补丁，修复 `scripts/validate_submission.py` 中 `manifest.json` 自引用 sha256 递归校验死锁问题，并添加 63 行自动化测试用例，获官方维护者合入主干。

## v0.1 - 2026-08-10 (PR #1578)

- **首发正式入库（PR #1578）**：完成首个正式方案包（`formal`），经 CI 机器人与维护者评审以 76/100 通过并合入 `open-city-ai/haidian` 主仓。
- **元概念确立**：提炼铁路总谱——“运行图（Working Diagram）”元概念，确立“按图行车，以人定局”的设计主线；将詹天佑 1909 年“各出所学、各尽所知”立为开源城市宪法。
- **空间操作系统**：提出“人字折返单元（Switchback Unit）”，构建众智园（试车线）、原点社区（始发站）、大钟寺（编组场）、中关村（机务段）、小月河（工务段）的三区两翼协同回路。
- **治理四制转译**：将铁路“信号·闭塞·联锁·路票”转译为 AI 进城准入协议，设计 10 张 AI 场景卡与 3 处测试验证场。
- **多模态成果交付**：提交 9 项 GeoJSON 空间几何图层、5 张双语标准图件、A0 展板与 A3 文本册 PDF、双语离线 HTML 报告与可视化页面。
