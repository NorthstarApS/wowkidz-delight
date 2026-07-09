/** Navigation structure: age-, need- and situation-based. */

export interface NavItem {
  label: string;
  to: string;
  /** keywords used to group live WooCommerce categories under this item */
  keywords: string[];
  accent: "sun" | "coral" | "sky" | "leaf";
  tagline: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Baby",
    to: "/babyudstyr",
    keywords: ["baby", "smaaboern", "smaborn", "motor", "aktivitet", "pusle", "ammepude", "sut"],
    accent: "sky",
    tagline: "Trygt udstyr til de mindste",
  },
  {
    label: "Legetøj",
    to: "/legetoj-efter-alder",
    keywords: ["lege", "leg-", "figur", "dukke", "bil", "byg", "spil", "puslespil", "plys"],
    accent: "sun",
    tagline: "Leg til alle aldre",
  },
  {
    label: "Læring",
    to: "/leg-og-laering",
    keywords: ["laering", "laer", "bog", "tal", "bogstav", "videnskab", "eksperiment"],
    accent: "leaf",
    tagline: "Leg der lærer noget",
  },
  {
    label: "Skolestart",
    to: "/skolestart",
    keywords: ["skole", "penalhus", "taske", "madkasse", "drikkedunk", "blyant"],
    accent: "sky",
    tagline: "Klar til første skoledag",
  },
  {
    label: "Børnetøj",
    to: "/boernetoej",
    keywords: ["toej", "tøj", "body", "hue", "sok", "sko", "jakke"],
    accent: "coral",
    tagline: "Praktisk og blødt",
  },
  {
    label: "Kreativitet",
    to: "/kreativ-leg",
    keywords: ["kreativ", "tegn", "mal", "perle", "klip", "hobby", "diy"],
    accent: "sun",
    tagline: "Klip, klister og fantasi",
  },
  {
    label: "Gaver",
    to: "/gaveideer-til-born",
    keywords: ["gave", "foedselsdag"],
    accent: "coral",
    tagline: "Gaver der rammer plet",
  },
  {
    label: "Tilbud",
    to: "/shop?on_sale=1",
    keywords: [],
    accent: "leaf",
    tagline: "Gode fund til fair priser",
  },
];

export const FOOTER_CATEGORY_LINKS = NAV_ITEMS.filter((n) => n.keywords.length > 0);
