# 三分钟读懂京张·转辙（导读）

1. **一个母题**：铁路转辙器的完整工程动作——转辙（路由）、锁闭（防错）、验通（验证）。
2. **一套治理**：四环（资料/推演/反馈/复核）自转 + G0-G6 门闸状态机——门要人开，环会自转。
3. **四件制品**：Receipt 收据 / 门闸状态机 / 留白验证区 / Agent Passport——可审计、可回滚、可证伪、双向可读。
4. **一层空间**：40 地块（renewal_action + governance_ring + 物质面）+ 5 条转辙廊 + 25 栋建筑 + 13 张场景卡全部自带可证伪条款。
5. **一个态度**：不捏造任何数值——planning_limits 标 unknown、碳与能耗只立审计制度、示例全部 sandbox_only。

---

# 机器可读治理制品（京张·转辙）

本方案把 agent-readable city 落成三件配套制品，使四环协作成为可审计、可回滚、可证伪的状态机，而非隐喻。母题采用转辙器的完整工程动作——**转辙（路由）→ 锁闭（防错）→ 验通（验证）**：门闸 G0-G6 即这三个动作的状态机展开。

## Civic Agent Receipt Schema

```json
{
  "$schema": "http://json-schema.org/draft-2020-12/schema",
  "$id": "civic-agent-receipt.schema.json",
  "title": "Civic Agent Receipt (京张·转辙)",
  "description": "每次城市智能体干预/场景运行的机器可读收据。把 agent-readable city 从宣言落成 per-run 凭证：每次干预都有证据、人工责任、最差组、申诉通道、处置结果。环会自转，门闸可回滚。",
  "type": "object",
  "required": [
    "receipt_id",
    "scenario_id",
    "gate",
    "disposition",
    "human_responsibility",
    "evidence_refs",
    "appeal",
    "run_status"
  ],
  "optional_v2": ["stakeholders_affected 影响相关方清单", "mitigation_applied 已施缓解措施", "appeal_deadline_days 申诉时限(工作日)"],
  "properties": {
    "receipt_id": {
      "type": "string",
      "description": "唯一收据 ID"
    },
    "version": {
      "type": "string"
    },
    "scenario_id": {
      "type": "string",
      "description": "对应 proposal 场景卡 01-12"
    },
    "gate": {
      "enum": [
        "G0",
        "G1",
        "G2",
        "G3",
        "G4",
        "G5",
        "G6"
      ],
      "description": "当前所处门闸"
    },
    "evidence_refs": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "[data:]/[metric:]/[source:]/[standard:] 引用清单"
    },
    "human_responsibility": {
      "type": "string",
      "description": "人工责任主体（写角色，不指派真实政府部门）"
    },
    "worst_group": {
      "type": "string",
      "description": "受影响最大的群体（最差组优先原则）"
    },
    "appeal": {
      "type": "string",
      "description": "申诉/投诉/删除通道"
    },
    "deadline": {
      "type": [
        "string",
        "null"
      ]
    },
    "disposition": {
      "enum": [
        "pending",
        "pass",
        "fail",
        "rollback",
        "exit"
      ],
      "description": "处置结果"
    },
    "performance_results": {
      "type": [
        "object",
        "null"
      ],
      "description": "性能指标；null 表示未运行，不冒充已测试"
    },
    "run_status": {
      "enum": [
        "sandbox_only",
        "not_run",
        "controlled_test",
        "public_pilot",
        "retired"
      ]
    },
    "rollback_path": {
      "type": "string",
      "description": "回滚到哪个上游门闸/环"
    },
    "generated_at": {
      "type": "string"
    }
  },
  "additionalProperties": true
}
```

## G0-G6 门闸状态机

