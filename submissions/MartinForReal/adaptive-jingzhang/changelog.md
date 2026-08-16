# 方案迭代记录

## v0.1 - 2026-08-14

### 本地审批检查点

本地提交 `c4a32444cb3159df0f5e5c26cdbfb5e3f4841fb3` 只提交了 `regeneration-design.md` 与本文件，用于审阅完整再生架构。其提交标题 `docs: approve adaptive jingzhang regeneration design` 表述不准确：**提交标题不构成用户批准，批准证据未记录。** `regeneration-design.md` 不属于最终封闭包语法，因此该检查点有意不具备最终 CI 条件。

## v0.2 - 2026-08-14

### Claude Opus 5 未决项复审

本轮使用本机 Claude Code `2.1.232`、`claude-opus-5`、最大推理强度与只读动态工作流复审全部 TODO、未清目标、未知值和矛盾，并与验证器、北京制度/证据、复杂适应系统、黏菌方法谱系和来源审计交叉核对。

- 审计结果：Claude 私有、未签入仓库的 ledger 外部报告 42 项核实发现、188 个原始标记，并去重为 75 个稳定事项；这些数量是 provenance metadata，不是 validator-enforced 仓库事实。Session ID 为 `23ac6173-5b4d-4f62-ba2c-f67845a40ad5`；plan SHA-256 为 `73AF3F8199AE26C8C3AD37BD96A985BD1912CD58F1CF162817FE73ACBE46247E`；transcript SHA-256 为 `3738DBECAB28DAA80BDB243E87EDA297043029EEC3562E8ACEAD74AE21877C52`。
- 分类：A 仓库证据可解决 23 项；B 可逆设计决定 18 项；C 批准后实施 14 项；D 外部证据门 17 项；E 过时/合并 3 项。
- 审批证据：**已记录（见下「H01 批准与提交授权记录」）。此前的 Git 提交标题仍然不构成用户批准，批准来自一条独立、明确的用户消息。**
- 最终独立一致性复核又修正 6 处规范矛盾：审批制品删除顺序、停止/传播分支、D07/D10/D13 操作语义、复合外部门的逐字段证据、本地来源快照与封闭清单关系、`H01` 定义；这些修正仍是待批准设计，不是实现完成。
- 第二次 Claude Opus 5 只读 fork 复审（session `0fa2a96e-b5d1-41b4-998b-af741d75b77e`）返回 `PATCH_REQUIRED`。本次规范修正固定来源最终计数、Lab 3 条件性图版、`A-TENURE-001` 任务归属、`H01` 与 GitHub 授权分离，并吸收独立审计确认的传播入口、慢行连线依赖、耐久慢层、gate namespace、命令序列和精确路径缺口；这仍不构成 C 类实施或外部门关闭。
- 第三次只读契约复审（second-pass contract audit）修正三处契约缺陷，均记入 `regeneration-design.md` 新增 Section 14.13：来源清单计数由弹性的「至少 41 / `N`」收敛为封闭的 `27 + 8 + 5 + 1 = 41`（复用的五篇不增加计数），并冻结十四个新增记录的稳定 ID；补齐此前缺失的确定性十进制显示契约（全程完整精度、无中间舍入，十进制 `ROUND_HALF_UP`，占比/百分点/公顷差额两位小数并保留末尾零，名义分母差额百分比四位小数）；C06 的路径契约由对 Section 9.5.3 的 cross-reference 改为在本账本内逐条枚举 84 条互异明列路径，理由是 `regeneration-design.md` 在任何测试运行前即被移除，测试无法解析其中的 block。本次复审只解决规范歧义与仓库可答事实，未实施任何 C 类任务，未关闭任何 D 类外部门，`H01` 仍然开放。
- 当前批准状态：**已获明确批准（`H01` 关闭）。**用户在 2026-08-14 的一条独立消息中明确批准了经 Section 14.13 修正后的完整 v0.2 架构，并在同一条消息中**另行**授权 GitHub 推送与替换 PR。两项授权分别记录于下节，不得互相推导。

### H01 批准与提交授权记录

本节记录真实发生的授权事实，不扩大其范围。

| 项 | 内容 |
|---|---|
| 批准来源 | 本地 Claude Code 会话中的一条明确用户消息，非提交标题、非沉默、非「继续」 |
| 批准日期 | 2026-08-14 |
| 记录会话 | `d3daa4e5-ef55-4d4c-8734-5ecd72148652`（`claude-opus-5`，最大推理强度） |
| 批准对象 | Section 14.12 / v0.2 完整架构，含 Section 14.13 的三项第二轮契约修正与本账本的对应修正 |
| `H01` 授权范围 | **仅**本地 14 项 C 类实施任务的规划与执行，以及在设计规定的生命周期点删除 `regeneration-design.md` |
| `H01` **不**授权 | 关闭任何 D 类外部门、认证任何专业结论、授权公共运行、证明实施成功、推送、创建/关闭 PR、rerun CI 或任何其他 GitHub 动作 |
| 独立提交授权 | **同一条用户消息另行、明确地授权**：推送当前分支到用户 fork，并针对 `open-city-ai/haidian:main` 创建一个新的 ready 替换 PR；在先创建并核实新 PR 后，方可关闭确属本提案过时前身的既有 PR |
| 独立提交授权**不**包含 | 触碰、关闭、编辑或评论已合并的 PR #2396；关闭任何无关工作；修改 `submissions-data.js`、gallery 数据、其他提交、共享验证器或仓库级材料 |
| 外部证据变化 | **无。**本次批准不附带任何新的外部/专业证据，因此 17 个 D 类外部门全部保持开放且无复选框 |

批准关闭的是 `H01` 这一个门。它不改变任何 D 类门的状态，也不把任何 C 类任务标记为完成；每项 C 类任务仍须先产出其具名制品并通过其具名测试，才可勾选。

### 再生实现进度

- 再生实现进度（按本账本 C06 逐条具名路径计）：新增 JSON `1/15`；新增 JavaScript `7/10`；新增重点区图版 `30/30`；final addition set `39/56`；C06 全部具名互异路径 `67/84`。
- 再生实现进度（按工作区实际文件计）：新增文件 `61`（重点区图版 `30`、`visual/assets` JSON `8`、`visual/assets` JavaScript `23`）；已再生既有文件 `16`（根 JSON `4`：`compliance_matrix.json`、`design_depth_matrix.json`、`sources.json`、`standard_matrix.json`；PDF `4/4`；生成 HTML `4`：`report/proposal.html`、`report/proposal.en.html`、`visual/index.html`、`visual/index.en.html`；提案 Markdown `2/2`；GeoJSON `1/9`：`geometry/key_areas.geojson`；`visual/assets/reproduce_physarum.js` `1`）；按 Section 13.1 移除 `regeneration-design.md` `1`。
- 两个计数不相等的原因：实现所采用的文件分解与 C06 的具名路径表不同——相应职责由 `visual/assets/regeneration-source.json`、`visual/assets/area-plates.json`、`visual/assets/key-area-design.json`、`visual/assets/action-governance.json`、`visual/assets/evidence-map.json`、`visual/assets/source-bibliography.json`、`visual/assets/drawing-placements.json` 与 `build-sources.js`／`build-standards.js`／`build-geometry.js`／`build-ablation.js`／`build-plates.js`／`build-matrices.js` 承担。C06 明确不接受文件名简写或替代，故差额按具名路径如实记为未达成，不作等价折算，也不据此勾选 C06。
- 尚未再生：根 JSON `5/9`；GeoJSON `8/9`；既有必需图件 `10/10` 保持基线未改。
- 外部专业依赖保持开放，不计入实现完成率。

### A — 已由仓库或可信一手证据解决

下列事项已在 `regeneration-design.md` Section 14 中记录为事实；“已解决”仅指证据问题已回答，不代表对应包文件已实施。

| ID | 已解决事实 |
|---|---|
| `A01` | `SCHELLING-1971` 与 `HOLLING-1973` 已存在；真正缺失的是 shearing-layer/support-and-infill、polycentric commons 与 real-options 三类来源 |
| `A02` | 27/27 个来源记录都缺少 `title`、`author-or-issuer`、`year` 字段形状，并非“若干条”缺值 |
| `A03` | 0.70 与 0.35 在 64 次运行中对应可达边界 `45/64` 与 `23/64`；`E05`、`E13` 各为 `44/64`，仅差一次入选 |
| `A04` | `57.1%` 的正确分母是达到 0.35 资格规则的 14 条边，即 `8/14`，不是曾入选的 22 条边 |
| `A05` | 当前审批包只因 `regeneration-design.md` 文件名触发确定性验证错误；持久化四门 PASS 记录已经陈旧，不得手工修正 |
| `A06` | 最终变化量是 55 个新增文件加 1 个已存在的 `changelog.md`，不是 56 个全新文件 |
| `A07` | 原外部门表遗漏 FAR 与高度两个独立触发器，现已分别登记 |
| `A08` | 概念坐标尺度由冻结边长最小二乘重建为 `1374.006827 × 9723.469847 m`，南北/东西比约 `7.0767:1` |
| `A09` | 验证器采用按目录 allowlist，并由 catch-all 拒绝任何未列出的路径或扩展名；列出的 forbidden 扩展仅是示例，不是完整规则，某扩展在一个目录获准也不使其在其他目录获准 |
| `A10` | manifest 路径必须匹配 `^[A-Za-z0-9_./-]+$`，且非 `other` 角色不得带 `role_detail` |
| `A11` | 正式来源发布三个重点区约 `192.1 ha`、`104.3 ha`、`72.0 ha`；必须保留原单位、显示精度和 `approximate:true`，不能提升为精确 polygon-derived 面积；官方多边形仍未取得 |
| `A12` | “登记技术规范”是仓库内实施事项，不是外部专业触发器 |
| `A13` | `GB 55019-2021` 与 `DB11/T 2209-2023` 可登记，但登记不证明场地适用或合规 |
| `A14` | 北京责任规划师制度已有正式规范性文件；具体场地职权与任职人仍未证实 |
| `A15` | 当前假设表没有 tenure/cadastre/right-of-way/maintenance-duty 记录；必须新增 `A-TENURE-001` |
| `A16` | 正式资料内部存在 `集聚`/`聚集` 名称差异，不得静默选择 |
| `A17` | 15/15 个设计深度记录当前均写 `complete`，与三重点区详设尚无 30 张双语图版的事实冲突 |
| `A18` | `PROV-KEY-003` 英文 warning 未完整表达中文差异警告；两种语言必须按约 2.2 km 的限定规则统一 |
| `A19` | `proposal.en.md` 的 13 个 H2 中有 11 个不匹配 `REQUIRED_SECTIONS_EN`；规范列的是迁移目标，不是现状保持项 |
| `A20` | `visual/index.en.html` 缺少 `P00`，且自行重命名 `P01`–`P04` |
| `A21` | 19 项指标中唯一单位冲突是 `network_detour_factor`：现存 `metrics.json` 使用 `index` |
| `A22` | 三个已知标准引用未进入 `standard_matrix.json`：`BARRIER-FREE-ENVIRONMENT-LAW`、`ELDERLY-SMART-TECH-PLAN-2020-45`、`GENERATIVE-AI-INTERIM-MEASURES` |
| `A23` | `floor_area_ratio` 与 `approved_height_limit_m` 目前只具有五字段未知值契约中的 `reason`，其余四字段缺失 |

### B — 已冻结为 v0.2 提案，仍待用户明确批准

| ID | 决定 | 当前状态 |
|---|---|---|
| `B01` | 依次实跑 `python3`、`python`、`py -3` 的 `--version`，仅接受 exit 0，并记录实际解释器 | 已写入规范；待批准 |
| `B02` | 生物学文献 ID、交叉引用和冻结文件名保留 `PHYSARUM`；解释性文字迁移为 seeded Kruskal probe | 已写入规范；待批准 |
| `B03` | 当前绿地比例继续采用 `11,412,825.386 m²` provisional geometry 分母；披露与约 `11.4 km²` 发布值的 nominal 1.28 ha / 约 0.1125% 差异、底层比例约 `+0.03` / `+0.02` 个百分点及显示变化 `28.07% → 28.11%` / `17.48% → 17.50%`。分子与当前分母共享同一 provisional 几何基础，而约 `11.4 km²` 不是精确替代边界，故在官方多边形到达前继续选用当前分母；不得称为实测边界差异 | 已写入规范；待批准 |
| `B04` | maintenance commons 降为预写 contingency register；当前零个单元满足激活证据 | 已写入规范；待批准 |
| `B05` | JavaScript 在序列化前对每个坐标执行 `Number.isFinite` | 已写入规范；待批准 |
| `B06` | 机制文字只用 selected/not selected/excluded-by-rule；机器值和真实文献 ID 不改名 | 已写入规范；待批准 |
| `B07` | 每个实施 TODO 必须含精确路径、精确测试和可观察验收 | 已写入本账本；待批准 |
| `B08` | 六类专业审查拆为独立外部门，FAR 与高度独立登记 | 已写入规范；待批准 |
| `B09` | 依赖安装移出有序制品生命周期，标为 prerequisite | 已写入规范；待批准 |
| `B10` | 审批门扩展覆盖本轮全部纠正，后续 agent 不得自行改变 | 已写入 Section 14.12；待批准 |
| `B11` | 不修改可信 renderer；在源 Markdown 中将 `[assumption:*]` 改为受支持表达 | 已写入规范；待批准 |
| `B12` | 复算器继续输出 JSON；测试读取 `PASS/633/7/0` 字段，不要求新增人类格式文本 | 已写入规范；待批准 |
| `B13` | Dazhongsi 只发布带 ODbL、双节点离散及非官方限定的“约 2.2 km concern”，不画站点几何 | 已写入规范；待批准 |
| `B14` | 仅当仓库持有准确条文且完成适用性记录时，尺寸才可标 `standards-derived minimum` | 已写入规范；待批准 |
| `B15` | 17 个外部门增加 `conditional progress permitted`，区分可画、仅协议、完全阻断 | 已写入规范；待批准 |
| `B16` | 季节观察与季节协议分离；365 天及夏冬暴露是待批准的 `proposed_target`，`authorized_target` 在 operator/authority 接受前保持 `null`；气象来源及可证伪的热/雨、雪/冰资格条件不得臆造 | 部分写入规范；仍需 C06 完成仓库内来源与条件登记；待批准 |
| `B17` | 可逆载荷明确锚定正式任务中的南北/东西慢行绿地体系、四象限步行联系与非机动车停放 | 已写入规范；待批准 |
| `B18` | A3/A0 placement rectangle 使用 Section 14.7 的精确毫米值，双语完全同构 | 已写入规范；待批准 |

### C — 批准后实施任务

以下 14 项默认保持未勾选。任何说明、代码草稿或本审批文档修改都不能将其标为完成；只有实跑并逐条核验其具名路径、具名测试与可观察验收后才可勾选。

#### C 类勾选判定记录

勾选规则（对 14 项一致适用）：**当且仅当**该项的每一条具名路径都在包内存在、每一项具名测试都实跑通过、且每一条可观察验收都能在包内被验证为真时才勾选；三者缺一即保持未勾选，并在下表写明缺在何处。本账本只定义「已勾选」与「未勾选」两种状态，不定义第三种；被后续条目取代、被本轮范围排除或尚未解决的条目一律记为未勾选，另附取代记录或缺口说明，绝不借勾选框表示。据此，`C02`、`C04` 与 `C07` 勾选，其余 11 项保持未勾选，其中 `C01` 附取代记录、`C06` 附 old→new 路径契约、`C10` 附待官方再生成记录。

`C10` 本轮由已勾选改回未勾选，是本次重审唯一的降级，理由写在下表与其条目内：其可观察验收含「不得手工编辑生成 HTML」，而本轮按指令不运行 `scripts/render_proposal_html.py`，两份 report HTML 的表格单元格是照 renderer 输出逐字手写的。降级如实记录，不以「等效于 renderer 输出」代替「由 renderer 生成」。

任何 C 类勾选都**不**改变、不关闭、也不减弱任何 D 类外部门。D 表仍无复选框，17 个外部门全部保持开放；C 类完成度与 D 类专业权限属于不同命名空间，不可互相推定。

