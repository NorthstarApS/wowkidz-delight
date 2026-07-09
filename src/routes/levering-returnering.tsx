import { createFileRoute } from "@tanstack/react-router";
import { ContentPageTemplate } from "@/components/ContentPageTemplate";

export const Route = createFileRoute("/levering-returnering")({
  head: () => ({
    meta: [
      { title: "Levering & returnering | WowKidz.dk" },
      {
        name: "description",
        content:
          "Levering typisk 3–6 dage og 30 dages nem retur hos WowKidz.dk. Læs alt om fragt, levering og returnering her.",
      },
      { property: "og:url", content: "/levering-returnering" },
    ],
    links: [{ rel: "canonical", href: "/levering-returnering" }],
  }),
  component: () => (
    <ContentPageTemplate
      title="Levering & returnering"
      intro="Kort og ærligt: levering typisk 3–6 dage og nem retur i 30 dage."
    >
      <h2>Levering</h2>
      <ul>
        <li>Levering tager typisk 3–6 hverdage.</li>
        <li>Vi sender med kendte danske fragtfirmaer til pakkeshop eller hjemmelevering.</li>
        <li>Du får track & trace på mail, så snart pakken er afsendt.</li>
        <li>Fragtprisen vises tydeligt i kassen, inden du betaler.</li>
      </ul>
      <h2>Returnering</h2>
      <ul>
        <li>Du har 30 dages fortrydelsesret fra den dag, du modtager varen.</li>
        <li>Varen skal returneres i væsentlig samme stand og gerne i original emballage.</li>
        <li>Kontakt os først via <a href="/kontakt">kontaktsiden</a> — så guider vi dig igennem.</li>
        <li>Vi refunderer beløbet, så snart vi har modtaget og tjekket varen.</li>
      </ul>
      <h2>Reklamation</h2>
      <p>
        Der er 2 års reklamationsret efter købelovens regler. Er der noget galt med varen, så skriv
        til os med billeder og en kort beskrivelse — vi finder en løsning hurtigt og uden bøvl.
      </p>
    </ContentPageTemplate>
  ),
});
