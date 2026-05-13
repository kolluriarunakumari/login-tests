const { test, expect } = require("@playwright/test");

const URL = "https://practicetestautomation.com/practice-test-login/";

test("LOGIN PASS - valid credentials", async ({ page }) => {
  await page.goto(URL);
  await page.fill("#username", "student");
  await page.fill("#password", "Password123");
  await page.click("#submit");
  await expect(page.locator(".post-title")).toHaveText("Logged In Successfully");
  console.log("✅ Login passed!");
});

test("LOGIN FAIL - wrong password", async ({ page }) => {
  await page.goto(URL);
  await page.fill("#username", "student");
  await page.fill("#password", "wrongpassword");
  await page.click("#submit");
  await expect(page.locator("#error")).toContainText("Your password is invalid!");
  console.log("✅ Wrong password error shown");
});

test("LOGIN FAIL - wrong username", async ({ page }) => {
  await page.goto(URL);
  await page.fill("#username", "wronguser");
  await page.fill("#password", "Password123");
  await page.click("#submit");
  await expect(page.locator("#error")).toContainText("Your username is invalid!");
  console.log("✅ Wrong username error shown");
});