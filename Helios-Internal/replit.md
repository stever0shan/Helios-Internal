# Solanta - Internal Operations Platform

## Overview
A unified internal operations platform demo for Solanta, a Brooklyn-based solar and home energy company. Replaces HubSpot, Zapier, DocuSign, Sunvoy, CompanyCam, Google Drive, and custom spreadsheets with one platform.

## Architecture
- **Frontend**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Express.js (minimal - demo uses static data)
- **Routing**: wouter
- **State**: Static demo data in `client/src/lib/data.ts`
- **Styling**: Dark navy sidebar, light content area, teal/green (primary) accent

## Pages
- `/` - Dashboard with metrics, schedule, activity feed, alerts
- `/pipeline` - Kanban board with 13 workflow stages (filterable, searchable, list/kanban toggle)
- `/job/:id` - Job detail page with team, checklist, notes, funding, property, documents, scheduling
- `/customers` - Customer directory with search
- `/scheduling` - Today's jobs, upcoming events, crew availability, calendar
- `/proposals` - Proposal tracking with status
- `/documents` - Document management across all projects
- `/reports` - Analytics by borough, service type, pipeline stage
- `/settings` - Profile, team, company, notification preferences

## Key Files
- `client/src/lib/data.ts` - All demo data (jobs, schedules, activities, alerts, metrics)
- `client/src/components/layout/Sidebar.tsx` - Fixed dark sidebar navigation
- `client/src/components/layout/AppLayout.tsx` - Main layout wrapper
- `client/src/pages/*.tsx` - All page components

## Design System
- Brand color: Green/Teal (`hsl(158, 64%, 42%)`)
- Dark sidebar: `hsl(210, 6%, 15%)`
- Font: Open Sans
- Service type color coding: Solar=green, Heat Pump=blue, EV Charger=orange, Smart Home=purple, Efficiency Audit=yellow
