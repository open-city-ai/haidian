# 方案迭代记录

## v2.2 - 2026-08-31 (Round-4 repair per CocoSgt 79.0 review for PR #3873)

- **Repair offline report rendering**: Re-rendered `report/proposal.html` and `report/proposal.en.html` from the current bilingual proposal source, then embedded the licensed Noto Sans SC WOFF subsets with a consistent first-family override. Offline browser checks cover the title, body, tables and evidence anchors without tofu or replacement glyphs.
- **Rebuild mobility figure pair**: Replaced `assets/figures/mobility-bluegreen.png` and `.en.png` with a GeoJSON-derived bilingual map of the provisional overall scope, L1-L3 nodes, S01/S06/S08 scene links, slow-traffic spine, heritage strip, blue-green spaces and accessibility fallback notes. The English counterpart is English-only and uses the same geometry and information blocks as the Chinese version.
- **Refresh referenced deliverables**: Replaced the mobility panel in both A0/A3 language sets, regenerated HTML/visual and figure previews, and retained the existing page sizes, page counts and provisional/non-official warnings.

## v2.1 - 2026-08-30 (Round-3 repair per CocoSgt 77.0 review for PR #3873)

- **Reconcile Green Ratio Quant Caliber**: Unified green ratio to a single provisional caliber of ~10.4% (union green area 1,188,026 / union site area 11,412,825.386 sqm) across figures, HTML entries, proposal narrative, and metrics; the previously unsupported alternative ratio is not used.
- **Fix A3 English Booklet Cover**: Redesigned Page 1 cover layout in `drawings/a3-booklet.en.pdf` & `drawings/a3-booklet.pdf` with safe, generous padding on all 4 sides, eliminating title boundary clipping.
- **Disentangle Metrics Evidence Figure**: Redesigned `assets/figures/metrics-evidence.en.png` & `metrics-evidence.png` with horizontal bars for 6 count categories and dedicated cards for ratios, ensuring 100% non-overlapping legible text.
- **Regenerate Deliverables & Pass Four Gates**: Re-rendered all A3/A0 PDFs, proposal HTMLs, synced with valroot, and passed all four local validation gates (spatial, visual, professional, self-check).

## v0.2.0 - 2026-08-30

- **Reconcile Green Ratio Quant Caliber**: Unified green ratio to single verified caliber of ~10.4% (green_ratio = 1,188,026 / 11,412,825.386 sqm) across `land-use-structure.png` & `.en.png`, HTML previews (`visual/index.html`, `visual/index.en.html`), proposal narrative, and metrics. The previously unsupported alternative ratio is not used.
- **Fix A3 English Booklet Cover**: Redesigned Page 1 cover layout in `drawings/a3-booklet.en.pdf` & `drawings/a3-booklet.pdf` with safe, generous padding on all 4 sides, eliminating title boundary clipping.
- **Disentangle Metrics Evidence Figure**: Redesigned `assets/figures/metrics-evidence.en.png` & `metrics-evidence.png` with horizontal bars for 6 count categories and dedicated cards for ratios, ensuring 100% non-overlapping legible text.
- **Regenerate Deliverables & Pass Four Gates**: Re-rendered all A3/A0 PDFs, proposal HTMLs, synced with valroot, and passed all four local validation gates (spatial, visual, professional, self-check).

## v0.1.0 - 2026-08-24

- Initial assembly (concept package) for jingzhang-culture-signage.
- Proposal drafted via DeepSeek Harness (dsh-x), session unknown; edited for structure.
- Geometry/metrics/matrices generated deterministically; figures from real package data.
- Valroot gates run on 2026-08-24 (results persisted in self_check.json).

## v1.1 round-1 - 2026-08-25 (PR #3873 修复)

按 CocoSgt 评审意见逐项修复（详见各文件）：

