# Portfolio — Sipho Makubalo

A single entry point to ten shipped projects: what each one is, why it exists, and links to the live
demo and the source.

**Live site:** https://sklevel8-portfolio.netlify.app
**Stack:** semantic HTML · CSS custom properties · vanilla JavaScript · no build step

---

## Why this exists

A portfolio has one job: let someone decide, in under a minute, whether the work is worth their
time. That is hard to do with a list of links. It is also hard to do with prose — "passionate about
building scalable solutions" tells a reader nothing they can verify.

So this site is built around the artefacts themselves. Every project appears as a card with a
one-sentence statement of the problem it solves, the stack it actually uses, and two links: the live
demo and the repository. Nothing is listed that cannot be clicked, and no technology is claimed that
the repository does not contain.

The second reason is durability. A portfolio is the thing most likely to be abandoned and then break.
This one is deliberately static — no bundler, no framework, no dependency that will be deprecated —
so it will still render in five years without a maintenance pass.

## How it works

```
index.html      structure: hero, work grid, about, stack, footer
app.css         shared design system (tokens, layout, components)
theme.css       accent palette and page-specific components
app.js          project catalogue, filtering, search, nav highlighting
```

**Project catalogue.** Projects are data, not markup. `app.js` holds a `PROJECTS` array — name,
repository slug, icon, accent colour, discipline, description, tags, live URL and repo URL — and
renders the grid from it. Adding a project is one object, not a block of HTML.

**Filtering and search.** Discipline tabs (`All`, `Web`, `Data`, `Infra`) and a free-text search run
over a single normalised haystack per project (name, slug, description, tags), so typing "postgres"
finds the right cards without a server round trip. The empty state is explicit rather than a blank
grid.

**Nav highlighting.** An `IntersectionObserver` marks the section currently in view, which keeps the
header honest while scrolling without a scroll listener recalculating offsets on every frame.

**Design tokens.** Colour, spacing, radius and typography come from CSS custom properties defined
once in `app.css`; `theme.css` overrides only the accent ramp. Every project in the set shares this
foundation, so the demos and the hub read as one body of work.

Accessibility is structural, not an afterthought: landmarks, a skip link, visible focus, keyboard
operable tabs, `aria-selected` on the filter controls, and reduced-motion support.

## Features

- Ten project cards generated from a single data array
- Discipline filtering plus instant client-side search
- Live and source links on every card, verified against the deployed URLs
- Stack grid describing what the projects actually use
- Featured project panel for the most interesting system
- Scroll-synced navigation with `IntersectionObserver`
- Zero dependencies, zero build step, zero runtime configuration

## Run it locally

Any static server works:

```bash
python -m http.server 8080      # http://localhost:8080
```

Opening `index.html` directly from disk also works — there are no module imports or fetches.

## Project layout

```
index.html      markup and content
app.css         shared design system
theme.css       accent palette and page components
app.js          project data, rendering, filtering, search, nav observer
favicon.svg
netlify.toml    publish config and security headers
```

## Deployment

`netlify.toml` publishes the repository root with security headers, `no-cache` on `index.html`, and
short-lived caching for CSS and JavaScript.

## Licence

MIT
