# 京张冬作版权、来源与 AI 生成声明

版本：v0.1（证据整理稿）  
日期：2026-08-10  
提交人：`cfxcode`  
方案许可：`COMMUNITY-DISPLAY-ONLY`

## 中文声明

### 1. 原创范围与许可边界

在不影响下述第三方权利、官方资料和开放数据许可的前提下，本提交主张以下内容为面向本征集独立生成和组织的表达：

- “京张冬作 / JINGZHANG WINTER WORKS”总体概念，以及“太阳—风雪—清雪—储雪—融水—回冻—无障碍—站口—春修”的完整冬季作业链；
- D0 干冷、D1 降雪作业、D2 融雪回冻三工况与 W1—W8 八项冬作的组合；
- 众智园“冻融共测场/低温生产支援院”、AI 原点“冬阳共学房/遗产冬护段”、大钟寺“雪晴换乘厅”的独立组合和本包文字表达；
- 本包的提案文字、双语翻译草稿、结构化 JSON、提交者设计 GeoJSON、代码生成示意图、图表编排和证据矩阵；
- 对公开方案所做的固定快照、固定关键词和近邻语义查重结果，但不包括被扫描方案本身。

本方案声明采用 `COMMUNITY-DISPLAY-ONLY`。该声明只处理本提交原创部分在本征集社区中的展示，不将官方公告、法律法规、标准、政府网页、案例网页、OpenStreetMap、仓库维护者临时边界、同业方案、字体或其他第三方材料重新许可。它也不授予超出仓库规则、权利人许可或法律允许范围的转载、改编、商品化或训练权。

### 2. 同业近邻、许可与不复制记录

