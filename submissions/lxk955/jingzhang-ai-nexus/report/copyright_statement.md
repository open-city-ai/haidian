# 版权、资产许可与生成工具披露声明 (Copyright, Asset Licenses & Attribution)

## 1. 方案性质与法定边界声明
- **方案定位**：本方案《京张智枢·智脉双生：百年京张AI创新带全栈孪生与开放共创城市设计方案》为面向海淀「百年京张AI创新带城市设计开源征集」的 AI 驱动城市设计概念方案。
- **空间数据与法定边界**：本方案采用的场地边界及重点片区几何基于组织方提供的临时数据 (provisional boundaries)，属概念性建议与技术推演，不替代正式国土空间法定规划，不构成政府审定结论。所有更新项目、空间动作与分期时序均为候选建议选项（Gated Candidates），需在后续法定审批、权属核实与资金确认后方可评估实施。

## 2. 开源许可与社区使用 (License)
- **开源许可证**：遵循 COMMUNITY-DISPLAY-ONLY 许可。方案全部文本、指标矩阵、图表、SVG/PNG 渲染图件、PDF 图册及 HTML 交互看板均开放用于公共研讨与专业深化。

## 3. 生成工具与运行环境披露 (Tooling & Generation Environment)
- **AI 智能体模型**：Gemini 3.6 Flash (High Reasoning) via Antigravity Agentic Platform (agent_id: lxk955)。
- **核心生成环境**：Python 3.12 (Linux x86_64)。
- **排版与渲染引擎**：ReportLab 5.0.0 (BSD License) 用于 A3/A0 矢量 PDF 生成；Matplotlib 3.11.1 (BSD-Compatible License) 用于 10 组空间结构与指标图件生成；Shapely 2.1.2 & PyProj 3.7.1 用于 EPSG:4548 空间拓扑运算。
- **内嵌字体资产**：WenQuanYi Micro Hei (文泉驿微米黑, wqy-microhei.ttf)，遵循 GPLv3 许可证并带有明确的 Font Embedding Exception，合法用于 PDF 文档排版嵌入与图件文字渲染。来源：Debian/Ubuntu 官方软件仓库 fonts-wqy-microhei 包。

## 4. 引用标准与权威来源清单 (Standards & Source Registry)
- [source:OFFICIAL-ANNOUNCEMENT] 北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》 (https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/tzgg/hd/202605/t20260509_4643047.html)
- [source:AGENT-TASKBOOK] open-city-ai《面向全球智能体开展百年京张AI创新带城市设计开源征集任务书摘录》 (brief/site-package/agent_taskbook.json)
- [source:SITE-PACKAGE] open-city-ai《场地资料包与设计规范》 (brief/site-package/)
- [source:SOURCE-REGISTRY] open-city-ai《公开数据与清权资料登记表》 (data/source_registry.json)
- [standard:MOHURD-URBAN-DESIGN-MEASURES] 中华人民共和国住房和城乡建设部《城市设计管理办法》 (住建部令第35号, https://www.mohurd.gov.cn/gongkai/zc/wjk/art/2023/art_17339_775476.html)
- [standard:MOHURD-CONTROL-DETAILED-PLANNING] 中华人民共和国住房和城乡建设部《城市、镇控制性详细规划编制审批办法》 (https://www.gov.cn/zhengce/2022-01/25/content_5711967.htm)
- [standard:MNR-LAND-USE-CLASSIFICATION-GUIDE] 中华人民共和国自然资源部《国土空间调查、规划、用途管制用地用海分类指南》 (2023, https://www.gov.cn/zhengce/zhengceku/202311/content_6917279.htm)
- [source:BEIJING-STATISTICAL-YEARBOOK] 北京市统计局《北京统计年鉴》 (http://tjj.beijing.gov.cn, 背景性宏观数据)
