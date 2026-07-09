import { createFileRoute } from "@tanstack/react-router";
import { ContentPageTemplate } from "@/components/ContentPageTemplate";

export const Route = createFileRoute("/cookiepolitik")({
  head: () => ({
    meta: [
      { title: "Cookiepolitik | WowKidz.dk" },
      {
        name: "description",
        content: "Læs hvilke cookies WowKidz.dk bruger, og hvordan du styrer dit samtykke.",
      },
      { property: "og:url", content: "/cookiepolitik" },
    ],
    links: [{ rel: "canonical", href: "/cookiepolitik" }],
  }),
  component: () => (
    <ContentPageTemplate
      title="Cookiepolitik"
      intro="Du bestemmer selv, hvor meget du vil dele — her er hvad vi bruger cookies til."
    >
      <h2>Hvad er cookies?</h2>
      <p>
        Cookies er små tekstfiler, der gemmes på din enhed. De hjælper shoppen med at huske din
        kurv og gøre din oplevelse bedre.
      </p>
      <h2>Hvilke cookies bruger vi?</h2>
      <ul>
        <li><strong>Nødvendige:</strong> Får shoppen og kurven til at fungere. Kan ikke fravælges.</li>
        <li><strong>Funktionelle:</strong> Husker dine valg, fx senest sete produkter.</li>
        <li><strong>Statistik:</strong> Hjælper os med at forstå, hvordan shoppen bruges — kun med dit samtykke.</li>
        <li><strong>Marketing:</strong> Bruges til relevant markedsføring — kun med dit samtykke.</li>
      </ul>
      <h2>Ændr dit samtykke</h2>
      <p>
        Du kan altid ændre eller trække dit samtykke tilbage ved at slette cookies i din browser
        og vælge på ny, når banneret vises igen.
      </p>
      <h2>Spørgsmål?</h2>
      <p>
        Kontakt os via <a href="/kontakt">kontaktsiden</a>, hvis du har spørgsmål til vores brug af
        cookies.
      </p>
    </ContentPageTemplate>
  ),
});
