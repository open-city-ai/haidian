# Formal Narrative / 正式说明

## 1. Submission identity / 提交身份

- **Open call**: 百年京张 AI 创新带城市设计开源征集
- **Repository**: `open-city-ai/haidian`
- **Pull request**: #897
- **Submitter GitHub login**: `wocaonimaworinixi-collab`
- **Submitter name**: 森森
- **Declared AI agent**: `kimik3`
- **Package version**: v3.0
- **Package state**: `ready_for_review`

## 2. Design claim / 设计主张

**One-line claim**: 百年前京张铁路解决的是人和货怎么翻过山；今天这条走廊要解决的是人和智能体怎么共用一座城市。

The scheme upgrades the centennial Jingzhang railway heritage corridor from a passive green buffer into an active **interface of the city operating system**: the ground is a park for people, buildings and underground spaces carry computing and data, and across the interface run public services that citizens can read, regulators can audit, and machine agents can call.

## 3. Spatial structure / 空间结构

- **One belt**: 原力带 / Origin Force Belt — continuous heritage-slow-mobility spine.
- **Three zones**: Z1 众智园 AI 自主创新加速区, Z2 北京 AI 原点社区, Z3 大钟寺 AI 产业集聚区.
- **Two wings**: W1 中关村科技服务翼, W2 小月河场景赋能翼.
- **Five gates**: G1 轨道门户, G2 校园门户, G3 遗产门户, G4 产业门户, G5 河道门户.
- **Eight narrative landmarks**: M1–M8, each carrying a rule of use that prevents it becoming a monument.
- **Twelve components**: K01–K12, a reusable spatial-technical library.

## 4. Methodological highlights / 方法亮点

### 4.1 Single-source bilingual generation / 单一数据源双语生成

`proposal.md` (Chinese) and `proposal.en.md` (English) are rendered from the same set of data modules (`_build/data.py`, `_build/data2.py`, `_build/data3.py`) and section builders (`_build/sec1.py` through `_build/sec10.py`). The render pipeline guarantees:

- identical section order (13 required sections);
- identical block count per section;
- identical table row count per section;
- identical `###` and `####` heading counts per section;
- identical evidence-reference IDs in both languages.

### 4.2 Evidence-reference system / 证据引用体系

The proposal uses five structured reference types:

- `[source:ID]` — registered sources (7 IDs).
- `[depth:ID]` — 15 required design-depth items.
- `[standard:ID]` — 6 mapped standards.
- `[data:ID]` — geometry/metrics entries.
- `[metric:ID]` — metrics.json entries.

Every one of the 13 sections contains at least one evidence reference.

### 4.3 Provisional-boundary discipline / 临时边界口径

The official boundary is not yet available. All geometry and derived metrics are therefore declared provisional:

- `metrics.json` carries a `boundary_basis` object stating `official_boundary_available: false`.
- All derived metrics use `confidence: low` and `basis: provisional_boundary`.
- `floor_area_ratio` remains `status: unknown` because FAR exceeds the agent responsibility boundary.
- A recalculation interface is documented in `metrics.json` and illustrated in `assets/figures/metrics-evidence.png`.

## 5. Section mapping / 章节映射

| # | Chinese title | English title | Key contents |
|---|---|---|---|
| 1 | 设计依据与资料清单 | Design Basis and Source List | source grading, honest boundary statement, 6-dimension diagnosis |
| 2 | 三层范围工作框架 | Three-Level Scope Framework | coordinated/overall/key-area scopes, responsibility boundary |
| 3 | 统筹研究范围产业与未来城市研究 | Coordinated Research Area: Industry and Future City Research | 3 positions, 5 functions, 5 loops, 8 cases, regional coordination |
| 4 | 总体设计范围城市更新与控规深度城市设计 | Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design | one-belt-three-zones-two-wings-five-gates, intensity controls |
| 5 | 重点区域详细设计 | Detailed Design of Key Areas | 3 key areas, 8 landmarks, 12 components |
| 6 | AI 创新生态、人才画像与 AI+ 场景 | AI Innovation Ecosystem, Personas, and AI+ Scenarios | 8 personas, 12 scenarios (3 industrial validation), 8 governance constraints |
| 7 | 用地、建筑规模与拆改留方案 | Land Use, Building Scale, and Retain-Renovate-Demolish Strategy | function-list concept, 4-step RRD, reversible land covenant |
| 8 | 交通、轨道、市政与公共服务设施 | Transport, Rail, Municipal Infrastructure, and Public Services | 5-layer mobility, visitable computing, tidal computing quota |
| 9 | 蓝绿空间、公共空间与城市风貌 | Blue-Green Network, Public Space, and Urban Character | four-band section, LOGO identity, wayfinding, international narrative |
| 10 | 更新项目清单、实施政策与分期计划 | Renewal Projects, Implementation Policy, and Phasing | 12 projects, 16 mechanisms, 5 events, community+honours |
| 11 | 指标体系、面积复算与合规矩阵 | Metrics, Area Recalculation, and Compliance Matrix | evidence chain, recalculation interface, 3 matrices |
| 12 | 风险、版权与合规说明 | Risk, Copyright, and Compliance | boundary risk, copyright, data/algorithm risk, bilingual equivalence record |
| 13 | 参考资料 | References | registered sources, standards, 8 cases |

## 6. Compliance and self-check / 合规与自检

- Deterministic CI gate `submission-validation` **PASSED** at run `31314889123` (commit `7eb6e211`).
- Local re-validation will be run after final manifest update.
- `self_check.json` records five checks: boundary trust, key areas trust, land-use topology, visual static, professional evidence — all `pass`.
- Three matrices are included: `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json`.

## 7. Bilingual equivalence record / 中英文等价性记录

The equivalence between `proposal.md` and `proposal.en.md` is machine-verified by `gen_proposal.py`:

- Block parity: each section has the same number of `\n\n` separated blocks.
- Table parity: each section has the same number of Markdown table rows.
- Heading parity: each section has the same number of `###` and `####` headings.
- Evidence parity: both languages include all required `[source:]`, `[depth:]`, and `[standard:]` IDs.
- Figure parity: both languages embed the same five figures.

This `report/narrative.md` document itself is a human-readable summary of that machine-verifiable equivalence.

## 8. Known limitations and next steps / 已知限制与下一步

- Boundary geometry is provisional; official redline replacement will trigger the recalculation interface documented in `metrics.json`.
- Detailed regulatory controls, road redlines, ownership, municipal utilities, and engineering constraints require professional confirmation before statutory use.
- The submission is intentionally framed as a **conceptual urban-design package** that is auditable, recalculable, and ready for professional deepening.
