import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';

const baseUrl = process.env.HOMEPAGE_QA_BASE_URL || 'http://127.0.0.1:3000';
const outputDir = process.env.HOMEPAGE_QA_OUTPUT_DIR || 'artifacts/homepage';
const widths = [1440, 1280, 1024, 900, 768, 390, 360];
const checks = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
  checks.push(message);
}

function intersectsViewport(box, viewportWidth) {
  return Boolean(box && box.width > 0 && box.x < viewportWidth && box.x + box.width > 0);
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
      const legacy = page.locator('#legacy-foundation');
      const identity = page.locator('#our-identity');
      const voices = page.locator('#voices-of-finant');
      const partners = page.locator('#partners-collaborators');
      const closing = page.locator('#partner-with-us');

      for (const [name, locator] of [
        ['Hero', hero],
        ['Legacy', legacy],
        ['Our Identity', identity],
        ['Voices', voices],
        ['Partners', partners],
        ['Final CTA', closing],
      ]) {
        await locator.waitFor({state: 'visible'});
        assert(await locator.isVisible(), `${width}px: ${name} section is visible`);
      }

      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      assert(dimensions.scrollWidth <= dimensions.clientWidth + 1, `${width}px: no horizontal page overflow`);

      const sectionTops = await Promise.all([hero, legacy, identity, voices, partners, closing].map(async (locator) => (await locator.boundingBox())?.y ?? -1));
      assert(sectionTops.every((top, index) => index === 0 || top > sectionTops[index - 1]), `${width}px: homepage section order is stable`);

      const legacyCards = legacy.locator('article');
      assert((await legacyCards.count()) >= 5, `${width}px: Legacy has the five approved platforms`);
      const activeLegacy = legacy.locator('article[data-active="true"]');
      assert(await activeLegacy.isVisible(), `${width}px: Legacy active center card is visible`);
      const beforeLegacy = await activeLegacy.getAttribute('data-legacy-id');
      await legacy.getByRole('button', {name: 'Next legacy event'}).click();
      await page.waitForFunction(
        (previousId) => document.querySelector('#legacy-foundation article[data-active="true"]')?.getAttribute('data-legacy-id') !== previousId,
        beforeLegacy
      );
      const afterLegacy = await legacy.locator('article[data-active="true"]').getAttribute('data-legacy-id');
      assert(Boolean(beforeLegacy && afterLegacy && beforeLegacy !== afterLegacy), `${width}px: Legacy arrow changes the active card`);

      const legacyBoxes = [];
      for (let index = 0; index < await legacyCards.count(); index += 1) {
        const box = await legacyCards.nth(index).boundingBox();
        if (intersectsViewport(box, width)) legacyBoxes.push(box);
      }
      assert(legacyBoxes.length >= 3, `${width}px: Legacy keeps center and surrounding cards visible`);
      if (width <= 390) {
        const partialCards = legacyBoxes.filter((box) => box.x < 0 || box.x + box.width > width);
        assert(partialCards.length >= 2, `${width}px: Legacy mobile exposes partial side cards`);
      }

      const identityCards = identity.locator('article');
      assert((await identityCards.count()) === 3, `${width}px: Our Identity has exactly three capability cards`);
      for (let index = 0; index < 3; index += 1) {
        assert(await identityCards.nth(index).isVisible(), `${width}px: Our Identity capability ${index + 1} is visible`);
      }
      const identityCopyFits = await identity.evaluate((section) => {
        const paragraphs = Array.from(section.querySelectorAll('p'));
        return paragraphs.every((paragraph) => paragraph.scrollHeight <= paragraph.clientHeight + 2 || getComputedStyle(paragraph).overflow === 'visible');
      });
      assert(identityCopyFits, `${width}px: Our Identity copy is not clipped`);

      const quote = voices.locator('blockquote');
      const quoteText = ((await quote.textContent()) || '').trim();
      assert(quoteText.length > 80, `${width}px: Voices preserves a complete substantive quote`);
      const quoteFits = await quote.evaluate((element) => element.scrollHeight <= element.clientHeight + 2 && getComputedStyle(element).overflow !== 'hidden');
      assert(quoteFits, `${width}px: Voices quote is not clipped or hidden`);
      assert(await voices.locator('[data-voice-name]').isVisible(), `${width}px: Voices featured person is visible`);

      const forbiddenPartnerText = await partners.getByText(/Example Partner|Example Studio|Partner 0[1-9]|LOGO/i).count();
      assert(forbiddenPartnerText === 0, `${width}px: Partners contains no fake or placeholder brands`);
      const partnerCards = partners.locator('[data-partner-card]');
      if ((await partnerCards.count()) > 0) {
        assert(await partners.getByRole('button', {name: 'Show previous partners'}).isVisible(), `${width}px: Partners previous arrow is visible`);
        assert(await partners.getByRole('button', {name: 'Show next partners'}).isVisible(), `${width}px: Partners next arrow is visible`);
        const partnerViewport = partners.getByRole('region', {name: 'Partner logos'});
        const beforeScroll = await partnerViewport.evaluate((element) => element.scrollLeft);
        await page.waitForTimeout(700);
        const afterScroll = await partnerViewport.evaluate((element) => element.scrollLeft);
        assert(afterScroll > beforeScroll, `${width}px: Partners track moves smoothly from right to left`);
        await partners.getByRole('button', {name: 'Show next partners'}).click();
        await page.waitForTimeout(380);
        const manualScroll = await partnerViewport.evaluate((element) => element.scrollLeft);
        assert(manualScroll !== afterScroll, `${width}px: Partners arrow provides manual navigation`);
      } else {
        checks.push(`${width}px: Partners cleanly hides cards because no published real logo assets are available`);
      }

      assert(await closing.getByRole('heading', {name: /Build the Future with FinAnt/i}).isVisible(), `${width}px: final CTA remains readable`);
      await page.screenshot({path: `${outputDir}/homepage-${width}.png`, fullPage: true});
    } finally {
      await context.close();
    }
  }

  const reducedContext = await browser.newContext({viewport: {width: 390, height: 844}, reducedMotion: 'reduce'});
  const reducedPage = await reducedContext.newPage();
  try {
    await reducedPage.goto(baseUrl, {waitUntil: 'networkidle'});
    const partnerCarousel = reducedPage.locator('#partners-collaborators [data-motion]');
    if ((await partnerCarousel.count()) > 0) {
      await reducedPage.waitForTimeout(150);
      assert((await partnerCarousel.getAttribute('data-motion')) === 'reduced', '390px reduced motion: Partners autoplay is disabled');
    } else {
      checks.push('390px reduced motion: no published partner cards require autoplay');
    }
  } finally {
    await reducedContext.close();
  }

  console.log(`Homepage QA passed: ${checks.length} checks.`);
  for (const check of checks) console.log(`PASS: ${check}`);
} finally {
  await browser.close();
}
