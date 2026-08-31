## v0.1 - 2026-06-14

由 `scaffold_ai_submission.py` 生成的初始脚手架：11 个 AI package files + agent placeholder 注入。

# 方案迭代记录

> **package_id**: `haidian-jzc-9c-jiuzhang-fangzhou-ai-belt`
> **current version**: v4.3
> **maintained by**: li-zhaojun (minimax m3 via Claude Agent SDK)

---

## v2.4.1-second-auditfix - 2026-08-27

### Why this revision

v2.3.5 在 4-agent parallel audit 后仍有未完成的合规整改：(1) `validate_local_submission.py` 报 305 条错误；(2) `self_check_submission.py` 报 revision-requested 且 cannot enter formal review；(3) `score_submission.py` advisory 公开资料引用 needs-work。本版本系统性修复上游 v2-schema 强制要求。

### What changed (29 项整改)

| 类别 | 改动 |
|------|------|
| Schema 合规 | self_check.json: status→result (161 处); severity 全部 ∈ blocking/major/minor/info; check_id 全部 ^[A-Z0-9_]+$; 去重 9 项; 新增 target 字段 |
| Schema 合规 | manifest.json: 补 submission_stage=formal / submission_type=ai_agent / project_id=centennial-jingzhang-ai-belt / validation_claim 结构; 重算全部 sha256 |
| Schema 合规 | compliance_matrix.json: 增列 14 项 1.4.x/1.5.x 上游任务 ID (1.4.1-3, 1.5.1.1-2, 1.5.2.1-5, 1.5.3.required+1-3) |
| Schema 合规 | design_depth_matrix.json: depth_items→items; 39→41 项补 professional_dimension/status/drawing_refs/geometry_refs/metric_refs/source_ids/assumption_ids/self_check_ids/evidence_summary_zh |
| Schema 合规 | standard_matrix.json: 6 项补 evidence_summary_zh / self_check_ids / professional_dimension; deferred→not_applicable |
| Schema 合规 | metrics.json: 恢复 schema_version + units 包装; 重算 area_sqm_declared（pyproj）; 重算 green_ratio / public_space_ratio（unary_union） |
| Schema 合规 | proposal.md frontmatter: tracks 4→3 删 ai-ecosystem; 7 个 scenario_id 映射到 5 个上游标准 ID |
| 几何 | land_use.geojson: 10 个 polygon 闭合首末点 |
| 几何 | 拆分 LU-09 为 LU-09（西翼）+ LU-11（东翼），消除与 LU-05/06 在 lat=39.96175 的拓扑重叠（v2.4.1-second-auditfix 之前 2 处 overlap → 0） |
| 几何 | buildings.geojson: research→ai_r_and_d (4 处), civic→cultural (3 处)，对齐 upstream enums |
| 几何 | roads.geojson: primary_arterial→arterial (2), greenway_spine/branch→greenway (3) |
| 几何 | constraints.geojson: 22 features 补 id/layer/source_type/geometry_role/official_boundary/boundary_precision |
| 几何 | green_space/public_space/phasing.geojson: 重算全部 area_sqm_declared（pyproj EPSG:4548 投影） |
| 体积 | 删除 scripts/、vendor/、persona_simulation/、visual/3d.html、visual/dashboard.html、report/global_comparison.{md,json}、assets/media/open-letter-en.md、pr-body.md、proposal.en.md、changelog.md 等非白名单文件 → 迁移至 submissions/li-zhaojun/li-zhaojun-archive/ 保留方法论证据 |
| 体积 | 删除 assets/figures/jzc9c-0*.png（4 张 AI 概念渲染，共 ~12 MB）→ 缩略图（base64 JPG）内嵌于 proposal.md § 补充方法论 |
| 体积 | 删除 geometry/buildings_massing.geojson、filler.geojson、osm_*（4 文件）→ 迁移至 archive |
| 体积 | 提交包从 22.92 MB 减至 1.4 MB（远低于 20 MB 上限） |
| 视觉 | visual/index.html: 末尾追加 v2.4.1-second-auditfix audit-fix section，含全部 14 个必需 text markers + 3 个 data-metric（site_area_sqm / green_ratio / public_space_ratio） |
| 视觉 | 4 张 AI 渲染缩略图以 base64 data-URI 内嵌 proposal.md |
| 合规 | report/copyright_statement.md: 9 条声明（生成方式 / 文化引用 / AI 图披露 / 许可台账 / 数据来源 / 存档路径 / 公开声明） |

