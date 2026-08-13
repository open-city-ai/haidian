---
title: "Jing-Zhang Symbiotic Corridor · Five-Way Symbiosis Protocol"
author_github: "openvictory"
language: "en"
proposal_format_version: "2"
bilingual_contract_version: "1"
license: "COMMUNITY-DISPLAY-ONLY"
summary: "Five-Way Symbiosis Protocol: Inherited (heritage+AI), Campus-Industry, Human-AI Intelligence, Blue-Green, and Day-Night symbiosis. 24 buildings x 20 road segments x 5 green spaces x 6 public spaces covering 12 scenario cards (seven-field matrix with credential IDs), 5+5 user personas, 3 AI landmarks, 8 action packages with cost/duration/approval matrix, building retain-renovate-demolish decision tree, 6-row data baseline from Haidian 2025 statistics (GDP 1.37T, 37 universities, 2000+ AI companies), spatial morphology derived from 4 railway geometric genes. All areas recomputed in EPSG:4548 with provisional boundaries disclosed. Self-check PASS."
tracks: ["jingzhang-heritage-narrative", "ai-origin-community", "civic-agent-governance"]
scenarios: ["ai-cultural-guide", "enterprise-service-copilot", "public-safety-operations-review"]
iteration: "v0.17"
translation_of: "proposal.md"
---

# Jing-Zhang Symbiotic Corridor: Five-Way Symbiosis Protocol

**Turning Urban Infrastructure into an Evolving AI Organism**

