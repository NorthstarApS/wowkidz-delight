import { createFileRoute } from "@tanstack/react-router";
import { LandingPageTemplate } from "@/components/LandingPageTemplate";

export const Route = createFileRoute("/praktisk-familieliv")({
  head: () => ({
    meta: [
      { title: "Praktisk familieliv — fund der letter hverdagen | WowKidz.dk" },
      {
        name: "description",
        content:
          "Madkasser, drikkedunke, opbevaring og smarte hverdagsfund til børnefamilien. Praktisk, holdbart og til fair priser.",
      },
      { property: "og:title", content: "Praktisk familieliv | WowKidz.dk" },
      { property: "og:url", content: "/praktisk-familieliv" },
    ],
    links: [{ rel: "canonical", href: "/praktisk-familieliv" }],
  }),
  component: () => (
    <LandingPageTemplate
      eyebrow="Praktisk hverdag"
      title="Praktiske fund til familielivet"
      lead="De små ting der får hverdagen til at glide: madkasser der holder, opbevaring der virker, og fund du ikke vidste du manglede."
      guide={
        <>
          <h2>Hverdagen er den største disciplin</h2>
          <p>
            Madpakker, våde flyverdragter, legetøj på gulvet — familielivet er fuldt af logistik.
            De rigtige praktiske produkter gør ikke hverdagen perfekt, men de gør den nemmere.
          </p>
          <h3>Køkken og madpakker</h3>
          <p>
            En madkasse med rum, en drikkedunk der ikke lækker og snackbokse til farten — små ting,
            stor forskel klokken 7 om morgenen.
          </p>
          <h3>Orden i kaosset</h3>
          <p>
            Kurve, kasser og opbevaring i børnehøjde gør det muligt for børnene selv at rydde op —
            eller i det mindste at prøve.
          </p>
        </>
      }
      checklistTitle="Hverdags-tjekliste"
      checklist={[
        "Madkasse med rum til det hele",
        "Drikkedunk der tåler tasken",
        "Opbevaring i børnehøjde",
        "Navnelapper til institutionen",
        "Reserve-luffer (altid!)",
      ]}
      productParams={{ orderby: "popularity" }}
      relatedLabels={["Skolestart", "Baby", "Børnetøj"]}
      ctaLabel="Se praktiske fund"
      ctaTo="/shop"
    />
  ),
});
