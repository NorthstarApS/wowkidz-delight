import { createFileRoute } from "@tanstack/react-router";
import { LandingPageTemplate } from "@/components/LandingPageTemplate";

export const Route = createFileRoute("/gaveideer-til-born")({
  head: () => ({
    meta: [
      { title: "Gaveidéer til børn — find den rigtige gave | WowKidz.dk" },
      {
        name: "description",
        content:
          "Find gaver til børn efter alder, interesse og hverdag — med fokus på leg, læring og børneglæde. Levering 3–6 dage og nem retur.",
      },
      { property: "og:title", content: "Gaveidéer til børn | WowKidz.dk" },
      { property: "og:url", content: "/gaveideer-til-born" },
    ],
    links: [{ rel: "canonical", href: "/gaveideer-til-born" }],
  }),
  component: () => (
    <LandingPageTemplate
      eyebrow="Gaveguide"
      title="Gaveidéer til børn der gør valget nemmere"
      lead="Find gaver til børn efter alder, interesse og hverdag — med fokus på leg, læring og børneglæde."
      guide={
        <>
          <h2>Sådan vælger du en gave, der rammer plet</h2>
          <p>
            Den bedste børnegave er sjælden den dyreste — det er den, der passer til barnets alder
            og det, barnet er optaget af lige nu. Start med alderen, og tænk så i, hvad barnet
            elsker: at bygge, tegne, bevæge sig eller lege rolleleg.
          </p>
          <h3>Gaver efter alder</h3>
          <p>
            Til de mindste (0–3 år) er motorik og sanser vigtigst: stable, putte, mærke. Til 3–6 år
            åbner fantasien sig — rolleleg, klodser og kreative sæt er sikre valg. Fra 6 år og op
            fungerer spil, eksperimenter og hobbyudstyr, der giver barnet noget at fordybe sig i.
          </p>
          <h3>Når du er i tvivl</h3>
          <p>
            Vælg noget, der kan bruges igen og igen — leg med gentagelsesværdi slår engangsgaver
            hver gang. Og husk: en gave, der passer ind i familiens hverdag, bliver brugt mest.
          </p>
        </>
      }
      checklistTitle="Gave-tjekliste"
      checklist={[
        "Passer gaven til barnets alder?",
        "Matcher den barnets interesser lige nu?",
        "Kan den bruges mere end én gang?",
        "Er den nem at pakke ind og aflevere?",
        "Har familien plads og brug for den?",
      ]}
      productParams={{ orderby: "popularity" }}
      relatedLabels={["Legetøj", "Kreativitet", "Læring", "Skolestart"]}
      ctaLabel="Se alle gaveidéer"
      ctaTo="/shop"
    />
  ),
});
