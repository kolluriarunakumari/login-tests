const { test, expect } = require('@playwright/test');

const URL = 'https://www.saucedemo.com';

// ─── TC01: Successful login ──────────────────────────────────────────────────
test('TC01 - Successful login with valid credentials', async ({ page }) => {
  await page.goto(URL);

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page).toHaveURL(/.*inventory/);
  await expect(page.locator('.title')).toContainText('Products');
});

// ─── TC02: Wrong password ────────────────────────────────────────────────────
test('TC02 - Login fails with wrong password', async ({ page }) => {
  await page.goto(URL);

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'wrongpassword');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
});

// ─── TC03: Empty username and password ───────────────────────────────────────
test('TC03 - Login fails with empty username and password', async ({ page }) => {
  await page.goto(URL);

  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
});

// ─── TC04: Empty password only ───────────────────────────────────────────────
test('TC04 - Login fails with empty password', async ({ page }) => {
  await page.goto(URL);

  await page.fill('#user-name', 'standard_user');
  await page.click('#login-button');

  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
});

// ─── TC05: Logout after login ─────────────────────────────────────────────────
test('TC05 - User can log out after logging in', async ({ page }) => {
  await page.goto(URL);

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page).toHaveURL(/.*inventory/);

  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');

  await expect(page).toHaveURL(URL + '/');
  await expect(page.locator('#login-button')).toBeVisible();
});
