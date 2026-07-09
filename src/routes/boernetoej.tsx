import { createFileRoute } from "@tanstack/react-router";
import { LandingPageTemplate } from "@/components/LandingPageTemplate";

export const Route = createFileRoute("/boernetoej")({
  head: () => ({
    meta: [
      { title: "Børnetøj — blødt, praktisk og nemt | WowKidz.dk" },
      {
        name: "description",
        content:
          "Børnetøj der tåler leg og vask — bløde materialer, praktiske snit og fair priser. Fra baby til skolebarn.",
      },
      { property: "og:title", content: "Børnetøj | WowKidz.dk" },
      { property: "og:url", content: "/boernetoej" },
    ],
    links: [{ rel: "canonical", href: "/boernetoej" }],
  }),
  component: () => (
    <LandingPageTemplate
      eyebrow="Børnetøj"
      title="Børnetøj der tåler leg — og vaskemaskinen"
      lead="Blødt, praktisk og nemt at tage af og på. Tøj til børn, der bruger dagen på at lege."
      guide={
        <>
          <h2>Godt børnetøj er praktisk børnetøj</h2>
          <p>
            Børn skal kunne bevæge sig, klatre og falde i tøjet — og det skal kunne vaskes igen og
            igen. Vi vælger tøj med bløde materialer og snit, der passer til leg.
          </p>
          <h3>Tænk i lag</h3>
          <p>
            Body, bluse og en varm trøje ovenpå gør det nemt at tilpasse til vejret — og til
            institutionens garderobe.
          </p>
          <h3>Lad barnet kunne selv</h3>
          <p>
            Elastik i taljen, brede halsåbninger og gode lukninger betyder, at barnet selv kan
            tage tøjet af og på. Det sparer tid — og giver stolthed.
          </p>
        </>
      }
      checklistTitle="Garderobe-tjekliste"
      checklist={[
        "Bløde materialer der ånder",
        "Tåler vask ved 40–60 grader",
        "Nemt at tage af og på selv",
        "Plads til bevægelse og leg",
        "Ekstra skiftetøj til institutionen",
      ]}
      productParams={{ search: "tøj" }}
      relatedLabels={["Baby", "Skolestart", "Gaver"]}
      ctaLabel="Se alt børnetøj"
      ctaTo="/shop"
    />
  ),
});
