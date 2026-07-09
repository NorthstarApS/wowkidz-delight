import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomCartBar } from "@/components/BottomCartBar";
import { MiniCartDrawer } from "@/components/MiniCartDrawer";
import { CookieBanner } from "@/components/CookieBanner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="font-display text-7xl font-extrabold text-coral">404</p>
        <h1 className="mt-4 text-xl">Siden findes ikke</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Siden er måske flyttet — men børneglæden er stadig lige her.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/" className="btn-base btn-coral text-sm">
            Til forsiden
          </Link>
          <Link to="/shop" className="btn-base btn-outline-ink text-sm">
            Shop nu
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl">Siden kunne ikke indlæses</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Noget gik galt hos os. Prøv igen, eller gå tilbage til forsiden.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-base btn-coral text-sm"
          >
            Prøv igen
          </button>
          <a href="/" className="btn-base btn-outline-ink text-sm">
            Til forsiden
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "WowKidz.dk — Alt til børn, baby og familieliv" },
      {
        name: "description",
        content:
          "Dansk webshop for børnefamilier: legetøj, babyudstyr, læring, skolestart og praktiske produkter til hverdagen. Fair priser og nem retur.",
      },
      { name: "author", content: "WowKidz.dk" },
      { property: "og:title", content: "WowKidz.dk — Alt til børn, baby og familieliv" },
      {
        property: "og:description",
        content:
          "Legetøj, babyudstyr, læring, skolestart og praktiske familiefund — samlet ét sted.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "WowKidz.dk" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "OnlineStore",
          name: "WowKidz.dk",
          description:
            "Dansk webshop for børnefamilier med legetøj, babyudstyr, læring, skolestart og praktiske produkter til hverdagen.",
          url: "https://wowkidz.dk",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="da">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pb-20">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <Footer />
        </div>
        <BottomCartBar />
        <MiniCartDrawer />
        <CookieBanner />
      </CartProvider>
    </QueryClientProvider>
  );
}
