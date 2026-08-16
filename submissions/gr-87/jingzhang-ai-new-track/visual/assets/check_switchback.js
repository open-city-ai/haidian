#!/usr/bin/env node
/**
 * check_switchback.js — JZ-SWITCHBACK-001「人字回退」四态回退核验器
 *
 * 机制来源：仿京张铁路青龙桥『人』字形线路（双机车折返爬坡）。
 * 「京张·新轨」AI 公共服务遇障碍时，须像人字线机车一样折返回人工轨道
 * （normal → degraded → paused → retired 逐级回退），不死磕、不绕行。
 *
 * 零依赖：仅使用 Node.js 内置模块（fs/path），不引用任何第三方包。
 *
 * 四态：
 *   normal   正常运行（三轨证据完整 + 6步公共服务链全链验证）
 *   degraded 降级人工（人工接管运行；证据有缺口或障碍未清除时折返至此）
 *   paused   暂停（障碍高 / 人工接管不可用 / 死磕上限，等待人工重新规划）
 *   retired  退场（三轨证据全缺，终态不可复活）
 *
 * 三轨证据：history_track(历史轨) / track_track(轨道轨) / data_track(数据轨)
 * 6步公共服务链：chain_steps_verified 须达 6（R7）
 *
 * 用法：
 *   node check_switchback.js <事件JSON文件>     # 从文件读入单个事件
 *   ... | node check_switchback.js              # 或从标准输入读入单个事件
 * 输出：单个事件的判定 JSON（verdict / rule_id / rejected / reason / rule_text）
 */
'use strict';

const fs = require('fs');
const path = require('path');

/** 四态集合 */
const STATES = ['normal', 'degraded', 'paused', 'retired'];

/** 三轨证据键名 */
const TRACK_KEYS = ['history_track', 'track_track', 'data_track'];

/** 规则库：触发规则编号 → 规则语义（可证伪的判定依据） */
const RULES = {
  R1: '三轨证据（历史轨/轨道轨/数据轨）必须齐备且 6 步公共服务链全链验证（chain_steps_verified>=6），缺一即不可进入或维持 normal 态',
  R2: '障碍等级>=高(2)且人工接管不可用：必须折返回 paused 态，禁止死磕、禁止隐瞒',
  R3: '恢复不对称：paused 必须连续两期合格（consecutive_normal_periods>=2）才可恢复 normal，单期合格不得越级',
  R4: '禁止局部修正：只修最差一项（fix_scope=single_item/partial）不得跳过整段重测（full_retest），恢复请求一律驳回',
  R5: '三轨证据全缺：证据完整性崩塌，服务必须退场 retired，禁止隐瞒运行',
  R6: '障碍等级=致命(3)：即使人工接管可用也必须折返 paused，不硬扛',
  R7: '6 步公共服务链未全链验证（chain_steps_verified<6）即视为证据不完整',
  R8: '障碍未清除时不得由 degraded 恢复 normal；障碍清除且证据完整方可恢复',
  R9: 'retired 为终态，任何事件不得复活',
  R10: '降级运行许可：人工接管可用且障碍未达致命/死磕上限时，允许折返 degraded 态运行',
  R11: '死磕上限：已尝试次数>=3 且障碍未清除，必须折返回 paused，交由人工重新规划',
};

