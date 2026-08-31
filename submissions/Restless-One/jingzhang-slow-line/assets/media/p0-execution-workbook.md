# P0-ALL-STOP-01 双语专业执行工作簿 / Bilingual Professional Execution Workbook

版本 / Version: `v1.5-professional-handoff`
对象 / Object: `P0-ALL-STOP-01`
当前状态 / Current state: `NOT_AUTHORIZED · HOLD · blank forms · no executed evidence`

本工作簿把《京张慢线》的设计控制转换为专业团队可以填写、签认和附证据的工作面。它目前是空表，不证明场地、权属、现场基线、实名主体、专业意见、成本、采购、授权或实施结果已经取得。任何空项必须保持 `TBC/HOLD`，不得由包内演练、合成人物或其他指标平均替代。

This workbook converts the Slow Line design controls into surfaces that competent teams can complete, sign and attach evidence to. It is currently blank and proves no site, right, field baseline, named party, professional opinion, cost, procurement, authorization or implementation result. Every blank remains `TBC/HOLD` and cannot be replaced by package rehearsals, synthetic personas or averaging from other indicators.

## 统一记录字段 / Common record fields

每份执行副本都必须包含以下 18 项；缺少版本、来源、方法、权利边界、独立复核或签认时，不得改变 Gate 或外部决策包状态。

Every executed copy must contain these 18 fields. Missing version, source, method, rights boundary, independent review or sign-off cannot change any gate or external decision-bundle state.

| 字段 / Field | 值 / Value |
| --- | --- |
| `record_id` | TBC |
| `artifact_id` | TBC |
| `gate_or_bundle_id` | TBC |
| `version` | TBC |
| `captured_at` | TBC |
| `source_party` | TBC |
| `source_uri` | TBC |
| `method` | TBC |
| `sample_scope` | TBC |
| `limitations` | TBC |
| `missingness` | TBC |
| `rights_basis` | TBC |
| `privacy_publication_class` | TBC |
| `conflict_of_interest` | TBC |
| `independent_reviewer` | TBC |
| `disposition` | TBC |
| `signatory` | TBC |
| `sha256` | TBC |

## `EX-01` 候选载体调查与证据请求 / Candidate Carrier Survey and Evidence Request

责任槽位 / Role slots: `A-P0-RIGHTS + R-P0-SURVEY`
对应外部决策 / Decision bundle: `B-EXT-02`
未完成状态 / Incomplete state: `HOLD`

| 记录项 / Record item | 现场或文件证据 / Field or documentary evidence | 状态 / State |
| --- | --- | --- |
| `candidate_id`、载体名称与版本 | TBC | HOLD |
| 调查许可、进入范围与限制 | TBC | HOLD |
| 坐标系、日期、仪器与精度 | TBC | HOLD |
| 实测边界、标高、坡度与障碍 | TBC | HOLD |
| 权利方、占用、运营与处置权限 | TBC | HOLD |
| 文保、铁路与建设控制适用性 | TBC | HOLD |
| 现状应急/消防路线及净宽 | TBC | HOLD |
| 管线、电力、照明与数据接口 | TBC | HOLD |
| 排水、积水、出水口与恢复基线 | TBC | HOLD |
| 结论：继续、缩小、换址或停止 | TBC | HOLD |

签认 / Sign-off: 场地权利责任 `__________`；测绘/记录 `__________`；独立复核 `__________`；日期 `__________`

## `EX-02` 责任接受、权限边界与利益冲突 / Responsibility Acceptance, Authority Boundary and Conflict

责任槽位 / Role slots: `A-P0-RIGHTS + R-P0-EXEC + R-P0-EVAL`
对应外部决策 / Decision bundles: `B-EXT-01 + B-EXT-03`
未完成状态 / Incomplete state: `HOLD`

| 角色与主体 / Role and party | 姓名/机构 / Name or organization | 胜任依据 / Competence | 决定权限 / Decision authority | 立即停止权 / Immediate stop | 接受/拒绝 / Accept or refuse |
| --- | --- | --- | --- | --- | --- |
| 场地/委托责任 | TBC | TBC | TBC | TBC | HOLD |
| 执行统筹 | TBC | TBC | TBC | TBC | HOLD |
| 付费无障碍共同设计 | TBC | TBC | TBC | TBC | HOLD |
| 人工服务与接管 | TBC | TBC | TBC | TBC | HOLD |
| 当班安全/隐私 | TBC | TBC | TBC | TBC | HOLD |
| 独立评估 | TBC | TBC | TBC | TBC | HOLD |
| 安装、维护与恢复 | TBC | TBC | TBC | TBC | HOLD |

必须附：授权范围、委派限制、服务时窗、热备覆盖、保险、利益冲突、供应商独立性和签字。供应商不得自行完成独立评估。

Attach authority scope, delegation limit, service window, backup coverage, insurance, conflict declaration, supplier independence and signatures. A supplier cannot substitute for independent evaluation.

