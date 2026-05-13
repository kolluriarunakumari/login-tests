const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  testMatch: ["**/login.test.js", "**/ui.test.js"],
  timeout: 30000,
  use: {
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  reporter: [["html"], ["list"]],
});