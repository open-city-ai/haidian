/**
 * 对开协议·桌面推演（浏览器端）/ Two-Way Protocol tabletop, in-browser
 *
 * 与 run_twoway_tabletop.js 共用 twoway-rules.js 的六条规则实现，数据取自
 * twoway-runbook.js（twoway-runbook.json 的逐字段副本）。因此本页给出的
 * 12/12 与 6/6 与终端 `node run_twoway_tabletop.js` 的输出必然一致。
 *
 * 完全离线：不发起任何网络请求，不使用 iframe、表单或远程资源。
 *
 * 边界：检验的是本方案自设的准入契约，不是行政审批、法律合规或政府承诺。
 */

(function (root) {
  'use strict';

  var T = {
    zh: {
      summaryCards: '真实班次卡',
      summaryCardsNote: '满足六条规则，可进入运行图',
      summaryGates: '道闸门',
      summaryGatesNote: '变异班次被其对应规则拦下',
      rulesTitle: '六条规则',
      tryTitle: '自己把闸门弄红',
      tryIntro: '下面是运行图里的一张真实班次卡。点任意一个按钮制造一处违规，看它被哪条规则当场拦下；再点一次即可复原。判定由本页实时运行的规则引擎给出，不是预先写好的结果。',
      pickLabel: '选择班次',
      verdictOk: '可排图',
      verdictBad: '不得排图',
      caughtBy: '被拦下于',
      noViolation: '当前无违规，六条全过。',
      mutTitle: '闸门有效性：六个变异班次',
      mutIntro: '每个变异班次只违反一条规则。要求它被对应的那条拦下——拦不下就说明这道闸门是摆设。',
      mutExpected: '应违反',
      mutCaught: '实际拦下',
      live: '闸门有效',
      dead: '闸门失效',
      colService: '班次',
      colName: '场景',
      colNode: '节点',
      colOperator: '运营主体',
      colHalt: '叫停主体',
      colVerdict: '判定',
      tableTitle: '十二张班次卡逐条过闸',
      breaks: [
        { key: 'operator', label: '清空运营主体', rule: 'R1_THREE_ELEMENTS' },
        { key: 'downlink', label: '删掉下行回报', rule: 'R2_NO_TAKE_WITHOUT_RETURN' },
        { key: 'halt', label: '取消叫停主体', rule: 'R3_WHO_CAN_HALT' },
        { key: 'privacy', label: '打开人脸布控', rule: 'R4_PRIVACY_REDLINE' },
        { key: 'fallback', label: '取消非 AI 路径', rule: 'R5_NON_AI_FALLBACK' },
        { key: 'status', label: '把测试班次标成已批准', rule: 'R6_TEST_NOT_APPROVED' }
      ],
      engineNote: '规则引擎：twoway-rules.js ｜ 数据：twoway-runbook.js ｜ 与 node run_twoway_tabletop.js 同源'
    },
    en: {
      summaryCards: 'real service cards',
      summaryCardsNote: 'satisfy all six rules and may enter the timetable',
      summaryGates: 'gates',
      summaryGatesNote: 'each malformed service is caught by its matching rule',
      rulesTitle: 'The six rules',
      tryTitle: 'Break a gate yourself',
      tryIntro: 'Below is a real service card from the timetable. Click any button to introduce one violation and watch which rule stops it; click again to undo. The verdict is computed live by the rule engine on this page, not pre-baked.',
      pickLabel: 'Service',
      verdictOk: 'schedulable',
      verdictBad: 'rejected',
      caughtBy: 'caught by',
      noViolation: 'No violation — all six rules pass.',
      mutTitle: 'Gate liveness: six malformed services',
      mutIntro: 'Each malformed service breaks exactly one rule. It must be caught by that rule — if it is not, the gate is decorative.',
      mutExpected: 'must violate',
      mutCaught: 'actually caught by',
      live: 'gate live',
      dead: 'gate dead',
      colService: 'ID',
      colName: 'Scenario',
      colNode: 'Node',
      colOperator: 'Operator',
      colHalt: 'Can halt',
      colVerdict: 'Verdict',
      tableTitle: 'All twelve cards through the gates',
      breaks: [
        { key: 'operator', label: 'clear the operator', rule: 'R1_THREE_ELEMENTS' },
        { key: 'downlink', label: 'delete the public return', rule: 'R2_NO_TAKE_WITHOUT_RETURN' },
        { key: 'halt', label: 'remove the halting party', rule: 'R3_WHO_CAN_HALT' },
        { key: 'privacy', label: 'switch on face surveillance', rule: 'R4_PRIVACY_REDLINE' },
        { key: 'fallback', label: 'remove the non-AI path', rule: 'R5_NON_AI_FALLBACK' },
        { key: 'status', label: 'mark the test service approved', rule: 'R6_TEST_NOT_APPROVED' }
      ],
      engineNote: 'Engine: twoway-rules.js · data: twoway-runbook.js · same source as node run_twoway_tabletop.js'
    }
  };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = String(text);
    return n;
  }

  /** 深拷贝一张班次卡，再按选中的破坏项改写。原始数据不被触碰。 */
  function mutate(card, active) {
    var c = JSON.parse(JSON.stringify(card));
    if (active.operator) c.operator = '';
    if (active.downlink) { c.downlink = c.downlink || {}; c.downlink.returns = ''; c.downlink.public_commitment = ''; }
    if (active.halt) { c.review_and_exit = c.review_and_exit || {}; c.review_and_exit.who_can_halt = ''; }
    if (active.privacy) { c.privacy = c.privacy || {}; c.privacy.face_recognition_surveillance = true; }
    if (active.fallback) c.non_ai_fallback = '';
    if (active.status) c.status = 'approved';
    return c;
  }

  function mount(hostId, lang) {
    var host = document.getElementById(hostId);
    if (!host || !root.TwoWayRules || !root.TWOWAY_RUNBOOK) return;
    var R = root.TwoWayRules;
    var book = root.TWOWAY_RUNBOOK;
    var t = T[lang] || T.zh;
    var res = R.runTabletop(book);

    host.innerHTML = '';

    // —— 结果概览 ——
    var sum = el('div', 'tt-summary');
    [[res.services_schedulable + '/' + res.services_total, t.summaryCards, t.summaryCardsNote],
     [res.mutation_cases_caught + '/' + res.mutation_cases_total, t.summaryGates, t.summaryGatesNote]]
      .forEach(function (row) {
        var box = el('div', 'tt-sumcard');
        box.appendChild(el('div', 'tt-big', row[0]));
        box.appendChild(el('div', 'tt-sumk', row[1]));
        box.appendChild(el('div', 'tt-sumn', row[2]));
        sum.appendChild(box);
      });
    host.appendChild(sum);

    // —— 六条规则 ——
    host.appendChild(el('h3', 'tt-h', t.rulesTitle));
    var rl = el('div', 'tt-rules');
    R.RULES.forEach(function (rule, i) {
      var b = el('div', 'tt-rule');
      b.appendChild(el('span', 'tt-rid', 'R' + (i + 1)));
      b.appendChild(el('strong', null, lang === 'en' ? rule.label_en : rule.label_zh));
      b.appendChild(el('div', 'tt-rdesc', lang === 'en' ? rule.desc_en : rule.desc_zh));
      rl.appendChild(b);
    });
    host.appendChild(rl);

    // —— 交互区：自己把闸门弄红 ——
    host.appendChild(el('h3', 'tt-h', t.tryTitle));
    host.appendChild(el('p', 'tt-intro', t.tryIntro));

    var active = {};
    var picker = el('div', 'tt-picker');
    picker.appendChild(el('span', 'tt-pick-label', t.pickLabel));
    var current = book.services[0];
    var sel = el('select', 'tt-select');
    book.services.forEach(function (s, i) {
      var o = el('option', null, s.service_id + ' · ' + (lang === 'en' ? (s.name_en || s.name_zh) : s.name_zh));
      o.value = String(i);
      sel.appendChild(o);
    });
    picker.appendChild(sel);
    host.appendChild(picker);

    var btnRow = el('div', 'tt-btns');
    var verdictBox = el('div', 'tt-verdict');

    function render() {
      var card = mutate(current, active);
      var v = R.judge(card);
      verdictBox.innerHTML = '';
      var head = el('div', 'tt-vhead');
      head.appendChild(el('span', 'tt-vid', card.service_id));
      var badge = el('span', v.schedulable ? 'tt-badge tt-ok' : 'tt-badge tt-bad',
                     v.schedulable ? t.verdictOk : t.verdictBad);
      head.appendChild(badge);
      verdictBox.appendChild(head);
      if (v.violations.length === 0) {
        verdictBox.appendChild(el('div', 'tt-vnote', t.noViolation));
      } else {
        v.violations.forEach(function (x) {
          var line = el('div', 'tt-vline');
          line.appendChild(el('span', 'tt-vrule', t.caughtBy + ' ' + x.rule_id));
          line.appendChild(el('span', 'tt-vwhy', ' — ' + x.why));
          verdictBox.appendChild(line);
        });
      }
      Array.prototype.forEach.call(btnRow.children, function (b) {
        var k = b.getAttribute('data-key');
        b.className = active[k] ? 'tt-btn tt-btn-on' : 'tt-btn';
      });
    }

    t.breaks.forEach(function (b) {
      var btn = el('button', 'tt-btn', b.label);
      btn.type = 'button';
      btn.setAttribute('data-key', b.key);
      btn.addEventListener('click', function () {
        active[b.key] = !active[b.key];
        render();
      });
      btnRow.appendChild(btn);
    });
    host.appendChild(btnRow);
    host.appendChild(verdictBox);

    sel.addEventListener('change', function () {
      current = book.services[Number(sel.value)] || book.services[0];
      render();
    });
    render();

    // —— 十二张卡逐条过闸 ——
    host.appendChild(el('h3', 'tt-h', t.tableTitle));
    var box = el('div', 'tt-tablebox');
    var tb = el('table', 'tt-table');
    var thead = el('thead');
    var hr = el('tr');
    [t.colService, t.colName, t.colNode, t.colOperator, t.colHalt, t.colVerdict].forEach(function (h) {
      hr.appendChild(el('th', null, h));
    });
    thead.appendChild(hr);
    tb.appendChild(thead);
    var tbody = el('tbody');
    book.services.forEach(function (s) {
      var v = R.judge(s);
      var tr = el('tr');
      tr.appendChild(el('td', 'tt-mono', s.service_id));
      tr.appendChild(el('td', null, lang === 'en' ? (s.name_en || s.name_zh) : s.name_zh));
      tr.appendChild(el('td', null, s.node));
      tr.appendChild(el('td', null, s.operator));
      tr.appendChild(el('td', null, (s.review_and_exit || {}).who_can_halt || ''));
      var td = el('td');
      td.appendChild(el('span', v.schedulable ? 'tt-badge tt-ok' : 'tt-badge tt-bad',
                        v.schedulable ? t.verdictOk : t.verdictBad));
      tr.appendChild(td);
      tbody.appendChild(tr);
    });
    tb.appendChild(tbody);
    box.appendChild(tb);
    host.appendChild(box);

    // —— 变异用例 ——
    host.appendChild(el('h3', 'tt-h', t.mutTitle));
    host.appendChild(el('p', 'tt-intro', t.mutIntro));
    var ml = el('div', 'tt-muts');
    res.mutation_results.forEach(function (m) {
      var c = el('div', m.gate_is_live ? 'tt-mut tt-mut-live' : 'tt-mut tt-mut-dead');
      var h = el('div', 'tt-muthead');
      h.appendChild(el('span', 'tt-mono', m.case_id));
      h.appendChild(el('span', m.gate_is_live ? 'tt-badge tt-ok' : 'tt-badge tt-bad',
                       m.gate_is_live ? t.live : t.dead));
      c.appendChild(h);
      c.appendChild(el('div', 'tt-mutline', t.mutExpected + ' ' + m.must_violate));
      c.appendChild(el('div', 'tt-mutline', t.mutCaught + ' ' + (m.caught_by.join(', ') || '—')));
      ml.appendChild(c);
    });
    host.appendChild(ml);

    host.appendChild(el('p', 'tt-engine', t.engineNote));
  }

  root.TwoWayTabletop = { mount: mount };
})(typeof globalThis !== 'undefined' ? globalThis : this);
