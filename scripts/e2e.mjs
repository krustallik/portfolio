import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:5173";
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, hasTouch: true });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
const projectCases = [
  ["public-lighting-fault-reporting", "Public lighting fault reporting", 5],
  ["booktop-marketplace", "Booktop marketplace", 5],
  ["gymbeam-shifts", "GymBeam shifts", 2],
  ["bodycast", "BodyCast health analytics", 8],
  ["building-management-app", "Building management app", 7],
  ["missing-data-tabular-models", "Tabular models with missing data", 4],
];
const englishSummaries = [
  ["Public lighting fault reporting", "A Košice streetlight map helps residents explore fixtures and prepare fault reports with validated location details. Operators use a separate authenticated workspace to search and update the inventory."],
  ["Booktop marketplace", "Shoppers can browse and filter a book catalog, view product details, and add items to a cart. I focused on the Next.js frontend in a five-person cross-functional team spanning backend, DevOps, and design."],
  ["GymBeam shifts", "The bot filters a third-party shift portal by configured dates, times, holidays, and locations, then attempts to register for matching shifts. A separate dashboard lets me monitor and manage isolated bot instances."],
  ["BodyCast health analytics", "BodyCast brings health measurements, nutrition, and training history—including strength sessions—into a personal dashboard. It pairs body-composition estimates and planning scenarios with diagnostics for source data, gaps, and model freshness."],
  ["Building management app", "Administrators manage buildings and users, building managers send notices to assigned properties, and occupants receive them in this cross-platform app. Role-scoped access separates these workflows and supports scheduled notifications."],
  ["Tabular models with missing data", "This co-authored study compares classical models, TabPFN, and TabICL for bankruptcy prediction under simulated MCAR, MAR, and MNAR missingness, using PR-AUC to assess imbalanced data."],
];
const slovakSummaries = [
  ["Nahlasovanie porúch verejného osvetlenia", "Mapa pouličného osvetlenia v Košiciach umožňuje prezerať si polohu svietidiel a pripraviť hlásenie poruchy s overenými údajmi o mieste. Správcovia v samostatnom zabezpečenom rozhraní vyhľadávajú a upravujú inventár."],
  ["Knižné trhovisko Booktop", "Zákazníci si môžu prezerať a filtrovať katalóg kníh, otvárať podrobnosti o produktoch a pridávať ich do košíka. V päťčlennom multidisciplinárnom tíme som sa sústredil na frontend v Next.js a spolupracoval s backendovým vývojárom, dvoma dizajnérmi a DevOps inžinierom."],
  ["Automatizácia pracovných zmien GymBeam", "Bot filtruje ponuky pracovných zmien na portáli tretej strany podľa nastavených dátumov, časov, sviatkov a lokalít a pri zhode sa pokúsi prihlásiť na vybranú zmenu. V samostatnom paneli možno sledovať a spravovať izolované inštancie botov."],
  ["Zdravotná analytika BodyCast", "BodyCast spája zdravotné merania, výživu a tréningovú históriu vrátane silových tréningov do osobného prehľadu. Odhady zloženia tela a plánovacie scenáre dopĺňa diagnostikou zdrojových údajov, chýbajúcich hodnôt a aktuálnosti modelu."],
  ["Aplikácia na správu budov", "Administrátori spravujú budovy a používateľov, správcovia budov posielajú oznámenia pre pridelené objekty a obyvatelia ich prijímajú v tejto multiplatformovej aplikácii. Prístup podľa rolí oddeľuje tieto pracovné postupy a umožňuje plánovanie upozornení."],
  ["Tabuľkové modely s chýbajúcimi údajmi", "Táto spoluautorská štúdia porovnáva klasické modely, TabPFN a TabICL pri predikcii bankrotu v podmienkach simulovaného chýbania údajov MCAR, MAR a MNAR; výkonnosť hodnotí aj podľa PR-AUC."],
];

async function chooseLanguage(picker, language) {
  const label = language === "sk" ? "Slovenčina" : "English";
  await picker.locator(".language-trigger").click();
  await picker.getByRole("menuitemradio", { name: label }).click();
}

