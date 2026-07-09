import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";
import { ContentPageTemplate } from "@/components/ContentPageTemplate";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt os | WowKidz.dk" },
      {
        name: "description",
        content: "Kontakt WowKidz.dk's danske kundeservice — vi svarer typisk inden for én hverdag.",
      },
      { property: "og:url", content: "/kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <ContentPageTemplate
      title="Kontakt os"
      intro="Dansk kundeservice — vi svarer typisk inden for én hverdag."
    >
      <div className="not-prose mb-8 grid gap-3 sm:grid-cols-2">
        <div className="card-sharp flex items-center gap-3 p-4">
          <Mail className="h-5 w-5 shrink-0 text-sky" aria-hidden />
          <div>
            <p className="text-sm font-bold">E-mail</p>
            <p className="text-sm text-muted-foreground">kundeservice@wowkidz.dk</p>
          </div>
        </div>
        <div className="card-sharp flex items-center gap-3 p-4">
          <MessageCircle className="h-5 w-5 shrink-0 text-leaf" aria-hidden />
          <div>
            <p className="text-sm font-bold">Svartid</p>
            <p className="text-sm text-muted-foreground">Typisk inden for én hverdag</p>
          </div>
        </div>
      </div>

      {sent ? (
        <div className="card-sharp border-2 border-ink bg-sun p-6 text-center">
          <p className="font-display text-lg font-extrabold">Tak for din besked! 🎈</p>
          <p className="mt-1 text-sm">Vi vender tilbage hurtigst muligt.</p>
        </div>
      ) : (
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1 block text-sm font-bold">
                Navn
              </label>
              <input
                id="contact-name"
                required
                className="min-h-12 w-full border bg-card px-3 text-sm outline-none focus:border-ink"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1 block text-sm font-bold">
                E-mail
              </label>
              <input
                id="contact-email"
                type="email"
                required
                className="min-h-12 w-full border bg-card px-3 text-sm outline-none focus:border-ink"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-subject" className="mb-1 block text-sm font-bold">
              Emne
            </label>
            <input
              id="contact-subject"
              placeholder="Fx: Spørgsmål om ordre eller retur"
              className="min-h-12 w-full border bg-card px-3 text-sm outline-none focus:border-ink"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-1 block text-sm font-bold">
              Besked
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              className="w-full border bg-card p-3 text-sm outline-none focus:border-ink"
            />
          </div>
          <button type="submit" className="btn-base btn-coral min-h-12">
            Send besked
          </button>
        </form>
      )}
    </ContentPageTemplate>
  );
}
