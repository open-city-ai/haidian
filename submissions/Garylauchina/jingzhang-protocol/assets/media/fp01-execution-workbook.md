# FP01 双语执行工具包 / FP01 Bilingual Execution Workbook

> 状态 / Status: `blank_execution_templates_unexecuted`
> 版本 / Version: `v0.15`
> 本工作簿是七类空白执行表，不是现场、成本、采购、专业审查、授权或实施记录。 / This workbook contains seven blank execution forms; it is not a site, cost, procurement, professional-review, authorization, or implementation record.

## 使用与证据边界 / Use and evidence boundary

- 执行前复制母版并填写记录实例编号与版本；不得覆盖空白母版。 / Copy the master and assign an instance ID and version before execution; do not overwrite the blank master.
- 所有待填值初始为 `null / unknown`。`unknown` 必须说明原因、责任人、处置与复核，且永不等于通过。 / Every input starts as `null / unknown`. Unknown requires a reason, owner, disposition, and review, and never means pass.
- 缺失、过期或矛盾的权利、安全、预算、采购或开放记录，使相应门槛保持 `HOLD / STOP`。 / Missing, expired, or contradictory rights, safety, budget, procurement, or release evidence keeps the gate at `HOLD / STOP`.
- 合成示例必须标记 `synthetic_fixture_not_observed`，并排除在现场样本、实测值、通过率、成本和实施指标之外。 / Synthetic examples must be marked `synthetic_fixture_not_observed` and excluded from field sample, observed-value, pass-rate, cost, and implementation metrics.

## 每份执行副本的统一元数据 / Common metadata for every executed copy

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `record_instance_id` | 执行记录实例编号 | Execution-record instance ID | `text` | `null / unknown` |
| `record_version` | 执行记录版本 | Execution-record version | `text` | `null / unknown` |
| `record_date` | 记录日期 | Record date | `date` | `null / unknown` |
| `preparer_name_and_role` | 填报人姓名与角色 | Preparer name and role | `text` | `null / unknown` |
| `method_and_sample` | 方法与样本说明 | Method and sample statement | `text` | `null / unknown` |
| `limitations_and_missingness` | 局限、偏差与缺失说明 | Limitations, bias, and missingness statement | `text` | `null / unknown` |
| `source_and_evidence_refs` | 来源与证据索引 | Source and evidence references | `list` | `null / unknown` |
| `rights_and_publication_class` | 权利、隐私与公开等级 | Rights, privacy, and publication class | `text` | `null / unknown` |
| `independent_reviewer_and_conflict` | 独立复核人及利益冲突说明 | Independent reviewer and conflict statement | `text` | `null / unknown` |
| `record_disposition` | 记录处置 | Record disposition | `enum_accept_revise_reject_hold_stop_unknown` | `null / unknown` |
| `accountable_signoff` | 责任主体签署 | Accountable sign-off | `signature` | `null / unknown` |
| `signoff_date` | 签署日期 | Sign-off date | `date` | `null / unknown` |

统一元数据适用于下列每一份表单副本；缺少来源、权利等级、独立复核、处置或签署时，该记录不得支持门槛放行。 / Common metadata applies to every form copy. A record missing source, rights class, independent review, disposition, or sign-off cannot support gate release.

## `EX-01` 候选载体现场调查与证据请求表 / Candidate Carrier Survey and Evidence Request

- 适用门槛 / Applicable gates: `H0`, `H1`, `H2`
- 控制索引 / Control references: `FP01-EVIDENCE-READINESS-001`, `FP01-DELIVERY-CONTROL-001`
- 完成规则：测量、权属、许可、照片权利、消防、无障碍和专业复核均须有可核验来源；任一关键项缺失即不得进入现场安装。
- Completion rule: Measurements, control, permission, image rights, life safety, accessibility, and professional review require verifiable sources; a missing critical item blocks site installation.

### `EX-01-A` 记录与位置 / Record and location

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `carrier_candidate_id` | 候选载体编号 | Candidate carrier ID | `text` | `null / unknown` |
| `survey_record_version` | 调查记录版本 | Survey record version | `text` | `null / unknown` |
| `survey_date` | 现场调查日期 | Survey date | `date` | `null / unknown` |
| `coordinate_or_location_reference` | 坐标或位置索引 | Coordinate or location reference | `reference` | `null / unknown` |
| `survey_team_role_classes` | 调查团队角色类别 | Survey team role classes | `list` | `null / unknown` |
| `source_record_reference` | 原始记录索引 | Source record reference | `reference` | `null / unknown` |

