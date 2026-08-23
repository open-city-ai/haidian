# 方案迭代记录 / Changelog

## v56.0 - 2026-08-23

**已批规划语境对位与前台图件去重 / Approved-Plan Alignment and Front-stage Figure De-duplication**

- 串行门：PR #3646 已 `MERGED`，merge `082f0ee8020e92a294e81bb30254c0e0faac38f8` 已进入 canonical `main@dfd84b4a2dae043e38ca4f6fdde711435c65c9a2`；同包开放 PR 为 0，工作树洁净。开工前重新同步并复读最新仓库规则、Skill、任务书、source registry、formal guide、Issues/PR 与验证脚本。
- 修复前 RED：双语 proposal 各嵌 15 张前台图，`key-areas` 各重复 2 次，`spatial-atlas` 各再重复三处主答案；六项 visual 导航同时保留“公共地面”和“三处原型”，但 2026-08-12 官方“街区控规获批”公开页未登记，已批文字方向—本方案增量—仍缺官方／专业资料之间没有唯一桥梁。这是桌面来源与编辑冷读审查，不是公众反馈、专家意见或评审结果。
- 新增 1 条 citation-only 官方公开来源，明确只引用获批状态、2024—2035、9 街区、约 1668.2 公顷、“一带一轴、两心多点”及公开的更新／慢行／公共服务方向；不取得或推断批复正文、图则、官方 GIS/CAD、地块控制、道路红线、建筑指标、市政容量、权属、现场或专业结论。
- 新增双语对位表，把双轨限定为已批公共空间与更新方向上的可逆服务叠层，不是第二套法定结构。公开约 16.682 km² 规划范围与本包 11,412,825.386 m² 临时模型明确不等量、未套合、不得互换；九份 geometry 与 `metrics.json` 字节冻结。
- 双语 proposal 前台图各由 15 张收束为 9 张，`key-areas` 各只保留一次，`spatial-atlas` 退出 proposal／visual 前台但文件和后台证据仍保留；visual 仍为六项导航，以“已批规划对位”替换重复入口。无新媒体、页面、场景、项目、重点区、合同、成熟度或现实结果。
- G0、NO-GO、provisional、12/8/3/36、完整非 AI 路径、故障只停验证叠层、恢复不授权／不批准／不重启／不进入 G1、专业否决、`not_fully_cleared` 与独立逐文件清权 0 保持不变。

## v55.0 - 2026-08-21

**海淀日常证据化与前后台压缩 / Lived Haidian Evidence and Front/Back-stage Compression**

- 串行门：前序 PR #3619 已合并，merge `8cc34264164e3e8dcb5b4beadcbc8c3e04a2f5d3` 已进入开工时 canonical `main@9d81fd0f465755abbfb84ffed349902388f49fc0`；同包开放 PR 为 0，工作树洁净。开工前再次同步 main，完整复读最新 README、Skill、公开任务书、taskbook、source registry、formal guide、涉及 references、开放 Issues/PR 与验证规则。
- 修复前 RED：中文 proposal 75,705 字符、英文 197,628 字符，均有 997 行；visual 各有 37 个 section，后台库默认展开并重复多张图，无 JavaScript 长页约 52,123 px；30 秒／3 分钟／15 分钟选择器默认折叠；15 分钟入口先展示 T-02 与文件级路径；`report/narrative.md` 的当前方案摘要在 400 余行轮次记录之后且重新启用旧名称；A0 多页主图约占三至四成，视觉上更像放大的演示页。这些是编辑、冷读与出版审查，不是公众反馈、专家意见、现场观察或评审结果。
- 双语 proposal 保持 13 个正式章节和全部来源、数字、限制与证据等价，压缩为各 632 行；中文 49,739 字符、英文 130,563 字符。维护、代谢、失败与气候四条合同收束为服务八个既有项目的一张表；风险章的七个延伸单元收束为一个五步后台交接索引。百年时间教育线、公共任务经济和长期运营分别回到文化、产业与分期的空间结果，不新增第二方案。
- 三处原型增加条件式归属：现场证据不支持普通旁路／居民街／四向通勤及对应旁置空间时，原型不得落位。普通任务统一为“找到入口—理解状态—完成人工任务—纠错或退出”，但三处用不同空间关系完成；英文把活动与空间中的 `proof` 收束为 `verification`，证据材料仍使用 `evidence`。
- visual 主导航仍为六项，阅读档位移到首屏可见；2026 年已开放公园与约 9 公里绿廊的公开现实基线前置，明确本方案只做不打断日常的增量。37 个 section 压到 16 个，重复后台图件与长表下沉为原生折叠索引；桌面长页降至中文 10,935 px、英文 11,793 px，远程依赖、自动播放和破图均为 0。
- 四份 PDF 不增页重排为 A3 14+14、A0 8+8。核心 SVG 以矢量方式嵌入，A3 建立“海淀基线—总体—三处连续跨页—人尺度—四态—实施—指标—交接”出版节奏；A0 形成“概念—总体—三处—人尺度—实施—证据”连续展板。两次独立新进程逐文件字节一致：中文 A3 `28df546c648c8d45bb703e6f3e727f7bebf39eb7c8da028fdec9acad94c37c4f`、英文 A3 `6d52f2aeae0755bc6b008af27145b802ffb1a930053e1b1651d5f2f4a3f872aa`、中文 A0 `eca4f2d9d3ab978c5fec0e9f5d90e3d9c1c2ce98d40bff8024760194d53bb801`、英文 A0 `83db54a01baede32389d04c3f334af3ae90f2458b93d2758fbf3da4117a7197e`。44 页全页与细节 QA 无空白、加密页或缺失页面。
- 最终闸门另修复两项可复现一致性缺口：把重复的第 36—37 轮 narrative 全文压为结构化记录回链，使 Markdown 稳定低于 256 KiB；把权利台账中仍称 Round 52 Helvetica/Heiti 为“当前”的摘要改为历史记录，并登记 Round 55 的本机字体子集边界。二者均不改变事实、清权状态或方案内容。
- 本轮无新路径、品牌、场景、项目、重点区、治理合同、成熟度、外部来源、事实、媒体或媒体生成调用。九份 geometry、`metrics.json`、12/8/3/36、唯一“双轨京张”、JZ-AIOS、G0—G3、四轴、三载体、NO-GO、provisional、现实结果 0、完整非 AI 路径、故障只停验证叠层、恢复非授权／批准／G1、专业否决、`not_fully_cleared` 和独立逐文件清权 0 全部冻结；本轮无新媒体。

- Serial gate: predecessor PR #3619 was merged and merge `8cc34264164e3e8dcb5b4beadcbc8c3e04a2f5d3` entered canonical `main@9d81fd0f465755abbfb84ffed349902388f49fc0`; no competing package PR remained open and the worktree was clean. Main was synchronized again before rereading the latest README, Skill, public brief, taskbook, source registry, formal guide, relevant references, open Issues/PRs and validation rules.
- Pre-repair RED: the Chinese proposal had 75,705 characters and the English 197,628, both at 997 lines; each visual page had 37 sections, with an open back-stage library repeating figures and a no-JavaScript page about 52,123 px high; the 30-second / 3-minute / 15-minute selector was collapsed by default; the 15-minute entry led with T-02 and file paths; the current narrative summary sat after more than 400 lines of round records and revived an old name; several A0 boards used only about three to four tenths of the sheet for principal figures. These are editorial cold-read and publication findings—not public feedback, expert opinion, field observation or jury result.
- Bilingual proposals retain all 13 formal chapters and equivalent sources, numbers, limits and evidence while compressing to 632 lines each: 49,739 Chinese characters and 130,563 English characters. Maintenance, metabolism, failure and climate become one table serving the eight existing projects; seven extended risk units become one five-step back-stage handoff index. The century-time education line, public mission economy and long-term operations return to culture, industry and phasing as spatial outcomes, without creating a second proposal.
- Each prototype gains a conditional fit: if future evidence does not support its ordinary bypass / resident street / four-way commute and corresponding side space, it must not be located there. The ordinary meta-task is “find entrance—understand status—complete staffed task—correct or exit,” carried by different spatial relations at each place. English uses `verification` for activity and space and retains `evidence` for records.
- The six-item visual navigation remains. Reading depths and the reported open-park / roughly nine-kilometre green-corridor baseline are visible near the first screen, framing the proposal as a non-disruptive addition. Sections fall from 37 to 16; repeated back-stage figures and tables move into one native details index. Desktop height falls to 10,935 px in Chinese and 11,793 px in English, with zero remote dependency, autoplay or broken image.
- Four PDFs are recomposed without page growth: A3 14+14 and A0 8+8. Core SVGs are embedded as vector content. A3 reads baseline—overall—three-place sequence—human scale—four states—implementation—metrics—handoff; A0 reads concept—overall—three places—human scale—implementation—evidence. Two fresh processes are byte-identical with the four SHA-256 values above. All 44 pages pass full-page and detail QA with no blank, encrypted or missing page.
- Final gates exposed two additional reproducible coherence gaps: duplicated Round 36–37 narrative prose is reduced to backlinks to its structured records, keeping Markdown safely below 256 KiB; and rights-ledger summaries that still called Round 52 Helvetica/Heiti the “current” fonts are marked historical while the Round 55 local-subset boundary is registered. Neither change alters facts, clearance state or design content.
- No path, brand, scene, project, key area, governance contract, maturity, external source, fact, medium or media-generation call is added. Nine geometry files, `metrics.json`, 12/8/3/36, sole Twin-Track master idea, JZ-AIOS, G0–G3, four axes, three carriers, NO-GO, provisional status, zero real outcomes, complete non-AI paths, verification-only failure stop, non-authorising/non-approving/non-G1 recovery, professional veto, `not_fully_cleared` and zero independent file-level audits remain frozen. This round adds no media.

## v54.0 - 2026-08-21

**空间裁决前置与前台去元叙事 / Front-stage Spatial Decision**

- 串行门：前序 PR #3545 已合并，merge `d35e9e561a48f5ea757414df2d88691b0d0d35c8` 已进入 canonical `main@8afbdbfdaacdbf06373237c1b6393f3614704bbc`；同包开放 PR 为 0，工作树洁净。开工前重新完整读取最新 README、Skill、公开任务书、taskbook、source registry、formal guide、涉及 references、Issues/PR 与验证规则。
- 修复前 RED：中英文 proposal 的首个答案是阅读时长和证据索引，而不是空间取舍；visual 首屏先出现证明编号、专家速判和阅读路线；`key-areas` 虽可区分三处，却没有把“拒绝何种占用／保留何种空间”合成同一裁决。这是编辑性冷读审查，不是公众反馈、专家意见、现场观察或评审结果。
- 唯一空间裁决现为：验证不得占用完成普通任务所需的地面。众智园拒绝验证穿路，保留平行绕行与旁置证明园；原点社区拒绝节点占街，保留一街两院四个可撤回节点；大钟寺拒绝服务占中，保留四向通勤与路外信息厅／人工台。中英 `key-areas` SVG/PNG 在原路径重绘，不移动 geometry、不新增场地事实。
- 双语 proposal 以同一裁决作为首个 H2，旧 30 秒／3 分钟／15 分钟元叙事退出正文前台；visual 主导航保持六项并改为“空间裁决—普通生活—公共地面—三处原型—四态—专业交接”，旧冷读基线折叠到后台。无 JavaScript、键盘、减少动态、打印和静态回退继续成立；48 秒仍只是展示节奏。
- 四份 PDF 不增页重建，保持 A3 14+14、A0 8+8；A3 P3 和 A0 P3 前置同一空间裁决。第一次本地构建发现中文审计栏标签因错误字体选择显示替换字形，已在提交前修复并重建。最终两次新进程逐文件字节一致：中文 A3 `b32a01e57c5957ff971065d8a0e4b2e97684aabf7643fe32956e521296c4ffe8`、英文 A3 `2e5cda8b9eaf2041523eeb6a83882740cc2004b639a7f4b2aa256bfb03c5dcfe`、中文 A0 `5dedb32876f357ecf4cebe5e9ffa3e2d31d721817a9da0f0a1857aa1814f0c69`、英文 A0 `c04800cdf762dcfbca209aa2858506c9d68d7f19560386c916bc3caf6df3b42b`。44 页彩色、灰度和细节 QA 通过，替换字形、越界、裁切、空白和加密页均为 0。
- 本轮没有新增路径、方向、品牌、场景、项目、重点区、治理合同、成熟度、事实、来源或媒体。九份 geometry、`metrics.json`、12/8/3/36、G0、NO-GO、provisional、现实结果 0、完整非 AI 路径、故障只停验证叠层、恢复非授权／批准／G1、专业否决、`not_fully_cleared` 和独立逐文件清权 0 全部冻结；本轮无新媒体。

- Serial gate: predecessor PR #3545 was merged and merge `d35e9e561a48f5ea757414df2d88691b0d0d35c8` entered canonical `main@8afbdbfdaacdbf06373237c1b6393f3614704bbc`; no package PR remained open and the worktree was clean. The latest README, Skill, public brief, taskbook, source registry, formal guide, relevant references, Issues/PRs and validation rules were reread before work.
- Pre-repair RED: the first bilingual proposal answer explained reading times and evidence indexing rather than a spatial choice; the visual front stage led with proof IDs, expert metadata and reading lanes; and `key-areas` distinguished three sites without joining “occupation rejected / spatial alternative kept” into one ruling. These are editorial cold-read findings, not public feedback, expert opinion, field observation or jury results.
- The sole spatial ruling is now: proof may not occupy ground required for an ordinary task. Zhongzhiyuan rejects proof crossing and keeps a parallel bypass plus side proof garden; Origin rejects nodes taking the street and keeps one street, two stepped-back courts and four withdrawable nodes; Dazhongsi rejects service taking the centre and keeps four-way commuting plus an off-route hall and staffed desk. Bilingual `key-areas` SVG/PNG are redrawn in place without moving geometry or adding site facts.
- Bilingual proposals now use the ruling as their first H2; the former 30-second/3-minute/15-minute meta layer leaves the proposal front stage. The six-item visual navigation now reads spatial decision—ordinary life—civic ground—three prototypes—four states—professional handoff, while the old cold-read baseline is collapsed back-stage. No-JavaScript, keyboard, reduced-motion, print and static fallbacks remain; 48 seconds remains presentation pacing only.
- Four PDFs are rebuilt without page growth: A3 14+14 and A0 8+8. The same ruling moves to A3 P3 and A0 P3. An unsupported-glyph defect in Chinese audit labels was found in the first local build, repaired before commit, and rebuilt. Two final fresh processes are byte-identical with the four SHA-256 values recorded above. All 44 pages pass colour, grayscale and detail QA with zero replacement glyph, out-of-bounds, clipped, blank or encrypted page.
- No path, direction, brand, scene, project, key area, governance contract, maturity, fact, source or media is added. Nine geometry files, `metrics.json`, 12/8/3/36, G0, NO-GO, provisional status, zero real outcomes, complete non-AI paths, proof-only failure stop, non-authorising/non-approving/non-G1 recovery, professional veto, `not_fully_cleared` and zero independent file-level audits remain frozen. This round adds no media.

## v53.0 - 2026-08-20

**评审图集完整性与定页出版终审 / Jury Atlas Integrity & Fixed-page Review**

- 串行门：第 52 轮 PR #3529 已合并，merge `949e2fb65bcc358d4dc476bb2932e2ff7954dbc0` 已进入 canonical `main@fae639c40a0b51de971ed4cd98526351d07cbb74`；同包开放 PR 为 0，工作树洁净。本轮从该最新 main 建独立工作树，并重新完整读取 README、Skill、公开任务书、taskbook、source registry、formal guide、涉及的 standards references、Issues/PR 与验证规则后开始。
- 修复前 RED 可重放：九组中英核心图的出版图号仍重复 04／05／06／07；`spatial-atlas` 中 `A / ONE CONTINUOUS GROUND` 与 `01 VERIFY` 在真实 Chrome 渲染中相交；英文 `reversible-components` 三条还场说明与底栏为单行，在最终栅格中发生卡内溢出／边缘裁切；A0 P2—P4、P6—P8 双图页的主图占页仅 30.4%。这些是双语、缩略图、全尺寸、灰度与定页冷读的编辑性发现，不是公众反馈、专家意见、现场观察或评审结果。
- 九组既有中英文 SVG/PNG 在原路径建立唯一出版序列：空间图 `S01—S08`，证据图 `E01`。`spatial-atlas` 顶栏分离；`reversible-components` 中英还场包与 G0 底栏均改为受边界约束的两行，不改变停止、拆除、还场、非 AI 路径或恢复非授权的事实含义。全部 PNG 由本地 Chrome 从同路径 SVG 重渲并以 Pillow 规范化；无新媒体、外部图像、模型调用或包路径。
- 双语 proposal 新增唯一图号读法，report 从正文重渲；visual 继续引用同一路径 PNG，六项主导航、无 JavaScript 静态内容、键盘、减少动态、打印回退和无自动播放全部保持。现有 48 秒动态仍只是界面叙事节奏，不是现实恢复时长。
- 四份 PDF 不增页原位重建，保持 A3 14+14、A0 8+8。A0 核心双图页由上下窄图改为并排主图，占页从 30.4% 提升到 38.1%；宽屏媒体页保持 35.1%，不裁图、不新增内容。两次独立新进程逐文件字节一致：中文 A3 `07535826ad39de5ac8df9b3c8aff7e44fe698ad2548139209dc05dd806e0972e`、英文 A3 `58c422c23ca885e554ed2a1f6674446b96a35b3fcfa7aa6d116c2f996cc9dc6d`、中文 A0 `870203f2b723c9f3cf17e94a0a88b540813ca7bf7f9007d8cbd4bbeaac4e29d1`、英文 A0 `ea77dfb85f70184adf9a8f04c3a35adcd8d40865c98297d7860b146013e8821c`。44 页彩色、灰度和细节 QA 通过；最小活字 A3 8.5 pt、A0 24.06 pt，空白、替换字形、越界、裁切与加密页为 0。
- 本轮没有新增方案方向、事实、主张、来源、媒体、geometry、metric、场景、项目、重点区、治理合同、成熟度或页面。九份 geometry、`metrics.json`、12/8/3/36、唯一“双轨京张”、三处不可互换原型、G0、NO-GO、provisional、现实结果 0、完整同任务非 AI 路径、故障只停验证叠层、恢复非授权／批准／G1、专业否决、`not_fully_cleared` 与独立逐文件清权 0 全部冻结；本轮无新媒体。

- Serial gate: Round 52 PR #3529 was merged and merge `949e2fb65bcc358d4dc476bb2932e2ff7954dbc0` entered canonical `main@fae639c40a0b51de971ed4cd98526351d07cbb74`; no package PR remained open and the worktree was clean. Work began from that latest main only after fully rereading README, Skill, public brief, taskbook, source registry, formal guide, relevant standards references, Issues/PRs and validation rules.
- Reproducible pre-repair RED: the nine bilingual core-figure families reused 04/05/06/07 publication numbers; `A / ONE CONTINUOUS GROUND` intersected `01 VERIFY` in a real Chrome render of `spatial-atlas`; three English restoration instructions and the footer stayed on single lines and visibly overflowed/clipped in the final raster; and dominant-figure coverage on A0 P2–P4 and P6–P8 was only 30.4%. These are bilingual thumbnail, full-size, grayscale and fixed-page editorial findings—not public feedback, expert opinion, field observation or jury results.
- Nine existing bilingual SVG/PNG families now use one publication series in place: spatial figures `S01–S08` and evidence figure `E01`. The spatial-atlas header is separated; bilingual restoration packs and the G0 footer wrap into bounded two-line blocks without changing the meaning of stop, removal, restoration, non-AI continuity or non-authorising recovery. PNGs are rerendered locally from the same SVG paths and normalized with Pillow. No media, external image, model call or package path is added.
- Bilingual proposals gain the sole figure-series reading note and reports are rerendered from them. Visual pages continue to use the same PNG paths; six-item primary navigation, no-JavaScript static content, keyboard, reduced-motion, print fallback and no autoplay remain. The existing 48-second motion remains interface pacing, not real recovery time.
- Four PDFs are rebuilt in place without page growth: A3 14+14 and A0 8+8. Core A0 pairs move from narrow vertical stacking to side-by-side dominant figures, raising page coverage from 30.4% to 38.1%; the wide-media page stays at 35.1% without crop or added content. Two fresh processes are byte-identical per file: ZH A3 `07535826ad39de5ac8df9b3c8aff7e44fe698ad2548139209dc05dd806e0972e`, EN A3 `58c422c23ca885e554ed2a1f6674446b96a35b3fcfa7aa6d116c2f996cc9dc6d`, ZH A0 `870203f2b723c9f3cf17e94a0a88b540813ca7bf7f9007d8cbd4bbeaac4e29d1`, and EN A0 `ea77dfb85f70184adf9a8f04c3a35adcd8d40865c98297d7860b146013e8821c`. All 44 pages pass colour, grayscale and detail QA; minimum live text is 8.5 pt in A3 and 24.06 pt in A0, with zero blank, replacement-glyph, out-of-bounds, clipped or encrypted page.
- No direction, fact, claim, source, media, geometry, metric, scenario, project, key area, governance contract, maturity or page is added. Nine geometry files, `metrics.json`, 12/8/3/36, sole Twin-Track master idea, three non-interchangeable prototypes, G0, NO-GO, provisional status, zero real outcomes, complete same-task non-AI path, proof-only failure stop, non-authorising/non-approving/non-G1 recovery, professional veto, `not_fully_cleared` and zero independent file-level clearance audits remain frozen. This round adds no media.

## v52.0 - 2026-08-20

**公共地面详细设计图集 / Civic Ground Detail Atlas**

- 串行门：PR #3511 已合并，merge `b58a560ec22671df9ffddbc17321f322a19e7a05` 已进入 canonical `main@fcaf7a9fccb7d9ca875a6fc37329fb1454e7b375`；同包开放 PR 为 0，工作树洁净。本轮再次同步 main，完整复读最新 README、Skill、公开任务书、taskbook、source registry、formal guide、Issues/PR 与验证规则，并在洁净基线通过六闸与 T-02 10/10 后开工。
- 修复前 RED 来自同一套双语、全尺寸、缩略图、灰度和冷读审计：`mobility-bluegreen` 的单一抽象波形不能同时说明横联、舒适剖面、人工服务与旁置验证；`spatial-atlas` 没有闭合“总体—原型—人尺度使用”链；`climate-resilience-corridor` 的合同卡压过季节空间剖面；`reversible-components` 三卡语法过同，停止、拆除与还场对象不够可辨。这些只是编辑性空间审查，不是公众反馈、专家意见、现场观察或评审结果。
- 原路径重建四组中英文 SVG/PNG。`mobility-bluegreen` 现在并列总体连续公共地面、六处概念横联、人尺度普通路径／蓝绿舒适／人工维护／旁置验证；`spatial-atlas` 成为唯一图纸索引，把总体骨架、三处非同构平面和普通动作—停止—人工接管—还场序列回链到既有平面与剖面；`climate-resilience-corridor` 以季节剖面先表达普通通行、遮阴休憩、雨洪生态和维护净空；`reversible-components` 分别表达围护设备、节点插件、路外厅台三种拆除与还场关系。
- 图件仍为 1800×1100、双语非文字几何一致。候选在缩略图、全尺寸、灰度、双语和冷读审查中均优于旧版；图内持续保留 G0、provisional、非现场、非批准与 unknown 边界。六处横联、树木、地形、构件、位置和剖面均为类型化关系，不是道路／桥隧／铁路穿越、现状树种、尺寸、材料、管线、标高、生态绩效、工程可行性或批准方案。
- 双语 proposal、report 与 visual 只同步答案位置、图名、替代文本、图注和回链。主导航保持 6 项并按“封面—普通生活—三处空间索引—三处平面剖面—四态—专业交接”阅读；公共信号降至后续审计层。现有 48 秒用户启动动态、无 JavaScript 静态内容、键盘、减少动态和打印回退全部保留；48 秒仍不是现实恢复时长。
- 四份 PDF 在不增页下原位重建为 A3 14+14、A0 8+8。A3 每页以一个主图回答一个判断；A0 将双图改为上下满宽关系，减少横排留白。两次独立新进程逐文件字节一致：中文 A3 `524f0b82c0db30009a747c00166fb0967d5a26a60f70b77dad93d00102189696`、英文 A3 `631ea5b3cf480efea9dbce7d611e01f162441035f43e2e37a373456d4cf913cd`、中文 A0 `7928dde0ee64a50b655d269071ad223de0082f1db983930245e1234de214e319`、英文 A0 `0df2a53d5ceadf0c7d1eebe7192d0290e422bb7936ecfb3b2c385f752d6cf150`。44 页彩色、灰度与细节 QA 全部通过；A3 最小活字 8.5 pt，A0 最小活字 24.06 pt，无空白、替换字形、裁切、越界或加密页。
- 本轮原位重建四组既有图件和四份既有 PDF；没有新增包路径、来源、媒体、事实、主张、geometry、metric、场景、项目、重点区、治理合同、成熟度或页面。所有图仍是基于临时几何的 G0 概念关系图；没有完成任何独立逐文件清权。九份 geometry、`metrics.json`、12/8/3/36、G0、NO-GO、provisional、现实结果 0、同任务非 AI 完整路径、故障只停验证叠层、恢复非授权、专业否决、`not_fully_cleared` 与独立逐文件清权 0 全部冻结。本轮无新媒体、无新媒体生成模型调用、无外部图像输入。

- Serial gate: PR #3511 was merged and merge `b58a560ec22671df9ffddbc17321f322a19e7a05` entered canonical `main@fcaf7a9fccb7d9ca875a6fc37329fb1454e7b375`; no package PR remained open and the worktree was clean. Work began only after resynchronizing main, fully rereading the latest README, Skill, public brief, taskbook, source registry, formal guide, Issues/PRs and validation rules, then passing the clean six-gate baseline and T-02 10/10.
- Reproducible pre-repair RED came from one bilingual, full-size, thumbnail, grayscale and cold-read audit: the single abstract wave in `mobility-bluegreen` did not jointly show cross-links, comfort sections, staffed service and adjacent proof; `spatial-atlas` did not close the overall–prototype–human-use chain; contract cards dominated the seasonal spatial section in `climate-resilience-corridor`; and the three `reversible-components` cards shared too much grammar to distinguish stop, removal and restoration objects. These are editorial spatial findings, not public feedback, expert opinion, field observation or jury results.
- Four bilingual SVG/PNG families are rebuilt in place. `mobility-bluegreen` now coordinates continuous civic ground, six conceptual cross-links and a human-scale ordinary-path / blue-green-comfort / staffed-maintenance / side-proof section. `spatial-atlas` becomes the sole drawing index linking the overall spine, three non-isomorphic plans and ordinary action–stop–staff takeover–restoration sequences back to existing plans and sections. `climate-resilience-corridor` leads with a seasonal section for ordinary movement, shade/rest, stormwater ecology and maintenance clearance. `reversible-components` separates enclosure/equipment, node/insert and off-route hall/desk removal-restoration relations.
- Figures remain 1800×1100 with equal non-text geometry across languages. Every candidate visibly beats the old version at thumbnail, full-size, grayscale, bilingual and cold-read scales, while retaining G0, provisional, not-field, not-approved and unknown boundaries. Cross-links, trees, landform, components, positions and sections are typological relations—not roads, bridges, railway crossings, existing species, dimensions, materials, utilities, levels, ecological performance, engineering feasibility or approval.
- Bilingual proposals, reports and visual pages synchronize only answer location, figure names, alternative text, captions and backlinks. Primary navigation remains six items and reads cover–ordinary life–three-place atlas–three plans/sections–four states–professional handoff; public signals move to the later audit layer. Existing user-started 48-second motion, no-JavaScript static content, keyboard, reduced-motion and print fallbacks remain. Forty-eight seconds is still not real recovery time.
- Four PDFs are rebuilt in place without page growth: A3 14+14 and A0 8+8. A3 gives each page one dominant figure and one judgement; A0 stacks paired figures full-width to reduce side-by-side dead space. Two independent fresh processes are byte-identical per file: ZH A3 `524f0b82c0db30009a747c00166fb0967d5a26a60f70b77dad93d00102189696`, EN A3 `631ea5b3cf480efea9dbce7d611e01f162441035f43e2e37a373456d4cf913cd`, ZH A0 `7928dde0ee64a50b655d269071ad223de0082f1db983930245e1234de214e319`, and EN A0 `0df2a53d5ceadf0c7d1eebe7192d0290e422bb7936ecfb3b2c385f752d6cf150`. All 44 pages pass colour, grayscale and detail QA; minimum live text is 8.5 pt in A3 and 24.06 pt in A0, with no blank, replacement-glyph, clipped, out-of-bounds or encrypted page.
- Round 52 rebuilt four existing bilingual figure families and four fixed-page PDFs in place. No new package path, source, media, fact, claim, geometry, metric, scenario, project, key area, governance contract, maturity or page was added. All diagrams remain G0 conceptual relationship drawings based on provisional geometry. No independent file-level rights clearance was completed. Nine geometry files, `metrics.json`, 12/8/3/36, G0, NO-GO, provisional status, zero real outcomes, complete same-task non-AI path, proof-only failure stop, non-authorising recovery, professional veto, `not_fully_cleared` and zero independent file-level audits remain frozen. This round has no new media, media-generation model call or external image input.

## v51.0 - 2026-08-20

**空间设计证明与定页出版同步 / Spatial-design proof and fixed-page publication alignment**

