# 版权与来源声明

本提交包 `submissions/molihuo/ai-rule-of-law-belt`（智理一带·法治京张：人工智能法治事业建设第一城百年京张AI创新带城市设计方案）由 AI Agent 在法学研究背景的参与者 `molihuo` 主导下生成。方案以「**人工智能法治事业建设第一城**」为第一性定位与标识性总纲，所提出的「法源·法测·法市·法坛」空间谱系、AI 法治事业五维闭环、ROL-AI 法治事业指数与法治事业共同体均为原创概念，作为可供专业团队深化的参考方案。所有图像、几何、指标和文本均基于公开或已清权资料。

## 资料使用边界

- 全部方案边界为维护者提供的 provisional 粗略范围（`brief/site-package/geometry/provisional_boundaries.geojson`），仅用于概念生成、可视化与自检，不得作为 official redline、审批依据或精确面积复算依据。
- 公告 SRC-2026-BJ-GH-QUAL-PREANNOUNCEMENT（北京市规划和自然资源委员会海淀分局）提供的文字四至与面积作为顶层任务依据。
- 任务书 SRC-2026-0518-AGENT-OPEN-CALL-TASKBOOK（用户提供已清权）作为 agent.1-6 任务响应依据。
- MOHURD 与 MNR 发布的官方标准（城市设计管理办法、控规编制审批办法、用地用海分类指南）作为专业标准响应依据。
- 来源 SRC-MOHURD-ARCH-DESIGN-DEPTH-2016 标注为未取得官方 PDF，作为待补资料；不作为正式证据。
- AI 法治主题所引中华人民共和国《数据安全法》《个人信息保护法》《生成式人工智能服务管理暂行办法》《关于加强互联网信息服务深度合成管理的通知》《全球人工智能治理倡议》等仅作为公开法律背景，不解读为本地化实施结论，不替代司法、执法与监管职能。
- 案例与组织（如国际 AI 治理研究机构、欧盟 AI Act、新加坡 AI Verify、北京国际大数据交易所等）按公开来源引用，未做编造或杜撰。

## 图像与字体

- 全部图像与 PDF 由 Python（Pillow）渲染，未使用任何远程素材或 CDN。
- 中文字体使用 macOS 系统自带 PingFang.ttc，仅在本地渲染过程中加载。

## 资产权利矩阵（逐项）

| 资产类别 | 生成方式 | 许可/权利状态 | 备注 |
| --- | --- | --- | --- |
| 5 张核心图（PNG） | Python/Pillow 本地渲染 | 本项目原创生成，COMMUNITY-DISPLAY-ONLY | 基于提交几何与指标派生，未使用第三方图像 |
| A3/A0 图纸（PDF） | Pillow 由核心图合成 | 本项目原创生成 | 无外部模板或素材 |
| visual/index.html | 原创 HTML/CSS/SVG | 本项目原创，无第三方脚本 | 纯离线，无 CDN/字体/API/跟踪 |
| report/proposal.html | render_proposal_html.py 渲染 | 由 proposal.md 派生 | 无外部资源 |
| 中文字体 | macOS 系统字体 PingFang.ttc | 系统授权，仅本地渲染 | 不随包分发字体文件 |
| geometry/*.geojson | 自派生 + provisional 边界 | provisional 边界来自仓库维护者；派生图层为本项目原创 | 见 sources.json |
| metrics/矩阵 JSON | 本项目原创计算 | 本项目原创 | 公式与来源见 metrics.json |
| 代码（build/*.py） | 本项目原创 | 可复用 | 依赖 jsonschema/Pillow/pyproj/shapely，见 requirements-review.txt |

> 说明：以上为 AI Agent 所能核实的生成资产权利状态；字体、地图底图、商标、肖像等任何第三方素材均未使用或未随包分发。若评审需要逐项原始生成脚本与依赖清单，可通过 Issues 索取。

## 隐私与人工复核

- 所有 AI 场景卡（合规沙盒、智能调解、AI 司法辅助、算法备案审查、机器人责任保险等）均标注「数据最小化、可解释、人工复核、隐私保护」边界。
- 不采集个人行为轨迹用于商业推荐；不将居民或企业画像数据用于未经授权的二次使用。
- AI 治理建议仅作为城市智能体辅助识别慢行断点、公共空间热力、设施维护与活动安全风险的参考，不替代规划审批、专家评审或政府审定。

## 责任与边界

- 本提交包不声称获得官方批准、审定控规、最终土地权属或保证实施。
- AI Agent 对事实、来源、版权、空间数据、指标与表达负责；维护者与专业评审可依据自检结果、空间复核与合规矩阵要求返修或拒绝。
- 若发现数据或引用问题，请通过 GitHub Issues 在 `open-city-ai/haidian` 仓库提交反馈。