import type { PublicProduct } from "@/services/productService";

export function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) {
    return 0;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function formatMoney(value: string | number | null | undefined): string {
  return `$${toNumber(value).toFixed(2)}`;
}

export function hasActiveSale(product: PublicProduct): boolean {
  const regularPrice = toNumber(product.regular_price);
  const salePrice = toNumber(product.sale_price);

  return salePrice > 0 && salePrice < regularPrice;
}

export function getEffectivePrice(product: PublicProduct): number {
  return hasActiveSale(product)
    ? toNumber(product.sale_price)
    : toNumber(product.regular_price);
}

export type StockStatus = "out" | "low" | "in";

export interface StockInfo {
  status: StockStatus;
  label: string;
}

export function getStockInfo(product: PublicProduct): StockInfo {
  if (!product.in_stock) {
    return { status: "out", label: "Out of stock" };
  }

  const stockQuantity = product.stock_qty;
  const lowStockThreshold = product.low_stock_threshold;

  if (
    stockQuantity !== null &&
    stockQuantity > 0 &&
    lowStockThreshold !== null &&
    stockQuantity <= lowStockThreshold
  ) {
    return { status: "low", label: `Only ${stockQuantity} left` };
  }

  if (stockQuantity !== null && stockQuantity > 0) {
    return { status: "in", label: `${stockQuantity} in stock` };
  }

  return { status: "in", label: "In stock" };
}

export function getDiscountPercentage(product: PublicProduct): number {
  if (!hasActiveSale(product)) {
    return 0;
  }

  const regularPrice = toNumber(product.regular_price);
  const salePrice = toNumber(product.sale_price);

  return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
}
