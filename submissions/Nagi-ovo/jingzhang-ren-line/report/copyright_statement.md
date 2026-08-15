# 版权、授权与生成责任声明 · Copyright, Licensing and Generation Statement

## 一、成果性质 · Nature of the deliverable

本方案《人字京张 / REN — The Human-Character Line》是面向"百年京张AI创新带城市设计开源征集"提交的**开放共创建议**。全部空间建议均为概念建议、参考方案或供专业团队深化的材料，**不替代正式规划，不构成政府审定结论、投资承诺、工程可行性判断或地块级拆改留结论**。

This package is an **open co-creation proposal** for the Centennial Jing-Zhang AI Innovation Belt open call. All spatial proposals are concept suggestions, reference schemes, or material for professional teams to develop. They **do not replace statutory planning and constitute no government approval, investment commitment, engineering feasibility judgement, or parcel-level renewal conclusion**.

## 二、生成方式与责任 · Generation method and responsibility

- 生成智能体 / Generating agent：**Claude Opus 5**（Anthropic），通过 Claude Code 运行
- 提交账号 / Submitting account：**Nagi-ovo**
- 生成范围 / Scope of generation：叙述文本、设计几何（GeoJSON）、图件（PNG）、离线展示页（HTML）、A3/A0 图册（PDF）与全部结构化文件，均由该智能体在本仓库提供的站点包、公开来源与校验脚本约束下生成。
- 人类责任 / Human accountability：提交账号持有人对本次提交负责。智能体成果可被筛选和排序，**最终判断由人类和专业团队完成**。

## 三、资料来源与授权 · Sources and licensing

本方案仅使用**公开或已清权**资料，未使用秘密地图、非公开表格、商业地图瓦片、未授权数据或伪造的官方背书。资料按三档使用，档位决定结论强度，完整索引见 `sources.json`：

1. **可用于正式判断**：本次征集资格预审公告、面向智能体的任务书摘录、《城市设计管理办法》《城市、镇控制性详细规划编制审批办法》《国土空间调查、规划、用途管制用地用海分类指南》《生成式人工智能服务管理暂行办法》《中华人民共和国无障碍环境建设法》。
2. **仅供临时生成与可视化**：站点包提供的三层范围与三处重点区临时粗略 polygon（`provisional_rough`）。**该边界不是官方红线**，不得用于精确面积核算、法定管控或权属判断。
3. **仅作背景理解**：《关于切实解决老年人运用智能技术困难实施方案》等政策背景材料，不作为任何空间结论或指标依据。

国际案例（King's Cross、one-north、Mila / Quartier de l'innovation、Munich Urban Colab、柏之叶）均引自公开资料，用于方法借鉴，**不构成对本地条件的事实主张，也不构成对相关机构的代表性陈述**。

## 四、素材与生成内容 · Assets and generated content

- 本包**不含**任何第三方图片、字体文件、地图瓦片、商标或人物肖像素材。
- 全部图件（`assets/figures/*.png`）与展示页内联 SVG，均由本包提交的 GeoJSON 与 `metrics.json` 通过 matplotlib 及脚本渲染生成，不含外部素材。
- 展示页（`visual/index.html`、`visual/index.en.html`）与阅读版（`report/proposal.html`）为纯离线静态页面：不加载 CDN、远程字体、远程地图瓦片或外部脚本，不发起网络请求，不含 iframe、表单与跟踪代码。
- 命名、标志、配色、徽章与里程编号体系为本方案原创提出的**概念建议**，未注册、未获授权、不构成已确定的品牌决策；深化阶段须完成商标检索与清权。
- 若后续加入 AI 生成的图像、视频或音频，须在展示界面明确标注生成属性，**不得冒充现场照片、居民意见、官方边界或实测证据**。

## 五、隐私与无障碍底线 · Privacy and accessibility floor

方案提出的十三个 AI 场景均为概念建议，运行状态统一为 `not_authorized_not_run`（尚未获得许可、尚未运行）。所有场景遵循三条底线：涉及健康、法律、行政、支付、安全的结果必须由具备权限的人确认；任何场景必须提供不依赖智能设备的等效人工通道；每个场景必须写明失效条件与退出路径。场景卡不包含任何真实个人数据。

## 六、使用许可 · Use license

本提交包按仓库约定以 `COMMUNITY-DISPLAY-ONLY` 提供，供征集组织方、评审、后续专业团队与公众查阅、复核与讨论使用。转载、引用或在其他项目中复用本方案的文本、图件、几何或方法时，请保留出处（提交账号 `Nagi-ovo`、生成智能体 `Claude Opus 5`、方案名《人字京张 / REN — The Human-Character Line》），并同时保留本声明中关于临时边界、概念建议属性与待补资料的限制说明。

## 七、待补与复核 · Pending items

本方案存在明确的资料缺口：正式控规条件、现状建筑与权属、道路红线、市政承载能力、铁路遗产保护范围、水系岸线与生态条件、轨道站点条件。相关指标在 `metrics.json` 中记为待正式数据补齐，**不以估算值填充**。正式 polygon 与控规条件发布后，用地、绿地、公共空间、建筑基底、分期五个图层与全部面积类指标需整体重算，重算路径见 `assumptions.json`。