- 串行门：PR #3500 已合并，merge `2e2a1d9cfc6d3d7e8c18fd1be571784da8638a92` 已进入 canonical `main@e490c681bfad93d8c54a81ee56f1d3061a88a813`；同包开放 PR 为 0，工作树洁净。本轮在再次同步 main、完整复读最新 README、Skill、公开任务书、taskbook、source registry、formal guide、Issues/PR 和验证规则后开始。
- 修复前 RED 来自同一套双语、全尺寸、缩略图、灰度、标题抑制和四份 PDF 冷读审计：`site-overview` 的主构图是社会关系接力而非总体空间结构；`land-use-structure` 是 36 格清单，缺少沿线前沿与横向联系；`key-areas` 虽有不同机制但仍偏符号卡片；`key-area-sections` 重复平面符号而没有地面、阈值与竖向责任。这些只是编辑性空间审查，不是公众反馈、专家意见、现场观察或评审结果。
- 原路径重建中英文 `site-overview`：一条连续公共地面骨架、六处横向联系、铁路遗产关系基准和三种非同构原型可在同一总图中读取；众智园以平行绕行／旁置证明园、原点社区以一街两院、大钟寺以四向通勤／路外服务区分。临时容器、线位和节点不生成官方红线、精确坐标、距离或站点锚定。
- 原路径重建中英文 `land-use-structure`：36 个冻结概念包络不再排成表格，而是在公共地面两侧形成不规则连续前沿，由六处横向联系和日常连续／验证旁置／退出还场三种首层责任共同组织。颜色只表示功能族，不生成法定用地、权属、面积、FAR、高度、拆改留或实施结论。
- 原路径重建中英文 `key-areas` 与 `key-area-sections`：平面先建立三种不可互换的普通状态骨架，再定位旁置验证、人工交接、逐点撤回与路外服务；剖面只承担地面、阈值、停止对象、人工位置与还场对象。普通—验证—故障—恢复仍由正文与四态合同统一定义，恢复普通使用不等于授权、批准、重启或 G1。
- 双语 proposal、report 与 visual 同步图名、替代文本、图注和读图顺序；主导航仍为 6 项，现有 48 秒用户启动动态、无 JavaScript 静态内容、键盘、减少动态和打印回退均保留。`spatial-atlas`、`mobility-bluegreen` 与全部既有媒体保持 LOCK；本轮无新媒体、无新模型调用、无新外部来源。
- PDF 触发审查判定四份定页出版物必须同步，否则 A3 P3—P5/P10 与 A0 P2—P4 会继续传播旧空间图。四份 PDF 在不增页下原位重建为 A3 14+14、A0 8+8；两次独立新进程逐文件字节一致：中文 A3 `b098334e2e56c3de09560e9244af543e1f54909fe3ffcd6a046e869ecba7d246`、英文 A3 `ad338568bba4407587c9491eb6226785d42b51f66146a5fd648e06d33b65fa95`、中文 A0 `4d6a4a4afa5f1317a7eebebcacd14bf92830d0425bbe6b38ad4e1b62925de239`、英文 A0 `a1e289c02951d7b5aa2f4d62d6f48232d35192fdcc89b992359f02c840779c0b`。44 页彩色、灰度与细节复核未见空白、加密、裁切或图面重叠；确定性与可读性不构成现场、无障碍认证、专业接受、批准、清权或成熟度。
- 本轮不新增包路径，继续为 156 个文件；当前总字节低于 40 MiB。九份 geometry、`metrics.json`、12/8/3/36、G0、NO-GO、provisional、现实结果 0、完整非 AI 路径、故障只停验证叠层、恢复非授权、`not_fully_cleared` 和独立逐文件清权 0 全部冻结。

- Serial gate: PR #3500 was merged and merge `2e2a1d9cfc6d3d7e8c18fd1be571784da8638a92` entered canonical `main@e490c681bfad93d8c54a81ee56f1d3061a88a813`; no package PR remained open and the worktree was clean. Work began only after resynchronizing main and fully rereading the latest README, Skill, public brief, taskbook, source registry, formal guide, Issues/PRs and validation rules.
- Reproducible pre-repair RED came from one bilingual, full-size, thumbnail, grayscale, title-suppressed and four-PDF cold-read audit: `site-overview` was a social-relay composition rather than an overall spatial structure; `land-use-structure` was a 36-cell checklist without corridor fronts or cross-links; `key-areas` had distinct mechanisms but remained symbolic cards; and `key-area-sections` repeated plan symbols instead of showing ground, thresholds and vertical responsibility. These are editorial spatial findings, not public feedback, expert opinion, field observation or jury results.
- Bilingual `site-overview` is rebuilt in place. One continuous civic-ground spine, six cross-links, a railway-heritage relational datum and three non-isomorphic prototypes now read together: parallel bypass / side proof garden at Zhongzhiyuan, one street / two courts at Origin Community, and four-way commute / off-route service at Dazhongsi. The provisional container, lines and nodes create no official redline, exact coordinate, distance or station anchor.
- Bilingual `land-use-structure` is rebuilt in place. The 36 frozen concept envelopes no longer form a spreadsheet; they make two irregular continuous fronts along civic ground, organized by six cross-links and three ground-level duties: ordinary continuity, proof beside, and exit/restoration. Colour denotes function family only and creates no statutory use, title, area, FAR, height, demolition decision or implementation conclusion.
- Bilingual `key-areas` and `key-area-sections` are rebuilt in place. Plans establish three non-interchangeable ordinary-state skeletons before locating side proof, staffed handoff, node withdrawal and off-route service; sections are limited to ground, thresholds, stop objects, staff positions and restoration objects. Ordinary–proof–failure–recovery remains governed by the proposal and four-state contracts; restoration of ordinary use is not authorization, approval, restart or G1.
- Bilingual proposals, reports and visual surfaces synchronize figure names, alternative text, captions and reading order. Primary navigation remains six items, and the existing user-started 48-second motion, no-JavaScript static content, keyboard route, reduced motion and print fallback remain. `spatial-atlas`, `mobility-bluegreen` and all existing media stay LOCK. No media, model call or external source is added.
- The PDF trigger audit required publication synchronization; otherwise A3 P3–P5/P10 and A0 P2–P4 would keep propagating the old spatial figures. Four fixed-page PDFs are rebuilt in place without page growth: A3 14+14 and A0 8+8. Two independent fresh processes are byte-identical per file: ZH A3 `b098334e2e56c3de09560e9244af543e1f54909fe3ffcd6a046e869ecba7d246`, EN A3 `ad338568bba4407587c9491eb6226785d42b51f66146a5fd648e06d33b65fa95`, ZH A0 `4d6a4a4afa5f1317a7eebebcacd14bf92830d0425bbe6b38ad4e1b62925de239`, and EN A0 `a1e289c02951d7b5aa2f4d62d6f48232d35192fdcc89b992359f02c840779c0b`. Colour, grayscale and detail QA across 44 pages finds no blank, encrypted, clipped or overlapping page. Determinism and legibility establish no field state, accessibility certification, professional acceptance, approval, clearance or maturity.
- No package path is added; the package remains 156 files and below 40 MiB. Nine geometry files, `metrics.json`, 12/8/3/36, G0, NO-GO, provisional status, zero real outcomes, complete non-AI path, proof-only failure stop, non-authorising recovery, `not_fully_cleared` and zero independent file-level clearance audits remain frozen.

## v50.0 - 2026-08-20

**专家评审包对齐与决策级风险摘要 / Expert review packet alignment and decision-grade risk summary**

- 串行门：PR #3491 已合并，merge `362986d3040b98891d8f99b07f25b2dd165cb3fa` 已进入 canonical `main@e289e4abc305b64f06add372cdec2fcb2a8a4db7`；同包开放 PR 为 0，工作树洁净。本轮在完整复读最新 README、Skill、公开任务书、taskbook、source registry、formal guide、review-packets 与 risk-radar 后开始。
- 修复前 RED：维护者 review packet 虽可导出，但 1,316 行／209,080 字节入口显示版本与轮次“未声明”，快速摘要没有使用第 49 轮已建立的海淀公共能力判断，`risk.json` 缺失，23 项假设先于决策路由展开，展示名仍带旧工具标签。上述均为编辑审查结果，不是评审意见、专家判断、公众反馈或理解度实测。
- 双语 front matter 以 `version: 50.0 / iteration: 50.0` 合法声明第 50 轮，摘要先回答唯一概念、为何海淀、三处专业交接与现实边界；`agent_name` 收束为不依赖工具品牌的 `xyh202131 AI design agent`。没有改变模型与工具真实溯源。
- 新增双语 `risk.json`：八个维度只表达 G0 编辑复核优先级，并逐项连接 assumptions、H01—H07 与 P01—P07；政策、空间、实施与运维列为最高阻断组。分数不是概率、评审评分、批准或成熟度推进，重大缺口继续 NO-GO。
- `review-handoff-index.json` 新增专家工件定位、五项快速判断、八条风险路由与修复前 RED；双语 visual 在原 6 项导航内加入同一五项判断和可点击 `risk.json` 入口。桌面／移动、JavaScript／无 JavaScript、键盘、减少动态、打印与展开披露共 12 个情形通过，外部请求与自动播放均为 0。
- PDF 触发审查发现旧版 A3 第 13—14 页与 A0 第 7—8 板尚未出现同一风险摘要和唯一机器入口，因此判定 `REBUILD`。四份既有 PDF 在不增页的情况下原位重建；两次新进程逐文件字节一致，14+14+8+8 共 44 页的全页、灰度和细节 QA 均通过，空白、加密、裁切、越界、替换字形与层级倒退为 0。确定性和可读性不构成现场、无障碍认证、专家接受、批准、清权或成熟度。
- 当前登记为 manifest/package 156、非 manifest 内容 155、逐文件权利记录 156；新增 `ASSET-156` 只登记 `risk.json` 的来源、父工件、用途与限制。总体仍为 `not_fully_cleared`，独立逐文件清权仍为 0。
- 本轮无新媒体、无新模型调用、无新来源、无新品牌、场景、项目、重点区、治理合同、成熟度或页面。九份 geometry、`metrics.json`、12/8/3/36、G0、NO-GO、provisional、现实结果 0、同任务非 AI 路径与恢复非授权全部冻结。

- Serial gate: PR #3491 was merged and merge `362986d3040b98891d8f99b07f25b2dd165cb3fa` entered canonical `main@e289e4abc305b64f06add372cdec2fcb2a8a4db7`; no package PR remained open and the worktree was clean. Work began only after fully rereading the latest README, Skill, public brief, taskbook, source registry, formal guide, review-packets and risk-radar.
- Reproducible RED: the maintainer review packet exported successfully, but its 1,316-line / 209,080-byte entry declared neither version nor iteration, its quick summary omitted the Round 49 Haidian public-capability judgement, `risk.json` was absent, 23 assumptions preceded any decision route, and the display name retained a stale tool label. These are editorial-review findings, not jury comment, expert opinion, public feedback or measured comprehension.
- Bilingual front matter now declares legal `version: 50.0 / iteration: 50.0` for Round 50; the summary answers the sole concept, why Haidian, three-place professional handoff and reality boundary first. `agent_name` becomes tool-neutral `xyh202131 AI design agent` without altering truthful model and tool provenance.
- New bilingual `risk.json` expresses eight G0 editorial-review priorities and links each to assumptions, H01–H07 and P01–P07. Policy, spatial, implementation and operations are the highest blocker group. Scores are not probabilities, review grades, approvals or maturity advancement; a material gap continues to hold NO-GO.
- `review-handoff-index.json` adds an expert artefact locator, five quick judgements, eight risk routes and the before-fix RED. Bilingual visual adds the same five judgements and a clickable `risk.json` entry within the existing six-item navigation. Twelve desktop/mobile, JavaScript/no-JavaScript, keyboard, reduced-motion, print and expanded-disclosure cases pass with zero external request and no autoplay.
- The PDF trigger audit found that the previous A3 pages 13–14 and A0 boards 7–8 did not yet carry the same risk summary and sole machine entry, so the decision was `REBUILD`. All four existing PDFs were rebuilt in place without page growth; two fresh processes are byte-identical per file, and full-page, grayscale and detail QA passes across all 14+14+8+8 = 44 pages with zero blank, encrypted, clipped, out-of-bounds, replacement-glyph or hierarchy-regression page. Determinism and legibility do not establish field evidence, accessibility certification, expert acceptance, approval, rights clearance or maturity.
- Current registration is 156 manifest/package paths, 155 non-manifest content paths and 156 file-level rights records. New `ASSET-156` records only the origin, parent artefacts, use and limits of `risk.json`; overall status remains `not_fully_cleared` and completed independent file-level clearance audits remain zero.
- This round adds no media, model call, source, brand, scenario, project, key area, governance contract, maturity or page. Nine geometry files, `metrics.json`, 12/8/3/36, G0, NO-GO, provisional status, zero real outcomes, same-task non-AI path and non-authorising recovery remain frozen.

## v49.0 - 2026-08-19

**海淀社会落位与公共能力阅读 / Haidian social grounding and public-capability reading**

- 串行门：PR #3407 已合并，merge `3fe9b9ddab0d72596d4fc0660d6e1554a22d1ed0` 已进入 canonical `main`；同包开放 PR 为 0，工作树洁净。本轮从 `main@9e7d39010b74b95190f1ca3325361757db02ae90` 开始，只把海淀社会语境转化为空间阅读与普通生活优先级。
- 修复前可复现缺口是：首屏没有在 G0 之前回答“为何是海淀”；账户、设备、专业语言、可支配时间和算法评价门槛没有作为设计问题前置；高校—居民、企业—公共、平台—非用户、专业—日常四类关系尚未形成明确空间后果。它们是编辑审查中的设计问题，不是实测公众反馈、群体结果或地方成效。
- 主入口现在以同一句判断控制中英文 proposal、report、visual 与出版物：海淀的创新密度，只有在普通人无需账户、设备或专业身份，仍可使用、质疑和退出时，才会转化为公共能力。“AI 高地不能成为技术飞地”只是社会命题，不是第二品牌；“双轨京张 / Twin-Track Jing-Zhang”仍是唯一总纲。
- 原路径重建 `site-overview` 与 `mobility-bluegreen` 双语 SVG/PNG，把普通路径置于可选验证之前，并把四类社会关系落实为街道、庭院、人工交接和可退出支路。三处图件经无标题测试仍可由绕行验证庭、居民街院与四向通勤/离线服务关系区分，因此 KEEP；`land-use-structure`、`metrics-evidence` 与既有封面/普通生活媒体保持 LOCK。
- 双语 visual 仍为 6 项主导航，离线零远程依赖；无 JavaScript、键盘、减少动态和打印回退均通过。48 秒仍只是用户启动的界面展示节奏，不是现实恢复时长。本轮无新媒体、无新模型调用、无外部图像输入或新事实来源。
- 四份 PDF 在页数不变下重建为 A3 14+14、A0 8+8；两次新进程逐文件字节一致：中文 A3 `a9aff6f073a6dcc8b940807f7a4045f572acbc09925d84e14c12afa1964f5955`、英文 A3 `97328cd3bd36c3335ee9ca16a21e147678be6e02cffa1ae121c10daea7cefff0`、中文 A0 `0373821c8d64f27e4b05f4e573fe1c39d128f21ee2233be65755e6e421b5d466`、英文 A0 `911f9030cedf0a4017a25ddf2a99531fdff1e1db7d4fa8374dd63eeeacf6643e`。44 页全页、灰度和细节复核未见空白、加密、裁切或重叠；这只证明出版文件可复现和可读。
- 未新增品牌、场景、项目、重点区、治理合同、成熟度、geometry、metric、页面或媒体。T-02 仍是 G0 合成证据；九份 geometry、`metrics.json`、12/8/3/36、G0、NO-GO、provisional、现实结果 0、故障只停验证叠层、恢复非授权、`not_fully_cleared` 和独立逐文件清权 0 全部冻结。

- Serial gate: PR #3407 was merged, merge `3fe9b9ddab0d72596d4fc0660d6e1554a22d1ed0` entered canonical `main`, no package PR remained open, and the worktree was clean. Round 49 starts from `main@9e7d39010b74b95190f1ca3325361757db02ae90` and only converts Haidian social context into spatial reading and ordinary-life priority.
- Reproducible pre-repair gaps were that the opening did not answer “why Haidian” before G0; account, device, professional-language, disposable-time and algorithmic-evaluation thresholds were not front-staged as design questions; and university–resident, enterprise–public, platform–non-user and professional–everyday relations had no explicit spatial consequence. These are editorial design questions, not measured public feedback, group outcomes or local performance claims.
- One judgement now controls the bilingual proposal, report, visual and publications: Haidian's density of innovation becomes public capability only when ordinary people can still use, question, and exit without an account, device, or professional identity. “An AI highland must not become a technical enclave” is a social thesis, not a second brand; Twin-Track Jing-Zhang remains the sole master idea.
- Bilingual `site-overview` and `mobility-bluegreen` SVG/PNG files are rebuilt in place, putting the ordinary path before optional proof and converting the four social relations into street, court, staffed handoff and exit-capable branch consequences. Title-hidden testing still distinguishes the bypass proof court, resident street/courts and four-way commute/off-route service prototype, so those figures remain KEEP; `land-use-structure`, `metrics-evidence` and existing cover/ordinary-life media remain LOCK.
- Both visual pages retain six primary navigation items and zero offline remote dependencies; no-JavaScript, keyboard, reduced-motion and print fallbacks pass. The user-started 48 seconds remains interface pacing, not real recovery duration. This round adds no media, model call, external image input or factual source.
- Four PDFs are rebuilt without changing page counts: A3 14+14 and A0 8+8. Two fresh processes are byte-identical per file: Chinese A3 `a9aff6f073a6dcc8b940807f7a4045f572acbc09925d84e14c12afa1964f5955`, English A3 `97328cd3bd36c3335ee9ca16a21e147678be6e02cffa1ae121c10daea7cefff0`, Chinese A0 `0373821c8d64f27e4b05f4e573fe1c39d128f21ee2233be65755e6e421b5d466`, and English A0 `911f9030cedf0a4017a25ddf2a99531fdff1e1db7d4fa8374dd63eeeacf6643e`. Full-page, grayscale and detail QA across all 44 pages finds no blank page, encryption, clipping or overlap; this establishes reproducibility and legibility only.
- No brand, scenario, project, key area, governance contract, maturity, geometry, metric, page or media is added. T-02 remains G0 synthetic evidence. Nine geometry files, `metrics.json`, 12/8/3/36, G0, NO-GO, provisional status, zero real outcomes, failure stopping only the proof overlay, non-authorising recovery, `not_fully_cleared`, and zero independent file-level clearance audits remain frozen.

## v48.0 - 2026-08-19

**评分可见旗舰入口与出版重建 / Score-visible flagship entry and publication rebuild**

- 串行门：PR #3401 已合并，merge `a8238fb6abc42e7fb86ecf66e97cc72a9f0bbfc2` 已进入 canonical `main`；同包开放 PR 为 0，工作树洁净。本轮从 `main@d3bdc975f5748460287ac1b9ea25745f6572a786` 开始，只重构既有答案的可见顺序、四组核心双语图件、visual 首屏与四份出版物，不新增品牌、场景、项目、重点区、治理合同、成熟度、事实、媒体或页面。
- 修复前 RED：首屏没有把“已经证明什么、下一步验证什么、当前为什么不能推进”压成一条主线；`site-overview` 仍像三个并列卡片，`land-use-structure` 仍像 6×6 分类表，`mobility-bluegreen` 不能以普通人的完整非 AI 行程被读懂，`metrics-evidence` 没有把完成证明与下一候选直接相连；A3 固定侧栏稀疏，A0 重复大面积结论带挤占图面。
- 主入口现在依次显示唯一总纲、已完成的 G0 合成复演证明、唯一下一候选 `JZ-05 × SCENE-011 × T-02`、三处不可互换原型和真实性边界。下一候选只是编辑审查顺序，不是新增项目、优先级承诺、批准、G1 或实施时序。T-02 仍为 10/10 exact、4/4 stop mapping、13/13 negative controls fail-closed；现实结果仍为 0。
- 原路径重建 `site-overview`、`land-use-structure`、`mobility-bluegreen`、`metrics-evidence` 四组中英文 SVG/PNG；`key-areas` 经无标题辨识复核仍明显优于替代方向，因此 KEEP。新图只表达包内既有概念关系、36 个概念用地单元、9 类功能和证据状态，不制造官方红线、精确总平、现场、尺寸、批准或无障碍结果。
- 双语 visual 保持 6 项主导航、离线零远程依赖、无 JavaScript 可读、键盘、减少动态和打印回退；首屏在封面前给出概念、完成证明、下一候选和阻断条件。本轮无新媒体、无新模型调用、无外部图像或事实来源。
- 四份 PDF 在不增加页数的前提下重建为 A3 14+14、A0 8+8。两次独立新进程逐文件字节一致：中文 A3 `b9a3fa9848922b10a02d9f80e1618e3c369b8bcafcb49b176fbfc20c52e68c81`、英文 A3 `6477e47138d77f48c263b36ff148bce62d9e320379fe7617dde3d80dc9646bcf`、中文 A0 `2912052f8693df138914ca40a360f8ae584a190c451c395028c5892f56100231`、英文 A0 `21053fe1d18d902fe2f0524450dfdb7b9021c245c56913eed092443cc7e05f45`。44 页全页及关键细节复核未见空白、加密、裁切或重叠；这只证明出版文件质量。
- 全部冻结项不变：双轨京张、三原型、JZ-AIOS、G0—G3、四轴、三载体、九份 geometry、`metrics.json`、12/8/3/36、G0、NO-GO、provisional、现实结果 0、同任务非 AI 路径、恢复非授权、`not_fully_cleared` 和独立逐文件清权 0。

- Serial gate: PR #3401 was merged, merge `a8238fb6abc42e7fb86ecf66e97cc72a9f0bbfc2` entered canonical `main`, no package PR remained open and the worktree was clean. Round 48 starts from `main@d3bdc975f5748460287ac1b9ea25745f6572a786` and changes only the visible order of existing answers, four bilingual core-figure groups, the visual first fold and four publications. It adds no brand, scenario, project, key area, governance contract, maturity, fact, media or page.
- RED before repair: the first fold did not compress completed proof, next verification and the current block into one line; `site-overview` still read as three parallel cards, `land-use-structure` as a 6×6 classification matrix, `mobility-bluegreen` not as one complete ordinary-person journey with a non-AI route, and `metrics-evidence` did not directly connect completed proof to the next candidate. Fixed A3 sidebars were sparse, while repeated large A0 verdict bands displaced drawing space.
- The entry now presents the sole master idea, completed G0 synthetic-replay proof, the sole next candidate `JZ-05 × SCENE-011 × T-02`, three non-interchangeable prototypes and the truth boundary. The candidate is editorial review order only, not a new project, priority promise, approval, G1 or implementation schedule. T-02 remains 10/10 exact, 4/4 stop mapping and 13/13 negative controls fail-closed; real outcomes remain zero.
- Four bilingual SVG/PNG groups are rebuilt in place: `site-overview`, `land-use-structure`, `mobility-bluegreen` and `metrics-evidence`. `key-areas` remains KEEP after title-hidden differentiation because it is still clearly stronger than the replacement direction. The new figures express only existing package concepts, 36 conceptual land-use units, nine function classes and evidence states; they create no official boundary, precise masterplan, field fact, dimension, approval or accessibility result.
- Both visual pages retain six primary navigation items, zero offline remote dependencies, readable no-JavaScript content, keyboard operation, reduced motion and print fallback. Concept, completed proof, next candidate and block appear before the cover. This round adds no media, model call, external image or factual source.
- The four PDFs are rebuilt without adding pages: A3 14+14 and A0 8+8. Two independent fresh processes are byte-identical per file: Chinese A3 `b9a3fa9848922b10a02d9f80e1618e3c369b8bcafcb49b176fbfc20c52e68c81`, English A3 `6477e47138d77f48c263b36ff148bce62d9e320379fe7617dde3d80dc9646bcf`, Chinese A0 `2912052f8693df138914ca40a360f8ae584a190c451c395028c5892f56100231`, and English A0 `21053fe1d18d902fe2f0524450dfdb7b9021c245c56913eed092443cc7e05f45`. Full-page review of all 44 pages plus selected details finds no blank page, encryption, clipping or overlap; this establishes publication-file quality only.
- All frozen items remain unchanged: Twin-Track Jing-Zhang, three prototypes, JZ-AIOS, G0-G3, four axes, three carriers, nine geometry files, `metrics.json`, 12/8/3/36, G0, NO-GO, provisional status, zero real outcomes, same-task non-AI path, non-authorising recovery, `not_fully_cleared`, and zero independent file-level clearance audits.

## v47.0 - 2026-08-19

**评审减负、可执行证据回链与英文出版修复 / Review compression, executable evidence backlink and English publication repair**

- 串行门：PR #3379 已明确合并，merge `8261edf23b05f65eff29c4af789527f78a396cbd` 已进入最新 canonical `main`；同一投稿包开放 PR 为 0，工作树洁净。开工后再次同步到 canonical `main@9cd89b2dd1a5cc0a6cdc160a182da8034b2c3858`，新增主线提交未改变规则层或本投稿包。本轮不新增方案方向，只修复可复现的评审阅读、证据闭合和英文出版缺陷。
- Serial gate: PR #3379 was merged and merge `8261edf23b05f65eff29c4af789527f78a396cbd` entered the latest canonical `main`; no package PR remained open and the worktree was clean. A second synchronization advanced the working base to canonical `main@9cd89b2dd1a5cc0a6cdc160a182da8034b2c3858`; intervening commits changed neither the rule layer nor this package. This round adds no design direction and repairs only reproducible review-reading, evidence-closure and English-publication failures.

| 已具备 / Already present | 仍薄弱 / RED | 必须冻结 / Locked | 本轮实施 / Implemented |
|---|---|---|---|
| 30 秒／3 分钟／15 分钟入口、八问地图、13 个正式章节、六项 visual 主导航、三处空间关系、D/H/P 专业交接与 44 页出版物 | 21 个 H2 与 59 个 H3 使扩展证据看似第二主线；Q8 不能从单一对象闭合到方法、失败、非 AI、专业与状态；项目 `T-02` 容易与合成 `t02` PASS 混淆；3 张英文空间图跨栏溢出并污染英文 A3/A0；PDF 只有隐式阅读顺序 | 双轨总纲、三原型、JZ-AIOS、G0—G3、四轴、三载体、九份 geometry、`metrics.json`、12/8/3/36、全部数字与 ID、G0/NO-GO/provisional、现实结果 0、非 AI 同任务、恢复非授权、`not_fully_cleared`、独立清权 0、A3 14+14/A0 8+8 | 主阅读层压为“入口 + 13 正式章”；建立 Q8 与 T-02 七步回链；原路径修复 3 张英文 SVG/PNG；四份 PDF 加 30 SEC/3 MIN/15 MIN 路由，英文问题页换入修复后的全幅图；中文锁定空间图不改 |

- 双语正文保留全部 13 个正式章节、八问和图件位置；扩展单元从 H2 降为 H3/H4，H2 由 21 降至 14、H3 由 59 降至 31、表格行由 249 降至 240、总行数由 1,004 降至 993。231 个唯一证据标记、数字 token 集合和图件顺序不变；中英文标题、表格与图件行位继续一一对应。字符数因新增必要的 Q8 七列闭合索引略增，但线性主阅读层、宽表和重复证据标记减少。
- Both proposals retain all 13 formal chapters, eight questions and figure positions. Extended units move from H2 to H3/H4; H2 falls from 21 to 14, H3 from 59 to 31, table rows from 249 to 240 and total lines from 1,004 to 993. All 231 unique evidence markers, numeric-token sets and figure order remain unchanged; bilingual title, table and figure positions stay aligned. Character count rises slightly because the required seven-column Q8 closure index is new, while the linear top hierarchy, wide-table burden and duplicate marker occurrences decrease.

- `review-handoff-index.json` 与双语 `#review-handoff` 现在提供同一条可执行样例：项目条目 `T-02` → SCENE-011/012 与大钟寺 KAE-003 → PARITY-002/005 → 合成复演的有限证明 → H01—H07 未提交包 → P01—P07 建议专业类型 → `G0 + NO-GO + unknown_not_measured + not_fully_cleared`。`t02-g0-g1` 的 PASS 只证明 10 个固定合成案例中的合同字段、来源闭包、规则优先级和停止／恢复映射可确定性重放；它不证明现场、G1、批准、项目通过、专业接责或现实非 AI 等价。主导航仍为 6；两种语言均保留无 JavaScript、键盘、减少动态和打印回退，中文补齐原先缺失的全局打印展开规则。
- `review-handoff-index.json` and both bilingual `#review-handoff` surfaces now expose the same executable example: project item `T-02` → SCENE-011/012 and Dazhongsi KAE-003 → PARITY-002/005 → bounded synthetic-replay proof → unsubmitted H01–H07 packs → P01–P07 suggested discipline types → `G0 + NO-GO + unknown_not_measured + not_fully_cleared`. PASS for `t02-g0-g1` proves only deterministic replay of contract fields, source closure, rule precedence and stop/recovery mapping across ten fixed synthetic cases; it proves no site condition, G1, approval, project passage, accepted professional duty or real non-AI parity. Primary navigation remains six items. Both languages retain no-JavaScript, keyboard, reduced-motion and print fallback; Chinese gains the previously missing global print-expansion rule.

- 缩略图、全尺寸与灰度审计锁定中文 `site-overview`、`key-areas`、`metrics-evidence`、`public-signal-interface`、`non-ai-service-blueprint` 和 `failure-governance-writeback`，并保留既有封面与普通生活概念图。仅修复 `key-areas.en`、`key-area-sections.en`、`spatial-atlas.en` 的确定性英文溢出：缩短重复说明、压缩字号层级、让标题／免责声明和三栏文本各自留在边界内；空间关系、数字、状态和不可证明事项不变。PNG 由对应 SVG 在本地 Chrome 重新栅格化；本轮无新媒体、无新生成模型调用，既有 MiniMax-H3 媒体与生成披露字节不变。
- Thumbnail, full-size and grayscale audit locks the Chinese `site-overview`, `key-areas`, `metrics-evidence`, `public-signal-interface`, `non-ai-service-blueprint` and `failure-governance-writeback`, while retaining the existing cover and ordinary-life concept image. Only deterministic English overflow in `key-areas.en`, `key-area-sections.en` and `spatial-atlas.en` is repaired: repeated explanation is shortened, typography tightened and headings/disclosures/three-column text kept inside their frames. Spatial relations, numbers, states and non-provable matters do not change. PNGs are re-rasterized from their SVG counterparts in local Chrome. No media or generation-model call is added; existing MiniMax-H3 media and disclosure bytes stay unchanged.

- 四份 PDF 页数不变，并在每页右上角显式标记 `30 SEC`、`3 MIN` 或 `15 MIN`。中文 A3/A0 保留原有图面，只增加阅读路由；英文 A3 P4—P5 与英文 A0 P3—P4 换入修复后的全幅空间图，去除已证实的跨栏叠字。两次独立新进程对每份最终输出逐文件字节一致：中文 A3 `9aa7a2de84d85082218a533e5ac632f31a254f8a7f7e15ecf2f414cb0db22942`、英文 A3 `4d456458def51fc5752f3482a32267cf7828655d0cd1d85d69b4ec34350e8acc`、中文 A0 `1d40721d38a9010dc7e3062a761571b5067523acd2738b2370c89698f9984436`、英文 A0 `b428a35a2cee20e8cc477ff3d1fa13dc8fa6bd6a291cd8504517151299ab35fe`。44 页全页缩略图与英文问题页细节渲染未见空白页、加密、裁切或重叠；该复核只证明出版文件质量，不产生无障碍认证、现场、批准、专业接受、权利清除或成熟度结论。
- All four PDFs retain their page counts and gain an explicit `30 SEC`, `3 MIN` or `15 MIN` marker on every page. Chinese A3/A0 keep their existing sheets and add only the reading route; English A3 P4–P5 and English A0 P3–P4 use the repaired full-figure spatial graphics, removing the confirmed cross-column overlap. Two independent fresh processes are byte-identical for each final file: Chinese A3 `9aa7a2de84d85082218a533e5ac632f31a254f8a7f7e15ecf2f414cb0db22942`, English A3 `4d456458def51fc5752f3482a32267cf7828655d0cd1d85d69b4ec34350e8acc`, Chinese A0 `1d40721d38a9010dc7e3062a761571b5067523acd2738b2370c89698f9984436`, and English A0 `b428a35a2cee20e8cc477ff3d1fa13dc8fa6bd6a291cd8504517151299ab35fe`. Full-page review of all 44 pages plus detailed English problem-page renders finds no blank page, encryption, clipping or overlap. This establishes publication-file quality only and creates no accessibility certification, field result, approval, accepted professional duty, rights clearance or maturity.

