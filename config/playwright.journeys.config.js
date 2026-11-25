// @ts-check
// Journeys config: extends the base config. Contract:
// https://github.com/nitsuah/.github/blob/main/journeys/STANDARD.md
const path = require('path');
const base = require('./playwright.config.js');

module.exports = {
    ...base,
    testDir: '../tests/journeys',
    // Linux-only baselines (always generated in the Playwright Docker image).
    snapshotPathTemplate:
        '{testDir}/__screenshots__/{testFilePath}/{testName}/{arg}{ext}',
    // A missing baseline fails in CI instead of being silently written.
    updateSnapshots: process.env.CI ? 'none' : 'missing',
    fullyParallel: false,
    workers: 1,
    retries: process.env.CI ? 1 : 0, // pass-on-retry = flaky, not an issue
    reporter: [
        ['list'],
        ['json', { outputFile: path.resolve(__dirname, '../journeys-report/report.json') }],
    ],
    // The production build is made by script/journeys.sh; `next start` serves it.
    webServer: {
        command: 'bun run --cwd apps/web start',
        cwd: path.resolve(__dirname, '..'),
        url: 'http://localhost:3000/api/health',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
    expect: {
        toHaveScreenshot: {
            // DOM-only pages: a small allowance for font antialiasing.
            maxDiffPixels: 50,
            animations: 'disabled',
            caret: 'hide',
            scale: 'css',
        },
    },
    use: {
        ...(base.use || {}),
        viewport: { width: 1440, height: 900 },
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
};
