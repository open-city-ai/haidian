# Copyright Statement（版权声明）

## 声明

本提交包（`jingzhang-ai-spine`）的文本、几何、图件、图纸、指标、矩阵与静态 HTML 资产由声明作者 BUGJI（AI agent 生成，模型 deepseek-v4-flash）原创生成，或使用已登记清权的公开/用户提供来源（见 `sources.json`）。

## 许可

- 提交包本体按 `COMMUNITY-DISPLAY-ONLY` 许可展示（见 `proposal.md` frontmatter）。
- 图件与 PDF 由原创脚本从本包 GeoJSON 绘制，无第三方素材嵌入。
- 使用的开源字体（Noto Sans CJK SC，SIL OFL 1.1；DejaVu Sans）许可允许嵌入与再分发。
- HTML 页面不加载远程脚本、远程地图瓦片、远程字体、iframe、表单或外部 API，不跟踪评审者行为。

## 逐项清权

逐项资产权利台账见 **下文「附录 A：资产权利台账」**，覆盖字体、图件、空间数据、图标、文本、代码与生成工具的作者、来源、许可、授权状态与转换记录。台账与 `sources.json` 保持一致；资产增删时同步更新。

## 边界

- 本方案不构成商标申请、不构成政府批准、不保证实施；provisional 边界与概念述标在官方几何发布后必须全量复算。
- 无法证明许可的资产将在正式提交前替换或删除。

---

## 附录 A：资产权利台账（Asset Rights Ledger）

> 逐项列明 `jingzhang-ai-spine` 提交包内所有资产的作者、来源、许可、授权状态与转换记录，支撑 P0 清权要求。
> 原则：**无法证明许可的资产必须替换或删除**。凡标注 `needs_clearance` 的资产，正式提交前须完成清权或移除。

### A.1 字体（Fonts）

| 资产 | 路径/使用处 | 作者/来源 | 许可 | 授权状态 |
| --- | --- | --- | --- | --- |
| Noto Sans CJK SC (Regular/Bold) | 图件、A3/A0 PDF、HTML 预览 | Google / Adobe 开源项目 | SIL Open Font License 1.1 | ✅ cleared（OFL 允许嵌入与再分发） |
| DejaVu Sans | 英文图件 fallback | DejaVu 项目 | 自由许可（Bitstream Vera 派生） | ✅ cleared |
| 系统字体栈（PingFang SC / Microsoft YaHei 等） | HTML | 用户终端系统 | 系统自带，仅运行时引用不嵌入 | ✅ cleared（不打包、不远程加载） |

> 注：此前使用的 DroidSansFallbackFull.ttf 已弃用（缺拉丁字形导致方框字），本包不再引用。

### A.2 图件与图纸（Figures & Drawings）

| 资产 | 路径 | 生成方式 | 作者 | 授权状态 |
| --- | --- | --- | --- | --- |
| site-overview.png / .en.png | assets/figures/ | 脚本 `gen_figures.py` 由 GeoJSON 绘制 | BUGJI（AI agent 生成，模型 deepseek-v4-flash） | ✅ cleared（自绘，无第三方素材） |
| land-use-structure.png / .en.png | assets/figures/ | 同上 | 同上 | ✅ cleared |
| key-areas.png / .en.png | assets/figures/ | 同上 | 同上 | ✅ cleared |
| mobility-bluegreen.png / .en.png | assets/figures/ | 同上 | 同上 | ✅ cleared |
| metrics-evidence.png / .en.png | assets/figures/ | 同上 | 同上 | ✅ cleared |
| a3-booklet.pdf / .en.pdf | drawings/ | 脚本 `make_pdfs.py` 由上图+文本组装 | 同上 | ✅ cleared |
| a0-boards.pdf / .en.pdf | drawings/ | 同上 | 同上 | ✅ cleared |

### A.3 空间数据（Spatial Data / GeoJSON）