### `EX-01-B` 实测条件 / Measured conditions

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `measured_boundary` | 实测边界 | Measured boundary | `geometry_or_reference` | `null / unknown` |
| `measured_dimensions` | 实测尺寸及方法 | Measured dimensions and method | `text` | `null / unknown` |
| `access_points` | 到达与入口条件 | Access and entry conditions | `text` | `null / unknown` |
| `egress_paths` | 疏散路径与阻碍 | Egress paths and obstructions | `text` | `null / unknown` |
| `approved_life_safety_occupancy` | 经核定生命安全容量 | Approved life-safety occupancy | `integer_or_reference` | `null / unknown` |
| `surveyed_accessible_positions` | 实测无障碍服务位置数 | Surveyed accessible service positions | `integer` | `null / unknown` |
| `utilities_and_power` | 市政与供电条件 | Utilities and power conditions | `text` | `null / unknown` |
| `connectivity_conditions` | 网络与通信条件 | Connectivity conditions | `text` | `null / unknown` |
| `heritage_and_planning_constraints` | 遗产与规划限制 | Heritage and planning constraints | `text` | `null / unknown` |
| `existing_asset_condition` | 既有资产状况 | Existing asset condition | `text` | `null / unknown` |
| `site_photo_evidence_refs` | 现场照片证据索引 | Site photo evidence references | `list` | `null / unknown` |

### `EX-01-C` 权属、许可与处置 / Control, permissions, and disposition

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `owner_or_site_controller` | 所有权人或场地控制主体 | Owner or site controller | `text` | `null / unknown` |
| `ownership_or_control_evidence_ref` | 权属或控制证据索引 | Ownership or control evidence reference | `reference` | `null / unknown` |
| `site_use_permission_ref` | 场地使用许可索引 | Site-use permission reference | `reference` | `null / unknown` |
| `photo_publication_rights_ref` | 照片采集与公开权利索引 | Photo capture and publication rights reference | `reference` | `null / unknown` |
| `data_collection_rights_ref` | 数据采集权利索引 | Data-collection rights reference | `reference` | `null / unknown` |
| `survey_deviations_and_missingness` | 调查偏差与缺失项 | Survey deviations and missingness | `text` | `null / unknown` |
| `professional_reviewer_name_and_qualification` | 专业复核人及资格 | Professional reviewer and qualification | `text` | `null / unknown` |
| `professional_review_report_ref` | 专业复核报告索引 | Professional review report reference | `reference` | `null / unknown` |
| `h1_disposition` | H1 处置 | H1 disposition | `enum_go_revise_stop_unknown` | `null / unknown` |
| `accountable_signature` | 责任人签署 | Accountable signature | `signature` | `null / unknown` |
| `decision_date` | 决定日期 | Decision date | `date` | `null / unknown` |

## `EX-02` 责任接受、授权边界与利益冲突表 / Responsibility Acceptance, Authority Boundary, and Conflict Form

- 适用门槛 / Applicable gates: `H0`, `H1`, `H2`, `H3`, `H4`
- 控制索引 / Control references: `FP01-DELIVERY-CONTROL-001.hold_point_raci`
- 完成规则：每一 H0—H4 决策角色及必要会签角色均须明确接受职责、权限和服务覆盖；静默、邮件抄送或职务推定不构成接受。
- Completion rule: Every H0-H4 decision role and required cosignatory must explicitly accept duties, authority, and service coverage; silence, copied email, or inferred office does not constitute acceptance.

### `EX-02-A` 主体与授权 / Party and authority

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `role_class` | 角色类别 | Role class | `text` | `null / unknown` |
| `applicable_gate_ids` | 适用门槛编号 | Applicable gate IDs | `list` | `null / unknown` |
| `organization_name` | 机构名称 | Organization name | `text` | `null / unknown` |
| `person_name` | 具名责任人 | Named accountable person | `text` | `null / unknown` |
| `authority_basis_ref` | 授权依据索引 | Authority basis reference | `reference` | `null / unknown` |
| `accepted_duties` | 明确接受的职责 | Explicitly accepted duties | `text` | `null / unknown` |
| `excluded_duties` | 不接受或排除的职责 | Excluded or declined duties | `text` | `null / unknown` |
| `delegation_limit` | 委托与转授权边界 | Delegation and sub-delegation limit | `text` | `null / unknown` |

