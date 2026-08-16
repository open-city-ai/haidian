# 版权与素材来源台账 (Copyright Statement & Asset Provenance)

## 提交权

申报团队 GitHub 用户 `miniripples` 声明拥有本提交包的提交权，并已确认提交内容可按 `COMMUNITY-DISPLAY-ONLY` 许可用于本征集项目的社区展示、评审与归档。

## AI 辅助生成

方案正文、英文译稿、结构化矩阵、离线 Canvas 2D 交互页面、A3 文册、A0 展板及部分图形表达由 `Codex · Jingzhang Urban Agent` 辅助生成和整理。AI 辅助不改变申报团队对事实、版权、数据来源和最终提交内容承担的责任。

## 逐资产清权台账

| 资产/路径 | 作者或来源 | 生成与使用方式 | 权利依据与状态 |
| --- | --- | --- | --- |
| `proposal.md`, `proposal.en.md`, 矩阵 JSON | `miniripples` 团队原创，Codex 辅助整理 | 由申报团队审核并承担最终责任 | 本提交包按 `COMMUNITY-DISPLAY-ONLY` 用于评审、社区展示与归档；不额外声明 CC-BY-4.0 |
| `assets/media/cover.webp`, `cover_en.webp` | 申报团队提供的 AI 生成封面 | 由提交者选定、编辑并确认用于本次提交 | 提交者声明拥有提交和社区展示权；未依赖第三方品牌授权 |
| `assets/figures/*.png` | 本方案定制 SVG/Canvas 图件 | 依据本提交包文本、GeoJSON 与指标数据本地生成 | 原创设计表达；不嵌入远程底图、图片或字体 |
| `drawings/*.pdf` | 本地排版流程 | 由上述封面和图件组版生成 | 派生交付物，权利基础与源资产一致 |
| `visual/*.html`, `report/*.html` | 本地代码与仓库渲染流程 | 离线 HTML/CSS/SVG/Canvas，无 CDN、iframe、追踪器或远程 API | 可在仓库评审环境中复现；不分发第三方前端包 |
| 界面字体 | 操作系统字体回退栈 | HTML 仅声明 system UI、Noto Sans CJK、苹方、微软雅黑等可用回退项 | 未将字体文件复制或再分发到提交包；实际字体由评审系统提供 |
| 图标与标识 | 基础 CSS/SVG 几何、文字标签 | 未引入 Feather/Lucide 或其他图标库资产 | 无外部图标包授权依赖；不得将示意名称理解为企业合作或背书 |
| `geometry/*.geojson` | 仓库公开任务依据与 agent 生成的临时设计图层 | 用于概念研究、可视化和复算演练 | `provisional_only` / `agent_generated_design`；非官方红线、非地籍或审批成果；未使用 OSM 地图瓦片 |

## 空间与资料来源

GeoJSON 和指标依据仓库公开任务依据及参赛者设计推演生成。临时总体边界与三处重点区域均明确标注为 provisional constraint，不冒充官方红线、审批成果或权属依据。本提交包未嵌入 OpenStreetMap 底图或瓦片，因此不作未发生的 ODbL 来源声明。完整来源、用途、许可与置信度见 `sources.json`、`assumptions.json` 和正文参考资料章节。

## 第三方权利与限制

本提交不嵌入远程字体、地图瓦片、脚本、API、跟踪代码或未经授权的第三方商标素材。若后续补充官方测绘、文保、权属或市政资料，应重新核对其许可条件，并同步更新图层、指标、图纸和本声明。
