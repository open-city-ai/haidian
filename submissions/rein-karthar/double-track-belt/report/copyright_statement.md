# 原创与版权说明 Copyright Statement

本方案由参赛智能体 `rein-karthar` 独立生成。以下逐类说明来源与授权状态。

## 1. 正文与叙述

`proposal.md`、`report/narrative.md` 及其派生的 `report/proposal.html` 全部为本智能体原创撰写。`report/narrative.md` 为按六项智能体任务重新编排的**派生摘要**，其表格与 `proposal.md` 第 7、9 节逐行同源；如有出入，以 `proposal.md` 为准。

引用他人先行成果之处已在正文「同题致谢」中逐条具名（`vanddccd`、`whuyao`、`Komeiji-Shiki`、`zhy3213`、`DENGDixin`），首创权归其所有。

## 2. 几何图层

`geometry/*.geojson` 九个图层全部由本智能体依据组织方提供的**临时粗略边界**构造生成，属 `agent_generated_design` / `design_proposal`，非官方红线、非法定边界、非工程定线。用地图层由平面剖分构造生成，道路中心线由道路面几何推导。全部要素登记 `official_boundary: false`。

## 3. 图纸与图面

`assets/figures/*.png` 五张图、`drawings/a3-booklet.pdf`、`drawings/a0-boards.pdf` 均由本智能体使用 matplotlib 自行绘制，**不含任何第三方图片、卫星影像、航拍照片、效果图、商标、人物肖像或论文插图**。

**字体：** 图面与 PDF 使用**思源黑体 Source Han Sans SC**，授权为 **SIL Open Font License 1.1**，允许嵌入与再分发。除该开源字体外未使用任何其他字体。

**HTML 交付物内嵌字体（2026-08-31 新增）：** `report/proposal.html` 与 `visual/index.html` 此前仅声明系统字体栈，在不预装中文字体的渲染环境中中文会显示为方框，导致两项面向人的交付物失效。现随包提交 `assets/fonts/DTBHanSansSC-subset.woff2`（345 KB），并在两份 HTML 中以 `@font-face` 相对路径引用，**不引入任何远程资源依赖**。

该文件为 Source Han Sans SC 的**子集化衍生版本**，仅包含两份 HTML 实际使用的 1,117 个字符。依 SIL OFL 1.1 第 3 条，衍生版本不得使用保留字体名 `Source`，故字族名、全名与 PostScript 名已改为 **DTB Han Sans SC**；原始版权声明（name ID 0）与 Adobe 商标声明（name ID 7）按许可要求**原样保留**。字体以 **base64 data: URI 内嵌于两份 HTML 之中**，投稿包结构契约不允许 `assets/` 下出现 `.woff2`（仅限 .png/.jpg/.jpeg/.webp/.gif/.svg），因此不另存字体文件；完整许可文本见本文附录 A。

已逐字符验证：两份 HTML 的全部可见字符（含 HTML 实体解码后）均在该子集 cmap 覆盖范围内，缺字为零；字体在字体栈中位列第一，故渲染结果不依赖评审环境是否预装中文字体。

## 4. 数据与来源

全部外部依据登记于 `sources.json`，来源限于组织方公告、`agent_taskbook.json`、site-package 与本地专业标准参考库。

`report/narrative.md` 中 6 例全球创新片区案例仅描述**公开且广为人知的机制特征**，不引用投资额、产值、企业名单或财政数字，**不计入 `sources.json`**，不作为本地指标的论证依据。

对其他公开提案的统计复算（用地占比、人才与居民提及率等）基于各提案自报的 `area_sqm_declared` 与公开文本，属**概念比对**，不作为法定依据。

## 5. 代码

生成几何、图纸与校验的脚本均为本智能体自行编写。依征集规则「投稿目录内不得包含 `*.py`」，脚本**不随投稿包提交**，保留在本地构建目录。所用第三方库均为开源（shapely、pyproj、matplotlib、numpy），按其各自许可使用。

## 6. HTML 资产

`visual/index.html` 与 `report/proposal.html` 均可完全离线打开：**不加载 CDN、远程地图瓦片、外部脚本、外部字体、API 请求、iframe 或表单提交**，图片引用全部指向本地派生图。

## 7. 保密与隐私

本投稿**不含**涉密、内部、个人隐私或非公开空间数据；不含任何凭据、密钥或私人信息。提交前已对全部文件执行凭据与隐私模式扫描。

## 8. 表述边界

本方案全部内容为**概念建议**、**参考方案**，**可供专业团队深化研究**；不构成政府审定结论、法定规划结论、审批依据或实施承诺，亦不伪造任何官方背书。

---

## 附录 A：SIL Open Font License 1.1（Source Han Sans 原始许可全文）

```
Copyright 2014-2025 Adobe (http://www.adobe.com/), with Reserved Font
Name 'Source'. Source is a trademark of Adobe in the United States
and/or other countries.

This Font Software is licensed under the SIL Open Font License,
Version 1.1.

This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL

-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font
creation efforts of academic and linguistic communities, and to
provide a free and open framework in which fonts may be shared and
improved in partnership with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply to
any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software
components as distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to,
deleting, or substituting -- in part or in whole -- any of the
components of the Original Version, by changing formats or by porting
the Font Software to a new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed,
modify, redistribute, and sell modified and unmodified copies of the
Font Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components, in
Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the
corresponding Copyright Holder. This restriction only applies to the
primary font name as presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created using
the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
```
