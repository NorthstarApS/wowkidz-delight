import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Minus, Plus, ShieldCheck, ShoppingCart, Truck, Undo2, Zap } from "lucide-react";
import { useProduct } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useCart } from "@/context/CartContext";
import { priceParts, stripHtml } from "@/lib/format";
import { productJsonLdScript } from "@/lib/productJsonLd";
import { ProductGrid } from "@/components/ProductGrid";
import { Breadcrumbs } from "@/components/CategoryHero";
import { buildCheckoutHandoverUrl } from "@/services/storeApi";
import { fetchProductBySlug } from "@/services/woocommerce";

export const Route = createFileRoute("/produkt/$slug")({
  loader: async ({ context, params }) => {
    try {
      const product = await context.queryClient.ensureQueryData({
        queryKey: ["product", params.slug],
        queryFn: () => fetchProductBySlug({ data: { slug: params.slug } }),
        staleTime: 5 * 60_000,
      });
      return { product };
    } catch {
      return { product: null };
    }
  },
  head: ({ params, loaderData }) => {
    const product = loaderData?.product ?? null;
    const description = product
      ? stripHtml(product.short_description) ||
        stripHtml(product.description) ||
        `${product.name} hos WowKidz.dk — fair priser og nem retur.`
      : "Se produktet hos WowKidz.dk — dansk webshop for børnefamilier med fair priser og nem retur.";
    const title = product ? `${product.name} | WowKidz.dk` : "Produkt | WowKidz.dk";

    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 300) },
        { property: "og:type", content: "product" },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 300) },
        { property: "og:url", content: `/produkt/${params.slug}` },
        ...(product?.images[0]?.src
          ? [{ property: "og:image", content: product.images[0].src }]
          : []),
      ],
      links: [{ rel: "canonical", href: `/produkt/${params.slug}` }],
      scripts: product ? [productJsonLdScript(product)] : [],
    };
  },
  component: ProductPage,
});

const ACCORDIONS: { title: string; render: (p: { short: string; full: string }) => string }[] = [
  { title: "Kort fortalt", render: ({ short }) => short },
  {
    title: "Passer til alder",
    render: ({ full }) => {
      const m = full.match(/(\d+)\s*(år|mdr|måneder)/i);
      return m
        ? `Producenten angiver produktet fra ${m[0]}. Vurder altid ud fra dit barns udvikling.`
        : "Se aldersanbefaling på produktet eller spørg vores kundeservice — vi hjælper gerne med at vurdere, om det passer til dit barn.";
    },
  },
  {
    title: "Sådan bruges produktet",
    render: ({ full }) => full || "Produktet er klar til brug — følg medfølgende vejledning.",
  },
  {
    title: "Materiale og størrelse",
    render: ({ full }) =>
      full.match(/(træ|plast|bomuld|metal|stof|silikone)/i)
        ? "Se materialedetaljer i beskrivelsen ovenfor. Alt legetøj er CE-mærket."
        : "Materiale og mål fremgår af produktbeskrivelsen. Alt legetøj er CE-mærket.",
  },
  {
    title: "Levering og retur",
    render: () =>
      "Levering typisk 3–6 dage med GLS eller PostNord. 30 dages nem retur — kontakt os, så klarer vi resten.",
  },
];

