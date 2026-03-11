# Helios-Internal

## Project Overview
Internal operations platform for Helios Energy (solar, heat pump, EV charger, smart home installations in NYC). React + TypeScript + Vite frontend with Express backend. Currently uses static demo data (no database required).

## Development
- Run locally: `npm run dev` (serves on http://localhost:5000)
- The app runs on Windows, so `cross-env` is used for environment variables in npm scripts
- `reusePort` is removed from server listen options (not supported on Windows)

## Deployment
- After making changes, always commit and push to GitHub (`git push origin main`)
- Railway auto-deploys from the main branch
- Test locally at http://localhost:5000 AND push to GitHub

## Key Paths
- Frontend: `client/src/` (React pages in `pages/`, components in `components/`)
- Backend: `server/` (Express, minimal routes)
- Static demo data: `client/src/lib/data.ts`
- Shared schema: `shared/schema.ts`
