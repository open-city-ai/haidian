#!/usr/bin/env node
/**
 * 对开协议·桌面推演 / Two-Way Protocol tabletop（Node 运行器）
 *
 * 用途：让评审者可复算地检验「对开协议」是不是真的成立，而不是只读一段散文。
 *
 *   node run_twoway_tabletop.js                  # 判定并打印报告
 *   node run_twoway_tabletop.js --json           # 输出机读结果
 *   node run_twoway_tabletop.js --write-evidence # 重写 twoway-tabletop-evidence.json
 *
 * 判定三件事：
 *   1. 十二张真实班次卡是否全部满足协议六条规则（全过才算成立）；
 *   2. 六个变异用例是否**各自被对应规则拦下**（拦不下说明这道闸门是摆设）；
 *   3. 展示页所用的 twoway-runbook.js 与本文件所读的 twoway-runbook.json
 *      是否逐字段一致——两者若漂移，展示页给出的结论就不再等于终端结论。
 *
 * 任一项不成立即以非零码退出。无外部依赖，Node 18+ 可直接运行。
 *
 * 六条规则本身实现在 twoway-rules.js，浏览器端 twoway-tabletop.js 引用的是同一个
 * 文件，因此展示页与本脚本不可能给出不同判定。
 *
 * 边界：本脚本检验的是本方案自设的准入契约，不是行政审批、法律合规或政府承诺；
 * 运行图中的机构名称均为方案提出的概念性运营架构。
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { runTabletop } = require('./twoway-rules.js');

const HERE = __dirname;
const RUNBOOK_JSON = path.join(HERE, 'twoway-runbook.json');
const RUNBOOK_JS = path.join(HERE, 'twoway-runbook.js');
const EVIDENCE = path.join(HERE, 'twoway-tabletop-evidence.json');

/**
 * 读取供浏览器使用的 runbook 副本，确认它与 JSON 主本一致。
 * 用花括号配对扫描定位对象字面量，避免把文件尾部导出语句的括号当成数据结尾。
 */
function readBrowserRunbook() {
  const src = fs.readFileSync(RUNBOOK_JS, 'utf8');
  const anchor = src.indexOf('TWOWAY_RUNBOOK = ');
  if (anchor === -1) return null;
  const start = src.indexOf('{', anchor);
  if (start === -1) return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < src.length; i++) {
    const ch = src[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(src.slice(start, i + 1));
        } catch (err) {
          return null;
        }
      }
    }
  }
  return null;
}

function main() {
  const args = process.argv.slice(2);
  const asJson = args.includes('--json');
  const writeEvidence = args.includes('--write-evidence');

  const runbook = JSON.parse(fs.readFileSync(RUNBOOK_JSON, 'utf8'));
  const browserCopy = readBrowserRunbook();
  const copyInSync =
    browserCopy !== null &&
    JSON.stringify(browserCopy) === JSON.stringify(runbook);

  const result = runTabletop(runbook);
  result.browser_runbook_in_sync = copyInSync;
  const ok = result.ok && copyInSync;
  result.ok = ok;

  if (writeEvidence) {
    fs.writeFileSync(EVIDENCE, JSON.stringify(result, null, 2) + '\n', 'utf8');
    process.stderr.write(`evidence written: ${path.basename(EVIDENCE)}\n`);
  }

  if (asJson) {
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  } else {
    const line = '-'.repeat(64);
    console.log('对开协议·桌面推演 / Two-Way Protocol tabletop');
    console.log(line);
    console.log(`规则出处：${runbook.rules_source}`);
    console.log('');
    console.log(`一、十二张班次卡：${result.services_schedulable}/${result.services_total} 满足六条规则，可进入运行图`);
    for (const f of result.services_failed) {
      console.log(`   ✗ ${f.service_id}: ${f.violations.map((v) => `${v.rule_id} ${v.why}`).join('；')}`);
    }
    console.log('');
    console.log(`二、闸门有效性（变异用例必须被拦下）：${result.mutation_cases_caught}/${result.mutation_cases_total}`);
    for (const m of result.mutation_results) {
      const mark = m.gate_is_live ? '✓' : '✗';
      console.log(`   ${mark} ${m.case_id} 应违反 ${m.must_violate} → 实际被 ${m.caught_by.join(',') || '（无）'} 拦下`);
    }
    console.log('');
    console.log(`三、展示页 runbook 副本与 JSON 主本一致：${copyInSync ? '是' : '否'}`);
    console.log(line);
    console.log(ok ? '结论：对开协议在本运行图上成立，且六道闸门均能判红。' : '结论：不成立，见上方 ✗ 项。');
    console.log(runbook.disclaimer_zh);
  }

  process.exit(ok ? 0 : 1);
}

main();
