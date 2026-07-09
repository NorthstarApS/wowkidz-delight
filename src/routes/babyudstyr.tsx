import { createFileRoute } from "@tanstack/react-router";
import { LandingPageTemplate } from "@/components/LandingPageTemplate";

export const Route = createFileRoute("/babyudstyr")({
  head: () => ({
    meta: [
      { title: "Babyudstyr — trygt udstyr til de mindste | WowKidz.dk" },
      {
        name: "description",
        content:
          "Babylegetøj, motorikleg og praktisk babyudstyr til hverdagen — trygt, blødt og udviklet til de mindste. Dansk webshop med nem retur.",
      },
      { property: "og:title", content: "Babyudstyr | WowKidz.dk" },
      { property: "og:url", content: "/babyudstyr" },
    ],
    links: [{ rel: "canonical", href: "/babyudstyr" }],
  }),
  component: () => (
    <LandingPageTemplate
      eyebrow="Baby & småbørn"
      title="Babyudstyr der gør de første år trygge og nemme"
      lead="Fra motoriklegetøj til praktiske hverdagsting — alt til baby samlet ét sted, så I kan bruge tiden på det vigtige."
      guide={
        <>
          <h2>Det første år: sanser, ro og nærvær</h2>
          <p>
            Babyer har ikke brug for meget — men det, de har brug for, skal være trygt. Blødt
            motoriklegetøj, en god ranglen og aktivitetslegetøj i barnets tempo er den bedste start.
          </p>
          <h3>Motorik gennem leg</h3>
          <p>
            Aktivitetscentre og gribelegetøj inviterer til at røre, dreje og opdage — og styrker de
            små hænder helt naturligt.
          </p>
          <h3>Praktisk til hverdagen</h3>
          <p>
            Hverdagen med baby bliver nemmere med de rigtige småting: opbevaring, stelleting og
            ting, der bare virker. Vi har samlet de fund, andre familier sværger til.
          </p>
        </>
      }
      checklistTitle="Baby-tjekliste"
      checklist={[
        "Motoriklegetøj i blødt materiale",
        "Ranglen og bidering uden skadelige stoffer",
        "Aktivitetslegetøj til gulvtid",
        "Praktisk opbevaring til småting",
        "En god gave til barnedåb eller fødselsdag",
      ]}
      productParams={{ search: "baby" }}
      relatedLabels={["Legetøj", "Læring", "Gaver"]}
      ctaLabel="Se alt babyudstyr"
      ctaTo="/shop"
    />
  ),
});
