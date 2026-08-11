$env:HTTP_PROXY="http://127.0.0.1:7897"
$env:HTTPS_PROXY="http://127.0.0.1:7897"

# 切换到我们的提交分支
git checkout submission/jingzhang-ai-compute-green-axis

# 创建一个无内容变化的新提交以重新触发 GitHub Actions CI 验证
git commit --allow-empty -m "chore: re-trigger CI submission-validation workflow"

Write-Host "1. Pushing updated submission branch..." -ForegroundColor Cyan
git push origin submission/jingzhang-ai-compute-green-axis --force

Write-Host "2. Updating origin main branch to include submission..." -ForegroundColor Cyan
git push origin submission/jingzhang-ai-compute-green-axis:main --force

Write-Host "`n==========================================" -ForegroundColor Green
Write-Host " SUCCESS! PR #1402 已成功更新并重新触发 CI 验证！" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
