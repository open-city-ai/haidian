# 版权与生成披露声明

## 逐文件权利台账：`visual/assets/rights_ledger.json`

**本包的权利声明不是一段话，是一个逐文件枚举的机读文件。** `visual/assets/rights_ledger.json` 为随包的**每一个文件**给出来源、生成方式、是否含第三方内容、许可、清权类别，以及——这一项与常见台账不同——**评审如何自行核验这一条**。

<!-- LEDGER:BEGIN -->
它由 `analysis/build_rights_ledger.py` 从 `manifest.json` 生成，而不是手写的资产分组清单。差别是实质性的：手写的台账枚举「作者记得的资产」，生成的台账枚举「实际随包的文件」，任一文件没有权利归类即**构建失败**。当前 **158 个文件全部归类**：

| 清权类别 | 文件数 | 含义 |
|---|---|---|
| `author-originated` | 135 | 本方案原创，无第三方内容 |
| `provisional-only-with-stated-limit` | 9 | 九个 GeoJSON 图层，派生自仓库临时边界，限制已写明 |
| `author-originated-measurement` | 8 | 对仓库公开元数据的自采统计，定级 background_only |
| `author-originated-with-embedded-fonts` | 4 | A3/A0 PDF，含字体子集（见下） |
| `third-party-open-data-redistributed` | 2 | osm_reference.json 与 osm_fabric.json 中的 OSM 派生读数，ODbL 1.0 |

**有一个文件这份台账覆盖不到，写在这里而不是留作沉默的缺口：** `manifest.json` 不携带自身的 sha256——一个文件无法包含自己的哈希。因此本包「每个随包文件的 git-blob 摘要都与 manifest 相符」这一说法，结构上唯一覆盖不到的就是 manifest 本身；它的完整性由提交历史与 PR diff 承担。

下面这段计数本身也是生成的。此前它是手打的，于是包增加了三个文件之后，正文写 77 而台账是 80——由 PR #1065 的评审 @147228 复读发现。**一份用来防止手工计数漂移的台账，其说明文字的计数是手工的**，这是本包记录在案的同型缺陷之一。
<!-- LEDGER:END -->

## 唯一的第三方数据再分发

`visual/assets/osm_reference.json` 内含经 Overpass API 提取的 **275 个 OpenStreetMap 顶点**：2 条遗址公园边界环、16 条铁路 way 的原始坐标与标签，未简化，保留原始 way id 以便追溯。

- 署名：**© OpenStreetMap contributors**
- 许可：**ODbL 1.0**。提取子集构成 ODbL 意义上的**派生数据库**，因此本包该部分数据以相同许可提供。
- 核验：`node visual/assets/check_osm.js` 从这些坐标重算全部十个已发布标量。

**此前本包只提交由 OSM 派生的测量结果，声明为「不再分发原始数据库」。** 为使 412.5 m 这个头号读数可被评审复算，本版开始随包提交原始坐标——**那一刻该声明即不成立**，已在此处与 `sources.json` 中一并改正。许可声明必须跟着包的内容走，不能跟着包最初的意图走。

## 字体

字体不出现在文件清单里，但被嵌入每一份 PDF 再分发，因此单列：

| 字体 | 用途 | 作者 | 许可 | 允许嵌入 | 核验方式 |
|---|---|---|---|---|---|
| Noto Sans CJK SC | 全部中文与多数西文 | Google / Adobe | **SIL Open Font License 1.1** | 是 | `pypdf` 读每页 `/Resources /Font` 下 `DescendantFonts` 的 `/FontFile3` |
| DejaVu Sans | Noto CJK 缺失字形的兜底（箭头与部分符号） | DejaVu 项目（Bitstream Vera 衍生） | **DejaVu Fonts License** | 是 | 同上 |

四份 PDF 均已通过嵌入检查，无缺字风险。

## 生成方法披露

本方案由 **Claude Opus 5**（Claude Code）生成，模型标识 `claude-opus-5`，`model_family` 为 `claude`，均已写入 `agent.json`。人类贡献者 jiangmuran 提出参赛意图、选定赛道，并在推送前审阅。

全部产出确定性生成。生成链：几何 `build_geometry.py`、指标 `recompute_metrics.py`、场景卡 `build_scenario_cards.py`、空白表 `build_gap_table.py`、图纸 `figures.py` 与十二个 `fig_*.py`、A3/A0 `build_drawings.py`、离线可视化 `build_visual.py` 与 `build_visual_en.py`、HTML 报告 `render_proposal_html.py`、语料普查 `census.py` / `field_map.py` / `track_scan.py` / `census_history.py` / `manifest_schema_survey.py`、本台账 `build_rights_ledger.py`，以及五道 QA 闸门与统一构建 `build_all.py`。

**这些脚本无法随包提交**：入库格式白名单在 `visual/assets/` 下只接受 `.css/.jpeg/.jpg/.js/.json/.png/.svg/.webp`，且提交目录本身有白名单，`.py` 在包内任何位置都不被接受。这一点是实测确认的，不是推断——把一个 `.py` 放进去，确定性校验会以该条规则拒绝。脚本已在配套 Issue 中公开，其数据产物随包提交于 `visual/assets/`。

**因此本包随包提交的可执行物是五个无依赖的 `.js` 校验器**，评审可直接运行：

| 文件 | 作用 |
|---|---|
| `verify.js` | 独立重算九项一类指标，并断言十余条结构性结论（含 7,157 点逐点验证用地剖分） |
| `check_osm.js` | 从随包 OSM 坐标重算全部场地复核数值 |
| `check_cards.js` | 逐张场景卡解析水准点、空间锚点、退出量与执行角色；`--selftest` 用八份改坏的卡片证明检查会拒绝 |
| `check_closure.js` | 闭合差机制的数据契约读取器 |
| `run_s08_tabletop.js` | 十例桌面演练（2 接受 / 8 拒绝） |

这一格式限制本身已作为发现上报：**一个奖励可复算的评审体系，其提交格式却无法承载使复算成为可能的代码。**

## 明确不含

未授权字体；外部图片与照片；商标与企业标识；人物肖像；非公开地图、瓦片或测绘成果；个人隐私信息；任何来自其他参赛方案的文本或图形；任何远程加载的资源（`report/*.html` 与 `visual/index*.html` 完全离线自包含，不请求任何外部资源，正文中出现的网址为可读文本而非 `src`/`href`）。

全球案例研究均引自机构公开材料与公开报道，仅引述机制，不引用非公开数据，不编造企业名单、投资额、产值或财政承诺。

## 性质声明

本方案全部内容为开放共创的**概念建议**，供专业团队深化研究参考，不替代法定规划，不构成政府审定结论、审批依据或实施承诺。空间建议基于临时替代边界，官方 polygon 发布后须整体重算。最终判断由人类与专业团队作出。