```json
{
  "schema_version": "0.1.0",
  "name": "京张·转辙 七道门闸状态机 (G0-G6)",
  "description": "把四环协作落成 7 道可复核门闸，每道有进入条件、可复核状态、未通过处理、人签。环会自转——任何一道未过都回流上游环，而非顺序终止。",
  "four_step_protocol": {
    "apply": "G3 申请",
    "verify": "G4 验证",
    "open": "G5 开放",
    "retire": "G6 退役"
  },
  "gates": [
    {
      "gate_id": "G0",
      "name": "资料就绪",
      "ring": "资料环",
      "entry_condition": "公开资料 + 来源登记 + provisional 披露完成",
      "reviewable_state": "证据链可追溯",
      "on_fail": "回资料环补料",
      "human_signoff": "资料委员会"
    },
    {
      "gate_id": "G1",
      "name": "推演生成",
      "ring": "推演环",
      "entry_condition": "多方案生成 + 指标 EPSG:4548 复算",
      "reviewable_state": "方案可比、指标自洽",
      "on_fail": "重设参数重推",
      "human_signoff": "规划师"
    },
    {
      "gate_id": "G2",
      "name": "反馈接入",
      "ring": "反馈环",
      "entry_condition": "公众/传感反馈接入并脱敏",
      "reviewable_state": "反馈已分类、可复核",
      "on_fail": "关停 + 线下征集",
      "human_signoff": "社区代表"
    },
    {
      "gate_id": "G3",
      "name": "人工复核(申请)",
      "ring": "复核环",
      "entry_condition": "合规 + 隐私 + 伦理审查通过",
      "reviewable_state": "复核签字、receipt=ready",
      "on_fail": "红牌暂停",
      "human_signoff": "专家 + 角色"
    },
    {
      "gate_id": "G4",
      "name": "受控测试(验证)",
      "ring": "验证",
      "entry_condition": "受控测试场闭合合格、可证伪三问过关",
      "reviewable_state": "性能指标达标、非 null",
      "on_fail": "退回 G1",
      "human_signoff": "测试负责人"
    },
    {
      "gate_id": "G5",
      "name": "公开试点(开放)",
      "ring": "开放",
      "entry_condition": "边界 + 低速 + 可监管 + 申诉通道就绪",
      "reviewable_state": "运行 receipt 公开可查",
      "on_fail": "收缩或退出",
      "human_signoff": "运营 + 治理者"
    },
    {
      "gate_id": "G6",
      "name": "退役/迭代(退役)",
      "ring": "迭代",
      "entry_condition": "到期或失败触发或更优方案取代",
      "reviewable_state": "退出空间处置完成",
      "on_fail": "公众触发复议",
      "human_signoff": "议事会"
    }
  ],
  "three_falsifiability_questions": [
    "能否被证伪（什么证据能推翻）？",
    "退出后空间如何处置？",
    "公众能否独立触发暂停/复议？"
  ],
  "switch_lock_verify_mapping": {
    "switch": "G0-G2 转辙：资料/推演/反馈三环把方案、数据、反馈路由到对应的处理股道——转辙器母题的原始动作",
    "lock": "G3 锁闭：人工复核上锁。转辙器在铁路里转辙后必须锁闭，防止列车走上错误股道；同理，未经复核锁闭的智能体干预不得进入公开空间",
    "verify": "G4 验通：受控测试验通。道岔验通才许列车通过；同理，先在受控测试场验证可通过，验不通退回 G1 重新转辙",
    "open_retire": "G5-G6 开放与退役：验通后开放试点；到期、失败触发或更优方案取代即退役"
  },
  "provisional_use_zone": {
    "name": "留白验证区（临时用途机制）",
    "mechanism": "AI 场景用地作为按生命周期管理的临时用途（申请→验证→开放→退役），退出后按用途兼容清单处置，不改变法定用地性质",
    "planning_note": "可直接被控规采用的制度接口：临时用途不需调整法定图则，由 G5 开放授权与 G6 退出处置闭环管理；G6 退役后空间按兼容清单回到原用途或进入下一轮申请"
  },
  "rollback_map": {"G0": "补料后原地重验", "G1": "参数回滚上一版本", "G2": "转线下征集", "G3": "红牌冻结待人工", "G4": "退回 G1 重转辙", "G5": "收缩范围或全量退出", "G6": "公众复议+独立仲裁"},
  "note": "门闸可回滚（任何一道未过都回流上游环），这是'环会自转'的状态机落地，区别于顺序闸门。"
}
```

## 示例收据（example-receipt）

```json
{
  "receipt_id": "RCPT-EXAMPLE-001",
  "version": "0.1.0",
  "scenario_id": "02-用地合规自动复核",
  "gate": "G3",
  "evidence_refs": [
    "[data:geometry/land_use.geojson#LU-090]",
    "[standard:MOHURD-CONTROL-DETAILED-PLANNING]",
    "[metric:land_use_area_0802_sqm]"
  ],
  "human_responsibility": "规划师终审（角色，不指派真实政府部门）",
  "worst_group": "用地红线内现状产权人",
  "appeal": "公示期异议 + 规划师窗口 + 线下纸质",
  "deadline": null,
  "disposition": "pending",
  "performance_results": null,
  "run_status": "sandbox_only",
  "rollback_path": "G3→G0 回资料环复核证据",
  "note": "示例收据，标 sandbox_only / not_run / performance_results=null —— 不冒充已运行。真实运行须先在 G4 受控测试场取得闭合合格、三问过关，方可进 G5 公开试点。",
  "generated_at": "2026-08-09"
}
```

