import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretLeftIcon } from "@phosphor-icons/react/ssr";
import { getMyProduct } from "@/services/vendorProductService";
import { getCategories, getTags } from "@/services/catalogService";
import { updateProductAction } from "@/actions/productActions";
import { ProductForm } from "../../components/ProductForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  const [product, categories, tags] = await Promise.all([
    getMyProduct(productId),
    getCategories(),
    getTags(),
  ]);

  if (!product) {
    notFound();
  }

  const updateAction = updateProductAction.bind(null, productId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href={`/dashboard/products/${productId}`}
          className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <CaretLeftIcon size={24} weight="bold" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <p className="mt-0.5 text-sm text-gray-500">Update the details for {product.name}.</p>
        </div>
      </div>

      <ProductForm
        action={updateAction}
        categories={categories}
        tags={tags}
        submitLabel="Save Changes"
        pendingLabel="Saving..."
        initialProduct={product}
      />
    </div>
  );
}
