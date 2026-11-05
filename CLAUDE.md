# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Next.js 16 portfolio website built with React 19, TypeScript, and modern web technologies. The site is multilingual (Japanese/English) using next-international, and features a headless CMS architecture for content management.

## Common Commands

### Development

```bash
npm run dev              # Start development server (default port 3000)
npm run build           # Build for production
npm run start           # Start production server
```

### Code Quality

```bash
npm run typecheck       # Run TypeScript type checking
npm run lint            # Run oxlint (Rust-based linter, --max-warnings=0)
npm run lint-fix        # Auto-fix lint issues with oxlint
npm run stylelint       # Check CSS/SCSS files
npm run stylelint-fix   # Auto-fix CSS/SCSS issues
npm run format          # Check code formatting with oxfmt
npm run format-fix      # Auto-format code with oxfmt
npm run pre-commit      # Run typecheck + lint-fix + stylelint-fix + format-fix
```

### Testing

```bash
npm run test            # Run Vitest tests (watch mode)
npm run test -- --run   # Run tests once without watch
npm run test -- src/tests/components/ui/buttons/BaseButton  # Run specific test file
npm run storybook       # Start Storybook on port 6006
npm run storybook-build # Build Storybook
```

### Dependencies

```bash
npm run upgrade-check   # Check for outdated packages
npm run upgrade         # Upgrade all packages (use with caution)
```

## Architecture

### Internationalization (i18n)

- Uses `next-international` for multilingual support (Japanese default, English available)
- Locale files: `src/locales/ja.ts` and `src/locales/en.ts`
- Middleware handles locale resolution at `src/middleware.ts` (exports `middleware` function and route `config`). NOTE: kept on the deprecated `middleware.ts` (Edge runtime) convention rather than Next.js 16's `proxy.ts` because the OpenNext Cloudflare adapter does not support Node.js middleware (Next 16 Proxy is Node-only).
- URL structure: `/` (Japanese), `/en` (English) with rewriteDefault strategy
- **Client components**: Use hooks from `src/locales/client.ts` (`useI18n`, `useScopedI18n`, `useCurrentLocale`, `useChangeLocale`)
- **Server components**: Use functions from `src/locales/server.ts` (`getI18n`, `getScopedI18n`, `getCurrentLocale`, `getStaticParams`)

### State Management

- **Jotai** for global state (atomic state management)
- Key stores in `src/store/`:
  - `breakpoints/` - Responsive breakpoint detection
  - `header/` - Header state management

### Providers Architecture

The app uses a nested provider pattern in `src/providers/AppProvider.tsx`:

1. LocaleProvider (i18n context)
2. JotaiProvider (state management)
3. ZodProvider (validation i18n)
4. BreakpointsProvider (responsive utilities)

### Directory Structure

- `src/app/[locale]/` - Next.js App Router pages with dynamic locale routing
- `src/components/common/` - Shared layout components (Header, Footer, etc.)
- `src/components/ui/` - Reusable UI components organized by type (buttons, cards, etc.)
- `src/apis/fetch/` - API client functions for headless CMS. `api-client.ts` (`apiClient`) fetches and returns an `ApiResult` (`success: true` with `data`, or `success: false` with `status`, `code` and `message`) instead of throwing, as sugidama's `app/data/api-client.ts` does. Its types are in `src/types/apis/fetch/api-client.d.ts`. Every fetcher calls Kuroco through it, as `apiClient(endpoint, params)`, and its successful answers are cached for five minutes on the server, not in the browser (see **Cloudflare Workers**). In the list and detail fetchers of blogs, works and hobby, a `code` of `not_found` (Kuroco's 404: a page past the last, an article that does not exist) becomes a 404 page, except on a list's first page, which shows an empty list; any other failure becomes a 500. The tag and about fetchers keep their own fallbacks (an empty list, `undefined`)
- `src/types/apis/fetch/` - TypeScript type definitions for API responses
- `src/layouts/` - Page layout templates
- `src/config/` - Configuration files (env, routes, SNS links)
- `src/consts/` - Constants shared across layers (e.g. `api.ts`: `HTTP_STATUS`, `API_ERROR_CODE`, `API_CACHE_MAX_AGE_SECONDS`)
- `src/libs/` - Utility libraries (Google Analytics, validation)
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions

### Styling

- Uses CSS Modules with PostCSS
- PostCSS plugins: nested, mixins, custom-media, autoprefixer
- Stylelint with SCSS configuration
- Path alias: `~/` maps to `src/`

### Code Style

- Oxlint (Rust-based linter) enforces code quality rules for TypeScript, React, and Next.js
  - Configuration: `.oxlintrc.json`
- Oxfmt (Rust-based formatter) handles code formatting
  - Configuration: `.oxfmtrc.json`

