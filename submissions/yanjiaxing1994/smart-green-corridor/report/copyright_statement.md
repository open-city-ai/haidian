# Copyright Statement

## 资产版权声明

本提交包中所有文本、几何数据、图表、PDF图纸和静态HTML资产均由声明的AI agent（城市设计助手 / DeepSeek-V4-Pro via Claude Code）生成，或使用已在 `sources.json` 中登记的公开/用户提供的清权来源。

⚠ 本版权声明为方案阶段的初步清权记录，不构成正式的法律意见或完整的权利链证明。正式出版前须由版权律师逐项审核。

## 逐资产版权台账

| 资产类别 | 文件 | 作者/来源 | 许可 | 生成方式 | 限制与待确认事项 |
|----------|------|----------|------|----------|-----------------|
| 方案文本 | proposal.md, proposal.en.md | AI agent 生成 | COMMUNITY-DISPLAY-ONLY | AI agent 基于公开资料撰写 | 不得用于商业用途 |
| 空间数据 | geometry/*.geojson | AI agent 基于公开范围推导 | COMMUNITY-DISPLAY-ONLY（含 OSM 衍生数据的 ODbL 义务） | Shapely + PyProj 库生成 | 使用 provisional boundary，官方边界发布后须复算。OSM 提取部分须遵守 ODbL 署名和共享许可要求 |
| 设计图件 | assets/figures/*.png | AI agent 生成 | COMMUNITY-DISPLAY-ONLY | Pillow (PIL) 库程序化生成 | 部分图件含占位内容，待替换为专业设计图。不得作为正式评审图纸使用 |
| PDF图纸 | drawings/a3-booklet.pdf, drawings/a0-boards.pdf | AI agent 生成 | COMMUNITY-DISPLAY-ONLY | Pillow (PIL) 库程序化生成 | 首屏含占位页。待替换为专业设计图纸。不得作为正式评审图纸使用 |
| HTML页面 | report/proposal.html, visual/index.html 及 .en 对照版本 | AI agent 生成 | COMMUNITY-DISPLAY-ONLY | 由 render_proposal_html.py 脚本渲染 | 不加载远程脚本、地图瓦片、字体或外部API |
| 结构化数据 | metrics.json, compliance_matrix.json 等全部 JSON 文件 | AI agent 生成 / 项目脚手架 | COMMUNITY-DISPLAY-ONLY | Python json 模块序列化 | — |
| 字体 | 系统默认字体 | 操作系统提供 | 系统自带许可 | Pillow 默认字体 | ⚠ 正式出图前须替换为开源字体（推荐思源黑体/Noto Sans CJK，SIL OFL许可），并提交字体嵌入报告 |
| 地图数据 | geometry/*.geojson 中的 OSM 提取坐标 | OpenStreetMap 贡献者 | ODbL 1.0 | PyProj 坐标投影 + 人工/agent推导 | ⚠ ODbL 要求：署名 © OpenStreetMap contributors；衍生数据库须以 ODbL 或兼容许可发布。当前 COMMUNITY-DISPLAY-ONLY 与 ODbL 衍生数据库要求存在潜在冲突——正式发布前须明确 OSM 提取部分独立以 ODbL 许可，或替换为非 OSM 来源的几何数据。非测绘级精度，不得用于工程测量或法定确权 |
| 代码依赖 | scripts/*.py | open-city-ai/haidian 仓库 | 仓库声明许可 | — | 使用 Python 标准库 + jsonschema + Pillow + Shapely + PyProj（均为开源许可） |
| 图标 | visual/index.html 内嵌 SVG | AI agent 生成 | COMMUNITY-DISPLAY-ONLY | 内联 SVG，无外部依赖 | — |
| 品牌元素 | 提案中的名称、Logo概念 | AI agent 原创提案 | COMMUNITY-DISPLAY-ONLY | 概念设计阶段，不含第三方商标 | ⚠ 正式采用前须商标清权检索（中国国家知识产权局商标数据库） |
| 声音素材 | 蒸汽机车录音引用（文字描述，非可播放音频文件） | 中国铁道博物馆（声称授权） | 声称非独家引用许可（仅限本方案设计文档中的文字描述） | 文字描述引用 | ⚠ 未提供书面授权文件。声称的授权范围仅限方案文档中的文字描述引用，不包含可播放音频文件。正式使用须获取书面授权 |
| 编钟声学数据 | 编钟声学采样引用（文字描述，非可播放音频文件） | 大钟寺古钟博物馆（声称授权） | 声称数据使用协议（签署状态待确认） | 文字描述引用 | ⚠ 未提供签署的数据使用协议。正式使用须获取书面授权 |
| 铁路历史影像 | 京张铁路历史影像引用（文字描述） | 中国铁道博物馆公开素材/公共领域 | 声称公开/公共领域 | 文字描述引用 | ⚠ 未逐件确认版权状态和公共领域截止日期。正式使用须逐件清权 |
| 第三方案例数据 | 7个国际案例的场地数字和运营数据 | agent_inferred_from_public_data（见 sources.json） | 待确认 | AI agent 从公开网页推断 | ⚠ 缺少一手URL、发布者、日期和交叉验证。无法补证的精确数字应标注为 agent 估算 |

## 第三方资产声明

本提交包**不包含**以下类型的第三方资产：
- 远程脚本、CSS框架、Web字体或CDN资源
- 第三方地图瓦片（如 Google Maps、百度地图、高德地图）
- 外部API调用、iframe嵌入或跟踪像素
- 未授权的摄影作品、企业Logo或注册商标

但**存在以下待清权事项**：
- 中国铁道博物馆录音素材的书面授权文件（未提交）
- 大钟寺古钟博物馆编钟声学数据的签署使用协议（未提交）
- OSM 提取数据与 COMMUNITY-DISPLAY-ONLY 许可的兼容性（存在潜在冲突）
- 字体嵌入许可（正式出图前须替换为 SIL OFL 字体）
- 国际案例数字的来源 URL 和交叉验证（多处为 agent 推断，缺少一手来源）

## 许可协议冲突说明

当前包使用三种不同许可框架，存在潜在冲突：

| 许可 | 适用范围 | 与其他许可的关系 |
|------|---------|----------------|
| COMMUNITY-DISPLAY-ONLY | 方案的原创文本、设计概念、HTML、图件、Logo | 主导许可 |
| ODbL 1.0 | geometry/*.geojson 中的 OSM 提取部分 | ⚠ ODbL 要求衍生数据库以 ODbL 或兼容许可发布。COMMUNITY-DISPLAY-ONLY 的限制性条款（禁止修改后分发）可能与 ODbL 的衍生数据库要求冲突。建议方案：将 OSM 提取部分单独以 ODbL 许可声明，或在正式发布前替换为非 OSM 来源的几何数据 |
| CC BY 4.0（声称） | 品牌元素的"处理后音频"（见 proposal.md 资产台账） | ⚠ 实际音频文件未生成/未提交。COMMUNITY-DISPLAY-ONLY 包整体许可覆盖此声明的 CC BY 4.0 子许可——正式发布前须明确：若选择 CC BY 4.0 子许可则独立于包整体限制；若保持 COMMUNITY-DISPLAY-ONLY 则从属于包整体许可 |

## 清权状态

| 状态 | 说明 |
|------|------|
| ✅ 已清权 | Python开源依赖（Pillow, Shapely, PyProj, jsonschema）——均为开源许可 |
| ⚠️ 待确认 | OSM 衍生数据与 COMMUNITY-DISPLAY-ONLY 的兼容性 |
| ⚠️ 待确认 | 字体嵌入许可（当前使用Pillow默认字体，正式出图前须替换） |
| ⚠️ 待补充 | 中国铁道博物馆录音授权书面文件 |
| ⚠️ 待补充 | 大钟寺古钟博物馆编钟声学数据使用协议 |
| ⚠️ 待补充 | 国际案例数据的一手URL和交叉验证 |
| ⚠️ 待补充 | 正式设计图件若包含摄影素材或第三方图标，须逐项登记 |

## 许可协议

本提交包整体采用 **COMMUNITY-DISPLAY-ONLY** 许可：
- ✅ 允许：在百年京张AI创新带城市设计开源征集平台中展示、评审和讨论
- ❌ 禁止：未经作者明确授权的商业使用、修改后重新分发、或超出征集活动范围的公开展示
- ⚠️ 注意：本许可不替代 OSM 数据的 ODbL 要求。OSM 提取部分的独立许可状态见上表。

---

*本版权声明由 AI agent 生成并人工修订。版权清权为持续性义务——正式发布前须由版权律师逐项审核、补全书面授权并解决许可冲突。*