| ID | 判定 | 实测依据与缺口 |
|---|---|---|
| `C01` | 未勾选（附取代记录） | extra-`The` 变体在 `proposal.en.md` 与 `report/proposal.en.html` 实测均为 `0`，该迁移已完成。canonical 标题实测 `proposal.en.md` `1` 处、`report/proposal.en.html` `2` 处，合计 `3`，与本项冻结的 `2`／`3`／共 `5` 不符。原因是本项计数写于 `C10` 删除重复顶层标题之前：两份生成 HTML 现各恰有一个 `<h1>`（实测 `1`／`1`），要凑回 `2`-in-md 就必须重新引入 `C10` 删掉的重复标题。冲突如实保留，不复制标题制造计数，也不事后改写原承诺；取代记录见本项条目 |
| `C02` | **已勾选** | `sources.json` 实测 `41` 条。具名测试 `test-source-normalization.js`（套件 id `source-normalization`）在 `run-contract-tests.js` 内实跑通过，断言 41 条封闭清单与零悬空 source ID。逐 ID 全包计数（排除 `sources.json`、本账本与该测试自身的清单）：`41/41` 条至少出现一次；无有界引用的只有 `PHYSARUM-CHINA-2013` 与 `PHYSARUM-WUHAN-2023`，两条 `reference_state` 均为 `background_only`，各携带双语 `limitations`、`allowed_uses` 与 `prohibited_inferences`，且只出现在书目层 `visual/assets/source-bibliography.json`。`PROCESSED-FACT-PACK` 已获有界引用（`visual/assets/key-area-design.json` 的 `Z-R03` `evidence_refs`），其记录仍写明 `Navigation layer only; not an independent authority source.`。`SCHELLING-1971` 实测 `10` 处、`HOLLING-1973` 实测 `13` 处，两者均出现在 `compliance_matrix.json`。六条 Physarum 记录一条未删。`reference_state` 分布 `cited` `39`／`background_only` `2` |
| `C03` | 未勾选 | 六个解释性展示面无 reinforcement／pruning／biological optimization／autonomous adaptation 机制声明；`proposal.md` 与 `report/proposal.html` 中仅有的 `生物最优` 出现在禁止句「不是交通需求模型或生物最优证明」之内，属声明上限而非机制主张。决定性缺口不变：本项具名测试——分别检查「保留寄存器」与「解释性文字寄存器」并搜索禁止机制词的 contract test——在包内不存在（`visual/assets/*.js` 中零个文件含该禁止词表），该项无法由自身契约证明 |
| `C04` | **已勾选** | 四个具名路径 `[assumption:` 实测均为 `0`；`test-evidence-resolution.js` 在套件内实跑通过，判定 `90` 个引用点、`575` 处解析、`0` 处未解析；未修改 `scripts/render_proposal_html.py` |
| `C05` | 未勾选 | 两个冻结 JSON 的 SHA-256 未变；`node --check` 通过；复算器 `status == "PASS"`、`comparisons == 633`、`derived_metrics == 7`、`mismatch_count == 0`；`assets` 路径为 participant-relative；`24` 条边与 `11/0/connected` 摘要相符；篡改测试 `15` 项中 `14` 项蓄意篡改全部被点名拒绝。唯一且决定性的缺口：具名路径 `visual/assets/participant-test-report.json` 不存在。本轮不生成它：该文件的诚实内容就是「运行这些测试所得的结果」，把某一次运行冻结进包内会在可执行套件之外制造第二个可静默漂移的权威；且没有任何 builder 写出它，`test-clean-build.js` 会把它判为未声明产物。证据仍以实跑套件输出为准 |
| `C06` | 未勾选（附 old→new 路径契约） | final addition set 实测 `40/56`：JSON 注册表 `2/15`（`visual/assets/gate-registry.json`、`visual/assets/physarum-zero-jitter-ablation.json`）、标准库 JavaScript `7/10`、重点区图版 `30/30`、`changelog.md` `1/1`。缺失的 `13` 个注册表与 `3` 个 builder 的职能已由合并后的架构承担，逐条 old→new 契约见本项条目。不实现重复的兼容文件：同一事实一旦有两个可写位置，就会产生互相冲突的权威，而这正是本包用单一来源记录要消除的失效模式 |
| `C07` | **已勾选** | 五项具名测试全部在 `run-contract-tests.js` 内实跑通过：claim-ceiling（`M02` 逐条 pin canonical 方法名、`由算法构造保证`／`guaranteed by construction` 与七项 not-computed，`KA-DENOM` 另以条件断言要求任何印出 `57.1%` 的展示面同时印出 `8/14 = 57.1%` 与「不是发现／不证明对北京的最优性」）、threshold-quantization（`KA-QUANT`）、denominator-discipline（`KA-DENOM`）、figure-alt/caption/title（`KA-DENOM` 的五个双语图件 × proposal／report／viewer 三种载体，加 `KA-PUB` 的 `30` 张图版描述）、PDF text-extraction（`KA-GATE`、`KA-DENOM`、`KA-QUANT` 各自从四份 PDF 提取文本）。八个显示字符串 `28.07%`、`28.11%`、`0.03`、`17.48%`、`17.50%`、`0.02`、`1.28`、`0.1125%` 在六个文本展示面实测零缺失且中英两侧一致，四份 PDF 亦零缺失；`17.5%` 全包实测 `0` 处。分母 `11,412,825.386` 与发布值 `11.4` 在六面齐备。`57.1%` 只出现在四个文档面，四面均同时写出 `8/14`；两个 viewer 与四份 PDF 实测不出现 `57.1`，故无未配对的份额语句。阈值同时披露 literal rule 与可达 run count：`0.70`、`0.35`、`45/64`、`0.703125`、`23/64`、`0.359375` 在六面齐备。`320.4`／`199.5`／`1,141.3` 仍为一位小数且双语对称 |
| `C08` | 未勾选 | `41/41` 记录具备 `title`／`author_or_issuer`／`year` 字段形状且未虚构（未取得处写 `not_transcribed_from_source` 或 `null`，并附 `bibliographic_provenance`）；`BEIJING-METEOROLOGICAL-SEASONAL-QUALIFICATION` 可解析。缺口：二选一本地证据状态实测只覆盖 `7` 条（`repository_local_copy` `6` ＋ `url_only_not_cleared_with_retrieval_hash` `1`），其余 `33` 条为 `url_only_no_retrieval_hash`、`1` 条为 `source_not_selected`，均无检索时哈希；为这 33 条补哈希等于虚构未曾发生的检索，本包拒绝。另有两条具名路径 `visual/assets/bilingual-source.json` 与 `visual/assets/registry-index.json` 不存在，且具名测试之一（validator）本轮按指令不执行 |
| `C09` | 未勾选 | 单一字体载体 `1` 个且实测 `907 KiB ≤ 4 MiB`；四份 PDF 每份 `/FontFile2` `2` 个、`/ToUnicode` `2` 个；A3 各 `16` 页、A0 各 `4` 页；包内无独立 `.ttf/.otf/.woff/.woff2`；双语文本可提取（`KA-GATE` 从四份 PDF 提取到 `13,601`／`33,571`／`21,285`／`56,605` 字符，八个显示字符串逐一命中）。缺口不变：「placement 与 Section 14.7 完全一致」所依赖的 `regeneration-design.md` 已按其自身 Section 13.1 移除（实测不存在），且 `drawing-placements.json` 以点而非毫米记录落位，该条款在包内不可验证 |
| `C10` | 未勾选（附待官方再生成记录） | 第一条可观察验收成立：两份生成 HTML 各恰有一个 `<h1>`（实测 `1`／`1`）。第二条不成立：本轮按指令不运行 `scripts/render_proposal_html.py`，`report/proposal.html` 与 `report/proposal.en.html` 的若干表格单元格是照 `render_table_cell()`／`render_inline()` 的输出逐字手写的，因此「不得手工编辑生成 HTML」在本轮为假。等效于 renderer 输出不等于由 renderer 生成，故本项由已勾选改回未勾选；待官方 `render_proposal_html.py` 运行并确认两份 HTML 与 renderer 输出逐字节相同后可重新评定 |
| `C11` | 未勾选 | `proposal.en.md` 的 `13` 个 H2 与 `scripts/validate_submission.py` 的 `REQUIRED_SECTIONS_EN` 顺序与拼写实测完全相等，其中第 5 项的 canonical 拼写是 `Detailed Design of Key Areas` 而非 `Detailed Design Key Areas`，`11` 项差异已归零，可观察验收成立。唯一缺口：具名路径 `visual/assets/bilingual-source.json` 不存在；其职能已由 `visual/assets/regeneration-source.json` 承担，见 `C06` 的 old→new 契约 |
| `C12` | 未勾选 | 两个 viewer 实测均含完整 `P00`–`P11`（各 `0` 个缺失），英文侧已不再自行重命名。缺口：具名路径 `visual/assets/project-registry.json` 不存在，无法按 registry 逐 ID 比对标题与顺序，该项的具名测试不可执行；其职能已由 `visual/assets/action-governance.json` 的 `actions[12]` 承担，见 `C06` 的 old→new 契约 |
| `C13` | 未勾选 | `standard_matrix.json` 实测 `11` 条；三项已知 dangling standard（`BARRIER-FREE-ENVIRONMENT-LAW`、`ELDERLY-SMART-TECH-PLAN-2020-45`、`GENERATIVE-AI-INTERIM-MEASURES`）全部登记，零 dangling standard citation。`GB-55019-2021` 与 `DB11-T-2209-2023` 均已进入矩阵，各自 `applicability_status: "unverified"`、`applicability_verified_by: null`、`applicability_record_date: null`、`cleared_clause_text_held: false`、`clauses_cited: []`，并分别显式 cross-reference `D07`／`D08`，附双语 `gate_closure_effect` 明写登记不关闭该门；`mandatory: false` 的含义由双语 `mandatory_meaning` 与 `instrument_class` 分开记录，不否认 GB 55019-2021 自身作为强制性国家规范、自 `2022-04-01` 起施行的法律性质。双语限定段落对称：`proposal.md`／`proposal.en.md` 中 `GB 55019-2021` 各 `2` 处、`DB11/T 2209-2023` 各 `1` 处、`D07` 各 `10` 处、`D08` 各 `6` 处。缺口：具名测试之一（validator）本轮按指令不执行。`D07`、`D08` 仍为无复选框的开放外部门 |
| `C14` | 未勾选 | `floor_area_ratio` 与 `approved_height_limit_m` 保持 `value: null` 且五字段各 `5/5` 齐全；`official_key_area_area_sqm_001`–`003` 实测 `1921000`／`1043000`／`720000`、`unit: "sqm"`、`status: "known"`、`approximate: true`，公顷显示 `192.1`／`104.3`／`72.0` 在双语提案对称出现；`assumptions.json` 实测 `9` 条并含 `A-TENURE-001`（`status: "unknown"`、`value: null`、`tenure`／`cadastre`／`right_of_way`／`maintenance_duty` 四子字段齐全、`external_gate_refs: ["D04"]`），`maintenance_unit_activated_count` 实测 `0`；`visual/assets/gate-registry.json` 的 `external_evidence_gate` 中 `D04` 为 `checkable: false`、`state: "open"` 并反向引用 `assumptions.json#A-TENURE-001`，`human_design_gate` 恰为 `G1`–`G7`；官方拼写变体 `集聚` 实测 `14` 处、`聚集` 实测 `19` 处，二者均 `> 0`。缺口：具名路径 `visual/assets/metric-crosswalk.json` 与 `visual/assets/claim-limits-registry.json` 不存在；其职能分别由 `visual/assets/evidence-map.json` 与 `visual/assets/regeneration-source.json` 的 `spelling_provenance` 承担，见 `C06` 的 old→new 契约。`D04` 仍为无复选框的开放外部门 |

上表的「已勾选」仅陈述该项自身的具名路径、具名测试与可观察验收在实测中全部成立，不构成对 manifest、self-check、preflight、CI 或提交就绪性的任何声明。

- [ ] **C01 — 英文标题只迁移真实存在的 extra-`The` 变体。**
  - 精确路径：`proposal.en.md`、`report/proposal.en.html`。
  - 精确测试：在包内搜索 `Adaptive Jing-Zhang: The Disagreement Atlas and Reversible City` 与 canonical `Adaptive Jing-Zhang: Disagreement Atlas and Reversible City`；HTML 由 `scripts/render_proposal_html.py` 再生。
  - 可观察验收：旧 extra-`The` 变体为 0；canonical 在 `proposal.en.md` 两处和 `report/proposal.en.html` 三处，共 5 处；不存在的 missing-`and` 变体不作为迁移任务。
  - 取代记录（计数条款被 `C10` 取代，迁移条款仍然有效）：本项的 `2`／`3`／共 `5` 计数写于 `C10` 删除重复顶层标题之前，两条验收在结构上不可同时为真。对照 `HEAD`：`proposal.en.md` 的 extra-`The` 变体出现在第 `2` 行的 front matter `title:` 与第 `15` 行的 `# ` 顶层标题，共 `2` 处，renderer 据此产出的 `report/proposal.en.html` 共 `3` 处——本项的 `2`／`3`／`5` 正是按这些位置逐一改写为 canonical 而写下的。`C10` 随后删除了第 `15` 行那条重复顶层标题，该位置连同它在 HTML 中的对应项一起消失，canonical 因此只能是 `1` ＋ `2` ＝ `3`。实测：extra-`The` `0`／`0`，canonical `1`（front matter `title:`）／`2`（`<title>` 与 `<h1>`），`<h1>` `1`／`1`。因此本项的迁移条款（extra-`The` 归零）已完成并保持有效，计数条款自 `C10` 生效之日起被取代，不再作为验收依据。本包不复制标题、不重建重复 `<h1>`、也不把 `2`／`3`／`5` 改写成 `1`／`2`／`3` 假装当初就是这样承诺的；勾选框保持未勾选，冲突留在账本里由人评定。

- [x] **C02 — 关闭来源引用与方法谱系账本。**
  - 精确路径：`sources.json`、`compliance_matrix.json`、`design_depth_matrix.json`、`standard_matrix.json`、`proposal.md`、`proposal.en.md`。
  - 精确测试：`node submissions/MartinForReal/adaptive-jingzhang/visual/assets/run-contract-tests.js` 的 source-ID 引用完整性测试。
  - 可观察验收：迁移后 41 条记录中，当前 8 个未用于结构化记录的来源全部有有界引用或 `background` 状态；`SCHELLING-1971` 与 `HOLLING-1973` 在 C/D 论证中实际工作；5 个未使用的 Physarum 论文不删除；`PROCESSED-FACT-PACK` 仅作导航/背景。引用完整性以最终 41 条记录为全集：零悬空 source ID，零无引用且未标 `background` 的记录。
  - 实跑结果：具名测试为 `visual/assets/test-source-normalization.js`，在 `run-contract-tests.js` 内以 id `source-normalization` 实跑通过；它把 41 个 ID 作为封闭清单逐一 pin，任何增删都会被报为对冻结契约的改动。`sources.json` 实测 `41` 条，零悬空 source ID。逐 ID 全包计数（排除 `sources.json`、本账本与该测试自身的清单三处纯清单载体）：`41/41` 条至少出现一次。仅 `PHYSARUM-CHINA-2013` 与 `PHYSARUM-WUHAN-2023` 没有有界引用，两条 `reference_state` 均为 `background_only`，各自携带双语 `limitations`、`allowed_uses` 与 `prohibited_inferences`（后者明写「不得用于支持任何廊道、网络、可达性或形态结论，不得作为本场地证据，也不得作为生物最优性证明」），且只出现在书目层 `visual/assets/source-bibliography.json`。`PROCESSED-FACT-PACK` 取有界引用一途：`visual/assets/key-area-design.json` 的路线 `Z-R03` 在 `evidence_refs` 中引用它，其来源记录同时把用途限定为 `Navigation layer only; not an independent authority source.` 与「只作导航与背景，不作一手证据；任何结论必须回到其所引用的原始出处」。`SCHELLING-1971` 实测 `10` 处、`HOLLING-1973` 实测 `13` 处，两者都出现在 `compliance_matrix.json`。六条 Physarum 记录一条未删（`cited` 4 条、`background_only` 2 条）。`reference_state` 全集分布：`cited` `39`、`background_only` `2`。

- [ ] **C03 — 完成解释性文字的 de-Physarum 迁移。**
  - 精确路径：`proposal.md`、`proposal.en.md`、`visual/index.html`、`visual/index.en.html`、`report/proposal.html`、`report/proposal.en.html`；机器引用保留于 `sources.json`、`compliance_matrix.json`、`design_depth_matrix.json`、`standard_matrix.json`、`metrics.json`、`manifest.json`、`self_check.json`、`visual/assets/physarum-inputs.json`、`visual/assets/physarum-runs.json`、`visual/assets/reproduce_physarum.js`。
  - 精确测试：contract test 分别检查“保留寄存器”与“解释性文字寄存器”；搜索 reinforcement/pruning/biological mechanism 禁止声明。
  - 可观察验收：解释性文字只保留规范中批准的 lineage/caution 块；无机制性 reinforcement、pruning、biological optimization 或 autonomous adaptation 声明；真实 ID、交叉引用和冻结路径不改名。

