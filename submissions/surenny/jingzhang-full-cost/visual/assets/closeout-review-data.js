window.CLOSEOUT_REVIEW_MODEL = {
  schemaVersion: "1.0.0",
  evidenceBoundary: {
    zh: "离线合成桌面审计；不代表许可、公众同意、现场绩效、工程可行性或政府背书。",
    en: "Offline synthetic tabletop audit only; not permission, public consent, field performance, engineering feasibility, or government endorsement."
  },
  completeDecision: "eligible_for_professional_review",
  stopDecision: "stop_and_close",
  records: [
    {
      id: "authorization_record",
      label: {zh: "授权记录", en: "Authorization record"},
      owner: {zh: "场地权属/许可责任人", en: "Site tenure and permission steward"},
      affected: {zh: "场地使用者、附近居民、维护人员", en: "Site users, nearby residents, and maintainers"},
      spatialConsequence: {zh: "冻结对应场景点位与设备安装，不占用公共空间。", en: "Freeze the scenario location and equipment installation; do not occupy public space."},
      fallback: {zh: "维持现有人工服务，公开待取得的许可与责任人。", en: "Keep the staffed service and publish the missing permission and owner."},
      scenario: "S01"
    },
    {
      id: "non_ai_comparator",
      label: {zh: "非 AI 对照", en: "Non-AI comparator"},
      owner: {zh: "公共服务运营者", en: "Public-service operator"},
      affected: {zh: "不使用智能设备者、老年人、残障者", en: "Non-digital users, older adults, and disabled people"},
      spatialConsequence: {zh: "保留同等可达的人工柜台、步行线和等候空间。", en: "Retain an equally reachable staffed counter, walking route, and waiting space."},
      fallback: {zh: "不得缩减人工窗口；先记录服务时间与可达性基线。", en: "Do not reduce staffed access; first record service-time and accessibility baselines."},
      scenario: "S02"
    },
    {
      id: "seven_cost_snapshot",
      label: {zh: "七类成本快照", en: "Seven-cost snapshot"},
      owner: {zh: "资源计量与维护团队", en: "Resource-metering and maintenance team"},
      affected: {zh: "维护者、公共资金承担者、周边社区", en: "Maintainers, public funders, and nearby communities"},
      spatialConsequence: {zh: "众智园计量实验馆保持为离线展示，不进入现场部署。", en: "Keep the Zhongzhiyuan metering lab as an offline exhibit; do not deploy in the field."},
      fallback: {zh: "补齐空间、能水、材料、算力、劳动、注意力和资金账。", en: "Complete the space, energy/water, material, compute, labor, attention, and funding ledgers."},
      scenario: "S03"
    },
    {
      id: "civic_return_threshold",
      label: {zh: "公共回报阈值", en: "Civic-return threshold"},
      owner: {zh: "社区共评组与专业团队", en: "Community co-review and professional team"},
      affected: {zh: "附近家庭、小商户、日常通勤者", en: "Nearby families, small businesses, and daily commuters"},
      spatialConsequence: {zh: "小月河公共回报翼只展示待测问题，不展示绿色通过状态。", en: "The Xiaoyuehe civic-return wing shows pending questions, never a green pass state."},
      fallback: {zh: "先共同定义服务可用性、时间、公平与恢复阈值。", en: "Co-define service availability, time, fairness, and restoration thresholds first."},
      scenario: "S04"
    },
    {
      id: "human_steward",
      label: {zh: "具名人工责任", en: "Named human steward"},
      owner: {zh: "场景运营单位", en: "Scenario operator"},
      affected: {zh: "所有使用者，尤其申诉者与一线维护者", en: "All users, especially appellants and frontline maintainers"},
      spatialConsequence: {zh: "设备保持断电/撤除状态，人工接口不得被无主系统替代。", en: "Keep equipment powered off or removed; an ownerless system cannot replace the human interface."},
      fallback: {zh: "指定可联系、可交接、可承担退出责任的人工 steward。", en: "Name a reachable human steward who can hand over and own exit duties."},
      scenario: "S05"
    },
    {
      id: "affected_group_review",
      label: {zh: "受影响群体复核", en: "Affected-group review"},
      owner: {zh: "社区共评召集人", en: "Community co-review convener"},
      affected: {zh: "儿童、老年人、残障者、附近居民与维护劳动者", en: "Children, older adults, disabled people, nearby residents, and maintenance workers"},
      spatialConsequence: {zh: "AI 原点共创客厅保留为不记录的线下讨论空间。", en: "Keep the AI Origin co-creation lounge as an unrecorded offline discussion space."},
      fallback: {zh: "提供不留数据的参与渠道、翻译与合理便利后再复核。", en: "Provide no-data participation, translation, and reasonable accommodation before review."},
      scenario: "S06"
    },
    {
      id: "accessibility_check",
      label: {zh: "无障碍检查", en: "Accessibility check"},
      owner: {zh: "无障碍共评者与设施维护者", en: "Accessibility co-reviewer and facility maintainer"},
      affected: {zh: "残障者、老年人、儿童照护者与非母语访客", en: "Disabled people, older adults, caregivers, and non-native visitors"},
      spatialConsequence: {zh: "南北无障碍步行线和柜台不因 AI 设备变窄、绕行或失去座席。", en: "AI equipment cannot narrow, detour, or remove seating from the accessible route and counter."},
      fallback: {zh: "维持人工导航并完成键盘、文字、空间和现场共评。", en: "Keep staffed navigation and complete keyboard, text, spatial, and field co-review."},
      scenario: "S07"
    },
    {
      id: "appeal_window",
      label: {zh: "申诉窗口", en: "Appeal window"},
      owner: {zh: "独立申诉受理人", en: "Independent appeal handler"},
      affected: {zh: "被拒绝、误判或额外收费的使用者", en: "Users refused, misclassified, or charged extra"},
      spatialConsequence: {zh: "大钟寺公共回报桌保留面对面申诉席位与可见办理时限。", en: "Retain a face-to-face appeal seat and visible response deadline at the Dazhongsi return table."},
      fallback: {zh: "暂停自动决定，回到人工办理并记录补救时限。", en: "Pause automated decisions, return to staffed handling, and record the remedy deadline."},
      scenario: "S08"
    },
    {
      id: "data_deletion_record",
      label: {zh: "数据删除记录", en: "Data-deletion record"},
      owner: {zh: "数据权利复核者", en: "Data-rights reviewer"},
      affected: {zh: "被采集者、路过者与撤回同意者", en: "Data subjects, passers-by, and people withdrawing consent"},
      spatialConsequence: {zh: "数据算力展台切换为无采集静态模式，不启用传感器。", en: "Switch the data/compute exhibit to a no-capture static mode; do not enable sensors."},
      fallback: {zh: "公布保存期限、删除责任与可验证的删除回执。", en: "Publish retention limits, deletion ownership, and a verifiable deletion receipt."},
      scenario: "S09"
    },
    {
      id: "exit_budget_owner",
      label: {zh: "退出预算责任", en: "Exit-budget owner"},
      owner: {zh: "采购与公共资金责任人", en: "Procurement and public-funding steward"},
      affected: {zh: "小商户、公共服务使用者与维护团队", en: "Small businesses, public-service users, and maintenance teams"},
      spatialConsequence: {zh: "不形成依赖专有设备的固定装修或排他通道。", en: "Do not build fixed fit-out or exclusive routes dependent on proprietary equipment."},
      fallback: {zh: "锁定撤除、人工交接、数据迁移和空间修复的预算来源。", en: "Secure funding for removal, human handover, data migration, and spatial repair."},
      scenario: "S10"
    },
    {
      id: "physical_restoration_plan",
      label: {zh: "空间恢复计划", en: "Physical-restoration plan"},
      owner: {zh: "设施与公共空间维护者", en: "Facility and public-space maintainer"},
      affected: {zh: "公共空间使用者、生态维护者与邻里", en: "Public-space users, ecological maintainers, and neighbors"},
      spatialConsequence: {zh: "恢复钟前场只允许可逆、低扰动、可搬移的概念组件。", en: "Allow only reversible, low-impact, movable concept components at the Restoration Bell forecourt."},
      fallback: {zh: "记录拆除顺序、材料去向、地面恢复和验收责任。", en: "Record removal order, material destination, ground restoration, and acceptance ownership."},
      scenario: "S11"
    },
    {
      id: "field_measurement_status",
      label: {zh: "现场测量状态", en: "Field-measurement status"},
      owner: {zh: "获授权的测量团队与受影响群体观察员", en: "Authorized measurement team and affected-group observer"},
      affected: {zh: "所有使用者与不能参与数字测量者", en: "All users and people unable to join digital measurement"},
      spatialConsequence: {zh: "三座清算院只展示合成审计，不把 100% 判定一致率贴成现场成绩。", en: "The three clearing houses show synthetic audit evidence only, never the 100% decision match as a field result."},
      fallback: {zh: "取得许可后以非 AI 对照测量；此前现场绩效保持未知。", en: "Measure against the non-AI comparator only after permission; field performance stays unknown until then."},
      scenario: "S12"
    }
  ]
};