### `EX-02-B` 运行覆盖与冲突 / Operational coverage and conflicts

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `service_coverage_commitment` | 服务覆盖承诺 | Service coverage commitment | `text` | `null / unknown` |
| `availability_window` | 可响应时段 | Availability window | `text` | `null / unknown` |
| `escalation_route` | 升级路径与时限 | Escalation route and time limit | `text` | `null / unknown` |
| `backup_or_replacement_arrangement` | 替补或替换安排 | Backup or replacement arrangement | `text` | `null / unknown` |
| `conflict_of_interest_disclosure` | 利益冲突披露 | Conflict-of-interest disclosure | `text` | `null / unknown` |
| `conflict_mitigation` | 冲突回避或缓解措施 | Conflict recusal or mitigation | `text` | `null / unknown` |
| `data_duty_acceptance` | 数据责任接受 | Data-duty acceptance | `boolean_with_basis` | `null / unknown` |
| `safety_duty_acceptance` | 安全责任接受 | Safety-duty acceptance | `boolean_with_basis` | `null / unknown` |
| `acceptance_disposition` | 接受处置 | Acceptance disposition | `enum_accept_revise_decline_unknown` | `null / unknown` |
| `authorized_signature` | 授权签署 | Authorized signature | `signature` | `null / unknown` |
| `acceptance_date` | 接受日期 | Acceptance date | `date` | `null / unknown` |

## `EX-03` D0 观察记录、数据字典与缺失处置表 / D0 Observation Record, Data Dictionary, and Missingness Form

- 适用门槛 / Applicable gates: `H0`, `H1`, `H2`, `H3`
- 控制索引 / Control references: `FP01-DELIVERY-CONTROL-001.d0_measurement_methods`, `FP01-DELIVERY-CONTROL-001.formative_observation_protocol`
- 完成规则：一行只记录一个有效任务会话；不得记录直接身份标识。缺失、退出或失败均保留，不得从分母静默删除。
- Completion rule: Each row records one valid task session and excludes direct identifiers. Missing, withdrawn, and failed observations are retained and never silently removed from the denominator.

### `EX-03-A` 会话与合法性 / Session and lawful basis

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `pseudonymous_session_id` | 化名会话编号 | Pseudonymous session ID | `text` | `null / unknown` |
| `service_day_id` | 服务日编号 | Service-day ID | `text` | `null / unknown` |
| `observation_date` | 观察日期 | Observation date | `date` | `null / unknown` |
| `scenario_and_route_id` | 场景与路线编号 | Scenario and route ID | `text` | `null / unknown` |
| `accommodation_need_and_provision` | 便利需求与实际提供 | Accommodation need and provision | `text` | `null / unknown` |
| `eligibility_confirmation` | 纳入资格确认 | Eligibility confirmation | `boolean_with_basis` | `null / unknown` |
| `consent_or_lawful_basis_ref` | 同意或合法处理依据索引 | Consent or lawful-basis reference | `reference` | `null / unknown` |
| `privacy_notice_version` | 隐私告知版本 | Privacy-notice version | `text` | `null / unknown` |
| `direct_identifier_exclusion_check` | 直接身份标识排除确认 | Direct-identifier exclusion check | `boolean` | `null / unknown` |
| `observer_role_class` | 观察员角色类别 | Observer role class | `text` | `null / unknown` |
| `configuration_version_and_hash` | 配置版本与哈希 | Configuration version and hash | `text` | `null / unknown` |

