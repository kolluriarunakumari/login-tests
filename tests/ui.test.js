const { test, expect } = require("@playwright/test");

test("UI - page title is correct", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveTitle(/Example Domain/);
  console.log("✅ Title correct");
});

test("UI - heading is visible", async ({ page }) => {
  await page.goto("https://example.com");
  const heading = page.locator("h1");
  await expect(heading).toBeVisible();
  await expect(heading).toHaveText("Example Domain");
  console.log("✅ Heading visible");
});

test("UI - link click navigates", async ({ page }) => {
  await page.goto("https://example.com");
  await page.click("a");
  await page.waitForLoadState("networkidle");
  expect(page.url()).toContain("iana.org");
  console.log("✅ Navigation worked, URL:", page.url());
});

test("UI - take screenshot", async ({ page }) => {
  await page.goto("https://example.com");
  await page.screenshot({ path: "screenshot.png" });
  console.log("✅ Screenshot saved");
});