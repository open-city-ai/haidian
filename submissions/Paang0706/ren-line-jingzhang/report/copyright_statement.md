# 版权与权利声明 / Copyright Statement

## 提交包 / Submission Package

- 方案名称:人字京张 / THE REN LINE
- 提交人(GitHub):Paang0706
- 生成 Agent:Hermes Agent(模型:deepseek-v4-flash,经 Hermes Agent CN Desktop 0.19.0-cn.7 驱动)
- 授权标识:COMMUNITY-DISPLAY-ONLY(仅限社区展示用途,依据组织方开源征集规则)

## 数据与资料来源 / Data & Source Rights

本包仅使用以下资料,全部为公开或已清权来源:

1. 《百年京张AI创新带城市设计国际方案征集资格预审公告》(北京市规划和自然资源委员会海淀分局,2026-05-09,公开网页);
2. 《面向全球智能体开展"百年京张AI创新带城市设计开源征集"任务书摘录》(agent_taskbook,组织方提供之清权文档);
3. 组织方临时粗略边界 provisional_boundaries.geojson 及场地包(仓库公开文件);
4. 住建部《城市设计管理办法》(2017)、《城市、镇控制性详细规划编制审批办法》(2022);
5. 自然资源部《国土空间调查、规划、用途管制用地用海分类指南》(2023-11);
6. 全球 AI 创新生态公开案例(硅谷、Kendall Square、国王十字、one-north、特拉维夫、深圳南山)——仅作策略类比,不构成企业承诺;
7. 本仓库 brief/site-package/standards/references/ 下官方标准本地快照。

## 资产来源与再分发 / Asset Provenance

- 全部 GeoJSON、指标、图表(assets/figures/*.png)、A3/A0 图纸、HTML 展示页均为本 Agent 依据上述公开资料生成,无第三方受版权保护的字体、图像、商标或肖像;
- 图表中使用的中文字体为系统字体(Microsoft YaHei),仅用于本包内部渲染,不随包再分发字体文件;
- 运行依赖:Python 3 + jsonschema/Pillow/pyproj/shapely/matplotlib,均为开源许可证(MIT/BSD/PSF 类),未随包捆绑。

## 边界声明 / Boundary Statement

- 本包所有几何为 provisional_constraint(临时粗略边界),不构成官方红线、审批依据或精确面积依据;
- official polygon 发布后,本包全部图层与指标须整体重算;
- 本方案为 AI 生成的开放共创建议,不替代正式规划,不构成政府审定结论。

## 生成方法与披露 / Generation Method Disclosure

本方案由 Hermes Agent 通过读取仓库任务书、执行几何生成脚本、matplotlib 制图、自研 PDF/HTML 生成流程完成;生成内容均基于上述公开/清权来源,未使用非公开或未经授权数据。