### `EX-03-B` 事件、结果与权利 / Events, outcome, and rights

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `observation_start_timestamp` | 观察开始时间戳 | Observation start timestamp | `datetime` | `null / unknown` |
| `observation_end_timestamp` | 观察结束时间戳 | Observation end timestamp | `datetime` | `null / unknown` |
| `outcome_class` | 结果类别 | Outcome class | `enum_success_refusal_takeover_exit_failure_unknown` | `null / unknown` |
| `human_confirmation_record` | 人工确认记录 | Human confirmation record | `reference` | `null / unknown` |
| `takeover_trigger` | 人工接管触发 | Human-takeover trigger | `text` | `null / unknown` |
| `takeover_acknowledgement_timestamp` | 接管响应时间戳 | Takeover acknowledgement timestamp | `datetime` | `null / unknown` |
| `appeal_or_refusal_offer` | 申诉或拒绝路径是否主动提供 | Appeal or refusal path proactively offered | `boolean` | `null / unknown` |
| `appeal_teachback_result` | 申诉路径复述结果 | Appeal-path teach-back result | `enum_pass_fail_not_applicable_unknown` | `null / unknown` |
| `exit_restoration_result` | 退出与普通服务恢复结果 | Exit and ordinary-service restoration result | `enum_pass_fail_not_applicable_unknown` | `null / unknown` |
| `missingness_code` | 缺失码 | Missingness code | `enum_none_user_withdrawal_system_failure_observer_gap_rights_block_unknown` | `null / unknown` |
| `missingness_reason` | 缺失原因与分母处置 | Missingness reason and denominator disposition | `text` | `null / unknown` |
| `evidence_capture_refs` | 取证文件索引 | Evidence-capture references | `list` | `null / unknown` |
| `privacy_and_publication_class` | 隐私与公开等级 | Privacy and publication class | `text` | `null / unknown` |
| `independent_reviewer` | 独立复核人 | Independent reviewer | `text` | `null / unknown` |
| `review_disposition` | 复核处置 | Review disposition | `enum_accept_revise_reject_unknown` | `null / unknown` |
| `review_date` | 复核日期 | Review date | `date` | `null / unknown` |

## `EX-04` 工程量、成本基准与非约束采购包表 / Quantity, Cost Basis, and Non-binding Procurement Pack Form

- 适用门槛 / Applicable gates: `H1`, `H2`
- 控制索引 / Control references: `FP01-DELIVERY-CONTROL-001.concept_installation_boq`, `C01-C12`
- 完成规则：设计测试数量不得冒充实测工程量；价格必须可追溯并按同一范围、地区、日期、币种和税口径归一化。采购路线、预算、供应商与授标在授权前保持空白。
- Completion rule: Design-test quantities cannot stand in for measured quantities. Prices must be traceable and normalized to a common scope, location, date, currency, and tax basis. Route, budget, supplier, and award remain blank before authorization.

### `EX-04-A` 工程量计量 / Quantity measurement

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `boq_item_id` | 工程量项目编号 | BoQ item ID | `text` | `null / unknown` |
| `wbs_or_package_id` | WBS 或采购包编号 | WBS or package ID | `text` | `null / unknown` |
| `item_description` | 项目描述 | Item description | `text` | `null / unknown` |
| `specification_and_control_refs` | 规格与控制条款索引 | Specification and control references | `list` | `null / unknown` |
| `measurement_unit` | 计量单位 | Measurement unit | `text` | `null / unknown` |
| `unit_definition` | 单位定义 | Unit definition | `text` | `null / unknown` |
| `measurement_rule` | 计量方法 | Measurement rule | `text` | `null / unknown` |
| `scope_inclusions` | 计价范围包含项 | Scope inclusions | `text` | `null / unknown` |
| `scope_exclusions` | 计价范围排除项 | Scope exclusions | `text` | `null / unknown` |
| `actual_quantity` | 实测工程量 | Measured quantity | `number` | `null / unknown` |
| `quantity_source_and_date` | 数量来源与日期 | Quantity source and date | `reference` | `null / unknown` |
| `measurement_review_ref` | 计量复核索引 | Measurement review reference | `reference` | `null / unknown` |

