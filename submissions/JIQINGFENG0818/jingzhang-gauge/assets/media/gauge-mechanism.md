# 视频文字稿与权利说明 / Transcript and rights note

**文件 / File**: `assets/media/gauge-mechanism.mp4`（55 秒，1280×720，24 fps）

**声音 / Audio**: 本视频为**无声视频**，不含任何语音、音乐或音效。This is a **silent video** with no speech, music, or sound effects. 全部信息以画面文字与图形呈现，并由 `gauge-mechanism.vtt` 字幕与本文字稿完整转写。

## 内容描述 / Content description

视频用六个段落解释「京张公制」的核心机制，全部图形由本包自有的已提交几何与指标数据绘制：

1. **00:00–00:07 标题**：总体概念「京张公制 The Jing-Zhang Gauge」与一句话概念——输出的不是建筑，而是一套任何人都能照着建、照着接、照着查的 AI 城市公共规范。核心符号（两条平行线加一个版本色刻度）逐步显现。
2. **00:07–00:16 场地**：总体设计范围地图逐层显现（用地、路网、绿地、边界），标注场地面积 11.41 km²（provisional）、绿地率 26.2%、道路面积率 21.1%，均引自 `metrics.json`（`site_area_sqm`、`green_ratio`、`road_area_ratio`）。
3. **00:16–00:25 版本线**：核心绿廊（`geometry/green_space.geojson#GS-001`）作为规范物理载体的版本线动画，说明版本色机制。
4. **00:25–00:36 三工位**：制标区、首装区、量产区三处重点区（`geometry/key_areas.geojson`）依次点亮，面积标注 192.1 / 104.3 / 72.0 ha，与正文一致。
5. **00:36–00:46 基准点**：D-01 零号基准、D-02 公议台、D-03 退役场（`geometry/public_space.geojson#PS-007/008/009`）定位显示，D-04 贡献碑沿版本线布置的机制以文字说明。
6. **00:46–00:55 收束**：核心论点（掌握标准即获得网络话语权）与完整合规声明。

每一帧底部持续显示合规提示：概念建议、非法定规划、基于组织方临时替代边界、非官方红线。

## 生成方式与来源 / Generation method and sources

- 视频由声明的 AI agent（见 `agent.json` 与 `manifest.agent`）使用 matplotlib 逐帧绘制、ffmpeg（libx264）编码生成。
- 全部地图图形仅使用本包 `geometry/` 目录下已提交的 GeoJSON（EPSG:4326 坐标经 EPSG:4548 投影绘制）；全部数字仅引自本包 `metrics.json` 与正文既有表述。
- **不使用**任何第三方影像、照片、卫星图、地图瓦片、图标库、模板或既有视频素材；不描绘任何真实人物；不含个人数据。
- 字体为 Noto Sans CJK（SIL Open Font License 1.1），仅以栅格化形式出现在视频帧与图片中，不随包分发字体程序文件。

## 权利与边界 / Rights and limitations

- 本视频与其海报、封面、字幕、文字稿按本方案 `COMMUNITY-DISPLAY-ONLY` 许可提交，权利声明随包内 `report/copyright_statement.md` 一并核验。
- 视频内容为**概念机制示意**，不是官方效果图、审定方案、建成实景、经核实的居民意见或精确场地条件的呈现；所依据边界为组织方提供的临时替代边界，官方数据发布后相关图面须重算。
