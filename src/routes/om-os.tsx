import { createFileRoute } from "@tanstack/react-router";
import { ContentPageTemplate } from "@/components/ContentPageTemplate";

export const Route = createFileRoute("/om-os")({
  head: () => ({
    meta: [
      { title: "Om os | WowKidz.dk" },
      {
        name: "description",
        content:
          "WowKidz.dk er en dansk webshop for børnefamilier — legetøj, babyudstyr, læring og skolestart med fair priser og dansk kundeservice.",
      },
      { property: "og:url", content: "/om-os" },
    ],
    links: [{ rel: "canonical", href: "/om-os" }],
  }),
  component: () => (
    <ContentPageTemplate
      title="Om WowKidz.dk"
      intro="En dansk webshop for børnefamilier — bygget på børneglæde og praktisk hverdag."
    >
      <p>
        WowKidz.dk er det brede familieunivers: baby, børn, legetøj, læring, skolestart, børnetøj,
        gaver og de praktiske ting, der får hverdagen til at hænge sammen. Vi samler det hele ét
        sted, så du slipper for at lede ti steder efter én fødselsdagsgave.
      </p>
      <h2>Hvad vi tror på</h2>
      <ul>
        <li><strong>Trygt:</strong> Dansk webshop, dansk kundeservice og nem retur.</li>
        <li><strong>Nemt:</strong> Vi sorterer udvalget efter alder, behov og situation.</li>
        <li><strong>Fair:</strong> Gode priser uden skrigende udsalgsstøj.</li>
        <li><strong>Hyggeligt:</strong> Produkter der skaber leg, læring og børneglæde.</li>
      </ul>
      <h2>Hvem står bag?</h2>
      <p>
        WowKidz.dk ejes af Viniko. Vi er selv børnefamilier, og vi vælger produkterne, som vi
        selv ville købe dem: praktiske, kreative og med plads til leg.
      </p>
      <p>
        Har du spørgsmål? Skriv til os via <a href="/kontakt">kontaktsiden</a> — vi svarer på dansk
        og typisk inden for én hverdag.
      </p>
    </ContentPageTemplate>
  ),
});
