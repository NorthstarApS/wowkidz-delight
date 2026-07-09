import { createFileRoute } from "@tanstack/react-router";
import { ContentPageTemplate } from "@/components/ContentPageTemplate";

export const Route = createFileRoute("/privatlivspolitik")({
  head: () => ({
    meta: [
      { title: "Privatlivspolitik | WowKidz.dk" },
      {
        name: "description",
        content: "Sådan behandler WowKidz.dk dine personoplysninger — kort, klart og efter GDPR.",
      },
      { property: "og:url", content: "/privatlivspolitik" },
    ],
    links: [{ rel: "canonical", href: "/privatlivspolitik" }],
  }),
  component: () => (
    <ContentPageTemplate
      title="Privatlivspolitik"
      intro="Vi passer på dine oplysninger — her kan du læse hvordan."
    >
      <h2>Dataansvarlig</h2>
      <p>WowKidz.dk (ejet af Viniko) er dataansvarlig for behandlingen af dine personoplysninger.</p>
      <h2>Hvilke oplysninger indsamler vi?</h2>
      <ul>
        <li>Navn, adresse, e-mail og telefonnummer — når du handler hos os.</li>
        <li>Ordrehistorik — for at kunne håndtere levering, retur og reklamation.</li>
        <li>Cookies og lignende teknologier — se <a href="/cookiepolitik">cookiepolitikken</a>.</li>
      </ul>
      <h2>Hvad bruger vi oplysningerne til?</h2>
      <ul>
        <li>At gennemføre og levere din ordre.</li>
        <li>At yde kundeservice og håndtere retur.</li>
        <li>At sende nyhedsbreve — kun hvis du selv har tilmeldt dig.</li>
      </ul>
      <h2>Hvor længe gemmer vi dine oplysninger?</h2>
      <p>
        Købsoplysninger gemmes i 5 år af hensyn til bogføringsloven. Nyhedsbrevstilmelding gemmes,
        indtil du afmelder dig.
      </p>
      <h2>Dine rettigheder</h2>
      <p>
        Du har ret til indsigt, berigtigelse, sletning og dataportabilitet. Kontakt os via{" "}
        <a href="/kontakt">kontaktsiden</a>, hvis du vil gøre brug af dine rettigheder. Du kan også
        klage til Datatilsynet.
      </p>
    </ContentPageTemplate>
  ),
});
