# Formal Narrative (Derived Summary)

## What is being proposed?

A formal AI urban design package for the **Centennial Jingzhang AI Innovation Belt** (海淀 京张 智脉共生带) in Beijing's Haidian District, structured around the three-level scope announced by Beijing Municipal 规划和自然资源委员会 海淀分局 on 2026-05-09.

## One-sentence concept

> "A century of rails, an age of agents" — A century-old railway corridor becomes a shared spine for a global AI innovation belt, where rail heritage, AI R&D, university talent, and city life co-evolve as one symbiotic system.

## Why this concept?

- The corridor is anchored by the 1909 Jing-Zhang Railway (Beijing–Zhangjiakou), China's first independently designed railway. The "rail" layer is a real cultural asset that any AI scenario must respect.
- Haidian is already a global AI R&D concentration (中科院, 清华, 北大, 中关村, 北京 AI 原点社区, 大钟寺 AI 产业聚集区, etc.). The "agent" layer already exists in research and startups; what is missing is a public-facing spatial narrative.
- Combining the two gives a high-recognition concept that can travel internationally as "From rails to agents — a century of Beijing-Haidian innovation".

## How is the package structured?

- **Three scope levels**: 43.6 km² coordinated research / 11.4 km² overall design / 368.4 ha key detailed-design area.
- **Three key areas**: K1 众智园 AI 自主创新加速区, K2 北京 AI 原点社区, K3 大钟寺 AI 产业聚集区.
- **Two wings**: 中关村科技服务翼 (中关村科技服务) + 小月河场景赋能翼 (小月河 场景赋能).
- **Five functions**: AI 全栈自主创新体系, 世界级 AI 创新生态, AI+ 场景赋能新范式, 智能化 AI 活力城市, AI 治理全球话语权.
- **10 AI scenario cards** + **5 user personas** + **3 industry testbeds** + **3 AI pilgrimage landmarks** + **8 public-space components** + **4 annual events** + **6 renewal projects** + **8 global case studies**.

## What is *not* in the package?

- No statutorily approved FAR / height / density / setback / road-redline / municipal capacity conclusions.
- No personal data, internal maps, or non-public planning controls.
- No fabricated enterprise names, investment commitments, or government policy promises.
- No final Logo bitmap — only concept direction with the "人字形" rail × neural-net visual logic.

## How will a reviewer verify this package?

1. Open `proposal.md` → read sections, follow inline citations like `[source:...]`, `[standard:...]`, `[depth:...]`, `[data:...]`, `[metric:...]`.
2. Open `geometry/*.geojson` → check topology, layers, IDs, source_type, confidence, geometry_role.
3. Open `metrics.json` → check recomputed known metrics and unknown metric reasons.
4. Open `compliance_matrix.json` / `standard_matrix.json` / `design_depth_matrix.json` → see coverage of every agent task and standard.
5. Open `assets/figures/*.png` → see the visual interpretation of the same data.
6. Open `drawings/a3-booklet.pdf` and `drawings/a0-boards.pdf` → see presentation layouts.
7. Open `report/proposal.html` → see the offline reading version of the main proposal.
8. Open `visual/index.html` → see the offline professional evidence dashboard (overview map, three key areas, AI scenarios, personas, landmarks, metrics, self-check, sources, assumptions).
9. Re-run `python3 scripts/self_check_submission.py submissions/MiniMax-agent/jingzhang-rails-ai-belt --pr-author MiniMax-agent` → see deterministic + spatial + visual + professional review status.

## What is next?

The package is a v1.0 formal entry. If the official GIS/CAD redline, three-level scope polygons, three key-area polygons, or any official control data is released later, the contributor will:

- replace the provisional geometry,
- regenerate land-use / buildings / roads / green-space / public-space / phasing / constraints layers,
- recompute every metric in `metrics.json`,
- update `proposal.md`, `proposal.en.md`, `assets/figures/*.png`, `drawings/*.pdf`, and `visual/index.html`,
- rerun `finalize_submission.py` and `self_check_submission.py`,
- open a revision PR.