## `EX-03` D0 基线、数据字典与缺失值 / D0 Baseline, Data Dictionary and Missingness

责任槽位 / Role slots: `R-P0-CODESIGN + R-P0-SERVICE + R-P0-EVAL`
对应外部决策 / Decision bundle: `B-EXT-01`
未完成状态 / Incomplete state: `HOLD`

| 字段 / Field | 记录 / Record |
| --- | --- |
| 真实任务、开始事件与结束事件 | TBC |
| 群体/队列及付费共同设计方式 | TBC |
| 同一任务人工、纸本或电话 D0 基线 | TBC |
| 分子、分母、时长和单位 | TBC |
| 知情同意、拒绝、退出和删除 | TBC |
| 缺失值代码及不纳入理由 | TBC |
| 安全关键失败定义 | TBC |
| 逐组结果；禁止只报总体平均 | TBC |
| 使用者/无障碍代表复核 | TBC |

预登记规则：轮椅、低视力/盲人、无智能手机老人及需要真人响应者必须分别报告。任一群体发生安全关键失败、等价服务缺失或无法退出，整体保持 `HOLD`。

Preregistration rule: wheelchair users, blind/low-vision users, older people without smartphones and people needing human response are reported separately. A safety-critical failure, missing equivalent service or failed exit in any group keeps the whole unit on `HOLD`.

## `EX-04` 工程量、成本依据与非约束采购包 / Quantity, Cost Basis and Non-binding Procurement Pack

责任槽位 / Role slots: `R-P0-EXEC + R-P0-INSTALL + A-P0-RIGHTS`
对应外部决策 / Decision bundle: `B-EXT-04`
未完成状态 / Incomplete state: `HOLD`

| `boq_id` / 费用类 | 核实数量 | 计量方法 | 单价与来源 | 基准日/税费 | CAPEX/OPEX | 复核/签认 |
| --- | ---: | --- | --- | --- | --- | --- |
| `P0-Q01`—`P0-Q16` | TBC | TBC | TBC | TBC | TBC | HOLD |
| 人工服务与热备 | TBC | TBC | TBC | TBC | TBC | HOLD |
| 付费共同设计与独立评测 | TBC | TBC | TBC | TBC | TBC | HOLD |
| 维护、备件与停线 | TBC | TBC | TBC | TBC | TBC | HOLD |
| 拆除、运输、废弃物与恢复 | TBC | TBC | TBC | TBC | TBC | HOLD |

ROM 三档仅可在同范围、同日期、清权且可比的成本依据到位后计算。正式估算、采购、税费、资金与恢复储备均须另行签放。

ROM scenarios can only be calculated after comparable, rights-cleared cost bases for the same scope and date exist. Formal estimate, procurement, tax, funding and restoration reserve require separate release.

## `EX-05` 专业复核、门槛与验收 / Professional Review, Gate and Acceptance

责任槽位 / Role slots: accessibility, traffic, fire, structure, electrical, drainage, equipment, lighting
对应外部决策 / Decision bundle: `B-EXT-02`
未完成状态 / Incomplete state: `HOLD`

| 专业 / Discipline | 适用标准与版本 | 复核范围 | 发现/条件 | 指标与阈值 | 决定 | 复查日期 | 签认 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 无障碍与共同设计 | TBC | TBC | TBC | TBC | HOLD | TBC | TBC |
| 交通与慢行冲突 | TBC | TBC | TBC | TBC | HOLD | TBC | TBC |
| 消防、应急与疏散 | TBC | TBC | TBC | TBC | HOLD | TBC | TBC |
| 结构、风雪与临时固定 | TBC | TBC | TBC | TBC | HOLD | TBC | TBC |
| 电气、照明与隔离 | TBC | TBC | TBC | TBC | HOLD | TBC | TBC |
| 标高、地面与排水 | TBC | TBC | TBC | TBC | HOLD | TBC | TBC |
| 设备停止、制动与救援 | TBC | TBC | TBC | TBC | HOLD | TBC | TBC |
| 隐私、安全与事件处置 | TBC | TBC | TBC | TBC | HOLD | TBC | TBC |

### 容量与疏散 / Capacity and egress

```text
允许同时使用人数 = min(
  实测净面积 ÷ 经确认的人均面积,
  消防/生命安全核定容量,
  无障碍服务位容量,
  已落实岗位覆盖容量
)
```

| 输入 / Input | 当前值 / Current value |
| --- | --- |
| 实测净面积 / surveyed net area | null / HOLD |
| 经确认的人均面积 / approved occupant factor | null / HOLD |
| 消防核定容量 / approved fire-life-safety capacity | null / HOLD |
| 无障碍服务位容量 / accessible-service-position capacity | null / HOLD |
| 已落实岗位覆盖容量 / staffed-role coverage capacity | null / HOLD |
| 计算容量 / calculated capacity | null / HOLD |
| 概念独立退出路径 / concept independent egress routes | 2（设计测试，不是核定） |
| 现场核实独立退出路径 / field-verified routes | 0 / HOLD |
| 核实净宽 / verified clear width | null / HOLD |

