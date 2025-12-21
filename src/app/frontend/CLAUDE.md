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
npm run lint            # Run ESLint (Next.js linter)
npm run lint-quiet      # Run ESLint without warnings
npm run stylelint       # Check CSS/SCSS files
npm run stylelint-fix   # Auto-fix CSS/SCSS issues
npm run format          # Check code formatting with Prettier
npm run format-fix      # Auto-format code with Prettier
npm run pre-commit      # Run all checks (typecheck, lint, stylelint, format)
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
- Middleware handles locale resolution at `src/middleware.ts`
- URL structure: `/` (Japanese), `/en` (English) with rewriteDefault strategy
- **Client components**: Use hooks from `src/locales/client.ts` (`useI18n`, `useScopedI18n`, `useCurrentLocale`, `useChangeLocale`)
- **Server components**: Use functions from `src/locales/server.ts` (`getI18n`, `getScopedI18n`, `getCurrentLocale`, `getStaticParams`)

### State Management

- **Jotai** for global state (atomic state management)
- Key stores in `src/store/`:
  - `breakpoints/` - Responsive breakpoint detection
  - `headerInfos/` - Header state management

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
- `src/apis/fetch/` - API client functions for headless CMS
- `src/types/apis/fetch/` - TypeScript type definitions for API responses
- `src/layouts/` - Page layout templates
- `src/config/` - Configuration files (env, routes, SNS links)
- `src/libs/` - Utility libraries (Google Analytics, validation)
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions

### Styling

- Uses CSS Modules with PostCSS
- PostCSS plugins: nested, mixins, custom-media, autoprefixer
- Stylelint with SCSS configuration
- Path aliases: `@/` and `~/` both map to `src/`

### Code Style

- ESLint enforces import ordering with `eslint-plugin-import-x`:
  - Imports must be alphabetized (case-insensitive)
  - Newlines required between import groups
- Prettier handles code formatting

### Content Management

- Headless CMS architecture with typed API responses
- Content types: blogs, works, hobby, about
- Each content type has dedicated fetch functions and TypeScript types
- API responses are strongly typed in `src/types/apis/fetch/`

### Key Features

- **Google Analytics** and **Google AdSense** integration
- **Framer Motion** for animations
- **React Hook Form + Zod** for form validation
- **Splide** for carousels/sliders
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
- `pagination/` - Pagination components
- `sides/` - Sidebar components
- `sliders/` - Carousel/slider components
- `tags/` - Tag components
- `typographies/` - Text/typography components

### Testing

- **Vitest** for unit/component tests
- **React Testing Library** for component testing
- **Storybook** for component development and documentation
- Test files in `src/tests/` mirror the component structure

## Environment Requirements

- **Node.js**: >= 22.0.0 (managed with Volta at 22.20.0)
- **Package manager**: npm
- Browser support: Last 1 version of major browsers (Chrome, Edge, Firefox, Safari, iOS, Chrome Android)

## Important Notes

- TypeScript strict mode is enabled
- React StrictMode is enabled in production
- Image optimization is disabled (`unoptimized: true`)
- Static image imports have type definitions disabled
- The project uses ESM (`"type": "module"` in package.json)
- SVGR webpack loader is configured for SVG imports
