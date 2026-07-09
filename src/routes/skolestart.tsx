import { createFileRoute } from "@tanstack/react-router";
import { LandingPageTemplate } from "@/components/LandingPageTemplate";

export const Route = createFileRoute("/skolestart")({
  head: () => ({
    meta: [
      { title: "Skolestart — alt dit barn skal bruge | WowKidz.dk" },
      {
        name: "description",
        content:
          "Gør skolestarten tryg og nem: skoletaske, penalhus, madkasse og drikkedunk samlet ét sted. Fair priser og hurtig levering.",
      },
      { property: "og:title", content: "Skolestart | WowKidz.dk" },
      { property: "og:url", content: "/skolestart" },
    ],
    links: [{ rel: "canonical", href: "/skolestart" }],
  }),
  component: () => (
    <LandingPageTemplate
      eyebrow="Skolestart"
      title="Klar til skolestart — uden stress"
      lead="Skoletaske, penalhus, madkasse og alt det praktiske samlet ét sted, så første skoledag bliver tryg og hyggelig."
      guide={
        <>
          <h2>Sådan gør du barnet klar til første skoledag</h2>
          <p>
            Skolestart er en stor dag — for hele familien. Det vigtigste er, at barnet føler sig
            tryg: en taske der passer til ryggen, en madkasse barnet selv kan åbne, og et penalhus
            med det mest nødvendige.
          </p>
          <h3>Vælg tasken først</h3>
          <p>
            Skoletasken skal sidde godt og ikke være for stor. Lad gerne barnet være med til at
            vælge — det giver ejerskab og glæde ved at bære den.
          </p>
          <h3>Madkassen der bliver spist af</h3>
          <p>
            Rum til frugt, en klapsammen og lidt sjovt. En drikkedunk, der ikke drypper i tasken,
            er guld værd i hverdagen.
          </p>
        </>
      }
      checklistTitle="Skolestart-tjekliste"
      checklist={[
        "Skoletaske der passer til barnets ryg",
        "Penalhus med blyanter og farver",
        "Madkasse barnet selv kan åbne",
        "Drikkedunk der ikke lækker",
        "Gymnastiktøj og skiftetøj",
        "Regntøj til cykelturen",
      ]}
      productParams={{ search: "skole" }}
      relatedLabels={["Læring", "Børnetøj", "Legetøj"]}
      ctaLabel="Se alt til skolestart"
      ctaTo="/shop"
    />
  ),
});