## Agent Passport Schema（agent 对城市可读）

```json
{
  "schema_version": "0.1.0",
  "required_fields": ["agent_identity", "capability_scope", "data_sources", "data_retention", "handover_role", "complaint_channels"],
  "optional_v2": ["update_frequency 护照更新频率(季/年)", "revocation_condition 吊销条件(违规类型清单)"],
  "field_notes": {
    "agent_identity": "是谁：环归属与职能名（角色，不冒充机构）",
    "capability_scope": "能做什么：允许与禁止的操作边界",
    "data_sources": "用什么数据：仅公开或授权聚合来源",
    "data_retention": "保留多久：保留期与到期处置",
    "handover_role": "谁能接管：人工接管角色与触发条件",
    "complaint_channels": "如何投诉/删除：申诉通道与响应时限"
  },
  "ring_passports_example": {
    "data_ring_agent": {"agent_identity": "资料环·资料中台 agent（角色）", "capability_scope": "整理/登记公开资料；禁止接触个人数据", "data_sources": "公开任务书+来源登记", "data_retention": "长期公开，可回滚版本", "handover_role": "资料委员会", "complaint_channels": "公示期异议+资料窗口", "run_status": "sandbox_only"},
    "simulation_ring_agent": {"agent_identity": "推演环·沙盘 agent（角色）", "capability_scope": "多方案推演与指标复算；禁止直接写入公开空间", "data_sources": "公开统计+授权聚合", "data_retention": "推演版本保留至退役复核", "handover_role": "规划师", "complaint_channels": "推演作废申请+专家复核", "run_status": "sandbox_only"},
    "feedback_ring_agent": {"agent_identity": "反馈环·反馈中台 agent（角色）", "capability_scope": "脱敏分类反馈；禁止存储个人身份", "data_sources": "授权反馈（脱敏）", "data_retention": "聚合保存，原始反馈按保留期删除", "handover_role": "社区代表", "complaint_channels": "反馈删除申请+社工窗口", "run_status": "sandbox_only"},
    "review_ring_agent": {"agent_identity": "复核环·合规复核 agent（角色）", "capability_scope": "合规比对与风险提示；终审权在人工", "data_sources": "公开红线+标准库", "data_retention": "复核记录长期留存备查", "handover_role": "专家+部门角色", "complaint_channels": "复议+独立仲裁", "run_status": "sandbox_only"}
  },
  "note": "Receipt 让城市审计 agent 的每次干预；Passport 让城市识别 agent 本身——双向可读。所有护照标 sandbox_only，不冒充已运行。"
}
```

## 照片证据登记板（photo-register 模板）

现场照片是可核查的一手证据。本方案不下载任何图片（避免许可与体积风险），只登记**核查模板与建议条目**——每条照片证据须五字段齐全方可引用 `[metric:photo_register_field_count]`：拍摄地点 / 拍摄日期 / 作者 / 许可证（须 CC 系或公有领域）/ 原始文件页 URL。建议优先核查的公开影像条目（Wikimedia Commons 等自由许可库，登记前须逐条核验许可与现状）：青龙桥车站与人字形线路、京张铁路沿线遗存、遗址公园一期建成段、大钟寺周边街区。登记表随 G0 资料环滚动更新，未登记许可的照片一律不得进入本方案任何制品。

注：示例收据标 sandbox_only / not_run / performance_results=null，不冒充已运行。真实运行须先在 G4 受控测试场取得闭合合格、三问过关。

## 指标字典（全量速查）

