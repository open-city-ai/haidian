# 应征方案著作权声明

方案名称：九章方洲·京张智原 (JZC-9C) —— 百年京张AI创新带城市设计方案
方案版本：v4.3（review-close-out，2026-08-31 第三轮修订）

提交目录：submissions/li-zhaojun/jiuzhang-fangzhou-ai-belt

## 第三方许可 notice 索引（v4.3 第三轮闭合，OFL + ODbL + MIT/BSD/PSF）

| 第三方成分 | 许可 | 适用对象 | 义务履行路径 |
|---|---|---|---|
| **Noto Sans SC（嵌入子集）** | SIL Open Font License 1.1（OFL 1.1） | 4 份 A0/A3 PDF 嵌入字体子集 | `visual/assets/rights-registry.json` 中 4 PDF 条目 `rights_basis` 字段注明 `embedded-SIL-OFL-1.1-font-subset`；`disposition=COMMUNITY-DISPLAY-ONLY`；OFL 1.1 要求的署名（"Noto Sans SC" + Copyright © 2014-2021 Adobe）已在 PDF 元数据 `Author`/`Subject` 字段与本声明 §5 中给出；嵌入子集不作为独立文件分发 |
| **OSM 衍生数据** | Open Database License 1.0（ODbL） | `global_comparison.png` / `persona_heatmap.png`（包内 2 张图使用 OSM 衍生背景）；OSMnx 真实路网层（10447 条边，已存档至 `li-zhaojun-archive/osm_roads_real.geojson`，不在主提交包内） | ODbL §4 要求的"包含 attribution"——`visual/assets/rights-registry.json` 中含图条目 `rights_basis` 注明 `OSM-derived-ODbL-attribution-required`；图内 / 图侧 OSM 贡献者署名由 OpenStreetMap 官方链接提供；share-alike 义务仅约束 OSM 衍生数据库本身，本提交包内仅以图像形式引用 OSM 衍生信息，未派生独立数据库，故 share-alike 不在交付物层面触发 |
| **three.js / matplotlib 等开源库** | MIT / BSD-3-Clause / PSF | 4 份 HTML（`visual/index.html`、`visual/index.en.html`、`report/proposal.html`、`report/proposal.en.html`）以 URL 引用 | 仅 URL 链接引用，未内嵌分发，无需附许可文本；MIT / BSD-3-Clause / PSF 各自的署名已在 HTML `<head>` 中标注 |
| **公共知识（九章算术 / 京张铁路）** | 公有领域 | 命名「九章方洲·京张智原」 | `assumptions.json` A-CONCEPT-011 / A-COPYRIGHT-013 已声明 |

> **v4.3 第三轮闭合说明**：OFL notice（Noto Sans SC 子集）+ ODbL notice（OSM 衍生图）已在仓库内通过 `rights-registry.json` 路径可见；本声明提供完整文字索引以便评审者交叉核对。

## 逐路径权利登记（per-path rights registry）

**v4.3 新增**：本方案的全部交付物（61 个文件）已在 `visual/assets/rights-registry.json` 中按文件级登记 `sha256 / asset_category / rights_basis / disposition / redistribution_allowed / contains_third_party`。处置分布：
- **COMMUNITY-DISPLAY-ONLY**（57 个文件）：本次社区评审展示 + 仓库归档 + 翻译；不用于商业化或法定背书。其中 4 份 A0/A3 PDF 嵌入 Noto Sans SC 字体子集（OFL 1.1，可重分发；OFL 署名义务适用于该嵌入子集，见各 PDF 条目 rights_basis，子集不作为独立文件分发）；2 张图（global_comparison.png / persona_heatmap.png）含 OSM 衍生数据，须保留 OpenStreetMap 贡献者署名（ODbL share-alike 义务适用于该等图内数据）
- **MIT/BSD/PSF 第三方链接引用**（4 个 HTML 文件）：three.js / matplotlib 等开源库以 URL 引用，未内嵌分发

如发现权利问题，相关素材将在收到通知后立即替换或移除。

## 自报声明（author declaration）

作者 li-zhaojun 在提交时确认：除明确标注 COMMUNITY-DISPLAY-ONLY 的资源仅限本次社区展示外，其余自创内容（proposal.md 文本、几何、设计证据、HTML 报告与可视化）在保留署名前提下允许本次征集组织者用于评审展示、归档、翻译与公开复用。

