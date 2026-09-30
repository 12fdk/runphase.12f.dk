# CLAUDE.md — runphase.12f.dk

Landing page for the Runphase iOS app. The app repo is `12fdk/runphase` (local `~/Git/runphase`); read its `CLAUDE.md` (product and privacy rules) and `DESIGN.md` (brand) before writing copy or styling. Tasks are tracked as GitHub issues in the **app** repo (landing page: 12fdk/runphase#140).

## Rules

- **Copy:** Runphase is a running coach for women across life stages, with strength and warm-ups built in. Never call it an "AI coach" or say it uses AI. Never phrase anything as medical advice.
- **Languages:** English (`/`) and Danish (`/da/`). Every page and string exists in both. Strings live only in `src/i18n/ui.ts`; don't hard-code text in components.
- **Brand:** tokens in `src/styles/global.css` mirror the app's "Graphite and clay" palette. Clay orange (`--accent`) marks one thing per page; text on it is `--on-accent`, never white. No gradients, purple, glow or a second accent hue.
- **Privacy:** no analytics or third-party scripts that could receive health data. If analytics is added, it is cookieless page views only.
- **Hosting:** GitHub Pages via Actions, custom domain in `public/CNAME`. IndexNow key file and workflow must stay in place.
- Run `pnpm check && pnpm build` before pushing. Work on a feature branch and open a PR; `main` deploys.
