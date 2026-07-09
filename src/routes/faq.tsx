import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { ContentPageTemplate } from "@/components/ContentPageTemplate";

const FAQ_ITEMS = [
  {
    q: "Hvor lang tid tager leveringen?",
    a: "Levering tager typisk 3–6 hverdage. Du får track & trace på mail, så snart pakken er afsendt.",
  },
  {
    q: "Hvordan returnerer jeg en vare?",
    a: "Du har 30 dages nem retur. Kontakt os via kontaktsiden, så guider vi dig igennem — det tager kun et par minutter.",
  },
  {
    q: "Er legetøjet sikkert og godkendt?",
    a: "Ja. Alt legetøj hos WowKidz.dk er CE-mærket og lever op til EU's sikkerhedskrav for legetøj.",
  },
  {
    q: "Hvordan finder jeg en gave til den rigtige alder?",
    a: "Brug vores gaverådgiver på forsiden eller gaveguiden under “Gaveidéer til børn” — så finder du en gave efter alder og interesse på få minutter.",
  },
  {
    q: "Hvilke betalingsmetoder tager I imod?",
    a: "Vi tager imod gængse betalingskort og MobilePay. Beløbet trækkes først, når din ordre afsendes.",
  },
  {
    q: "Kan jeg ændre eller annullere min ordre?",
    a: "Skriv til os hurtigst muligt via kontaktsiden. Er ordren ikke pakket endnu, ændrer eller annullerer vi den gerne.",
  },
  {
    q: "Sender I til hele Danmark?",
    a: "Ja, vi leverer i hele Danmark — til pakkeshop eller direkte til døren.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — ofte stillede spørgsmål | WowKidz.dk" },
      {
        name: "description",
        content: "Svar på de mest almindelige spørgsmål om levering, retur, betaling og gaver hos WowKidz.dk.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((i) => ({
            "@type": "Question",
            name: i.q,
            acceptedAnswer: { "@type": "Answer", text: i.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [open, setOpen] = useState<string | null>(FAQ_ITEMS[0].q);

  return (
    <ContentPageTemplate
      title="Ofte stillede spørgsmål"
      intro="Hurtige svar om levering, retur, betaling og gaver."
    >
      <div className="not-prose divide-y border">
        {FAQ_ITEMS.map((item) => {
          const isOpen = open === item.q;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : item.q)}
                className="flex min-h-13 w-full items-center justify-between gap-3 px-4 py-3 text-left font-display text-sm font-bold hover:bg-secondary md:text-base"
                aria-expanded={isOpen}
              >
                {item.q}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              {isOpen && (
                <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </ContentPageTemplate>
  );
}
