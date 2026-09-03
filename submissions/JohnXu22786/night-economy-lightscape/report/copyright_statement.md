# 版权声明与品牌资产台账（Copyright Statement & Asset Ledger）

## 一、版权声明（Copyright Statement）

1. 本包全部文字、几何层、图件（PNG/PDF）、静态 HTML 与结构化 JSON 由声明的 AI agent（见 agent.json）生成或使用已清除的公开/用户提供来源（逐项登记见 sources.json），生成方式已如实披露。
2. 对标案例与公开标准仅按公开渠道概述机制或作方法参照，不复制受版权保护的图片、标识、大段文本；"首个""率先"等断言均为公开渠道口径并在 sources.json 逐案登记、标注待独立核验，必要处按待研究假设处理。
3. 本包任何文件不依赖远程资源；visual/index.html 与 report/proposal.html 为离线自包含页面（字体以内嵌子集方式携带）。
4. 全部内容为开放共创概念建议，不构成政府结论、审批依据或任何现实世界授权证明。

## 二、品牌在先权利与使用边界（Brand Prior Rights & Usage Boundary）

1. 概念阶段**未完成官方商标检索**。NIGHT·JZ、夜光智环及子品牌名称（一亮·夜光客厅、一演·夜演舞台、一市·夜集市场、夜光市集季、夏夜开放舞台、冬日灯光节）现阶段一律按**内部工作代号**（internal working codenames）处理。
2. 官方检索与清障完成前：不与任何外部主体签署品牌使用、授权或注册安排；不用于商业推广；若候选名与在先权利冲突，将整体换名。
3. 本声明不构成权利主张、授权证据或注册承诺；品牌相关图形资产（logo.png、brand-vi*.png）仅表达设计方向，可整体调整。
4. 对应条目：sources.json 的 BRAND-PRIOR-RIGHTS-POLICY；proposal.md 与 proposal.en.md 的品牌章节与风险章节；assumptions.json 的 A-BRAND-001。

## 三、资产台账（Asset Ledger）

| 资产 | 类型 | 生成/来源 | 权属与复用边界 | 语言 |
| --- | --- | --- | --- | --- |
| proposal.md / proposal.en.md | 文本 | AI 辅助原创（已披露） | 开放展示；引用须注明出处 | zh / en |
| assets/figures/logo.png | 图形 | AI 生成原创概念 Logo | 内部工作代号，清障前不对外注册使用 | neutral |
| assets/figures/logo.en.png | 图形 | logo.png 的英文页面配套副本 | 内部工作代号，清障前不对外注册使用 | en |
| assets/figures/site-overview*.png | 图件 | 由本包 provisional 几何绘制 | 概念展示；含 PROVISIONAL 印章 | zh / en |
| assets/figures/land-use-structure*.png | 图件 | 由 land_use.geojson 聚合绘制 | 唯一口径；官方数据发布后复算 | zh / en |
| assets/figures/key-areas*.png | 图件 | 由 key_areas.geojson/公共空间层绘制 | 概念展示；provisional | zh / en |
| assets/figures/mobility-bluegreen*.png | 图件 | 由 roads/green/land_use 等绘制 | 概念展示；照明分级为概念建议 | zh / en |
| assets/figures/metrics-evidence*.png | 图件 | 由 metrics.json 绘制 | 就近取整显示；机器值仅存 metrics.json | zh / en |
| assets/figures/regional-cooperation*.png | 图件 | 概念示意图（AI 生成） | 概念接口；不暗示既有承诺 | zh / en |
| assets/figures/brand-vi*.png | 图件 | AI 生成 VI 方向板 | 设计方向；清障前不对外注册使用 | zh / en |
| geometry/*.geojson | 数据 | AI 生成概念几何（provisional） | 临时模型数据，非官方红线 | neutral |
| drawings/a0-boards*.pdf / a3-booklet*.pdf | 图纸 | 由本包图件与正文排版生成 | 概念展示；内置字体子集 | zh / en |
| report/proposal*.html | 页面 | 由 proposal*.md 渲染 | 离线自包含；字体内嵌 | zh / en |
| visual/index*.html | 页面 | 本包数据汇总展示 | 离线自包含；含 data-value 机器值 | zh / en |
| metrics.json / sources.json / 矩阵 | 数据 | 本包结构化记录 | 机器可校验；provisional 警示保留 | neutral |

## 四、生成与校验记录

- 生成方式：由声明的 Codex SA Halley 直接修订 staging，并使用确定性项目工具完成图表、PDF 与页面校验；字体为离线内嵌或系统可用字体。
- 校验：四道门禁（deterministic validation / spatial review / visual packaging / professional evidence）结果持久化于 self_check.json；本声明不替代现实世界版权或审批证明。
