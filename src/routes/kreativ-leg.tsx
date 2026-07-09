import { createFileRoute } from "@tanstack/react-router";
import { LandingPageTemplate } from "@/components/LandingPageTemplate";

export const Route = createFileRoute("/kreativ-leg")({
  head: () => ({
    meta: [
      { title: "Kreativ leg — klip, klister og fantasi | WowKidz.dk" },
      {
        name: "description",
        content:
          "Kreative sæt, farver og hobbyartikler der styrker fantasi og motorik. Perfekt til regnvejrsdage og hyggelige eftermiddage.",
      },
      { property: "og:title", content: "Kreativ leg | WowKidz.dk" },
      { property: "og:url", content: "/kreativ-leg" },
    ],
    links: [{ rel: "canonical", href: "/kreativ-leg" }],
  }),
  component: () => (
    <LandingPageTemplate
      eyebrow="Kreativ hverdag"
      title="Leg der styrker fantasi og motorik"
      lead="Klip, klister, farver og perler — kreativ leg giver ro, fordybelse og stolte børn."
      guide={
        <>
          <h2>Derfor er kreativ leg guld værd</h2>
          <p>
            Når børn klipper, tegner og bygger, træner de finmotorik, koncentration og tålmodighed
            — uden at opdage det. Og følelsen af selv at have lavet noget? Den er svær at slå.
          </p>
          <h3>Kom godt i gang derhjemme</h3>
          <p>
            Det behøver ikke være stort: en fast kasse med papir, farver, lim og saks gør det nemt
            at gå i gang, når lysten melder sig. Vælg materialer, der passer til alderen, så barnet
            kan selv.
          </p>
          <h3>Kreative idéer til weekenden</h3>
          <p>
            Perleplader, modellervoks, malesæt eller et fælles byggeprojekt — vælg én ting og lad
            fordybelsen komme af sig selv. Hyggeligt for hele familien.
          </p>
        </>
      }
      checklistTitle="Den kreative kasse"
      checklist={[
        "Papir og karton i flere farver",
        "Børnesaks der klipper godt",
        "Lim, tape og perler",
        "Farver der kan vaskes af",
        "Et voksdug til bordet",
      ]}
      productParams={{ search: "kreativ" }}
      relatedLabels={["Legetøj", "Læring", "Gaver"]}
      ctaLabel="Se alt kreativt"
      ctaTo="/shop"
    />
  ),
});
