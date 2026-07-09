import { createFileRoute } from "@tanstack/react-router";
import { ContentPageTemplate } from "@/components/ContentPageTemplate";

export const Route = createFileRoute("/handelsbetingelser")({
  head: () => ({
    meta: [
      { title: "Handelsbetingelser | WowKidz.dk" },
      {
        name: "description",
        content: "Læs handelsbetingelserne for køb hos WowKidz.dk — betaling, levering, fortrydelsesret og reklamation.",
      },
      { property: "og:url", content: "/handelsbetingelser" },
    ],
    links: [{ rel: "canonical", href: "/handelsbetingelser" }],
  }),
  component: () => (
    <ContentPageTemplate
      title="Handelsbetingelser"
      intro="Betingelserne for at handle hos WowKidz.dk — i et sprog man kan forstå."
    >
      <h2>Generelle oplysninger</h2>
      <p>
        WowKidz.dk ejes og drives af Viniko. Kontakt os via <a href="/kontakt">kontaktsiden</a>.
      </p>
      <h2>Priser og betaling</h2>
      <ul>
        <li>Alle priser er i danske kroner (DKK) og inkl. 25% moms.</li>
        <li>Vi modtager betaling med gængse betalingskort og MobilePay.</li>
        <li>Beløbet trækkes først, når varen afsendes.</li>
      </ul>
      <h2>Levering</h2>
      <p>
        Levering tager typisk 3–6 hverdage. Se detaljer under{" "}
        <a href="/levering-returnering">levering & returnering</a>.
      </p>
      <h2>Fortrydelsesret</h2>
      <p>
        Du har 30 dages fortrydelsesret fra modtagelse af varen. Returnering sker efter aftale —
        kontakt os først, så guider vi dig igennem.
      </p>
      <h2>Reklamationsret</h2>
      <p>
        Købelovens regler giver dig 2 års reklamationsret. Kontakt os hurtigst muligt, hvis en vare
        er defekt eller ikke svarer til det bestilte.
      </p>
      <h2>Persondata</h2>
      <p>
        Vi behandler kun de oplysninger, der er nødvendige for at gennemføre dit køb. Læs mere i{" "}
        <a href="/privatlivspolitik">privatlivspolitikken</a>.
      </p>
      <h2>Klageadgang</h2>
      <p>
        Er du uenig i en afgørelse, kan du klage til Nævnenes Hus, Toldboden 2, 8800 Viborg via
        Klageportalen. Du kan også bruge EU-Kommissionens online klageportal (ODR).
      </p>
    </ContentPageTemplate>
  ),
});