| 指标 | 单位 | 值 | 置信 |
|---|---|---|---|
| site_area_sqm | sqm | 11,412,825.386 | high |
| building_footprint_area_sqm | sqm | 2,083,289.604 | medium |
| green_ratio | ratio | 0.311944 | medium |
| public_space_ratio | ratio | 0.113433 | medium |
| floor_area_ratio | ratio | unknown | unknown |
| key_area_count | count | 3 | high |
| data_evidence_anchor_count | count | 18 | high |
| scenario_card_count | count | 13 | high |
| persona_count | count | 7 | high |
| human_review_checkpoint_count | count | 13 | high |
| exit_mechanism_count | count | 13 | high |
| ai_landmark_count | count | 3 | high |
| land_use_area_0702_sqm | sqm | 574,648.601 | high |
| land_use_area_1401_sqm | sqm | 3,560,158.242 | high |
| land_use_area_0803_sqm | sqm | 1,106,411.767 | high |
| land_use_area_0802_sqm | sqm | 2,909,027.707 | high |
| land_use_area_0701_sqm | sqm | 764,666.814 | high |
| land_use_area_0806_sqm | sqm | 323,809.974 | high |
| land_use_area_0804_sqm | sqm | 879,534.459 | high |
| land_use_area_1403_sqm | sqm | 1,294,587.148 | high |
| governance_gate_count | count | 7 | high |
| receipt_schema_field_count | count | 8 | high |
| falsifiability_question_count | count | 3 | high |
| temporal_segment_count | count | 4 | high |
| accessibility_checkpoint_count | count | 5 | high |
| stitch_corridor_count | count | 5 | high |
| material_traceability_field_count | count | 3 | high |
| agent_passport_field_count | count | 6 | high |
| agent_passport_count | count | 4 | high |
| ecosystem_merged_proposal_count | count | 833 | high |
| governance_track_sample_share | ratio | 0.675 | medium |
| compute_governance_parcel_count | count | 11 | high |
| energy_audit_field_count | count | 3 | high |
| blueway_corridor_count | count | 2 | medium |
| sponge_policy_parcel_count | count | 11 | high |
| acoustic_zone_type_count | count | 3 | high |
| dark_friendly_lighting_parcel_count | count | 40 | high |
| child_friendly_route_count | count | 5 | high |
| all_age_node_count | count | 10 | high |
| regional_synergy_loop_count | count | 4 | medium |
| zhongzhiyuan_workshop_count | count | 4 | high |
| ai_origin_hall_count | count | 3 | high |
| dazhongsi_market_count | count | 3 | high |
| developer_walkway_length_km | count | 9 | medium |
| pilgrimage_route_color_count | count | 3 | high |
| annual_event_count | count | 4 | high |
| risk_dimension_count | count | 8 | high |
| photo_register_field_count | count | 5 | high |
| falsifiable_clause_count | count | 13 | high |
| visual_interactive_gate_count | count | 7 | high |
| stitch_corridor_map_annotation_count | count | 5 | high |
| land_use_compatibility_rule_count | count | 8 | high |
| metric_dictionary_entry_count | count | 52 | high |
| changelog_entry_count | count | 28 | high |
| reader_guide_step_count | count | 5 | high |
| iteration_count | count | 30 | high |
| gate_deep_dive_count | count | 7 | high |
| persona_deep_dive_count | count | 7 | high |
| corridor_deep_dive_count | count | 5 | high |
| receipt_optional_field_count | count | 3 | high |
| rollback_path_count | count | 7 | high |
| compatibility_category_count | count | 3 | high |
| passport_optional_field_count | count | 2 | high |
| visual_deep_dive_row_count | count | 6 | high |
| visual_rollback_row_count | count | 7 | high |
| visual_scenario_clause_count | count | 13 | high |
| visual_source_row_count | count | 10 | high |

字典与 metrics.json 一一对应，由资料环自动生成，随版本滚动更新（v2 全量重生成）。

## 指标字典（全量速查）

