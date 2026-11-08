import assert from "node:assert/strict";
import { chromium } from "playwright";

const baseURL = (process.env.BASE_URL ?? "https://portfolio.ihorhub.eu").replace(/\/$/, "");
assert.ok(
  /^https:\/\/[A-Za-z0-9.-]+$/.test(baseURL) || baseURL === "http://portfolio:8080",
  "BASE_URL must be the public HTTPS origin or the isolated Compose production preview",
);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });

async function chooseLanguage(language) {
  const label = language === "sk" ? "Slovenčina" : "English";
  const picker = page.locator(".language-picker--navigation");
  await picker.locator(".language-trigger").click();
  await picker.getByRole("menuitemradio", { name: label }).click();
}

async function assertImagesLoad(selector) {
  const images = page.locator(selector);
  await images.evaluateAll((elements) => elements.forEach((element) => { element.loading = "eager"; }));
  for (const image of await images.all()) {
    await image.evaluate((element) => element.scrollIntoView({ block: "center" }));
    await image.evaluate((element) => element.decode());
  }
  const widths = await images.evaluateAll((elements) => elements.map((element) => element.naturalWidth));
  assert.ok(widths.length > 0 && widths.every((width) => width > 0), `public images should load: ${JSON.stringify(widths)}`);
}

try {
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Software for the real world." }).waitFor();
  assert.equal(await page.locator(".project-card").count(), 6);
  assert.equal(await page.locator(".hero-name").innerText(), "Bc. Ihor Havryliv");
  await page.getByRole("heading", { name: "IT STEP Academy" }).waitFor();
  await page.getByText("Completed in 2026", { exact: true }).waitFor();
  await assertImagesLoad(".project-card img");

  await chooseLanguage("sk");
  await page.getByRole("heading", { name: "Softvér pre skutočný svet." }).waitFor();
  await page.waitForFunction(() => document.documentElement.lang === "sk");
  await page.goto(`${baseURL}/projects/building-management-app`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Aplikácia na správu budov", level: 1 }).waitFor();
  await page.getByRole("heading", { name: "Moja rola a prínos" }).waitFor();
  assert.equal(await page.locator(".gallery-thumbnail").count(), 7);
  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Aplikácia na správu budov", level: 1 }).waitFor();
  await page.waitForFunction(() => document.documentElement.lang === "sk");

  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
    assert.ok(dimensions.document <= dimensions.viewport + 1, `case study overflows at ${width}px: ${JSON.stringify(dimensions)}`);
  }

  assert.deepEqual(errors, [], "public pages should have no uncaught browser errors");
  console.log("Public browser smoke passed: HTTPS pages, direct case-study refresh, EN/SK switching, gallery images, and responsive layout.");
} finally {
  await context.close();
  await browser.close();
}