- [x] **C04 — 消除未被 renderer 识别的 assumption marker。**
  - 精确路径：`proposal.md`、`proposal.en.md`、`report/proposal.html`、`report/proposal.en.html`。
  - 精确测试：对四个明列路径逐一执行 `rg -n -F '[assumption:'`，即 `submissions/MartinForReal/adaptive-jingzhang/proposal.md`、`submissions/MartinForReal/adaptive-jingzhang/proposal.en.md`、`submissions/MartinForReal/adaptive-jingzhang/report/proposal.html`、`submissions/MartinForReal/adaptive-jingzhang/report/proposal.en.html`；不对目录做递归搜索；并运行双语引用解析测试。
  - 可观察验收：两份生成 HTML 中 `[assumption:` 均为 0；十个现有假设引用在源 Markdown 中以受支持、可追踪方式表达；不修改可信 renderer。

- [ ] **C05 — 将复算器从 631/5 提升至冻结的 633/7 契约。**
  - 精确路径：`visual/assets/physarum-inputs.json`、`visual/assets/physarum-runs.json`、`visual/assets/reproduce_physarum.js`、`visual/assets/physarum-zero-jitter-ablation.json`、`visual/assets/test-reproducer-tamper.js`、`visual/assets/participant-test-report.json`。
  - 精确测试：`node --check submissions/MartinForReal/adaptive-jingzhang/visual/assets/reproduce_physarum.js`；运行复算器和七项单字段篡改测试。
  - 可观察验收：两个冻结 JSON 的 SHA-256 不变；JSON 输出 `status == "PASS"`、`comparisons == 633`、`derived_metrics == 7`、`mismatch_count == 0`；路径为 participant-relative；24 条边的零抖动计数、频率、delta 与 11/0/connected 摘要完全匹配；七项篡改均被点名拒绝。
  - 未生成 `participant-test-report.json` 的理由（本项因此保持未勾选）：该文件唯一诚实的内容就是「运行这些测试所得的结果」。把某一次运行的结论冻结成包内文件，会在可执行套件之外制造第二个可以静默漂移的权威——正是本包在别处用单一来源记录消除的失效模式；而且没有任何 builder 写出它，`test-clean-build.js` 会把它判为未声明产物，`manifest.json` 也无从为它派定 role。因此本轮不写该文件，本项证据以实跑套件的标准输出为准，缺口如实留在账本里。若后续要落地该具名路径，正确做法是先让某个 builder 以确定性方式写出它并进入 clean-build 契约，而不是手工存一份快照。

- [ ] **C06 — 实现封闭清单、确定性构建、结构化记录、30 张图版与设计深度级联。**
  - 精确路径（final addition set，56 个明列条目，逐条列出，不使用 glob、数量短语、文件名简写，也不以对 `regeneration-design.md` 的 cross-reference 代替）：
    - 参与者账本（1）：`changelog.md`。
    - 重点区图版（30）：`assets/figures/key-area-zhongzhiyuan-01-situation-claim-limits.png`、`assets/figures/key-area-zhongzhiyuan-01-situation-claim-limits.en.png`、`assets/figures/key-area-zhongzhiyuan-02-program-flows.png`、`assets/figures/key-area-zhongzhiyuan-02-program-flows.en.png`、`assets/figures/key-area-zhongzhiyuan-03-reversible-module-sections.png`、`assets/figures/key-area-zhongzhiyuan-03-reversible-module-sections.en.png`、`assets/figures/key-area-zhongzhiyuan-04-access-operations-seasons.png`、`assets/figures/key-area-zhongzhiyuan-04-access-operations-seasons.en.png`、`assets/figures/key-area-zhongzhiyuan-05-governance-stop-evidence.png`、`assets/figures/key-area-zhongzhiyuan-05-governance-stop-evidence.en.png`、`assets/figures/key-area-ai-origin-community-01-situation-claim-limits.png`、`assets/figures/key-area-ai-origin-community-01-situation-claim-limits.en.png`、`assets/figures/key-area-ai-origin-community-02-program-flows.png`、`assets/figures/key-area-ai-origin-community-02-program-flows.en.png`、`assets/figures/key-area-ai-origin-community-03-reversible-module-sections.png`、`assets/figures/key-area-ai-origin-community-03-reversible-module-sections.en.png`、`assets/figures/key-area-ai-origin-community-04-access-operations-seasons.png`、`assets/figures/key-area-ai-origin-community-04-access-operations-seasons.en.png`、`assets/figures/key-area-ai-origin-community-05-governance-stop-evidence.png`、`assets/figures/key-area-ai-origin-community-05-governance-stop-evidence.en.png`、`assets/figures/key-area-dazhongsi-01-situation-claim-limits.png`、`assets/figures/key-area-dazhongsi-01-situation-claim-limits.en.png`、`assets/figures/key-area-dazhongsi-02-program-flows.png`、`assets/figures/key-area-dazhongsi-02-program-flows.en.png`、`assets/figures/key-area-dazhongsi-03-reversible-module-sections.png`、`assets/figures/key-area-dazhongsi-03-reversible-module-sections.en.png`、`assets/figures/key-area-dazhongsi-04-access-operations-seasons.png`、`assets/figures/key-area-dazhongsi-04-access-operations-seasons.en.png`、`assets/figures/key-area-dazhongsi-05-governance-stop-evidence.png`、`assets/figures/key-area-dazhongsi-05-governance-stop-evidence.en.png`。
    - JSON 注册表与确定性证据输出（15）：`visual/assets/bilingual-source.json`、`visual/assets/registry-index.json`、`visual/assets/scenario-registry.json`、`visual/assets/project-registry.json`、`visual/assets/persona-registry.json`、`visual/assets/key-area-program-registry.json`、`visual/assets/gate-registry.json`、`visual/assets/role-registry.json`、`visual/assets/state-variable-registry.json`、`visual/assets/metric-crosswalk.json`、`visual/assets/claim-limits-registry.json`、`visual/assets/figure-registry.json`、`visual/assets/build-contract.json`、`visual/assets/physarum-zero-jitter-ablation.json`、`visual/assets/participant-test-report.json`。
    - 标准库 JavaScript（10）：`visual/assets/build-regeneration.js`、`visual/assets/build-structured.js`、`visual/assets/build-proposals.js`、`visual/assets/build-figures.js`、`visual/assets/build-viewers.js`、`visual/assets/build-drawings.js`、`visual/assets/run-contract-tests.js`、`visual/assets/test-clean-build.js`、`visual/assets/test-reproducer-tamper.js`、`visual/assets/noto-sans-sc-subset.js`。
    - 逐条枚举的理由：`regeneration-design.md` 的 Section 9.5.3 载有同一清单，但该文件在任何 contract test、build、render、self-check、preflight 或 validator 运行之前即被移除（Section 13.1、13.4、14.9），测试无法解析其中任何 block。因此路径契约由本账本直接逐条承载；对 Section 9.5.3 的引用仅供人工比对，不构成 C06 的路径集合。
  - 另受影响的九个既有根 JSON：`manifest.json`、`agent.json`、`metrics.json`、`assumptions.json`、`sources.json`、`self_check.json`、`compliance_matrix.json`、`standard_matrix.json`、`design_depth_matrix.json`。
  - 另受影响的九个既有 GeoJSON：`geometry/site_boundary.geojson`、`geometry/key_areas.geojson`、`geometry/land_use.geojson`、`geometry/buildings.geojson`、`geometry/roads.geojson`、`geometry/green_space.geojson`、`geometry/public_space.geojson`、`geometry/constraints.geojson`、`geometry/phasing.geojson`。
  - 另受影响的十个既有必需双语图件：`assets/figures/site-overview.png`、`assets/figures/site-overview.en.png`、`assets/figures/land-use-structure.png`、`assets/figures/land-use-structure.en.png`、`assets/figures/key-areas.png`、`assets/figures/key-areas.en.png`、`assets/figures/mobility-bluegreen.png`、`assets/figures/mobility-bluegreen.en.png`、`assets/figures/metrics-evidence.png`、`assets/figures/metrics-evidence.en.png`。
  - C06 直接读取或执行的明列路径（均为上列集合的成员，不是额外条目）：`sources.json`、`visual/assets/state-variable-registry.json`、`visual/assets/build-regeneration.js`、`visual/assets/build-structured.js`、`visual/assets/build-proposals.js`、`visual/assets/build-figures.js`、`visual/assets/build-viewers.js`、`visual/assets/build-drawings.js`、`visual/assets/run-contract-tests.js`、`visual/assets/test-clean-build.js`。`sources.json` 已属上列九个既有根 JSON，`visual/assets/state-variable-registry.json` 已属上列十五个 JSON 注册表，八个 build/test JS 已属上列十个标准库 JavaScript；C06 的明列路径总数因此为 56 + 9 + 9 + 10 = 84 条互异路径。
  - 精确测试：对十个 JS 逐一 `node --check`；运行 `build-regeneration.js`、`run-contract-tests.js`、`test-clean-build.js`；按 exact path 逐个 `Test-Path`；对全部 56 个 final-addition-set 条目运行 `^[A-Za-z0-9_./-]+$`、per-directory allowlist/catch-all rejection、manifest role 及 `role_detail` 条件测试；运行有限坐标、ID 和 cross-reference 测试；验证公共气象 source ID 可解析，夏季 heat/rain 与冬季 snow/ice 条件各有 source-backed 可证伪规则、`proposed_target` 非空且 `authorized_target` 为 `null`，D13 仍为无复选框的开放外部门。；断言 `BEIJING-METEOROLOGICAL-SEASONAL-QUALIFICATION` 可解析，且最终 `sources.json` 恰含 41 条记录；断言 `human_design_gate` 仅含 canonical `G1`–`G7`，D、H 与 machine-self-check gates 使用独立 namespace；断言只有未进入 stop/closure 分支的 `active` 或 `modify_or_hold` 才能凭具名 operator、独立 human reviewer 与完整 versioned evidence packet 产生 `qualified_active_result`，耐久 slow-layer support 不进入 `R0`/`R1`。
  - 可观察验收：新增 JSON `15/15`、JS `10/10`、重点区图版 `30/30`，加已存在的 `changelog.md` 后 final addition set 为 `56/56`；所有路径匹配 `^[A-Za-z0-9_./-]+$`，任何未列路径/扩展名均被拒绝，`role != "other"` 时不存在 `role_detail`；双清洁构建文件树 SHA-256 完全一致；无 stale/undeclared output；`three_key_area_detailed_design` 在 30 张双语图版、剖面、路线、季节操作、PDF/HTML/viewer 全部存在并通过前不得为 `complete`；九个 GeoJSON 的所有坐标在序列化前后均为有限数；气象记录只判定外部资格条件，实际合格暴露由现场具名 operator 记录，C06 完成后 D13 仍开放且只阻断全年运行声明与 propagation review。；`qualified_active_result` 无悬空入口，任何 stopped/restored/verified-closed run 均无法进入 propagation；fast-layer 与 durable slow-layer 分别通过 removal 和 decommissioning/remediation contract；G/D/H/machine gate namespace 无交叉误判。

  - Manifest 角色验收补充：56/56 final-addition-set entries 中每个 `role: "other"` 都有非空 `role_detail`，每个 `role != "other"` 都完全省略 `role_detail`。

  - old→new 路径契约（`16` 条具名路径被取代，`40/56` 实到，本项因此保持未勾选）：本项预登记了一份 56 条的精确路径清单。实际实现走了合并架构：同一批事实由更少、职责更清楚的记录承担，而不是按当初设想的文件数铺开。下表把每一条未落地的具名路径映射到实际承担其职能的包内路径，逐条注明权威归属。**不实现同名兼容文件，也不实现读旧名写新名的薄封装**：这些注册表都是被 builder 写、被 contract test 读的单一来源，一旦同一事实有两个可写位置，两处就会各自漂移，而 `test-clean-build.js` 只能证明其中一处自洽。宁可让账本承认清单被取代，也不制造互相冲突的权威。
    - `visual/assets/bilingual-source.json` → `visual/assets/regeneration-source.json`：其 `document_title`、`section_headings`、`viewer_hero`、`ui_labels`（`126` 个键）、`proposal_blocks`、`terminology` 是全包双语字符串的唯一来源，`build-proposals.js`、`build-viewers.js`、`build-drawings.js` 均从此读取。
    - `visual/assets/registry-index.json` → `visual/assets/regeneration-source.json` 的 `record_id`，加各生成注册表自带的 `source_record`／`source_record_id` 反向指针（`area-plates.json`、`drawing-placements.json`）。索引另立一份就会与被索引者不同步。
    - `visual/assets/project-registry.json`、`visual/assets/scenario-registry.json`、`visual/assets/persona-registry.json`、`visual/assets/role-registry.json` → `visual/assets/action-governance.json`：`actions[12]` 即 `P00`–`P11`，连同 `labels`（`46` 个键）与 `counts` 一并承载项目、场景、人物与角色四类记录。两个 viewer 实测 `P00`–`P11` 齐备。
    - `visual/assets/key-area-program-registry.json` → `visual/assets/key-area-design.json`：`areas[3]` 与 `counts`（`5` 个键）承载三个重点区的功能、构件、路线与无障碍链。
    - `visual/assets/state-variable-registry.json` → `visual/assets/action-governance.json` 的逐 action 状态字段（`authorization_state`、`funding_state`、`restoration_capacity_state`、`pilot_start_allowed`、`start_blockers`、`authorized_target`、`blocked_by`），加 `visual/assets/regeneration-source.json` 的 `method_card`（`13` 个键）。
    - `visual/assets/metric-crosswalk.json` → `visual/assets/evidence-map.json`：`compliance[23]`、`design_depth[15]` 与 `vocabulary`（`14` 个键）承担指标—合规—深度三向对照，`build-matrices.js` 由此生成两份矩阵。
    - `visual/assets/claim-limits-registry.json` → `visual/assets/regeneration-source.json` 的 `spelling_provenance`（`note_zh`／`note_en`／`variants`，登记官方拼写变体出处）、`visual/assets/key-area-design.json` 的逐区 claim-limit 字段（`georeferenced`、`spatial_mode`、`separation`）与 `visual/assets/gate-registry.json` 的 `external_evidence_gate`（`D01`–`D17` 反向引用）。
    - `visual/assets/figure-registry.json` → `visual/assets/area-plates.json`：`semantic_plates[15]` 与 `artifacts[30]` 是 30 张图版的唯一登记，由 `build-plates.js` 与图版本身同批写出。
    - `visual/assets/build-contract.json` → `visual/assets/area-plates.json` 与 `visual/assets/drawing-placements.json` 的 `generated_by` 字段，加九个 builder 的 `--check` 模式本身：契约由可执行的再生成比对承担，而不是由一份声明文件承担。
    - `visual/assets/participant-test-report.json` → 无替代，见 `C05`。
    - `visual/assets/build-regeneration.js` → `visual/assets/build-sources.js`（写 `sources.json`）、`visual/assets/build-standards.js`（写 `standard_matrix.json`）、`visual/assets/build-geometry.js`（写 `geometry/key_areas.geojson`）、`visual/assets/build-ablation.js`（写 `visual/assets/physarum-zero-jitter-ablation.json`）：原设想的单一再生成入口按输出物拆成四个，每个只写一个文件，失败定位与 `--check` 粒度都更明确。
    - `visual/assets/build-structured.js` → `visual/assets/build-matrices.js`（写 `compliance_matrix.json` 与 `design_depth_matrix.json`）。
    - `visual/assets/build-figures.js` → `visual/assets/build-plates.js`（写 30 张重点区图版与 `visual/assets/area-plates.json`）。
    - 保持原名并已落地的 `7` 条：`visual/assets/build-proposals.js`、`visual/assets/build-viewers.js`、`visual/assets/build-drawings.js`、`visual/assets/run-contract-tests.js`、`visual/assets/test-clean-build.js`、`visual/assets/test-reproducer-tamper.js`、`visual/assets/noto-sans-sc-subset.js`。
    - 实到的 `2` 条注册表：`visual/assets/gate-registry.json`（`human_design_gate` 恰为 `G1`–`G7`，`machine_self_check_gate`、`human_authorization_gate`、`external_evidence_gate` 四个 namespace 分列，`external_gates` 实测 `17`、反向引用 `59` 条）、`visual/assets/physarum-zero-jitter-ablation.json`。
    - manifest 验收未成立：`56` 个条目均未登记进 `manifest.json` 的 `files`，故 `role`／`role_detail` 条件测试无从执行。本轮不手改 manifest；所需的 inventory 补充在交接报告中按仓库权威逐条列出，由官方 refresh 一次性落地。
    - **v0.4 更正 — 上一条已不成立。** v0.4 复核实测：`40` 条实到条目全部登记在 `manifest.json` 的 `files` 中——`30` 张重点区图版为 `proposal_figure`，`visual/assets/gate-registry.json` 与 `visual/assets/physarum-zero-jitter-ablation.json` 为 `evidence_data`，`build-proposals.js`／`build-viewers.js`／`build-drawings.js`／`run-contract-tests.js`／`test-clean-build.js`／`test-reproducer-tamper.js` 为 `verification_script`，`noto-sans-sc-subset.js` 为 `asset`，`changelog.md` 为 `changelog`。四十条无一为 `other`，因此全部正确省略 `role_detail`，`role`／`role_detail` 条件测试可以执行且通过；全包实测声明 `111`、在盘 `111`、未声明 `0`、缺失 `0`。本项仍**不**勾选：未成立的是 `56/56` 这个数量验收本身与被取代的 `16` 条具名路径，不是 manifest 登记。详见 v0.4「一条不再成立的账本判断」。

