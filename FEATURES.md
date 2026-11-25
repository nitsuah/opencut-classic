# Features

What the code does today. Feature ids match `promo/spots.json`, and journeys
tag themselves `@feature:<id>`. Status: **shipped** (works in the web app),
**partial** (present but incomplete), **stub** (scaffolding only).

OpenCut is a privacy-first video editor: projects and media stay in the
browser (IndexedDB for project data, OPFS for media files).

## Web editor (`apps/web`)

| Id | Feature | Status | Where |
|---|---|---|---|
| `landing-page` | Landing page with the "Try early beta" entry point | shipped | `src/app/page.tsx`, `src/components/landing` |
| `projects` | Project list: create, sort, search, per-project menu, empty state | shipped | `src/app/projects/page.tsx` |
| `local-storage` | Local-first storage: IndexedDB adapter, OPFS media, quota checks, schema migrations | shipped | `src/services/storage` |
| `timeline` | Multi-track timeline with snapping, ripple, group move/resize, bookmarks, scenes, zoom | shipped | `src/timeline`, `src/ripple`, `src/selection` |
| `keyframes` | Keyframe animation of element properties | shipped | `src/animation`, `docs/keyframes.md` |
| `effects` | Effects registry with GPU gaussian blur | partial | `src/effects` |
| `masks` | Element masks with feathering (SDF based) | partial | `src/masks`, `rust/crates/masks` |
| `retime` | Speed and retime controls | shipped | `src/speed`, `src/retime` |
| `text-and-gradients` | Text elements, fonts, gradients, background color/blur | shipped | `src/text`, `src/fonts`, `src/gradients`, `src/background` |
| `stickers` | Sticker library: flags, countries, logos, shapes | shipped | `src/stickers` |
| `sound-library` | Sound search through the Freesound API | shipped (needs API keys) | `src/sounds`, `src/app/api/sounds` |
| `audio-tools` | Waveforms, audio mastering, audio separation | partial | `src/media`, `src/timeline/audio-separation` |
| `subtitles` | Import SRT/ASS subtitles onto the timeline | shipped | `src/subtitles` |
| `auto-captions` | In-browser Whisper captions (tiny, small, medium, large-v3-turbo) | shipped | `src/transcription`, `src/services/transcription` |
| `export` | Export to WebM or MP4 | shipped | `src/export`, `src/components/editor/export-button.tsx` |
| `shortcuts` | Action system with rebindable keyboard shortcuts | shipped | `src/actions`, `docs/actions.md` |
| `roadmap-page` | Public roadmap, changelog, blog and contributors pages | shipped | `src/app/roadmap`, `src/app/changelog` |

## Rendering core (`rust/`)

- `compositor`: GPU compositor with blend modes and a texture pool.
- `effects`: effect pipeline and shaders.
- `masks`: mask rendering with feather and SDF.
- `gpu`: shared GPU context.
- `time`: frame rate, media time and timecode types.
- `bridge`, `wasm`: bindings; `opencut-wasm` is consumed from npm by the web app.

## Desktop (`apps/desktop`)

| Id | Feature | Status |
|---|---|---|
| `desktop-app` | Native GPUI app | stub (`gpui` window only) |

## Not here

No accounts or cloud project sync; the database and Redis in `docker-compose.yml` back auth, rate limiting and feedback only.
