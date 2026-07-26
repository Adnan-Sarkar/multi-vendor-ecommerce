import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretLeftIcon, PencilSimpleIcon } from "@phosphor-icons/react/ssr";
import { getMyProduct } from "@/services/vendorProductService";
import { getProductVariants } from "@/services/productService";
import { getAttributes } from "@/services/attributeService";
import { ProductDetails } from "./components/ProductDetails";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { id } = await params;
  const product = await getMyProduct(Number(id));

  if (!product) {
    notFound();
  }

  const [variants, attributes] = await Promise.all([
    getProductVariants(product.slug),
    getAttributes(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/products"
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <CaretLeftIcon size={24} weight="bold" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
        </div>
        <Link
          href={`/dashboard/products/${product.id}/edit`}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          <PencilSimpleIcon size={20} weight="bold" />
          Edit
        </Link>
      </div>

      <ProductDetails
        product={product}
        variants={variants}
        attributes={attributes}
      />
    </div>
  );
}