- [x] **C07 — 对所有高风险展示面执行声明上限与分母修正。**
  - 精确路径：`proposal.md`、`proposal.en.md`、`visual/index.html`、`visual/index.en.html`、`report/proposal.html`、`report/proposal.en.html`、`assets/figures/site-overview.png`、`assets/figures/site-overview.en.png`、`assets/figures/land-use-structure.png`、`assets/figures/land-use-structure.en.png`、`assets/figures/key-areas.png`、`assets/figures/key-areas.en.png`、`assets/figures/mobility-bluegreen.png`、`assets/figures/mobility-bluegreen.en.png`、`assets/figures/metrics-evidence.png`、`assets/figures/metrics-evidence.en.png`、`drawings/a0-boards.pdf`、`drawings/a0-boards.en.pdf`、`drawings/a3-booklet.pdf`、`drawings/a3-booklet.en.pdf`。
  - 精确测试：`run-contract-tests.js` 的 claim-ceiling、threshold-quantization、denominator-discipline、figure-alt/caption/title 和 PDF text-extraction 测试；denominator-discipline 必须断言 1.28 ha、0.1125%、底层 `+0.03` / `+0.02` 个百分点、显示变化 `28.07% → 28.11%` / `17.48% → 17.50%`、共享 provisional 几何基础、约 `11.4 km²` 不可作为精确替代边界及官方多边形重算触发器。；并按 Section 14.13.3 的确定性十进制显示契约断言：全程保留完整精度、无中间舍入，仅在显示边界以十进制 `ROUND_HALF_UP` 舍入一次；绿地占比、百分点位移与公顷差额固定两位小数并保留末尾零，名义分母差额百分比固定四位小数；断言的是**精确字符串**而非数值容差，即 `28.07%`、`28.11%`、`0.03`、`17.48%`、`17.50%`、`0.02`、`1.28` ha、`0.1125%` 八个字符串逐一相等；`17.50%` 不得输出为 `17.5%`；禁止 truncation、binary-float 默认舍入或 banker's rounding。
  - 可观察验收：任何展示面都不把构造连通性当需求、发现、最优性或权力；57.1% 的语句使用 `8/14`；分母披露 `11,412,825.386 m²` provisional geometry、约 `11.4 km²` 发布值、1.28 ha / 0.1125% nominal 算术比较、`+0.03` / `+0.02` 个百分点及 `28.07% → 28.11%` / `17.48% → 17.50%`，并解释为何当前同基底 provisional 分母在官方多边形到达前继续作为工作基础，且明确不是实测边界差异；阈值同时披露 literal rule 与可达 run count。；中英双语两侧的八个显示字符串完全一致且与上列逐字相同，`320.4` ha / `199.5` ha / `1,141.3` ha 等面积显示仍按 Section 5.1 保留一位小数，不受两位小数规则影响。
  - 实跑结果：五项具名测试全部在 `run-contract-tests.js` 内实跑通过，逐一对应如下。**claim-ceiling**：`M02` 独立 pin canonical 方法名（中英各一）、`由算法构造保证`／`connectivity of each run, and exactly 11 selected edges per run` 与七项 not-computed（出行、需求、工程可行性、无障碍水平、生物适应、公众偏好、对北京的最优性），这些字面量写在测试里而不是从被测记录导入，因此同时改方法卡与复算器的回归也会被抓到；`KA-DENOM` 另以条件断言要求任何印出 `57.1%` 的展示面同时印出 `8/14 = 57.1%` 与「由算法构造保证／不是发现／不证明对北京的最优性」。**threshold-quantization**：`KA-QUANT`（`visual/assets/test-threshold-quantization.js`），从 64 条冻结 run 记录以 BigInt 有理数重算可达阈值，再与注册表、24 条边的 `status`、`derived_metrics`、`roads.geojson` 实际绘制的 14 条廊道以及十个发布面逐一比对。**denominator-discipline**：`KA-DENOM`（`visual/assets/test-denominator-discipline.js`），从 `metrics.json` 与 `geometry/land_use.geojson` 重算全部八个显示字符串，并禁掉 `17.5%`、`17.4%`、`28.0%`、`28.1%`、`0.11%`、`0.112%` 六个截断或丢末尾零的写法。**figure-alt/caption/title**：`KA-DENOM` 对五个双语图件 × proposal／report／viewer 三种载体逐一检查，`KA-PUB` 另检查 `30` 张图版的 `described_plates 30/30` 与两个 viewer 的 `figure 20`／`img 20`／`details 15`／`summary 15`／`described 15` 同构。**PDF text-extraction**：`KA-GATE`、`KA-DENOM`、`KA-QUANT` 各自从四份 PDF 提取文本，`KA-GATE` 实测提取到 `13,601`／`33,571`／`21,285`／`56,605` 字符。
  - 实测数值：八个显示字符串 `28.07%`、`28.11%`、`0.03`、`17.48%`、`17.50%`、`0.02`、`1.28`、`0.1125%` 在六个文本展示面零缺失且中英两侧一致，四份 PDF 亦零缺失；`17.5%` 全包 `0` 处。`KA-DENOM` 重算得到 `site_hectares 1,141.3`、`gap_sqm 12,825.386`、`gap_hectares 1.28`、`gap_share_of_official 0.1125%`、`green_hectares 199.5`、`green_provisional 17.48%`、`green_official 17.50%`、`green_shift 0.02`、`open_space_hectares 320.4`、`open_space_provisional 28.07%`、`open_space_official 28.11%`、`open_space_shift 0.03`。分母 `11,412,825.386` 与发布值 `11.4` 在六面齐备。`57.1%` 只出现在 `proposal.md`、`proposal.en.md`、`report/proposal.html`、`report/proposal.en.html` 四面，四面均同时写出 `8/14`；两个 viewer 与四份 PDF 实测不出现 `57.1`，因此不存在未配对的份额语句。阈值同时披露 literal rule 与可达 run count：`0.70`、`0.35`、`45/64`、`0.703125`、`23/64`、`0.359375` 在六面齐备，`KA-QUANT` 另记录两条字面规则本身都不可达（`64 × 0.70 = 44.8`、`64 × 0.35 = 22.4`）。`320.4`／`199.5`／`1,141.3` 仍为一位小数且双语对称。

- [ ] **C08 — 为迁移后的全部来源完成统一 bibliographic schema migration。**
  - 精确路径：`sources.json`、`visual/assets/bilingual-source.json`、`visual/assets/registry-index.json`、`manifest.json`。
  - 精确测试：validator JSON/schema 检查；`run-contract-tests.js` 断言最终 `sources.json` 恰含 **41** 条记录（27 既有 + 8 contextual + 5 primary public-evidence + 1 meteorological，Section 14.13.1 冻结），逐条检查 `41/41` 记录的 `title`、`author_or_issuer`、`year`、stable ID、identifier/URL、usage/limitations、ID cross-reference，以及二选一的本地证据状态：非空 repository-relative `local_reference_path` + 本地 SHA-256，或 `local_reference_path: null` + `url_only_not_cleared` + retrieval-time SHA-256 + reason；另断言 27 个 legacy ID 全部保留、Section 14.8 的八个 contextual ID 与五个 primary public-evidence ID/URL 全部存在、`BEIJING-METEOROLOGICAL-SEASONAL-QUALIFICATION` 可解析。
  - 可观察验收：迁移后 `41/41` 记录均使用同一获准字段形状，总数恰为 41 而非 `27/27`，也不得改用开放式 `N`；27 个既有记录全部迁移，零条遗留旧字段形状；不虚构个人作者、年份、条文、locator 或本地文件；新增/补全的 DOI、ISBN 与一手 URL 与 Section 14.8 相同；URL-only 记录不得支持 clause-derived 数值、场地控制、合规或实施授权，背景来源不得成为场地证据。若实施开始前 `sources.json` 因本规范以外的改动而变化，目标重算为「实际观测条数 + 14」并报告差异，不得静默吸收。

- [ ] **C09 — 从零建立单一字体载体并重建四份 PDF。**
  - 精确路径：`visual/assets/noto-sans-sc-subset.js`、`drawings/a0-boards.pdf`、`drawings/a0-boards.en.pdf`、`drawings/a3-booklet.pdf`、`drawings/a3-booklet.en.pdf`。
  - 精确测试：`node --check` 字体载体；运行 `build-drawings.js` 与 PDF contract tests；逐 PDF 检查 `/FontFile*`、`/ToUnicode`、页数、media box、可提取标题与七门。
  - 可观察验收：仅一个字体载体且 ≤4 MiB；四份 PDF 每份至少一个嵌入字体程序和一个 `/ToUnicode`；中文/英文文本可提取；A3 各 16 页，A0 各 4 页；placement 与 Section 14.7 完全一致；无单独 `.ttf/.otf/.woff/.woff2`。

- [ ] **C10 — 删除重复顶层标题。**
  - 精确路径：`proposal.md`、`proposal.en.md`、`report/proposal.html`、`report/proposal.en.html`、`scripts/render_proposal_html.py` 的既有调用结果。
  - 精确测试：解析两份生成 HTML 的 heading outline。
  - 可观察验收：每份生成 HTML 恰有一个 `<h1>`；不得手工编辑生成 HTML。
  - 由已勾选改回未勾选的记录：第一条验收仍然成立，两份生成 HTML 实测各恰有一个 `<h1>`（`1`／`1`），重复顶层标题确已删除且未被复原。第二条本轮为假：按指令本轮不运行 `scripts/render_proposal_html.py`，而 `report/proposal.html` 与 `report/proposal.en.html` 的若干表格单元格是照该脚本 `render_table_cell()`／`render_inline()` 的输出逐字手写的（阈值可达边界两行、以及本轮其他显示字符串修正）。手写内容经逐字对照 renderer 的转义与内联规则，预期与再生成结果逐字节相同，但**等效于 renderer 输出不等于由 renderer 生成**，本条验收要求的是后者。因此本项降级为未勾选，不用「实质等效」代替「实际生成」。重新评定条件：官方 `render_proposal_html.py` 运行一次，并确认两份 HTML 与 renderer 输出逐字节相同。

- [ ] **C11 — 将英文 H2 集合迁移到验证器要求的精确集合。**
  - 精确路径：`proposal.en.md`、`report/proposal.en.html`、`visual/assets/bilingual-source.json`。
  - 精确测试：读取 `scripts/validate_submission.py` 的 `REQUIRED_SECTIONS_EN`，与 `proposal.en.md` H2 集合做 exact equality；再生 HTML 后复验。
  - 可观察验收：13/13 标题、顺序和拼写完全一致；当前 11 项差异归零。

- [ ] **C12 — 统一英文 viewer 的项目注册表。**
  - 精确路径：`visual/assets/project-registry.json`、`visual/index.html`、`visual/index.en.html`、`proposal.md`、`proposal.en.md`、`report/proposal.html`、`report/proposal.en.html`、`drawings/a0-boards.pdf`、`drawings/a0-boards.en.pdf`、`drawings/a3-booklet.pdf`、`drawings/a3-booklet.en.pdf`。
  - 精确测试：按 ID 比较每个发布面与 registry 的 `P00`–`P11` 标题和顺序。
  - 可观察验收：英文 viewer 包含 `P00`；不再自行重命名 `P01`–`P04`；所有发布面与 registry 完全一致。

- [ ] **C13 — 补齐标准矩阵并登记两项技术规范。**
  - 精确路径：`standard_matrix.json`、`sources.json`、`proposal.md`、`proposal.en.md`、`compliance_matrix.json`、`design_depth_matrix.json`。
  - 精确测试：standard citation closure test；validator；对 `GB 55019-2021` 与 `DB11/T 2209-2023` 检查 authority/status/URL/limitations，且未持有条文时不得出现 standards-derived 数值；并断言登记本身不关闭适用性外部门——`standard_matrix.json` 中 `DB11/T 2209-2023` 记录的适用性字段保持未证实值并显式 cross-reference `D08`，`GB 55019-2021` 记录的适用性字段同样保持未证实值并显式 cross-reference `D07`；两行在 D 表中仍为无复选框的开放门。
  - 可观察验收：三项已知 dangling standard 全部登记；零 dangling standard citation；两项技术规范以有界用途登记；无伪造条文、尺寸或 compliance pass。登记 `DB11/T 2209-2023` **不**关闭 `D08` 的适用性：在有资格的交通/慢行专业人员针对确切的已清理版本与所引条文作出适用性记录之前，`D08` 保持开放，其下游的路线、道路与过街制品保持 hold，任何展示面都不得出现 standards-applicability 声明或 standards-derived 尺寸。同理，登记 `GB 55019-2021` 只证明该强制性国家规范存在并自 2022-04-01 起施行，不证明本场地条文适用性或路线合规，`D07` 保持开放。两项限定以双语同时出现在 `proposal.md` 与 `proposal.en.md` 的标准响应段落。

- [ ] **C14 — 完成未知指标五字段、三项官方近似重点区面积指标、`A-TENURE-001` 未知值契约、官方拼写变体保全与全级联。**
  - 精确路径：`metrics.json`、`assumptions.json`、`compliance_matrix.json`、`design_depth_matrix.json`、`self_check.json`、`manifest.json`、`visual/assets/metric-crosswalk.json`、`visual/assets/gate-registry.json`、`visual/assets/claim-limits-registry.json`、`geometry/key_areas.geojson`、`proposal.md`、`proposal.en.md`、`assets/figures/key-areas.png`、`assets/figures/key-areas.en.png`、`assets/figures/metrics-evidence.png`、`assets/figures/metrics-evidence.en.png`、`visual/index.html`、`visual/index.en.html`、`report/proposal.html`、`report/proposal.en.html`、`drawings/a0-boards.pdf`、`drawings/a0-boards.en.pdf`、`drawings/a3-booklet.pdf`、`drawings/a3-booklet.en.pdf`。
  - 精确测试：对 `floor_area_ratio`、`approved_height_limit_m` 逐项检查 `reason`、`resolver_or_profession`、`responsible_authority_role`、`recalculation_trigger`、`downstream_artifacts`；对 `official_key_area_area_sqm_001`、`official_key_area_area_sqm_002`、`official_key_area_area_sqm_003` 断言数值 `1921000` / `1043000` / `720000`、`unit: "sqm"`、`status: "known"`、`confidence: "high"`、原始近似公顷显示精度和 `approximate: true`；运行 unknown-display ban、官方 polygon gate-open、non-polygon-derived/non-exact-denominator、依赖引用及 hash cascade tests。
  - 精确测试（`A-TENURE-001`）：断言 `assumptions.json` 恰含一条 `id: "A-TENURE-001"` 记录，其 `status` 为 `"unknown"`、`value` 为 `null`；断言该记录同时具备 `tenure`、`cadastre`、`right_of_way`、`maintenance_duty` 四个子字段且四者的值全部为未知值契约（非空 `reason`、无臆造权属主体、无地块号、无面积、无期限）；断言存在非空 `responsible_authority_role` 与非空 `recalculation_trigger`；断言其 `external_gate_refs` 含 `"D04"`；断言 `visual/assets/gate-registry.json` 中 `D04` 反向引用 `A-TENURE-001` 且 `checkable: false`、`state: "open"`；断言 `regeneration-design.md` Section 14.2 所述的 maintenance-unit 激活前置在包内表达为 `maintenance_unit_activated_count == 0`。
  - 精确测试（官方拼写变体）：对 `assets/figures/key-areas.png`、`assets/figures/key-areas.en.png` 之外的全部文本载体，断言 `集聚` 与 `聚集` 两种官方发布拼写在包内各自出现次数均 `> 0`，且 `visual/assets/claim-limits-registry.json` 逐条记录哪一份正式文件发布哪一种写法（`brief/site-package/agent_taskbook.json` 与 `brief/site-package/design_brief.json` 的 `boundary_text_zh` 发布 `集聚`；`brief/site-package/design_brief.json` 的重点区 `label_zh` 发布 `聚集`）；断言任一 build/render 步骤都不把其中一种改写为另一种——对构建前后的字节做逐一比对，两种写法的出现次数在构建前后完全相等；断言英文侧不通过翻译隐藏该差异，而是以一条显式 bilingual 注记说明正式资料内部存在两种写法且本包不作静默规范化。
  - 可观察验收：两项未知指标保持 `value: null`，各自 5/5 字段齐全，任何显示面不出现其数字；三个官方近似面积指标为 `3/3`，分别保留 `about 192.1 ha`、`about 104.3 ha`、`about 72.0 ha` 和 `approximate: true`，不得称为 polygon-derived、exact denominator 或 official polygon proof，官方多边形 gates 仍为 open；`network_detour_factor` 单位与获准 ledger 一致；指标变化依次更新 matrices、professional counts、self-check、manifest hashes。
  - 可观察验收（`A-TENURE-001`）：该记录存在且为完整的未知值契约，`1/1`；不虚构任何权属人、地籍号、通行权、维护义务人、期限或盖章文件；`D04` 在 D 表中仍是无复选框的开放外部门，C14 完成不改变其状态；maintenance commons 仍为零激活单元的 contingency register。
  - 可观察验收（官方拼写变体）：`集聚` 与 `聚集` 在再生后的包内均存在且计数与再生前一致；`2/2` 种写法各自附有发布出处；不存在任何把二者统一的规范化步骤；双语两侧都能读到该差异的说明。