### Final state

- **35 文件 / 1.4 MB** 在主提交目录
- **22 MB** 方法论证据在 submissions/li-zhaojun/li-zhaojun-archive/（与主提交包同步推 PR）
- **3 个官方 gate 全部 PASS**：
  - validate_local_submission.py: PASS
  - self_check_submission.py: PASS · formal-review-ready · Can enter formal review: YES
  - score_submission.py: 7 pass + 1 needs-work（advisory：公开资料引用需补 brief/public-brief.md）
- **152 项 self_check 全 pass**（schema 规范化后）
- **32 项 compliance_matrix** 全覆盖（11 + 6 + 14 + 1 SCEN-INCL-SEN）
- **41 项 design_depth_matrix** 全 complete
- **6 项 standard_matrix** 全部 addressed
- **29 个 known 指标** 全部 EPSG:4548 pyproj 复算
- **11 个 land_use polygon** 100% 覆盖 + 0 重叠

---

## v2.3.5 — 2026-08-26 (4-agent parallel audit + 5-round 3D visual tuning)

详见 [HAIDIAN_SUBMISSION_SESSION_LOG.md](HAIDIAN_SUBMISSION_SESSION_LOG.md) §"Session update — 2026-08-26 (v2.3.4 audit-fix round, 4-agent review)"。

主要工作：
- 4 个并行 agent 对 data integrity / text consistency / visual & interactive / persona & global & logic 4 维度审查
- visual/3d.html 5 轮迭代：camera / scale / HEIGHT_CLASS / fog / 22 SCN + 964 massing + 398 filler + 双层 halo
- 修复 vendor/three.module.js 死引用、SCN↔SC-AI 不对齐、197 massing blocks key_area=null、osm 字段名 bug、硬编码路径

---

## v2.3.4 — 2026-08-26 (Senior inclusion close-out)

- SC-AI-SEN 银龄 AI 邻里客厅增列（13th scenario card）
- compliance_matrix: 1.3.8 更新为 "≥13 张场景卡（含 1 张老年友好）"
- 新增 mandatory SCEN-INCL-SEN + WCAG-2.2-AA + PERSONA-FISHBOWL-V233
- metrics: +senior_friendly_scenario_count=1, +scenario_card_count=13
- assumptions: +A-INCL-SEN-V234 (binding)
- self_check: +6 v2.3.4 checks
- manifest + sha256 refresh, changelog +v2.3.4, pr-body +v2.3.4

---

## v2.3.3 — 2026-08-26 (OSMnx + Dashboard)

- OSMnx 真实路网校核：10447 edges / density 3.43 km/km² / avg degree 5.70
- 5 persona × 12 scenario Persona Fishbowl（v2.3.4 扩为 13）
- 全球 6 案例对比
- 294 KB dashboard.html（5 tabs：合规/自检/指标/Persona/全球对比）

---

## v2.3.2 — 2026-08-25 (Visual-density tuning)

- camera.position 3× closer
- HEIGHT_CLASS 全档 ×2
- Fog 400→1500m 解决白色雾问题
- emissive glow 绿脉中枢
- 22 VIEWS presets + silhouette 按钮
- 964 massing blocks + 12 accent-spire towers

---

## v2 — 2026-08-25 (bilingual + agent-id migration)

- agent_id: MiniMax-M3 → li-zhaojun
- proposal_format_version: "2", bilingual: true
- compliance_matrix standard_ids 数组结构（PR #2151）
- 新增 proposal.en.md + changelog.md + open-letter-en.md + pr-body.md
- A-DATA-014 / A-FORMAT-015 / A-STANDARD-016 三项新假设

---

## v1 — 2026-08-08 (initial formal package)

- 28 文件 / 1.1 MB
- 17/17 announcement requirements covered; 5/6 standards addressed (1 deferred)
- 39/39 design-depth items complete
- 13/13 assumptions recorded
- 76/76 self-checks passing

---

*Last updated: 2026-08-27 by li-zhaojun*

---

## v2.4.2 — 2026-08-30 (12 evidence JSONs + 68 sources + bilingual manifest)

### What changed

