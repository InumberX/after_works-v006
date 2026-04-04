# Repository Guidelines

## Project Structure & Module Organization
This package is a Next.js 16 frontend rooted at `src/`. Main areas are `src/app` for routes, `src/components` for UI and common building blocks, `src/layouts`, `src/hooks`, `src/store`, and `src/utils` for shared logic, and `src/styles` plus `src/assets` for styling assets. Static files live in `public/assets`. Stories are under `src/stories`, and tests live in `src/tests`, usually mirroring the component path, for example `src/tests/components/ui/buttons/BaseButton/index.test.tsx`.

## Build, Test, and Development Commands
- `npm run dev`: start the local Next.js dev server.
- `npm run build`: create the production build.
- `npm run start`: run the built app locally.
- `npm run test`: launch Vitest with the `jsdom` test environment.
- `npm run storybook`: run Storybook on port `6006`.
- `npm run lint`, `npm run stylelint`, `npm run format`: check TS/JS, styles, and formatting.
- `npm run pre-commit`: run the full local cleanup sequence before pushing.

Use Node `22.20.0` via Volta, or any Node `>=22` compatible with `package.json`.

## Coding Style & Naming Conventions
TypeScript is strict and uses path aliases `@/*` and `~/*` for `src/*`. Follow the existing style: 2-space indentation, no semicolons, single quotes, and named exports for reusable components. Keep component directories flat with `index.tsx` and optional `index.module.css`. CSS Modules use PascalCase-style class names such as `.BaseButton` and modifier forms like `.BaseButton--rightArrow`. Run `oxlint`, `oxfmt`, and `stylelint` instead of hand-formatting.

## Testing Guidelines
Vitest and Testing Library are configured in `vitest.config.ts` and `vitest-env.ts`. Place tests in `src/tests/**` with the `index.test.tsx` naming pattern. Prefer user-facing assertions over implementation details, and cover interactive states, links, and disabled behavior for UI components. Run `npm run test` before opening a PR.

## Commit & Pull Request Guidelines
Recent history uses short conventional subjects such as `fix: upgrade vite` and `add: npmrc`. Keep commits focused and use the same lowercase prefix style (`fix:`, `add:`, `refactor:`). PRs should include a brief summary, linked issue or task when available, and screenshots or Storybook references for UI changes. Call out any config, dependency, or test-impacting changes explicitly.
