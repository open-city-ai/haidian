# 版权与权利声明（逐资产审计）/ Copyright & Rights Statement (asset-by-asset)

**投稿**：submissions/24768Yan/jingzhang-ai-pulse（PR #2610）
**版本**：v2.3（2026-08-15）
**说明**：本声明逐项列出投稿包内全部生成资产的权利状态。凡标 `pending` 的资产，在完成正式权利审查前仅限评审内部查看，不得用于正式发布或国际传播。

## 1. 图形资产（assets/figures/*.png，共 12 张）

| 资产 | 生成方式 | 作者/工具 | 许可状态 | 嵌入/再分发 |
|---|---|---|---|---|
| site-overview.png / .en.png | matplotlib 程序绘制（render_figures.py） | WorkBuddy Agent 原创代码生成 | original-work（本投稿原创） | 允许（随投稿包分发） |
| land-use-structure.png / .en.png | 同上 | 同上 | original-work | 允许 |
| key-areas.png / .en.png | 同上 | 同上 | original-work | 允许 |
| mobility-bluegreen.png / .en.png | 同上 | 同上 | original-work | 允许 |
| metrics-evidence.png / .en.png | 同上 | 同上 | original-work | 允许 |
| logo-design.png / .en.png | matplotlib 程序绘制（render_logo.py，v2.3 新增） | WorkBuddy Agent 原创概念与代码生成 | original-work（概念见 proposal 附录A；图形为程序原创，无第三方素材） | 允许 |

以上图形均由投稿方代码从零绘制，不包含照片、扫描件或任何第三方位图/矢量素材；不使用 AI 文生图服务。

## 2. 字体

| 字体 | 使用位置 | 许可 | 嵌入/再分发 |
|---|---|---|---|
| Noto Sans SC（思源黑体，Variable [wght] 及其实例 400/700、子集化 WOFF2） | v2.3 起全部中文图件、A3/A0 PDF、HTML/visual 页内嵌字体 | SIL Open Font License 1.1（明确允许嵌入、子集化、再分发） | 允许（OFL 第条款；随包分发时保留本声明即可） |
| DejaVu Sans | 英文图件/PDF 文字 | Bitstream Vera / Public Domain 衍生许可 | 允许 |
| SimHei（中易黑体） | v2.2 及以前旧版图件的历史渲染字体 | **无再分发许可（proprietary）** | v2.3 起已全部替换为 Noto Sans SC，旧文件不再存在于投稿包 |

## 3. 地图与地理数据（geometry/*.geojson）

| 资产 | 来源 | 状态 |
|---|---|---|
| site_boundary.geojson | 组织方 provisional 数据（intake 提供），未做官方红线替代 | provisional——仅用于 intake 展示；官方多边形发布后须整体替换并重算 |
| key_areas / land_use / roads / green_space / public_space / buildings / constraints / phasing .geojson | 投稿方基于 provisional 边界的设计几何（程序生成） | original-work，但派生自 provisional 边界，继承 provisional 标注 |

投稿包不含任何商业地图瓦片、测绘保密数据或第三方底图；可视化页 explicitly 不加载远程瓦片。

## 4. 文档与代码

| 资产 | 权利状态 |
|---|---|
| proposal.md / proposal.en.md / report/*.html / visual/*.html | original-work（Agent 撰写与生成） |
| render_*.py、insert_*.py、push_*.py 等生成脚本 | original-work，随投稿仓库可见 |
| sources.json 中登记的外部事实来源 | 权利归原权利人；投稿仅作引用（见 sources.json 四类分级：approved / background / provisional / pending） |

## 5. Pending 事项（清权前不得正式/国际传播使用）

1. **SRC-LOGO-VISUAL-ASSETS**：v2.3 已提交程序绘制的 Logo 母版、单色版、双语组合与导视示例（assets/figures/logo-design.png / .en.png）。图形本身为原创代码绘制、无第三方素材，但"品牌可商用"结论仍待主办方确认 → 状态由 pending 调整为 provisional-original（原创可证，商用待确认）。
2. **外部事实来源复核**：sources.json 中标记 background/provisional 的产业统计、客流、历史资料等，仅作背景引用，不作为正式证据；待注册表复核后升级。
3. 若正式发布需要嵌入非投稿方生成的任何补充素材（照片、航拍等），须逐项补充许可证明后方可加入。

## 6. 署名要求

- Noto Sans SC：Copyright 2014-2026 Google Inc. (https://fonts.google.com/specimen/Noto+Sans+SC)，SIL OFL 1.1。
- DejaVu Sans：Copyright Bitstream Vera Font contributors，许可见其发行说明。
- 其余原创资产：© 2026 投稿人（24768Yan）+ WorkBuddy Agent，随投稿包以仓库许可分发。
