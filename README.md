# Rowline: landing page

Developed by **Orest Labiak**.

**Live demo:** _link coming soon_ <!-- replace with the Vercel or Netlify URL -->

<!-- Screenshots: save them to the docs/ folder with these names, then delete this comment's first and last lines.
![Desktop view](docs/screenshot-desktop.png)
![Mobile view](docs/screenshot-mobile.png)
-->

Marketing site for **Rowline**, a fictional task-management app for teams of 5 to 50.
Built as a portfolio project to show a production-style React setup: reusable components,
accessible markup, theming, animation and form handling on a single responsive page.

> Rowline, its customers and its testimonials are invented. Portraits are free photos from
> [Unsplash](https://unsplash.com).

## Stack

| Area | Tool |
| --- | --- |
| Build | [Vite](https://vite.dev) |
| UI | React 19 (JavaScript, function components and hooks) |
| Routing | React Router (home page + 404 page) |
| Styling | SCSS modules, CSS custom properties for theming |
| Forms | React Hook Form |
| Animation | Motion (`motion/react`) with `LazyMotion` |
| Fonts | Bricolage Grotesque and Instrument Sans, self-hosted via Fontsource |

## Getting started

Requires Node.js 20.19 or newer.

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

For a Lighthouse run, use the production build (`npm run build && npm run preview`), not the dev server.

### Previewing loading, empty and error states

The page has no backend: pricing, testimonials and FAQ load through a simulated API in
`src/data/api.js`. Add a query parameter to see each state:

| URL | What you see |
| --- | --- |
| `/?demo=slow` | 3-second responses, so the loading skeletons stay visible |
| `/?demo=empty` | Empty lists and their empty-state messages |
| `/?demo=error` | The first request fails; **Try again** then succeeds. The contact form fails on the first submit too. |

To connect a real API, replace the function bodies in `api.js` with `fetch` calls. Components
only depend on the returned promises.

## Features

**Sections**

- Sticky header with anchor navigation that highlights the section in view
- Hero with headline, two calls to action and an animated board mockup built in HTML/CSS
- Row of client logos
- Three feature blocks with product illustrations
- "How it works" in three steps
- Pricing with a monthly/yearly toggle
- Testimonials
- FAQ accordion
- Contact form
- Footer, plus a 404 page for unknown routes

**Behaviour**

- Light and dark theme: follows the system setting until the visitor chooses, then saves the choice
  in `localStorage`. An inline script in `index.html` applies it before first paint, so there is no flash.
- Mobile burger menu with a focus trap, Escape to close, page scroll lock, and `inert` on the page behind it
- Scroll-reveal animations with Motion, switched off entirely when the visitor prefers reduced motion
- Contact form with React Hook Form: validation on blur, field-level error messages, a character counter,
  a submitting state, a submit-error message that keeps the answers, and a success state that receives focus
- Loading skeletons, empty states and error states with retry wherever data is loaded

**Accessibility**

- Semantic landmarks (`header`, `nav`, `main`, `footer`) and one `h1` per page with an ordered heading structure
- Skip link to the main content
- Visible focus ring on every interactive element, in both themes
- Labels tied to every form control; errors linked with `aria-describedby` and announced
- Accordion and billing toggle built on native buttons and radio inputs
- Live regions announce loading, errors and price changes
- Text contrast meets WCAG AA in both themes
- Touch targets of at least 44 × 44 px

**Responsive**

Mobile-first SCSS with breakpoints at 480, 768, 1024 and 1280 px. Checked at 360, 768 and 1280 px and wider.

**Performance**

- Fonts self-hosted, so there are no third-party font requests
- Only Motion's `domAnimation` feature set is loaded (`LazyMotion` + `m` components)
- Product mockup and illustrations are HTML/CSS, so the hero has no image to download
- Portraits are lazy-loaded, sized at 64 and 128 px with `srcset`, and fall back to initials if they fail

## Project structure

```
src/
├─ main.jsx               Entry: router, Motion config, fonts, global styles
├─ App.jsx                Routes
├─ styles/                Design tokens, mixins, global styles
├─ data/                  Page content and the simulated API
├─ hooks/                 useTheme, useAsyncData, useScrollSpy, useLockBodyScroll,
│                         useMediaQuery, useDocumentTitle
├─ utils/                 Small helpers
├─ pages/                 HomePage, NotFoundPage
└─ components/
   ├─ ui/                 Button, Container, Section, SectionHeading, Reveal, Skeleton,
   │                      StatusMessage, Icon, Logo, SkipLink, ThemeToggle,
   │                      BillingToggle, Accordion, FormField
   ├─ layout/             Layout, Header, NavLinks, MobileMenu, Footer
   └─ sections/           Hero, LogoCloud, Features, HowItWorks, Pricing,
                          Testimonials, Faq, Contact
```

Each component lives in its own folder next to its `.module.scss` file. All colours come from
CSS custom properties in `styles/_tokens.scss`, so the dark theme is a single override block.

## Deployment

`npm run build` outputs a static site to `dist/`. Because routing happens in the browser, configure
the host to serve `index.html` for unknown paths (for example, a `_redirects` file on Netlify or a
rewrite rule on Vercel) so the 404 page renders inside the app.

## Code quality

```bash
npm run lint          # check the code with ESLint
npm run lint:fix      # fix what ESLint can fix automatically
npm run format        # format every file with Prettier
npm run format:check  # check formatting without changing files
```

ESLint uses the recommended JavaScript rules plus the React Hooks rules (`eslint.config.js`).
Prettier settings are in `.prettierrc.json`.
