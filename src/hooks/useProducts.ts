import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/woocommerce";
import type { ProductQueryParams } from "@/lib/types";

export function useProducts(params: ProductQueryParams, enabled = true) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () =>
      fetchProducts({
        data: {
          page: params.page,
          per_page: params.per_page,
          search: params.search,
          category: params.category,
          orderby: params.orderby,
          order: params.order,
          on_sale: params.on_sale,
          min_price: params.min_price,
          max_price: params.max_price,
          stock_status: params.stock_status,
        },
      }),
    staleTime: 5 * 60_000,
    enabled,
  });
}
