# 方案迭代记录

> 京张合流带 / Jingzhang Merge Belt

> 版本化迭代记录。本方案为同一 Agent(benjaminshe / Reasonix Agent)在 `submissions/benjaminshe/jingzhang-merge-belt/` 下的持续演进,每次迭代均通过 GitHub PR 提交、经确定性校验与维护者评审后合并。

## v0.12 - 2026-08-16

- **凭证命名澄清(避免与 CRR 撞名)**:出场凭证由"回程收据 Return Receipt"更名为"**撤场凭证 Merge Exit Voucher**"——与 csy777qaz 城市应得的 Civic Return Receipt(CRR)及 zhaoxinyi02 可逆城的"回程票"明确区分:本方案凭证是"入场+出场"双凭证闭环的组成部分,不是公共成果记录;proposal.md / proposal.en.md / assets/media/merge-protocol.webp 同步更新。
- **机制总览表(一屏可读)**:proposal.md 与 proposal.en.md 新增"合流带机制总览"表——空间/时间/治理三层 × 10 项机制 × 一句话作用 × 证据位置,评审可在 30 秒内核验差异化机制组合(时隙互锁、双凭证闭环、回程预算、支流等价)。
- **机器可复核证据资产(对标 OceanHAN/LShengYi)**:新增 merge-protocol.json(协议六步+候场队列+双凭证闭环契约)、merge-timeslot.json(6 类时隙+互锁规则+公平三原则+跨区段协同契约)、return-budget.json(空间/运营/数据三责任人+撤场演练+年度 Undo+复盘档案墙契约),均已登记进 manifest(role=other+role_detail),哈希按 git blob 重算。
- **全套概念图重绘(更精美)**:以 matplotlib + EPSG:4548 投影重绘全部 6 组 figures(总览/用地结构/重点区/慢行蓝绿/指标证据/Logo)与 5 组 media 面板(cover/回路/时隙表/协议/支流保障),统一三色设计语言(上游蓝/开源绿/人文橙)、圆角面板、指北针、比例尺、图例与 provisional 声明;中英双语同步。
- 自检:四 gate 全 PASS。
## v0.11 - 2026-08-16

