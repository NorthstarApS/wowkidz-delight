import { createFileRoute } from "@tanstack/react-router";
import { LandingPageTemplate } from "@/components/LandingPageTemplate";

export const Route = createFileRoute("/legetoj-efter-alder")({
  head: () => ({
    meta: [
      { title: "Legetøj efter alder — find det rigtige match | WowKidz.dk" },
      {
        name: "description",
        content:
          "Find legetøj der passer til barnets alder og udvikling — fra baby til skolebarn. Trygt, nemt og med fair priser.",
      },
      { property: "og:title", content: "Legetøj efter alder | WowKidz.dk" },
      { property: "og:url", content: "/legetoj-efter-alder" },
    ],
    links: [{ rel: "canonical", href: "/legetoj-efter-alder" }],
  }),
  component: () => (
    <LandingPageTemplate
      eyebrow="Legetøjsguide"
      title="Legetøj efter alder — uden gættearbejde"
      lead="Det rigtige legetøj møder barnet dér, hvor det er. Her er guiden til leg, der passer til alderen."
      guide={
        <>
          <h2>Hvorfor alder betyder noget</h2>
          <p>
            Legetøj, der er for svært, bliver frustrerende — og legetøj, der er for nemt, bliver
            kedeligt. Når legen passer til barnets udvikling, opstår fordybelsen helt af sig selv.
          </p>
          <h3>0–1 år: Sanser og motorik</h3>
          <p>Rangler, bidering og bløde klodser — alt der kan mærkes, gribes og puttes i munden.</p>
          <h3>1–3 år: Stable, putte og skubbe</h3>
          <p>Stableklodser, puttekasser og trækdyr styrker de små hænder og den store nysgerrighed.</p>
          <h3>3–6 år: Fantasi og rolleleg</h3>
          <p>Byggeklodser, dukker, biler og udklædning — nu bygges hele verdener.</p>
          <h3>6+ år: Fordybelse og spil</h3>
          <p>Brætspil, eksperimenter, kreative sæt og hobbyprojekter, der giver stolthed.</p>
        </>
      }
      checklistTitle="Vælg legetøj der…"
      checklist={[
        "Passer til barnets alder og motorik",
        "Kan bruges på flere måder",
        "Tåler at blive leget med — hver dag",
        "Er CE-mærket og sikkert",
        "Inviterer til leg sammen med andre",
      ]}
      productParams={{ search: "legetøj", orderby: "popularity" }}
      relatedLabels={["Baby", "Læring", "Kreativitet", "Gaver"]}
      ctaLabel="Se alt legetøj"
      ctaTo="/shop"
    />
  ),
});
