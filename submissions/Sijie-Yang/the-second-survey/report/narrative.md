# 叙事摘要与 SP-Survey 协议附件

规划说明正文见 `../proposal.md`。本附件提供方案摘要和可供后续实施的人在环路调研（SP-Survey）协议；本次提交尚未开展实际受访者调查。

## 叙事摘要

规划以京张铁路遗址公园为公共空间主轴，形成「一脊、三区、十八断面」的空间结构，以遮阴、绿视、驻留与夜间安全四项可复算指标决定更新顺序，并建立公众调研、建设后评估与年度监测的回写机制。说明书采用小说体叙事组织，共十三章：每章先讲一段发生在沿线的故事，再讲这段故事对应的规划怎么做，并各配一张规划图与一张概念效果图，合计 13 张规划图、13 张概念效果图与 1 张文化主视觉。故事人物为沿线使用者的合成形象，用于说明规划要解决的问题，不是已发生事件的记录；文化叙事与共创活动属于公众沟通内容，不作为现状事实或规划依据。

## SP-Survey 感知复测实施协议（待开展现场调查）

> 本文件为方案技术附件，用于说明如何采用人在环路评价方法校准“可感京张”公共空间感知基线。
> 本次成果不包含已完成的受访者数据，相关调查结论须在协议实施并完成样本质量审查后形成。

## 1. 目的

校准模型估计的断面短板排序，比较干预前后（概念方案 A/B）的公众偏好，回写 `assumptions.json` 与下一轮 `geometry/public_space` 优先级。

## 2. 工具

- 平台：SP-Survey（https://sp-survey.org）及开源部署
- 配置：同目录 `project-config.json`
- 方法参考：SP-Survey 论文；热舒适/街景感知仅作方法背景，不直接使用未清权街景图

## 3. 样本与伦理

- 目标人群：青年通勤者、居民、访客、配送人员和行动不便使用者；抽样方案拟采用分层配额方法，具体配额须在实施阶段确定
- 知情同意、可随时退出、不采集可识别生物特征
- 不上传个人轨迹；媒体仅用自制图示/概念渲染/清权示意图
- 未成年人数据不采集

## 4. 问卷模块

1. 人口背景（可选、粗粒度）
2. 断面图示两两比较（stated preference）
3. 遮阴/停留/夜间安全感李克特量表
4. 干预前后场景偏好
5. 开放反馈（可选）

## 5. 回写机制

- 聚合偏好 → 更新 shortfall 权重假设
- 显著分歧条目 → 进入人工复核清单
- 结果进入 changelog，并触发建设后评估公开看板更新（概念流程）

## 6. 与方案的接口

- 空间对象：`PS-SEC-*` 评估断面、`PS-LM-*` 主题标志节点
- 指标：`mean_perception_shortfall`, `high_shortfall_section_count`
- 运营：年度公共空间监测 + 微短剧共创的公众触点


## 可部署配置（JSON）

```json
{
  "project_id": "sensible-jingzhang-second-survey",
  "title": "《京张醒来之后》·第二次测量（感知偏好协议）",
  "version": "0.1.0",
  "language": "zh",
  "status": "protocol_ready_not_fielded",
  "ethics": {
    "informed_consent": true,
    "allow_quit_anytime": true,
    "no_biometrics": true,
    "no_raw_trajectories": true,
    "media_policy": "self_generated_or_cleared_diagrams_only"
  },
  "modules": [
    {"id": "consent", "type": "consent", "required": true},
    {"id": "persona_block", "type": "matrix", "required": false},
    {"id": "section_pairwise", "type": "ranking", "trials": 12, "required": true},
    {"id": "likert_comfort", "type": "matrix", "dimensions": ["shade", "stay", "night_safety"], "required": true},
    {"id": "intervention_ab", "type": "image_choice", "required": true},
    {"id": "open_feedback", "type": "text", "required": false}
  ],
  "stimuli": {
    "source": "assets/figures/* and self-generated diagrams",
    "forbid": ["uncleared_street_view", "faces", "copyrighted_photos"]
  },
  "linkage": {
    "geometry_features": ["PS-SEC-01", "PS-SEC-02", "PS-LM-1", "PS-LM-2", "PS-LM-3"],
    "metrics": ["mean_perception_shortfall", "high_shortfall_section_count"]
  }
}

```
