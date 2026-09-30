import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://runphase.12f.dk",
  base: "/",
  // English lives at the root (/), every other language under its own prefix
  // (/da/). Add a locale here and in src/i18n/ui.ts together.
  i18n: {
    locales: ["en", "da"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      // Emits hreflang alternates between /page/ and /da/page/.
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", da: "da" },
      },
      filter: (page) => !page.includes("/404"),
    }),
  ],
});