### `EX-04-B` 成本基准与归一化 / Cost basis and normalization

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `cost_source_class` | 价格来源类别 | Cost-source class | `enum_quote_framework_public_index_benchmark_other_unknown` | `null / unknown` |
| `cost_source_provider` | 价格来源提供方 | Cost-source provider | `text` | `null / unknown` |
| `quote_or_source_reference` | 报价或来源索引 | Quote or source reference | `reference` | `null / unknown` |
| `source_date_and_validity` | 来源日期与有效期 | Source date and validity | `text` | `null / unknown` |
| `source_geography` | 价格地域口径 | Source geography | `text` | `null / unknown` |
| `currency_and_exchange_basis` | 币种与汇率口径 | Currency and exchange basis | `text` | `null / unknown` |
| `tax_and_fee_treatment` | 税费口径 | Tax and fee treatment | `text` | `null / unknown` |
| `scope_adjustments` | 范围调整项 | Scope adjustments | `text` | `null / unknown` |
| `normalization_method` | 可比价格归一化方法 | Comparable-rate normalization method | `text` | `null / unknown` |
| `normalized_unit_rate_cny` | 归一化含税单价（人民币） | Normalized tax-inclusive unit rate (CNY) | `currency` | `null / unknown` |
| `source_rejection_reason` | 来源拒绝或剔除原因 | Source rejection or exclusion reason | `text` | `null / unknown` |
| `independent_cost_reviewer` | 独立成本复核人 | Independent cost reviewer | `text` | `null / unknown` |
| `selected_cost_basis_and_rationale` | 选用成本基准及理由 | Selected cost basis and rationale | `text` | `null / unknown` |
| `contingency_basis_and_rate` | 预备费依据与费率 | Contingency basis and rate | `text` | `null / unknown` |
| `verified_item_amount_cny` | 经核验项目金额（人民币） | Verified item amount (CNY) | `currency` | `null / unknown` |
| `capital_budget_amount_cny` | 资本预算金额（人民币） | Capital budget amount (CNY) | `currency` | `null / unknown` |
| `operating_budget_amount_cny` | 运营预算金额（人民币） | Operating budget amount (CNY) | `currency` | `null / unknown` |
| `funding_source` | 资金来源 | Funding source | `text` | `null / unknown` |

### `EX-04-C` 非约束采购包 / Non-binding procurement pack

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `procurement_package_scope` | 采购包范围 | Procurement package scope | `text` | `null / unknown` |
| `proposed_procurement_route` | 拟议采购路线 | Proposed procurement route | `text` | `null / unknown` |
| `supplier_eligibility_requirements` | 供应方资格条件 | Supplier eligibility requirements | `text` | `null / unknown` |
| `c01_c12_requirement_schedule` | C01—C12 条款响应表 | C01-C12 requirement schedule | `reference` | `null / unknown` |
| `data_ip_and_portability_terms` | 数据、知识产权与可携带性条款 | Data, IP, and portability terms | `text` | `null / unknown` |
| `accessibility_requirements` | 无障碍要求 | Accessibility requirements | `text` | `null / unknown` |
| `acceptance_and_payment_logic` | 验收与付款逻辑 | Acceptance and payment logic | `text` | `null / unknown` |
| `evaluation_conflict_separation` | 评估独立性与利益冲突隔离 | Evaluation independence and conflict separation | `text` | `null / unknown` |
| `exit_and_no_lock_in_terms` | 退出与防锁定条款 | Exit and no-lock-in terms | `text` | `null / unknown` |
| `evaluation_criteria_and_weights` | 评选标准与权重 | Evaluation criteria and weights | `text` | `null / unknown` |
| `selected_procurement_route` | 已批准采购路线 | Approved procurement route | `text` | `null / unknown` |
| `procurement_notice_ref` | 采购公告索引 | Procurement notice reference | `reference` | `null / unknown` |
| `selected_supplier` | 选定供应方 | Selected supplier | `text` | `null / unknown` |
| `award_or_contract_ref` | 授标或合同索引 | Award or contract reference | `reference` | `null / unknown` |

## `EX-05` 专业复核、门槛证书与验收记录 / Professional Review, Gate Certificate, and Acceptance Record

- 适用门槛 / Applicable gates: `H1`, `H2`, `H3`, `H4`
- 控制索引 / Control references: `T01-T07`, `AT01-AT12`, `H0-H4`
- 完成规则：专业意见、阈值测试、门槛决定和授权范围必须可追溯；涉及基本权利、生命安全、隐私、人工接管或退出恢复的关键项不得豁免。
- Completion rule: Professional opinion, threshold testing, gate decision, and authorized scope must be traceable. Critical rights, life-safety, privacy, human-takeover, and exit-restoration items cannot be waived.

### `EX-05-A` 专业复核 / Professional review

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `review_record_id` | 复核记录编号 | Review record ID | `text` | `null / unknown` |
| `review_discipline` | 复核专业 | Review discipline | `text` | `null / unknown` |
| `applicable_standards` | 适用标准 | Applicable standards | `list` | `null / unknown` |
| `review_scope` | 复核范围 | Review scope | `text` | `null / unknown` |
| `review_input_refs` | 输入资料索引 | Review input references | `list` | `null / unknown` |
| `review_method` | 复核方法 | Review method | `text` | `null / unknown` |
| `findings` | 复核发现 | Findings | `text` | `null / unknown` |
| `nonconformities` | 不符合项 | Nonconformities | `text` | `null / unknown` |
| `required_remediation` | 必要整改 | Required remediation | `text` | `null / unknown` |
| `residual_risk` | 残余风险 | Residual risk | `text` | `null / unknown` |
| `reviewer_name_and_qualification` | 复核人姓名与资格 | Reviewer name and qualification | `text` | `null / unknown` |
| `professional_report_ref` | 专业报告索引 | Professional report reference | `reference` | `null / unknown` |