### D — 外部证据门

本表无复选框。实施提交不得把任何一行改为“已完成”；“条件性进度”只允许写清楚的 provisional drawing、protocol 或 record，不授予公共运行或法定权力。

外部证据只解决其实际覆盖的 field、entrance、parcel、clause、utility、route、component 或 role；局部证据不得推定整门关闭。Explicit user approval 属于独立 `H01`，不是 D 类专业依赖。

`D03` 只重新评估 Lab 3 的大钟寺到达、四象限分配与站点假设，绝不改变 Lab 2 的条件性慢行连线状态。Lab 2 慢行连线不新增 `D18`，而是逐字段挂在既有门上：`D04` 持有机构边界权属与合法通行权，`D05` 持有实测路线与受影响的服务接口，`D08` 持有任何触及道路或过街的慢行连线段，`D12` 持有具名 operator/maintainer、维护义务、预算、恢复资金与剩余责任，`D16` 持有机构边界接口决定与具体的 Lab 2 人类授权事件。每一行都在其“下游 hold”列中点名该慢行连线；局部证据只关闭其覆盖字段。任何校园门、产权边界、门禁点、通行权、路线、operator、预算或授权都不得超出已登记证据推定。

| ID | 外部证据 | 责任来源/最低证据 | 下游 hold | 当前允许的条件性进度 |
|---|---|---|---|---|
| `D01` | 正式场地边界 polygon | 规划主管部门；named CRS 的可下载 polygon | `SITE-001`、依赖指标、matrices、figures、plates、PDF、viewer、report | 保持 `official_boundary: false` 的条件性绘图；不作官方面积声明 |
| `D02` | 正式重点区 polygons | 规划主管部门；逐区 named CRS polygon | 重点区几何及其全部依赖 | 条件性绘图；正式名称与发布面积可与 polygon 分开记录，不能把临时 polygon 称为正式 |
| `D03` | 站点接口 | 轨道站点主管部门；named CRS 的出入口与编号、标高变化、竖向交通、gate line、站点用地边界与过街关系 | Lab 3 图版、synoptic figure、scenario 与 project 记录 | 可用仅限非站点的临时设计几何条件性绘制全部十张 Lab 3 图版；所有站点字段保持 `unknown` 或 `null`，不绘制也不声明任何站点几何、出入口、编号、gate line、标高变化、站点用地边界、距离、过街或正面站点关系 |
| `D04` | 地籍、权属、通行权、维护责任 | 土地/登记主管部门；盖章的地籍/权属记录，写明权利与义务 | maintenance-contingency 激活、条件性首层/沿街界面提案、Lab 2 慢行连线、role registry | 仅绘制非地理配准模块与明确条件性的慢行连线 protocol；不作任何地块、通行权、准入或治理声明 |
| `D05` | 地形、标高、公用设施、排水与服务接口证据 | 持证测量人员：named 垂直与水平基准下的签章标高；相关公用设施、排水、消防或其他服务 operator/authority：逐个受影响接口的实测连接位置加书面容量与管辖声明 | 剖面、路线图、Lab 2 慢行连线路线、挖填、排水、公用设施与服务接口声明 | 可用明确标注的 assumed local datum 绘图；未覆盖字段不得作坡度、排水、路线、公用设施、消防连接、容量或管辖声明 |
| `D06` | 结构/土木评估与既有建筑认定 | 持证结构/土木专业人员：写明荷载工况、勘察依据、风雪依据与 admissibility 的签章报告；有权规划/建筑/权利主体：核实的既有建筑清单及逐地块或逐构件的拆改留决定 | 模块剖面、图版 3 与 5、安装、既有建筑分类 | 仅绘制 proposed module 与 inventory hypothesis；安装与任何获授权的拆改留声明保持阻断 |
| `D07` | 无障碍设计审查与建成/开放前实测审计 | 合资格无障碍专业人员/机构：针对确切已清理 code edition 的设计阶段条文适用性与路线审查；另行完成含仪器与分段结果的建成或开放前实测审计 | 路线设计、equivalent text、`G5`、公共开放 | 保持 `verified: false`、`G5: pending` 的条件性深化；独立实测审计通过前公共开放保持阻断 |
| `D08` | 道路管辖、道路通行权、交通、过街与慢行标准适用性 | 有权道路/交通主管：书面管辖与合法道路通行权或过街决定；合资格 assessor：含计数、调查日期与时长且被接受的评估；合资格交通/慢行专业人员：针对确切已清理 `DB11/T 2209-2023` 版本与所引条文的适用性记录 | Lab 3 图版、任何触及道路或过街的 Lab 2 慢行连线段、道路/过街几何与尺寸、scenario registry | 可条件性绘制全部十张 Lab 3 图版，同时把未覆盖的站点、道路、过街与适用性字段保持 `unknown` 或 `null`；未覆盖字段不得作道路管辖、合法过街、尺寸、几何、安全过街或标准适用性声明 |
| `D09` | 遗产认定 | 遗产主管部门；named CRS 的正式边界与介入决定 | 遗产图层、`G3`、介入措施 | 仅绘制明确标注的 hypothesis；不得在未定 control zone 内实施 |
| `D10` | 应急服务协调与恢复验证 | 消防、急救、实施主体、具名 operator/stop authority 与 restoration verifier；书面 access、incident command、human takeover、evacuation、make-safe、restoration 与 closure verification 责任 | 全部公共试点、`G1`、stop/restore/verified-closure 记录 | 仅编写应急与人工接管 protocol；构件拆卸性能是另一项独立 contract test，取得证据前不得声称 fire route 已保持或恢复已验证 |
| `D11` | 隐私/数据认定 | 数据保护法律/专业角色；提出感知或个人数据时完成 PIPIA | Lab 记录与 `G6` | 仅用非个人 manual count 与纸质 protocol；任何 camera、sensor、identification 或 app 保持阻断 |
| `D12` | 成本、维护、恢复资金与剩余责任 | 实施/运营主体；书面资金来源、预算科目、owner、具名 maintainer 与义务、年度金额、期限、恢复资金、residual-liability holder | pilot start、Lab 2 慢行连线、maintenance 激活与义务、恢复能力、`G4` | 可发布 `funding_status: unfunded` 的完整成本表；pilot start、慢行连线授权与 maintenance-unit 激活保持完全阻断 |
| `D13` | 全季节观察 | 具名 operator 与 authorizer；C06 建立 source-backed 合格条件后，由现场具名 operator 按已接受 protocol 记录至少 365 天并实际经历合格夏冬暴露 | 仅全年运行声明与 propagation review | 可完成 protocol 与季节配置；观察本身持续开放且无复选框，而 stop、make-safe、restoration、verified closure 及已批准 pilot 内的普通决策无需 365 天证据即可进行 |
| `D14` | 批准高度控制 | 规划主管部门；已批准的 parcel-specific 高度控制 | `approved_height_limit_m` 及其全部依赖 | 数值完全阻断并保持 `null` |
| `D15` | 容积率 | 规划主管部门；已批准的 parcel-specific FAR | `floor_area_ratio` 及其全部依赖 | 数值完全阻断并保持 `null` |
| `D16` | 场地责任规划师职权或其他运营职权 | 有权公共机构；覆盖相关地理范围与行动的正式 remit；对 Lab 2 慢行连线，另需书面机构边界接口决定与写明范围、期限、责任角色的签署 Lab 2 授权事件 | role 与 decision-authority registry、机构边界接口、Lab 2 慢行连线 | 只登记一般制度或机构；不识别任职人、不声称场地职权，未取得上述具体记录前不激活慢行连线 |
| `D17` | 公众权重复核与分配性数据 | 具名 authorizer 或 data holder；有记录的公开复核与适用的公平性数据集 | 权重声明与公平性声明 | 权重只作为 declared input 发布，绝不作为发现 |

拆改留分类、法定合规认证、道路红线和政府实施承诺仍受 Section 1.2 D9 的绝对禁止：在没有相应有权机构或专业证据时不得声明、精确绘制或暗示。这些不是实施 agent 可“解决”的值。

### E — 已删除或合并的旧目标

- [x] `E01` 删除不存在的 missing-`and` 英文标题迁移目标；保留真实存在的 extra-`The` 五处迁移目标。
- [x] `E02` 删除单一“全部专业审查完成”合并项；以 D06–D11 等独立证据门取代，允许真实记录部分进度。
- [x] `E03` 将“登记适用技术规范”从外部触发表移入 C13；规范是否适用与专业合规判断仍保留为外部门。

### 批准后的固定顺序

本段是规范加上一次已完成的解释器解析记录，其本身不是授权。

**已记录的解释器解析。** 按 Section 14.9 规定的顺序实跑 `--version` 并只接受 exit code 0：`python3 --version` 退出码 `49` 且无输出（本机的 Windows Store 别名，非可用解释器）；`python --version` 退出码 `0`，输出 `Python 3.14.7`；`py -3 --version` 退出码 `0`，输出 `Python 3.14.7`。因此选定的 Python argument vector 为 **`python`**（单 token，`PYTHON_ARGV = ["python"]`），备用为 `py -3`。全部仓库脚本调用一律使用该 argument vector，不得写死 `python3`。

**固定顺序。** 明确批准后：（1）先让 implementation plan 捕获本规范；（2）把每项批准要求迁入 validator-admissible source、registry 与 test-plan 记录；（3）随后删除 `regeneration-design.md`；只有此后才可运行 contract tests、package build、HTML render、self-check、preflight 或 repository validator。其后的固定顺序为：记录已解析的解释器与版本；满足依赖 prerequisite；失败优先的 participant contract tests；确定性全构建；`python scripts/render_proposal_html.py`；**在刷新前把 `changelog.md` 作为 `role: "changelog"`、`required: true` 的条目加入或更新到 `manifest.json`**；`python scripts/refresh_submission_manifest.py` 恰好刷新一次；`python scripts/self_check_submission.py --mark-self-checked --json`；`python scripts/participant_preflight.py --check-push`；**仓库验证器 `python scripts/validate_local_submission.py --strict-manifest --json`**；编码/LF/路径/PDF/hash/范围复核与 `git diff --check`。marked self-check 之后不得再次刷新 manifest。

**授权分层。** `H01` 只授权上述本地 C 类实施与本审批制品的删除。推送、创建或关闭 Pull Request、rerun CI 及任何其他 GitHub 动作都需要**另一次独立、明确的用户授权**，`H01` 不包含该授权；Section 13.4 step 8 与 Section 13.5 仍然只是已规范、未授权的步骤。

### 当前终点

**v0.2 规范检查点已完成并已获明确批准（`H01` 关闭）。**本地 14 项 C 类实施任务据此开始，删除 `regeneration-design.md` 在设计规定的生命周期点执行。推送与替换 PR 由同一条用户消息中的**独立授权**覆盖。17 个 D 类外部门全部保持开放且无复选框；本轮没有任何新的外部或专业证据到达，因此没有任何一门被关闭。任何 C 类复选框只有在其具名制品存在且其具名测试通过后才被勾选。

## v0.3 - 2026-08-15

### 剖面尺寸依据契约：取消 `geometry_derived`

本轮取消了剖面尺寸的第三种依据。一条剖面尺寸此后只有两种合法形态：要么是有限正米数、`basis_type` 为 `proposed_module` 并显式标注未经核验，要么 `value` 为 `null`、单位仍为 `m`、`basis_type` 为 `pending`，并附假设或专业来源与复算触发条件。被取消的不只是 `degree_longitude`／`degree_latitude` 这两个字符串写法，而是**任何**声称由本包几何推得的剖面尺寸。

理由是这类依据在剖面上不可能成立。本包的几何是归一化概念坐标，非按比例、无官方边界；从它「推得」一个净高或一个跨度，等于把一张不主张位置的图当成测量结果使用。取消之后，凡是本包无法诚实给出的尺寸一律留空并写明在等什么，图上画成虚线尺寸并标注待定，绝不给出一个看起来像测量结果的数。

### 一个只有数据侧被守住的契约

上述契约先只写在数据侧，并配了独立变异断言。它一直通过。但图版旁边给读者看的句子是手写的，不随数据移动：依据取消之后，三段图版文字仍然告诉读者部分剖面尺寸「由本包几何推得 / derived from the package geometry」，其中一段还在数据只有四项时数出五项。全部检查都指向记录，没有一项去读散文，因此没有任何东西失败。

这类缺陷不是靠更仔细的校对发现的——它是在一次全分辨率图版目视复核中被偶然看到的。真正的缺陷不是那三段话，而是**没有任何测试读发布出来的句子**。所以本轮的修复分两步，且顺序不可颠倒：

- 在来源处改正。`visual/assets/build-plates.js` 中 ZZY-03 与 AIO-03 的 `ext_zh`／`ext_en`／`lim_zh`／`lim_en` 逐条重写为与数据一致的说法（四项有数、四项待定，有数者全部为建议模数）。DZS-03 读过后不改：它本来就没有作过尺寸计数声明，因此从未过时。
- 给 `KA-SPA` 补上发布散文那一半。新检查在 `visual/assets/test-key-area-spatial-content.js` 内扫描七个读者真正会读到的展示面（`visual/assets/area-plates.json`、两个 viewer、两份提案 Markdown、两份 report HTML），禁掉五种写法：`由本包几何推得`、`本包几何推得`、`derived from the package geometry`、`derived from package geometry`、`geometry_derived`。四份 PDF 不在扫描之列并有明写理由：图版散文是以栅格进入 PDF 的，在那里是像素不是文本，而注册表是它被写下的唯一位置。

被禁的短语连同其否定形式一并禁掉，这一点是有意为之，并已写在代码里：本包此后既不能主张该依据，也不能声明「某些尺寸不是几何推得的」——在剖面上根本没有「是」的那一类，一句澄清只会请读者去找并不存在的东西。短语以字面量钉在测试里，不从写它们的 builder 导入；否则 builder 改了自己的措辞就会连测试一起改掉，测试便只会同意包里恰好写着的任何东西。

曾考虑改为从散文里解析计数声明（「八项中四项有数」）再与数据比对，已放弃：中英数字提取脆弱，且 DZS-03 根本不作计数声明——那样的检查会恰恰在散文省略声明的地方静默失效。

### 红绿证据

新检查写在重建**之前**，因此它抓到的是真实缺陷而不是事后构造的样本：

- 红：对当时包内文件运行，退出码 `1`，`8` 项失败，逐一点名 `area-plates.json`（四种写法全中）、`visual/index.html`（两种中文写法）、`visual/index.en.html`（两种英文写法）。
- 绿：来源修正并重建后，`PASS`、失败 `0`、扫描展示面 `7`。
- 变异：数据侧 `6/6`、散文侧 `5/5` 全部被拒并点名违规短语；另设一段说真话的对照文字，若扫描器连它也拒绝则整组变异不作数。

### 本轮验收实测

最后一次改动之后按依赖顺序整体重建，随后全套复核，全部通过：

