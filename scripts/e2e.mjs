import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:5173";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));

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
  assert.equal(await page.getByRole("link", { name: "ihorhavryliv123@gmail.com" }).getAttribute("href"), "mailto:ihorhavryliv123@gmail.com");
  assert.equal(await page.locator(".other-work-item").count(), 5, "homepage should include five additional repository links");
  const projectImages = await page.locator(".project-card img").all();
  for (const image of projectImages) {
    await image.evaluate((element) => element.scrollIntoView({ block: "center" }));
    await image.evaluate((element) => element.decode());
  }
  const imageWidths = await page.locator(".project-card img").evaluateAll((images) => images.map((image) => image.naturalWidth));
  assert.ok(imageWidths.every((width) => width > 0), `all project screenshots should load: ${JSON.stringify(imageWidths)}`);
  assert.ok((await page.request.get(`${baseURL}/social-preview.png`)).ok(), "social preview image should exist");
  await page.getByRole("button", { name: "Automation" }).click();
  assert.equal(await page.locator(".project-card").count(), 1, "Automation filter should narrow the project list");
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.getByRole("link", { name: "Case study" }).first().click();
  await page.getByRole("heading", { name: "Public lighting fault reporting" }).waitFor();
  await page.getByRole("link", { name: /View source/ }).waitFor();
  await page.getByRole("heading", { name: "My role & contribution" }).waitFor();
  await page.goto(`${baseURL}/projects/missing-data-tabular-models`, { waitUntil: "networkidle" });
  await page.getByText(/have not been reproduced from the current checkout/i).waitFor();
  await page.goto(`${baseURL}/projects/unknown-slug`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "This page is off the map." }).waitFor();

  await page.goto(baseURL, { waitUntil: "networkidle" });
  const screenshotDirectory = fileURLToPath(new URL("../docs/reports/screenshots/", import.meta.url));
  await mkdir(screenshotDirectory, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const image of await page.locator(".project-card img").all()) {
    await image.evaluate((element) => element.scrollIntoView({ block: "center" }));
    await image.evaluate((element) => element.decode());
  }
  const screenshotImageWidths = await page.locator(".project-card img").evaluateAll((images) => images.map((image) => image.naturalWidth));
  assert.ok(screenshotImageWidths.every((width) => width > 0), `all screenshot images should load: ${JSON.stringify(screenshotImageWidths)}`);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${screenshotDirectory}/portfolio-desktop.png`, fullPage: true });
  await page.locator("#about").evaluate((section) => section.scrollIntoView({ block: "start", behavior: "instant" }));
  const educationSectionTop = await page.locator("#about").evaluate((section) => Math.round(section.getBoundingClientRect().top));
  assert.ok(educationSectionTop >= 0 && educationSectionTop <= 100, `education screenshot should start below the sticky header, got top=${educationSectionTop}`);
  await page.getByRole("heading", { name: "Technical University of Košice" }).waitFor();
  await page.screenshot({ path: `${screenshotDirectory}/portfolio-education.png` });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
      overflowingElements: Array.from(document.querySelectorAll("body *"))
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return { tag: element.tagName, className: typeof element.className === "string" ? element.className : "", left: Math.round(rect.left), right: Math.round(rect.right) };
        })
        .filter((element) => element.left < -1 || element.right > window.innerWidth + 1)
        .slice(0, 8),
    }));
    assert.ok(dimensions.document <= dimensions.viewport + 1, `horizontal overflow at ${width}px: ${JSON.stringify(dimensions)}`);
  }
  await page.goto(`${baseURL}/projects/public-lighting-fault-reporting`, { waitUntil: "networkidle" });
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
    }));
    assert.ok(dimensions.document <= dimensions.viewport + 1, `project detail overflows at ${width}px: ${JSON.stringify(dimensions)}`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  for (const image of await page.locator(".project-card img").all()) {
    await image.evaluate((element) => element.scrollIntoView({ block: "center" }));
    await image.evaluate((element) => element.decode());
  }
  const mobileImageWidths = await page.locator(".project-card img").evaluateAll((images) => images.map((image) => image.naturalWidth));
  assert.ok(mobileImageWidths.every((width) => width > 0), `mobile project screenshots should load: ${JSON.stringify(mobileImageWidths)}`);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.emulateMedia({ reducedMotion: "reduce" });
  const reducedMotionDuration = await page.locator(".hero-visual").evaluate((element) => getComputedStyle(element).animationDuration);
  assert.ok(reducedMotionDuration === "1e-05s" || reducedMotionDuration === "0.00001s", `reduced motion should shorten animation, got ${reducedMotionDuration}`);
  await page.screenshot({ path: `${screenshotDirectory}/portfolio-mobile-viewport.png` });
  await page.screenshot({ path: `${screenshotDirectory}/portfolio-mobile.png`, fullPage: true });
  const menu = page.getByRole("button", { name: "Open navigation menu" });
  await menu.click();
  assert.equal(await page.getByRole("button", { name: "Close navigation menu" }).getAttribute("aria-expanded"), "true");
  await page.getByRole("link", { name: "Skills", exact: true }).click();
  assert.equal(await page.getByRole("button", { name: "Open navigation menu" }).getAttribute("aria-expanded"), "false");
  assert.deepEqual(errors, [], "browser should have no uncaught page errors");
  console.log("Browser smoke passed: filtering, routes, image loading, mobile menu, reduced motion, and six responsive widths.");
} finally {
  await browser.close();
}
