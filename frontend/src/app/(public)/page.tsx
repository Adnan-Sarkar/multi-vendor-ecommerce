import {
  getFeaturedProducts,
  getNewArrivals,
  getPopularProducts,
  getOnSaleProducts,
} from "@/services/productService";
import { getCategories } from "@/services/catalogService";
import { getVendors } from "@/services/vendorPublicService";
import { getWishlistProductIds } from "@/services/wishlistService";
import { HomeHero } from "./components/HomeHero";
import { CategoryShowcase } from "./components/CategoryShowcase";
import { ProductRow } from "./components/ProductRow";
import { WhyShopWithUs } from "./components/WhyShopWithUs";
import { FeaturedStores } from "./components/FeaturedStores";
import { VendorCTA } from "./components/VendorCTA";

export default async function Home() {
  const [
    featuredProducts,
    newArrivals,
    popularProducts,
    onSaleProducts,
    categories,
    vendorsResult,
    wishlistedProductIds,
  ] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals(),
    getPopularProducts(),
    getOnSaleProducts(),
    getCategories(),
    getVendors({ sort: "rating" }),
    getWishlistProductIds(),
  ]);

  return (
    <div className="flex flex-col gap-16 pb-20">
      <HomeHero />

      <WhyShopWithUs />

      <CategoryShowcase categories={categories} />

      <ProductRow
        title="Featured Products"
        subtitle="Hand picked for you"
        viewAllHref="/shop"
        products={featuredProducts}
        wishlistedProductIds={wishlistedProductIds}
      />

      <ProductRow
        title="New Arrivals"
        subtitle="Fresh on the marketplace"
        viewAllHref="/shop?sort=newest"
        products={newArrivals}
        wishlistedProductIds={wishlistedProductIds}
      />

      <ProductRow
        title="Deals"
        subtitle="On sale now"
        viewAllHref="/shop?on_sale=1"
        products={onSaleProducts}
        wishlistedProductIds={wishlistedProductIds}
      />

      <ProductRow
        title="Popular Right Now"
        subtitle="What shoppers are viewing"
        viewAllHref="/shop?sort=popular"
        products={popularProducts}
        wishlistedProductIds={wishlistedProductIds}
      />

      <FeaturedStores vendors={vendorsResult.data} />

      <VendorCTA />
    </div>
  );
}
