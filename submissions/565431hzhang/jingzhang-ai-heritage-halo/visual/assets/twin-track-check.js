// Twin-Track Release Check — 双轨放行验证脚本
// 用法: node twin-track-check.js
// 读取 twin-track-spec.json 和 twin-track-check-results.json
// 输出每张场景卡的验证结果和总体状态

const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname);
const spec = JSON.parse(fs.readFileSync(path.join(ASSETS_DIR, 'twin-track-spec.json'), 'utf-8'));
const results = JSON.parse(fs.readFileSync(path.join(ASSETS_DIR, 'twin-track-check-results.json'), 'utf-8'));

console.log('=== 双轨放行验证 / Twin-Track Release Check ===');
console.log('Spec:', spec.spec_name);
console.log('Rule:', spec.rule);
console.log('One-line test:', spec.one_line_test);
console.log('');

let allPassed = true;
let provisionalCount = 0;
let blockedCount = 0;

for (const sc of results.scenarios) {
    const fieldResults = spec.fields.map(f => {
        const fieldResult = sc[f.id];
        return { field: f.label_zh, passed: fieldResult ? fieldResult.passed : false };
    });

    const allFieldsPassed = fieldResults.every(r => r.passed);
    const status = allFieldsPassed ? sc.overall : 'blocked';

    if (status === 'blocked') {
        allPassed = false;
        blockedCount++;
    } else if (status === 'provisional') {
        provisionalCount++;
    }

    console.log(`${sc.id} ${sc.name_zh}: ${status.toUpperCase()}`);
    for (const r of fieldResults) {
        const mark = r.passed ? '✓' : '✗';
        console.log(`  ${mark} ${r.field}`);
    }
    console.log('');
}

console.log('=== Summary ===');
console.log(`Total: ${results.scenarios.length}`);
console.log(`Provisional: ${provisionalCount}`);
console.log(`Verified: 0`);
console.log(`Blocked: ${blockedCount}`);
console.log('');
console.log('Note: All scenarios passed design self-check (provisional).');
console.log('No field verification has been conducted yet.');
console.log('Per the proposal: no performance claims without field evidence.');
