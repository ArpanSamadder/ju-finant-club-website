import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';

const baseUrl = process.env.HERO_QA_BASE_URL || 'http://127.0.0.1:3000';
const outputDir = process.env.HERO_QA_OUTPUT_DIR || 'artifacts/hero';
const widths = [1440, 1280, 768, 390, 360];
const checks = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
  checks.push(message);
}

await mkdir(outputDir, {recursive: true});
const browser = await chromium.launch({headless: true});

try {
  for (const width of widths) {
    const height = width >= 1024 ? 900 : width >= 768 ? 900 : 844;
    const context = await browser.newContext({viewport: {width, height}, deviceScaleFactor: 1});
    const page = await context.newPage();

    try {
      await page.goto(baseUrl, {waitUntil: 'networkidle'});
      const hero = page.locator('section[aria-labelledby="homepage-hero-title"]');
      const heading = hero.getByRole('heading', {name: 'Building Future-Ready Professionals.'});
      const primaryCta = hero.getByRole('link', {name: 'Explore FinAnt'});
      const currentEvent = hero.getByRole('link', {name: /Biztigation 2\.0/i});

      await hero.waitFor({state: 'visible'});
      assert(await heading.isVisible(), `${width}px: Hero headline is visible`);
      assert(await primaryCta.isVisible(), `${width}px: Explore FinAnt CTA is visible`);
      assert(await currentEvent.isVisible(), `${width}px: Current Event CTA is visible`);

      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      assert(dimensions.scrollWidth <= dimensions.clientWidth + 1, `${width}px: no horizontal page overflow`);

      const heroBox = await hero.boundingBox();
      assert(Boolean(heroBox && heroBox.width <= width + 1 && heroBox.height > 0), `${width}px: Hero stays inside viewport`);

      const artwork = hero.locator('picture img');
      const currentSource = await artwork.evaluate((image) => image.currentSrc);
      const expectedAsset = width <= 767 ? 'hero-mobile.' : 'hero-desktop.';
      assert(currentSource.includes(expectedAsset), `${width}px: correct responsive Hero artwork is selected`);

      await page.screenshot({path: `${outputDir}/hero-${width}.png`, fullPage: false});
    } finally {
      await context.close();
    }
  }

  console.log(`Hero QA passed: ${checks.length} checks.`);
  for (const check of checks) console.log(`PASS: ${check}`);
} finally {
  await browser.close();
}
