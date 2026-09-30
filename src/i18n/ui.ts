// All user-facing strings, per language. Keep keys identical across locales;
// `t()` falls back to English when a Danish string is missing.
//
// Copy rules (from the app repo's CLAUDE.md): Runphase is a running coach with
// strength and warm-ups built in, adapted to life stage. Never call it an
// "AI coach", and never phrase anything as medical advice.

export const languages = {
  en: "English",
  da: "Dansk",
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = "en";

export const ui = {
  en: {
    "site.title": "Runphase — running coach for every life stage",
    "site.description":
      "Runphase is a running coach for women, with strength training and warm-ups built in. Your plan adapts to your life stage, on iPhone and Apple Watch.",
    "nav.home": "Home",
    "nav.language": "Language",
    "hero.eyebrow": "Coming soon for iPhone and Apple Watch",
    "hero.title": "Train properly, in every life stage.",
    "hero.lede":
      "A running coach for women, with strength training and warm-ups built into the plan. It adapts to your cycle, perimenopause or postmenopause, and always tells you why.",
    "hero.cta": "Coming soon to the App Store",
    "footer.publisher": "Runphase is made by 12f ApS, Denmark.",
    "404.title": "Page not found",
    "404.body": "That page doesn't exist. It may have moved.",
    "404.back": "Go to the front page",
  },
  da: {
    "site.title": "Runphase — løbecoach til alle livsfaser",
    "site.description":
      "Runphase er en løbecoach til kvinder, med styrketræning og opvarmning bygget ind. Din plan tilpasser sig din livsfase, på iPhone og Apple Watch.",
    "nav.home": "Forside",
    "nav.language": "Sprog",
    "hero.eyebrow": "Kommer snart til iPhone og Apple Watch",
    "hero.title": "Træn ordentligt, i alle livsfaser.",
    "hero.lede":
      "En løbecoach til kvinder, med styrketræning og opvarmning bygget ind i planen. Den tilpasser sig din cyklus, perimenopause eller postmenopause, og fortæller altid hvorfor.",
    "hero.cta": "Kommer snart i App Store",
    "footer.publisher": "Runphase er lavet af 12f ApS, Danmark.",
    "404.title": "Siden blev ikke fundet",
    "404.body": "Siden findes ikke. Den kan være flyttet.",
    "404.back": "Gå til forsiden",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)["en"];

export function useTranslations(locale: Locale) {
  return (key: UIKey): string =>
    (ui[locale] as Record<string, string>)[key] ?? ui[defaultLocale][key];
}

/** The locale of a URL, from its first path segment. */
export function getLocale(url: URL): Locale {
  const [, first] = url.pathname.split("/");
  return first && first in languages ? (first as Locale) : defaultLocale;
}

/** The path of a URL with its locale prefix removed ("/da/support/" → "/support/"). */
export function stripLocale(url: URL): string {
  const locale = getLocale(url);
  if (locale === defaultLocale) return url.pathname;
  return url.pathname.slice(locale.length + 1) || "/";
}

/** The same page in another locale. */
export function localizedPath(path: string, locale: Locale): string {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}
