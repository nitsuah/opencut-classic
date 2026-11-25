# Roadmap

This fork follows the original OpenCut roadmap shown at `/roadmap` in the app.
Upstream is archived, so items beyond "Essential functionality" are
direction, not commitments.

| Stage | Status | What it covers |
|---|---|---|
| Start | Completed | Repository, initial structure, the vision for a free open-source editor. |
| Core UI | Completed | Layout, header, panels, timeline container. |
| Essential functionality | In progress | Timeline interactivity, storage, effects, transitions, captions, export. |
| Native app (mobile/desktop) | Not started | Mac, Windows, Linux, iOS and Android. A GPUI desktop shell exists in `apps/desktop` but is a stub. |

## Fork-specific direction

1. Keep dependencies and CI green so the code stays buildable.
2. Move shared logic from TypeScript into the Rust crates (`rust/crates/*`, `rust/wasm`) as upstream was doing.
3. Grow the nightly journeys from page-level checks to editor interactions.

See [TASKS.md](TASKS.md) for the concrete items and [FEATURES.md](FEATURES.md) for what exists today.
