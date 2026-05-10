// ✅ Login Automation Test using Playwright
// Replace the URL and credentials with your actual app details

const { test, expect } = require('@playwright/test');

// ─── TEST 1: Successful Login ───────────────────────────────────────────────
test('TC01 - Successful login with valid credentials', async ({ page }) => {
  // Go to your login page
  await page.goto(process.env.APP_URL || 'https://your-app.com/login');

  // Fill in username/email
  await page.fill('#username', process.env.TEST_USERNAME || 'testuser@example.com');

  // Fill in password
  await page.fill('#password', process.env.TEST_PASSWORD || 'testpassword123');

  // Click login button
  await page.click('#login-btn');

  // ✅ Assert: User should be redirected to dashboard
  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.locator('h1')).toContainText('Welcome');
});

// ─── TEST 2: Invalid Password ───────────────────────────────────────────────
test('TC02 - Login fails with wrong password', async ({ page }) => {
  await page.goto(process.env.APP_URL || 'https://your-app.com/login');

  await page.fill('#username', process.env.TEST_USERNAME || 'testuser@example.com');
  await page.fill('#password', 'wrongpassword');
  await page.click('#login-btn');

  // ✅ Assert: Error message should appear
  await expect(page.locator('.error-message')).toBeVisible();
  await expect(page.locator('.error-message')).toContainText('Invalid credentials');
});

// ─── TEST 3: Empty Fields Validation ───────────────────────────────────────
test('TC03 - Login fails with empty username and password', async ({ page }) => {
  await page.goto(process.env.APP_URL || 'https://your-app.com/login');

  // Click login without entering anything
  await page.click('#login-btn');

  // ✅ Assert: Validation error should show
  await expect(page.locator('.error-message')).toBeVisible();
});

// ─── TEST 4: Empty Password Only ───────────────────────────────────────────
test('TC04 - Login fails with empty password', async ({ page }) => {
  await page.goto(process.env.APP_URL || 'https://your-app.com/login');

  await page.fill('#username', 'testuser@example.com');
  // Leave password empty
  await page.click('#login-btn');

  // ✅ Assert: Password validation message should show
  await expect(page.locator('[data-testid="password-error"]')).toBeVisible();
});

// ─── TEST 5: Logout After Login ─────────────────────────────────────────────
test('TC05 - User can log out after logging in', async ({ page }) => {
  await page.goto(process.env.APP_URL || 'https://your-app.com/login');

  await page.fill('#username', process.env.TEST_USERNAME || 'testuser@example.com');
  await page.fill('#password', process.env.TEST_PASSWORD || 'testpassword123');
  await page.click('#login-btn');

  // Wait for dashboard
  await expect(page).toHaveURL(/.*dashboard/);

  // Click logout
  await page.click('#logout-btn');

  // ✅ Assert: Should be back to login page
  await expect(page).toHaveURL(/.*login/);
});
