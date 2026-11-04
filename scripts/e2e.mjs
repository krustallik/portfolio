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
const projectCases = [
  ["public-lighting-fault-reporting", "Public lighting fault reporting", 5],
  ["booktop-marketplace", "Booktop marketplace", 5],
  ["gymbeam-shifts", "GymBeam shifts", 2],
  ["bodycast", "BodyCast health analytics", 8],
  ["building-management-app", "Building management app", 7],
  ["missing-data-tabular-models", "Tabular models with missing data", 4],
];

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
  const dimensions = await page.evaluate(() => ({ viewport: window.innerWidth, document: document.documentElement.scrollWidth }));
  assert.ok(dimensions.document <= dimensions.viewport + 1, `${label} overflows at ${width}px: ${JSON.stringify(dimensions)}`);
}

try {
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Software for the real world." }).waitFor();
  assert.equal(await page.locator(".project-card").count(), 6, "homepage should show six curated projects");
  assert.equal(await page.locator(".project-card--wide").count(), 1, "the final project should balance the selected-project grid");
  assert.equal(await page.locator(".hero-name").innerText(), "Bc. Ihor Havryliv");
  await page.getByRole("heading", { name: "Technical University of Košice" }).waitFor();
  await page.getByText("Bachelor's degree in Computer Science", { exact: true }).waitFor();
  await page.getByText("Completed in 2025", { exact: true }).waitFor();
  await page.getByText("Currently studying · second and final year", { exact: true }).waitFor();
  await page.getByRole("heading", { name: "IT STEP Academy" }).waitFor();
  await page.getByText("Completed in 2026", { exact: true }).waitFor();
  const buildingCard = page.locator(".project-card").filter({ hasText: "Building management app" });
  await buildingCard.getByText(/Full-Stack Developer & Project Coordinator/).waitFor();
  assert.equal(await page.getByRole("link", { name: "ihorhavryliv123@gmail.com" }).getAttribute("href"), "mailto:ihorhavryliv123@gmail.com");
  assert.equal(await page.locator(".other-work-item").count(), 5, "homepage should include five additional repository links");
  await assertImagesLoad(".project-card img");
  assert.ok((await page.request.get(`${baseURL}/social-preview.png`)).ok(), "social preview image should exist");
  await page.locator("#skills").scrollIntoViewIfNeeded();
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
  await page.getByRole("heading", { name: "This page is off the map." }).waitFor();

  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await assertImagesLoad(".project-card img");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${screenshotDirectory}/portfolio-desktop.png`, fullPage: true });
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

  const homePagePath = fileURLToPath(new URL("../src/pages/HomePage.tsx", import.meta.url));
  const originalHomePage = await readFile(homePagePath, "utf8");
  const originalHeading = "Software for the <span>real world.</span>";
  const hotHeading = "Software for the <span>real world. HMR</span>";
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
  console.log("Browser smoke passed: six case studies, image galleries, role attribution, skills evidence, mobile menu, reduced motion, and six responsive widths.");
} finally {
  await context.close();
  await browser.close();
}