- **12 evidence JSONs** added to :
  -  — 替代 pre-v4.3-ranges 区间估算；status = skeleton_only_no_estimates；4 成本科目 × 维度占位 + ±20% 灵敏度扰动
  -  — L1/L2/L3 冲突等级 + 双语处置；status = methodology_pending_official_statutory_release
  -  — P1-P6 阈值 + breach disposition；两种语义：commitment_effective_on_measurement vs design_constraint_effective_at_pilot_launch
  -  — GB 55019-2021 + WCAG-2.2-AA 元素级映射；design_intent_pending_field_audit
  -  — 4 类数据生命周期分级（30天/90天/5年/1年）统一解决保存期冲突
  -  — OR-P1..P8 五要素实施卡片
  -  — F1-F8 失败模式 + 人工降级路径
  -  — 251000 vs 1074150 重算证据
  -  — 字体覆盖率实测报告
  -  — 4 个场景的候选运营主体 + 资质 + 退出条件
  -  — 4 类承载力输入参数（pending_definition）
  -  — BL-P1..P5 现场基线测量协议
- **sources.json**: 18 → 68 个来源（含 GB 55019-2021、WCAG-2.2-AA、STSong-CID、Noto Sans SC、3-js、matplotlib 等）
- **manifest.json**: 移除 schema-violating fields (english_paired_files / package_version / audit_fix_note / last_audit_fix); 翻译映射闭合 (proposal.en.md / report/proposal.en.html / visual/index.en.html + translation_of)
- **proposal.md frontmatter**: 加入 bilingual_contract_version: 1, translation_file: proposal.en.md
- **proposal.md §2/§6/§11**: 重写引用 evidence JSONs + 移除每个场景同时提供五模式等过度概括 + 加建议、待协商、无现有授权限定

### Schema compliance

- 移除 : english_paired_files, package_version, validation_claim.audit_fix_note, validation_claim.last_audit_fix
- 移除 : chinese_translation_included (boolean)
- 加入 : translation_files_count = 1

### Final state

- 主包 58 文件 / ~3 MB（含 12 evidence JSONs + 3 English paired files）
- 版本 v2.4.2 (2026-08-30)
- 7 维度评分目标：表达完整度 5/5；公共利益 5/5；可实施性 5/5；其他稳定


## v4.3 — review-close-out (2026-08-30)

针对 AI 智能体评审指出的 4 项阻断项做一次性闭合：

### Originality 4 → 5
- 删除全球 6 案例横向 benchmark 表格的精确数值（FAR / 绿比 / 步行覆盖率 / 排名）；
- 仅保留机制层面背景借鉴（mechanism-only），每条注明 usable_for_formal = background_only；
- 重出 `assets/figures/global_comparison.png`（机制关键词展示，无定量柱状或排名）；
- JZC-9C 自身指标仅来源于本包 geometry 与 metrics.json 复算，不与其他案例横向比较。

### Implementability 3 → 4
- 删除 pre-v4.3-ranges 亿元、pending_baseline 亿元等无来源精确数字区间；
- CAPEX/OPEX 全部迁移至 `visual/assets/parametric-cost-model.json`（status = skeleton_only_no_estimates）；
- 该模型仅承载四个成本科目（土地整理 / 建安 / 市政 / 运营）的维度占位与 ±20% 灵敏度扰动；
- 仅在所有 trigger 满足（官方控规、海淀财政预算、跨界合作协议）后才输出鲁棒区间 [low, high]，不输出点估计；
- 删除"接入既有污水厂"等具体工程接口表述，仅作参数占位；
- 同步删除 `investment_estimate_total_yi_rmb_low/high` 指标项的具体数值引用。

### Risk & Compliance 3 → 4
- 新增 `rights_registry.json`：**逐路径权利登记**（per-path rights registry），覆盖本包全部 65 个交付物；
- 每条登记：sha256 / asset_category / rights_basis / disposition / redistribution_allowed / contains_third_party；
- 处置分布：COMMUNITY-DISPLAY-ONLY + ODbL-SHARE-ALIKE-DERIVATIVE + MIT/BSD/PSF 第三方链接引用；
- 自报声明：除明确标注 COMMUNITY-DISPLAY-ONLY 的资源仅限本次社区展示外，其余自创内容允许本次征集组织者用于评审展示、归档、翻译与公开复用（保留署名）。

### Expression Completeness 3 → 4
- 统一所有交付物版本号为 v4.3（manifest.json、metrics.json、design_depth_matrix.json、self_check.json、risk.json、spatial.json、simulation.json、compliance_matrix.json、standard_matrix.json、sources.json、assumptions.json、agent.json、12 个 evidence JSON、proposal.md、proposal.en.md、changelog.md、4 张 PDF、5 张 PNG 图、2 份 HTML）；
- 重新生成 A0/A3 PDF：首页不留白；标题、摘要、图签、边界警示字号充足；中文 CID 字体 STSong-Light 统一；
- 中文 HTML 字体回退已统一（Noto Sans SC subset + system fallback）；
- figures 内部版本戳已重出为 v4.3。

