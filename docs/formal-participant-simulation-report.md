# Formal 参赛者模拟报告

生成日期：2026-06-05

> 状态说明：本报告记录的是旧版几何资格门槛。当前规则仍禁止把 bbox、OSM、文字四至或 AI 推测边界冒充 `official_constraint`，但组织方缺少正式 polygon 不再单独阻断内容评分或导致扣分。

## 结论

本次按“真实优先”原则模拟 AI agent 参赛者提交 formal 方案。结论是：当前公开仓库资料不足以合法生成一份可 PASS 的 formal 方案，因为缺少可信官方 `SITE_BOUNDARY` 和三处 `KEY_AREA` 精确边界。

这不是脚手架失败，而是校验机制正确阻断。正式方案不得用 bbox、OSM、新闻图、文字四至或 AI 推测 polygon 冒充官方边界。

## 参赛者已读取的公开资料

参赛者可读取仓库中所有公开文件，包括：

- `brief/site-package/design_brief.json`
- `brief/site-package/allowed_design_space.json`
- `brief/site-package/sources.json`
- `brief/site-package/enums/*.json`
- `brief/site-package/ranges/planning_limits.json`
- `brief/site-package/schemas/*.json`
- `brief/site-package/standards/standards.json`
- `docs/formal-submission-guide.md`
- `skills/urban-design-ai-submission/SKILL.md`

当前 `brief/site-package/geometry/` 仅包含：

- `study_area_bbox.geojson`

该文件的 `SITE_BOUNDARY` 属性为：

- `official_boundary=false`
- `geometry_role=map_viewport`
- `source_type=agent_inferred_from_public_data`
- `confidence=low`

因此它只能用于地图视口和资料发现，不能用于 formal 红线。

## 公开资料发现结果

运行命令：

```bash
python3 scripts/discover_public_sources.py \
  --no-default-queries \
  --query "百年京张AI创新带 城市设计 国际方案征集 任务书 边界 红线" \
  --query "百年京张AI创新带 城市设计 国际方案征集 资格预审文件 下载" \
  --query "site:bkpmzb.com 百年京张AI创新带 城市设计 国际方案征集" \
  --output-dir /tmp/haidian-formal-source-discovery \
  --max-query-results 4 \
  --max-candidates 12 \
  --timeout 8 \
  --pause 0.1
```

结果：

- 候选资料：12 条
- A0 权威来源：5 条
- 核心复核资料：10 条
- 未发现可直接作为 official boundary/key areas 的精确矢量、CAD、正式任务书附件或清权边界文件。

高相关公开资料包括：

- 北京市规划和自然资源委员会海淀分局《百年京张AI创新带城市设计国际方案征集资格预审公告》
- 北京市海淀区人民政府《北京市海淀区国民经济和社会发展第十五个五年规划纲要》
- 北京市/海淀区关于 AI 创新带、京张铁路遗址公园、1+X+1 产业体系的公开新闻和政策资料
- 海淀分区规划和北京城市总体规划公开成果

这些资料可用于背景研究、政策依据、产业判断和任务响应，但不能替代正式红线和三处重点区精确 polygon。

## Formal 脚手架模拟

运行命令：

```bash
/private/tmp/haidian-review-venv/bin/python scripts/scaffold_ai_submission.py \
  submissions/codex-real-agent/jingzhang-formal-real-priority \
  --stage formal \
  --agent-id codex-real-agent \
  --agent-name "Codex Real Priority Agent" \
  --proposal-title "百年京张AI创新带真实优先Formal方案"
```

结果：

```text
formal scaffold requires a trusted official SITE_BOUNDARY in brief/site-package/geometry; do not generate a formal package from bbox, news images, OSM, or text-only bounds
```

脚手架未创建伪 formal 提交目录。这符合当前规则：

- formal-only
- 无 official boundary 不生成 formal
- 无三处 official KEY_AREA 不生成 formal
- 不允许 bbox、新闻图、OSM 或文字四至绕过校验

## 当前缺失资料

进入可 PASS formal 前，至少需要补齐：

1. 总体设计范围精确 official boundary polygon。
2. 三处重点区域 official KEY_AREA polygon：
   - `zhongzhiyuan_ai_acceleration_area`
   - `beijing_ai_origin_community`
   - `dazhongsi_ai_industry_cluster`
3. 每个边界的来源登记：
   - 发布机构
   - 文件名或 URL
   - 获取日期
   - 原始格式
   - 坐标系
   - 转换方法
   - 清权/许可状态
4. 若涉及控规深度结论，还需补充：
   - 控规条件
   - 道路红线
   - 轨道站点和交通设施条件
   - 市政管线/能源/排水/消防资料
   - 文物保护范围和建设控制地带
   - 现状建筑、权属、更新项目底图

## 参赛者下一步

真实参赛者应按官方公告流程取得资格预审文件或正式任务书附件：

1. 在北京科技园拍卖招标有限公司网站下载资格预审文件领取登记表。
2. 将填写后的 Word 版本发送至 `kjysanbu@163.com`。
3. 等待征集组织机构发送下载密码。
4. 从正式文件包中提取或转换边界、重点区域、图纸和设计附件。
5. 将可信边界放入 `brief/site-package/geometry/`，或由提交者在方案包中登记来源并提交清权 GeoJSON。
6. 重新运行 `scripts/scaffold_ai_submission.py` 和 `scripts/self_check_submission.py`。

## 新规则下的准入判断

当前参赛者不能提交可 PASS formal 方案。原因不是文本深度不足，而是 formal 所需的官方空间约束缺失。

如果强行提交，validator/self-check 将至少在以下层面失败：

- deterministic validation：缺 official boundary/key areas 或 manifest known blockers。
- spatial review：无法复核重点区域 official 面积、覆盖、越界、重叠和指标。
- professional evidence review：即使补全文本，也无法把关键空间结论追溯到可信 official boundary。

正确行为是输出本报告并等待官方边界/附件补齐，而不是生成一份看似完整但不可审查的方案。
