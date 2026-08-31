# 版权、生成方式与使用边界（正式审计版）

本方案的核心概念、规划判断、骑行偏好与运营边界由参赛城市规划师RuiQiLiu提出；Codex协助检索公开资料、整理双语文本、生成结构化文件、原创示意图、离线网页与PDF。提交包未复制外部案例的照片、规划图、建筑图、Logo或宣传文案。案例只引用一手页面中的机制事实，并在`sources.json`逐项登记。

所有示意图由本地Python/Pillow根据方案文字、提交GeoJSON和原创图形绘制。GeoJSON沿用仓库明确标注的临时边界并叠加本案概念设计，不构成官方红线、现状测绘或法定规划。双语网页完全离线，不加载远程脚本、地图瓦片、iframe、表单或追踪代码。

中文与拉丁文字采用Noto Sans SC可变字体，来源为Google Fonts / Noto。PDF按文档所需字符嵌入；网页版本使用FontTools按四个提交页面实际出现的字符裁剪并压缩为WOFF2。`visual/index*.html`从`visual/assets/offline-font.css`读取data URI；两份必交`report/proposal*.html`各自直接内嵌同一字库，以适配单文件截图审查。所有页面均不请求远程字体。该修改字体依据SIL Open Font License 1.1再分发，未使用上游保留字体名作为修改字体名；许可证全文见本文件附录A。未随包分发Microsoft YaHei或其他商业字体文件。

三张场景图由OpenAI图像生成服务于2026-08-25根据本方案文字提示生成；运行环境未暴露精确图像模型标识，故不作猜测。图像仅表达尺度、人物关系和技术克制，不代表现状、真实人物、测绘、法定设计或实施承诺。权利与使用受OpenAI适用条款及本提交包`COMMUNITY-DISPLAY-ONLY`许可共同约束。

逐资产文件名、SHA-256、作者/工具、来源、日期、许可、复用条件与审计状态见`visual/assets/asset-register.json`。本次审计状态为：对当前提交资产已完成；后续若新增照片、地图、字体、商标、企业材料或生成媒体，必须先更新登记再进入发布包。


## 附录A｜SIL Open Font License 1.1全文

```text
Copyright 2014-2021 Adobe (http://www.adobe.com/), with Reserved Font Name 'Source'

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://scripts.sil.org/OFL


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

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
