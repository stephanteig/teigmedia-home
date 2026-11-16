# Teig Media homepage starter

A simple, editable homepage built with React and Vite.

## Get started

1. Install Node.js if it is not already installed.
2. In this folder, run `npm install`.
3. Run `npm run dev` and open the local address Vite prints.
4. Edit the words, links, and project cards near the top of `src/main.jsx`.
5. Change visual styles in `src/styles.css`.

## Before launch

- Replace the sample project titles and Unsplash photos in `src/main.jsx`.
- Update the email and social links in the footer.
- Set your preferred page title and description in `index.html`.
- Run `npm run build` to create the production site in `dist/`.

The starter uses Vite for local development and builds, React for the page structure, and plain CSS for styling.

## GitHub Pages deployment

The GitHub Actions workflow builds the site and deploys `dist/` to GitHub Pages when changes are pushed to `main`. The custom domain is set to `teigmedia.com` in `public/CNAME`. In the repository's Settings → Pages, set the source to **GitHub Actions**. In Cloudflare DNS, create `A` records for `@` to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`, plus a `CNAME` record for `www` to `stephanteig.github.io`. Set these records to **DNS only** while GitHub verifies the domain and issues its certificate. Enable **Enforce HTTPS** in Settings → Pages once available.
