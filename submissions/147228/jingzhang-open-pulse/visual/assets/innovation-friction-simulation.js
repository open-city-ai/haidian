#!/usr/bin/env node
/**
 * Reproducible screening simulation for the Open Pulse innovation loop.
 *
 * This is a design-screening model, not a field measurement or forecast. It
 * uses explicit triangular assumptions for six stages of an idea-to-impact
 * loop, then reports deterministic Monte Carlo summaries for three spatial
 * operating archetypes. Replace the assumptions with audited observations
 * before using the results for a professional decision.
 */

const fs = require("fs");

const SEED = 147228;
const DRAWS = 50000;

const STAGES = [
  "cross_domain_match",
  "space_access",
  "data_permission",
  "first_field_test",
  "first_real_user",
  "first_iteration",
];

const SCENARIOS = {
  S0_fragmented_corridor: {
    title_zh: "S0 碎片化走廊",
    description_zh: "能力、空间、数据和真实用户分散，依赖临时预约与个别联系人。",
    cross_domain_match_probability: 0.2,
    social_validation_probability: 0.08,
    stages_days: {
      cross_domain_match: [2.0, 4.0, 7.0], space_access: [2.0, 3.0, 6.0],
      data_permission: [5.0, 9.0, 15.0], first_field_test: [7.0, 12.0, 21.0],
      first_real_user: [14.0, 24.0, 42.0], first_iteration: [5.0, 8.0, 14.0],
    },
  },
  S1_generic_tech_park: {
    title_zh: "S1 一般科技园",
    description_zh: "企业、共享空间和活动被放在一起，但公共数据与真实问题接口仍弱。",
    cross_domain_match_probability: 0.35,
    social_validation_probability: 0.18,
    stages_days: {
      cross_domain_match: [1.0, 2.0, 4.0], space_access: [1.0, 2.0, 4.0],
      data_permission: [3.0, 5.0, 10.0], first_field_test: [4.0, 6.0, 12.0],
      first_real_user: [7.0, 12.0, 21.0], first_iteration: [4.0, 6.0, 10.0],
    },
  },
  S2_open_pulse: {
    title_zh: "S2 京张开源脉冲",
    description_zh: "三处节点提供跨域匹配、预约小测、最小化数据许可、公共问题入口和回执复盘。",
    cross_domain_match_probability: 0.55,
    social_validation_probability: 0.35,
    stages_days: {
      cross_domain_match: [0.5, 1.5, 3.0], space_access: [0.5, 1.5, 3.0],
      data_permission: [2.0, 4.0, 8.0], first_field_test: [4.0, 7.0, 14.0],
      first_real_user: [7.0, 12.0, 21.0], first_iteration: [4.0, 7.0, 12.0],
    },
  },
};

// Same MT19937 init and random() construction as Python's random.Random for
// a stable cross-language replay of the bundled JSON output.
class MersenneTwister {
  constructor(seed) {
    this.mt = new Uint32Array(624);
    this.index = 624;
    this.mt[0] = 19650218;
    for (let i = 1; i < 624; i += 1) this.mt[i] = (Math.imul(1812433253, this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)) + i) >>> 0;
    let i = 1; let j = 0; let k = 624;
    while (k > 0) {
      this.mt[i] = ((this.mt[i] ^ Math.imul(this.mt[i - 1] ^ (this.mt[i - 1] >>> 30), 1664525)) + seed + j) >>> 0;
      i += 1; j += 1; if (i >= 624) { this.mt[0] = this.mt[623]; i = 1; } if (j >= 1) j = 0; k -= 1;
    }
    k = 623;
    while (k > 0) {
      this.mt[i] = ((this.mt[i] ^ Math.imul(this.mt[i - 1] ^ (this.mt[i - 1] >>> 30), 1566083941)) - i) >>> 0;
      i += 1; if (i >= 624) { this.mt[0] = this.mt[623]; i = 1; } k -= 1;
    }
    this.mt[0] = 0x80000000;
  }
  twist() {
    for (let i = 0; i < 624; i += 1) {
      const y = (this.mt[i] & 0x80000000) | (this.mt[(i + 1) % 624] & 0x7fffffff);
      this.mt[i] = (this.mt[(i + 397) % 624] ^ (y >>> 1) ^ ((y & 1) ? 0x9908b0df : 0)) >>> 0;
    }
    this.index = 0;
  }
  uint32() {
    if (this.index >= 624) this.twist();
    let y = this.mt[this.index]; this.index += 1;
    y ^= y >>> 11; y ^= (y << 7) & 0x9d2c5680; y ^= (y << 15) & 0xefc60000; y ^= y >>> 18;
    return y >>> 0;
  }
  random() {
    const a = this.uint32() >>> 5; const b = this.uint32() >>> 6;
    return (a * 67108864 + b) / 9007199254740992;
  }
}

