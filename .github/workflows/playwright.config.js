// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1, // Retry once on failure (useful in CI)
  reporter: [['html'], ['list']],
  use: {
    headless: true,        // Run without browser window (required for CI)
    screenshot: 'only-on-failure', // Take screenshot when test fails
    video: 'retain-on-failure',    // Record video when test fails
    baseURL: process.env.APP_URL || 'https://your-app.com',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
