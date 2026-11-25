// Repo fixture for the journeys: keeps every run hermetic.
//  - the app is the production build served on localhost:3000
//  - nothing leaves localhost (GitHub stars, avatars, remote images are aborted)
//  - projects live in the browser's IndexedDB, so a fresh context starts empty
const { freezeClock } = require('./journey');

async function isolate(page) {
    await page.route(
        (url) => !['localhost', '127.0.0.1'].includes(url.hostname),
        (route) => route.abort(),
    );
    await freezeClock(page, '2026-11-01T12:00:00Z');
}

module.exports = { isolate };