- **双语合同补齐**：新增 8 张英文图件（共 14 张 .en.png）、2 份英文 PDF（a0-boards.en.pdf、a3-booklet.en.pdf）、report/proposal.en.html、visual/index.en.html；proposal.en.md 补 front matter（language=en、translation_of=proposal.md），proposal.md 声明 bilingual_contract_version=1 + translation_file；manifest.json 全部 .en 条目登记 language=en + translation_of；中英声明、指标、图件与PDF逐条人工核对实质等价。
- **方框字修复**：4 个 HTML 均通过 embed_fonts.py 嵌入许可明确的 Noto Sans SC（OFL-1.1）WOFF 子集（proposal.html 233KB），font-family 置首；逐页检查无乱码、无裁切、无空白页、最小字号合规、provisional 警告醒目（中英双语）。
- **agent.1-6 实质交付**：统一品牌与 Logo/VI（logo-jz 图 + 品牌节）；三大定位—五大功能—三区两翼协同回路图；6 个全球案例（带 sources.json 出处）；AI 生态图谱（七类要素 + 场景开放/开发者社区/招引转化）；12 张场景卡；3 个产业测试场景协议；3 个地标深化（平面/剖面/无障碍路线/视线/声音）；荣誉体系（「章痕荣誉章」）；组件库；开发者社区；场景开放与招引转化机制。
- **空间明确性**：概念底图标注北箭、比例尺、图例、地名与轨道/公交/道路/社区/遗存关系（全部标注示意，不冒充官方红线）；三个节点补平面、剖面、无障碍连续路线、视线与声音影响示意。
- **试点可执行矩阵**：责任角色（牵头/协作）、许可依赖、成本级别（低/中）、数据边界、维护服务水平、验收KPI、公众反馈、失败退出条件八列齐全；12 张场景卡全部附非AI降级路径。
- **消除误导性精度**：provisional 面积与比例取整显示（约1141公顷/约10.4%/约0.3%），标注低置信度、公式与复算触发；比率与计数分图表达；概念用地结构明确非现状、非法定；73 个旧 ID 中的日期串改为连字符形式避免长数字误读。
- **权利与署名**：删除「可放心用作」绝对表述，改为品牌在先权利与使用边界（内部工作代号）；sources.json 增加字体、图件、历史素材占位三类资产条目（license 字段齐全）；历史影像/口述音频未清权前仅用占位或公共领域替代物。
- **图件机器QC**：26 张 zh+en 图件（13 类）全部通过生成期渲染器文本包围盒检查与保存后 PIL/numpy ink/剪裁检查（figure_qc.json 注入 self_check.json[figure_qc]，overlap_clear=true 由生成期检查支持）；figsize 12x8@150dpi、标题≥18pt、标注≥11pt、provisional 双语印章齐备。
- **A0/A3 重制**：a0-boards 4 页（首屏标题 60pt、版式密集）、a3-booklet 6 页，中英各一份；首屏 ink 密度经 PyMuPDF 复核（0.28/0.11）。
- **指标体系**：每项指标注明数据来源、公式、置信等级、用途限制与复算触发；metrics.json 计数与正文可见证据一致（场景卡12/案例6/画像5/年度活动3/产业测试3）。
- **manifest 与自检**：55 项文件登记并刷新哈希；4 道门禁通过（deterministic/spatial/visual/professional）；validate_local_submission PASS；score_rubric 100.0/100、reviewer_gaps 为空、无强制拒收。

## v2.0 - 2026-08-30 (Round-2 repair per CocoSgt 81.0 CHANGES_REQUESTED)

- **assets/figures/metrics-evidence.en.png**: Rebuilt layout with expanded horizontal spacing and multiline category labels (Scenario cards, Global cases, Personas, Annual programs, Industry tests, Design nodes) with values and titles completely disentangled. No overlap between bar labels.
- **assets/figures/site-overview.en.png**: Verified and normalized "Beiwei Community intl. district (schem.)" naming and spatial hierarchy; clear boundary and legend alignment.
- **manifest.json / self_check.json**: All hashes updated and four gates (deterministic, spatial, visual, professional) re-verified and passed (formal-review-ready).
