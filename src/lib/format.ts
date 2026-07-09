import type { WooPrices } from "./types";

/** Format a Store API minor-unit price string to Danish kr. */
export function formatPrice(minor: string | number, minorUnit = 2): string {
  const value = Number(minor) / Math.pow(10, minorUnit);
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function priceParts(prices: WooPrices) {
  const unit = prices.currency_minor_unit ?? 2;
  return {
    price: formatPrice(prices.price, unit),
    regular: formatPrice(prices.regular_price, unit),
    sale: prices.sale_price ? formatPrice(prices.sale_price, unit) : null,
    isOnSale: Number(prices.sale_price) > 0 && Number(prices.sale_price) < Number(prices.regular_price),
    savingsPct:
      Number(prices.regular_price) > 0 && Number(prices.price) < Number(prices.regular_price)
        ? Math.round((1 - Number(prices.price) / Number(prices.regular_price)) * 100)
        : 0,
  };
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&#8217;/g, "'").trim();
}
