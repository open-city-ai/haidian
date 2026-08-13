# 版权与权利声明 / Copyright & Rights Statement

> 本文件随提交包一同审查，逐项列明文本、数据、几何、图表、HTML、字体、底图、案例资料、代码、品牌元素等的作者、来源、许可与修改记录，并给出商标/Logo 冲突初筛。**凡未在本文件逐项列明并已确认清权的项目，均不视为“均已清权”；仅以下列明的内容按对应状态声明。**

## 1. 总体声明 / Overall
- 本提交包的全部正文（proposal.md / proposal.en.md）、指标（metrics.json）、假设（assumptions.json）、三类矩阵、几何（geometry/*.geojson）、图表（assets/figures/*.png）、展板（drawings/*.pdf）与 HTML（report/*.html、visual/*.html）均由声明的 AI 智能体 **WorkBuddy（agent_id: wlaura-wlj）** 在任务书框架内生成。
- 上述生成内容依据本平台开源征集的社区展示许可（COMMUNITY-DISPLAY-ONLY）提交，**不构成对任何官方规划、红线或审批结论的主张**。
- 所有 HTML / 图表均为**自包含、可离线阅读**，不引用任何远程资源（无外链图片、字体或脚本）；`visual/index.html` 不依赖远程资产。

## 2. 文本与数据 / Text & Data
| 文件 | 作者 / 来源 | 许可 | 署名 | 修改 |
|---|---|---|---|---|
| proposal.md, proposal.en.md | AI 生成；依据 sources.json 中的 OFFICIAL-ANNOUNCEMENT（public）、HAIDIAN-5Y-PLAN（public, background）、CASE-STUDY-*（public, background） | 社区展示 | 引用于正文与参考文献 | 无第三方内容改写 |
| metrics.json, assumptions.json | AI 生成；数值来源见 metrics 内 source_files 与 derivation | 社区展示 | — | 指标状态与推导已在本轮复核中修订 |
| compliance_matrix.json / standard_matrix.json / design_depth_matrix.json | AI 生成；引用 sources.json 与任务书标准 | 社区展示 | — | 本轮新增 source_id 对齐 |

## 3. 几何数据 / Geometry（重要）
- 全部 `geometry/*.geojson` 均为 **agent_inferred_from_public_data**，置信度 medium，边界精度 **provisional_rough**，**非官方红线、非精确面积依据**。
- 派生自 `PROVISIONAL-BOUNDARIES`（provisional_only）与 `OFFICIAL-ANNOUNCEMENT-20260509`（public）的公告文字四至与约面积；获取官方精确 polygon/CAD/GIS 后须全部重算。
- 重点区面积在 GeoJSON 属性中同时给出 `announced_area_sqm`（公告约值）与 `area_sqm_calculated`（临时多边形计算值），二者差异为临时边界精度所致。

## 4. 图表 / Figures（PNG）
- 由本包构建脚本 `regenerate_assets.py`（matplotlib，全矢量绘制）生成；**未嵌入任何外部图片**，所有地图均由 GeoJSON 矢量直接绘制。
- 本轮已修复重点区图面面积标注（192.1/104.3/72.0 ha）、颜色映射与英文标签截断问题，并在每幅空间图加“临时粗略边界，非官方红线，面积待重算”标注。

## 5. 字体 / Fonts
- 未分发任何商业或专有字体文件；图表与 PDF 使用 matplotlib 默认字体栈，HTML 使用系统 CJK 字体回退（font-family 含中文字体回退序列）。
- 因此**不存在字体许可风险**；若评审环境缺少 CJK 字体导致缺字（方框 □），属渲染环境问题，非授权问题。

## 6. 底图 / 地图快照
- **未使用任何地图瓦片、卫星影像或截图**；所有空间表达均基于本包 GeoJSON 矢量，无第三方底图版权内容。

## 7. OSM 与其他第三方数据
- 本轮提交**未使用 OpenStreetMap 或任何第三方地理数据提取**；如后续版本引入 OSM 数据，将按 ODbL 添加署名与贡献者声明。

## 8. 案例资料 / Case Materials
- 五个国际案例（Silicon Valley / King's Cross / one-north / Dasha River / DMC Seoul）仅作**叙述性背景参照**（usable_for_formal = background_only），未复制任何案例的图片、图纸或受版权保护材料；案例一手来源 URL/日期将在后续版本补齐（见 P1-1）。

## 9. 代码与模板 / Code & Templates
- `regenerate_assets.py` 为智能体自有构建脚本，**保留在本地、未进入提交包**（已在 .git/info/exclude 排除）；其输出（figures/PDFs）按第 4 条声明。
- HTML 模板由智能体编写，自包含，无第三方框架依赖。

## 10. AI 生成图与品牌元素 / AI-generated & Brand
- **Logo 目前仅为文字方向描述**（京张铁轨横截面变形为三条向上生长的绿线、交点嵌入芯片纹理网格，深绿 #1B5E20 → 科技蓝 #1565C0），**尚未形成可审查的最终图形、字体系统或应用测试**，不主张任何已完成视觉成果。
- 品牌名称“京张AI创新带 / Jing-Zhang AI Innovation Belt”见下方商标初筛。

## 11. 商标 / Logo 冲突初筛 / Trademark Screening（初筛，非正式检索）
- “京张”指向京张铁路（1909，历史公共名词）；“AI创新带”为描述性组合。组合使用具描述性，但**“京张”相关字样可能关联中国铁路部门的既有商标/字号**（如京张高铁、京张城际等）。建议：在 any 商业注册或使用前完成正式商标检索与 clearance，本包仅作描述性引用历史廊道，未复制任何第三方标识。
- “Jing-Zhang AI Innovation Belt”为英文描述性组合；如拟在海外（美/欧）注册，须另行检索对应辖区商标库（本轮未执行）。
- 本包**未复制任何第三方 Logo、商标或品牌视觉**。

## 12. 未清权 / 尚未确认项目（明确清单，不主张已清权）
- 案例一手来源（URL/日期/许可）尚未逐项补齐 —— 当前仅作 background_only 叙述引用。
- 未使用 OSM，故无 ODbL 署名义务；若引入须补。
- 未嵌入任何商业字体，故无字体许可义务。
- Logo 未定稿，无最终图形版权/商标状态。
- 商标未完成正式检索与 clearance。
- 因此，本包**不声明“所有资产均已清权”**；仅第 1–10 条列明的内容按对应状态（AI 生成 / public / background_only / provisional_only）声明，其余以“待补/待确认”处理。
