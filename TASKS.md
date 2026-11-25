# Tasks

Status of the work tracked for this fork. Upstream is archived, so this list is
about keeping the fork healthy, not about new editor features (see
[ROADMAP.md](ROADMAP.md) for those).

## Now

- [x] Update dependencies and clear the open Dependabot alert (vendored `taffy` with `grid` 1.0.1).
- [x] Project docs: CHANGELOG, TASKS, ROADMAP, FEATURES.
- [x] Nightly journeys for the landing page, roadmap and project creation.

## Next

- [ ] Drop the vendored `taffy` once `gpui` stops pinning `taffy =0.9.0`.
- [ ] Journey for the editor itself (add media, split, export) once a media fixture that works headless is available.
- [ ] Pin the journeys image to the Playwright version in `package.json` through Dependabot grouping.

## Later

- [ ] Run the Rust workspace tests in CI (only the wasm build and `bun test` run today).
- [ ] Decide whether the fork should track the upstream rewrite or stay frozen.