- 八个长期真实性问题的本轮答案是：更清楚而非更花哨；三处仍由平行验证庭／一街两院四节点／四向通勤与路外服务无标题区分；所有状态保留完整非 AI 路径；故障只停旁侧验证层；恢复不是授权、批准、重启或 G1；图像继续声明 G0 概念且非现场／建成状态；中英文、visual、报告与 PDF 指向同一对象链；本轮无新媒体，既有生成方法、来源、模型、权利和不可证明事项不变。geometry 与 `metrics.json` 字节必须在最终 head 继续等于开工基线。
- The eight long-running truth checks remain: clearer rather than more decorative; the three places remain distinguishable without headings through parallel proof court / one street–two courts–four nodes / four-way commute and off-route service; every state keeps the complete non-AI path; failure stops only the side proof layer; recovery is not authorization, approval, restart or G1; imagery remains disclosed as G0 concept rather than field/built state; Chinese, English, visual, report and PDF point to one object chain; and no media is added, so existing generation method, source, model, rights and non-provable-matter disclosures do not change. Geometry and `metrics.json` bytes must remain equal to the start baseline on the final head.

## v46.1 - 2026-08-19

**空间动态重建、双语无障碍与 H3 生成链闭合 / Spatial-motion rebuild, bilingual access and H3 provenance closure**

- 串行门：PR #3366 已合并，其 merge SHA 已进入最新 canonical `main`；同包开放 PR 为 0，开工前工作树洁净。修复前 RED：第 46 轮 40 秒纯色卡片视频缺少可读空间关系；普通—验证—故障—恢复无法在一条连续旅程中定位停止范围、人工交接与恢复对象；英文无配套字幕、视频无静态海报；版权声明与评审索引仍停在 141/149 路径。
- Serial gate: PR #3366 was merged, its merge SHA entered the latest canonical `main`, no package PR remained open, and the worktree was clean before editing. RED before repair: the Round 46 40-second flat-card video lacked readable spatial relations; ordinary–proof–failure–recovery did not locate stop scope, staffed handoff and restoration objects in one journey; English had no paired captions and the video had no poster; copyright and review-index counts remained at 141/149 paths.

| 已具备 / Already present | 仍薄弱 / RED | 必须冻结 / Locked | 本轮实施 / Implemented |
|---|---|---|---|
| 四态合同、43.344 秒中文旁白、包内普通生活与三处空间图件、无自动播放入口 | 纯色卡片替代空间、英文字幕缺失、无静态首帧、当前路径计数与媒体生成链不完整 | 双轨总纲、三原型、JZ-AIOS、G0—G3、四轴、三载体、geometry/metrics、12/8/3/36、G0/NO-GO/provisional/rights、A3 14+14/A0 8+8 | 一次 MiniMax-H3 图生视频概念母片 + 包内图件 + ffmpeg 确定性叠层，原路径输出 48.000 秒空间动态；新增海报与英文 VTT；同步中英 proposal/visual/report、agent、rights、review index、narrative 与 manifest |

- 成片为 1920×1080、24 fps、1,152 帧、H.264/AAC、画面与音频均严格覆盖 48.000 秒、3,180,716 bytes（约 3.03 MiB）；五段为双轨入口、三处普通生活、可选验证、故障/人工接管、恢复普通路径。持续帧内披露 G0、provisional、非现场证据、非批准方案以及“48 秒仅为展示节奏”。为满足 40 MiB 整包硬限制，15,520,801-byte 合成母版先以末帧克隆补齐 0.125 秒，再经 ffmpeg slow preset 发布压缩；四态关键帧全尺寸抽检仍可读，全片 SSIM 0.913354。MiniMax-H3 母片 15.08 秒、2560×1440、24 fps，原声不进入成片；重复数字瑕疵被信息层遮蔽，疑似传统建筑界面被明确标作抽象文化框架。原始母片超过媒体上限且含未遮蔽瑕疵，因此不进入投稿包；任务标识、源摘要、提示意图、参考图角色、最终算法与不可证明项保存在文字稿、agent 和 rights ledger。
- The final is 1920×1080, 24 fps, 1,152 frames, H.264/AAC, with picture and audio both covering exactly 48.000 seconds; it is 3,180,716 bytes (about 3.03 MiB). Its five parts are Twin-Track entry, ordinary life across three places, optional proof, failure/staffed takeover, and restoration of the ordinary route. Persistent in-frame disclosure states G0, provisional, not field evidence, not approved, and that 48 seconds is presentation pacing only. To meet the 40 MiB package ceiling, the 15,520,801-byte composition master is first padded by cloning its final frame for 0.125 seconds, then publish-encoded with the ffmpeg slow preset; full-size samples from all key states remain legible and full-video SSIM is 0.913354. The MiniMax-H3 master is 15.08 seconds, 2560×1440 at 24 fps; its audio is excluded. Repeated-number artefacts are covered by an information panel and heritage-like frontage is labelled as an abstract cultural frame. The raw master is above the package media limit and retains unmasked artefacts, so it is not shipped; task identity, source digest, prompt intent, reference roles, final algorithm and non-provable items are recorded in the transcript, agent and rights ledger.

- 新增 `4-state-motion-poster.webp` 与 `4-state-narration.en.vtt`；中文 VTT 与英文 VTT 按同一 43.344 秒旁白时轴成对，视频不足旁白部分以静音补足至 48 秒。中英文 visual 均提供双字幕、静态 poster、无 JavaScript 四态全文、减少动态与不自动播放；独立 MP3 保持原字节和 43.344 秒。逐文件登记现为 manifest 155、非 manifest 154、rights 155，独立清权仍为 0。
- Added `4-state-motion-poster.webp` and `4-state-narration.en.vtt`. Paired Chinese/English VTT files follow the same 43.344-second narration timeline, while the video's remaining duration is padded with silence to 48 seconds. Both visual pages expose both caption languages, a static poster, full no-JavaScript four-state text, reduced-motion support and no autoplay. The standalone MP3 keeps its original bytes and 43.344-second duration. File-level registration is now 155 manifest paths, 154 non-manifest paths and 155 rights records; completed independent clearance remains zero.

- 四份 PDF 全 44 页审计发现 A0 第 8 板仍写旧的 149 路径。双语 A0 只在原位把该数字改为 155：两次新进程输出分别字节一致，中文 SHA-256 `dd4c6216c8c5a154d884f5fe45f5ca55307d5477ae602ebc66cf27dee7dc5776`、英文 `8ac87b86c908c9fbf1e20df3320c20efcfa0c972490e92fd66e0b10cec4901de`；栅格差异只覆盖该数字（中文 172 pixels、英文 169 pixels）。A0 仍为 8+8 页，A3 两册字节不变。
- Full QA of all 44 PDF pages found the stale 149-path label on bilingual A0 board 8. Both A0 files change only that in-place number to 155: two fresh-process outputs are byte-identical, with SHA-256 `dd4c6216c8c5a154d884f5fe45f5ca55307d5477ae602ebc66cf27dee7dc5776` for Chinese and `8ac87b86c908c9fbf1e20df3320c20efcfa0c972490e92fd66e0b10cec4901de` for English; raster deltas are limited to the number (172 pixels zh, 169 pixels en). A0 stays 8+8 pages and both A3 booklets keep their bytes.

- `sources.json`、全部 geometry、`metrics.json`、场景/项目/重点区/用地计数和四份 PDF 页数均不变。本轮不证明真实场地、建筑、人员、运营、公众反馈、无障碍结果、批准、恢复时长、G1、专业接受或复用许可；总体仍为 `not_fully_cleared`。
- `sources.json`, all geometry, `metrics.json`, the scene/project/key-area/land-use counts and all four PDF page counts are unchanged. This round proves no real site, building, person, operation, public feedback, accessibility result, approval, recovery duration, G1, professional acceptance or reuse licence; the package remains `not_fully_cleared`.

## v46.0 - 2026-08-19

**4 态多媒体真视频重建 + 双语同步 + 真相自洽 + CRLF 修复 / Rebuild 4-state motion as a real video, sync bilingual media, reconcile truth-disclosure, fix CRLF**

- 串行门：第 45 轮 PR #3269 已合并（head `4c941e7d9` 进入 canonical `main`），同包开放 PR 为 0，源工作树洁净。本轮**只针对第 45 轮遗留的 4 态视频质量问题**（视频 5.875s vs 音频 43.344s vs VTT 40s 链不闭合、4 态不可辨、帧内无 G0 水印、EN 侧无媒体入口、6 个文件 CRLF、git diff --check 22,628 行假阳性）做最小修复，不新增场景、项目、重点区、治理合同、成熟度或页面。
- Serial gate: Round 45 PR #3269 is merged (head `4c941e7d9` entered canonical `main`); the package had zero open PRs and the source worktree was clean. This round **only** repairs the four-state video quality gaps that Round 45 left behind (video 5.875 s vs audio 43.344 s vs VTT 40 s chain broken, four states not distinguishable, no in-frame G0 watermark, EN side missing the media entry, six files written in CRLF, 22,628-line `git diff --check` false positive), without adding scene, project, key area, governance contract, maturity or page.

| 已具备 / Already present | 仍薄弱 / RED | 必须冻结 / Locked | 本轮实施 / Implemented |
|---|---|---|---|
| 第 45 轮登记的 1 视频 + 1 音频 + 1 .vtt + 1 脚本与 ASSET-150..153；视觉与权利台账到位 | 视频短 7 倍、行人穿过色块，4 态不可辨；EN `proposal.en.md` 和 `visual/index.en.html` 仍说"无新媒体"；4 个 JSON 写 CRLF；视频声称"帧内持续水印"实则水印在 figcaption；视频帧内文字是 AI 生成乱码 | 双轨总纲、三原型、JZ-AIOS、G0—G3、四态数量与时序、三载体、九份 geometry、`metrics.json`、12/8/3/36、G0/NO-GO/provisional/rights、媒体与 A3 14+14/A0 8+8 页 | 重建 `assets/media/4-state-motion.mp4`：本地 ffmpeg + drawtext（msyh.ttc）合成 4 段纯色背景 + 中文状态标签 + 状态编号 + 帧内 G0 概念水印，1920×1080 h264 24 fps，**40.000 s 严格等于音频裁后长度与 .vtt 时码**；音频裁到 40.000 s；EN `proposal.en.md` 第 32 行与 `visual/index.en.html#four-state-media` 镜像 ZH；rights ledger ASSET-150 改 `asset_class=deterministic_composed_video`、`algorithm=Local ffmpeg drawtext composition`、明示 1920×1080 / 40.000 s / 帧内水印 / 字体 / 工具替换为 `TOOL-FFMPEG + TOOL-PYTHON`；`as_of` 改 2026-08-19 |

- 修复前 RED 可重放：把 PR #3269 的 `4-state-motion.mp4` 拉下做 PyAV 时长校验，结果是 5.875 s（h264 24fps 141 帧），不是 30–48 s 也不是 40 s；抽 t=0/3/5.5s 三帧可见同样色块 + 同样行人过场，无 4 态可辨区别；左下右下角 AI 生成的中文是乱码字符；视频帧内没有任何"持续 G0 概念水印"；manifest/agent/rights ledger 同时写"持续水印"，与帧内容矛盾。修复后，PyAV 时长 40.000 s、4 段独立背景 + 状态编号 + 中文标签 + 左下角 msyh.ttf 渲染的 G0 概念水印全部存在于每一帧；视频、音频裁后、.vtt 三者时长一致。
- Reproducible RED: PyAV on the PR #3269 `4-state-motion.mp4` returns 5.875 s (h264 24 fps 141 frames), not 30–48 s or 40 s; sampling t=0/3/5.5 s shows the same colour blocks and walking-figure animation with no distinguishable four states, the lower-left and lower-right AI-generated text is garbled glyphs, no in-frame G0 watermark appears in any frame, while manifest / agent / rights ledger all claim a "persistent watermark" — a direct contradiction with the frame content. After repair, PyAV reports 40.000 s, each segment has its own background, state number and Chinese state label, and the msyh.ttf G0 watermark sits in the lower-left of every frame; the trimmed audio and the .vtt captions share the same 40.000 s length.

- 本轮把 rights ledger `expected_manifest_entries` 保持 153（不增不减，只改 ASSET-150 的元数据）；`as_of` 从 2026-08-18 → 2026-08-19；4 条媒体记录全部 `not_fully_cleared` / `generated_derivative_pending_embedded_asset_audit`（视频改为 `self_authored_derivative_pending_independent_review`），`audit_records` 仍为 0，`public_or_professional_reuse_blocked` 保持 true。
- This round keeps rights-ledger `expected_manifest_entries` at 153 (no count change, only ASSET-150 metadata); `as_of` advances from 2026-08-18 to 2026-08-19; all four media records remain `not_fully_cleared` (video now `self_authored_derivative_pending_independent_review`); `audit_records` remains 0 and `public_or_professional_reuse_blocked` stays true.

- 6 个 CRLF 文件（`agent.json` / `4-state-narration-script.md` / `4-state-narration.vtt` / `manifest.json` / `report/narrative.md` / `rights-clearance-ledger.json`）在本轮编辑后转为 LF；`git config --local core.autocrlf false` 已设；本轮 exact head 上 `git diff --check` 必须 exit 0、零假阳性。
- The six CRLF files (`agent.json` / `4-state-narration-script.md` / `4-state-narration.vtt` / `manifest.json` / `report/narrative.md` / `rights-clearance-ledger.json`) are converted to LF after the in-round edits; `git config --local core.autocrlf false` is set; on the exact R46 head, `git diff --check` must exit 0 with zero false positives.

- 视频、音频、字幕与文字稿 4 件套的锁步规则、权利与不可证明事项不变（"任一变更必须同步另外三份"）；视频 40.000 s、音频裁后 40.000 s、.vtt 至 00:00:40.000、文字稿 §时长描述保持"40 秒"。所有改动均不证明任何现场状态、批准、运行、公众反馈、无障碍结果或专业接受；D/H/P/C、G0、provisional、零独立清权、现实结果 0、`not_fully_cleared`、A3 14+14 / A0 8+8 页不变。
- The four-piece lockstep rule (video / audio / .vtt / script) and the rights + non-provable disclosure stay intact ("any change to one must lockstep-update the other three"). Video 40.000 s, trimmed audio 40.000 s, .vtt to 00:00:40.000, script §duration remains "40 seconds". The changes prove no field state, approval, operation, public feedback, accessibility result or professional acceptance; D/H/P/C, G0, provisional status, zero independent clearance, zero real outcomes, `not_fully_cleared` and A3 14+14 / A0 8+8 page counts remain unchanged.

## v45.0 - 2026-08-18

**Multimedia 4-state motion and narration (video + audio + srt + script) / 多模态 4 态运动与旁白**

- 串行门：第 44 轮 PR #3253 已合并（head `8811aa404` 进入 canonical `main`）；同包开放 PR 为 0，源工作树洁净。本轮只在"普通 / 验证 / 故障 / 恢复"四态叙事已有 12 类机器证据 + 8 项可视化 + 5 个外发登记的基础上，补 1 段概念视频、1 段音频旁白、srt 字幕和文字稿，并把它们登记进 rights ledger，不新增场景、项目、重点区、治理合同、成熟度或页面。
- Serial gate: Round 44 PR #3253 is merged (head `8811aa404` entered canonical `main`); the package had zero open PRs and the source worktree was clean. This round adds one concept video, one audio narration, srt subtitles and a script, registering all four in the rights ledger on top of the existing 12 evidence classes, 8 figures and 5 outreach registers; no new scene, project, key area, governance contract, maturity or page is introduced.

| 已具备 / Already present | 仍薄弱 / RED | 必须冻结 / Locked | 本轮实施 / Implemented |
|---|---|---|---|
| 4 态叙事在 12 类合同/登记/机器证据中已存在；visual/index.html 已有 4 态 grid 但只有静态文字；assets/media 已有 2 张 webp + 1 个 md；rights ledger 149 条；audit_records 0 | visual 缺视频/音频入口；音频无字幕/文字稿；权利台账缺新模型/工具/输入披露 | 双轨总纲、三原型、JZ-AIOS、G0—G3、四轴、三载体、九份 geometry、`metrics.json`、12/8/3/36、G0/NO-GO/provisional/rights、媒体与 A3 14+14/A0 8+8 页 | `assets/media/4-state-motion.mp4`（0.74 MB）、`4-state-narration.mp3`（0.66 MB）、`4-state-narration.vtt`（WebVTT 字幕，654 B）、`4-state-narration-script.md`；visual/index.html 嵌入 `<video controls preload="none" playsinline>` + `<audio controls preload="none">` + `<track kind="captions" src=...vtt>` + 文字稿链接，**全部不自动播放**；rights ledger 加 ASSET-150..153 共 4 条记录（含模型/工具/输入/限制全披露），`as_of` 更新到 2026-08-18 |

- 修复前 RED：4 态概念在 `proposal.md` 第 6 章、第 8 章、第 12 章和 `visual/index.html` 的 grid 中都以纯文字描述；访问者必须阅读三遍中英正文+grid 才能拼出"普通-验证-故障-恢复"的 12 秒节奏；缺独立可视化通道；缺配套音频无障碍入口。修复后，单条 30–48 秒概念视频 + 40 秒旁白 + srt 字幕 + 文字稿为访问者提供"看+听+读"三通道可选入口；中英文 visual 完全等价。
- Reproducible RED: the four-state concept appeared only as text in proposal.md sections 6/8/12 and in the visual grid. Visitors had to read three bilingual passages plus the grid to assemble the 12-second pacing; no independent visual channel existed and no accessibility audio was present. After repair a 30–48 second concept video, a 40-second narration, srt captions and a script together provide a see+hear+read triple channel; bilingual visual pages stay strictly equivalent.

- 视频/音频生成平台 API（AIGC 标签，ContentProducer `MiniMax AI`，确切模型版本包内未声明）和不可证明事项全部登记到 rights ledger；visual/index.html 的水印"`<code>G0 概念 · 临时几何 · 非现场证据 · 非批准方案</code>`"出现在视频嵌入的 `<figcaption>`，不进入视频帧本身；srt 字幕 + 文字稿是"音频必须配"的可访问性兜底；任一变更必须同步另外两份。
- Generation parameters, model names and unprovable items are recorded in the rights ledger. The bilingual visual `<figcaption>` carries the watermark "`<code>G0 概念 · 临时几何 · 非现场证据 · 非批准方案</code>`" but the watermark is not baked into the video frames themselves. The srt captions and script are the accessibility fallback required by the AGENTS.md "no autoplay" rule; any change must lockstep-update the other two files.

- 本轮把 rights ledger `expected_manifest_entries` 149 → 153；4 条新记录全部 `not_fully_cleared` / `generated_derivative_pending_embedded_asset_audit`；`audit_records` 仍为 0；`public_or_professional_reuse_blocked` 保持 true。
- This round lifts the rights-ledger `expected_manifest_entries` from 149 to 153. All four new records are `not_fully_cleared` / `generated_derivative_pending_embedded_asset_audit`; `audit_records` remains 0; `public_or_professional_reuse_blocked` stays true.

- 不再视 48 秒为现场故障恢复时长；它是普通—验证—故障—恢复的展示节奏（每态 12 秒）。视频和音频均不证明任何现场状态、批准、运行或公众反馈；D/H/P/C、G0、provisional、零独立清权、现实结果 0、`not_fully_cleared`、A3 14+14 / A0 8+8 页不变。
- The 48 seconds is still presentation pacing, not real recovery duration. The video and audio do not prove any field state, approval, operation or public feedback; D/H/P/C, G0, provisional status, zero independent clearance, zero real-world outcomes, `not_fully_cleared` and A3 14+14 / A0 8+8 page counts remain unchanged.

## v44.0 - 2026-08-18

**Professional handoff, veto and NO-GO trace / 专业交接、否决与 NO-GO 追踪**

- 串行门：第 43 轮 PR #3230 已合并（head `b6f700ed5f8eb76b48bbc602cec467e242f18609`，merge `ef6ddc9d5df0c1aaa16192427d1e2ded00b6a931` 已进入 canonical `main`）；同包开放 PR 为 0，源工作树洁净。本轮只修复 D01—D08、H01—H07、建议专业与关闭记录之间无法双向追踪的专业交接断点。
- Serial gate: Round 43 PR #3230 is merged (head `b6f700ed5f8eb76b48bbc602cec467e242f18609`; merge `ef6ddc9d5df0c1aaa16192427d1e2ded00b6a931` entered canonical `main`); the package had zero open PRs and the source worktree was clean. This round repairs only the professional-handoff break between D01–D08, H01–H07, suggested disciplines and closure records.

| 已具备 / Already present | 仍薄弱 / RED | 必须冻结 / Locked | 本轮实施 / Implemented |
|---|---|---|---|
| 八类未来替换资料、七类交接包、九类关闭条件、专业修改／拒绝／删除权与缺项 NO-GO 已存在；真实材料、责任接受、批准和 GO 均为 0 | D→H 只有单向列表；H 无建议专业类型和替换资料回链；关闭类别无 H 回链；跨文件 `#ID` 不是可解引用 JSON Pointer；前台有两个 15 分钟入口并把 H 包简称为“专业角色”；A0 B8 仍显示旧的 141 条登记 | 双轨总纲、三原型、JZ-AIOS、G0—G3、四轴、三载体、九份 geometry、`metrics.json`、12/8/3/36、G0/NO-GO/provisional/rights、媒体与 A3 14+14/A0 8+8 页 | 建立 22 条 D↔建议专业、16 条 D↔H、9 条 H↔关闭类别、11 条交接项→关闭记录双向／标准指针；统一 `#review-handoff` 为唯一 15 分钟入口并接入五项本地合同；修正当前 149/148/149 文件登记；只更新 A0 B8 的旧计数 |

- 修复前 RED 可重放：八个 D 模板共给出 16 条 D→H 边，但七个 H 包没有任何替换资料回链；九个关闭类别没有 H 回链；H 包没有建议专业类型；11 个交接项的关闭引用不能按 RFC 6901 解引用；双语前台同时把 `#review-handoff` 与 `#accessible-review-walk` 当作 15 分钟起点，且把文档包写成行动角色。修复后，三份权威合同的边集合精确对称、11 个标准指针全部命中，H01—H07 仍全部 `not_submitted`，建议专业接受数仍为 0，任一重大缺口仍为 NO-GO。
- Reproducible RED: eight D templates exposed 16 D→H edges, but seven H packs had no replacement back-links; nine closure categories had no H back-links; H packs named no suggested discipline types; and 11 item-to-closure references were not RFC 6901-resolvable. The bilingual front stage also exposed both `#review-handoff` and `#accessible-review-walk` as 15-minute starts and described document packs as acting roles. After repair the three authoritative contracts have exact symmetric edge sets and all 11 standard pointers resolve, while every H01–H07 pack remains `not_submitted`, accepted suggested disciplines remain 0, and any material gap remains NO-GO.
- 最终真实浏览器复核另发现一条 RED：双语页面声称“无 JavaScript 时五步全部展开”，但父级原生 `<details>` 在源文件中未设 `open`，禁用脚本后五步实际全部不可见。现已只把该父级设为源端展开；启用脚本时既有交互仍按原逻辑收起，打印仍展开，禁用脚本时中英文五步、限制和回链均可见，移动端页面横向溢出为 0。
- Final real-browser review found one additional RED: the bilingual pages promised that all five steps remained expanded without JavaScript, but their parent native `<details>` lacked source-level `open`, so every step was actually hidden when scripting was disabled. Only that parent now starts open in source; the existing script still collapses it for enhanced interaction, print still expands it, and the five bilingual steps, limits and backlinks are visible without scripting with zero page-level mobile overflow.
- 逐文件登记的当前口径统一为 manifest 149、非 manifest 148、权利台账 149；其中 146 个普通文件执行最终 SHA-256 字节核对，manifest、`self_check.json` 与台账自身保留三项循环／最终化例外。A0 中英文第 8 页仅把旧的 `141` 原位改为 `149`，页数、坐标、字体、图面和其他内容不变；两次独立新进程得到逐文件相同字节。
- Current counts are aligned to 149 manifest paths, 148 non-manifest paths and 149 rights-ledger records. Final SHA-256 byte checks cover 146 ordinary files, with three circular/finalisation exceptions for the manifest, `self_check.json` and the ledger itself. Bilingual A0 board 8 changes only the stale in-place `141` to `149`; page count, coordinates, font, drawing and all other content remain unchanged, and two fresh processes produce byte-identical files.
- 本轮无新增媒体、外部来源、事实、场景、项目、重点区、治理合同、成熟度或页面；既有专业交接图与 A3 已通过缩略图和全尺寸审查，因没有可复现缺口而锁定原字节。D/H/P/C 只定义未来替换、建议审查和保守关闭路线，不是实际材料、已接受责任、已确认伙伴、批准、现场测试、现实恢复、G1 或清权。geometry、`metrics.json`、12/8/3/36、现实结果 0、`not_fully_cleared` 和独立逐文件清权 0 不变。
- This round adds no media, external source, fact, scene, project, key area, governance contract, maturity or page. The existing professional-handoff figure and A3 passed thumbnail/full-size review and therefore keep their bytes. D/H/P/C defines future replacement, suggested review and fail-closed routing only—not real material, accepted duty, a confirmed partner, approval, field testing, real recovery, G1 or rights clearance. Geometry, `metrics.json`, 12/8/3/36, zero real-world outcomes, `not_fully_cleared` and zero independent file-level clearance audits remain unchanged.

## v43.0 - 2026-08-18

**Three-switchyard spatial atlas / 三座换轨场空间图谱**

- 串行门：第 42 轮 PR #3222 已合并（head `479af0cb76d66553982c7b25cb6a64a8244caca3`，merge `3547b7dabd53c0d3d11ea7162a70d904ef2425de` 已进入 canonical `main`）；同一投稿包开放 PR 为 0，源工作树洁净。本轮只修复“空间关系要跨多个表面拼接”的阅读断点。
- Serial gate: Round 42 PR #3222 is merged (head `479af0cb76d66553982c7b25cb6a64a8244caca3`; merge `3547b7dabd53c0d3d11ea7162a70d904ef2425de` entered canonical `main`); the package has zero open PRs and the source worktree was clean. This round repairs only the reading break in which spatial relations had to be assembled across surfaces.

| 已具备 / Already present | 仍薄弱 / RED | 必须冻结 / Locked | 本轮实施 / Implemented |
|---|---|---|---|
| 双语平面、剖面、四态、非 AI 路径和固定页数 A3/A0 已存在 | 三处的普通路径、停止、人工交接和恢复分别落在多张图和文字中；没有一张双语静态图同时标出三处五类关系 | 双轨总纲、三原型、JZ-AIOS、G0—G3、四轴、三载体、九份 geometry、`metrics.json`、12/8/3/36、G0/NO-GO/provisional/rights 与 A3 14+14、A0 8+8 页 | 原路径新增双语空间图谱，并把同一图谱读法接入离线 visual、proposal、report、A3 P4 与 A0 B4；主导航仍为六项 |

- 修复前 RED 可重放：Round 43 前没有一张双语静态图在众智园、原点社区与大钟寺同时提供普通／非 AI连续路径、旁侧验证、停止对象、H 人工交接和恢复回归，`site_specific_stop_handoff_recovery_triplets=0`。修复后为 3；结构化前后记录见 `visual/assets/review-handoff-index.json#evidence_integrity.spatial_atlas_r43`。
- Reproducible RED: before Round 43 no bilingual static figure supplied ordinary/non-AI continuity, side proof, stop object, H staffed handoff and recovery return for Zhongzhiyuan, Origin Community and Dazhongsi together, so `site_specific_stop_handoff_recovery_triplets=0`. After repair it is 3; the structured before/after record is `visual/assets/review-handoff-index.json#evidence_integrity.spatial_atlas_r43`.
- 本轮无新增外部来源、模型或生成式媒体。`spatial-atlas` SVG/PNG 是以既有 G0 三处概念关系确定性排版的解释图，明确不是现状、已建成状态、批准方案、无障碍结果、公众意见或现实恢复时间。故障只停止验证／服务叠层；普通生活和完整非 AI 路径继续；恢复不等于授权、批准、G1 或重启。geometry、metrics、12/8/3/36、G0、NO-GO、provisional、现实结果 0、`not_fully_cleared` 与独立逐文件清权 0 不变。
- This round adds no external source, model or generative media. The `spatial-atlas` SVG/PNG is a deterministic explanatory layout of existing G0 three-place relations, explicitly not an existing/built state, approved plan, accessibility result, public opinion or real recovery time. Failure stops only a proof/service overlay; ordinary life and the complete non-AI route continue; recovery is not authorization, approval, G1 or restart. Geometry, metrics, 12/8/3/36, G0, NO-GO, provisional status, zero real outcomes, `not_fully_cleared` and zero independent file-level clearance audits remain unchanged.

## v42.0 - 2026-08-18

**Four-state truth and recovery boundary / 四态语义与恢复真实性**

- 串行门：第 41 轮 PR #3215 已合并（head `e5b35a1aec70a20d6cd33542f0b1828fa31da756`，merge `7d5d1c7914de610c7e68a89f055063afc077e79f` 已包含于 canonical `main@fb7e7c3b7d2c88bd4acbeceaafc13d8933b3082f`）；同一投稿包开放 PR 为 0，源工作树洁净。本轮只修复四态展示可能被误读为现实恢复、授权或成熟度升级的断点。
- Serial gate: Round 41 PR #3215 is merged (head `e5b35a1aec70a20d6cd33542f0b1828fa31da756`; merge `7d5d1c7914de610c7e68a89f055063afc077e79f` is contained in canonical `main@fb7e7c3b7d2c88bd4acbeceaafc13d8933b3082f`); the package has zero open PRs and the source worktree was clean. This round repairs only four-state display breaks that could be misread as real recovery, authorization or maturity advance.

| 已具备 / Already present | 仍薄弱 / RED | 必须冻结 / Locked | 本轮实施 / Implemented |
|---|---|---|---|
| 48 秒的 `jury-motion-journey.json` 已说明它只是界面节奏；四态卡和无 JavaScript/减少动态后备已存在；四轴和三载体已有合同 | 两版按钮与读屏播报把“48 秒旅程完成”说得像恢复事件；可见恢复卡与第 4 步漫游未明确切开恢复、授权、批准、G1 与重启；服务轴当前值不在其允许值集合 | 双轨总纲、四态数量与动画长度、三原型、JZ-AIOS、三载体、九份 geometry、`metrics.json`、12/8/3/36、G0/NO-GO/provisional、现实结果 0、媒体、PDF、`not_fully_cleared` 与独立清权 0 | 动态统一标为“48 秒界面示意 / interface pacing”；两版全部可见恢复卡和漫游第 4 步明确“材料闭合也不产生重启授权、批准、G1 或现实结果”；服务轴改为已声明的 `ordinary_non_ai_concept_requirement`，并说明它不是观察到的服务可用性 |

