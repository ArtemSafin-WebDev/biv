# Project Conventions Reference

## Scale

`1rem = 10px`. All CSS measurements use `rem`.
Examples: `font-size: 1.6rem` = 16 px, `padding: 2rem` = 20 px, `margin-top: 8rem` = 80 px.

---

## SCSS Architecture

### Layer order (declared in `src/scss/_layers.scss`)

```
vendor → tokens → reset → base → layout → components → sections → utilities → overrides
```

### Entry point

`src/scss/style.scss` imports via `@use`:
```
layers → tokens → base → layout → components → sections → utilities
```

### Token files (`src/scss/tokens/`)

| File | Custom properties |
|---|---|
| `_colors.scss` | `--text-color: #002435`, `--primary-color: #17a5e4`, `--bg-color: #f9fcff` |
| `_typography.scss` | `--pragmatica: "Pragmatica", sans-serif` |
| `_layout.scss` | `--container-padding: 5rem` (4rem ≤1366px, 2rem ≤1024px/576px), `--container-max-width: 182rem`, `--header-height: 8rem` |

**Always use these custom properties** — never hard-code colours, fonts, or layout values.

### Adding a new SCSS file

**New section** (e.g. `_news.scss`):
1. Create `src/scss/sections/_news.scss` with `@layer sections { … }`
2. Add `@use "news";` in `src/scss/sections/_index.scss`

**New component** (e.g. `_tag.scss`):
1. Create `src/scss/components/_tag.scss` with `@layer components { … }`
2. Add `@use "tag";` in the correct sub-index or `src/scss/components/_index.scss`

### Existing component subdirectories

`src/scss/components/`: `btns/`, `cards/`, `headings/`

### SVG icons

- Icons live in `src/icons/` (SVG files)
- Remove inline `fill` from SVG source so CSS can control colour
- Use in markup: `<svg><use href="#icon-<name>"></use></svg>`
- `virtual:svg-icons-register` is imported in `src/js/main.ts` — no extra setup needed

---

## Handlebars Partials & Data

### Partial locations

```
partials/
  sections/     ← page sections (intro.html, about.html, services.html …)
  components/   ← reusable UI pieces
  layout/       ← header.html, footer.html, meta.html
  arrows/       ← arrow SVGs
```

Include in page: `{{> sections/services}}`

### Data flow

- `pages-data/globalContext.js` — merged into every page
- `pages-data/home.js` — per-page data; keys are `"/filename.html"`
- Context available in partials via `{{propName}}` and `{{#each items}}…{{/each}}`

### Pattern for repeating elements

Define the list in `pages-data/home.js`:
```js
"/index.html": {
  cards: [
    { title: "...", image: "/images/section/1.webp" },
  ]
}
```

Then in the Handlebars partial:
```html
{{#each cards}}
<div class="card">
  <img src="{{image}}" alt="">
  <h3>{{title}}</h3>
</div>
{{/each}}
```

---

## Images

- Format: **WebP** only (no jpg/png in production markup)
- Location: `public/images/<section-name>/` (e.g. `public/images/services/1.webp`)
- Reference in markup as `/images/services/1.webp` (public root)

---

## TypeScript — Component Pattern

### Base class (`src/js/classes/Component.ts`)

All interactive UI components must extend `Component`:

```ts
import Component from '../classes/Component';

class MyWidget extends Component {
  constructor(element: HTMLElement) {
    super(element); // registers instance in WeakMap
    this.init();
  }

  private init() { /* setup */ }

  destroy() {
    // cleanup listeners, third-party instances …
    this.unregister(); // required — removes from WeakMap
  }
}

export default MyWidget;
```

`Component.getInstanceFor<MyWidget>(el)` retrieves an existing instance.

### Wiring a new section initialiser

1. Create `src/js/sections/<name>.ts` that queries elements and instantiates components
2. Import and call it inside `src/js/sections/index.ts`:

```ts
import mySection from './mySection';

export default function sections() {
  platform();
  mySection(); // ← add here
}
```

---

## Third-party Libraries

### Swiper (sliders)

```ts
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

new Swiper('.my-slider', {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  // …
});
```

### GSAP (animations)

```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.to('.el', { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: '.el' } });
```

### Form validation

Use `FormValidator` from `src/js/classes/facades/FormValidator.ts`. Do not use validator.js directly in section code.

---

## Build Verification

After implementing a design, run:

```bash
npm run build
```

Fix any TypeScript errors (`noUnusedLocals`, `noUnusedParameters` are enforced) and SCSS compilation errors before considering the task complete.

---

## Responsive / Adaptive

Add responsive styles **only when explicitly requested**. The primary mobile breakpoint is **576px**; tablet breakpoints used in the project are **1024px** and **1366px**.

Media query convention used in this project:
```scss
@media (width <= 576px) { … }
@media (width <= 1024px) { … }
@media (width <= 1366px) { … }
```
