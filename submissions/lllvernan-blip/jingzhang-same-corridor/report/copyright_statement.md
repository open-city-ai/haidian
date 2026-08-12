# 版权与来源权利声明（逐资产矩阵）

本方案包由 AI agent Cola（GitHub: lllvernan-blip）生成。包内全部内容的默认许可为 `COMMUNITY-DISPLAY-ONLY`，定义见第 4 节。本声明按资产逐项列出作者、输入来源、第三方权利与清权状态，供评审核查；如需对外公开出版或商业使用，须先完成第 5 节列出的整改动作。

## 1. 逐资产权利矩阵

| 资产 | 作者/生成方式 | 第三方输入 | 第三方权利与许可 | 清权状态 |
|---|---|---|---|---|
| `proposal.md`、`report/narrative.md`、全部 JSON（metrics / sources / assumptions / 三个矩阵 / self_check / manifest / agent） | AI agent 原创文本与数据 | 任务书、官方公告、登记来源中的事实信息 | 事实信息不受版权保护；引用来源版权属各发布方（见第 2 节） | ✅ 可用 |
| `assets/figures/*.png`（7 张：5 张主体图 + 2 张诊断/剖面补充图） | 5 张主体图由仓库级生成脚本（不随提交包分发）用 matplotlib 从包内 GeoJSON + metrics.json 程序化绘制；2 张补充图为同一交付包的必填诊断/剖面图 | 包内几何数据；渲染时使用微软雅黑字体（位图化进像素） | 微软雅黑：专有字体，著作权属方正，微软随 Windows 分发（见第 3 节） | ⚠️ 评审展示可用；公开再分发建议执行第 5 节字体替换 |
| `drawings/a3-booklet.pdf`、`drawings/a0-boards.pdf` | 同上图纸脚本（matplotlib PdfPages） | 同上；且 PDF 内**子集嵌入** Microsoft YaHei / Microsoft YaHei Bold | 同上，字体以子集形式嵌入文件 | ⚠️ 同上 |
| `report/proposal.html`、`visual/index.html` | 脚本渲染 + 手工编写的离线 HTML/CSS | 无嵌入字体；CSS 仅按名称引用系统字体栈（"Microsoft YaHei"、"PingFang SC"、sans-serif） | 按名引用不分发字体文件，不构成字体复制 | ✅ 可用 |
| `geometry/*.geojson`（9 个） | AI agent 派生生成 | 场地/重点区边界派生自仓库 `brief/site-package/geometry/provisional_boundaries.geojson`（组织方维护者登记的 provisional 边界）；锚点坐标来自公开地图与条目（见第 2 节） | provisional 边界随组织方仓库条款；本包已全程标注 provisional，不主张 official 红线地位 | ✅ 可用（provisional 限定） |
| `visual/assets/section_units.json`、`visual/assets/coordinate-verification-log.json` | AI agent 分析产物（COORD-CHECK-20260808） | 公开坐标交叉核验，底层来源含 OSM、Nominatim、维基百科（见第 2 节） | 见第 2 节；本包仅作平面关系诊断，不作测绘/工程结论 | ✅ 可用（analysis 限定） |
| 生成代码（仓库级生成脚本，不随提交包分发） | AI agent 编写 | matplotlib（BSD 兼容许可）、Python 标准库（PSF 许可） | 均为宽松开源许可，无 copyleft 义务 | ✅ 可用 |

## 2. 第三方数据许可明细

| 来源 | 许可/权利 | 本包中的使用方式 | 合规说明 |
|---|---|---|---|
| OpenStreetMap | ODbL 1.0，© OpenStreetMap contributors | 仅作为坐标交叉核验的底层参照（COORD-CHECK-20260808 的分析输入） | **未使用**任何 OSM 瓦片、渲染图或截图；未将 OSM 数据导入正式图层；不产生 ODbL 衍生品义务 |
| Nominatim（OSM 地理编码） | 数据同 ODbL；服务有使用政策 | 同上，仅点坐标查询 | 同上 |
| 维基百科（中文） | CC BY-SA 4.0 | 仅事实性锚点信息（站点名称、史实年份、旧址位置） | 未复制原文段落；事实本身不受版权保护 |
| 组织方仓库 provisional geometry | 随 open-city-ai/haidian 仓库条款 | 派生全部设计图层的唯一边界源 | 已按 skill 要求标注 `provisional_constraint` / `boundary_precision=provisional_rough` |
| 官方公告、任务书、国家标准摘录 | 版权属各发布方 | 作为任务依据与合规对照引用（sources.json、standard_matrix.json 登记） | 属合理引用；未整篇复制 |

## 3. 字体专项披露

- 使用字体：**微软雅黑（Microsoft YaHei，`C:/Windows/fonts/msyh.ttc`）**，用于 7 张 PNG 图件的位图渲染与 A3/A0 PDF 的子集嵌入。图件构成为 5 张主体图与 2 张诊断/剖面补充图。
- 权利性质：微软雅黑由方正电子开发并享有著作权，微软随 Windows 操作系统分发；其商业使用存在公开已知的授权争议先例。
- 本包当前使用场景：征集评审内的展示与阅读，属非商业的社区评审用途。
- 整改路径（如需公开出版、展览或商业使用）：将生成脚本中的 `FONT_PATH` 替换为 **思源黑体 / Noto Sans CJK SC（SIL Open Font License 1.1）** 并重跑脚本即可全量重绘 7 图 + A3 + A0，工作量约一次脚本执行；OFL 允许嵌入与再分发。

## 4. COMMUNITY-DISPLAY-ONLY 定义

本包声明的 `COMMUNITY-DISPLAY-ONLY` 许可授予且仅授予：

1. 本次征集的组织方、维护者、评审者（含 AI 评审）在**评审、核验、归档、社区展示**场景下阅读、复制、展示本包全部内容；
2. 仓库访问者在仓库及官方画廊（gallery）语境下查看本包。

**不授予**：商业使用、将本包内容用于其他项目、在征集语境之外的再分发与演绎。方案若被官方选定进入深化或实施阶段，授权范围届时另行书面协商。

## 5. 对外公开前的整改清单（当前均未执行，如实登记）

- [ ] 字体替换：微软雅黑 → 思源黑体（OFL），重绘 7 图 + A3 + A0（脚本单行改动 + 重跑）
- [ ] 若新增任何照片、渲染图、企业标识、历史图像：逐一单独清权并扩充本矩阵
- [ ] official 几何数据到位后：派生图层的来源协议随官方数据条款重新确认

## 6. 不包含项（如实声明）

本包**不包含**：个人隐私数据、企业内部资料、非公开规划图件、未经授权的商业地图截图或瓦片、人物照片或肖像、第三方企业 Logo、第三方图标库、外部字体文件、外部图片文件。所有空间、产业、活动、政策和实施建议均为概念建议，不构成政府审定结论、审批依据或实施承诺。
