import Image from "next/image";

interface ProductGalleryProps {
  thumbnail: string;
  name: string;
}

export function ProductGallery({ thumbnail, name }: ProductGalleryProps) {
  return (
    <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
      <Image src={thumbnail} alt={name} fill className="object-cover" />
    </div>
  );
}
