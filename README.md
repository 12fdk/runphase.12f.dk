# runphase.12f.dk

Landing page for [Runphase](https://github.com/12fdk/runphase), a running coach for women across life stages, with strength training and warm-ups built in. Built with [Astro](https://astro.build) and hosted on GitHub Pages at <https://runphase.12f.dk>.

## Development

```sh
pnpm install
pnpm dev       # http://localhost:4321
pnpm check     # type-check
pnpm build     # static site in dist/
pnpm preview   # serve dist/
```

## Structure

| Path | What it is |
|---|---|
| `src/i18n/ui.ts` | Every user-facing string, per language, plus locale helpers |
| `src/layouts/Layout.astro` | Page shell: meta, canonical, hreflang, Open Graph, header, footer |
| `src/components/` | Page sections (`Home.astro` is shared by all locales) |
| `src/pages/` | English routes at `/`, Danish under `src/pages/da/` → `/da/` |
| `src/styles/global.css` | Brand tokens ("Graphite and clay", from the app's `DESIGN.md`) |
| `public/` | Static files: favicon, `CNAME`, `robots.txt`, IndexNow key |

To add a page, create it in `src/pages/` and `src/pages/da/`, and add its strings to both locales in `ui.ts`. The sitemap (`/sitemap-index.xml`) and hreflang links are generated automatically.

## Deploy

Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/deploy.yml`). Pull requests run a type-check and build (`ci.yml`). After each successful deploy, `indexnow.yml` submits new URLs to IndexNow (Bing, Yandex, Seznam, Naver, Yep). The key file is `public/b0b687723d7b1c12e407c2dfb52947d1.txt`.
