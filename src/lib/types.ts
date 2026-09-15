/** WooCommerce Store API types (wc/store/v1) */

export interface WooImage {
  id: number;
  src: string;
  thumbnail: string;
  srcset?: string;
  sizes?: string;
  name?: string;
  alt: string;
}

export interface WooPrices {
  price: string; // minor units
  regular_price: string;
  sale_price: string;
  currency_code: string;
  currency_minor_unit: number;
  currency_symbol: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface WooCategoryRef {
  id: number;
  name: string;
  slug: string;
  link?: string;
}

export interface WooAttribute {
  id: number;
  name: string;
  taxonomy: string | null;
  has_variations: boolean;
  terms: { id: number; name: string; slug: string }[];
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  parent: number;
  type: string;
  permalink: string;
  sku: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: WooPrices;
  images: WooImage[];
  categories: WooCategoryRef[];
  /** Store API tags — often empty on WowKidz, but used when present. */
  tags?: { id: number; name: string; slug: string; link?: string }[];
  is_in_stock: boolean;
  is_purchasable: boolean;
  low_stock_remaining: number | null;
  attributes: WooAttribute[];
  variations: { id: number; attributes: { name: string; value: string }[] }[];
  add_to_cart: { text: string; description: string; url: string; minimum: number; maximum: number };
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
  image: WooImage | null;
  permalink?: string;
}

export interface ProductQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string; // category id(s), comma separated
  orderby?: "date" | "price" | "popularity" | "rating" | "title";
  order?: "asc" | "desc";
  on_sale?: boolean;
  min_price?: number; // in kr
  max_price?: number; // in kr
  stock_status?: "instock";
}

export interface ProductsResult {
  products: WooProduct[];
  total: number;
  totalPages: number;
}

export interface CartItem {
  id: number;
  name: string;
  slug: string;
  price: number; // minor units
  regularPrice: number;
  image: string;
  quantity: number;
}

export interface AdvisorMessage {
  role: "user" | "assistant";
  text: string;
  products?: WooProduct[];
}
