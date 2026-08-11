# 版权与权利声明

## 方案版权

- **方案名称**：京张智脉共生带：百年铁路文脉与AI创新生态的城市设计方案
- **作者**：lilexi-bot (GitHub: @lilexi-bot)
- **许可证**：COMMUNITY-DISPLAY-ONLY
- **生成方式**：由 AI Agent (WorkBuddy/CodeBuddy) 生成，人类用户 (@lilexi-bot) 审核提交
- **生成日期**：2026-08-08

## 逐文件权利台账

| 文件 | 类型 | 作者/来源 | 生成方式 | 许可 | 允许用途 | 修改记录 |
|------|------|-----------|----------|------|----------|----------|
| proposal.md | 文本 | lilexi-bot / AI Agent | AI生成+人工审核 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 初版 |
| manifest.json | 数据 | AI Agent | 脚本生成 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 初版 |
| agent.json | 数据 | AI Agent | 脚本生成 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 初版 |
| metrics.json | 数据 | AI Agent | 从GeoJSON复算 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 修正provisional置信度 |
| assumptions.json | 数据 | AI Agent | 人工编写 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 初版 |
| sources.json | 数据 | AI Agent | 从source_registry复制 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 初版 |
| compliance_matrix.json | 数据 | AI Agent | 人工编写 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 初版 |
| standard_matrix.json | 数据 | AI Agent | 人工编写 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 初版 |
| design_depth_matrix.json | 数据 | AI Agent | 人工编写 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 初版 |
| geometry/*.geojson | 空间数据 | AI Agent | 从provisional_boundaries派生 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 provisional_constraint |
| assets/figures/*.png | 图像 | AI Agent / Pillow | Python Pillow生成 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 使用Noto Sans CJK字体 |
| report/proposal.html | HTML | AI Agent | render_proposal_html.py生成 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 初版 |
| report/narrative.md | 文本 | AI Agent | 人工编写 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 初版 |
| drawings/a3-booklet.pdf | PDF | AI Agent / ReportLab | ReportLab+STSong-Light生成 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 6页中文版 |
| drawings/a0-boards.pdf | PDF | AI Agent / ReportLab | ReportLab+STSong-Light生成 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 1页中文版 |
| visual/index.html | HTML | AI Agent | 脚本生成 | COMMUNITY-DISPLAY-ONLY | 征集展示与评审 | v1.0 初版 |

## 字体使用

| 字体 | 来源 | 许可 | 用途 |
|------|------|------|------|
| Noto Sans CJK Regular | Google Noto Fonts (开源) | SIL Open Font License 1.1 | PNG图片中文显示 |
| Noto Sans CJK Bold | Google Noto Fonts (开源) | SIL Open Font License 1.1 | PNG图片中文标题 |
| STSong-Light (CID) | Adobe CID Font (系统内置) | Adobe Systems 许可 | PDF中文显示 |
| DejaVu Sans | 开源字体 | 公共领域 | PNG图片英文/数字 |

## 图像素材

- 所有 PNG 图片均由 Python Pillow 库程序生成，不包含任何第三方照片、插图或截图
- 所有 SVG 图形为原创程序生成，不引用任何外部地图瓦片或商业地图截图
- 颜色方案为自定义，不模仿任何特定品牌或商标

## 代码素材

- PDF 生成使用 ReportLab 开源库 (BSD 许可证)
- 图片生成使用 Pillow 开源库 (HPND 许可证)
- 几何计算使用 Shapely 开源库 (BSD 许可证)
- 投影转换使用 pyproj 开源库 (MIT 许可证)

## 数据素材

- 场地边界、重点区域边界来自 brief/site-package/geometry/provisional_boundaries.geojson
- 该文件标注为 provisional_constraint, official_boundary=false
- 来源类型为 agent_inferred_from_public_data
- 依据为公告文字四至和道路名称推断的临时粗略范围
- 不使用任何非公开地图、内部数据或未授权商业地图

## 声明

1. 本方案不包含任何未经授权的商标、字体、图片、人物肖像、论文图像或版权材料
2. 所有 AI 生成内容已由作者 (@lilexi-bot) 审核并对事实、引用、版权和最终表达负责
3. 方案中提到的企业名称、机构名称仅作为公开案例参考，不构成商业推广或背书
4. 方案不声称获得任何形式的行政审批背书或确定实施承诺
