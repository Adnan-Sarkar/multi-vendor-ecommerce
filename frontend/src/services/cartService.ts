import { fetchServer } from "@/lib/api-server";

export interface CartItemProduct {
  id: number;
  name: string;
  thumbnail: string | null;
  regular_price: string;
  sale_price: string | null;
  primary_image: string | null;
}

export interface CartItemVariantValue {
  id: number;
  value: string;
}

export interface CartItemVariant {
  id: number;
  sku?: string;
  attribute_values?: CartItemVariantValue[];
}

export interface CartItem {
  id: number;
  product: CartItemProduct;
  variant?: CartItemVariant | null;
  quantity: number;
  unit_price: string | number;
  subtotal: number;
  available_stock: number | null;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total: number;
}

export async function getCart(): Promise<Cart | null> {
  try {
    const response = await fetchServer("/cart", { cache: "no-store" });

    if (!response.ok) {
      return null;
    }

    const body = await response.json();

    return body.data ?? null;
  } catch {
    return null;
  }
}

export async function getCartCount(): Promise<number> {
  const cart = await getCart();

  if (!cart) {
    return 0;
  }

  return cart.items.reduce((total, item) => total + item.quantity, 0);
}
