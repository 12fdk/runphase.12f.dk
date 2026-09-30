// All user-facing strings, per language. Keep keys identical across locales;
// `t()` falls back to English when a Danish string is missing.
//
// Copy rules: Runphase is a running coach for everyone, with strength and
// warm-ups built in. Cycle and menopause support is an optional input, not the
// audience. Never call it an "AI coach", and never phrase anything as medical
// advice.

export const languages = {
  en: "English",
  da: "Dansk",
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = "en";

export const ui = {
  en: {
    "site.title": "Runphase — a running coach with strength and warm-ups built in",
    "site.description":
      "Runphase is a running coach with strength training and warm-ups built into the plan. It adapts to what you log and, if you choose, to your cycle or menopause. On iPhone and Apple Watch.",
    "nav.home": "Home",
    "nav.language": "Language",
    "hero.eyebrow": "Coming soon for iPhone and Apple Watch",
    "hero.title": "A running plan that adapts to you.",
    "hero.lede":
      "A running coach with strength training and warm-ups built into the plan. It adjusts to what you log and, if you choose, to your cycle or menopause, and always tells you why.",
    "hero.cta": "Coming soon to the App Store",
    "footer.publisher": "Runphase is made by 12f ApS, Denmark.",
    "footer.links": "Help and legal",
    "footer.privacy": "Privacy policy",
    "footer.support": "Support",
    "doc.updated": "Last updated:",
    "404.title": "Page not found",
    "404.body": "That page doesn't exist. It may have moved.",
    "404.back": "Go to the front page",
  },
  da: {
    "site.title": "Runphase — løbecoach med styrke og opvarmning bygget ind",
    "site.description":
      "Runphase er en løbecoach med styrketræning og opvarmning bygget ind i planen. Den tilpasser sig det, du logger, og hvis du vil, din cyklus eller overgangsalder. På iPhone og Apple Watch.",
    "nav.home": "Forside",
    "nav.language": "Sprog",
    "hero.eyebrow": "Kommer snart til iPhone og Apple Watch",
    "hero.title": "En løbeplan, der tilpasser sig dig.",
    "hero.lede":
      "En løbecoach med styrketræning og opvarmning bygget ind i planen. Den justerer sig efter det, du logger, og hvis du vil, efter din cyklus eller overgangsalder, og fortæller altid hvorfor.",
    "hero.cta": "Kommer snart i App Store",
    "footer.publisher": "Runphase er lavet af 12f ApS, Danmark.",
    "footer.links": "Hjælp og jura",
    "footer.privacy": "Privatlivspolitik",
    "footer.support": "Support",
    "doc.updated": "Senest opdateret:",
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

// Long-form pages (privacy policy, support), per language. Same rules as `ui`:
// keep the two locales in step, section for section.
//
// Each block is a paragraph (string) or a bullet list (string[]). Blocks are
// rendered as HTML, so they may contain <a> and <strong>; they are our own
// copy, never user input. "[TODO: …]" marks a fact that still needs Robert's
// input before launch; it is shown on the page on purpose so it can't be
// missed.
//
// Privacy facts come only from the app repo: CLAUDE.md ("Data and privacy",
// "Business model", "Apple Watch") and docs/architecture.md §8, §9, §13, §15.
// Update this text when those change.

export type DocBlock = string | readonly string[];

export interface DocSection {
  heading: string;
  /** Anchor for links to this section; defaults to none. */
  id?: string;
  blocks: readonly DocBlock[];
}

export interface Doc {
  title: string;
  description: string;
  lede: string;
  updated: string;
  sections: readonly DocSection[];
}

const supportEmail = "support@12f.dk";
const mail = `<a href="mailto:${supportEmail}">${supportEmail}</a>`;

export const docs = {
  en: {
    privacy: {
      title: "Privacy policy",
      description:
        "How Runphase handles your data: training and health data stay on your devices and in your own iCloud, and are never sent to us or anyone else.",
      lede: "Your training and health data stay on your iPhone, your Apple Watch and your own iCloud. We, the company behind Runphase, never receive them. This page explains what that means, in plain language.",
      updated: "[TODO: effective date]",
      sections: [
        {
          heading: "Who we are",
          blocks: [
            "Runphase is made by 12f ApS, a company in Denmark. 12f ApS is responsible for this policy and for the small amount of usage data described under “What we collect”.",
            [
              "CVR number: [TODO: CVR number]",
              "Address: [TODO: postal address]",
              `Email: ${mail}`,
            ],
          ],
        },
        {
          heading: "No account",
          blocks: [
            "Runphase has no sign-up and no login. We never ask for your name, email address or phone number.",
          ],
        },
        {
          heading: "What the app stores, and where",
          blocks: [
            "Everything you enter or record in Runphase is stored in the app on your iPhone. If you're signed in to iCloud, it is also synced through your own private iCloud (Apple's CloudKit), so it follows you to a new iPhone. This includes:",
            [
              "your settings and profile: training days, level, goal, race date, strength equipment, reminder time, and your life stage if you choose one",
              "your answers to the setup questions",
              "your plan, its schedule, and the plan changes you accepted or declined",
              "your session logs",
              "your check-ins, such as sleep, energy and symptoms",
            ],
            "Your private iCloud data belongs to your Apple account. 12f has no access to it. Health-related fields, such as your life stage, check-ins and answers, are also encrypted in iCloud.",
            "Runphase works fully without iCloud. Your data then stays on your iPhone only.",
            "<strong>Apple Watch.</strong> Your plan is copied from your iPhone directly to your watch, and the results of a session go straight back to your iPhone. Nothing passes through a server run by us or anyone else.",
            "<strong>Plan content.</strong> Plans, sessions, exercises and texts are downloaded from our content server. These downloads contain no information about you or your training. The app also ships with a copy of the content, so it works without a connection.",
          ],
        },
        {
          heading: "Health data (special category)",
          blocks: [
            "Information about your menstrual cycle, perimenopause or menopause, your symptoms and your sleep is health data. Under the GDPR it is a “special category” of personal data that needs extra protection.",
            "Cycle and menopause support is optional. You choose at setup whether Runphase should take it into account, and “Don't track” is always an option.",
            "<strong>This data is stored only on your devices and in your own iCloud. It is never sent to 12f, to our content server, to our analytics provider or to any other third party.</strong>",
            "<strong>Apple Health.</strong> If you allow it, Runphase reads these types from Apple Health, so you don't have to enter them twice:",
            [
              "menstrual flow",
              "hot flashes",
              "sleep changes",
              "fatigue",
              "heart rate variability",
              "resting heart rate",
              "workouts",
            ],
            "Runphase only asks for a type when a feature needs it, and works without any of them. You can change access at any time (see <a href=\"#your-rights\">Your rights</a>).",
            "[TODO: whether Runphase also saves the workouts it records to Apple Health is still being decided (app issue #16). Update this paragraph when it is.]",
            "Symptoms you log in Runphase stay in Runphase. They are not written to Apple Health.",
            "Runphase uses this data only to adjust your training, with fixed rules written by the author of your plan. It doesn't use AI. When it suggests a change, it tells you why, for example “today's session is lighter because you logged poor sleep”, and you decide whether to accept it. Runphase gives coaching, not medical advice.",
            "Notifications from Runphase never mention symptoms, your cycle or your life stage.",
          ],
        },
        {
          heading: "What we collect",
          blocks: [
            "To see which parts of the app are used, the iPhone app sends a short, fixed list of usage events to PostHog, our analytics provider:",
            [
              "setup started and completed",
              "a plan started or finished (without naming the plan)",
              "a session started, completed or ended early, with its type (run, strength or warm-up), the device (iPhone or Apple Watch) and whether it came from the plan or the library",
              "a plan change proposed, accepted or declined, with its scope (today, this week, or from now on)",
              "the price screen shown, a plan purchased (without naming the plan), purchases restored",
              "whether you allowed notifications",
              "plan content updated",
            ],
            "These events never contain your life stage, symptoms, check-in answers, cycle data or any other health data. Purchases are recorded without naming the plan, because the plan could reveal your life stage.",
            "Screen recording and automatic tap tracking are switched off, and the events are not tied to your name, email or a profile of you.",
            "[TODO: how long PostHog keeps the events, and where it stores them (EU or US).]",
            "[TODO: whether IP addresses are discarded, and whether analytics can be turned off in the app.]",
          ],
        },
        {
          heading: "Purchases",
          blocks: [
            "Plans are one-time purchases made through the App Store. There are no subscriptions. Apple handles the payment, so we never see your payment details. The app checks what you own with Apple, and we see sales figures in App Store Connect.",
          ],
        },
        {
          heading: "What we never do",
          blocks: [
            [
              "send your health data to ourselves or anyone else",
              "require an account",
              "sell your data or share it with advertisers",
              "use AI to make decisions about your training",
              "give medical advice",
            ],
          ],
        },
        {
          heading: "Your rights",
          id: "your-rights",
          blocks: [
            "Under the GDPR you have the right to access, correct and delete your personal data, to restrict or object to its use, and to get a copy of it. You can also complain to the Danish Data Protection Agency, <a href=\"https://www.datatilsynet.dk\">Datatilsynet</a>.",
            "Because 12f holds none of your training or health data, you control it directly:",
            [
              "<strong>See it:</strong> everything Runphase stores about you is shown in the app.",
              "<strong>Delete it:</strong> delete Runphase from your iPhone and Apple Watch, then remove its data from iCloud in iOS Settings (your name → iCloud → manage storage → Runphase). The <a href=\"/support/\">support page</a> has the steps.",
              "<strong>Stop Apple Health access:</strong> in the Health app, tap your profile picture, then Apps, then Runphase. Data already in Apple Health stays there.",
            ],
            `The usage events aren't linked to your name or email, so we usually can't tell which ones are yours. If you have a question or request, write to ${mail} and we'll help as far as we can.`,
          ],
        },
        {
          heading: "Children",
          blocks: ["[TODO: minimum age and App Store age rating.]"],
        },
        {
          heading: "Changes",
          blocks: [
            "When Runphase changes how it handles data, we update this page and the date at the top.",
          ],
        },
        {
          heading: "Contact",
          blocks: [`Questions about privacy: ${mail}.`],
        },
      ],
    },
    support: {
      title: "Support",
      description:
        "Help with Runphase: contact, restoring purchases, where your data lives and how to delete it, and Apple Health permissions.",
      lede: "Help with Runphase on iPhone and Apple Watch.",
      updated: "[TODO: effective date]",
      sections: [
        {
          heading: "Get help",
          blocks: [
            `Write to ${mail}. It helps to include your iPhone or Apple Watch model and its software version.`,
            "Please don't include health details, such as symptoms or cycle information. We don't need them to help you.",
          ],
        },
        {
          heading: "Restore purchases",
          blocks: [
            "Plans are one-time purchases. There are no subscriptions. The first two weeks of every plan are free.",
            "If a plan you bought shows as locked, for example on a new iPhone, open Runphase and go to <strong>Settings → Restore Purchases</strong>. Use the same Apple Account you bought the plan with.",
            "Every plan supports Family Sharing, so members of your family group can use it too.",
          ],
        },
        {
          heading: "Where your data lives",
          blocks: [
            "Runphase has no account. Your plan, logs and check-ins are stored on your iPhone and, if you're signed in to iCloud, in your own private iCloud. We can't see them, so we can't recover or delete them for you. Your Apple Watch keeps a copy of the coming days' sessions.",
            "To delete your data:",
            [
              "Delete Runphase from your iPhone and Apple Watch.",
              "In iOS Settings, tap your name, then iCloud, then manage storage (the wording varies with the iOS version). Choose Runphase and delete its data.",
            ],
            "Workouts and other data in Apple Health belong to the Health app and are managed there. Symptoms you logged in Runphase are never written to Apple Health. See the <a href=\"/privacy/\">privacy policy</a> for details.",
          ],
        },
        {
          heading: "Apple Health permissions",
          blocks: [
            "Runphase can read things like menstrual flow, sleep changes, heart rate variability and workouts from Apple Health, so you don't have to log them twice. It asks only when a feature needs them.",
            "To change what Runphase can read:",
            [
              "In the Health app, tap your profile picture, then Apps, then Runphase, or",
              "in iOS Settings, go to Privacy & Security → Health → Runphase.",
            ],
            "Runphase works without Apple Health access. Features that need the data simply show that there's nothing to show yet.",
          ],
        },
        {
          heading: "Coaching, not medical advice",
          blocks: [
            "Runphase adjusts your training with fixed rules written by the author of your plan, and tells you why. It gives coaching, not medical advice, and it doesn't diagnose or treat anything. For questions about your health, talk to a health professional.",
          ],
        },
      ],
    },
  },
  da: {
    privacy: {
      title: "Privatlivspolitik",
      description:
        "Sådan håndterer Runphase dine data: trænings- og helbredsdata bliver på dine enheder og i din egen iCloud og sendes aldrig til os eller andre.",
      lede: "Dine trænings- og helbredsdata bliver på din iPhone, dit Apple Watch og i din egen iCloud. Vi, firmaet bag Runphase, modtager dem aldrig. Her kan du læse, hvad det betyder, i et almindeligt sprog.",
      updated: "[TODO: ikrafttrædelsesdato]",
      sections: [
        {
          heading: "Hvem vi er",
          blocks: [
            "Runphase er lavet af 12f ApS, et dansk selskab. 12f ApS er ansvarlig for denne politik og for de få brugsdata, der er beskrevet under “Hvad vi indsamler”.",
            [
              "CVR-nummer: [TODO: CVR-nummer]",
              "Adresse: [TODO: postadresse]",
              `E-mail: ${mail}`,
            ],
          ],
        },
        {
          heading: "Ingen konto",
          blocks: [
            "Runphase har ingen oprettelse og intet login. Vi spørger aldrig om dit navn, din e-mailadresse eller dit telefonnummer.",
          ],
        },
        {
          heading: "Hvad appen gemmer, og hvor",
          blocks: [
            "Alt, hvad du indtaster eller registrerer i Runphase, gemmes i appen på din iPhone. Er du logget ind på iCloud, synkroniseres det også via din egen private iCloud (Apples CloudKit), så det følger med til en ny iPhone. Det gælder:",
            [
              "dine indstillinger og din profil: træningsdage, niveau, mål, løbsdato, udstyr til styrketræning, tidspunkt for påmindelser og din livsfase, hvis du vælger en",
              "dine svar på spørgsmålene ved opstart",
              "din plan, dens skema og de ændringer af planen, du har sagt ja eller nej til",
              "dine træningslog",
              "dine check-ins, fx søvn, energi og symptomer",
            ],
            "Dine private iCloud-data hører til din Apple-konto. 12f har ikke adgang til dem. Helbredsrelaterede felter, fx din livsfase, dine check-ins og dine svar, er desuden krypteret i iCloud.",
            "Runphase virker fuldt ud uden iCloud. Så bliver dine data kun på din iPhone.",
            "<strong>Apple Watch.</strong> Din plan kopieres direkte fra din iPhone til dit ur, og resultaterne af en træning sendes direkte tilbage til din iPhone. Intet går gennem en server, hverken vores eller andres.",
            "<strong>Indholdet i planerne.</strong> Planer, træninger, øvelser og tekster hentes fra vores indholdsserver. De hentninger indeholder ingen oplysninger om dig eller din træning. Appen har også en kopi af indholdet med, så den virker uden forbindelse.",
          ],
        },
        {
          heading: "Helbredsdata (særlig kategori)",
          blocks: [
            "Oplysninger om din menstruationscyklus, perimenopause eller overgangsalder, dine symptomer og din søvn er helbredsdata. Efter GDPR er det en “særlig kategori” af personoplysninger, som kræver ekstra beskyttelse.",
            "Hensyn til cyklus og overgangsalder er frivilligt. Du vælger ved opstart, om Runphase skal tage højde for det, og “Registrér ikke” er altid et valg.",
            "<strong>Disse data gemmes kun på dine enheder og i din egen iCloud. De sendes aldrig til 12f, til vores indholdsserver, til vores analyseudbyder eller til nogen anden tredjepart.</strong>",
            "<strong>Apple Sundhed.</strong> Hvis du giver lov, læser Runphase disse typer fra Apple Sundhed, så du ikke skal indtaste dem to gange:",
            [
              "menstruationsblødning",
              "hedeture",
              "søvnforandringer",
              "træthed",
              "pulsvariabilitet",
              "hvilepuls",
              "træninger",
            ],
            "Runphase spørger kun om en type, når en funktion har brug for den, og virker uden dem alle. Du kan til enhver tid ændre adgangen (se <a href=\"#your-rights\">Dine rettigheder</a>).",
            "[TODO: om Runphase også gemmer de træninger, den registrerer, i Apple Sundhed, er endnu ikke besluttet (app-issue #16). Opdatér afsnittet, når det er.]",
            "Symptomer, du logger i Runphase, bliver i Runphase. De skrives ikke til Apple Sundhed.",
            "Runphase bruger kun disse data til at justere din træning efter faste regler, som forfatteren af din plan har skrevet. Den bruger ikke AI. Når den foreslår en ændring, fortæller den hvorfor, fx “dagens træning er lettere, fordi du har logget dårlig søvn”, og du bestemmer selv, om du vil sige ja. Runphase giver træningsråd, ikke medicinsk rådgivning.",
            "Notifikationer fra Runphase nævner aldrig symptomer, din cyklus eller din livsfase.",
          ],
        },
        {
          heading: "Hvad vi indsamler",
          blocks: [
            "For at se, hvilke dele af appen der bliver brugt, sender iPhone-appen en kort, fast liste af brugshændelser til PostHog, vores analyseudbyder:",
            [
              "opstart påbegyndt og gennemført",
              "en plan startet eller gennemført (uden at planen nævnes)",
              "en træning startet, gennemført eller afbrudt, med dens type (løb, styrke eller opvarmning), enheden (iPhone eller Apple Watch), og om den kom fra planen eller biblioteket",
              "en ændring af planen foreslået, accepteret eller afvist, med dens omfang (i dag, denne uge eller fremover)",
              "prisskærmen vist, en plan købt (uden at planen nævnes), køb gendannet",
              "om du tillod notifikationer",
              "indholdet i planerne opdateret",
            ],
            "Hændelserne indeholder aldrig din livsfase, dine symptomer, svar fra check-ins, cyklusdata eller andre helbredsdata. Køb registreres uden at nævne planen, fordi planen kan afsløre din livsfase.",
            "Skærmoptagelse og automatisk registrering af tryk er slået fra, og hændelserne er ikke knyttet til dit navn, din e-mail eller en profil af dig.",
            "[TODO: hvor længe PostHog gemmer hændelserne, og hvor de opbevares (EU eller USA).]",
            "[TODO: om IP-adresser kasseres, og om analyse kan slås fra i appen.]",
          ],
        },
        {
          heading: "Køb",
          blocks: [
            "Planer er engangskøb i App Store. Der er ingen abonnementer. Apple står for betalingen, så vi ser aldrig dine betalingsoplysninger. Appen tjekker hos Apple, hvad du ejer, og vi ser salgstal i App Store Connect.",
          ],
        },
        {
          heading: "Det gør vi aldrig",
          blocks: [
            [
              "sender dine helbredsdata til os selv eller andre",
              "kræver en konto",
              "sælger dine data eller deler dem med annoncører",
              "bruger AI til at træffe beslutninger om din træning",
              "giver medicinsk rådgivning",
            ],
          ],
        },
        {
          heading: "Dine rettigheder",
          id: "your-rights",
          blocks: [
            "Efter GDPR har du ret til indsigt i, berigtigelse og sletning af dine personoplysninger, til at begrænse eller gøre indsigelse mod brugen af dem og til at få en kopi af dem. Du kan også klage til <a href=\"https://www.datatilsynet.dk\">Datatilsynet</a>.",
            "Da 12f ikke har nogen af dine trænings- eller helbredsdata, styrer du dem selv:",
            [
              "<strong>Se dem:</strong> alt, hvad Runphase gemmer om dig, kan ses i appen.",
              "<strong>Slet dem:</strong> slet Runphase fra din iPhone og dit Apple Watch, og fjern derefter appens data fra iCloud i iOS-indstillinger (dit navn → iCloud → administrer lagerplads → Runphase). Du finder fremgangsmåden på <a href=\"/da/support/\">supportsiden</a>.",
              "<strong>Stop adgangen til Apple Sundhed:</strong> tryk på dit profilbillede i appen Sundhed, derefter Apps og så Runphase. Data, der allerede er i Apple Sundhed, bliver liggende der.",
            ],
            `Brugshændelserne er ikke knyttet til dit navn eller din e-mail, så vi kan som regel ikke se, hvilke der er dine. Har du et spørgsmål eller en anmodning, så skriv til ${mail}, så hjælper vi, så godt vi kan.`,
          ],
        },
        {
          heading: "Børn",
          blocks: ["[TODO: minimumsalder og aldersgrænse i App Store.]"],
        },
        {
          heading: "Ændringer",
          blocks: [
            "Når Runphase ændrer, hvordan den håndterer data, opdaterer vi denne side og datoen øverst.",
          ],
        },
        {
          heading: "Kontakt",
          blocks: [`Spørgsmål om privatliv: ${mail}.`],
        },
      ],
    },
    support: {
      title: "Support",
      description:
        "Hjælp til Runphase: kontakt, gendannelse af køb, hvor dine data ligger, og hvordan du sletter dem, samt adgang til Apple Sundhed.",
      lede: "Hjælp til Runphase på iPhone og Apple Watch.",
      updated: "[TODO: ikrafttrædelsesdato]",
      sections: [
        {
          heading: "Få hjælp",
          blocks: [
            `Skriv til ${mail}. Det hjælper, hvis du skriver, hvilken iPhone eller hvilket Apple Watch du har, og hvilken softwareversion den kører.`,
            "Skriv helst ikke helbredsoplysninger, fx symptomer eller noget om din cyklus. Vi har ikke brug for dem for at hjælpe dig.",
          ],
        },
        {
          heading: "Gendan køb",
          blocks: [
            "Planer er engangskøb. Der er ingen abonnementer. De første to uger af hver plan er gratis.",
            "Hvis en plan, du har købt, står som låst, fx på en ny iPhone, så åbn Runphase og gå til <strong>Indstillinger → Gendan køb</strong>. Brug den samme Apple-konto, som du købte planen med.",
            "Alle planer understøtter Familiedeling, så medlemmer af din familiegruppe også kan bruge dem.",
          ],
        },
        {
          heading: "Hvor dine data ligger",
          blocks: [
            "Runphase har ingen konto. Din plan, dine log og dine check-ins gemmes på din iPhone og, hvis du er logget ind på iCloud, i din egen private iCloud. Vi kan ikke se dem, og derfor kan vi hverken gendanne eller slette dem for dig. Dit Apple Watch har en kopi af de kommende dages træninger.",
            "Sådan sletter du dine data:",
            [
              "Slet Runphase fra din iPhone og dit Apple Watch.",
              "Tryk på dit navn i iOS-indstillinger, derefter iCloud og så administrer lagerplads (ordlyden afhænger af iOS-versionen). Vælg Runphase, og slet dens data.",
            ],
            "Træninger og andre data i Apple Sundhed hører til appen Sundhed og styres der. Symptomer, du har logget i Runphase, skrives aldrig til Apple Sundhed. Læs mere i <a href=\"/da/privacy/\">privatlivspolitikken</a>.",
          ],
        },
        {
          heading: "Adgang til Apple Sundhed",
          blocks: [
            "Runphase kan læse fx menstruationsblødning, søvnforandringer, pulsvariabilitet og træninger fra Apple Sundhed, så du ikke skal logge dem to gange. Den spørger kun, når en funktion har brug for dem.",
            "Sådan ændrer du, hvad Runphase må læse:",
            [
              "Tryk på dit profilbillede i appen Sundhed, derefter Apps og så Runphase, eller",
              "gå til Anonymitet og sikkerhed → Sundhed → Runphase i iOS-indstillinger.",
            ],
            "Runphase virker uden adgang til Apple Sundhed. Funktioner, der har brug for dataene, viser blot, at der ikke er noget at vise endnu.",
          ],
        },
        {
          heading: "Træningsråd, ikke medicinsk rådgivning",
          blocks: [
            "Runphase justerer din træning efter faste regler, som forfatteren af din plan har skrevet, og fortæller dig hvorfor. Den giver træningsråd, ikke medicinsk rådgivning, og den stiller ingen diagnoser og behandler ikke noget. Har du spørgsmål om dit helbred, så tal med en sundhedsfaglig person.",
          ],
        },
      ],
    },
  },
} as const satisfies Record<Locale, Record<"privacy" | "support", Doc>>;