## 其他条款

1. 本方案全部文本、GeoJSON 几何、指标、矩阵、图纸（A3/A0 PDF）、图片与离线可视化页面由 AI 智能体（minimax m3 via Claude Agent SDK，操作者 GitHub 账号 li-zhaojun）生成，生成方式与自检记录见 agent.json、self_check.json、manifest.json、visual/assets/rights-registry.json。

2. 在逐路径权利登记（visual/assets/rights-registry.json）覆盖范围内，截至本声明日期，作者未发现本包交付物中存在未经授权的商标、字体、图片、人物肖像、论文图像或其他版权材料；该判断基于创作与检索阶段的有限尽职调查，不构成最终法律清权结论，亦不排除日后发现遗漏或异议的可能；第三方素材（OSM 衍生数据按 ODbL 署名、嵌入的 Noto Sans SC 字体子集按 OFL 1.1、HTML 引用的 MIT/BSD/PSF 库按各自许可）均已在登记中标明权利基础与处置。引用的官方公告与规范以其官方页面为准，发现异议后将在收到通知后立即替换或移除相关素材。

3. 概念文化引用说明：本方案命名「九章方洲·京张智原」中「九章」取自《九章算术》公共知识（无版权保护期已过），「京张」指京张铁路百年文脉（公共知识引用），「方洲」取自空间网格化概念；不涉及任何已注册商标或受保护素材，详见 assumptions.json 中 A-CONCEPT-011 与 A-COPYRIGHT-013。

4. AI 生成概念图披露：assets/figures/jzc9c-0*.png 共 4 张概念渲染图（已迁移至 li-zhaojun-archive/ai_renders/ 存档，不在本提交目录内）由 gpt-image-2 (经 APIPro 海外入口 api.apipro.ai 中转) 通过 /v1/images/generations 接口生成，分辨率 1536×1024；每个 prompt 严格遵循 6-part 最佳实践结构；明确标注 ai_generated=true，避免与真实建成影像混淆。

5. 字体与 PDF 渲染（v4.3 第三轮修订）：A0/A3 PDF（中/英各 2 份，共 4 份）经 reportlab 嵌入 Noto Sans SC 子集（SIL OFL 1.1，可重分发；由可变字体 NotoSansSC-VF.ttf 实例化 wght=400 后子集化，覆盖 1298 个码位，含全部渲染所需 CJK / CJK 标点 / 全角符号，嵌入名 NotoSansSC-Thin），ASCII 字符走 PDF 基 14 字 Helvetica；不依赖 STSong-Light 或其他 CID 字体路径，不再使用 msyh.ttc（仅个人使用，不可再分发）。已用 PyMuPDF 逐页提取文本 × 子集 cmap 交叉核对，4 份 PDF 的 CJK/全角缺失字符均为 0（无豆腐块、无替换符）。HTML 使用系统字体栈（Noto Sans SC / Microsoft YaHei / PingFang / sans-serif 回退）。徽标与全部图形为本包原创 SVG/matplotlib 构造；生成链为确定性 Python 管道（pyproj/shapely/matplotlib/osmnx/reportlab/PIL，开源许可），生成脚本口径已在 metrics.json formula 字段与 changelog.md 中披露。OSMnx 真实路网层（10447 条边）已存档至 li-zhaojun-archive/osm_roads_real.geojson，仅作数据校核使用，未纳入正式提交包。

6. 临时粗略边界来自本仓库 brief/site-package/geometry/provisional_boundaries.geojson，仅用于生成、展示与自检，不作为官方红线或精确面积依据（proposal.md 顶部与 assumptions.json A-BOUNDARY-001 均有声明）。

7. 本方案以 COMMUNITY-DISPLAY-ONLY 许可在社区平台公开：允许社区阅读、评价与反馈；不用于商业转售；如主办方需按公告知识产权条款使用本方案内容，操作者愿依公告约定配合。

8. 本社区开源征集平台不是征集主办方的官方报名或应征通道；本方案为开放共创建议，不替代正式规划，不构成政府审定结论或任何形式的实施承诺（见 boundary_clause_zh）。

9. 因本方案内容引发的知识产权争议由提交者负责澄清与处理；发现侵权风险请通过仓库 Issue 联系删除或修正。

声明日期：2026-08-31（v4.3 第三轮修订）
原声明日期：2026-08-27
