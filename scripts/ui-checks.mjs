import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = process.env.UI_BASE_URL || 'http://localhost:3000';
const out = process.env.UI_OUTPUT_DIR || '/tmp/solar-ui';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
const result = { routes: [], interactions: [], errors: [], photos: [] };
page.on('pageerror', error => result.errors.push(String(error)));
const visit = route => page.goto(base + route, { waitUntil: 'domcontentloaded' });
const passed = name => result.interactions.push(name);
const routes = ['/', '/docs', '/docs/04-day1-panel-multimeter', '/hardware', '/hardware/ESP32-DevKitC', '/curriculum', '/calculator', '/workbook', '/glossary', '/gallery', '/tools'];
try {
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      const response = await visit(route);
      assert.equal(response.status(), 200, route);
      await page.waitForTimeout(150);
      assert.ok((await page.locator('h1').innerText()).length > 0, route + ': blank h1');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `${width} ${route}: horizontal overflow`);
      result.routes.push({ width, route, status: response.status(), title: await page.title() });
      if ([1440, 390].includes(width)) {
        await page.screenshot({ path: `${out}/${width}-${route.replaceAll('/', '_')}.png`, fullPage: true });
      }
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await visit('/');
  await page.getByRole('button', { name: '가리기', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: '가리기', exact: true }).getAttribute('aria-pressed'), 'true');
  assert.match(await page.locator('.scene-response').innerText(), /줄어들어요/);
  await page.getByRole('button', { name: '햇빛', exact: true }).click();
  assert.match(await page.locator('.scene-response').innerText(), /전기를 만들어요/);
  passed('light demonstration responds without claiming live measurements');
  await page.locator('.journey-day').nth(2).click();
  assert.match(await page.locator('.journey-preview a').getAttribute('href'), /06-day3-ina219/);
  passed('day selection changes illustration, goal, materials and destination');
  await page.locator('.hero-action').click();
  await page.waitForURL('**/docs/02-safety-rules');
  assert.ok(await page.locator('.lesson-safety').isVisible());
  passed('primary start action leads to safety before the first experiment');

  const day1 = '04-day1-panel-multimeter';
  await visit('/docs/' + day1);
  const stepCount = await page.locator('.step-item').count();
  assert.equal(await page.locator('.step-body:visible').count(), 1);
  await page.getByRole('button', { name: '전체 보기', exact: true }).click();
  assert.equal(await page.locator('.step-body:visible').count(), stepCount);
  await page.getByRole('button', { name: '한 단계씩', exact: true }).click();
  const original = await page.evaluate(slug => localStorage.getItem('lesson-steps-' + slug), day1);
  await page.locator('.step-title').nth(1).click();
  assert.equal(await page.evaluate(slug => localStorage.getItem('lesson-steps-' + slug), day1), original);
  await page.locator('.step-title').first().click();
  await page.locator('.step-body:visible .lab-button').click();
  assert.deepEqual(await page.evaluate(slug => JSON.parse(localStorage.getItem('lesson-steps-' + slug)), day1), [0]);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelector('.step-title[aria-expanded="true"] .step-number')?.textContent === '2');
  passed('reading does not mark completion; saved progress survives reload');
  for (let i = 1; i < stepCount; i++) await page.locator('.step-body:visible .lab-button').click();
  assert.equal(await page.getByRole('progressbar', { name: '실험 진행도' }).getAttribute('aria-valuenow'), '100');
  await page.screenshot({ path: `${out}/lesson-complete.png`, fullPage: true });
  await visit('/');
  await page.waitForFunction(() => document.querySelector('.journey-progress b')?.textContent === '1');
  assert.equal(await page.locator('.journey-day').nth(1).getAttribute('aria-pressed'), 'true');
  passed('home resumes at the next unfinished day using existing storage keys');
  await visit('/docs/05-day2-wire-and-load');
  assert.equal(await page.getByRole('progressbar').getAttribute('aria-valuenow'), '0');
  assert.equal(await page.evaluate(slug => JSON.parse(localStorage.getItem('lesson-steps-' + slug)).length, day1), stepCount);
  await page.evaluate(() => localStorage.setItem('lesson-steps-06-day3-ina219', '{broken-json'));
  await visit('/docs/06-day3-ina219');
  await page.locator('.step-body:visible .lab-button').waitFor();
  assert.equal(await page.getByRole('progressbar').getAttribute('aria-valuenow'), '0');
  passed('lesson changes do not overwrite other progress; malformed storage is ignored');

  await page.setViewportSize({ width: 390, height: 1000 });
  await page.getByRole('button', { name: '메뉴 열기', exact: true }).click();
  assert.ok(await page.getByRole('navigation', { name: '모바일 내비게이션' }).isVisible());
  await page.getByRole('navigation', { name: '모바일 내비게이션' }).getByRole('link', { name: '학습 도구' }).click();
  await page.waitForURL('**/tools');
  assert.equal(await page.getByRole('navigation', { name: '모바일 내비게이션' }).isVisible(), false);
  await page.getByRole('button', { name: '메뉴 열기', exact: true }).click();
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('button', { name: '메뉴 열기', exact: true }).evaluate(el => document.activeElement === el), true);
  passed('mobile navigation routes, closes after navigation and restores focus on Escape');
  await visit('/gallery');
  const image = page.getByRole('button', { name: '전체 실험, 한눈에 크게 보기' });
  await image.click();
  assert.ok(await page.getByRole('dialog').isVisible());
  await page.getByRole('button', { name: '확대', exact: true }).click();
  assert.match(await page.locator('.image-dialog[open] .image-dialog-toolbar').innerText(), /150%/);
  await page.screenshot({ path: `${out}/mobile-image-zoom.png`, fullPage: false });
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog[open]').count(), 0);
  assert.equal(await page.evaluate(() => document.body.style.overflow), '');
  assert.equal(await image.evaluate(el => document.activeElement === el), true);
  passed('image dialog zoom, Escape, background scroll and trigger focus work');

  const limited = await browser.newContext();
  await limited.addInitScript(() => {
    Storage.prototype.getItem = function () { throw new Error('Storage blocked for test'); };
    Storage.prototype.setItem = function () { throw new Error('Storage blocked for test'); };
  });
  const limitedPage = await limited.newPage();
  await limitedPage.goto(base + '/docs/' + day1, { waitUntil: 'domcontentloaded' });
  await limitedPage.locator('.step-body:visible .lab-button').click();
  await limitedPage.locator('.storage-warning').waitFor();
  await limited.close();
  passed('blocked storage keeps the lesson usable and warns instead of crashing');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await visit('/gallery');
  await page.locator('.real-photos').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  result.photos = await page.locator('.photo-figure').evaluateAll(figures => figures.map(f => ({ caption: f.querySelector('figcaption')?.textContent, loaded: !!f.querySelector('img')?.naturalWidth, fallback: !!f.querySelector('.photo-fallback') })));
  const fallback = await browser.newPage();
  await fallback.route('**/upload.wikimedia.org/**', route => route.abort());
  await fallback.goto(base + '/hardware/ESP32-DevKitC', { waitUntil: 'domcontentloaded' });
  await fallback.locator('.photo-figure').scrollIntoViewIfNeeded();
  await fallback.locator('.photo-fallback').waitFor();
  assert.ok(await fallback.locator('.photo-credit a').first().isVisible());
  await fallback.close();
  passed('photo failures retain explanation and attribution/source links');
  assert.deepEqual(result.errors, []);
} catch (error) {
  result.failure = String(error);
  await page.screenshot({ path: `${out}/failure.png`, fullPage: true }).catch(() => {});
  throw error;
} finally {
  fs.writeFileSync(`${out}/results.json`, JSON.stringify(result, null, 2));
  await browser.close();
}
