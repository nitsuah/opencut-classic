const { test, expect, step } = require('./journey');
const { isolate } = require('./opencut');

test.describe('public pages', () => {
    test(
        'visitor reads the roadmap',
        { tag: ['@feature:roadmap-page'] },
        async ({ page }) => {
            await isolate(page);
            await step(
                page,
                'open the roadmap',
                async () => {
                    await page.goto('/roadmap');
                    await expect(
                        page.getByRole('heading', { name: 'Roadmap', level: 1 }),
                    ).toBeVisible();
                },
                { docs: 'roadmap-page' },
            );
            await step(
                page,
                'see the four stages and their status',
                async () => {
                    for (const stage of [
                        'Start',
                        'Core UI',
                        'Essential functionality',
                        'Native app (mobile/desktop)',
                    ]) {
                        await expect(
                            page.getByRole('heading', { name: stage, level: 3 }),
                        ).toBeVisible();
                    }
                    await expect(page.getByText('In progress')).toBeVisible();
                },
                { screenshot: false },
            );
        },
    );
});
