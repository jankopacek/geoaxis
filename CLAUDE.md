# Geoaxis – CLAUDE.md

## Project Overview

Static website for Czech geodetic/surveying company **Geoaxis, s.r.o.** (www.geoaxis.cz).

---

## Tech Stack

- **Generator:** [Zola](https://www.getzola.org/) (Rust-based static site generator)
- **CSS framework:** [Bootstrap 5](https://getbootstrap.com/) (via CDN or npm)
- **Languages:** Czech (primary), English (translation) — Zola i18n
- **Deployment:** static files, domain `www.geoaxis.cz`

---

## Project Structure

```
geoaxis/
├── config.toml          # Zola config (base_url, languages, taxonomies)
├── content/
│   ├── _index.md        # Home page (CS)
│   ├── sluzby/          # Services section
│   │   ├── _index.md
│   │   ├── geom-plany.md
│   │   ├── inzenyrstvi.md
│   │   ├── mapove-podklady.md
│   │   ├── pasport.md
│   │   └── dron.md
│   └── kontakt.md
├── templates/
│   ├── base.html        # Base layout (navbar, footer, Bootstrap 5 CDN)
│   └── index.html       # Home page template
├── static/
│   ├── img/             # Images (optimized WebP + fallback)
│   ├── css/
│   │   └── custom.css   # Custom CSS on top of Bootstrap 5
│   └── js/
│       └── custom.js    # Custom JS (if needed)
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
- Zola i18n via `[languages]` in `config.toml` and `trans()` macro in templates.
- UI translations (navbar, footer) in `i18n/cs.toml` and `i18n/en.toml`.

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