async function assertImagesLoad(selector) {
  const images = page.locator(selector);
  await images.evaluateAll((elements) => elements.forEach((element) => { element.loading = "eager"; }));
  const imageElements = await images.all();
  for (const image of imageElements) {
    await image.evaluate((element) => element.scrollIntoView({ block: "center", inline: "center" }));
    await image.evaluate((element) => element.decode());
  }
  const widths = await images.evaluateAll((elements) => elements.map((element) => element.naturalWidth));
  assert.ok(widths.every((width) => width > 0), `images should load: ${JSON.stringify(widths)}`);
}

async function assertNoHorizontalOverflow(width, label) {
  await page.setViewportSize({ width, height: 900 });
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const dimensions = await page.evaluate(() => ({ viewport: window.innerWidth, document: document.documentElement.scrollWidth }));
  const overflow = dimensions.document > dimensions.viewport + 1
    ? await page.evaluate(() => Array.from(document.querySelectorAll("body *"))
      .map((element) => {
        const bounds = element.getBoundingClientRect();
        return {
          tag: element.tagName,
          className: typeof element.className === "string" ? element.className : "",
          text: element.textContent?.trim().replace(/\s+/g, " ").slice(0, 70),
          left: Math.round(bounds.left),
          right: Math.round(bounds.right),
          width: Math.round(bounds.width),
          scroll: element.scrollWidth,
        };
      })
      .filter((element) => element.right > window.innerWidth + 1 || element.left < -1)
      .slice(0, 40))
    : [];
  const layoutState = dimensions.document > dimensions.viewport + 1
    ? await page.evaluate(() => ({
      body: { width: document.body.clientWidth, scroll: document.body.scrollWidth },
      root: { width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth },
      scrollX: window.scrollX,
      focused: document.activeElement instanceof HTMLElement ? `${document.activeElement.tagName}.${document.activeElement.className}` : null,
      filters: Array.from(document.querySelectorAll(".project-filters")).map((element) => ({
        left: element.getBoundingClientRect().left,
        right: element.getBoundingClientRect().right,
        width: element.clientWidth,
        scrollWidth: element.scrollWidth,
        scrollLeft: element.scrollLeft,
        overflowX: getComputedStyle(element).overflowX,
      })),
    }))
    : {};
  assert.ok(dimensions.document <= dimensions.viewport + 1, `${label} overflows at ${width}px: ${JSON.stringify({ ...dimensions, layoutState, overflow })}`);
}

