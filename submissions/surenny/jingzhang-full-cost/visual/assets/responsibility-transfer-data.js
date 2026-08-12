window.RESPONSIBILITY_TRANSFER_MODEL = {
  schemaVersion: "1.0.0",
  contractId: "seven-cost-burden-handover-v1",
  status: "protocol_only_not_authorized_not_run",
  realPersonalDataUsed: 0,
  completeDecision: "handover_ready_for_professional_review",
  stopDecision: "refuse_transfer_keep_originator_accountable",
  evidenceBoundary: {
    zh: "七项责任移交均为原创离线协议；角色、预算、基线、接收签字与恢复证据仍待授权现场确认。",
    en: "All seven handovers are an original offline protocol; roles, budgets, baselines, acceptance signatures, and recovery evidence still require authorized field confirmation."
  },
  requiredCostClasses: [
    "space",
    "energy_water",
    "materials_equipment",
    "data_compute",
    "labor_maintenance",
    "public_attention",
    "public_funding"
  ],
  handoffs: [
    {
      id: "HC01",
      costClass: "space",
      label: {zh: "空间机会与恢复", en: "Space opportunity and restoration"},
      originator: {zh: "场景发起与设备集成团队", en: "Scenario sponsor and equipment integrator"},
      raci: {
        responsible: {zh: "场景空间协调人", en: "Scenario-space coordinator"},
        accountable: {zh: "专业规划复核组", en: "Professional planning review"},
        receiver: {zh: "公共空间维护接收人", en: "Public-space maintenance receiver"},
        consulted: {zh: "日常使用者与无障碍共评者", en: "Daily users and accessibility co-reviewers"},
        informed: {zh: "附近居民与场地运营方", en: "Nearby residents and site operator"}
      },
      decisionGate: {zh: "接收人签认占用边界、撤除顺序与地面恢复责任后才可移交。", en: "Transfer only after the receiver accepts the occupation boundary, removal sequence, and ground-restoration duty."},
      noAiEquivalent: {zh: "保留同等可达的无设备公共空间与人工指引。", en: "Retain equally accessible device-free public space and staffed guidance."},
      affectedGroups: {zh: "行人、轮椅使用者、儿童照护者、邻里与生态维护者", en: "Pedestrians, wheelchair users, caregivers, neighbors, and ecological maintainers"},
      spatial: {
        reference: "geometry/public_space.geojson#PUBLIC-001",
        consequence: {zh: "拒收时不占用全成本信号箱前场，组件断电并移出通行带。", en: "On refusal, do not occupy the Full-Cost Signal Box forecourt; power down and remove components from the access path."}
      },
      denominator: {name: "all_proposed_occupations", status: "pending_field_measurement", value: null, unit: "count", includeFailedAttempts: true, includeWithdrawals: true},
      transferEvidence: {
        acceptanceRequirement: {zh: "带日期的接收签字、撤除清单与恢复责任", en: "Dated receiver signature, removal inventory, and restoration ownership"},
        stopRequirement: {zh: "拒收回执、未占用照片清单与人工路径保持记录", en: "Refusal receipt, non-occupation photo list, and staffed-route retention record"},
        recoveryRequirement: {zh: "地面恢复、通行净宽与维护接收复核", en: "Ground restoration, clear-width check, and maintenance re-acceptance"},
        fieldStatus: "unknown"
      }
    },
    {
      id: "HC02",
      costClass: "energy_water",
      label: {zh: "能源、水与热负荷", en: "Energy, water, and heat load"},
      originator: {zh: "算力与设备测试团队", en: "Compute and equipment test team"},
      raci: {
        responsible: {zh: "资源计量负责人", en: "Resource-metering lead"},
        accountable: {zh: "设施运营责任人", en: "Facility operations owner"},
        receiver: {zh: "能源水务运行接收人", en: "Energy and water operations receiver"},
        consulted: {zh: "周边使用者与设施维护班组", en: "Nearby users and facility maintenance crew"},
        informed: {zh: "专业复核组与场地许可方", en: "Professional reviewers and site permission steward"}
      },
      decisionGate: {zh: "先取得分表基线、容量复核与停机责任，未知负荷不得转给场地运营。", en: "Obtain submeter baselines, capacity review, and shutdown ownership before any unknown load reaches site operations."},
      noAiEquivalent: {zh: "用离线样机和人工巡检完成同一评审，不接入现场能水系统。", en: "Run the same review with an offline mock-up and manual inspection, without connecting to site utilities."},
      affectedGroups: {zh: "设施维护者、周边使用者与公共资源承担者", en: "Facility maintainers, nearby users, and public-resource bearers"},
      spatial: {
        reference: "geometry/green_space.geojson#GREEN-001",
        consequence: {zh: "拒收时计量实验馆维持离线展示，绿地内不布设管线或散热设备。", en: "On refusal, keep the metering lab offline and place no utilities or heat-rejection equipment in green space."}
      },
      denominator: {name: "all_test_hours_including_aborted", status: "pending_field_measurement", value: null, unit: "hour", includeFailedAttempts: true, includeWithdrawals: true},
      transferEvidence: {
        acceptanceRequirement: {zh: "分表口径、容量意见、停机角色与异常记录", en: "Submeter method, capacity opinion, shutdown role, and exception log"},
        stopRequirement: {zh: "断接证明与离线替代流程", en: "Disconnection evidence and offline substitute workflow"},
        recoveryRequirement: {zh: "接口复原、能水异常清零与接收人复核", en: "Interface restoration, utility-exception closure, and receiver review"},
        fieldStatus: "unknown"
      }
    },
    {
      id: "HC03",
      costClass: "materials_equipment",
      label: {zh: "材料、设备与替换", en: "Materials, equipment, and replacement"},
      originator: {zh: "设备供应与集成团队", en: "Equipment supply and integration team"},
      raci: {
        responsible: {zh: "资产清单负责人", en: "Asset-inventory lead"},
        accountable: {zh: "采购与生命周期复核组", en: "Procurement and lifecycle review"},
        receiver: {zh: "资产维护接收人", en: "Asset maintenance receiver"},
        consulted: {zh: "维修劳动者与公共空间维护者", en: "Repair workers and public-space maintainers"},
        informed: {zh: "使用者与退出预算责任人", en: "Users and exit-budget owner"}
      },
      decisionGate: {zh: "接收人确认部件清单、保修、替代件、材料去向与拆除工具后才可移交。", en: "Transfer only after the receiver accepts parts, warranty, substitutes, material destinations, and removal tools."},
      noAiEquivalent: {zh: "使用可借用的普通展具、纸质说明与人工演示。", en: "Use borrowable ordinary fixtures, paper explanation, and staffed demonstration."},
      affectedGroups: {zh: "维修人员、采购方、公共空间使用者与废弃物处理者", en: "Repair workers, procurers, public-space users, and waste handlers"},
      spatial: {
        reference: "geometry/buildings.geojson#BLDG-001",
        consequence: {zh: "拒收时不形成固定装修，样机退回发起方并保留可逆空场。", en: "On refusal, build no fixed fit-out; return prototypes to the originator and retain a reversible empty space."}
      },
      denominator: {name: "all_units_procured_failed_or_retired", status: "pending_field_measurement", value: null, unit: "item", includeFailedAttempts: true, includeWithdrawals: true},
      transferEvidence: {
        acceptanceRequirement: {zh: "序列化资产清单、可替换性、保修与材料去向", en: "Serialized inventory, replaceability, warranty, and material destinations"},
        stopRequirement: {zh: "拒收清单、退回责任与未固定安装证明", en: "Refusal inventory, return ownership, and evidence of no fixed installation"},
        recoveryRequirement: {zh: "拆除、回收/返还与空间清场验收", en: "Removal, recovery or return, and cleared-space acceptance"},
        fieldStatus: "unknown"
      }
    },
    {
      id: "HC04",
      costClass: "data_compute",
      label: {zh: "数据、算力与删除", en: "Data, compute, and deletion"},
      originator: {zh: "模型与数据处理团队", en: "Model and data-processing team"},
      raci: {
        responsible: {zh: "数据处理记录负责人", en: "Data-processing record lead"},
        accountable: {zh: "数据权利复核者", en: "Data-rights reviewer"},
        receiver: {zh: "数据保管与删除接收人", en: "Data custody and deletion receiver"},
        consulted: {zh: "被采集者代表与路过者观察员", en: "Data-subject representatives and passer-by observers"},
        informed: {zh: "场景运营者与申诉受理人", en: "Scenario operator and appeal handler"}
      },
      decisionGate: {zh: "用途、最小输入、保存期限、删除验证和算力账未被接收前，不得开启采集。", en: "Do not collect until purpose, minimum inputs, retention, deletion verification, and compute accounting are accepted."},
      noAiEquivalent: {zh: "提供无采集静态展示、纸质信息与人工办理。", en: "Provide a no-capture static exhibit, paper information, and staffed handling."},
      affectedGroups: {zh: "被采集者、撤回同意者、路过者与无法使用数字服务者", en: "Data subjects, people withdrawing consent, passers-by, and non-digital users"},
      spatial: {
        reference: "geometry/public_space.geojson#PUBLIC-002",
        consequence: {zh: "拒收时公共回报桌切换为无传感器模式，摄像与无线采集保持关闭。", en: "On refusal, switch the Public Return Table to sensor-free mode and keep camera and wireless capture off."}
      },
      denominator: {name: "all_sessions_including_opt_out_and_failed", status: "pending_field_measurement", value: null, unit: "session", includeFailedAttempts: true, includeWithdrawals: true},
      transferEvidence: {
        acceptanceRequirement: {zh: "处理清单、保存期限、删除验证与算力责任", en: "Processing inventory, retention limit, deletion verification, and compute ownership"},
        stopRequirement: {zh: "传感器关闭证明、人工服务记录与拒收回执", en: "Sensor-off evidence, staffed-service record, and refusal receipt"},
        recoveryRequirement: {zh: "删除复核、访问权撤销与无采集模式验收", en: "Deletion review, access revocation, and sensor-free mode acceptance"},
        fieldStatus: "unknown"
      }
    },
    {
      id: "HC05",
      costClass: "labor_maintenance",
      label: {zh: "劳动、维护与接管", en: "Labor, maintenance, and takeover"},
      originator: {zh: "场景服务运营团队", en: "Scenario service operator"},
      raci: {
        responsible: {zh: "班次与培训记录负责人", en: "Shift and training record lead"},
        accountable: {zh: "服务运营责任人", en: "Service operations owner"},
        receiver: {zh: "维护班组接收人", en: "Maintenance crew receiver"},
        consulted: {zh: "一线维护者、客服、标注与安保人员", en: "Frontline maintenance, support, labeling, and security workers"},
        informed: {zh: "使用者、采购方与申诉受理人", en: "Users, procurer, and appeal handler"}
      },
      decisionGate: {zh: "工时、培训、安全、人工接管、申诉和退出工作量由接收班组确认后才可排班。", en: "Schedule only after the receiving crew accepts hours, training, safety, human takeover, appeals, and exit workload."},
      noAiEquivalent: {zh: "保留有预算、有座席、有排班的人工服务，不用隐形加班托底。", en: "Retain budgeted, seated, scheduled staffed service without hidden overtime."},
      affectedGroups: {zh: "保洁、标注、客服、维修、安保人员与服务使用者", en: "Cleaning, labeling, support, repair, security workers, and service users"},
      spatial: {
        reference: "geometry/buildings.geojson#BLDG-003",
        consequence: {zh: "拒收时维护者账桌只做离线排班演练，不开放无人值守服务。", en: "On refusal, use the Maintainers Ledger Table only for offline rostering and open no unattended service."}
      },
      denominator: {name: "all_staff_hours_including_rework_and_incidents", status: "pending_field_measurement", value: null, unit: "person_hour", includeFailedAttempts: true, includeWithdrawals: true},
      transferEvidence: {
        acceptanceRequirement: {zh: "班次、培训、接管、申诉与退出工时签认", en: "Acceptance of shifts, training, takeover, appeals, and exit hours"},
        stopRequirement: {zh: "不排班决定、人工服务预算与未开放记录", en: "No-roster decision, staffed-service budget, and non-opening record"},
        recoveryRequirement: {zh: "欠付/补休清零、再培训与维护班组复核", en: "Pay or time-off closure, retraining, and crew re-acceptance"},
        fieldStatus: "unknown"
      }
    },
    {
      id: "HC06",
      costClass: "public_attention",
      label: {zh: "公众注意、等待与监控焦虑", en: "Public attention, waiting, and surveillance anxiety"},
      originator: {zh: "体验与传播设计团队", en: "Experience and communication design team"},
      raci: {
        responsible: {zh: "体验负担记录负责人", en: "Experience-burden record lead"},
        accountable: {zh: "公共利益共评组", en: "Public-interest co-review"},
        receiver: {zh: "日常服务运营接收人", en: "Everyday service operations receiver"},
        consulted: {zh: "附近居民、小商户、儿童/老年人/残障者代表", en: "Nearby residents, small businesses, and child, older, and disabled representatives"},
        informed: {zh: "传播团队、场地维护者与申诉受理人", en: "Communication team, site maintainer, and appeal handler"}
      },
      decisionGate: {zh: "等候、绕行、屏幕、噪声、咨询与焦虑分母含拒绝者后，接收人才能承接日常运行。", en: "Everyday operations may accept only after waits, detours, screens, noise, consultation, and anxiety include people who refuse."},
      noAiEquivalent: {zh: "保留安静、无屏、无采集的步行与面对面咨询路径。", en: "Retain a quiet, screen-free, no-capture walking and face-to-face consultation route."},
      affectedGroups: {zh: "附近居民、通勤者、小商户、照护者与不愿被采集者", en: "Nearby residents, commuters, small businesses, caregivers, and people refusing capture"},
      spatial: {
        reference: "geometry/roads.geojson#ROAD-001",
        consequence: {zh: "拒收时公共总账线撤下屏幕和声音提示，保留清晰纸质导视与人工问询。", en: "On refusal, remove screens and audio prompts from the Public Balance Line while retaining clear paper wayfinding and staffed help."}
      },
      denominator: {name: "all_encounters_including_refusal_abandonment_and_complaint", status: "pending_field_measurement", value: null, unit: "encounter", includeFailedAttempts: true, includeWithdrawals: true},
      transferEvidence: {
        acceptanceRequirement: {zh: "含拒绝/离场/投诉的分母、观察方法与减负措施", en: "Denominator including refusal, abandonment, and complaints; observation method; and burden reduction"},
        stopRequirement: {zh: "撤屏/静音记录、人工路径与拒收原因", en: "Screen removal or mute record, staffed route, and refusal reason"},
        recoveryRequirement: {zh: "减负措施复核、受影响群体再评与日常接收", en: "Burden-reduction review, affected-group re-review, and everyday acceptance"},
        fieldStatus: "unknown"
      }
    },
    {
      id: "HC07",
      costClass: "public_funding",
      label: {zh: "公共资金、退出与尾部责任", en: "Public funding, exit, and tail liability"},
      originator: {zh: "试点发起与采购建议团队", en: "Pilot sponsor and procurement proposal team"},
      raci: {
        responsible: {zh: "全周期费用记录负责人", en: "Lifecycle cost record lead"},
        accountable: {zh: "公共资金与采购复核组", en: "Public funding and procurement review"},
        receiver: {zh: "退出预算与尾部责任接收人", en: "Exit-budget and tail-liability receiver"},
        consulted: {zh: "小商户、服务使用者、维护者与受影响群体观察员", en: "Small businesses, service users, maintainers, and affected-group observer"},
        informed: {zh: "专业规划组、场地运营者与公众", en: "Professional planners, site operator, and public"}
      },
      decisionGate: {zh: "采购、运行、人工后备、申诉、撤除、数据迁移与空间恢复的责任来源均被接收后才可建议支出。", en: "Recommend spending only after ownership is accepted for procurement, operation, staffed fallback, appeals, removal, data migration, and restoration."},
      noAiEquivalent: {zh: "继续使用现有人工服务和可撤回的小额离线演练，不形成专有锁定。", en: "Continue existing staffed service and reversible low-cost offline rehearsal without proprietary lock-in."},
      affectedGroups: {zh: "公共资金承担者、小商户、服务使用者、维护团队与后续接手方", en: "Public funders, small businesses, service users, maintenance teams, and successor operators"},
      spatial: {
        reference: "geometry/public_space.geojson#PUBLIC-004",
        consequence: {zh: "拒收时恢复钟前场不形成固定资产，不以未来公共预算兜底撤除。", en: "On refusal, create no fixed asset at the Restoration Bell forecourt and do not assume future public funding will cover removal."}
      },
      denominator: {name: "all_committed_costs_including_exit_failure_and_tail", status: "pending_field_measurement", value: null, unit: "currency_pending", includeFailedAttempts: true, includeWithdrawals: true},
      transferEvidence: {
        acceptanceRequirement: {zh: "全周期成本口径、资金来源边界、退出预算与尾部责任签认", en: "Lifecycle cost method, funding boundary, exit budget, and tail-liability acceptance"},
        stopRequirement: {zh: "不支出决定、无固定资产证明与责任保留记录", en: "No-spend decision, no-fixed-asset evidence, and retained-originator liability record"},
        recoveryRequirement: {zh: "撤除结算、数据迁移、空间恢复与尾部责任关单", en: "Removal settlement, data migration, space restoration, and tail-liability closeout"},
        fieldStatus: "unknown"
      }
    }
  ],
  negativeFixtures: [
    {id: "F01", handoffId: "HC01", removePath: "raci.receiver", expectedError: "missing_raci_receiver"},
    {id: "F02", handoffId: "HC02", removePath: "noAiEquivalent", expectedError: "missing_no_ai_equivalent"},
    {id: "F03", handoffId: "HC03", removePath: "spatial.consequence", expectedError: "missing_spatial_consequence"},
    {id: "F04", handoffId: "HC04", removePath: "denominator.includeFailedAttempts", expectedError: "failed_attempts_excluded"},
    {id: "F05", handoffId: "HC05", removePath: "transferEvidence.stopRequirement", expectedError: "missing_stop_evidence"},
    {id: "F06", handoffId: "HC06", removePath: "transferEvidence.recoveryRequirement", expectedError: "missing_recovery_evidence"},
    {id: "F07", handoffId: "HC07", removePath: "raci.consulted", expectedError: "missing_affected_group_observer"}
  ]
};
