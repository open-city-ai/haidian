# 版权与来源声明（资产级登记）

登记日期：2026-08-13（本修复轮次）。本声明与 `sources.json` 一起构成资产级来源与许可证明；无法核验来源的资产一律不保留。

## 1. 图件资产（assets/figures/）

| 资产 | 生成方式 | 来源 | 许可/权利 |
| --- | --- | --- | --- |
| site-overview.png / .en.png | Pillow 数据驱动渲染（基于 geometry/*.geojson 与 metrics.json） | 提交方原创生成 | 本包 COMMUNITY-DISPLAY-ONLY；底图几何来自仓库临时边界（official_boundary=false） |
| land-use-structure.png / .en.png | 同上 | 提交方原创生成 | 同上 |
| key-areas.png / .en.png | 同上 | 提交方原创生成 | 同上 |
| mobility-bluegreen.png / .en.png | 同上 | 提交方原创生成 | 同上 |
| metrics-evidence.png / .en.png | 同上 | 提交方原创生成 | 同上 |
| ecosystem-map.png / .en.png | 同上 | 提交方原创生成 | 同上 |
| logo.png | 提交方原创绘制（轨道剖面×电路走线同构图形） | 提交方原创 | 无第三方商标/图片/字体重绘；正式使用前按边界条款清权 |

未使用任何外部图片、地图瓦片、示意图或截图；所有图件由同一组 GeoJSON、metrics.json、矩阵与自检结果派生，并以 provisional estimate 标注临时边界。

## 2. 字体资产

| 字体 | 用途 | 来源 | 许可 |
| --- | --- | --- | --- |
| WenQuanYi Zen Hei（文泉驿正黑） | 中文图件与 PDF 文字 | 系统字体包 /usr/share/fonts/truetype/wqy/wqy-zenhei.ttc | GPL v3 含字体嵌入例外（font embedding exception），允许嵌入生成文档；详见 https://www.wenq.org/ |
| DejaVu Sans | 英文图件与 PDF 文字 | 系统字体包 | Bitstream Vera Fonts 版权（许可自由嵌入） |

## 3. 地图与数据资产

| 资产 | 来源 | 边界 |
| --- | --- | --- |
| 总体设计范围/重点区域临时几何 | brief/site-package/geometry/provisional_boundaries.geojson（依据官方公告文字四至与约面积推定） | provisional_constraint，official_boundary=false；不作为红线或精确面积依据 |
| 官方公告 | 北京市规划和自然资源委员会海淀分局公告（2026-05-09），URL 见 sources.json | 政府公开信息，事实性引用与转述 |
| 历史素材（京张铁路/詹天佑） | 公开史料与仓库 standards 参考 | 事实性转述，需专业史学核验 |

## 4. 代码依赖与生成工具

| 工具 | 版本 | 许可 | 用途 |
| --- | --- | --- | --- |
| Python | 3.12.3 | PSF | 脚本运行环境 |
| Pillow | 10.4.0 | HPND | 图件栅格化 |
| reportlab | 5.0.0 | BSD-style | A3/A0 PDF 排版 |
| shapely / pyproj / jsonschema | 见 requirements-review.txt | BSD/MIT | 空间复核与模式校验 |
| 仓库脚本 | scripts/*.py（validate_submission.py、spatial_review.py、visual_review.py、professional_review.py、render_proposal_html.py 等） | 仓库许可 | 校验与渲染 |

## 5. 无法核验资产的处理

本包不保留任何无法核验来源的图片、字体、Logo、地图或数据。历史上由 OCR 转译附加的图面（曾出现中文缺字/英文残留方框）已在本修复轮次整体删除并重绘；重绘图件全部为数据驱动原创渲染，逐项可在本声明与 sources.json 中溯源。

## 6. 边界声明

本声明不构成现实世界版权或审批证明；提交方对事实、来源、版权、空间数据、指标和表达负责。所有空间落地建议为概念建议/参考方案/可供专业团队深化研究，不替代正式规划，不构成政府审定结论。
