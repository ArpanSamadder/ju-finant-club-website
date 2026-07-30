import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';

const baseUrl = process.env.NAVBAR_QA_BASE_URL || 'http://127.0.0.1:3000';
const outputDir = process.env.NAVBAR_QA_OUTPUT_DIR || 'artifacts/navbar';
const checks = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
  checks.push(message);
}

async function createPage(browser, width, height) {
  const context = await browser.newContext({
    viewport: {width, height},
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto(baseUrl, {waitUntil: 'domcontentloaded'});
  await page.getByRole('banner').waitFor({state: 'visible'});
  return {context, page};
}

async function assertNoHorizontalOverflow(page, label) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  assert(
    dimensions.scrollWidth <= dimensions.clientWidth + 1,
    `${label}: no horizontal page overflow`
  );
}

async function assertDesktopState(browser, width, height, screenshotName) {
  const {context, page} = await createPage(browser, width, height);

  try {
    const primaryNavigation = page.getByRole('navigation', {name: 'Primary navigation'});
    const menuButton = page.getByRole('button', {name: 'Open navigation menu'});
    const partnerCta = page.getByRole('link', {name: 'Partner With Us'}).first();
    const currentEvent = page.getByRole('link', {name: 'Biztigation 2.0'}).first();

    assert(await primaryNavigation.isVisible(), `${width}px: full navigation is visible`);
    assert(!(await menuButton.isVisible()), `${width}px: mobile menu button is hidden`);
    assert(await partnerCta.isVisible(), `${width}px: Partner With Us CTA is visible`);
    assert(await currentEvent.isVisible(), `${width}px: Current Event is visible`);
    assert(
      (await currentEvent.getAttribute('href')) === '/biztigation',
      `${width}px: Current Event URL is /biztigation`
    );

    const links = primaryNavigation.locator('a');
    const linkCount = await links.count();

    for (let index = 0; index < linkCount; index += 1) {
      const details = await links.nth(index).evaluate((element) => {
        const style = window.getComputedStyle(element);
        return {
          whiteSpace: style.whiteSpace,
          clientWidth: element.clientWidth,
          scrollWidth: element.scrollWidth,
        };
      });

      assert(details.whiteSpace === 'nowrap', `${width}px: navigation item ${index + 1} does not wrap`);
      assert(
        details.scrollWidth <= details.clientWidth + 1,
        `${width}px: navigation item ${index + 1} is not clipped`
      );
    }

    await assertNoHorizontalOverflow(page, `${width}px desktop`);

    if (screenshotName) {
      await page.screenshot({
        path: `${outputDir}/${screenshotName}`,
        clip: {x: 0, y: 0, width, height: Math.min(height, 190)},
      });
    }
  } finally {
    await context.close();
  }
}

async function assertTransitionState(browser, width, height) {
  const {context, page} = await createPage(browser, width, height);

  try {
    const primaryNavigation = page.getByRole('navigation', {name: 'Primary navigation'});
    const menuButton = page.getByRole('button', {name: 'Open navigation menu'});
    const desktopVisible = await primaryNavigation.isVisible();
    const mobileVisible = await menuButton.isVisible();

    assert(
      desktopVisible !== mobileVisible,
      `${width}px: exactly one responsive navigation mode is active`
    );

    if (desktopVisible) {
      const currentEvent = page.getByRole('link', {name: 'Biztigation 2.0'}).first();
      const partnerCta = page.getByRole('link', {name: 'Partner With Us'}).first();
      assert(await currentEvent.isVisible(), `${width}px transition: Current Event remains visible`);
      assert(await partnerCta.isVisible(), `${width}px transition: CTA remains visible`);
    } else {
      assert(await menuButton.isVisible(), `${width}px transition: mobile control is usable`);
    }

    await assertNoHorizontalOverflow(page, `${width}px transition`);
  } finally {
    await context.close();
  }
}

async function assertMobileState(browser, width, height, screenshots = {}) {
  const {context, page} = await createPage(browser, width, height);

  try {
    const primaryNavigation = page.getByRole('navigation', {name: 'Primary navigation'});
    const menuButton = page.getByRole('button', {name: 'Open navigation menu'});

    assert(!(await primaryNavigation.isVisible()), `${width}px: desktop navigation is hidden`);
    assert(await menuButton.isVisible(), `${width}px: mobile menu button is visible`);
    assert(
      (await menuButton.getAttribute('aria-expanded')) === 'false',
      `${width}px: mobile menu begins closed`
    );

    const menuButtonBox = await menuButton.boundingBox();
    assert(
      Boolean(menuButtonBox && menuButtonBox.width >= 44 && menuButtonBox.height >= 44),
      `${width}px: hamburger touch target is at least 44px`
    );

    await assertNoHorizontalOverflow(page, `${width}px mobile closed`);

    if (screenshots.closed) {
      await page.screenshot({
        path: `${outputDir}/${screenshots.closed}`,
        clip: {x: 0, y: 0, width, height: Math.min(height, 190)},
      });
    }

    await menuButton.click();

    const dialog = page.getByRole('dialog', {name: 'Navigation menu'});
    const closeButton = page.getByRole('button', {name: 'Close navigation menu'});
    const backdrop = page.getByRole('button', {name: 'Close navigation backdrop'});
    const mobileNavigation = page.getByRole('navigation', {name: 'Mobile navigation'});
    const currentEvent = mobileNavigation.getByRole('link', {name: 'Biztigation 2.0'});

    await dialog.waitFor({state: 'visible'});
    assert(
      (await menuButton.getAttribute('aria-expanded')) === 'true',
      `${width}px: aria-expanded updates when open`
    );
    assert(
      (await page.locator('body').evaluate((element) => element.style.overflow)) === 'hidden',
      `${width}px: page scrolling is locked while open`
    );
    assert(await currentEvent.isVisible(), `${width}px: Current Event appears in mobile menu`);
    assert(
      (await currentEvent.getAttribute('href')) === '/biztigation',
      `${width}px: mobile Current Event URL is /biztigation`
    );

    await page.waitForTimeout(50);
    assert(
      (await page.evaluate(() => document.activeElement?.getAttribute('aria-label'))) ===
        'Close navigation menu',
      `${width}px: focus moves to the close button`
    );

    const closeButtonBox = await closeButton.boundingBox();
    assert(
      Boolean(closeButtonBox && closeButtonBox.width >= 44 && closeButtonBox.height >= 44),
      `${width}px: close touch target is at least 44px`
    );

    await page.keyboard.press('Shift+Tab');
    assert(
      (await page.evaluate(() => document.activeElement?.textContent?.trim())) === 'Partner With Us',
      `${width}px: focus trap wraps backward to the final CTA`
    );

    await page.keyboard.press('Tab');
    assert(
      (await page.evaluate(() => document.activeElement?.getAttribute('aria-label'))) ===
        'Close navigation menu',
      `${width}px: focus trap wraps forward to the close button`
    );

    const dialogBox = await dialog.boundingBox();
    assert(
      Boolean(dialogBox && dialogBox.x >= 0 && dialogBox.x + dialogBox.width <= width + 1),
      `${width}px: mobile panel stays inside the viewport`
    );

    await assertNoHorizontalOverflow(page, `${width}px mobile open`);

    if (screenshots.open) {
      await page.screenshot({path: `${outputDir}/${screenshots.open}`, fullPage: false});
    }

    await page.keyboard.press('Escape');
    await dialog.waitFor({state: 'hidden'});
    assert(
      (await menuButton.getAttribute('aria-expanded')) === 'false',
      `${width}px: Escape closes the menu`
    );
    assert(
      (await page.evaluate(() => document.activeElement?.getAttribute('aria-label'))) ===
        'Open navigation menu',
      `${width}px: focus returns to the hamburger after Escape`
    );

    await menuButton.click();
    await dialog.waitFor({state: 'visible'});
    await backdrop.click({position: {x: 3, y: 3}});
    await dialog.waitFor({state: 'hidden'});
    assert(true, `${width}px: backdrop closes the menu`);

    await menuButton.click();
    await dialog.waitFor({state: 'visible'});
    await Promise.all([
      page.waitForURL('**/initiatives'),
      mobileNavigation.getByRole('link', {name: 'Initiatives'}).click(),
    ]);
    assert(new URL(page.url()).pathname === '/initiatives', `${width}px: navigation links route correctly`);
  } finally {
    await context.close();
  }
}

await mkdir(outputDir, {recursive: true});
const browser = await chromium.launch({headless: true});

try {
  await assertDesktopState(browser, 1440, 900, 'desktop-1440.png');
  await assertDesktopState(browser, 1280, 800);
  await assertDesktopState(browser, 1024, 768, 'tablet-1024.png');
  await assertTransitionState(browser, 900, 720);
  await assertMobileState(browser, 768, 900);
  await assertMobileState(browser, 390, 844, {
    closed: 'mobile-closed-390.png',
    open: 'mobile-open-390.png',
  });
  await assertMobileState(browser, 360, 800);

  console.log(`Navbar QA passed: ${checks.length} checks.`);
  for (const check of checks) console.log(`PASS: ${check}`);
} finally {
  await browser.close();
}