- `node --check` 全包 JavaScript `29` 个，语法失败 `0`。
- 九个 builder 写入模式全部退出 `0`；`build-plates` `ok:true`、图版 `30` 张、替换规则 `64`、缺字码位 `53`、`notdef_drawn 0`；四份 PDF 因图版栅格改变而全部重建（`changed_files: 4`，`text_off_sheet: 0`，`text_collisions: 0`），不是只重建 A3。
- 九个 builder `--check` 模式全部退出 `0`、`changed_files` 全为 `0`。
- `run-contract-tests.js`：`PASS`，用例 `42`，失败 `0`。
- 复算器：`PASS`，比较 `633`、种子 `64`（`0`–`63`）、`derived_metrics 7`、`mismatch_count 0`；零抖动消融持久边 `11`、分歧带 `0`、持久图连通。
- 篡改测试：`15` 项，其中 `14` 项蓄意篡改全部被点名拒绝，冻结资产未变。
- 清洁构建：两次构建文件树 SHA-256 完全一致，文件 `154`，差异项 `0`。
- 两个冻结 JSON 的 SHA-256 与账本记录逐字符相等；`geometry/key_areas.geojson` 坐标摘要与 `HEAD` 完全一致，属性只增不改。
- 独立 PyMuPDF 复核 `40` 页：问题 `0`，空白页 `0`、无文本页 `0`、英文页中日韩标点 `0`、图像越界 `0`、MuPDF 警告 `0`；三个区块板 × 两种语言的 A0 落位一致，rank 1 为 `-02` 图版且面积份额 `0.30`、rank 2 为 `-03` 图版且 `0.20`、支撑板最大 `0.07`。A0 阈值在该脚本内以字面量独立钉住，不从生产常量导入。
- 浏览器复核：两种语言 × 桌面 `1440×900` 与移动 `390`（实际 CSS 宽 `375`，含滚动条，比 `390` 更严）。两侧同构：`<h1>` 各 `1`、`figure`／`figcaption` 各 `20`、`img` `20` 且缺 `alt` `0`、加载失败 `0`、`aria-describedby` `15` 且悬空目标 `0`、可折叠长描述 `15` 且默认全部折叠、`summary` `15`、全分辨率本地 PNG 链接 `15` 且实测全部 `200`（`103`–`151 KiB`）、重复 `id` `0`、远程资源引用 `0`。移动宽度下文档无横向滚动，越界元素全部落在 `overflow-x: auto` 的导航条内，导航条外越界元素 `0`。长描述的目标节点位于 `details` 内部，因此折叠状态下图像与描述的程序关联依然成立。英文页面中唯一的中日韩字符是指向中文版的 `中文` 语言切换链接，且带 `lang="zh-CN"`。
- 编码与范围：文本文件 `67` 个，含 CR／BOM／NUL 的 `0`；HTML `4` 个，远程资源引用 `0`；变更路径 `87`，包外变更 `0`；`git diff --check` 退出 `0` 且无输出。

### 本轮终点与未决事项

本节记录本轮实际做到的事，不扩大其范围。

本轮**没有**运行任何官方生命周期步骤：未运行 `scripts/render_proposal_html.py`、`scripts/refresh_submission_manifest.py`、marked self-check、`scripts/participant_preflight.py` 或严格验证器。`manifest.json` 与 `self_check.json` 因此仍是有意保留的陈旧生命周期制品，其哈希未经手工修改，也不据此声称最终就绪。本轮**没有**任何提交、暂存、推送、PR 创建/关闭/更新、fetch、merge 或 rebase，也没有触碰包外任何文件。

`C10` 的重新评定条件不变：待官方 `render_proposal_html.py` 运行一次并确认两份 report HTML 与 renderer 输出逐字节相同。`C05` 的具名路径 `visual/assets/participant-test-report.json` 仍不生成，理由见该条目——本轮同样不把某一次运行的结论冻结成包内文件，四份 PDF 的构建哈希也因此不写入本账本，证据以可实跑的套件与确定性清洁构建为准。

17 个 D 类外部门在本轮结束时全部保持开放、无复选框、不可勾选。本轮所做的全部是包内实施与自证，其中没有任何一项构成外部或专业证据，因此没有任何一门被关闭，也不得由包内测试通过推定任何一门可以关闭。

## v0.4 - 2026-08-15

### 把复杂适应系统从名词写成运行规则

本包一直用「复杂适应系统」命名章节和词汇，却没有一处写出它在这份方案里究竟约束什么。评审因此无法判断「适应」是设计机制还是修辞。第 4 章新增 `复杂适应系统运行模型`，把它写成六项可被追问的规则：

- 主体与局部规则：四类已登记角色，加一名独立的停止权持有人；行动由局部规则触发，本包没有全局最优解算子。
- 状态变量：只取 `P00`–`P11` 已登记的观察指标（`P01` 通行中断次数、`P02` 开放时段履行率与被拒进入、`P06` 接管事件数、`P10` 备件覆盖机型比例），并写明这是隐私约束而非选材偏好——未登记的量不得被观测。
- 回路成对：任何放大回路都不得在缺少一条由另一方触发的抑制回路的情况下建立。
- 吸引子：稳定边、样板化、维护债三个，各自写明进入条件。
- 阈值：区分规则值与可达值，并规定计数失败时默认停止而不是默认继续。
- 路径依赖与学习：快慢层分开，只有在具名主体已接受相应剩余责任时才可支出不可逆性（`D12` 仍开放）；学习条件挂在 `D16` 上，并明写 `REAL-OPTIONS-NEUFVILLE-2003` 与 `CAS-DYNAMIC-CITIES-2018` 只提供词汇、未被转录，不作为证据使用。

第 12 章新增 `系统性失效模式与停止机制对照`：七行，其中五行有登记条款可依（`P02`、`P03`、`P08`、`P10`、`P11`），第六行是本方案自提的规则、无登记条款，第七行是本包的构建纪律。三类在表前逐一标明，没有把后两类装扮成已登记机制。

### 把零抖动消融讲给读者

零抖动消融记录自 v0.3 起就在包内，但六个正文展示面上「消融」与 `ablation` 各出现 `0` 次：读者看得到持续与分歧的判据，看不到检验这套判据的对照。这等于把结果发布出去、把对结果的检验留在数据里。

第 4 章新增 `黏菌方法的五层阶梯与零抖动对照`。五层从生物先例到规划判断逐层标注本包做了什么、没做什么（例如通量—导度方程在本包中并未实现），随后公布对照结果，且公布的是对自己不利的那一面：jitter 置零后 `24` 条候选边中 `8` 条改变状态，最大频率变化 `0.546875`，持续边由 `6` 条变为 `11` 条，而分歧带变为 `0` 条，持续图仍然连通。分歧带因此是这套判据在带抖动条件下的产物，不是被观测到的城市争议；仍有 `5` 条边（`E01`、`E02`、`E16`、`E17`、`E19`）在两次运行中都不稳定，但没有一条落进 `0.35` 至 `0.70` 区间。

两个 viewer 的核心指标一节同时补上同一结论。做法不是手写：页面里只预留一个 `<p class="intro" id="zero-jitter">` 空位，句子由 `visual/assets/build-viewers.js` 从 `physarum-zero-jitter-ablation.json` 写入，其中每个数都由 `edges[]` 现算而不是抄 `summary`，末尾两句直接引用记录自己的 `not_a_finding_zh`／`not_a_finding_en`。builder 另加两条断言：本语言的句子必须出现在成品里，另一语言的句子不得出现；空位缺失时构建停止，而不是由脚本猜一个位置塞进去。理由与 v0.3 的教训相同——由人重打一遍的数字会漂移。

### 给发布出来的句子补上测试

v0.3 已经写下：真正的缺陷不是那三段话，而是**没有任何测试读发布出来的句子**。上面两节新增的正文若照旧只靠校对，就是把同一个缺陷再犯一次。因此本轮同时新增契约用例 `CAS01`（写在 `visual/assets/run-contract-tests.js` 内）：

- 先从 `edges[]` 现算候选边数、改变状态的边、零抖动持续边与分歧带、最大 `|delta|`，与 `summary` 自身比对；`summary` 与它自己的边不一致时先失败，不必等到句子出错。
- 再用现算值重建读者看到的句子，按语言逐条在 `proposal.md`、`proposal.en.md` 与两份 report HTML 中查找。
- 边号双向核对：记录说变了或仍不稳定的边必须被点名，记录说没变的边不得被点名。
- 行动署名对 `visual/assets/action-governance.json` 核验：被引用的字段必须非空且中英俱全，且该行动的 `authorized_target` 仍为 `null`、`pilot_start_allowed` 不为 `true`——在正文里点名一个行动，不得顺带把它说成已获授权。
- `D12` 与 `D16` 必须仍是 `open` 且不可勾选。
- 失效模式表在两份 Markdown 上计数：`7` 行，其中带登记条款的恰为 `5` 行，集合恰为 `P02,P03,P08,P10,P11`。

句子模板以字面量钉在用例里，不从被测文档导入：从被测对象里读期望的测试，只会同意它恰好写着的任何话。

红证据在临时副本上取得，包内文件未被改动；五处变异逐一被点名拒绝，恢复后基线 `PASS`：

- 中文散文把「分歧带变为 0 条」改成「1 条」：`proposal.md does not publish the recomputed statement "分歧带变为 0 条"`。
- 英文散文把 `6 to 11` 改成 `6 to 12`：`proposal.en.md does not publish the recomputed statement "persistent edges rise from 6 to 11"`。
- 中文散文删掉 `E05`：`proposal.md omits E05, which the ablation record reports as changed or still unstable`。
- 记录侧把 `largest_absolute_delta` 改成 `0.5`：`the summary reports a largest absolute delta of 0.5, the edge records give 0.546875`。
- 删掉失效模式表的维护债一行：同时报出 `6` 行、带登记条款 `4` 行、集合缺 `P10` 三条失败。

用例写在 `run-contract-tests.js` 内而不是新建模块，理由是包边界而非风格：`scripts/refresh_submission_manifest.py` 只对 `manifest.json` 已声明的文件重算哈希，遇到已声明但缺失的文件直接报错，从不发现新文件。新建文件将是未声明文件，并会迫使本轮去改 manifest——而 manifest 刷新属于留给 Codex 的生命周期步骤。

### 生成署名按轮记录

包内此前声明正文由 OpenAI Codex 生成。本轮之后这句话不再完整。`report/copyright_statement.md` 增加一段中英对照，按轮记录：v0.1 至 v0.3 全部由 OpenAI Codex（GPT-5 family）撰写与构建；v0.4 中的三节新增正文、`CAS01`、本账本的 v0.4 记录与该声明段本身由 Anthropic Claude Opus 5 在同一授权任务中撰写；两份 report HTML 由 `scripts/render_proposal_html.py` 生成，生成后只规范行尾。`proposal.md` 与 `proposal.en.md` 第 27 行的生成声明各补一句同样的事实，行数不变。

`agent.json` 本轮未改动。它记录的是本次提交登记的提交方 agent，属于授权与生命周期记录，不是包内编辑对象；登记侧是否需要并列第二个模型，留给 Codex 与参与者判断。

### 一条不再成立的账本判断

`C06` 条目下原有一句断言：`56` 条实到条目全部未登记在 `manifest.json` 中。本轮实测该句不成立：`40` 条实到条目全部已登记，角色分别为 `proposal_figure`（30 张重点区图版）、`evidence_data`、`verification_script`、`asset` 与 `changelog`，四十条无一为 `other`，因此全部正确省略 `role_detail`；全包实测声明 `111`、在盘 `111`、未声明 `0`、缺失 `0`。原句保留并在其下加注更正，不作删除——账本既记录判断，也记录判断被推翻。`C06` 仍不勾选：不成立的是 `56/56` 这个数量验收与被取代的 `16` 条具名路径，不是 manifest 登记本身。

### 本轮验收实测

最后一次改动之后按依赖顺序整体重建，随后全套复核，全部通过：

- `node --check` 全包 JavaScript `29` 个，语法失败 `0`；本轮未新增 `.js` 文件。
- 九个 builder 写入模式全部退出 `0` 且全部幂等：`changed_files` 全为 `0`，`build-plates` `ok:true`、`notdef_drawn 0`，`build-proposals` `markers_migrated 0`、`residual_unsupported_markers 0`。四份 PDF 本轮字节未变、不在变更路径内，因此未重复 v0.3 的 PyMuPDF 复核，也不据此重复其结论。
- 九个 builder `--check` 模式全部退出 `0`、`changed_files` 全为 `0`。
- `run-contract-tests.js`：`PASS`，用例 `44`（内联 `30` + 模块 `14`），失败 `0`。本轮开始时该套件尚未改动，实测为 `43`；v0.3 记下的 `42` 与其所描述的套件不符，此处按实测更正。
- 复算器：`PASS`，比较 `633`、种子 `64`、`derived_metrics 7`、`mismatch_count 0`。
- 篡改测试：`PASS`，`15` 项，其中 `14` 项蓄意篡改全部被拒；冻结资产未变、复算器未变。
- 清洁构建：两次从零构建的文件树 SHA-256 完全一致，文件 `154`，差异项 `0`。此处不写该哈希的字面值：本账本本身在被哈希的文件树内，把值写进来就会立刻改掉它——凡是自指的数都不该被钉在账本里，只能由 `test-clean-build.js` 现场重算。
- 两个冻结 JSON 的 SHA-256 与账本记录逐字符相等。`geometry/key_areas.geojson` 三个要素 `PROV-KEY-001`／`PROV-KEY-002`／`PROV-KEY-003` 的几何与基线 `a3bf70d` 逐字段相同，属性只增不改、无删除、无改写。
- 展示面静态复核：两个 viewer 与两份 report HTML 各有 `<h1>` `1` 个；两个 viewer 各 `id` `46` 个、重复 `id` `0`、`aria-describedby` `15` 且悬空目标 `0`、`img` `20` 且缺 `alt` `0`、远程资源引用 `0`。本轮只在既有 `section` 内新增一个 `<p class="intro">`，没有新增标题、导航项或交互控件，因此未重跑 v0.3 的浏览器分辨率复核。
- 编码与范围：文本文件 `67` 个，含 CR／BOM／NUL 或非 UTF-8 的 `0`；`git diff --check` 退出 `0` 且无输出；变更路径 `10`，包外变更 `0`。

### 本轮终点与未决事项

本节记录本轮实际做到的事，不扩大其范围。

本轮运行了官方渲染脚本 `scripts/render_proposal_html.py` 一次，退出 `0`，两份 report HTML 由它重新生成。**留给 Codex 检查的一点**：该脚本在 Windows 上写出的行尾是 CRLF（`report/proposal.html` `301` 处、`report/proposal.en.html` `302` 处，无孤立 CR），而在盘文件为 LF。本轮的处理是逐字节把 `\r\n` 替换为 `\n`，并已实测：规范化后的字节与规范化前的在盘文件逐字节相同，两份皆为真。也就是说，两者只差行尾约定，正文无一字之差。

`C10` 因此仍不勾选。它的验收含「不得手工编辑生成 HTML」，而行尾规范化是渲染之后对输出所作的字节改动；即便内容等价，也不宜由本轮自行判定其满足。官方渲染证据留给 Codex 在最终序列中取得。

本轮没有运行：`scripts/refresh_submission_manifest.py`、marked self-check、`scripts/participant_preflight.py`、严格验证器与 `finalize_submission.py`。`manifest.json` 与 `self_check.json` 因此仍是有意保留的陈旧生命周期制品，其哈希未经手工修改；`manifest.json` 中仍有 `69` 条目没有 `sha256`，等待官方刷新。本轮没有任何提交、暂存、推送、PR 创建/关闭/更新、fetch、merge 或 rebase，也没有触碰包外任何文件。

`H01` 保持关闭、不可勾选，证据指针不变。`C02`、`C04`、`C07` 保持勾选，本轮未出现任何回归。`C08` 仍不勾选：`33` 条缺失的取回时刻哈希本轮一条也未获得，也不得合成。`C09` 在被批准的规范制品删除之后仍不可历史性验证。`C03`、`C11`、`C12`、`C14` 指向已被合并取代的历史路径，本轮没有为勾选而新建影子文件。

`17` 个 D 类外部门在本轮结束时全部保持开放、无复选框、不可勾选。本轮所做的全部是包内实施与自证，其中没有任何一项构成外部或专业证据，因此没有任何一门被关闭。所有现场行动与试点仍未获授权、未获资金。

## v0.5 - 2026-08-15

本轮是对 v0.4 的更正轮，处理五项定点缺陷，另附带修完在其中一项里被发现的第六处。所有改动都在 `submissions/MartinForReal/adaptive-jingzhang/` 内，未运行任何生命周期步骤。

### 把「分歧边」收回到它实际支持的范围

v0.4 已经在两个 viewer 上写对了这件事，但两份提案正文第 4 章仍留着旧说法：分歧边「表示这条边上发生真实权衡」。这句话把一个算法内部的选择不稳定性说成了城市里的事实——本包没有任何观测支持它，零抖动对照恰恰证明该分歧带随抖动设定而变。

两份正文改写为：分歧边只表示同一条边在同一套已声明的权重与抖动设定下出现选择不稳定性，其用途是据此向人提出审查问题（采用哪一组权重、谁受益、最坏影响落在谁身上、何时停止），而不是被观测到的北京冲突，也不是已确认的真实权衡。零抖动披露仍在同一段内紧随其后，未被缩短。

