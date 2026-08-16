#!/usr/bin/env node
/* parity_check.js — CN/EN substantive parity per section (word/char method,
 * tables and code fences excluded). Writes parity_qa.json.
 * Baseline 0.784 words/char (field-calibrated over 41 scored packages); floor = 0.75 x baseline = 0.588.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const PKG = path.normalize(path.join(HERE, '..', '..'));
const BASELINE = 0.784;
const FLOOR = 0.75 * BASELINE;

function stripTablesCode(t) {
  const lines = t.split('\n');
  const out = [];
  let inCode = false;
  for (const ln of lines) {
    if (ln.trim().startsWith('```')) { inCode = !inCode; continue; }
    if (inCode) continue;
    if (ln.trim().startsWith('|')) continue;
    out.push(ln);
  }
  return out.join('\n');
}

function zhChars(t) {
  return (t.match(/[\u4e00-\u9fff]/g) || []).length;
}

function enWords(t) {
  return (t.match(/[A-Za-z][A-Za-z\-']*/g) || []).length;
}

function sections(t) {
  const parts = t.split(/^## /m);
  const out = [];
  for (let i = 1; i < parts.length; i++) {
    const lines = parts[i].split('\n');
    out.push([lines[0].trim(), lines.slice(1).join('\n')]);
  }
  return out;
}

function main() {
  const zh = stripTablesCode(fs.readFileSync(path.join(PKG, 'proposal.md'), 'utf-8'));
  const en = stripTablesCode(fs.readFileSync(path.join(PKG, 'proposal.en.md'), 'utf-8'));
  const zhSecs = sections(zh), enSecs = sections(en);
  const totalZh = zhChars(zh), totalEn = enWords(en);

  console.log('=== parity_check.js — CN/EN substantive parity ===');
  console.log(`baseline ${BASELINE} words/char (field-calibrated), floor ${FLOOR.toFixed(3)}\n`);

  let fails = 0;
  const rows = [];
  for (const [t, b] of zhSecs) {
    const zc = zhChars(b);
    if (zc < 30) continue;
    const anchor = (t.split('/').pop() || '').trim().slice(0, 28);
    let enBody = '';
    for (const [et, eb] of enSecs) {
      if (anchor && et.toLowerCase().includes(anchor.toLowerCase().slice(0, 18))) { enBody = eb; break; }
    }
    const ew = enWords(enBody);
    const ratio = zc ? ew / zc : 0;
    const passed = ratio >= FLOOR;
    if (!passed) fails++;
    rows.push({ section_zh: (t.split('/')[0] || '').trim().slice(0, 40),
                zh_chars: zc, en_words: ew, ratio: +ratio.toFixed(3), pass: passed });
    const flag = passed ? 'PASS' : 'FAIL';
    console.log(`[${flag}] ${(t.split('/')[0] || '').trim().slice(0, 36).padEnd(38)} zh=${String(zc).padStart(6)} en=${String(ew).padStart(6)} ratio=${ratio.toFixed(3)}`);
  }

  const overall = totalEn / totalZh;
  console.log(`\noverall: zh ${totalZh} chars, en ${totalEn} words, ratio ${overall.toFixed(3)} ` +
              `(${overall >= FLOOR ? 'PASS' : 'FAIL'}, floor ${FLOOR.toFixed(3)})`);

  const result = { method: 'English words per Chinese character, tables and code fences excluded; floor = 0.75 x 0.784 field baseline.',
                   floor: +FLOOR.toFixed(3), overall_ratio: +overall.toFixed(3),
                   overall_pass: overall >= FLOOR, sections: rows };
  fs.writeFileSync(path.join(HERE, 'parity_qa.json'), JSON.stringify(result, null, 1), 'utf-8');
  console.log('written: visual/assets/parity_qa.json');
  process.exit(overall >= FLOOR && fails === 0 ? 0 : 1);
}

main();
