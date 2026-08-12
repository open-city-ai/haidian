# 方案迭代记录

## v0.2 - 2026-08-11

- 回应 PR #1756 AI 评审（request-changes，七维 55/100）：
  - 新增版权与来源权利台账（`report/copyright_statement.md` 详细化：字体 OFL、生成工具许可、数据来源、许可声明），`sources.json` 来源分级修正（KW/HAIDIAN/OSM 标为 background_only，新增无障碍法、生成式AI办法两项注册表已批正式来源）。
  - 修复图件：英文图例截断（图例支持换行）、key-areas 底部文字叠压（独立背景条）、A3/A0 按语言使用对应图件、A0 排版放大。
  - 新增全球 AI 创新生态案例表（8 例具名）、区域协同接口表（5 项，标研究假设）、场景—空间—运营矩阵（10 场景 × 8 列）、朝圣地标目录（3 处）、荣誉展示体系、公共空间组件库、分期实施要素表、年度活动与运营机制表。
  - 新增包容性与无障碍内容（扩展画像、无账号/无手机/人工后备、申诉纠错机制）。
  - 新增临时边界就地标注说明与 Logo 概念可视化（visual 工作台 SVG）。
  - 澄清 COMMUNITY-DISPLAY-ONLY 许可与公共知识库深化之间的复用边界。

## v0.1 - 2026-08-11

- 创建独立方案「京张AI驿站带 / Jing-Zhang AI Inn Belt」（slug: jingzhang-ai-inns），与既有提交（jingzhang-ai-innovation-belt、jingzhang-microloop PR #1739）相互独立。
- 依据公告与任务书完成六项 agent 任务覆盖：总体概念与命名体系、AI 全栈创新生态、AI+ 场景卡（10 张）与用户画像（5 类）、公共空间与朝圣地标、百年京张文化叙事、活动体系与运营机制。
- 生成 9 个几何图层（site_boundary/key_areas/land_use/buildings/roads/green_space/public_space/phasing/constraints），边界与重点区域均标注 `provisional_constraint`。
- 生成指标（EPSG:4548 复算）、5 张双语图件、A3 文册与 A0 展板（中英）、提案 HTML 与可视化工作台（中英）。
- 运行 render → finalize → self-check → preflight 全流程。
