# Copyright Statement · 版权与许可台账

本提交包整体采用许可 **COMMUNITY-DISPLAY-ONLY**（社区展示用途，非商业、非再分发、非衍生授权）。
在 COMMUNITY-DISPLAY-ONLY 下，本包仅用于开源征集社区展示与评审；任何第三方权利（字体、图片、地图、图标、代码、商标、生成资产）均须由使用方在超出社区展示范围前各自取得授权。以下逐资产说明来源、许可与清权状态；无法证明可用权利的素材已在"替代方案"中给出处理路径。

## 逐资产权利台账

逐项列明资产、权利方、来源与来源链接/档案号、许可与清权状态；凡无法证明可用权利的素材已在"替代方案"给出处理路径。本包许可为 **COMMUNITY-DISPLAY-ONLY**（社区展示用途，非商业、非再分发、非衍生授权），仅用于开源征集社区展示与评审。

| 资产 | 类型 | 权利方 | 来源 | 来源链接/档案 | 许可/权限 | 清权状态 | 替代方案 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| proposal.md 及 report/*.md 正文 | 文本 | ddaihao2022（代鱼） | AI agent 自主生成 | 本包提交记录（GitHub PR #400） | agent 自述著作权，COMMUNITY-DISPLAY-ONLY | 已声明 | 商用需作者另行授权 |
| compliance_matrix / standard_matrix / design_depth_matrix / metrics / assumptions / sources / self_check / manifest | 结构化 JSON | ddaihao2022 | 依据 brief/site-package + scaffolding 生成 | 上游 open-city-ai/haidian（https://github.com/open-city-ai/haidian） | COMMUNITY-DISPLAY-ONLY | 已声明 | — |
| geometry/*.geojson（含 site_boundary、key_areas、constraints 节点层） | 矢量几何 | 派生自官方 provisional 几何 | 由 brief/site-package/geometry/provisional_boundaries.geojson 派生（official_boundary=false） | 上游 site-package（open-city-ai/haidian） | agent_inferred_provisional_only，不作官方红线/审批依据 | 非官方、待复算 | 取得官方 polygon 后重算替换 |
| assets/figures/*.png（5 张） | 位图 | ddaihao2022（生成代码） | Pillow（MIT，https://github.com/python-pillow/Pillow）程序化绘制，无第三方位图/照片 | build_assets.py（本包） | 生成代码随包提供，COMMUNITY-DISPLAY-ONLY | 无第三方素材，已清权 | — |
| drawings/a3-booklet.pdf、drawings/a0-boards.pdf | PDF | ddaihao2022 | Pillow 程序化生成，纯矢量+文字 | build_assets.py（本包） | COMMUNITY-DISPLAY-ONLY | 无第三方素材，已清权 | — |
| visual/index.html | 离线网页 | ddaihao2022 | 内联 SVG+文字，无远程脚本/字体/图片/iframe/外部 API | 本包 | COMMUNITY-DISPLAY-ONLY | 无外部依赖，已清权 | — |
| 中文字体（渲染用） | 字体 | Microsoft Corporation | 系统字体 Microsoft YaHei（msyh.ttc），随 Windows 提供，未随包分发 | 随 Windows 提供 | 仅本地渲染用；字体未分发故不触发再分发 | 需提示：无该字体环境替换思源黑体（SIL OFL，https://github.com/adobe-fonts/source-han-sans） | 替换字体后重跑 build_assets.py |
| Logo / 品牌标识 | 概念 | ddaihao2022（概念） | 文本概念描述（轨道线+年轮+数据流抽象符号、主色 #9E4A33），非注册商标 | — | 概念建议，不构成商标主张 | 待专业确认，非注册商标 | 注册前做商标检索 |
| 公共空间组件库 / 图标 / 导视符号 | 概念图形 | ddaihao2022 | AI 文字描述，未生成具体图标文件 | — | COMMUNITY-DISPLAY-ONLY | 概念，无第三方图标 | 落地前做图标版权检索 |
| 地图底图 | — | 无 | 无底图；全部从本包 GeoJSON 程序化矢量，不含任何第三方瓦片/卫星影像 | 本包 | — | 无第三方底图，已清权 | — |
| 脚手架与生成代码 | 代码 | 上游仓库贡献者 | 仓库 scripts/ 与 build_*.py | 上游 LICENSE（open-city-ai/haidian） | 随开源征集仓库许可 | 见仓库 LICENSE | — |

## 第三方权利与风险声明

1. 本包不声称拥有任何第三方字体、图片、地图、图标、商标或代码的再授权能力；超出社区展示的使用需各自取得权利方授权。
2. 场地几何、面积与比例为 **provisional**（official_boundary=false），不构成官方红线、审批依据或精确面积依据；取得官方几何后须全量复算并替换。
3. 所有 AI 场景、品牌、运营与项目内容为**概念建议/待专业确认**，不声称官方批准、政府背书或保证实施。
4. 引用标准（MOHURD/MNR 等）为其发布机构所有；本包仅作设计深度引用，不构成标准文本本身。
5. 若评审或后续使用需要可商用资产，请按"替代方案"列替换字体/图标/底图后，重新运行 `scripts/finalize_submission.py` 与 `scripts/self_check_submission.py`。
