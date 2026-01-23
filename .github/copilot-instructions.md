# StyleLink Copilot Instructions

## Project Overview

**StyleLink** is a Progressive Web App (PWA) for shoe shopping and price comparison. It enables users to compare prices across retailers, save items, receive price alerts, and install the app natively on mobile/desktop devices.

## Architecture

### Tech Stack
- **Next.js 16** with TypeScript and React 19.2
- **Tailwind CSS 4** (with PostCSS) for styling using Stone color palette (tans/greys)
- **Service Worker** (`sw.js`) + **Workbox** for PWA caching/offline support
- **Lucide React** for icons
- **Axios** for API calls

### Key Directories
- `src/app/` - Next.js pages (layout, home, search, saved, contact)
- `src/components/` - Reusable UI components (Header, SearchResults, Hero, etc.)
- `types/` - TypeScript definitions (custom PWA type stubs in `global.d.ts`)
- `public/` - Static assets including manifest.json and service worker
- `.github/` - CI/CD and documentation

### Data Flow
1. **Search Page** (`src/app/search/page.tsx` → `SearchClient.tsx`) - Client-side component reads URL query params via `useSearchParams()` hook
2. **SearchResults Component** - Maps mock product data (currently hardcoded, ready for API integration)
3. **Product Display** - Shows filtered results with retailer links, affiliate tracking, and price comparisons

## Development Workflows

### Commands
```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
```

### Component Patterns

**Client Components** - Use `'use client'` directive for interactive features (state, hooks):
- `Header.tsx` - Navigation with hamburger menu (all screen sizes)
- `SearchClient.tsx` - Reads query params and manages results
- `SearchResults.tsx` - Displays products with filters, grid/list toggle, mock data

**Server Components** - Default for static content:
- `layout.tsx` - Sets metadata, viewport, manifest, icons
- `page.tsx` - Home page composition (Header + Hero + FeaturedCollection + Footer)

**Interface Pattern** - Define TypeScript interfaces for data structures:
```typescript
// Example from SearchResults.tsx
interface ShoeProduct {
  id: string
  name: string
  brand: string
  price: number
  retailer: string
  image: string
  affiliateLink: string
  // ... additional fields
}
```

## PWA Essentials

### Critical Files
- **manifest.json** - App metadata, icons, theme colors (controls installability)
- **sw.js** - Service Worker; handles caching and offline functionality
- **types/global.d.ts** - Custom TypeScript stubs for `next-pwa` module
- **next.config.ts** - Enables `reactCompiler: true` for performance

### Key Config Locations
- **tsconfig.json** - Path alias: `@/*` maps to `src/*` (use `@/components`, `@/types`)
- **postcss.config.mjs** - Tailwind v4 integration
- **eslint.config.mjs** - ESLint configuration

### Styling Convention
- **Color Palette**: Stone colors (stone-200, stone-400, etc.) as primary theme
- **Dark Mode Support**: Black header (`bg-black`), light backgrounds default
- **Responsive**: Mobile-first with `sm:`, `lg:` breakpoints
- **Example**: `className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"`

## Important Patterns & Conventions

### Naming & Organization
- Components are PascalCase (`Header.tsx`, `SearchResults.tsx`)
- Pages follow Next.js App Router: `pages/` maps to routes (e.g., `search/page.tsx` → `/search`)
- Mock data is imported directly (replace with API calls via Axios when ready)

### Next.js App Router Details
- **Route Structure**: `src/app/[folder]/page.tsx` defines routes
- **Current Routes**: `/` (home), `/search?q=query`, `/saved`, `/contact`
- **Metadata**: Defined in `layout.tsx` (centralized for SEO/PWA)

### Hook Usage
- `useSearchParams()` - Read URL query params (client component only)
- `useState()` - Manage local UI state (menu toggles, filters)

### Cross-Component Communication
- Pass data via props (no global state manager; consider adding Redux/Zustand if needed)
- SearchResults receives `query` prop from SearchClient
- Mock data currently hardcoded; integrate real API via Axios

## Quick Integration Points

### To Add New Features
1. **New Page**: Create `src/app/[feature]/page.tsx` following existing layout pattern
2. **New Component**: Create in `src/components/[ComponentName].tsx` with TypeScript interface
3. **Add API Call**: Use Axios in client component (`axios.get(url)`), handle errors gracefully
4. **Update Routes**: Add Link in Header navigation if needed

### Common Tasks
- **Update Colors**: Change Tailwind classes (search for `stone-`, `black`, `white`)
- **Add Icon**: Import from Lucide (`import { IconName } from 'lucide-react'`)
- **Modify Metadata**: Edit `src/app/layout.tsx` metadata object
- **PWA Testing**: Run production build locally (`npm run build && npm start`)

## File Reference Guide
- [src/app/layout.tsx](src/app/layout.tsx) - Root layout with metadata and PWA config
- [src/app/search/SearchClient.tsx](src/app/search/SearchClient.tsx) - Search page logic
- [src/components/SearchResults.tsx](src/components/SearchResults.tsx) - Product display and mock data
- [types/global.d.ts](types/global.d.ts) - PWA TypeScript definitions
- [public/manifest.json](public/manifest.json) - PWA app manifest
