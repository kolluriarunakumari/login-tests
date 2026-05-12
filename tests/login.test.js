// ─── TC06: Verify account number and ID match logged-in
//  user ──────────────────
const { test, expect } = require('@playwright/test');;;;;
test('TC06 - Account screen displays correct account number and ID for standard_user', async ({ page }) => {
  await page.goto(URL);

  // Login as standard_user
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Assume navigation to account/profile page (adjust URL/selector as needed)
  await page.goto(URL + '/account');  // Or click a link like await page.click('#account-link');

  // Verify account number (e.g., displayed as '123456789')
  await expect(page.locator('#account-number')).toContainText('123456789');  // Replace with actual expected value

  // Verify account ID matches username or a derived ID (e.g., 'standard_user' -> 'user_001')
  await expect(page.locator('#account-id')).toContainText('user_001');  // Replace with logic to match logged-in user
});

// ─── TC07: Verify account details for different users ─────────────────────────
test('TC07 - Account screen shows unique account number and ID for problem_user', async ({ page }) => {
  await page.goto(URL);

  // Login as problem_user
  await page.fill('#user-name', 'problem_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Navigate to account page
  await page.goto(URL + '/account');

  // Verify unique account number for this user
  await expect(page.locator('#account-number')).toContainText('987654321');  // Different from standard_user

  // Verify account ID is specific to problem_user
  await expect(page.locator('#account-id')).toContainText('user_002');  // Ensure it doesn't show standard_user's ID
});

// ─── TC08: Account fields are not visible without login ──────────────────────
test('TC08 - Account screen fields are hidden or inaccessible without login', async ({ page }) => {
  await page.goto(URL + '/account');  // Direct access attempt

  // Should redirect to login or show error
  await expect(page).toHaveURL(URL + '/');  // Or check for login form visibility
  await expect(page.locator('#account-number')).not.toBeVisible();
  await expect(page.locator('#account-id')).not.toBeVisible();
});

// ─── TC09: Account ID updates correctly after user switch ────────────────────
test('TC09 - Account ID changes when switching users', async ({ page }) => {
  // Login as standard_user
  await page.goto(URL);
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.goto(URL + '/account');
  await expect(page.locator('#account-id')).toContainText('user_001');

  // Logout
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');

  // Login as another user (e.g., locked_out_user, but adjust if needed)
  await page.fill('#user-name', 'performance_glitch_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.goto(URL + '/account');

  // Verify ID changed
  await expect(page.locator('#account-id')).toContainText('user_003');  // Different ID for new user
});

// ─── TC10: Invalid account data handling (if editable) ───────────────────────
test('TC10 - Account screen rejects invalid account number updates', async ({ page }) => {
  await page.goto(URL);

  // Login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.goto(URL + '/account');

  // Assume account number is editable (adjust selectors)
  await page.fill('#account-number-input', 'invalid_number');
  await page.click('#save-button');

  // Verify error and original value remains
  await expect(page.locator('[data-test="error"]')).toContainText('Invalid account number');
  await expect(page.locator('#account-number')).toContainText('123456789');  // Original value
});;;;;;;;;
