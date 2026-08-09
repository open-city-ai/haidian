# 版权与资产声明 / Copyright and Asset Statement

方案包：`submissions/Daolang239342/ren-track-ai-belt`（人字智轨 REN-Track）
生成日期：2026-08-10
生成方式：AI 智能体（deepseek-v4-flash，deepseek provider）在人类指导下生成，人工复核后提交。

## 1. 内容来源与许可

| 类别 | 来源 | 许可/清权状态 |
| --- | --- | --- |
| 官方公告快照 | 北京市规划和自然资源委员会海淀分局公告页（2026-05-09） | 官方公开信息，仅引用事实与任务要求 |
| 智能体任务书摘录 | 用户提供清权资料（2026-05-18） | 已清权用于本仓库 |
| 专业标准快照 | 住建部 / 自然资源部官方公开页面 | 官方公开标准，引用原则性要求 |
| 临时粗略边界 | 仓库维护者生成（provisional_boundaries.geojson） | 仓库许可，仅限临时生成/展示/自检 |
| 背景资料（全球案例、京张历史、大钟寺文保信息） | 各机构官网与公开报道、公开史料 | 背景性引用，已注明出处性质，不用于空间控制结论 |
| OpenStreetMap 底图背景 | OSM 贡献者 | ODbL：© OpenStreetMap contributors；仅作背景参考 |

完整逐条登记见 `sources.json`。

## 2. 原创资产

- `proposal.md` / `proposal.en.md`：本方案原创文本（中文主稿 + 英文等义译稿）
- `assets/figures/*.png`：由本方案 GeoJSON 与指标在 EPSG:4548 下派生绘制的原创图件（中英双语）
- `geometry/*.geojson`：本方案原创设计图层（用地/建筑/道路/绿地/公共空间/分期/约束）
- `visual/index.html` / `visual/index.en.html`：原创离线展示页（无外部资源）
- `drawings/a3-booklet*.pdf` / `drawings/a0-boards*.pdf`：原创图纸（展示层，非权威数据源）
- 命名「人字智轨 REN-Track」、Logo 方向与全部设计概念：本方案原创概念，供开放征集使用

## 3. 字体与工具链

| 资产 | 版本/来源 | 许可 | 是否再分发 |
| --- | --- | --- | --- |
| Hiragino Sans GB | macOS 系统字体 | Apple 系统字体许可 | 否（仅本地渲染使用） |
| Python 3.11 | python.org | PSF | 否 |
| matplotlib 3.9.4 | PyPI | PSF 兼容 | 否（构建依赖） |
| shapely / pyproj / Pillow / jsonschema | PyPI | BSD / MIT | 否（构建依赖） |
| 生成模型 deepseek-v4-flash | deepseek 平台 | 平台服务条款 | 否 |

字体与 Python 依赖仅用于本地生成图件与 PDF，未打包进提交；提交包内不含任何第三方字体文件。

## 4. 知识产权边界

- 本方案为开放共创建议，不替代正式规划，不构成政府审定结论；
- 未使用未经授权的商标、字体、图片、人物肖像、论文图像或版权材料；
- 涉及京张铁路历史、大钟寺（觉生寺）文保等信息均按公开资料背景引用，文保范围以文物主管部门公布为准；
- 投稿即同意仓库 COMMUNITY-DISPLAY-ONLY 展示与共享条款；主办方按官方公告 8.1 条款处理应征成果知识产权。
