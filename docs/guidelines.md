# Semeia Code Architecture & Engineering Guidelines

## 1. TypeScript & Code Standards
- Strict typing is mandatory across all components and models. The `any` type is strictly forbidden (BLOCKER).
- All React component props and editorial data structures must define explicit TypeScript interfaces (BLOCKER).
- React list items must use unique, stable identifiers from data (e.g., `item.id`). Using array indices as `key` is prohibited (BLOCKER).
- Imports must use exact casing to avoid deterministic build failures on case-sensitive Linux filesystems (BLOCKER).

## 2. Content Separation & Data Model
- Editorial texts, member lists, and school descriptions must reside in `src/model/data.json` (BLOCKER).
- Components must consume editorial data via typed abstractions in `src/model/data.ts` and never hardcode static copy inside JSX (WARNING).
- Keep companies separated from volunteer roles according to the dual-view specification (schools vs. volunteers).

## 3. Quality, Clean Code & Testing
- All unit and integration tests (`npm test` / Vitest) must pass cleanly with zero regressions on every PR (BLOCKER).
- Production build (`npm run build`) and linting (`npm run lint`) must succeed without warnings or errors (BLOCKER).
- Component functions should not exceed 60 lines of code; decompose complex layouts into focused subcomponents (WARNING).
- Do not swallow errors with empty `catch` or `except` blocks (BLOCKER).

## 4. Accessibility & Responsive Web Standards
- Avoid fixed pixel widths that trigger horizontal scrolling on mobile viewports (BLOCKER).
- All interactive links, buttons, and form controls must have accessible names and visible focus states (WARNING).
- Images must have meaningful `alt` text and responsive dimensions to prevent Cumulative Layout Shift (CLS).
