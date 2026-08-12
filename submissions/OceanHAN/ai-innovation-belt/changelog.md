# 方案迭代记录

# Changelog — 京张主线 JINGZHANG MAINLINE

## v0.1 - 2026-08-10

**总体概念**：京张主线 JINGZHANG MAINLINE——把京张铁路（中国人自主设计的第一条干线铁路）与开源协作主线-分支-合并流程双重融合，城市更新第一次以 Pull Request 方式协作。

### 本版内容
- 空间骨架：一主线（约 8.7 km 主线绿道）· 三 Merge 节点（CI.Yard 众智园 / Kernel 原点社区 / Release 大钟寺）· 双翼（Registry 中关村服务翼 / Staging 小月河场景翼）
- 用地结构：52 个地块无缝覆盖（gap=0、overlap=0），科研 22.3% / 教育 21.5% / 商业 25.6% / 居住 19.6% / 绿地 11.1%
- 12 张 AI 场景卡（含 4 张产业测试验证）、6 类用户画像、4 处朝圣地标、8 个更新项目、三期实施框架
- 双语完整包：proposal.md / proposal.en.md、report HTML（中英）、visual index（中英）、A3 文册与 A0 展板（中英）、5 张图件（中英）
- 全部 known 指标由提交几何在 EPSG:4548 复算；控规五要素与道路红线标注 pending_official_control

### 边界与数据状态
- 基于组织方临时粗略边界（provisional_rough）：仅用于生成、展示与临时自检，官方红线发布后整包重算
- 缺官方精确 polygon、控规条件、现状建筑与权属、市政管线等数据（见 assumptions.json）

### 待后续迭代
- 官方边界/控规数据发布后重算几何与指标
- 依据评审反馈与 Issues 修订概念、场景与运营机制
- 参考 peer proposals 的可复用方法（许可允许范围内）

## v0.2 - 2026-08-10 实施可行性强化（应对 Review Agent 评分）

- 更新项目清单 8 → 10 项：新增 Registry 创新服务包注册中心（JZ-09）、Commit 提交廊与开发者散步道（JZ-10）
- 项目表新增"实施主体（概念）"与"关键指标（概念）"列，全部标注概念建议
- 新增"实施机制"小节：统筹主体与节点运营共同体、场景开放收益回补资金模式（概念）、政策工具待确认
- 分期框架补充概念时间里程碑（一期 2026-2028 / 二期 2028-2030 / 三期 2030+，待官方确认）
- 交通章节细化：四类慢行断点缝合清单、大钟寺站四象限连通与 Kernel 站城通道（概念）
- 新增"开源循环到城市治理的机制映射"（issue→PR→review→merge→release→maintain）
- 新增"公共利益与公众参与机制"小节：公众评审权、普惠可达、社区共营
- metrics.renewal_project_count 同步 8 → 10；双语、visual HTML 全部同步
- 本地 self-check 四项全绿；推修订版触发新评审

## v0.3 - 2026-08-11 任务相关性与治理机制强化

- 三区两翼结构化映射表：三大定位、五大功能 → 主线回答 → 可读空间/机制（八行完整映射）
- 新增"区域创新协同（可签接口）"：北纬社区/未来科学城/怀柔科学城/北京经开区/张家口京津冀五类接口，仅登记"输入、公共回报、数据边界、退出条件"
- 新增"主线合入验收协议"：公开提案→公众评审→最小回退→可解释记录→发布即存档五则，逐条对应场景卡运营要点
- visual/index.html（中英）新增"实施路径与治理协议"版块
- 本地 self-check 四项全绿；推修订版触发新评审

## v0.4 - 2026-08-11 双轨可验证主线强化（DIFF：72 → 冲高）

核心命题升级：**「合入必须可合回（Merge must be reversible）。」** 在开源协作隐喻之外引入第二条可验证主线。

### 本版内容
- 执行摘要新增**双轨验证命题**：主线五段验收链 `COMMIT→MERGE→LIVE→BLACKOUT 退场→LEGACY 红利留档`；任何 AI 场景合入前须先证明无 AI 基线可用、经历可拔线测试、退场后留下公共红利
- 12 张场景卡补**四段可验证合同表**：无 AI 基线 / AI 增益 / 立即退场条件 / 退场红利（含维护人）
- 新增**项目成熟度 G 闸门 × 场景准入 C 闸门**双闸门（每项目补失败后默认动作）
- 新增**可复现合成推演** `visual/assets/mainline-tabletop.json`（12 场景×5 分支=60 例，缺基线/缺人工/缺退场/缺红利/禁入数据→blocked；现场绩效保持 unknown）
- 新增**治理状态机与审计独立**：8 状态 `proposed→…→blackout_drill→retained/removed_archived`，退场演练与红利审计不可跳过，运营方不能给自己签字
- 公共利益新增**离线公共红利兜底**：六类画像从标签升级为权限/风险/维护/收益输入，明确各类"无 AI 普通路径"
- 风险章节新增**硬停止条件**、**技术退场债务**、**权利与素材 ledger**（visual/assets/rights-ledger.json）
- 本地 self-check 四项全绿 + advisory 8 维度全 PASS

> 边界声明不变：全部空间建议基于临时粗略边界，官方红线发布后整包重算。新增内容均为概念建议/可签机制，未虚构合作、未编造政府安排。

## v0.5 - 2026-08-12 机器可复核证据系统（DIFF：80 → 冲高）

核心转向：把 v0.4 的概念表述落地为**一套机器可读、可复核的治理/证据资产**，形成"可实施性"与"表达完整度"的可审计证据面。

### 本版内容
- **12 场景四段契约** `visual/assets/mainline-contracts.json`：每张含 baseline/boost/blackout/bequest、允许/禁止数据、治理角色（ROLE-*）与拔线动作
- **主线五段验收链** `visual/assets/mainline-pipeline.json`：COMMIT→MERGE→LIVE→BLACKOUT→LEGACY，开源 PR 语义 ↔ 可验证公共语义 双语义
- **项目/场景双闸门** `visual/assets/mainline-gates.json`：G0–G7 × C0–C7（含失败默认动作）
- **8 状态治理状态机** `visual/assets/mainline-state-machine.json`：proposed→…→blackout_drill→retained/removed_archived + 转移条件/角色
- **治理角色 RACI** `visual/assets/mainline-raci.json`：13 个 ROLE-*（主线守护人/运营/安全退场权/数据/无障碍/文保/交通/政务/教育/医护/社区/开源社区）
- **硬停止条件** `risk.json`：HS-01…05（无 AI 路径/无人工/无法拔线/敏感数据越界/红利无维护人）
- 合成推演 `mainline-tabletop.json` 保留并纳入证据系统计数
- proposal.md/en 双语义引用全部 machine asset；metrics 新增 7 项指标（machine_contract_count / machine_evidence_asset_count / pipeline_stage_count / governance_state_count / weak_presence_of_governance / hard_stop_condition_count 等，共 36 项）；manifest 登记全部新增资产
- 本地 self-check 四项门 + advisory 8 维度全 PASS

> 边界声明不变；新增资产均为概念建议/可签机制，字段完整不等于服务有效或公众同意，现场绩效保持 unknown。
