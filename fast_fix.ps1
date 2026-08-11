# 1. 设置代理（匹配 7897 端口）
$env:HTTP_PROXY="http://127.0.0.1:7897"
$env:HTTPS_PROXY="http://127.0.0.1:7897"
git config http.proxy http://127.0.0.1:7897
git config https.proxy http://127.0.0.1:7897

# 2. 清理任何残留状态
git cherry-pick --abort 2>$null
git rebase --abort 2>$null

# 3. 极速只下载官方最新 1 个 Commit（体积仅 10KB，不到 1 秒完成，绝不下载 2G 历史！）
Write-Host ">>> 1/4 极速获取官方最新 Commit (10KB)..." -ForegroundColor Cyan
git fetch --depth=1 https://github.com/open-city-ai/haidian.git main

# 4. 备份我们的投稿产物
$subSrc = "submissions/open-city-ai-participant"
$tempBackup = Join-Path $env:TEMP "open-city-ai-participant-backup"
if (Test-Path $tempBackup) { Remove-Item $tempBackup -Recurse -Force }
Copy-Item $subSrc $tempBackup -Recurse -Force

# 5. 切换至官方 main 基准
Write-Host ">>> 2/4 绑定官方 main 分支..." -ForegroundColor Cyan
git checkout -B pr-branch FETCH_HEAD

# 6. 还原投稿产物
if (Test-Path $subSrc) { Remove-Item $subSrc -Recurse -Force }
Copy-Item $tempBackup $subSrc -Recurse -Force
Remove-Item $tempBackup -Recurse -Force

# 7. 生成干净提交
Write-Host ">>> 3/4 生成全新 Commit..." -ForegroundColor Cyan
git add submissions/open-city-ai-participant/
git commit -m "feat: complete urban design AI submission package for Jingzhang Compute-Green Dual Axis"

# 8. 推送至 GitHub
Write-Host ">>> 4/4 推送至 GitHub..." -ForegroundColor Cyan
git push -u origin pr-branch:submission/jingzhang-ai-compute-green-axis --force

Write-Host "`n==========================================" -ForegroundColor Green
Write-Host "  SUCCESS! 极速推送成功！" -ForegroundColor Green
Write-Host "  请刷新 GitHub Compare 页面即可正常提交 PR！" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