## `EX-06` 复演、维护、停止与退出交接 / Rehearsal, Maintenance, Stop and Exit Handover

责任槽位 / Role slots: `R-P0-SAFETY + R-P0-SERVICE + R-P0-MAINTENANCE + R-P0-INSTALL + R-P0-EVAL`
对应外部决策 / Decision bundles: `B-EXT-03 + B-EXT-04`
未完成状态 / Incomplete state: `HOLD`

| 复演事件 / Rehearsal event | 实际记录 / Executed record | 独立观察 / Independent observation | 结论 / Decision |
| --- | --- | --- | --- |
| success / 正常完成 | TBC | TBC | HOLD |
| refusal / 拒绝与理由回执 | TBC | TBC | HOLD |
| human_takeover / 真人接管 | TBC | TBC | HOLD |
| malformed_input / 错误输入阻断 | TBC | TBC | HOLD |
| stop_and_incident / 停止与事件 | TBC | TBC | HOLD |
| exit_restoration / 退出恢复 | TBC | TBC | HOLD |

维护周期 / Maintenance cycles:

| 周期 | 检查范围 | 决定 | 当前状态 |
| --- | --- | --- | --- |
| 每次开放前 | 净空、急停、有人渠道、纸本/电话、状态牌 | open / HOLD | template only |
| 每周 | 固定、照明、排水、备件、投诉和未闭缺陷 | continue / repair / HOLD | template only |
| 每季度或重大变化后 | 独立无障碍、安全、隐私、运营与故障复核 | continue / revise / stop | template only |
| 每年或续期前 | 全寿命成本、公共价值、主体接受与恢复 | renew / reduce / remove / restore | template only |

恢复储备 / Restoration reserve:

```text
恢复储备 = 经核可拆 CAPEX × 10%–20%
         + 场地专项恢复
         + 拆除运输
         + 废弃物处理
         + 独立收口复验
```

当前经核 CAPEX、场地恢复金额、资金责任和独立签放均为 `null/HOLD`；参数范围不代表已拨或已锁定资金。

## `EX-07` 进度、RAID 与变更控制 / Programme, RAID and Change Control

责任槽位 / Role slots: `R-P0-EXEC + A-P0-RIGHTS + R-P0-EVAL`
对应外部决策 / Decision bundle: `B-EXT-04`
未完成状态 / Incomplete state: `HOLD`

| ID | 类型 / Type | 描述 / Description | Owner | 计划/实际日期 | 影响 | 决定/批准 | 状态 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TBC | dependency | TBC | TBC | TBC | TBC | TBC | HOLD |
| TBC | risk | TBC | TBC | TBC | TBC | TBC | HOLD |
| TBC | assumption | TBC | TBC | TBC | TBC | TBC | HOLD |
| TBC | issue | TBC | TBC | TBC | TBC | TBC | HOLD |
| TBC | decision | TBC | TBC | TBC | TBC | TBC | HOLD |
| TBC | change | TBC | TBC | TBC | TBC | TBC | HOLD |

任何变更都必须记录受影响的图纸、BOQ、任务、验收、成本、许可、双语成果和被替代版本；只改截图或只改一个派生文件不得收口。

Every change records affected drawings, BOQ, tasks, acceptance, cost, permission, bilingual outputs and superseded versions. A screenshot-only or single-derived-file change cannot close out.

## 四组外部决策收束 / Four external decision bundles

底层 12 项现场指标和 12 道外部门全部保留；本表仅为专业决策入口聚合，不减少证据要求。

All twelve raw field metrics and twelve external gates remain. This table only aggregates professional decision entry points and removes no evidence requirement.

| 决策包 | 底层指标 | 外部门 | 所需表单 | 当前状态 |
| --- | --- | --- | --- | --- |
| `B-EXT-01` 真实使用者与同任务人工基线 | `P0-B01—B04, B10` | `DG03` | `EX-02, EX-03` | HOLD |
| `B-EXT-02` 场地、容量疏散与专业条件 | `P0-B05—B09` | `DG01,02,04—07` | `EX-01, EX-05` | HOLD |
| `B-EXT-03` 运营覆盖、设备停止与独立复演 | `P0-B11` | `DG08—10` | `EX-02, EX-06` | HOLD |
| `B-EXT-04` 真实成本、授权与退出交接 | `P0-B12` | `DG11—12` | `EX-04, EX-06, EX-07` | HOLD |

执行副本只有在完整填写统一记录字段、附可追溯证据并由相应决定责任和独立复核签认后，才可从 `HOLD` 进入 `go / revise / stop` 判断；工作簿自身永远不能自动放行。
