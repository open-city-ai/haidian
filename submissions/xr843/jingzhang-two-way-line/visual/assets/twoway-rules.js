/**
 * 对开协议·六条规则引擎 / Two-Way Protocol rule engine
 *
 * 这是本包唯一的规则实现。Node 端的 run_twoway_tabletop.js 与浏览器端的
 * twoway-tabletop.js 都引用本文件，因此「终端里跑出来的结论」与「展示页上看到的
 * 结论」必然同源——两边不可能给出不同的数字。
 *
 * 纯函数，无 I/O、无外部依赖、无网络访问。Node 18+ 与任意现代浏览器均可运行。
 *
 * 边界：本文件检验的是本方案自设的准入契约，不是行政审批、法律合规或政府承诺。
 */

(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.TwoWayRules = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var nonEmpty = function (v) {
    return typeof v === 'string' && v.trim().length > 0;
  };

  /** 六条规则，逐条对应 proposal.md §6.3 的原文出处。null=通过，字符串=违规原因。 */
  var RULES = [
    {
      id: 'R1_THREE_ELEMENTS',
      label_zh: '三要素齐全',
      label_en: 'All three elements present',
      desc_zh: '节点、运营主体、上下行清单缺一不得排图',
      desc_en: 'Node, operator and up/downlink lists are all mandatory',
      check: function (r) {
        var missing = [];
        if (!nonEmpty(r.node)) missing.push('节点');
        if (!nonEmpty(r.operator)) missing.push('运营主体');
        if (!nonEmpty(r.uplink && r.uplink.takes)) missing.push('上行清单');
        if (!Array.isArray(r.uplink && r.uplink.data_classes) || r.uplink.data_classes.length === 0) missing.push('上行数据类别');
        if (!nonEmpty(r.downlink && r.downlink.returns)) missing.push('下行清单');
        return missing.length ? '三要素缺 ' + missing.join('、') + '，不得排图' : null;
      },
    },
    {
      id: 'R2_NO_TAKE_WITHOUT_RETURN',
      label_zh: '禁止只取不还',
      label_en: 'No taking without returning',
      desc_zh: '有上行必须有下行，且下行须为可被公众核对的承诺',
      desc_en: 'Any uplink requires a downlink with a publicly checkable commitment',
      check: function (r) {
        var takes = nonEmpty(r.uplink && r.uplink.takes);
        if (!takes) return null; // 无上行则不受本条约束，由 R1 处理
        if (!nonEmpty(r.downlink && r.downlink.returns)) return '有上行无下行，属只取不还';
        if (!nonEmpty(r.downlink && r.downlink.public_commitment)) return '下行缺可被公众核对的承诺形式，属只取不还';
        return null;
      },
    },
    {
      id: 'R3_WHO_CAN_HALT',
      label_zh: '叫停主体确定',
      label_en: 'A named party can halt it',
      desc_zh: '必须声明复核退出机制与「谁能叫停」',
      desc_en: 'Review/exit mechanism and the halting party must both be declared',
      check: function (r) {
        if (!nonEmpty(r.review_and_exit && r.review_and_exit.mechanism)) return '未声明复核与退出机制';
        if (!nonEmpty(r.review_and_exit && r.review_and_exit.who_can_halt)) return '未声明叫停主体，「谁能叫停」无解';
        return null;
      },
    },
    {
      id: 'R4_PRIVACY_REDLINE',
      label_zh: '隐私红线',
      label_en: 'Privacy red line',
      desc_zh: '人脸识别布控与可识别个体轨迹在契约层不可表达',
      desc_en: 'Face-recognition surveillance and identifiable trajectories are inexpressible',
      check: function (r) {
        var p = r.privacy || {};
        var bad = [];
        if (p.face_recognition_surveillance !== false) bad.push('人脸识别布控');
        if (p.identifiable_trajectory !== false) bad.push('可识别个体轨迹');
        return bad.length ? '触碰隐私红线：' + bad.join('、') : null;
      },
    },
    {
      id: 'R5_NON_AI_FALLBACK',
      label_zh: '非 AI 等价路径',
      label_en: 'Non-AI equivalent path',
      desc_zh: '任何人不使用智能服务也不得失去原有服务',
      desc_en: 'Nobody loses the existing service by not using the AI one',
      check: function (r) {
        return nonEmpty(r.non_ai_fallback) ? null : '缺非AI等价服务路径';
      },
    },
    {
      id: 'R6_TEST_NOT_APPROVED',
      label_zh: '测试班次不得自称已批准',
      label_en: 'Test services must not claim approval',
      desc_zh: 'T 字头测试班次状态必须停留在 proposed',
      desc_en: 'T-prefixed test services must stay in the proposed state',
      check: function (r) {
        var isTest = typeof r.service_id === 'string' && r.service_id.charAt(0) === 'T';
        if (isTest && r.status !== 'proposed') {
          return '测试班次状态为 ' + r.status + '，不得表述为已批准或已排图运营';
        }
        return null;
      },
    },
  ];

  /** 对单张班次卡逐条过闸。 */
  function judge(receipt) {
    var violations = [];
    for (var i = 0; i < RULES.length; i++) {
      var why = RULES[i].check(receipt);
      if (why) violations.push({ rule_id: RULES[i].id, why: why });
    }
    return { service_id: receipt.service_id, violations: violations, schedulable: violations.length === 0 };
  }

  /**
   * 跑完整推演：十二张真实班次卡必须全部可排图，六个变异用例必须各自被其
   * 对应规则拦下。返回的对象结构与 twoway-tabletop-evidence.json 一致。
   */
  function runTabletop(runbook) {
    var serviceResults = runbook.services.map(judge);
    var failedServices = serviceResults.filter(function (r) { return !r.schedulable; });

    var mutationResults = runbook.rejection_cases.map(function (c) {
      var verdict = judge(c.receipt);
      var caughtBy = verdict.violations.map(function (v) { return v.rule_id; });
      var caughtByExpected = caughtBy.indexOf(c.must_violate) !== -1;
      return {
        case_id: c.case_id,
        must_violate: c.must_violate,
        caught_by: caughtBy,
        caught_by_expected_rule: caughtByExpected,
        rejected: !verdict.schedulable,
        gate_is_live: caughtByExpected && !verdict.schedulable,
        why_zh: c.why_zh,
      };
    });
    var deadGates = mutationResults.filter(function (m) { return !m.gate_is_live; });

    return {
      protocol: runbook.protocol,
      rules_source: runbook.rules_source,
      ok: failedServices.length === 0 && deadGates.length === 0,
      services_total: serviceResults.length,
      services_schedulable: serviceResults.filter(function (r) { return r.schedulable; }).length,
      services_failed: failedServices,
      mutation_cases_total: mutationResults.length,
      mutation_cases_caught: mutationResults.filter(function (m) { return m.gate_is_live; }).length,
      mutation_results: mutationResults,
      dead_gates: deadGates.map(function (m) { return m.case_id; }),
      disclaimer_zh: runbook.disclaimer_zh,
    };
  }

  return { RULES: RULES, judge: judge, runTabletop: runTabletop, nonEmpty: nonEmpty };
});
