# 版权与权利声明 / Copyright and Rights Statement

原创责任主体 / Party responsible for originality: **MartinForReal**

本声明逐项列出提交包内每一类资产的作者或生成者、来源、许可、修改情况、署名要求与再分发权限。
凡不能从提交包自证权利的项目，在文末「未完全自证清权的项目」中单独列出，不以「已清权」表述带过。

This statement lists, per asset class, the author or generator, source, licence, modification,
attribution requirement and redistribution right. Anything that cannot be self-evidenced from the
package is listed separately under "Items not fully self-cleared" rather than asserted as cleared.

## 逐项权利矩阵 / Item-by-item rights matrix

| 项目 Item | 作者/生成者 Author or generator | 来源 Source | 许可 Licence | 修改 Modification | 署名 Attribution | 再分发 Redistribution |
|---|---|---|---|---|---|---|
| 正文 `proposal.md` / `proposal.en.md` | Claude Opus 5 (1M context) via Claude Code；责任主体 MartinForReal | 原创 Original | 提交方保留著作权，授权征集方按征集规则使用 | 全文由 `.harness/build_proposal.py` 生成 | MartinForReal | 允许征集方按征集规则使用 |
| 几何 `geometry/*.geojson`（9 层） | `.harness/flownet.py` 计算生成 | 派生自组织方 provisional site package 与本方案求解 | 组织方公开资料；派生结果著作权归提交方 | EPSG:4326↔4548 转换、流网络求解、Voronoi 剖分 | MartinForReal；须注明边界为 provisional | 允许，须保留 provisional 限定 |
| 图件 `assets/figures/*.png`（10 张） | `.harness/build_visuals.py`（matplotlib） | 全部由本包提交的 GeoJSON 直接绘制 | 原创 | 无外部底图、无图库素材、无第三方图标 | MartinForReal | 允许 |
| 图纸 `drawings/*.pdf`（4 份） | 同上，matplotlib PDF 后端 | 同上 | 原创 | 同上 | MartinForReal | 允许 |
| 网页 `report/*.html`、`visual/*.html` | 本方案代码生成 | 原创 | 原创 | 无 CDN、无远程瓦片、无外部脚本、无外部字体、无 iframe、无表单提交 | MartinForReal | 允许 |
| 底图 Basemap | — | **未使用任何底图或地图瓦片** | 不适用 | 不适用 | 不适用 | 不适用 |
| 图标 Icons | — | **未使用任何第三方图标** | 不适用 | 不适用 | 不适用 | 不适用 |
| 字体 Fonts | 见下方「未完全自证清权的项目」 | Microsoft YaHei / SimHei（系统安装）；回退 DejaVu Sans | 专有 / Bitstream Vera 类 | 字形以栅格与子集形式进入 PNG 与 PDF | 依字体授权 | **未自证** |
| 数据 Data | 组织方 provisional site package 与本方案复算 | `brief/site-package/`，逐条登记于 `sources.json` | 公开资料；使用范围逐条见 `usable_for` / `not_usable_for` | 面积与比例均按 EPSG:4548 复算 | 见 `sources.json` | 见 `sources.json` |
| 代码 Code | MartinForReal（`.harness/`） | 原创 | 提交方保留；**未随包提交** | — | MartinForReal | 不适用（未提交） |
| 依赖库 Libraries | 第三方开源 | matplotlib 3.11.1 / NumPy 2.4.3 / SciPy 1.18.0 / Shapely 2.1.2 | Matplotlib License（BSD 类）、BSD-3-Clause ×3 | 未修改库代码 | 依各库许可 | 均允许再分发生成物 |
| 生成工具 Generation tool | Claude Opus 5 (1M context) via Claude Code | Anthropic | 工具生成物的责任主体为 MartinForReal | — | MartinForReal | 允许 |
| 第三方文献 Third-party literature | 各出版方 | `sources.json` 共 30 条 | 仅引用题名、DOI/URL 与出版信息 | **未复制原文、未复制原图、未复制表格** | 见各条 `citation` | 不适用（未复制内容） |

## 未完全自证清权的项目 / Items not fully self-cleared

**字体 Fonts.** 图件与 PDF 使用 `Microsoft YaHei`、`SimHei`（随 Windows 授权的专有中文字体），
回退 `DejaVu Sans`。中文字形以栅格与子集形式嵌入 PNG 与 PDF，本包无法仅凭自身证明该嵌入形式的
再分发权利范围。**因此本项不声明为已清权。** 若组织方要求完全开放许可的字体，可改用
Noto Sans CJK SC（SIL OFL 1.1）整体重渲染：全部图件、PDF 与网页均由 `.harness/build_visuals.py`
程序生成，重渲染只改变字形，不改变任何几何、指标、结论或图位。

The figures and PDFs use `Microsoft YaHei` / `SimHei` (proprietary CJK fonts licensed with Windows),
falling back to `DejaVu Sans`. CJK glyphs are rasterised and subset-embedded into the PNGs and PDFs,
and the package cannot self-evidence the redistribution scope of that embedding. **This item is
therefore NOT declared cleared.** If a fully open-licensed font is required, the whole set can be
re-rendered with Noto Sans CJK SC (SIL OFL 1.1): every figure, PDF and HTML page is program-generated
by `.harness/build_visuals.py`, so re-rendering changes glyphs only — no geometry, metric, conclusion
or figure position changes.

## 合规声明 / Compliance declarations

- 未提交涉密、内部、个人隐私或非公开空间数据。
- 未伪造官方背书、审批结论、控规结论或实施承诺。沿线街区控规为「通过技术审查」而非获批，
  本包不据此推定任何法定控制指标。
- 场地边界为 provisional，不得作为官方红线或精确面积依据。
- 空间落地、活动运营、品牌传播与政策机制均为概念建议，供专业团队深化研究，
  不替代正式规划，不构成政府审定结论。
- 文中出现的机构名称均为**建议**的责任分工，不构成任何已达成的合作安排。
- 未编造企业名单、投资额、产值或财政承诺；试点成本仅给类别，不给金额。
- HTML 页面不依赖 CDN、远程地图瓦片、外部脚本、外部字体、API 请求、iframe 或表单提交。