- **差异化加固(治理层)**:合流令牌升级为**双凭证闭环**——合流令牌(入场凭证)+ 撤场收据(出场凭证,数据删除证明+场地恢复确认+未结申诉清零),只有同时持有入场与出场凭证才构成完整合流,直接回应"凭证/归还路径"新热点(wangqj646 城市握手等),并强化本方案"合流令牌+回程预算"既有组合的系统性。
- **差异化加固(时间层)**:合流时隙表新增**跨区段时隙协同**——相邻区段在"交接班"处联动,下游以上游准点为前提,迟到即顺延并公开记录,使"何时合流"全线可预期、可追责(时间层×空间层以合流节点广场为咬合界面)。
- **合并 multimodal 增量**(原 PR #2214 内容):5 组双语概念面板(cover/merge-circuit/merge-protocol/merge-timeslot/tributary-assurance)、交互式合流时隙表、与常见"开源/PR 隐喻"方案的差异化对比表、PROV-KEY-003 大钟寺定位偏差诚实披露(issue #1029,质心距大钟寺站约 2.26 km,已按 provisional 处理);`report/proposal.html` 重新渲染,双语同步。
- 本迭代基于最新 upstream/main 重建(修复原 #2214 的 .gitignore 越界与哈希失配两个机械阻断),四 gate 自检全 PASS。

## v0.10 - 2026-08-12

- **合规升级**:manifest 迁移至 schema 0.2.x 契约(schema_version 0.2.0),`proposal.en.md` role 由 `narrative_translation` 修正为 `narrative`、`report/proposal.en.html` role 由 `rendered_report_translation` 修正为 `rendered_proposal_html`,对齐 0.2 canonical role 词表;保留 `validation_claim`(persisted-self-check-v1)与四 gate 持久化自检。
- **差异化加固(时间层)**:合流时隙表新增**时隙公平三原则**——普通通行与支流居民时段优先、公开排队先到先得禁止圈占、让行即公平(交界交接班由合流公议排定),直接回应"谁的时间"之问。
- **差异化加固(治理层)**:合流协议六步在"申报"后显式嵌入**候场队列(先候场、再合流)**——通过初审的运营者先在限定环境/场外试运行、公开结果并接受公议,不占用公共时隙,任何 AI 城市服务不得跳过试运行直接占线。
- **多模态呈现(响应 8/12 更新 brief)**:新增 5 张中英双语概念图(`assets/media/`:cover / merge-circuit / merge-timeslot / merge-protocol / tributary-assurance,含 `.en` 副本),登记 `role=media_poster` 与 `cover_image`,版权与生成来源写入 copyright_statement;均为程序化生成的概念示意,标注"非现状、非官方红线、非审批结论"。
- **可视化交互**:`visual/index.html` 与 `visual/index.en.html` 新增"合流时隙 · 一日"交互模块(本地 Canvas,拖动/键盘/播放一日,尊重 prefers-reduced-motion,无 CDN)。
- **PROV-KEY-003 点对点披露**:按 issue #1029 补充大钟寺临时重点区质心偏差约 2.26 km 的专项披露,并承诺官方 polygon 发布后随整链重算流水线修正。
- **开源隐喻差异化**:执行摘要新增与常见"开源/PR 隐喻"方案的 4 维对比表(选择 vs 强制、支流等价、回程预算、时隙维度)。
- 新增 `changelog.md` 迭代记录;`report/proposal.html` 重新渲染,双语同步。

## v0.9 - 2026-08-10

- 新增"任务响应矩阵":公告与任务书逐条映射到章节与证据,评审可快速核验。
- 新增"公共利益与包容性"独立章节,六类利益相关方(居民/青年人才/企业/高校/游客/一线运维)逐一回应。
- 官方数据复算管道:面积与指标标注置信度与复算前提,provisional 边界使用全程披露。
- 已由维护者合并。

## v0.7 - 2026-08-09

- 采用双语 v2 契约(`proposal_format_version:"2"` + `bilingual_contract_version:"1"`),中英全文等价。
- 证据密度收敛至确定性规则(块 ≤8、连续 ≤3);`self_check.json` 从最终字节重建。
- 评审整改全部落地:自我校验持久化、工具链披露、provisional 数据置信度调和。
- 已由维护者合并(PR #834)。

## v0.6 - 2026-08-08

- 新增**合流时隙表**(时间层):晨市/学市/夜市 + 安静时窗,令牌"一区段一时段"互锁,时刻表公开。
- 新增**合流协议六步**(治理层):申报—校验—挂牌—运行—复核—退场,含证据分级闸门与四类公共回执。
- 补齐 AI+医疗(SCENE-13)、AI+教育(SCENE-14)、自动驾驶(SCENE-15)、无人配送(SCENE-16)场景卡。
- 已由维护者合并(PR #560)。

## v0.5 - 2026-08-08

- 区域协同与三区两翼回路深化;双语方案与 Logo 方向齐备。
- 已由维护者合并(PR #455)。

## v0.4 - 2026-08-08

- 引入**四类公共回执**(已采纳/部分采纳/不采纳/待核实)与**回程预算**机制。
- 已由维护者合并(PR #449)。

## v0.2 - 2026-08-07

- 首版"京张合流带 Jingzhang Merge Belt"总体概念:Git Merge 隐喻、上游/维护者社区/发行区命名体系、空间—时间—治理三层机制。
- 已由维护者合并(PR #407)。

---

完整机制说明见 `proposal.md`;每次迭代的机器可读证据链见 `manifest.json`、`self_check.json`、`compliance_matrix.json`。
