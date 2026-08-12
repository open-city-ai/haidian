# Forest Rail · Supporting Narrative Notes

## Bilingual equivalence checklist (2026-08-10)

Checked after engineered figure rebuild from locked `metrics.json` and three-station upgrade.

| Pair | Map / claim | Metrics | Date footer | Nodes | Result |
|------|-------------|---------|-------------|-------|--------|
| site-overview ↔ .en | Same spine + 3 nodes | site≈11.41 km²; keys=3; nodes=3 | 2026-08 · provisional | Zhongzhiyuan / Origin / Dazhongsi | PASS |
| land-use-structure ↔ .en | Same nested tiers | 43.6 / 11.4 / 368.4 | 2026-08 | Same three nodes | PASS |
| key-areas ↔ .en | Three equal-depth columns | PROV-KEY-001/002/003 | 2026-08 | Distinct nodes | PASS |
| mobility-bluegreen ↔ .en | Four bands dual-rail | Schematic only | 2026-08 | Accessibility aligned | PASS |
| metrics-evidence ↔ .en | Same table keys | site + green/public derived + FAR unknown + min seats / tests / gates | 2026-08 | Matches metrics.json | PASS |

Rule: regenerate **both** zh and en from the same locked table.

## Prerequisites checklist (implementation)

| ID | Domain | Prerequisite | Owner | Cost band | Acceptance | Ops | Status |
|----|--------|--------------|-------|-----------|------------|-----|--------|
| PR-01 | boundary | Official polygons | organizer + planning | unknown | full package recalculate | design | blocked_on_organizer |
| PR-02 | planning | FAR/height/setbacks | planning | unknown | keep unknown until official | design | blocked_on_organizer |
| PR-03 | rights | Soft paving / seats / daily-point permits | district + owners | mid | MoU or temp permit | ops | pending |
| PR-04 | heritage | Jingzhang remnant constraints | heritage | low-mid | no climbable decorative rails | design | pending |
| PR-05 | traffic | Four-quadrant walk + crossing priority | metro + traffic | mid | walk continuity audit | transport | pending |
| PR-06 | drainage | Soft paving drainage | municipal water | mid | no ponding design-storm check | municipal | pending |
| PR-07 | fire | Access for desks / shuttles | fire | mid | access + hydrant plan | safety | pending |
| PR-08 | power | Seats / lights / edge nodes | grid / property | mid | peak load + min-seat backup | ops | pending |
| PR-09 | network | Offline terminal + human override | ops + IT | mid | offline failover drill | ops | pending |
| PR-10 | plants | Canopy survival | landscape | mid | 3-year survival TBD after soil survey | landscape | pending |
| PR-11 | desks | Min supply + cleaning | park ops | low-mid | daily min seats [metric:min_open_seats_count]; complaint SLA | ops | pending |
| PR-12 | av_safety | Isolated AI rail safety case + insurance + incident response | safety assessor | high | E-stop/yield docs; Gate NOT AUTHORIZED until signed | safety | concept_only |
| PR-13 | privacy | No face ID; appeal path | governance | low | DPIA-lite + review log | governance | pending |
| PR-14 | fair_siting | Low-demand min daily radius | ops + governance | low | weekly audit vs footfall-chase | ops | pending |
| PR-15 | lights | Glare limit + night walk audit | ops + accessibility | low-mid | no decorative-rail lighting; fault=dim/off | ops | pending |
| PR-16 | daily_goods | Vendor admission + food hygiene + stock liability | ops + market | mid | unbranded trial rules; upgrade needs human review | ops | pending |
| PR-17 | cyber | Terminal hardening + sensor isolation | IT + ops | mid | breach → isolate sensors | ops | pending |
| PR-18 | accountability | Named A-role for desk/AV pilots | district ops | unknown | G2 unassigned ⇒ no limited trial | governance | blocked_unassigned |

Machine-readable twin of this table may be regenerated; authoritative human-readable form is this file + `proposal.md`.
