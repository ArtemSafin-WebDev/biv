---
name: figma-to-code
description: This skill should be used when the user shares a Figma URL, asks to "implement a design from Figma", "convert Figma to code", "build this from Figma", "implement this section from Figma", or provides a figma.com link and wants it coded. Guides faithful translation of Figma designs into the project's Vite + TypeScript + SCSS + Handlebars stack.
version: 0.1.0
---

# Figma to Code — Project Implementation Skill

This skill guides faithful implementation of Figma designs into the project stack:
**Vite 7 + TypeScript (strict) + SCSS (`@layer`) + Handlebars** with GSAP, Swiper, and SVG sprites.

## Step 1: Extract Design Context from Figma

Parse the Figma URL to extract `fileKey` and `nodeId`:
- `figma.com/design/:fileKey/:name?node-id=A-B` → nodeId = `A:B` (replace `-` with `:`)

Call `get_design_context` with the `fileKey` and `nodeId`. This returns:
- Reference React/Tailwind code (adapt to project stack — do NOT use as-is)
- A screenshot for visual reference
- Asset download URLs

Also call `get_screenshot` when pixel-perfect visual verification is needed.

Read `references/project-conventions.md` for full details on stack conventions before writing any code.

## Step 2: Analyse the Design

Before writing code:
1. Identify all **repeating elements** (list items, cards, slides) → use `{{#each}}` in Handlebars with data in `pages-data/`
2. Identify **interactive behaviour** (sliders, accordions, modals, forms) → plan TypeScript component
3. List all **icons** → check `src/icons/`; add missing SVGs there
4. List all **images** → convert to WebP, place in `public/images/<section>/`
5. Map **colours/spacing/fonts** to existing tokens in `src/scss/tokens/`

## Step 3: Implement Markup (Handlebars)

- Add or edit a partial in `partials/` for the section/component
- For repeating blocks use `{{#each items}}` with context data from `pages-data/`
- Use `<use href="#icon-name">` for every SVG icon
- Include the partial in the target `pages/*.html`

## Step 4: Write Styles (SCSS)

- Create or edit the appropriate SCSS file inside the correct layer:
  - New reusable component → `src/scss/components/_<name>.scss`
  - Page section → `src/scss/sections/_<name>.scss`
- Register the file via `@use` in the matching layer partial (e.g. `_components.scss`)
- Use CSS custom properties from `src/scss/tokens/` — never hard-code colours or spacing
- Scale: **1rem = 10px** (`font-size: 1.6rem` = 16 px)
- Remove inline `fill` from SVGs; control colour via CSS

## Step 5: Add Behaviour (TypeScript)

- If the section needs interactive JS, create a class in `src/js/sections/` or `src/js/classes/components/`
- All UI components must extend `Component` from `src/js/classes/Component.ts` and implement `destroy()` calling `this.unregister()`
- Call the initialiser from `sections()` in `src/js/main.ts`
- For sliders use Swiper; for animations use GSAP; for form validation use `FormValidator`

## Step 6: Verify Build

Run `npm run build` after implementation to confirm TypeScript and SCSS compile without errors.

## Additional Resources

- **`references/project-conventions.md`** — full SCSS layer map, token names, Component API, Handlebars data flow, and Swiper/GSAP usage patterns
