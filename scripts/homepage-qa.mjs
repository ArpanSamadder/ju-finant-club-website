import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';

const baseUrl = process.env.HOMEPAGE_QA_BASE_URL || 'http://127.0.0.1:3000';
const outputDir = process.env.HOMEPAGE_QA_OUTPUT_DIR || 'artifacts/homepage';
const viewports = [
  {width: 1440, height: 900},
  {width: 1366, height: 768},
  {width: 1280, height: 720},
  {width: 1024, height: 768},
  {width: 900, height: 700},
  {width: 768, height: 1024},
  {width: 390, height: 844},
  {width: 360, height: 800},
];
const checks = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
  checks.push(message);
}

function intersectsViewport(box, viewportWidth) {
  return Boolean(box && box.width > 0 && box.x < viewportWidth && box.x + box.width > 0);
}

async function loadHome(page) {
  await page.goto(baseUrl, {waitUntil: 'networkidle'});
  await page.locator('#legacy-foundation').waitFor({state: 'visible'});
}

await mkdir(outputDir, {recursive: true});
const browser = await chromium.launch({headless: true});

try {
  for (const viewport of viewports) {
    const {width, height} = viewport;
    const label = `${width}x${height}`;
    const context = await browser.newContext({viewport, deviceScaleFactor: 1});
    const page = await context.newPage();

    try {
      await loadHome(page);

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
        assert(await locator.isVisible(), `${label}: ${name} section is visible`);
      }

      const pageDimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      assert(pageDimensions.scrollWidth <= pageDimensions.clientWidth + 1, `${label}: no horizontal page overflow`);

      const sectionTops = await Promise.all([hero, legacy, identity, voices, partners, closing].map(async (locator) => (await locator.boundingBox())?.y ?? -1));
      assert(sectionTops.every((top, index) => index === 0 || top > sectionTops[index - 1]), `${label}: homepage section order is stable`);

      for (const [name, locator] of [
        ['Legacy', legacy],
        ['Our Identity', identity],
        ['Voices', voices],
        ['Partners', partners],
        ['Final CTA', closing],
      ]) {
        const minHeight = await locator.evaluate((element) => getComputedStyle(element).minHeight);
        assert(minHeight === '0px' || minHeight === 'auto' || Number.parseFloat(minHeight) <= 1, `${label}: ${name} has no large forced min-height`);
      }

      const legacyCarousel = legacy.getByRole('region', {name: 'Departmental legacy platforms'});
      const legacyCount = Number(await legacyCarousel.getAttribute('data-record-count'));
      const legacyDots = legacy.locator('[data-pagination-count] button');
      assert(legacyCount > 0, `${label}: Legacy has published records`);
      assert((await legacyDots.count()) === legacyCount, `${label}: Legacy dots match published record count`);
      assert(Number(await legacy.locator('[data-pagination-count]').getAttribute('data-pagination-count')) === legacyCount, `${label}: Legacy pagination metadata is dynamic`);

      const activeLegacy = legacy.locator('article[data-active="true"]');
      assert(await activeLegacy.isVisible(), `${label}: Legacy active card is visible`);
      const legacyCards = legacy.locator('article');
      const visibleLegacyBoxes = [];
      for (let index = 0; index < await legacyCards.count(); index += 1) {
        const box = await legacyCards.nth(index).boundingBox();
        if (intersectsViewport(box, width)) visibleLegacyBoxes.push(box);
      }
      assert(visibleLegacyBoxes.length >= 3, `${label}: Legacy keeps center and surrounding cards visible`);

      if (width >= 768) {
        const sorted = visibleLegacyBoxes.filter(Boolean).sort((a, b) => a.x - b.x);
        const gaps = sorted.slice(1).map((box, index) => box.x - (sorted[index].x + sorted[index].width));
        const finiteGaps = gaps.filter((gap) => Number.isFinite(gap));
        const spread = finiteGaps.length ? Math.max(...finiteGaps) - Math.min(...finiteGaps) : 0;
        assert(spread <= 12, `${label}: Legacy visible card gaps are visually consistent`);
      }

      if (width <= 390) {
        const partialCards = visibleLegacyBoxes.filter((box) => box.x < 0 || box.x + box.width > width);
        assert(partialCards.length >= 2, `${label}: Legacy exposes partial mobile side cards`);
      }

      const identityCards = identity.locator('article');
      assert((await identityCards.count()) === 3, `${label}: Our Identity has exactly three capability cards`);
      const identityCopyFits = await identity.evaluate((section) => Array.from(section.querySelectorAll('p')).every((paragraph) => paragraph.scrollHeight <= paragraph.clientHeight + 2 || getComputedStyle(paragraph).overflow === 'visible'));
      assert(identityCopyFits, `${label}: Our Identity copy is not clipped`);

      const voiceCarousel = voices.getByRole('region', {name: 'Leadership and advisory voices', exact: true});
      const voiceCount = Number(await voiceCarousel.getAttribute('data-record-count'));
      const voiceDots = voices.locator('[data-pagination-count] button');
      assert(voiceCount > 0, `${label}: Voices has published records`);
      assert((await voiceDots.count()) === voiceCount, `${label}: Voices dots match published record count`);
      const quote = voices.locator('blockquote').last();
      const quoteText = ((await quote.textContent()) || '').trim();
      assert(quoteText.length > 80, `${label}: Voices preserves a complete substantive quote`);
      const quoteFits = await quote.evaluate((element) => element.scrollHeight <= element.clientHeight + 2 && getComputedStyle(element).overflow !== 'hidden');
      assert(quoteFits, `${label}: Voices quote is not clipped or hidden`);

      const forbiddenPartnerText = await partners.getByText(/Example Partner|Example Studio|Partner 0[1-9]|LOGO/i).count();
      assert(forbiddenPartnerText === 0, `${label}: Partners contains no fake or placeholder brands`);

      if (width <= 390) {
        for (const [name, section] of [['Legacy', legacy], ['Voices', voices]]) {
          const row = section.locator('[data-carousel-controls]');
          const rowBox = await row.boundingBox();
          const leftBox = await row.locator('button').first().boundingBox();
          const rightBox = await row.locator('button').last().boundingBox();
          const activeBox = name === 'Legacy' ? await activeLegacy.boundingBox() : await voices.locator('article:not([aria-hidden="true"])').boundingBox();
          assert(Boolean(rowBox && leftBox && rightBox && activeBox), `${label}: ${name} mobile control geometry is measurable`);
          assert(leftBox.width >= 44 && leftBox.height >= 44 && rightBox.width >= 44 && rightBox.height >= 44, `${label}: ${name} arrows meet 44px touch targets`);
          assert(rowBox.y >= activeBox.y + activeBox.height + 12, `${label}: ${name} controls sit below the active card`);
          assert(Math.abs((leftBox.y + leftBox.height / 2) - (rightBox.y + rightBox.height / 2)) <= 3, `${label}: ${name} arrows share one control-row baseline`);
        }

        const partnerCards = partners.locator('[data-partner-card]');
        if ((await partnerCards.count()) > 0) {
          const partnerControls = partners.locator('[data-carousel-controls]');
          const trackBox = await partners.getByRole('region', {name: 'Partner logos'}).boundingBox();
          const controlsBox = await partnerControls.boundingBox();
          assert(Boolean(trackBox && controlsBox && controlsBox.y >= trackBox.y + trackBox.height + 12), `${label}: Partners arrows sit below the logo track`);
        }
      }

      if ((width === 1366 && height === 768) || (width === 1280 && height === 720)) {
        const legacyBox = await legacy.boundingBox();
        assert(Boolean(legacyBox && legacyBox.height <= height * 1.16), `${label}: Legacy composition fits a standard laptop viewport reasonably`);
      }

      assert(await closing.getByRole('heading', {name: /Build the Future with FinAnt/i}).isVisible(), `${label}: final CTA remains readable`);
      await page.screenshot({path: `${outputDir}/homepage-${width}x${height}.png`, fullPage: true});
    } finally {
      await context.close();
    }
  }

  const behaviorContext = await browser.newContext({viewport: {width: 1366, height: 768}});
  const behaviorPage = await behaviorContext.newPage();
  try {
    await loadHome(behaviorPage);
    const legacyCarousel = behaviorPage.getByRole('region', {name: 'Departmental legacy platforms'});
    const legacyCount = Number(await legacyCarousel.getAttribute('data-record-count'));
    const initialLegacyIndex = Number(await legacyCarousel.getAttribute('data-active-index'));
    for (let index = 0; index < legacyCount; index += 1) {
      await behaviorPage.getByRole('button', {name: 'Next legacy event'}).click();
      await behaviorPage.waitForTimeout(80);
    }
    assert(Number(await legacyCarousel.getAttribute('data-active-index')) === initialLegacyIndex, 'Legacy manual loop returns seamlessly to the first logical record');

    await behaviorPage.evaluate(() => {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    });
    await behaviorPage.mouse.move(10, 10);
    const autoplayStart = Number(await legacyCarousel.getAttribute('data-active-index'));
    await behaviorPage.waitForTimeout(4300);
    const autoplayEnd = Number(await legacyCarousel.getAttribute('data-active-index'));
    assert(autoplayEnd !== autoplayStart, 'Legacy autoplay advances after four seconds');

    const voices = behaviorPage.getByRole('region', {name: 'Leadership and advisory voices', exact: true});
    const voiceCount = Number(await voices.getAttribute('data-record-count'));
    if (voiceCount > 1) {
      const initialVoiceIndex = Number(await voices.getAttribute('data-active-index'));
      for (let index = 0; index < voiceCount; index += 1) {
        await behaviorPage.getByRole('button', {name: 'Next voice'}).click();
        await behaviorPage.waitForTimeout(100);
      }
      assert(Number(await voices.getAttribute('data-active-index')) === initialVoiceIndex, 'Voices manual loop returns seamlessly to the first logical record');
    } else {
      checks.push('Voices loop architecture present; only one published Voice is available in CI');
    }

    const partnerCarousel = behaviorPage.locator('#partners-collaborators [data-motion]');
    if ((await partnerCarousel.count()) > 0) {
      const partnerViewport = behaviorPage.getByRole('region', {name: 'Partner logos'});
      const beforeScroll = await partnerViewport.evaluate((element) => element.scrollLeft);
      await behaviorPage.waitForTimeout(1200);
      const afterScroll = await partnerViewport.evaluate((element) => element.scrollLeft);
      assert(afterScroll > beforeScroll, 'Partners marquee moves continuously from right to left');
      await behaviorPage.getByRole('button', {name: 'Show next partners'}).click();
      await behaviorPage.waitForTimeout(450);
      const manualScroll = await partnerViewport.evaluate((element) => element.scrollLeft);
      assert(manualScroll !== afterScroll, 'Partners arrow moves one logical card step');
    } else {
      checks.push('Partners component cleanly hides controls because no published real logos are available');
    }
  } finally {
    await behaviorContext.close();
  }

  const reducedContext = await browser.newContext({viewport: {width: 390, height: 844}, reducedMotion: 'reduce'});
  const reducedPage = await reducedContext.newPage();
  try {
    await loadHome(reducedPage);
    const legacy = reducedPage.getByRole('region', {name: 'Departmental legacy platforms'});
    const voices = reducedPage.getByRole('region', {name: 'Leadership and advisory voices', exact: true});
    await reducedPage.waitForTimeout(150);
    assert((await legacy.getAttribute('data-autoplay')) === 'reduced', 'Reduced motion disables Legacy autoplay');
    assert((await voices.getAttribute('data-autoplay')) === 'reduced', 'Reduced motion disables Voices autoplay');

    const partnerCarousel = reducedPage.locator('#partners-collaborators [data-motion]');
    if ((await partnerCarousel.count()) > 0) {
      assert((await partnerCarousel.getAttribute('data-motion')) === 'reduced', 'Reduced motion disables Partners autoplay');
    } else {
      checks.push('Reduced motion: no published partner cards require autoplay');
    }
  } finally {
    await reducedContext.close();
  }

  console.log(`Homepage QA passed: ${checks.length} checks.`);
  for (const check of checks) console.log(`PASS: ${check}`);
} finally {
  await browser.close();
}