### `EX-05-B` 阈值、验收与门槛 / Threshold, acceptance, and gate

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `threshold_refs` | T01—T07 阈值索引 | T01-T07 threshold references | `list` | `null / unknown` |
| `acceptance_indicator_refs` | AT01—AT12 验收指标索引 | AT01-AT12 acceptance indicator references | `list` | `null / unknown` |
| `test_method_and_sample` | 测试方法与样本 | Test method and sample | `text` | `null / unknown` |
| `test_evidence_refs` | 测试证据索引 | Test evidence references | `list` | `null / unknown` |
| `test_result` | 测试结果 | Test result | `text` | `null / unknown` |
| `pass_fail_hold` | 通过、失败或暂停 | Pass, fail, or hold | `enum_pass_fail_hold_unknown` | `null / unknown` |
| `critical_no_waiver_check` | 关键项不得豁免确认 | Critical no-waiver check | `boolean` | `null / unknown` |
| `gate_id` | H0—H4 门槛编号 | H0-H4 gate ID | `text` | `null / unknown` |
| `gate_prerequisite_evidence_ids` | 门槛前置证据编号 | Gate prerequisite evidence IDs | `list` | `null / unknown` |
| `gate_disposition` | 门槛处置 | Gate disposition | `enum_go_revise_stop_unknown` | `null / unknown` |
| `decision_rationale` | 决定理由 | Decision rationale | `text` | `null / unknown` |
| `dissent_or_exception_record` | 异议或例外记录 | Dissent or exception record | `text` | `null / unknown` |
| `authorized_scope` | 获准范围 | Authorized scope | `text` | `null / unknown` |
| `authorization_expiry` | 授权有效期 | Authorization expiry | `date` | `null / unknown` |
| `decision_owner_name` | 决策责任人 | Decision owner | `text` | `null / unknown` |
| `required_cosignatories` | 必要会签人 | Required cosignatories | `list` | `null / unknown` |
| `signatures` | 签署 | Signatures | `signature_set` | `null / unknown` |
| `decision_and_signoff_date` | 决定与签署日期 | Decision and sign-off date | `date` | `null / unknown` |

## `EX-06` 复演、维护与退出交接记录 / Rehearsal, Maintenance, and Exit Handover Record

- 适用门槛 / Applicable gates: `H3`, `H4`
- 控制索引 / Control references: `success`, `refusal`, `human_takeover`, `exit_restoration`, `MNT01-MNT04`, `ALT01-ALT04`
- 完成规则：四类事件须分别复演并保留版本、触发、步骤、证据、偏差与重试；任何关键失败均保持暂停。退出必须同时证明数据、资产、未结案件和普通服务恢复。
- Completion rule: Each of the four events is rehearsed separately with version, trigger, steps, evidence, deviation, and retest records. Any critical failure keeps release on hold. Exit must cover data, assets, open cases, and ordinary-service restoration.

### `EX-06-A` 受控复演与复现清单 / Controlled rehearsal and replay manifest

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `rehearsal_record_id` | 复演记录编号 | Rehearsal record ID | `text` | `null / unknown` |
| `rehearsal_event_type` | 事件类别 | Rehearsal event type | `enum_success_refusal_human_takeover_exit_restoration` | `null / unknown` |
| `protocol_reference` | 复演协议索引 | Protocol reference | `reference` | `null / unknown` |
| `preconditions` | 前置条件 | Preconditions | `text` | `null / unknown` |
| `configuration_versions_and_hashes` | 配置版本与哈希清单 | Configuration versions and hashes | `list` | `null / unknown` |
| `injected_trigger` | 注入触发 | Injected trigger | `text` | `null / unknown` |
| `operator_steps` | 操作步骤 | Operator steps | `ordered_list` | `null / unknown` |
| `expected_state_transitions` | 预期状态转移 | Expected state transitions | `ordered_list` | `null / unknown` |
| `evidence_capture_plan` | 证据采集方案 | Evidence-capture plan | `text` | `null / unknown` |
| `pass_fail_rule` | 通过与失败规则 | Pass/fail rule | `text` | `null / unknown` |
| `evaluator_name_and_role` | 评估人姓名与角色 | Evaluator name and role | `text` | `null / unknown` |
| `witness_independence_and_conflict` | 见证独立性与利益冲突 | Witness independence and conflict | `text` | `null / unknown` |
| `actual_start_and_end` | 实际起止时间 | Actual start and end | `datetime_range` | `null / unknown` |
| `observed_result` | 观察结果 | Observed result | `text` | `null / unknown` |
| `deviation_record` | 偏差记录 | Deviation record | `text` | `null / unknown` |
| `remedy_and_retest_ref` | 整改与重试索引 | Remedy and retest reference | `reference` | `null / unknown` |
| `rehearsal_disposition` | 复演处置 | Rehearsal disposition | `enum_pass_fail_hold_unknown` | `null / unknown` |
| `rehearsal_signatures_and_date` | 复演签署与日期 | Rehearsal signatures and date | `signature_set` | `null / unknown` |

