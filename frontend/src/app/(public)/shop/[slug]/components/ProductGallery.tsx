"use client";

import { useState } from "react";
import Image from "next/image";
import { PackageIcon } from "@phosphor-icons/react";
import type { PublicProductImage } from "@/services/productService";

interface ProductGalleryProps {
  thumbnail: string | null;
  images: PublicProductImage[];
  name: string;
}

export function ProductGallery({ thumbnail, images, name }: ProductGalleryProps) {
  const galleryImages = [
    ...(thumbnail ? [thumbnail] : []),
    ...images.map((image) => image.image_url),
  ].filter((url, index, all) => all.indexOf(url) === index);

  const [activeImage, setActiveImage] = useState(galleryImages[0] ?? "");

  if (galleryImages.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 text-gray-300">
        <PackageIcon size={64} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
        <Image
          src={activeImage}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      {galleryImages.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {galleryImages.map((imageUrl) => (
            <button
              key={imageUrl}
              onClick={() => setActiveImage(imageUrl)}
              className={`relative h-20 w-20 cursor-pointer overflow-hidden rounded-xl border-2 transition-colors ${
                imageUrl === activeImage
                  ? "border-indigo-600"
                  : "border-gray-100 hover:border-gray-300"
              }`}
            >
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
