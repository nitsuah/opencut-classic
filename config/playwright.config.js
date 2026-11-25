// @ts-check
// Base Playwright config. The journeys config (playwright.journeys.config.js)
// extends it; nothing else in the repo runs Playwright today.
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: '../tests',
    use: { baseURL: 'http://localhost:3000' },
});