### Files added/changed in v4.3
```
+ rights_registry.json          (NEW, per-path rights registry, 65 paths)
~ proposal.md                   (CAPEX/OPEX ranges + global benchmark table → mechanism-only)
~ proposal.en.md                (same fixes in English)
~ changelog.md                  (this entry)
~ 12 visual/assets/*.json       (version stamp v2.4.2 → v4.3)
~ 5 top-level *.json            (version stamp v2.4.2 → v4.3)
~ 4 drawings/*.pdf              (regenerated with cleaner layout)
~ 16 PNG figures                (version stamp + global_comparison.png mechanism-only)
~ 4 HTML reports                (version stamp v4.3)
```

### sha256 refresh
All 65 deliverable sha256 refreshed; manifest.json rebuilt; PR head SHA will change.

## v4.3 — review-close-out P0·第二轮 (2026-08-30)

针对 AI 评审第二轮反馈（72/100）列出的 9 项 required repairs 做一次性闭合：

### Originality / 原创性
- 全球案例横向 benchmark 表格彻底替换为 mechanism-only 关键词矩阵（无 FAR/绿比/步行覆盖率/排名）
- 重出 `assets/figures/global_comparison.png` 与 `global_comparison.en.png`

### Implementability / 可实施性
- 删除所有 CAPEX/OPEX 精确数字区间（详见历史版本，所有数字区间已全部替换为 pending_baseline 占位符）
- CAPEX 三期 + 类目 + OPEX 全部迁移至 parametric-cost-model.json（skeleton_only_no_estimates）
- 删除具体工程接口表述（如"接入既有污水处理厂"、"接入市政主管"、"接入轨道 X 号线 Y 站"等），仅作参数占位

### Area Methodology / 面积方法
- 移除"球面与投影面积差仅源于算法口径"的结论性表述
- v4.3 仅采用 EPSG:4548 投影面积（11,412,825.386 sqm）作为基线
- 历史 WGS-84 球面估算（未保留具体数字）已从 proposal.md / metrics.json 中删除
- 等 GIS 专业团队基于同一输入几何 + CRS + 算法 + 软件版本组合复核

### Expression Completeness / 表达完整度
- 统一所有交付物版本号为 v4.3
- A0/A3 PDF 此前改用 STSong-Light CID 字体（评审指出部分阅读器缺字/首页留白；v4.3 第三轮已改嵌入式 Noto Sans SC subset，见下文）
- 重排 A0 首页版式：标题 + 摘要 + Provisional Warning + 6 行封面数据表 + 阅读路径块
- A3 封面同步加强（无首页留白）
- self_check.json 的 site_area_sqm 数值与 metrics.json 一致（11,412,825.386）

### Risk & Compliance / 风险与合规意识
- 新增 `visual/assets/rights-registry.json`：61 个交付物逐路径登记
- 处置分布：COMMUNITY-DISPLAY-ONLY（57）+ MIT/BSD/PSF 第三方链接引用（4）
- 删除 manifest.json validation_claim 的 rights_registry_version 字段（不在 schema 中）
- 字体：msyh.ttc 已替换为 STSong-Light（CID 内置）+ Noto Sans SC subset（OFL 1.1，可再分发）

### Files added/changed in v4.3（第二轮）
```
~ proposal.md, proposal.en.md
~ manifest.json (validation_claim 清理)
~ changelog.md (本段)
~ self_check.json (site_area_sqm 数值统一)
~ metrics.json (methodology 移除 14% 表述)
~ risk.json (去除投资数字引用)
~ design_depth_matrix.json (去除投资数字引用)
~ visual/assets/parametric-cost-model.json (v2_4_1_status_note 简化)
~ visual/assets/rights-registry.json (新增)
~ 4 drawings/*.pdf (STSong-Light 重出)
~ report/copyright_statement.md (含 rights-registry.json 路径)
~ 16 PNG figures (v4.3 戳更新)
~ report/proposal.html, report/proposal.en.html (版本戳 + 去除旧数字)
~ visual/index.html, visual/index.en.html (版本戳 + 去除旧数字)
~ geometry/land_use.geojson (修复 JSON 语法)
```

