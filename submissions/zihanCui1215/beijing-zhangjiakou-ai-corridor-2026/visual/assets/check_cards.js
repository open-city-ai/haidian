#!/usr/bin/env node
/* check_cards.js — verifies every scenario_cards.json entry resolves and is field-complete. */
'use strict';
const fs = require('fs');
const path = require('path');

const PKG = path.normalize(path.join(__dirname, '..', '..'));

function load(rel) {
  return JSON.parse(fs.readFileSync(path.join(PKG, rel), 'utf-8'));
}

function main() {
  const cards = load('visual/assets/scenario_cards.json').cards;
  const layers = {};
  let ok = 0, fail = 0;
  const required = ['id', 'name_zh', 'name_en', 'anchor_layer', 'anchor_feature',
                    'data_sources', 'model_boundary_zh', 'human_review_zh',
                    'degradation_zh', 'kpi', 'exit_zh'];
  for (const c of cards) {
    const cid = c.id || '?';
    const missing = required.filter(k => !c[k]);
    if (missing.length) {
      console.log(`[FAIL] ${cid}: missing fields ${missing.join(', ')}`);
      fail++;
      continue;
    }
    const layer = c.anchor_layer;
    if (!(layer in layers)) {
      try {
        const doc = load(layer);
        if (doc.features) {
          layers[layer] = new Set(doc.features.map(f => f.properties.id));
        } else if (doc.developer_community_operation) {
          layers[layer] = new Set(doc.developer_community_operation.cadences.map(x => x.id));
        } else {
          layers[layer] = new Set();
        }
      } catch (e) {
        console.log(`[FAIL] ${cid}: anchor layer unreadable: ${layer} (${e.message})`);
        fail++;
        continue;
      }
    }
    if (!layers[layer].has(c.anchor_feature)) {
      console.log(`[FAIL] ${cid}: anchor ${c.anchor_feature} not found in ${layer}`);
      fail++;
      continue;
    }
    if (!c.persona_ids || !c.persona_ids.length) {
      console.log(`[FAIL] ${cid}: no persona_ids`);
      fail++;
      continue;
    }
    console.log(`[PASS] ${cid} ${c.name_zh} -> ${layer.split('/').pop()}#${c.anchor_feature}`);
    ok++;
  }
  console.log(`\n=== check_cards.js: ${ok} PASS, ${fail} FAIL (${cards.length} cards) ===`);
  process.exit(fail ? 1 : 0);
}

main();