| 指标 | 单位 | 值 | 置信 |
|---|---|---|---|
| site_area_sqm | sqm | 11,412,825.386 | high |
| building_footprint_area_sqm | sqm | 2,083,289.604 | medium |
| green_ratio | ratio | 0.311944 | medium |
| public_space_ratio | ratio | 0.113433 | medium |
| floor_area_ratio | ratio | unknown | unknown |
| key_area_count | count | 3 | high |
| data_evidence_anchor_count | count | 18 | high |
| scenario_card_count | count | 13 | high |
| persona_count | count | 7 | high |
| human_review_checkpoint_count | count | 13 | high |
| exit_mechanism_count | count | 13 | high |
| ai_landmark_count | count | 3 | high |
| land_use_area_0702_sqm | sqm | 574,648.601 | high |
| land_use_area_1401_sqm | sqm | 3,560,158.242 | high |
| land_use_area_0803_sqm | sqm | 1,106,411.767 | high |
| land_use_area_0802_sqm | sqm | 2,909,027.707 | high |
| land_use_area_0701_sqm | sqm | 764,666.814 | high |
| land_use_area_0806_sqm | sqm | 323,809.974 | high |
| land_use_area_0804_sqm | sqm | 879,534.459 | high |
| land_use_area_1403_sqm | sqm | 1,294,587.148 | high |
| governance_gate_count | count | 7 | high |
| receipt_schema_field_count | count | 8 | high |
| falsifiability_question_count | count | 3 | high |
| temporal_segment_count | count | 4 | high |
| accessibility_checkpoint_count | count | 5 | high |
| stitch_corridor_count | count | 5 | high |
| material_traceability_field_count | count | 3 | high |
| agent_passport_field_count | count | 6 | high |
| agent_passport_count | count | 4 | high |
| ecosystem_merged_proposal_count | count | 833 | high |
| governance_track_sample_share | ratio | 0.675 | medium |
| compute_governance_parcel_count | count | 11 | high |
| energy_audit_field_count | count | 3 | high |
| blueway_corridor_count | count | 2 | medium |
| sponge_policy_parcel_count | count | 11 | high |
| acoustic_zone_type_count | count | 3 | high |
| dark_friendly_lighting_parcel_count | count | 40 | high |
| child_friendly_route_count | count | 5 | high |
| all_age_node_count | count | 10 | high |
| regional_synergy_loop_count | count | 4 | medium |
| zhongzhiyuan_workshop_count | count | 4 | high |
| ai_origin_hall_count | count | 3 | high |
| dazhongsi_market_count | count | 3 | high |
| developer_walkway_length_km | count | 9 | medium |
| pilgrimage_route_color_count | count | 3 | high |
| annual_event_count | count | 4 | high |
| risk_dimension_count | count | 8 | high |
| photo_register_field_count | count | 5 | high |
| falsifiable_clause_count | count | 13 | high |
| visual_interactive_gate_count | count | 7 | high |
| stitch_corridor_map_annotation_count | count | 5 | high |
| land_use_compatibility_rule_count | count | 8 | high |

字典与 metrics.json 一一对应，由资料环自动生成，随版本滚动更新。

## 门闸深化卡 · G0 资料就绪

进入条件全解：五源核验（任务书/来源登记/事实包/边界/公告）逐项打勾 + provisional 披露三件套（proposal/sources/assumptions 一致）；Receipt 阶段示例：G0 过闸收据的 evidence_refs 必须五源齐全且逐条可点开；失败案例模板：任一来源断链率超 5% 即回资料环，补链清单自动生成。

## 门闸深化卡 · G1 推演生成

进入条件全解：≥2 个可比备选方案 + 指标 EPSG:4548 复算自洽（容差 rel<1e-4）+ 推演参数版本化；Receipt 阶段示例：G1 收据附双方案 diff 摘要与复算表；失败案例模板：复算超容差或备选不足即作废重推，参数回滚到上一版本。

## 门闸深化卡 · G2 反馈接入

进入条件全解：脱敏三步（去标识→聚合→人工抽检）+ 反馈分类置信标注 + 申诉入口可达；Receipt 阶段示例：G2 收据记录脱敏批次号与抽检合格率；失败案例模板：误分类率超阈值即关停该反馈通道，转线下征集。

## 门闸深化卡 · G3 锁闭

进入条件全解：复核四查（合规/隐私/伦理/最差组影响）全部签字 + 红牌清单核查；Receipt 阶段示例：G3 锁闭收据的四查签字栏不可为空，缺一即锁死；失败案例模板：任一查未过即红牌暂停，全案冻结待人工裁定。

## 门闸深化卡 · G4 验通

进入条件全解：受控测试场闭合合格（往返复测一致）+ 可证伪三问过关 + 性能结果非 null；Receipt 阶段示例：G4 收据的 performance_results 必须为实测对象，null 即视为未验通；失败案例模板：性能不达标退回 G1，测试记录入失败档案。

## 门闸深化卡 · G5 公开试点

进入条件全解：边界明确 + 低速可监管 + 申诉通道响应时限承诺 + 退出预案公示；Receipt 阶段示例：G5 收据附试点边界图与申诉 SLA；失败案例模板：试点期任一可证伪条款触发即收缩范围或全量退出。

## 门闸深化卡 · G6 退役迭代

进入条件全解：到期/失败触发/更优取代三种退役路径 + 用地兼容清单回退方案 + 荣誉墙贡献登记；Receipt 阶段示例：G6 收据记录退役原因与空间处置结论；失败案例模板：公众对退役处置有异议可触发复议，进入独立仲裁。

## 兼容清单（结构化）

```json
{
  "compatible": ["0802 科研", "1401 公园绿地", "1403 广场", "0803 文化"],
  "conditional": {"0804 教育": "限教学时段外", "0702 社区服务": "限服务不占产"},
  "incompatible": {"0701 住宅": "安静需求", "0806 医疗": "不对公众开放测试"},
  "note": "留白验证区配套；退出后按此清单回到原用途，不改法定用地性质。"
}
```