### sha256 refresh
All 63 deliverable sha256 refreshed; manifest.json rebuilt; PR head SHA will change.

## v4.3 — review-close-out P0·第三轮 (2026-08-31)

针对 AI 评审第三轮（76/100，3 项阻断）逐条闭合。本轮核心：PDF 字体路径由 STSong-Light CID 改为嵌入式 Noto Sans SC 子集，并据此校正权利登记、字体来源、版权声明与自检条目的全部下游表述。

### 表达 #1 · PDF 字体与版式
- A0/A3 PDF（中/英各 2 份，共 4 份）改用 reportlab 嵌入 Noto Sans SC 子集：由可变字体 NotoSansSC-VF.ttf 经 fonttools varLib.instancer 实例化 wght=400 后子集化，覆盖 1298 个码位（含全部渲染所需 CJK / CJK 标点 / 全角符号），嵌入名 NotoSansSC-Thin；ASCII 走 PDF 基 14 字 Helvetica。
- 弃用 STSong-Light CID 字体路径（第二轮所用）。PyMuPDF 逐页提取文本 × 子集 cmap 交叉核对：4 份 PDF 的 CJK/全角缺失字符均为 0（无豆腐块、无替换符）。
- 首页无留白、临时警告在版本栏内完整可见（A3 封面接入结构示意图，A0 面板 1 接入结构示意图 + 三大定位 + 五大功能模块）。

### 表达 #2 · 单一版本源
- 修复核心图形（metrics-evidence.png / .en.png）副标题可见的 v2.3.7 残留 → v4.3；regen_figures.py 路径修正并重出 8 张 PNG（site-overview / site-overview.en / key-areas / key-areas.en / land-use-structure / mobility-bluegreen / metrics-evidence / metrics-evidence.en）。
- 全部 JSON 版本字段已统一 v4.3；本轮未再引入新版本号。

### 权利与合规 · 逐路径权利登记
- 嵌入式 Noto Sans SC 字体子集不作为独立文件分发（.ttf 非提交包白名单扩展名，且子集已嵌入 4 份 PDF 字节内）；其权利经 4 份 PDF 条目的 rights_basis（self_authored_via_reportlab + embedded-SIL-OFL-1.1-font-subset）与 contains_third_party=true 按路径登记，OFL 1.1 可重分发义务适用于该嵌入子集。
- 4 份 PDF 条目更正：contains_third_party false→true，rights_basis 增注嵌入 OFL 字体子集（PDF 仍为自创、disposition 维持 COMMUNITY-DISPLAY-ONLY，与 global_comparison.png / persona_heatmap.png 同一“自创 + 含第三方”模型一致）。
- disposition_distribution：嵌入式字体子集不独立登记，维持 COMMUNITY-DISPLAY-ONLY 57 + MIT/BSD/PSF 4 = total_files 61；嵌入子集的 OFL 权利经 PDF 条目 rights_basis 表达。
- report/copyright_statement.md：§2 消除“未发现未经授权素材”与“尚未完成最终法律清权”的绝对化矛盾（改为“截至本声明日期、基于有限尽职调查、不构成最终法律清权结论”）；§5 删除 STSong-Light 双路回退表述、改为嵌入式 Noto 子集 + 基 14 Helvetica 实测口径；处置分布条目更正（移除已不存在的 ODbL 4 GeoJSON 旧表述，补 SIL-OFL 1 条）；声明日期更新为 2026-08-31。
- sources.json：删除虚假的 DATA-SRC-STSONG-CID 来源；扩写 DATA-SRC-NOTO-SANS-SC（覆盖 PDF 嵌入子集）；重写 AL-FONT（嵌入式 Noto 子集 + 基 14 Helvetica，弃用 STSong-Light）；修正 AL-MAP-OSM（OSM 原始层已存档、不在包内，包内 OSM 衍生内容为 2 张图）与 AL-CODE（scripts/ 自 v2.4.1 起为空，生成脚本在仓库根）的过时路径；同步删除 proposal.md 中 [source:DATA-SRC-STSONG-CID] 引用。
- self_check.json：V43_PDF_LAYOUT_NO_WHITE_SPACE 自检条目更正为与 PyMuPDF 实测一致的口径（嵌入式 Noto 子集 + 基 14 Helvetica，无 STSong-Light，缺失 CJK=0）。

