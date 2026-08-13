# Copyright Statement · 版权与许可说明

## 1. 方案主许可

本投稿包（`submissions/StrGin/jingzhang-twin-rail-ai-belt/`）以 `COMMUNITY-DISPLAY-ONLY` 许可发布：

- 允许：阅读、检索、评审、维护者合并到 `main` 后在 `haidian.open-city.ai` 公开展示页引用；维护者按 `docs/maintainer-workflow.md` 运行 reviewer 脚本生成 review-input；
- 不允许：被声称为政府审定规划、被用于商业品牌注册、被作为任何形式官方背书；
- 替换条件：当官方 polygon/CAD/GIS/PDF 红线发布并登记后，本包内的 provisional 几何、面积、比例与文案必须按 `replacement_rule` 重新复算。

## 2. 资料与文本引用

- 仅引用 `data/source_registry.json` 中登记的 formal-ready 与 provisional 资料；详见 `sources.json`；
- 公告与任务书原文版权归原发布机构（北京市规划和自然资源委员会海淀分局、open-city.ai）所有；
- 专业标准（MOHURD / MNR）按政府公开法规引用，不复制全文；
- 已合入方案的可借鉴经验（视觉风格、矩阵组织、双语结构、可视化思路）来自 `submissions/*/`，仅取公开发布且与本方案概念方向一致的部分；不复制对方原创文字、图面或 Logo；引用前逐条核验 license。

## 3. 图件、Logo、字体、商标、肖像

- 全部 10 张图件（5 主题 × 中英）与 3 张重点区节点详图为基于本方案 GeoJSON / metrics / 矩阵的本地派生图（Pillow 渲染），不引用未清权图片；
- Logo 概念方向（\"双轨智带 JZ-AI Belt\" + Action Blue #0066cc + 百年京张红铜 #B46A3F）仅作概念方向建议，不主张商标注册或字体商用；
- 中文/英文显示使用 **Noto Sans SC（思源黑体，SIL Open Font License 1.1）** 作为渲染字体，该字体许可允许自由使用、修改与嵌入；PDF 与 PNG 均未嵌入受限制字体；
- 不使用任何人物肖像、商标、论文图像或企业标识作为正式核心成果。

## 3a. 逐资产权利清单（asset rights ledger）

| 资产 | 生成/来源方式 | 权利状态 | 许可/署名 |
| --- | --- | --- | --- |
| 9 个 GeoJSON 几何图层 | 本包脚本 `gen_jz_submission_geometry.py` 基于公告文字四至推导 | 自绘（provisional） | 无第三方权利；边界非官方红线 |
| 10 张主题图 + 3 张节点图（PNG） | 本包脚本 `gen_jz_figures.py`（Pillow）基于本包几何/指标渲染 | 自绘 | 无第三方素材 |
| 4 个 PDF（A3/A0，中英） | 本包脚本 `gen_jz_pdfs.py` 组装本包图件 | 自绘 | 无第三方素材 |
| visual/index.html、index.en.html、report/proposal*.html | 本包脚本 `gen_jz_visual.py` 生成 | 自绘（内嵌 SVG 地图） | 无第三方素材 |
| proposal.md / proposal.en.md / narrative.md | StrGin Agent 撰写 | 原创文本 | COMMUNITY-DISPLAY-ONLY |
| 字体（渲染用） | Noto Sans SC（思源黑体） | SIL OFL 1.1 | 可自由使用/嵌入/修改；署名见 OFL 1.1 |
| 图标与色板 | 自绘矢量/纯色块 | 原创 | 无第三方素材 |
| 数据来源（公告/任务书/标准） | 公开政府公告与仓库资料 | 见 `sources.json` | 引用注明出处，不复制全文 |

> 补充说明：Windows 微软雅黑（msyh.ttc）仅作为本机渲染环境备选字体，未嵌入任何交付文件；本包全部交付图件/PDF 均以 Noto Sans SC 渲染。

## 4. 工具链与依赖

- Python 3.13.12 + jsonschema 4.26.0 + Pillow 12.3.0 + pyproj 3.7.2 + shapely 2.1.2；详见 `requirements-review.txt`；
- 几何生成脚本：仓库内 `scripts/gen_jz_submission_geometry.py`（非官方提交物，评审可不打开）；
- 图件渲染脚本：仓库内 `scripts/gen_jz_figures.py`；
- PDF 渲染脚本：仓库内 `scripts/gen_jz_pdfs.py`。

## 5. AI 生成内容责任

- 本方案由 StrGin Agent 在 WorkBuddy 环境中生成；
- 引用与生成内容已按资料边界条款标注概念建议属性，未冒充官方审定结论；
- 所有事实判断须以 `sources.json` 与 `compliance_matrix.json` 中标注的 source_id 为准；
- 若发现事实错误或侵权，请在本方案 PR 或对应 Issue 中提出，StrGin Agent 将及时修正。

## 6. 联系

- 仓库 Issues：https://github.com/open-city-ai/haidian/issues
- 项目联系：contact@open-city.ai
- 作者 GitHub：https://github.com/StrGin