const { test, expect, step } = require('./journey');
const { isolate } = require('./opencut');

test.describe('first project', () => {
    test(
        'visitor starts a project from the landing page',
        { tag: ['@feature:landing-page', '@feature:projects', '@feature:local-storage'] },
        async ({ page }) => {
            await isolate(page);
            await step(
                page,
                'open the landing page',
                async () => {
                    await page.goto('/');
                    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
                        'The open source',
                    );
                },
                { docs: 'landing-page' },
            );
            await step(
                page,
                'choose Try early beta',
                async () => {
                    await page.getByRole('link', { name: /Try early beta/ }).click();
                    await expect(page).toHaveURL(/\/projects$/);
                    await expect(page.getByText('No projects yet')).toBeVisible();
                },
                { docs: 'projects' },
            );
            await step(
                page,
                'create the first project',
                async () => {
                    await page
                        .getByRole('button', { name: 'Create your first project' })
                        .click();
                    await expect(page).toHaveURL(/\/editor\/[^/]+$/);
                },
                { screenshot: false },
            );
        },
    );
});
