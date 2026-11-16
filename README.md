# Teig Media — Stephan Teig portfolio

A responsive Norwegian/English portfolio for Stephan Teig, built with React and Vite and published to GitHub Pages at `teigmedia.com`.

## Pages and links

- `#home` — introduction, selected work, STAF Films, studio tools, and a Jellyfin shortcut.
- `#resume` — experience, roles, education, skills, languages, and the downloadable PDF CV.
- `#works` — all 13 projects with category filters and film previews.
- `#contact` — contact details and the existing Formspree contact form.
- `/staf/` — the STAF Films site, copied from the portfolio repository without editing its files.
- `/shotlist-planner/client/` and `/studio-tools/` — existing static apps, copied as-is.

## Local development

```bash
npm install
npm run dev
```

Edit the page layout in `src/main.jsx`, visual styles in `src/styles.css`, and portfolio content in `src/content.json`. Keep the contents of `public/staf/` unchanged when updating the main Teig Media site.

## Build and publish

```bash
npm run build
```

The GitHub Actions workflow builds the site and deploys the `dist/` folder to GitHub Pages when changes are pushed to `main`. Static pages, assets, `CNAME`, and `.nojekyll` are served from the build output.