同业审查固定在 `open-city-ai/haidian` 的 `origin/main` commit [`a88a818ff044c5c945ad9d2924d782457b5010a7`](https://github.com/open-city-ai/haidian/tree/a88a818ff044c5c945ad9d2924d782457b5010a7/submissions)，扫描时间为 2026-08-10 14:09:40（Asia/Shanghai），glob 为 `submissions/*/*/proposal.md`，共 400 个方案目录。标题冬季主命题为 0；按 `git grep -Il` 对各精确中文短语逐次扫描，积雪/结冰/冻融/融雪/清雪/寒潮/低温/除雪分别命中 4/5/3/2/1/1/3/1 个文件，回冻/结冰预测/冻融材料测试/风雪站口换乘均为 0。关键词文件命中只作差异线索，不构成语义原创证明。

相较前一快照新增 1 个目录：`2830500285/jingzhang-open-loop` 只在四季活动中设置冬季年度复盘；同时复核两份修订稿：`wms2537/jingzhang-city-model-commons` 是与冬季无关的通用仿真压力测试，`xr843/jingzhang-two-way-line` 只有余热暖廊/温室子项。三者均无完整清雪—储雪—融水—回冻作业链，因此不改变下列近邻许可记录与零复制决定。

| 近邻方案 | 作者声明许可 | 相似点与本案独立边界 | 复用决定 |
| --- | --- | --- | --- |
| [京张水准线](https://github.com/open-city-ai/haidian/tree/a88a818ff044c5c945ad9d2924d782457b5010a7/submissions/jiangmuran/jingzhang-leveling-line) | `COMMUNITY-DISPLAY-ONLY` | 已明确冰雪/低温机器人复测、除雪冲突和停运条件；本案不使用“水准线、闭合差、认证复测”叙事，独立完成冬季空间作业链 | 不复制文本、图件、几何、代码、版式、品牌或独特表达 |
| [京张智候线](https://github.com/open-city-ai/haidian/tree/a88a818ff044c5c945ad9d2924d782457b5010a7/submissions/luther-3/jingzhang-climate-intelligence-line) | `COMMUNITY-DISPLAY-ONLY` | 已覆盖多状态气候韧性与公共健康；本案不使用“六状态、四季实验室、候场门”，只做北京冷季物理作业图与剖面 | 仅查重，零资产复用 |
| [云下有荫](https://github.com/open-city-ai/haidian/tree/a88a818ff044c5c945ad9d2924d782457b5010a7/submissions/PelyYan/shade-the-cloud) | `COMMUNITY-DISPLAY-ONLY` | 已覆盖热预算、遮荫、降温、雨洪，并触及冬季日照/结冰；本案不使用“气候公地、凉岛、凉行门”，以清雪—储雪—回冻闭环区分 | 仅查重，零资产复用 |
| [京张热力带](https://github.com/open-city-ai/haidian/tree/a88a818ff044c5c945ad9d2924d782457b5010a7/submissions/LING71671/jingzhang-thermal-belt) | `COMMUNITY-DISPLAY-ONLY` | 已覆盖算力余热、恒温生活和温度感知空间；本案不把余热融雪作为默认方案，也不使用“热力带”叙事 | 仅查重，零资产复用 |
| [京张开源脉冲](https://github.com/open-city-ai/haidian/tree/a88a818ff044c5c945ad9d2924d782457b5010a7/submissions/147228/jingzhang-open-pulse) | `COMMUNITY-DISPLAY-ONLY` | 已把冬季冻融、防滑和低温机器人纳入综合韧性压力测试；本案不使用“一构件一智证、脉冲、闸门”，而把冬季作为主设计对象 | 仅查重，零资产复用 |
| [MEND JINGZHANG](https://github.com/open-city-ai/haidian/tree/a88a818ff044c5c945ad9d2924d782457b5010a7/submissions/DENGDixin/mend-jingzhang) | `COMMUNITY-DISPLAY-ONLY` | 已以照护、修复、维护班组和全生命周期为总叙事；本案不使用 MEND/MENDWAY/Repair Works/工具坞等表达，维护人员只作为冬季作业链使用者 | 仅查重，零资产复用 |
| [京张交接线](https://github.com/open-city-ai/haidian/tree/a88a818ff044c5c945ad9d2924d782457b5010a7/submissions/Sonike/jingzhang-handover-line) | `COMMUNITY-DISPLAY-ONLY` | 已覆盖交接班、人工接管和可逆场景，促使本案放弃早期“交接”方向；冬作不声称交接协议或交接线原创 | 仅查重，零资产复用 |
| [京张共行环](https://github.com/open-city-ai/haidian/tree/a88a818ff044c5c945ad9d2924d782457b5010a7/submissions/147228/mobility-commons-jingzhang) | `COMMUNITY-DISPLAY-ONLY` | 已覆盖路缘时段账本、装卸和无障碍优先，促使本案放弃早期路缘方向；冬作只在清雪断面处理路侧空间 | 仅查重，零资产复用 |

上述近邻的作者、URL、commit、许可和相似性处理也逐条写入 `sources.json`。即使某方案未来改用更宽松许可，本提交仍选择不复制其表达，以避免许可允许与原创性判断混为一谈。

### 3. 官方文件、标准与案例资料

公告、法律法规、地方标准、政府规划/公示和政府案例只用于：

- 识别任务、适用规则、政策方向、公开状态和案例机制；
- 以短摘要和链接归因，不复刻原页面、标准版式、地图、照片、插图、表格或宣传语言；
- 不把全市政策写成场地实测，不把草案写成现状或已批，不把案例数字写成北京指标。

Edmonton、Oulu、Singapore Rail Corridor、Paris Petite Ceinture、one-north、Punggol、Seoul AI Hub、Mila、Pittsburgh Robotics Network、Kendall/Volpe、张江等只提供可讨论机制。其气候阈值、土地制度、机构权限、企业/人才数字、投资、知识产权、采购、合同和品牌均未移植。完整 URL、使用边界和许可说明见 `sources.json`。

### 4. 开放地图与仓库临时边界

- OpenStreetMap：仅用于带署名的粗略路网/地名筛查，归属 **© OpenStreetMap contributors**，许可为 [ODbL](https://www.openstreetmap.org/copyright)。当前提交不再分发 OSM 数据库摘录、瓦片或声称由 OSM 支撑的测绘/红线/工程结论。若后续导入并分发衍生数据库，须另行履行 ODbL 的署名、数据库许可与显著告知义务。
- `brief/site-package/geometry/provisional_boundaries.geojson`：由仓库维护者提供，只作为临时 intake/可视化/拓扑容器。本提交不声称其为原创测绘，也不把它重新许可为官方红线。官方 polygon 到位后须全包重算。

### 5. AI 生成图、代码生成图和字体

- `assets/render/winter-works-concept.png` 于 2026-08-10 使用 Codex 内置的 OpenAI 图像生成工具全新生成，未传入参考图；精确底层图像模型未向当前工作流暴露。提示词概述为：“北京冬季城市设计概念场景，首清无障碍路线、向阳临时储雪、融水路径、冬阳遮蔽空间与人工维护人员；无文字、无 Logo；非实景。”正文已将其标注为 AI 生成、非实景、非现状证据、非工程图和非批准方案。
- `assets/figures/*.png` 与 `assets/figures/*.en.png` 为本包根据原创设计内容和结构化数据生成的中英文示意图；未嵌入第三方照片、地图瓦片或同业图件。
- `drawings/a3-booklet*.pdf` 与 `drawings/a0-boards*.pdf` 为本包生成的排版成果。PDF 文字使用 [Maple Mono NF CN](https://github.com/subframe7536/maple-font) Regular/Bold，并以 TrueType 子集嵌入；上游声明采用 SIL Open Font License 1.1。提交目录不另行分发字体文件，字体仍按其上游许可使用，不因本声明被重新许可。

### 6. 不构成的权利或结论

本声明不构成法律意见，也不证明：官方边界、控规、权属、文保、道路、管线、消防、站区、无障碍或工程条件已确认；任何合作、资金、采购、测试、数据处理或运营已经授权；任何 AI 场景已备案、通过安全评估或可投入使用。正式投稿前仍需人类作者、版权负责人和相关专业人员复核。

---

# Copyright, Sources and AI-Generation Statement

Version: v0.1 evidence draft  
Date: 2026-08-10  
Contributor: `cfxcode`  
Proposal licence: `COMMUNITY-DISPLAY-ONLY`

## 1. Original scope and licence boundary

Subject to all third-party rights, official-source limits and open-data licences below, this submission claims independent authorship/assembly of:

- the overall “JINGZHANG WINTER WORKS” concept and the complete sun–wind/snow–clearing–storage–meltwater–refreeze–accessibility–station–spring-repair operations chain;
- the combined D0 dry-cold, D1 snowfall operations and D2 melt/refreeze conditions and W1–W8 work packages;
- the independently expressed combinations for Zhongzhiyuan, the Beijing AI Origin Community and Dazhongsi;
- proposal text, draft translation, structured JSON, submitter-designed GeoJSON, code-generated diagrams, layouts and evidence matrices; and
- the reproducible peer-difference scan, excluding the peer works themselves.

`COMMUNITY-DISPLAY-ONLY` applies only to community display of original submission content. It does not relicense official announcements, laws, standards, government or case webpages, OpenStreetMap, repository-maintained provisional boundaries, peer submissions, fonts or any other third-party material. It grants no republication, adaptation, commercial, training or other right beyond repository rules, applicable permissions and law.

## 2. Peer review and no-copy decision

The originality review is pinned to `origin/main` commit [`a88a818ff044c5c945ad9d2924d782457b5010a7`](https://github.com/open-city-ai/haidian/tree/a88a818ff044c5c945ad9d2924d782457b5010a7/submissions), scanned at 2026-08-10 14:09:40 Asia/Shanghai over `submissions/*/*/proposal.md` (400 proposal directories). No title uses winter as its primary proposition. Separate exact-Chinese-phrase `git grep -Il` passes found 4/5/3/2/1/1/3/1 files for snow accumulation / icing / freeze–thaw / snowmelt / snow clearance / cold wave / low temperature / snow removal; refreezing / icing prediction / freeze–thaw material testing / wind-and-snow station transfer each found 0. Keyword file hits are difference clues, not proof of semantic novelty.

One directory was added since the previous snapshot: `2830500285/jingzhang-open-loop` includes only an annual winter review within four-season activities. Two revised proposals were also rechecked: `wms2537/jingzhang-city-model-commons` uses generic simulation stress testing unrelated to winter, while `xr843/jingzhang-two-way-line` contains only waste-heat warm-corridor/greenhouse subitems. None develops the complete clearance–storage–meltwater–refreeze operations chain, so the licence record and no-copy decision for the eight works below remain unchanged.

The eight closest works listed in the Chinese table all declare `COMMUNITY-DISPLAY-ONLY`. They were read solely for collision review. No text, figures, geometry, code, layout, logo, brand or distinctive expression was copied. In particular, this submission does not claim the peers’ leveling/closure-error certification, six-state climate labs, climate commons/cool gates, thermal-belt/waste-heat narrative, component-proof gates, MEND repair language, handover protocol or curb-ledger mechanism. The record is duplicated in machine-readable form in `sources.json`.

## 3. Official, standards and case material

Official announcements, laws, standards, plans/notices and primary case pages are used only to identify tasks, applicable rules, policy/status context and transferable mechanisms. The submission provides attributed summaries and links; it does not reproduce page design, standards layout, maps, photos, illustrations, tables or promotional language. Citywide policy is not reported as site measurement, a draft is not reported as existing/approved, and case figures are not transferred as Beijing targets.

The listed cold-season, heritage-corridor and AI-ecosystem cases contribute mechanisms only. Their climatic thresholds, land systems, institutional powers, company/talent figures, investment, IP, procurement, contracts and brands are not transferred. See `sources.json` for URLs and use limits.

## 4. Open map and provisional repository boundaries

- OpenStreetMap was used only for attributed coarse screening: **© OpenStreetMap contributors**, [ODbL](https://www.openstreetmap.org/copyright). No OSM extract or tile is redistributed, and no survey/redline/engineering claim rests on it. Any later distributed derivative database requires separate ODbL compliance.
- Repository provisional boundaries are an intake/visual/topology container, not original survey or an official redline. They are not relicensed as official data; official polygons trigger full-package recomputation.

## 5. AI imagery, code-generated figures and fonts

- `assets/render/winter-works-concept.png` was generated from scratch on 2026-08-10 with the OpenAI image-generation tool built into Codex; no reference image was supplied, and the exact underlying image model was not exposed to the workflow. Prompt summary: “Beijing winter urban-design concept scene showing first-cleared accessible routes, sunny temporary snow storage, meltwater paths, winter-sun sheltered space and human maintenance workers; no text or logo; not a real-world photograph.” It is labelled AI-generated, not a photograph, existing-condition record, engineering drawing or approved scheme.
- The Chinese/English `assets/figures` pairs are package-generated diagrams based on original design content and structured data. No third-party photograph, map tile or peer figure is intentionally embedded.
- The Chinese/English A3/A0 PDFs are package-generated layouts. PDF text uses [Maple Mono NF CN](https://github.com/subframe7536/maple-font) Regular/Bold embedded as TrueType subsets; the upstream project declares the SIL Open Font License 1.1. No font file is separately distributed in the submission directory, and this statement does not relicense the font.

## 6. No approval or legal conclusion

This statement is not legal advice and does not establish confirmed boundaries, controls, ownership, heritage, road, utility, fire, station, accessibility or engineering conditions. It does not establish authorized cooperation, funding, procurement, testing, data processing or operation, nor any AI filing, safety assessment or deployment permission. Human authorship, copyright and professional review remain required before submission.