### `EX-06-B` 维护与停线日志 / Maintenance and stop log

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `maintenance_record_id` | 维护记录编号 | Maintenance record ID | `text` | `null / unknown` |
| `maintenance_control_id` | MNT01—MNT04 控制编号 | MNT01-MNT04 control ID | `text` | `null / unknown` |
| `checklist_version` | 检查表版本 | Checklist version | `text` | `null / unknown` |
| `line_item_result` | 逐项检查结果 | Line-item result | `enum_pass_fail_hold_unknown` | `null / unknown` |
| `defect_or_incident_id` | 缺陷或事件编号 | Defect or incident ID | `text` | `null / unknown` |
| `stop_state_and_scope` | 停线状态与范围 | Stop state and scope | `text` | `null / unknown` |
| `corrective_action_owner` | 整改责任人 | Corrective-action owner | `text` | `null / unknown` |
| `corrective_action_due_date` | 整改截止日期 | Corrective-action due date | `date` | `null / unknown` |
| `closure_evidence_ref` | 关闭证据索引 | Closure evidence reference | `reference` | `null / unknown` |
| `maintenance_independent_reviewer` | 维护独立复核人 | Maintenance independent reviewer | `text` | `null / unknown` |
| `maintenance_signature_and_date` | 维护签署与日期 | Maintenance signature and date | `signature` | `null / unknown` |

### `EX-06-C` 退出与交接 / Exit and handover

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `exit_record_id` | 退出记录编号 | Exit record ID | `text` | `null / unknown` |
| `exit_trigger_and_alt_ref` | 退出触发与 ALT01—ALT04 索引 | Exit trigger and ALT01-ALT04 reference | `text` | `null / unknown` |
| `asset_inventory_and_disposition` | 资产清单与处置 | Asset inventory and disposition | `text` | `null / unknown` |
| `portable_record_inventory` | 可携带记录清单 | Portable-record inventory | `text` | `null / unknown` |
| `data_categories_and_disposition` | 数据类别与处置 | Data categories and disposition | `text` | `null / unknown` |
| `data_retention_exception_basis` | 数据保留例外依据 | Data-retention exception basis | `reference` | `null / unknown` |
| `open_cases_and_appeals` | 未结案件与申诉清单 | Open cases and appeals | `text` | `null / unknown` |
| `ordinary_service_restoration` | 普通服务恢复证明 | Ordinary-service restoration evidence | `reference` | `null / unknown` |
| `component_removal_record` | 组件拆除记录 | Component-removal record | `reference` | `null / unknown` |
| `space_restoration_record` | 空间恢复记录 | Space-restoration record | `reference` | `null / unknown` |
| `public_notice_ref` | 公众告知索引 | Public-notice reference | `reference` | `null / unknown` |
| `receiving_party` | 接收主体 | Receiving party | `text` | `null / unknown` |
| `handover_acceptance_disposition` | 交接接受处置 | Handover acceptance disposition | `enum_accept_revise_reject_unknown` | `null / unknown` |
| `handover_signatures_and_date` | 交接签署与日期 | Handover signatures and date | `signature_set` | `null / unknown` |

## `EX-07` 参考进度、RAID 与变更控制台账 / Reference Programme, RAID, and Change-control Register

