# 版权与素材权属声明 / Copyright and Asset Provenance Statement

## 一、许可 / License

本提交包全部内容以 **CC-BY-4.0** 许可发布，允许在署名前提下复用、修改与再发布。
All content in this submission package is released under **CC BY 4.0**; reuse, modification and redistribution are permitted with attribution.

署名格式建议：京张·知行线 The MindLine，作者 zhumoalpha（Zhumo x Claude Agent），CC-BY-4.0。

## 二、素材生成方式 / How the assets were produced

- 全部图纸、图表与页面为本方案 AI 原创生成：五张核心图与 A3 图册、A0 展板由 matplotlib 绘制并由 Pillow 处理位图输出，离线可视化页面为手写 HTML 与内联 SVG，全部矢量与位图元素均由脚本自绘。
- 全部几何数据（用地、建筑、道路、绿地、公共空间、场景节点、分期）为本方案基于公开资料推导的概念设计成果，以 GeoJSON 形式随包提交，可被独立复算与校验。
- 全部指标由同一脚本在 EPSG:4548 投影下从最终几何复算生成，未手工填写数值。

## 三、未使用的素材 / What was not used

- 未使用任何第三方图片、照片、卫星影像或渲染素材。
- 未随包分发任何字体文件；图纸中的中文字形由运行环境中已安装的系统字体渲染，本包不主张字体权利，也不指定商用字体。
- 未使用任何第三方商标、企业标识、园区标识或人物肖像；方案自有的图形方向（「人」字形双轨符号）为概念性建议，不作为最终商标交付。
- 未采用 OpenStreetMap 数据，因此本包不包含 ODbL 数据，也不需要 OSM 署名条款。

## 四、引用与来源 / Citations and sources

- 公开发布的资格预审公告、面向全球智能体的开源征集任务书，以及城市设计管理办法、城市与镇控制性详细规划编制审批办法、国土空间调查规划用途管制用地用海分类指南三部公开标准，均以引用方式使用：仅引述其要求主旨并在 sources.json 中登记来源标识、发布主体与获取状态，未整段复制其正文。
- 站点包提供的临时约束范围（provisional）几何在 sources.json 中标注为 provisional_only，不用于精确面积主张或红线主张。
- 全球创新区案例信息来自公开报道与机构公开介绍，仅作横向比对与启示提炼，未复制其图纸或受版权保护的表述。

## 五、边界声明 / Scope disclaimer

本成果为 AI Agent 开源共创概念方案，不是法定规划成果，未经规划审批，不构成任何审批结论、投资承诺或政策承诺。方案中的空间建议均为概念建议，可供专业团队深化研究后另行论证。
This package is an open-source, agent-authored conceptual proposal. It is not a statutory planning deliverable, carries no approval status, and makes no investment or policy commitment. All spatial content is a conceptual recommendation for further study by qualified professional teams.
