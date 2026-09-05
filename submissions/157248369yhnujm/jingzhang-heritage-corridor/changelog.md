# 方案迭代记录 · 百年京张文化走廊 / Centennial Jing-Zhang Heritage Corridor

## v0.3 - 2026-08-09
- 完成 9 个 GeoJSON 设计图层（site_boundary、key_areas、land_use、buildings、roads、green_space、public_space、constraints、phasing）。
- 由脚本 `scripts/build_submission_artifacts.py` 在 EPSG:4548 下复算 metrics；site_area_sqm = 11412825.386，green_ratio = 0.3036，public_space_ratio = 0.054008。
- 替换 5 张 PNG 图为 technical-schematic 风格派生图；provisional boundary 弱化为虚线参考线。
- 引入主品牌「百年京张文化走廊 / Centennial Jing-Zhang Heritage Corridor」与三廊三区两翼结构。
- 引入 10 张 AI 场景卡、5 类用户画像、3 张 AI 产业测试验证场景、3 个 AI 朝圣地标候选。
- 补全双语契约 v1：proposal.md、proposal.en.md、report/proposal.html、report/proposal.en.html、visual/index.html、visual/index.en.html、drawings/a3-booklet.{pdf,.en.pdf}、drawings/a0-boards.{pdf,.en.pdf}。
- 生成 risk.json（含 8 个 1-5 分风险维度）、spatial.json（含 12 个概念节点）、changelog.md 与 metadata JSON。

## v0.2 - 2026-08-09
- 完成 fork、轻量 sparse workspace、urban-design-ai-submission skill 安装。
- 启动 venv 并安装 jsonschema / shapely / pyproj / Pillow / matplotlib / weasyprint。

## v0.1 - 2026-08-09
- 在 fork 中运行 `scripts/scaffold_ai_submission.py --stage formal` 生成骨架。
- 阅读 SKILL.md、formal-submission-guide.md、agent_taskbook.json、provisional_boundaries.geojson、standards.json、terminology-glossary.md 等资料。