- 适用门槛 / Applicable gates: `H0`, `H1`, `H2`, `H3`, `H4`
- 控制索引 / Control references: `K01-K10`, `D0`, `D30`, `D60`, `D90`, `D100`
- 完成规则：参考窗口和持续时间只用于依赖审查，不是承诺工期。实际日期、责任主体、风险状态、决定和变更批准必须在授权后由相应责任人填写。
- Completion rule: Reference windows and durations support dependency review and are not programme commitments. Actual dates, accountable parties, risk status, decisions, and change approvals are completed by authorized parties only.

### `EX-07-A` 依赖与交付物 / Dependencies and deliverables

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `dependency_step_id` | K01—K10 步骤编号 | K01-K10 dependency step ID | `text` | `null / unknown` |
| `work_package` | 工作包 | Work package | `text` | `null / unknown` |
| `owner_role_class` | 责任角色类别 | Owner role class | `text` | `null / unknown` |
| `predecessor_ids` | 前置步骤编号 | Predecessor IDs | `list` | `null / unknown` |
| `parallel_step_ids` | 可并行步骤编号 | Parallel step IDs | `list` | `null / unknown` |
| `entry_evidence_refs` | 进入条件证据索引 | Entry-evidence references | `list` | `null / unknown` |
| `deliverable_or_output` | 交付物或输出 | Deliverable or output | `text` | `null / unknown` |
| `exit_evidence_refs` | 退出条件证据索引 | Exit-evidence references | `list` | `null / unknown` |
| `reference_window` | D0/D30/D60/D90/D100 参考窗口 | D0/D30/D60/D90/D100 reference window | `text` | `null / unknown` |
| `participant_reference_duration_range` | 投稿方参考持续时间范围 | Participant reference duration range | `text` | `null / unknown` |
| `planned_start` | 经批准计划开始日期 | Approved planned start | `date` | `null / unknown` |
| `planned_finish` | 经批准计划完成日期 | Approved planned finish | `date` | `null / unknown` |
| `actual_start` | 实际开始日期 | Actual start | `date` | `null / unknown` |
| `actual_finish` | 实际完成日期 | Actual finish | `date` | `null / unknown` |

### `EX-07-B` 风险、假设、问题、决定与变更 / Risk, assumption, issue, decision, and change

| 字段编号 / Field ID | 中文字段 | English field | 类型 / Type | 填写值 / Entry |
|---|---|---|---|---|
| `raid_or_change_id` | RAID 或变更编号 | RAID or change ID | `text` | `null / unknown` |
| `record_type` | 记录类型 | Record type | `enum_risk_assumption_issue_decision_change` | `null / unknown` |
| `description` | 描述 | Description | `text` | `null / unknown` |
| `trigger_or_cause` | 触发或原因 | Trigger or cause | `text` | `null / unknown` |
| `impact_and_probability` | 影响与概率 | Impact and probability | `text` | `null / unknown` |
| `action_owner` | 行动责任人 | Action owner | `text` | `null / unknown` |
| `due_date` | 到期日期 | Due date | `date` | `null / unknown` |
| `record_status` | 记录状态 | Record status | `enum_open_monitor_hold_closed_unknown` | `null / unknown` |
| `decision_record` | 决定记录 | Decision record | `text` | `null / unknown` |
| `change_request_and_reason` | 变更请求与理由 | Change request and reason | `text` | `null / unknown` |
| `affected_baselines` | 受影响基线 | Affected baselines | `list` | `null / unknown` |
| `change_approval` | 变更批准 | Change approval | `signature` | `null / unknown` |
| `closure_evidence_and_date` | 关闭证据与日期 | Closure evidence and date | `reference` | `null / unknown` |

## 执行副本收束 / Executed-copy closeout

完成一份执行副本时，应将所有 `null / unknown` 分别转为：有来源的事实值；带原因、责任人和处置的 `unknown`；或明确的 `not_applicable`。不得删除失败、退出、异议、缺失或互相矛盾的记录。 / At closeout, replace each `null / unknown` with an attributable factual value, a reasoned and owned `unknown`, or explicit `not_applicable`. Never delete failures, withdrawals, dissent, missingness, or contradictory records.

门槛决定只能为 `GO / REVISE / STOP / HOLD` 中的适用值，并由有授权的责任主体及规定会签人填写。空表、内部设计引用或合成示例均不能构成批准。 / A gate disposition uses the applicable `GO / REVISE / STOP / HOLD` value and is completed by authorized accountable and required cosignatory parties. A blank form, internal design reference, or synthetic fixture cannot constitute approval.
