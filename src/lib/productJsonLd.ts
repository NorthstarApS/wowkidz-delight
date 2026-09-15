import { stripHtml } from "./format";
import type { WooPrices, WooProduct } from "./types";

/** Canonical shop origin for Product/Offer URLs in JSON-LD. */
export const SHOP_ORIGIN = "https://wowkidz.dk";

/**
 * Store-wide return policy — same 30-day ReturnByMail window as the live
 * OnlineStore JSON-LD and https://wowkidz.dk/levering-returnering.
 */
export const MERCHANT_RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "DK",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 30,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
  refundType: "https://schema.org/FullRefund",
  merchantReturnLink: `${SHOP_ORIGIN}/levering-returnering`,
};

/**
 * DK shipping for Offers — mirrors the working Sportstar Product+Offer
 * shippingDetails (59 kr, 1–2 handling + 2–4 transit ≈ 3–6 days).
 */
export const DK_SHIPPING_DETAILS = {
  "@type": "OfferShippingDetails",
  shippingRate: {
    "@type": "MonetaryAmount",
    value: "59",
    currency: "DKK",
  },
  shippingDestination: {
    "@type": "DefinedRegion",
    addressCountry: "DK",
  },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 2,
      unitCode: "DAY",
    },
    transitTime: {
      "@type": "QuantitativeValue",
      minValue: 2,
      maxValue: 4,
      unitCode: "DAY",
    },
  },
};

function schemaPrice(prices: WooPrices): string {
  const unit = prices.currency_minor_unit ?? 2;
  const value = Number(prices.price) / Math.pow(10, unit);
  if (!Number.isFinite(value)) return "0.00";
  return value.toFixed(Math.max(unit, 2));
}

function isoDatePlusDays(days: number, from = new Date()): string {
  const d = new Date(from);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function productUrl(slug: string): string {
  return `${SHOP_ORIGIN}/produkt/${slug}`;
}

/** Escape JSON for embedding in a `<script type="application/ld+json">` tag. */
export function stringifyJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/**
 * Product + Offer JSON-LD for PDP, including the GSC merchant-listing fields
 * `shippingDetails` and `hasMerchantReturnPolicy`.
 */
export function buildProductJsonLd(product: WooProduct) {
  const url = productUrl(product.slug);
  const description =
    stripHtml(product.short_description) || stripHtml(product.description) || product.name;
  const images = product.images.map((img) => img.src).filter(Boolean);
  const currency = product.prices.currency_code || "DKK";

  const offer: Record<string, unknown> = {
    "@type": "Offer",
    url,
    priceCurrency: currency,
    price: schemaPrice(product.prices),
    availability: product.is_in_stock
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: {
      "@type": "Organization",
      name: "WowKidz.dk",
      url: SHOP_ORIGIN,
    },
    priceValidUntil: isoDatePlusDays(60),
    shippingDetails: DK_SHIPPING_DETAILS,
    hasMerchantReturnPolicy: MERCHANT_RETURN_POLICY,
  };

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": url,
    name: product.name,
    description,
    url,
    offers: offer,
  };

  if (product.sku) jsonLd.sku = product.sku;
  if (images.length > 0) jsonLd.image = images;

  return jsonLd;
}

export function productJsonLdScript(product: WooProduct) {
  return {
    type: "application/ld+json" as const,
    children: stringifyJsonLd(buildProductJsonLd(product)),
  };
}
