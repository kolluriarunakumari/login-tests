const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: {
    headless: false,
    slowMo: 700,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
});