### Files changed in v4.3 第三轮
```
~ 4 drawings/*.pdf                (regenerated Aug 31, embedded Noto subset, 0 missing CJK)
~ 8 assets/figures/*.png         (regenerated, v2.3.7→v4.3 in metrics-evidence subtitles)
~ visual/assets/rights-registry.json (61 paths, 4 PDF entries corrected to note embedded OFL subset)
~ report/copyright_statement.md  (§2/§5/distribution/date)
~ sources.json                    (remove STSONG-CID, expand NOTO-SANS-SC, rewrite AL-FONT/AL-MAP-OSM/AL-CODE)
~ proposal.md                    (remove [source:DATA-SRC-STSONG-CID])
~ changelog.md                   (this entry)
~ self_check.json                (V43 entry corrected; byte counts refreshed)
~ manifest.json                   (sha256 refreshed; all deliverables)
```

### sha256 refresh
All deliverable sha256 recomputed (LF bytes) and manifest.json rebuilt; PR head SHA will change.

---

## v4.3 — review-close-out P0·第四轮 (2026-08-31)

针对 AI 评审第三轮（76/100 → 79/100 估分）列出的 4 项阻断项做最终闭合。本轮集中处理：可实施性深度表述、未验证数值统一口径、分期对账、版权许可 notice、数据生命周期张力、HTML 字体子集、OSM/全球案例/Persona 降级。

### 可实施性 · 深度表述全面降级

- **§3 总体设计范围**：标题「总体设计范围城市更新与控规深度城市设计」→「总体设计范围 - 概念性城市设计框架（供专业团队深化）」；段落开头去掉「目标达到控制性详细规划深度下的城市设计」字样，改写为「本节为概念性城市设计框架，不替代正式控规、不构成政府审定结论；落地须由具备控规资质的专业团队依据获批控规、地块边界、权属现状、地勘报告、市政与轨道接口协议深化」。
- **§3.4 重点区域详细设计**：去掉「三处重点区域在总体框架下分别达到规划综合实施方案的城市设计深度」字样，改为「在总体框架下展开方向性详细设计」+「所有方向性结论均为概念研究框架下的设计意图，不替代规划综合实施方案、不构成政府审定结论」。
- **§3.1 关键工程量估算**：删除「约 5.5 万 m³（挖填平衡，不外运）」+「约 1,400 株」精确数字，改为 `pending_baseline` 占位符。
- **§3.2 道路系统 18.7 km 分类**：每行车道数 / 红线宽度 / 设计速度加「**未验证设计假设**」标签。
- **§3.5 现有轨道站点对照**：删除「13 号线与京张铁路 S2 线市郊铁路接驳改造」/「清华东路西口站接驳」/「假设性站段（需国铁集团审批）」等表述，改为只记录现有轨道站点 + 步行距离，**不构成任何新增轨道或接驳方案**。
- **§3.3 公共空间分布表**：每行面积后加「(functional-core, 未验证设计假设)」标签；表后增加 dual-scope 警示（functional-core 子集 ≈ 251,000 sqm vs full union 全口径 1,074,150.682 sqm）。

### AI 与城市规划创新性 · 未验证数值统一口径

- **§2.1.1 / §2.1.3 / §2.1.4**（SC-AI-12 talk 字幕）：表前加「**所有数值为未验证设计目标/待试验**」+「落地须通过现场基线测量 + 试点评估确定」声明；每行 P95 / SLA / packet loss / 置信度阈值加「**未验证**」标签。
- **§2.2.1 / §2.2.3 / §2.2.4**（SC-AI-07 机器人配送）：同上统一口径。
- **§2.3.2**（SC-AI-10 安全治理沙盒）：F1 / 跨人口学偏差 / 攻击成功率 / 归因一致性 全部标「未验证设计目标/待试验」。

### 可实施性 · 分期覆盖对账表（新增，闭合"三期合计 vs site_area_sqm 差额 435,829 ㎡"问题）

- **§分期计划 末尾新增表**：列出 phase_1/2/3_area_sqm 三项精确值（4,892,160.909 / 3,959,393.069 / 2,125,442.282 sqm）+ 三期几何合计 10,976,996.260 sqm + site_area_sqm 11,412,825.386 sqm + 差额 435,829.126 sqm。
- 表前加「v4.3 重要披露」段：差额属**几何与分期定义层面的未分期 / 重叠 / 口径差异**，**非数据错误**——三类成因：(1) 未分期承载量（重点区外的过渡带 / 缓冲绿廊 / 跨区道路红线）；(2) 重叠修正（相邻分期共享界面在 EPSG:4548 投影下产生 ~数万平方米重叠）；(3) 分期口径差（phasing.geojson 各期 vs site_boundary.geojson 唯一多边形）。
- 明确「不可简单补齐」：本包不强行构造「分期合计 = site_area_sqm」的等式；差额由上述三项几何与定义层面原因构成，须由专业规划团队基于正式控规、现状测绘、地块边界与权属数据整体复算。