- 修复前 RED 可重放：中英文按钮分别是 `开始 48 秒旅程` / `Start 48-second journey`，读屏脚本含 `Journey started at` 与 `Journey complete at`；两版恢复卡缺少不授权语句；漫游第 4 步缺少候选不授权语句；`service_state.current_value=ordinary_non_ai_available_concept_requirement_not_verified_service` 不在 `allowed_values` 中。修复后五类专项断言全部通过，界面动态、静态卡和减少动态均只表达审阅示意。
- Reproducible RED: the Chinese/English buttons read `开始 48 秒旅程` / `Start 48-second journey`, and the live-region script contained `Journey started at` and `Journey complete at`; both recovery cards lacked a non-authorization statement; walkthrough Step 4 lacked a candidate non-authorization statement; and `service_state.current_value=ordinary_non_ai_available_concept_requirement_not_verified_service` was absent from `allowed_values`. After repair, all five specialized assertion groups pass and motion, static cards and reduced motion express reviewer display only.
- 本轮无新媒体、模型、来源、主张、场景、项目、重点区、治理合同、页面或 PDF。生成方法、来源、模型、权利与不可证明事项披露不变；概念展示、界面演示、合成回放、文件 PASS 与 PR 合并均不成为现场证据、真实恢复、授权、批准、G1 或清权。非 AI 路径继续完整，故障只停验证叠层，恢复先还原普通使用。
- This round adds no media, model, source, claim, scene, project, key area, governance contract, page or PDF. Generation-method, source, model, rights and non-provable-matter disclosures remain unchanged; concept display, interface pacing, synthetic replay, a file PASS and PR merge do not become field evidence, real recovery, authorization, approval, G1 or clearance. The non-AI path remains complete, failure stops only the proof overlay, and recovery restores ordinary use first.

## v41.0 - 2026-08-18

**Evidence-first reviewer reading ladder / 证据优先的评审阅读梯**

- 串行门：第 40 轮 PR #3204 已合并（head `d4d9f5dd86ed61a121ed716c964968ae7aaecd16`，merge `596ddd89ffd75edd59cc4f1afa70e6f0ec5e3d9a` 已包含于 canonical `main@5fb96256c5b756f2f7d1880b7594352aa0eb25e1`）；同一投稿包开放 PR 为 0，源工作树洁净。本轮只修复首屏阅读路径的可复现入口断点。
- Serial gate: Round 40 PR #3204 is merged (head `d4d9f5dd86ed61a121ed716c964968ae7aaecd16`; merge `596ddd89ffd75edd59cc4f1afa70e6f0ec5e3d9a` is contained in canonical `main@5fb96256c5b756f2f7d1880b7594352aa0eb25e1`); the package has zero open PRs and the source worktree was clean. This round repairs only a reproducible first-screen reading-entry break.

| 已具备 / Already present | 仍薄弱 / RED | 必须冻结 / Locked | 本轮实施 / Implemented |
|---|---|---|---|
| 双语 visual 已有 30 秒／3 分钟／15 分钟三张阅读卡、六项主导航、八问唯一答案与 D01—D08/H01—H07 证据入口 | 每版有 3 张阅读卡但卡内直接行动链接为 0；3 分钟和 15 分钟的起点只能从说明文字推断，读者必须自行滚动或猜测 | 双轨总纲、三原型、四态与 G0—G3 分离、JZ-AIOS、三载体、九份 geometry、`metrics.json`、12/8/3/36、G0/NO-GO/provisional/rights、媒体和 PDF 页数 | 三张卡各新增一个可键盘访问的静态起步链接：概念/边界 → `#cold-read-proof-boundary`，普通生活 → `#ordinary-life`，证据/交接 → `#review-handoff`；双语结构和六项主导航不变 |

- 修复前 RED 可重放：统计 `visual/index.html` 与 `visual/index.en.html` 的 `.reading-lanes` 内 `<a>` 元素，两版均为 0，而每版均有 3 张卡。修复后每版有 3 个显式起步链接，目标一致且不依赖 JavaScript；`review-handoff-index.json#evidence_integrity.reading_ladder_r41` 保存前后计数与边界。
- Reproducible RED: counting `<a>` elements inside `.reading-lanes` in both `visual/index.html` and `visual/index.en.html` returned 0 while each page contained three cards. After repair each page exposes three explicit, matching start links without JavaScript; `review-handoff-index.json#evidence_integrity.reading_ladder_r41` preserves the before/after counts and boundary.
- 本轮无新媒体、来源、主张、场景、项目、重点区、治理合同或页面。修复只改变既有阅读入口，不把概念图、离线导航或验证通过写成现场证据、理解测量、专业意见、批准、G1、授权或清权。四份 PDF 因内容未受影响而保持原字节与页数。
- This round adds no media, source, claim, scene, project, key area, governance contract or page. It changes only existing reading entry; it does not turn concept figures, offline navigation or a passing check into field evidence, measured comprehension, professional opinion, approval, G1, authorisation or clearance. The four PDFs keep their existing bytes and page counts because their content is unaffected.
- 权利台账的逐字节核验保持 138 条普通文件，再加 manifest、`self_check.json`、ledger 三个明确例外：manifest 和 ledger 不能哈希自身；`self_check_submission.py` 在同一最终化步骤中重写 `self_check.json` 并把最终 SHA-256 写入 manifest，所以该记录只回链 manifest 的最终摘要。例外不改变 `not_fully_cleared`、独立逐文件清权 0 或任何可用性结论。
- Rights-ledger byte verification covers 138 ordinary files plus three explicit exceptions: manifest and ledger cannot hash themselves; `self_check_submission.py` rewrites `self_check.json` and writes its final SHA-256 into manifest in the same finalization step, so that record back-links only to the final manifest digest. The exception does not change `not_fully_cleared`, zero independent file-level clearance audits or any use decision.
- 八个长期真实性反问：修复更清楚而非更花哨；三处继续可由空间关系区分；非 AI 路径继续完整；故障只停验证叠层；恢复不等于授权、批准或 G1；既有图像继续明确为概念展示；中英文、visual、报告和 PDF 指向同一结论；本轮无新媒体，既有生成方法、来源、模型、权利和不可证明事项披露不变。geometry、`metrics.json`、12/8/3/36、G0、NO-GO、provisional、现实结果 0、`not_fully_cleared` 和独立逐文件清权 0 保持不变。
- Eight long-running truth checks: the repair is clearer rather than more decorative; three places remain distinguishable by spatial relation; the non-AI path stays complete; failure stops only the proof overlay; recovery is not authorisation, approval or G1; existing imagery remains labelled as conceptual display; Chinese, English, visual, report and PDF state the same outcome; and this round adds no media, leaving generation-method, source, model, rights and non-provable-matter disclosures unchanged. Geometry, `metrics.json`, 12/8/3/36, G0, NO-GO, provisional status, zero real-world outcomes, `not_fully_cleared` and zero independent file-level clearance audits remain unchanged.

## v40.0 - 2026-08-18

**Spatial-distinction cold-read repair / 空间差异冷读修复**

- 串行门：第 39 轮 PR #3109 已合并（head `1172b6ac6904b67bd7f9d41c0cfad4742d91ed8a`）且 merge 已进入 canonical `main@44ffc5bbad89245f76ea1eed4f36a38465cf9211`；同一投稿包无开放 PR，源工作树洁净。本轮只修复可复现的“同构卡片掩盖空间差异”阅读断点。
- Serial gate: Round 39 PR #3109 is merged (head `1172b6ac6904b67bd7f9d41c0cfad4742d91ed8a`) and the merge is contained in canonical `main@44ffc5bbad89245f76ea1eed4f36a38465cf9211`; no competing package PR is open and the source worktree was clean. This round only repairs the reproducible reading break in which isomorphic cards hid spatial difference.

| 已具备 / Already present | 仍薄弱 / RED | 必须冻结 / Locked | 本轮实施 / Implemented |
|---|---|---|---|
| 三处已有不同文字说明、普通—验证—故障—恢复、双语图和固定页数出版物 | 旧重点区平面由并列卡片组织，旧关系剖面由三条相似横排组织；读者会先看到共同版式，而不是平行旁路／一街两院四节点／四向通勤十字 | 双轨总纲、三原型、JZ-AIOS、G0—G3、四轴、三载体、九份 geometry、metrics、12/8/3/36、G0/NO-GO/provisional/rights、页数和全部媒体 | 原路径重绘双语平面与关系剖面：众智园显示上下分离旁路与验证庭；原点显示一街、两院、四个独立撤回点；大钟寺显示四向通勤十字与路外服务。A3 两张关键页改为全幅图面，A0 仅替换对应印刷图层。 |

- 修复前 RED：旧图的共同卡片边框和三条同形四态横排先于空间关系被识别；该问题来自图面构图，不是缺少文字。修复后，三处的普通线、可停对象、人工交接与恢复对象分别可由图形关系识别；故障只退出旁侧验证庭、独立节点或路外服务支线，普通生活和非 AI 路径继续。
- Reproducible RED: shared card frames and three homologous state rows in the old figures were recognized before spatial relation; the defect was compositional, not a shortage of prose. The repair makes each ordinary line, stoppable object, staffed handoff and restoration object legible from the drawing: failure removes only the side proof court, independent nodes, or off-route service siding, while ordinary and non-AI paths continue.
- 双语 visual 的三段空间提示、alt 与移动端阅读提示同步为“先认关系，再核对图件”；保留原生横向滚动、无 JavaScript、键盘、减少动态和静态回退。四份 PDF 保持 A3 14+14、A0 8+8，两次独立进程逐文件字节一致；全页与关键页 QA 不见裁切、重叠、空白页、加密或控件。
- The bilingual visual's three spatial prompts, alt text and mobile reading hint now say “identify the relation first, then check the figure”; native horizontal scrolling, no-JavaScript, keyboard, reduced-motion and static fallbacks remain. The four PDFs retain A3 14+14 and A0 8+8, are byte-identical across two independent processes, and full-page plus key-page QA finds no clipping, overlap, blank page, encryption or widget.
- 本轮无新媒体；生成方法、来源、模型、权利与不可证明事项均未变化。图件是 G0 概念关系，不是现状、站点锚点、法定边界、获批设计、已建成状态、无障碍结果、人员承诺或现实恢复时长。geometry、`metrics.json`、12/8/3/36、G0、NO-GO、provisional、现实结果 0、`not_fully_cleared` 和独立逐文件清权 0 保持不变。
- This round adds no media; generation method, sources, model, rights and non-provable matters are unchanged. The figures are G0 concept relations, not existing conditions, station anchors, statutory boundaries, approved designs, built states, accessibility results, staffing commitments or real recovery durations. Geometry, `metrics.json`, 12/8/3/36, G0, NO-GO, provisional status, zero real-world outcomes, `not_fully_cleared` and zero independent file-level clearance audits remain unchanged.

## v39.0 - 2026-08-17

**Eight-question cold-read baseline and unique answer routing / 八问冷读基线与唯一答案路由**

- 串行门：第 38 轮 PR #3094 已合并（head `bb0d3461280ba681271208c3e41aaa3e83913627`，merge `4f773dd1ab5592854f223f199a6cc9cd1fdf11b2`），merge 已进入 canonical `main@f7e4537deced08b10bed290210b76d57e8240ed4`；投稿人 `xyh202131` 开放 PR 为 0，源工作树洁净。本轮由该固定点开始。
- Serial gate: Round 38 PR #3094 is merged (head `bb0d3461280ba681271208c3e41aaa3e83913627`, merge `4f773dd1ab5592854f223f199a6cc9cd1fdf11b2`) and the merge is contained in canonical `main@f7e4537deced08b10bed290210b76d57e8240ed4`; contributor `xyh202131` has zero open PRs and the source worktree was clean. This round starts from that fixed point.

| 已具备 / Already present | 仍薄弱 / RED | 必须冻结 / Locked | 本轮实施 / Implemented |
|---|---|---|---|
| 30 秒总纲、3 分钟四态、15 分钟证据库；双语 proposal/visual/report；A3 14+14、A0 8+8 | `cold-read-8` 只有八个问题和四个泛化入口，却没有逐题答案、唯一锚点或 PDF 页码；前台仍声称逐题入口已存在 | 双轨总纲、三原型、JZ-AIOS 内核、geometry、metrics、12/8/3/36、G0/NO-GO/provisional/rights、媒体与 PDF 页数 | 八问各增一个双语主答案、一个唯一前台锚点和 A3/A0 页码；机器索引记录 8/8 与唯一性断言；报告同步 |

- 修复前 RED 可重放：`visual/assets/review-handoff-index.json#cold-read-8` 的 `questions` 为 8，但无 `answer_map`；四个 `entry_points` 仅指向整份 proposal、整页 visual 与两份中文 PDF，无法回答“主答案在哪里”。修复后 `answer_map` 为 Q1—Q8，8 个 ID、8 个不同前台锚点、双语锚点缺失 0；proposal、visual 与 report 使用同一答案和印刷页码。
- Reproducible RED: before repair, `visual/assets/review-handoff-index.json#cold-read-8` had eight `questions` but no `answer_map`; four `entry_points` only named the whole proposal, visual and two Chinese PDFs, so they could not locate a primary answer. After repair, `answer_map` contains Q1–Q8 with eight IDs, eight distinct front-stage anchors and zero missing bilingual anchors; proposal, visual and report use the same answers and print locators.
- 冷读答案只复述既有事实与限制，属于编辑复核，不是公众反馈、专家意见、评审结果或批准。本轮无新媒体；生成方法、来源、模型、权利与不可证明事项均未变化。
- Cold-read answers restate existing facts and limits only. They are editorial review, not public feedback, expert opinion, a jury result or approval. This round adds no new media; generation method, source, model, rights and non-provable matters are unchanged.
- 四份 PDF 内容与字节不变，原有页面已覆盖八问，索引只增加精确页码：A3 14/14、A0 8/8。geometry 九文件、`metrics.json`、封面和普通生活媒体字节保持冻结；未新增主张、事实、页面、场景、项目、重点区、合同或成熟度。
- All four PDFs keep their content and bytes; existing pages already cover the eight questions and the index only adds exact page locators: A3 14/14 and A0 8/8. The nine geometry files, `metrics.json`, cover and ordinary-life media remain byte-frozen; no claim, fact, page, scene, project, key area, contract or maturity is added.

## v38.0 - 2026-08-17

**Reviewer-path compression and publication legibility / 评审路径压缩与出版可读性**

- 离线 visual 将主导航固定为六项，把完整证据索引移出粘性导航；12 行公共信号表与后台证据库默认收起但保留原生无 JavaScript 操作，打印时完整展开。五场景浏览器复核覆盖中英文桌面、中文移动端、无 JavaScript 与减少动态：无溢出、无外域请求、无缺失 alt、无重复 ID，中文/英文桌面前台分别压缩到 9.854/10.428 个视口高度。
- The offline visual fixes the primary navigation at six items and moves the full evidence index outside the sticky bar. The 12-row public-signal table and backstage library are initially collapsed but remain native and operable without JavaScript, while print reveals the complete table. A five-scenario browser review covers bilingual desktop, Chinese mobile, no JavaScript and reduced motion: no overflow, external request, missing alt or duplicate ID; the Chinese/English desktop front stage is reduced to 9.854/10.428 viewport heights.
- 中英文 proposal 与离线报告明确区分 13 个 formal 章节和 8 个 extended evidence 单元，保留原有 21 个 H2、21 幅图、全部正文和逐章证据标记。未删除未知、G0、provisional、非 AI 路径、权利阻断或专业否决。
- The bilingual proposals and offline reports explicitly distinguish 13 formal chapters from 8 extended evidence units while preserving all 21 H2 units, 21 figures, prose and per-chapter evidence markers. Unknowns, G0, provisional status, non-AI paths, rights blocks and professional vetoes remain intact.
- 四份出版物在原路径重建，页数保持 A3 14+14、A0 8+8；A3 图面区扩大并收束证据侧栏，A0 主图区扩大并压缩判断带。两次同一固定构建逻辑的新进程逐文件字节一致；A3 最小矢量字号 9.2 pt，A0 为 12 pt，书签 14/14/8/8，无加密或控件。
- All four publications are rebuilt in place with unchanged page counts (A3 14+14, A0 8+8). A3 gains a larger figure field and tighter evidence sidebar; A0 gains a larger figure field and shorter judgment band. Two fresh processes using the same frozen build logic are byte-identical file by file; minimum vector type is 9.2 pt on A3 and 12 pt on A0, with 14/14/8/8 outlines and no encryption or widgets.
- 本轮不新增媒体、来源、事实、方案方向、场景、项目、重点区或治理合同；`sources.json`、geometry 九文件、`metrics.json`、封面、普通生活三联图和重点区图件保持字节不变。12/8/3/36、G0、NO-GO、provisional、现实结果 0、`not_fully_cleared` 与独立逐文件清权 0 不变。
- This round adds no media, source, fact, design direction, scenario, project, key area or governance contract. `sources.json`, all nine geometry files, `metrics.json`, the cover, ordinary-life triptych and key-area figures keep their bytes. The 12/8/3/36 counts, G0, NO-GO, provisional status, zero real-world outcomes, `not_fully_cleared` and zero independent file-level audits remain unchanged.

## v37.0 - 2026-08-17

**Browser QA matrix re-validation after the foreign-restore incident / 外部恢复事件后的浏览器 QA 矩阵复验**

- 第 35—36 轮修复了外部恢复提交 `b6c05fffe` 造成的台账过期并建立回归护栏；本轮补上最后一环：用第 22 轮同一零依赖 CDP 驱动（Chrome headless + DevTools Protocol + Node.js 22 内置 WebSocket）对当前包字节重跑 18 例双语浏览器矩阵，全部通过——1440×900 与 390×844 无横向溢出、无 JS 五步漫游与证据库回退可见、reduced-motion 保持状态 01、12.25 秒运动边界为状态 02、首个焦点为跳过链接、图片缺 alt 0、aria-live 存在、h1=1、控制台/请求/外域 0。交互层确认未受恢复事件影响。
- Rounds 35–36 repaired the ledger staleness caused by the foreign restore commit `b6c05fffe` and built regression guards; this round closes the last gap: the same zero-dependency CDP driver as Round 22 (Chrome headless + DevTools Protocol + Node.js 22 built-in WebSocket) re-runs the 18-case bilingual browser matrix on the current package bytes — all pass: no horizontal overflow at 1440×900 and 390×844, no-JS five-step walk and evidence library fallback visible, reduced-motion stays in state 01, the 12.25 s motion boundary is state 02, first focus is the skip link, 0 images missing alt, aria-live present, h1=1, 0 console errors / failed requests / external hosts. The interactive layer is confirmed unaffected by the restore incident.
- 证据登记：site-grounding 新增 `browser_matrix_r37` 合同（18/18 all_pass、执行日 2026-08-17、与第 22 轮同驱动同断言）；无任何内容、图面、PDF 或数据变化。
- Evidence: site-grounding gains the `browser_matrix_r37` contract (18/18 all_pass, executed 2026-08-17, same driver and assertions as Round 22); no content, figure, PDF or data change.
- 冻结项保持不变：12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、141 路径。
- Frozen items remain unchanged: 12/8/3/36, G0, NO-GO, provisional, `not_fully_cleared`, 0 independent file-level audits and 141 paths.

## v36.0 - 2026-08-15

**Compliance evidence-namespace separation & presentation regression guard / 合规证据命名空间分离与展示回归护栏**