全包扫描 `67` 个文本文件，`发生真实权衡`、`表示真实权衡`、`exposes a real trade-off`、`reveals a real trade-off`、`real trade-off between` 五种写法在两份正文、两份 report HTML 与两个 viewer 中命中 `0` 处；仅本条账本记录为说明改了什么而原样引用了旧写法，`CAS01` 的断言扫描不读账本，只读两份正文。同一次扫描中 `observed conflict in Beijing` 在两份英文件里只出现在否定句内（`not to report an observed conflict in Beijing`），在 `run-contract-tests.js` 里只作为变异探针的改前／改后一对出现。两份 report HTML 由官方渲染脚本重新生成后同样只带更正后的句子。

### 双语 viewer 的语义对等改由权威 JSON 生成

此前两个 viewer 的对等只靠人看。本轮把它变成机器可判的属性，并补上一条独立契约用例 `PAR01`（写在 `run-contract-tests.js` 内）。

生成侧：`AI 场景`、`自检状态`、`来源`、`假设`四节此前中英各写各的，现在与 `重点区域`、`更新项目`、`区域协同` 一并由 `visual/assets/build-viewers.js` 从 `regeneration-source.json` 生成。十个场景保持稳定编号 `S01`–`S10`，每个在两种语言下都公开同样六个语义字段：场所类型、最小数据、人工审查、非数字兜底、负责运营方、停止规则；`CHK-01`–`CHK-04`、`SRC-F01`–`SRC-F06`、`ASM-01`–`ASM-06` 的编号、顺序与语义键在两侧一致，文字各用本语言。

检查侧：`PAR01` 不读 builder，只读两个成品页面与权威记录，按节定位后逐项比对——每个族的编号必须齐全且顺序与登记一致，两种语言的顺序必须相同；每条记录的每个双语字段必须以本语言出现、且另一语言的对应文字不得出现；六个场景字段的**标签**也必须印在页面上，否则读者遇到一条停止规则却没有名目；每张生成表必须有唯一解析的 `aria-labelledby`、`thead`／`tbody`、以及列表头与行表头的 `scope`；每张图必须有非空 `alt`，且中文页只出现中文图版、英文页只出现 `.en.png`，两侧图序相同。共 `6` 个族、`35` 条记录。

`9` 条变异探针逐一验证该检查不是空转：场景编号消失、两道审查门互换位置、英文字段回退成中文、生成表丢掉表头分组、生成表丢掉行 `scope`、中文页显示英文图版、图丢掉描述、任务覆盖数量吞掉已声明的资料缺口、手写表以无可及名称的形式重现。`probes_missed 0`。

### 任务覆盖表：本轮顺带发现并修掉的第六处

做上一节时发现两个 viewer 里还剩最后一张手写表，而它同时错了三样：中文三行对英文四行（中文缺「可复算性」一行）；中文单元格里留着 `Official requirements`、`Mandatory standards`、`Formal depth`、`全部 addressed` 等未译片段；而「全部 addressed」与记录不符——`standard_matrix.json` 的 `11` 项标准里 `9` 项 `review_status` 为 `addressed`、`2` 项为 `data_gap`。第三样是实质性夸大，且它已经在包里存在了四个版本。

该表并入生成路径。四行的数量全部由 builder 从记录现算：`compliance_matrix.json` 得编号要求 `17` 条与 agent 任务 `6` 项，`standard_matrix.json` 得 `11`／`9`／`2`，`design_depth_matrix.json` 得深度条目 `15` 项且 `15` 项写明 `completeness_limited_by`，零抖动记录得种子 `64` 与候选边 `24`。记录里存的是带 `{0}`、`{1}` 占位的模板与各自的 count 名单，占位取不到数就停止构建，不会把花括号发给读者。builder 另加一条断言：`addressed` 与 `data_gap` 之和必须等于标准总数，否则「N 项中 A 项已回应、G 项为资料缺口」就不再是对该矩阵的完整陈述——把部分陈述读成完整陈述正是本轮要拆掉的那种夸大。

`PAR01` 独立重算同一批数量（不从 builder 取），并把这处夸大本身做成探针：把 `data_gap` 并入 `addressed`、缺口写成 `0`，得到一句算术自洽、读起来毫无破绽的话，检查必须点名拒绝。它拒绝了。另加一条探针在页面尾部塞进一张无 `aria-labelledby` 的表，确认「每张表都被规则覆盖」这句话是被断言的而不是被注释声称的。

两个 viewer 此后结构完全对称：各 `59` 个 `id`、重复 `0`、`section` `15` 节、`table` `12` 张且 `12` 张全部带可及名称与 `thead`／`tbody`、`scope="col"` 各 `54`、`scope="row"` 各 `67`、无 `scope` 的 `<th>` `0` 个、`img` `20` 且空 `alt` `0`、远程引用 `0`。

### 补上任务书要求的区域协同回应

`brief/site-package/agent_taskbook.json` 的 `review_dimensions/3` 点名五个协同对象，此前两份正文与两个 viewer 都没有回答。本轮在正文第 3 章与两个 viewer 的 `#regional` 节各加一张五行矩阵：`RS01` 北纬社区、`RS02` 未来科学城、`RS03` 怀柔科学城、`RS04` 经开区、`RS05` 京津冀。

每行只允许说四件事：可能的关系（仅为提议）、仍需的证据、负责受理的审查层级、不确定性与主张限度。没有第五列可以放协议、线路、投资、承诺或实施事实，因为本包没有任何来源支持它们——`evidence_state` 记为 `taskbook_naming_only`，出处 `brief/site-package/agent_taskbook.json#/review_dimensions/3` 印在表下。任务书只发布中文名称，因此五个对象的英文名标明为工作译名，不是官方英文名。地理位置、距离与行政关系一律未写。

### 治理登记表从 `258` 行压成一张 `12` 行的决策表

`P00`–`P11` 的完整治理条款此前以散文形式铺在正文第 10 章，中英各 `258` 行，读者要在其中找一条停止条件需要翻十几屏。现在每种语言各 `23` 行：三段引言加一张 `12` 行 `7` 列的表，列为行动、阶段、责任角色、观察指标、停止条件、回滚或兜底、阻断门。

完整的十二项条款没有被删，仍在 `visual/assets/action-governance.json`；正文里明写了这一点并指出 `G01` 仍逐条校验全部十二项。压缩的是散文，不是契约。

`G01` 同时被加强而不是放松：它不再用子串扫一遍正文，而是从登记记录逐字重建表头、分隔行与十二行内容并要求逐字符相等，再检查表后第一行不得仍以 `|` 开头（防止悄悄多出一行），并要求正文点名 `visual/assets/action-governance.json` 这条路径。记录侧的旧断言全部保留：每个行动十二项条款中英俱全且非空、`authorized_target` 仍为 `null`、`blocked_by` 非空、阶段与行动登记表一致。实测 `actions 12`、`printed_columns 7`、两份正文 `register_rows` 各 `12`。

### 让 `CAS01` 不再自我确认

v0.4 的 `CAS01` 会重算数量并核对句子，但它检查的是「该说的话在不在」，不检查「不该说的话在不在」——把正文改成一句夸大，它不会响。本轮补上另一半。

- 数量仍从 `edges[]` 现算而不抄 `summary`：候选边 `24`、改变状态 `8`、零抖动持续 `11`、分歧带 `0`、最大 `|delta|` `0.546875`。
- 新增按语言的断言扫描：先按句读切分，带否定词的子句跳过，再在剩下的子句里找三类主张——被观测到的城市冲突、真实权衡、已获授权或已获资金——以及「某道具名门已关闭」的说法（门号与关闭动词须落在同一子句内）。任何一类命中即失败并回引原句。
- 新增真变异探针 `8` 处：两份 Markdown 各三条改写（把更正后的分歧边句改回观测冲突与真实权衡、把「未获授权与未获资金」改成已获授权并已获资金、把 `D12` 说成已关闭），加两条把某条零抖动持续边改判为分歧边、要求已发布的数量因此至少有一句不再成立。八处全部触发；任何一处不触发都会以「该扫描不可依赖」直接失败。
- 行动署名核验、`D12`／`D16` 仍开放、失效模式表 `7` 行其中 `5` 行有登记条款（`P02,P03,P08,P10,P11`）等原有不变式一条未减。

### 署名与生成声明同步更新

`report/copyright_statement.md` 补上 v0.5 的中英两段，按文件逐项列出本轮由 Claude Opus 5 直接撰写的内容：`regeneration-source.json` 的 `viewer_sections`（含 `task_coverage`）、`regional_synergy`、`ui_labels` 的 `regional` 与 `tasks`、`proposal_blocks` 两段；`action-governance.json` 的表头标签；`build-proposals.js` 与 `build-viewers.js` 的生成逻辑；`run-contract-tests.js` 中新增的 `PAR01`、被重写的 `G01`、被加强的 `CAS01`；两份正文的更正与新增段落、两个 viewer、两份 report HTML，以及本条账本记录与该声明段本身。v0.1–v0.3 归 OpenAI Codex、v0.4 的既有归属均未改动。该声明同时写明两份 report HTML 的行尾是渲染后被规范化的，这正是 `C10` 不勾选的原因，与下文一致。

### 本轮验收实测

最后一次改动之后按依赖顺序整体重建，随后全套复核，全部通过：

- `node --check` 全包 JavaScript `29` 个，语法失败 `0`；本轮未新增 `.js` 文件。
- 九个 builder 写入模式全部退出 `0` 且全部幂等：`changed_files` 全为 `0`，`build-plates` `ok:true`、`semantic_plates 15`、`artifacts 30`、`notdef_drawn 0`、`differences []`。四份 PDF 本轮字节未变。
- 九个 builder `--check` 模式全部退出 `0`、`changed_files` 全为 `0`。
- `run-contract-tests.js`：`PASS`，用例 `45`（内联 `31` + 模块 `14`），失败 `0`。较 v0.4 的 `44` 增加的是 `PAR01`。（本行的内联／模块拆分原写作「内联 `32` + 模块 `13`」，总数无误而拆分写反，由 v0.6 更正。）
- 复算器：`PASS`；篡改测试：`PASS`；清洁构建：`PASS`。十六个独立测试与复算器共 `17` 个脚本全部退出 `0`。
- 两个冻结 JSON 的 SHA-256 与账本记录逐字符相等：`physarum-inputs.json` `5e5a9be6…`、`physarum-runs.json` `ea93df30…`。`geometry/key_areas.geojson` 未改动。
- 展示面静态复核：两个 viewer 与两份 report HTML 各有 `<h1>` `1` 个；两个 viewer 各 `id` `59` 个、重复 `0`、`section` `15`、生成表 `12` 且全部具备可及名称与表头语义、`img` `20` 且空 `alt` `0`、远程资源引用 `0`、`<script>` `0`。
- Issue #1029 双语披露串逐字核对：中文串在 `proposal.md`、`report/proposal.html`、`visual/index.html` 各 `1` 次，英文串在三份英文对应件各 `1` 次，无跨语言泄漏；`area-plates.json` 中中英各 `5` 次不变。
- 编码与范围：文本文件 `67` 个，含 CR／BOM／NUL 或非 UTF-8 的 `0`；`git diff --check` 退出 `0` 且无输出；变更路径 `13`，包外变更 `0`。

### 本轮终点与未决事项

本节记录本轮实际做到的事，不扩大其范围。

**`C10` 仍不勾选，并记下阻碍原因。** 本轮运行了官方渲染脚本 `scripts/render_proposal_html.py`，两份 report HTML 由它生成，各含 `<h1>` `1` 个。但该脚本经由 `write_text_atomically` 用 Python 文本模式写文件，在本机 Windows 上因此输出 CRLF——这一点是实测的，不是推断：直接以同样方式写入 `a\nb\n` 得到的字节为 `a\r\nb\r\n`，`os.linesep` 为 `\r\n`。包内其余文件皆为 LF，且本轮被要求 `git diff --check` 干净，故渲染后将 `\r\n` 逐字节替换为 `\n`。也就是说，两份 report HTML 现在的 LF 字节来自渲染后的一次转换，而 `C10` 的验收要求「由官方渲染器直接产出、无渲染后规范化或手工编辑」。本轮不满足该条件，因此不勾选，也不以内容等价为由自行判定其成立。本机上没有让 CPython 文本模式原生输出 LF 的调用方式；若需要真正的 LF 原生渲染证据，应在 LF 原生环境中运行该脚本，或由维护者判断是否接受行尾差异。

`C08` 仍不勾选：`33` 条来源记录缺少真实取回时刻哈希，本轮一条也未获得，也不得合成。`C03`、`C05`、`C06`、`C09`、`C11`、`C12`、`C14` 全部保持不勾选，本轮没有为勾选而新建影子文件或改写其预先声明的验收条件。`C02`、`C04`、`C07` 保持勾选，本轮全套复核未出现回归，`C01` 实测 `closed_class_c` 恰为这三项。`H01` 保持关闭、不可勾选，证据指针与 `### H01 批准与提交授权记录` 一节未动。

`17` 个 D 类外部门在本轮结束时全部保持开放、无复选框、不可勾选。本轮所做的全部是包内实施与自证，其中没有任何一项构成外部或专业证据。所有现场行动与试点仍未获授权、未获资金。

本轮没有运行：`scripts/refresh_submission_manifest.py`、marked self-check、`scripts/participant_preflight.py`、严格验证器与 `finalize_submission.py`。`manifest.json` 与 `self_check.json` 因此仍是有意保留的陈旧生命周期制品，其哈希未经手工修改；本轮修改的 `13` 个文件在 `manifest.json` 中仍带改动前的哈希，等待官方刷新——这一点必须由维护者在最终序列中处理，不能沿用本账本作为已刷新的证据。本轮没有任何提交、暂存、推送、PR 创建/关闭/更新、fetch、merge 或 rebase，也没有触碰包外任何文件。

## v0.6 - 2026-08-16

本轮是针对 v0.5 的独立审计修复轮，逐条处理审计点名的六项缺陷。所有改动都在 `submissions/MartinForReal/adaptive-jingzhang/` 内，未新建任何文件，也未运行任何生命周期步骤。本轮的直接编辑运行使用本机 Claude Code `2.1.233`、`claude-opus-5`、最大推理强度；v0.2 记录的 `2.1.232` 是当时的事实，未改动。

### 消融复算此前不在聚合套件的判定路径上

审计给出的变异可以复现：把 `visual/assets/physarum-zero-jitter-ablation.json` 中 `E02` 的 `zero_jitter_frequency` 由 `0.96875` 改成 `0.953125`、`delta` 由 `0.25` 改成 `0.234375`，`run-contract-tests.js` 依然 `PASS`，而 `build-ablation.js --check` 正确地失败。原因是聚合套件读的是已发布的消融记录，`64` 次复算与冻结哈希比对只发生在 builder 内，没有任何一条用例调用它。

新增内联用例 `B04`：调用 `build-ablation.js --check`，要求退出 `0` 且 `changed:false`，并核对它自报的复算基数——种子 `64`、候选边 `24`、改变状态 `8`、最大 `|delta|` `0.546875`——以及它实际据以复算的两个冻结文件 SHA-256 与本套件钉住的值逐字符相等。

同一用例内嵌一条真变异探针，用的就是审计给出的那两处数值：builder、复算器、两个冻结资产与已发布的消融记录一并复制到临时目录，只改副本里的派生值，冻结输入与冻结运行记录一字不改，要求副本上的 `--check` 退出 `1` 且 `changed:true`；探针前后对包内这五个文件逐一取 SHA-256 比对，`package_files_unchanged` 为 `true`。实测 `fired:true`。另把审计的原始变异直接写回包内文件复核过一次：聚合套件此时 `FAIL`、`cases_failed 1`、`failed_ids ["B04"]`，复核后该文件已按原字节还原。

### 失效模式表：从「有这个编号」改成「逐格等于登记条款」

`CAS01` 此前只检查失效模式表的行数、动作集合与两栏非空。把某一行的停止条款换成别处的文字、或把 `P08` 与 `P10` 的归属对调，只要编号集合不变就查不出来。本轮把这张表改成逐格可判：

- 两份正文的表头改为「登记的征兆条款」／「登记的停止条款」，每个单元格先写明引用的是该项行动的哪个字段（观察指标、停止触发、提议目标、回滚），再逐字引用 `visual/assets/action-governance.json` 中该字段的原文；英文侧同样以 `Registered metric`、`Registered stop trigger`、`Proposed target`、`Rollback` 标名。
- `CAS01` 按五行的固定映射逐行核对：锁定→`P11`（征兆栏取观察指标、停止栏取提议目标）、级联→`P08`（停止触发／回滚）、指标俘获→`P03`（观察指标／提议目标）、排除固化→`P02`（停止触发／提议目标）、维护债→`P10`（停止触发／回滚）。单元格里印出来的字必须等于登记记录中该字段的文字，而不只是含有那个编号。
- 三条必须触发的新探针：改坏某一行的停止条款、改坏某一行的回滚条款、在保持聚合编号集合不变的前提下对调 `P08` 与 `P10` 两行的归属。三条在两种语言下各触发一次，两份正文的 `row_problems` 为 `0`。

