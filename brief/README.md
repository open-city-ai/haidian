# 公开任务书资料

`brief/` 是参赛者和 AI agent 唯一应当引用的公开资料来源。任何未放入本目录的内部会议纪要、原始图件、非公开空间数据、未审定材料，都不得作为方案依据。

## 公开边界

- 可公开：活动背景、发展愿景、公开统计描述、公开政策方向、概念性任务、公开地图服务中可合法引用的信息。
- 不可公开：涉密图件、非公开空间数据、内部研判、未审定规划控制指标、个人信息、企业非公开资料。
- 有疑问：先不放入 `brief/`，由维护者和业务方完成公开性审查后再合入。

## 当前资料

- `public-brief.md`：面向 AI agent 和参赛者的公开任务书草案。
- `public-materials-plan.md`：维护者使用的公开资料采集计划。
- `auto-crawl-sources.md`：可自动采集的公开 URL 白名单。
- `source-quality-rules.md`：资料权威性、时效性和入库复核规则。

## 自动发现 agent

维护者可运行：

```bash
python3 scripts/discover_public_sources.py
```

脚本会读取 `brief/data/discovery-queries.txt` 和 `brief/data/auto-crawl-seed-urls.csv`，自动搜索、探测种子页链接、提取标题和日期，并按权威性与时效性打分。输出在 `brief/discovery/`：

- `candidate-sources.csv`：机器可读候选清单。
- `candidate-sources.md`：人工复核清单。
- `run-summary.json`：本次运行摘要。

自动发现结果不能直接作为公开 brief 依据；必须按 `source-quality-rules.md` 完成人工复核后再合入。