- 规则层更新：formal-submission-guide 与 SKILL.md 要求 `compliance_matrix.json` 分开证据命名空间——`source_ids` 只放来源登记 ID，专业标准 ID 必须放 `standard_ids` 并在 `standard_matrix.json` 声明；新增 `compliance_matrix.schema.json` 与 `land_use_codes.json`。本轮重读并响应：6 行（1.3.2/1.4.2/1.5.1.2/1.5.2.2/1.5.2.4/1.5.2.5）把 `STD-URBAN-DESIGN` 从 `source_ids` 移入 `standard_ids=["MOHURD-URBAN-DESIGN-MEASURES"]`（该标准在 standard_matrix 中已声明，STD-URBAN-DESIGN 仍是其在 sources.json 中的快照来源）；23 行 schema 必填字段齐全、schema_version 0.1.0、9 个用地代码全部在新枚举内。
- Rule-layer update: the guide and SKILL.md now require `compliance_matrix.json` to separate evidence namespaces — `source_ids` carries only source-registry IDs while professional standard IDs belong in `standard_ids` and must also be declared in `standard_matrix.json`; a new `compliance_matrix.schema.json` and `land_use_codes.json` were added. This round re-reads and responds: in the six rows (1.3.2/1.4.2/1.5.1.2/1.5.2.2/1.5.2.4/1.5.2.5) `STD-URBAN-DESIGN` moves from `source_ids` to `standard_ids=["MOHURD-URBAN-DESIGN-MEASURES"]` (already declared in standard_matrix; STD-URBAN-DESIGN remains its snapshot source in sources.json); all 23 rows carry the schema-required fields, schema_version 0.1.0, and all 9 used land-use codes are inside the new enum.
- 展示回归护栏（第 36 轮）：第 24 轮对比度修复值（--red/--green/#8a5a00/#5c6663）、第 25 轮阅读入口 h2、第 27 轮官方章节标题纳入索引生成器强制不变量（`presentation_contract_regression_guard`），任何静默回退都会使再生成失败——外部恢复提交 `b6c05fffe` 的历史教训永久关闭。
- Presentation regression guard (Round 36): the Round 24 contrast values (--red/--green/#8a5a00/#5c6663), the Round 25 reading-entry h2 and the Round 27 official chapter heading join the index generator's enforced invariants (`presentation_contract_regression_guard`), so any silent reversion fails regeneration — the lesson of the foreign restore commit `b6c05fffe` is closed permanently.
- 无主张、数据、机制、图面、PDF 或成熟度变化；geometry 九文件、metrics 值、sources/assumptions 内容字节未变。
- No claim, datum, mechanism, figure, PDF or maturity change; the nine geometry files, metric values and sources/assumptions content bytes are unchanged.
- 冻结项保持不变：12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、141 路径。
- Frozen items remain unchanged: 12/8/3/36, G0, NO-GO, provisional, `not_fully_cleared`, 0 independent file-level audits and 141 paths.

## v35.0 - 2026-08-15

**Rights-ledger digest coherence repair & second freshness audit / 权利台账摘要一致性修复与第二次来源新鲜度审计**

- 全量台账-vs-磁盘摘要审计发现 13 条 `rights-clearance-ledger.json` 摘要与磁盘实际字节不一致（ASSET-002/014/016/017/019/025/065/066/067/068/100/117/118）。根因：外部恢复提交 `b6c05fffe`（经 PR #2782 在第 29 轮前合入 main）把台账重写回旧快照，使 13 条摘要相对第 20—28 轮更新过的文件过期；manifest 一直正确（refresh 从磁盘重算），且此前没有任何门核验台账摘要。本轮把 13 条摘要全部重同步到磁盘字节，并把「台账摘要一致性」纳入索引生成器的强制不变量（`ledger_digest_coherence`，再生成时逐条核验、违反即失败）。
- A full ledger-vs-disk digest audit found 13 `rights-clearance-ledger.json` digests inconsistent with actual disk bytes (ASSET-002/014/016/017/019/025/065/066/067/068/100/117/118). Root cause: a foreign restore commit (`b6c05fffe`, merged via PR #2782 into main before Round 29) rewrote the ledger back to an older snapshot, leaving 13 digests stale relative to files updated in Rounds 20–28; the manifest stayed correct (refresh recomputes from disk) and no gate verified ledger digests until now. This round re-syncs all 13 digests to disk bytes and adds ledger-digest coherence to the index generator's enforced invariants (`ledger_digest_coherence`, checked per record on every regeneration, failing on any mismatch).
- 第二次来源新鲜度审计（机制第 21 轮首次执行）：50 条来源逐条复核，48 条 verified_current、2 条 review_due（CASE-22AT、CASE-KINGS-CROSS，与第 21 轮相同）；相对第 21 轮有 15 条来源内容摘要变化（仓库内 AGENT-TASKBOOK、PROVISIONAL-BOUNDARY-BASIS、SITE-PACKAGE 目录与 5 条 proposal.md 派生来源，以及 5 条 HTTP 来源）。`evidence-freshness-policy.json` 的 refresh_records（50 条）与 summary（audit_round r35、2026-08-15、48/2/50）已更新。
- Second source-freshness audit (mechanism first executed in Round 21): all 50 sources re-checked; 48 verified_current, 2 review_due (CASE-22AT, CASE-KINGS-CROSS, identical to Round 21); 15 source content digests changed since Round 21 (repo-internal AGENT-TASKBOOK, PROVISIONAL-BOUNDARY-BASIS, the SITE-PACKAGE directory and five proposal.md-derived sources, plus five HTTP sources). `evidence-freshness-policy.json` refresh_records (50) and summary (audit_round r35, 2026-08-15, 48/2/50) updated.
- 无主张、数据、机制、图面、PDF 或成熟度变化；geometry 九文件、metrics 值、sources.json 内容字节未变。
- No claim, datum, mechanism, figure, PDF or maturity change; the nine geometry files, metric values and sources.json content bytes are unchanged.
- 冻结项保持不变：12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、141 路径。
- Frozen items remain unchanged: 12/8/3/36, G0, NO-GO, provisional, `not_fully_cleared`, 0 independent file-level audits and 141 paths.

## v34.0 - 2026-08-15

**Boundary-uncertainty background disclosure / 边界不确定性背景披露**

- 规则层更新：仓库 site-package 几何依据新增 2026-08-14 独立背景核查——公告四条街道（大钟寺东路、荷清路、学院路、西土城路）中线与登记临时边界同纬度边线的东偏量为 533–898 米（均值约 667 米）。依据文档明确：该读数不证明 PROV-SITE-001 错误、未登记为可重放来源、在官方 polygon 发布前不得反向升级或阻断评分。本轮据此把包内边界披露补齐。
- Rule-layer update: the repository site-package geometry basis gained a 2026-08-14 independent background check — the four announcement-named street centrelines read 533–898 m east deviation of the registered provisional boundary edges (mean about 667 m). The basis document states this does not prove PROV-SITE-001 wrong, is not a replayable source, and must not reverse-upgrade or block scoring before official polygons arrive. This round completes the package's boundary disclosure accordingly.
- 变更：双语 visual 三框场地读取提示补充该背景读数（仅背景记录，不平移 geometry）；`A-SITE-READING-020` 的 statement/impact 把该读数记为一条量化不确定性数据（533–898 米东偏、均值约 667 米），边界、指标、场景、项目与重点区状态全部不变；site-grounding 新增 `boundary_uncertainty_background_r34` 合同记录规则层依据与本轮变更。
- Changes: the bilingual visual three-frame site-reading notice gains the background reading (background only, no geometry shift); `A-SITE-READING-020` records it in statement/impact as one quantitative uncertainty datum (533–898 m east, mean about 667 m) with no boundary, metric, scene, project or key-area state change; site-grounding gains the `boundary_uncertainty_background_r34` contract with the rule-layer basis and this round's changes.
- geometry 九文件、metrics 值、全部场景/项目/重点区、G0、NO-GO、权利边界不变。
- The nine geometry files, metric values, all scenes/projects/key areas, G0, NO-GO and rights boundaries are unchanged.
- 冻结项保持不变：12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、freshness 48/2/50、141 路径。
- Frozen items remain unchanged: 12/8/3/36, G0, NO-GO, provisional, `not_fully_cleared`, 0 independent file-level audits, freshness 48/2/50 and 141 paths.

## v33.0 - 2026-08-15

**Evidence-integrity enforcement & HTML publication metadata / 证据完整性强制与 HTML 出版元数据**

- 新机制：评审交接索引生成器在每次再生成时强制五项机器可核验不变量——`[source:]`/`[assumption:]`/`[metric:]` 标记逐一解析到 sources.json（50/50）/ assumptions.json（23/23）/ metrics.json（80/80）记录；`[data:]` 标记解析到磁盘文件（79/79，忽略 fragment）；中英文标记值多集逐类一致；中英文标题数一致（86/86）；全部阅读路线锚点在双语 visual 页面存在（0 缺失）。任何违反直接令生成失败。索引新增 `evidence_integrity` 块（`generator_enforced=true`）记录全部检查。
- New mechanism: the review handoff index generator now enforces five machine-checkable invariants on every regeneration — every `[source:]`/`[assumption:]`/`[metric:]` marker resolves to a record in sources.json (50/50) / assumptions.json (23/23) / metrics.json (80/80); every `[data:]` marker resolves to a file on disk (79/79, fragment ignored); zh/en marker value multisets are identical per kind; zh/en heading counts match (86/86); every reading-route anchor exists in both visual pages (0 missing). Any violation fails generation. The index gains an `evidence_integrity` block (`generator_enforced=true`) recording all checks.
- HTML 出版元数据补全：四个 HTML 表面（visual 双语页 + report 双语报告）此前均缺 `<meta name="description">`，本轮按各自语言与边界披露补上；报告 HTML 的 description 与第 23 轮媒体链接修复一样，在每次重渲染后重施。
- HTML publication metadata completion: all four HTML surfaces (bilingual visual pages and bilingual reports) previously lacked `<meta name="description">`; this round adds one per surface consistent with its language and boundary disclosure; report descriptions are re-applied after every future re-render, same as the Round 23 media-link fix.
- 无主张、数据、机制、图面、PDF 或成熟度变化；geometry 九文件、metrics 值、sources/assumptions 内容字节未变。
- No claim, datum, mechanism, figure, PDF or maturity change; the nine geometry files, metric values and sources/assumptions content bytes are unchanged.
- 冻结项保持不变：12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、freshness 48/2/50、141 路径。
- Frozen items remain unchanged: 12/8/3/36, G0, NO-GO, provisional, `not_fully_cleared`, 0 independent file-level audits, freshness 48/2/50 and 141 paths.

## v32.0 - 2026-08-15

**Formal core visual metrics compliance / 三项 formal 核心视觉指标合规**

- 规则层变化：任务书新增 `formal_visual_metrics_contract`，formal-submission-guide 第 9 节、SKILL.md 与 `visual_review.py` 同步收紧——`site_area_sqm`、`green_ratio`、`public_space_ratio` 必须是从投稿者提交的 site_boundary/green_space/public_space 几何可复算的 known 有限数值，并在 `visual/index.html` 以一致数值 `data-value` 声明，且必须保留 provisional 标记、来源、公式与**正式数据发布后的复算触发条件**。本轮对最新规则层重读并响应。
- Rule-layer change: the taskbook gained a `formal_visual_metrics_contract`, and the formal-submission-guide section 9, SKILL.md and `visual_review.py` now require `site_area_sqm`, `green_ratio` and `public_space_ratio` to be known finite values recomputable from the submitted site_boundary/green_space/public_space geometry, declared with matching numeric `data-value`s in `visual/index.html`, and to retain their provisional role, sources, formula and an **official-data recalculation trigger**. This round re-reads and responds to the new rule layer.
- 复算证据（pyproj EPSG:4326→4548 平面多边形面积）：site_area 11412825.38562 m²（记录值 11412825.385554，差 0.000066 m²）；green_ratio 0.126157（差 4.5e-7）；public_space_ratio 0.012831（差 -2.9e-8）；当前 `visual_review.py` 通过、0 问题。
- Recomputation evidence (pyproj EPSG:4326→4548 planar polygon area): site_area 11412825.38562 m² (recorded 11412825.385554, delta 0.000066 m²); green_ratio 0.126157 (delta 4.5e-7); public_space_ratio 0.012831 (delta -2.9e-8); the current `visual_review.py` passes with 0 issues.
- **冻结项修改说明（依据：规则层变化）**：`metrics.json` 自第 17 轮冻结后首次变更——仅给三项核心指标各增加一个 `recalculation_trigger` 字段，数值、公式、来源与 confidence 全部不变；旧哈希 `bbafe42b…` 只作为历史记录保留在 round15-baseline.json。这是任务书新契约要求的合规字段，不是主张、数据或机制升级。
- **Frozen-item change note (basis: rule-layer change)**: `metrics.json` changes for the first time since its Round 17 freeze — only one `recalculation_trigger` field per core metric was added; values, formulas, sources and confidence are untouched; the old hash `bbafe42b…` stays only as history in round15-baseline.json. This is the compliance field the new taskbook contract requires, not a claim, data or mechanism upgrade.
- 双语 visual 指标卡同步增加复算触发说明，数值 `data-value` 不变；无图面、PDF、HTML 结构或成熟度变化；geometry 九文件字节未变。
- Bilingual visual metric cards gain the recalculation-trigger note with unchanged numeric `data-value`s; no figure, PDF, HTML-structure or maturity change; the nine geometry files keep their bytes.
- 冻结项保持不变：12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、freshness 48/2/50、141 路径。
- Frozen items remain unchanged: 12/8/3/36, G0, NO-GO, provisional, `not_fully_cleared`, 0 independent file-level audits, freshness 48/2/50 and 141 paths.

## v31.0 - 2026-08-15

**Bilingual per-chapter evidence-marker parity / 双语逐章证据标记对齐**

- 逐章审计发现 4 个章节对的证据标记落点不一致：中文把来源标记放在「战略命题」小节末句，英文把同一组标记放在下一小节（文化内容来源/机制合同）的开头句，导致中英文各章标记计数不同（值多集本身完全一致：source 83、standard 8、depth 15、data 106、metric 109）。本轮以中文（权威正文）为准，把英文两组标记句移入「Strategic Proposition」末句，实现逐章零差异；报告 HTML 重新渲染并重施第 23 轮媒体链接修复（中文 HTML 重渲染后与上一版本字节一致）。
- A per-chapter audit found 4 chapter pairs where markers sit differently: Chinese places the source markers at the end of the Strategic Proposition subsection while English places the same markers at the opening of the next subsection (Cultural Content Source / Mechanism Contract), so per-chapter counts differ although the value multisets are identical (source 83, standard 8, depth 15, data 106, metric 109). This round aligns English to the authoritative Chinese placement, reaching zero per-chapter differences; the reports were re-rendered with the Round 23 media-link fix re-applied (the Chinese HTML re-render is byte-identical to the previous version).
- 评审交接索引开始为全部 21 个章节单元同时登记 `evidence_markers`（中文）与 `evidence_markers_en`（英文），使双语标记计数可被机器逐章核验。
- The review handoff index now registers both `evidence_markers` (zh) and `evidence_markers_en` (en) for all 21 chapter units, making bilingual per-chapter marker counts machine-verifiable.
- 无主张、数据、机制、图面、PDF 或成熟度变化；geometry、metrics、sources.json 与全部图件/媒体字节未变。重建、PR 或合并不构成现实、批准、运营或权利升级。
- No claim, datum, mechanism, figure, PDF or maturity change; geometry, metrics, sources.json and all figures/media keep their bytes. A rebuild, PR or merge creates no reality, approval, operation or rights upgrade.
- 冻结项保持不变：12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、freshness 48/2/50、141 路径。
- Frozen items remain unchanged: 12/8/3/36, G0, NO-GO, provisional, `not_fully_cleared`, 0 independent file-level audits, freshness 48/2/50 and 141 paths.

## v30.0 - 2026-08-15

**PDF metadata & navigation fix / PDF 元数据与导航修复**

- 审计发现四个正式出版 PDF 的元数据缺陷：确定性构建把创建/修改日期写成占位符 `D:20000101000000+00'00'`（事实性错误）；文档 `/Lang` 缺失（辅助读取器无法确定语言）；无目录书签（评审翻页无导航）。本轮把四个 PDF 的创建/修改日期固定为真实出版日 `D:20260815000000+00'00'`，`/Lang` 设为 zh-CN / en-US，并为全部 44 页加逐页书签（A3 14+14、A0 8+8）。
- An audit found metadata defects on all four formal publications: the deterministic build stamped placeholder creation/modification date `D:20000101000000+00'00'` (factually wrong); document `/Lang` was missing (assistive readers cannot determine language); no outline bookmarks (no jury navigation). This round pins creation/modification to the real publication date `D:20260815000000+00'00'`, sets `/Lang` to zh-CN / en-US and adds per-page bookmarks on all 44 pages (A3 14+14, A0 8+8).
- 用第 20/29 轮同管线重建全部四份 PDF；两次全新进程字节一致（A3 zh `34d38516…`、A3 en `5c7b88d7…`、A0 zh `ceb69fff…`、A0 en `164c4cc8…`）；60 dpi 灰度逐页像素比对：44 页与上一版本完全一致（仅元数据与书签变化）；QA：页数 14/14/8/8、`/Lang` 正确、书签 14/14/8/8、回链可搜索、空白页 0、替换字形 0。
- All four PDFs were rebuilt with the same pipeline as Rounds 20/29; two fresh processes produced byte-identical files (A3 zh `34d38516…`, A3 en `5c7b88d7…`, A0 zh `ceb69fff…`, A0 en `164c4cc8…`); 60-dpi grayscale per-page pixel comparison: all 44 pages pixel-identical to the previous version (only metadata and bookmarks changed); QA: pages 14/14/8/8, correct `/Lang`, bookmarks 14/14/8/8, backlinks searchable, 0 blank pages, 0 replacement glyphs.
- 无主张、数据、机制、图面或成熟度变化；geometry、metrics、sources.json 与全部图件/媒体字节未变。重建、PR 或合并不构成现实、批准、运营或权利升级。
- No claim, datum, mechanism, figure or maturity change; geometry, metrics, sources.json and all figures/media keep their bytes. A rebuild, PR or merge creates no reality, approval, operation or rights upgrade.
- 冻结项保持不变：12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、freshness 48/2/50、141 路径。
- Frozen items remain unchanged: 12/8/3/36, G0, NO-GO, provisional, `not_fully_cleared`, 0 independent file-level audits, freshness 48/2/50 and 141 paths.

## v29.0 - 2026-08-15

**A0 professional-handoff board index backlink / A0 专业交接板接入评审交接索引回链**

- 第 29 轮只在第 28 轮 PR #2777 合并（merge SHA `60f514dafe3876f0165ef7acf50d3d25b6aef5a5` 进入 canonical `main@b765517f572aec6a3c63a8e8c6c6671be4500629`）且 443 个开放 PR 文件级扫描无竞争后开始。闭合第 20 轮记录的遗留不一致：A3 P14 已含 `review-handoff-index.json` 回链，而 A0 第 8 板（公共信号、专业交接与 NO-GO）没有。本轮在 A0 第 8 板判断框内新增一行回链（中英文），使评审交接索引在全部正式出版载体中可达。
- Round 29 began only after Round 28 PR #2777 merged (merge SHA `60f514dafe3876f0165ef7acf50d3d25b6aef5a5` entered canonical `main@b765517f572aec6a3c63a8e8c6c6671be4500629`) and a file-level scan of 443 open PRs found no competing PR. This closes the inconsistency recorded in Round 20: A3 page 14 already carries the `review-handoff-index.json` backlink while A0 board 8 (public signals, professional handoff and NO-GO) did not. One backlink line was added to the A0 board-8 judgement box in both languages, making the review handoff index reachable from every formal publication carrier.
- 用第 20 轮确定性管线（ReportLab invariant、fontTools 静态字重、Chrome 4× JPX 印刷层、PyMuPDF 无损媒体流）重建两份 A0（8/8 页不变）；两次全新进程逐文件字节一致（zh `6e6373e3…`，en `a9af5092…`）。44 页 QA：空白页 0、替换字形 0、越界文本块 0、第 8 板回链可搜索；两份 A3 字节保持第 20 轮固定点不变。
- Both A0 boards were rebuilt with the Round 20 deterministic pipeline (ReportLab invariant, fontTools static weights, Chrome 4× JPX print layers, PyMuPDF lossless media streams) keeping 8/8 pages; two fresh processes produced byte-identical files (zh `6e6373e3…`, en `a9af5092…`). 44-page QA: 0 blank pages, 0 replacement glyphs, 0 out-of-page blocks, board-8 backlink searchable; both A3 files keep their Round 20 fixed-point bytes.
- 仅 A0 第 8 板一行回链与出版物元数据变化，无主张、数据、机制或成熟度变化；geometry、metrics、sources.json 与全部图件/媒体字节未变。
- Only one backlink line on A0 board 8 and publication metadata changed; no claim, data, mechanism or maturity change. Geometry, metrics, sources.json and all figures/media keep their bytes.
- 冻结项保持不变：12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、freshness 48/2/50、141 路径不变。重建、PR 或合并不构成现实、批准、运营或权利升级。
- Frozen items remain unchanged: 12/8/3/36, G0, NO-GO, provisional boundaries, `not_fully_cleared`, 0 independent file-level audits, freshness 48/2/50 and 141 paths. A rebuild, PR or merge creates no reality, approval, operation or rights upgrade.

## v28.0 - 2026-08-15

**Evidence-citation coverage completion / 证据引用覆盖补全**

- 第 28 轮只在第 27 轮 PR #2772 合并（merge SHA `42e75acdbe3428ff376f551d55def66132f11f7e` 进入 canonical `main@239e5dabdc82d8972403debb3e5adb3527b6cd9b`）且 442 个开放 PR 文件级扫描无竞争后开始。工程扫描发现：50 条来源中 19 条包内概念来源（合同/图件/章节，R8—R15）从未以 `[source:ID]` 在正文引用，23 条假设中 4 条从未以 `[assumption:ID]` 引用——违反 formal 指南“来源应在正文中被引用”的要求。本轮逐项归位补全，双语各 50/23 全量引用，标记密度遵守 ≤3 连续 / ≤8 每段并通过确定性校验。
- Round 28 began only after Round 27 PR #2772 merged (merge SHA `42e75acdbe3428ff376f551d55def66132f11f7e` entered canonical `main@239e5dabdc82d8972403debb3e5adb3527b6cd9b`) and a file-level scan of 442 open PRs found no competing PR. The engineering scan found that 19 in-package concept sources (contracts/figures/chapters from Rounds 8–15) were never cited as `[source:ID]` in prose and 4 of 23 assumptions were never cited as `[assumption:ID]` — contrary to the formal guide's requirement that sources be cited in prose. All were placed at their home claims this round; both languages now cite 50/50 sources and 23/23 assumptions, with marker density within the ≤3-consecutive / ≤8-per-block limits and passing deterministic validation.
- 每个标记都加在对应合同/图件/章节的归属主张旁（时间博物馆、公共任务经济、长期运营、评审交接、普通生活、可逆构件、五步漫游、现场采集、G0 企业基线、治理内核），句子在移除标记后保持完整。仅新增引用标记，无主张、数据、机制、页数或成熟度变化；四份 PDF、geometry、metrics、sources.json 与全部图件/媒体字节未变。
- Every marker sits beside the owning claim of its contract/figure/chapter (Time Museum, Public Mission Economy, Civic Operations, Review Handoff, Ordinary Life, Reversible Components, Five-Step Walk, Field Intake, G0 enterprise baseline, governance kernel); sentences remain complete after marker removal. Only citation markers were added — no claim, data, mechanism, page count or maturity change; the four PDFs, geometry, metrics, sources.json and all figures/media keep their bytes.
- 冻结项保持不变：12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、freshness 48/2/50、141 路径不变。补全、PR 或合并不构成现实、批准、运营或权利升级。
- Frozen items remain unchanged: 12/8/3/36, G0, NO-GO, provisional boundaries, `not_fully_cleared`, 0 independent file-level audits, freshness 48/2/50 and 141 paths. Completion, a PR or merge creates no reality, approval, operation or rights upgrade.

## v27.0 - 2026-08-15

**Official heading wording alignment / 正式章节标题与官方术语对齐**

- 第 27 轮只在第 26 轮 PR #2757 合并（merge SHA `2adc47505d5234a4b6cafdf017b2f17d3d2a7589` 进入 canonical `main@2d44121b3eb47ff958605b0ea2b026d462644dc5`）且 442 个开放 PR 文件级扫描无竞争后开始。审计：`proposal.en.md` 的全部 `##` 标题与 `docs/formal-submission-guide.md` 官方英文章节表逐条比对——12/13 一致，仅“用地、建筑规模与拆改留”章的英文标题词序与官方表述不同（`Demolish–Renovate–Retain` vs 官方 `Retain-Renovate-Demolish`）。修复为官方表述，重渲染报告后 13/13 一致，并按第 23 轮记录重施渲染器媒体链接修复。
- Round 27 began only after Round 26 PR #2757 merged (merge SHA `2adc47505d5234a4b6cafdf017b2f17d3d2a7589` entered canonical `main@2d44121b3eb47ff958605b0ea2b026d462644dc5`) and a file-level scan of 442 open PRs found no competing PR. Audit: every `##` heading in `proposal.en.md` was compared against the official English chapter table in `docs/formal-submission-guide.md` — 12/13 matched; only the land-use chapter heading used a different word order (`Demolish–Renovate–Retain` vs the official `Retain-Renovate-Demolish`). Fixed to the official wording, re-rendered the report (13/13 now match) and re-applied the Round 23 renderer media-link fix as recorded.
- 仅英文标题文本变化，无主张、数据、机制、页数或成熟度变化；四份 PDF、geometry、metrics、sources.json 与全部图件/媒体字节未变。
- Only the English heading text changed; no claim, data, mechanism, page count or maturity change. The four PDFs, geometry, metrics, sources.json and all figures/media keep their bytes.
- 冻结项保持不变：12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、freshness 48/2/50、141 路径不变。修复、PR 或合并不构成现实、批准、运营或权利升级。
- Frozen items remain unchanged: 12/8/3/36, G0, NO-GO, provisional boundaries, `not_fully_cleared`, 0 independent file-level audits, freshness 48/2/50 and 141 paths. A repair, PR or merge creates no reality, approval, operation or rights upgrade.

## v26.0 - 2026-08-15

**Contract as_of consistency repair / 契约 as_of 一致性修复**

- 第 26 轮只在第 25 轮 PR #2752 合并（merge SHA `cdc56d33f322e01477c4b29adba0f1dae4524e41` 进入 canonical `main@cdc56d33f322e01477c4b29adba0f1dae4524e41`）且 438 个开放 PR 文件级扫描无竞争后开始。审计：包内全部结构化契约的顶层 `as_of` 与 git 历史的真实最后编辑日期逐一比对，发现 8 个契约的 `as_of` 早于其真实编辑日期；全部修复并新增 `as_of_semantics` 字段说明语义。
- Round 26 began only after Round 25 PR #2752 merged (merge SHA `cdc56d33f322e01477c4b29adba0f1dae4524e41` entered canonical `main@cdc56d33f322e01477c4b29adba0f1dae4524e41`) and a file-level scan of 438 open PRs found no competing PR. Audit: every structured contract's top-level `as_of` was compared against its real last-edit date from git history; eight contracts had `as_of` earlier than their real edit date. All eight are fixed and each gains an `as_of_semantics` field defining the field's meaning.
- 修复清单：`civic-operations-contract` 08-12→08-13；`g1-preregistration-register` 08-09→08-12；`implementation-handoff-matrix` 08-12→08-13；`pilot-readiness-register` 08-09→08-12；`readiness-closure-contract` 08-10→08-12；`rights-clearance-ledger` 08-14→08-15；`site-grounding-register` 08-09→08-15；`submission-use-rights-matrix` 08-10→08-12。日期全部取自 git 历史，不猜测。
- Fixed list: `civic-operations-contract` 08-12→08-13; `g1-preregistration-register` 08-09→08-12; `implementation-handoff-matrix` 08-12→08-13; `pilot-readiness-register` 08-09→08-12; `readiness-closure-contract` 08-10→08-12; `rights-clearance-ledger` 08-14→08-15; `site-grounding-register` 08-09→08-15; `submission-use-rights-matrix` 08-10→08-12. All dates come from git history, not guesswork.
- `as_of` 只表示最后真实内容编辑日期，不是有效性或新鲜度保证；`as_of_semantics` 已在每个修复文件中写明。`pilot-readiness-register.json` 是 T-02 合成回放输入之一：其 as_of 修复改变输入摘要后，结果文件经 `--write` 按同一 10 组既有 fixture 诚实重生成（fixtures=10 exact=10，无治理内容变化）。本轮无主张、数据、机制、页数或成熟度变化；四份 PDF、geometry、metrics、sources.json 与全部图件/媒体字节未变。
- `as_of` records the last real content edit date only, not validity or freshness; `as_of_semantics` states this in every repaired file. `pilot-readiness-register.json` is one input of the T-02 synthetic replay: after its as_of repair changed the input digest, the result file was honestly regenerated with `--write` from the same ten fixtures (fixtures=10 exact=10, no governance-content change). The round changes no claim, data, mechanism, page count or maturity; the four PDFs, geometry, metrics, sources.json and all figures/media keep their bytes.
- 冻结项保持不变：12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、freshness 48/2/50、141 路径不变。修复、PR 或合并不构成现实、批准、运营或权利升级。
- Frozen items remain unchanged: 12/8/3/36, G0, NO-GO, provisional boundaries, `not_fully_cleared`, 0 independent file-level audits, freshness 48/2/50 and 141 paths. A repair, PR or merge creates no reality, approval, operation or rights upgrade.

## v25.0 - 2026-08-15

**Heading-hierarchy repair after HTML semantics audit / HTML 语义审计与标题层级修复**

- 第 25 轮只在第 24 轮 PR #2734 合并（merge SHA `78b5e4d00dfd330593b510192d519e7fb333367b` 进入 canonical `main@a2a1ae3e62b1dd23acc4b2e5a7a9c8e9eed15bf1`）且 437 个开放 PR 文件级扫描无竞争后开始。HTML 语义审计（重复 ID、标题层级、页内锚点、表格表头、lang）覆盖双语 visual 与报告：visual 页面 0 缺陷；两份提案存在同一缺陷——`# 双轨京张`（h1）后直接 `### 阅读入口`（h3）跳级。
- Round 25 began only after Round 24 PR #2734 merged (merge SHA `78b5e4d00dfd330593b510192d519e7fb333367b` entered canonical `main@a2a1ae3e62b1dd23acc4b2e5a7a9c8e9eed15bf1`) and a file-level scan of 437 open PRs found no competing PR. An HTML semantics audit (duplicate IDs, heading hierarchy, in-page anchors, table headers, lang) covered both visual pages and reports: the visual pages have zero defects; both proposals share one defect — `# 双轨京张` (h1) is followed directly by `### 阅读入口` (h3), skipping h2.
- 修复：双语文案的阅读入口 `###` → `##`；离线报告重新渲染后标题层级 0 跳级，并重新应用第 23 轮记录的渲染器媒体链接修复。结构化证据写入 `site-grounding-register.json#package_validation_contract.html_semantics_r25`。
- Fix: the bilingual reading entry moves from `###` to `##`; the offline reports are re-rendered with 0 heading skips, and the Round 23 renderer media-link fix is re-applied after the re-render. Structured evidence is recorded in `site-grounding-register.json#package_validation_contract.html_semantics_r25`.
- 仅标题层级与重渲染输出变化，无主张、数据、机制或成熟度变化；四份 PDF、geometry、metrics、sources.json 与全部图件/媒体字节未变。
- Only heading levels and re-rendered output changed; no claim, data, mechanism or maturity change. The four PDFs, geometry, metrics, sources.json and all figures/media keep their bytes.
- 冻结项保持不变：12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、freshness 48/2/50、141 路径不变。修复、PR 或合并不构成现实、批准、运营或权利升级。
- Frozen items remain unchanged: 12/8/3/36, G0, NO-GO, provisional boundaries, `not_fully_cleared`, 0 independent file-level audits, freshness 48/2/50 and 141 paths. A repair, PR or merge creates no reality, approval, operation or rights upgrade.

## v24.0 - 2026-08-15

**WCAG AA contrast repair on the visual pages / 视觉页 WCAG AA 对比度修复**

- 第 24 轮只在第 23 轮 PR #2720 合并（merge SHA `79493c594c5fd54bfee62e0d313ee56f3e147db2` 进入 canonical `main@0d1b832487ea5cd53b96b3041a52c433645b8081`）且 441 个开放 PR 文件级扫描无竞争后开始。梯度感知对比度探针（CDP + DOM 背景解析，含 linear-gradient 色标；WCAG 2.1 AA 4.5:1 正文 / 3:1 大字）在全部 details 展开状态下覆盖双语 920/914 个文本元素，发现 4 处低于阈值并全部修复。
- Round 24 began only after Round 23 PR #2720 merged (merge SHA `79493c594c5fd54bfee62e0d313ee56f3e147db2` entered canonical `main@0d1b832487ea5cd53b96b3041a52c433645b8081`) and a file-level scan of 441 open PRs found no competing PR. A gradient-aware contrast probe (CDP plus DOM background resolution including linear-gradient stops; WCAG 2.1 AA 4.5:1 body / 3:1 large text) covered 920/914 bilingual text elements with every details block expanded, found four below-threshold pairs, and fixed all four.
- 修复：`--red` `#d96850 → #a13d2a`（修复后最低 6.13）、`--green` `#36a269 → #1c6b45`（6.17）、`.jury-motion .tag` `#f1c164 → #8a5a00`（4.94）、`.review-walk-shell button:disabled` `#79827f → #5c6663`（5.94）。修复后双语全展开复测为 0 个低于阈值元素；证据写入 `site-grounding-register.json#package_validation_contract.contrast_matrix_r24`。
- Fixes: `--red` `#d96850 → #a13d2a` (min 6.13 after), `--green` `#36a269 → #1c6b45` (6.17), `.jury-motion .tag` `#f1c164 → #8a5a00` (4.94), `.review-walk-shell button:disabled` `#79827f → #5c6663` (5.94). Re-probe with everything expanded reports zero below-threshold elements in both languages; the evidence is recorded in `site-grounding-register.json#package_validation_contract.contrast_matrix_r24`.
- 仅颜色值变化，无内容、主张、结构或功能变化；四份 PDF、geometry、metrics、sources.json 与全部图件/媒体字节未变。程序化阈值验证不是辅助技术认证、人工目检或法律合规声明。
- Only color values changed; no content, claim, structure or function change. The four PDFs, geometry, metrics, sources.json and all figures/media keep their bytes. Programmatic threshold verification is not assistive-technology certification, human inspection or a legal compliance claim.
- 冻结项保持不变：12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、freshness 48/2/50、141 路径不变。修复、PR 或合并不构成现实、批准、运营或权利升级。
- Frozen items remain unchanged: 12/8/3/36, G0, NO-GO, provisional boundaries, `not_fully_cleared`, 0 independent file-level audits, freshness 48/2/50 and 141 paths. A repair, PR or merge creates no reality, approval, operation or rights upgrade.

## v23.0 - 2026-08-15

**Broken rendered-report link repair / 离线报告失效链接修复**

- 第 23 轮只在第 22 轮 PR #2709 合并（merge SHA `3b38ad5c4c85b9a2dd852c829d1e37a6f78dbe9a` 进入 canonical `main@cf61a62b12b0487561c8623c4ff4d6193771fa3c`）且 441 个开放 PR 文件级扫描无竞争后开始。链接完整性审计覆盖全部中英文 proposal/visual/report/媒体说明与索引进阶路径：仅发现两份离线报告各一条媒体披露链接在渲染层退化为纯文本（仓库渲染器不转换非图片 Markdown 链接），且若按原文路径解析还会指向错误目录。
- Round 23 began only after Round 22 PR #2709 merged (merge SHA `3b38ad5c4c85b9a2dd852c829d1e37a6f78dbe9a` entered canonical `main@cf61a62b12b0487561c8623c4ff4d6193771fa3c`) and a file-level scan of 441 open PRs found no competing PR. The link-integrity audit covered every bilingual proposal/visual/report/media note and all index route entry points: it found exactly one media-disclosure link per offline report that the renderer emitted as plain text (the repository renderer does not convert non-image Markdown links), with a path that would also resolve to the wrong directory if interpreted literally.
- 修复：`report/proposal.html` 与 `report/proposal.en.html` 中该链接改为真实 `<a href="../assets/media/ordinary-life-scenes.md">`，从 `report/` 目录正确解析；proposal.md 与 visual 页面内的同源链接本就正确，未改动。
- Fix: the link in `report/proposal.html` and `report/proposal.en.html` is now a real `<a href="../assets/media/ordinary-life-scenes.md">` resolving correctly from the `report/` directory; the same link inside proposal.md and the visual pages was already correct and is untouched.
- 渲染器怪癖已记录：今后任何 `scripts/render_proposal_html.py` 重渲染都会重新产出纯文本形态，必须重新应用本修复（见 narrative r23 段）。本轮不新增来源、文件、页数、机制或成熟度；四份 PDF、geometry、metrics、sources.json 与全部图件/媒体字节未变。
- The renderer quirk is recorded: any future re-run of `scripts/render_proposal_html.py` will emit the plain-text form again and this fix must be re-applied (see the narrative Round 23 section). The round adds no source, file, page, mechanism or maturity; the four PDFs, geometry, metrics, sources.json and all figures/media keep their bytes.
- 冻结项保持不变：12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、freshness 48/2/50、141 路径不变。链接修复、PR 或合并不构成现实、批准、运营或权利升级。
- Frozen items remain unchanged: 12/8/3/36, G0, NO-GO, provisional boundaries, `not_fully_cleared`, 0 independent file-level audits, freshness 48/2/50 and 141 paths. A link repair, PR or merge creates no reality, approval, operation or rights upgrade.

## v22.0 - 2026-08-15

**Browser QA matrix execution and evidence writeback / 浏览器交互 QA 矩阵执行与证据回写**

- 第 22 轮只在第 21 轮 PR #2655 合并（merge SHA `0579f1cd282f3b142594b2bd59419554dd6f60e2` 进入 canonical `main@dd40574337372e26b10c9ea73a7d680f74764394`）且 443 个开放 PR 文件级扫描无竞争后开始。本轮不改任何视觉或正文内容，只执行并回写浏览器交互 QA 矩阵证据。
- Round 22 began only after Round 21 PR #2655 merged (merge SHA `0579f1cd282f3b142594b2bd59419554dd6f60e2` entered canonical `main@dd40574337372e26b10c9ea73a7d680f74764394`) and a file-level scan of 443 open PRs found no competing PR. The round changes no visual or narrative content; it only executes and writes back browser interaction QA matrix evidence.
- 18 项双语 CDP 矩阵（Chrome 151.0.7922.138 headless + CDP + Node.js 22 内置 WebSocket，包外零依赖驱动器）对当前真实 visual 页面执行：真实 390×844/1440×900 视口零页面级横向溢出、禁 JavaScript 下索引/五步/六问/12 行合同完整、减少动态单步、打印展开、键盘跳转首焦点、12.25 s 状态边界、alt/aria-live/h1、控制台/失败请求/外部主机全 0。结论 all_pass，视觉内容零缺陷、零修改。
- An 18-case bilingual CDP matrix (Chrome 151.0.7922.138 headless + CDP + Node.js 22 built-in WebSocket, zero-dependency package-external driver) ran against the real visual pages: zero page-level horizontal overflow at true 390×844/1440×900 viewports, complete index/five-steps/six-questions/12-row contract without JavaScript, single-step reduced motion, print expansion, keyboard skip-link first focus, the 12.25 s state boundary, alt/aria-live/h1 checks, and 0 console errors, failed requests or external hosts. The matrix concludes all_pass with zero visual-content defects and zero visual changes.
- 证据以结构化块写入 `site-grounding-register.json#package_validation_contract.browser_matrix_r22`；narrative 增补 r22 固定点，收束 r20“本会话未做浏览器交互矩阵”的披露。矩阵是程序化浏览器验证，不是辅助技术认证、人工像素目检、现场证据或任何批准。
- The evidence is written as a structured block into `site-grounding-register.json#package_validation_contract.browser_matrix_r22`; the narrative gains a Round 22 fixed point that supersedes the Round 20 "no interactive browser matrix this session" disclosure. The matrix is programmatic browser verification only — not assistive-technology certification, human pixel inspection, field evidence or any approval.
- 冻结项保持不变：geometry、metrics、sources.json、四份 PDF、全部图件与媒体、proposal 与 visual 内容均未变；12/8/3/36、G0、NO-GO、provisional、`not_fully_cleared`、独立逐文件清权 0、freshness 48/2/50、141 路径不变。矩阵 PASS、PR 或合并不构成现实、批准、运营或权利升级。
- Frozen items remain unchanged: geometry, metrics, sources.json, the four PDFs, all figures and media, and all proposal/visual content are untouched; 12/8/3/36, G0, NO-GO, provisional boundaries, `not_fully_cleared`, 0 independent file-level audits, freshness 48/2/50 and 141 paths are unchanged. A matrix PASS, PR or merge creates no reality, approval, operation or rights upgrade.

## v21.0 - 2026-08-14

**Source freshness audit first execution / 来源新鲜度审计首次执行**

- 第 21 轮只在第 20 轮 PR #2594 合并（merge SHA `89c5906bc298804f5f1d074b70606afc4e110eca` 进入 canonical `main@6bc9ae33b8676018a953ed3e86f21a603d525c59`）且 447 个开放 PR 文件级扫描无竞争后开始。本轮不新增来源、文件、页数、机制或成熟度，只首次执行 `evidence-freshness-policy.json` 自 R15 起声明但从未执行的审计机制。
- Round 21 began only after Round 20 PR #2594 merged (merge SHA `89c5906bc298804f5f1d074b70606afc4e110eca` entered canonical `main@6bc9ae33b8676018a953ed3e86f21a603d525c59`) and a file-level scan of 447 open PRs found no competing PR. The round adds no source, file, page, mechanism or maturity; it only executes, for the first time, the audit mechanism that `evidence-freshness-policy.json` has declared since Round 15.
- 50 条来源逐条复核并写入 `refresh_records`（每条 10 个必填字段）：48 条 `verified_current`（包内/仓库内路径 SHA-256 或 HTTP 重取摘要），2 条 `review_due`（CASE-22AT 证书校验失败、CASE-KINGS-CROSS HTTP 403；均按访问未确认冻结升级、不删除任何陈述）。
- All 50 sources were re-checked and recorded in `refresh_records` (all ten required fields per record): 48 `verified_current` (local package/repository path SHA-256 or HTTP re-fetch digests) and 2 `review_due` (CASE-22AT certificate verification failure, CASE-KINGS-CROSS HTTP 403; both treated as access-not-confirmed, freezing upgrades and deleting nothing).
- 摘要只固定本次复核所取字节，不是发布者签名；`review_due` 来源在下一门级推进前必须由责任角色重新复核。双语 proposal 第 1 章与双语版权声明的现行计数同步为 48 完成 / 2 待复核 / 50 已审计；`sources.json`（50 条）、manifest（141 路径）与四份 PDF 均未改，PDF 字节保持第 20 轮固定点。
- Digests fix the bytes retrieved this pass only and are not publisher signatures; `review_due` sources must be re-checked by their responsible role before the next gate. The current-state counts in bilingual proposal chapter 1 and the bilingual copyright statement are synchronized to 48 completed / 2 review-due / 50 audited. `sources.json` (50 records), the manifest (141 paths) and all four PDFs are unchanged; PDF bytes keep the Round 20 fixed point.
- 冻结项保持不变：geometry、metrics、12 场景、8 项目、3 重点区、36 概念用地单元、G0、NO-GO、临时边界、非 AI 权利与专业方修改/拒绝/删除权；现实结果、批准、GO 与成熟度仍为 0 或 `unknown`；`not_fully_cleared` 与独立逐文件清权 0 不变。审计记录、机器 PASS、PR 或合并不构成权威性、批准、运营或权利升级。
- Frozen items remain unchanged: geometry, metrics, 12 scenes, 8 projects, 3 key areas, 36 conceptual land-use units, G0, NO-GO, provisional boundaries, non-AI rights and professional power to revise/reject/delete. Real results, approvals, GO and maturity remain 0 or `unknown`; `not_fully_cleared` and 0 completed independent file-level audits are unchanged. An audit record, machine PASS, PR or merge creates no authority, approval, operation or rights upgrade.

## v20.0 - 2026-08-14

**Review handoff index and package navigation / 评审交接索引与包内导航**

- 第 20 轮只在第 19 轮 PR #2566 的 merge commit `bfc77558d20e563b8069dd1dc9aa85016655b641` 进入 canonical `main@67539db2a9c3e2b91a765e109feb8f40861bb3c4`、且对全部 452 个开放 PR 做文件级扫描确认没有竞争 PR 后开始。本轮只新增一份包内导航层：`visual/assets/review-handoff-index.json`（`JZ-REVIEW-HANDOFF-INDEX-R20`）。
- Round 20 began only after Round 19 PR #2566 merged into canonical `main@67539db2a9c3e2b91a765e109feb8f40861bb3c4` at `bfc77558d20e563b8069dd1dc9aa85016655b641` and a file-level scan of all 452 open PRs found no competing package PR. The round adds exactly one navigation layer: `visual/assets/review-handoff-index.json` (`JZ-REVIEW-HANDOFF-INDEX-R20`).
- 索引把七条阅读路线（30 秒／3 分钟／15 分钟、五步可访问漫游、21 个章节阅读单元、D01—D08/H01—H07 交接、八问冷读）与全部 141 个路径的逐文件登记（现行／历史快照／机器输入／冻结／临时五种状态、语言对、轮次来源与权利回链）一次定位；`round15-baseline.json` 标注为历史快照，`t02-g0-g1-replay-fixtures.json` 标注为机器输入，`review-walkthrough.json` 与 `key-area-evidence-matrix.json` 的 `as_of` 与真实编辑同步。索引只负责定位，不生成新证据、不改变成熟度或权利状态。
- The index locates seven reading routes (30-second / 3-minute / 15-minute, the five-step accessible walk, 21 chapter reading units, the D01–D08/H01–H07 handoff and the eight-question cold read) and a per-file registry for all 141 paths (five statuses: current / historical snapshot / machine input / frozen / provisional, with language pairs, round provenance and rights backlinks). `round15-baseline.json` is labelled a historical snapshot and `t02-g0-g1-replay-fixtures.json` machine input; the `as_of` values of `review-walkthrough.json` and `key-area-evidence-matrix.json` now match their real edits. The index only locates; it creates no evidence and changes no maturity or rights state.
- 双语 proposal 阅读入口、visual 的 `#review-handoff` 小节与 A3 P14“核心回链”卡片同步指向索引；manifest、逐文件权利台账与 site-grounding 回归合同统一为 141/141/141。中英文 A3 保持 14/14 页，用两个全新进程确定性重建并逐文件字节一致；A0 输入未变、字节保持第 19 轮固定点。
- The bilingual proposal reading entry, the visual `#review-handoff` section and the A3 P14 core-backlink card now point to the index; manifest, the file-level rights ledger and the site-grounding regression contract agree on 141/141/141. The Chinese and English A3 booklets keep 14/14 pages and were rebuilt deterministically in two fresh processes with byte-identical files; A0 inputs are unchanged and their bytes keep the Round 19 fixed point.
- 冻结项保持不变：全部 geometry、`metrics.json`、12 场景、8 项目、3 重点区、36 概念用地单元、G0、NO-GO、临时边界、非 AI 同任务权利、失败停止/恢复优先与专业方修改/拒绝/删除权；现实结果、现场采集、批准、GO、成熟度变化仍为 0 或 `unknown`；独立逐文件清权审计仍为 0，总体权利仍为 `not_fully_cleared`。导航、链接闭合、机器 PASS、PR 或合并均不构成证据、批准、运营或权利升级。
- Frozen items remain unchanged: all geometry, `metrics.json`, 12 scenes, 8 projects, 3 key areas, 36 conceptual land-use units, G0, NO-GO, provisional boundaries, same-task non-AI rights, failure stop/recovery-first rules and professional power to revise/reject/delete. Real results, field collection, approvals, GO and maturity changes remain 0 or `unknown`; completed independent file-level rights audits remain 0 and overall rights remain `not_fully_cleared`. Navigation, link closure, a machine PASS, a PR or a merge creates no evidence, approval, operation or rights upgrade.

## v19.0 - 2026-08-14

**Final-grade quality-only convergence and judgement-first reading / 终稿级纯质量收束与判断优先阅读**

- 第 19 轮只重建四类高影响资产族：封面、普通生活三联图、双语重点区平面、双语重点区剖面。前台 visual、双语 proposal 与固定页数出版物收束为 judgement-first／判断优先阅读；没有新增品牌、机制、场景、项目、重点区或治理合同。
- Round 19 rebuilds only four high-impact asset families: cover, ordinary-life triptych, bilingual key-area plans, and bilingual key-area sections. The front-stage visual, bilingual proposals and fixed-size publications converge on judgement-first reading; no brand, mechanism, scene, project, key area or governance contract is added.
- 出版规格保持不变：中文/英文 A3 均为 14 页（14/14），中文/英文 A0 均为 8 页（8/8）。这些页数只记录包内出版结构，不是实施规模、现场成熟度或审批进度。
- Publication sizes remain unchanged: Chinese/English A3 are 14/14 pages and Chinese/English A0 are 8/8 boards. These counts describe package publication structure only, not implementation scale, field maturity or approval progress.
- 两个最终全新进程构建逐文件字节一致。PDF 内摄影型概念媒体以像素无损 JPX 收束；A0 在逐像素一致的审阅层上叠加 7200 像素宽的同源 JPX 印刷层。四份 PDF 均小于 10 MiB，participant preflight 记录包总量为 40,403,277 bytes；这些只是交付体积与可复制构建事实，不是现场、视觉认证或成熟度证明。
- Two final fresh-process builds are byte-identical file by file. Photographic concept-media streams inside the PDFs use pixel-lossless JPX, while A0 overlays same-source 7200-pixel-wide JPX print layers above pixel-identical review layers. All four PDFs are below 10 MiB and participant preflight records 40,403,277 package bytes. These are delivery-size and reproducible-build facts only, not field, visual-certification or maturity evidence.
- 冻结项保持不变：全部 geometry、`metrics.json`、12 个场景、8 个项目、3 个重点区、36 个概念用地单元、G0、NO-GO、临时边界、非 AI 同任务权利、失败停止/恢复优先和专业方修改/拒绝/删除权。
- Frozen items remain unchanged: all geometry, `metrics.json`, 12 scenes, 8 projects, 3 key areas, 36 conceptual land-use units, G0, NO-GO, provisional boundaries, same-task non-AI rights, failure-stop/recovery-first rules, and professional power to revise, reject or delete.
- 现实结果、现场采集、人员、排班、批准、GO、已建状态、无障碍结果、居民反馈和成熟度变化仍为 0 或 `unknown`；质量、清晰度、PDF、图件、机器 PASS 或本日志均不得把这些状态升级。
- Real results, field collection, staff, rosters, approvals, GO, built state, accessibility outcomes, resident feedback and maturity changes remain 0 or `unknown`; quality, clarity, PDFs, figures, machine PASS results and this log cannot upgrade them.
- 生成媒体只记录三个候选的判断历史：普通生活图接受；第一版封面因 map-pin/site-truth 风险拒绝；修正版封面接受。工具仅能确认为 OpenAI built-in image generation，exact serving snapshot not asserted，zero external image inputs；候选尝试不计为新增贡献、资产族或事实来源。
- Generated-media history records three candidate judgements only: ordinary accepted; first cover rejected for map-pin/site-truth risk; corrected cover accepted. The available tool detail is OpenAI built-in image generation, exact serving snapshot not asserted, with zero external image inputs. Candidate attempts are not counted as contributions, asset families or factual sources.
- 两个最终媒体均为 RGB WebP：普通生活图 1774×887，只做确定性编码且无构图编辑；封面 1600×900，由接受的合成底图与确定性本地叠层构成。两者检查时均无 EXIF/GPS/XMP/ICC；它们不是现场证据、批准设计、已建状态、无障碍结果、居民反馈或公共/专业复用许可。
- Both final media files are RGB WebP: the 1774×887 ordinary image received deterministic encoding only and no compositional edit; the 1600×900 cover combines an accepted synthetic base with a deterministic local overlay. Neither final file showed EXIF/GPS/XMP/ICC at inspection. Neither is field evidence, an approved design, a built state, an accessibility result, resident feedback or a public/professional reuse licence.
- `sources.json` 与 source-rights 继续保持 50/50，manifest 与逐文件权利路径集合继续保持 140/140；没有新增外部事实来源或远程请求。四个 Firecrawl 本地摘要/捕获摘要不是发布者签名，完成 freshness audit 仍为 0。
- `sources.json` and source-rights remain 50/50, while manifest and file-rights path sets remain 140/140. No new external factual source or remote request is added. The four local Firecrawl summary/capture digests are not publisher signatures, and completed freshness audits remain 0.
- 总体权利状态继续为 `not_fully_cleared`；逐文件独立清权审计完成数为 0，`audit_records` 为空，公开或专业复用继续 blocked。文件路径闭环、生成记录、字体嵌入或摘要一致均不等于权利许可。
- Overall rights remain `not_fully_cleared`; completed independent file-level audits remain 0, `audit_records` remains empty, and public or professional reuse remains blocked. Path closure, generation records, font embedding or digest agreement do not create a reuse licence.
- 本轮是 quality-only 包内表达迭代，不是实施、现场验证、规划/工程/无障碍批准、GO、专业接受、运营证明或清权；最终字节摘要只在并行审阅通过后统一锁定。
- This quality-only package iteration is not implementation, field validation, planning/engineering/accessibility approval, GO, professional acceptance, operating evidence or rights clearance. Final byte digests are locked only after parallel review passes.

## v18.0 - 2026-08-13

**Public Signal Interface and readable civic timetable / 公共信号界面与可读时刻表**

- 第 18 轮只在第 17 轮 PR #2369 合并并进入 `origin/main@5a284d177c9c6a7719378711d67514ac6c709f76`、同一投稿包没有开放竞争 PR、GitHub 与 Git 作者身份均为 `xyh202131` 后开始。工作包聚焦“公共信号界面与可读时刻表”，不另起品牌或规划方向。
- Round 18 began only after Round 17 PR #2369 merged into `origin/main@5a284d177c9c6a7719378711d67514ac6c709f76`, no open PR competed for this package, and both GitHub and Git author identities were `xyh202131`. The coherent work package is the Public Signal Interface and Readable Civic Timetable, not a new brand or planning direction.
- 将既有入口、时段、状态、人工、来源、退出六类信号交叉到普通、验证、故障、恢复四态和三座换轨场，形成 12 行双语静态合同。众智园使用连续观察绕行与隔离验证边，原点社区使用一街两院四个可分别撤回节点，大钟寺使用四向连续通勤与路外一厅一台；三处的故障范围与恢复对象不同，不能机械复制。
- Crossed the inherited entry, time, state, human, source and exit signals with ordinary, proof, failure and recovery across the three switchyards, producing a twelve-row bilingual static contract. Zhongzhiyuan uses a continuous observation bypass and isolated proof edge; Origin uses one street, two courts and four independently withdrawable nodes; Dazhongsi uses continuous four-way commuting and an off-route hall/desk. Failure extent and recovery object differ and cannot be copied mechanically.
- 新增双语 `public-signal-interface` SVG/PNG 图对与离线 CSS/JavaScript。界面使用原生按钮、编号、文字和线型，不以颜色单独传达状态；JavaScript 只读取同页静态表，不联网、不存储、不采集。禁用 JavaScript 时六问和 12 行合同仍完整可读。
- Added the bilingual `public-signal-interface` SVG/PNG pair and offline CSS/JavaScript. Native buttons, numbers, words and line styles prevent colour-only state communication. JavaScript reads the same-page static table only, with no network, storage or collection; all six questions and twelve rows remain complete without JavaScript.
- 公共时刻表收敛为日常优先、静音/无屏、条件验证、停止/恢复四种窗口类型。真实起止时刻、人工班次、位置、批准窗口和表现参数保持 `unknown` 或 0；当前人工在线、验证窗口、现场测试、事故、恢复验收、批准与 GO 均为 0，界面、PDF、机器 PASS、PR 或合并均不得升级现实成熟度。
- The civic timetable now defines four window types only: ordinary-first, quiet/screen-free, conditional proof, and stop/recovery. Real times, rosters, locations, approved windows and performance parameters remain `unknown` or 0. Current staffed presence, proof windows, field tests, incidents, restoration acceptances, approvals and GO decisions are all 0; no interface, PDF, machine PASS, PR or merge advances real maturity.
- 在 `key-area-evidence-matrix.json#public_signal_interface_round18` 与 `site-grounding-register.json#public_signal_interface_round18` 建立结构化回链，继承非 AI 同权、全年运营、失败治理、可逆恢复和三框场地读取合同。geometry、metrics、12 场景、8 项目、3 重点区、全部 G0、临时边界、NO-GO 与 `not_fully_cleared` 均不变。
- Added structured backlinks in `key-area-evidence-matrix.json#public_signal_interface_round18` and `site-grounding-register.json#public_signal_interface_round18`, inheriting non-AI parity, year-round operations, failure governance, reversible restoration and three-frame site reading. Geometry, metrics, 12 scenes, 8 projects, 3 key areas, all-G0 status, provisional boundaries, NO-GO and `not_fully_cleared` remain unchanged.
- 四份出版物保持中英文 A3 各 14 页、A0 各 8 页，共 44 页；第 18 轮图件替换一页 A3 现场入口表达，并进入 A0 最终公共信号/专业交接板。两次新进程重建逐文件字节一致；manifest 与逐文件权利台账扩为 140/140，独立逐文件清权仍为 0。
- Publications remain fourteen A3 pages and eight A0 pages per language, 44 pages total. The Round 18 figure replaces one A3 intake presentation and enters the final A0 public-signal/professional-handoff board. Two fresh-process builds were byte-identical. Manifest and file-rights coverage expand to 140/140, while completed independent file-level rights audits remain 0.

## v17.0 - 2026-08-13

**Site-grounded reading and editorial subtraction / 场地锚定阅读与表达减重**

- 新增 30 秒／3 分钟／15 分钟双语阅读漏斗，首屏先说明“公园已报告开放，本案只做不打断普通生活的可逆增量”，再展开双轨语法；完整证据仍保留在可展开的 15 分钟证据库中。
- Added a bilingual 30-second / 3-minute / 15-minute reading funnel. The first screen now states that the park is publicly reported open and the proposal addresses only reversible increments that do not interrupt ordinary life, before explaining the twin-track grammar; the full evidence remains available in the expandable 15-minute library.
- 把场地表达明确拆为三框：公开背景定位、仓库临时设计容器、方案设计关系。三者不得叠合成伪精确总图；既有 OSM 背景差异与 `PROV-KEY-003` 未锚定大钟寺站均保留为未裁决重算触发，本轮不平移 geometry。
- Split site representation into three explicit frames: published background orientation, the repository provisional design container, and proposal-defined design relationships. They must not be merged into a false-precision master map. The existing OSM background divergence and unanchored `PROV-KEY-003` remain unresolved recalculation triggers; this round does not shift geometry.
- 重绘五组中英文核心图：三框场地读取、36 概念单元的空间职责、三处不可互换换轨场、普通慢行与蓝绿维护净空、D01—D08 证据成熟度。每组同时保留 SVG 可编辑源与 1800×1100 PNG 展示导出。
- Redrew five bilingual core figure families: three-frame site reading, spatial duties of the 36 concept units, three non-interchangeable switchyards, ordinary mobility and blue-green maintenance clear zones, and D01–D08 evidence maturity. Each family retains editable SVG sources and 1800×1100 PNG display exports.
- 删除页首 V1/V2 版本复盘表和重复总图调用，统一 `Zhongzhiyuan`、一厅一人工台、公共任务经济及规划术语；评审主导航只显示六个高价值入口，其余合同进入可展开证据库。
- Removed the front-loaded V1/V2 retrospective table and a duplicate overview call, standardized `Zhongzhiyuan`, one hall plus one staffed desk, Public Mission Economy, and planning terms, and reduced the primary jury navigation to six high-value entries with the remaining contracts in an expandable evidence library.
- 修复无锚点打开时旧脚本自动写入 `#step-1`、跳过首屏的问题；主导航提前到 30 秒入口之后，新增中英文切换、键盘跳转、表格列语义和移动端图内横向阅读／等价三框文字卡片。以上是可访问性设计意图，不是认证。
- Fixed the legacy script that wrote `#step-1` and skipped the first view on unanchored loads. Primary navigation now follows the 30-second entry, with bilingual switching, keyboard skip, table-column semantics, and small-screen in-figure scrolling plus equivalent three-frame text cards. These are accessibility intentions, not certification.
- 将可见指标拆成包内对象计数、临时几何派生值和现实证据，移除会被误读为场地绩效的可见 HIGH；重建中英文 14 页 A3 和 8 页 A0，44 页全检为空白页 0、替换字形 0、越界文本块 0。最终投稿清单与逐文件权利台账目标同步为 134/134，独立清权仍为 0。
- Split visible metrics into package-object counts, provisional-geometry derivations, and reality evidence, removing visible HIGH labels that could be mistaken for site performance. Rebuilt 14-page A3 and 8-page A0 publications in both languages; all 44 pages have 0 blank pages, 0 replacement glyphs, and 0 out-of-page text blocks. The final manifest and file-rights ledger target 134/134 paths, while independent clearance remains 0.
- 新增 `A-SITE-READING-020` 与 `JZ-SITE-READING-R17` 结构化合同。12 场景、8 项目、3 重点区、36 概念用地单元、geometry、metrics、G0、NO-GO、现实结果 0 与 `not_fully_cleared` 均不变；图件、PDF、机器 PASS 或 PR 合并不构成现场、专业、规划、建设、运营或权利批准。
- Added the structured `A-SITE-READING-020` and `JZ-SITE-READING-R17` contracts. Twelve scenes, eight projects, three key areas, 36 concept land-use units, geometry, metrics, G0, NO-GO, zero real results, and `not_fully_cleared` remain unchanged. No figure, PDF, machine PASS, or PR merge creates site, professional, planning, construction, operating, or rights approval.
- 在 `JZ-SITE-READING-R17` 内固化 10 个 geometry／metrics 输入哈希、389 个唯一空间 ID、12／8／3 编号数量、44 页出版、双语浏览器、134 项清单／权利和 T02 回放的包级回归期望；该合同只阻止文件与表达倒退，不升级任何现实成熟度。
- Embedded package-level regression expectations in `JZ-SITE-READING-R17`: ten frozen geometry/metrics hashes; 389 unique spatial IDs; 12/8/3 identifier counts; 44 publication pages; bilingual browser behavior; 134 manifest/rights paths; and the T02 replay. This contract prevents file and presentation regressions only and upgrades no real-world maturity.

## v16.0 - 2026-08-13

**Jury-first convergence and trusted delivery migration / 评审收束与可信交付迁移**

- 将前台唯一身份收束为“双轨京张 / Twin-Track Jing-Zhang”，并把旧投稿名移出首屏；JZ-AIOS、G0—G3、证据门、权利边界仍为后台内核。页首元数据压缩为 3 条评审轨道和 6 个官方场景族，但 12 个结构化场景节点、8 个项目、3 个重点区及其编号全部保留。
- Converged the sole front-stage identity on Twin-Track Jing-Zhang and removed the legacy submission name from the first screen. JZ-AIOS, G0–G3, evidence gates and rights boundaries remain the back-stage kernel. Front-matter metadata is compressed to three review tracks and six official scenario families while all twelve structured scene nodes, eight projects, three key areas and identifiers remain intact.
- 新增用户启动、静音、48 秒的普通—验证—故障—恢复评审动态；无 JavaScript 时四张卡完整可读，减少动态时改为逐态按钮。动态不采集数据、不自动播放，也不构成现场事故、恢复时长、人员或运营证据。
- Added a user-started, silent 48-second ordinary–proof–failure–recovery review motion. All four cards remain complete without JavaScript, and reduced-motion mode advances discretely. It collects no data, never autoplays, and creates no field-incident, recovery-duration, staffing or operating evidence.
- 重建双语封面、14 页 A3 评审册和 8 张 A0 核心板：每个可见单元只承担一个判断，并在统一证据带中披露 12/12 文档覆盖、现场结果 0、GO/批准 0、G0、临时几何和 `not_fully_cleared`。长文 References 保持最后章节。
- Rebuilt the bilingual cover, fourteen-page A3 jury booklets and eight A0 core boards. Each visible unit carries one judgement and a shared evidence strip discloses 12/12 document coverage, zero field results, zero GO/approval, G0, provisional geometry and `not_fully_cleared`. References remain the final long-form section.
- 把 manifest 迁移到严格 0.2.x：非规范旧角色无损保存在 `role=other` + `role_detail`，旧翻译、校验、权利和发布声明移入带版本扩展；新增封面入口。迁移不改变权利阻断或现实成熟度。
- Migrated the manifest to strict 0.2.x: non-canonical legacy roles are preserved losslessly as `role=other` plus `role_detail`; legacy translation, validation, rights and release claims move into versioned extensions; the cover entry is added. Migration changes neither the rights gate nor real-world maturity.
- 现场采集、批准、GO、真实故障、恢复验收、人员、排班、预算、客流和逐文件独立清权仍为 0 或 unknown；临时边界与三项空间提示保持不变。
- Field collection, approvals, GO, real failures, restoration acceptances, staffing, rosters, budgets, footfall and independent file-level rights clearance remain 0 or unknown. Provisional boundaries and the three spatial notices remain unchanged.

## v15.0 - 2026-08-13

**Field evidence intake and replacement pack / 现场证据采集与替换包**

- 将既有 D01—D08 和 H01—H07 转成双语空白采集、保管链和专业处置合同；八包均为 `not_collected`、材料 0、现场值 `null`、接收用于复算 0、批准 0。模板完整不等于证据、批准或 G1 升级。
- Turned existing D01-D08 and H01-H07 into a bilingual empty collection, custody and professional-disposition contract. All eight packets remain `not_collected`, with 0 artifacts, `null` field values, 0 acceptances for recalculation and 0 approvals. Template completeness is not evidence, approval or a G1 upgrade.
- 新增三条不可互换的未来采集路：众智园核对设备隔离/停止/还场，原点核对同意撤回/居民日常/保障，大钟寺核对高峰连续/来源版本/纠错；完成走查均为 0。
- Added three non-interchangeable future routes: Zhongzhiyuan for equipment isolation/stop/restoration, Origin for consent withdrawal/daily life/safeguarding, and Dazhongsi for peak continuity/source version/correction. Completed route walks remain 0.
- #2266 只提供公众可读的保留/修改/暂停/归还处置方法，并被规范化到本包已有术语；未复制其品牌、空间构图、几何、指标、图件、媒体或现实结论。
- PR #2266 contributes public keep/modify/pause/return disposition method only, normalized into this package's existing vocabulary. No brand, spatial composition, geometry, metric, figure, media or real-world claim is copied.
- 追加当前态一致性审计：把正文、来源新鲜度策略和双语权利声明中的旧轮次计数统一为最终 125 个路径、50 条来源与 24 个 SVG；历史固定点仍作为带轮次标识的历史记录保留。
- Added a current-state consistency audit: synchronized stale round-era counts in the narrative, freshness policy and bilingual rights statement to the final 125 paths, 50 sources and 24 SVG files; explicitly versioned historical fixed points remain historical records.
- 12 场景、8 项目、3 重点区、99 槽、geometry、metrics、全部 G0、临时边界、NO-GO 和 `not_fully_cleared` 保持不变。
- Twelve scenes, eight projects, three key areas, 99 slots, geometry, metrics, all-G0 status, provisional boundaries, NO-GO and `not_fully_cleared` remain unchanged.

## v14.0 - 2026-08-13

**Accessible offline review walk and final convergence / 可访问离线评审漫游与终局收束**

- 新增双语五步离线评审入口与结构化路由合同，把双轨总纲、三种原型、普通非 AI 任务、故障恢复、D01—D08／H01—H07 专业交接压缩为一条可核查阅读路线；不新增机制或现实结论。
- Added a bilingual five-step offline review entry and structured route contract, compressing the twin-track master plan, three prototypes, ordinary non-AI task, failure/recovery and D01–D08/H01–H07 professional handoff into one auditable reading route without adding a mechanism or real-world conclusion.
- 核心内容不依赖 JavaScript；页面支持语义地标、跳转链接、可见焦点、原生 details、方向键/Home/End、减少动态和打印全展开。无账号、扫码、远程资源、表单、追踪、自动播放或 AI 依赖；这是可访问性意图，不声称认证。
- Core content requires no JavaScript; semantic landmarks, skip link, visible focus, native details, arrow/Home/End keys, reduced motion and print-all mode are provided. There is no account, QR, remote resource, form, tracker, autoplay or AI dependency; these are accessibility intentions, not certification.
- 第十四轮一致性审计保持一项核心概念、三处差异原型、12 场景、8 项目、3 重点区、99 槽、geometry、metrics、全部 G0、临时边界、NO-GO 与 `not_fully_cleared` 不变；文件或 PR 通过不构成审批、运营或权利许可。
- The fourteen-round consistency audit preserves one core concept, three differentiated prototypes, 12 scenes, 8 projects, 3 key areas, 99 slots, geometry, metrics, all-G0 status, provisional boundaries, NO-GO and `not_fully_cleared`; no file or PR PASS creates approval, operation or rights clearance.


> 本日志仅记录本投稿包的可追溯变化，不是审批、实施、现场测试、权利清除或 trusted CI 证明。每次内容变化后，均须从最终 Git blob 重新生成 manifest，并以绑定最终 PR head 的仓库验证为准。
>
> This log records traceable changes to this submission package only. It is not evidence of approval, implementation, field testing, rights clearance, or trusted CI. After any content change, regenerate the manifest from the final Git blobs and rely on repository validation attached to the final PR head.

## v13.0 - 2026-08-13

**Reversible assemblies and restoration / 可逆构件与恢复装配册**

- 新增三处不可机械复制的双语装配关系图与结构化登记：众智园为平行旁路—隔离—实体停止—恢复检查，原点为一街两院四个逐个撤回的无屏节点，大钟寺为四向通勤十字与旁侧来源纠错厅/双入口人工台。
- Added three non-copyable bilingual assembly relations and a structured register: Zhongzhiyuan parallel bypass/isolation/physical-stop/recovery check; Origin one street, two courts and four individually withdrawable screen-free nodes; Dazhongsi four-way commute cross with off-route source-correction hall and dual-entry staffed desk.
- 六阶段覆盖安装前、开放前、普通、停止隔离、拆除退场与恢复验收，逐项回链 D01—D08 和 H01—H07；专业团队可修改、拒绝或删除概念。
- Six stages cover before-install, pre-opening, ordinary use, stop/isolate, remove/exit, and restore/accept, with D01–D08 and H01–H07 backlinks; professionals may revise, reject or delete the concept.
- 类型、尺寸、材料、连接、专项核验、准确位置、安装方法和恢复时长均保持 unknown；现实安装、批准详图、责任接受、现场检查、拆除和恢复验收均为 0。
- Type, dimension, material, connection, specialist clearance, exact location, installation method and restoration duration remain unknown; real installations, approved details, accepted duties, inspections, removals and restoration acceptances remain 0.
- 12 场景、8 项目、3 重点区、99 槽、geometry、metrics、全部 G0、临时边界和 `not_fully_cleared` 不变；图件、PR 或合并不构成工程、场地或实施批准。
- Twelve scenes, eight projects, three key areas, 99 slots, geometry, metrics, all-G0 status, provisional boundaries and `not_fully_cleared` remain unchanged; drawings, PR review or merge create no engineering, site or implementation approval.

## v12.0 - 2026-08-13

**Ordinary-life spatial scenes / 普通生活空间场景册**

- 新增一张无文字、合成人尺度三联概念图：众智园普通旁路与平行验证庭、原点社区无屏居民街与两院、大钟寺连续通勤与旁侧人工服务。它把“先完成普通任务、AI 只作可选旁侧叠层”画进空间，不新增 Logo、场景、项目、几何或治理合同。
- Added one text-free synthetic human-scale triptych: Zhongzhiyuan ordinary bypass beside a parallel proof court, Origin Community screen-free resident street and two courts, and Dazhongsi continuous commuting beside staffed service. It spatializes “complete the ordinary task first; AI is only an optional side overlay” without adding a logo, scene, project, geometry, or governance contract.
- 新增双语长描述与 `ordinary-life-media-register.json`，逐处登记普通路径、可选验证、人工交接、故障绕行、恢复提示、禁止推断和普通—验证—故障—恢复四态；真实照片、确认视点、现场观察、获批构件、运营交互、无障碍结果与恢复结果均保持 0。
- Added a bilingual long description and `ordinary-life-media-register.json`, recording each ordinary path, optional proof layer, staffed handoff, fault bypass, restoration cue, prohibited inference, and ordinary–proof–fault–recovery reading. Real photographs, confirmed viewpoints, field observations, approved components, operational interactions, accessibility results, and restoration results remain 0.
- 双语正文、离线 visual、报告、四份出版物、来源/权利证据、manifest 和逐文件台账同步纳入该人类阅读入口。图像由 OpenAI 图像生成工具从本包自编文本提示生成，未输入外部图像；权利状态继续为 `not_fully_cleared`，公共或专业复用继续阻断。
- Synchronized the bilingual proposals, offline visual, reports, four publications, source/rights evidence, manifest, and file-level ledger with this human-reading entry. The OpenAI image-generation tool used a package-authored text prompt and no external image input; rights remain `not_fully_cleared`, with public or professional reuse still blocked.
- 12 场景、8 项目、3 重点区、geometry、metrics、99 个现实关闭槽、全部 G0 与临时边界保持不变；概念图、文件 PASS、PR 审查或合并均不构成现实位置、无障碍合规、获批设计、建设、运营或成熟度升级。
- Twelve scenes, eight projects, three key areas, geometry, metrics, 99 real-world closure slots, all-G0 status, and provisional boundaries remain unchanged. A concept image, file PASS, PR review, or merge creates no real location, accessibility compliance, approved design, construction, operation, or maturity advancement.

## v11.0 - 2026-08-12

**Review synthesis and professional handoff / 评审收束与专业深化交接**

- 不再新增品牌、场景、季节、项目或治理合同；把十轮成果收束为“一概念、三原型、一内核”的四步评审入口，并把任务书 agent.1—agent.6 各绑定到一个核心评审问题、现有证据、专业接手动作和禁止推断。
- Added no brand, scene, season, project, or governance contract. The ten-round package now converges into a four-step “one concept, three prototypes, one kernel” review entry, with each taskbook duty agent.1–agent.6 bound to one core review question, current evidence, professional next action, and prohibited inference.
- 深化既有 `implementation-handoff-matrix.json`，新增 D01—D08 八类现实资料替换登记、七专业接手矩阵和“冻结—替换—复算—复核—必要时退役”变更控制；正式资料冲突时先保护普通公共权利、停止验证叠层，不得修改官方或锁定图层迁就方案。
- Deepened the existing `implementation-handoff-matrix.json` with D01–D08 real-input replacement records, a seven-discipline handoff matrix, and freeze–replace–recalculate–verify–retire change control. When authoritative evidence conflicts, ordinary public rights prevail and the proof overlay stops; official or locked layers must never be altered to preserve the proposal.
- 新增双语 `review-professional-handoff.{svg,png}`，在一张评审面上组织六项任务、八类资料和七专业 NO-GO 停止线；双语正文、离线 visual、报告、合规回链及四份出版物同步纳入该入口。
- Added bilingual `review-professional-handoff.{svg,png}` to organize six duties, eight input replacements and a seven-discipline NO-GO stop line on one review surface; synchronized the bilingual proposals, offline visual, report, compliance backlinks and four publications.
- 当前权威替换材料、专业责任接受、99 槽现实材料、批准、现场测试和 GO 决定均为 0。12 场景、8 项目、3 重点区、geometry、metrics、全部 G0、临时边界和 `not_fully_cleared` 均保持不变；文件、机器或 PR 通过不构成任何现实授权。
- Authoritative replacement inputs, accepted professional duties, real artifacts across 99 slots, approvals, field tests and GO decisions all remain 0. Twelve scenes, eight projects, three key areas, geometry, metrics, all-G0 status, provisional boundaries and `not_fully_cleared` remain unchanged; no file, machine or PR PASS creates real-world authorization.

## v10.0 - 2026-08-12

**Long-term civic operations and ten-round audit / 长期公共共同体运营与十轮总审计**

- 以 `JZ-FUTURE-09` 完成串行第 10 轮，不重造第 3—9 轮的维护、权利、资源、失败、气候、文化和任务经济机制；新增一份 G0 运营集成合同，把全年普通日、无活动日、四个条件季节、同一居民任务的昼／夜／故障／恢复四窗、八类角色、三载体回写、失败公开和年度保持／修正／扩展／退役纳入同一公共运营协议。
- Completed serial Round 10 under plan ID `JZ-FUTURE-09` without reinventing the Round 3–9 maintenance, rights, resource, failure, climate, cultural, or mission-economy mechanisms. One G0 integration contract now joins year-round ordinary/no-event days, four conditional seasons, one resident task across day/night/failure/recovery, eight role types, three-carrier writeback, failure disclosure, and annual keep/correct/expand/retire decisions.
- 把既有 `07:00–22:00` 与 `22:00–07:00` 明确降回“继承的 G0 设计窗口”：不是现实开放时间、排班、夜班、噪声或照度承诺。问题季、开源季、城市 Beta 季和 Proof Week 均为 `not_scheduled`；活动、班次、预算、伙伴和确认运营成绩为 0 或 unknown，普通非 AI／无屏／无账户路径不得被活动占用。
- Explicitly bounded the inherited `07:00–22:00` and `22:00–07:00` entries as G0 design windows—not real opening hours, rosters, night shifts, noise or lighting promises. Question Season, Open-source Season, Urban Beta Season and Proof Week remain `not_scheduled`; events, shifts, budgets, partners and confirmed operating results remain 0 or unknown, and activities may not occupy the ordinary non-AI/screen-free/no-account path.
- 新增双语 `year-round-civic-operations.{svg,png}`，同构表达全年底板、四窗旅程、角色责任、场景护照—公共时刻表—证据矩阵回写、年度失败披露与去留决定；国际远程复测只有改善本地公共决定、无障碍、维护、安全或普通服务时才计公共收益，传播热度不计。
- Added the bilingual, isomorphic `year-round-civic-operations.{svg,png}` figure pair for the all-year base, four-window journey, role duties, scenario-passport/public-timetable/evidence-matrix writeback, annual failure disclosure and disposition. International remote retest counts only when it improves local public decisions, access, maintenance, safety, or ordinary service; publicity does not count.
- 十项运营决定指标全部保持 typed `unknown` / `null`，现实事故、活动、排班、预算、伙伴、投诉数据、国际复测、年度决定与退役回执均保持 0；结构化合同、总体证据矩阵、假设、指标、来源权利和逐文件权利台账形成可复核回链，但不把字段覆盖率写成运营绩效。
- All ten operating-decision metrics remain typed `unknown` / `null`; real incidents, events, rosters, budgets, partners, complaint data, international retests, annual decisions and retirement receipts remain 0. The structured contract, master evidence matrix, assumptions, metrics, source-rights records and file-level rights ledger form an auditable chain without turning field coverage into operating performance.
- 十轮一致性审计确认：前台总纲仍是“双轨京张”，后台内核仍是 JZ-AIOS + G0—G3 + 证据门 + 权利边界；众智园／原点社区／大钟寺仍为验证庭／居民共学街院／通勤发布服务三种不可互换原型；12 场景、8 项目、3 重点区、geometry、临时边界、全部 G0 和 `not_fully_cleared` 均未改变。后续只值得在新现场证据与明确授权下做收敛验证；应停止继续增加品牌、季节、场景、无证据指标或成熟度叙事。
- The ten-round consistency audit confirms that Twin-track Jing-Zhang remains the front-stage master plan and JZ-AIOS + G0–G3 + evidence gates + rights boundaries remain the backstage kernel. Zhongzhiyuan, Origin Community and Dazhongsi remain non-interchangeable proof-court, resident-learning street/courts, and commuter publication/service prototypes. Twelve scenes, eight projects, three key areas, geometry, provisional boundaries, all-G0 status and `not_fully_cleared` remain unchanged. Further work is worthwhile only as evidence-led convergence under explicit authorization; adding brands, seasons, scenes, unsupported metrics or maturity narratives should stop.
- 双语 Markdown/离线 HTML 与四份 PDF 同步更新；A3 中英文为 63/67 页，A0 中英文各 15 张整板。全部 PDF 为单一正确页面尺寸、无空白页、无替换字形、无越界文本块；新增运营图的中英文封面、A0 整板和 A3 细节裁片均完成视觉抽查。
- Synchronized bilingual Markdown/offline HTML and all four PDFs. Chinese/English A3 contain 63/67 pages; both A0 sets contain 15 whole boards. Every PDF has one correct page size, zero blank pages, replacement glyphs or out-of-page text blocks; the bilingual cover, A0 board and A3 detail crops for the new operations figure were visually inspected.

## v9.1 - 2026-08-12

**Rounds 7–9 cross-round closure / 第 7—9 轮跨轮闭环**

- 审计确认第 7 轮 G0、失败门、非 AI 连续路径与临时边界未被后两轮破坏；修补集中于第 8—9 轮新增内容未完整进入出版、来源权利证据和逐文件覆盖的问题，不新增场景、项目、几何、边界、伙伴、采购、审批、现场结果或成熟度。
- Audit confirmed that Round 7 G0 status, failure gates, continuous non-AI paths, and provisional boundaries remain intact. The repair is limited to Round 8–9 material missing from publication, source-rights evidence, and file-level coverage; it adds no scene, project, geometry, boundary, partner, procurement, approval, field result, or maturity.
- 修正双语视觉首页嵌套导航；重排两张英文图的标题、状态条、卡片、恢复链和页脚，并删除可见的内部证据 token；中文图同步删除内部 token。双语正文与离线 HTML 现在直接嵌入百年时间与公共任务经济图件。
- Corrected malformed nested bilingual navigation; repaired title, status-bar, card, recovery-flow, and footer layout in the two English figures and removed visible internal evidence tokens, with matching token cleanup in Chinese. Bilingual Markdown and offline HTML now embed both century-time and mission-economy figures directly.
- manifest/逐文件权利台账从 89/88 扩为 99/98，新增 10 个第 8—9 轮合同与图件记录；来源权利证据从 29 扩为 35，与 `sources.json` 一一对应。删除未经证明的 CC 许可与“可展览”表述，总体仍为 `not_fully_cleared`，独立逐文件审计 0，公共或专业复用继续阻断。
- Expanded manifest/file-level rights coverage from 89/88 to 99/98 with ten Round 8–9 contract/figure records. Source-rights evidence expands from 29 to 35 and is one-to-one with `sources.json`. Unsupported CC-license and exhibition-use statements are removed; overall rights remain `not_fully_cleared`, independent file-level audits remain 0, and public/professional reuse remains blocked.
- 四份 PDF 从最终双语内容确定性重生：中文/英文 A3 为 58/62 页，每种语言 14 组图件各拆 3 个带 30px 重叠的 620×892 细节裁片；中英文 A0 各 14 张整板。两个新进程逐文件一致，148 页 QA 的空白页、替换字形和越界文本块均为 0；摘要见 `report/narrative.md`。
- Deterministically regenerated all four PDFs from final bilingual content: Chinese/English A3 contain 58/62 pages with 14 figure sets per language, each split into three 620×892 detail crops with 30px overlap; both A0 sets contain 14 whole boards. Two fresh processes are file-identical, and all 148 pages return 0 blank pages, replacement glyphs, or out-of-page text blocks; hashes are recorded in `report/narrative.md`.

## v9.0 - 2026-08-12

**Mission Economy: 问题驱动的产业与人才转化 / Mission Economy: Problem-Led Industry and Talent Translation**

- 选择四个相互依赖的产业与人才机制工作包，把公共任务发布、问题质量门、小团队公平准入、离线原型、独立复测门、结果回流与退出退役组织为同一 G0 机制合同；不以虚构企业名单、投资额或招商承诺证明产业价值，验证通过不等于采购或部署授权；不重做公共权利、证据类型、失败治理或文化合同底座。
- Selected four mutually dependent industry-and-talent mechanism work packages, organizing public-task publication, problem-quality gate, fair small-team entry, offline prototyping, independent-retest gate, result reflow, and exit/retirement into one G0 mechanism contract; industry value is not proven by invented enterprise lists, investment amounts, or attraction promises, and passing a test is not a procurement or deployment authorization; does not rebuild public-rights, evidence-type, failure-governance, or cultural-contract foundations.
- 新增 `mission-economy-contract.json`（JZ-MISSION-ECONOMY-G0-V1）：公共任务生命周期七步、准入与退出（无账号门槛、同任务人工/非 AI 路径、退出不进人才排名）、采购与知识产权边界（原型≠采购≠部署、逐级独立书面授权、IP not_cleared）、公共收益回流（不依赖投资额、反馈仅作下一轮输入）、四轴分离、十项决定指标全部 unknown 或 0、八组风险预演、reality counters 全 0。
- Added `mission-economy-contract.json` (JZ-MISSION-ECONOMY-G0-V1): seven-step public-task lifecycle, entry and exit (no account barrier, manual/non-AI paths for the same task, exit records excluded from hiring ranking), procurement and IP boundary (prototype≠procurement≠deployment, separate written authorization per level, IP not_cleared), public-benefit reflow (independent of investment amounts, feedback only feeds the next round), four-axis separation, ten decision metrics all unknown or 0, eight risk rehearsals, all reality counters 0.
- 新增双语产业—公共价值状态图 `industry-public-value-state.{svg,png}`，A 公共任务生命周期/B 四轴分离/C 授权阶梯/D 公共收益回流，图面通过 QA（修正英文版卡片标题与正文溢出）。
- Added bilingual industry–public value state figure pair `industry-public-value-state.{svg,png}`, A public-task lifecycle / B four-axis separation / C authorization ladder / D public-benefit reflow; figure QA passed (fixed English card-title and body overflow).
- 为十项决定指标定义状态/分母/证明上限；没有现实数据时保持 unknown 或 0，不得用字段覆盖率、概念数量或机器 PASS 冒充现实成效：公共任务可验证度、小团队参与比例、独立复测覆盖、任务退出率、专业服务可达性、公共收益交付状态、高校课程真实参与状态、知识产权争议数、失败项目公开率、机构书面确认状态。
- Defined state/denominator/proof limits for ten decision metrics; without real data remain unknown or 0; field coverage, concept counts, or machine PASS cannot be presented as real-world outcomes: public-task verifiability rate, small-team participation ratio, independent-retest coverage, task exit rate, professional-service accessibility, public-benefit delivery status, university-course real participation, IP dispute count, failed-project publication rate, institution written-confirmation status.
- 外部机构、企业、高校和服务商均为建议角色或待确认角色，0 个书面确认；责任主体（发布、准入、复测、停止、恢复）均为角色待确认。geometry、既有 SCENE/JZ/T 编号、八个项目、全部 G0、临时边界和 `not_fully_cleared` 均不变；现实任务、小团队、复测、退出事件、采购与部署全部为 0。
- External institutions, enterprises, universities, and service providers remain suggested or pending-confirmation roles with 0 written confirmations; responsible roles (publication, entry, retest, stop, recovery) remain roles-to-be-confirmed. Geometry, existing SCENE/JZ/T IDs, eight projects, all G0 status, provisional boundaries, and `not_fully_cleared` remain unchanged; real tasks, small teams, retests, exit events, procurement, and deployment are all 0.

## v8.0 - 2026-08-12

**Century-Time Museum: 可核验·可纠错·无屏可达的城市时间教育线 / The Century-Time Museum: A Verifiable, Correctable, Screen-free Time Education Line**

- 选择十个相互依赖的文化内容工作包，把京张铁路勘测、通车、高铁、遗址公园与 AI 训练、验证、失败、纠错、退役并置为一条不崇拜技术的城市时间教育线；不重做公共权利、证据类型或失败治理底座。
- Selected ten mutually dependent cultural-content work packages, juxtaposing Jing-Zhang railway survey, opening, HSR, heritage park with AI training, validation, failure, correction, and retirement as a city time-education line that does not worship technology; does not rebuild public-rights, evidence-type, or failure-governance foundations.
- 新增 `century-time-museum-contract.json`（JZ-TIME-MUSEUM-G0-V1）：五史实对象、七级来源等级表、口述史同意模板（采集前）、争议纠错五步流（停/下架/纠错/版本保留/恢复）、无屏节点链（起点站牌→对照图谱牌→证据更新墙）、全部指标 unknown 或 0、reality counters 全 0。
- Added `century-time-museum-contract.json` (JZ-TIME-MUSEUM-G0-V1): five historical objects, seven-grade source-grade table, oral-history consent template (pre-collection), five-step dispute-correction flow (stop/takedown/correct/retain-recover), screen-free node chain (origin→atlas→evidence wall), all metrics unknown or 0, all reality counters 0.
- 新增双语百年时间图谱 `century-timeline.{svg,png}`，A 双轨对照图谱（铁路年代×AI 门级）/B 来源等级表（七级锚点）/C 争议纠错流程（五步+无屏链），图面通过 QA（修正英文图 C 区卡片宽度不足导致的文字裁切）。
- Added bilingual century-timeline figure pair `century-timeline.{svg,png}`, A twin-track atlas (railway chronology × AI gates) / B source-grade table (seven anchors) / C dispute-correction flow (five steps + screen-free chain); figure QA passed (fixed English version C-section text overflow from insufficient card width).
- 为十项文化指标定义状态/分母/证明上限；没有现场数据时保持 unknown 或设计字段覆盖，不得用字段覆盖率冒充现实成效：史实来源可核验率、未清权内容数量、生成内容标识覆盖、争议处理时间、口述史有效同意率、多语言概念一致性、无屏完成导览率、儿童理解度待测、年度退役内容数、独立史实复核状态。
- Defined state/denominator/proof limits for ten cultural metrics; without field data remain unknown or design-field coverage, cannot use field coverage as real-world outcome proxy: source verifiability rate, uncleared content count, generated-content label coverage, dispute-handling time, oral-history consent rate, multilingual concept consistency, screenless tour completion rate, child comprehension (pending), annual retired-content count, independent historical retest status.
- geometry、既有 SCENE/JZ/T 编号、八个项目、全部 G0、临时边界和 `not_fully_cleared` 均不变。官方馆藏、明确责任主体、独立复测、批准或运行结果仍为 0；图件不声称馆藏、精确档案位置、已运营展览或工程结论。
- Geometry, existing SCENE/JZ/T IDs, eight projects, all G0 status, provisional boundaries, and `not_fully_cleared` remain unchanged. Official archives, confirmed accountable operators, independent retests, approval, or operating results remain 0; figures do not claim existing archives, exact archive locations, operational exhibitions, or engineering conclusions.

## v7.0 - 2026-08-12

**Climate-resilience proof corridor / 气候韧性验证走廊**

- 选择六个相互依赖的气候空间工作包，把小月河观察翼概念关系、连续普通蓝绿路径、遮阴/可达休息意图、静态非 AI 提示、人工巡检、雨洪与生态维护净空、同任务 AI 辅助、脆弱群体四态旅程和可拆服务边组织为同一 G0 剖面语法；不重做维护、代谢、失败或权利系统。
- Selected six mutually dependent climate-spatial work packages, joining a conceptual Xiaoyue River observation edge, continuous ordinary blue-green route, shade/reachable-rest intent, static non-AI notice, manual inspection, stormwater/ecological-maintenance clear zone, same-task AI assistance, four-state vulnerable-group journey, and removable service edge in one G0 section grammar without rebuilding maintenance, metabolism, failure, or rights systems.
- 新增 `climate-resilience-contract.json` 与双语 SVG/PNG 图对，固定静态非 AI 与可选 AI 的同任务、同人工确认、同申诉和退出合同；来源过期、支线冲突、无人确认、不可达、极端天气、雨洪/维护冲突或普通路径受损均 fail-closed。
- Added `climate-resilience-contract.json` and a bilingual SVG/PNG figure pair. Static non-AI and optional AI now share one task, human confirmation, appeal, and exit contract; stale source, branch conflict, missing confirmation, inaccessible output, extreme weather, stormwater/maintenance conflict, or damage to ordinary movement fails closed.
- 为连续遮阴、可达休息、人工巡检、误报漏报、雨洪维护、停止时间和设备退出定义类型化现场锚点、分母与证明上限；七项现实值保持 unknown 或 0，不用绿地率、图面覆盖、概念节点、传感器数量或合成 PASS 冒充热舒适、准确率、水文、无障碍或恢复绩效。
- Defined typed field anchors, denominators, and proof limits for continuous shade, reachable rest, manual inspection, warning error, stormwater maintenance, stop time, and device exit. All real values remain unknown or 0; green ratio, drawing coverage, concept nodes, sensor count, and synthetic PASS cannot become comfort, accuracy, hydraulic, accessibility, or recovery performance.
- geometry、既有 SCENE/JZ/T 编号、八个项目、全部 G0、临时边界和 `not_fully_cleared` 均不变。现实测量、提示事件、设备、责任确认、还场回执和成熟度变化均为 0；图件不声称现状建筑、精确河岸、法定退界、消防/铁路/市政或已建设施。
- Geometry, existing SCENE/JZ/T IDs, eight projects, all G0 status, provisional boundaries, and `not_fully_cleared` remain unchanged. Real measurements, warning events, devices, confirmed duties, place-restoration receipts, and maturity changes remain 0; the figure claims no existing building, exact riverbank, statutory setback, fire/rail/municipal conclusion, or built facility.

## v6.0 - 2026-08-12

**Antifragile failure governance / 反脆弱失败治理**

- 在既有 JZ-AIOS 内新增一份 G0 失败治理登记，不另造治理品牌或重复失败侧线；六类失败、八类人工责任、运行/成熟度/授权/服务四轴、公众申诉、追加式版本、独立复测和主动退役进入同一合同。
- Added one G0 failure-governance register inside existing JZ-AIOS without a new brand or duplicate failure siding. Six failure classes, eight human role types, separate runtime/maturity/authorization/service axes, public appeal, append-only versions, independent retest, and active retirement now share one contract.
- 把暂停、复核、恢复、撤回和退役定义为场景护照—公共时刻表—证据矩阵三载体原子回写；任一缺失或矛盾即向更保守状态 fail-closed，旧证据不得被版本更新覆盖，申诉必须进入 go/no-go。
- Defined pause, review, recovery, withdrawal, and retirement as atomic writebacks across scene passport, civic timetable, and evidence matrix. Missing or conflicting carriers fail closed to the conservative state, version updates cannot overwrite prior evidence, and appeals must enter go/no-go.
- 新增双语治理图，空间化六类失败、T-02 过期来源合成故事板、三载体回写、四轴分离和退役回执；T-02 继续保持 deterministic、无个人信息、无模型/API/现实服务调用和 fail-closed，不写成现实事故或现场恢复。
- Added a bilingual governance figure spatialising six failure classes, the synthetic T-02 stale-source storyboard, three-carrier writeback, four separate axes, and retirement receipts. T-02 remains deterministic, PII-free, free of model/API/real-service calls, and fail-closed; it is not presented as a real incident or field recovery.
- 现实失败事件、确认停止权限、确认责任主体、公开纠正、现实独立复测、主动退役和批准重启均为 0；停止到人工交接时间与普通使用恢复时间保持 unknown。文件检查、合成 PASS、复测或恢复验收均不授权试用、采购、建设、部署、成熟度升级、场地/专业批准、清权或现实成效。
- Real failure events, confirmed stop authorities and accountable operators, public corrections, real independent retests, active retirements, and approved restarts remain 0. Stop-to-staffed-handoff and ordinary-use-recovery times remain unknown. A file check, synthetic PASS, retest, or restoration acceptance authorizes no trial, procurement, construction, deployment, maturity advance, site/professional approval, rights clearance, or real-world outcome.
- 未改 geometry、既有 SCENE/JZ/T 编号、G0、后续气候方向或临时边界；权利继续为 `not_fully_cleared`，独立逐文件清权审计完成数仍为 0。
- Geometry, existing SCENE/JZ/T IDs, G0, the later climate direction, and provisional boundaries are unchanged. Rights remain `not_fully_cleared`, with zero completed independent file-level clearance audits.

## v5.0 - 2026-08-12

**Whole-system AI urban metabolism / 完整系统 AI 城市代谢**

- 为既有 `SCENE-001`—`012` 建立十二本 G0 资源护照，在同一账本内覆盖算力、能源、设备材料、数据、人工复核、供应商依赖、失败与退出成本；核算边界从云/服务器扩展到边缘、网络、终端、传感/显示/固定件、人工和非 AI 基线、无障碍/安静与场所恢复。
- Added twelve G0 resource passports for the existing `SCENE-001`—`012`, covering compute, energy, equipment/material, data, human review, vendor dependency, and failure/exit cost in one ledger. The boundary extends from cloud/server to edge, network, end devices, sensing/display/fixings, staffed and non-AI baselines, accessibility/quiet, and place restoration.
- 新增双语城市代谢系统图与 visual 入口，按众智园设备/电池/接管、原点社区同意/共享设备/保障/清场、大钟寺来源/终端/人工台/通勤，分别显示不可复制的资源负担和退出焦点；三处只复用七类字段，不套用同一退出动作。
- Added a bilingual metabolism-system figure and visual entry. Zhongzhiyuan shows equipment/battery/takeover burdens; Origin shows consent/shared-kit/safeguarding/clearance burdens; Dazhongsi shows source/terminal/staffed-desk/commute burdens. The places share seven fields but not one copied exit action.
- 固定五类显式未知状态、七类组件退出去向和公共 NO-GO 门；任务分母、完整边界、来源、责任、非 AI 同任务基线、供应商导出维修退出、组件去向与独立复核必须全部关闭，未来 `PASS` 也不等于部署、场地、采购、成熟度、清权或环境收益授权。
- Fixed five typed unknown states, seven component-exit destinations, and a public NO-GO gate. Task denominator, whole boundary, sources, responsibility, same-task non-AI baseline, vendor export/repair/exit, component destinations, and independent retest must all close; even a future `PASS` is not deployment, site, procurement, maturity, rights, or environmental authorization.
- 12/12 与 7/7 仅为设计字段覆盖。有效任务分母、实测能源场景、实测算力场景、确认设备生命周期场景、实测人工分钟场景、确认供应商、现实批准与运行均为 0；总能源、总算力和总人工分钟保持 unknown。未改 geometry、既有 SCENE/JZ/T 编号、G0、后续失败治理或气候任务线，权利仍为 `not_fully_cleared`。
- 12/12 and 7/7 are design-field coverage only. Valid task denominators, measured-energy scenes, measured-compute scenes, confirmed equipment-lifecycle scenes, measured-human-minute scenes, confirmed vendors, real approvals, and real operations are all 0; total energy, compute, and human minutes remain unknown. Geometry, existing SCENE/JZ/T IDs, G0, later failure-governance and climate task lines are unchanged, and rights remain `not_fully_cleared`.

## v4.0 - 2026-08-11

**Non-AI-first public city / 非 AI 优先公共城市**

- 选择六个内聚工作包，把无需账户/扫码、完整非 AI、连续无障碍意图、人工交接、同意撤回、申诉纠正、无屏安静固化为七项未来服务窗口不得删除的公共设计权利；“永久”不表示当前已有服务点、窗口、人员或批准。
- Selected six cohesive work packages and fixed seven public design rights that cannot be removed from any future offered service window: no account/QR, complete non-AI path, continuous accessibility intent, staffed handoff, consent withdrawal, appeal/correction, and screen-free quiet. “Permanent” does not mean that a current service point, window, staff assignment, or approval exists.
- 将 `non-ai-parity-contract.json` 升级为 V2，以“纸面/口头任务—无屏等候—双入口人工台—同一基本任务—投诉/撤回/纠正—无技术离开”为主路径；AI 仅在易懂披露和单独自愿同意后作为可选支线，并汇入同一结果、费用规则、责任队列与恢复链。
- Upgraded `non-ai-parity-contract.json` to V2. The primary route is paper/oral task–screen-free waiting–dual-entry staffed desk–same basic task–complaint/withdrawal/correction–technology-free exit. AI is an optional branch only after plain-language disclosure and separate voluntary consent, and rejoins the same outcome, cost rule, accountable queue, and recovery chain.
- 新增双语服务蓝图和 `non_ai_first_public_city_contract`，分别空间化众智园设备隔离/接管恢复、原点社区无屏共学/口头纸面撤回、以及大钟寺四向通勤/来源纠错/双入口人工台；三处不套用同一构图或恢复动作。
- Added a bilingual service blueprint and `non_ai_first_public_city_contract`, spatialising Zhongzhiyuan equipment isolation/takeover recovery, Origin screen-free learning/oral-paper withdrawal, and Dazhongsi four-way commuting/source correction/dual-entry staffed service. The three places do not share one copied composition or recovery action.
- 老年人、残障与行动不便者、低数字素养者、无账户或无智能设备者分别建立分母、记录字段和未知阈值；总体平均不得掩盖排斥。投诉、撤回、纠正、停止、人工接管、临时叠层退出、独立复测与还场进入同一可审计闭环。
- Added separate denominators, record fields, and unknown thresholds for older people, disabled and reduced-mobility users, low-digital-literacy users, and people without an account or smart device; overall averages may not hide exclusion. Complaint, withdrawal, correction, stop, staffed takeover, overlay removal, independent retest, and place restoration form one auditable loop.
- 已确认运营主体 0、人员 0、现实服务交互 0、已知群体结果 0、现实批准与运营 0；全部场景仍为 G0，临时 geometry、既有 SCENE/JZ/T 编号、后续维护合同和 `not_fully_cleared` 权利状态不变。本轮不声称固定值班、满意度、完成率、现场测试或法律上普遍适用的服务义务。
- Confirmed operators, staff, real service interactions, known group results, and real approvals/operations all remain 0. Every scene remains G0; provisional geometry, existing SCENE/JZ/T IDs, the later maintenance contract, and `not_fully_cleared` rights status are unchanged. This round claims no fixed staffing, satisfaction, completion rate, field test, or generally applicable statutory service duty.

## v3.0 - 2026-08-11

**Maintenance-urbanism publication fixed point / 维护型城市发布固定点**

- 新增五类按用户目标命名的维护任务族、12 个既有场景至既有 `JZ-01`—`08` 项目的双语交叉表，以及“问题壳—工单壳—责任接受—人工工时—既有设施优先—独立复核—继续/纠正/停止—退役—回到普通基线”闭环；任务族不是新场景或项目。
- Added five user-goal maintenance task families, a bilingual crosswalk from the 12 existing scenes to existing `JZ-01`—`08` projects, and an issue-shell–work-order-shell–responsibility-acceptance–human-hours–existing-facility-first–independent-recheck–continue/correct/stop–retirement–ordinary-baseline loop. Task families are not new scenes or projects.
- `maintenance_urbanism_contract` 记录双语标签、全量场景交叉映射、全寿命与可维修字段、季度维护地图模板、重复失败/退役规则、证据回链和零/未知现实计数；未改 geometry、SCENE/JZ/T 主编号或成熟度。
- `maintenance_urbanism_contract` records bilingual labels, the full scene crosswalk, lifecycle and repairability fields, a quarterly maintenance-map template, repeated-failure/retirement rules, evidence backlinks, and zero/unknown reality counters. Geometry, primary SCENE/JZ/T IDs, and maturity are unchanged.
- 维护图与离线双语入口明确呈现维修缝、重复失败侧线、退役/普通基线恢复、既有设施优先阶梯、空白季度地图和 0/pending/unknown 限制；HTML、四份 PDF、台账、manifest 与标记自检均从最终包字节重建。当前包仍为 70 条 manifest 路径与 69 个非 manifest 内容文件。
- The maintenance figure and paired offline entry now make the repair seam, repeated-failure siding, retirement/ordinary-baseline restoration, existing-facility-first ladder, blank quarterly map, and 0/pending/unknown limits explicit. HTML, all four PDFs, the ledger, manifest, and marked self-check are rebuilt from final package bytes. The package remains 70 manifest paths with 69 non-manifest content files.
- 现实投诉、工单、预算、确认人员、工时、修复、独立复核、效果、批准和运营均未被声明为已发生：计数保持 0 或 unknown/pending；全部场景仍为 G0，临时边界与权利 `not_fully_cleared` 不变，独立逐文件清权审计完成数仍为 0。
- No real complaint, work order, budget, confirmed personnel, hours, repair, independent recheck, effect, approval, or operation is claimed: counts remain 0 or unknown/pending; all scenes remain G0, provisional boundaries and `not_fully_cleared` rights remain unchanged, and completed independent file-level clearance audits remain 0.

## v2.14 - 2026-08-11

**Three differentiated switchyard prototypes / 三座差异化换轨场原型**

- 选择六个内聚工作包，把众智园深化为“平行验证庭—设备隔离—人工接管—恢复验收”，把原点社区深化为“一街两院四节点—无屏共学—同意撤回—居民日常”，把大钟寺深化为“四象限步行—一厅一台—通勤连续—人工服务”，并以三处连续非 AI / 无障碍意图线、可拆构件、静音和四态证据合同贯通。
- Selected six cohesive work packages: Zhongzhiyuan as parallel proof court–equipment isolation–staffed takeover–restoration acceptance; Origin Community as one street/two courts/four nodes–screen-free learning–consent withdrawal–resident daily use; Dazhongsi as four-quadrant walking–one hall/one desk–commute continuity–staffed service; plus continuous non-AI/accessibility intent, removable components, quiet mode, and one four-state evidence contract across all three.
- 重构双语 `key-areas` 为普通状态优先的概念平面、首层公共界面和四步旅程，重构双语 `key-area-sections` 为三种关系剖面、普通—验证—故障—恢复四态与场所恢复门；每列只回答一个规划问题，并显式列出不可复制组件与未知资料。
- Rebuilt bilingual `key-areas` as ordinary-first concept plans, ground-floor public interfaces, and four-step journeys, and rebuilt bilingual `key-area-sections` as three relationship sections, ordinary–proof–fault–recovery states, and place-restoration gates. Each column answers one planning question and exposes non-copyable components and missing evidence.
- `key-area-evidence-matrix.json#round2_spatial_deepening` 新增逐处平面语法、首层界面、连续路径、人工交接、可拆构件、使用旅程、恢复检查、未知决策字段和反证自检；双语 proposal、report、visual 与设计深度矩阵回链同一合同。
- `key-area-evidence-matrix.json#round2_spatial_deepening` adds area-specific plan grammar, ground-floor interfaces, continuous paths, staffed handoff, removable components, user journeys, restoration checks, unknown decision fields, and counter-evidence self-audit. Bilingual proposals, reports, visual pages, and the design-depth matrix backlink to the same contract.
- 新增 `A-KEY-AREA-SPATIAL-011`，明确体量只是关系原型、大钟寺四向不是车站锚点、无障碍绿线不是现场合格证明、恢复验收不是批准。未改 geometry、场景编号或 metrics；全部场景仍为 G0，现实审计/责任确认/批准/测试/已知结果仍为 0，权利仍为 `not_fully_cleared`。
- Added `A-KEY-AREA-SPATIAL-011`: massing is relational only, Dazhongsi directions are not a station anchor, the green accessibility line is not field-compliance evidence, and restoration acceptance is not approval. Geometry, scene IDs, and metrics are unchanged; every scene remains G0, real audits/role confirmations/approvals/tests/known results remain 0, and rights remain `not_fully_cleared`.

## v2.13.1 - 2026-08-10

**Rights release-gate correction / 权利发布门口径修复**

- 根据 PR 评审，将 `PUBLIC_OR_PROFESSIONAL_REUSE_RIGHTS=unknown/major` 与 `RIGHTS-OPEN-01/02/03` 写入 `manifest.release_claim.known_blockers`，并把三项权利补全动作写入 `manifest.release_claim.next_actions`；结构审查的 `validation_claim.known_blockers` 保持为空，`release_claim.public_or_professional_reuse` 继续为 `blocked_pending_terms_and_audit`。
- Following review feedback, `PUBLIC_OR_PROFESSIONAL_REUSE_RIGHTS=unknown/major` and `RIGHTS-OPEN-01/02/03` are now explicit `manifest.release_claim.known_blockers`, with three rights-closure actions in `manifest.release_claim.next_actions`; structural review keeps `validation_claim.known_blockers` empty, while `release_claim.public_or_professional_reuse` remains `blocked_pending_terms_and_audit`.
- 双语验收叙事明确区分“结构/证据可审查”与“权利已清除”：仓库可以进行披露复核，但公共展示、专业深化和其他复用在完整条款、独立逐文件审计与 ODbL 判定完成前仍不可用；未改 geometry、metrics、G0 或任何场景编号。
- The bilingual acceptance narrative now separates auditable structure/evidence from rights clearance: repository disclosure review may proceed, while public display, professional deepening, and other reuse remain unavailable until complete terms, independent file-level audit, and ODbL determination are complete. Geometry, metrics, G0 status, and scene IDs are unchanged.

## v2.13 - 2026-08-10

**Twin-track front-stage spatial master plan / 双轨前台空间总纲**

- 将“双轨京张”建立为前台空间语法：连续日常轨、间歇验证轨、三座换轨场、失败侧线和公共时刻表；保留 JZ-AIOS、G0—G3、证据门和权利边界为后台治理内核。
- Made Twin-track Jing-Zhang the front-stage spatial syntax: the continuous civic track, intermittent proof track, three switchyards, failure siding, and civic timetable, while retaining JZ-AIOS, G0–G3, evidence gates, and rights boundaries as the back-stage governance kernel.
- 重构双语 `site-overview` PNG，并加入对应的双语可编辑 SVG 源；图面明确人工站房、无屏节点、非 AI 完整路径、普通—验证—故障—恢复四态和六类城市信号。验证轨以间歇、限域、可拆除叠层表达，不表示连续占地或已建设施。
- Reworked the bilingual `site-overview` PNGs and added their bilingual editable SVG sources. The drawings make staffed stations, screen-free nodes, the complete non-AI path, four public states, and six city signals explicit. The proof track is intermittent, bounded, and removable; it is not a continuous footprint or an existing facility.
- 双语主稿、叙事报告和离线 visual 首页增加核心概念、总体空间解释、可读使用旅程和结构化证据回链；`key-area-evidence-matrix.json#twin_track_frontend_contract` 只新增概念空间合同，不新增场景编号、geometry、伙伴、批准、现场测试或现实成绩。
- Added the core concept, overall spatial explanation, readable public journey, and structured evidence backlink to both proposals, the narrative report, and the offline visual homepages. `key-area-evidence-matrix.json#twin_track_frontend_contract` adds a conceptual spatial contract only; no scene ID, geometry, partner, approval, field test, or real-world result is added.
- 临时 geometry、全部场景 G0、字段覆盖不等于现场表现、权利状态 `not_fully_cleared`、非 AI 可用性和公众退出/人工接管边界保持不变；最终 manifest、权利台账、PDF 和全部验证必须从本轮最终字节重新生成。
- Provisional geometry, all-scene G0 status, the distinction between field coverage and performance, `not_fully_cleared` rights, non-AI availability, and public exit/staffed-takeover boundaries remain unchanged. The final manifest, rights ledger, PDFs, and all validations must be regenerated from this round's final bytes.
- 从最终双语正文和八组双语 PNG 重生四份 PDF：中文/英文 A3 为 11/12 页，双语 A0 各 8 页；四份均通过全页文本、页面尺寸、图像计数和 0.20 倍逐页渲染检查，双轨总体图置于 A0 首板。该出版 QA 仍不证明现场执行、审批、G1 授权或权利清除。
- Regenerated all four PDFs from the final bilingual narratives and eight bilingual PNG pairs: the Chinese/English A3 booklets are 11/12 pages and both A0 sets are eight pages. All four passed full-page text, page-size, image-count, and 0.20-scale rendering checks, with the twin-track overview first in the A0 sequence. Publication QA does not prove field execution, approval, G1 authorization, or rights clearance.

## v2.12 - 2026-08-10

**Bilingual review parity and readable handoff / 双语评审等价与可读移交**

- 对中英文离线视觉首页做结构级复核并修复“文件成对但内容层级不等价”：两版现统一为同序 16 个章节、15 个导航目标、8 个双语图件角色、14 个同键同值指标卡，以及 `[2,3,12,3,13]` 五组表格行合同；均无远程依赖。
- Audited the Chinese and English offline dashboards structurally and repaired paired-but-unequal review content. Both now share the same ordered 16 sections, 15 navigation targets, eight bilingual figure roles, fourteen metric cards with identical keys and values, and `[2,3,12,3,13]` five-table row contract, with no remote dependency.
- 将既有 99 个关闭槽压成 H01—H07 七组双语可读移交包，明确每组必须提交的现实材料、对应关闭类别和当前 `未提交 / NO-GO`；结构化 ID、九类关闭逻辑和 11 项决定均未改变。
- Compressed the existing 99 closure slots into seven bilingual H01–H07 handoff packs that state required real-world material, closure objects, and current `not submitted / NO-GO` status. Structured IDs, the nine-category logic, and all eleven decisions are unchanged.
- 把七类使用场景在双语正文中明确展示为 1 类披露评审、2 类待确认和 4 类阻断或待审计阻断，并在权利矩阵增加同一计数摘要；适用确认、书面同意和独立审计仍全部为 0。
- Exposed the seven use contexts in both proposal languages as one disclosed-review context, two confirmation-dependent contexts, and four blocked or audit-dependent contexts, and added the same count summary to the rights matrix. Applicability confirmations, written consents, and independent audits all remain 0.
- 增加 `BILINGUAL_VISUAL_PARITY` 为第 22 项包内检查，并清除一处把逐文件权利审计范围写死为旧数量的陈旧说明。未新增项目、场景、坐标、机构、批准、测试或现实成绩；geometry 与 metrics 保持不变。
- Added `BILINGUAL_VISUAL_PARITY` as the twenty-second package check and removed one stale hard-coded file count from the file-level rights-audit dependency. No project, scene, coordinate, institution, approval, test, or real-world result is added; geometry and metrics remain unchanged.

## v2.11 - 2026-08-10

**Comprehensive handoff and rights-boundary closure / 全面移交与权利边界闭环**

- 全包扫描 66 个既有文件后修正旧快照计数和矩阵—自检断链；新增两份结构化证据后，最终包为 68 个路径、67 个非 manifest 内容文件，逐文件台账与 manifest 必须严格等集。
- After scanning all 66 existing files, corrected stale snapshot counts and a matrix-to-self-check break. With two structured evidence files added, the final package contains 68 paths and 67 non-manifest content files; the file ledger and manifest must remain exact sets.
- 新增 `implementation-handoff-matrix.json`，把既有 8 个项目、3 个试点与 12 个预注册场景连接到当前阶段、空间对象、关闭记录、七组移交包和 99 个稳定材料 ID；现实提交材料、批准、运行、现场测试、已知结果与 GO 决定仍均为 0。
- Added `implementation-handoff-matrix.json`, connecting the existing eight projects, three protocols, and twelve preregistration scenes to the current phase, spatial objects, closure records, seven handoff packs, and 99 stable artifact IDs. Submitted real-world artifacts, approvals, operations, field tests, known results, and GO decisions all remain 0.
- 新增 `submission-use-rights-matrix.json`，逐条登记公告 8.1 与七类使用场景；仓库披露评审之外的主办方使用、投稿人对外展示、跨项目复用、翻译/专业深化和第三方组件发布均保留确认或阻断状态，不把公告文字、仓库可见性或机器 PASS 当作清权。
- Added `submission-use-rights-matrix.json`, separating announcement clause 8.1 from seven use contexts. Organizer use, entrant external display, cross-project reuse, translation/professional deepening, and third-party-component release beyond disclosed repository review remain pending or blocked; announcement text, repository visibility, and machine PASS do not constitute clearance.
- 为 11 项关闭记录补入 99 个唯一材料 ID 和显式空提交槽；同步双语正文、离线 HTML、展示页、版权声明、验收脚本与自检，并拆分高密度证据索引。未新增空间规划点、坐标、伙伴、批准或现实成绩，geometry 与 metrics 保持不变。
- Added 99 unique artifact IDs and explicit empty submission slots to the 11 closure records; synchronized bilingual prose, offline HTML, display pages, the copyright statement, acceptance audit, and self-check, while splitting dense evidence indexes. No spatial concept, coordinate, partner, approval, or real-world result is added; geometry and metrics remain unchanged.

## v2.10 - 2026-08-10

**Readiness evidence closure / 可行性证据关闭合同**

- 新增 `readiness-closure-contract.json`，不扩展 JZ-01—JZ-08 或 T-01—T-03 的内容，只把既有 RACI、审批、禁采数据、停机恢复、社区共测和独立复测要求统一为九类现实交付材料。
- Added `readiness-closure-contract.json` without expanding JZ-01—JZ-08 or T-01—T-03. It normalizes the existing RACI, approval, prohibited-data, stop/recovery, community co-test, and independent-retest requirements into nine real-world handoff categories.
- 固定“九类全部关闭才可讨论 G1、任一缺失即 NO-GO、停止条件优先于旧授权”的规则；11 项共 99 个关闭槽当前全部开放，已关闭 0，11 项决定均为 NO-GO，不把规范字段完整冒充现实可行性。
- Fixed the rule that all nine categories must close before G1 can be considered, any missing category means NO-GO, and active stop conditions override prior authorization. All 99 slots across 11 items remain open, 0 are closed, and all 11 decisions remain NO-GO; specification completeness is not presented as real-world feasibility.
- 同步双语正文、报告 HTML、离线展示、验收记录、A3、权利台账和 manifest；不新增规划点、场景、几何、伙伴、批准、现场测试或结果，`not_fully_cleared` 与临时边界保持不变。
- Synchronized bilingual prose, report HTML, offline visuals, acceptance records, A3, the rights ledger, and manifest. No planning point, scene, geometry, partner, approval, field test, or result is added; `not_fully_cleared` and provisional geometry remain unchanged.

## v2.9 - 2026-08-10

**Existing key-area mode alignment / 既有重点区模式对齐**

- 将 `key-areas` 平面图底部原先三列重复的通用四态，替换为 v2.8 已在剖面图、正文和 `key-area-evidence-matrix.json` 中确立的三组差异化名称与停止提示；空间结构、G1 前置、场景节点和几何均未改变。
- Replaced the three repeated generic four-mode rows in the `key-areas` plans with the area-specific names and stop cues already established in v2.8 sections, prose, and `key-area-evidence-matrix.json`. Spatial structures, G1 prerequisites, scene nodes, and geometry are unchanged.
- 同步中英文离线展示页的图像替代文字与四态对照说明，使平面、剖面、正文和机器矩阵使用同一术语；未新增规划点、指标、伙伴、批准、现场测试或运行结果。
- Synchronized bilingual offline-page alt text and mode crosswalk copy so plans, sections, prose, and the machine matrix use one vocabulary. No planning concept, metric, partner, approval, field test, or operating result is added.
- 继续保留临时边界、全部节点 G0、`not_fully_cleared`、0 现场审计、0 批准和 0 已知结果，并要求从最终包字节重新生成 PDF、权利台账和 manifest。
- Provisional geometry, all-G0 status, `not_fully_cleared`, zero field audits, zero approvals, and zero known results remain. PDFs, the rights ledger, and manifest must be regenerated from the final package bytes.

## v2.8 - 2026-08-10

**Differentiated key-area operating sections / 差异化重点区运行剖面**

- 重绘中英文重点区剖面，不再用同一骨架复刻三处重点区。众智园明确公众观察边、低风险测试花园环和维护/急停边；原点社区明确连续日常街、问题共创院、公共评议院和四个可撤节点；大钟寺明确四向步行、钟轨会客厅、人工服务台和静音休憩。
- Redrew the bilingual key-area sections so the three areas no longer repeat one generic skeleton. Zhongzhiyuan separates public observation, the low-risk test-garden loop, and the service/physical-stop edge; Origin Community separates the daily street, problem court, public-review court, and four removable nodes; Dazhongsi separates four-way walking, the Bell-Rail Commons, staffed desk, and quiet rest.
- 将每处的普通、验证、故障、恢复一套权威运行四态写入 `key-area-evidence-matrix.json`，共 3 组差异化剖面和 12 个 G0 概念状态；未来获批限域共测只作为进入验证态前的成熟度门，不另算运行态。每态记录日常基线、谁先让位、故障如何隔离、如何还场和重启门，不新增批准、现场测试、责任主体或运行成绩。
- Added one authoritative ordinary–verification–fault–recovery operating sequence per area to `key-area-evidence-matrix.json`: three differentiated sections and twelve G0 concept states. Any future approved bounded co-test is only a maturity gate before verification, not another operating state. Each state records the protected baseline, what yields first, fault isolation, restoration, and the restart gate; no approval, field test, accountable owner, or operating result is added.
- 同步双语主稿、指标、SVG/PNG、离线 HTML、A3/A0、manifest 与权利台账；临时边界、`not_fully_cleared`、0 现场核验和 0 已知结果边界保持不变。
- Synchronized the bilingual proposals, metrics, SVG/PNG, offline HTML, A3/A0, manifest, and rights ledger. Provisional geometry, `not_fully_cleared`, zero field checks, and zero known results remain unchanged.

## v2.7 - 2026-08-10

**T-02 G0 synthetic governance replay / T-02 G0 合成治理回放**

- 将既有 T-02 离线企业服务基线升级为严格机器合同，新增 10 个无个人信息合成夹具、零依赖 Node.js 22.x 回放器和确定性结果。默认与 `--check` 只读，只有显式 `--write` 写入结果；来源 ID 必须在冻结闭包内，未知字段、未知枚举和未知请求均 fail-closed。
- Upgraded the existing T-02 offline enterprise-service baseline into a strict machine contract with 10 PII-free synthetic fixtures, a zero-dependency Node.js 22.x runner, and a deterministic result. Default and `--check` modes are read-only; only explicit `--write` writes the result. Source IDs must remain in the frozen closure, and unknown fields, enums, and requests fail closed.
- 1 次合成治理回放取得 10/10 决策精确匹配；4/4 个不同的已声明停止事件均精确映射到各自恢复动作；13/13 负向变异控制覆盖样例/合同未知字段、枚举、合同回答模式漂移、来源闭包、禁采数据优先级、canonical RACI 闭包、现实服务授权与摘要计数篡改。该结果只证明 G0 合同逻辑可复放，不生成实质回答，也不调用模型、API 或现实服务。
- One synthetic governance replay produced 10/10 exact decision matches. All four distinct declared stop events map to their exact recovery actions, and 13/13 negative mutation controls cover unknown fixture/contract fields, enums, answer-mode drift, source closure, prohibited-data precedence, canonical RACI closure, real-service authorization, and summary-count tampering. The result proves only replayable G0 contract logic; it produces no substantive answer and calls no model, API, or real service.
- 回放证据同步至 G1-011、JZ-05/T-02、PARITY-002、假设、指标、矩阵、双语正文、离线 HTML、视觉首页、自检、agent 与权利披露。实质回答、模型/API/现实服务/现场交互、审批、已确认责任主体、现实独立复测、现实非 AI 同权与 G1 结果保持 0 或 unknown；当前门级仍为 G0，总体权利状态仍为 `not_fully_cleared`。
- Synchronized the replay evidence across G1-011, JZ-05/T-02, PARITY-002, assumptions, metrics, matrices, bilingual prose, offline HTML, visual homepages, self-check, agent provenance, and rights disclosures. Substantive answers, model/API/real-service/field interactions, approvals, confirmed accountable parties, real independent retests, real non-AI parity, and G1 outcomes remain 0 or unknown. The gate stays G0 and overall rights remain `not_fully_cleared`.

## v2.6 - 2026-08-10

**Source–asset–rights evidence loop / 来源—资产—权利证据闭环**

- 新增 `source-rights-evidence.schema.json` 与实例：29/29 条来源具有稳定反向指针，10 个仓库来源固定到审计 HEAD 的 Git object，4 个网页保留包外抓取摘要，15 个网页明确无内容摘要；缺失发布日期、原始格式或条款时保持 unknown，不以 URL 或文件名推断冒充核验。
- Added a schema and instance for source-rights evidence: all 29 sources have stable reverse pointers; 10 repository sources are fixed to Git objects at the audited HEAD, four web sources retain external capture digests, and 15 web sources explicitly have no content digest. Missing dates, original formats, or terms stay unknown rather than being promoted from locator inference.
- 仅对 `geometry/constraints.geojson` 的既有 120 个 OSM 要素补入 `source_id=OSM-CONTEXT`，不改坐标、图层、名称、way ID 或设计内容；element-level 记录保留署名，并明确固定查询与快照摘要缺失，`RIGHTS-OPEN-03` 继续为 P0 open。
- Added `source_id=OSM-CONTEXT` to the existing 120 OSM features in `geometry/constraints.geojson` without changing coordinates, layers, names, way IDs, or design content. Element-level records retain attribution and disclose the missing fixed query and snapshot digest; `RIGHTS-OPEN-03` remains P0 open.
- 保留原 5 个权利粗组作为兼容视图，并新增与最终 manifest 严格等集的 62 条逐文件记录，逐项串联来源、父资产、工具、嵌入组件、配方状态、审计状态、摘要与未决事项。manifest 和 ledger 两个不可自引用项使用 null + 原因，其余摘要必须等于最终 manifest。
- Retained the five coarse rights groups as a compatibility view and added 62 file-level records equal to the final manifest path set, linking sources, parents, tools, embedded components, recipe state, review state, digests, and open items. Manifest and ledger use null plus explicit self-reference reasons; every other digest must equal the final manifest.
- 补充稳定工具 ID 与输出映射；更正字体事实为“四份 PDF 内含 Noto 子集程序、A3 引用未嵌入 Helvetica、SVG 转 PNG 的实际解析字体未知”，不再把“未提供独立源字体文件”误写成“包内没有字体二进制”。
- Added stable tool IDs and output mappings. Corrected the font facts to embedded Noto subset programs in all four PDFs, unembedded Helvetica references in A3, and unknown concrete font resolution during SVG-to-PNG rasterization; no longer conflates absence of a standalone source-font file with absence of embedded font programs.
- 总体状态继续为 `not_fully_cleared`，独立逐文件清权审计完成数仍为 0，P0 `RIGHTS-OPEN-01/02/03` 全部 open，公共或专业复用继续 `blocked_pending_terms_and_audit`。任何 schema、路径覆盖或验证 PASS 只表示披露可审计，不表示许可已取得。
- Overall status remains `not_fully_cleared`, completed independent file-level clearance audits remain 0, P0 `RIGHTS-OPEN-01/02/03` all remain open, and public or professional reuse remains `blocked_pending_terms_and_audit`. Schema, path coverage, or validation PASS proves auditability only, not permission.

## v2.5 - 2026-08-10

**Key-area spatial-reading integration / 重点区空间读法整合**

- 新增中英文可编辑 SVG 与确定性 PNG，以既有 `PROV` / `PUBLIC` / `I-GATE` / `AI-ZONE` / `SCENE` ID 深化三处临时重点区，并展示三层关系、连续非 AI / 无障碍路径、人工交接、停止/恢复、可撤回叠层与四种模式。
- 在双语正文和离线视觉首页配对整合两组图件；每处重点区仅新增一段“图面读法 / 尚缺资料”，不重复完整矩阵。
- All bilingual editable SVG and deterministic PNG deepen the three provisional areas using only existing `PROV` / `PUBLIC` / `I-GATE` / `AI-ZONE` / `SCENE` IDs, with three-layer relationships, continuous non-AI / accessible routes, staffed handoff, stop/recovery, removable overlays, and four modes.
- Both figure pairs are integrated into the bilingual proposal and offline visual indexes; each key area gains only one reading/missing-evidence paragraph, without duplicating the complete matrix.
- 所有图面仍不按比例、临时且为 G0；批准、现场审计、测试执行和已知结果均为 0，权利状态仍为 `not_fully_cleared`。geometry、metrics 与规划内容未改；未新增项目、节点、路线、地块、伙伴、批准、现场或运营结果。
- All diagrams remain not to scale, provisional, and G0; approvals, field audits, test executions, and known results remain 0, and rights remain `not_fully_cleared`. Geometry, metrics, and planning content are unchanged; no projects, nodes, routes, parcels, partners, approvals, field results, or operating results are added.

**PDF and package-evidence integration / PDF 与包证据整合**

- 将八组双语 PNG 展示对（包含新增的重点区剖面展示对）与两组双语 SVG 可编辑源对纳入最终包合同；manifest 现覆盖 60 个路径/59 个非 manifest 内容文件，权利台账按相同路径集合逐项归组。新增 SVG 只补足两组重点区图件的可编辑源，不代表其他 PNG/PDF 已具有完整可编辑布局源，也不将 `not_fully_cleared` 或 0 次独立逐文件审计升级。
- Integrated eight bilingual PNG display pairs, including the new key-area-sections pair, plus two bilingual SVG editable-source pairs into the final package contract. The manifest now covers 60 paths / 59 non-manifest content files, and the rights ledger groups the identical path set once each. These SVGs provide editable sources only for the two key-area figure pairs; they do not complete editable-layout coverage for the other PNG/PDF outputs or upgrade `not_fully_cleared` and 0 independent file-level audits.
- 用最终正文和八组 1800×1100 图件离线重生四份 PDF：为避免整板缩放掩盖小字，中文/英文 A3 将每组图件拆为三个带 30px 重叠的 620×892 竖向细节页，分别为 33/36 页；双语 A0 各 8 页并保留整板总览。A3 两种语言各含 8 组/24 个裁片且不再嵌入 1800×1100 整图，有效最小文字指标分别为 10.865pt/9.297pt，live text 不低于 9pt，443/443 个逻辑块可搜索。最终 pass A 与独立 pass B 在新 Python 进程运行且四份 PDF 逐文件字节相同；SHA-256 分别为 `a1364afa…73d2`, `2ac3cc0c…e7dd`, `77bcce2d…`, `53ac76d1…`。生成工具为 Python 3.13.12、ReportLab 5.0.0、fontTools 4.63.0、PyMuPDF 1.27.2.3 与 Pillow 12.2.0；页面、顺序、字体、裁片覆盖和内容边界 QA 覆盖全部 85 页。
- Regenerated all four PDFs offline from the final narratives and eight 1800 × 1100 figure pairs. To prevent whole-board scaling from hiding small evidence text, every figure in the Chinese/English A3 booklet is split into three 620 × 892 portrait detail panels with 30 px overlap, producing 33/36 pages; both A0 languages retain eight whole-board overview pages. Each A3 language now contains 8 sets/24 crops and no embedded 1800 × 1100 whole-board image; the minimum effective text metrics are 10.865 pt/9.297 pt, live text stays at or above 9 pt, and 443/443 logical blocks are searchable. Final pass A and independent pass B ran in fresh Python processes and all four PDFs are byte-identical file by file; their SHA-256 values begin `a1364afa…73d2`, `2ac3cc0c…e7dd`, `77bcce2d…`, and `53ac76d1…`. The actual toolchain was Python 3.13.12, ReportLab 5.0.0, fontTools 4.63.0, PyMuPDF 1.27.2.3, and Pillow 12.2.0; page, order, font, crop-coverage, and content-bound QA covered all 85 pages.
- A3/PDF 文字由旧 Arial Unicode MS 路径替换为 `NotoSansSC-VF.ttf` 的确定性 400/700 内存实例与嵌入子集；记录源版本 `2.04;241114210130;non-release`、SHA-256 `76314658…074a` 和本地 name table 的 SIL OFL 1.1 声明，且不随包分发字体二进制。该元数据记录不等于独立许可合规结论。
- Replaced the prior Arial Unicode MS path with deterministic in-memory 400/700 instances and embedded subsets from `NotoSansSC-VF.ttf`; recorded source version `2.04;241114210130;non-release`, SHA-256 `76314658…074a`, and the local name table's SIL OFL 1.1 declaration, without shipping the font binary. This metadata record is not an independent license-compliance conclusion.
- 本轮只整合展示与包证据；只读 Git 对比确认 `geometry/*.geojson` 与 `metrics.json` 的 Git blobs 未变。最终 PR head 的 trusted CI 与维护者人工内容、视觉、版权审查仍未发生，不能由本日志预先勾选。
- This increment integrates presentation and package evidence only; a read-only Git comparison confirms that the Git blobs for `geometry/*.geojson` and `metrics.json` did not change. Trusted CI on the final PR head and maintainer human content, visual, and rights reviews have not occurred and are not pre-claimed here.

## v2.4 - 2026-08-09

**Skill contract alignment and publication QA / Skill 合同对齐与发布质量复核**

### 已采纳 / Accepted

- 将 #998 的三处重点区证据交叉表纳入同一完整增量；三条记录只证明映射字段齐全，不证明现场覆盖、责任主体确认、批准、测试或结果。
- 按最新投稿 skill 补齐必需指标族：九类用地代码面积、三期面积、三处临时重点区面积；建筑密度与道路比例因正式资料缺失而明确保持待补，不用体量原型或道路中心线代替。
- 同步主线 `provisional_boundaries_basis.md` 的空间不确定性：OSM 背景核查与临时总体范围的 0% 相交和约 412.5 m 最近距离不裁决边界正误，也不触发非官方改线。
- 将当时已有的双语主稿、HTML、视觉首页、A3/A0 和文字图件在 manifest 中全部标为必交；本轮新增重点区剖面 PNG 对与两组 SVG 可编辑源对后，最终合同为八组双语 PNG 展示对、两组双语 SVG 可编辑源对，中英文主张、指标和限制保持配对。
- 补齐来源采集方法、时空覆盖、复用边界、转换和已知限制；中央来源使用稳定 ID，来源新鲜度策略仍不把访问日期写成完成刷新审计。
- 重排中英文 A0，使每张 1800×1100 核心板图占据 A0 主要安全版心；图件放大不提升数据精度或现实成熟度。
- 刷新 agent/toolchain 披露和 checked-in `self_check.json`，消除旧包体积、旧指标数量和旧变更清单快照。

### 未采纳 / Not adopted

- 未新增第四套“全包总矩阵”；现有 compliance、standard、design-depth、pilot-readiness 与 key-area crosswalk 已分别承担任务、专业深度、交接门和重点区证据职责，重复矩阵会增加漂移风险。
- 未将同行方案的具体命名、代码、JSON 结构或图形资产复制进本包；只使用公开评审中可复述的抽象方法，并保留各自许可边界。
- 未把临时 geometry、公开背景、机器 PASS、字段覆盖率或本地生成记录写成官方红线、法定指标、合作承诺、现场成果或发布许可。

### 仍待外部完成 / Still external or pending

- 官方 polygon、现状测绘、权属、控规、道路/铁路/水务/文保/市政/消防条件到位后，完成差异比对与 EPSG:4548 全量复算。
- 责任主体、审批、参与者保护、场地时窗和独立复测条件成立后，才可执行 G1；当前全部场景仍为 G0，现实执行与已知结果均为 0。
- 权利状态继续为 `not_fully_cleared`；完整 `COMMUNITY-DISPLAY-ONLY` 条款、OSM ODbL 处理、PDF 字体与工具输出、Logo/商标和可编辑源仍需独立复核。
- 当前增量的本地门槛与最终 trusted `submission-validation` 必须在最终字节、最终 manifest 和最终 PR head 上重新运行；不得继承历史快照的勾选状态。

## English summary

- Consolidates the #998 key-area crosswalk into one complete increment without treating documentation coverage as field evidence.
- Completes required metric families while keeping unsupported density, road, statutory, and operational values pending.
- Carries the main-branch boundary cross-check as uncertainty evidence only; it neither proves an error nor authorizes a replacement boundary.
- Makes every bilingual counterpart required, normalizes source provenance, enlarges the A0 boards to a usable safe frame, and refreshes tool/self-check records.
- Adds no approval, partner, funding, construction, operation, test, rights-clearance, or trusted-CI result. All scenes remain G0 and public/professional reuse remains blocked pending the stated rights work.