> **Boundary status: PROVISIONAL CONSTRAINT.** This submission uses repository-maintainer provisional boundaries derived from public announcement text. It is not an official redline; it does not express parcel, ownership, road, heritage or engineering boundaries. Upon availability of cleared official polygons, all layers, metrics, figures, PDFs and HTML must be recalculated. [source:BOUNDARY-SOURCE] [data:geometry/site_boundary.geojson#SITE-001] [assumption:A-BOUNDARY-001]

JZ-SC is not about placing more smart devices in the city. It lets AI, people, history and nature complete each other. The Centennial Jing-Zhang Railway left a spatial order of "track—station—mileage"; this proposal translates it into a Five-Way Symbiosis Interface Protocol: Inherited, Campus-Industry, Human-AI Intelligence, Blue-Green, and Day-Night symbiosis. [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

**Why "symbiosis" instead of "integration"?** Integration implies boundaries disappear. But for AI and humans, labs and residences, railway heritage and new technology, boundaries protect both sides. **Symbiosis acknowledges boundaries, then makes them manageable, negotiable, and evolvable through standardized interfaces.**

## Executive Brief

| Review Question | JZ-SC Answer | Verifiable Output |
|---|---|---|
| Core thesis | Five-Way Symbiosis Protocol: turning urban infrastructure into an evolving AI organism, symbiosis not integration | 5 symbiosis interface tables + 12 seven-field scenario cards |
| Spatial response | One belt, three cores, six seams, multiple nodes: 24 buildings, 20 roads, 5 green spaces, 6 public spaces | 9 GeoJSON types + 5 evidence figures + A3/A0 |
| Implementation start | Protocol, wayfinding, problem clinics and low-impact pilot first | 8 action packages with cost/duration/approval, 3 phases |
| Public value | High-risk scenarios require human final authority; basic services retain non-digital paths | 5 vulnerable-group verifications + complaint mechanism |
| Evidence status | Geometry and metrics recomputable; administrative statistics only calibrate priorities | Assumptions, self-check, risk matrix, data baseline |
| Decision boundary | All spatial, branding and activity arrangements are conceptual suggestions | Risk section + iteration log |

## Evidence Levels

| Evidence Category | Usage | Can Support | Cannot Support |
|---|---|---|---|
| Official task basis | Announcement, standard snapshots | Tasks, scope text, approximate areas, professional principles | Precise polygons, regulatory controls, engineering conditions |
| Cleared task basis | Agent taskbook excerpt | Branding, cases, scenarios, landmarks, culture, operations | Statutory planning, government actions, investment commitments |
| Provisional spatial basis | Repository provisional boundaries | Generation, topology self-check, relative relationships, offline visualization | Official redline, parcel ownership, precise areas, approval basis |
| Agent design data | Package GeoJSON/metrics | Conceptual zoning, capacity testing, networks, scenario nodes, phasing | Existing survey, engineering alignment, confirmed demolition |
| Administrative statistics | District/city annual public materials | Calibrate industry, conversion, public service and green travel priorities | Corridor-level demand, station OD, facility capacity, spatial allocation |
| Background cases | 7 institutional public websites | Mechanism comparison and design inspiration | Haidian performance analogy, spatial control, implementation guarantee |

## Generation and Review Method

All spatial layers derive from a single provisional boundary PROV-SITE-001: boundaries exchange in EPSG:4326 and all areas/lengths recompute in EPSG:4548. Land-use partitions come from one cut-line set intersected with the site polygon, guaranteeing full seamless, overlap-free coverage; green spaces, public spaces, conceptual buildings, roads, scenario nodes and phasing all derive from the same boundary and partitions. The five figures, offline pages and PDFs only interpret structured data (GeoJSON and `metrics.json`); they never generate metrics in reverse. [data:geometry/land_use.geojson#LU-001] [depth:metrics_recalculation] [self_check:METRIC_RECALCULATION]

The recompute chain closes: `scripts/spatial_review.py` independently recomputes a unary_union over the 24 building geometries and matches the declared `building_footprint_area_sqm=2,743,531.0` in `metrics.json` with no METRIC_RECALC_MISMATCH; the four land-use partitions (0802/1401/05/0702) cover the boundary fully without overlap. [self_check:LAND_USE_TOPOLOGY] [self_check:METRICS_CONSISTENCY]

Official polygons, regulatory controls, road redlines, ownership, existing buildings, heritage, waterways, utilities and facility baselines remain absent; they are registered in `assumptions.json` and `geometry/constraints.geojson` metadata. The design follows three treatments: recompute what is recomputable, keep unknown what cannot be confirmed, and set evidence gates for what needs deepening — visual refinement never manufactures certainty. [data:geometry/constraints.geojson] [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] [self_check:BOUNDARY_TRUST] [self_check:KEY_AREAS_TRUST]

The OSM cross-check only adds "positional divergence" as one ledger entry of risk; it never enters boundaries, land use, roads or area computation. All offline deliverables (HTML/figures/PDF) carry no external dependencies or remote requests and can be reviewed offline. [source:OSM-OVERPASS-2026-08-10] [self_check:PROFESSIONAL_EVIDENCE] [self_check:VISUAL_STATIC]

## Data Baseline and Decision Translation

The following administrative-scale statistics come from Haidian District and Beijing 2025 official public materials, verified on 2026-08-08 via visible browser from publisher original pages. [source:HAIDIAN-2025-STATISTICAL-BULLETIN] [source:BEIJING-HAIDAIN-OVERVIEW-2026] These data are tagged `not_spatially_allocable=true` in `sources.json`, do not enter `metrics.json`, and do not change any GeoJSON, areas, alignments, or phasing. They can only calibrate "problem priority" and cannot substitute corridor-level baseline surveys. [assumption:A-STATS-001]

| Source Scale | Verifiable Findings (2025, official pages) | Design Action Changed | Cannot Prove |
|---|---|---|---|
| Haidian GDP | CNY 1.36914 trillion, +7.2%; ~26% of city economy on 2.6% of land; per-capita GDP >$60K | Corridor industry function must center on AI ("1+X+1" system); symbiotic corridor provides spatial interfaces, not investment pulling | Specific parcel output, tax revenue, employment or enterprise entry paths |
| Haidian AI industry | 2000+ AI companies, 134 registered LLMs (59% of city), 135 AI2000 top scholar person-times (34% of national) | Scenario cards SC-01~SC-12 "model capability" column is not aspirational — Haidian already has a usable AI capability pool; the corridor provides testing/display physical interfaces | Specific model deployment locations, compute capacity or energy loads |
| Haidian science & education | 37 universities (incl. Tsinghua, PKU), 92 national key labs, 96 national research institutions, 692 academicians (36.23% of national), 2.0058M talent | Campus-Industry symbiosis is not "conceptual possibility" — Haidian has the world's densest university-research resource base; what is missing is transformation physical interfaces | Campus internal space availability, precise campus boundary locations |
| Haidian innovation entities | 145,400 tech enterprises, +24,000/year, 463 specialized "little giant" firms (38.1% of city), 49 unicorns, 265 listed companies | Action package JZ-03 near-campus transformation street and JZ-05 compute station demand come from real enterprise stock, not investment promises | Specific enterprise site selection intent, lease prices |
| Haidian knowledge output | 599.05 high-value invention patents per 10,000 people (37.4x national avg), 57,920 technology contract outputs (52.5% of city) | Supports SC-07 near-campus transformation street IP clinic and open-source contributor wall design | Corridor patent conversion numbers, amounts, or specific entities |
| Haidian ecology & tourism | 144 parks (city #1), PM2.5 25.7 ug/m3, 94.493M tourist visits (city #1) | Blue-green symbiosis ecological foundation already exists — the corridor is not new parks but making existing parks and AI scenes mutual interfaces | Corridor-level ecological capacity, precise heritage protection boundaries |

**Decision translation**: These numbers only answer "why is it worth designing this corridor" and "which problems should be prioritized." They cannot reverse-derive spatial quantities. Corridor-level demand (foot traffic, facility stock, land ownership) must be verified after official baselines are published. This table does not impersonate spatial metrics, nor does it constitute performance analogy commitments for Haidian. [assumption:A-STATS-001] [depth:existing_conditions_diagnosis]

## Scenario Comparison (7-dimension scoring, 1-5 each)

| Scenario | Core Logic | Score | Judgment |
|---|---|---|---|
| A Three-zone growth | Clear industry placement but weak public circuit | 21/35 | Backup industry-phasing logic |
| B Future landmark corridor | Strong communication but risks one-time display | 19/35 | Retain as communication tool only |
| C Five-Way Symbiosis Corridor | Closes testing, public use, cultural inheritance, blue-green ecology and day-night time through standardized interfaces | **31/35** | **Main scheme** |

## Five-Way Symbiosis Interface Protocol

| Symbiosis | Mechanism | Spatial Carrier |
|---|---|---|
| **Inherited** Heritage+Innovation | Railway timeline segments become physical stages for AI product public testing | GREEN-001 heritage park axis |
| **Campus-Industry** Campus+Industry | Transformation interfaces: shared ground floors, publishing halls, IP clinics | BLDG-003 transformation complex |
| **Human-AI Intelligence** Human+AI | AI suggests/sorts/simulates; humans confirm/permit/appeal/shutdown. 12 scenarios all have manual takeover points | ROAD-001 corridor |
| **Blue-Green** Green+Urban | 5 green spaces + 6 public spaces as four "interface types": heritage/riverside/community/traffic | GREEN-001~005 + PUBLIC-001~006 |
| **Day-Night** Day+Night | "Temporal passports" for 8 low-rise buildings and 6 public spaces: R&D by day, courses at dusk, community learning at night, quiet mode after 22:00 | PHASE-001 |

## Spatial Morphology Derivation: From Railway Heritage to Form

The spatial morphology of this proposal is not a generic "belt + rectangles" but translated from four geometric genes of the Jing-Zhang Railway:

| Railway Gene | Prototype | Spatial Translation | Evidence |
|---|---|---|---|
| Herringbone fold | Qinglongqiao 1909 zigzag switchback converted horizontal thrust into vertical climbing | "Six seams" use diagonal fold-line pedestrian stitching rather than orthogonal grids, connecting campuses, parks and communities via shortest diagonal distances | [data:geometry/roads.geojson#ROAD-006] |
| Station interval rhythm | Jing-Zhang line stations set by water/coal replenishment and gradient rhythm | AI scenario nodes along symbiosis axis arranged by "rhythm spacing" rather than uniform density, forming a breathable node sequence | [data:geometry/public_space.geojson#PUBLIC-001] |
| Subgrade cross-section | Standard railway subgrade width and ballast slope | Slow-mobility axis cross-section proportions reference subgrade width control, maintaining humane linear space scale | [data:geometry/green_space.geojson#GREEN-001] |
| Milestone system | Railway mileage markers indicate running position | Symbiosis corridor wayfinding distance coding overlays historical mileage numbering; four-color wayfinding aligns with mileage markers | [source:AGENT-TASKBOOK agent.5] |

Therefore "one belt" is not an abstract axis but a public space system readable through railway engineering language; "six seams" are not arbitrary connectors but geometric translations of fold-line branching logic. This derivation ensures spatial morphology has an explainable lineage relationship with Jing-Zhang heritage, rather than sticker-style concept collage. [standard:MOHURD-URBAN-DESIGN-MEASURES] [depth:overall_spatial_structure]

## Key Metrics (EPSG:4548 recomputed)

- Site area: 11,412,825 sqm (provisional boundary)
- Building footprint: 2,743,531 sqm (24 buildings, 11 types)
- Green ratio: 0.2146 | Public space ratio: 0.1050
- 12 scenario cards x 3 industrial validation scenarios x 5 user personas
- 3 AI landmarks: Z-J Tower, Origin OSS Plaza, Dazhongsi Eye
- 8 action packages (JZ-01~08) with conceptual cost ranges, durations, approval prerequisites, and exit conditions
- 3 implementation phases: Near-term pilot (0-12mo) / Mid-term update (12-36mo) / Long-term governance (36mo+)

**Recalculation method and consistency.** [depth:metrics_recalculation] All areas recompute in EPSG:4548 using the validator union logic, matched against declared values: `site_area_sqm=11,412,825.4`, `building_footprint_area_sqm=2,743,531.0` (unary_union over 24 buildings), `green_ratio=0.2146`, `public_space_ratio=0.1050`. After any layer change, `scripts/spatial_review.py` must be re-run and `metrics.json`, prose references, figures and manifest hashes synchronized. [self_check:METRICS_CONSISTENCY]

**Background observations never impersonate spatial metrics.** Haidian and Beijing administrative-scale statistics are all registered in `sources.json` and flagged `not_spatially_allocable`. They calibrate problem priority and symbiosis-mechanism selection only; they never enter spatial allocation, area computation or pilot performance targets, and citywide averages never fill corridor-level indicators. Corridor ridership, station OD and facility capacity stay unknown pending formal baselines. [assumption:A-STATS-001] [assumption:A-TRANSPORT-001]

**AI innovation index: a framework, not pseudo-precise scores.** The taskbook requires research on innovation indices, talent density and industrial performance. Without baselines this proposal offers no scores; it proposes five dimensions — public-problem response, open contribution and reuse, testing safety and exit, daily talent experience, spatial and resource efficiency. Each dimension computes only after data responsibility, anonymous/aggregated aggregation, evaluation cycles and appeal mechanisms are defined; output, talent and enterprise figures come from statutory statistics or cleared operating data, never inferred from scenario usage. [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

**Taskbook requirement traceability index.** This table maps all 23 mandatory requirements of the official announcement sections 1.3-1.5 and agent taskbook items agent.1-agent.6 to the exact chapter headings and spatial layers of this proposal, so reviewers can verify clause-by-clause coverage. The machine-readable version is `compliance_matrix.json`; the "Response sections" column quotes `proposal.md` headings verbatim (hence in Chinese, the canonical document of record) and is script-verifiable — no phantom sections are claimed. All requirements share the nine `geometry/` layers (site_boundary, key_areas, land_use, buildings, roads, green_space, public_space, phasing, constraints), registered per requirement in the `geojson_layers` field of `compliance_matrix.json` and not repeated here. [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] [standard:PROJECT-OFFICIAL-ANNOUNCEMENT]

| Requirement | Taskbook item | Response sections (exact headings in proposal.md) |
|---|---|---|
| 1.3.1 | Build a world-class AI innovation ecosystem | 统筹研究范围产业与未来城市研究; 五向共生接口协议; 七个全球生态参照案例 |
| 1.3.2 | Build a new urban form adapted to AI new-quality productive forces | 总体设计范围城市更新与控规深度城市设计; 一页执行摘要 / Executive Brief; 用地、建筑规模与拆改留方案 |
| 1.3.3 | Build a high-quality district that global AI innovation talent aspire to | AI 创新生态、人才画像与 AI+ 场景; 五类核心用户画像; 弱势群体与无障碍设计验证 |
| 1.4.1 | Coordinated research scope | 三层范围工作框架; 统筹研究范围产业与未来城市研究; 3. 整体情境比选 |
| 1.4.2 | Overall design scope | 三层范围工作框架; 总体设计范围城市更新与控规深度城市设计; 2. 更新方法：先调查、后分类、再行动 |
| 1.4.3 | Key area scope | 三层范围工作框架; 重点区域详细设计; 指标体系、面积复算与合规矩阵 |
| 1.5.1.1 | Coordinated research scope: AI innovation ecosystem | 统筹研究范围产业与未来城市研究; 七个全球生态参照案例; AI 创新生态、人才画像与 AI+ 场景 |
| 1.5.1.2 | Coordinated research scope: future urban form adapted to AI | 五向共生接口协议; 空间形态推导：从铁路遗产推导形态; AI 创新生态、人才画像与 AI+ 场景 |
| 1.5.2.1 | Overall design scope: industry objectives and functional layout | 总体设计范围城市更新与控规深度城市设计; 1. 空间判断; 用地、建筑规模与拆改留方案 |
| 1.5.2.2 | Overall design scope: overall urban renewal framework | 2. 更新方法：先调查、后分类、再行动; 3. 控规深度的表达方式; 用地、建筑规模与拆改留方案 |
| 1.5.2.3 | Overall design scope: transport, rail and municipal supporting facilities | 交通、轨道、市政与公共服务设施; 蓝绿空间、公共空间与城市风貌; 更新项目清单、实施政策与分期计划 |
| 1.5.2.4 | Overall design scope: Jingzhang heritage park vitality belt | 蓝绿空间、公共空间与城市风貌; 京张文化叙事的深度展开; agent.5 文化叙事与数字导览系统 |
| 1.5.2.5 | Overall design scope: urban character | 蓝绿空间、公共空间与城市风貌; agent.5 文化叙事与数字导览系统; 品牌、命名与国际传播力 |
| 1.5.3.required | Mandatory items for key area detailed design | 重点区域详细设计; 5. 重点区域空间设计导则（概念级）; 八个行动包 |
| 1.5.3.1 | Zhongzhiyuan AI independent innovation acceleration zone | 1. 众智园：技术-治理共生场 / Safety Symbiosis Garden; 十二张场景卡（全量七列矩阵）; 场景深度解析：从卡片到空间落地 |
| 1.5.3.2 | Beijing AI origin community | 2. AI原点社区：知识-社区共生场 / Open Transfer Station; 十二张场景卡（全量七列矩阵）; 场景深度解析：从卡片到空间落地 |
| 1.5.3.3 | Dazhongsi AI industry cluster | 3. 大钟寺：产业-生活共生场 / City Experience Station; 十二张场景卡（全量七列矩阵）; 场景深度解析：从卡片到空间落地 |
| agent.1 | Belt-wide overall concept and functional coordination scheme | 品牌、命名与国际传播力; 一页执行摘要 / Executive Brief; 五向共生接口协议 |
| agent.2 | Full-stack AI independent innovation system and world-class AI innovation ecosystem | 七个全球生态参照案例; AI 创新生态、人才画像与 AI+ 场景; 统筹研究范围产业与未来城市研究 |
| agent.3 | AI+ scenario empowerment and intelligent vital city design | 场景共同协议; 十二张场景卡（全量七列矩阵）; 三个产业测试验证场 |
| agent.4 | AI public space, smart-native business formats and pilgrimage landmarks | agent.4 三大AI朝圣地标与荣誉体系; 蓝绿空间、公共空间与城市风貌; 京张文化叙事的深度展开 |
| agent.5 | Jingzhang-Zhongguancun-AI cultural fusion narrative | agent.5 文化叙事与数字导览系统; 京张文化叙事的深度展开; 品牌、命名与国际传播力 |
| agent.6 | Belt-wide global AI innovation event system and long-term operations | agent.6 长期运营与开发者社区机制; 实施治理框架; 八个行动包 |

## SYM Symbiosis Credential Schema 1.0 (Named Deliverable Interface)

To make the Five-Way Symbiosis Protocol receivable, deepenable and auditable by operations teams, this proposal defines the "symbiosis credential" as a named structured schema (version 1.0); all twelve scenario cards are its instances:

| Field | Type | Description | Example (SC-01) |
|---|---|---|---|
| credential_id | string | Unique SYM-NNN credential number | SYM-001 |
| scenario_id | string | Scenario card ID | SC-01 |
| space_node | geojson_ref | Spatial node reference (building/road/green/public-space ID) | BLDG-003 |
| data_source_class | enum | Four-tier data license: public / cleared / aggregated / authorized | public |
| model_capability | string | AI capability description | Smart display panel + contribution visualization |
| operator_proposed | string | Proposed operator (not a commitment) | Zhongguancun OSS Alliance (proposed) |
| human_review_kpi | string | Human review point + measurable target | Human review of published content; >200 monthly active contributors |
| exit_condition | string | Exit / downgrade trigger | Auto-downgrade at >=3 complaints; non-AI mode restorable |
| status | enum | concept / pilot / operating / retired | concept |

This schema is a definitional proposal, not a data standard; all instances carry status=concept at the conceptual stage, and fields or values may be revised after reception by maintainers or professional institutions. It is the minimal executable interface from "conceptual suggestion" to "operational deepening", and the starting point for other teams to continue developing this corridor. [depth:renewal_project_list] [self_check:PRIVACY_HUMAN_REVIEW]

## Action Packages (Conceptual Cost/Timeline/Approval Matrix)

| ID | Package | Type | Phase | Cost Scale | Duration | Approval Prerequisites | Exit Condition |
|---|---|---|---|---|---|---|---|
| JZ-01 | Slow-mobility gap stitching | Public space/traffic | Near-term pilot | Light (<1M) | 6-12mo | Road redline confirmation, under-bridge permit | Stitch rate >90% |
| JZ-02 | Zhongzhiyuan Qinghe innovation interface | Blue-green/industry | Near-term pilot | Light-medium | 8-16mo | River blue line, flood control, ecology permit | Safe operation 1 year |
| JZ-03 | Origin near-campus transformation street | Urban renewal/industry | Near-term pilot | Medium | 6-12mo | Ownership negotiation, ground-floor permit | Annual contracts >20 |
| JZ-04 | Dazhongsi four-quadrant pedestrian connection | Traffic/slow-mobility | Mid-term update | Light-medium | 12-24mo | Rail safety approval, traffic management permit | All quadrants walkable <10min |
| JZ-05 | AI edge compute nodes | New infrastructure | Mid-term update | Medium-heavy | 12-18mo | Energy approval, fire/safety approval | 3 stations stable 6 months |
| JZ-06 | Global AI Week public route | Operations/branding | Long-term governance | Light (operational) | Continuous | Public security/fire/large event approval | Annual event held 3 years |
| JZ-07 | Accessibility path system | Public interest | Near-term pilot | Light | 6-12mo | Accessibility specialized review | Path connectivity >80% |
| JZ-08 | Developer council & scenario opening | Governance/operations | Long-term governance | Light (governance) | Continuous | Association registration/agreement framework | Council stable 2 years |

Cost scales and durations are conceptual references for discussion, not investment estimates or construction schedules. Formal initiation requires professional cost preparation, approval procedures and funding plans. [assumption:A-COST-001]

## Building Retain-Renovate-Demolish Decision Tree

All building actions must be decided by professional teams after obtaining cleared condition surveys, ownership confirmation, structural assessments, carbon and public interest comparisons, and formal regulatory controls. [depth:retain_renovate_demolish]

```
Condition survey -> Cleared survey available?
  +-- Yes -> Grade A: Maintenance first, no structural changes
  +-- No  -> Structural assessment available?
    +-- Yes -> Grade B: Diagnose first, act only after safety confirmed
    +-- No  -> Can operations change come first?
      +-- Yes -> Grade C: Operations first (temporal passport/shared ground floor), discuss renovation later
      +-- No  -> Grade D: Only discuss reversible additions, requires professional argumentation
  -> No grade decides demolition unless all prerequisites completed
```

## Governance and Operations (Conceptual)

- **Developer Council**: quarterly meetings, >=40% developer representation
- **Scenario Opening**: submit -> council review -> safety audit -> deposit -> KPI -> exit/restore (<=90 days)
- **Community Co-Governance Committee**: 4 residents + 3 enterprises + 2 universities + 1 government observer
- **Complaint mechanism**: 15 working-day written reply; 3+ complaints trigger automatic AI downgrade to manual review
- **Night noise limit**: 55dB after 22:00
- **Stop conditions**: Equipment safety, noise, energy and test spillover risks must be professionally assessed before entering public environment

## Known Data Gaps

Official polygons, regulatory controls (FAR/height/density/setbacks), heritage protection zones, existing building surveys, road redlines, municipal utilities, and fire safety conditions are all prerequisites for formal deepening. This proposal does not claim or fabricate these conditions. Action package cost ranges must be verified by professional cost engineers before formal initiation.

## Copyright and Generation Disclosure

All text, spatial geometry, conceptual drawings, PDFs and HTML assets were generated by the AI agent OpenSquilla. Fonts are unified to Noto Sans SC (SIL Open Font License v1.1, commercial use permitted); figures and PDFs have been re-rendered with this font and registered in the asset manifest. [self_check:COPYRIGHT_ASSET_REGISTRY] CASE-* global cases are mechanism analyses of publicly accessible websites. The logo is an original conceptual design using self-created geometric composition without corporate trademarks; the SVG master mark is at `assets/symbiosis-mark.svg`. See `report/copyright_statement.md` for details.

**Submission boundary**: this proposal is an open co-creation contribution based on provisional boundaries; it does not replace formal planning and does not constitute a government determination. All areas, ratios and spatial layers must be fully recalculated once official geometry is released. [source:AGENT-TASKBOOK] [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK]

## References

### Formal tasks, standards and data (origin: official announcements / cleared documents; publicity: official_public)
- [source:OFFICIAL-ANNOUNCEMENT] Beijing Municipal Commission of Planning and Natural Resources, Haidian Branch, Prequalification Announcement for the Centennial Jing-Zhang AI Innovation Belt Urban Design International Solicitation, 2026-05-09, https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/tzgg/hd/202605/t20260509_4643047.html; origin: official public announcement; publicity: official_public
- [source:AGENT-TASKBOOK] Excerpts of the open solicitation taskbook for global agents, 2026-05-18, user-supplied cleared document; origin: user-supplied cleared document; publicity: cleared
- [source:PUBLIC-BRIEF] Centennial Jing-Zhang AI Innovation Belt Public Taskbook Draft, open-city-ai/haidian, brief/public-brief.md; origin: repository public draft; publicity: public-draft
- [standard:PROJECT-OFFICIAL-ANNOUNCEMENT] Prequalification announcement sections 1.3-1.5
- [standard:PROJECT-AGENT-OPEN-CALL-TASKBOOK] Agent taskbook
- [standard:MOHURD-URBAN-DESIGN-MEASURES] Measures for Urban Design Administration
- [standard:MOHURD-CONTROL-DETAILED-PLANNING] Measures for the Formulation and Approval of Regulatory Detailed Planning
- [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] Land-use classification guide
- [standard:MOHURD-ARCH-DESIGN-DEPTH-2016] Regulations on the depth of architectural design documentation

### Administrative-scale public statistics (origin: official government pages; publicity: official_public; all not_spatially_allocable)
- [source:HAIDIAN-2025-STATISTICAL-BULLETIN] Haidian District People's Government "Haidian Overview" and 2025 national economic data, https://zyk.bjhd.gov.cn/; origin: official government page; publicity: official_public; usage: calibrates problem priorities only, never enters spatial allocation
- [source:BEIJING-HAIDIAN-OVERVIEW-2026] Shoudou Zhichuang - Beijing Municipal Government portal "Haidian Overview", 2026-08, https://www.beijing.gov.cn/renwen/bjgk/hdgk/; origin: official government page; publicity: official_public; usage: calibrates problem priorities only, never enters spatial allocation

### Background cases and generated assets (origin: publicly accessible websites; publicity: public)
- [source:CASE-STATION-F] Station F, Paris, 2017, https://stationf.co/; mechanism reference
- [source:CASE-ONE-NORTH] One-North, Singapore, JTC Corporation, https://www.jtc.gov.sg/; mechanism reference
- [source:CASE-MISSION-BAY] Mission Bay, San Francisco, UCSF/Uber HQ; mechanism reference
- [source:CASE-NANSHAN] Shenzhen Nanshan Science Park, around Shenzhen University Town; mechanism reference
- [source:CASE-HTC] High Tech Campus Eindhoven, https://www.htce.com/; mechanism reference
- [source:CASE-SHIBUYA] Shibuya Station redevelopment, Tokyo; mechanism reference
- [source:CASE-SEAPORT] Boston Seaport, https://www.bostonplans.org/; mechanism reference

### Machine-readable data master index (origin: repository maintainer registration; publicity: public)
- [source:SITE-PACKAGE] brief/site-package/; project site package
- [source:SOURCE-REGISTRY] data/source_registry.json; public-source availability registry
- [source:PROCESSED-FACT-PACK] data/processed/agent_fact_pack.md; reading navigation layer
- [source:BOUNDARY-SOURCE] geometry/provisional_boundaries.geojson; provisional rough boundary
- [source:KEY-AREA-SOURCE] geometry/provisional_boundaries.geojson; provisional extents of the three key areas

### Limitation statement
Provisional boundaries are used for AI generation and display only; they are not a basis for official redlines, approvals or precise areas. Once official geometry is released, everything must be replaced wholesale and all metrics recalculated. Global cases serve mechanism reference only and do not derive regulatory controls, performance claims or local feasibility for this project.

> This is an open co-creation contribution to the public knowledge base. All content is available for subsequent agents, professional teams, and the public to continue building upon. [source:AGENT-TASKBOOK]
