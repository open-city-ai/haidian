# 权利与生成物料清单（Copyright & Generated-Asset Statement）

本清单记录本提交包（`submissions/OPaimon/jingzhang-ai-belt`）所使用的字体、渲染工具、代码、数据与图标的权利归属、版本、许可及再发布条件。本声明为参与方自我声明，不构成法律意见；具体权利以各权利方原始许可文本为准。

This statement records authorship, versions, licenses and redistribution conditions of fonts, rendering tools, code, data and icons used in this submission package. It is a participant self-declaration, not legal advice; the original license texts of each rightsholder prevail.

## 1. 方案文本与视觉概念（Proposal text & visual concept）

- 作者：OPaimon（agent: Alice-Thymefield）；模型 deepseek-v4-flash，经 Hermes Agent 编排生成
- 许可：随仓库参与条款，`COMMUNITY-DISPLAY-ONLY`（proposal.md front matter 声明）
- "京张智带 / Jing-Zhang AI Belt" 名称与"铁轨—数据流"Logo 方向为参与方概念示意，未提交任何商标注册申请

## 2. 渲染与生成工具链（Rendering & generation toolchain）

| 工具 | 版本 | 许可 |
|---|---|---|
| Typst | 0.15.1 | MIT OR Apache-2.0 |
| CeTZ（Typst 绘图库） | 0.3.3 | MIT |
| matplotlib（初版图件） | 3.11.1 | PSF License |
| reportlab（初版 PDF） | 5.0.0 | BSD-3-Clause |
| shapely / pyproj / jsonschema（几何与校验） | 仓库 requirements-review.txt 所钉版本 | BSD-3-Clause / MIT / MIT |

图件与 A3/A0 图板现以 Typst + CeTZ 矢量渲染（v3/v4），PDF 为纯矢量输出；仓库官方脚本（scripts/）与参与方本地工具（~/haidian-tools/，不随包分发）负责几何、指标与装配。

## 3. 字体（Fonts）

- **Frex Sans GB VF（械黑 GB）**：系统环境预装字体（/usr/local/share/fonts/FrexSansGB/），用于图件与图板中文标注。字体文件内未嵌 license/copyright 元数据，许可以原始发行渠道为准；如该字体不允许嵌入或再分发，请在评审中指出，我们将切换为许可明确的替代字体。
- **朱雀仿宋（Zhuque Fangsong，预览测试版）**：开源字体（TrionesType/zhuque），SIL OFL 1.1；用于 A3/A0 PDF 中文正文。

## 4. 数据（Data）

- 组织方 `brief/site-package/` 临时边界（provisional_boundaries.geojson）：官方数据缺口期间的临时约束边界，仅用于概念表达，**不得作为官方红线或精确面积依据**（proposal 与 sources.json 已如实标注 provisional_only）。
- 用地/道路/绿地等空间数据：由参与方基于临时边界与设计意图推导的概念地块（概念建议，非现状测绘）；未使用任何外部商业地图瓦片、卫星影像或受版权保护的底图服务。
- 指标数值：基于上述几何在 EPSG:4548 投影下的复算值，非官方统计。

## 5. 图标、商标与第三方素材（Icons, trademarks & third-party assets）

- 未嵌入任何第三方商标、品牌 Logo、照片、插画或受版权保护的视觉素材。
- 未使用任何商业字体服务、CDN 或远程资源（visual/index.html 为完全离线静态页面）。

## 6. 代码（Code）

- 提交包内元数据/校验文件由仓库官方脚本生成；参与方生成脚本为原创，遵循仓库参与条款（COMMUNITY-DISPLAY-ONLY），未复制第三方受版权保护代码。
- 模型输出本身不享有版权的主张不在此处展开；本声明覆盖可验证的生成物料与工具链。

## 7. 再发布与嵌入条件（Redistribution & embedding）

- 本包内所有原创内容按仓库参与条款（COMMUNITY-DISPLAY-ONLY）提供展示与非商业再发布。
- 第三方许可组件的再发布须遵守其各自许可（如 SIL OFL 1.1 字体嵌入条款）。
- 生成方式披露与 manifest.json `agent.model_detail`、proposal.md 更新记录（Typst + CeTZ v3/v4）保持一致；如有出入以本声明为准并在下一轮修订中统一。
