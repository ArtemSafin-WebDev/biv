# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — local dev server (host: true, accessible on LAN)
- `npm run build` — `tsc && vite build` (run after any significant change to verify)
- `npm run preview` — preview the production build

## Stack

**Vite 7** + **TypeScript (strict)** + **SCSS (sass-embedded)** + **Handlebars** (`vite-plugin-handlebars`). Dependencies: GSAP, Swiper, Inputmask, validator.js.

## Architecture

### Entry points
- `src/js/main.ts` — single TS entry: calls `ui()`, `sections()`, `initForms()`
- `pages/*.html` — all HTML pages; Vite builds each one as a separate entry

### JS structure
- `src/js/classes/Component.ts` — base class; UI components extend it, must implement `destroy()` calling `this.unregister()`
- `src/js/classes/components/` — reusable component classes (e.g. `AJAXForm.ts`)
- `src/js/classes/facades/FormValidator.ts` — validation abstraction (use for all form validation)
- `src/js/classes/services/` — service classes
- `src/js/ui/` — UI component initialization (accordions, etc.)
- `src/js/sections/` — section-level initialization
- `src/js/forms/` — form wiring (validation + AJAX)

### Handlebars & pages data
- `partials/**` — Handlebars partials included in pages
- `pages-data/globalContext.js` — context merged into every page
- `pages-data/*.js` — per-page context (title, section data); key = `"/filename.html"`
- `pages.config.js` — auto-collects all data files and builds `pagesList` for `/pages.html`
- Page context is merged as `{ ...globalContext, ...pagesConfig[pagePath] }`

### SCSS
Layered architecture using `@layer` and `@use`. Load paths include `src/scss/` so partials can be imported without relative paths.
- `tokens/` — design tokens (CSS custom properties on `:root`)
- `base/`, `layout/`, `components/`, `sections/`, `utilities/`, `vendor/`
- Entry: `src/scss/style.scss` via `src/scss/_layers.scss`

### Vite plugins (do not modify without explicit request)
- `cssRelativePublicUrls` — fixes `url(/images/...)` and `url(/fonts/...)` in CSS for nested output paths
- `flattenPagesPlugin` — moves `dist/pages/*.html` → `dist/*.html` after build; rewrites dev server URLs so `pages/*.html` are served at root
- `vite-plugin-svg-icons` — SVG sprite from `src/icons/`; symbol id = `[name]`; use `<use href="#icon-name">` in markup

## Key conventions

- **Scale**: `1rem = 10px`
- **Images**: raster assets must be `webp`; store under `public/images/<section-or-component>/`
- **SVG icons**: stored in `src/icons/`; remove inline `fill` to allow CSS styling
- **Repeating blocks** (lists, sliders): use Handlebars `{{#each}}` with data from `pages-data`, not manual duplication
- **TypeScript**: strict mode; avoid `any`; respect `noUnusedLocals` / `noUnusedParameters`
- **New pages**: add `pages/<name>.html` + corresponding entry in `pages-data/*.js`
- **Do not edit** `dist/` or `node_modules/`
- **Do not remove** `window.innoApi.Validator` or other public APIs without explicit request
- **Adaptive layout**: only add responsive styles when explicitly requested; target mobile breakpoint only