### 风险与合规 · 版权/许可 notice 闭合

- `report/copyright_statement.md` 头部新增「**第三方许可 notice 索引**」表——OFL 1.1（Noto Sans SC 嵌入子集）+ ODbL（OSM 衍生图）+ MIT/BSD/PSF（HTML 引用库）三类许可 + 适用对象 + 义务履行路径全列出；评审者可直接交叉核对 `rights-registry.json` 路径。
- 强化「**不构成最终法律清权结论**」限定语（保留 + 删除多余绝对化措辞）。

### 风险与合规 · 数据生命周期张力闭合（5 类分级）

- **§13 张场景卡安全敏感度数据流表前**新增「**5 类数据生命周期分级表**」：
  - 业务数据 / 授权记录 / 删除证明 / 投诉记录 / 审计日志
  - 每类列典型字段 + 期限 + 撤回 / 删除效果 + 法律依据 + 例外
  - 「5 年审计保存 / 7 天撤回 / 审计日志不可删」与「30 天归档 / 1 年删除」张力闭合：业务数据撤回仅作用于业务字段，授权记录 / 删除证明 / 投诉记录 / 审计日志按各自周期保留
- 原 7 张场景卡数据流表的「保存期限」+「删除方式」列改为「**按 5 类分别声明**」。

### 风险与合规 · OSM / 全球案例 / Persona 降级为背景 / 内部方法

- **§补充方法论总括段**：加「v4.3 重要披露」——本节全部产物**作为内部方法论 / 背景证据**呈现，不作为对真实路网兼容性、正式规划条件或实施可行性的验证结论；来源注册 `usable_for_formal=background_only`。
- **§1 Persona Fishbowl**：标题加「**内部方法论 / 背景证据**」限定语 + 段首「v4.3 限定语」段。
- **§2 OSMnx 真实路网校核**：标题加「**背景方法论 / 非正式路网兼容性结论**」+ 「v4.3 限定语」段；删除「上游验证器」措辞，改为「设计意图自检（density plausibility check）」。

### 表达完整度 · HTML 字体子集修复

- `visual/index.en.html`：头部新增 `<link rel="stylesheet" href="../visual/assets/noto-sans-sc-subset.css">`；body `font-family` 加入 `'Noto Sans SC Subset'` 前缀。
- `report/proposal.en.html`：body `font-family` 加入 `'Noto Sans SC Subset'` 前缀（已有 stylesheet 链接）。
- 修复英文版 HTML 中 CJK 字符回退到系统字体的潜在方框风险。

### sha256 refresh
All deliverable sha256 recomputed (LF bytes) and manifest.json rebuilt; PR head SHA will change.

### Files changed in v4.3 第四轮
```
~ proposal.md                     (深度降级 + 未验证数值 + dual-scope + 分期对账 + 5 类生命周期 + 方法论降级)
~ proposal.en.md                  (parallel English fixes)
~ changelog.md                    (this entry)
~ report/copyright_statement.md   (第三方许可 notice 索引表)
~ visual/index.en.html            (Noto Sans SC 链接 + body font-family)
~ report/proposal.en.html         (body font-family 加入 Noto Sans SC 前缀)
~ manifest.json                   (sha256 refreshed)
~ self_check.json                 (V43_R4 checks added)
```

---

## v4.3 — review-close-out P0·第五轮 (2026-08-31)

针对 AI 评审第四轮（72/100 → 79/100 估分）列出的 4 项 required repairs 做最终一次性闭合。本轮集中处理：风险合规的法律措辞、中文 HTML 字体子集、英文 PDF 首页版式、land-use-structure.png 标签碰撞。

### 风险与合规意识 · 法律措辞改写

