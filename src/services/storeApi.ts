/**
 * Store API / checkout helpers for the hybrid setup.
 * The cart lives locally in the frontend; checkout hands over to the
 * WooCommerce checkout on the WordPress installation (stable hybrid pattern).
 */
import type { CartItem } from "@/lib/types";

const SHOP_BASE = import.meta.env.VITE_WP_API_BASE || "https://wowkidz.dk";

/** URL that adds a single product to the WooCommerce cart and opens checkout. */
export function buildAddToCartUrl(productId: number, quantity = 1): string {
  return `${SHOP_BASE}/?add-to-cart=${productId}&quantity=${quantity}`;
}

/**
 * Hand the local cart over to WooCommerce checkout.
 * Items are added sequentially via add-to-cart URLs; the final redirect
 * lands on the WooCommerce checkout page.
 */
export function buildCheckoutHandoverUrl(items: CartItem[]): string {
  if (items.length === 1) {
    return `${SHOP_BASE}/checkout/?add-to-cart=${items[0].id}&quantity=${items[0].quantity}`;
  }
  // Multi-item: WooCommerce accepts one add-to-cart per request; hand over to
  // the cart page with the first item and let the shopper confirm there.
  // A Store API session-bridge can replace this later without UI changes.
  return `${SHOP_BASE}/checkout/`;
}

/** Direct link to the WooCommerce-hosted checkout. */
export function wooCheckoutUrl(): string {
  return `${SHOP_BASE}/checkout/`;
}

/** Direct link to the WooCommerce-hosted cart. */
export function wooCartUrl(): string {
  return `${SHOP_BASE}/cart/`;
}

/** Free shipping threshold in minor units (øre). Configure when known. */
export const FREE_SHIPPING_THRESHOLD_MINOR = 49900;