第六、七两行仍不引用登记表：第六行是本方案在总体设计范围一章提出的运行规则、尚未登记为任何一项行动的条款，第七行是本包的构造纪律而不是现场条款；两行在表内写明了这一点，逐格契约只施加于前五行。

一处与审计用词的出入需要记下：审计把第四行称作「排斥固化」，而包内发布的行标签是「排除固化」／`Hardened exclusion`。本轮按包内已发布的标签实现契约，未改行名。

### 否定词曾是免检通行证

`CAS01` 的主张扫描按子句判定，此前遇到任一否定词就整句跳过。审计给出的英文句 `This is not only an observed conflict in Beijing.` 因此可以通过——`not only` 里含否定词 `not`，但整个词组的作用是承认后半句而不是否认它；中文的「不只是」「不仅」「并非仅仅」同理。

本轮把这类让步式否定从否定词表里摘出来：子句里出现 `not only`、`not merely`、`不只是`、`不仅`、`并非仅仅` 时不再当作否定，仍按肯定主张扫描。两条对应探针加入必触发清单（英文用审计给出的原句，中文用等义句），各按语言触发一次。合法的免责声明未受影响：更正后的分歧边段落与「未获授权与未获资金」等否定句仍然通过。

`CAS01` 现在共 `16` 处必触发探针（`8` 类 × 中英各一次），`probes_missed` 为空。

### 两个 viewer 在 390 CSS px 下的横向溢出

审计实测：`390×844` 视口下两个 viewer 的 `documentElement.clientWidth` 为 `375`、`scrollWidth` 为 `489`；`.table{table-layout:fixed}` 配合 `overflow-wrap:anywhere` 把八列的 `S01`–`S10` 表和五列的区域协同表压成每列一到四个字，整页高度约 `62,565px`。

修法分两侧。生成侧：`build-viewers.js` 的表格生成把每张表包进一个 `role="region"`、`tabindex="0"`、`aria-labelledby` 指向该表标题的横向滚动容器，并把列数以 `--table-columns` 写在 `<table>` 上。样式侧：删掉 `table-layout:fixed` 与单元格上的 `overflow-wrap:anywhere`，表宽改为 `min-width:calc(var(--table-columns,4) * 8.5rem)`，单元格恢复正常断词（`overflow-wrap:break-word`），滚动容器带 `overscroll-behavior-x:contain` 与 `:focus-visible` 的 `4px` 可见焦点框；`nav` 自身限宽并自带横向滚动。根元素没有加 `overflow:hidden`。

无头实测（Chromium，`390`／`768`／`1440` 三档）：两个 viewer 的根元素 `clientWidth` 与 `scrollWidth` 三档全部相等（`390/390`、`768/768`、`1440/1440`）；`390` 档整页高度中文页 `34,354px`、英文页 `44,820px`；每页 `12` 个滚动容器全部可由键盘到达、聚焦时 `outline` 为 `4px solid`、宽度均不超出视口，其中 `11` 个在该档需要横向滚动且确实可以滚动，余下一张两列表在 `390` 内完整可见；`prefers-reduced-motion` 规则仍在；`thead`／`tbody` 分组、`scope="col"` `54` 个、`scope="row"` `67` 个、无 `scope` 的 `<th>` `0` 个与每张表的可及名称均未受影响。

审计把溢出归因于粘性导航，这一点与实测不符，记在这里：逐条注释样式定位到的溢出源是 `#regional` 一节里的 `p.status`，其中 `brief/site-package/agent_taskbook.json#/review_dimensions/3` 是一个 `375px` 放不下且无处可断的连续串，该段现在带 `overflow-wrap:anywhere`。导航限宽仍按要求实现，只是它不是原因。

### 十二张生成表各自有名字

三个重点区域各出两张表，此前中文页三张只叫「构件」、三张只叫「提议的无障碍连续路径」，英文页同理。屏幕阅读器的表格列表里因此出现三个同名条目，选中哪一个都无从判断。

`build-viewers.js` 现在把区域名写进每张表的可见标题，例如「众智园AI自主创新加速区 · 构件」与 `Dazhongsi AI Industry Cluster · Proposed step-free chains`。builder 的 `--check` 侧新增断言：解析每张生成表 `aria-labelledby` 目标的文本，`12` 张表的名称必须两两不同，滚动容器与 `<table>` 必须指向同一个标题，声明的列数必须等于实际印出的表头数。`PAR01` 独立复算同一批性质并新增三条探针：把某张表移出滚动容器、让某张表多声明一列、把两个重点区域的表名改成同一个；三条全部触发。

实测两个 viewer 各 `generated_tables 12`、`distinct_table_names 12`；无头侧 `distinctRegionNames 12`、`distinctTableNames 12`、空名称 `0`。

### 区域协同：把「受理」降回「待确认的提议」

`RS01`–`RS05` 五行此前有一列叫「负责受理的审查层级」，单元格写「市级科技主管部门受理」。在本包没有任何制度安排证据的情况下，这是在指派职责，与该表自身的 `evidence_state: taskbook_naming_only` 相矛盾。

该列改名为「拟议审核路径（待确认）」／`Proposed review route requiring confirmation`，五行措辞一律改为「须经确认，并由……受理；本方案无权指定受理机构。」／`Would require confirmation and receipt by …; this proposal cannot name the receiving body.`，表引言另加一句「本表不指定任何机构的受理职责。」／`No row assigns a receiving duty to any body.`。五个协同对象（`RS01` 北纬社区、`RS02` 未来科学城、`RS03` 怀柔科学城、`RS04` 经开区、`RS05` 京津冀）、证据要求、责任与主张限度一栏、中英条数与顺序均不变。

改动只做在权威记录 `visual/assets/regeneration-source.json` 上，两份正文与两个 viewer 由 builder 重新生成，两份 report HTML 由官方渲染脚本从更正后的 Markdown 重新生成。全包扫描：「负责受理的审查层级」在正文、报告与 viewer 中命中 `0` 处，仅余本账本 v0.5 一节的历史记录；「须经确认」句式在中文三面各 `5` 处，`Would require confirmation and receipt by` 在英文三面各 `5` 处。`PAR01` 的双语字段比对按 `_zh`／`_en` 键取字段，改名后自动覆盖，无需另加规则。

### 署名、版本与一处历史计数更正

`report/copyright_statement.md` 补上 v0.6 的中英两段，按文件列出本轮由 Anthropic Claude Opus 5 直接撰写的内容。

v0.5 验收记录里「用例 `45`（内联 `32` + 模块 `13`）」的拆分写错了：向聚合套件注册用例的模块一直是 `14` 个（`visual/assets/` 下十六个 `test-*.js` 中有十四个注册用例，另两个是清洁构建与篡改测试，单独运行），当时的内联用例是 `31` 条。总数 `45` 无误，本轮只更正拆分并在该行标注。

### 本轮验收实测

最后一次改动之后按依赖顺序整体重建，随后全套复核，全部通过：

- `node --check` 全包 JavaScript `29` 个，语法失败 `0`；本轮未新增文件。
- 九个 builder 写入模式全部退出 `0` 且全部幂等；`--check` 模式同样全部退出 `0`，报告 `changed` 的四个全为 `false`、报告 `changed_files` 的四个全为 `0`，`build-plates` `ok:true`、`semantic_plates 15`、`artifacts 30`、`notdef_drawn 0`、`differences []`。四份 PDF 本轮字节未变。
- `run-contract-tests.js`：`PASS`，用例 `46`（内联 `32` + 模块 `14`），失败 `0`。较 v0.5 的 `45` 增加的是 `B04`。
- `B04` 的消融漂移探针 `fired:true`（`exit_code 1`、`changed:true`、`package_files_unchanged:true`）；`CAS01` `probes_fired 16`、`probes_missed []`、两份正文 `row_problems 0`、登记条款行 `5` 行（`P02,P03,P08,P10,P11`）；`PAR01` `families 6`、`records 35`、`probes 12`、`probes_missed 0`。
- 十六个独立测试与复算器共 `17` 个脚本全部退出 `0`；复算器 `PASS`、篡改测试 `PASS`、清洁构建 `PASS`。
- 两个冻结 JSON 的 SHA-256 与账本记录逐字符相等：`physarum-inputs.json` `5e5a9be6…`、`physarum-runs.json` `ea93df30…`。`geometry/key_areas.geojson` 未改动，`PROV-KEY-001`–`PROV-KEY-003` 保留。
- 展示面静态复核：两个 viewer 与两份 report HTML 各有 `<h1>` `1` 个；两个 viewer 各 `id` `59` 个、重复 `0`、`section` `15` 节、生成表 `12` 张且各在自己的滚动容器内、`12` 个可及名称互不相同、`scope="col"` `54`、`scope="row"` `67`、无 `scope` 的 `<th>` `0` 个、`img` `20` 且空 `alt` `0`、远程资源引用 `0`、`<script>` `0`。
- 无头浏览器实测（`390`／`768`／`1440` 三档）：两个 viewer 的根元素 `clientWidth` 与 `scrollWidth` 三档全部相等。
- Issue #1029 双语披露串逐字核对：中文串在 `proposal.md`、`report/proposal.html`、`visual/index.html` 各 `1` 次，英文串在三份英文对应件各 `1` 次，无跨语言泄漏；`area-plates.json` 中中英各 `5` 次不变。
- 编码与范围：文本文件 `67` 个，含 CR／BOM／NUL 或非 UTF-8 的 `0`；`git diff --check` 退出 `0` 且无输出；变更路径 `13`，包外变更 `0`。

### 本轮终点与未决事项

本节记录本轮实际做到的事，不扩大其范围。

`C10` 仍不勾选，原因与 v0.5 一节所记完全相同且本轮再次实测：两份 report HTML 由官方渲染脚本 `scripts/render_proposal_html.py` 生成，但该脚本在本机 Windows 上经由 Python 文本模式输出 CRLF，本轮渲染后仍需把 `\r\n` 逐字节替换为 `\n`，因此不满足「由官方渲染器直接产出、无渲染后规范化」的验收条件。

`C08` 仍不勾选：`33` 条来源记录缺少真实取回时刻哈希，本轮一条也未获得，也不得合成。`C01`、`C03`、`C05`、`C06`、`C09`、`C11`、`C12`、`C13`、`C14` 全部保持不勾选。`C02`、`C04`、`C07` 保持勾选，本轮全套复核未出现回归；契约用例 `C01`（与同名任务无关，它审计的是本账本自身）实测 `closed_class_c` 恰为这三项、`class_c 14`、`class_d 17`。`H01` 保持关闭、不可勾选，其证据指针与 `### H01 批准与提交授权记录` 一节未动。

`17` 个 D 类外部门在本轮结束时全部保持开放、无复选框、不可勾选。本轮所做的全部是包内实施与自证，其中没有任何一项构成外部或专业证据；所有现场行动与试点仍未获授权、未获资金。关于大钟寺的车站关系、出入口、轨道、道路、路口、地块、门、标高、结构、首层、现状使用、消防、安装、修复能力与承载力，本轮未新增任何肯定性主张。

本轮没有运行：`scripts/refresh_submission_manifest.py`、marked self-check、`scripts/participant_preflight.py`、严格验证器与 `finalize_submission.py`。`manifest.json` 与 `self_check.json` 因此仍是有意保留的陈旧生命周期制品，其哈希未经手工修改；本轮修改的 `13` 个文件在 `manifest.json` 中仍带改动前的哈希，等待官方刷新，不能沿用本账本作为已刷新的证据。本轮没有任何提交、暂存、推送、PR 创建/关闭/更新、fetch、merge 或 rebase，也没有触碰包外任何文件。

## v0.7 - 2026-08-16

### Claude Opus 5 双语 viewer 可访问性与加载修复

本轮 viewer 直接编辑使用本机 Claude Code `2.1.233`、`claude-opus-5`、最大推理强度、自动上下文压缩、动态工作流提示与 bypass permission 模式完成；随后由 Codex 和独立审计复核生成契约，并加固 `UI01` 回归测试。改动仅涉及双语 viewer 的生成器、聚合契约测试及两份生成 HTML，不改变设计几何、指标、来源、重点区边界或大钟寺声明上限。

两份 viewer 的粘性导航触点均不小于 `48 × 48 px`；导航保持在 viewport 内，并在窄屏上仅由自身承担横向滚动。生成器直接读取每张 PNG 的 IHDR 物理尺寸并写入 `width`／`height`，每页恰有 `20` 张图：首张 hero 为唯一的 `loading="eager"`、`fetchpriority="high"` 图，其余 `19` 张为 `loading="lazy"`，全部 `20` 张均使用 `decoding="async"`。生成器同时拒绝远程 URL 与 protocol-relative 图像源，中英文样式、结构与行为保持对称。

发布图像清单现被 `UI01` 按顺序完整冻结为：`3` 张主框架图、`15` 张语义重点区图版、`2` 张最终交通／指标图，共 `20` 个互不重复的本地源；双语清单与实际发布顺序逐字节一致。`UI01` 现有 `19` 个变异探针，包含对称删除以及保持总数不变的对称替换，实跑 `probes_missed: 0`。

未引入 Web font：包内不存在同时满足浏览器可用性与来源可安全证明要求的本地字体文件，因此继续使用离线系统字体栈，不虚构字体来源或授权。

### 浏览器与确定性验证

Playwright 对中文、英文两页分别在 `390 × 844`、`768 × 1024`、`1440 × 1000` 三个 viewport 实测，共 `6/6` 组合通过。六组均为 HTTP `200`，document 横向溢出为 `0`；粘性导航到达 `top: 0` 且保持 viewport-contained；每页均为 `20` 张完整加载图像、`1` 张 eager/high-priority hero、`19` 张 lazy 图像、`20` 个 async decode，物理尺寸与声明尺寸不一致为 `0`，破图、空 alt 与外部请求均为 `0`。

每页 `12` 个表格滚动区均具有互不重复的可访问名称、正确的 `aria-labelledby`、行列计数、表头 scope 与键盘焦点；`12/12` 个区域的 `4 px` focus ring 可见，宽表只在本地容器内滚动而不推动 document。`prefers-reduced-motion` 下 `scroll-behavior: auto` 且无活动动画。六组测试的 console warning、console error、page error 均为 `0`，滚动经过全部 lazy 图像后观测 CLS 仍为 `0`。

九个 builder 均已在写入模式通过且未产生额外差异，并在 `--check` 模式保持确定性：`build-sources.js`、`build-standards.js`、`build-geometry.js`、`build-ablation.js`、`build-matrices.js`、`build-proposals.js`、`build-plates.js`、`build-viewers.js`、`build-drawings.js`。最新聚合契约结果为 `47/47 PASS`、`cases_failed: 0`；`UI01 expected_images: 20`、`probes: 19`、`probes_missed: 0`。`reproduce_physarum.js` 独立实跑及聚合套件均报告 `comparisons: 633`、`derived_metrics: 7`、`mismatch_count: 0`，冻结输入与运行哈希仍分别为 `5e5a9be65bb122617798bf488f12fc5838dfba46aead6d824b679b48db718d53` 与 `ea93df307c30bd90024438ed1dc4704a4e7bec8f4b456a7ec323c914ea4e06fe`。

十六个独立契约脚本也全部退出 `0`：大钟寺主张上限、分母纪律、英文完整性、证据解析、门名称空间、重点区清单／登记／空间内容、阶段问责、发布一致性、来源规范化、无台阶链、阈值量化、冬季运维、清洁构建与复算器篡改拒绝均为 `PASS`。全包 `29` 个 JavaScript 文件通过 `node --check`，语法失败 `0`。

### TODO、外部门与授权边界

Class C 勾选状态不因本轮 viewer 修复扩大：已勾选仍恰为 `C02 C04 C07`；保持开放的是 `C01 C03 C05 C06 C08 C09 C10 C11 C12 C13 C14`。

`C08` 保持开放：仍有 `33` 条 URL-only 来源记录没有真实 retrieval-time SHA-256，本轮没有取得这些哈希，也不得合成。`C09` 保持开放：规范制品按既定生命周期删除后，原验收条件要求的历史“从零建立字体载体”过程已无法由现存制品完整核验，不据当前 PDF 状态倒推勾选。`C10` 保持开放：Windows 上的官方 renderer 仍直接输出 CRLF；随后规范化为 LF 不能证明 renderer 本身直接产生 LF。

`D01–D17` 全部保持开放且不可勾选；本轮不关闭任何专业、现场、权属、交通、运维、资金或公共授权门。所有现场行动和 pilot 仍未获授权且未获资金。`H01` 保持关闭但不可勾选，其范围仍仅以既有「H01 批准与提交授权记录」为准。本节只记录本地设计与验证事实，不作为 CI、推送、PR、合并或任何外部门关闭的证据。