try {
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Software for the real world." }).waitFor();
  assert.equal(await page.locator(".project-card").count(), 6, "homepage should show six curated projects");
  assert.equal(await page.locator(".project-card--wide").count(), 1, "the final project should balance the selected-project grid");
  assert.equal(await page.locator(".hero-name").innerText(), "Bc. Ihor Havryliv");
  await page.getByRole("heading", { name: "Technical University of Košice" }).waitFor();
  for (const [name, summary] of englishSummaries) {
    const card = page.locator(".project-card").filter({ has: page.getByRole("heading", { name, exact: true }) });
    assert.equal(await card.locator(".project-card-content > p").innerText(), summary, `${name} should show its reviewed English summary`);
    const metadata = await card.locator(".project-card-meta > span").allInnerTexts();
    assert.equal(metadata.length, 2, `${name} should have two concise metadata labels`);
    assert.notEqual(metadata[0], metadata[1], `${name} category and context should provide distinct information`);
  }
  await page.getByText("Bachelor's degree in Computer Science", { exact: true }).waitFor();
  await page.getByText("Completed in 2025", { exact: true }).waitFor();
  await page.getByText("Currently studying · second and final year", { exact: true }).waitFor();
  await page.getByRole("heading", { name: "IT STEP Academy" }).waitFor();
  await page.getByText("Completed in 2026", { exact: true }).waitFor();
  const buildingCard = page.locator(".project-card").filter({ hasText: "Building management app" });
  await buildingCard.getByText(/Full-Stack Developer & Project Coordinator/).waitFor();
  assert.equal(await page.getByRole("link", { name: "ihorhavryliv123@gmail.com" }).getAttribute("href"), "mailto:ihorhavryliv123@gmail.com");
  assert.equal(await page.locator(".other-work-item").count(), 8, "homepage should include eight additional repository links");
  const booktopCard = page.locator(".project-card").filter({ has: page.getByRole("heading", { name: "Booktop marketplace", exact: true }) });
  assert.match(await booktopCard.locator(".project-card-meta").innerText(), /Frontend Developer · Cross-functional team/i);
  assert.doesNotMatch(await booktopCard.locator(".tag-list").innerText(), /\.NET|ASP\.NET/i, "Booktop homepage badges should show frontend evidence only");
  await assertImagesLoad(".project-card img");
  assert.ok((await page.request.get(`${baseURL}/social-preview.png`)).ok(), "social preview image should exist");
  await page.locator("#skills").scrollIntoViewIfNeeded();
  await page.getByRole("heading", { name: "Additional Experience" }).waitFor();
  await page.getByText("Java", { exact: true }).waitFor();
  await page.getByText("Earlier experience", { exact: true }).waitFor();
  for (const skillName of ["React Native", "NestJS"]) {
    const skillRow = page.locator(".skill-practice-list li").filter({ hasText: skillName });
    await skillRow.getByRole("link", { name: "Building app" }).waitFor();
    await skillRow.getByText("(team contribution)", { exact: true }).waitFor();
  }
  const coordinationRow = page.locator(".skill-practice-list li").filter({ hasText: "Project coordination" });
  await coordinationRow.getByRole("link", { name: "Building app" }).waitFor();
  await coordinationRow.getByText("(five-person student team)", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Automation" }).click();
  assert.equal(await page.locator(".project-card").count(), 1, "Automation filter should narrow the project list");
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.getByRole("link", { name: "Case study" }).first().click();
  await page.getByRole("heading", { name: "Public lighting fault reporting" }).waitFor();
  await page.getByRole("link", { name: /View source/ }).waitFor();
  await page.getByRole("heading", { name: "My role & contributions" }).waitFor();

  const screenshotDirectory = fileURLToPath(new URL("../docs/reports/screenshots/", import.meta.url));
  await mkdir(screenshotDirectory, { recursive: true });
  for (const [slug, name, count] of projectCases) {
    await page.goto(`${baseURL}/projects/${slug}`, { waitUntil: "networkidle" });
    await page.getByRole("heading", { name, level: 1 }).waitFor();
    await page.getByRole("heading", { name: "My role & contributions" }).waitFor();
    if (slug === "booktop-marketplace") {
      assert.match(await page.locator(".detail-tech-list").innerText(), /\.NET 10/);
      await page.getByText(/five-person team with one backend developer, two UI\/UX designers, and one DevOps engineer/i).waitFor();
    }
    if (slug === "bodycast") {
      await page.getByText(/manage strength programs and sessions/i).waitFor();
      await page.getByText(/not medical advice/i).waitFor();
    }
    assert.equal(await page.locator(".gallery-thumbnail").count(), count, `${slug} gallery should contain ${count} source captures`);
    await assertImagesLoad(".gallery-figure img");
    const imageFit = await page.locator(".gallery-viewport").evaluate((viewport) => {
      const image = viewport.querySelector(".gallery-expand img");
      if (!image) return null;
      const frame = viewport.getBoundingClientRect();
      const bounds = image.getBoundingClientRect();
      return { frame: frame.toJSON(), image: bounds.toJSON() };
    });
    assert.ok(imageFit, `${slug} should have a visible gallery image`);
    assert.ok(
      imageFit.image.left >= imageFit.frame.left - 1 && imageFit.image.top >= imageFit.frame.top - 1 &&
      imageFit.image.right <= imageFit.frame.right + 1 && imageFit.image.bottom <= imageFit.frame.bottom + 1,
      `${slug} screenshot should fit the gallery frame: ${JSON.stringify(imageFit)}`,
    );
    if (count > 1) {
      const firstSource = await page.locator(".gallery-figure img").getAttribute("src");
      await page.getByRole("button", { name: "Next screenshot" }).click();
      assert.equal(await page.locator(".gallery-count").innerText(), `2 / ${count}`);
      assert.notEqual(await page.locator(".gallery-figure img").getAttribute("src"), firstSource);
      await page.getByRole("button", { name: "Show screenshot 1 of", exact: false }).first().click();
      const opener = page.getByRole("button", { name: /^Enlarge screenshot 1 of/ });
      await opener.click();
      await page.getByRole("dialog").waitFor();
      await page.keyboard.press("ArrowRight");
      assert.ok((await page.getByRole("dialog").getAttribute("aria-labelledby")) === "gallery-lightbox-title");
      await page.keyboard.press("Escape");
      await page.getByRole("dialog").waitFor({ state: "detached" });
      assert.equal(await page.locator(".gallery-expand").evaluate((element) => document.activeElement === element), true, "closing the lightbox should restore focus");
    }
    if (slug === "building-management-app") {
      await page.getByText("My role: Full-Stack Developer & Project Coordinator", { exact: true }).waitFor();
      const contributions = page.locator(".contribution-list li");
      assert.equal(await contributions.count(), 3);
      await contributions.nth(0).getByText(/frontend and backend development/i).waitFor();
      await contributions.nth(1).getByText(/creating and assigning tasks.*tracking deadlines and progress/i).waitFor();
      await page.getByText(/university-arranged collaboration with AT&T/i).waitFor();
      await page.getByText(/does not imply AT&T employment/i).waitFor();
      await page.locator(".story-block").filter({ hasText: "My role & contributions" }).screenshot({ path: `${screenshotDirectory}/building-management-contributions.png` });
    }
    if (slug === "missing-data-tabular-models") {
      await page.getByText(/have not been reproduced from the current checkout/i).waitFor();
    }

    if (count > 1) await page.getByRole("button", { name: "Show screenshot 1 of", exact: false }).first().click();
    await page.locator(".project-gallery").evaluate((element) => window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 112, behavior: "instant" }));
    await page.locator(".project-gallery").screenshot({ path: `${screenshotDirectory}/gallery-${slug}.png` });
    for (const width of [360, 390, 768, 1024, 1440, 1920]) {
      await assertNoHorizontalOverflow(width, `${slug} case study`);
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  await page.goto(`${baseURL}/projects/unknown-slug`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "That route ends here." }).waitFor();

  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await assertImagesLoad(".project-card img");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${screenshotDirectory}/portfolio-desktop.png`, fullPage: true });
  await page.screenshot({ path: `${screenshotDirectory}/portfolio-desktop-en.png`, fullPage: true });
  const languagePicker = page.locator(".language-picker--navigation");
  const languageTrigger = languagePicker.locator(".language-trigger");
  await languageTrigger.focus();
  await page.keyboard.press("ArrowDown");
  await page.getByRole("menuitemradio", { name: "English" }).waitFor();
  assert.equal(await page.getByRole("menuitemradio", { name: "English" }).evaluate((element) => element === document.activeElement), true, "ArrowDown should open the language menu and focus its first option");
  await page.keyboard.press("ArrowDown");
  assert.equal(await page.getByRole("menuitemradio", { name: "Slovenčina" }).evaluate((element) => element === document.activeElement), true, "ArrowDown should move through language options");
  await page.keyboard.press("Escape");
  await page.getByRole("menu").waitFor({ state: "detached" });
  assert.equal(await languageTrigger.evaluate((element) => element === document.activeElement), true, "Escape should return focus to the language trigger");
  await languageTrigger.click();
  await page.locator(".site-header").screenshot({ path: `${screenshotDirectory}/language-picker-desktop-en.png` });
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 768, height: 900 });
  const tabletMenuToggle = page.getByRole("button", { name: "Open navigation menu" });
  assert.equal(await tabletMenuToggle.isVisible(), true, "tablet width should use the compact navigation");
  await page.locator(".menu-toggle").click();
  await page.getByRole("link", { name: "Work", exact: true }).waitFor();
  await languageTrigger.click();
  await page.getByRole("menuitemradio", { name: "English" }).waitFor();
  const tabletMenuBounds = await page.locator(".language-menu").boundingBox();
  assert.ok(tabletMenuBounds && tabletMenuBounds.x >= 0 && tabletMenuBounds.x + tabletMenuBounds.width <= 768, "tablet language menu should stay within the viewport");
  await page.keyboard.press("Escape");
  await page.locator(".menu-toggle").click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator("#about").evaluate((section) => section.scrollIntoView({ block: "start", behavior: "instant" }));
  const educationSectionTop = await page.locator("#about").evaluate((section) => Math.round(section.getBoundingClientRect().top));
  assert.ok(educationSectionTop >= 0 && educationSectionTop <= 100, `education screenshot should start below the sticky header, got top=${educationSectionTop}`);
  await page.getByRole("heading", { name: "Technical University of Košice" }).waitFor();
  await page.screenshot({ path: `${screenshotDirectory}/portfolio-education.png` });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    await assertNoHorizontalOverflow(width, "homepage");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await assertImagesLoad(".project-card img");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.emulateMedia({ reducedMotion: "reduce" });
  const reducedMotionDuration = await page.locator(".hero-visual").evaluate((element) => getComputedStyle(element).animationDuration);
  assert.ok(reducedMotionDuration === "1e-05s" || reducedMotionDuration === "0.00001s", `reduced motion should shorten animation, got ${reducedMotionDuration}`);
  await page.screenshot({ path: `${screenshotDirectory}/portfolio-mobile-viewport.png` });
  await page.screenshot({ path: `${screenshotDirectory}/portfolio-mobile.png`, fullPage: true });
  await page.screenshot({ path: `${screenshotDirectory}/portfolio-mobile-en.png`, fullPage: true });
  await page.locator(".language-picker--navigation .language-trigger").click();
  await page.locator(".site-header").screenshot({ path: `${screenshotDirectory}/language-picker-mobile-en.png` });
  await page.keyboard.press("Escape");

  const mobileMenu = page.getByRole("button", { name: "Open navigation menu" });
  await mobileMenu.click();
  await chooseLanguage(page.locator(".language-picker--navigation"), "sk");
  await page.getByRole("heading", { name: "Softvér pre skutočný svet." }).waitFor();
  await page.waitForFunction(() => document.documentElement.lang === "sk");
  assert.equal(await page.locator(".language-picker--navigation .language-trigger").innerText(), "Slovenčina");
  assert.equal(await page.locator(".menu-toggle").getAttribute("aria-expanded"), "true", "mobile menu stays open during language selection");
  await page.locator(".menu-toggle").click();
  await page.screenshot({ path: `${screenshotDirectory}/portfolio-mobile-sk.png`, fullPage: true });
  await page.locator(".menu-toggle").click();
  await chooseLanguage(page.locator(".language-picker--navigation"), "en");
  await page.getByRole("heading", { name: "Software for the real world." }).waitFor();
  await page.locator(".menu-toggle").click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await chooseLanguage(page.locator(".language-picker--navigation"), "sk");
  await page.getByRole("heading", { name: "Softvér pre skutočný svet." }).waitFor();
  await page.waitForFunction(() => document.documentElement.lang === "sk");
  await assertImagesLoad(".project-card img");
  for (const [name, summary] of slovakSummaries) {
    const card = page.locator(".project-card").filter({ has: page.getByRole("heading", { name, exact: true }) });
    assert.equal(await card.locator(".project-card-content > p").innerText(), summary, `${name} should show its reviewed Slovak summary`);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${screenshotDirectory}/portfolio-desktop-sk.png`, fullPage: true });
  await page.locator("#about").scrollIntoViewIfNeeded();
  await page.getByRole("heading", { name: "Technical University of Košice" }).waitFor();
  await page.getByText("Ukončené v roku 2026", { exact: true }).waitFor();
  await page.screenshot({ path: `${screenshotDirectory}/portfolio-education-sk.png` });
  for (const width of [360, 390, 768, 1024, 1440]) {
    await assertNoHorizontalOverflow(width, "Slovak homepage");
  }

  const slovakCases = [
    ["public-lighting-fault-reporting", "Nahlasovanie porúch verejného osvetlenia"],
    ["booktop-marketplace", "Knižné trhovisko Booktop"],
    ["gymbeam-shifts", "Automatizácia pracovných zmien GymBeam"],
    ["bodycast", "Zdravotná analytika BodyCast"],
    ["building-management-app", "Aplikácia na správu budov"],
    ["missing-data-tabular-models", "Tabuľkové modely s chýbajúcimi údajmi"],
  ];
  for (const [slug, translatedName] of slovakCases) {
    await page.goto(`${baseURL}/projects/${slug}`, { waitUntil: "networkidle" });
    await page.getByRole("heading", { name: translatedName, level: 1 }).waitFor();
    await page.waitForFunction(() => document.documentElement.lang === "sk");
    assert.ok((await page.title()).includes(translatedName), `${slug} should have a Slovak SEO title`);
    await page.getByRole("heading", { name: "Moja rola a prínos" }).waitFor();
    await page.getByRole("heading", { name: "Ukážky aplikácie" }).waitFor();
    assert.equal(await page.locator(".gallery-thumbnail").count(), projectCases.find(([caseSlug]) => caseSlug === slug)[2]);
    for (const width of [360, 390, 768, 1024, 1440]) {
      await assertNoHorizontalOverflow(width, `${slug} Slovak case study`);
    }
  }
  await page.goto(`${baseURL}/projects/building-management-app`, { waitUntil: "networkidle" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await chooseLanguage(page.locator(".language-picker--navigation"), "en");
  await page.getByRole("heading", { name: "Building management app", level: 1 }).waitFor();
  await page.getByRole("button", { name: "Next screenshot" }).click();
  await page.getByRole("button", { name: /^Enlarge screenshot 2 of 7/ }).click();
  await page.getByRole("dialog").waitFor();
  await chooseLanguage(page.getByRole("dialog").locator(".language-picker--lightbox"), "sk");
  await page.getByRole("dialog", { name: /Snímka 2 z 7/ }).waitFor();
  assert.equal(await page.locator(".gallery-count").innerText(), "2 / 7", "language change should preserve the open gallery index");
  assert.match(await page.locator(".story-role").innerText(), /Full-stack vývojár a koordinátor projektu/);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: `${screenshotDirectory}/gallery-lightbox-mobile-sk.png` });
  for (const width of [360, 390, 768, 1024, 1440]) {
    await assertNoHorizontalOverflow(width, "Slovak lightbox");
  }
  await page.getByRole("dialog").getByRole("button", { name: "Zavrieť zväčšenú snímku" }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator(".story-block").filter({ hasText: "Moja rola a prínos" }).screenshot({ path: `${screenshotDirectory}/building-management-contributions-sk.png` });
  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Aplikácia na správu budov", level: 1 }).waitFor();
  await page.waitForFunction(() => document.documentElement.lang === "sk");
  assert.ok((await page.title()).includes("Aplikácia na správu budov"), "saved Slovak locale should survive a route refresh");
  for (const width of [360, 390, 768, 1024, 1440]) {
    await assertNoHorizontalOverflow(width, "Building Management Slovak case study");
  }
  await chooseLanguage(page.locator(".language-picker--navigation"), "en");
  await page.getByRole("heading", { name: "Building management app", level: 1 }).waitFor();
  await page.goto(`${baseURL}/projects/building-management-app`, { waitUntil: "networkidle" });
  await page.locator(".gallery-viewport").dispatchEvent("pointerdown", { pointerType: "touch", pointerId: 1, isPrimary: true, clientX: 280 });
  await page.locator(".gallery-viewport").dispatchEvent("pointerup", { pointerType: "touch", pointerId: 1, isPrimary: true, clientX: 100 });
  assert.equal(await page.locator(".gallery-count").innerText(), "2 / 7", "touch swipe should advance the mobile gallery");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".project-gallery").evaluate((element) => window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 88, behavior: "instant" }));
  await page.locator(".project-gallery").screenshot({ path: `${screenshotDirectory}/gallery-building-management-mobile.png` });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  const menu = page.getByRole("button", { name: "Open navigation menu" });
  await menu.click();
  assert.equal(await page.getByRole("button", { name: "Close navigation menu" }).getAttribute("aria-expanded"), "true");
  await page.getByRole("link", { name: "Skills", exact: true }).click();
  assert.equal(await page.getByRole("button", { name: "Open navigation menu" }).getAttribute("aria-expanded"), "false");

  const homePagePath = fileURLToPath(new URL("../src/i18n/messages.ts", import.meta.url));
  const originalHomePage = await readFile(homePagePath, "utf8");
  const originalHeading = 'heroTitleAccent: "real world."';
  const hotHeading = 'heroTitleAccent: "real world. HMR"';
  assert.equal(originalHomePage.split(originalHeading).length - 1, 1, "HMR probe must match exactly one hero heading");
  const hmrPage = await context.newPage();
  try {
    await hmrPage.goto(baseURL, { waitUntil: "networkidle" });
    await hmrPage.getByRole("heading", { name: "Software for the real world." }).waitFor();
    await writeFile(homePagePath, originalHomePage.replace(originalHeading, hotHeading));
    await hmrPage.getByRole("heading", { name: "Software for the real world. HMR" }).waitFor({ timeout: 10000 });
  } finally {
    await writeFile(homePagePath, originalHomePage);
    await hmrPage.getByRole("heading", { name: "Software for the real world." }).waitFor({ timeout: 10000 });
    await hmrPage.close();
  }
  assert.deepEqual(errors, [], "browser should have no uncaught page errors");
  console.log("Browser smoke passed: six case studies in EN/SK, language persistence and routing, gallery state, role attribution, mobile menu, reduced motion, and responsive widths.");
} finally {
  await context.close();
  await browser.close();
}
