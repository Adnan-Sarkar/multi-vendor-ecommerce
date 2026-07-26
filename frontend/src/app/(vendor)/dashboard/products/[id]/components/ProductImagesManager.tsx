"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import {
  UploadSimpleIcon,
  CircleNotchIcon,
  XIcon,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { uploadImages } from "@/lib/cloudinary";
import { addProductImagesAction } from "@/actions/productActions";
import type { ProductImage } from "@/services/vendorProductService";

interface ProductImagesManagerProps {
  productId: number;
  existingImages: ProductImage[];
}

export function ProductImagesManager({
  productId,
  existingImages,
}: ProductImagesManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingImageUrls, setPendingImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, startSaving] = useTransition();

  const handleFilesSelected = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    setIsUploading(true);
    try {
      const uploadedUrls = await uploadImages(files, { folder: "products" });

      setPendingImageUrls((current) => [...current, ...uploadedUrls]);

      toast.success("Images uploaded. Click Save to apply.");
    } catch {
      toast.error("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removePendingImage = (imageUrl: string) => {
    setPendingImageUrls((current) => current.filter((url) => url !== imageUrl));
  };

  const handleSave = () => {
    startSaving(async () => {
      const result = await addProductImagesAction(productId, pendingImageUrls);

      if (result.success) {
        toast.success(result.message);

        setPendingImageUrls([]);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-gray-900">Gallery</h2>

      {existingImages.length > 0 && (
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {existingImages.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg border border-gray-200"
            >
              <Image
                src={image.image_url}
                alt=""
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {pendingImageUrls.length > 0 && (
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {pendingImageUrls.map((imageUrl) => (
            <div
              key={imageUrl}
              className="relative aspect-square overflow-hidden rounded-lg border-2 border-indigo-200"
            >
              <Image
                src={imageUrl}
                alt=""
                fill
                sizes="150px"
                className="object-cover"
              />
              <button
                onClick={() => removePendingImage(imageUrl)}
                title="Remove"
                className="absolute right-1.5 top-1.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/90 text-red-600 shadow-sm transition-colors hover:bg-white"
              >
                <XIcon size={14} weight="bold" />
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesSelected}
        className="hidden"
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 px-5 py-3 text-sm font-medium text-gray-600 transition-colors hover:border-indigo-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? (
            <CircleNotchIcon size={18} weight="bold" className="animate-spin" />
          ) : (
            <UploadSimpleIcon size={18} weight="bold" />
          )}
          {isUploading ? "Uploading..." : "Upload images"}
        </button>

        {pendingImageUrls.length > 0 && (
          <Button
            onClick={handleSave}
            pending={isSaving}
            pendingLabel="Saving..."
          >
            Save {pendingImageUrls.length} image
            {pendingImageUrls.length > 1 ? "s" : ""}
          </Button>
        )}
      </div>
    </section>
  );
}