function ProductPage() {
  const { slug } = Route.useParams();
  const { data: product, isLoading } = useProduct(slug);
  const { addProduct } = useCart();
  const { items: recentItems, track } = useRecentlyViewed();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>("Kort fortalt");

  const categoryId = product?.categories[0]?.id;
  const { data: relatedData, isLoading: relatedLoading } = useProducts(
    { category: categoryId ? String(categoryId) : undefined, per_page: 5 },
    Boolean(categoryId),
  );
  const related = relatedData?.products.filter((p) => p.id !== product?.id).slice(0, 4);

  const { data: addonData } = useProducts({ orderby: "popularity", per_page: 5 }, Boolean(product));
  const addons = addonData?.products.filter((p) => p.id !== product?.id).slice(0, 4);

  useEffect(() => {
    if (product) {
      track({
        id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0]?.thumbnail ?? "",
        price: priceParts(product.prices).price,
      });
      setActiveImage(0);
      setQuantity(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  if (isLoading) {
    return (
      <div className="container-wk grid gap-8 py-8 md:grid-cols-2">
        <div className="skeleton-wk aspect-square" />
        <div className="space-y-4">
          <div className="skeleton-wk h-4 w-40" />
          <div className="skeleton-wk h-9 w-4/5" />
          <div className="skeleton-wk h-6 w-32" />
          <div className="skeleton-wk h-20 w-full" />
          <div className="skeleton-wk h-12 w-full" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-wk py-20 text-center">
        <h1 className="text-2xl">Produktet blev ikke fundet</h1>
        <p className="mt-2 text-sm text-muted-foreground">Det er måske udgået — se lignende i shoppen.</p>
        <Link to="/shop" className="btn-base btn-coral mt-6">
          Shop alle produkter
        </Link>
      </div>
    );
  }

  const { price, regular, isOnSale, savingsPct } = priceParts(product.prices);
  const short = stripHtml(product.short_description);
  const full = stripHtml(product.description);
  const category = product.categories[0];

  return (
    <div>
      <div className="container-wk py-4">
        <Breadcrumbs
          items={[
            { label: "Shop", to: "/shop" },
            ...(category ? [{ label: category.name, to: `/kategori/${category.slug}` }] : []),
            { label: product.name },
          ]}
        />
      </div>

      <div className="container-wk grid gap-8 pb-10 md:grid-cols-2">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="card-sharp aspect-square">
            {product.images[activeImage] && (
              <img
                src={product.images[activeImage].src}
                alt={product.images[activeImage].alt || product.name}
                width={800}
                height={800}
                className="h-full w-full object-contain"
              />
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`h-16 w-16 shrink-0 border-2 ${i === activeImage ? "border-ink" : "border-border"}`}
                  aria-label={`Billede ${i + 1}`}
                >
                  <img
                    src={img.thumbnail || img.src}
                    alt=""
                    loading="lazy"
                    width={64}
                    height={64}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-4">
          {category && <p className="eyebrow-wk">{category.name}</p>}
          <h1 className="text-2xl leading-tight md:text-3xl">{product.name}</h1>

          <div className="flex items-baseline gap-3">
            <span className={`font-display text-2xl font-extrabold ${isOnSale ? "text-coral" : ""}`}>
              {price}
            </span>
            {isOnSale && (
              <>
                <span className="text-sm text-muted-foreground line-through">{regular}</span>
                <span className="bg-leaf px-2 py-0.5 text-xs font-bold">Spar {savingsPct}%</span>
              </>
            )}
          </div>

          {short && <p className="text-sm leading-relaxed text-muted-foreground">{short}</p>}

          <p className={`text-sm font-bold ${product.is_in_stock ? "text-leaf" : "text-destructive"}`}>
            {product.is_in_stock
              ? product.low_stock_remaining
                ? `Kun ${product.low_stock_remaining} tilbage på lager`
                : "✓ På lager — klar til afsendelse"
              : "Udsolgt lige nu"}
          </p>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center border-2 border-ink">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-12 w-12 items-center justify-center hover:bg-secondary"
                aria-label="Én mindre"
              >
                <Minus className="h-4 w-4" aria-hidden />
              </button>
              <span className="w-10 text-center font-display font-extrabold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-12 w-12 items-center justify-center hover:bg-secondary"
                aria-label="Én mere"
              >
                <Plus className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <button
              type="button"
              onClick={() => addProduct(product, quantity)}
              disabled={!product.is_in_stock}
              className="btn-base btn-coral min-h-12 flex-1"
            >
              <ShoppingCart className="h-4 w-4" aria-hidden />
              Læg i kurv
            </button>
          </div>
          <a
            href={buildCheckoutHandoverUrl([
              {
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: Number(product.prices.price),
                regularPrice: Number(product.prices.regular_price),
                image: product.images[0]?.thumbnail ?? "",
                quantity,
              },
            ])}
            className="btn-base btn-ink min-h-12 w-full"
          >
            <Zap className="h-4 w-4" aria-hidden />
            Køb nu
          </a>

          <div className="card-sharp grid grid-cols-3 divide-x">
            {[
              { icon: Truck, text: "Levering 3–6 dage" },
              { icon: Undo2, text: "30 dages retur" },
              { icon: ShieldCheck, text: "Tryg dansk handel" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1 p-3 text-center">
                <Icon className="h-4 w-4 text-sky" aria-hidden />
                <span className="text-[11px] font-semibold">{text}</span>
              </div>
            ))}
          </div>

          {/* Accordions */}
          <div className="divide-y border">
            {ACCORDIONS.map(({ title, render }) => {
              const isOpen = openAccordion === title;
              return (
                <div key={title}>
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(isOpen ? null : title)}
                    className="flex min-h-12 w-full items-center justify-between px-4 text-left text-sm font-bold hover:bg-secondary"
                    aria-expanded={isOpen}
                  >
                    {title}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  {isOpen && (
                    <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                      {render({ short, full }) || short || "Se produktbeskrivelsen."}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full description */}
      {full && (
        <section aria-label="Produktbeskrivelse" className="border-t bg-card">
          <div className="container-wk py-8">
            <h2 className="mb-3 text-xl">Om produktet</h2>
            <div
              className="prose-wk max-w-3xl text-sm"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </section>
      )}

      {related && related.length > 0 && (
        <section aria-label="Relaterede produkter" className="container-wk py-8">
          <h2 className="mb-4 text-xl">Relaterede produkter</h2>
          <ProductGrid products={related} isLoading={relatedLoading} skeletonCount={4} />
        </section>
      )}

      {addons && addons.length > 0 && (
        <section aria-label="Måske mangler du også" className="container-wk py-8">
          <h2 className="mb-4 text-xl">Måske mangler du også</h2>
          <ProductGrid products={addons} isLoading={false} skeletonCount={4} />
        </section>
      )}

      {recentItems.filter((i) => i.id !== product.id).length > 0 && (
        <section aria-label="Senest set" className="border-t bg-card">
          <div className="container-wk py-8">
            <h2 className="mb-4 text-xl">Senest set</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {recentItems
                .filter((i) => i.id !== product.id)
                .map((item) => (
                  <Link
                    key={item.id}
                    to="/produkt/$slug"
                    params={{ slug: item.slug }}
                    className="card-sharp w-36 shrink-0"
                  >
                    <div className="aspect-square bg-secondary">
                      {item.image && (
                        <img
                          src={item.image}
                          alt=""
                          loading="lazy"
                          width={144}
                          height={144}
                          className="h-full w-full object-contain"
                        />
                      )}
                    </div>
                    <div className="p-2">
                      <p className="line-clamp-2 text-xs font-semibold">{item.name}</p>
                      <p className="mt-1 font-display text-xs font-extrabold">{item.price}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