### Content Management

- Headless CMS architecture with typed API responses
- Content types: blogs, works, hobby, about
- Each content type has dedicated fetch functions and TypeScript types
- API responses are strongly typed in `src/types/apis/fetch/`

### Key Features

- **Google Analytics** and **Google AdSense** integration
- **Framer Motion** for animations
- **React Hook Form + Zod** for form validation
- **keen-slider** for carousels/sliders
- RSS feed generation at `/rss.xml` (rewrites to `/api/rss`)
- Cache busting via `NEXT_PUBLIC_CACHE_BUSTER` env variable (auto-generated at build time)

### Component Organization

Components follow a barrel export pattern with index files. UI components are categorized:

- `ads/` - Advertisement components
- `articles/` - Article display components
- `breadcrumbs/` - Navigation breadcrumbs
- `buttons/` - Button components
- `cards/` - Card components
- `icons/` - Icon components (uses SVGR)
- `layouts/` - Layout utilities
- `lists/` - List/collection components
- `paginations/` - Pagination components
- `sides/` - Sidebar components
- `sliders/` - Carousel/slider components
- `tags/` - Tag components
- `typographies/` - Text/typography components

### Testing

- **Vitest** for unit/component tests
- **React Testing Library** for component testing
- **Storybook** for component development and documentation
- Test files in `src/tests/` mirror the component structure

### Cloudflare Workers

- Deployed with OpenNext to Cloudflare Workers. `wrangler.jsonc` has two environments: `development` (staging, `dev-after-works`) and `production` (`after-works`). Deploy with `npm run deploy:staging` / `npm run deploy:production` or CI, always with `--env`. The top level is named `after-works-local` so a deploy without `--env` (`npm run deploy`) creates a stray Worker instead of replacing production.
- `workers/app.ts` wraps the OpenNext handler in a Basic auth gate, enabled only where the `BASIC_AUTH_USER` / `BASIC_AUTH_PASS` secrets are set (staging).
- `assets.run_worker_first` is `true` on staging only, so the gate covers static assets there. Production serves matching static files from the edge without invoking the Worker. Setting the Basic auth secrets on production therefore protects its pages but not its assets: turn `run_worker_first` on there too. An environment's `assets` replaces the top level's whole, so staging repeats `binding` and `directory`.
- No Worker uses Smart Placement. Production ran on it from 2026-10-27 to lower Kuroco's usage: after the move from AWS Amplify (one region) on 2026-05-30, Kuroco's uncached API requests and billed processing time rose about fourfold and eightfold, and a Worker spread over every data center looked like the cause. It did not help: in the week after, Kuroco's requests did not fall, and the P90 from Tokyo, where most visitors are, went from 666 ms to 1,004 ms.
- Kuroco's answers are kept in the Workers cache (`caches.default`) for `API_CACHE_MAX_AGE_SECONDS` (300, `src/consts/api.ts`) by `apiClient()`, so a page viewed many times asks Kuroco once per five minutes in each data center. `toApiUrl(endpoint, params)` builds the URL the API is asked, and `toCacheUrl()` derives the key from that same URL: the API's path and query under the site's origin and `/__cache/${CACHE_BUSTER}`. No parameter can reach the API without reaching the key; the origin keeps staging and production apart, and `CACHE_BUSTER` makes every deploy start from an empty cache. The key is only a name in the cache: nothing requests it. Only a 200 whose body is JSON is stored (body, `Content-Type` and `Cache-Control: max-age=300`, none of Kuroco's headers); errors are never stored, and a cache that fails to read or write only costs that call a request. Outside Workers (Vitest, `next dev`) there is no `caches`, so every call asks the API; `npm run preview` runs workerd, which has one, so it caches like a deployed Worker and an edit in Kuroco can take five minutes to show up there too. An edit in Kuroco reaches the site within five minutes, or at the next deploy.
- **Calls made from the browser are not cached.** The client components that load more items or switch tabs (`MainColumn` of blogs, works and hobby, and about's `History`) call the fetchers in the browser, which asks Kuroco directly: the browser has `caches` but no `caches.default`, so `apiClient()` skips the cache there. Every such call still reaches Kuroco; caching them needs them to go through the Worker (a Route Handler).

## Environment Requirements

- **Node.js**: >= 24.0.0 (managed with Volta at 24.16.0)
- **Package manager**: npm
- Browser support: Last 1 version of major browsers (Chrome, Edge, Firefox, Safari, iOS, Chrome Android)

## Important Notes

- TypeScript strict mode is enabled
- React StrictMode is enabled in production
- Image optimization is disabled (`unoptimized: true`)
- Static image imports have type definitions disabled
- The project uses ESM (`"type": "module"` in package.json)
- SVGR webpack loader is configured for SVG imports