/** 将输入值收敛为 [min,max] 内的整数；非法值回退到 fallback */
function clampInt(value, min, max, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

/** 规范化事件对象：容忍字段缺省，统一类型 */
function normalize(event) {
  const ev = event || {};
  const evidence = ev.evidence || {};
  return {
    event_type: typeof ev.event_type === 'string' ? ev.event_type : 'period_report',
    current_state: typeof ev.current_state === 'string' ? ev.current_state : 'none',
    target_state: typeof ev.target_state === 'string' ? ev.target_state : null,
    evidence: evidence,
    obstacle_level: clampInt(ev.obstacle_level, 0, 3, 0),
    human_takeover_available: !!ev.human_takeover_available,
    attempts: clampInt(ev.attempts, 0, 999, 0),
    consecutive_normal_periods: clampInt(ev.consecutive_normal_periods, 0, 999, 0),
    fix_scope: typeof ev.fix_scope === 'string' ? ev.fix_scope : 'none',
    hide_attempt: !!ev.hide_attempt,
    chain_steps_verified: clampInt(ev.chain_steps_verified, 0, 6, 0),
    test_section: typeof ev.test_section === 'string' ? ev.test_section : 'JZ-SW1',
    service: typeof ev.service === 'string' ? ev.service : 'jz-ai-00',
  };
}

/** 证据缺口描述：缺哪几轨 / 6步链未全验证 */
function describeGap(missingTracks, chainComplete) {
  if (missingTracks.length > 0) return missingTracks.join('/');
  return chainComplete ? '' : '6步链未全验证';
}

/** 组装判定结果；rejected 由「实际判定 ≠ 请求目标态」推出 */
function makeResult(verdict, ruleId, targetState, reason, extra) {
  const rejected = !!targetState && verdict !== targetState;
  return Object.assign({
    verdict: verdict,
    rule_id: ruleId,
    rejected: rejected,
    accepted: !rejected,
    reason: reason,
    rule_text: RULES[ruleId],
  }, extra || {});
}

/** 冷启动评估（current_state 为 none 或未知） */
function evaluateStart(ev, ctx, R) {
  if (!ctx.evidenceComplete) {
    const v = ev.human_takeover_available ? 'degraded' : 'paused';
    return R(v, 'R1', '证据缺口（缺[' + describeGap(ctx.missingTracks, ctx.chainComplete) + ']），不可进入 normal，折返' + v);
  }
  if (ctx.critical) return R('paused', 'R6', '致命障碍（>=3），禁止启动，折返暂停');
  if (ctx.exhausted) return R('paused', 'R11', '启动即达死磕上限（已尝试 ' + ev.attempts + ' 次），折返暂停');
  if (ctx.highNoHuman) return R('paused', 'R2', '障碍>=高且人工接管不可用，折返暂停');
  if (ctx.hasObstacle) return R('degraded', 'R10', '遇障但人工接管可用，折返降级人工运行');
  return R('normal', 'R1', '三轨证据完整、链验证齐全、无障碍，允许进入 normal');
}

/**
 * 人字回退四态核验：输入一个事件对象，输出判定结果。
 * @param {object} event 事件对象（字段定义见 switchback-protocol.schema.json）
 * @returns {{verdict:string, rule_id:string, rejected:boolean, accepted:boolean, reason:string, rule_text:string}}
 */
function check(event) {
  const ev = normalize(event);
  const trackFlags = {};
  TRACK_KEYS.forEach(function (k) { trackFlags[k] = !!ev.evidence[k]; });
  const missingTracks = TRACK_KEYS.filter(function (k) { return !trackFlags[k]; });
  const chainComplete = ev.chain_steps_verified >= 6;
  const evidenceComplete = missingTracks.length === 0 && chainComplete;
  const noEvidenceAtAll = missingTracks.length === 3;
  const obstacleLevel = ev.obstacle_level;
  const hasObstacle = obstacleLevel >= 1;
  const critical = obstacleLevel >= 3;
  const highNoHuman = obstacleLevel >= 2 && !ev.human_takeover_available;
  const exhausted = ev.attempts >= 3 && hasObstacle;
  const partialFix = ev.fix_scope === 'single_item' || ev.fix_scope === 'partial';

  const R = function (verdict, ruleId, reason) {
    return makeResult(verdict, ruleId, ev.target_state, reason, {
      test_section: ev.test_section,
      service: ev.service,
    });
  };

  // 终态守卫：retired 不可复活（R9）
  if (ev.current_state === 'retired') {
    return R('retired', 'R9', 'retired 为终态，禁止复活');
  }

  // 三轨全缺：证据完整性崩塌，强制退场（R5）
  if (noEvidenceAtAll) {
    const hideNote = ev.hide_attempt ? '且试图隐瞒运行（hide_attempt=true）' : '';
    return R('retired', 'R5', '三轨证据全缺' + hideNote + '：证据完整性崩塌，服务必须退场');
  }

  // 冷启动：current_state 为 none 或未知状态
  if (ev.current_state === 'none' || STATES.indexOf(ev.current_state) === -1) {
    return evaluateStart(ev, {
      evidenceComplete: evidenceComplete,
      missingTracks: missingTracks,
      chainComplete: chainComplete,
      critical: critical,
      exhausted: exhausted,
      highNoHuman: highNoHuman,
      hasObstacle: hasObstacle,
    }, R);
  }

  // 状态机主体：按当前态逐分支核验
  switch (ev.current_state) {
    case 'normal': {
      if (!evidenceComplete) {
        const v = ev.human_takeover_available ? 'degraded' : 'paused';
        return R(v, 'R1', '证据缺口（缺[' + describeGap(missingTracks, chainComplete) + ']），不可维持 normal，折返' + v);
      }
      if (critical) return R('paused', 'R6', '致命障碍（>=3），必须折返暂停，不硬扛');
      if (exhausted) return R('paused', 'R11', '已尝试 ' + ev.attempts + ' 次未果，达到死磕上限，折返暂停');
      if (highNoHuman) return R('paused', 'R2', '障碍>=高且人工接管不可用，必须折返暂停');
      if (hasObstacle) return R('degraded', 'R10', '遇障但人工接管可用，折返降级人工运行');
      return R('normal', 'R1', '三轨证据完整、链验证齐全、无障碍，维持 normal');
    }
    case 'degraded': {
      if (critical) return R('paused', 'R6', '致命障碍（>=3），降级态也必须折返暂停');
      if (exhausted) return R('paused', 'R11', '降级态已尝试 3 次未果，达到死磕上限，折返暂停');
      if (highNoHuman) return R('paused', 'R2', '人工接管不可用且障碍>=高，折返暂停');
      if (!evidenceComplete) return R('degraded', 'R1', '证据缺口，维持降级态，不得恢复 normal');
      if (hasObstacle) return R('degraded', 'R8', '障碍未清除，不得恢复 normal，维持降级折返运行');
      return R('normal', 'R8', '障碍清除且证据完整，允许恢复 normal');
    }
    case 'paused': {
      if (partialFix) return R('paused', 'R4', '只修最差一项（fix_scope=single_item/partial），禁止跳过整段重测，恢复请求驳回');
      if (critical) return R('paused', 'R6', '致命障碍持续，维持暂停');
      if (exhausted) return R('paused', 'R11', '死磕上限已达，维持暂停，交由人工重新规划');
      if (highNoHuman) return R('paused', 'R2', '障碍>=高且人工接管不可用，维持暂停');
      if (hasObstacle && ev.human_takeover_available) return R('degraded', 'R10', '人工接管可用且障碍未达致命，折返降级运行');
      if (hasObstacle) return R('paused', 'R2', '障碍未清除，维持暂停');
      if (ev.consecutive_normal_periods >= 2) {
        return R('normal', 'R3', '连续 ' + ev.consecutive_normal_periods + ' 期合格，达到恢复条件，恢复 normal');
      }
      return R('paused', 'R3', '仅 ' + ev.consecutive_normal_periods + ' 期合格，须连续两期才可恢复（恢复缓慢不对称设计）');
    }
    default:
      return R('paused', 'R9', '非法状态，折返暂停待人工处置');
  }
}

/** 命令行入口：单事件 JSON（文件或标准输入）→ 判定 JSON */
function main() {
  const args = process.argv.slice(2);
  let raw;
  if (args.length >= 1 && args[0] !== '-') {
    const file = path.resolve(args[0]);
    if (!fs.existsSync(file)) {
      console.error('错误：找不到事件文件 ' + file);
      process.exit(1);
    }
    raw = fs.readFileSync(file, 'utf8');
  } else {
    raw = fs.readFileSync(0, 'utf8'); // 标准输入
  }
  let event;
  try {
    event = JSON.parse(raw);
  } catch (err) {
    console.error('错误：事件 JSON 解析失败 — ' + err.message);
    process.exit(1);
  }
  console.log(JSON.stringify(check(event), null, 2));
}

if (require.main === module) {
  main();
}

module.exports = { check: check, RULES: RULES, STATES: STATES, TRACK_KEYS: TRACK_KEYS };