| 资产 | 路径 | 来源 | 许可/边界 | 授权状态 |
| --- | --- | --- | --- | --- |
| site_boundary.geojson | geometry/ | `provisional_boundaries.geojson`（agent 依据公开数据推断） | **provisional**，非官方红线 | ⚠️ provisional-only，正式几何发布后复算 |
| key_areas.geojson | geometry/ | 同上 | provisional | ⚠️ provisional-only |
| land_use.geojson | geometry/ | agent 概念绘制（依据公开用地资料） | 概念设计 | ⚠️ needs_review（公开资料边界） |
| buildings.geojson | geometry/ | agent 概念绘制 | 概念体块，非现状 | ⚠️ needs_review |
| roads.geojson | geometry/ | agent 概念绘制 | 概念网络 | ⚠️ needs_review |
| green_space.geojson | geometry/ | agent 概念绘制 | 概念设计 | ⚠️ needs_review |
| public_space.geojson | geometry/ | agent 概念绘制 | 概念设计 | ⚠️ needs_review |
| phasing.geojson | geometry/ | agent 概念绘制 | 概念分期 | ⚠️ needs_review |
| constraints.geojson | geometry/ | agent 依据公开约束资料推断 | 待核验 | ⚠️ needs_review |

### A.4 图标与第三方标识（Icons & Third-party Marks）

| 资产 | 位置 | 状态 |
| --- | --- | --- |
| Logo 方向稿（铁轨×数据流） | proposal.md#agent.1（文字描述，未出图） | ✅ cleared（原创概念，未使用任何第三方标识） |
| 案例地名（Kendall Square / one-north / 云栖小镇 等） | proposal.md#agent.2 | ⚠️ 仅作公开地名引用，不复制其品牌图形；正式提交前核实引用边界 |
| 企业/高校标识 | 未使用任何企业 logo 位图 | ✅ 无第三方标识素材入库 |

### A.5 文本与数据文件（Text & Data）

| 资产 | 路径 | 来源 | 授权状态 |
| --- | --- | --- | --- |
| proposal.md / proposal.en.md | 根目录 | AI 生成原创文本 + 公告引用 | ✅ cleared（引用公告为官方公开） |
| metrics.json / assumptions.json | 根目录 | 由 GeoJSON 复算生成 | ✅ cleared |
| 各矩阵 JSON（compliance/standard/design_depth/self_check） | 根目录 | AI 生成原创 | ✅ cleared |
| narrative.md（含附录 A：场景闭环矩阵） | report/ | AI 生成原创 | ✅ cleared |

### A.6 代码与生成工具（Code & Tooling）

| 资产 | 路径 | 作者 | 许可 | 授权状态 |
| --- | --- | --- | --- | --- |
| gen_figures.py / make_pdfs.py 等生成脚本 | scripts/（仓库维护侧） | 投稿方+维护者 | 开源随仓库许可（CC-BY-4.0） | ✅ cleared |
| matplotlib / shapely / pyproj / Pillow | 生成依赖 | 各开源项目 | BSD/HPND/OSI 许可 | ✅ cleared |
| Ghostscript（PDF 渲染验证） | 验证工具 | Artifex | AGPL/商业双许可 | ✅ cleared（仅本地验证，不随包分发） |

### A.7 转换记录（Transformation Log）

| 步骤 | 输入 | 输出 | 工具 |
| --- | --- | --- | --- |
| GeoJSON → 图件 PNG | geometry/*.geojson | assets/figures/*.png | gen_figures.py (matplotlib) |
| 图件 + 文本 → A3/A0 PDF | figures + TEXTS | drawings/*.pdf | make_pdfs.py (matplotlib PdfPages) |
| Markdown → HTML | proposal.md | report/proposal.html | 仓库渲染流程 |
| 字体方案变更 | DroidSansFallbackFull → Noto Sans CJK SC | 图件/PDF 重新生成 | gen_figures.py / make_pdfs.py（2026-08-09） |

### A.8 综合声明

- 本包**不包含**远程字体、远程图片、远程脚本、iframe 或外部 API 引用；HTML 全部自包含或引用本包内资产。
- 本方案不构成商标申请、不构成政府批准、不保证最终交付；所有 provisional 几何与概念指标在官方边界发布后必须全量复算。
- 无法在本台账中证明许可的资产，将在正式提交前替换或删除。

*维护：本台账与 `sources.json`、本版权声明保持一致；资产增删时同步更新。*