import { createFileRoute } from "@tanstack/react-router";
import { LandingPageTemplate } from "@/components/LandingPageTemplate";

export const Route = createFileRoute("/leg-og-laering")({
  head: () => ({
    meta: [
      { title: "Leg og læring — lær gennem leg | WowKidz.dk" },
      {
        name: "description",
        content:
          "Puslespil, tal, bogstaver og eksperimenter — legetøj der gør læring til leg. Find læringslegetøj til alle aldre.",
      },
      { property: "og:title", content: "Leg og læring | WowKidz.dk" },
      { property: "og:url", content: "/leg-og-laering" },
    ],
    links: [{ rel: "canonical", href: "/leg-og-laering" }],
  }),
  component: () => (
    <LandingPageTemplate
      eyebrow="Læring"
      title="Leg og læring — det bedste fra begge verdener"
      lead="Børn lærer bedst, når de leger. Her finder du legetøj, der træner tal, bogstaver, logik og nysgerrighed."
      guide={
        <>
          <h2>Læring der føles som leg</h2>
          <p>
            Puslespil træner logik og tålmodighed. Tælle- og bogstavspil gør skoleforberedelsen
            hyggelig. Og eksperimentsæt tænder den naturlige nysgerrighed, alle børn har.
          </p>
          <h3>Vælg efter barnets næste skridt</h3>
          <p>
            Kig på, hvad barnet er ved at lære lige nu — farver, former, tal eller bogstaver — og
            vælg leg, der ligger lige foran. Så bliver succesoplevelsen størst.
          </p>
          <h3>Lær sammen</h3>
          <p>
            Den bedste læring sker sammen: et puslespil på gulvet eller et spil ved bordet giver
            både nærvær og nye færdigheder.
          </p>
        </>
      }
      checklistTitle="Godt læringslegetøj…"
      checklist={[
        "Møder barnet hvor det er",
        "Giver succesoplevelser undervejs",
        "Kan bruges igen og igen",
        "Inviterer til at lege sammen",
        "Gør svære ting sjove",
      ]}
      productParams={{ search: "puslespil" }}
      relatedLabels={["Skolestart", "Legetøj", "Kreativitet", "Baby"]}
      ctaLabel="Se alt til læring"
      ctaTo="/shop"
    />
  ),
});
