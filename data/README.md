# 公开数据资料库

`data/` 用于登记、清洗和说明可公开资料。它不是投稿目录，也不是自动认可所有资料为 formal 依据；所有资料必须先经过来源、许可、可公开性和用途边界审查。

## 目录

- `source_registry.json`：公开资料登记表，记录来源、权威等级、时效等级、许可、用途和本地快照路径。
- `sources/`：原始公开资料索引或下载记录。不要提交需要登录、下载密码、内部账号或授权不明的原始文件。
- `processed/`：由公开资料清洗出的 Markdown、CSV 或字段说明。处理结果必须保留来源 ID。

## Agent 使用顺序

1. 先读取 `brief/public-brief.md` 和 `brief/site-package/`。
2. 再读取 `data/source_registry.json`，筛选 `review_status="approved"` 或 `review_status="provisional"` 的资料。
3. 只把 `usable_for_formal="yes"` 的资料写成 formal 依据；`background_only` 只能做背景叙述；`provisional_only` 只能用于 intake、可视化和设计讨论。
4. 在方案的 `sources.json` 中引用对应 `source_id`，并在 `proposal.md` 中用 `[source:...]` 解释资料如何支撑设计判断。
5. 如果资料涉及边界、道路、建筑高度、建设规模、控规条件或市政工程，必须确认它是否可作为 official/formal 依据；不确定时写入 `assumptions.json` 和 `self_check.json` 的 blockers。

## 维护者入库步骤

1. 确认资料公开可访问或已清权。
2. 登记 `source_registry.json`，写清 `allowed_uses` 与 `prohibited_uses`。
3. 如保存本地快照或处理文件，把路径写入 `local_paths`。
4. 运行：

```bash
python3 scripts/validate_data_registry.py
```

5. 只有通过校验的资料，才可被 agent 当作可引用资料使用。

## 从发现结果生成草稿

维护者可以先运行公开资料发现脚本，再生成待复核 registry 草稿：

```bash
python3 scripts/discover_public_sources.py --no-search --no-seed-links
python3 scripts/prepare_source_registry_draft.py --json
```

如果还没有 `brief/discovery/candidate-sources.csv`，draft 工具会回退读取 `brief/data/auto-crawl-seed-urls.csv`。默认输出 `data/source_registry.draft.json`，该文件被 `.gitignore` 忽略。草稿中的记录默认是 `review_status="needs_review"`，不能直接作为 formal 依据；维护者需要逐条确认发布机构、许可、用途边界和是否需要本地快照，再手动合并到 `data/source_registry.json`。

## 禁止入库

- 非公开规划图件、内部控制指标、未授权 CAD/GIS、带下载密码的资格预审附件原文。
- 商业地图截图、远程地图瓦片、版权不明图片。
- 个人信息、内部会议材料、账号内资料、无法确认授权的第三方文件。
- 用文字四至、新闻图、OSM 或 bbox 推断出的 official boundary。
