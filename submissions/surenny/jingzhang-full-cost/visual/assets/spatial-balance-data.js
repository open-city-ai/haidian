(function (root) {
  root.SPATIAL_BALANCE_MODEL = {
    schemaVersion: "spatial-balance-tabletop-v1",
    id: "public-return-table-spatial-balance-v1",
    anchor: "geometry/public_space.geojson#PUBLIC-003",
    status: "relative_tabletop_not_authorized_not_run",
    unit: "relative_layout_cell",
    cellCount: 12,
    officialUnitsClaimed: false,
    fieldPerformance: "unknown",
    realPersonalDataUsed: 0,
    decisionRule: {
      humanDecisionGate: {
        zh: "无障碍共评者、现场维护角色与受影响群体观察员共同决定 go / revise / exit",
        en: "An accessibility co-reviewer, site-maintenance role, and affected-group observer jointly decide go, revise, or exit"
      },
      affectedGroups: {
        zh: "轮椅使用者、老年人、照护者、小商户、人工服务人员与现场维护者",
        en: "Wheelchair users, older adults, caregivers, small merchants, staffed-service workers, and site maintainers"
      },
      candidateRequirement: {
        zh: "候选态不得减少任何受保护用途；新增受保护用途格必须多于 AI 试验占用格",
        en: "The candidate may not reduce any protected use, and added protected-use cells must exceed AI trial cells"
      },
      exitRequirement: {
        zh: "退出态必须清零 AI 试验格，且不得减少候选态已经形成的受保护用途",
        en: "The exit state must clear every AI trial cell without reducing protected uses created by the candidate"
      }
    },
    protectedUses: ["protected_route", "staffed_service", "quiet_rest", "maintenance_access"],
    uses: {
      protected_route: {zh: "连续通行", en: "Continuous passage", className: "route"},
      staffed_service: {zh: "人工服务", en: "Staffed service", className: "staffed"},
      quiet_rest: {zh: "安静休息", en: "Quiet rest", className: "rest"},
      maintenance_access: {zh: "维护通道", en: "Maintenance access", className: "maintenance"},
      reversible_ai_trial: {zh: "可撤 AI 试验", en: "Reversible AI trial", className: "trial"},
      unallocated_reversible: {zh: "待现场共评", en: "Pending field co-review", className: "unallocated"}
    },
    states: [
      {
        id: "baseline",
        label: {zh: "前｜普通人工基线", en: "Before | ordinary staffed baseline"},
        allocations: {protected_route: 3, staffed_service: 2, quiet_rest: 1, maintenance_access: 1, reversible_ai_trial: 0, unallocated_reversible: 5},
        fieldMeaning: {zh: "先保留人工服务、通行、休息与维护；其余格不预先许给设备。", en: "Keep staffed service, passage, rest, and maintenance first; remaining cells are not pre-granted to equipment."}
      },
      {
        id: "candidate",
        label: {zh: "候选｜AI 必须交出空间净回报", en: "Candidate | AI must return a spatial dividend"},
        allocations: {protected_route: 4, staffed_service: 2, quiet_rest: 2, maintenance_access: 1, reversible_ai_trial: 1, unallocated_reversible: 2},
        fieldMeaning: {zh: "一格可撤试验必须同时换来两格受保护用途增量；这只是相对布局假设。", en: "One reversible trial cell must be paired with two added protected-use cells; this is a relative layout hypothesis only."}
      },
      {
        id: "exit",
        label: {zh: "退出｜设备撤除，公共增量留下", en: "Exit | equipment leaves, public gain stays"},
        allocations: {protected_route: 4, staffed_service: 2, quiet_rest: 2, maintenance_access: 1, reversible_ai_trial: 0, unallocated_reversible: 3},
        fieldMeaning: {zh: "试验格归还共评，候选态新增的连续通行与安静休息不被一起撤走。", en: "The trial cell returns to co-review while added passage and quiet rest are not removed with the device."}
      }
    ],
    negativeFixtures: [
      {id: "SB-N01", path: "states.candidate.allocations.protected_route", value: 2, expectedError: "candidate_reduces_protected_route"},
      {id: "SB-N02", path: "states.candidate.allocations.quiet_rest", value: 1, expectedError: "candidate_has_no_net_spatial_dividend"},
      {id: "SB-N03", path: "states.exit.allocations.reversible_ai_trial", value: 1, expectedError: "exit_retains_ai_trial"},
      {id: "SB-N04", path: "decisionRule.humanDecisionGate", remove: true, expectedError: "missing_human_decision_gate"},
      {id: "SB-N05", path: "anchor", value: "geometry/public_space.geojson#MISSING", expectedError: "invalid_spatial_anchor"},
      {id: "SB-N06", path: "officialUnitsClaimed", value: true, expectedError: "fabricated_official_units"}
    ]
  };
}(typeof window === "undefined" ? globalThis : window));
