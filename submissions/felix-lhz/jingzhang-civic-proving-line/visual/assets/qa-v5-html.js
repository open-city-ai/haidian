const path = require('path');
const os = require('os');
const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  const root = path.resolve(__dirname, '..');
  const out = path.join(os.tmpdir(), 'jingzhang-v5-html-qa');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const report = { ok: true, pages: [], external_requests: [], console_errors: [] };
  for (const [file, width, height, name] of [['index.html', 1440, 1600, 'desktop'], ['index.html', 390, 844, 'mobile'], ['index.en.html', 1440, 900, 'english']]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
    page.on('request', (request) => { if (!/^(file|data):/.test(request.url())) report.external_requests.push(request.url()); });
    page.on('console', (message) => { if (message.type() === 'error') report.console_errors.push(message.text()); });
    await page.goto(`file:///${path.join(root, file).replace(/\\/g, '/')}`, { waitUntil: 'load' });
    const firstLook = await page.locator('.first-look').isVisible();
    const geometryCount = await page.locator('.v5-object').count();
    const version = await page.locator('#scenario-data').evaluate((node) => JSON.parse(node.textContent).schema_version);
    await page.screenshot({ path: path.join(out, `${name}-first.png`), fullPage: false });
    await page.locator('[data-mode="baseline"]').click();
    await page.locator('[data-scenario="SCN-005"]').last().click();
    const hashRestored = (await page.evaluate(() => location.hash)).includes('SCN-005');
    await page.keyboard.press('Tab');
    await page.screenshot({ path: path.join(out, `${name}-interaction.png`), fullPage: false });
    if (name === 'desktop') await page.locator('#scenarioCard').screenshot({ path: path.join(out, 'scenario-card.png') });
    report.pages.push({ name, firstLook, geometryCount, version, hashRestored, first_screenshot: path.join(out, `${name}-first.png`), interaction_screenshot: path.join(out, `${name}-interaction.png`) });
    if (!firstLook || geometryCount !== 42 || version !== '1.3.0' || !hashRestored) report.ok = false;
    await page.close();
  }
  if (report.external_requests.length || report.console_errors.length) report.ok = false;
  await browser.close();
  console.log(JSON.stringify(report, null, 2));
  process.exit(report.ok ? 0 : 1);
})().catch((error) => { console.error(error); process.exit(1); });
