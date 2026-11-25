#!/bin/sh
# Builds the web app with placeholder env (the same values bun-ci.yml uses; no
# database or Redis is contacted by the pages the journeys visit) and runs the
# journeys. Used by `npm run test:journeys` / the nightly workflow.
set -e
export DATABASE_URL="postgresql://opencut:opencut@localhost:5432/opencut"
export BETTER_AUTH_SECRET="supersecret"
export NEXT_PUBLIC_SITE_URL="http://localhost:3000"
export UPSTASH_REDIS_REST_URL="https://your-upstash-redis-url"
export UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-token"
export NEXT_PUBLIC_MARBLE_API_URL="https://placeholder.example.com"
export MARBLE_WORKSPACE_KEY="placeholder"
export FREESOUND_CLIENT_ID="placeholder"
export FREESOUND_API_KEY="placeholder"

bun run --cwd apps/web build
npx playwright test -c config/playwright.journeys.config.js "$@"
