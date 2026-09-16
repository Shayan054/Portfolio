# Shayan Baloch Portfolio

A simple, standalone React + Vite portfolio site. No backend, no database — all content lives in `src/portfolio-data.ts`.

## Run it

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Edit your content

Everything on the page (name, bio, projects, skills, experience, links) comes from `src/portfolio-data.ts`. Change the values there and the site updates automatically.

## Build for deployment

```bash
npm run build
```

This outputs a static site to `dist/`. Deploy it for free on:
- **Vercel**: `npx vercel` (auto-detects Vite)
- **Netlify**: drag the `dist/` folder onto netlify.com/drop
- **GitHub Pages**: push `dist/` to a `gh-pages` branch
