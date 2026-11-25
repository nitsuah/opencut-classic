# Changelog

All notable changes to this fork are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

This repository is a fork of the archived original OpenCut codebase. It is kept
for reference and light maintenance; the upstream rewrite lives at
[opencut-app/opencut](https://github.com/opencut-app/opencut).

## [Unreleased]

### Added
- Project docs: `CHANGELOG.md`, `TASKS.md`, `ROADMAP.md` and `FEATURES.md`, written from the code.
- `promo/spots.json`, the feature ledger the nightly journeys tag against.
- Nightly journeys (`tests/journeys`, `.github/workflows/journeys.yml`): a plain Playwright run of the landing page, roadmap and project flow with visual baselines. Failures become `bot:journey` issues.

### Changed
- Dependencies updated; the `grid` crate is now 1.0.1 via a vendored `taffy` (see `Cargo.toml`).

### Fixed
- Subtitle parsing, font validation and shortcut validation hardened (#10).
