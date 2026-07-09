import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gift } from "lucide-react";
import { TrustBar } from "@/components/TrustBar";
import { Newsletter } from "@/components/Newsletter";
import { AIAdvisor } from "@/components/AIAdvisor";
import { ProductRail } from "@/components/ProductRail";

import heroImg from "@/assets/hero-family.jpg";
import catBaby from "@/assets/cat-baby.jpg";
import catLegetoj from "@/assets/cat-legetoj.jpg";
import catLaering from "@/assets/cat-laering.jpg";
import catSkolestart from "@/assets/cat-skolestart.jpg";
import catBoernetoej from "@/assets/cat-boernetoej.jpg";
import catKreativitet from "@/assets/cat-kreativitet.jpg";
import catGaver from "@/assets/cat-gaver.jpg";
import catPraktisk from "@/assets/cat-praktisk.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WowKidz.dk — Alt til børn, baby og familieliv samlet ét sted" },
      {
        name: "description",
        content:
          "Find legetøj, læring, babyudstyr, skolestart og praktiske produkter til hverdagen — til fair priser og med dansk kundeservice.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const NEED_CARDS = [
  {
    label: "Baby",
    to: "/babyudstyr",
    image: catBaby,
    text: "Trygt udstyr og blid stimulering til de mindste.",
  },
  {
    label: "Legetøj",
    to: "/legetoj-efter-alder",
    image: catLegetoj,
    text: "Leg der passer til alderen — uden gættearbejde.",
  },
  {
    label: "Læring",
    to: "/leg-og-laering",
    image: catLaering,
    text: "Tal, bogstaver og nysgerrighed gennem leg.",
  },
  {
    label: "Skolestart",
    to: "/skolestart",
    image: catSkolestart,
    text: "Alt til første skoledag — fra madkasse til penalhus.",
  },
  {
    label: "Børnetøj",
    to: "/boernetoej",
    image: catBoernetoej,
    text: "Blødt, praktisk og nemt at vaske.",
  },
  {
    label: "Kreativitet",
    to: "/kreativ-leg",
    image: catKreativitet,
    text: "Klip, klister og fantasi til regnvejrsdage.",
  },
  {
    label: "Gaver",
    to: "/gaveideer-til-born",
    image: catGaver,
    text: "Gaveidéer der rammer plet — uden stress.",
  },
  {
    label: "Praktisk hverdag",
    to: "/praktisk-familieliv",
    image: catPraktisk,
    text: "Små fund der gør familielivet nemmere.",
  },
];

const INSPIRATION_CARDS = [
  { title: "Gaveidéer efter alder", to: "/gaveideer-til-born", accent: "bg-coral text-coral-foreground" },
  { title: "Klar til skolestart", to: "/skolestart", accent: "bg-sky text-sky-foreground" },
  { title: "Leg der styrker fantasi og motorik", to: "/kreativ-leg", accent: "bg-sun text-sun-foreground" },
  { title: "Praktiske fund til familielivet", to: "/praktisk-familieliv", accent: "bg-leaf text-leaf-foreground" },
];

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b bg-card">
        <div className="container-wk grid items-center gap-8 py-10 md:grid-cols-2 md:py-16">
          <div className="space-y-5">
            <p className="eyebrow-wk">Dansk webshop for børnefamilier</p>
            <h1 className="text-3xl leading-tight md:text-5xl">
              Alt til børn, baby og familieliv{" "}
              <span className="bg-sun px-1">samlet ét sted</span>
            </h1>
            <p className="max-w-lg text-sm text-muted-foreground md:text-base">
              Find legetøj, læring, babyudstyr, skolestart og praktiske produkter til hverdagen —
              til fair priser og med dansk kundeservice.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link to="/shop" className="btn-base btn-coral min-h-12">
                Shop nu
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link to="/gaveideer-til-born" className="btn-base btn-outline-ink min-h-12">
                <Gift className="h-4 w-4" aria-hidden />
                Find en gave
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Børn leger med klodser i en lys stue"
              width={1600}
              height={1000}
              fetchPriority="high"
              className="w-full border-2 border-ink object-cover"
            />
            <span className="absolute -bottom-3 -left-3 -z-10 h-full w-full bg-sun" aria-hidden />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* AI advisor */}
      <section className="container-wk py-8 md:py-10">
        <AIAdvisor />
      </section>

      {/* Shop efter behov */}
      <section aria-label="Shop efter behov" className="container-wk py-8 md:py-10">
        <div className="mb-4">
          <span className="mb-2 block h-1.5 w-10 bg-coral" aria-hidden />
          <h2 className="text-xl md:text-2xl">Shop efter behov</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {NEED_CARDS.map((card) => (
            <Link
              key={card.label}
              to={card.to}
              className="card-sharp group flex flex-col transition-colors hover:border-ink"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.label}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 p-3">
                <h3 className="text-sm md:text-base">{card.label}</h3>
                <p className="text-xs text-muted-foreground">{card.text}</p>
                <span className="mt-auto flex items-center gap-1 pt-2 text-xs font-bold text-coral">
                  Se udvalget
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Product rails */}
      <ProductRail title="Populært lige nu" params={{ orderby: "popularity" }} accent="coral" />
      <ProductRail title="Nyheder" params={{ orderby: "date", order: "desc" }} accent="sky" linkTo="/shop" />
      <ProductRail title="Gaveidéer" params={{ search: "legetøj", orderby: "popularity" }} accent="sun" linkTo="/gaveideer-til-born" />
      <ProductRail title="Skolestart" params={{ search: "skole" }} accent="sky" linkTo="/skolestart" />
      <ProductRail title="Leg og læring" params={{ search: "puslespil" }} accent="leaf" linkTo="/leg-og-laering" />
      <ProductRail title="Baby og småbørn" params={{ search: "baby" }} accent="sky" linkTo="/babyudstyr" />
      <ProductRail title="Kreativ weekend" params={{ search: "kreativ" }} accent="sun" linkTo="/kreativ-leg" />
      <ProductRail title="Tilbud" params={{ on_sale: true }} accent="coral" linkTo="/shop?on_sale=1" />

      {/* Inspiration */}
      <section aria-label="Inspiration" className="container-wk py-8 md:py-10">
        <div className="mb-4">
          <span className="mb-2 block h-1.5 w-10 bg-sky" aria-hidden />
          <h2 className="text-xl md:text-2xl">Inspiration til hverdagen</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4">
          {INSPIRATION_CARDS.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className={`group flex min-h-36 flex-col justify-between border-2 border-ink p-4 ${card.accent}`}
            >
              <h3 className="font-display text-lg font-extrabold leading-snug">{card.title}</h3>
              <span className="flex items-center gap-1 text-sm font-bold">
                Læs guiden
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div id="nyhedsbrev">
        <Newsletter />
      </div>
    </div>
  );
}
