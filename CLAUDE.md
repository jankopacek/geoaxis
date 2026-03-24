# Geoaxis – CLAUDE.md

## Project Overview

Static website for Czech geodetic/surveying company **Geoaxis** (www.geoaxis.cz).

---

## Tech Stack

- **Generator:** [Zola](https://www.getzola.org/) (Rust-based static site generator)
- **CSS framework:** [Bootstrap 5](https://getbootstrap.com/) (local, installed via npm)
- **Languages:** Czech (primary), English (translation) — Zola i18n
- **Deployment:** static files, domain `www.geoaxis.cz`
- **Demo:** GitHub Pages — https://jankopacek.github.io/geoaxis/

---

## Project Structure

```
.github/
└── workflows/
    └── deploy.yml       # GitHub Pages deployment
geoaxis/
├── zola.toml            # Zola config (base_url, languages, translations)
├── content/
│   ├── _index.md        # Home page (CS)
│   └── sluzby/
│       ├── _index.md    # Services section (hidden from nav)
│       ├── geometricke-plany.md
│       ├── inzenyrska-geodezie.md
│       ├── letecke-snimkovani.md
│       ├── mapove-podklady.md
│       └── pasport-stavby.md
├── templates/
│   ├── base.html        # Base layout (navbar, footer, Bootstrap 5)
│   ├── index.html       # Home page template
│   ├── section.html     # Generic section template
│   └── page.html        # Generic page template
├── static/
│   ├── img/             # Images (optimized WebP + fallback)
│   ├── css/
│   │   ├── bootstrap.min.css  # Bootstrap 5 (from npm)
│   │   └── custom.css   # Custom CSS on top of Bootstrap 5
│   └── js/
│       └── bootstrap.bundle.min.js  # Bootstrap 5 JS (from npm)
├── sass/                # Optional: SCSS compiled by Zola
├── stare/               # Archive — ignored by git
└── .gitignore
```

---

## Development Rules

### General

- Code must be **valid HTML5** and **valid CSS3**.
- **Zero browser console errors** — no 404s, JS errors, or CSP warnings.
- Compatible with all major browsers: Chrome, Firefox, Safari, Edge (last 2 versions).
- Use semantic HTML tags: `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`.
- All images must have meaningful `alt` attributes.
- `<html lang="cs">` for Czech pages, `<html lang="en">` for English pages.
- Every page must have `charset`, `viewport`, and `description` meta tags.

### Bootstrap 5

- **Mobile-first:** design for mobile breakpoints first, then scale up.
- Use Bootstrap 5 grid: `.container`, `.row`, `.col-*`.
- No jQuery — Bootstrap 5 does not require it.
- Custom CSS goes only in `static/css/custom.css`, never inline.
- Avoid `!important` — use more specific selectors instead.

### Zola Templating

- Layout (navbar, footer) lives exclusively in `templates/base.html`. Pages inherit it via `{% extends "base.html" %}`.
- Content (text, structured data) belongs in Markdown files under `content/`.
- Visual design (colors, fonts, spacing) is **decoupled** from HTML structure — changes happen only in CSS/SCSS.
- Navigation menu is generated dynamically from Zola sections and pages — never hardcode link lists in templates.
- Active menu item is marked using the Zola `current_path` variable.
- Every page front matter must include: `title`, `description`, `date`.

### Multilingual

- Primary language: `cs` (default, no URL prefix)
- Secondary language: `en` (URL prefix `/en/`)
- Zola i18n via `[languages.<lang>.translations]` in `zola.toml` and `trans()` macro in templates.
- **Note:** Zola 0.22 does NOT read translations from `i18n/*.toml` files — they must be in `zola.toml`.

### Images

- Preferred format: **WebP** with `<picture>` fallback to JPEG/PNG for older browsers.
- Always specify `width` and `height` attributes to prevent layout shift (CLS).
- Compress large images — target under 200 KB.
- Use lazy loading: `loading="lazy"` on below-the-fold images.

### Performance

- Bootstrap 5 and custom CSS loaded in `<head>`.
- JS scripts loaded before `</body>` or with `defer`.
- No blocking third-party scripts without `async`/`defer`.
- Google Maps iframe on contact page: use `loading="lazy"`.

---

## Gitignore

The `stare/` folder is a historical archive of the old site and must not be committed.
`.gitignore` must include:

```
stare/
public/
```

---

## Commands

```bash
# All Zola commands run from the geoaxis/ subdirectory
cd geoaxis

# Start dev server
zola serve

# Production build
zola build

# Check / lint
zola check
```

---

## Notes

- No inline styles (`style="..."`) — everything goes in CSS files.
- No deprecated HTML attributes (e.g. `frameborder`, unquoted `allowfullscreen`).
- Wrap YouTube and Google Maps embeds in Bootstrap's responsive helper (`.ratio.ratio-16x9`).
- Footer includes copyright `© geoaxis.cz` and site author credit.
- Print stylesheet: hide navigation, show email as plain text (preserve behaviour from old site).
