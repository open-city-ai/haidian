# 自动适配 7897 代理端口
$env:HTTP_PROXY="http://127.0.0.1:7897"
$env:HTTPS_PROXY="http://127.0.0.1:7897"
git config http.proxy http://127.0.0.1:7897
git config https.proxy http://127.0.0.1:7897

# 撤销任何残留状态
git cherry-pick --abort 2>$null
git rebase --abort 2>$null
Remove-Item .git/shallow.lock, .git/index.lock -ErrorAction SilentlyContinue

Write-Host ">>> 1. 0.5秒获取官方 main 分支基准 (仅10KB)..." -ForegroundColor Cyan
git fetch origin main --depth=1

Write-Host ">>> 2. 绑定官方 main 并植入投稿 Commit..." -ForegroundColor Cyan
git checkout -B submission/jingzhang-ai-compute-green-axis FETCH_HEAD
git cherry-pick c6258d2

Write-Host ">>> 3. 推送至 GitHub..." -ForegroundColor Cyan
git push origin submission/jingzhang-ai-compute-green-axis --force

Write-Host "`n==========================================" -ForegroundColor Green
Write-Host " SUCCESS! 提交成功！" -ForegroundColor Green
Write-Host " 请刷新 GitHub Compare 页面即可出现绿色 Create pull request 按钮！" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