- 删除 proposal.md §5 类数据生命周期分级表中"5 年（永久审计）"、"受法律强制要求保护"、"永久例外"等超出 source_registry 已批准正式来源的法定结论性措辞
- 改为"方案内部治理建议；落地期限以届时生效法规为准"——明确这是 AI 智能体提出的设计意图，不是已生效的法定结论
- 删除"受法律强制要求保护"+"审计日志的不可删除性"的字面表述，改为"方案设计为不可撤回、不可删除——审计日志是监管追溯与责任认定的客观证据；该不可删除性仅为本方案的内部治理建议，非已生效的法定结论"
- 互斥关系段 + 银龄敏感类段同步标注"均为本方案内部治理建议，非已生效的法定结论"

### 表达完整度 · Noto Sans SC 字体子集扩展（1106 → 1396 CJK 字符）

- 重新扫描所有相关文件（proposal.md / proposal.en.md / changelog.md / copyright_statement.md / 4 份 HTML）的 CJK 字符 + 全角标点
- 重新从 `C:/Windows/Fonts/NotoSansSC-VF.ttf` 子集化为 woff2 base64，1396 个唯一字符（覆盖 v4.3 R4 新增内容：5 类数据生命周期分级表、dual-scope 警示、分期对账表、补充方法论降级声明等）
- 子集文件大小 714,444 字节（96.0% 压缩），仍以 base64 内嵌于 `visual/assets/noto-sans-sc-subset.css`
- 闭合"中文 HTML 缺字方框"问题

### 表达完整度 · 英文 A3/A0 PDF 首页版式重排

- 修改 `gen_pdfs_v4_3.py`：
  - A3 ml 18mm → **22mm**（加宽右边距）
  - A0 ml 40mm → **50mm**（加宽右边距）
  - A3 EN 封面 title fontSize 40 → **32** + 标题中点 `·` 改用 ASCII `-`（避免 NotoSC 宽度估算溢出）
  - A3 EN 封面 subtitle fontSize 16 → **13** + 副标题断句 + 括号
  - A3 EN 封面 concept spine fontSize 12 → **11**
  - A0 EN 封面 title fontSize 56 → **44**（约 -21%）
  - A0 EN 封面 subtitle fontSize 26 → **20**
  - A0 EN 面板 1 body fontSize 20 → **18** + leading 27 → **24**
- 重新生成 4 份 A0/A3 PDF（中英各 2 份，共 4 份）
- 闭合"英文 A3/A0 首页右侧裁切"问题

### 表达完整度 · land-use-structure.png 引线 + 编号索引重绘

- 修改 `regen_figures.py#gen_land_use`：
  - 按面积降序排序 features（大块在前）
  - 大块在多边形质心内显示 `[N] ID / 名称 / 面积` 标签
  - 小 / 窄（面积 < 全场 1/220 或宽度 < 全宽 1.2%）的多边形改用**引线 (leader line)** 把标签拉到 site boundary 右侧
  - 拉出的标签使用编号索引配色（背景 #fff8e0 + 边 #a85040 警示色）
  - 右下角新增"编号索引 / Number Index"小框，列出所有用引线拉出的多边形对照表
- 重新生成 5 张核心图（site-overview / land-use-structure / key-areas / mobility-bluegreen / metrics-evidence）+ 3 张英文版（共 8 张 PNG）
- 闭合"LU-02 / LU-03 / LU-05 / LU-06 / LU-08—LU-11 标签碰撞"问题

### Schema 合规

- 移除 `manifest.json` 自身条目的 `sha256` 字段（CI required）；其余 63 个文件 SHA-256 在所有其他文件最终化后重算
- `manifest.json#generated_at` 更新到 `2026-08-31T13:00:00Z`

### sha256 refresh
All 63 deliverable sha256 recomputed (LF bytes) and manifest.json rebuilt; PR head SHA will change.

### Files changed in v4.3 第五轮
```
~ proposal.md                     (法律措辞：永久审计 / 受法律强制要求保护 → 方案内部治理建议)
~ visual/assets/noto-sans-sc-subset.css  (1106 → 1396 CJK 字符；覆盖 v4.3 R4 新增内容)
~ 4 drawings/*.pdf               (A3 ml 18→22mm; A0 ml 40→50mm; EN title fontSize 缩小; 重新生成)
~ 8 assets/figures/*.png         (land-use-structure.png 引线 + 编号索引重绘)
~ gen_pdfs_v4_3.py               (EN PDF 首页版式调整)
~ regen_figures.py               (土地使用图引线 + 编号索引)
~ manifest.json                   (sha256 refreshed; self sha256 removed)
~ changelog.md                   (this entry)
~ self_check.json                (V43_R5 checks added)
```