function triangular(rng, low, high, mode) {
  const span = high - low; const cut = (mode - low) / span; let u = rng.random();
  if (u > cut) { u = 1 - u; return high - span * Math.sqrt(u * (1 - cut)); }
  return low + span * Math.sqrt(u * cut);
}
function percentile(values, fraction) {
  const ordered = [...values].sort((a, b) => a - b);
  const index = Math.max(0, Math.min(ordered.length - 1, Math.ceil(fraction * ordered.length) - 1));
  return ordered[index];
}
function median(values) {
  const ordered = [...values].sort((a, b) => a - b); const middle = ordered.length / 2;
  return ordered.length % 2 === 0 ? (ordered[middle - 1] + ordered[middle]) / 2 : ordered[Math.floor(middle)];
}
function run() {
  const result = {
    schema_version: "1.0.0", model_id: "innovation-friction-v1",
    title_zh: "创新时延、跨域偶遇与社会验证筛查模拟", status: "screening_simulation",
    not_observed: true, seed: SEED, draws_per_scenario: DRAWS, stages: STAGES,
    unit: "calendar_days", purpose_zh: "比较三种空间—运营原型对 idea 到首次真实城市验证的摩擦，不预测真实项目工期。",
    evidence_boundary_zh: "输入是概念设计假设；结果只有在官方边界、场地网络、数据许可、真实用户和运营日志到位后才能被现场数据替换。",
    scenario_definitions: {}, results: {},
    decision_rule_zh: "S2 只有在不牺牲人的连续通行、照护、可负担性、隐私和人工退出的前提下，才可作为后续专业深化的候选。",
  };
  Object.entries(SCENARIOS).forEach(([scenarioId, scenario], offset) => {
    result.scenario_definitions[scenarioId] = scenario; const rng = new MersenneTwister(SEED + offset * 997);
    const totals = []; let matchHits = 0; let socialHits = 0;
    for (let draw = 0; draw < DRAWS; draw += 1) {
      let total = 0;
      STAGES.forEach((stage) => { const [low, high, mode] = scenario.stages_days[stage]; total += triangular(rng, low, high, mode); });
      totals.push(total); if (rng.random() < scenario.cross_domain_match_probability) matchHits += 1;
      if (rng.random() < scenario.social_validation_probability) socialHits += 1;
    }
    result.results[scenarioId] = {
      median_days: Number(median(totals).toFixed(3)), p90_days: Number(percentile(totals, 0.9).toFixed(3)),
      p05_days: Number(percentile(totals, 0.05).toFixed(3)),
      share_reaching_first_test_within_30_days: Number((totals.filter((value) => value <= 30).length / DRAWS).toFixed(5)),
      cross_domain_match_rate: Number((matchHits / DRAWS).toFixed(5)),
      social_validation_rate: Number((socialHits / DRAWS).toFixed(5)),
    };
  });
  const baseline = result.results.S0_fragmented_corridor.median_days;
  Object.values(result.results).forEach((summary) => { summary.median_reduction_vs_s0 = Number((1 - summary.median_days / baseline).toFixed(5)); });
  return result;
}
const outputIndex = process.argv.indexOf("--output");
const outputPath = outputIndex >= 0 ? process.argv[outputIndex + 1] : null;
const payload = `${JSON.stringify(run(), null, 2)}\n`;
if (outputPath) fs.writeFileSync(outputPath, payload, "utf8"); else process.stdout.write(payload);
