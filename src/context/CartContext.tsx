import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, WooProduct } from "@/lib/types";

const STORAGE_KEY = "wowkidz-cart-v1";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotalMinor: number;
  isMiniCartOpen: boolean;
  openMiniCart: () => void;
  closeMiniCart: () => void;
  addProduct: (product: WooProduct, quantity?: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  coupon: string;
  setCoupon: (code: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isMiniCartOpen, setMiniCartOpen] = useState(false);
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addProduct = useCallback((product: WooProduct, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: Number(product.prices.price),
          regularPrice: Number(product.prices.regular_price),
          image: product.images[0]?.thumbnail ?? product.images[0]?.src ?? "",
          quantity,
        },
      ];
    });
    setMiniCartOpen(true);
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotalMinor = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return {
      items,
      itemCount,
      subtotalMinor,
      isMiniCartOpen,
      openMiniCart: () => setMiniCartOpen(true),
      closeMiniCart: () => setMiniCartOpen(false),
      addProduct,
      updateQuantity,
      removeItem,
      clearCart,
      coupon,
      setCoupon,
    };
  }, [items, isMiniCartOpen, addProduct, updateQuantity, removeItem, clearCart, coupon]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
