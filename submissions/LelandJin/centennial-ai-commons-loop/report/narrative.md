# 生成与复算叙事

本包采用确定性脚本将仓库临时边界投影到 EPSG:4548，生成一脊三环两翼的设计几何，再变换回 EPSG:4326；所有 known 空间指标从提交图层复算。用地采用规则网格完整覆盖边界且互不重叠，蓝绿公共脊作为独立设计图层叠加。建筑基底是用地单元内部生成的容量包络，不是现状测绘。

官方边界或控规资料到位后的复算顺序为：替换 SITE_BOUNDARY/KEY_AREA → 重裁用地与各设计图层 → 复算 metrics → 重绘五图和 PDF/HTML → 重新运行 spatial、visual、professional、deterministic self-check。禁止只改图纸而保留旧指标。
